/** All 12 chromatic note names */
export const NOTE_NAMES = [
  "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B",
] as const;

export type NoteName = (typeof NOTE_NAMES)[number];

/** Flat equivalents for display */
export const FLAT_NAMES: Record<string, string> = {
  "C#": "Db",
  "D#": "Eb",
  "F#": "Gb",
  "G#": "Ab",
  "A#": "Bb",
};

/** Get enharmonic display name (e.g., "C#/Db") */
export function enharmonicName(note: string): string {
  const flat = FLAT_NAMES[note];
  return flat ? `${note}/${flat}` : note;
}

/** Get index of a note name (0-11) */
export function noteIndex(name: string): number {
  // Direct lookup first (handles C, C#, D, etc.)
  const direct = NOTE_NAMES.indexOf(name as NoteName);
  if (direct !== -1) return direct;

  // Handle flats (Db -> C#, etc.)
  const flatToSharp: Record<string, string> = {
    Db: "C#", Eb: "D#", Fb: "E", Gb: "F#", Ab: "G#", Bb: "A#", Cb: "B",
  };
  const sharp = flatToSharp[name];
  if (sharp) {
    const sharpIdx = NOTE_NAMES.indexOf(sharp as NoteName);
    if (sharpIdx !== -1) return sharpIdx;
  }

  // Fallback: parse base + accidental
  if (name.includes("#")) {
    const base = NOTE_NAMES.indexOf(name.replace("#", "") as NoteName);
    if (base !== -1) return (base + 1) % 12;
  }
  if (name.includes("b")) {
    const base = NOTE_NAMES.indexOf(name.replace("b", "") as NoteName);
    if (base !== -1) return (base + 11) % 12;
  }

  return 0; // default to C
}

/**
 * Calculate frequency for a note.
 * Equal temperament: A4 = 440Hz, each semitone = freq * 2^(1/12)
 * @param noteIdx 0-11 index (C=0)
 * @param octave octave number (4 = middle)
 */
export function noteFrequency(noteIdx: number, octave: number): number {
  // A4 = 440Hz, A is index 9
  const semitonesFromA4 = (octave - 4) * 12 + (noteIdx - 9);
  return 440 * Math.pow(2, semitonesFromA4 / 12);
}

/** Check if a note index is a black key */
export function isBlackKey(noteIdx: number): boolean {
  return [1, 3, 6, 8, 10].includes(noteIdx % 12);
}

/** Root note options for selectors */
export const ROOT_NOTES = [
  "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B",
] as const;
