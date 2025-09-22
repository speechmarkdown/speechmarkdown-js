# IBM Watson Text to Speech SSML

## Official resources

- [SSML documentation](https://cloud.ibm.com/apidocs/text-to-speech#synthesize)
- [Voice list](https://cloud.ibm.com/docs/text-to-speech?topic=text-to-speech-voices)

## Speech Markdown status

Speech Markdown now ships an IBM Watson formatter that translates the core modifiers into Watson-compatible SSML. The implementation covers `say-as`, `sub`, `phoneme`, `emphasis`, and prosody attributes, while leaving Watson-exclusive constructs such as `<express-as>` or voice transformations untouched so the generated markup stays within the documented subset of the service.【F:src/formatters/FormatterFactory.ts†L1-L39】【F:src/formatters/IbmWatsonSsmlFormatter.ts†L6-L213】

## Voice catalogue

Provide `WATSON_TTS_URL` (e.g. `https://api.us-south.text-to-speech.watson.cloud.ibm.com`) and `WATSON_TTS_API_KEY` to `npm run docs:update-voices` to refresh `data/ibm-watson-voices.md`. The script queries `/v1/voices` and writes a Markdown table that includes each voice's name, language, gender, and available expressive features so formatter validations can be cross-checked.
