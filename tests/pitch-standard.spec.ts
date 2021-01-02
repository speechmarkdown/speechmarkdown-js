// tslint:disable-next-line:import-name
import dedent from 'ts-dedent';
import { SpeechMarkdown } from '../src/SpeechMarkdown';

describe('pitch-standard-medium', () => {
  const speech = new SpeechMarkdown();

  const markdown = dedent`
    A (medium)[pitch] pitch 1
    A (medium)[pitch:"medium"] pitch 2
    A (medium)[pitch:'medium'] pitch 3
  `;

  test('converts to SSML - Amazon Alexa', () => {
    const options = {
      platform: 'amazon-alexa',
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>
      A <prosody pitch="medium">medium</prosody> pitch 1
      A <prosody pitch="medium">medium</prosody> pitch 2
      A <prosody pitch="medium">medium</prosody> pitch 3
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
      A <prosody pitch="medium">medium</prosody> pitch 1
      A <prosody pitch="medium">medium</prosody> pitch 2
      A <prosody pitch="medium">medium</prosody> pitch 3
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
      A <prosody pitch="medium">medium</prosody> pitch 1
      A <prosody pitch="medium">medium</prosody> pitch 2
      A <prosody pitch="medium">medium</prosody> pitch 3
      </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('converts to Plain Text', () => {
    const options = {};
    const text = speech.toText(markdown, options);

    const expected = dedent`
      A medium pitch 1
      A medium pitch 2
      A medium pitch 3
    `;

    expect(text).toBe(expected);
  });
});

describe('pitch-standard-x-low', () => {
  const speech = new SpeechMarkdown();

  const markdown = dedent`
    A (xlow)[pitch:"x-low"] pitch
    A (xlow)[pitch:'x-low'] pitch
  `;

  test('converts to SSML - Amazon Alexa', () => {
    const options = {
      platform: 'amazon-alexa',
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>
      A <prosody pitch="x-low">xlow</prosody> pitch
      A <prosody pitch="x-low">xlow</prosody> pitch
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
      A <prosody pitch="x-low">xlow</prosody> pitch
      A <prosody pitch="x-low">xlow</prosody> pitch
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
      A <prosody pitch="x-low">xlow</prosody> pitch
      A <prosody pitch="x-low">xlow</prosody> pitch
      </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('converts to Plain Text', () => {
    const options = {};
    const text = speech.toText(markdown, options);

    const expected = dedent`
      A xlow pitch
      A xlow pitch
    `;

    expect(text).toBe(expected);
  });
});

describe('pitch-standard-low', () => {
  const speech = new SpeechMarkdown();

  const markdown = dedent`
    A (low)[pitch:"low"] pitch
    A (low)[pitch:'low'] pitch
  `;

  test('converts to SSML - Amazon Alexa', () => {
    const options = {
      platform: 'amazon-alexa',
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>
      A <prosody pitch="low">low</prosody> pitch
      A <prosody pitch="low">low</prosody> pitch
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
      A <prosody pitch="low">low</prosody> pitch
      A <prosody pitch="low">low</prosody> pitch
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
      A <prosody pitch="low">low</prosody> pitch
      A <prosody pitch="low">low</prosody> pitch
      </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('converts to Plain Text', () => {
    const options = {};
    const text = speech.toText(markdown, options);

    const expected = dedent`
      A low pitch
      A low pitch
    `;

    expect(text).toBe(expected);
  });
});

describe('pitch-standard-x-high', () => {
  const speech = new SpeechMarkdown();

  const markdown = dedent`
    A (xhigh)[pitch:"x-high"] pitch
    A (xhigh)[pitch:'x-high'] pitch
  `;

  test('converts to SSML - Amazon Alexa', () => {
    const options = {
      platform: 'amazon-alexa',
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>
      A <prosody pitch="x-high">xhigh</prosody> pitch
      A <prosody pitch="x-high">xhigh</prosody> pitch
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
      A <prosody pitch="x-high">xhigh</prosody> pitch
      A <prosody pitch="x-high">xhigh</prosody> pitch
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
      A <prosody pitch="x-high">xhigh</prosody> pitch
      A <prosody pitch="x-high">xhigh</prosody> pitch
      </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('converts to Plain Text', () => {
    const options = {};
    const text = speech.toText(markdown, options);

    const expected = dedent`
      A xhigh pitch
      A xhigh pitch
    `;

    expect(text).toBe(expected);
  });
});

describe('pitch-standard-high', () => {
  const speech = new SpeechMarkdown();

  const markdown = dedent`
    A (high)[pitch:"high"] pitch
    A (high)[pitch:'high'] pitch
  `;

  test('converts to SSML - Amazon Alexa', () => {
    const options = {
      platform: 'amazon-alexa',
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>
      A <prosody pitch="high">high</prosody> pitch
      A <prosody pitch="high">high</prosody> pitch
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
      A <prosody pitch="high">high</prosody> pitch
      A <prosody pitch="high">high</prosody> pitch
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
      A <prosody pitch="high">high</prosody> pitch
      A <prosody pitch="high">high</prosody> pitch
      </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('converts to Plain Text', () => {
    const options = {};
    const text = speech.toText(markdown, options);

    const expected = dedent`
      A high pitch
      A high pitch
    `;

    expect(text).toBe(expected);
  });
});
