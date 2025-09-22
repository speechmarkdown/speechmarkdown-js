import { SpeechOptions } from '../SpeechOptions';
import { SsmlFormatterBase, TagsObject } from './SsmlFormatterBase';
import { AMAZON_POLLY_ALL_VOICES } from './data/amazonPollyVoices';

export class AmazonAlexaSsmlFormatter extends SsmlFormatterBase {
  public validVoices: Record<string, any> = AMAZON_POLLY_ALL_VOICES;

  private validEmotionIntensity: string[] = ['low', 'medium', 'high'];

  constructor(public options: SpeechOptions) {
    super(options);

    this.modifierKeyToSsmlTagMappings.whisper = 'amazon:effect';
    this.modifierKeyToSsmlTagMappings.lang = 'lang';
    this.modifierKeyToSsmlTagMappings.voice = 'voice';
    this.modifierKeyToSsmlTagMappings.dj = 'amazon:domain';
    this.modifierKeyToSsmlTagMappings.newscaster = 'amazon:domain';
    this.modifierKeyToSsmlTagMappings.excited = 'amazon:emotion';
    this.modifierKeyToSsmlTagMappings.disappointed = 'amazon:emotion';
  }

  public getVoiceTagFallback(name: string): Record<string, string> | null {
    if (name.toLowerCase() === 'device') {
      return null;
    }

    return { name };
  }

  // tslint:disable-next-line: max-func-body-length
  private getTextModifierObject(ast: any): any {
    let textModifierObject = new TagsObject(this);

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
          const value =
            child.children.length === 2 ? child.children[1].allText : '';
          const ssmlTag = this.modifierKeyToSsmlTagMappings[key];

          switch (key) {
            case 'emphasis':
              textModifierObject.tag(ssmlTag, { level: value || 'moderate' });
              break;

            case 'address':
            case 'characters':
            case 'expletive':
            case 'fraction':
            case 'interjection':
            case 'number':
            case 'ordinal':
            case 'telephone':
            case 'unit':
              textModifierObject.tag(ssmlTag, { 'interpret-as': key });
              break;

            case 'date':
              textModifierObject.tag(ssmlTag, {
                'interpret-as': key,
                format: value || 'ymd',
              });
              break;

            case 'time':
              textModifierObject.tag(ssmlTag, {
                'interpret-as': key,
                format: value || 'hms12',
              });
              break;

            case 'whisper':
              textModifierObject.tag(ssmlTag, { name: 'whispered' });
              break;

            case 'ipa':
              textModifierObject.tag(ssmlTag, { alphabet: key, ph: value });
              break;

            case 'sub':
              textModifierObject.tag(ssmlTag, { alias: value });
              break;

            case 'volume':
            case 'rate':
            case 'pitch': {
              const attrs = {};
              attrs[key] = value || 'medium';
              textModifierObject.tag(ssmlTag, attrs, true);
              break;
            }

            case 'lang':
              textModifierObject.tag(ssmlTag, { 'xml:lang': value });
              break;

            case 'voice':
              textModifierObject.voiceTag(key, value);
              break;

            case 'excited':
            case 'disappointed': {
              const intensity = (value || 'medium').toLowerCase();

              if (this.validEmotionIntensity.includes(intensity)) {
                textModifierObject.tag(ssmlTag, {
                  name: key,
                  intensity: intensity,
                });
                break;
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
    let sectionObject = new TagsObject(this);

    for (let index = 0; index < ast.children.length; index++) {
      const child = ast.children[index];

      if (child.name === 'sectionModifierKeyOptionalValue') {
        let key = child.children[0].allText;
        const value =
          child.children.length === 2 ? child.children[1].allText : '';
        const ssmlTag = this.modifierKeyToSsmlTagMappings[key];

        switch (key) {
          case 'lang':
            sectionObject.tag(ssmlTag, { 'xml:lang': value });
            break;

          case 'voice':
            sectionObject.voiceTag(key, value);
            break;

          case 'dj':
            sectionObject.tag(ssmlTag, { name: 'music' });
            break;

          case 'newscaster':
            sectionObject.tag(ssmlTag, { name: 'news' });
            break;

          case 'defaults': {
            break;
          }

          case 'excited':
          case 'disappointed': {
            const intensity = (value || 'medium').toLowerCase();

            if (this.validEmotionIntensity.includes(intensity)) {
              sectionObject.tag(ssmlTag, { name: key, intensity: intensity });
              break;
            }
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
          this.addComment(
            'Converted from Speech Markdown to SSML for Amazon Alexa',
            lines,
          );
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
      case 'break': {
        const val = ast.children[0].allText;
        let attrs = {};
        switch (ast.children[0].children[0].name) {
          case 'breakStrengthValue':
            attrs = { strength: val };
            break;
          case 'time':
            attrs = { time: val };
            break;
        }
        return this.addTagWithAttrs(lines, null, 'break', attrs);
      }
      case 'shortEmphasisModerate': {
        const text = ast.children[0].allText;
        return this.addTagWithAttrs(lines, text, 'emphasis', {
          level: 'moderate',
        });
      }
      case 'shortEmphasisStrong': {
        const text = ast.children[0].allText;
        return this.addTagWithAttrs(lines, text, 'emphasis', {
          level: 'strong',
        });
      }
      case 'shortEmphasisNone': {
        const text = ast.children[0].allText;
        return this.addTagWithAttrs(lines, text, 'emphasis', { level: 'none' });
      }
      case 'shortEmphasisReduced': {
        const text = ast.children[0].allText;
        return this.addTagWithAttrs(lines, text, 'emphasis', {
          level: 'reduced',
        });
      }
      case 'textModifier': {
        const tmo = this.getTextModifierObject(ast);

        const tagsSortedDesc = Object.keys(tmo.tags).sort((a: any, b: any) => {
          return tmo.tags[b].sortId - tmo.tags[a].sortId;
        });

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

        const tagsSortedAsc = Object.keys(so.tags).sort((a: any, b: any) => {
          return so.tags[a].sortId - so.tags[b].sortId;
        });

        this.addSectionEndTag(lines);
        this.addSectionStartTag(tagsSortedAsc, so, lines);

        return lines;
      }
      case 'audio': {
        // Ignore the caption.
        const index = ast.children.length === 2 ? 1 : 0;
        const url = ast.children[index].allText.replace(/&/g, '&amp;');
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
        let text = this.options.escapeXmlSymbols
          ? this.escapeXmlCharacters(ast.allText)
          : ast.allText;
        lines.push(text);
        return lines;
      }

      default: {
        this.processAst(ast.children, lines);
        return lines;
      }
    }
  }
}
