let matrix: number[][] = [];
const FRAME_THRESHOLD = 150;

export function collectMFCC(mfcc: number[]): number[][] | null {
  matrix.push(mfcc);

  if (matrix.length >= FRAME_THRESHOLD) {
    const fullMatrix = [...matrix];
    matrix = [];
    return fullMatrix;
  }
  return null;
}
