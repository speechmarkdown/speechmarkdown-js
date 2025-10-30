// tslint:disable-next-line:import-name
import dedent from 'ts-dedent';
import { SpeechMarkdown } from '../src/SpeechMarkdown';

describe('excited-standard', () => {
  const speech = new SpeechMarkdown();

  const markdown = dedent`
    We can switch (from excited)[excited] to (really excited)[excited:"high"].
  `;

  test('converts to SSML - Amazon Alexa', () => {
    const options = {
      platform: 'amazon-alexa',
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>
      We can switch <amazon:emotion name="excited" intensity="medium">from excited</amazon:emotion> to <amazon:emotion name="excited" intensity="high">really excited</amazon:emotion>.
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
      We can switch from excited to really excited.
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
      We can switch from excited to really excited.
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
      We can switch from excited to really excited.
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
      We can switch from excited to really excited.
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
      <speak xmlns:mstts="https://www.w3.org/2001/mstts">
      We can switch <mstts:express-as style="excited">from excited</mstts:express-as> to <mstts:express-as style="excited">really excited</mstts:express-as>.
      </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('converts to Plain Text', () => {
    const options = {};
    const text = speech.toText(markdown, options);

    const expected = dedent`
      We can switch from excited to really excited.
    `;

    expect(text).toBe(expected);
  });
});

describe('excited-standard non-lowercase intensity', () => {
  const speech = new SpeechMarkdown();

  const markdown = dedent`
    We can switch (from excited)[excited] to (really excited)[excited:"HigH"].
  `;

  test('converts to SSML - Amazon Alexa', () => {
    const options = {
      platform: 'amazon-alexa',
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>
      We can switch <amazon:emotion name="excited" intensity="medium">from excited</amazon:emotion> to <amazon:emotion name="excited" intensity="high">really excited</amazon:emotion>.
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
      We can switch from excited to really excited.
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
      We can switch from excited to really excited.
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
      <speak xmlns:mstts="https://www.w3.org/2001/mstts">
      We can switch <mstts:express-as style="excited">from excited</mstts:express-as> to <mstts:express-as style="excited">really excited</mstts:express-as>.
      </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('converts to Plain Text', () => {
    const options = {};
    const text = speech.toText(markdown, options);

    const expected = dedent`
      We can switch from excited to really excited.
    `;

    expect(text).toBe(expected);
  });
});

describe('excited-standard invalid intensity', () => {
  const speech = new SpeechMarkdown();

  const markdown = dedent`
    We can switch (from excited)[excited] to (really excited)[excited:"pizza"].
  `;

  test('converts to SSML - Amazon Alexa', () => {
    const options = {
      platform: 'amazon-alexa',
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>
      We can switch <amazon:emotion name="excited" intensity="medium">from excited</amazon:emotion> to really excited.
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
      We can switch from excited to really excited.
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
      We can switch from excited to really excited.
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
      <speak xmlns:mstts="https://www.w3.org/2001/mstts">
      We can switch <mstts:express-as style="excited">from excited</mstts:express-as> to <mstts:express-as style="excited">really excited</mstts:express-as>.
      </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('converts to Plain Text', () => {
    const options = {};
    const text = speech.toText(markdown, options);

    const expected = dedent`
      We can switch from excited to really excited.
    `;

    expect(text).toBe(expected);
  });
});
