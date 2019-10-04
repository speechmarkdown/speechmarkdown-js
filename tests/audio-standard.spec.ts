// tslint:disable-next-line:import-name
import dedent from 'ts-dedent';
import { SpeechMarkdown } from '../src/SpeechMarkdown';

describe('audio-standard', () => {

  const speech = new SpeechMarkdown();

  const markdown = dedent`
    !["https://www.speechmarkdown.org/test.mp3"]
    Announcing Speech Markdown.
  `;

  test('converts to SSML - Amazon Alexa', () => {

    const options = {
      platform: 'amazon-alexa'
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>
      <audio src="https://www.speechmarkdown.org/test.mp3"/>
      Announcing Speech Markdown.
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
      <audio src="https://www.speechmarkdown.org/test.mp3"/>
      Announcing Speech Markdown.
      </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('converts to Plain Text', () => {

    const options = {
    };
    const text = speech.toText(markdown, options);

    const expected = dedent`
      Announcing Speech Markdown.
    `;

    expect(text).toBe(expected);
  });

});

describe('audio-standard single quote', () => {

  const speech = new SpeechMarkdown();

  const markdown = dedent`
    !['https://www.speechmarkdown.org/test.mp3']
    Announcing Speech Markdown.
  `;

  test('converts to SSML - Amazon Alexa', () => {

    const options = {
      platform: 'amazon-alexa'
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>
      <audio src="https://www.speechmarkdown.org/test.mp3"/>
      Announcing Speech Markdown.
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
      <audio src="https://www.speechmarkdown.org/test.mp3"/>
      Announcing Speech Markdown.
      </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('converts to Plain Text', () => {

    const options = {
    };
    const text = speech.toText(markdown, options);

    const expected = dedent`
      Announcing Speech Markdown.
    `;

    expect(text).toBe(expected);
  });

});

describe('audio-standard soundbank', () => {

  const speech = new SpeechMarkdown();

  const markdown = dedent`
    !['soundbank://soundlibrary/alarms/air_horns/air_horn_01'] Air horn
  `;

  test('converts to SSML - Amazon Alexa', () => {

    const options = {
      platform: 'amazon-alexa'
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>
      <audio src="soundbank://soundlibrary/alarms/air_horns/air_horn_01"/> Air horn
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
      <audio src="soundbank://soundlibrary/alarms/air_horns/air_horn_01"/> Air horn
      </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('converts to Plain Text', () => {

    const options = {
    };
    const text = speech.toText(markdown, options);

    const expected = 'Air horn';

    expect(text).toBe(expected);
  });

});
