import dedent from "ts-dedent";
import { AmazonAlexaSsmlFormatter } from "../src/formatters/AmazonAlexaSsmlFormatter";
import { SsmlFormatterBase } from "../src/formatters/SsmlFormatterBase";
import { SpeechMarkdown } from "../src/SpeechMarkdown";

const speech = new SpeechMarkdown();

const markdown = dedent`
  Hallo Wie geht's? & Was machst Du hier?
`;

describe('escape-xml', () => {

  test('No special symbol', () => {
    const options = {
      platform        : 'amazon-alexa',
      escapeXmlSymbols: true
    };
    const text = `Procter and Gamble`;
    const ssml = speech.toSSML(text, options);

    const exp  = dedent`
    <speak>
    Procter and Gamble
    </speak>`;

    expect(ssml).toEqual(exp);
  });

  test('Symbol &', () => {
    const options = {
      platform        : 'amazon-alexa',
      escapeXmlSymbols: true
    };
    const text = `Procter & Gamble`;
    const ssml = speech.toSSML(text, options);

    const exp  = dedent`
    <speak>
    Procter &amp; Gamble
    </speak>`;

    expect(ssml).toEqual(exp);
  });

  test('Already escaped symbol &', () => {
    const options = {
      platform        : 'amazon-alexa',
      escapeXmlSymbols: true
    };
    const text = `Procter &amp; Gamble`;
    const ssml = speech.toSSML(text, options);

    const exp  = dedent`
    <speak>
    Procter &amp; Gamble
    </speak>`;

    expect(ssml).toEqual(exp);
  });

  test('Symbol \'', () => {
    const options = {
      platform        : 'amazon-alexa',
      escapeXmlSymbols: true
    };
    const text = `Levi's`;
    const ssml = speech.toSSML(text, options);

    const exp  = dedent`
    <speak>
    Levi&apos;s
    </speak>`;

    expect(ssml).toEqual(exp);
  });

  test('German with both symbols', () => {
    const options = {
      platform        : 'amazon-alexa',
      escapeXmlSymbols: true
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
    <speak>
    Hallo Wie geht&apos;s? &amp; Was machst Du hier?
    </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('No escaping', () => {
    const options = {
      platform        : 'amazon-alexa',
      escapeXmlSymbols: false
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
    <speak>
    ${ markdown }
    </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('Google with no support of escapeXmlSymbols', () => {
    const options = {
      platform        : 'google-assistant',
      escapeXmlSymbols: true
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
    <speak>
    ${ markdown }
    </speak>
    `;

    expect(ssml).toBe(expected);
  });
});
