import { Myna } from 'myna-parser';
import { Parser } from './Interfaces';
import { speechMarkdownGrammar } from './SpeechMarkdownGrammar';

export class SpeechMarkdownParser implements Parser {
  private parser: any;
  private myna: any;

  constructor() {
    this.myna = Myna;
    speechMarkdownGrammar(this.myna);
    this.parser = this.myna.parsers.speechmarkdown;
  }

  public parse(speechmarkdown: string): any {
    // tslint:disable-next-line: no-unnecessary-local-variable
    return this.parser(speechmarkdown);
  }
}
