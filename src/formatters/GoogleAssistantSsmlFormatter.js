"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SsmlFormatterBase_1 = require("./SsmlFormatterBase");
class GoogleAssistantSsmlFormatter extends SsmlFormatterBase_1.SsmlFormatterBase {
    constructor(options) {
        super(options);
        this.options = options;
    }
    formatFromAst(ast, lines = []) {
        switch (ast.name) {
            case 'document': {
                if (this.options.includeFormatterComment) {
                    this.addComment('Speech Markdown for Google Assistant', lines);
                }
                if (this.options.includeSpeakTag) {
                    return this.addTag('speak', ast.children, true, false, null, lines);
                }
                else {
                    this.processAst(ast.children, lines);
                    return lines;
                }
            }
            case 'paragraph': {
                if (this.options.includeParagraphTag) {
                    return this.addTag('p', ast.children, true, true, null, lines);
                }
                else {
                    this.processAst(ast.children, lines);
                    return lines;
                }
            }
            case 'shortBreak': {
                return this.addBreak(ast, lines);
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
exports.GoogleAssistantSsmlFormatter = GoogleAssistantSsmlFormatter;
//# sourceMappingURL=GoogleAssistantSsmlFormatter.js.map