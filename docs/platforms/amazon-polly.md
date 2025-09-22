# Amazon Polly SSML

## Official resources

- [Supported SSML tags](https://docs.aws.amazon.com/polly/latest/dg/supportedtags.html)
- [Voice catalogue](https://docs.aws.amazon.com/polly/latest/dg/voicelist.html)

## Speech Markdown formatter coverage

Speech Markdown ships two formatters for Amazon Polly.

### `amazon-polly` (standard engine)

- **Say-as pronunciations.** Modifiers such as `address`, `cardinal`, `characters`, `digits`, `fraction`, `number`, `ordinal`, `telephone`, and `unit` render as `<say-as>` with sensible defaults for dates and times, mirroring Polly's SSML support.【F:src/formatters/AmazonPollySsmlFormatter.ts†L47-L72】
- **Pronunciation controls.** The formatter exposes `<sub>`, `<phoneme alphabet="ipa">`, and `<prosody>` so aliasing, IPA phonemes, and rate, pitch, or volume adjustments can be driven from Speech Markdown.【F:src/formatters/AmazonPollySsmlFormatter.ts†L78-L93】
- **Amazon-specific effects.** Polly-only modifiers such as `whisper`, `timbre`, and `drc` produce `amazon:effect` tags, while inline `lang` modifiers wrap content in `<lang xml:lang="…">` for mixed-language prompts.【F:src/formatters/AmazonPollySsmlFormatter.ts†L74-L105】
- **Known gaps.** Inline `voice`, `excited`, and `disappointed` modifiers are defined but intentionally left without SSML output, and section-level variants such as `newscaster` are also ignored, so these behaviours still require manual SSML.【F:src/formatters/AmazonPollySsmlFormatter.ts†L107-L151】

### `amazon-polly-neural`

- **Shared say-as handling.** The neural formatter mirrors the standard engine for `address`, `characters`, `digits`, `fraction`, `number`, `ordinal`, `telephone`, `unit`, `date`, and `time` modifiers so pronunciation fixes work across both engines.【F:src/formatters/AmazonPollyNeuralSsmlFormatter.ts†L41-L67】
- **Pronunciation helpers.** `sub`, `ipa`, and the rate or volume prosody controls are preserved, and `lang` plus `drc` continue to emit `<lang>` and `amazon:effect` tags respectively.【F:src/formatters/AmazonPollyNeuralSsmlFormatter.ts†L69-L91】
- **Neural-only domains.** Section-level `newscaster` modifiers wrap content in `<amazon:domain name="news">` to reach Polly's neural news style.【F:src/formatters/AmazonPollyNeuralSsmlFormatter.ts†L115-L134】
- **Known gaps.** Neural voices do not currently expose `emphasis`, `whisper`, `voice`, `excited`, or `disappointed` output because the formatter drops those modifiers, matching the limitations of Polly's neural styles.【F:src/formatters/AmazonPollyNeuralSsmlFormatter.ts†L93-L145】

## Voice catalogue

Run `npm run docs:update-voices` with either `AWS_ACCESS_KEY_ID`/`AWS_SECRET_ACCESS_KEY` plus `AWS_REGION` (or `AWS_DEFAULT_REGION`) or the `POLLY_AWS_KEY_ID`/`POLLY_AWS_ACCESS_KEY`/`POLLY_REGION` equivalents to regenerate `data/amazon-polly-voices.md`. The helper script calls Polly's `ListVoices` API (with additional language codes enabled) and writes a Markdown table of each voice's identifier, language, gender, and supported engines so formatter validations stay aligned with Amazon's inventory.
