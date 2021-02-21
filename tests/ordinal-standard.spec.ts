// tslint:disable-next-line:import-name
import dedent from 'ts-dedent';
import { SpeechMarkdown } from '../src/SpeechMarkdown';

describe('ordinal-standard', () => {

  const speech = new SpeechMarkdown();

  const markdown = dedent`
    The others came in 2nd and (3)[ordinal].
  `;

  test('converts to SSML - Amazon Alexa', () => {

    const options = {
      platform: 'amazon-alexa'
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>
      The others came in 2nd and <say-as interpret-as="ordinal">3</say-as>.
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
      The others came in 2nd and <say-as interpret-as="ordinal">3</say-as>.
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
      The others came in 2nd and <say-as interpret-as="ordinal">3</say-as>.
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
      The others came in 2nd and <say-as interpret-as="ordinal">3</say-as>.
      </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('converts to Plain Text', () => {

    const options = {
    };
    const text = speech.toText(markdown, options);

    const expected = dedent`
      The others came in 2nd and 3.
    `;

    expect(text).toBe(expected);
  });

});
