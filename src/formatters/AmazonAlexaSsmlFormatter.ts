import { SpeechOptions } from '../SpeechOptions';
import { SsmlFormatterBase } from './SsmlFormatterBase';

export class AmazonAlexaSsmlFormatter extends SsmlFormatterBase {

  private modifierKeyMappings: any = {
    'chars': 'characters',
    'bleep': 'expletive',
    'phone': 'telephone',
    'vol': 'volume',
  };

  private ssmlTagSortOrder: string[] = ['emphasis', 'say-as', 'prosody', 'amazon:effect', 'sub', 'phoneme'];

  private modifierKeyToSsmlTagMappings: any = {
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
    'whisper': 'amazon:effect',
    'sub': 'sub',
    'ipa': 'phoneme',
    'rate': 'prosody',
    'pitch': 'prosody',
    'volume': 'prosody',
  };

  constructor(public options: SpeechOptions) {
    super(options);
  }

  // tslint:disable-next-line: max-func-body-length
  private getTextModifierObject(ast: any): any {
    let textModifierObject = {
      tags: {}
    };

    for (let index = 0; index < ast.children.length; index++) {
      const child = ast.children[index];

      switch (child.name) {
        case 'plainText': {
          textModifierObject['text'] = child.allText;
          break;
        }
        case 'textModifierKeyOptionalValue': {
          let key = child.children[0].allText;
          key = this.modifierKeyMappings[key] || key;
          const value = child.children.length === 2 ? child.children[1].allText : '';
          const ssmlTag = this.modifierKeyToSsmlTagMappings[key];
          const sortId = this.ssmlTagSortOrder.indexOf(ssmlTag);

          switch (key) {
            case 'emphasis': {
              if (!textModifierObject.tags[ssmlTag]) {
                textModifierObject.tags[ssmlTag] = { sortId: sortId, attrs: null };
              }
              textModifierObject.tags[ssmlTag].attrs = { level: value || 'moderate' };
              break;
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
              if (!textModifierObject.tags[ssmlTag]) {
                textModifierObject.tags[ssmlTag] = { sortId: sortId, attrs: null };
              }
              textModifierObject.tags[ssmlTag].attrs = { 'interpret-as': key };
              break;
            }

            case 'date': {
              if (!textModifierObject.tags[ssmlTag]) {
                textModifierObject.tags[ssmlTag] = { sortId: sortId, attrs: null };
              }
              textModifierObject.tags[ssmlTag].attrs = { 'interpret-as': key, format: value || 'ymd' };
              break;
            }

            case 'time': {
              if (!textModifierObject.tags[ssmlTag]) {
                textModifierObject.tags[ssmlTag] = { sortId: sortId, attrs: null };
              }
              textModifierObject.tags[ssmlTag].attrs = { 'interpret-as': key, format: value || 'hms12' };
              break;
            }

            case 'whisper': {
              if (!textModifierObject.tags[ssmlTag]) {
                textModifierObject.tags[ssmlTag] = { sortId: sortId, attrs: null };
              }
              textModifierObject.tags[ssmlTag].attrs = { name: 'whispered' };
              break;
            }

            case 'ipa': {
              if (!textModifierObject.tags[ssmlTag]) {
                textModifierObject.tags[ssmlTag] = { sortId: sortId, attrs: null };
              }
              textModifierObject.tags[ssmlTag].attrs = { alphabet: key, ph: value };
              break;
            }

            case 'sub': {
              if (!textModifierObject.tags[ssmlTag]) {
                textModifierObject.tags[ssmlTag] = { sortId: sortId, attrs: null };
              }
              textModifierObject.tags[ssmlTag].attrs = { alias: value };
              break;
            }

            case 'volume':
            case 'rate':
            case 'pitch': {

              if (!textModifierObject.tags[ssmlTag]) {
                textModifierObject.tags[ssmlTag] = { sortId: sortId, attrs: null };
              }

              const attrs = {};
              attrs[key] = value || 'medium';
              textModifierObject.tags[ssmlTag].attrs = { ...textModifierObject.tags[ssmlTag].attrs, ...attrs };

              break;
            }
            default: {

            }

          }
          break;
        }
      }

    }
    // const text = ast.children[0].allText;
    // const keyValuePair = ast.children[1];

    // const key = keyValuePair.children[0].allText;
    // const value = keyValuePair.children.length === 2 ? keyValuePair.children[1].allText : '';


    return textModifierObject;
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
        const tmo = this.getTextModifierObject(ast);

        const tagsSorted = Object.keys(tmo.tags).sort((a: any, b: any) => { return a.sortId - b.sortId });

        for (let index = 0; index < tagsSorted.length; index++) {
          const tag = tagsSorted[index];
          const attrs = tmo.tags[tag].attrs;

          this.addTagWithAttrs(lines, tmo.text, tag, attrs);

        }

        // if no tags, add text only
        if (tagsSorted.length === 0) {
          lines.push(tmo.text);
        }

        return lines;
        // for (const tag in tmo.tags) {
        //   tags.push()
        //   if (object.hasOwnProperty(key)) {
        //     const element = object[key];

        //   }
        // }

        // const text = ast.children[0].allText;
        // const keyValuePair = ast.children[1];

        // const key = keyValuePair.children[0].allText;
        // const value = keyValuePair.children.length === 2 ? keyValuePair.children[1].allText : '';

        // switch (key) {
        //   case 'emphasis': {
        //     const level = value || 'moderate';
        //     return this.addEmphasis(lines, text, level);
        //   }

        //   case 'address':
        //   case 'characters':
        //   case 'expletive':
        //   case 'fraction':
        //   case 'interjection':
        //   case 'number':
        //   case 'ordinal':
        //   case 'telephone':
        //   case 'unit': {
        //     return this.addSayAs(lines, text, key);
        //   }

        //   case 'chars': {
        //     return this.addSayAs(lines, text, 'characters');
        //   }

        //   case 'bleep': {
        //     return this.addSayAs(lines, text, 'expletive');
        //   }

        //   case 'phone': {
        //     return this.addSayAs(lines, text, 'telephone');
        //   }

        //   case 'date': {
        //     const format = value || 'ymd';
        //     return this.addSayAsDate(lines, text, key, format);
        //   }

        //   case 'time': {
        //     const format = value || 'hms12';
        //     return this.addSayAsTime(lines, text, key, format);
        //   }

        //   case 'whisper': {
        //     return this.addWhisper(lines, text);
        //   }

        //   case 'ipa': {
        //     const phoneme = value || '';
        //     return this.addPhoneme(lines, text, 'ipa', phoneme);
        //   }

        //   case 'sub': {
        //     const alias = value || '';
        //     return this.addSub(lines, text, alias);
        //   }

        //   default: {
        //     return lines;
        //   }
        // }
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
