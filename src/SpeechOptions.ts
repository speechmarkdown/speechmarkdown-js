export interface SpeechOptions {
  platform?: string;
  includeFormatterComment?: boolean;
  includeParagraphTag?: boolean;
  includeSpeakTag?: boolean;
  preserveEmptyLines?: boolean;
  escapeXmlSymbols?: boolean;
  voices?: object; // voiceName -> {tag -> {attribute -> value}}
}
