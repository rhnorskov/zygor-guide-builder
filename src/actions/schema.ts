import { z } from "zod";

export const ActionSchema = z.object({
  type: z.string(),
  command: z.string().nullable(),
  value: z.union([z.string(), z.number(), z.boolean(), z.null()]),
});

export type Action = z.infer<typeof ActionSchema>;
