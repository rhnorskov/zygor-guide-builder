import { Action } from "./base";

export function text(message: string): Action {
  return new Action(message);
}
