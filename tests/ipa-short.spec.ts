// tslint:disable-next-line:import-name
import dedent from 'ts-dedent';
import { SpeechMarkdown } from '../src/SpeechMarkdown';

describe('ipa-short', () => {
  const speech = new SpeechMarkdown();

  const markdown = dedent`
    I say, (pecan)/'pi.kæn/.
    I say, (data)/ˈdeɪtə/.
    Just /ˈdeɪtə/ here.
  `;

  const expectedSsml = dedent`
    <speak>
    I say, <phoneme alphabet="ipa" ph="'pi.kæn">pecan</phoneme>.
    I say, <phoneme alphabet="ipa" ph="ˈdeɪtə">data</phoneme>.
    Just <phoneme alphabet="ipa" ph="ˈdeɪtə">ipa</phoneme> here.
    </speak>
  `;

  test('converts to SSML - Amazon Alexa', () => {
    const ssml = speech.toSSML(markdown, { platform: 'amazon-alexa' });
    expect(ssml).toBe(expectedSsml);
  });

  test('converts to SSML - Amazon Polly', () => {
    const ssml = speech.toSSML(markdown, { platform: 'amazon-polly' });
    expect(ssml).toBe(expectedSsml);
  });

  test('converts to SSML - Amazon Polly (Neural)', () => {
    const ssml = speech.toSSML(markdown, { platform: 'amazon-polly-neural' });
    expect(ssml).toBe(expectedSsml);
  });

  test('converts to SSML - Google Assistant', () => {
    const ssml = speech.toSSML(markdown, { platform: 'google-assistant' });
    expect(ssml).toBe(expectedSsml);
  });

  test('converts to SSML - Microsoft Azure', () => {
    const ssml = speech.toSSML(markdown, { platform: 'microsoft-azure' });
    expect(ssml).toBe(expectedSsml);
  });

  test('converts to SSML - IBM Watson', () => {
    const ssml = speech.toSSML(markdown, { platform: 'ibm-watson' });
    expect(ssml).toBe(expectedSsml);
  });

  test('converts to SSML - Microsoft SAPI', () => {
    const ssml = speech.toSSML(markdown, { platform: 'microsoft-sapi' });
    expect(ssml).toBe(expectedSsml);
  });

  test('converts to SSML - W3C', () => {
    const ssml = speech.toSSML(markdown, { platform: 'w3c' });
    expect(ssml).toBe(expectedSsml);
  });

  test('converts to SSML - Apple AVSpeechSynthesizer', () => {
    const ssml = speech.toSSML(markdown, {
      platform: 'apple-avspeechsynthesizer',
    });
    expect(ssml).toBe(expectedSsml);
  });

  test('converts to Plain Text', () => {
    const text = speech.toText(markdown, {});
    const expectedText = dedent`
      I say, pecan.
      I say, data.
      Just ˈdeɪtə here.
    `;
    expect(text).toBe(expectedText);
  });
});
