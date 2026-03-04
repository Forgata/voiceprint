import chalk from "chalk";
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
  if (peak > 950) {
    const normalisedFrame = normaliseInt16(frame);

    const probability = await cobraVAD(normalisedFrame);

    if (probability > 0.7) {
      process.stdout.write(
        `\rVoice activity detected... (${speechBuffer.length}/${MAX_SPEECH_FRAMES})`,
      );

      if (speechBuffer.length >= MAX_SPEECH_FRAMES - 1) {
        process.stdout.write("\n");
        console.log(chalk.green("recording completed"));
      }
      const frameWindow = applyWindow(normalisedFrame);

      const features = extractMFCC(frameWindow);
      speechBuffer.push(frameWindow);

      const fullMatrix = collectMFCC(features);
      if (fullMatrix) return calculateVoiceprint(fullMatrix);
    }
  }
  return null;
}
