// tslint:disable-next-line:import-name
import dedent from 'ts-dedent';
import { SpeechMarkdown } from '../src/SpeechMarkdown';

describe('disappointed-section normal to disappointed intensities to normal', () => {

  const speech = new SpeechMarkdown();

  const markdown = dedent`
    Normal speech.

    #[disappointed]
    I am disappointed - medium.

    #[disappointed:"medium"]
    I am disappointed - medium.

    #[disappointed:"low"]
    I am disappointed - low.

    #[disappointed:"high"]
    I am disappointed - high.

    #[defaults]
    Now back to normal speech.
  `;

  test('converts to SSML - Amazon Alexa', () => {

    const options = {
      platform: 'amazon-alexa'
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
    <speak>
    Normal speech.


    <amazon:emotion name="disappointed" intensity="medium">
    I am disappointed - medium.

    </amazon:emotion>

    <amazon:emotion name="disappointed" intensity="medium">
    I am disappointed - medium.

    </amazon:emotion>

    <amazon:emotion name="disappointed" intensity="low">
    I am disappointed - low.

    </amazon:emotion>

    <amazon:emotion name="disappointed" intensity="high">
    I am disappointed - high.

    </amazon:emotion>

    Now back to normal speech.
    </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('converts to SSML - Amazon Polly', () => {

    const options = {
      platform: 'amazon-polly'
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
    <speak>
    Normal speech.


    I am disappointed - medium.


    I am disappointed - medium.


    I am disappointed - low.


    I am disappointed - high.


    Now back to normal speech.
    </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('converts to SSML - Amazon Polly (Neural)', () => {

    const options = {
      platform: 'amazon-polly-neural'
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
    <speak>
    Normal speech.


    I am disappointed - medium.


    I am disappointed - medium.


    I am disappointed - low.


    I am disappointed - high.


    Now back to normal speech.
    </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('converts to SSML - Google Assistant', () => {

    const options = {
      platform: 'google-assistant',
      preserveEmptyLines: false
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>
      Normal speech.
      I am disappointed - medium.
      I am disappointed - medium.
      I am disappointed - low.
      I am disappointed - high.
      Now back to normal speech.
      </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('converts to SSML - Samsung Bixby', () => {

    const options = {
      platform: 'samsung-bixby',
      preserveEmptyLines: false
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>
      Normal speech.
      I am disappointed - medium.
      I am disappointed - medium.
      I am disappointed - low.
      I am disappointed - high.
      Now back to normal speech.
      </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('converts to Plain Text', () => {

    const options = {
    };
    const text = speech.toText(markdown, options);

    const expected = dedent`
      Normal speech.


      I am disappointed - medium.


      I am disappointed - medium.


      I am disappointed - low.


      I am disappointed - high.


      Now back to normal speech.
    `;

    expect(text).toBe(expected);
  });

});

describe('disappointed-section end speak tag at end', () => {

  const speech = new SpeechMarkdown();

  const markdown = dedent`
    #[disappointed]
    Section 1
  `;

  test('converts to SSML - Amazon Alexa', () => {

    const options = {
      platform: 'amazon-alexa'
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>

      <amazon:emotion name="disappointed" intensity="medium">
      Section 1</amazon:emotion>

      </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('converts to SSML - Google Assistant', () => {

    const options = {
      platform: 'google-assistant',
      preserveEmptyLines: false
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
      preserveEmptyLines: false
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

    const options = {
    };
    const text = speech.toText(markdown, options);

    const expected = dedent`
      Section 1
    `;
    expect(text).toBe(expected);
  });

});

describe('disappointed-section section on same line', () => {

  const speech = new SpeechMarkdown();

  const markdown = dedent`
    #[disappointed] Hey there, nice to meet you
  `;

  test('converts to SSML - Amazon Alexa', () => {

    const options = {
      platform: 'amazon-alexa'
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>

      <amazon:emotion name="disappointed" intensity="medium"> Hey there, nice to meet you</amazon:emotion>

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
       Hey there, nice to meet you
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
       Hey there, nice to meet you
      </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('converts to Plain Text', () => {

    const options = {
    };
    const text = speech.toText(markdown, options);

    const expected = 'Hey there, nice to meet you';

    expect(text).toBe(expected);
  });

});
