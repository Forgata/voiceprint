import fs from "node:fs";
import path from "node:path";
import type { VoicePrint } from "../pipeline/idStorage.js";
const file = path.join(process.cwd(), "voiceprint.json");

export function loadStoredVoicePrint(
  fileName: string = "voiceprint.print.json",
) {
  const file = path.join(process.cwd(), `${fileName}.print.json`);
  if (!fs.existsSync(file)) throw new Error("voiceprint file not found");
  const rawData = fs.readFileSync(file, "utf-8");
  return JSON.parse(rawData) as VoicePrint;
}
