#!/usr/bin/env bun
import { defineCommand, runMain } from "citty";
import { buildCommand } from "./commands/build.ts";

const main = defineCommand({
  meta: {
    name: "zygor-guides-builder",
    version: "1.0.0",
    description: "CLI for Zygor Guides Builder",
  },
  subCommands: {
    build: buildCommand,
  },
});

runMain(main);
