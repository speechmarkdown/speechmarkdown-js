// tslint:disable-next-line:import-name
import dedent from 'ts-dedent';
import { SpeechMarkdown } from '../src/SpeechMarkdown';

describe('voice-azure-displayname', () => {
  const speech = new SpeechMarkdown();

  test('converts display name to voice ID - Microsoft Azure', () => {
    // User can reference voice by display name "Jenny"
    const markdown = dedent`
      (This is Jenny speaking)[voice:"Jenny"]
    `;

    const options = {
      platform: 'microsoft-azure',
    };
    const ssml = speech.toSSML(markdown, options);

    // Should output the voice ID, not the display name
    const expected = dedent`
      <speak>
      <voice name="en-US-JennyNeural">This is Jenny speaking</voice>
      </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('converts voice ID to voice ID - Microsoft Azure', () => {
    // User can also reference voice by full ID
    const markdown = dedent`
      (This is Jenny speaking)[voice:"en-US-JennyNeural"]
    `;

    const options = {
      platform: 'microsoft-azure',
    };
    const ssml = speech.toSSML(markdown, options);

    // Should output the same voice ID
    const expected = dedent`
      <speak>
      <voice name="en-US-JennyNeural">This is Jenny speaking</voice>
      </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('converts lowercase display name to voice ID - Microsoft Azure', () => {
    // User can use lowercase
    const markdown = dedent`
      (This is Jenny speaking)[voice:"jenny"]
    `;

    const options = {
      platform: 'microsoft-azure',
    };
    const ssml = speech.toSSML(markdown, options);

    // Should output the voice ID
    const expected = dedent`
      <speak>
      <voice name="en-US-JennyNeural">This is Jenny speaking</voice>
      </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('converts multiple voices by display name - Microsoft Azure', () => {
    const markdown = dedent`
      (Jenny says hello)[voice:"Jenny"] and (Guy says goodbye)[voice:"Guy"]
    `;

    const options = {
      platform: 'microsoft-azure',
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>
      <voice name="en-US-JennyNeural">Jenny says hello</voice> and <voice name="en-US-GuyNeural">Guy says goodbye</voice>
      </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('section with display name - Microsoft Azure', () => {
    const markdown = dedent`
      #[voice:"Jenny"]
      Hello, I'm Jenny speaking!
    `;

    const options = {
      platform: 'microsoft-azure',
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>

      <voice name="en-US-JennyNeural">
      Hello, I'm Jenny speaking!</voice>

      </speak>
    `;

    expect(ssml).toBe(expected);
  });
});
