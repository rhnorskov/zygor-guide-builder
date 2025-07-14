import type { Primitive } from "type-fest";

export type Action = {
  type: string;
  command: string | null;
  value: Primitive;
};

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

export type SubStep = Action | [Action, ...Action[]];

export type Step = {
  label?: string;
  subSteps: SubStep[];
};

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

export type GuideMeta = {
  title: string;
};

export function isGuideMeta(meta: unknown): meta is GuideMeta {
  return Boolean(meta); // TODO: Add proper validation logic
}

export type GuideContent = Step[];

export function isGuideContent(content: unknown): content is GuideContent {
  return Boolean(content); // TODO: Add proper validation logic
}
