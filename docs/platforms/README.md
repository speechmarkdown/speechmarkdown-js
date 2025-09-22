# Speech platform reference

This directory contains reference notes about the SSML dialects that Speech Markdown targets. Each page describes:

- Links to the vendor documentation for the dialect.
- Highlights of the current Speech Markdown formatter behaviour.
- Known gaps that are not currently translated by the formatter.
- A generated voice catalogue summarising the voices that expose the dialect when the provider shares the data programmatically.

## Available platform notes

- [Amazon Polly](./amazon-polly.md)
- [Amazon Alexa](./amazon-alexa.md)
- [Apple AVSpeechSynthesizer](./apple-avspeechsynthesizer.md)
- [Google Cloud Text-to-Speech](./google-cloud-tts.md)
- [IBM Watson Text to Speech](./ibm-watson-tts.md)
- [ElevenLabs prompt controls](./elevenlabs.md)
- [Microsoft Azure Speech Service](./azure.md)
- [W3C SSML](./w3c.md)
- [Microsoft Speech API (SAPI)](./microsoft-sapi.md)

Voice catalogues are produced by the helper script `npm run docs:update-voices` which gathers voice metadata from the vendor APIs when credentials are available. The generated Markdown files live alongside the service documentation so that the catalogues can be versioned with the code base.
