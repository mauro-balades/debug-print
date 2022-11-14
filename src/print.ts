import * as vscode from 'vscode';


export class DebugPrint {

    private readonly language!: string;
    private readonly selection!: vscode.Selection;
    private readonly editor!: vscode.TextEditor;

    private variable!: string;


    public constructor(language: string, selection: vscode.Selection, editor: vscode.TextEditor) {
        this.editor = editor;
        this.language = language;
        this.selection = selection;

        const document: vscode.TextDocument = editor.document;

        let wordUnderCursor = '';

        const rangeUnderCursor: vscode.Range | undefined = document.getWordRangeAtPosition(selection.active);
        if (rangeUnderCursor) {
          wordUnderCursor = document.getText(rangeUnderCursor);
        }

        this.variable = document.getText(selection) || wordUnderCursor;
    }

    public run(): string | null {
        let fn = Object.getPrototypeOf(this)[this.language];
        if (fn === undefined) {
            return null;
        }

        return fn.bind(this)();
    }

    private _fill_template(): string {
        const document: vscode.TextDocument = this.editor.document;

        const fileName = document.fileName.includes('/')
            ? document.fileName.split('/')[document.fileName.split('/').length - 1]
            : document.fileName.split('\\')[document.fileName.split('\\').length - 1];

        return `🐞 ~ ${this.variable} ~ file: ${fileName}:${this.selection.start.line+1} = `
    }

    private javascript(): string {return this.typescript()};
    private typescript(): string {
        return `console.log("${this._fill_template()}", ${this.variable});`;
    }

    private python(): string {
        return `print("${this._fill_template()}", ${this.variable});`;
    }
}
