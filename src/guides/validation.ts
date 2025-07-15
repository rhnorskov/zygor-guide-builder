import { GuideMetaSchema, GuideContentSchema } from "./schema.ts";
import type { GuideMeta, GuideContent } from "./schema.ts";

export function isGuideMeta(meta: unknown): meta is GuideMeta {
  return GuideMetaSchema.safeParse(meta).success;
}

export function isGuideContent(content: unknown): content is GuideContent {
  return GuideContentSchema.safeParse(content).success;
}
