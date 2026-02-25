export function cosineSimilarity(vecA: number[], vecB: number[]): number {
  if (vecA.length !== vecB.length)
    throw new Error("Vectors must be of the same length");

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

  let dotProduct = 0;
  let magA = 0;
  let magB = 0;

  for (let i = 1; i < vecA.length; i++) {
    dotProduct += vecA[i]! * vecB[i]!;
    magA += vecA[i]! * vecA[i]!;
    magB += vecB[i]! * vecB[i]!;
  }

  const magnitude = Math.sqrt(magA) * Math.sqrt(magB);
  return magnitude === 0 ? 0 : dotProduct / magnitude;
}
