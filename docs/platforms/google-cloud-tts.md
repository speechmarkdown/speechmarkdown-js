# Google Cloud Text-to-Speech SSML

## Official resources

- [SSML reference](https://cloud.google.com/text-to-speech/docs/ssml)
- [Voice list](https://cloud.google.com/text-to-speech/docs/voices)

## Speech Markdown formatter coverage

Speech Markdown's `google-assistant` formatter targets the SSML dialect that Google Cloud Text-to-Speech accepts:

- **Emphasis and say-as mappings.** Modifiers like `emphasis`, `address`, `fraction`, `number`, `ordinal`, `telephone`, and `unit` map to `<emphasis>` or `<say-as>` tags so common pronunciations flow through automatically.【F:src/formatters/GoogleAssistantSsmlFormatter.ts†L25-L49】
- **Date and time formatting.** Speech Markdown emits `<say-as interpret-as="date">` and `<say-as interpret-as="time">` with Google's default `ymd` and `hms12` formats unless authors override them.【F:src/formatters/GoogleAssistantSsmlFormatter.ts†L50-L57】
- **Pronunciation control.** `sub` and `ipa` generate `<sub>` and `<phoneme>` tags respectively, while rate, pitch, and volume modifiers augment `<prosody>` and the `whisper` modifier applies Google's recommended soft volume and slow rate.【F:src/formatters/GoogleAssistantSsmlFormatter.ts†L58-L77】
- **Language and voice selection.** Inline and section-level `lang` modifiers wrap content in `<lang xml:lang="…">`, and `voice` modifiers delegate to the formatter's built-in voice catalogue so that canonical Google Assistant names resolve without manual SSML.【F:src/formatters/GoogleAssistantSsmlFormatter.ts†L20-L35】【F:src/formatters/GoogleAssistantSsmlFormatter.ts†L78-L113】

### Unsupported or manual features

- The formatter disables the `interjection` modifier because Google Cloud's SSML does not provide a direct equivalent today.【F:src/formatters/GoogleAssistantSsmlFormatter.ts†L24-L27】
- Speech Markdown still ships an older, hard-coded `validVoices` map that only covers the legacy Assistant inventory, so Cloud TTS voices such as WaveNet, Neural2, Studio, and Polyglot variants require manual SSML until the formatter is updated to query the modern voice list.【F:src/formatters/GoogleAssistantSsmlFormatter.ts†L6-L34】
- Expressive domains like `newscaster`, `excited`, or `disappointed` fall back to raw text because those modifiers are left unset in the shared SSML base pending a Google-specific design.【F:src/formatters/SsmlFormatterBase.ts†L63-L86】

## Voice catalogue

Run `npm run docs:update-voices` with a `GOOGLE_TTS_API_KEY` to regenerate `data/google-cloud-voices.md`. The generated table captures the voice name, languages, gender, and natural sample rate returned by the Text-to-Speech REST API so that formatter validation can keep pace with Google's evolving inventory.
