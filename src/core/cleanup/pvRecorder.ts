import { PvRecorder } from "@picovoice/pvrecorder-node";
import { processFrame } from "./frameProcessor.js";
import { saveID } from "../pipeline/idStorage.js";
import { loadStoredVoicePrint } from "../scoring/idManager.js";
import { cosineSimilarity } from "../scoring/similarity.js";
import chalk from "chalk";

export async function pvRecord() {
  const mode = process.argv[2] === "enroll" ? "enroll" : "verify";
  const printFileName = process.argv[3]?.trim().toLowerCase();

  const devices = PvRecorder.getAvailableDevices();

  const frameLength = 512;
  const recorder = new PvRecorder(frameLength, -1);
  recorder.start();

  console.log("Recording started with default device: ", devices[0]);
  console.log(chalk.bgRedBright(`--- MODE: ${mode.toUpperCase()} ---`));

  if (!printFileName)
    console.log(
      `${chalk.yellowBright("No print file name was provided as an argument.")}\n${chalk.blueBright("Voiceprint will default to voiceprint.print.json")}`,
    );
  else
    console.log(
      mode === "enroll"
        ? chalk.yellow(`Enrolling voice print to ${printFileName}.print.json`)
        : chalk.yellow(`Verifying ${printFileName}.print.json`),
    );

  try {
    while (recorder.isRecording) {
      const frame = await recorder.read();
      const resultPrint = await processFrame(frame);

      if (!resultPrint) continue;

      if (mode === "enroll") {
        saveID(resultPrint, ...(printFileName ? [printFileName] : []));
      } else {
        const stored = !printFileName
          ? loadStoredVoicePrint()
          : loadStoredVoicePrint(printFileName);
        const score = cosineSimilarity(resultPrint, stored.voiceprint);

        console.log(`\nSimilarity Score: ${(score * 100).toFixed(3)}%`);

        console.log(score > 0.85 ? "✅ ACCESS GRANTED" : "❌ ACCESS DENIED");
      }
      break;
    }
  } catch (error) {
    console.error("Error during recording:", error);
  } finally {
    recorder.release();
    console.log("Recorder released.");
  }
}
