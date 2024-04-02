import { inspect } from "util";
import * as vscode from "vscode";

/*
copied from  rust-lang / rust-analyzer 
https://github.com/rust-lang/rust-analyzer/blob/master/editors/code/src/util.ts

LICENSE-MIT
https://github.com/rust-lang/rust-analyzer/blob/master/LICENSE-MIT
*/

export const log = new (class {
  private enabled = true;
  private readonly output = vscode.window.createOutputChannel("number");

  setEnabled(yes: boolean): void {
    log.enabled = yes;
  }

  // Hint: the type [T, ...T[]] means a non-empty array
  debug(...msg: [unknown, ...unknown[]]): void {
    if (!log.enabled) {
      return;
    }
    log.write("DEBUG", ...msg);
  }

  info(...msg: [unknown, ...unknown[]]): void {
    log.write("INFO", ...msg);
  }

  warn(...msg: [unknown, ...unknown[]]): void {
    log.write("WARN", ...msg);
  }

  error(...msg: [unknown, ...unknown[]]): void {
    const out = log.write("ERROR", ...msg);
    vscode.window.showErrorMessage(out);
  }

  private write(label: string, ...messageParts: unknown[]): string {
    const message = messageParts.map(log.stringify).join(" ");
    const dateTime = new Date().toLocaleString();
    const out = `${label} [${dateTime}]: ${message}`;
    log.output.appendLine(out);
    return out;
  }

  private stringify(val: unknown): string {
    if (typeof val === "string") {
      return val;
    }
    return inspect(val, {
      colors: false,
      depth: 6, // heuristic
    });
  }
})();
