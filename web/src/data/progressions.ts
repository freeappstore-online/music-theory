export interface ChordInProgression {
  numeral: string;
  quality: "major" | "minor" | "diminished" | "dominant7";
  /** Semitone offset from the key root */
  rootOffset: number;
}

export interface Progression {
  name: string;
  description: string;
  chords: ChordInProgression[];
}

/** Common chord progressions */
export const PROGRESSIONS: Progression[] = [
  {
    name: "I - IV - V - I",
    description: "The most fundamental progression in Western music.",
    chords: [
      { numeral: "I", quality: "major", rootOffset: 0 },
      { numeral: "IV", quality: "major", rootOffset: 5 },
      { numeral: "V", quality: "major", rootOffset: 7 },
      { numeral: "I", quality: "major", rootOffset: 0 },
    ],
  },
  {
    name: "I - V - vi - IV",
    description: "The 'pop' progression. Used in countless hit songs.",
    chords: [
      { numeral: "I", quality: "major", rootOffset: 0 },
      { numeral: "V", quality: "major", rootOffset: 7 },
      { numeral: "vi", quality: "minor", rootOffset: 9 },
      { numeral: "IV", quality: "major", rootOffset: 5 },
    ],
  },
  {
    name: "ii - V - I",
    description: "The jazz standard progression. Smooth resolution.",
    chords: [
      { numeral: "ii", quality: "minor", rootOffset: 2 },
      { numeral: "V", quality: "dominant7", rootOffset: 7 },
      { numeral: "I", quality: "major", rootOffset: 0 },
    ],
  },
  {
    name: "I - vi - IV - V",
    description: "The '50s progression. Classic doo-wop and early rock.",
    chords: [
      { numeral: "I", quality: "major", rootOffset: 0 },
      { numeral: "vi", quality: "minor", rootOffset: 9 },
      { numeral: "IV", quality: "major", rootOffset: 5 },
      { numeral: "V", quality: "major", rootOffset: 7 },
    ],
  },
  {
    name: "12-Bar Blues",
    description: "Foundation of blues, rock, and jazz. Uses dominant 7th chords.",
    chords: [
      { numeral: "I7", quality: "dominant7", rootOffset: 0 },
      { numeral: "I7", quality: "dominant7", rootOffset: 0 },
      { numeral: "I7", quality: "dominant7", rootOffset: 0 },
      { numeral: "I7", quality: "dominant7", rootOffset: 0 },
      { numeral: "IV7", quality: "dominant7", rootOffset: 5 },
      { numeral: "IV7", quality: "dominant7", rootOffset: 5 },
      { numeral: "I7", quality: "dominant7", rootOffset: 0 },
      { numeral: "I7", quality: "dominant7", rootOffset: 0 },
      { numeral: "V7", quality: "dominant7", rootOffset: 7 },
      { numeral: "IV7", quality: "dominant7", rootOffset: 5 },
      { numeral: "I7", quality: "dominant7", rootOffset: 0 },
      { numeral: "V7", quality: "dominant7", rootOffset: 7 },
    ],
  },
];

/** Get chord intervals by quality */
export function getIntervalsForQuality(
  quality: "major" | "minor" | "diminished" | "dominant7",
): number[] {
  switch (quality) {
    case "major":
      return [0, 4, 7];
    case "minor":
      return [0, 3, 7];
    case "diminished":
      return [0, 3, 6];
    case "dominant7":
      return [0, 4, 7, 10];
  }
}
