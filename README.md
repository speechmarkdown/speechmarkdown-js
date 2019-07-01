[![TypeScript version][ts-badge]][typescript-34]
[![Node.js version][nodejs-badge]][nodejs]
[![MIT][license-badge]][LICENSE]

# speechmarkdown-js

Speech Markdown grammar, parser, and formatters for use with JavaScript.

This project is a work-in-progress. All volunteers are appreciated!

Find the architecture [here](./docs/architecture.md)


## Quick start

### SSML - Amazon Alexa
Convert Speech Markdown to SSML for Amazon Alexa

```js
const smd = require('speechmarkdown-js');

const markdown = `Sample [3s] speech [250ms] markdown`;
const options = {
    platform: 'amazon-alexa'
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
    platform: 'google-assistant'
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




## Working on this project?

### Grammar
The biggest place we need help right now is with the completion of the grammar and formatters.

#### Short Format

* [x] break
* [x] emphasis - strong
* [x] emphasis - moderate
* [x] emphasis - none
* [x] emphasis - reduced
* [ ] ipa
* [ ] sub

#### Standard Format

* [x] address
* [ ] audio
* [ ] break (time)
* [ ] break (strength)
* [x] characters / chars
* [ ] date
* [x] emphasis
* [x] expletive / bleep
* [ ] fraction
* [x] interjection
* [ ] ipa
* [ ] lang
* [ ] lang (section)
* [x] number
* [x] ordinal
* [ ] phone / telephone
* [ ] pitch
* [ ] rate
* [ ] sub
* [x] time
* [x] unit
* [ ] voice
* [ ] voice (section)
* [ ] volume / vol
* [x] whisper

### Available scripts

+ `clean` - remove coverage data, Jest cache and transpiled files,
+ `build` - transpile TypeScript to ES6,
+ `build:watch` - interactive watch mode to automatically transpile source files,
+ `lint` - lint source files and tests,
+ `test` - run tests,
+ `test:watch` - interactive watch mode to automatically re-run tests



## License
Licensed under the MIT. See the [LICENSE](https://github.com/speechmarkdown/speechmarkdown-js/blob/master/LICENSE) file for details.

[ts-badge]: https://img.shields.io/badge/TypeScript-3.4-blue.svg
[typescript]: https://www.typescriptlang.org/
[typescript-34]: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html

[nodejs-badge]: https://img.shields.io/badge/Node.js->=%2010.13-blue.svg
[nodejs]: https://nodejs.org/dist/latest-v10.x/docs/api/

[license-badge]: https://img.shields.io/badge/license-MIT-blue.svg
[license]: https://github.com/speechmarkdown/speechmarkdown-js/blob/master/LICENSE
