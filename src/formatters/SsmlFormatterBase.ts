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

  protected addBreak(ast: any, lines: string[]): string[] {
    const child = ast.children[0];
    if (child.name === 'time') {
      lines.push(this.voidTag('break', { time: child.allText }));
    } else if (child.name === 'strength') {
      lines.push(this.voidTag('break', { strength: child.allText }));
    }

    return lines;
  }

  protected addEmphasis(ast: any, lines: string[], level: string): string[] {
    const child = ast.children[0];
    lines.push(this.startTag('emphasis', { level: level }));
    lines.push(child.allText);
    lines.push(this.endTag('emphasis', false));

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
