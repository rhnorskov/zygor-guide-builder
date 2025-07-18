import { Action } from "./base";

export function ding(level: number): Action {
  return new Action(`|ding ${level.toString()}`);
}
