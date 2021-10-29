// tslint:disable-next-line:import-name
import dedent from 'ts-dedent';
import { SpeechMarkdown } from '../src/SpeechMarkdown';

describe('drc-standard', () => {

  const speech = new SpeechMarkdown();

  const markdown = dedent`
    Some audio is difficult to hear in a moving vehicle, but (this audio is less difficult to hear in a moving vehicle.)[drc]
  `;

  test('converts to SSML - Amazon Alexa', () => {

    const options = {
      platform: 'amazon-alexa'
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
    <speak>
    Some audio is difficult to hear in a moving vehicle, but this audio is less difficult to hear in a moving vehicle.
    </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('converts to SSML - Amazon Polly', () => {

    const options = {
      platform: 'amazon-polly'
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
    <speak>
    Some audio is difficult to hear in a moving vehicle, but <amazon:effect name="drc">this audio is less difficult to hear in a moving vehicle.</amazon:effect>
    </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('converts to SSML - Amazon Polly (Neural)', () => {

    const options = {
      platform: 'amazon-polly-neural'
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
    <speak>
    Some audio is difficult to hear in a moving vehicle, but <amazon:effect name="drc">this audio is less difficult to hear in a moving vehicle.</amazon:effect>
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
    Some audio is difficult to hear in a moving vehicle, but this audio is less difficult to hear in a moving vehicle.
    </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('converts to SSML - Samsung Bixby', () => {

    const options = {
      platform: 'samsung-bixby'
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
    <speak>
    Some audio is difficult to hear in a moving vehicle, but this audio is less difficult to hear in a moving vehicle.
    </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('converts to SSML - Microsoft Azure', () => {

    const options = {
      platform: 'microsoft-azure'
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
    <speak>
    Some audio is difficult to hear in a moving vehicle, but this audio is less difficult to hear in a moving vehicle.
    </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('converts to Plain Text', () => {

    const options = {
    };
    const text = speech.toText(markdown, options);

    const expected = dedent`
    Some audio is difficult to hear in a moving vehicle, but this audio is less difficult to hear in a moving vehicle.
    `;

    expect(text).toBe(expected);
  });

});
