// tslint:disable-next-line:import-name
import dedent from 'ts-dedent';
import { SpeechMarkdown } from '../src/SpeechMarkdown';

describe('sections-standard', () => {

  const speech = new SpeechMarkdown();

  const markdown = dedent`
    Normal speech.

    #[dj]
    Switching to a music/media announcer.

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


    <amazon:domain name="music">
    Switching to a music/media announcer.

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
      Switching to a music/media announcer.
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


      Switching to a music/media announcer.


      Now back to normal speech.
    `;

    expect(text).toBe(expected);
  });

});

// describe('sections-standard end speak tag at end', () => {

//   const speech = new SpeechMarkdown();

//   const markdown = dedent`
//     #[voice:"Kendra"]
//     Section 1

//     #[voice:"Brian";lang:"en-GB"]
//     Section 2
//   `;

//   test('converts to SSML - Amazon Alexa', () => {

//     const options = {
//       platform: 'amazon-alexa'
//     };
//     const ssml = speech.toSSML(markdown, options);

//     const expected = dedent`
//       <speak>

//       <voice name="Kendra">
//       Section 1

//       </voice>

//       <voice name="Brian">
//       <lang xml:lang="en-GB">
//       Section 2</lang>
//       </voice>

//       </speak>
//     `;

//     expect(ssml).toBe(expected);
//   });

//   test('converts to SSML - Google Assistant', () => {

//     const options = {
//       platform: 'google-assistant',
//       preserveEmptyLines: false
//     };
//     const ssml = speech.toSSML(markdown, options);

//     const expected = dedent`
//       <speak>
//       Section 1
//       Section 2
//       </speak>
//     `;

//     expect(ssml).toBe(expected);
//   });

//   test('converts to Plain Text', () => {

//     const options = {
//     };
//     const text = speech.toText(markdown, options);

//     const expected = dedent`
//       Section 1


//       Section 2
//     `;
//     expect(text).toBe(expected);
//   });

// });

// describe('sections-standard voice section on same line', () => {

//   const speech = new SpeechMarkdown();

//   const markdown = dedent`
//     #[voice:'Brian'] Hey there, nice to meet you
//   `;

//   test('converts to SSML - Amazon Alexa', () => {

//     const options = {
//       platform: 'amazon-alexa'
//     };
//     const ssml = speech.toSSML(markdown, options);

//     const expected = dedent`
//       <speak>

//       <voice name="Brian"> Hey there, nice to meet you</voice>

//       </speak>
//     `;

//     expect(ssml).toBe(expected);
//   });

//   test('converts to SSML - Google Assistant', () => {

//     const options = {
//       platform: 'google-assistant'
//     };
//     const ssml = speech.toSSML(markdown, options);

//     const expected = dedent`
//       <speak>
//        Hey there, nice to meet you
//       </speak>
//     `;

//     expect(ssml).toBe(expected);
//   });

//   test('converts to Plain Text', () => {

//     const options = {
//     };
//     const text = speech.toText(markdown, options);

//     const expected = 'Hey there, nice to meet you';

//     expect(text).toBe(expected);
//   });

// });
