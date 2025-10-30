# Microsoft Azure Speech Service SSML

## Official resources

- [SSML structure reference](https://learn.microsoft.com/azure/ai-services/speech-service/speech-synthesis-markup-structure)
- [Voice and sound with SSML](https://learn.microsoft.com/azure/ai-services/speech-service/speech-synthesis-markup-voice)
- [Voice gallery](https://learn.microsoft.com/azure/ai-services/speech-service/language-support?tabs=tts)

## Speech Markdown formatter coverage

Speech Markdown's `microsoft-azure` formatter provides comprehensive support for Azure's Text-to-Speech features, including automatic MSTTS namespace injection and extensive neural voice style support.

### Core SSML Features

- **Say-as conversions.** Speech Markdown forwards modifiers such as `address`, `fraction`, `ordinal`, `telephone`, `number`, and `characters` to `<say-as>` while automatically choosing `cardinal` or `digits` for numeric text.
- **Dates and times.** The formatter emits `<say-as interpret-as="date">` and `<say-as interpret-as="time">` with Azure's default `ymd` and `hms12` formats when no explicit format is supplied.
- **Pronunciation helpers.** `sub` and `ipa` modifiers become `<sub alias="…">` and `<phoneme alphabet="ipa" ph="…">`, letting authors control pronunciation directly from Speech Markdown.
- **Prosody and whispering.** Rate, pitch, and volume modifiers augment `<prosody>` tags, and the `whisper` modifier approximates whispered delivery with `volume="x-soft"` and `rate="slow"` settings as recommended by Microsoft.
- **Voice selection.** Inline `voice` modifiers add `<voice name="…">` tags for switching between Azure neural voices.

### Azure MSTTS Extensions

#### Automatic Namespace Injection

The formatter automatically detects when Azure-specific MSTTS tags are present in the generated SSML and injects the required `xmlns:mstts="https://www.w3.org/2001/mstts"` namespace declaration into the `<speak>` tag. This ensures valid SSML without manual intervention.

#### Express-As Styles (27 styles supported)

Azure neural voices support emotional and scenario-specific speaking styles through the `mstts:express-as` element. Speech Markdown provides full support for all Azure express-as styles:

**Emotional Styles:**
- `(text)[excited]` - Excited, enthusiastic delivery
- `(text)[disappointed]` - Disappointed, let-down delivery
- `(text)[friendly]` - Warm, friendly delivery
- `(text)[cheerful]` - Upbeat, cheerful delivery
- `(text)[sad]` - Sad, melancholic delivery
- `(text)[angry]` - Angry, irritated delivery
- `(text)[fearful]` - Fearful, anxious delivery
- `(text)[empathetic]` - Caring, empathetic delivery
- `(text)[calm]` - Calm, composed delivery
- `(text)[hopeful]` - Hopeful, optimistic delivery
- `(text)[terrified]` - Terrified, extremely fearful delivery
- `(text)[unfriendly]` - Cold, unfriendly delivery
- `(text)[gentle]` - Gentle, soft delivery
- `(text)[serious]` - Serious, formal delivery
- `(text)[depressed]` - Depressed, low-energy delivery
- `(text)[embarrassed]` - Embarrassed, awkward delivery
- `(text)[disgruntled]` - Disgruntled, annoyed delivery
- `(text)[envious]` - Envious, jealous delivery
- `(text)[affectionate]` - Affectionate, loving delivery

**Scenario-Specific Styles:**
- `(text)[newscaster]` - News broadcast style
- `(text)[shouting]` - Shouting, loud delivery
- `(text)[whispering]` - Whispering, quiet delivery
- `(text)[lyrical]` - Lyrical, singing-like delivery
- `(text)[assistant]` - Digital assistant style
- `(text)[chat]` - Casual chat style
- `(text)[customerservice]` - Customer service style
- `(text)[poetry-reading]` - Poetry reading style (section-level only)
- `(text)[narration-professional]` - Professional narration style (section-level only)
- `(text)[newscast-casual]` - Casual news style (section-level only)

**Style Degree (Intensity Control):**

You can control the intensity of express-as styles using a numeric value between 0.01 and 2.0 (default is 1.0):

```markdown
(This is slightly excited)[excited:"0.5"]
(This is very excited)[excited:"1.8"]
```

Generates:
```xml
<speak xmlns:mstts="https://www.w3.org/2001/mstts">
<mstts:express-as style="excited" styledegree="0.5">This is slightly excited</mstts:express-as>
<mstts:express-as style="excited" styledegree="1.8">This is very excited</mstts:express-as>
</speak>
```

**Section-Level Styles:**

Express-as styles can also be applied at the section level:

```markdown
#[excited]
This entire section is excited!
Multiple sentences work too.
```

Generates:
```xml
<speak xmlns:mstts="https://www.w3.org/2001/mstts">
<mstts:express-as style="excited">
This entire section is excited!
Multiple sentences work too.
</mstts:express-as>
</speak>
```

### Unsupported or manual features

- The formatter explicitly disables Azure-only constructs such as `emphasis`, `expletive`, `interjection`, and `unit`, so those modifiers currently do not produce SSML output.
- **Role attribute** for express-as (Girl, Boy, YoungAdultFemale, etc.) requires Speech Markdown syntax extension and is not yet supported.
- **mstts:silence** tag for precise silence control requires grammar extension and is not yet supported. Use standard `[break:"time"]` syntax or raw SSML passthrough for now.
- **mstts:backgroundaudio**, **mstts:viseme**, **mstts:audioduration**, **mstts:ttsembedding**, and **mstts:voiceconversion** are advanced features that can be added via raw SSML passthrough.

## Voice catalogue

The generated catalogue `data/azure-voices.md` is produced by `npm run docs:update-voices` when either `AZURE_SPEECH_KEY`/`AZURE_SPEECH_REGION` or `MICROSOFT_TOKEN`/`MICROSOFT_REGION` environment variables are supplied. The file lists every voice name, locale, gender, type, style, and sample rate returned by the Speech Service REST API so that formatter validations can remain current.
