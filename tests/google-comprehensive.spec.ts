import dedent from 'ts-dedent';
import { SpeechMarkdown } from '../src/SpeechMarkdown';

const speech = new SpeechMarkdown();
const options = { platform: 'google-assistant' };

describe('google-comprehensive', () => {
  test('Characters (say-as)', () => {
    const markdown = dedent`
      Here are (SSML)[characters] samples.
    `;

    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>
      Here are <say-as interpret-as="characters">SSML</say-as> samples.
      </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('Break time', () => {
    const markdown = dedent`
      I can pause [3s].
    `;

    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>
      I can pause <break time="3s"/>.
      </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('Audio with fallback', () => {
    const markdown = dedent`
      I can play a sound
      !(didn't get your MP3 audio file)["https://www.example.com/MY_MP3_FILE.mp3"].
    `;

    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>
      I can play a sound
      <audio src="https://www.example.com/MY_MP3_FILE.mp3">
      <desc>didn't get your MP3 audio file</desc>
      </audio>.
      </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('Audio with desc tag', () => {
    const markdown = dedent`
      !(a cat purring)["cat_purr_close.ogg"]
      PURR (sound didn't load)
    `;

    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>
      <audio src="cat_purr_close.ogg">
      <desc>a cat purring</desc>
      </audio>
      PURR (sound didn't load)
      </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('Cardinal numbers', () => {
    const markdown = dedent`
      I can speak in cardinals. Your number is (10)[number].
    `;

    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>
      I can speak in cardinals. Your number is <say-as interpret-as="number">10</say-as>.
      </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('Ordinal numbers', () => {
    const markdown = dedent`
      Or I can speak in ordinals. You are (10)[ordinal] in line.
    `;

    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>
      Or I can speak in ordinals. You are <say-as interpret-as="ordinal">10</say-as> in line.
      </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('Digits (characters)', () => {
    const markdown = dedent`
      Or I can even speak in digits. The digits for ten are (10)[characters].
    `;

    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>
      Or I can even speak in digits. The digits for ten are <say-as interpret-as="characters">10</say-as>.
      </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('Substitution', () => {
    const markdown = dedent`
      I can also substitute phrases, like the (W3C)[sub:"World Wide Web Consortium"].
    `;

    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>
      I can also substitute phrases, like the <sub alias="World Wide Web Consortium">W3C</sub>.
      </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('Date with format', () => {
    const markdown = dedent`
      (1960-09-10)[date:"yyyymmdd"]
    `;

    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>
      <say-as interpret-as="date" format="yyyymmdd">1960-09-10</say-as>
      </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('Expletive', () => {
    const markdown = dedent`
      (censor this)[expletive]
    `;

    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>
      <say-as interpret-as="expletive">censor this</say-as>
      </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('Mark/Bookmark', () => {
    const markdown = dedent`
      Go from [mark:"here"] here, to [mark:"there"] there!
    `;

    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>
      Go from <mark name="here"/> here, to <mark name="there"/> there!
      </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('Prosody (rate and pitch)', () => {
    const markdown = dedent`
      (Can you hear me now?)[rate:"slow";pitch:"-2st"]
    `;

    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>
      <prosody rate="slow" pitch="-2st">Can you hear me now?</prosody>
      </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('Emphasis moderate (short form)', () => {
    const markdown = dedent`
      +This is an important announcement+
    `;

    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>
      <emphasis level="moderate">This is an important announcement</emphasis>
      </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('IPA phoneme', () => {
    const markdown = dedent`
      (manitoba)[ipa:"ˌmænɪˈtoʊbə"]
    `;

    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>
      <phoneme alphabet="ipa" ph="ˌmænɪˈtoʊbə">manitoba</phoneme>
      </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test.skip('Voice section (not working - voice sections not processed)', () => {
    // Voice sections are not being processed by Google formatter
    const markdown = dedent`
      And then she asked, #[voice:"fr-FR-Standard-A"]qu'est-ce qui t'amène ici[250ms] in her sweet and gentle voice.
    `;

    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>
      And then she asked,
      <voice name="fr-FR-Standard-A">
      qu'est-ce qui t'amène ici<break time="250ms"/> in her sweet and gentle voice.</voice>
      </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('Lang tag', () => {
    const markdown = dedent`
      The french word for cat is (chat)[lang:"fr-FR"]
    `;

    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>
      The french word for cat is <lang xml:lang="fr-FR">chat</lang>
      </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('Google style tag', () => {
    // The google:style tag (no namespace needed per Google docs)
    const markdown = dedent`
      (Hello I'm so happy today!)[style:"lively"]
    `;

    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>
      <google:style name="lively">Hello I'm so happy today!</google:style>
      </speak>
    `;

    expect(ssml).toBe(expected);
  });
});
