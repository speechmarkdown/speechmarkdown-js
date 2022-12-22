// tslint:disable-next-line:import-name
import dedent from 'ts-dedent';
import { SpeechMarkdown } from '../src/SpeechMarkdown';

describe('voice-customize custom name', () => {
  const speech = new SpeechMarkdown();

  const markdown = dedent`
    Why do you keep switching voices (from Scott)[voice:"Scott"] to (Sarah)[voice:"Sarah"]?
    Why do you keep switching voices (from Scott)[voice:'Scott'] to (Sarah)[voice:'Sarah']?
  `;

  test('converts to SSML - Amazon Alexa', () => {
    const options = {
      platform: 'amazon-alexa',
      voices: {
        Scott: { voice: { name: 'Brian' } },
        Sarah: { voice: { name: 'Kendra' } },
      },
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>
      Why do you keep switching voices <voice name="Brian">from Scott</voice> to <voice name="Kendra">Sarah</voice>?
      Why do you keep switching voices <voice name="Brian">from Scott</voice> to <voice name="Kendra">Sarah</voice>?
      </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('converts to SSML - Google Assistant', () => {
    const options = {
      platform: 'google-assistant',
      voices: {
        Scott: { voice: { gender: 'male' } },
        Sarah: { voice: { gender: 'female' } },
      },
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>
      Why do you keep switching voices <voice gender="male">from Scott</voice> to <voice gender="female">Sarah</voice>?
      Why do you keep switching voices <voice gender="male">from Scott</voice> to <voice gender="female">Sarah</voice>?
      </speak>
    `;

    expect(ssml).toBe(expected);
  });
});

describe('voice-customize lowercase name', () => {
  const speech = new SpeechMarkdown();

  const markdown = dedent`
    Why do you keep switching voices (from Scott)[voice:"scott"] to (Sarah)[voice:"sarah"]?
    Why do you keep switching voices (from Scott)[voice:'scott'] to (Sarah)[voice:'sarah']?
  `;

  test('converts to SSML - Amazon Alexa', () => {
    const options = {
      platform: 'amazon-alexa',
      voices: {
        Scott: { voice: { name: 'Brian' } },
        Sarah: { voice: { name: 'Kendra' } },
      },
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>
      Why do you keep switching voices <voice name="Brian">from Scott</voice> to <voice name="Kendra">Sarah</voice>?
      Why do you keep switching voices <voice name="Brian">from Scott</voice> to <voice name="Kendra">Sarah</voice>?
      </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('converts to SSML - Google Assistant', () => {
    const options = {
      platform: 'google-assistant',
      voices: {
        Scott: { voice: { gender: 'male' } },
        Sarah: { voice: { gender: 'female' } },
      },
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>
      Why do you keep switching voices <voice gender="male">from Scott</voice> to <voice gender="female">Sarah</voice>?
      Why do you keep switching voices <voice gender="male">from Scott</voice> to <voice gender="female">Sarah</voice>?
      </speak>
    `;

    expect(ssml).toBe(expected);
  });
});

describe('voice-customize override default', () => {
  const speech = new SpeechMarkdown();

  const markdown = dedent`
    Why do you keep switching voices (from Brian)[voice:"Brian"] to (Sarah)[voice:"Sarah"]?
    Why do you keep switching voices (from Brian)[voice:'Brian'] to (Sarah)[voice:'Sarah']?
  `;

  test('converts to SSML - Amazon Alexa', () => {
    const options = {
      platform: 'amazon-alexa',
      voices: {
        Brian: { voice: { name: 'Joey' } },
        Sarah: { voice: { name: 'Kendra' } },
      },
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>
      Why do you keep switching voices <voice name="Joey">from Brian</voice> to <voice name="Kendra">Sarah</voice>?
      Why do you keep switching voices <voice name="Joey">from Brian</voice> to <voice name="Kendra">Sarah</voice>?
      </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('converts to SSML - Google Assistant', () => {
    const options = {
      platform: 'google-assistant',
      voices: {
        Brian: { voice: { gender: 'male' } },
        Sarah: { voice: { gender: 'female' } },
      },
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>
      Why do you keep switching voices <voice gender="male">from Brian</voice> to <voice gender="female">Sarah</voice>?
      Why do you keep switching voices <voice gender="male">from Brian</voice> to <voice gender="female">Sarah</voice>?
      </speak>
    `;

    expect(ssml).toBe(expected);
  });
});

describe('voice-customize custom tags', () => {
  const speech = new SpeechMarkdown();

  const markdown = dedent`
    Why do you keep switching voices (from Scott)[voice:"Scott"] to (Sarah)[voice:"Sarah"]?
    Why do you keep switching voices (from Scott)[voice:'Scott'] to (Sarah)[voice:'Sarah']?
  `;

  test('converts to SSML - Amazon Alexa', () => {
    const options = {
      platform: 'amazon-alexa',
      voices: {
        Scott: { voice: { name: 'Brian' } },
        Sarah: {
          voice: { name: 'Brian' },
          prosody: { pitch: 'high', volume: 'soft' },
        },
      },
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>
      Why do you keep switching voices <voice name="Brian">from Scott</voice> to <prosody pitch="high" volume="soft"><voice name="Brian">Sarah</voice></prosody>?
      Why do you keep switching voices <voice name="Brian">from Scott</voice> to <prosody pitch="high" volume="soft"><voice name="Brian">Sarah</voice></prosody>?
      </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('converts to SSML - Google Assistant', () => {
    const options = {
      platform: 'google-assistant',
      voices: {
        Scott: { voice: { gender: 'male' } },
        Sarah: {
          voice: { gender: 'male' },
          prosody: { pitch: 'high', volume: 'soft' },
        },
      },
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>
      Why do you keep switching voices <voice gender="male">from Scott</voice> to <prosody pitch="high" volume="soft"><voice gender="male">Sarah</voice></prosody>?
      Why do you keep switching voices <voice gender="male">from Scott</voice> to <prosody pitch="high" volume="soft"><voice gender="male">Sarah</voice></prosody>?
      </speak>
    `;

    expect(ssml).toBe(expected);
  });
});
