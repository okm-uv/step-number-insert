import { log } from "./logger";
import * as vscode from "vscode";

export const insert = (start: number = 1, step: number = 1, digit: number = 1) => {
  let textEditor = vscode.window.activeTextEditor;
  if (!textEditor) {
    return; // No open text editor
  }

  const selections = textEditor.selections;

  log.info(`start: ${start}, step: ${step}, digit: ${digit}`);

  textEditor.edit(function (builder) {
    for (var i = 0; i < selections.length; i++) {
      builder.replace(selections[i], `${start + i * step}`.padStart(digit, "0"));
    }
  });
};

export const customInsert = async () => {
  const input =
    (await vscode.window.showInputBox({
      placeHolder: "start : step : digit",
      prompt: "Input format or format:start:step",
    })) ?? "1:1";
  log.info(`input: ${input}`);

  const splitted = input.split(":");
  const start = parseInt(splitted[0]) || 1;
  const step = parseInt(splitted[1]) || 1;
  const digit = parseInt(splitted[2]) || 1;
  insert(start, step, digit);
};
