import fs from "node:fs";

export function saveID(
  voiceprint: number[],
  filename: string = "voiceprint.json",
) {
  const data = {
    label: "Divine",
    voiceprint,
    capturedAt: new Date().toISOString(),
    version: "1.0.0",
  };

  fs.writeFileSync(filename, JSON.stringify(data, null, 2));
  console.log(`Voiceprint saved to ${filename}`);
}
