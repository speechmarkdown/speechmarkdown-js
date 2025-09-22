import { SpeechOptions } from '../SpeechOptions';
import { FormatterBase } from './FormatterBase';

export class TagsObject {
  private base: SsmlFormatterBase;
  public tags: Record<string, { sortId: number; attrs: object }>;
  public text: string;

  public constructor(base: SsmlFormatterBase) {
    this.base = base;
    this.tags = {};
    this.text = '';
  }

  public tag(tag: string, attrs: object, augment: boolean = false) {
    const sortId = this.base.ssmlTagSortOrder.indexOf(tag);

    if (!this.tags[tag]) {
      this.tags[tag] = { sortId: sortId, attrs: null };
    }
    if (augment) {
      this.tags[tag].attrs = { ...this.tags[tag].attrs, ...attrs };
    } else {
      this.tags[tag].attrs = attrs;
    }
  }

  protected voiceTagNamed(voices: null | object, name: string) {
    let info = voices && voices[name];
    if (info) {
      if (typeof info !== 'object') {
        info = {
          voice: { name: name },
          //lang:  { 'xml:lang': info }
        };
      }

      Object.keys(info).forEach((tag: string) => {
        const attributes = info[tag];
        this.tag(tag, attributes);
      });
      return true;
    }
    return false;
  }

  public voiceTag(tag: string, value: string) {
    const rawName = (value || '').trim();
    const normalizedName = rawName.toLowerCase();
    const defaultName = rawName || 'device';
    const sentenceCaseName = this.base.sentenceCase(
      normalizedName || defaultName,
    );

    const optionCandidates = [rawName];

    if (normalizedName && normalizedName !== rawName) {
      optionCandidates.push(normalizedName);
    }

    if (
      sentenceCaseName &&
      !optionCandidates.includes(sentenceCaseName)
    ) {
      optionCandidates.push(sentenceCaseName);
    }

    for (const candidate of optionCandidates) {
      if (
        candidate &&
        this.voiceTagNamed(this.base.options && this.base.options.voices, candidate)
      ) {
        return;
      }
    }

    const validCandidates = [];

    if (normalizedName) {
      validCandidates.push(normalizedName);
    }

    if (rawName && rawName !== normalizedName) {
      validCandidates.push(rawName);
    }

    if (
      sentenceCaseName &&
      !validCandidates.includes(sentenceCaseName)
    ) {
      validCandidates.push(sentenceCaseName);
    }

    for (const candidate of validCandidates) {
      if (this.voiceTagNamed(this.base.validVoices, candidate)) {
        return;
      }
    }

    const fallback = this.base.getVoiceTagFallback(
      sentenceCaseName || defaultName,
    );

    if (fallback) {
      this.tag('voice', fallback);
    }
  }
}

type Dictionary<T> = { [key: string]: T };

export abstract class SsmlFormatterBase extends FormatterBase {
  public validVoices: Record<string, any> = {};

  public static readonly XML_ESCAPE_MAPPING: Dictionary<string> = {
    '<': '&lt;',
    '>': '&gt;',
    '&': '&amp;',
    '"': '&quot;',
    "'": '&apos;',
  };

  public static readonly XML_UNESCAPE_MAPPING: Dictionary<
    string
  > = (function swapJSON(dictionary: Dictionary<string>) {
    return Object.keys(dictionary).reduce((acc: any, key: string) => {
      acc[dictionary[key]] = key;
      return acc;
    }, {});
  })(SsmlFormatterBase.XML_ESCAPE_MAPPING);

  protected constructor(public options: SpeechOptions) {
    super(options);
  }

  protected sectionTags: string[] = [];

  protected modifierKeyMappings: any = {
    chars: 'characters',
    cardinal: 'number',
    digits: 'characters',
    bleep: 'expletive',
    phone: 'telephone',
    vol: 'volume',
  };

  public ssmlTagSortOrder: string[] = [
    'emphasis',
    'say-as',
    'prosody',
    'amazon:domain',
    'amazon:effect',
    'amazon:emotion',
    'voice',
    'lang',
    'sub',
    'phoneme',
  ];

  protected modifierKeyToSsmlTagMappings: any = {
    emphasis: 'emphasis',
    address: 'say-as',
    number: 'say-as',
    characters: 'say-as',
    expletive: 'say-as',
    fraction: 'say-as',
    interjection: 'say-as',
    ordinal: 'say-as',
    telephone: 'say-as',
    unit: 'say-as',
    time: 'say-as',
    date: 'say-as',
    whisper: null,
    sub: 'sub',
    ipa: 'phoneme',
    rate: 'prosody',
    pitch: 'prosody',
    volume: 'prosody',
    drc: null,
    timbre: null,
    lang: null,
    voice: null,
    dj: null,
    defaults: null,
    newscaster: null,
    excited: null,
    disappointed: null,
  };

