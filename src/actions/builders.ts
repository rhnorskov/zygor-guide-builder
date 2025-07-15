import type { Action } from "./schema.ts";

export function text(message: string): Action {
  return {
    type: "text",
    command: null,
    value: message,
  };
}

export function ding(level: number): Action {
  return {
    type: "ding",
    command: "|ding",
    value: level,
  };
}

export function tip(message: string): Action {
  return {
    type: "tip",
    command: "|tip",
    value: message,
  };
}
