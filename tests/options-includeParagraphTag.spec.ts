// tslint:disable-next-line:import-name
import dedent from 'ts-dedent';
import { SpeechMarkdown } from '../src/SpeechMarkdown';

describe('options-includeParagraphTag default to false', () => {

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

describe('options-includeParagraphTag set to false', () => {

  const speech = new SpeechMarkdown();

  const markdown = dedent`
    Text line
  `;

  test('converts to SSML - Amazon Alexa', () => {

    const options = {
      platform: 'amazon-alexa',
      includeParagraphTag: false,
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
      includeParagraphTag: false,
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
      includeParagraphTag: true,
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>
      <p>
      Text line
      </p>
      </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('converts to SSML - Google Assistant', () => {

    const options = {
      platform: 'google-assistant',
      includeParagraphTag: true,
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>
      <p>
      Text line
      </p>
      </speak>
    `;

    expect(ssml).toBe(expected);
  });

});

