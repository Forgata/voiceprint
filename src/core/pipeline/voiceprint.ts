export function calculateVoiceprint(mfccMatrix: number[][]): number[] {
  const frameCount = mfccMatrix.length;
  const coefficientCount = mfccMatrix[0]!.length;

  const avgVector = new Array(coefficientCount).fill(0);

  for (const frame of mfccMatrix) {
    for (let i = 0; i < coefficientCount; i++) {
      avgVector[i]! += frame[i]!;
    }
  }

  return avgVector.map((sum) => sum / frameCount);
}
