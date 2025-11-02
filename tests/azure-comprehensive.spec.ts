// tslint:disable-next-line:import-name
import dedent from 'ts-dedent';
import { SpeechMarkdown } from '../src/SpeechMarkdown';

describe('azure-comprehensive', () => {
  const speech = new SpeechMarkdown();
  const options = {
    platform: 'microsoft-azure',
  };

  test.skip('Simple azure Voice name with colon (not supported by parser)', () => {
    // Voice names with colons like "en-US-Ava:DragonHDLatestNeural" are not supported by the parser
    // The colon character causes parsing issues
    const markdown = dedent`
      #[voice:"en-US-Ava:DragonHDLatestNeural"]
      My favorite colors are green & yellow.
    `;

    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>

      <voice name="en-US-Ava:DragonHDLatestNeural">
      My favorite colors are green &amp; yellow.</voice>

      </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('Bookmark', () => {
    const markdown = dedent`
      #[voice:"en-US-AvaNeural"]
      We are selling [mark:"flower_1"]roses and [mark:"flower_2"]daisies.
    `;

    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>

      <voice name="en-US-AvaNeural">
      We are selling <bookmark mark="flower_1"/>roses and <bookmark mark="flower_2"/>daisies.</voice>

      </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test.skip('Multi Voices with colon (not supported by parser)', () => {
    // Voice names with colons are not supported by the parser
    const markdown = dedent`
      #[voice:"en-US-Ava:DragonHDLatestNeural"]
      Good morning!

      #[voice:"en-US-Andrew:DragonHDLatestNeural"]
      Good morning to you too Ava!
    `;

    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>

      <voice name="en-US-Ava:DragonHDLatestNeural">
      Good morning!</voice>


      <voice name="en-US-Andrew:DragonHDLatestNeural">
      Good morning to you too Ava!</voice>

      </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test.skip('Audio effects (effect attribute not yet supported)', () => {
    // The effect attribute on voice tag is not yet supported
    const markdown = dedent`
      #[voice:"en-US-AvaMultilingualNeural";effect:"eq_car"]
      This is the text that is spoken.
    `;

    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>

      <voice name="en-US-AvaMultilingualNeural" effect="eq_car">
      This is the text that is spoken.</voice>

      </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('Style and degree', () => {
    const markdown = dedent`
      #[voice:"zh-CN-XiaomoNeural"]
      (快走吧，路上一定要注意安全，早去早回。)[sad:"2"]
    `;

    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak xmlns:mstts="https://www.w3.org/2001/mstts">

      <voice name="zh-CN-XiaomoNeural">
      <mstts:express-as style="sad" styledegree="2">快走吧，路上一定要注意安全，早去早回。</mstts:express-as></voice>

      </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('Adjust Role', () => {
    const markdown = dedent`
      #[voice:"zh-CN-XiaomoNeural"]
      女儿看见父亲走了进来，问道：
      ("您来的挺快的，怎么过来的？")[role:"YoungAdultFemale";style:"calm"]
      父亲放下手提包，说：
      ("刚打车过来的，路上还挺顺畅。")[role:"OlderAdultMale";style:"calm"]
    `;

    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak xmlns:mstts="https://www.w3.org/2001/mstts">

      <voice name="zh-CN-XiaomoNeural">
      女儿看见父亲走了进来，问道：
      <mstts:express-as role="YoungAdultFemale" style="calm">"您来的挺快的，怎么过来的？"</mstts:express-as>
      父亲放下手提包，说：
      <mstts:express-as role="OlderAdultMale" style="calm">"刚打车过来的，路上还挺顺畅。"</mstts:express-as></voice>

      </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('Change of Langs', () => {
    const markdown = dedent`
      #[voice:"en-US-AvaMultilingualNeural"]
      (¡Esperamos trabajar con usted!)[lang:"es-MX"]
      (We look forward to working with you!)[lang:"en-US"]
      (Nous avons hâte de travailler avec vous!)[lang:"fr-FR"]
    `;

    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>

      <voice name="en-US-AvaMultilingualNeural">
      <lang xml:lang="es-MX">¡Esperamos trabajar con usted!</lang>
      <lang xml:lang="en-US">We look forward to working with you!</lang>
      <lang xml:lang="fr-FR">Nous avons hâte de travailler avec vous!</lang></voice>

      </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('Change Pitch', () => {
    const markdown = dedent`
      #[voice:"en-US-AvaMultilingualNeural"]
      Welcome to (Enjoy using text to speech.)[pitch:"high"]
    `;

    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>

      <voice name="en-US-AvaMultilingualNeural">
      Welcome to <prosody pitch="high">Enjoy using text to speech.</prosody></voice>

      </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('Emphasis', () => {
    const markdown = dedent`
      #[voice:"en-US-AndrewMultilingualNeural"]
      I can help you join your +meetings+ fast.
    `;

    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>

      <voice name="en-US-AndrewMultilingualNeural">
      I can help you join your <emphasis level="moderate">meetings</emphasis> fast.</voice>

      </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('Recorded Audio', () => {
    const markdown = dedent`
      #[voice:"en-US-AvaMultilingualNeural"]
      !["https://contoso.com/opinionprompt.wav"]
      Thanks for offering your opinion. Please begin speaking after the beep.
      !(Could not play the beep, please voice your opinion now.)["https://contoso.com/beep.wav"]
    `;

    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>

      <voice name="en-US-AvaMultilingualNeural">
      <audio src="https://contoso.com/opinionprompt.wav"/>
      Thanks for offering your opinion. Please begin speaking after the beep.
      <audio src="https://contoso.com/beep.wav"/></voice>

      </speak>
    `;

    expect(ssml).toBe(expected);
  });
});
