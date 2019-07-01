// tslint:disable-next-line:import-name
import dedent from 'ts-dedent';
import { SpeechMarkdown } from '../src/SpeechMarkdown';

describe.skip('telephone-standard', () => {

  const speech = new SpeechMarkdown();

  const markdown = dedent`
    The number is ((888) 555-1212)[phone].
    (5558675309)[telephone]
  `;

  test('converts to SSML - Amazon Alexa', () => {

    const options = {
      platform: 'amazon-alexa'
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>
      The number is <say-as interpret-as="telephone">(888) 555-1212</say-as>.
      <say-as interpret-as="telephone">5558675309</say-as>
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
      The number is <say-as interpret-as="telephone">(888) 555-1212</say-as>.
      <say-as interpret-as="telephone">5558675309</say-as>
      </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('converts to Plain Text', () => {

    const options = {
    };
    const text = speech.toText(markdown, options);

    const expected = dedent`
      The number is (888) 555-1212.
      5558675309
    `;

    expect(text).toBe(expected);
  });

});
