import * as vscode from "vscode";
import { insert, customInsert } from "./insert";

export function activate(context: vscode.ExtensionContext) {
  let simple = vscode.commands.registerCommand("number.simple-insert", () =>
    insert()
  );

  const custom = vscode.commands.registerCommand(
    "number.custom-insert",
    async () => await customInsert()
  );

  context.subscriptions.push(simple);
  context.subscriptions.push(custom);
}

// This method is called when your extension is deactivated
export function deactivate() {}
