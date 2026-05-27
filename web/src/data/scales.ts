export interface ScaleDefinition {
  name: string;
  intervals: number[];
  description: string;
}

/** Scale definitions as arrays of semitone intervals from root */
export const SCALES: ScaleDefinition[] = [
  {
    name: "Major",
    intervals: [0, 2, 4, 5, 7, 9, 11],
    description: "The most common scale. Bright and happy sound.",
  },
  {
    name: "Minor Natural",
    intervals: [0, 2, 3, 5, 7, 8, 10],
    description: "The natural minor scale. Sad and dark sound.",
  },
  {
    name: "Minor Harmonic",
    intervals: [0, 2, 3, 5, 7, 8, 11],
    description: "Natural minor with raised 7th. Exotic, dramatic sound.",
  },
  {
    name: "Minor Melodic",
    intervals: [0, 2, 3, 5, 7, 9, 11],
    description: "Natural minor with raised 6th and 7th (ascending).",
  },
  {
    name: "Pentatonic Major",
    intervals: [0, 2, 4, 7, 9],
    description: "Five-note major scale. Universal, pleasant sound.",
  },
  {
    name: "Pentatonic Minor",
    intervals: [0, 3, 5, 7, 10],
    description: "Five-note minor scale. Common in blues and rock.",
  },
  {
    name: "Blues",
    intervals: [0, 3, 5, 6, 7, 10],
    description: "Pentatonic minor plus the blue note (flat 5th).",
  },
  {
    name: "Dorian",
    intervals: [0, 2, 3, 5, 7, 9, 10],
    description: "Minor scale with raised 6th. Jazz and funk favorite.",
  },
  {
    name: "Mixolydian",
    intervals: [0, 2, 4, 5, 7, 9, 10],
    description: "Major scale with flat 7th. Blues, rock, and folk.",
  },
  {
    name: "Lydian",
    intervals: [0, 2, 4, 6, 7, 9, 11],
    description: "Major scale with raised 4th. Dreamy, floating quality.",
  },
  {
    name: "Phrygian",
    intervals: [0, 1, 3, 5, 7, 8, 10],
    description: "Minor scale with flat 2nd. Spanish/flamenco flavor.",
  },
  {
    name: "Locrian",
    intervals: [0, 1, 3, 5, 6, 8, 10],
    description: "Diminished scale. Dark, unstable, rarely used as tonic.",
  },
  {
    name: "Whole Tone",
    intervals: [0, 2, 4, 6, 8, 10],
    description: "All whole steps. Ambiguous, dreamlike quality.",
  },
  {
    name: "Chromatic",
    intervals: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    description: "All 12 semitones. Every note included.",
  },
];

/** Interval names for display */
export const INTERVAL_NAMES = [
  "Unison (P1)", "Minor 2nd (m2)", "Major 2nd (M2)", "Minor 3rd (m3)",
  "Major 3rd (M3)", "Perfect 4th (P4)", "Tritone (TT)", "Perfect 5th (P5)",
  "Minor 6th (m6)", "Major 6th (M6)", "Minor 7th (m7)", "Major 7th (M7)",
] as const;

/** Short interval names */
export const SHORT_INTERVAL_NAMES = [
  "P1", "m2", "M2", "m3", "M3", "P4", "TT", "P5", "m6", "M6", "m7", "M7",
] as const;

/** Get notes in a scale given root index and scale intervals */
export function getScaleNotes(rootIdx: number, intervals: number[]): number[] {
  return intervals.map((i) => (rootIdx + i) % 12);
}
