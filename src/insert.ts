import { log } from "./logger";
import * as vscode from "vscode";

export const insert = (start: number, step: number) => {
  let textEditor = vscode.window.activeTextEditor;
  if (!textEditor) {
    return; // No open text editor
  }

  const selections = textEditor.selections;

  log.info(`start: ${start}, step: ${step}`);

  textEditor.edit(function (builder) {
    for (var i = 0; i < selections.length; i++) {
      builder.replace(selections[i], `${start + i * step}`);
    }
  });
};

export const customInsert = async () => {
  const ret = await vscode.window.showInputBox({
    placeHolder: "start",
    prompt: "Input format or format:start:step",
  });
  const start = parseInt(ret ?? "1") || 1;
  log.info(`start is ${start}`);
  insert(start, 1);
};
