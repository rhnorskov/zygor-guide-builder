import { z } from "zod";
import { StepSchema } from "../steps/schema.ts";

export const GuideMetaSchema = z.object({
  title: z.string(),
  description: z.string(),
  category: z.enum(["Leveling", "Profession"]),
});

export const GuideContentSchema = z.array(StepSchema);

export type GuideMeta = z.infer<typeof GuideMetaSchema>;
export type GuideContent = z.infer<typeof GuideContentSchema>;
