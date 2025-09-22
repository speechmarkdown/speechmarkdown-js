import { SpeechOptions } from '../SpeechOptions';
import { SsmlFormatterBase, TagsObject } from './SsmlFormatterBase';

export class W3cSsmlFormatter extends SsmlFormatterBase {
  constructor(public options: SpeechOptions) {
    super(options);

    this.modifierKeyToSsmlTagMappings.emphasis = 'emphasis';
    this.modifierKeyToSsmlTagMappings.address = 'say-as';
    this.modifierKeyToSsmlTagMappings.number = 'say-as';
    this.modifierKeyToSsmlTagMappings.characters = 'say-as';
    this.modifierKeyToSsmlTagMappings.expletive = 'say-as';
    this.modifierKeyToSsmlTagMappings.fraction = 'say-as';
    this.modifierKeyToSsmlTagMappings.interjection = 'say-as';
    this.modifierKeyToSsmlTagMappings.ordinal = 'say-as';
    this.modifierKeyToSsmlTagMappings.telephone = 'say-as';
    this.modifierKeyToSsmlTagMappings.unit = 'say-as';
    this.modifierKeyToSsmlTagMappings.time = 'say-as';
    this.modifierKeyToSsmlTagMappings.date = 'say-as';
    this.modifierKeyToSsmlTagMappings.sub = 'sub';
    this.modifierKeyToSsmlTagMappings.ipa = 'phoneme';
    this.modifierKeyToSsmlTagMappings.rate = 'prosody';
    this.modifierKeyToSsmlTagMappings.pitch = 'prosody';
    this.modifierKeyToSsmlTagMappings.volume = 'prosody';
    this.modifierKeyToSsmlTagMappings.lang = 'lang';
    this.modifierKeyToSsmlTagMappings.voice = 'voice';

    this.ssmlTagSortOrder = [
      'emphasis',
      'say-as',
      'prosody',
      'voice',
      'lang',
      'sub',
      'phoneme',
    ];
  }

  protected getFormatterComment(): string | null {
    return 'Converted from Speech Markdown to W3C SSML';
  }

  public getVoiceTagFallback(name: string): Record<string, string> | null {
    if (name.toLowerCase() === 'device') {
      return null;
    }

    return { name };
  }

  private getTextModifierObject(ast: any): any {
    const textModifierObject = new TagsObject(this);

    for (const child of ast.children) {
      switch (child.name) {
        case 'plainText':
        case 'plainTextSpecialChars':
        case 'plainTextEmphasis':
        case 'plainTextPhone':
        case 'plainTextModifier': {
          textModifierObject.text = child.allText;
          break;
        }
        case 'textModifierKeyOptionalValue': {
          let key = child.children[0].allText;
          key = this.modifierKeyMappings[key] || key;
          const value =
            child.children.length === 2 ? child.children[1].allText : '';
          const ssmlTag = this.modifierKeyToSsmlTagMappings[key];

          if (!ssmlTag) {
            break;
          }

          switch (key) {
            case 'emphasis':
              textModifierObject.tag(ssmlTag, { level: value || 'moderate' });
              break;
            case 'address':
            case 'expletive':
            case 'fraction':
            case 'interjection':
            case 'ordinal':
            case 'telephone':
            case 'unit':
              textModifierObject.tag(ssmlTag, { 'interpret-as': key });
              break;
            case 'number':
              textModifierObject.tag(ssmlTag, { 'interpret-as': 'cardinal' });
              break;
            case 'characters': {
              let interpretAs = 'digits';
              if (isNaN(textModifierObject.text as any)) {
                interpretAs = 'characters';
              }

              textModifierObject.tag(ssmlTag, { 'interpret-as': interpretAs });
              break;
            }
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
            case 'ipa':
              textModifierObject.tag(ssmlTag, { alphabet: key, ph: value });
              break;
            case 'sub':
              textModifierObject.tag(ssmlTag, { alias: value });
              break;
            case 'volume':
            case 'rate':
            case 'pitch': {
              const attrs: any = {};
              attrs[key] = value || 'medium';
              textModifierObject.tag(ssmlTag, attrs, true);
              break;
            }
            case 'lang':
              textModifierObject.tag(ssmlTag, { 'xml:lang': value });
              break;
            case 'voice':
              textModifierObject.voiceTag(ssmlTag, value);
              break;
            default:
          }
          break;
        }
      }
    }

    return textModifierObject;
  }

  private getSectionObject(ast: any): any {
    const sectionObject = new TagsObject(this);

    for (const child of ast.children) {
      if (child.name !== 'sectionModifierKeyOptionalValue') {
        continue;
      }

      const key = child.children[0].allText;
      const value =
        child.children.length === 2 ? child.children[1].allText : '';
      const ssmlTag = this.modifierKeyToSsmlTagMappings[key];

      if (!ssmlTag) {
        continue;
      }

      switch (key) {
        case 'lang':
          sectionObject.tag(ssmlTag, { 'xml:lang': value });
          break;
        case 'voice':
          sectionObject.voiceTag(ssmlTag, value);
          break;
        default:
      }
    }

    return sectionObject;
  }

  // tslint:disable-next-line: max-func-body-length
  protected formatFromAst(ast: any, lines: string[] = []): string[] {
    switch (ast.name) {
      case 'document': {
        if (this.options.includeFormatterComment) {
          const comment = this.getFormatterComment();
          if (comment) {
            this.addComment(comment, lines);
          }
        }

        if (this.options.includeSpeakTag) {
          return this.addSpeakTag(ast.children, true, false, null, lines);
        }
        this.processAst(ast.children, lines);
        return lines;
      }
      case 'paragraph': {
        if (this.options.includeParagraphTag) {
          return this.addTag('p', ast.children, true, false, null, lines);
        }
        this.processAst(ast.children, lines);
        return lines;
      }
      case 'shortBreak': {
        const time = ast.children[0].allText;
        return this.addTagWithAttrs(lines, null, 'break', { time });
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
      case 'textModifier': {
        const tmo = this.getTextModifierObject(ast);
        return this.applyTagsObject(tmo, lines);
      }
      case 'shortIpa': {
        const tmo = this.getShortIpaObject(ast);
        return this.applyTagsObject(tmo, lines);
      }
      case 'shortSub': {
        const tmo = this.getShortSubObject(ast);
        return this.applyTagsObject(tmo, lines);
      }
      case 'audio': {
        const index = ast.children.length === 2 ? 1 : 0;
        const url = ast.children[index].allText.replace(/&/g, '&amp;');
        return this.addTagWithAttrs(lines, null, 'audio', { src: url }, false);
      }
      case 'markTag': {
        const name = ast.children[0].allText;
        return this.addTagWithAttrs(lines, null, 'mark', { name }, false);
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
        const text = this.options.escapeXmlSymbols
          ? this.escapeXmlCharacters(ast.allText)
          : ast.allText;
        lines.push(text);
        return lines;
      }
      case 'section': {
        const so = this.getSectionObject(ast);
        const tagsSortedAsc = Object.keys(so.tags).sort(
          (a: any, b: any) => so.tags[a].sortId - so.tags[b].sortId,
        );

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
