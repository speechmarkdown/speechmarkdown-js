import dedent from 'ts-dedent';
import { SpeechMarkdown } from '../src/SpeechMarkdown';

const speech = new SpeechMarkdown();

const markdown = dedent`
  Hallo Wie geht's? & Was machst Du hier?
`;

describe('escape-xml', () => {
  ['amazon-alexa', 'microsoft-azure'].forEach((platform) => {
    describe(`Platform: ${platform}`, () => {
      test('No special symbol', () => {
        const options = {
          platform,
          escapeXmlSymbols: true,
        };
        const text = `Procter and Gamble`;
        const ssml = speech.toSSML(text, options);

        const exp = dedent`
        <speak>
        Procter and Gamble
        </speak>`;

        expect(ssml).toEqual(exp);
      });

      test('Symbol &', () => {
        const options = {
          platform,
          escapeXmlSymbols: true,
        };
        const text = `Procter & Gamble`;
        const ssml = speech.toSSML(text, options);

        const exp = dedent`
        <speak>
        Procter &amp; Gamble
        </speak>`;

        expect(ssml).toEqual(exp);
      });

      test('Already escaped symbol &', () => {
        const options = {
          platform,
          escapeXmlSymbols: true,
        };
        const text = `Procter &amp; Gamble`;
        const ssml = speech.toSSML(text, options);

        const exp = dedent`
        <speak>
        Procter &amp; Gamble
        </speak>`;

        expect(ssml).toEqual(exp);
      });

      test("Symbol '", () => {
        const options = {
          platform,
          escapeXmlSymbols: true,
        };
        const text = `Levi's`;
        const ssml = speech.toSSML(text, options);

        const exp = dedent`
        <speak>
        Levi&apos;s
        </speak>`;

        expect(ssml).toEqual(exp);
      });

      test('German with both symbols', () => {
        const options = {
          platform,
          escapeXmlSymbols: true,
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
          platform,
          escapeXmlSymbols: false,
        };
        const ssml = speech.toSSML(markdown, options);

        const expected = dedent`
        <speak>
        ${markdown}
        </speak>
        `;

        expect(ssml).toBe(expected);
      });

      test('Google with no support of escapeXmlSymbols', () => {
        const options = {
          platform: 'google-assistant',
          escapeXmlSymbols: true,
        };
        const ssml = speech.toSSML(markdown, options);

        const expected = dedent`
        <speak>
        ${markdown}
        </speak>
        `;

        expect(ssml).toBe(expected);
      });

      describe('non-regression with SpeechMarkdown elements', () => {
        test('break short syntax', () => {
          const options = {
            platform,
            escapeXmlSymbols: true,
          };
          const text = `Procter [250ms] and Gamble`;
          const ssml = speech.toSSML(text, options);

          const exp = dedent`
          <speak>
          Procter <break time="250ms"/> and Gamble
          </speak>`;

          expect(ssml).toEqual(exp);
        });

        test('break long syntax', () => {
          const options = {
            platform,
            escapeXmlSymbols: true,
          };
          const text = `Procter [break:"500ms"] and [break:"weak"] Gamble`;
          const ssml = speech.toSSML(text, options);

          const exp = dedent`
          <speak>
          Procter <break time="500ms"/> and <break strength="weak"/> Gamble
          </speak>`;

          expect(ssml).toEqual(exp);
        });

        if (platform !== 'microsoft-azure') {
          test('lang', () => {
            const options = {
              platform,
              escapeXmlSymbols: true,
            };
            const text = `In Paris, they pronounce it (Paris)[lang:"fr-FR"]`;
            const ssml = speech.toSSML(text, options);

            const exp = dedent`
            <speak>
            In Paris, they pronounce it <lang xml:lang="fr-FR">Paris</lang>
            </speak>`;

            expect(ssml).toEqual(exp);
          });
        }
      });
    });
  });
});
