import { SpeechOptions } from '../SpeechOptions';
import { SsmlFormatterBase } from './SsmlFormatterBase';

export class GoogleAssistantSsmlFormatter extends SsmlFormatterBase {

  constructor(public options: SpeechOptions) {
    super(options);
  }

  protected formatFromAst(ast: any, lines: string[] = []): string[] {

    switch (ast.name) {
      case 'document': {
        if (this.options.includeFormatterComment) {
          this.addComment('Speech Markdown for Google Assistant', lines);
        }

        if (this.options.includeSpeakTag) {
          return this.addTag('speak', ast.children, true, false, null, lines);
        } else {
          this.processAst(ast.children, lines);
          return lines;
        }
      }
      case 'paragraph': {
        if (this.options.includeParagraphTag) {
          return this.addTag('p', ast.children, true, true, null, lines);
        } else {
          this.processAst(ast.children, lines);
          return lines;
        }
      }
      case 'shortBreak': {
        return this.addBreak(ast, lines);
      }
      case 'shortEmphasisModerate': {
        return this.addEmphasis(ast, lines, 'moderate');
      }
      case 'shortEmphasisStrong': {
        return this.addEmphasis(ast, lines, 'strong');
      }
      case 'shortEmphasisNone': {
        return this.addEmphasis(ast, lines, 'none');
      }
      case 'shortEmphasisReduced': {
        return this.addEmphasis(ast, lines, 'reduced');
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
      case 'plainText': {
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
