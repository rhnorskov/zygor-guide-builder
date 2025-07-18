import { Action } from "./base";

export function tip(message: string): Action {
  return new Action(`|tip ${message}`);
}
