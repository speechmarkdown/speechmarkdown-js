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

  test('converts to SSML - Amazon Polly', () => {

    const options = {
      platform: 'amazon-polly'
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>

      Announcing Speech Markdown.
      </speak>
    `;
    expect(ssml).toBe(expected);
  });

  test('converts to SSML - Amazon Polly (Neural)', () => {

    const options = {
      platform: 'amazon-polly-neural'
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>

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

  test('converts to SSML - Samsung Bixby', () => {

    const options = {
      platform: 'samsung-bixby'
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>
      <audio src="https://www.speechmarkdown.org/test.mp3"></audio>
      Announcing Speech Markdown.
      </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('converts to SSML - Microsoft Azure', () => {

    const options = {
      platform: 'microsoft-azure'
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


  test('converts to SSML - Samsung Bixby', () => {

    const options = {
      platform: 'samsung-bixby'
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>
      <audio src="https://www.speechmarkdown.org/test.mp3"></audio>
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

  test('converts to SSML - Samsung Bixby', () => {

    const options = {
      platform: 'samsung-bixby'
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>
      <audio src="soundbank://soundlibrary/alarms/air_horns/air_horn_01"></audio> Air horn
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

describe('audio-standard with Amazon signed URL', () => {

  const speech = new SpeechMarkdown();

  const markdown = dedent`
    !["https://sample-dev.s3.amazonaws.com/path/18327803923/f7fb4173-4eab-46fc-80ec-020204a615f9.mp3?AWSAccessKeyId=AKXXXXXXXXXXXXXXXXXX&Expires=1596986208&Signature=VL6q9pYc8NTjf6gKVqN0Cem0WTA="]
    Announcing Speech Markdown.
  `;

  test('converts to SSML - Amazon Alexa', () => {

    const options = {
      platform: 'amazon-alexa'
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>
      <audio src="https://sample-dev.s3.amazonaws.com/path/18327803923/f7fb4173-4eab-46fc-80ec-020204a615f9.mp3?AWSAccessKeyId=AKXXXXXXXXXXXXXXXXXX&amp;Expires=1596986208&amp;Signature=VL6q9pYc8NTjf6gKVqN0Cem0WTA="/>
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
      <audio src="https://sample-dev.s3.amazonaws.com/path/18327803923/f7fb4173-4eab-46fc-80ec-020204a615f9.mp3?AWSAccessKeyId=AKXXXXXXXXXXXXXXXXXX&amp;Expires=1596986208&amp;Signature=VL6q9pYc8NTjf6gKVqN0Cem0WTA="/>
      Announcing Speech Markdown.
      </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('converts to SSML - Samsung Bixby', () => {

    const options = {
      platform: 'samsung-bixby'
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>
      <audio src="https://sample-dev.s3.amazonaws.com/path/18327803923/f7fb4173-4eab-46fc-80ec-020204a615f9.mp3?AWSAccessKeyId=AKXXXXXXXXXXXXXXXXXX&amp;Expires=1596986208&amp;Signature=VL6q9pYc8NTjf6gKVqN0Cem0WTA="></audio>
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

describe('audio with caption', () => {

  const speech = new SpeechMarkdown();

  const markdown = dedent`
    !(a cat purring)["https://www.speechmarkdown.org/test.mp3"]
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

  test('converts to SSML - Amazon Polly', () => {

    const options = {
      platform: 'amazon-polly'
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>

      Announcing Speech Markdown.
      </speak>
    `;
    expect(ssml).toBe(expected);
  });

  test('converts to SSML - Amazon Polly (Neural)', () => {

    const options = {
      platform: 'amazon-polly-neural'
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>

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
      <audio src="https://www.speechmarkdown.org/test.mp3">
      <desc>a cat purring</desc>
      </audio>
      Announcing Speech Markdown.
      </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('converts to SSML - Samsung Bixby', () => {

    const options = {
      platform: 'samsung-bixby'
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>
      <audio src="https://www.speechmarkdown.org/test.mp3"></audio>
      Announcing Speech Markdown.
      </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('converts to SSML - Microsoft Azure', () => {

    const options = {
      platform: 'microsoft-azure'
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

describe('audio with empty caption', () => {

  const speech = new SpeechMarkdown();

  const markdown = dedent`
    !()["https://www.speechmarkdown.org/test.mp3"]
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

  test('converts to SSML - Amazon Polly', () => {

    const options = {
      platform: 'amazon-polly'
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>

      Announcing Speech Markdown.
      </speak>
    `;
    expect(ssml).toBe(expected);
  });

  test('converts to SSML - Amazon Polly (Neural)', () => {

    const options = {
      platform: 'amazon-polly-neural'
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>

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

  test('converts to SSML - Samsung Bixby', () => {

    const options = {
      platform: 'samsung-bixby'
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>
      <audio src="https://www.speechmarkdown.org/test.mp3"></audio>
      Announcing Speech Markdown.
      </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('converts to SSML - Microsoft Azure', () => {

    const options = {
      platform: 'microsoft-azure'
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
