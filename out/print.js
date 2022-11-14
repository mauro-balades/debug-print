"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DebugPrint = void 0;
class DebugPrint {
    constructor(language, selection, editor) {
        this.editor = editor;
        this.language = language;
        this.selection = selection;
        const document = editor.document;
        let wordUnderCursor = '';
        const rangeUnderCursor = document.getWordRangeAtPosition(selection.active);
        if (rangeUnderCursor) {
            wordUnderCursor = document.getText(rangeUnderCursor);
        }
        this.variable = document.getText(selection) || wordUnderCursor;
    }
    run() {
        let fn = Object.getPrototypeOf(this)[this.language];
        if (fn === undefined) {
            return null;
        }
        return fn.bind(this)();
    }
    _fill_template() {
        const document = this.editor.document;
        const fileName = document.fileName.includes('/')
            ? document.fileName.split('/')[document.fileName.split('/').length - 1]
            : document.fileName.split('\\')[document.fileName.split('\\').length - 1];
        return `🐞 ~ ${this.variable} ~ file: ${fileName}:${this.selection.start.line + 1} = `;
    }
    javascript() { return this.typescript(); }
    ;
    typescript() {
        return `console.log("${this._fill_template()}", ${this.variable});`;
    }
    python() {
        return `print("${this._fill_template()}", ${this.variable});`;
    }
}
exports.DebugPrint = DebugPrint;
//# sourceMappingURL=print.js.map