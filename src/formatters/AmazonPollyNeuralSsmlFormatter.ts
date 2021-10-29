import { SpeechOptions } from '../SpeechOptions';
import { SsmlFormatterBase } from './SsmlFormatterBase';

export class AmazonPollyNeuralSsmlFormatter extends SsmlFormatterBase {

  constructor(public options: SpeechOptions) {
    super(options);

    this.modifierKeyToSsmlTagMappings.cardinal = 'say-as';
    this.modifierKeyToSsmlTagMappings.digits = 'say-as';
    this.modifierKeyToSsmlTagMappings.drc = 'amazon:effect'
    this.modifierKeyToSsmlTagMappings.lang = 'lang';
    this.modifierKeyToSsmlTagMappings.newscaster = 'amazon:domain';

    this.modifierKeyMappings.digits = 'digits';
    this.modifierKeyMappings.cardinal = 'cardinal';
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
            case 'address':
            case 'cardinal':
            case 'characters':
            case 'digits':
            case 'expletive':
            case 'fraction':
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
            case 'rate': {

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

            case 'drc': {
              if (!textModifierObject.tags[ssmlTag]) {
                textModifierObject.tags[ssmlTag] = { sortId: sortId, attrs: null };
              }
              textModifierObject.tags[ssmlTag].attrs = { 'name': key };
              break;
            }

            // unavailable tags
            case 'excited':
            case 'disappointed':
            case 'emphasis':
            case 'interjection':
            case 'voice':
            case 'whisper':
            {
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

          case 'voice':
          case 'dj':
          case 'excited':
          case 'disappointed': {
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
          this.addComment('Converted from Speech Markdown to SSML for Amazon Polly', lines);
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
        switch( ast.children[0].children[0].name ){
          case 'breakStrengthValue': attrs = {strength: val}; break;
          case 'time': attrs = {time: val}; break;
        }
        return this.addTagWithAttrs(lines, null, 'break', attrs);
      }

      case 'markTag': {
        const name = ast.children[0].allText;
        return this.addTagWithAttrs(lines, null, 'mark', { name: name });
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
      
      case 'shortEmphasisModerate': 
      case 'shortEmphasisStrong': 
      case 'shortEmphasisNone': 
      case 'shortEmphasisReduced': {
        lines.push(ast.allText.replace(/\+/g, ""))
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
