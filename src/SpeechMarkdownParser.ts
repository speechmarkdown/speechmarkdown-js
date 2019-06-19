import { Myna } from 'myna-parser';
import { Parser } from './Interfaces';
import { SpeechMarkdownGrammar } from './SpeechMarkdownGrammar';

export class SpeechMarkdownParser implements Parser {
  private parser: any;
  private myna: any;

  constructor() {
    this.myna = Myna;
    SpeechMarkdownGrammar(this.myna);
    this.parser = this.myna.parsers.speechmarkdown;
  }

  public parse(speechmarkdown: string): any {
// tslint:disable-next-line: no-unnecessary-local-variable
    const ast = this.parser(speechmarkdown);
    return ast;
  }
}
