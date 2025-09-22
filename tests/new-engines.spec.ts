// tslint:disable-next-line:import-name
import dedent from 'ts-dedent';
import { SpeechMarkdown } from '../src/SpeechMarkdown';

describe('microsoft-sapi formatter', () => {
  const speech = new SpeechMarkdown();

  const markdown = dedent`
    SAPI (emphasis)[emphasis:"strong"] handles (letters)[characters] with (voice)[voice:'Zira'].
  `;

  test('renders SSML for Microsoft Speech API', () => {
    const options = {
      platform: 'microsoft-sapi',
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>
      SAPI <emphasis level="strong">emphasis</emphasis> handles <say-as interpret-as="characters">letters</say-as> with <voice name="Zira">voice</voice>.
      </speak>
    `;

    expect(ssml).toBe(expected);
  });
});

describe('w3c formatter', () => {
  const speech = new SpeechMarkdown();

  test('supports say-as and emphasis', () => {
    const markdown = dedent`
      (Lang)[lang:"fr-FR"] (stress)[emphasis:"strong"] (12345)[characters] (forty two)[number].
    `;

    const ssml = speech.toSSML(markdown, { platform: 'w3c' });

    const expected = dedent`
      <speak>
      <lang xml:lang="fr-FR">Lang</lang> <emphasis level="strong">stress</emphasis> <say-as interpret-as="digits">12345</say-as> <say-as interpret-as="cardinal">forty two</say-as>.
      </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('supports phoneme, substitutions, and prosody', () => {
    const markdown = dedent`
      (display)[sub:"alias"] (phoneme)[ipa:"'pi.kæn"] (style)[rate:"fast";pitch:"+2st";volume:"+3dB"].
    `;

    const ssml = speech.toSSML(markdown, { platform: 'w3c' });

    const expected = dedent`
      <speak>
      <sub alias="alias">display</sub> <phoneme alphabet="ipa" ph="'pi.kæn">phoneme</phoneme> <prosody rate="fast" pitch="+2st" volume="+3dB">style</prosody>.
      </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('supports voice and mark', () => {
    const markdown = dedent`
      (voice sample)[voice:"Alice"] [mark:"bookmark-1"].
    `;

    const ssml = speech.toSSML(markdown, { platform: 'w3c' });

    const expected = dedent`
      <speak>
      <voice name="Alice">voice sample</voice> <mark name="bookmark-1"/>.
      </speak>
    `;

    expect(ssml).toBe(expected);
  });
});

describe('apple-avspeechsynthesizer formatter', () => {
  const speech = new SpeechMarkdown();

  const markdown = dedent`
    Apple (A1)[characters] speaks (data)[ipa:"ˈdeɪtə"] with (Samantha)[voice:'Samantha'] voices.
  `;

  test('renders SSML for Apple AVSpeechSynthesizer', () => {
    const options = {
      platform: 'apple-avspeechsynthesizer',
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>
      Apple <say-as interpret-as="characters">A1</say-as> speaks <phoneme alphabet="ipa" ph="ˈdeɪtə">data</phoneme> with <voice name="Samantha">Samantha</voice> voices.
      </speak>
    `;

    expect(ssml).toBe(expected);
  });
});

describe('ibm-watson formatter', () => {
  const speech = new SpeechMarkdown();

  const markdown = dedent`
    Watson (stress)[emphasis:"strong"] reads (100 km)[unit] with (style)[rate:"fast";pitch:"+2st";volume:"+3dB"] and (Allison)[voice:'Allison'] support.
  `;

  test('renders SSML for IBM Watson', () => {
    const options = {
      platform: 'ibm-watson',
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>
      Watson <emphasis level="strong">stress</emphasis> reads <say-as interpret-as="unit">100 km</say-as> with <prosody rate="fast" pitch="+2st" volume="+3dB">style</prosody> and <voice name="Allison">Allison</voice> support.
      </speak>
    `;

    expect(ssml).toBe(expected);
  });
});

describe('elevenlabs formatter', () => {
  const speech = new SpeechMarkdown();

  const markdown = dedent`
    Eleven (Labs)[ipa:"ˈlæbz"] [break:"1s"] ready.
  `;

  test('renders ElevenLabs prompt markup', () => {
    const options = {
      platform: 'elevenlabs',
    };
    const prompt = speech.toSSML(markdown, options);

    const expected =
      'Eleven <phoneme alphabet="ipa" ph="ˈlæbz">Labs</phoneme> <break time="1s"/> ready.';

    expect(prompt).toBe(expected);
  });
});
