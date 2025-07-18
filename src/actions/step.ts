import { Action } from "./base.ts";

export type Step = Action[];
export type SubStep = Action | [Action, Action, ...Action[]];

export function step(
  label: string,
  subStep: SubStep,
  ...subSteps: SubStep[]
): Step;
export function step(subStep: SubStep, ...subSteps: SubStep[]): Step;
export function step(arg: string | SubStep, ...subSteps: SubStep[]): Step {
  const label = typeof arg === "string" ? arg : undefined;
  const steps = typeof arg === "string" ? subSteps : [arg, ...subSteps];

  const result = [new Action("step")];

  if (label) {
    result.push(new Action(`label "${label}"`));
  }

  result.push(
    ...steps.map((subStep) => {
      if (Array.isArray(subStep)) {
        return new Action(subStep.join(" "));
      } else {
        return subStep;
      }
    })
  );

  return result;
}
