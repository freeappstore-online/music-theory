export interface ChordDefinition {
  name: string;
  intervals: number[];
  formula: string;
  description: string;
}

/** Chord definitions */
export const CHORDS: ChordDefinition[] = [
  {
    name: "Major",
    intervals: [0, 4, 7],
    formula: "1 - 3 - 5",
    description: "Root, major 3rd, perfect 5th. Bright and stable.",
  },
  {
    name: "Minor",
    intervals: [0, 3, 7],
    formula: "1 - b3 - 5",
    description: "Root, minor 3rd, perfect 5th. Sad and mellow.",
  },
  {
    name: "Diminished",
    intervals: [0, 3, 6],
    formula: "1 - b3 - b5",
    description: "Root, minor 3rd, diminished 5th. Tense and unstable.",
  },
  {
    name: "Augmented",
    intervals: [0, 4, 8],
    formula: "1 - 3 - #5",
    description: "Root, major 3rd, augmented 5th. Mysterious and tense.",
  },
  {
    name: "Dominant 7th",
    intervals: [0, 4, 7, 10],
    formula: "1 - 3 - 5 - b7",
    description: "Major triad plus minor 7th. Bluesy, wants to resolve.",
  },
  {
    name: "Major 7th",
    intervals: [0, 4, 7, 11],
    formula: "1 - 3 - 5 - 7",
    description: "Major triad plus major 7th. Jazzy and lush.",
  },
  {
    name: "Minor 7th",
    intervals: [0, 3, 7, 10],
    formula: "1 - b3 - 5 - b7",
    description: "Minor triad plus minor 7th. Smooth jazz sound.",
  },
  {
    name: "Sus2",
    intervals: [0, 2, 7],
    formula: "1 - 2 - 5",
    description: "Root, major 2nd, perfect 5th. Open and ambiguous.",
  },
  {
    name: "Sus4",
    intervals: [0, 5, 7],
    formula: "1 - 4 - 5",
    description: "Root, perfect 4th, perfect 5th. Suspended, wants resolution.",
  },
  {
    name: "Add9",
    intervals: [0, 4, 7, 14],
    formula: "1 - 3 - 5 - 9",
    description: "Major triad plus 9th (2nd up an octave). Rich and modern.",
  },
];

/** Get notes in a chord given root index and chord intervals */
export function getChordNotes(rootIdx: number, intervals: number[]): number[] {
  return intervals.map((i) => (rootIdx + i) % 12);
}
