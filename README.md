# VoicePrint: Real-Time Speaker Verification

A simplified sophisticated biometric authentication system built with **Node.js**, **TypeScript**, and **Digital Signal Processing**. This project transforms raw human speech into a unique 13-dimensional mathematical "fingerprint" to distinguish between a target user and an imposter.

---

## Project Overview

VoicePrint ID operates on the principle of **Vocal Tract Resonance**. By analyzing the frequency characteristics of speech (MFCCs), the system captures the physical unique qualities of a user's voice, rather than just the words spoken.

---

## Technical Architecture & Phases

### Phase 1: Signal Cleanup & VAD (The Filter)

The first challenge was ensuring the "Brain" only receives high-quality speech data, not silence or air conditioning hum.

- **Hardware Interface**: Interfacing with system microphones using `@picovoice/pvrecorder-node`.
- **Voice Activity Detection (VAD)**: Implementing `Picovoice Cobra` to gate the pipeline, only allowing frames with a confidence probability > 0.75.
- **Audio Normalization**: Converting 16-bit PCM integers to a normalized Float32 range [-1.0, 1.0].
- **Hamming Window**: Applying a smoothing function to each 512-sample frame (32ms) to prevent "spectral leakage" during frequency analysis.

### Phase 2: Feature Extraction (The Brain)

Turning time-domain waves into frequency-domain features.

- **MFCC Analysis**: Using the `Meyda` library to calculate **Mel-Frequency Cepstral Coefficients**.
- **Feature Selection**: Extracting 13 coefficients, specifically focusing on indices 1-12 to ignore overall volume (Energy) and focus purely on vocal timbre.
- **Centroid Averaging**: Collecting a matrix of 150 valid speech frames and collapsing them into a single 13-digit vector (the "Voice Signature").

### Phase 3 & 4: The Judge (Scoring & Verification)

The final logic that determines "Access Granted" or "Denied."

- **Cosine Similarity**: Implementing a vector math engine to measure the angular distance between a live voiceprint and the stored identity.
- **Threshold Calibration**: Establishing a statistical baseline (0.85) to separate "Target" speakers from "Imposters."

---

## Installation & Setup

### 1. Prerequisites

- **Node.js** (v18 or higher)
- **TypeScript** (`npm install -g typescript`)
- **Picovoice AccessKey**: Required for the Cobra VAD engine. Get one at [console.picovoice.ai](https://console.picovoice.ai/).

### 2. Environment Setup

Clone the repository and install dependencies:

```bash
npm install
```

Build the project

```bash
npm run build
```

## Usage Guide

The system uses a command-line argument to switch between Enrollment and Verification modes.

### Step 1: Voice Enrollment

Record your "Standard" voice signature. Speak clearly for about 5-8 seconds until you see a log `Voiceprint calculated and saved`

```bash
npm run enroll
```

This will generate a `voiceprint.json` file in the root directory containing your averaged MFCC vector.

### Step 2: Voice Verification

Test your live voice against the stored signature.

```bash
npm run verify
```

The system will output your Similarity Score (e.g., 95.43%) based on the calibrated threshold.

| Metric                    | Result                     |
| :------------------------ | :------------------------- |
| **Sample Rate**           | 16 KHz                     |
| **Frame Length**          | 512 Samples (32ms)         |
| **Target Match Accuracy** | 87% - 98% Similarity       |
| **Imposter Rejection**    | Typically < 80% Similarity |
