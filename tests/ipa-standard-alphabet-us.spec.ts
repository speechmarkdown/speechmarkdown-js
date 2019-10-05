// tslint:disable-next-line:import-name
import dedent from 'ts-dedent';
import { SpeechMarkdown } from '../src/SpeechMarkdown';

describe('ipa-standard-alphabet-us', () => {

  const speech = new SpeechMarkdown();

  // TODO: tests fail when the following are included: d͡ʒ or t͡ʃ

  const markdown = dedent`
    I say, (ipa)[ipa:"ˈˌb.d.f.g.h.j.k.l.m.n.p.s.t.v.w.z.i.u.æ.ð.ʃ.θ.ʒ.ə.ɚ.aɪ.aʊ.ɑ.eɪ.ɝ.ɛ.ɪ.oʊ.ɔ.ɔɪ.ʊ.ʌ.ŋ.ɹ"].
  `;

  test('converts to SSML - Amazon Alexa', () => {

    const options = {
      platform: 'amazon-alexa'
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>
      I say, <phoneme alphabet="ipa" ph="ˈˌb.d.f.g.h.j.k.l.m.n.p.s.t.v.w.z.i.u.æ.ð.ʃ.θ.ʒ.ə.ɚ.aɪ.aʊ.ɑ.eɪ.ɝ.ɛ.ɪ.oʊ.ɔ.ɔɪ.ʊ.ʌ.ŋ.ɹ">ipa</phoneme>.
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
