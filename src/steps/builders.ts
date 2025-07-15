import type { Step, SubStep } from "./schema.ts";

export function step(
  label: string,
  subStep: SubStep,
  ...subSteps: SubStep[]
): Step;
export function step(subStep: SubStep, ...subSteps: SubStep[]): Step;
export function step(arg: string | SubStep, ...subSteps: SubStep[]): Step {
  return {
    label: typeof arg === "string" ? arg : undefined,
    subSteps: typeof arg === "string" ? subSteps : [arg, ...subSteps],
  };
}
