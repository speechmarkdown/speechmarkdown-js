// tslint:disable-next-line:import-name
import dedent from 'ts-dedent';
import { SpeechMarkdown } from '../src/SpeechMarkdown';

describe('sections-standard', () => {
  const speech = new SpeechMarkdown();

  const markdown = dedent`
    My voice and language is based on the device.

    #[voice:"Kendra";lang:"en-US"]
    Now I am speaking as Kendra from the US with a US accent.

    #[voice:"Brian";lang:"en-US"]
    Switching to Brian from the UK with a US accent.

    #[voice:"device"]
    Now back to the device setting.
  `;

  test('converts to SSML - Amazon Alexa', () => {
    const options = {
      platform: 'amazon-alexa',
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
    <speak>
    My voice and language is based on the device.


    <voice name="Kendra">
    <lang xml:lang="en-US">
    Now I am speaking as Kendra from the US with a US accent.

    </lang>
    </voice>

    <voice name="Brian">
    <lang xml:lang="en-US">
    Switching to Brian from the UK with a US accent.

    </lang>
    </voice>

    Now back to the device setting.
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
    My voice and language is based on the device.


    <voice name="Kendra">
    <lang xml:lang="en-US">
    Now I am speaking as Kendra from the US with a US accent.

    </lang>
    </voice>

    <voice name="Brian">
    <lang xml:lang="en-US">
    Switching to Brian from the UK with a US accent.

    </lang>
    </voice>

    Now back to the device setting.
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
    My voice and language is based on the device.


    <voice name="Kendra">
    <lang xml:lang="en-US">
    Now I am speaking as Kendra from the US with a US accent.

    </lang>
    </voice>

    <voice name="Brian">
    <lang xml:lang="en-US">
    Switching to Brian from the UK with a US accent.

    </lang>
    </voice>

    Now back to the device setting.
    </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('converts to SSML - Google Assistant', () => {
    const options = {
      platform: 'google-assistant',
      preserveEmptyLines: false,
    };
    const googleMarkdown = dedent`
      My voice and language is based on the device.

      #[voice:"en-US-Neural2-F";lang:"en-US"]
      Now I am speaking with en-US-Neural2-F from the US with a US accent.

      #[voice:"en-GB-Standard-A";lang:"en-GB"]
      Switching to en-GB-Standard-A from the UK with a UK accent.

      #[voice:"device"]
      Now back to the device setting.
    `;
    const ssml = speech.toSSML(googleMarkdown, options);

    const expected = dedent`
    <speak>
    My voice and language is based on the device.

    <voice name="en-US-Neural2-F">
    <lang xml:lang="en-US">Now I am speaking with en-US-Neural2-F from the US with a US accent.
    </lang>
    </voice>

    <voice name="en-GB-Standard-A">
    <lang xml:lang="en-GB">Switching to en-GB-Standard-A from the UK with a UK accent.
    </lang>
    </voice>
    Now back to the device setting.
    </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('converts to SSML - Samsung Bixby', () => {
    const options = {
      platform: 'samsung-bixby',
      preserveEmptyLines: false,
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>
      My voice and language is based on the device.
      Now I am speaking as Kendra from the US with a US accent.
      Switching to Brian from the UK with a US accent.
      Now back to the device setting.
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
    My voice and language is based on the device.


    <voice name="Kendra">
    Now I am speaking as Kendra from the US with a US accent.

    </voice>

    <voice name="Brian">
    Switching to Brian from the UK with a US accent.

    </voice>

    Now back to the device setting.
    </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('converts to Plain Text', () => {
    const options = {};
    const text = speech.toText(markdown, options);

    const expected = dedent`
      My voice and language is based on the device.


      Now I am speaking as Kendra from the US with a US accent.


      Switching to Brian from the UK with a US accent.


      Now back to the device setting.
    `;

    expect(text).toBe(expected);
  });
});

describe('sections-standard end speak tag at end', () => {
  const speech = new SpeechMarkdown();

  const markdown = dedent`
    #[voice:"Kendra"]
    Section 1

    #[voice:"Brian";lang:"en-GB"]
    Section 2
  `;

  test('converts to SSML - Amazon Alexa', () => {
    const options = {
      platform: 'amazon-alexa',
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>

      <voice name="Kendra">
      Section 1

      </voice>

      <voice name="Brian">
      <lang xml:lang="en-GB">
      Section 2</lang>
      </voice>

      </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('converts to SSML - Google Assistant', () => {
    const options = {
      platform: 'google-assistant',
      preserveEmptyLines: false,
    };
    const googleMarkdown = dedent`
      #[voice:"en-US-Neural2-F"]
      Section 1

      #[voice:"en-GB-Standard-A";lang:"en-GB"]
      Section 2
    `;
    const ssml = speech.toSSML(googleMarkdown, options);

    const expected = dedent`
      <speak>

      <voice name="en-US-Neural2-F">Section 1
      </voice>

      <voice name="en-GB-Standard-A">
      <lang xml:lang="en-GB">Section 2</lang>
      </voice>

      </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('converts to SSML - Samsung Bixby', () => {
    const options = {
      platform: 'samsung-bixby',
      preserveEmptyLines: false,
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>
      Section 1
      Section 2
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

      <voice name="Kendra">
      Section 1

      </voice>

      <voice name="Brian">
      Section 2</voice>

      </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('converts to Plain Text', () => {
    const options = {};
    const text = speech.toText(markdown, options);

    const expected = dedent`
      Section 1


      Section 2
    `;
    expect(text).toBe(expected);
  });
});

describe('sections-standard voice section on same line', () => {
  const speech = new SpeechMarkdown();

  const markdown = dedent`
    #[voice:'Brian'] Hey there, nice to meet you
  `;

  test('converts to SSML - Amazon Alexa', () => {
    const options = {
      platform: 'amazon-alexa',
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>

      <voice name="Brian"> Hey there, nice to meet you</voice>

      </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('converts to SSML - Google Assistant', () => {
    const options = {
      platform: 'google-assistant',
    };
    const googleMarkdown = dedent`
      #[voice:'en-GB-Standard-A'] Hey there, nice to meet you
    `;
    const ssml = speech.toSSML(googleMarkdown, options);

    const expected = dedent`
      <speak>

      <voice name="en-GB-Standard-A"> Hey there, nice to meet you</voice>

      </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('converts to SSML - Samsung Bixby', () => {
    const options = {
      platform: 'samsung-bixby',
      preserveEmptyLines: false,
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>
       Hey there, nice to meet you
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

      <voice name="Brian"> Hey there, nice to meet you</voice>

      </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('converts to Plain Text', () => {
    const options = {};
    const text = speech.toText(markdown, options);

    const expected = 'Hey there, nice to meet you';

    expect(text).toBe(expected);
  });
});
