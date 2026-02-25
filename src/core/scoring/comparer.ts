import { cosineSimilarity } from "./similarity.js";

const DEFAULT_TRESHOLD = 0.75;

export function compareVoiceprints(
  livePrint: number[],
  storedPrint: number[],
  threshold: number = DEFAULT_TRESHOLD,
) {
  const score = cosineSimilarity(livePrint, storedPrint);
  console.log(`Similarity score: ${score.toFixed(5)}`);

  const isMatch = score >= threshold;
  return {
    score,
    isMatch,
    thresholdUsed: threshold,
    label: isMatch ? "MATCH" : "IMPOSTER",
  };
}
