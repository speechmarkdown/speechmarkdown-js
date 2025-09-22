# Microsoft Azure Speech Service SSML

## Official resources

- [SSML structure reference](https://learn.microsoft.com/azure/ai-services/speech-service/speech-synthesis-markup-structure)
- [Voice gallery](https://learn.microsoft.com/azure/ai-services/speech-service/language-support?tabs=tts)

## Speech Markdown formatter coverage

Speech Markdown's `microsoft-azure` formatter layers Azure-specific behaviour on top of the shared SSML mapping:

- **Say-as conversions.** Speech Markdown forwards modifiers such as `address`, `fraction`, `ordinal`, `telephone`, `number`, and `characters` to `<say-as>` while automatically choosing `cardinal` or `digits` for numeric text.【F:src/formatters/MicrosoftAzureSsmlFormatter.ts†L9-L48】
- **Dates and times.** The formatter emits `<say-as interpret-as="date">` and `<say-as interpret-as="time">` with Azure's default `ymd` and `hms12` formats when no explicit format is supplied.【F:src/formatters/MicrosoftAzureSsmlFormatter.ts†L49-L58】
- **Pronunciation helpers.** `sub` and `ipa` modifiers become `<sub alias="…">` and `<phoneme alphabet="ipa" ph="…">`, letting authors control pronunciation directly from Speech Markdown.【F:src/formatters/MicrosoftAzureSsmlFormatter.ts†L59-L66】
- **Prosody and whispering.** Rate, pitch, and volume modifiers augment `<prosody>` tags, and the `whisper` modifier approximates whispered delivery with `volume="x-soft"` and `rate="slow"` settings as recommended by Microsoft.【F:src/formatters/MicrosoftAzureSsmlFormatter.ts†L22-L27】【F:src/formatters/MicrosoftAzureSsmlFormatter.ts†L67-L75】
- **Voice and style selection.** Inline `voice` modifiers add `<voice name="…">` tags, and the section-level `newscaster` modifier wraps content in `<mstts:express-as style="newscast">` so maintainers can target Azure's neural styles.【F:src/formatters/MicrosoftAzureSsmlFormatter.ts†L23-L27】【F:src/formatters/MicrosoftAzureSsmlFormatter.ts†L76-L103】

### Unsupported or manual features

- The formatter explicitly disables Azure-only constructs such as `emphasis`, `expletive`, `interjection`, and `unit`, so those modifiers currently do not produce SSML output.【F:src/formatters/MicrosoftAzureSsmlFormatter.ts†L8-L17】
- Additional expressive behaviours—including `excited`, `disappointed`, and other MSTTS styles—remain unmapped because the shared SSML base leaves those modifiers set to `null` pending future design work.【F:src/formatters/SsmlFormatterBase.ts†L63-L86】

## Voice catalogue

The generated catalogue `data/azure-voices.md` is produced by `npm run docs:update-voices` when either `AZURE_SPEECH_KEY`/`AZURE_SPEECH_REGION` or `MICROSOFT_TOKEN`/`MICROSOFT_REGION` environment variables are supplied. The file lists every voice name, locale, gender, type, style, and sample rate returned by the Speech Service REST API so that formatter validations can remain current.
