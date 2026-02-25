import fs from "node:fs";
import path from "node:path";
import type { VoicePrint } from "../pipeline/idStorage.js";
const file = path.join(process.cwd(), "voiceprint.json");

export function loadStoredVoicePrint(filepath: string = file) {
  if (!fs.existsSync(filepath)) throw new Error("voice print file not found");
  const rawData = fs.readFileSync(filepath, "utf-8");
  return JSON.parse(rawData) as VoicePrint;
}
