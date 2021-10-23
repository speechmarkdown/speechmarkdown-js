import { SpeechOptions } from '../SpeechOptions';
import {SsmlFormatterBase, TagsObject} from './SsmlFormatterBase';

export class MicrosoftAzureSsmlFormatter extends SsmlFormatterBase {

  constructor(public options: SpeechOptions) {
    super(options);

    this.modifierKeyToSsmlTagMappings.emphasis = null;
    this.modifierKeyToSsmlTagMappings.address = 'say-as';
    this.modifierKeyToSsmlTagMappings.number = 'say-as';
    this.modifierKeyToSsmlTagMappings.characters = 'say-as';
    this.modifierKeyToSsmlTagMappings.expletive = null;
    this.modifierKeyToSsmlTagMappings.fraction = 'say-as';
    this.modifierKeyToSsmlTagMappings.interjection = null;
    this.modifierKeyToSsmlTagMappings.ordinal = 'say-as';
    this.modifierKeyToSsmlTagMappings.telephone = 'say-as';
    this.modifierKeyToSsmlTagMappings.unit = null;
    this.modifierKeyToSsmlTagMappings.time = 'say-as';
    this.modifierKeyToSsmlTagMappings.date = 'say-as';
    this.modifierKeyToSsmlTagMappings.sub = 'sub';
    this.modifierKeyToSsmlTagMappings.ipa = 'phoneme';
    this.modifierKeyToSsmlTagMappings.rate = 'prosody';
    this.modifierKeyToSsmlTagMappings.pitch = 'prosody';
    this.modifierKeyToSsmlTagMappings.volume = 'prosody';
    this.modifierKeyToSsmlTagMappings.whisper = 'prosody';
    this.modifierKeyToSsmlTagMappings.voice = 'voice';
    this.modifierKeyToSsmlTagMappings.newscaster = 'mstts:express-as';
  }

  // tslint:disable-next-line: max-func-body-length
  private getTextModifierObject(ast: any): any {
    let textModifierObject = new TagsObject( this );

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

          switch (key) {
            case 'address':
            case 'fraction':
            case 'ordinal':
            case 'telephone':
              textModifierObject.tag( ssmlTag, { 'interpret-as': key } );  break;

            case "number":
              textModifierObject.tag( ssmlTag, { 'interpret-as': 'cardinal' } );  break;

            case "characters": {
              let attrValue = 'digits';
              if (isNaN(textModifierObject.text as any)) {
                attrValue = 'characters';
              }

              textModifierObject.tag( ssmlTag, { 'interpret-as': attrValue } );
              break;
            }

            case 'date':
              textModifierObject.tag( ssmlTag, { 'interpret-as': key, format: value || 'ymd' } );  break;

            case 'time':
              textModifierObject.tag( ssmlTag, { 'interpret-as': key, format: value || 'hms12' } );  break;

            case 'whisper':
              textModifierObject.tag( ssmlTag, { volume: 'x-soft', rate: 'slow' } );  break;

            case 'ipa':
              textModifierObject.tag( ssmlTag, { alphabet: key, ph: value } );  break;

            case 'sub':
              textModifierObject.tag( ssmlTag, { alias: value } );  break;

            case 'volume':
            case 'rate':
            case 'pitch': {
              const attrs = {};
              attrs[key] = value || 'medium';
              textModifierObject.tag( ssmlTag, attrs, true );
              break;
            }

            case 'voice': {
              const name = this.sentenceCase(value || 'device')

              // TODO: valid voices list may not be useful when there're custom voices.
              // TODO: convert to use the TagsObject.voiceTagNamed()
              if (name != 'Device') {
                textModifierObject.tag( ssmlTag, { 'name': name } );
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
    let sectionObject = new TagsObject( this );

    for (let index = 0; index < ast.children.length; index++) {
      const child = ast.children[index];

      if (child.name === 'sectionModifierKeyOptionalValue') {
        let key = child.children[0].allText;
        const value = child.children.length === 2 ? child.children[1].allText : '';
        const ssmlTag = this.modifierKeyToSsmlTagMappings[key];

        switch (key) {

          // TODO: valid voices list may not be useful when there're custom voices.
          // TODO: convert to use the TagsObject.voiceTagNamed()
          case 'voice': {
            const name = this.sentenceCase(value || 'device')

            if (name != 'Device') {
              sectionObject.tag( ssmlTag, { 'name': name } );
            }
            break;
          }

          case 'defaults': {
            break;
          }

          case 'newscaster':
            sectionObject.tag( ssmlTag, { 'style': 'newscast' } );  break;

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
          this.addComment('Converted from Speech Markdown to SSML for Microsoft Azure', lines);
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
          case 'breakStrengthValue': attrs = { strength: val }; break;
          case 'time': attrs = { time: val }; break;
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

      case 'audio': {
        const url = ast.children[0].allText.replace(/&/g, '&amp;');
        return this.addTagWithAttrs(lines, null, 'audio', { src: url }, false);
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

      case 'section': {
        const so = this.getSectionObject(ast);

        const tagsSortedAsc = Object.keys(so.tags).sort((a: any, b: any) => { return so.tags[a].sortId - so.tags[b].sortId });

        this.addSectionEndTag(lines);
        this.addSectionStartTag(tagsSortedAsc, so, lines);

        return lines;
      }

      default: {
        this.processAst(ast.children, lines);
        return lines;
      }
    }
  }
}
