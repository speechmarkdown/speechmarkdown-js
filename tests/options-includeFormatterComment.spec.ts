// tslint:disable-next-line:import-name
import dedent from 'ts-dedent';
import { SpeechMarkdown } from '../src/SpeechMarkdown';

describe('options-includeFormatterComment default to false', () => {
  const speech = new SpeechMarkdown();

  const markdown = dedent`
    Text line
  `;

  test('converts to SSML - Amazon Alexa', () => {
    const options = {
      platform: 'amazon-alexa',
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>
      Text line
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
      Text line
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
      Text line
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
      Text line
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
      Text line
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
      Text line
      </speak>
    `;

    expect(ssml).toBe(expected);
  });
});

describe('options-includeFormatterComment set to false', () => {
  const speech = new SpeechMarkdown();

  const markdown = dedent`
    Text line
  `;

  test('converts to SSML - Amazon Alexa', () => {
    const options = {
      platform: 'amazon-alexa',
      includeFormatterComment: false,
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>
      Text line
      </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('converts to SSML - Google Assistant', () => {
    const options = {
      platform: 'google-assistant',
      includeFormatterComment: false,
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>
      Text line
      </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('converts to SSML - Samsung Bixby', () => {
    const options = {
      platform: 'samsung-bixby',
      includeFormatterComment: false,
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>
      Text line
      </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('converts to SSML - Microsoft Azure', () => {
    const options = {
      platform: 'microsoft-azure',
      includeFormatterComment: false,
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>
      Text line
      </speak>
    `;

    expect(ssml).toBe(expected);
  });
});

describe('options-includeFormatterComment set to true', () => {
  const speech = new SpeechMarkdown();

  const markdown = dedent`
    Text line
  `;

  test('converts to SSML - Amazon Alexa', () => {
    const options = {
      platform: 'amazon-alexa',
      includeFormatterComment: true,
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <!-- Converted from Speech Markdown to SSML for Amazon Alexa -->
      <speak>
      Text line
      </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('converts to SSML - Google Assistant', () => {
    const options = {
      platform: 'google-assistant',
      includeFormatterComment: true,
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <!-- Converted from Speech Markdown to SSML for Google Assistant -->
      <speak>
      Text line
      </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('converts to SSML - Samsung Bixby', () => {
    const options = {
      platform: 'samsung-bixby',
      includeFormatterComment: true,
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <!-- Converted from Speech Markdown to SSML for Samsung Bixby -->
      <speak>
      Text line
      </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('converts to SSML - Microsoft Azure', () => {
    const options = {
      platform: 'microsoft-azure',
      includeFormatterComment: true,
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <!-- Converted from Speech Markdown to SSML for Microsoft Azure -->
      <speak>
      Text line
      </speak>
    `;

    expect(ssml).toBe(expected);
  });
});
