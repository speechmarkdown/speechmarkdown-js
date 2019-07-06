"use strict";

export function speechMarkdownGrammar(myna: any): any {
  const m = myna;

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
    this.specialCharSet = '[]()*~`@#\\_!+-';
    this.ws = m.char(' \t').oneOrMore;
    this.optWs = this.ws.opt;
    this.wsOrNewLine = this.ws.or(m.newLine);
    this.nonSpecialChar = m.notChar(this.specialCharSet).unless(m.newLine);
    this.specialChar = m.char(this.specialCharSet).ast;
    this.quoteChar = m.notChar('"');
    this.plainText = m.choice(m.digits, m.letters, this.ws, this.nonSpecialChar).oneOrMore.ast;

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
    this.shortEmphasisModerate = m.seq('+', this.plainText , '+').ast;
    this.shortEmphasisStrong = m.seq('++', this.plainText , '++').ast;
    this.shortEmphasisNone = m.seq('~', this.plainText , '~').ast;
    this.shortEmphasisReduced = m.seq('-', this.plainText , '-').ast;
    this.emphasis = m.choice(this.shortEmphasisModerate, this.shortEmphasisStrong, this.shortEmphasisNone, this.shortEmphasisReduced);

    // Modifier
    // (text)[key] or (text)[key;]
    // (text)[key:'value'] or (text)[key:'value';]
    // (text)[key: "value"] or (text)[key: "value";]
    // (text)[key:'value';key;key:"value"]
    this.colon = m.char(':').ws;
    this.semicolon = m.char(';').ws;
    this.textModifierKey = m.keywords('emphasis', 'address', 'number', 'characters', 'chars', 'expletive', 'bleep', 'fraction', 'interjection', 'ordinal', 'telephone', 'phone', 'unit', 'time', 'date', 'whisper', 'ipa', 'sub', 'vol', 'volume', 'rate', 'pitch', 'lang', 'voice').ast;
    this.textModifierText = m.choice(m.digit, m.letter, m.hyphen).oneOrMore.ast;
    this.textModifierValue = m.seq(this.colon, m.choice(m.singleQuoted(this.textModifierText), m.doubleQuoted(this.textModifierText)))
    this.textModifierKeyOptionalValue = m.seq(this.textModifierKey, this.textModifierValue.opt).ast;
    this.modifier = m.bracketed(m.delimited(this.textModifierKeyOptionalValue.ws, this.semicolon));
    this.textModifier = m.seq('(', this.plainText, ')', this.modifier).ast;


    // Audio
    this.urlSpecialChar = m.char(':/.-');
    this.url = m.choice(m.digit, m.letter, this.urlSpecialChar).oneOrMore.ast;
    this.audio = m.seq('![', m.choice(m.singleQuoted(this.url), m.doubleQuoted(this.url)), ']').ast;

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

    this.content = m.choice(this.paragraph, this.emptyLine);
    this.document = this.content.zeroOrMore.ast;
  }

  // Register the grammar, providing a name and the default parse rule
  return m.registerGrammar("speechmarkdown", g, g.document);
}
