import * as Meyda from "meyda";

export const mfccCollection: number[][] = [];
const REQUIRED_FRAMES = 150;

export function extractMFCC(frame: Float32Array): number[] {
  const features = (Meyda as any).default.extract("mfcc", frame) as number[];
  if (!features)
    throw new Error("Meyda failed to extract MFCCs. Check buffer size.");

  return features;
}
