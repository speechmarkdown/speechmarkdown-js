import dedent from 'ts-dedent';
import { SpeechMarkdown } from '../src/SpeechMarkdown';

describe('azure-style-role', () => {
  let speech: SpeechMarkdown;

  beforeEach(() => {
    speech = new SpeechMarkdown();
  });

  test('converts style with role to SSML - Microsoft Azure', () => {
    const markdown = dedent`
      (Hello)[style:"excited";role:"Girl"]
    `;

    const options = {
      platform: 'microsoft-azure',
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak xmlns:mstts="https://www.w3.org/2001/mstts">
      <mstts:express-as style="excited" role="Girl">Hello</mstts:express-as>
      </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('converts style with role and styledegree to SSML - Microsoft Azure', () => {
    const markdown = dedent`
      (Hello)[excited:"1.5";role:"Girl"]
    `;

    const options = {
      platform: 'microsoft-azure',
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak xmlns:mstts="https://www.w3.org/2001/mstts">
      <mstts:express-as style="excited" styledegree="1.5" role="Girl">Hello</mstts:express-as>
      </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('converts just role without style - should not generate express-as', () => {
    const markdown = dedent`
      (Hello)[role:"Girl"]
    `;

    const options = {
      platform: 'microsoft-azure',
    };
    const ssml = speech.toSSML(markdown, options);

    // Role alone doesn't make sense without style, so it should just output plain text
    const expected = dedent`
      <speak>
      Hello
      </speak>
    `;

    expect(ssml).toBe(expected);
  });
});

