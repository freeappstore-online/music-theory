export interface KeySignature {
  major: string;
  minor: string;
  sharps: number;
  flats: number;
  accidentals: string;
}

/** All key signatures ordered by circle of fifths */
export const KEY_SIGNATURES: KeySignature[] = [
  { major: "C", minor: "Am", sharps: 0, flats: 0, accidentals: "None" },
  { major: "G", minor: "Em", sharps: 1, flats: 0, accidentals: "F#" },
  { major: "D", minor: "Bm", sharps: 2, flats: 0, accidentals: "F#, C#" },
  { major: "A", minor: "F#m", sharps: 3, flats: 0, accidentals: "F#, C#, G#" },
  { major: "E", minor: "C#m", sharps: 4, flats: 0, accidentals: "F#, C#, G#, D#" },
  { major: "B", minor: "G#m", sharps: 5, flats: 0, accidentals: "F#, C#, G#, D#, A#" },
  { major: "F#", minor: "D#m", sharps: 6, flats: 0, accidentals: "F#, C#, G#, D#, A#, E#" },
  { major: "F", minor: "Dm", sharps: 0, flats: 1, accidentals: "Bb" },
  { major: "Bb", minor: "Gm", sharps: 0, flats: 2, accidentals: "Bb, Eb" },
  { major: "Eb", minor: "Cm", sharps: 0, flats: 3, accidentals: "Bb, Eb, Ab" },
  { major: "Ab", minor: "Fm", sharps: 0, flats: 4, accidentals: "Bb, Eb, Ab, Db" },
  { major: "Db", minor: "Bbm", sharps: 0, flats: 5, accidentals: "Bb, Eb, Ab, Db, Gb" },
  { major: "Gb", minor: "Ebm", sharps: 0, flats: 6, accidentals: "Bb, Eb, Ab, Db, Gb, Cb" },
];

/** Circle of fifths order (major keys) */
export const CIRCLE_OF_FIFTHS_MAJOR = [
  "C", "G", "D", "A", "E", "B", "F#", "Db", "Ab", "Eb", "Bb", "F",
] as const;

/** Circle of fifths order (minor keys) */
export const CIRCLE_OF_FIFTHS_MINOR = [
  "Am", "Em", "Bm", "F#m", "C#m", "G#m", "D#m", "Bbm", "Fm", "Cm", "Gm", "Dm",
] as const;

/** Diatonic chords for a major key (Roman numerals) */
export const MAJOR_KEY_CHORDS = [
  { numeral: "I", quality: "Major" },
  { numeral: "ii", quality: "Minor" },
  { numeral: "iii", quality: "Minor" },
  { numeral: "IV", quality: "Major" },
  { numeral: "V", quality: "Major" },
  { numeral: "vi", quality: "Minor" },
  { numeral: "vii°", quality: "Diminished" },
] as const;
