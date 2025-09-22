# ElevenLabs prompt controls

- **Vendor documentation:** [Prompt controls reference](https://elevenlabs.io/docs/best-practices/prompting/controls)
- **Formatter entry point:** `platform: 'elevenlabs'`

## Implemented Speech Markdown features

The ElevenLabs API does not accept full SSML documents. The formatter therefore emits plain text with the inline tags that the service recognises:

- `[break:"<duration>"]` → `<break time="<duration>"/>`
- `[break:"<strength>"]` → `<break time="…"/>` with strength values mapped to approximate second values the engine accepts (`none` → `0s`, `x-weak` → `0.2s`, `weak` → `0.35s`, `medium` → `0.5s`, `strong` → `0.8s`, `x-strong` → `1.2s`).
- `(word)[ipa:"<phoneme>"]` → `<phoneme alphabet="ipa" ph="<phoneme>">word</phoneme>`

All other Speech Markdown modifiers fall back to plain text because ElevenLabs relies on narrative prompting rather than SSML equivalents for emphasis, say-as, or voice selection.

## Notes

- ElevenLabs does not publish a programmatic voice catalogue. The formatter expects the caller to choose a voice through the API request payload instead of inside the generated prompt.
- The formatter honours `includeFormatterComment` by inserting an HTML comment at the start of the prompt, but `includeSpeakTag` and `includeParagraphTag` are ignored because the target does not support container tags.
