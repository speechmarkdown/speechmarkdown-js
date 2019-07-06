// tslint:disable-next-line:import-name
import dedent from 'ts-dedent';
import { SpeechMarkdown } from '../src/SpeechMarkdown';

describe.skip('sections-standard', () => {

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
      platform: 'amazon-alexa'
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
      platform: 'google-assistant'
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

  test('converts to Plain Text', () => {

    const options = {
    };
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
