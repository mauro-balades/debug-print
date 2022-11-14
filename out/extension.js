"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const print_1 = require("./print");
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
function activate(context) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "debug-print" is now active!');
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('debug-print.add-debug', () => {
        const editor = vscode.window.activeTextEditor;
        console.log(vscode.workspace.getConfiguration().quote);
        if (!editor) {
            return;
        }
        editor.selections.map((selection, i) => {
            let pos = selection;
            let language = editor.document.languageId;
            let dbg = new print_1.DebugPrint(language, selection, editor);
            let output = dbg.run();
            let string = new vscode.SnippetString(`${output}\n`);
            let write_pos = new vscode.Position(pos.end.line + 1, 0 /*TODO: character position*/);
            editor.insertSnippet(string, write_pos);
        });
        // Display a message box to the user
        if (editor.selections.length > 0)
            vscode.window.showInformationMessage(`Added ${editor.selections.length} debug point${editor.selections.length > 0 ? 's' : ''}!`);
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
// This method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map