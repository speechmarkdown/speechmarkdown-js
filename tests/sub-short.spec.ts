// tslint:disable-next-line:import-name
import dedent from 'ts-dedent';
import { SpeechMarkdown } from '../src/SpeechMarkdown';

describe('sub-short', () => {
  const speech = new SpeechMarkdown();

  const markdown = dedent`
    The element is (Al){aluminum}.
    Visit our website at (www.speechmarkdown.org){speech mark down dot org}.
  `;

  const expectedSsml = dedent`
    <speak>
    The element is <sub alias="aluminum">Al</sub>.
    Visit our website at <sub alias="speech mark down dot org">www.speechmarkdown.org</sub>.
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

  test('converts to SSML - Samsung Bixby', () => {
    const ssml = speech.toSSML(markdown, { platform: 'samsung-bixby' });
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
      The element is Al.
      Visit our website at www.speechmarkdown.org.
    `;
    expect(text).toBe(expectedText);
  });
});
