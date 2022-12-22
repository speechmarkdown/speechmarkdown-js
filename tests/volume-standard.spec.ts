// tslint:disable-next-line:import-name
import dedent from 'ts-dedent';
import { SpeechMarkdown } from '../src/SpeechMarkdown';

describe('volume-standard-medium', () => {
  const speech = new SpeechMarkdown();

  const markdown = dedent`
    A (medium)[vol] volume 1
    A (medium)[volume] volume 2
    A (medium)[vol:"medium"] volume 3
    A (medium)[volume:"medium"] volume 4
  `;

  test('converts to SSML - Amazon Alexa', () => {
    const options = {
      platform: 'amazon-alexa',
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>
      A <prosody volume="medium">medium</prosody> volume 1
      A <prosody volume="medium">medium</prosody> volume 2
      A <prosody volume="medium">medium</prosody> volume 3
      A <prosody volume="medium">medium</prosody> volume 4
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
      A <prosody volume="medium">medium</prosody> volume 1
      A <prosody volume="medium">medium</prosody> volume 2
      A <prosody volume="medium">medium</prosody> volume 3
      A <prosody volume="medium">medium</prosody> volume 4
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
      A <prosody volume="medium">medium</prosody> volume 1
      A <prosody volume="medium">medium</prosody> volume 2
      A <prosody volume="medium">medium</prosody> volume 3
      A <prosody volume="medium">medium</prosody> volume 4
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
      A <prosody volume="medium">medium</prosody> volume 1
      A <prosody volume="medium">medium</prosody> volume 2
      A <prosody volume="medium">medium</prosody> volume 3
      A <prosody volume="medium">medium</prosody> volume 4
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
      A <prosody volume="medium">medium</prosody> volume 1
      A <prosody volume="medium">medium</prosody> volume 2
      A <prosody volume="medium">medium</prosody> volume 3
      A <prosody volume="medium">medium</prosody> volume 4
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
      A <prosody volume="medium">medium</prosody> volume 1
      A <prosody volume="medium">medium</prosody> volume 2
      A <prosody volume="medium">medium</prosody> volume 3
      A <prosody volume="medium">medium</prosody> volume 4
      </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('converts to Plain Text', () => {
    const options = {};
    const text = speech.toText(markdown, options);

    const expected = dedent`
      A medium volume 1
      A medium volume 2
      A medium volume 3
      A medium volume 4
    `;

    expect(text).toBe(expected);
  });
});

describe('volume-standard-silent', () => {
  const speech = new SpeechMarkdown();

  const markdown = dedent`
    A (silent)[volume:"silent"] volume
  `;

  test('converts to SSML - Amazon Alexa', () => {
    const options = {
      platform: 'amazon-alexa',
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>
      A <prosody volume="silent">silent</prosody> volume
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
      A <prosody volume="silent">silent</prosody> volume
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
      A <prosody volume="silent">silent</prosody> volume
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
      A <prosody volume="silent">silent</prosody> volume
      </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('converts to Plain Text', () => {
    const options = {};
    const text = speech.toText(markdown, options);

    const expected = dedent`
      A silent volume
    `;

    expect(text).toBe(expected);
  });
});

describe('volume-standard-x-soft', () => {
  const speech = new SpeechMarkdown();

  const markdown = dedent`
    A (xsoft)[volume:"x-soft"] volume
  `;

  test('converts to SSML - Amazon Alexa', () => {
    const options = {
      platform: 'amazon-alexa',
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>
      A <prosody volume="x-soft">xsoft</prosody> volume
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
      A <prosody volume="x-soft">xsoft</prosody> volume
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
      A <prosody volume="x-soft">xsoft</prosody> volume
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
      A <prosody volume="x-soft">xsoft</prosody> volume
      </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('converts to Plain Text', () => {
    const options = {};
    const text = speech.toText(markdown, options);

    const expected = dedent`
      A xsoft volume
    `;

    expect(text).toBe(expected);
  });
});

describe('volume-standard-soft', () => {
  const speech = new SpeechMarkdown();

  const markdown = dedent`
    A (soft)[volume:"soft"] volume
  `;

  test('converts to SSML - Amazon Alexa', () => {
    const options = {
      platform: 'amazon-alexa',
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>
      A <prosody volume="soft">soft</prosody> volume
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
      A <prosody volume="soft">soft</prosody> volume
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
      A <prosody volume="soft">soft</prosody> volume
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
      A <prosody volume="soft">soft</prosody> volume
      </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('converts to Plain Text', () => {
    const options = {};
    const text = speech.toText(markdown, options);

    const expected = dedent`
      A soft volume
    `;

    expect(text).toBe(expected);
  });
});

describe('volume-standard-x-loud', () => {
  const speech = new SpeechMarkdown();

  const markdown = dedent`
    A (xloud)[volume:"x-loud"] volume
  `;

  test('converts to SSML - Amazon Alexa', () => {
    const options = {
      platform: 'amazon-alexa',
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>
      A <prosody volume="x-loud">xloud</prosody> volume
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
      A <prosody volume="x-loud">xloud</prosody> volume
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
      A <prosody volume="x-loud">xloud</prosody> volume
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
      A <prosody volume="x-loud">xloud</prosody> volume
      </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('converts to Plain Text', () => {
    const options = {};
    const text = speech.toText(markdown, options);

    const expected = dedent`
      A xloud volume
    `;

    expect(text).toBe(expected);
  });
});

describe('volume-standard-loud', () => {
  const speech = new SpeechMarkdown();

  const markdown = dedent`
    A (loud)[volume:"loud"] volume
  `;

  test('converts to SSML - Amazon Alexa', () => {
    const options = {
      platform: 'amazon-alexa',
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>
      A <prosody volume="loud">loud</prosody> volume
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
      A <prosody volume="loud">loud</prosody> volume
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
      A <prosody volume="loud">loud</prosody> volume
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
      A <prosody volume="loud">loud</prosody> volume
      </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('converts to Plain Text', () => {
    const options = {};
    const text = speech.toText(markdown, options);

    const expected = dedent`
      A loud volume
    `;

    expect(text).toBe(expected);
  });
});
