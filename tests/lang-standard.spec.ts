// tslint:disable-next-line:import-name
import dedent from 'ts-dedent';
import { SpeechMarkdown } from '../src/SpeechMarkdown';

describe('lang-standard', () => {
  const speech = new SpeechMarkdown();

  const markdown = dedent`
    In Paris, they pronounce it (Paris)[lang:"fr-FR"].
    In Paris, they pronounce it (Paris)[lang:'fr-FR'].
  `;

  test('converts to SSML - Amazon Alexa', () => {
    const options = {
      platform: 'amazon-alexa',
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>
      In Paris, they pronounce it <lang xml:lang="fr-FR">Paris</lang>.
      In Paris, they pronounce it <lang xml:lang="fr-FR">Paris</lang>.
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
      In Paris, they pronounce it <lang xml:lang="fr-FR">Paris</lang>.
      In Paris, they pronounce it <lang xml:lang="fr-FR">Paris</lang>.
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
      In Paris, they pronounce it <lang xml:lang="fr-FR">Paris</lang>.
      In Paris, they pronounce it <lang xml:lang="fr-FR">Paris</lang>.
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
      In Paris, they pronounce it Paris.
      In Paris, they pronounce it Paris.
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
      In Paris, they pronounce it Paris.
      In Paris, they pronounce it Paris.
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
      In Paris, they pronounce it Paris.
      In Paris, they pronounce it Paris.
      </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('converts to Plain Text', () => {
    const options = {};
    const text = speech.toText(markdown, options);

    const expected = dedent`
      In Paris, they pronounce it Paris.
      In Paris, they pronounce it Paris.
    `;

    expect(text).toBe(expected);
  });
});
