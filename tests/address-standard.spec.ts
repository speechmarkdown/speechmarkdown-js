// tslint:disable-next-line:import-name
import dedent from 'ts-dedent';
import { SpeechMarkdown } from '../src/SpeechMarkdown';

describe('address-standard', () => {

  const speech = new SpeechMarkdown();

  const markdown = dedent`
    I'm at (150th CT NE, Redmond, WA)[address].
  `;

  test('converts to SSML - Amazon Alexa', () => {

    const options = {
      platform: 'amazon-alexa'
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>
      I'm at <say-as interpret-as="address">150th CT NE, Redmond, WA</say-as>.
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
      I'm at <say-as interpret-as="address">150th CT NE, Redmond, WA</say-as>.
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
      I'm at 150th CT NE, Redmond, WA.
      </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('converts to Plain Text', () => {

    const options = {
    };
    const text = speech.toText(markdown, options);

    const expected = dedent`
      I'm at 150th CT NE, Redmond, WA.
    `;

    expect(text).toBe(expected);
  });

});
