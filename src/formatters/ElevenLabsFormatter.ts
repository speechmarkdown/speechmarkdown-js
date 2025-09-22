import { SpeechOptions } from '../SpeechOptions';
import { SsmlFormatterBase, TagsObject } from './SsmlFormatterBase';

const BREAK_STRENGTH_TO_DURATION: Record<string, string> = {
  none: '0s',
  'x-weak': '0.2s',
  weak: '0.35s',
  medium: '0.5s',
  strong: '0.8s',
  'x-strong': '1.2s',
};

export class ElevenLabsFormatter extends SsmlFormatterBase {
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
    this.modifierKeyToSsmlTagMappings.whisper = null;
    this.modifierKeyToSsmlTagMappings.sub = null;
    this.modifierKeyToSsmlTagMappings.rate = null;
    this.modifierKeyToSsmlTagMappings.pitch = null;
    this.modifierKeyToSsmlTagMappings.volume = null;
    this.modifierKeyToSsmlTagMappings.drc = null;
    this.modifierKeyToSsmlTagMappings.timbre = null;
    this.modifierKeyToSsmlTagMappings.lang = null;
    this.modifierKeyToSsmlTagMappings.voice = null;
    this.modifierKeyToSsmlTagMappings.dj = null;
    this.modifierKeyToSsmlTagMappings.defaults = null;
    this.modifierKeyToSsmlTagMappings.newscaster = null;
    this.modifierKeyToSsmlTagMappings.excited = null;
    this.modifierKeyToSsmlTagMappings.disappointed = null;

    this.ssmlTagSortOrder = ['phoneme'];
  }

  private mapStrengthToTime(strength: string): string {
    const normalized = (strength || '').toLowerCase();
    return (
      BREAK_STRENGTH_TO_DURATION[normalized] ||
      BREAK_STRENGTH_TO_DURATION['medium']
    );
  }

  private getTextModifierObject(ast: any): TagsObject {
    const textModifierObject = new TagsObject(this);

    for (let index = 0; index < ast.children.length; index++) {
      const child = ast.children[index];

      switch (child.name) {
        case 'plainText':
        case 'plainTextSpecialChars':
        case 'plainTextEmphasis':
        case 'plainTextPhone':
        case 'plainTextModifier':
          textModifierObject['text'] = child.allText;
          break;
        case 'textModifierKeyOptionalValue': {
          let key = child.children[0].allText;
          key = this.modifierKeyMappings[key] || key;
          const value =
            child.children.length === 2 ? child.children[1].allText : '';
          const tag = this.modifierKeyToSsmlTagMappings[key];

          if (!tag) {
            break;
          }

          switch (key) {
            case 'ipa':
              if (value) {
                textModifierObject.tag(tag, { alphabet: key, ph: value });
              }
              break;
            default:
              break;
          }
          break;
        }
      }
    }

    return textModifierObject;
  }

  protected formatFromAst(ast: any, lines: string[] = []): string[] {
    switch (ast.name) {
      case 'document': {
        if (this.options.includeFormatterComment) {
          this.addComment(
            'Converted from Speech Markdown to ElevenLabs prompt markup',
            lines,
          );
        }

        this.processAst(ast.children, lines);
        return lines;
      }
      case 'paragraph':
      case 'simpleLine': {
        this.processAst(ast.children, lines);
        return lines;
      }
      case 'shortBreak': {
        const time = ast.children[0].allText;
        return this.addTagWithAttrs(lines, null, 'break', { time: time });
      }
      case 'break': {
        const val = ast.children[0].allText;
        let time = val;
        const nodeType = ast.children[0].children[0].name;

        if (nodeType === 'breakStrengthValue') {
          time = this.mapStrengthToTime(val);
        }

        return this.addTagWithAttrs(lines, null, 'break', { time: time });
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

        if (inner) {
          lines.push(inner);
        }

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
      default: {
        this.processAst(ast.children, lines);
        return lines;
      }
    }
  }
}
