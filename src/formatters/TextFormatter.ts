import { SpeechOptions } from '../SpeechOptions';
import { FormatterBase } from './FormatterBase';

export class TextFormatter extends FormatterBase {

  constructor(protected options: SpeechOptions) {
    super(options);
  }

  public format(ast: any): string {
    const lines = this.formatFromAst(ast, []);
    let txt = lines.join('').trim();

    // replace multiple whitespace with a single space
    // tslint:disable-next-line: no-regex-spaces
    txt = txt.replace(/  +/g, ' ');

    return txt;
  }

  protected formatFromAst(ast: any, lines: string[] = []): string[] {

    switch (ast.name) {
      case 'document': {
        this.processAst(ast.children, lines);
        return lines;
      }
      case 'paragraph': {
        this.processAst(ast.children, lines);
        return lines;
      }
      case 'simpleLine': {
        this.processAst(ast.children, lines);
        return lines;
      }
      case 'lineEnd': {
        lines.push(ast.allText);
        return lines;
      }
      case 'emptyLine': {
        if (this.options.preserveEmptyLines) {
          lines.push(ast.allText);
        }

        return lines;
      }
      case 'plainText':
      case 'plainTextEmphasis':
      case 'plainTextPhone':
      case 'plainTextModifier': {
        lines.push(ast.allText);
        return lines;
      }

      default: {
        this.processAst(ast.children, lines);
        return lines;
      }
    }
  }
}

