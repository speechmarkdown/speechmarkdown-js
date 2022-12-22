// tslint:disable-next-line:import-name
import dedent from 'ts-dedent';
import { SpeechMarkdown } from '../src/SpeechMarkdown';

describe('timbre-standard', () => {
  const speech = new SpeechMarkdown();

  const markdown = dedent`
    This is my original voice, without any modifications.
    (Now, imagine that I am much bigger.)[timbre:"+15%"]
    (Or, perhaps you prefer my voice when I'm very small.)[timbre:"-15%"]
  `;

  test('converts to SSML - Amazon Alexa', () => {
    const options = {
      platform: 'amazon-alexa',
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
    <speak>
    This is my original voice, without any modifications.
    Now, imagine that I am much bigger.
    Or, perhaps you prefer my voice when I'm very small.
    </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('converts to SSML - Amazon Polly', () => {
    const options = {
      platform: 'amazon-polly',
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
    <speak>
    This is my original voice, without any modifications.
    <amazon:effect vocal-tract-length="+15%">Now, imagine that I am much bigger.</amazon:effect>
    <amazon:effect vocal-tract-length="-15%">Or, perhaps you prefer my voice when I'm very small.</amazon:effect>
    </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('converts to SSML - Amazon Polly (Neural)', () => {
    const options = {
      platform: 'amazon-polly-neural',
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
    <speak>
    This is my original voice, without any modifications.
    Now, imagine that I am much bigger.
    Or, perhaps you prefer my voice when I'm very small.
    </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('converts to SSML - Google Assistant', () => {
    const options = {
      platform: 'google-assistant',
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
    <speak>
    This is my original voice, without any modifications.
    Now, imagine that I am much bigger.
    Or, perhaps you prefer my voice when I'm very small.
    </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('converts to SSML - Samsung Bixby', () => {
    const options = {
      platform: 'samsung-bixby',
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
    <speak>
    This is my original voice, without any modifications.
    Now, imagine that I am much bigger.
    Or, perhaps you prefer my voice when I'm very small.
    </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('converts to SSML - Microsoft Azure', () => {
    const options = {
      platform: 'microsoft-azure',
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
    <speak>
    This is my original voice, without any modifications.
    Now, imagine that I am much bigger.
    Or, perhaps you prefer my voice when I'm very small.
    </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('converts to Plain Text', () => {
    const options = {};
    const text = speech.toText(markdown, options);

    const expected = dedent`
    This is my original voice, without any modifications.
    Now, imagine that I am much bigger.
    Or, perhaps you prefer my voice when I'm very small.
    `;

    expect(text).toBe(expected);
  });
});
