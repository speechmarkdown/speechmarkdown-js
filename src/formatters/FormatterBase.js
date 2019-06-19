"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FormatterBase {
    constructor(options) {
        this.options = options;
        this.options = options;
    }
    // Adds each element of the array as markdown
    addArray(ast, lines) {
        for (const child of ast) {
            this.formatFromAst(child, lines);
        }
        return lines;
    }
    processAst(ast, lines) {
        if (ast instanceof Array) {
            this.addArray(ast, lines);
        }
        else {
            this.formatFromAst(ast, lines);
        }
    }
}
exports.FormatterBase = FormatterBase;
//# sourceMappingURL=FormatterBase.js.map