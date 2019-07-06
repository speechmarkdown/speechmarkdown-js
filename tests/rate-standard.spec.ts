// tslint:disable-next-line:import-name
import dedent from 'ts-dedent';
import { SpeechMarkdown } from '../src/SpeechMarkdown';

describe('rate-standard-medium', () => {

  const speech = new SpeechMarkdown();

  const markdown = dedent`
    A (medium)[rate] rate 1
    A (medium)[rate:"medium"] rate 2
  `;

  test('converts to SSML - Amazon Alexa', () => {

    const options = {
      platform: 'amazon-alexa'
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>
      A <prosody rate="medium">medium</prosody> rate 1
      A <prosody rate="medium">medium</prosody> rate 2
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
      A <prosody rate="medium">medium</prosody> rate 1
      A <prosody rate="medium">medium</prosody> rate 2
      </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('converts to Plain Text', () => {

    const options = {
    };
    const text = speech.toText(markdown, options);

    const expected = dedent`
      A medium rate 1
      A medium rate 2
    `;

    expect(text).toBe(expected);
  });

});

describe.skip('rate-standard-x-slow', () => {

  const speech = new SpeechMarkdown();

  const markdown = dedent`
    A (x-slow)[rate:"x-slow"] rate
  `;

  test('converts to SSML - Amazon Alexa', () => {

    const options = {
      platform: 'amazon-alexa'
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>
      A <prosody rate="x-slow">x-slow</prosody> rate
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
      A <prosody rate="x-slow">x-slow</prosody> rate
      </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('converts to Plain Text', () => {

    const options = {
    };
    const text = speech.toText(markdown, options);

    const expected = dedent`
      A x-slow rate
    `;

    expect(text).toBe(expected);
  });

});

describe('rate-standard-slow', () => {

  const speech = new SpeechMarkdown();

  const markdown = dedent`
    A (slow)[rate:"slow"] rate
  `;

  test('converts to SSML - Amazon Alexa', () => {

    const options = {
      platform: 'amazon-alexa'
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>
      A <prosody rate="slow">slow</prosody> rate
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
      A <prosody rate="slow">slow</prosody> rate
      </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('converts to Plain Text', () => {

    const options = {
    };
    const text = speech.toText(markdown, options);

    const expected = dedent`
      A slow rate
    `;

    expect(text).toBe(expected);
  });

});

describe.skip('rate-standard-x-fast', () => {

  const speech = new SpeechMarkdown();

  const markdown = dedent`
    A (x-fast)[rate:"x-fast"] rate
  `;

  test('converts to SSML - Amazon Alexa', () => {

    const options = {
      platform: 'amazon-alexa'
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>
      A <prosody rate="x-fast">x-fast</prosody> rate
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
      A <prosody rate="x-fast">x-fast</prosody> rate
      </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('converts to Plain Text', () => {

    const options = {
    };
    const text = speech.toText(markdown, options);

    const expected = dedent`
      A x-fast rate
    `;

    expect(text).toBe(expected);
  });

});

describe('rate-standard-fast', () => {

  const speech = new SpeechMarkdown();

  const markdown = dedent`
    A (fast)[rate:"fast"] rate
  `;

  test('converts to SSML - Amazon Alexa', () => {

    const options = {
      platform: 'amazon-alexa'
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>
      A <prosody rate="fast">fast</prosody> rate
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
      A <prosody rate="fast">fast</prosody> rate
      </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('converts to Plain Text', () => {

    const options = {
    };
    const text = speech.toText(markdown, options);

    const expected = dedent`
      A fast rate
    `;

    expect(text).toBe(expected);
  });

});
