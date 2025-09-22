import { SpeechOptions } from '../SpeechOptions';
import { FormatterBase } from './FormatterBase';

export class TextFormatter extends FormatterBase {
  constructor(public options: SpeechOptions) {
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
      case 'plainTextSpecialChars':
      case 'plainTextEmphasis':
      case 'plainTextPhone':
      case 'plainTextModifier': {
        lines.push(ast.allText);
        return lines;
      }

      case 'shortIpa':
      case 'shortSub': {
        const textNode = ast.children?.find(
          (child: any) =>
            child &&
            (child.name === 'parenthesized' || child.name === 'plainTextModifier'),
        );
        const text =
          textNode && textNode.name === 'parenthesized'
            ? this.extractParenthesizedText(textNode)
            : textNode?.allText || '';
        if (text) {
          lines.push(text);
        }
        return lines;
      }

      case 'audio':
        return lines;

      default: {
        this.processAst(ast.children, lines);
        return lines;
      }
    }
  }

  private extractParenthesizedText(node: any): string {
    if (!node || typeof node.allText !== 'string' || node.allText.length < 2) {
      return '';
    }

    const content = node.allText.substring(1, node.allText.length - 1);
    return content.trim();
  }
}
