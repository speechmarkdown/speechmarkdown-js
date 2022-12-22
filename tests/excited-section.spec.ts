// tslint:disable-next-line:import-name
import dedent from 'ts-dedent';
import { SpeechMarkdown } from '../src/SpeechMarkdown';

describe('excited-section normal to excited intensities to normal', () => {
  const speech = new SpeechMarkdown();

  const markdown = dedent`
    Normal speech.

    #[excited]
    I am excited - medium.

    #[excited:"medium"]
    I am excited - medium.

    #[excited:"low"]
    I am excited - low.

    #[excited:"high"]
    I am excited - high.

    #[defaults]
    Now back to normal speech.
  `;

  test('converts to SSML - Amazon Alexa', () => {
    const options = {
      platform: 'amazon-alexa',
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
    <speak>
    Normal speech.


    <amazon:emotion name="excited" intensity="medium">
    I am excited - medium.

    </amazon:emotion>

    <amazon:emotion name="excited" intensity="medium">
    I am excited - medium.

    </amazon:emotion>

    <amazon:emotion name="excited" intensity="low">
    I am excited - low.

    </amazon:emotion>

    <amazon:emotion name="excited" intensity="high">
    I am excited - high.

    </amazon:emotion>

    Now back to normal speech.
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
    Normal speech.


    I am excited - medium.


    I am excited - medium.


    I am excited - low.


    I am excited - high.


    Now back to normal speech.
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
    Normal speech.


    I am excited - medium.


    I am excited - medium.


    I am excited - low.


    I am excited - high.


    Now back to normal speech.
    </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('converts to SSML - Google Assistant', () => {
    const options = {
      platform: 'google-assistant',
      preserveEmptyLines: false,
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>
      Normal speech.
      I am excited - medium.
      I am excited - medium.
      I am excited - low.
      I am excited - high.
      Now back to normal speech.
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
      Normal speech.
      I am excited - medium.
      I am excited - medium.
      I am excited - low.
      I am excited - high.
      Now back to normal speech.
      </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('converts to Plain Text', () => {
    const options = {};
    const text = speech.toText(markdown, options);

    const expected = dedent`
      Normal speech.


      I am excited - medium.


      I am excited - medium.


      I am excited - low.


      I am excited - high.


      Now back to normal speech.
    `;

    expect(text).toBe(expected);
  });
});

describe('excited-section end speak tag at end', () => {
  const speech = new SpeechMarkdown();

  const markdown = dedent`
    #[excited]
    Section 1
  `;

  test('converts to SSML - Amazon Alexa', () => {
    const options = {
      platform: 'amazon-alexa',
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>

      <amazon:emotion name="excited" intensity="medium">
      Section 1</amazon:emotion>

      </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('converts to SSML - Google Assistant', () => {
    const options = {
      platform: 'google-assistant',
      preserveEmptyLines: false,
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>
      Section 1
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
      </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('converts to Plain Text', () => {
    const options = {};
    const text = speech.toText(markdown, options);

    const expected = dedent`
      Section 1
    `;
    expect(text).toBe(expected);
  });
});

describe('excited-section section on same line', () => {
  const speech = new SpeechMarkdown();

  const markdown = dedent`
    #[excited] Hey there, nice to meet you
  `;

  test('converts to SSML - Amazon Alexa', () => {
    const options = {
      platform: 'amazon-alexa',
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>

      <amazon:emotion name="excited" intensity="medium"> Hey there, nice to meet you</amazon:emotion>

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
       Hey there, nice to meet you
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
       Hey there, nice to meet you
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
