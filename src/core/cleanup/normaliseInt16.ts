export function normaliseInt16(frame: Int16Array) {
  let max = 0;

  for (let i = 0; i < frame.length; i++) {
    const absValue = Math.abs(frame[i]!);
    if (absValue > max) max = absValue;
  }
  if (max === 0) return frame;
  const scaleFactor = 32768 / max;

  for (let i = 0; i < frame.length; i++) {
    frame[i] = Math.round(frame[i]! * scaleFactor);
  }

  return frame;
}
