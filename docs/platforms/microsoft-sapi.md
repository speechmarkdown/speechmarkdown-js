# Microsoft Speech API (SAPI) voices

## Official resources

- [SAPI 5 XML reference](<https://learn.microsoft.com/previous-versions/windows/desktop/ms720163(v=vs.85)>)

## Speech Markdown status

Speech Markdown routes Microsoft SAPI output through the shared W3C formatter so the generated SSML stays aligned with the [W3C Speech Synthesis Recommendation](https://www.w3.org/TR/speech-synthesis/). The shared formatter covers emphasis, `say-as`, prosody, phonemes, `lang`, and voice tags and falls back to `<voice name="…">` when a voice is not present in the configured catalogue.【F:src/formatters/W3cSsmlFormatter.ts†L1-L210】 The SAPI adapter simply reuses that implementation while swapping the formatter comment so maintainers can tell the target engine in generated markup.【F:src/formatters/MicrosoftSapiSsmlFormatter.ts†L1-L11】【F:src/formatters/FormatterFactory.ts†L1-L40】 Unsupported Speech Markdown modifiers such as whisper effects or vendor-specific styles are ignored because the W3C dialect does not define them.

## Voice catalogue

SAPI voice availability is determined by the voices installed on the host machine. Developers can enumerate the voices locally via PowerShell (`Get-SPVoice`) or .NET (`SpeechSynthesizer.GetInstalledVoices()`). Documenting the complete list in-repo is impractical because it varies by Windows SKU and third-party voice packs. When maintainers export the installed voices to JSON (for example `Get-InstalledVoices | ConvertTo-Json > voices.json`) and set `SAPI_VOICE_EXPORT` to that file, `npm run docs:update-voices` will regenerate `data/microsoft-sapi-voices.md` with the captured baseline.
