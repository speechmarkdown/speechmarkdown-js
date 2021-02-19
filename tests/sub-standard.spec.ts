// tslint:disable-next-line:import-name
import dedent from 'ts-dedent';
import { SpeechMarkdown } from '../src/SpeechMarkdown';

describe('sub-standard', () => {
  const speech = new SpeechMarkdown();

  const markdown = dedent`
    The element is (Al)[sub:"aluminum"].
    Visit our website at (www.speechmarkdown.org)[sub:"speech mark down dot org"].
  `;

  test('converts to SSML - Amazon Alexa', () => {
    const options = {
      platform: 'amazon-alexa',
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>
      The element is <sub alias="aluminum">Al</sub>.
      Visit our website at <sub alias="speech mark down dot org">www.speechmarkdown.org</sub>.
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
      The element is <sub alias="aluminum">Al</sub>.
      Visit our website at <sub alias="speech mark down dot org">www.speechmarkdown.org</sub>.
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
      The element is <sub alias="aluminum">Al</sub>.
      Visit our website at <sub alias="speech mark down dot org">www.speechmarkdown.org</sub>.
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
      The element is <sub alias="aluminum">Al</sub>.
      Visit our website at <sub alias="speech mark down dot org">www.speechmarkdown.org</sub>.
      </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('converts to Plain Text', () => {
    const options = {};
    const text = speech.toText(markdown, options);

    const expected = dedent`
      The element is Al.
      Visit our website at www.speechmarkdown.org.
    `;

    expect(text).toBe(expected);
  });
});
