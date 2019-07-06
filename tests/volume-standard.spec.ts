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
      platform: 'amazon-alexa'
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
      platform: 'google-assistant'
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

    const options = {
    };
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
