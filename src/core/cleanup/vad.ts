import { Cobra } from "@picovoice/cobra-node";
const key = "6gK6/WtYaspW1rwbjMMVw2O4j0UDQPNU3Vp8m9YIddzTS40BlMxymw==";
const cobra = new Cobra(key);

export async function cobraVAD(frame: Int16Array) {
  const probability = await cobra.process(frame);
  return probability;
}
