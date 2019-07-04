import { SpeechOptions } from '../SpeechOptions';
import { SsmlFormatterBase } from './SsmlFormatterBase';

export class AmazonAlexaSsmlFormatter extends SsmlFormatterBase {

  constructor(public options: SpeechOptions) {
    super(options);
  }

  // tslint:disable-next-line: max-func-body-length
  protected formatFromAst(ast: any, lines: string[] = []): string[] {

    switch (ast.name) {
      case 'document': {
        if (this.options.includeFormatterComment) {
          this.addComment('Speech Markdown for Amazon Alexa', lines);
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
          return this.addTag('p', ast.children, true, false, null, lines);
        } else {
          this.processAst(ast.children, lines);
          return lines;
        }
      }
      case 'shortBreak': {
        const time = ast.children[0].allText;
        return this.addBreakTime(lines, time);
      }
      case 'shortEmphasisModerate': {
        const text = ast.children[0].allText;
        return this.addEmphasis(lines, text, 'moderate');
      }
      case 'shortEmphasisStrong': {
        const text = ast.children[0].allText;
        return this.addEmphasis(lines, text, 'strong');
      }
      case 'shortEmphasisNone': {
        const text = ast.children[0].allText;
        return this.addEmphasis(lines, text, 'none');
      }
      case 'shortEmphasisReduced': {
        const text = ast.children[0].allText;
        return this.addEmphasis(lines, text, 'reduced');
      }
      case 'textModifier': {
        const text = ast.children[0].allText;
        const key = ast.children[1].allText;
        const value = ast.children.length === 3 ? ast.children[2].allText : '';

        switch (key) {
          case 'emphasis': {
            const level = value || 'moderate';
            return this.addEmphasis(lines, text, level);
          }

          case 'address':
          case 'characters':
          case 'expletive':
          case 'fraction':
          case 'interjection':
          case 'number':
          case 'ordinal':
          case 'telephone':
          case 'unit': {
            return this.addSayAs(lines, text, key);
          }

          case 'chars': {
            return this.addSayAs(lines, text, 'characters');
          }

          case 'bleep': {
            return this.addSayAs(lines, text, 'expletive');
          }

          case 'phone': {
            return this.addSayAs(lines, text, 'telephone');
          }

          case 'date': {
            const format = value || 'ymd';
            return this.addSayAsDate(lines, text, key, format);
          }

          case 'time': {
            const format = value || 'hms12';
            return this.addSayAsTime(lines, text, key, format);
          }

          case 'whisper': {
            return this.addWhisper(lines, text);
          }

          case 'ipa': {
            const phoneme = value || '';
            return this.addPhoneme(lines, text, 'ipa', phoneme);
          }

          case 'sub': {
            const alias = value || '';
            return this.addSub(lines, text, alias);
          }

          default: {
            return lines;
          }
        }
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

  protected addWhisper(lines: string[], text: string): string[] {
    lines.push(this.startTag('amazon:effect', { 'name': 'whispered' }));
    lines.push(text);
    lines.push(this.endTag('amazon:effect', false));

    return lines;
  }

  protected addPhoneme(lines: string[], text: string, alphabet: string, ph: string): string[] {
    lines.push(this.startTag('phoneme', { 'alphabet': alphabet, 'ph': ph }));
    lines.push(text);
    lines.push(this.endTag('phoneme', false));

    return lines;
  }
}
