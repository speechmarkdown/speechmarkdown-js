// tslint:disable-next-line:import-name
import dedent from 'ts-dedent';
import { SpeechMarkdown } from '../src/SpeechMarkdown';

describe('options-includeFormatterComment default to false', () => {

  const speech = new SpeechMarkdown();

  const markdown = dedent`
    Text line
  `;

  test('converts to SSML - Amazon Alexa', () => {

    const options = {
      platform: 'amazon-alexa'
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>
      Text line
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
      Text line
      </speak>
    `;

    expect(ssml).toBe(expected);
  });

});

describe('options-includeFormatterComment set to false', () => {

  const speech = new SpeechMarkdown();

  const markdown = dedent`
    Text line
  `;

  test('converts to SSML - Amazon Alexa', () => {

    const options = {
      platform: 'amazon-alexa',
      includeFormatterComment: false,
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>
      Text line
      </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('converts to SSML - Google Assistant', () => {

    const options = {
      platform: 'google-assistant',
      includeFormatterComment: false,
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>
      Text line
      </speak>
    `;

    expect(ssml).toBe(expected);
  });

});

describe('options-includeFormatterComment set to true', () => {

  const speech = new SpeechMarkdown();

  const markdown = dedent`
    Text line
  `;

  test('converts to SSML - Amazon Alexa', () => {

    const options = {
      platform: 'amazon-alexa',
      includeFormatterComment: true,
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <!-- Speech Markdown for Amazon Alexa -->
      <speak>
      Text line
      </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('converts to SSML - Google Assistant', () => {

    const options = {
      platform: 'google-assistant',
      includeFormatterComment: true,
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <!-- Speech Markdown for Google Assistant -->
      <speak>
      Text line
      </speak>
    `;

    expect(ssml).toBe(expected);
  });

});

