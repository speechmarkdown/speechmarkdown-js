// tslint:disable-next-line:import-name
import dedent from 'ts-dedent';
import { SpeechMarkdown } from '../src/SpeechMarkdown';

describe('newscaster-section normal to dj to normal', () => {

  const speech = new SpeechMarkdown();

  const markdown = dedent`
    Normal speech.

    #[newscaster]
    Switching to a newscaster.

    #[defaults]
    Now back to normal speech.
  `;

  test('converts to SSML - Amazon Alexa', () => {

    const options = {
      platform: 'amazon-alexa'
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
    <speak>
    Normal speech.


    <amazon:domain name="news">
    Switching to a newscaster.

    </amazon:domain>

    Now back to normal speech.
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
    Normal speech.


    <amazon:domain name="news">
    Switching to a newscaster.

    </amazon:domain>

    Now back to normal speech.
    </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('converts to SSML - Google Assistant', () => {

    const options = {
      platform: 'google-assistant',
      preserveEmptyLines: false
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>
      Normal speech.
      Switching to a newscaster.
      Now back to normal speech.
      </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('converts to SSML - Samsung Bixby', () => {

    const options = {
      platform: 'samsung-bixby',
      preserveEmptyLines: false
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>
      Normal speech.
      Switching to a newscaster.
      Now back to normal speech.
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
    Normal speech.


    <mstts:express-as style="newscast">
    Switching to a newscaster.

    </mstts:express-as>

    Now back to normal speech.
    </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('converts to Plain Text', () => {

    const options = {
    };
    const text = speech.toText(markdown, options);

    const expected = dedent`
      Normal speech.


      Switching to a newscaster.


      Now back to normal speech.
    `;

    expect(text).toBe(expected);
  });

});

describe('newscaster-section end speak tag at end', () => {

  const speech = new SpeechMarkdown();

  const markdown = dedent`
    #[newscaster]
    Section 1
  `;

  test('converts to SSML - Amazon Alexa', () => {

    const options = {
      platform: 'amazon-alexa'
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>

      <amazon:domain name="news">
      Section 1</amazon:domain>

      </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('converts to SSML - Google Assistant', () => {

    const options = {
      platform: 'google-assistant',
      preserveEmptyLines: false
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>
      Section 1
      </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('converts to SSML - Samsung Bixby', () => {

    const options = {
      platform: 'samsung-bixby',
      preserveEmptyLines: false
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>
      Section 1
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

      <mstts:express-as style="newscast">
      Section 1</mstts:express-as>

      </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('converts to Plain Text', () => {

    const options = {
    };
    const text = speech.toText(markdown, options);

    const expected = dedent`
      Section 1
    `;
    expect(text).toBe(expected);
  });

});

describe('newscaster-section section on same line', () => {

  const speech = new SpeechMarkdown();

  const markdown = dedent`
    #[newscaster] Hey there, nice to meet you
  `;

  test('converts to SSML - Amazon Alexa', () => {

    const options = {
      platform: 'amazon-alexa'
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>

      <amazon:domain name="news"> Hey there, nice to meet you</amazon:domain>

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
       Hey there, nice to meet you
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
       Hey there, nice to meet you
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

      <mstts:express-as style="newscast"> Hey there, nice to meet you</mstts:express-as>

      </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('converts to Plain Text', () => {

    const options = {
    };
    const text = speech.toText(markdown, options);

    const expected = 'Hey there, nice to meet you';

    expect(text).toBe(expected);
  });

});
