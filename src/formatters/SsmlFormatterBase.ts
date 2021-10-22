import { SpeechOptions } from '../SpeechOptions';
import { FormatterBase } from './FormatterBase';

export class TagsObject {

  public tags;

  public constructor(){
    this.tags = {};
  }

  public tag( sortId: number, tag: string, attrs: object, augment:boolean = false ){
    if (!this.tags[tag]) {
      this.tags[tag] = { sortId: sortId, attrs: null };
    }
    if( augment ){
      this.tags[tag].attrs = { ...this.tags[tag].attrs, ...attrs };
    } else {
      this.tags[tag].attrs = attrs;
    }

  }
}

export abstract class SsmlFormatterBase extends FormatterBase {

  protected constructor(protected options: SpeechOptions) {
    super(options);
  }

  protected sectionTags: string[] = [];

  protected modifierKeyMappings: any = {
    'chars': 'characters',
    'bleep': 'expletive',
    'phone': 'telephone',
    'vol': 'volume',
  };

  protected ssmlTagSortOrder: string[] = [
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
    'emphasis': 'emphasis',
    'address': 'say-as',
    'number': 'say-as',
    'characters': 'say-as',
    'expletive': 'say-as',
    'fraction': 'say-as',
    'interjection': 'say-as',
    'ordinal': 'say-as',
    'telephone': 'say-as',
    'unit': 'say-as',
    'time': 'say-as',
    'date': 'say-as',
    'whisper': null,
    'sub': 'sub',
    'ipa': 'phoneme',
    'rate': 'prosody',
    'pitch': 'prosody',
    'volume': 'prosody',
    'lang': null,
    'voice': null,
    'dj': null,
    'defaults': null,
    'newscaster': null,
    'excited': null,
    'disappointed': null,
  };

  public format(ast: any): string {
    const lines = this.formatFromAst(ast, []);

    return lines.join('');
  }

  protected addSectionStartTag(tagsSortedAsc: string[], so: any, lines: string[]) {
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
  protected addTag(tag: string, ast: any, newLine: boolean, newLineAfterEnd: boolean, attr: any, lines: string[]): string[] {
    lines.push(this.startTag(tag, attr, newLine));

    this.processAst(ast, lines);

    lines.push(this.endTag(tag, newLine));

    if (newLineAfterEnd) {
      lines.push('\n');
    }

    return lines;
  }

  protected addSpeakTag(ast: any, newLine: boolean, newLineAfterEnd: boolean, attr: any, lines: string[]): string[] {
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
      attrStr = ' ' + Object.keys(attr).map((k: any) => {
        return k + '="' + attr[k] + '"';
      }).join(' ');
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
      attrStr = ' ' + Object.keys(attr).map((k: any) => {
        return k + '="' + attr[k] + '"';
      }).join(' ');
    }
    return '<' + tag + attrStr + '/>';
  }

  protected addTagWithAttrs(lines: string[], text: string, tag: string, attrs: any, forceEndTag:boolean = false): string[] {

    if (text || forceEndTag) {
      lines.push(this.startTag(tag, attrs));

      if (text) {
        lines.push(text);
      }

      lines.push(this.endTag(tag, false));
    }
    else {
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
    }
    else {
      lines.push(this.voidTag(tag, attrs));
    }

    return lines.join('');
  }

  protected sentenceCase(text: string) {
    return text.replace(/[a-z]/i, (letter: string) => {

      return letter.toUpperCase();

    }).trim();
  }

  protected abstract formatFromAst(ast: any, lines: string[]): string[];
}
