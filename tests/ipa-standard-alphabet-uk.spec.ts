// tslint:disable-next-line:import-name
import dedent from 'ts-dedent';
import { SpeechMarkdown } from '../src/SpeechMarkdown';

describe('ipa-standard-alphabet-uk', () => {

  const speech = new SpeechMarkdown();

  const markdown = dedent`
    I say, (ipa)[ipa:"ˈˌb.d.f.g.h.j.k.l.m.n.p.s.t.v.w.z.i.u.æ.ð.ʃ.θ.ʒ.ə.aɪ.aʊ.ɑ.eɪ.ɝ.ɛ.ɪ.əʊ.ɔ.ɔɪ.ʊ.ʌ.ɒ.ɛə.ɪə.ʊə.ŋ.ɹ.d͡ʒ.t͡ʃ"].
  `;

  test('converts to SSML - Amazon Alexa', () => {

    const options = {
      platform: 'amazon-alexa'
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>
      I say, <phoneme alphabet="ipa" ph="ˈˌb.d.f.g.h.j.k.l.m.n.p.s.t.v.w.z.i.u.æ.ð.ʃ.θ.ʒ.ə.aɪ.aʊ.ɑ.eɪ.ɝ.ɛ.ɪ.əʊ.ɔ.ɔɪ.ʊ.ʌ.ɒ.ɛə.ɪə.ʊə.ŋ.ɹ.d͡ʒ.t͡ʃ">ipa</phoneme>.
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
      I say, ipa.
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
      I say, ipa.
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
      I say, <phoneme alphabet="ipa" ph="ˈˌb.d.f.g.h.j.k.l.m.n.p.s.t.v.w.z.i.u.æ.ð.ʃ.θ.ʒ.ə.aɪ.aʊ.ɑ.eɪ.ɝ.ɛ.ɪ.əʊ.ɔ.ɔɪ.ʊ.ʌ.ɒ.ɛə.ɪə.ʊə.ŋ.ɹ.d͡ʒ.t͡ʃ">ipa</phoneme>.
      </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('converts to Plain Text', () => {

    const options = {
    };
    const text = speech.toText(markdown, options);

    const expected = dedent`
      I say, ipa.
    `;

    expect(text).toBe(expected);
  });

});
