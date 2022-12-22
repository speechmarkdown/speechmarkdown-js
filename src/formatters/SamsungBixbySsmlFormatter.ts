import { SpeechOptions } from '../SpeechOptions';
import { SsmlFormatterBase, TagsObject } from './SsmlFormatterBase';

export class SamsungBixbySsmlFormatter extends SsmlFormatterBase {
  constructor(public options: SpeechOptions) {
    super(options);

    this.modifierKeyToSsmlTagMappings.emphasis = null;
    this.modifierKeyToSsmlTagMappings.address = null;
    this.modifierKeyToSsmlTagMappings.number = 'say-as';
    this.modifierKeyToSsmlTagMappings.characters = 'say-as';
    this.modifierKeyToSsmlTagMappings.expletive = null;
    this.modifierKeyToSsmlTagMappings.fraction = 'say-as';
    this.modifierKeyToSsmlTagMappings.interjection = null;
    this.modifierKeyToSsmlTagMappings.ordinal = 'say-as';
    this.modifierKeyToSsmlTagMappings.telephone = null;
    this.modifierKeyToSsmlTagMappings.unit = null;
    this.modifierKeyToSsmlTagMappings.time = null;
    this.modifierKeyToSsmlTagMappings.date = null;
    this.modifierKeyToSsmlTagMappings.sub = 'sub';
    this.modifierKeyToSsmlTagMappings.ipa = null;
    this.modifierKeyToSsmlTagMappings.rate = 'prosody';
    this.modifierKeyToSsmlTagMappings.pitch = 'prosody';
    this.modifierKeyToSsmlTagMappings.volume = 'prosody';
    this.modifierKeyToSsmlTagMappings.whisper = 'prosody';
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
            // case 'emphasis': {
            //   if (!textModifierObject.tags[ssmlTag]) {
            //     textModifierObject.tags[ssmlTag] = { sortId: sortId, attrs: null };
            //   }
            //   textModifierObject.tags[ssmlTag].attrs = { level: value || 'moderate' };
            //   break;
            // }

            // case 'address':
            // case 'expletive':
            // case 'telephone':
            // case 'unit':
            case 'fraction':
            case 'ordinal':
              textModifierObject.tag(ssmlTag, { 'interpret-as': key });
              break;

            case 'number':
              textModifierObject.tag(ssmlTag, { 'interpret-as': 'cardinal' });
              break;

            case 'characters': {
              let attrValue = 'digits';
              if (isNaN(textModifierObject.text as any)) {
                attrValue = 'spell-out';
              }

              textModifierObject.tag(ssmlTag, { 'interpret-as': attrValue });
              break;
            }

            // case 'date': {
            //   if (!textModifierObject.tags[ssmlTag]) {
            //     textModifierObject.tags[ssmlTag] = { sortId: sortId, attrs: null };
            //   }
            //   textModifierObject.tags[ssmlTag].attrs = { 'interpret-as': key, format: value || 'ymd' };
            //   break;
            // }

            // case 'time': {
            //   if (!textModifierObject.tags[ssmlTag]) {
            //     textModifierObject.tags[ssmlTag] = { sortId: sortId, attrs: null };
            //   }
            //   textModifierObject.tags[ssmlTag].attrs = { 'interpret-as': key, format: value || 'hms12' };
            //   break;
            // }

            case 'whisper':
              textModifierObject.tag(ssmlTag, {
                volume: 'x-soft',
                rate: 'slow',
              });
              break;

            // case 'ipa': {
            //   // Google Assistant does not support <phoneme> tag
            //   if (!textModifierObject.tags[ssmlTag]) {
            //     textModifierObject.tags[ssmlTag] = { sortId: sortId, attrs: null };
            //   }
            //   textModifierObject['textOnly'] = true;
            //   break;
            // }

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
  protected formatFromAst(ast: any, lines: string[] = []): string[] {
    switch (ast.name) {
      case 'document': {
        if (this.options.includeFormatterComment) {
          this.addComment(
            'Converted from Speech Markdown to SSML for Samsung Bixby',
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
      case 'shortEmphasisModerate':
      case 'shortEmphasisStrong':
      case 'shortEmphasisNone':
      case 'shortEmphasisReduced': {
        const text = ast.children[0].allText;
        if (text) {
          lines.push(text);
        }
        return lines;
      }
      // case 'shortEmphasisStrong': {
      //   const text = ast.children[0].allText;
      //   return this.addTagWithAttrs(lines, text, 'emphasis', { level: 'strong' });
      // }
      // case 'shortEmphasisNone': {
      //   const text = ast.children[0].allText;
      //   return this.addTagWithAttrs(lines, text, 'emphasis', { level: 'none' });
      // }
      // case 'shortEmphasisReduced': {
      //   const text = ast.children[0].allText;
      //   return this.addTagWithAttrs(lines, text, 'emphasis', { level: 'reduced' });
      // }

      // case 'textModifier': {
      //   const tmo = this.getTextModifierObject(ast);

      //   if (tmo.textOnly) {
      //     // Quick return if tag is not supported
      //     lines.push(tmo.text)
      //     return lines
      //   }

      //   const tagsSortedDesc = Object.keys(tmo.tags).sort((a: any, b: any) => { return tmo.tags[b].sortId - tmo.tags[a].sortId });

      //   let inner = tmo.text;

      //   for (let index = 0; index < tagsSortedDesc.length; index++) {
      //     const tag = tagsSortedDesc[index];
      //     const attrs = tmo.tags[tag].attrs;

      //     inner = this.getTagWithAttrs(inner, tag, attrs);

      //   }
      //   lines.push(inner);

      //   return lines;
      // }

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

      case 'audio': {
        // Ignore the caption.
        const index = ast.children.length === 2 ? 1 : 0;
        const url = ast.children[index].allText.replace(/&/g, '&amp;');
        return this.addTagWithAttrs(lines, null, 'audio', { src: url }, true);
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

      default: {
        this.processAst(ast.children, lines);
        return lines;
      }
    }
  }
}
