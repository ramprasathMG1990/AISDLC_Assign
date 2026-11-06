import { readFileSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createApp } from "./app.js";

const sourceDir = dirname(fileURLToPath(import.meta.url));
const candidates = [resolve(sourceDir, "../.env"), resolve(process.cwd(), ".env")];
const envPath = candidates.find((candidate) => existsSync(candidate));
if (envPath) {
  for (const line of readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const match = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/);
    if (match && process.env[match[1]] === undefined) {
      process.env[match[1]] = match[2].replace(/^["']|["']$/g, "");
    }
  }
}

const port = Number(process.env.PORT ?? 3001);
createApp().listen(port, () => console.log(`Tracker listening on ${port}`));
