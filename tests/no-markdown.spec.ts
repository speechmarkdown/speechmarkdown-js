// tslint:disable-next-line:import-name
import dedent from 'ts-dedent';
import { SpeechMarkdown } from '../src/SpeechMarkdown';

describe('no-markdown', () => {

  const speech = new SpeechMarkdown();

  const markdown = dedent`
    Text line 1

    Text line 2
  `;

  test('converts to SSML - Amazon Alexa', () => {

    const options = {
      platform: 'amazon-alexa'
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>
      Text line 1

      Text line 2
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
      Text line 1

      Text line 2
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
      Text line 1

      Text line 2
      </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('converts to Plain Text', () => {

    const options = {
    };
    const text = speech.toText(markdown, options);

    const expected = dedent`
      Text line 1

      Text line 2
    `;

    expect(text).toBe(expected);
  });

});
