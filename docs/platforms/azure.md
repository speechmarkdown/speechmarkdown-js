# Microsoft Azure Speech Service SSML

## Official resources

- [SSML structure reference](https://learn.microsoft.com/azure/ai-services/speech-service/speech-synthesis-markup-structure)
- [Voice and sound with SSML](https://learn.microsoft.com/azure/ai-services/speech-service/speech-synthesis-markup-voice)
- [Voice gallery](https://learn.microsoft.com/azure/ai-services/speech-service/language-support?tabs=tts)

## Speech Markdown formatter coverage

The `microsoft-azure` formatter supports Azure Text-to-Speech features including automatic MSTTS namespace injection and neural voice styles.

### SSML Element Support Matrix

The following table shows which Azure SSML elements are supported by Speech Markdown:

| SSML Element                      | Status           | Speech Markdown Syntax                                                                                                        | Notes                                                                      |
| --------------------------------- | ---------------- | ----------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| **Core W3C SSML**                 |
| `<speak>`                         | ✅ Full          | Automatic                                                                                                                     | Root element with automatic `xmlns:mstts` injection when needed            |
| `<voice>`                         | ✅ Full          | `(text)[voice:"name"]` or `#[voice:"name"]`                                                                                   | Voice selection and switching                                              |
| `<lang>`                          | ✅ Full          | `(text)[lang:"locale"]` or `#[lang:"locale"]`                                                                                 | Language/accent switching                                                  |
| `<p>`                             | ✅ Full          | Automatic (optional)                                                                                                          | Paragraph tags via `includeParagraphTag` option                            |
| `<s>`                             | ❌ Not supported | N/A                                                                                                                           | Sentence tags not implemented                                              |
| `<break>`                         | ✅ Full          | `[break:"time"]` or `[break:"strength"]`                                                                                      | Pauses with time or strength                                               |
| `<prosody>`                       | ✅ Full          | `(text)[rate:"value"]`, `[pitch:"value"]`, `[volume:"value"]`                                                                 | Rate, pitch, volume control                                                |
| `<say-as>`                        | ✅ Partial       | `(text)[address]`, `[number]`, `[ordinal]`, `[telephone]`, `[fraction]`, `[date:"format"]`, `[time:"format"]`, `[characters]` | Interpret-as types supported                                               |
| `<phoneme>`                       | ✅ Full          | `(text)[ipa:"pronunciation"]`                                                                                                 | IPA pronunciation                                                          |
| `<sub>`                           | ✅ Full          | `(text)[sub:"alias"]`                                                                                                         | Text substitution                                                          |
| `<emphasis>`                      | ✅ Full          | `++text++` (moderate), `+text+` (strong), `--text--` (reduced), `-text-` (none)                                               | Word-level stress with 4 levels                                            |
| `<audio>`                         | ✅ Full          | `!audio("url")`                                                                                                               | Audio file playback                                                        |
| `<bookmark>`                      | ✅ Full          | `[mark:"name"]`                                                                                                               | Bookmark markers (generates `<bookmark mark="..."/>` for Azure SDK events) |
| `<lexicon>`                       | ❌ Not supported | N/A                                                                                                                           | Not implemented (but supported by Azure TTS API)                           |
| `<math>`                          | ❌ Not supported | N/A                                                                                                                           | Not implemented                                                            |
| **Azure MSTTS Extensions**        |
| `<mstts:express-as>`              | ✅ Full          | `(text)[style]` or `(text)[style:"degree"]`                                                                                   | 33 styles with intensity control (0.01-2.0)                                |
| `<mstts:express-as role="">`      | ✅ Full          | `(text)[style:"name";role:"value"]` or `(text)[excited:"1.5";role:"Girl"]`                                                    | Combine style with role attribute using semicolon delimiter                |
| `<mstts:silence>`                 | ❌ Not supported | N/A                                                                                                                           | Use `[break:"time"]` instead                                               |
| `<mstts:dialog>` / `<mstts:turn>` | ❌ Not supported | N/A                                                                                                                           | Multi-speaker dialog requires grammar extension                            |
| `<mstts:backgroundaudio>`         | ❌ Not supported | N/A                                                                                                                           | Use raw SSML passthrough                                                   |
| `<mstts:viseme>`                  | ❌ Not supported | N/A                                                                                                                           | Use raw SSML passthrough                                                   |
| `<mstts:audioduration>`           | ❌ Not supported | N/A                                                                                                                           | Use raw SSML passthrough                                                   |
| `<mstts:ttsembedding>`            | ❌ Not supported | N/A                                                                                                                           | Use raw SSML passthrough                                                   |
| `<mstts:voiceconversion>`         | ❌ Not supported | N/A                                                                                                                           | Use raw SSML passthrough                                                   |

### Core SSML Features

- **Say-as conversions:** `address`, `fraction`, `ordinal`, `telephone`, `number`, `characters` map to `<say-as>` with automatic `cardinal` or `digits` selection for numeric text
- **Dates and times:** Default formats are `ymd` for dates and `hms12` for times
- **Pronunciation:** `sub` and `ipa` modifiers generate `<sub alias="...">` and `<phoneme alphabet="ipa" ph="...">` tags
- **Prosody:** Rate, pitch, and volume modifiers control `<prosody>` attributes
- **Voice selection:** `voice` modifier generates `<voice name="...">` tags for switching between Azure neural voices
- **Audio playback:** `!audio("url")` generates `<audio src="url">` tags

### Azure MSTTS Extensions

#### Automatic Namespace Injection

The formatter automatically detects when Azure-specific MSTTS tags are present in the generated SSML and injects the required `xmlns:mstts="https://www.w3.org/2001/mstts"` namespace declaration into the `<speak>` tag. This ensures valid SSML without manual intervention.

#### Express-As Styles

Azure neural voices support 33 emotional and scenario-specific speaking styles through the `mstts:express-as` element.

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
- `(text)[narration-relaxed]` - Soothing, melodious narration style (section-level only)
- `(text)[newscast-casual]` - Casual news style (section-level only)
- `(text)[newscast-formal]` - Formal, confident, authoritative news style (section-level only)
- `(text)[documentary-narration]` - Relaxed, interested documentary style (section-level only)
- `(text)[advertisement_upbeat]` - Excited, high-energy advertising style
- `(text)[sports_commentary]` - Relaxed, interested sports broadcasting style
- `(text)[sports_commentary_excited]` - Intensive, energetic sports broadcasting style

**Style Degree:**

Control style intensity with numeric values between 0.01 and 2.0 (default 1.0):

```markdown
(This is slightly excited)[excited:"0.5"]
(This is very excited)[excited:"1.8"]
```

**Role Attribute:**

Combine style with character voice roles using semicolon-delimited syntax:

```markdown
(Hello there!)[excited;role:"Girl"]
(Hello there!)[excited:"1.5";role:"Girl"]
(Bonjour!)[style:"friendly";role:"YoungAdultFemale"]
```

Supported roles: `Girl`, `Boy`, `YoungAdultFemale`, `YoungAdultMale`, `OlderAdultFemale`, `OlderAdultMale`, `SeniorFemale`, `SeniorMale`

Note: Role support varies by voice. Check the [Azure voice gallery](https://learn.microsoft.com/azure/ai-services/speech-service/language-support?tabs=tts) for availability.

**Section-Level Styles:**

Apply styles to entire sections:

```markdown
#[excited]
This entire section is excited!
Multiple sentences work too.
```

### Language Switching

Switch languages or accents using the `lang` modifier:

```markdown
In Paris, they pronounce it (Paris)[lang:"fr-FR"]. #[voice:"Brian"][lang:"en-GB"]
This section uses Brian's voice with a British accent. #[voice][lang]
```

### Unsupported Features

The following Azure SSML features are not supported by Speech Markdown. Use raw SSML passthrough for these features.

#### Multi-Speaker Dialog

Azure multi-talker voices (e.g., `en-US-MultiTalker-Ava-Andrew:DragonHDLatestNeural`) support `mstts:dialog` and `mstts:turn` elements for conversational exchanges. Requires grammar extension.

Example:

```xml
<speak xmlns:mstts='https://www.w3.org/2001/mstts'>
  <voice name='en-US-MultiTalker-Ava-Andrew:DragonHDLatestNeural'>
    <mstts:dialog>
      <mstts:turn speaker="ava">Hello, Andrew!</mstts:turn>
      <mstts:turn speaker="andrew">Hey Ava!</mstts:turn>
    </mstts:dialog>
  </voice>
</speak>
```

#### Advanced MSTTS Features

Not implemented. Use raw SSML passthrough:

- `<mstts:silence>` - Precise silence control (use `[break:"time"]` as alternative)
- `<mstts:backgroundaudio>` - Background audio with fade in/out
- `<mstts:viseme>` - Viseme output for lip-sync
- `<mstts:audioduration>` - Audio duration control
- `<mstts:ttsembedding>` - Custom voice embedding
- `<mstts:voiceconversion>` - Voice conversion

#### Other W3C SSML Elements

Not implemented. Use raw SSML passthrough:

- `<lexicon>` - Custom pronunciation lexicons (use `[ipa:"pronunciation"]` for individual words)
- `<math>` - MathML content
- `<s>` - Sentence boundaries (use punctuation)

#### Disabled Say-As Types

The following `say-as` types are disabled because Azure does not support them:

- `expletive` - Bleep out profanity
- `interjection` - Interjection pronunciation
- `unit` - Unit pronunciation

## Platform Comparison

### Azure vs Amazon Alexa

**Azure:**

- 33 express-as styles vs Alexa's 2 emotions (excited, disappointed)
- Numeric style intensity (0.01-2.0) vs Alexa's 3 levels (low, medium, high)
- 8 role attributes for character voices
- Multi-speaker dialog support (mstts:dialog)
- Automatic namespace injection

**Alexa:**

- `amazon:effect` for whisper
- `amazon:domain` for music and news long-form content
- `amazon:auto-breaths` and `amazon:breath` for natural pauses
- Speechcons and interjections

**Both:**

- Standard SSML (say-as, prosody, phoneme, sub, break)
- Voice selection and language switching
- Newscaster/news style

### Azure vs Google Assistant

**Azure:**

- 33 express-as styles vs Google's 0 emotional styles
- 8 role attributes for character voices
- Multi-speaker dialog support
- Automatic namespace injection

**Google:**

- Simpler SSML dialect
- Better cross-platform compatibility

**Both:**

- Standard SSML (say-as, prosody, phoneme, sub, break)
- Voice selection and language switching

## Voice Catalogue

Run `npm run docs:update-voices` with `AZURE_SPEECH_KEY`/`AZURE_SPEECH_REGION` or `MICROSOFT_TOKEN`/`MICROSOFT_REGION` environment variables to generate `data/azure-voices.md`. This file lists voice names, locales, genders, types, styles, and sample rates from the Speech Service REST API.
