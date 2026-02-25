export function cosineSimilarity(vecA: number[], vecB: number[]): number {
  if (!vecA || !vecB) return 0;

  if (!vecA || !vecB) {
    console.error(
      "Comparison failed: One of the voiceprint vectors is undefined.",
    );
    return 0;
  }

  if (vecA.length !== vecB.length) {
    throw new Error(
      `Length mismatch: Live(${vecA.length}) vs Stored(${vecB.length})`,
    );
  }

  const subA = vecA.slice(1);
  const subB = vecB.slice(1);

  const meanA = vecA.reduce((a, b) => a + b, 0) / vecA.length;
  const meanB = vecB.reduce((a, b) => a + b, 0) / vecB.length;

  let dotProduct = 0;
  let magA = 0;
  let magB = 0;

  for (let i = 1; i < vecA.length; i++) {
    const centeredA = vecA[i]! - meanA;
    const centeredB = vecB[i]! - meanB;

    dotProduct += centeredA * centeredB;
    magA += centeredA * centeredA;
    magB += centeredB * centeredB;
  }

  const denominator = Math.sqrt(magA) * Math.sqrt(magB);
  return denominator < 1e-10 ? 0 : dotProduct / denominator;
}
