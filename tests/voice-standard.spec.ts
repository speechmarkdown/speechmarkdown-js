// tslint:disable-next-line:import-name
import dedent from 'ts-dedent';
import { SpeechMarkdown } from '../src/SpeechMarkdown';

describe('voice-standard', () => {
  const speech = new SpeechMarkdown();

  const markdown = dedent`
    Why do you keep switching voices (from one)[voice:"Brian"] to (the other)[voice:"Kendra"]?
    Why do you keep switching voices (from one)[voice:'Brian'] to (the other)[voice:'Kendra']?
  `;

  test('converts to SSML - Amazon Alexa', () => {
    const options = {
      platform: 'amazon-alexa',
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>
      Why do you keep switching voices <voice name="Brian">from one</voice> to <voice name="Kendra">the other</voice>?
      Why do you keep switching voices <voice name="Brian">from one</voice> to <voice name="Kendra">the other</voice>?
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
      Why do you keep switching voices <voice name="Brian">from one</voice> to <voice name="Kendra">the other</voice>?
      Why do you keep switching voices <voice name="Brian">from one</voice> to <voice name="Kendra">the other</voice>?
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
      Why do you keep switching voices <voice name="Brian">from one</voice> to <voice name="Kendra">the other</voice>?
      Why do you keep switching voices <voice name="Brian">from one</voice> to <voice name="Kendra">the other</voice>?
      </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('converts to SSML - Google Assistant', () => {
    const options = {
      platform: 'google-assistant',
    };
    const googleMarkdown = dedent`
      Why do you keep switching voices (from one)[voice:"en-GB-Standard-A"] to (the other)[voice:"en-US-Neural2-F"]?
      Why do you keep switching voices (from one)[voice:'en-GB-Standard-A'] to (the other)[voice:'en-US-Neural2-F']?
    `;
    const ssml = speech.toSSML(googleMarkdown, options);

    const expected = dedent`
      <speak>
      Why do you keep switching voices <voice name="en-GB-Standard-A">from one</voice> to <voice name="en-US-Neural2-F">the other</voice>?
      Why do you keep switching voices <voice name="en-GB-Standard-A">from one</voice> to <voice name="en-US-Neural2-F">the other</voice>?
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
      Why do you keep switching voices from one to the other?
      Why do you keep switching voices from one to the other?
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
      Why do you keep switching voices <voice name="Brian">from one</voice> to <voice name="Kendra">the other</voice>?
      Why do you keep switching voices <voice name="Brian">from one</voice> to <voice name="Kendra">the other</voice>?
      </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('converts to Plain Text', () => {
    const options = {};
    const text = speech.toText(markdown, options);

    const expected = dedent`
      Why do you keep switching voices from one to the other?
      Why do you keep switching voices from one to the other?
    `;

    expect(text).toBe(expected);
  });
});

describe('voice-standard lowercase name', () => {
  const speech = new SpeechMarkdown();

  const markdown = dedent`
    Why do you keep switching voices (from one)[voice:"brian"] to (the other)[voice:"kendra"]?
    Why do you keep switching voices (from one)[voice:'brian'] to (the other)[voice:'kendra']?
  `;

  test('converts to SSML - Amazon Alexa', () => {
    const options = {
      platform: 'amazon-alexa',
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>
      Why do you keep switching voices <voice name="Brian">from one</voice> to <voice name="Kendra">the other</voice>?
      Why do you keep switching voices <voice name="Brian">from one</voice> to <voice name="Kendra">the other</voice>?
      </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('converts to SSML - Google Assistant', () => {
    const options = {
      platform: 'google-assistant',
    };
    const googleMarkdown = dedent`
      Why do you keep switching voices (from one)[voice:"en-gb-standard-a"] to (the other)[voice:"en-us-neural2-f"]?
      Why do you keep switching voices (from one)[voice:'en-gb-standard-a'] to (the other)[voice:'en-us-neural2-f']?
    `;
    const ssml = speech.toSSML(googleMarkdown, options);

    const expected = dedent`
      <speak>
      Why do you keep switching voices <voice name="en-GB-Standard-A">from one</voice> to <voice name="en-US-Neural2-F">the other</voice>?
      Why do you keep switching voices <voice name="en-GB-Standard-A">from one</voice> to <voice name="en-US-Neural2-F">the other</voice>?
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
      Why do you keep switching voices from one to the other?
      Why do you keep switching voices from one to the other?
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
      Why do you keep switching voices <voice name="Brian">from one</voice> to <voice name="Kendra">the other</voice>?
      Why do you keep switching voices <voice name="Brian">from one</voice> to <voice name="Kendra">the other</voice>?
      </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('converts to Plain Text', () => {
    const options = {};
    const text = speech.toText(markdown, options);

    const expected = dedent`
      Why do you keep switching voices from one to the other?
      Why do you keep switching voices from one to the other?
    `;

    expect(text).toBe(expected);
  });
});

describe('voice-standard unknown name', () => {
  const speech = new SpeechMarkdown();

  const markdown = dedent`
    Why do you keep switching voices (from one)[voice:"brianzzzz"] to (the other)[voice:"kendra"]?
    Why do you keep switching voices (from one)[voice:'brianzzzz'] to (the other)[voice:'kendra']?
  `;

  test('converts to SSML - Amazon Alexa', () => {
    const options = {
      platform: 'amazon-alexa',
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>
      Why do you keep switching voices <voice name="Brianzzzz">from one</voice> to <voice name="Kendra">the other</voice>?
      Why do you keep switching voices <voice name="Brianzzzz">from one</voice> to <voice name="Kendra">the other</voice>?
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
      Why do you keep switching voices from one to the other?
      Why do you keep switching voices from one to the other?
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
      Why do you keep switching voices from one to the other?
      Why do you keep switching voices from one to the other?
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
      Why do you keep switching voices <voice name="Brianzzzz">from one</voice> to <voice name="Kendra">the other</voice>?
      Why do you keep switching voices <voice name="Brianzzzz">from one</voice> to <voice name="Kendra">the other</voice>?
      </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('converts to Plain Text', () => {
    const options = {};
    const text = speech.toText(markdown, options);

    const expected = dedent`
      Why do you keep switching voices from one to the other?
      Why do you keep switching voices from one to the other?
    `;

    expect(text).toBe(expected);
  });
});

describe('voice-standard device name', () => {
  const speech = new SpeechMarkdown();

  const markdown = dedent`
    Why do you keep switching voices (from one)[voice:"device"] to (the other)[voice:"kendra"]?
    Why do you keep switching voices (from one)[voice:'device'] to (the other)[voice:'kendra']?
  `;

  test('converts to SSML - Amazon Alexa', () => {
    const options = {
      platform: 'amazon-alexa',
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>
      Why do you keep switching voices from one to <voice name="Kendra">the other</voice>?
      Why do you keep switching voices from one to <voice name="Kendra">the other</voice>?
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
      Why do you keep switching voices from one to the other?
      Why do you keep switching voices from one to the other?
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
      Why do you keep switching voices from one to the other?
      Why do you keep switching voices from one to the other?
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
      Why do you keep switching voices from one to <voice name="Kendra">the other</voice>?
      Why do you keep switching voices from one to <voice name="Kendra">the other</voice>?
      </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('converts to Plain Text', () => {
    const options = {};
    const text = speech.toText(markdown, options);

    const expected = dedent`
      Why do you keep switching voices from one to the other?
      Why do you keep switching voices from one to the other?
    `;

    expect(text).toBe(expected);
  });
});

describe('voice-standard new Alexa voices', () => {
  const speech = new SpeechMarkdown();

  test('converts to SSML - Amazon Alexa', () => {
    const markdown = "Try the new (voice)[voice:'Lupe'].";

    const options = {
      platform: 'amazon-alexa',
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>
      Try the new <voice name="Lupe">voice</voice>.
      </speak>
    `;

    expect(ssml).toBe(expected);
  });
});
