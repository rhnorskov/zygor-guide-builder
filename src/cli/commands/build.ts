import { Glob } from "bun";
import { defineCommand } from "citty";
import { join } from "node:path";
import { isGuideContent, isGuideMeta } from "../../index";
import { isNonNullish } from "../../utils/is-nullish";

Boolean;

export const buildCommand = defineCommand({
  meta: {
    name: "build",
    description: "Build the Zygor Guides",
  },
  args: {
    output: {
      type: "string",
      description: "Output directory for built guides",
      alias: "o",
    },
    verbose: {
      type: "boolean",
      description: "Enable verbose logging",
      alias: "v",
    },
    input: {
      type: "string",
      description: "Input directory containing guide files",
      alias: "i",
      default: "./guides",
    },
    watch: {
      type: "boolean",
      description: "Watch for file changes and rebuild",
      alias: "w",
    },
  },
  async run({ args }) {
    const glob = new Glob("**/*.ts");

    for await (const file of glob.scan(args.input)) {
      const { meta, content } = await import(
        join(process.cwd(), args.input, file)
      );

      if (!isGuideMeta(meta)) {
        console.error(`Invalid guide meta in file: ${file}`);
        continue;
      }

      if (!isGuideContent(content)) {
        console.error(`Invalid guide content in file: ${file}`);
        continue;
      }

      const steps = content
        .map((step) => {
          const result = ["step"];

          if (step.label) {
            result.push(`label "${step.label}"`);
          }

          const subSteps = step.subSteps.map((subStep) => {
            if (Array.isArray(subStep)) {
              return subStep
                .map((s) => [s.command, s.value].filter(isNonNullish).join(" "))
                .join(" ");
            }

            return [subStep.command, subStep.value]
              .filter(isNonNullish)
              .join(" ");
          });

          return subSteps.join("\n");
        })
        .join("\n");

      console.log(steps);
    }
  },
});
