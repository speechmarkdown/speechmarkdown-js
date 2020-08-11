// tslint:disable-next-line:import-name
import dedent from 'ts-dedent';
import { SpeechMarkdown } from '../src/SpeechMarkdown';

describe('rate-standard-medium', () => {
  const speech = new SpeechMarkdown();

  const markdown = dedent`
    A (medium)[rate] rate 1
    A (medium)[rate:"medium"] rate 2
    A (medium)[rate:'medium'] rate 3
  `;

  test('converts to SSML - Amazon Alexa', () => {
    const options = {
      platform: 'amazon-alexa',
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>
      A <prosody rate="medium">medium</prosody> rate 1
      A <prosody rate="medium">medium</prosody> rate 2
      A <prosody rate="medium">medium</prosody> rate 3
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
      A <prosody rate="medium">medium</prosody> rate 1
      A <prosody rate="medium">medium</prosody> rate 2
      A <prosody rate="medium">medium</prosody> rate 3
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
      A medium rate 1
      A medium rate 2
      A medium rate 3
      </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('converts to Plain Text', () => {
    const options = {};
    const text = speech.toText(markdown, options);

    const expected = dedent`
      A medium rate 1
      A medium rate 2
      A medium rate 3
    `;

    expect(text).toBe(expected);
  });
});

describe('rate-standard-x-slow', () => {
  const speech = new SpeechMarkdown();

  const markdown = dedent`
    A (xslow)[rate:"x-slow"] rate
    A (xslow)[rate:'x-slow'] rate
  `;

  test('converts to SSML - Amazon Alexa', () => {
    const options = {
      platform: 'amazon-alexa',
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>
      A <prosody rate="x-slow">xslow</prosody> rate
      A <prosody rate="x-slow">xslow</prosody> rate
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
      A <prosody rate="x-slow">xslow</prosody> rate
      A <prosody rate="x-slow">xslow</prosody> rate
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
      A xslow rate
      A xslow rate
      </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('converts to Plain Text', () => {
    const options = {};
    const text = speech.toText(markdown, options);

    const expected = dedent`
      A xslow rate
      A xslow rate
    `;

    expect(text).toBe(expected);
  });
});

describe('rate-standard-slow', () => {
  const speech = new SpeechMarkdown();

  const markdown = dedent`
    A (slow)[rate:"slow"] rate
    A (slow)[rate:'slow'] rate
  `;

  test('converts to SSML - Amazon Alexa', () => {
    const options = {
      platform: 'amazon-alexa',
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>
      A <prosody rate="slow">slow</prosody> rate
      A <prosody rate="slow">slow</prosody> rate
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
      A <prosody rate="slow">slow</prosody> rate
      A <prosody rate="slow">slow</prosody> rate
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
      A slow rate
      A slow rate
      </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('converts to Plain Text', () => {
    const options = {};
    const text = speech.toText(markdown, options);

    const expected = dedent`
      A slow rate
      A slow rate
    `;

    expect(text).toBe(expected);
  });
});

describe('rate-standard-x-fast', () => {
  const speech = new SpeechMarkdown();

  const markdown = dedent`
    A (xfast)[rate:"x-fast"] rate
    A (xfast)[rate:'x-fast'] rate
  `;

  test('converts to SSML - Amazon Alexa', () => {
    const options = {
      platform: 'amazon-alexa',
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>
      A <prosody rate="x-fast">xfast</prosody> rate
      A <prosody rate="x-fast">xfast</prosody> rate
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
      A <prosody rate="x-fast">xfast</prosody> rate
      A <prosody rate="x-fast">xfast</prosody> rate
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
      A xfast rate
      A xfast rate
      </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('converts to Plain Text', () => {
    const options = {};
    const text = speech.toText(markdown, options);

    const expected = dedent`
      A xfast rate
      A xfast rate
    `;

    expect(text).toBe(expected);
  });
});

describe('rate-standard-fast', () => {
  const speech = new SpeechMarkdown();

  const markdown = dedent`
    A (fast)[rate:"fast"] rate
    A (fast)[rate:'fast'] rate
  `;

  test('converts to SSML - Amazon Alexa', () => {
    const options = {
      platform: 'amazon-alexa',
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>
      A <prosody rate="fast">fast</prosody> rate
      A <prosody rate="fast">fast</prosody> rate
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
      A <prosody rate="fast">fast</prosody> rate
      A <prosody rate="fast">fast</prosody> rate
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
      A fast rate
      A fast rate
      </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('converts to Plain Text', () => {
    const options = {};
    const text = speech.toText(markdown, options);

    const expected = dedent`
      A fast rate
      A fast rate
    `;

    expect(text).toBe(expected);
  });
});
