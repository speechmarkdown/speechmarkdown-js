# Amazon Alexa SSML

## Official resources

- [Alexa Skills SSML reference](https://developer.amazon.com/en-US/docs/alexa/custom-skills/speech-synthesis-markup-language-ssml-reference.html)
- [Alexa voice catalogue](https://developer.amazon.com/en-US/docs/alexa/custom-skills/choose-the-voice-for-your-skill.html)
- [Designing with domains and emotions](https://developer.amazon.com/en-US/docs/alexa/custom-skills/speechcons-reference-interjections-for-alexa.html#expressive-ssml)

## Speech Markdown formatter coverage

- **Say-as rendering.** Inline modifiers such as `address`, `characters`, `date`, `interjection`, `number`, `ordinal`, `telephone`, `time`, and `unit` are mapped to `<say-as>` with sensible defaults for date and time formats so Alexa pronunciation fixes can stay in Speech Markdown.【F:src/formatters/AmazonAlexaSsmlFormatter.ts†L76-L106】
- **Amazon-specific prosody.** Speech Markdown exposes `whisper`, `amazon:domain` (`dj` and `newscaster` modifiers), and `amazon:emotion` for `excited` and `disappointed`, emitting the appropriate tags and intensity attributes that Alexa recognises.【F:src/formatters/AmazonAlexaSsmlFormatter.ts†L107-L145】【F:src/formatters/AmazonAlexaSsmlFormatter.ts†L183-L201】
- **Voice fallback.** When a voice name is not present in the built-in whitelist, the formatter now falls back to emitting `<voice name="…">` so newly launched Alexa voices (for example Lupe or Aria) still render without code changes.【F:src/formatters/AmazonAlexaSsmlFormatter.ts†L49-L51】【F:src/formatters/SsmlFormatterBase.ts†L44-L57】
- **Section-level wrappers.** `lang` and `voice` section modifiers wrap larger blocks, and Speech Markdown keeps Amazon-specific `music` and `news` domains available for long-form sections.【F:src/formatters/AmazonAlexaSsmlFormatter.ts†L174-L205】

## Known gaps

- **Expressive extensions.** The formatter currently emits only `amazon:effect`, `amazon:domain`, and `amazon:emotion`, so features like `<amazon:auto-breaths>`, `<amazon:breath>`, `<alexa:name>`, and the long-form `<amazon:domain name="long-form">` still require manual SSML until new modifiers are defined.【F:src/formatters/AmazonAlexaSsmlFormatter.ts†L40-L46】【F:src/formatters/AmazonAlexaSsmlFormatter.ts†L183-L205】
- **Voice metadata.** The built-in whitelist predates the expanded Alexa voice line-up and lacks locale metadata for the neural voices, so Speech Markdown relies on the new fallback behaviour instead of providing locale validation for every published voice.【F:src/formatters/AmazonAlexaSsmlFormatter.ts†L5-L33】
- **No automated catalogue.** Unlike Azure, Google, Polly, and Watson, Alexa does not expose a public API for voice discovery, so the documentation cannot yet include a generated voice table and must be refreshed manually from the developer portal.
