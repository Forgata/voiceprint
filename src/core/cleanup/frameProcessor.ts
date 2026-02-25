import path from "node:path";
import { saveID } from "../pipeline/idStorage.js";
import { collectMFCC } from "../pipeline/mfccCollector.js";
import { extractMFCC } from "../pipeline/mfccExtractor.js";
import { calculateVoiceprint } from "../pipeline/voiceprint.js";
import { normaliseInt16 } from "./normaliseInt16.js";
import { cobraVAD } from "./vad.js";
import { applyWindow } from "./window.js";

export const speechBuffer: Float32Array[] = [];
const MAX_SPEECH_FRAMES = 150;

export async function processFrame(frame: Int16Array) {
  const peak = Math.max(...frame.map(Math.abs));
  if (peak > 1000) {
    const normalisedFrame = normaliseInt16(frame);

    const probability = await cobraVAD(normalisedFrame);

    if (probability > 0.75) {
      console.log(
        "Voice activity detected with probability:",
        probability.toFixed(5),
      );

      if (speechBuffer.length >= MAX_SPEECH_FRAMES)
        console.log("Cleanup complete");

      const frameWindow = applyWindow(normalisedFrame);

      const features = extractMFCC(frameWindow);
      const fullMatrix = collectMFCC(features);

      if (fullMatrix) {
        const print = calculateVoiceprint(fullMatrix);
        saveID(print);
        console.log("Voiceprint calculated and saved.");
      }

      console.log("Windowed sample [0]:", frameWindow[0]);

      speechBuffer.push(frameWindow);
    }
  }
}
