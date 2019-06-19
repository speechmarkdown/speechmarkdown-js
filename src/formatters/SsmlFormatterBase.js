"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FormatterBase_1 = require("./FormatterBase");
class SsmlFormatterBase extends FormatterBase_1.FormatterBase {
    constructor(options) {
        // this.options = options;
        super(options);
        this.options = options;
    }
    format(ast) {
        const lines = this.formatFromAst(ast, []);
        // tslint:disable-next-line: no-unnecessary-local-variable
        const ssml = lines.join('');
        return ssml;
    }
    // Adds tagged content
    addTag(tag, ast, newLine, newLineAfterEnd, attr, lines) {
        lines.push(this.startTag(tag, attr, newLine));
        this.processAst(ast, lines);
        lines.push(this.endTag(tag, newLine));
        if (newLineAfterEnd) {
            lines.push('\n');
        }
        return lines;
    }
    addBreak(ast, lines) {
        const child = ast.children[0];
        if (child.name === 'time') {
            lines.push(this.voidTag('break', { time: child.allText }));
        }
        else if (child.name === 'strength') {
            lines.push(this.voidTag('break', { strength: child.allText }));
        }
        return lines;
    }
    addComment(commentText, lines) {
        lines.push(`<!-- ${commentText} -->\n`);
        return lines;
    }
    // Returns the SSML for a start tag
    startTag(tag, attr, newLine = false) {
        let attrStr = '';
        if (attr) {
            attrStr = ' ' + Object.keys(attr).map((k) => {
                return k + '="' + attr[k] + '"';
            }).join(' ');
        }
        return '<' + tag + attrStr + '>' + (newLine ? '\n' : '');
    }
    // Returns the SSML for an end tag
    endTag(tag, newLine = false) {
        return (newLine ? '\n' : '') + '</' + tag + '>';
        // return '</' + tag + '>';
    }
    voidTag(tag, attr) {
        let attrStr = '';
        if (attr) {
            attrStr = ' ' + Object.keys(attr).map((k) => {
                return k + '="' + attr[k] + '"';
            }).join(' ');
        }
        return '<' + tag + attrStr + '/>';
    }
}
exports.SsmlFormatterBase = SsmlFormatterBase;
//# sourceMappingURL=SsmlFormatterBase.js.map