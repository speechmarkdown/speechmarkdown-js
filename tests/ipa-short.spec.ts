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

  test('plain text keeps URL path slashes (does not treat as bare IPA)', () => {
    const input = 'see https://example.com/foo/bar';
    expect(speech.toText(input, {})).toBe(input);
    expect(speech.toText('https://a.com/x/y', {})).toBe('https://a.com/x/y');
    expect(speech.toText('see example.com/foo/bar', {})).toBe(
      'see example.com/foo/bar',
    );
    // '+' and other unquoted URL specials before '/' must not open bare IPA.
    expect(speech.toText('https://x.com/seg+/y', {})).toBe(
      'https://x.com/seg+/y',
    );
  });

  test('SSML keeps URL path slashes (does not treat as bare IPA)', () => {
    const ssml = speech.toSSML('see https://example.com/foo/bar', {
      platform: 'amazon-alexa',
    });
    expect(ssml).toContain('https://example.com/foo/bar');
    expect(ssml).not.toContain('<phoneme');
  });
});
