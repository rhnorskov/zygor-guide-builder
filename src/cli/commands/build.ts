import { Glob } from "bun";
import { defineCommand } from "citty";
import { join, basename, win32 } from "node:path";
import { mkdir, writeFile, rm } from "node:fs/promises";
import { isGuideContent, isGuideMeta } from "../../index.ts";
import { isNonNullish } from "../../utils/is-nullish.ts";
import { templateEngine } from "../template/engine.ts";
import type { TemplateContext } from "../template/engine.ts";
import { pascalCase } from "change-case";

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
    const guideFiles: string[] = [];
    const glob = new Glob("**/*.ts");

    // Remove and recreate output directory if specified
    if (args.output) {
      try {
        await rm(args.output, { recursive: true, force: true });
        if (args.verbose) {
          console.log(`Cleaned output directory: ${args.output}`);
        }
      } catch (error) {
        // Directory might not exist, that's fine
        if (args.verbose) {
          console.log(`Output directory didn't exist: ${args.output}`);
        }
      }

      await mkdir(args.output, { recursive: true });
      await mkdir(join(args.output, "Guides"), { recursive: true });

      if (args.verbose) {
        console.log(`Created output directory: ${args.output}`);
      }
    }

    // Process guide files
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

          result.push(subSteps.join("\n"));

          return result.join("\n");
        })
        .join("\n");

      if (args.verbose) {
        console.log(`Processing guide: ${meta.title}`);
        console.log(steps);
      }

      // Generate guide file if output directory is specified
      if (args.output) {
        const guideName = basename(file, ".ts");
        const guidePath = win32
          .join(meta.category, meta.title)
          .replace(/[\\$'"]/g, "\\$&");
        const guideFileName = `${pascalCase(guideName)}.lua`;
        const guideContent = await templateEngine.renderGuide({
          guidePath,
          description: meta.description,
          steps,
        });

        await writeFile(
          join(args.output, "Guides", guideFileName),
          guideContent
        );
        guideFiles.push(guideFileName);

        if (args.verbose) {
          console.log(`Generated: Guides/${guideFileName}`);
        }
      }
    }

    // Generate addon files with guide references
    if (args.output) {
      const templateContext: TemplateContext = {
        version: "1.0.0",
        title: "Zygor Guide Builder",
        notes: "A custom addon for building and registering Zygor guides",
        interface: "50500",
        dependencies: ["ZygorGuidesViewerClassicTBC"],
        guideFiles,
      };

      const tocContent = await templateEngine.renderToc(templateContext);
      const coreContent = await templateEngine.renderCore(templateContext);

      await writeFile(join(args.output, "ZygorGuideBuilder.toc"), tocContent);
      await writeFile(join(args.output, "ZygorGuideBuilder.lua"), coreContent);

      console.log(
        `Generated addon with ${guideFiles.length} guide(s) in ${args.output}`
      );
    }
  },
});
