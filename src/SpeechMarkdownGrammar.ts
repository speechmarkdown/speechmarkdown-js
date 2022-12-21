'use strict';

// tslint:disable-next-line: max-func-body-length
export function speechMarkdownGrammar(myna: any): any {
  const m = myna;
  // Override parenthesis function to not use `.guardedSeq`
  // This sequence is too assertive, and may cause exceptions rather than just returning null
  m.parenthesized = (rule: any) => {
    return m.seq('(', m.ws, rule, m.ws, ')').setType('parenthesized');
  };

  // tslint:disable-next-line: typedef
  // tslint:disable-next-line: max-func-body-length
  const g: any = new (function() {
    //         // Allows the "inline" to be referenced before it is defined.
    //         // This enables recursive definitions.
    //         this.inlineDelayed = m.delay(() => this.inline);

    //         this.boundedInline = function(begin: any, end: any) : any {
    // // tslint:disable-next-line: no-parameter-reassignment
    //             if (end === undefined) { end = begin; }
    //             return m.seq(begin, this.inlineDelayed.unless(end).zeroOrMore, end);
    //         }

    // Plain text
    const specialCharSet = '[]()';
    const specialCharSetEmphasis = '[]()*~`@#\\_!+-';
    const ws = m.char(' \t').oneOrMore;
    const optWs = ws.opt;
    const wsOrNewLine = ws.or(m.newLine);
    const nonSpecialChar = m.notChar(specialCharSetEmphasis).unless(m.newLine);
    const nonSpecialCharEmphasis = m.notChar(specialCharSet).unless(m.newLine);
    const quoteChar = m.notChar('"');

    /*
     xsd:token - XML Schema2 section 3.3.2
     token represents tokenized strings.
     The ·value space· of token is the set of strings that do not contain the
     carriage return (#xD), line feed (#xA) nor tab (#x9) characters, that have
     no leading or trailing spaces (#x20) and that have no internal sequences
     of two or more spaces. The ·lexical space· of token is the set of strings
     that do not contain the carriage return (#xD), line feed (#xA) nor
     tab (#x9) characters, that have no leading or trailing spaces (#x20) and
     that have no internal sequences of two or more spaces.

     This implementation plays very loose with the definition.
     */
    this.xsdToken = m.choice(
      m.digits,
      m.letters,
      m.char(specialCharSetEmphasis)
    ).oneOrMore.ast;

    this.plainText = m.choice(
      m.digits,
      m.letters,
      ws,
      nonSpecialChar,
    ).oneOrMore.ast;
    this.plainTextEmphasis = m.choice(
      m.digits,
      m.letters,
      ws,
      nonSpecialChar,
    ).oneOrMore.ast;
    const plainTextChoice = m.choice(
      m.digits,
      m.letters,
      ws,
      nonSpecialCharEmphasis,
    );
    this.plainTextModifier = plainTextChoice.oneOrMore.ast;
    this.plainTextPhone = m.seq(
      m.parenthesized(m.digits),
      plainTextChoice.oneOrMore,
    ).ast;
    this.plainTextSpecialChars = m.choice(
      m.seq('(', plainTextChoice, ') '),
      m.seq('[', plainTextChoice, '] '),
      m.choice(...specialCharSetEmphasis.split('')).oneOrMore,
    ).oneOrMore.ast;

    // Break
    this.timeUnit = m.choice('s', 'ms').ast;
    this.fraction = m.seq('.', m.digit.zeroOrMore);
    this.number = m.seq(m.integer, this.fraction.opt).ast;
    this.time = m.seq(this.number, this.timeUnit).ast;
    this.shortBreak = m.seq('[', this.time, ']').ast;
    // this.break = m.seq('[break:', this.time , ']').ast;

    // this.string = m.doubleQuoted(this.quoteChar.zeroOrMore).ast;
    // this.string = m.choice(m.doubleQuotedString(), m.singleQuotedString()).ast;

    // Emphasis
    // The emphasis tag should be preluded and followed by a not-letter-character.
    // Otherwise an example like above would be captured.
    const notLetterChar = m.not(m.letters);
    this.shortEmphasisModerate = m.seq(
      notLetterChar,
      '+',
      this.plainTextEmphasis,
      '+',
      notLetterChar,
    ).ast;
    this.shortEmphasisStrong = m.seq(
      notLetterChar,
      '++',
      this.plainTextEmphasis,
      '++',
      notLetterChar,
    ).ast;
    this.shortEmphasisNone = m.seq(
      notLetterChar,
      '~',
      this.plainTextEmphasis,
      '~',
      notLetterChar,
    ).ast;
    this.shortEmphasisReduced = m.seq(
      notLetterChar,
      '-',
      this.plainTextEmphasis,
      '-',
      notLetterChar,
    ).ast;
    this.emphasis = m.choice(
      this.shortEmphasisModerate,
      this.shortEmphasisStrong,
      this.shortEmphasisNone,
      this.shortEmphasisReduced,
    );

    // Modifier
    // (text)[key] or (text)[key;]
    // (text)[key:'value'] or (text)[key:'value';]
    // (text)[key: "value"] or (text)[key: "value";]
    // (text)[key:'value';key;key:"value"]
    const colon = m.char(':').ws;

    const semicolon = m.char(';').ws;
    this.textModifierKey = m.keywords(
      'emphasis',
      'address',
      'number',
      'cardinal',
      'characters',
      'chars',
      'digits',
      'drc',
      'expletive',
      'bleep',
      'fraction',
      'interjection',
      'ordinal',
      'telephone',
      'phone',
      'unit',
      'time',
      'date',
      'whisper',
      'ipa',
      'sub',
      'vol',
      'volume',
      'rate',
      'pitch',
      'timbre',
      'lang',
      'voice',
      'excited',
      'disappointed',
    ).ast;
    // Special characters for <phoneme alphabet="ipa" ph="..."> tag
    // const ipaChars = ['.', "'", 'æ', '͡ʒ', 'ð', 'ʃ', '͡ʃ', 'θ', 'ʒ', 'ə', 'ɚ', 'aɪ', 'aʊ', 'ɑ',
    //  'eɪ', 'ɝ', 'ɛ', 'ɪ', 'oʊ', 'ɔ', 'ɔɪ', 'ʊ', 'ʌ', 'ɒ', 'ɛə', 'ɪə', 'ʊə', 'ˈ', 'ˌ', 'ŋ', 'ɹ'];

    const ipaChars = [
      '.',
      'æ',
      '͡ʒ',
      'ð',
      'ʃ',
      '͡ʃ',
      'θ',
      'ʒ',
      'ə',
      'ɚ',
      'aɪ',
      'aʊ',
      'ɑ',
      'eɪ',
      'ɝ',
      'ɛ',
      'ɪ',
      'oʊ',
      'ɔ',
      'ɔɪ',
      'ʊ',
      'ʌ',
      'ɒ',
      'ɛə',
      'ɪə',
      'ʊə',
      'ˈ',
      'ˌ',
      'ŋ',
      'ɹ',
    ];

    const percentChange = [
      '+',
      m.hyphen,
      m.digit,
      '%',
    ]

    this.textModifierText = m.choice(
      m.digit,
      m.letter,
      m.hyphen,
      m.space,
      ...ipaChars,
      ...percentChange
    ).oneOrMore.ast;

    this.textModifierTextDoubleQuote = m.choice(
      m.digit,
      m.letter,
      m.hyphen,
      m.space,
      ...ipaChars,
      ...percentChange,
      "'",
    ).oneOrMore.ast;

    this.textModifierValue = m.seq(
      colon,
      m.choice(
        m.singleQuoted(this.textModifierText),
        m.doubleQuoted(this.textModifierTextDoubleQuote),
      ),
    );
    this.textModifierKeyOptionalValue = m.seq(
      this.textModifierKey,
      this.textModifierValue.opt,
    ).ast;
    this.modifier = m.bracketed(
      m.delimited(this.textModifierKeyOptionalValue.ws, semicolon),
    );

    const textText = m.parenthesized(this.plainTextModifier);
    const textTextPhone = m.parenthesized(this.plainTextPhone);
    this.textModifier = m.seq(
      m.choice(textText, textTextPhone),
      this.modifier,
    ).ast;

    // Audio
    this.urlSpecialChar = m.char(':/.-_~?#[]@!+,;%=()&');
    this.url = m.choice(m.digit, m.letter, this.urlSpecialChar).oneOrMore.ast;
    this.audio = m.seq(
      '!',
      // Maybe empty caption
      m.opt(m.parenthesized(m.opt(this.plainTextModifier))),
      '[',
      m.choice(m.singleQuoted(this.url), m.doubleQuoted(this.url)),
      ']',
    ).ast;

    // Section
    this.sectionModifierKey = m.keywords(
      'lang',
      'voice',
      'defaults',
      'dj',
      'newscaster',
      'excited',
      'disappointed',
    ).ast;
    this.sectionModifierText = m.choice(
      m.digit,
      m.letter,
      m.hyphen,
    ).oneOrMore.ast;
    this.sectionModifierValue = m.seq(
      colon,
      m.choice(
        m.singleQuoted(this.sectionModifierText),
        m.doubleQuoted(this.sectionModifierText),
      ),
    );
    this.sectionModifierKeyOptionalValue = m.seq(
      this.sectionModifierKey,
      this.sectionModifierValue.opt,
    ).ast;
    this.sectionModifier = m.bracketed(
      m.delimited(this.sectionModifierKeyOptionalValue.ws, semicolon),
    );
    this.section = m.seq('#', this.sectionModifier).ast;

    // values
    this.valueNone = 'none';
    this.valueXWeak = 'x-weak';
    this.valueWeak = 'weak';
    this.valueMedium = 'medium';
    this.valueStrong = 'strong';
    this.valueXStrong = 'x-strong';

    this.breakStrengthValue = m.keywords(
      this.valueNone,
      this.valueXWeak,
      this.valueWeak,
      this.valueMedium,
      this.valueStrong,
      this.valueXStrong,
    ).ast;
    this.breakValue = m.choice(
      this.breakStrengthValue,
      this.time
    ).ast;
    this.break = m.seq(
      '[',
      'break',
      ':',
      m.choice(
        m.singleQuoted(this.breakValue),
        m.doubleQuoted(this.breakValue),
      ),
      ']',
    ).ast;

    this.markTag = m.seq(
      '[',
      'mark',
      ':',
      m.choice(
        m.singleQuoted(this.xsdToken),
        m.doubleQuoted(this.xsdToken)
      ),
      ']'
    ).ast;

    this.any = m.advance;
    this.inline = m
      .choice(
        this.textModifier,
        this.emphasis,
        this.shortBreak,
        this.break,
        this.audio,
        this.markTag,
        this.plainTextSpecialChars,
        this.plainText,
        this.any,
      )
      .unless(m.newLine);
    this.lineEnd = m.newLine.or(m.assert(m.end)).ast;
    this.emptyLine = m.char(' \t').zeroOrMore.then(m.newLine).ast;
    this.restOfLine = m.seq(this.inline.zeroOrMore).then(this.lineEnd);
    this.simpleLine = m.seq(this.emptyLine.not, m.notEnd, this.restOfLine).ast;
    this.paragraph = this.simpleLine.oneOrMore.ast;

    this.content = m.choice(this.section, this.paragraph, this.emptyLine);
    this.document = this.content.zeroOrMore.ast;
  })();

  // Register the grammar, providing a name and the default parse rule
  return m.registerGrammar('speechmarkdown', g, g.document);
}
