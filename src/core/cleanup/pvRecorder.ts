// goal setup pvrecorder and pipe
import { PvRecorder } from "@picovoice/pvrecorder-node";
import { processFrame } from "./frameProcessor.js";

export async function pvRecord() {
  const devices = PvRecorder.getAvailableDevices();
  devices.forEach((device, index) => console.log(`${index}: ${device}`));

  const frameLength = 512;
  const recorder = new PvRecorder(frameLength, -1);
  recorder.start();

  console.log(`recording started with device: ${devices[0]} | default device`);

  try {
    while (recorder.isRecording) {
      const frame = await recorder.read();
      processFrame(frame);
    }
  } catch (error) {
    console.error("Error during recording:", error);
  } finally {
    recorder.release();
    console.log("Recorder released.");
  }
}
