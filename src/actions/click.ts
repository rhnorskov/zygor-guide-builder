import { Action } from "./base";

export function click(name: string): Action {
  return new Action(`|click ${name}`);
}
