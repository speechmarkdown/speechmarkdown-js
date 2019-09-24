"use strict";

// tslint:disable-next-line: max-func-body-length
export function speechMarkdownGrammar(myna: any): any {
  const m = myna;
  // Override parenthesis function to not use `.guardedSeq`
  // This sequence is too assertive, and may cause exceptions rather than just returning null
  m.parenthesized = (rule: any) => {
    return m.seq("(", m.ws, rule, m.ws, ")").setType("parenthesized");
  }

  // tslint:disable-next-line: typedef
  const g: any = new function () {
    //         // Allows the "inline" to be referenced before it is defined.
    //         // This enables recursive definitions.
    //         this.inlineDelayed = m.delay(() => this.inline);

    //         this.boundedInline = function(begin: any, end: any) : any {
    // // tslint:disable-next-line: no-parameter-reassignment
    //             if (end === undefined) { end = begin; }
    //             return m.seq(begin, this.inlineDelayed.unless(end).zeroOrMore, end);
    //         }


    // Plain text
    const specialCharSet = '[]()*`@#\\_!';
    const specialCharSetEmphasis = '[]()*~`@#\\_!+-';
    const ws = m.char(' \t').oneOrMore;
    const optWs = ws.opt;
    const wsOrNewLine = ws.or(m.newLine);
    const nonSpecialChar = m.notChar(specialCharSetEmphasis).unless(m.newLine);
    const nonSpecialCharEmphasis = m.notChar(specialCharSet).unless(m.newLine);
    const quoteChar = m.notChar('"');

    this.plainText = m.choice(m.digits, m.letters, ws, nonSpecialChar).oneOrMore.ast;
    this.plainTextEmphasis = m.choice(m.digits, m.letters, ws, nonSpecialChar).oneOrMore.ast;
    const plainTextChoice = m.choice(m.digits, m.letters, ws, nonSpecialCharEmphasis)
    this.plainTextModifier = plainTextChoice.oneOrMore.ast;
    this.plainTextPhone = m.seq(m.parenthesized(m.digits), plainTextChoice.oneOrMore).ast

    // Break
    this.timeUnit = m.choice('s','ms').ast;
    this.fraction = m.seq('.', m.digit.zeroOrMore);
    this.number = m.seq(m.integer, this.fraction.opt).ast;
    this.time = m.seq(this.number, this.timeUnit).ast;
    this.shortBreak = m.seq('[', this.time , ']').ast;
    // this.break = m.seq('[break:', this.time , ']').ast;

    // this.string = m.doubleQuoted(this.quoteChar.zeroOrMore).ast;
    // this.string = m.choice(m.doubleQuotedString(), m.singleQuotedString()).ast;

    // Emphasis
    this.shortEmphasisModerate = m.seq('+', this.plainTextEmphasis , '+').ast;
    this.shortEmphasisStrong = m.seq('++', this.plainTextEmphasis , '++').ast;
    this.shortEmphasisNone = m.seq('~', this.plainTextEmphasis , '~').ast;
    this.shortEmphasisReduced = m.seq('-', this.plainTextEmphasis , '-').ast;
    this.emphasis = m.choice(this.shortEmphasisModerate, this.shortEmphasisStrong, this.shortEmphasisNone, this.shortEmphasisReduced);

    // Modifier
    // (text)[key] or (text)[key;]
    // (text)[key:'value'] or (text)[key:'value';]
    // (text)[key: "value"] or (text)[key: "value";]
    // (text)[key:'value';key;key:"value"]
    const colon = m.char(':').ws;
    const semicolon = m.char(';').ws;
    this.textModifierKey = m.keywords('emphasis', 'address', 'number', 'characters', 'chars', 'expletive', 'bleep', 'fraction', 'interjection', 'ordinal', 'telephone', 'phone', 'unit', 'time', 'date', 'whisper', 'ipa', 'sub', 'vol', 'volume', 'rate', 'pitch', 'lang', 'voice').ast;
    this.textModifierText = m.choice(m.digit, m.letter, m.hyphen).oneOrMore.ast;
    this.textModifierValue = m.seq(colon, m.choice(m.singleQuoted(this.textModifierText), m.doubleQuoted(this.textModifierText)))
    this.textModifierKeyOptionalValue = m.seq(this.textModifierKey, this.textModifierValue.opt).ast;
    this.modifier = m.bracketed(m.delimited(this.textModifierKeyOptionalValue.ws, semicolon));

    const textText = m.parenthesized(this.plainTextModifier);
    const textTextPhone = m.parenthesized(this.plainTextPhone)
    this.textModifier = m.seq(m.choice(textText, textTextPhone), this.modifier).ast

    // Audio
    this.urlSpecialChar = m.char(':/.-_~?#[]@!+,;%=()');
    this.url = m.choice(m.digit, m.letter, this.urlSpecialChar).oneOrMore.ast;
    this.audio = m.seq('![', m.choice(m.singleQuoted(this.url), m.doubleQuoted(this.url)), ']').ast;

    // Section
    this.sectionModifierKey = m.keywords('lang', 'voice').ast;
    this.sectionModifierText = m.choice(m.digit, m.letter, m.hyphen).oneOrMore.ast;
    this.sectionModifierValue = m.seq(colon, m.choice(m.singleQuoted(this.sectionModifierText), m.doubleQuoted(this.sectionModifierText)))
    this.sectionModifierKeyOptionalValue = m.seq(this.sectionModifierKey, this.sectionModifierValue.opt).ast;
    this.sectionModifier = m.bracketed(m.delimited(this.sectionModifierKeyOptionalValue.ws, semicolon));
    this.section = m.seq('#', this.sectionModifier).ast;

    // values
    this.valueNone = 'none';
    this.valueXWeak = 'x-weak';
    this.valueWeak = 'weak';
    this.valueMedium = 'medium';
    this.valueStrong = 'strong';
    this.valueXStrong = 'x-strong';

    this.breakStrengthValue = m.choice(this.valueNone, this.valueXWeak, this.valueWeak, this.valueMedium, this.valueStrong, this.valueXStrong).ast;
    this.breakStrength = m.seq('[', 'break', ':', m.choice(m.singleQuoted(this.breakStrengthValue), m.doubleQuoted(this.breakStrengthValue)), ']').ast;
    this.breakTime = m.seq('[', 'break', ':', m.choice(m.singleQuoted(this.time), m.doubleQuoted(this.time)), ']').ast;

    this.any = m.advance;
    this.inline = m.choice(this.textModifier, this.emphasis, this.shortBreak, this.breakStrength, this.breakTime, this.audio, this.plainText, this.any).unless(m.newLine);
    this.lineEnd = m.newLine.or(m.assert(m.end)).ast;
    this.emptyLine = m.char(' \t').zeroOrMore.then(m.newLine).ast;
    this.restOfLine = m.seq(this.inline.zeroOrMore).then(this.lineEnd);
    this.simpleLine = m.seq(this.emptyLine.not, m.notEnd, this.restOfLine).ast;
    this.paragraph = this.simpleLine.oneOrMore.ast;

    this.content = m.choice(this.section, this.paragraph, this.emptyLine);
    this.document = this.content.zeroOrMore.ast;
  }

  // Register the grammar, providing a name and the default parse rule
  return m.registerGrammar("speechmarkdown", g, g.document);
}
