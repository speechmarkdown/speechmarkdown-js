export interface Parser {
  parse(markdown:string): any;
}

export interface Formatter {
  format(syntaxTree:any): string;
}
