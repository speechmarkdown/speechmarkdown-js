import { SpeechOptions } from '../SpeechOptions';
import { SsmlFormatterBase } from './SsmlFormatterBase';

export class SamsungBixbySsmlFormatter extends SsmlFormatterBase {

  constructor(public options: SpeechOptions) {
    super(options);

    this.modifierKeyToSsmlTagMappings.emphasis = null;
    this.modifierKeyToSsmlTagMappings.address = null;
    this.modifierKeyToSsmlTagMappings.number = null;
    this.modifierKeyToSsmlTagMappings.characters = null;
    this.modifierKeyToSsmlTagMappings.expletive = null;
    this.modifierKeyToSsmlTagMappings.fraction = null;
    this.modifierKeyToSsmlTagMappings.interjection = null;
    this.modifierKeyToSsmlTagMappings.ordinal = null;
    this.modifierKeyToSsmlTagMappings.telephone = null;
    this.modifierKeyToSsmlTagMappings.unit = null;
    this.modifierKeyToSsmlTagMappings.time = null;
    this.modifierKeyToSsmlTagMappings.date = null;
    this.modifierKeyToSsmlTagMappings.sub = null;
    this.modifierKeyToSsmlTagMappings.ipa = null;
    this.modifierKeyToSsmlTagMappings.rate = null;
    this.modifierKeyToSsmlTagMappings.pitch = null;
    this.modifierKeyToSsmlTagMappings.volume = null;
  }

  // tslint:disable-next-line: max-func-body-length
  // private getTextModifierObject(ast: any): any {
  //   let textModifierObject = {
  //     tags: {}
  //   };

  //   for (let index = 0; index < ast.children.length; index++) {
  //     const child = ast.children[index];

  //     switch (child.name) {
  //       case 'plainText':
  //       case 'plainTextSpecialChars':
  //       case 'plainTextEmphasis':
  //       case 'plainTextPhone':
  //       case 'plainTextModifier': {
  //         textModifierObject['text'] = child.allText;
  //         break;
  //       }
  //       case 'textModifierKeyOptionalValue': {
  //         let key = child.children[0].allText;
  //         key = this.modifierKeyMappings[key] || key;
  //         const value = child.children.length === 2 ? child.children[1].allText : '';
  //         const ssmlTag = this.modifierKeyToSsmlTagMappings[key];
  //         const sortId = this.ssmlTagSortOrder.indexOf(ssmlTag);

  //         switch (key) {
  //           case 'emphasis': {
  //             if (!textModifierObject.tags[ssmlTag]) {
  //               textModifierObject.tags[ssmlTag] = { sortId: sortId, attrs: null };
  //             }
  //             textModifierObject.tags[ssmlTag].attrs = { level: value || 'moderate' };
  //             break;
  //           }

  //           case 'address':
  //           case 'characters':
  //           case 'expletive':
  //           case 'fraction':
  //           case 'number':
  //           case 'ordinal':
  //           case 'telephone':
  //           case 'unit': {
  //             if (!textModifierObject.tags[ssmlTag]) {
  //               textModifierObject.tags[ssmlTag] = { sortId: sortId, attrs: null };
  //             }
  //             textModifierObject.tags[ssmlTag].attrs = { 'interpret-as': key };
  //             break;
  //           }

  //           case 'date': {
  //             if (!textModifierObject.tags[ssmlTag]) {
  //               textModifierObject.tags[ssmlTag] = { sortId: sortId, attrs: null };
  //             }
  //             textModifierObject.tags[ssmlTag].attrs = { 'interpret-as': key, format: value || 'ymd' };
  //             break;
  //           }

  //           case 'time': {
  //             if (!textModifierObject.tags[ssmlTag]) {
  //               textModifierObject.tags[ssmlTag] = { sortId: sortId, attrs: null };
  //             }
  //             textModifierObject.tags[ssmlTag].attrs = { 'interpret-as': key, format: value || 'hms12' };
  //             break;
  //           }

  //           case 'whisper': {
  //             if (!textModifierObject.tags[ssmlTag]) {
  //               textModifierObject.tags[ssmlTag] = { sortId: sortId, attrs: null };
  //             }
  //             textModifierObject.tags[ssmlTag].attrs = { volume: 'x-soft', rate: 'slow' };
  //             break;
  //           }

  //           case 'ipa': {
  //             // Google Assistant does not support <phoneme> tag
  //             if (!textModifierObject.tags[ssmlTag]) {
  //               textModifierObject.tags[ssmlTag] = { sortId: sortId, attrs: null };
  //             }
  //             textModifierObject['textOnly'] = true;
  //             break;
  //           }

  //           case 'sub': {
  //             if (!textModifierObject.tags[ssmlTag]) {
  //               textModifierObject.tags[ssmlTag] = { sortId: sortId, attrs: null };
  //             }
  //             textModifierObject.tags[ssmlTag].attrs = { alias: value };
  //             break;
  //           }

  //           case 'volume':
  //           case 'rate':
  //           case 'pitch': {

  //             if (!textModifierObject.tags[ssmlTag]) {
  //               textModifierObject.tags[ssmlTag] = { sortId: sortId, attrs: null };
  //             }

  //             const attrs = {};
  //             attrs[key] = value || 'medium';
  //             textModifierObject.tags[ssmlTag].attrs = { ...textModifierObject.tags[ssmlTag].attrs, ...attrs };

  //             break;
  //           }

  //           default: {

  //           }

  //         }
  //         break;
  //       }
  //     }

  //   }

  //   return textModifierObject;
  // }

  // tslint:disable-next-line: max-func-body-length
  protected formatFromAst(ast: any, lines: string[] = []): string[] {

    switch (ast.name) {
      case 'document': {
        if (this.options.includeFormatterComment) {
          this.addComment('Converted from Speech Markdown to SSML for Samsung Bixby', lines);
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
      // case 'shortBreak': {
      //   const time = ast.children[0].allText;
      //   return this.addTagWithAttrs(lines, null, 'break', { time: time });
      // }
      // case 'shortEmphasisModerate': {
      //   const text = ast.children[0].allText;
      //   return this.addTagWithAttrs(lines, text, 'emphasis', { level: 'moderate' });
      // }
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
      case 'audio': {
        const url = ast.children[0].allText;
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
