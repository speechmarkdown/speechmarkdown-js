"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FormatterBase_1 = require("./FormatterBase");
class TextFormatter extends FormatterBase_1.FormatterBase {
    constructor(options) {
        super(options);
        this.options = options;
    }
    format(ast) {
        const lines = this.formatFromAst(ast, []);
        let txt = lines.join('');
        // replace multiple whitespace with a single space
        txt = txt.replace(/  +/g, ' ');
        return txt;
    }
    formatFromAst(ast, lines = []) {
        switch (ast.name) {
            case 'document': {
                this.processAst(ast.children, lines);
                return lines;
            }
            case 'paragraph': {
                this.processAst(ast.children, lines);
                return lines;
            }
            case 'simpleLine': {
                this.processAst(ast.children, lines);
                return lines;
            }
            case 'lineEnd': {
                lines.push(ast.allText);
                return lines;
            }
            case 'emptyLine': {
                if (this.options.preserveEmptyLines) {
                    lines.push(ast.allText);
                }
                return lines;
            }
            case 'plainText': {
                lines.push(ast.allText);
                return lines;
            }
            default: {
                this.processAst(ast.children, lines);
                return lines;
            }
        }
    }
}
exports.TextFormatter = TextFormatter;
//# sourceMappingURL=TextFormatter.js.map