import fs from "node:fs";
import path from "node:path";

export interface VoicePrint {
  label: string;
  voiceprint: number[];
  capturedAt: string;
  version: string;
}

export function saveID(voiceprint: number[], fileName: string = "voiceprint") {
  const data = {
    label: fileName,
    voiceprint,
    capturedAt: new Date().toISOString(),
    version: "1.0.0",
  };

  const file = path.join(process.cwd(), "prints", `${fileName}.print.json`);
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
  console.log(`Voiceprint saved to /voiceprint/${fileName}.print.json`);
}
