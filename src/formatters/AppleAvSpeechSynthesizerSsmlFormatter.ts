import { SpeechOptions } from '../SpeechOptions';
import { W3cSsmlFormatter } from './W3cSsmlFormatter';

export class AppleAvSpeechSynthesizerSsmlFormatter extends W3cSsmlFormatter {
  constructor(public options: SpeechOptions) {
    super(options);
  }

  protected getFormatterComment(): string | null {
    return 'Converted from Speech Markdown to SSML for Apple AVSpeechSynthesizer';
  }
}
