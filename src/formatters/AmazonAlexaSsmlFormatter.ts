import { SpeechOptions } from '../SpeechOptions';
import { SsmlFormatterBase } from './SsmlFormatterBase';

export class AmazonAlexaSsmlFormatter extends SsmlFormatterBase {

  private validVoices: any = {
    'Ivy': 'en-US',
    'Joanna': 'en-US',
    'Joey': 'en-US',
    'Justin': 'en-US',
    'Kendra': 'en-US',
    'Kimberly': 'en-US',
    'Matthew': 'en-US',
    'Salli': 'en-US',
    'Nicole': 'en-AU',
    'Russell': 'en-AU',
    'Amy': 'en-GB',
    'Brian': 'en-GB',
    'Emma': 'en-GB',
    'Aditi': 'en-IN',
    'Raveena': 'en-IN',
    'Hans': 'de-DE',
    'Marlene': 'de-DE',
    'Vicki': 'de-DE',
    'Conchita': 'es-ES',
    'Enrique': 'es-ES',
    'Carla': 'it-IT',
    'Giorgio': 'it-IT',
    'Mizuki': 'ja-JP',
    'Takumi': 'ja-JP',
    'Celine': 'fr-FR',
    'Lea': 'fr-FR',
    'Mathieu': 'fr-FR',
  };

  constructor(public options: SpeechOptions) {
    super(options);

    this.modifierKeyToSsmlTagMappings.whisper = 'amazon:effect';
    this.modifierKeyToSsmlTagMappings.lang = 'lang';
    this.modifierKeyToSsmlTagMappings.voice = 'voice';
    this.modifierKeyToSsmlTagMappings.dj = 'amazon:domain';
    this.modifierKeyToSsmlTagMappings.newscaster = 'amazon:domain';
  }

  // tslint:disable-next-line: max-func-body-length
  private getTextModifierObject(ast: any): any {
    let textModifierObject = {
      tags: {}
    };

    for (let index = 0; index < ast.children.length; index++) {
      const child = ast.children[index];

      switch (child.name) {
        case 'plainText':
        case 'plainTextSpecialChars':
        case 'plainTextEmphasis':
        case 'plainTextPhone':
        case 'plainTextModifier': {
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

            case 'lang': {
              if (!textModifierObject.tags[ssmlTag]) {
                textModifierObject.tags[ssmlTag] = { sortId: sortId, attrs: null };
              }
              textModifierObject.tags[ssmlTag].attrs = { 'xml:lang': value };
              break;
            }

            case 'voice': {
              const name = this.sentenceCase(value || 'device')

              if (this.validVoices[name]) {
                if (!textModifierObject.tags[ssmlTag]) {
                  textModifierObject.tags[ssmlTag] = { sortId: sortId, attrs: null };
                }

                textModifierObject.tags[ssmlTag].attrs = { 'name': name };
              }
              break;
            }

            default: {

            }

          }
          break;
        }
      }

    }

    return textModifierObject;
  }

  // tslint:disable-next-line: max-func-body-length
  private getSectionObject(ast: any): any {
    let sectionObject = {
      tags: {}
    };

    for (let index = 0; index < ast.children.length; index++) {
      const child = ast.children[index];

      if (child.name === 'sectionModifierKeyOptionalValue') {
        let key = child.children[0].allText;
        const value = child.children.length === 2 ? child.children[1].allText : '';
        const ssmlTag = this.modifierKeyToSsmlTagMappings[key];
        const sortId = this.ssmlTagSortOrder.indexOf(ssmlTag);

        switch (key) {

          case 'lang': {
            if (!sectionObject.tags[ssmlTag]) {
              sectionObject.tags[ssmlTag] = { sortId: sortId, attrs: null };
            }
            sectionObject.tags[ssmlTag].attrs = { 'xml:lang': value };
            break;
          }

          case 'voice': {
            const name = this.sentenceCase(value || 'device')

            if (this.validVoices[name]) {
              if (!sectionObject.tags[ssmlTag]) {
                sectionObject.tags[ssmlTag] = { sortId: sortId, attrs: null };
              }

              sectionObject.tags[ssmlTag].attrs = { 'name': name };
            }
            break;
          }

          case 'dj': {
            if (!sectionObject.tags[ssmlTag]) {
              sectionObject.tags[ssmlTag] = { sortId: sortId, attrs: null };
            }
            sectionObject.tags[ssmlTag].attrs = { 'name': 'music' };
            break;
          }

          case 'newscaster': {
            if (!sectionObject.tags[ssmlTag]) {
              sectionObject.tags[ssmlTag] = { sortId: sortId, attrs: null };
            }
            sectionObject.tags[ssmlTag].attrs = { 'name': 'news' };
            break;
          }

          case 'defaults': {
            break;
          }


          default: {

          }

        }

      }

    }

    return sectionObject;
  }


  // tslint:disable-next-line: max-func-body-length
  protected formatFromAst(ast: any, lines: string[] = []): string[] {

    switch (ast.name) {
      case 'document': {
        if (this.options.includeFormatterComment) {
          this.addComment('Speech Markdown for Amazon Alexa', lines);
        }

        if (this.options.includeSpeakTag) {
          return this.addSpeakTag(ast.children, true, false, null, lines);
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
        return this.addTagWithAttrs(lines, null, 'break', { time: time });
      }
      case 'shortEmphasisModerate': {
        const text = ast.children[0].allText;
        return this.addTagWithAttrs(lines, text, 'emphasis', { level: 'moderate' });
      }
      case 'shortEmphasisStrong': {
        const text = ast.children[0].allText;
        return this.addTagWithAttrs(lines, text, 'emphasis', { level: 'strong' });
      }
      case 'shortEmphasisNone': {
        const text = ast.children[0].allText;
        return this.addTagWithAttrs(lines, text, 'emphasis', { level: 'none' });
      }
      case 'shortEmphasisReduced': {
        const text = ast.children[0].allText;
        return this.addTagWithAttrs(lines, text, 'emphasis', { level: 'reduced' });
      }
      case 'textModifier': {
        const tmo = this.getTextModifierObject(ast);

        const tagsSortedDesc = Object.keys(tmo.tags).sort((a: any, b: any) => { return tmo.tags[b].sortId - tmo.tags[a].sortId });

        let inner = tmo.text;

        for (let index = 0; index < tagsSortedDesc.length; index++) {
          const tag = tagsSortedDesc[index];
          const attrs = tmo.tags[tag].attrs;

          inner = this.getTagWithAttrs(inner, tag, attrs);

        }
        lines.push(inner);

        return lines;
      }
      case 'section': {
        const so = this.getSectionObject(ast);

        const tagsSortedAsc = Object.keys(so.tags).sort((a: any, b: any) => { return so.tags[a].sortId - so.tags[b].sortId });

        this.addSectionEndTag(lines);
        this.addSectionStartTag(tagsSortedAsc, so, lines);

        return lines;
      }
      case 'audio': {
        const url = ast.children[0].allText;
        return this.addTagWithAttrs(lines, null, 'audio', { src: url });
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
      case 'plainTextSpecialChars': {
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
