import dedent from 'ts-dedent';
import { SpeechMarkdown } from '../src/SpeechMarkdown';

describe('expressive', () => {
  const speech = new SpeechMarkdown();

  const markdown = dedent`
    Hello [laugh] world
  `;

  test('converts to SSML - W3C', () => {
    const ssml = speech.toSSML(markdown, { platform: 'w3c' });
    const expected = dedent`
      <speak>
      Hello [laugh] world
      </speak>
    `;
    expect(ssml).toBe(expected);
  });

  test('converts to SSML - ElevenLabs', () => {
    const ssml = speech.toSSML(markdown, { platform: 'elevenlabs' });
    expect(ssml).toBe('Hello [laugh] world');
  });

  test('converts to Plain Text', () => {
    const text = speech.toText(markdown);
    expect(text).toBe('Hello [laugh] world');
  });

  test('converts to SSML - Amazon Polly (strips)', () => {
    const ssml = speech.toSSML(markdown, { platform: 'amazon-polly' });
    const expected = dedent`
      <speak>
      Hello  world
      </speak>
    `;
    expect(ssml).toBe(expected);
  });

  test('converts to SSML - Google Assistant (strips)', () => {
    const ssml = speech.toSSML(markdown, { platform: 'google-assistant' });
    const expected = dedent`
      <speak>
      Hello  world
      </speak>
    `;
    expect(ssml).toBe(expected);
  });

  test('converts to SSML - Microsoft Azure (strips)', () => {
    const ssml = speech.toSSML(markdown, { platform: 'microsoft-azure' });
    const expected = dedent`
      <speak>
      Hello  world
      </speak>
    `;
    expect(ssml).toBe(expected);
  });
});

describe('expressive multiple', () => {
  const speech = new SpeechMarkdown();

  const markdown = dedent`
    Hello [laugh] how are you [sigh] I'm fine [cough]
  `;

  test('converts to SSML - W3C', () => {
    const ssml = speech.toSSML(markdown, { platform: 'w3c' });
    const expected = dedent`
      <speak>
      Hello [laugh] how are you [sigh] I'm fine [cough]
      </speak>
    `;
    expect(ssml).toBe(expected);
  });

  test('converts to Plain Text', () => {
    const text = speech.toText(markdown);
    expect(text).toBe("Hello [laugh] how are you [sigh] I'm fine [cough]");
  });
});

describe('expressive edge cases', () => {
  const speech = new SpeechMarkdown();

  test('expressive does not conflict with shortBreak [250ms]', () => {
    const md = 'Hello [laugh] wait [250ms] world';
    const ssml = speech.toSSML(md, { platform: 'w3c' });
    const expected = dedent`
      <speak>
      Hello [laugh] wait <break time="250ms"/> world
      </speak>
    `;
    expect(ssml).toBe(expected);
  });

  test('expressive does not conflict with textModifier', () => {
    const md = '(hello)[emphasis:"strong"] [laugh]';
    const ssml = speech.toSSML(md, { platform: 'w3c' });
    expect(ssml).toContain('[laugh]');
    expect(ssml).toContain('<emphasis');
  });

  test('unknown bracket content falls through as plain text', () => {
    const md = 'Hello [unknownthing] world';
    const text = speech.toText(md);
    expect(text).toBe('Hello [unknownthing] world');
  });
});
