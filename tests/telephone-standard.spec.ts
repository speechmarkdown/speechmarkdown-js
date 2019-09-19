// tslint:disable-next-line:import-name
import dedent from 'ts-dedent';
import { SpeechMarkdown } from '../src/SpeechMarkdown';

describe('telephone-standard', () => {

  const speech = new SpeechMarkdown();

  const markdownNumber = dedent`
    The number is (5558675309)[telephone].
  `;

  const markdownParenthesis = dedent`
    The number is ((888) 555-1212)[phone].
  `;

  test('converts to SSML - Number - Amazon Alexa', () => {

    const options = {
      platform: 'amazon-alexa'
    };
    const ssml = speech.toSSML(markdownNumber, options);

    const expected = dedent`
      <speak>
      The number is <say-as interpret-as="telephone">5558675309</say-as>.
      </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('converts to SSML - Number - Google Assistant', () => {

    const options = {
      platform: 'google-assistant'
    };
    const ssml = speech.toSSML(markdownNumber, options);

    const expected = dedent`
      <speak>
      The number is <say-as interpret-as="telephone">5558675309</say-as>.
      </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('converts to Plain Text - Number', () => {

    const options = {
    };
    const text = speech.toText(markdownNumber, options);

    const expected = dedent`
      The number is 5558675309.
    `;

    expect(text).toBe(expected);
  });

  test('converts to SSML - Parenthesis - Amazon Alexa', () => {

    const options = {
      platform: 'amazon-alexa'
    };

    const ssml = speech.toSSML(markdownParenthesis, options);

    const expected = dedent`
      <speak>
      The number is <say-as interpret-as="telephone">(888) 555-1212</say-as>.
      </speak>
    `;


    expect(ssml).toBe(expected);
  });

  test('converts to SSML - Parenthesis - Google Assistant', () => {

    const options = {
      platform: 'google-assistant'
    };

    const ssml = speech.toSSML(markdownParenthesis, options);

    const expected = dedent`
      <speak>
      The number is <say-as interpret-as="telephone">(888) 555-1212</say-as>.
      </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('converts to Plain Text - Parenthesis', () => {

    const options = {
    };

    const text = speech.toText(markdownParenthesis, options);

    const expected = dedent`
      The number is (888) 555-1212.
    `;

    expect(text).toBe(expected);
  });

});
