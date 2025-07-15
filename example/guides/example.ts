import {
  step,
  text,
  tip,
  type GuideContent,
  type GuideMeta,
} from "zygor-guide-builder";

export const meta: GuideMeta = {
  title: "Example Guide",
  description: "This is an example guide to demonstrate the structure.",
  category: "Leveling",
};

export const content: GuideContent = [
  step("Welcome_Step", [
    text("Welcome to the guide!"),
    tip("Press 'Next' to continue."),
  ]),
  step(
    text("This is an introduction to the guide."),
    tip("Make sure to read everything carefully.")
  ),
];
