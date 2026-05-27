import { useCallback } from "react";
import { NOTE_NAMES } from "../data/notes";
import { playNote } from "../lib/audio";

interface PianoProps {
  /** Number of octaves to display (2 or 4) */
  octaves?: number;
  /** Set of note indices (0-11) to highlight */
  highlightedNotes?: Set<number>;
  /** Color for highlighted notes */
  highlightColor?: string;
  /** Starting octave for playback */
  startOctave?: number;
  /** Optional callback when a key is pressed */
  onKeyPress?: (noteIdx: number, octave: number) => void;
}

/** White key note indices in order: C D E F G A B */
const WHITE_KEYS = [0, 2, 4, 5, 7, 9, 11] as const;

/** Black key definitions: noteIdx -> white key index it sits after */
const BLACK_KEYS: ReadonlyArray<{ noteIdx: number; afterWhite: number }> = [
  { noteIdx: 1, afterWhite: 0 },   // C#: between C and D
  { noteIdx: 3, afterWhite: 1 },   // D#: between D and E
  { noteIdx: 6, afterWhite: 3 },   // F#: between F and G
  { noteIdx: 8, afterWhite: 4 },   // G#: between G and A
  { noteIdx: 10, afterWhite: 5 },  // A#: between A and B
];

export default function Piano({
  octaves = 2,
  highlightedNotes,
  highlightColor = "var(--accent)",
  startOctave = 4,
  onKeyPress,
}: PianoProps) {
  const whiteW = 40;
  const whiteH = 150;
  const blackW = 26;
  const blackH = 95;
  const totalWhite = 7 * octaves;
  const svgW = totalWhite * whiteW;

  const handleKey = useCallback(
    (noteIdx: number, octave: number) => {
      playNote({ noteIdx, octave, duration: 0.6 });
      onKeyPress?.(noteIdx, octave);
    },
    [onKeyPress],
  );

  const whites: React.ReactNode[] = [];
  const blacks: React.ReactNode[] = [];

  for (let oct = 0; oct < octaves; oct++) {
    const octave = startOctave + oct;
    const ox = oct * 7 * whiteW;

    // White keys
    for (let wi = 0; wi < WHITE_KEYS.length; wi++) {
      const noteIdx = WHITE_KEYS[wi]!;
      const x = ox + wi * whiteW;
      const lit = highlightedNotes?.has(noteIdx) ?? false;
      const name = NOTE_NAMES[noteIdx]!;

      whites.push(
        <g key={`w${oct}-${noteIdx}`}>
          <rect
            className="piano-key-white cursor-pointer"
            x={x}
            y={0}
            width={whiteW - 1}
            height={whiteH}
            rx={4}
            fill={lit ? highlightColor : "var(--paper)"}
            stroke="var(--line-strong)"
            strokeWidth={1}
            onPointerDown={() => handleKey(noteIdx, octave)}
          />
          <text
            x={x + whiteW / 2}
            y={whiteH - 12}
            textAnchor="middle"
            fontSize={11}
            fontWeight={lit ? 600 : 400}
            fill={lit ? "white" : "var(--muted)"}
            pointerEvents="none"
            fontFamily="Manrope, system-ui, sans-serif"
          >
            {name}
          </text>
        </g>,
      );
    }

    // Black keys
    for (const bk of BLACK_KEYS) {
      const x = ox + bk.afterWhite * whiteW + whiteW - blackW / 2;
      const lit = highlightedNotes?.has(bk.noteIdx) ?? false;
      const name = NOTE_NAMES[bk.noteIdx]!;

      blacks.push(
        <g key={`b${oct}-${bk.noteIdx}`}>
          <rect
            className="piano-key-black cursor-pointer"
            x={x}
            y={0}
            width={blackW}
            height={blackH}
            rx={3}
            fill={lit ? highlightColor : "#1a1a1a"}
            stroke="none"
            onPointerDown={() => handleKey(bk.noteIdx, octave)}
          />
          {lit && (
            <text
              x={x + blackW / 2}
              y={blackH - 10}
              textAnchor="middle"
              fontSize={9}
              fontWeight={600}
              fill="white"
              pointerEvents="none"
              fontFamily="Manrope, system-ui, sans-serif"
            >
              {name}
            </text>
          )}
        </g>,
      );
    }
  }

  return (
    <div className="overflow-x-auto">
      <svg
        viewBox={`0 0 ${svgW} ${whiteH}`}
        width={svgW}
        height={whiteH}
        className="block"
        style={{ maxWidth: "100%", height: "auto" }}
      >
        {whites}
        {blacks}
      </svg>
    </div>
  );
}
