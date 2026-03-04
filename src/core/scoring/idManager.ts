import fs from "node:fs";
import path from "node:path";
import type { VoicePrint } from "../pipeline/idStorage.js";

export function loadStoredVoicePrint(
  fileName: string = "voiceprint.print.json",
) {
  const file = path.join(process.cwd(), "prints", `${fileName}.print.json`);
  if (!fs.existsSync(file)) throw new Error("voiceprint file not found");
  const rawData = fs.readFileSync(file, "utf-8");
  return JSON.parse(rawData) as VoicePrint;
}
