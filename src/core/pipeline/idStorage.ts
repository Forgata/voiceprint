import fs from "node:fs";

export interface VoicePrint {
  label: string;
  voiceprint: number[];
  capturedAt: string;
  version: string;
}

export function saveID(voiceprint: number[], filename: string = "voiceprint") {
  const data = {
    label: filename,
    voiceprint,
    capturedAt: new Date().toISOString(),
    version: "1.0.0",
  };
  // console.clear();

  fs.writeFileSync(`${filename}.print.json`, JSON.stringify(data, null, 2));
  console.log(`Voiceprint saved to ${filename}.print.json`);
}
