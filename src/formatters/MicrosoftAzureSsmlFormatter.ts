import { SpeechOptions } from '../SpeechOptions';
import { MICROSOFT_AZURE_TTS_VOICES } from './data/microsoftAzureVoices';
import { SsmlFormatterBase, TagsObject } from './SsmlFormatterBase';

export class MicrosoftAzureSsmlFormatter extends SsmlFormatterBase {
  public validVoices: Record<string, any> = MICROSOFT_AZURE_TTS_VOICES;

  // Valid style degree range for mstts:express-as
  private minStyleDegree: number = 0.01;
  private maxStyleDegree: number = 2.0;

  // Valid roles for mstts:express-as
  private validRoles: string[] = [
    'Girl',
    'Boy',
    'YoungAdultFemale',
    'YoungAdultMale',
    'OlderAdultFemale',
    'OlderAdultMale',
    'SeniorFemale',
    'SeniorMale',
  ];

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

    // Azure mstts:express-as styles
    this.modifierKeyToSsmlTagMappings.newscaster = 'mstts:express-as';
    this.modifierKeyToSsmlTagMappings.excited = 'mstts:express-as';
    this.modifierKeyToSsmlTagMappings.disappointed = 'mstts:express-as';
    this.modifierKeyToSsmlTagMappings.friendly = 'mstts:express-as';
    this.modifierKeyToSsmlTagMappings.cheerful = 'mstts:express-as';
    this.modifierKeyToSsmlTagMappings.sad = 'mstts:express-as';
    this.modifierKeyToSsmlTagMappings.angry = 'mstts:express-as';
    this.modifierKeyToSsmlTagMappings.fearful = 'mstts:express-as';
    this.modifierKeyToSsmlTagMappings.empathetic = 'mstts:express-as';
    this.modifierKeyToSsmlTagMappings.calm = 'mstts:express-as';
    this.modifierKeyToSsmlTagMappings.lyrical = 'mstts:express-as';
    this.modifierKeyToSsmlTagMappings.hopeful = 'mstts:express-as';
    this.modifierKeyToSsmlTagMappings.terrified = 'mstts:express-as';
    this.modifierKeyToSsmlTagMappings.shouting = 'mstts:express-as';
    this.modifierKeyToSsmlTagMappings.whispering = 'mstts:express-as';
    this.modifierKeyToSsmlTagMappings.unfriendly = 'mstts:express-as';
    this.modifierKeyToSsmlTagMappings.gentle = 'mstts:express-as';
    this.modifierKeyToSsmlTagMappings.serious = 'mstts:express-as';
    this.modifierKeyToSsmlTagMappings.depressed = 'mstts:express-as';
    this.modifierKeyToSsmlTagMappings.embarrassed = 'mstts:express-as';
    this.modifierKeyToSsmlTagMappings.disgruntled = 'mstts:express-as';
    this.modifierKeyToSsmlTagMappings.envious = 'mstts:express-as';
    this.modifierKeyToSsmlTagMappings.affectionate = 'mstts:express-as';
    this.modifierKeyToSsmlTagMappings.assistant = 'mstts:express-as';
    this.modifierKeyToSsmlTagMappings.chat = 'mstts:express-as';
    this.modifierKeyToSsmlTagMappings.customerservice = 'mstts:express-as';
  }

  /**
   * Checks if the generated SSML contains any MSTTS-specific tags
   * @param lines Array of SSML lines to check
   * @returns true if any line contains an mstts: tag
   */
  private containsMsttsTag(lines: string[]): boolean {
    const msttsPrefixRegex = /<\/?mstts:/;
    return lines.some((line) => msttsPrefixRegex.test(line));
  }

  /**
   * Override addSpeakTag to automatically inject xmlns:mstts namespace
   * when MSTTS-specific tags are detected in the output
   */
  protected addSpeakTag(
    ast: any,
    newLine: boolean,
    newLineAfterEnd: boolean,
    attr: any,
    lines: string[],
  ): string[] {
    // First, process the AST to generate the content
    const contentLines: string[] = [];
    this.processAst(ast, contentLines);
    this.addSectionEndTag(contentLines);

    // Check if MSTTS tags are present in the generated content
    const hasMsttsTag = this.containsMsttsTag(contentLines);

    // Build attributes for the speak tag
    let speakAttrs = attr;
    if (hasMsttsTag) {
      speakAttrs = speakAttrs || {};
      speakAttrs['xmlns:mstts'] = 'https://www.w3.org/2001/mstts';
    }

    // Add the speak tag with appropriate namespace
    lines.push(this.startTag('speak', speakAttrs, newLine));
    lines.push(...contentLines);
    lines.push(this.endTag('speak', newLine));

    if (newLineAfterEnd) {
      lines.push('\n');
    }

    return lines;
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
            case 'address':
            case 'fraction':
            case 'ordinal':
            case 'telephone':
              textModifierObject.tag(ssmlTag, { 'interpret-as': key });
              break;

            case 'number':
              textModifierObject.tag(ssmlTag, { 'interpret-as': 'cardinal' });
              break;

            case 'characters': {
              let attrValue = 'digits';
              if (isNaN(textModifierObject.text as any)) {
                attrValue = 'characters';
              }

              textModifierObject.tag(ssmlTag, { 'interpret-as': attrValue });
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

            case 'voice': {
              const name = this.sentenceCase(value || 'device');

              // TODO: valid voices list may not be useful when there're custom voices.
              // TODO: convert to use the TagsObject.voiceTagNamed()
              if (name != 'Device') {
                textModifierObject.tag(ssmlTag, { name: name });
              }
              break;
            }

            // Azure mstts:express-as styles
            case 'excited':
            case 'disappointed':
            case 'friendly':
            case 'cheerful':
            case 'sad':
            case 'angry':
            case 'fearful':
            case 'empathetic':
            case 'calm':
            case 'lyrical':
            case 'hopeful':
            case 'terrified':
            case 'shouting':
            case 'whispering':
            case 'unfriendly':
            case 'gentle':
            case 'serious':
            case 'depressed':
            case 'embarrassed':
            case 'disgruntled':
            case 'envious':
            case 'affectionate':
            case 'assistant':
            case 'chat':
            case 'customerservice':
            case 'poetry-reading':
            case 'narration-professional':
            case 'newscast-casual':
            case 'newscaster': {
              const attrs: Record<string, string> = { style: key === 'newscaster' ? 'newscast' : key };

              // Handle styledegree if provided (value should be a number between 0.01 and 2.0)
              if (value) {
                const styleDegree = parseFloat(value);
                if (!isNaN(styleDegree) && styleDegree >= this.minStyleDegree && styleDegree <= this.maxStyleDegree) {
                  attrs['styledegree'] = value;
                }
              }

              textModifierObject.tag(ssmlTag, attrs);
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
          // TODO: valid voices list may not be useful when there're custom voices.
          // TODO: convert to use the TagsObject.voiceTagNamed()
          case 'voice': {
            const name = this.sentenceCase(value || 'device');

            if (name != 'Device') {
              sectionObject.tag(ssmlTag, { name: name });
            }
            break;
          }

          case 'defaults': {
            break;
          }

          // Azure mstts:express-as styles
          case 'excited':
          case 'disappointed':
          case 'friendly':
          case 'cheerful':
          case 'sad':
          case 'angry':
          case 'fearful':
          case 'empathetic':
          case 'calm':
          case 'lyrical':
          case 'hopeful':
          case 'terrified':
          case 'shouting':
          case 'whispering':
          case 'unfriendly':
          case 'gentle':
          case 'serious':
          case 'depressed':
          case 'embarrassed':
          case 'disgruntled':
          case 'envious':
          case 'affectionate':
          case 'assistant':
          case 'chat':
          case 'customerservice':
          case 'poetry-reading':
          case 'narration-professional':
          case 'newscast-casual':
          case 'newscaster': {
            const attrs: Record<string, string> = { style: key === 'newscaster' ? 'newscast' : key };

            // Handle styledegree if provided (value should be a number between 0.01 and 2.0)
            if (value) {
              const styleDegree = parseFloat(value);
              if (!isNaN(styleDegree) && styleDegree >= this.minStyleDegree && styleDegree <= this.maxStyleDegree) {
                attrs['styledegree'] = value;
              }
            }

            sectionObject.tag(ssmlTag, attrs);
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
            'Converted from Speech Markdown to SSML for Microsoft Azure',
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

      case 'textModifier': {
        const tmo = this.getTextModifierObject(ast);
        return this.applyTagsObject(tmo, lines);
      }
      case 'shortIpa': {
        const tmo = this.getShortIpaObject(ast);
        return this.applyTagsObject(tmo, lines);
      }
      case 'bareIpa': {
        const tmo = this.getShortIpaObject(ast, 'ipa');
        return this.applyTagsObject(tmo, lines);
      }
      case 'shortSub': {
        const tmo = this.getShortSubObject(ast);
        return this.applyTagsObject(tmo, lines);
      }

      case 'audio': {
        // Ignore the caption.
        const index = ast.children.length === 2 ? 1 : 0;
        const url = ast.children[index].allText.replace(/&/g, '&amp;');
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
        let text = this.options.escapeXmlSymbols
          ? this.escapeXmlCharacters(ast.allText)
          : ast.allText;
        lines.push(text);
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

      default: {
        this.processAst(ast.children, lines);
        return lines;
      }
    }
  }
}
