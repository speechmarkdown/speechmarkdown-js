// tslint:disable-next-line:import-name
import dedent from 'ts-dedent';
import { SpeechMarkdown } from '../src/SpeechMarkdown';

describe('say-as-modifiers last modifier wins', () => {

  const speech = new SpeechMarkdown();

  const markdown = dedent`
    Some (text)[address;number;time:"hms12";date;chars]
  `;

  test('converts to SSML - Amazon Alexa', () => {

    const options = {
      platform: 'amazon-alexa'
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>
      Some <say-as interpret-as="characters">text</say-as>
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
      Some <say-as interpret-as="characters">text</say-as>
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
      Some text
      </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('converts to Plain Text', () => {

    const options = {
    };
    const text = speech.toText(markdown, options);

    const expected = dedent`
      Some text
    `;

    expect(text).toBe(expected);
  });

});
