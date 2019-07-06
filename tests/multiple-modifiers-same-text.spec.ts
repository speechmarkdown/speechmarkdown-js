// tslint:disable-next-line:import-name
import dedent from 'ts-dedent';
import { SpeechMarkdown } from '../src/SpeechMarkdown';

describe('multiple-modifiers-same-text', () => {

  const speech = new SpeechMarkdown();

  const markdown = dedent`
    Your balance is: (12345)[number;emphasis:"strong";whisper;pitch:"high"].
  `;

  test('converts to SSML - Amazon Alexa', () => {

    const options = {
      platform: 'amazon-alexa'
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>
      Your balance is: <emphasis level="strong"><say-as interpret-as="number"><prosody pitch="high"><amazon:effect name="whispered">12345</amazon:effect></prosody></say-as></emphasis>.
      </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('converts to SSML - Google Assistant', () => {

    const options = {
      platform: 'google-assistant'
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>
      Your balance is: <emphasis level="strong"><say-as interpret-as="number"><prosody volume="x-soft" rate="slow" pitch="high">12345</prosody></say-as></emphasis>.
      </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('converts to Plain Text', () => {

    const options = {
    };
    const text = speech.toText(markdown, options);

    const expected = dedent`
      Your balance is: 12345.
    `;

    expect(text).toBe(expected);
  });

});
