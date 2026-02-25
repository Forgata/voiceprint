import { Cobra } from "@picovoice/cobra-node";
import "dotenv/config";
const key = process.env.COBRA_KEY;
if (!key) throw new Error("COBRA_KEY not found in .env");
const cobra = new Cobra(key);

export async function cobraVAD(frame: Int16Array) {
  const probability = await cobra.process(frame);
  return probability;
}
