// tslint:disable-next-line:import-name
import dedent from 'ts-dedent';
import { SpeechMarkdown } from '../src/SpeechMarkdown';

describe('number-standard', () => {

  const speech = new SpeechMarkdown();

  const markdown = dedent`
    Your balance is: (12345)[number].
  `;

  test('converts to SSML - Amazon Alexa', () => {

    const options = {
      platform: 'amazon-alexa'
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>
      Your balance is: <say-as interpret-as="number">12345</say-as>.
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
      Your balance is: <say-as interpret-as="number">12345</say-as>.
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
      Your balance is: <say-as interpret-as="cardinal">12345</say-as>.
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
      Your balance is: <say-as interpret-as="cardinal">12345</say-as>.
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
