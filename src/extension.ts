import * as vscode from "vscode";
import { log } from "./logger";

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "number.simple-insert",
    () => {
      let textEditor = vscode.window.activeTextEditor;
      if (!textEditor) {
        return; // No open text editor
      }

      const selections = textEditor.selections;
      const start = 1;
      const step = 1;

      log.info(`start: ${start}, step: ${step}`);

      textEditor.edit(function (builder) {
        for (var i = 0; i < selections.length; i++) {
          builder.replace(selections[i], `${start + i * step}`);
        }
      });
    }
  );

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
