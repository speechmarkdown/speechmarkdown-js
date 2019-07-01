import { SpeechOptions } from '../SpeechOptions';
import { FormatterBase } from './FormatterBase';

export abstract class SsmlFormatterBase extends FormatterBase {

  protected constructor(protected options: SpeechOptions) {
    // this.options = options;
    super(options);
  }

  public format(ast: any): string {
    const lines = this.formatFromAst(ast, []);

    // tslint:disable-next-line: no-unnecessary-local-variable
    const ssml = lines.join('');
    return ssml;
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

  protected addBreakTime(lines: string[], time: string): string[] {
    lines.push(this.voidTag('break', { time: time }));
    return lines;
  }

  protected addBreakStrength(lines: string[], strength: string): string[] {
    lines.push(this.voidTag('break', { strength: strength }));
    return lines;
  }

  protected addEmphasis(lines: string[], text: string, level: string): string[] {
    lines.push(this.startTag('emphasis', { level: level }));
    lines.push(text);
    lines.push(this.endTag('emphasis', false));

    return lines;
  }

  protected addSayAs(lines: string[], text: string, interpretAs: string): string[] {
    lines.push(this.startTag('say-as', { 'interpret-as': interpretAs }));
    lines.push(text);
    lines.push(this.endTag('say-as', false));

    return lines;
  }

  protected addSayAsTime(lines: string[], text: string, interpretAs: string, format: string): string[] {
    lines.push(this.startTag('say-as', { 'interpret-as': interpretAs, format: format }));
    lines.push(text);
    lines.push(this.endTag('say-as', false));

    return lines;
  }

  protected addSayAsDate(lines: string[], text: string, interpretAs: string, format: string): string[] {
    lines.push(this.startTag('say-as', { 'interpret-as': interpretAs, format: format }));
    lines.push(text);
    lines.push(this.endTag('say-as', false));

    return lines;
  }

  protected addProsody(lines: string[], text: string, attr: any): string[] {
    lines.push(this.startTag('prosody', attr));
    lines.push(text);
    lines.push(this.endTag('prosody', false));

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
      attrStr = ' ' + Object.keys(attr).map((k) => {
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
      attrStr = ' ' + Object.keys(attr).map((k) => {
        return k + '="' + attr[k] + '"';
      }).join(' ');
    }
    return '<' + tag + attrStr + '/>';
  }

  protected abstract formatFromAst(ast: any, lines: string[]): string[];
}
