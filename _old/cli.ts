import { defineCommand, runMain } from "citty";
import { buildAddon } from "./build";

const main = defineCommand({
  meta: {
    name: "zygor-guides-builder",
    version: "1.0.0",
    description: "CLI for Zygor Guides Builder",
  },
  subCommands: {
    build: defineCommand({
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
      },
      async run({ args }) {
        buildAddon();
      },
    }),
  },
});

runMain(main);
