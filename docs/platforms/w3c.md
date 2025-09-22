# W3C SSML

## Official resources

- [Speech Synthesis Markup Language (SSML) Version 1.1 Recommendation](https://www.w3.org/TR/speech-synthesis/)

## Speech Markdown status

Speech Markdown exposes a `w3c` formatter that emits spec-compliant SSML and serves as the foundation for engines that consume the standard, including Microsoft SAPI.【F:src/formatters/W3cSsmlFormatter.ts†L1-L210】【F:src/formatters/FormatterFactory.ts†L1-L40】 The formatter supports:

- `<emphasis>` with optional level fallbacks when not supplied in the markup.
- `<say-as>` for numbers, digits, addresses, dates, times, ordinals, interjections, expletives, telephone numbers, and generic units.
- `<prosody>` attributes for rate, pitch, and volume adjustments on the same element.
- `<phoneme alphabet="ipa">` for IPA transcriptions.
- `<sub alias="…">` substitutions.
- `<lang xml:lang="…">` wrappers at inline and section scope.
- `<voice>` tags driven by configured catalogues, with a fallback to `name="…"` for unlisted voices.
- `<mark>` and `<audio>` elements produced by the Speech Markdown grammar.

Unsupported Speech Markdown modifiers simply fall through so that the formatter does not generate non-standard tags when the Recommendation does not define an equivalent. When additional W3C features such as `<lexicon>` become exposed through Speech Markdown they can be added in the same formatter.
