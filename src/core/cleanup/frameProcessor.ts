import { normaliseInt16 } from "./normaliseInt16.js";
import { cobraVAD } from "./vad.js";
import { applyWindow } from "./window.js";

export const speechBuffer: Float32Array[] = [];
const MAX_SPEECH_FRAMES = 150;

export async function processFrame(frame: Int16Array) {
  const peak = Math.max(...frame);
  if (peak > 1000) {
    const normalisedFrame = normaliseInt16(frame);

    const probability = await cobraVAD(normalisedFrame);

    if (probability > 0.75) {
      console.log("Voice activity detected with probability:", probability);
      const frameWindow = applyWindow(normalisedFrame);
      console.log("Windowed sample [0]:", frameWindow[0]);

      speechBuffer.push(frameWindow);

      if (speechBuffer.length >= MAX_SPEECH_FRAMES)
        console.log("Cleanup complete");
    }
  }
}
