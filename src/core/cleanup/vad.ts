import { Cobra } from "@picovoice/cobra-node";
const key = "REMOVED_SECRET";
const cobra = new Cobra(key);

export async function cobraVAD(frame: Int16Array) {
  const probability = await cobra.process(frame);
  return probability;
}
