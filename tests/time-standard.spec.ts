// tslint:disable-next-line:import-name
import dedent from 'ts-dedent';
import { SpeechMarkdown } from '../src/SpeechMarkdown';

describe('time-standard', () => {

  const speech = new SpeechMarkdown();

  const markdown = dedent`
    The time is (2:30pm)[time:"hms12"].
  `;

  test('converts to SSML - Amazon Alexa', () => {

    const options = {
      platform: 'amazon-alexa'
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>
      The time is <say-as interpret-as="time" format="hms12">2:30pm</say-as>.
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
      The time is <say-as interpret-as="time" format="hms12">2:30pm</say-as>.
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
      The time is 2:30pm.
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
      The time is <say-as interpret-as="time" format="hms12">2:30pm</say-as>.
      </speak>
    `;

    expect(ssml).toBe(expected);
  });
  test('converts to Plain Text', () => {

    const options = {
    };
    const text = speech.toText(markdown, options);

    const expected = dedent`
      The time is 2:30pm.
    `;

    expect(text).toBe(expected);
  });

});
