import Mustache from "mustache";
import { readFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export interface TemplateContext {
  version: string;
  title: string;
  notes: string;
  interface: string;
  dependencies: string[];
  guideFiles?: string[];
  coreFile?: string;
}

export interface GuideTemplateContext {
  guidePath: string;
  description: string;
  steps: string;
}

class TemplateEngine {
  private templates = new Map<string, string>();

  async loadTemplate(templateName: string): Promise<string> {
    if (this.templates.has(templateName)) {
      return this.templates.get(templateName)!;
    }

    const templatePath = join(__dirname, `${templateName}.mustache`);
    const templateContent = await readFile(templatePath, "utf-8");

    this.templates.set(templateName, templateContent);
    return templateContent;
  }

  async renderToc(context: TemplateContext): Promise<string> {
    const template = await this.loadTemplate("addon.toc");
    return Mustache.render(template, {
      ...context,
      dependencies: context.dependencies.join(", "),
    });
  }

  async renderCore(context: TemplateContext): Promise<string> {
    const template = await this.loadTemplate("core.lua");
    return Mustache.render(template, context);
  }

  async renderGuide(context: GuideTemplateContext): Promise<string> {
    const template = await this.loadTemplate("guide.lua");
    return Mustache.render(template, context);
  }
}

export const templateEngine = new TemplateEngine();
