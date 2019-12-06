// tslint:disable-next-line:import-name
import dedent from 'ts-dedent';
import { SpeechMarkdown } from '../src/SpeechMarkdown';

describe('disappointed-standard', () => {

  const speech = new SpeechMarkdown();

  const markdown = dedent`
    We can switch (from disappointed)[disappointed] to (really disappointed)[disappointed:"high"].
  `;

  test('converts to SSML - Amazon Alexa', () => {

    const options = {
      platform: 'amazon-alexa'
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>
      We can switch <amazon:emotion name="disappointed" intensity="medium">from disappointed</amazon:emotion> to <amazon:emotion name="disappointed" intensity="high">really disappointed</amazon:emotion>.
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
      We can switch from disappointed to really disappointed.
      </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('converts to Plain Text', () => {

    const options = {
    };
    const text = speech.toText(markdown, options);

    const expected = dedent`
      We can switch from disappointed to really disappointed.
    `;

    expect(text).toBe(expected);
  });

});

describe('disappointed-standard non-lowercase intensity', () => {

  const speech = new SpeechMarkdown();

  const markdown = dedent`
    We can switch (from disappointed)[disappointed] to (really disappointed)[disappointed:"HigH"].
  `;

  test('converts to SSML - Amazon Alexa', () => {

    const options = {
      platform: 'amazon-alexa'
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>
      We can switch <amazon:emotion name="disappointed" intensity="medium">from disappointed</amazon:emotion> to <amazon:emotion name="disappointed" intensity="high">really disappointed</amazon:emotion>.
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
      We can switch from disappointed to really disappointed.
      </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('converts to Plain Text', () => {

    const options = {
    };
    const text = speech.toText(markdown, options);

    const expected = dedent`
      We can switch from disappointed to really disappointed.
    `;

    expect(text).toBe(expected);
  });

});

describe('disappointed-standard invalid intensity', () => {

  const speech = new SpeechMarkdown();

  const markdown = dedent`
    We can switch (from disappointed)[disappointed] to (really disappointed)[disappointed:"pizza"].
  `;

  test('converts to SSML - Amazon Alexa', () => {

    const options = {
      platform: 'amazon-alexa'
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>
      We can switch <amazon:emotion name="disappointed" intensity="medium">from disappointed</amazon:emotion> to really disappointed.
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
      We can switch from disappointed to really disappointed.
      </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('converts to Plain Text', () => {

    const options = {
    };
    const text = speech.toText(markdown, options);

    const expected = dedent`
      We can switch from disappointed to really disappointed.
    `;

    expect(text).toBe(expected);
  });

});
