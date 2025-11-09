# Change Log

All notable changes to the speechmarkdown-js project will be documented in this file.

## 2.3.0 - (November 9, 2025)

- Google comprehensive test suite and google:style tag support.
- Support for Azure HD voices with dash-to-colon conversion.
- Voice lookup by display name or ID with automatic ID resolution.
- Updated voice data structure with ID, displayName, and languages metadata.
- Support for Azure express-as role attribute with multiple attributes.
- Emphasis and bookmark support for Azure.
- 6 missing Azure MSTTS styles and language support.
- Grammar support for all 27 Azure MSTTS express-as styles.
- Support for 26 additional Azure MSTTS express-as styles.
- Automatic Azure SSML namespace injection for MSTTS tags.

## 2.2.0 - (September 22, 2025)

### Added

- Added bare ipa format (`I say, (pecan)/'pi.kæn/`)
- Added script to update voices from providers
- restore dedicated Microsoft SAPI formatter

## 2.1.0 - (December 22, 2022)

### Added

- Support for audio captions

## 2.0.0 - (October 28, 2021)

### Added

- Support for `voice` and `language` for `google-assistant`
- Formatters for `amazon-polly`, `amazon-polly-neural`, and `microsoft-azure`

## 0.8.0-beta.0 - (July 7, 2019)

### Added

- Support for sections with the `voice` and `lang` tags

## 0.7.0-alpha.0 - (July 6, 2019)

### Added

- Support for `audio` tag

## 0.6.0-alpha.0 - (July 6, 2019)

### Added

- Support for `voice` and `lang` tags

## 0.5.0-alpha.0 - (July 5, 2019)

### Fixed

- Issue #7 - Grammar - multiple modifiers for the same text

### Added

- Grammar and formatters for standard:
  - volume / vol
  - rate
  - pitch
  - sub
  - ipa

## 0.4.0-alpha.0 - (June 30, 2019)

### Added

- Update grammar and formatters for standard:

  - emphasis
  - address
  - characters / chars
  - date (skipped tests)
  - expletive / bleep
  - fraction (skipped tests)
  - interjection
  - number
  - ordinal
  - phone / telephone (skipped tests)
  - time
  - unit
  - whisper

- Add tests to increase coverage

## 0.3.0-alpha.0 - (June 30, 2019)

### Added

- Update grammar and formatters for emphasis short format
- Change speechmarkdown.toString(markdown) to speechmarkdown.toText(markdown)

## 0.2.0-alpha.0 - (June 29, 2019)

### Added

- CHANGELOG.md

### Update

- Links in package.json
