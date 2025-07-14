import { join } from "node:path";
import { getWowDir } from "./get-wow-dir";

let cachedAddonsDir: string | null = null;

export async function getAddonsDir() {
  if (cachedAddonsDir) {
    return cachedAddonsDir;
  }

  const wowDir = await getWowDir();

  return (cachedAddonsDir = join(wowDir, "_classic_", "Interface", "AddOns"));
}
