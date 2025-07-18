import { type Step } from "./actions/step.ts";

export type GuideMeta = {
  title: string;
  description: string;
  category: "Leveling" | "Profession";
};

export type GuideContent = Step[];

export function build(steps: Step[]): string {
  return steps.map((s) => s.join("\n")).join("\n\n");
}
