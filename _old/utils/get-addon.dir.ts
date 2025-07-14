import { getAddonsDir } from "./get-addons-dir";
import { join } from "node:path";

export async function getAddonDir() {
  const addonsDir = await getAddonsDir();

  return join(addonsDir, "ZygorGuideBuilder");
}
