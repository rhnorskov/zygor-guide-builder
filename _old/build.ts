import { file, fileURLToPath, write } from "bun";
import { join, dirname } from "node:path";
import { getAddonDir } from "./utils/get-addon.dir";
import { getWowDir } from "./utils/get-wow-dir";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function buildAddon() {
  const addonDir = await getAddonDir();

  const toc = file(join(addonDir, "ZygorGuideBuilder.toc"));
  const lua = file(join(addonDir, "ZygorGuideBuilder.lua"));

  await write(
    join(addonDir, "ZygorGuideBuilder.toc"),
    file(join(__dirname, "template", "ZygorGuideBuilder.toc"))
  );

  await write(
    join(addonDir, "ZygorGuideBuilder.lua"),
    file(join(__dirname, "template", "ZygorGuideBuilder.lua"))
  );
}
