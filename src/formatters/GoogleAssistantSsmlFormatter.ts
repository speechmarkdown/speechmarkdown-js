import { SpeechOptions } from '../SpeechOptions';
import { SsmlFormatterBase, TagsObject } from './SsmlFormatterBase';
import { GOOGLE_CLOUD_TTS_VOICES } from './data/googleCloudVoices';

export class GoogleAssistantSsmlFormatter extends SsmlFormatterBase {
  public validVoices: Record<string, any> = GOOGLE_CLOUD_TTS_VOICES;

  constructor(public options: SpeechOptions) {
    super(options);

    this.modifierKeyToSsmlTagMappings.interjection = null;
    this.modifierKeyToSsmlTagMappings.whisper = 'prosody';
    this.modifierKeyToSsmlTagMappings.lang = 'lang';
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
              textModifierObject.tag(ssmlTag, {
                volume: 'x-soft',
                rate: 'slow',
              });
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
          this.addComment(
            'Converted from Speech Markdown to SSML for Google Assistant',
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
      case 'markTag': {
        const name = ast.children[0].allText;
        return this.addTagWithAttrs(lines, null, 'mark', { name: name });
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

        if (tmo.textOnly) {
          // Quick return if tag is not supported
          lines.push(tmo.text);
          return lines;
        }

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
        if (ast.children.length === 2) {
          const caption = ast.children[0].allText;
          const url = ast.children[1].allText.replace(/&/g, '&amp;');
          lines.push(this.startTag('audio', { src: url }));
          lines.push('\n');
          lines.push(this.startTag('desc', null));
          lines.push(caption);
          lines.push(this.endTag('desc'));
          lines.push('\n');
          lines.push(this.endTag('audio', false));
          return lines;
        } else {
          const url = ast.children[0].allText.replace(/&/g, '&amp;');
          return this.addTagWithAttrs(lines, null, 'audio', { src: url });
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
