// tslint:disable-next-line:import-name
import dedent from 'ts-dedent';
import { SpeechMarkdown } from '../src/SpeechMarkdown';

describe.skip('time-standard', () => {

  const speech = new SpeechMarkdown();

  const markdown = dedent`
    The date is (10-19-2016)[date:"mdy"].
  `;

  test('converts to SSML - Amazon Alexa', () => {

    const options = {
      platform: 'amazon-alexa'
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>
      The date is <say-as interpret-as="date" format="mdy">10-19-2016</say-as>.
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
      The date is <say-as interpret-as="date" format="mdy">10-19-2016</say-as>.
      </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('converts to Plain Text', () => {

    const options = {
    };
    const text = speech.toText(markdown, options);

    const expected = dedent`
      The date is 10-19-2016.
    `;

    expect(text).toBe(expected);
  });

});
