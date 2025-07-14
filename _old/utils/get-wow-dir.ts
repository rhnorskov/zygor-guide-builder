import { file } from "bun";
import { join } from "node:path";

const commonPaths = [
  "C:\\Program Files (x86)\\World of Warcraft",
  "C:\\Games\\World of Warcraft",
  "D:\\Program Files (x86)\\World of Warcraft",
  "D:\\Games\\World of Warcraft",
];

let cachedWowDir: string | null = null;

export async function getWowDir() {
  if (cachedWowDir) {
    return cachedWowDir;
  }

  for (const basePath of commonPaths) {
    const launcherPath = join(basePath, "World of Warcraft Launcher.exe");

    try {
      const fileHandle = file(launcherPath);
      if (await fileHandle.exists()) {
        return (cachedWowDir = basePath);
      }
    } catch {
      // Ignore errors, continue searching
    }
  }

  throw new Error("World of Warcraft directory not found in common paths.");
}
