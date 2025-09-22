# Apple AVSpeechSynthesizer voices

## Official resources

- [AVSpeechSynthesizer documentation](https://developer.apple.com/documentation/avfaudio/avspeechsynthesizer)
- [SSML support overview](https://developer.apple.com/documentation/avfoundation/speech_synthesis)

## Speech Markdown status

Speech Markdown now exposes an AVSpeechSynthesizer formatter that focuses on the subset of SSML Apple accepts. The formatter enables `say-as` for characters and numbers, preserves substitution and IPA hints, and keeps voice selections in the output while intentionally ignoring unsupported prosody keys such as `rate`, `pitch`, `volume`, and `whisper` so AVSpeechSynthesizer falls back to native utterance configuration.【F:src/formatters/FormatterFactory.ts†L1-L39】【F:src/formatters/AppleAvSpeechSynthesizerSsmlFormatter.ts†L6-L136】

## Voice catalogue

macOS, iOS, and iPadOS ship a large number of built-in system voices that vary by OS version and user downloads. The helper script can create or refresh `data/apple-avspeechsynthesizer-voices.md` as a staging area for curated lists gathered from `AVSpeechSynthesisVoice.speechVoices()` output when maintainers have access to Apple hardware. Export the array to JSON (for example using a small Swift snippet) and set `APPLE_VOICE_EXPORT` before running `npm run docs:update-voices` to update the table.