  public format(ast: any): string {
    const lines = this.formatFromAst(ast, []);

    return lines.join('');
  }

  protected addSectionStartTag(
    tagsSortedAsc: string[],
    so: any,
    lines: string[],
  ) {
    this.sectionTags = [...tagsSortedAsc].reverse();

    for (let index = 0; index < tagsSortedAsc.length; index++) {
      const tag = tagsSortedAsc[index];
      const attrs = so.tags[tag].attrs;
      lines.push('\n');
      lines.push(this.startTag(tag, attrs, false));
    }
  }

  protected addSectionEndTag(lines: string[]) {
    if (this.sectionTags.length > 0) {
      // add previous end tag(s)
      for (let index = 0; index < this.sectionTags.length; index++) {
        const tag = this.sectionTags[index];
        lines.push(this.endTag(tag, false));
        lines.push('\n');
      }
    }
  }

  // Adds tagged content
  protected addTag(
    tag: string,
    ast: any,
    newLine: boolean,
    newLineAfterEnd: boolean,
    attr: any,
    lines: string[],
  ): string[] {
    lines.push(this.startTag(tag, attr, newLine));

    this.processAst(ast, lines);

    lines.push(this.endTag(tag, newLine));

    if (newLineAfterEnd) {
      lines.push('\n');
    }

    return lines;
  }

  protected addSpeakTag(
    ast: any,
    newLine: boolean,
    newLineAfterEnd: boolean,
    attr: any,
    lines: string[],
  ): string[] {
    lines.push(this.startTag('speak', attr, newLine));

    this.processAst(ast, lines);

    this.addSectionEndTag(lines);

    lines.push(this.endTag('speak', newLine));

    if (newLineAfterEnd) {
      lines.push('\n');
    }

    return lines;
  }

  protected addComment(commentText: string, lines: string[]): string[] {
    lines.push(`<!-- ${commentText} -->\n`);
    return lines;
  }

  // Returns the SSML for a start tag
  protected startTag(tag: string, attr: any, newLine: boolean = false): string {
    let attrStr = '';
    if (attr) {
      attrStr =
        ' ' +
        Object.keys(attr)
          .map((k: any) => {
            return k + '="' + attr[k] + '"';
          })
          .join(' ');
    }

    return '<' + tag + attrStr + '>' + (newLine ? '\n' : '');
  }

  // Returns the SSML for an end tag
  protected endTag(tag: string, newLine: boolean = false): string {
    return (newLine ? '\n' : '') + '</' + tag + '>';
    // return '</' + tag + '>';
  }

  protected voidTag(tag: string, attr: any): string {
    let attrStr = '';
    if (attr) {
      attrStr =
        ' ' +
        Object.keys(attr)
          .map((k: any) => {
            return k + '="' + attr[k] + '"';
          })
          .join(' ');
    }
    return '<' + tag + attrStr + '/>';
  }

  protected addTagWithAttrs(
    lines: string[],
    text: string,
    tag: string,
    attrs: any,
    forceEndTag: boolean = false,
  ): string[] {
    if (text || forceEndTag) {
      lines.push(this.startTag(tag, attrs));

      if (text) {
        lines.push(text);
      }

      lines.push(this.endTag(tag, false));
    } else {
      lines.push(this.voidTag(tag, attrs));
    }

    return lines;
  }

  protected getTagWithAttrs(text: string, tag: string, attrs: any): string {
    let lines: string[] = [];

    if (text) {
      lines.push(this.startTag(tag, attrs));
      lines.push(text);
      lines.push(this.endTag(tag, false));
    } else {
      lines.push(this.voidTag(tag, attrs));
    }

    return lines.join('');
  }

  public sentenceCase(text: string) {
    return text
      .replace(/[a-z]/i, (letter: string) => {
        return letter.toUpperCase();
      })
      .trim();
  }

  public escapeXmlCharacters(unescaped: string): string {
    // Only process once (by unescaping)
    let revPattern = `${Object.keys(
      SsmlFormatterBase.XML_UNESCAPE_MAPPING,
    ).join('|')}]`;
    let reversed = unescaped.replace(
      new RegExp(revPattern, 'g'),
      (s: string) => SsmlFormatterBase.XML_UNESCAPE_MAPPING[s],
    );

    // Escape XML characters
    let pattern = `[${Object.keys(SsmlFormatterBase.XML_ESCAPE_MAPPING).join(
      '',
    )}]`;
    let escaped = reversed.replace(
      new RegExp(pattern, 'g'),
      (s: string) => SsmlFormatterBase.XML_ESCAPE_MAPPING[s],
    );

    // console.log([unescaped, reversed, escaped].join('\n'));

    return escaped;
  }

  public getVoiceTagFallback(name: string): Record<string, string> | null {
    return null;
  }

  protected abstract formatFromAst(ast: any, lines: string[]): string[];
}
