// tslint:disable-next-line:import-name
import dedent from 'ts-dedent';
import { SpeechMarkdown } from '../src/SpeechMarkdown';

describe('break-time', () => {
  const speech = new SpeechMarkdown();

  const markdown = dedent`
    Sample [break:"3s"] speech [break:"250ms"] markdown
  `;

  test('converts to SSML - Amazon Alexa', () => {
    const options = {
      platform: 'amazon-alexa',
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>
      Sample <break time="3s"/> speech <break time="250ms"/> markdown
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
      Sample <break time="3s"/> speech <break time="250ms"/> markdown
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
      Sample <break time="3s"/> speech <break time="250ms"/> markdown
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
      Sample <break time="3s"/> speech <break time="250ms"/> markdown
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
      Sample <break time="3s"/> speech <break time="250ms"/> markdown
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
      Sample <break time="3s"/> speech <break time="250ms"/> markdown
      </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('converts to ElevenLabs prompt markup', () => {
    const options = {
      platform: 'elevenlabs',
    };
    const prompt = speech.toSSML(markdown, options);

    const expected = 'Sample <break time="3s"/> speech <break time="250ms"/> markdown';

    expect(prompt).toBe(expected);
  });

  test('converts to Plain Text', () => {
    const options = {};
    const text = speech.toText(markdown, options);

    const expected = dedent`
      Sample speech markdown
    `;

    expect(text).toBe(expected);
  });
});
