"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const myna_parser_1 = require("myna-parser");
const SpeechMarkdownGrammar_1 = require("./SpeechMarkdownGrammar");
class SpeechMarkdownParser {
    constructor() {
        this.myna = myna_parser_1.Myna;
        SpeechMarkdownGrammar_1.SpeechMarkdownGrammar(this.myna);
        this.parser = this.myna.parsers.speechmarkdown;
    }
    parse(speechmarkdown) {
        // tslint:disable-next-line: no-unnecessary-local-variable
        const ast = this.parser(speechmarkdown);
        return ast;
    }
}
exports.SpeechMarkdownParser = SpeechMarkdownParser;
//# sourceMappingURL=SpeechMarkdownParser.js.map