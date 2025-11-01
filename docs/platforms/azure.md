# Microsoft Azure Speech Service SSML

## Official resources

- [SSML structure reference](https://learn.microsoft.com/azure/ai-services/speech-service/speech-synthesis-markup-structure)
- [Voice and sound with SSML](https://learn.microsoft.com/azure/ai-services/speech-service/speech-synthesis-markup-voice)
- [Voice gallery](https://learn.microsoft.com/azure/ai-services/speech-service/language-support?tabs=tts)

## Speech Markdown formatter coverage

Speech Markdown's `microsoft-azure` formatter provides comprehensive support for Azure's Text-to-Speech features, including automatic MSTTS namespace injection and extensive neural voice style support.

### SSML Element Support Matrix

The following table shows which Azure SSML elements are supported by Speech Markdown:

| SSML Element | Status | Speech Markdown Syntax | Notes |
|--------------|--------|------------------------|-------|
| **Core W3C SSML** |
| `<speak>` | ✅ Full | Automatic | Root element with automatic `xmlns:mstts` injection when needed |
| `<voice>` | ✅ Full | `(text)[voice:"name"]` or `#[voice:"name"]` | Voice selection and switching |
| `<lang>` | ✅ Full | `(text)[lang:"locale"]` or `#[lang:"locale"]` | Language/accent switching |
| `<p>` | ✅ Full | Automatic (optional) | Paragraph tags via `includeParagraphTag` option |
| `<s>` | ❌ Not supported | N/A | Sentence tags not implemented |
| `<break>` | ✅ Full | `[break:"time"]` or `[break:"strength"]` | Pauses with time or strength |
| `<prosody>` | ✅ Full | `(text)[rate:"value"]`, `[pitch:"value"]`, `[volume:"value"]` | Rate, pitch, volume control |
| `<say-as>` | ✅ Partial | `(text)[address]`, `[number]`, `[ordinal]`, `[telephone]`, `[fraction]`, `[date:"format"]`, `[time:"format"]`, `[characters]` | Interpret-as types supported |
| `<phoneme>` | ✅ Full | `(text)[ipa:"pronunciation"]` | IPA pronunciation |
| `<sub>` | ✅ Full | `(text)[sub:"alias"]` | Text substitution |
| `<emphasis>` | ✅ Full | `++text++` (moderate), `+text+` (strong), `--text--` (reduced), `-text-` (none) | Word-level stress with 4 levels |
| `<audio>` | ✅ Full | `!audio("url")` | Audio file playback |
| `<bookmark>` | ✅ Full | `[mark:"name"]` | Bookmark markers (generates `<bookmark mark="..."/>` for Azure SDK events) |
| `<lexicon>` | ❌ Not supported | N/A | Not implemented (but supported by Azure TTS API) |
| `<math>` | ❌ Not supported | N/A | Not implemented |
| **Azure MSTTS Extensions** |
| `<mstts:express-as>` | ✅ Full | `(text)[style]` or `(text)[style:"degree"]` | 33 styles with intensity control (0.01-2.0) |
| `<mstts:express-as role="">` | ✅ Full | `(text)[style:"name";role:"value"]` or `(text)[excited:"1.5";role:"Girl"]` | Combine style with role attribute using semicolon delimiter |
| `<mstts:silence>` | ❌ Not supported | N/A | Use `[break:"time"]` instead |
| `<mstts:dialog>` / `<mstts:turn>` | ❌ Not supported | N/A | Multi-speaker dialog requires grammar extension |
| `<mstts:backgroundaudio>` | ❌ Not supported | N/A | Use raw SSML passthrough |
| `<mstts:viseme>` | ❌ Not supported | N/A | Use raw SSML passthrough |
| `<mstts:audioduration>` | ❌ Not supported | N/A | Use raw SSML passthrough |
| `<mstts:ttsembedding>` | ❌ Not supported | N/A | Use raw SSML passthrough |
| `<mstts:voiceconversion>` | ❌ Not supported | N/A | Use raw SSML passthrough |

### Core SSML Features

- **Say-as conversions.** Speech Markdown forwards modifiers such as `address`, `fraction`, `ordinal`, `telephone`, `number`, and `characters` to `<say-as>` while automatically choosing `cardinal` or `digits` for numeric text.
- **Dates and times.** The formatter emits `<say-as interpret-as="date">` and `<say-as interpret-as="time">` with Azure's default `ymd` and `hms12` formats when no explicit format is supplied.
- **Pronunciation helpers.** `sub` and `ipa` modifiers become `<sub alias="…">` and `<phoneme alphabet="ipa" ph="…">`, letting authors control pronunciation directly from Speech Markdown.
- **Prosody and whispering.** Rate, pitch, and volume modifiers augment `<prosody>` tags, and the `whisper` modifier approximates whispered delivery with `volume="x-soft"` and `rate="slow"` settings as recommended by Microsoft.
- **Voice selection.** Inline `voice` modifiers add `<voice name="…">` tags for switching between Azure neural voices.
- **Audio playback.** The `!audio("url")` syntax generates `<audio src="url">` tags for playing audio files.

### Azure MSTTS Extensions

#### Automatic Namespace Injection

The formatter automatically detects when Azure-specific MSTTS tags are present in the generated SSML and injects the required `xmlns:mstts="https://www.w3.org/2001/mstts"` namespace declaration into the `<speak>` tag. This ensures valid SSML without manual intervention.

#### Express-As Styles (33 styles supported)

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
- `(text)[narration-relaxed]` - Soothing, melodious narration style (section-level only)
- `(text)[newscast-casual]` - Casual news style (section-level only)
- `(text)[newscast-formal]` - Formal, confident, authoritative news style (section-level only)
- `(text)[documentary-narration]` - Relaxed, interested documentary style (section-level only)
- `(text)[advertisement_upbeat]` - Excited, high-energy advertising style
- `(text)[sports_commentary]` - Relaxed, interested sports broadcasting style
- `(text)[sports_commentary_excited]` - Intensive, energetic sports broadcasting style

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

**Role Attribute (Character Voices):**

Azure supports the `role` attribute on `mstts:express-as` to adjust the voice to sound like different characters. You can combine style with role using semicolon-delimited syntax:

```markdown
(Hello there!)[excited;role:"Girl"]
(Hello there!)[excited:"1.5";role:"Girl"]
(Bonjour!)[style:"friendly";role:"YoungAdultFemale"]
```

Generates:
```xml
<speak xmlns:mstts="https://www.w3.org/2001/mstts">
<mstts:express-as style="excited" role="Girl">Hello there!</mstts:express-as>
<mstts:express-as style="excited" styledegree="1.5" role="Girl">Hello there!</mstts:express-as>
<mstts:express-as style="friendly" role="YoungAdultFemale">Bonjour!</mstts:express-as>
</speak>
```

**Supported Role Values:**
- `Girl` - Child girl voice
- `Boy` - Child boy voice
- `YoungAdultFemale` - Young adult female voice
- `YoungAdultMale` - Young adult male voice
- `OlderAdultFemale` - Older adult female voice
- `OlderAdultMale` - Older adult male voice
- `SeniorFemale` - Senior female voice
- `SeniorMale` - Senior male voice

**Note:** Role support varies by voice. Check the [Azure voice gallery](https://learn.microsoft.com/azure/ai-services/speech-service/language-support?tabs=tts) for role availability per voice.

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

### Language Switching

Azure supports switching languages or accents within speech using the `<lang xml:lang="locale">` element. Speech Markdown provides full support through the `lang` modifier:

```markdown
In Paris, they pronounce it (Paris)[lang:"fr-FR"].
```

Generates:
```xml
<speak>
In Paris, they pronounce it <lang xml:lang="fr-FR">Paris</lang>.
</speak>
```

The `lang` modifier can also be used at the section level:

```markdown
#[voice:"Brian"][lang:"en-GB"]
This section uses Brian's voice with a British accent.
#[voice][lang]
```

### Unsupported Features and Workarounds

The following Azure SSML features are not currently supported by Speech Markdown but can be added via raw SSML passthrough:

#### 1. Role Attribute (Not Yet Supported)

Azure supports role-play attributes on `mstts:express-as` to make voices imitate different personas:

- `role="Girl"` - Voice imitates a girl
- `role="Boy"` - Voice imitates a boy
- `role="YoungAdultFemale"` - Voice imitates a young adult female
- `role="YoungAdultMale"` - Voice imitates a young adult male
- `role="OlderAdultFemale"` - Voice imitates an older adult female
- `role="OlderAdultMale"` - Voice imitates an older adult male
- `role="SeniorFemale"` - Voice imitates a senior female
- `role="SeniorMale"` - Voice imitates a senior male

**Why not supported:** Requires Speech Markdown syntax extension to support multiple attributes on the same tag (both `style` and `role`).

**Workaround:** Use raw SSML passthrough.

**Example SSML (manual):**
```xml
<speak xmlns:mstts="https://www.w3.org/2001/mstts">
  <mstts:express-as style="cheerful" role="YoungAdultFemale">
    I'm speaking in a cheerful young adult female voice!
  </mstts:express-as>
</speak>
```

#### 2. Multi-Speaker Dialog (Not Yet Supported)

Azure's multi-talker voices (e.g., `en-US-MultiTalker-Ava-Andrew:DragonHDLatestNeural`) support conversational exchanges using `mstts:dialog` and `mstts:turn` elements.

**Why not supported:** Requires Speech Markdown grammar extension for dialog syntax.

**Workaround:** Use raw SSML passthrough.

**Example SSML (manual):**
```xml
<speak version='1.0' xmlns='http://www.w3.org/2001/10/synthesis'
       xmlns:mstts='https://www.w3.org/2001/mstts' xml:lang='en-US'>
  <voice name='en-US-MultiTalker-Ava-Andrew:DragonHDLatestNeural'>
    <mstts:dialog>
      <mstts:turn speaker="ava">Hello, Andrew! How's your day going?</mstts:turn>
      <mstts:turn speaker="andrew">Hey Ava! It's been great, just exploring some AI advancements.</mstts:turn>
      <mstts:turn speaker="ava">That sounds fascinating! Tell me more.</mstts:turn>
    </mstts:dialog>
  </voice>
</speak>
```

#### 3. Advanced MSTTS Features (Not Implemented)

The following advanced Azure MSTTS features are not implemented in Speech Markdown:

- **`<mstts:silence>`** - Precise silence control
  - **Workaround:** Use `[break:"time"]` for pauses, or raw SSML passthrough
- **`<mstts:backgroundaudio>`** - Background audio with fade in/out
  - **Workaround:** Use raw SSML passthrough
- **`<mstts:viseme>`** - Viseme output for lip-sync
  - **Workaround:** Use raw SSML passthrough
- **`<mstts:audioduration>`** - Audio duration control
  - **Workaround:** Use raw SSML passthrough
- **`<mstts:ttsembedding>`** - Custom voice embedding
  - **Workaround:** Use raw SSML passthrough
- **`<mstts:voiceconversion>`** - Voice conversion
  - **Workaround:** Use raw SSML passthrough

#### 4. Other W3C SSML Elements (Not Implemented)

- **`<lexicon>`** - Custom pronunciation lexicons
  - **Workaround:** Use raw SSML passthrough or `[ipa:"pronunciation"]` for individual words
- **`<math>`** - MathML content
  - **Workaround:** Use raw SSML passthrough
- **`<s>`** - Sentence boundaries
  - **Workaround:** Use punctuation or raw SSML passthrough

#### 6. Disabled Say-As Types

The following `say-as` interpret-as types are explicitly disabled for Azure:

- **`expletive`** - Bleep out profanity
- **`interjection`** - Interjection pronunciation
- **`unit`** - Unit pronunciation

**Why disabled:** These are not part of Azure's SSML specification.

**Workaround:** Use raw SSML passthrough if needed, though Azure may not support these types.

## Feature Comparison with Other Platforms

### Azure vs Amazon Alexa

**Azure Advantages:**
- **33 express-as styles** vs Alexa's 2 emotions (excited, disappointed)
- **Numeric style intensity control** (0.01-2.0) vs Alexa's 3 levels (low, medium, high)
- **Automatic namespace injection** - no manual SSML editing required
- **More emotional variety** - includes fearful, empathetic, hopeful, terrified, gentle, serious, depressed, embarrassed, disgruntled, envious, affectionate
- **Scenario-specific styles** - assistant, chat, customerservice, poetry-reading, narration-professional, narration-relaxed, documentary-narration, advertisement_upbeat, sports_commentary, sports_commentary_excited
- **Multi-speaker dialog support** - mstts:dialog and mstts:turn for conversational exchanges (requires raw SSML)
- **Role-play attributes** - 8 role options for voice persona changes (requires raw SSML)

**Alexa Advantages:**
- `amazon:effect` for whisper (Azure uses prosody approximation)
- `amazon:domain` for music and news long-form content
- `amazon:auto-breaths` and `amazon:breath` for natural pauses
- Speechcons and interjections

**Parity:**
- Both support standard SSML (say-as, prosody, phoneme, sub, break)
- Both support voice selection
- Both support newscaster/news style
- Both support excited and disappointed emotions
- Both support language switching

### Azure vs Google Assistant

**Azure Advantages:**
- **33 express-as styles** vs Google's 0 emotional styles
- **Automatic namespace injection**
- **Rich emotional expression** not available in Google Assistant
- **Scenario-specific styles** for various use cases
- **Multi-speaker dialog support** (requires raw SSML)
- **Role-play attributes** (requires raw SSML)

**Google Advantages:**
- Simpler SSML dialect (fewer platform-specific extensions)
- Better cross-platform compatibility

**Parity:**
- Both support standard SSML (say-as, prosody, phoneme, sub, break)
- Both support voice selection
- Both support language switching

### Summary

Azure's MSTTS extensions provide the **most comprehensive emotional and stylistic control** of any platform supported by Speech Markdown. With 33 express-as styles and numeric intensity control, Azure offers significantly more expressive capabilities than Amazon Alexa (2 emotions) or Google Assistant (0 emotions).

The automatic namespace injection feature makes Azure MSTTS extensions seamless to use - the formatter automatically detects when MSTTS tags are needed and adds the required namespace declaration without manual intervention.

## Voice catalogue

The generated catalogue `data/azure-voices.md` is produced by `npm run docs:update-voices` when either `AZURE_SPEECH_KEY`/`AZURE_SPEECH_REGION` or `MICROSOFT_TOKEN`/`MICROSOFT_REGION` environment variables are supplied. The file lists every voice name, locale, gender, type, style, and sample rate returned by the Speech Service REST API so that formatter validations can remain current.
