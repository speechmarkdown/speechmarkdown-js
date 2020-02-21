// tslint:disable-next-line:import-name
import dedent from 'ts-dedent';
import { SpeechMarkdown } from '../src/SpeechMarkdown';

describe('options-includeSpeakTag default to true', () => {

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

  test('converts to SSML - Samsung Bixby', () => {

    const options = {
      platform: 'samsung-bixby'
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

describe('options-includeSpeakTag set to true', () => {

  const speech = new SpeechMarkdown();

  const markdown = dedent`
    Text line
  `;

  test('converts to SSML - Amazon Alexa', () => {

    const options = {
      platform: 'amazon-alexa',
      includeSpeakTag: true,
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
      includeSpeakTag: true,
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>
      Text line
      </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('converts to SSML - Samsung Bixby', () => {

    const options = {
      platform: 'samsung-bixby',
      includeSpeakTag: true,
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


describe('options-includeSpeakTag set to false', () => {

  const speech = new SpeechMarkdown();

  const markdown = dedent`
    Text line
  `;

  test('converts to SSML - Amazon Alexa', () => {

    const options = {
      platform: 'amazon-alexa',
      includeSpeakTag: false,
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      Text line
    `;

    expect(ssml).toBe(expected);
  });

  test('converts to SSML - Google Assistant', () => {

    const options = {
      platform: 'google-assistant',
      includeSpeakTag: false,
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      Text line
    `;

    expect(ssml).toBe(expected);
  });

  test('converts to SSML - Samsung Bixby', () => {

    const options = {
      platform: 'samsung-bixby',
      includeSpeakTag: false,
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      Text line
    `;

    expect(ssml).toBe(expected);
  });

});
