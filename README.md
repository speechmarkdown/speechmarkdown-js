[![TypeScript version][ts-badge]][typescript-34]
[![Node.js version][nodejs-badge]][nodejs]
[![MIT][license-badge]][license]

# speechmarkdown-js

Speech Markdown grammar, parser, and formatters for use with JavaScript.

Supported platforms:

- amazon-alexa
- amazon-polly
- amazon-polly-neural
- apple-avspeechsynthesizer
- google-assistant
- ibm-watson
- microsoft-azure
- microsoft-sapi
- w3c
- samsung-bixby
- elevenlabs

Find the architecture [here](./docs/architecture.md)

Platform-specific SSML notes are tracked in [`docs/platforms`](./docs/platforms/README.md). Use `npm run docs:update-voices` to refresh the auto-generated voice maps in `src/formatters/data` when vendor credentials are available.

## Quick start

### SSML - Amazon Alexa

Convert Speech Markdown to SSML for Amazon Alexa

```js
const smd = require('speechmarkdown-js');

const markdown = `Sample [3s] speech [250ms] markdown`;
const options = {
  platform: 'amazon-alexa',
};

const speech = new smd.SpeechMarkdown();
const ssml = speech.toSSML(markdown, options);
```

The resulting SSML is:

```xml
<speak>
Sample <break time="3s"/> speech <break time="250ms"/> markdown
</speak>
```

### SSML - Google Assistant

Convert Speech Markdown to SSML for Google Assistant

```js
const smd = require('speechmarkdown-js');

const markdown = `Sample [3s] speech [250ms] markdown`;
const options = {
  platform: 'google-assistant',
};

const speech = new smd.SpeechMarkdown();
const ssml = speech.toSSML(markdown, options);
```

The resulting SSML is:

```xml
<speak>
Sample <break time="3s"/> speech <break time="250ms"/> markdown
</speak>
```

### Plain Text

Convert Speech Markdown to Plain Text

```js
const smd = require('speechmarkdown-js');

const markdown = `Sample [3s] speech [250ms] markdown`;
const options = {};

const speech = new smd.SpeechMarkdown();
const text = speech.toText(markdown, options);
```

The resulting text is:

```text
Sample speech markdown
```

## More

### Options

You can pass `options` into the constructor:

```js
const smd = require('speechmarkdown-js');

const markdown = `Sample [3s] speech [250ms] markdown`;
const options = {
  platform: 'amazon-alexa',
};

const speech = new smd.SpeechMarkdown(options);
const ssml = speech.toSSML(markdown);
```

Or in the methods `toSSML` and `toText`:

```js
const smd = require('speechmarkdown-js');

const markdown = `Sample [3s] speech [250ms] markdown`;
const options = {
  platform: 'amazon-alexa',
};

const speech = new smd.SpeechMarkdown();
const ssml = speech.toSSML(markdown, options);
```

Available options are:

- `platform` (string) - Determines the formatter to use to render SSML. Valid values are:

  - "amazon-alexa"
  - "amazon-polly"
  - "amazon-polly-neural"
  - "apple-avspeechsynthesizer"
  - "google-assistant"
  - "ibm-watson"
  - "microsoft-azure"
  - "microsoft-sapi"
  - "w3c"
  - "samsung-bixby"
  - "elevenlabs"

- `includeFormatterComment` (boolean) - Adds an XML comment to the SSML output indicating the formatter used. Default is `false`.

- `includeSpeakTag` (boolean) - Determines if the `<speak>` tag will be rendered in the SSML output. Default is `true`.

- `includeParagraphTag` (boolean) - Determines if the `<p>` tag will be rendered in the SSML output. Default is `false`.

- `preserveEmptyLines` (boolean) - keep empty lines in markdown in SSML. Default is `true`.

- `escapeXmlSymbols` (boolean) - Currently only for `amazon-alexa` and `microsoft-azure`. Escape XML text. Default is `false`.

- `voices` (object) - give custom names to voices and use that in your markdown:

  ```json
  {
    "platform": "amazon-alexa",
    "voices": {
      "Scott": { "voice": { "name": "Brian" } },
      "Sarah": { "voice": { "name": "Kendra" } }
    }
  }
  ```

  ```json
  {
    "platform": "google-assistant",
    "voices": {
      "Brian": {
        "voice": { "gender": "male", "variant": 1, "language": "en-US" }
      },
      "Sarah": {
        "voice": { "gender": "female", "variant": 3, "language": "en-US" }
      }
    }
  }
  ```

## Working on this project?

### Grammar

The biggest place we need help right now is with the completion of the grammar and formatters.

#### Short Format

- [x] break
- [x] emphasis - strong
- [x] emphasis - moderate
- [x] emphasis - none
- [x] emphasis - reduced
- [x] ipa
- [x] sub

Short-form examples:

- `(pecan)/'pi.kæn/` → `<phoneme alphabet="ipa" ph="'pi.kæn">pecan</phoneme>`
- `(Al){aluminum}` → `<sub alias="aluminum">Al</sub>`
- `/ˈdeɪtə/` → `<phoneme alphabet="ipa" ph="ˈdeɪtə">ipa</phoneme>`

#### Standard Format

- [x] address
- [x] audio
- [x] break (time)
- [x] break (strength)
- [x] characters / chars
- [x] date
- [x] defaults (section)
- [x] disappointed
- [x] disappointed (section)
- [x] dj (section)
- [x] emphasis
- [x] excited
- [x] excited (section)
- [x] expletive / bleep
- [x] fraction
- [x] interjection
- [x] ipa
- [x] lang
- [x] lang (section)
- [x] mark
- [x] newscaster (section)
- [x] number
- [x] ordinal
- [x] telephone / phone
- [x] pitch
- [x] rate
- [x] sub
- [x] time
- [x] unit
- [x] voice
- [x] voice (section)
- [x] volume / vol
- [x] whisper

### Available scripts

- `clean` - remove coverage data, Jest cache and transpiled files,
- `build` - perform all build tasks
- `build:ts` - transpile TypeScript to ES5
- `build:browser` - creates single file `./dist.browser/speechmarkdown.js` file for use in browser,
- `build:minify` - creates single file `./dist.browser/speechmarkdown.min.js` file for use in browser,
- `watch` - interactive watch mode to automatically transpile source files,
- `lint` - lint source files and tests,
- `test` - run tests,
- `test:watch` - interactive watch mode to automatically re-run tests

## License

Licensed under the MIT. See the [LICENSE](https://github.com/speechmarkdown/speechmarkdown-js/blob/master/LICENSE) file for details.

[ts-badge]: https://img.shields.io/badge/TypeScript-3.4-blue.svg
[typescript]: https://www.typescriptlang.org/
[typescript-34]: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html
[nodejs-badge]: https://img.shields.io/badge/Node.js->=%2010.13-blue.svg
[nodejs]: https://nodejs.org/dist/latest-v10.x/docs/api/
[license-badge]: https://img.shields.io/badge/license-MIT-blue.svg
[license]: https://github.com/speechmarkdown/speechmarkdown-js/blob/master/LICENSE
