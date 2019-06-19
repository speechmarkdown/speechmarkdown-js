"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const factory = require("./formatters/FormatterFactory");
const SpeechMarkdownParser_1 = require("./SpeechMarkdownParser");
class SpeechMarkdown {
    constructor(options) {
        this.options = options;
        this.defaults = {
            includeFormatterComment: false,
            includeParagraphTag: false,
            includeSpeakTag: true,
            platform: '',
            preserveEmptyLines: true,
        };
        this.options = Object.assign({}, this.defaults, options);
    }
    get Parser() {
        if (!this.parser) {
            this.parser = new SpeechMarkdownParser_1.SpeechMarkdownParser();
        }
        return this.parser;
    }
    toString(speechmarkdown, options) {
        const methodOptions = Object.assign({}, this.options, options);
        const ast = this.Parser.parse(speechmarkdown);
        const formatter = factory.createTextFormatter(methodOptions);
        return formatter.format(ast);
    }
    toSSML(speechmarkdown, options) {
        const methodOptions = Object.assign({}, this.options, options);
        const ast = this.Parser.parse(speechmarkdown);
        // console.log(`AST: ${ast}`);
        const formatter = factory.createFormatter(methodOptions);
        return formatter.format(ast);
    }
    toAST(speechmarkdown) {
        return this.Parser.parse(speechmarkdown);
    }
}
exports.SpeechMarkdown = SpeechMarkdown;
//# sourceMappingURL=SpeechMarkdown.js.map