import Meyda from "meyda";

export function applyWindow(frame: Int16Array) {
  const floatFrame = new Float32Array(frame.length);

  for (let i = 0; i < frame.length; i++) {
    floatFrame[i] = frame[i]! / 32768.0;
  }
  const winFn = (Meyda as any).windowing || (Meyda as any).default?.windowing;

  if (!winFn) throw new Error("Meyda.windowing function not found");
  const windowedFrame = winFn(floatFrame, "hamming");
  return windowedFrame;
}
