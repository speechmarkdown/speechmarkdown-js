import  * as factory from './formatters/FormatterFactory';
import { Parser } from './Interfaces';
import { SpeechMarkdownParser } from "./SpeechMarkdownParser";
import { SpeechOptions } from "./SpeechOptions";

export class SpeechMarkdown {

  private parser: Parser;

  private readonly defaults: SpeechOptions = {
    includeFormatterComment: false,
    includeParagraphTag: false,
    includeSpeakTag: true,
    platform: '', // default - text formatter
    preserveEmptyLines: true,
  };

  constructor(private options?: SpeechOptions) {
      this.options = {
        ... this.defaults,
        ... options
      };
  }

  get Parser(): Parser {
    if (!this.parser) {
      this.parser = new SpeechMarkdownParser();
    }

    return this.parser;
  }

  public toString(speechmarkdown: string, options?: SpeechOptions): string {
    const methodOptions = {
      ... this.options,
      ... options
    };

    const ast = this.Parser.parse(speechmarkdown);
    const formatter = factory.createTextFormatter(methodOptions);

    return formatter.format(ast);
  }

  public toSSML(speechmarkdown: string, options?: SpeechOptions): string {
    const methodOptions = {
      ... this.options,
      ... options
    };

    const ast = this.Parser.parse(speechmarkdown);
    // console.log(`AST: ${ast}`);
    const formatter = factory.createFormatter(methodOptions);

    return formatter.format(ast);
  }

  public toAST(speechmarkdown: string): any {
    return this.Parser.parse(speechmarkdown);
  }
}




