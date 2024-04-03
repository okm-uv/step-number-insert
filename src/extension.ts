import * as vscode from "vscode";
import { insert, customInsert } from "./insert";

export function activate(context: vscode.ExtensionContext) {
  const simple0 = vscode.commands.registerCommand("number.simple-insert-0", () => insert(0));
  const simple1 = vscode.commands.registerCommand("number.simple-insert-1", () => insert(1));
  const custom = vscode.commands.registerCommand("number.custom-insert", customInsert);

  context.subscriptions.push(simple0);
  context.subscriptions.push(simple1);
  context.subscriptions.push(custom);
}

// This method is called when your extension is deactivated
export function deactivate() {}
