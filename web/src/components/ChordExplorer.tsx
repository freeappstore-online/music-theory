import { useState, useMemo } from "react";
import { NOTE_NAMES, noteIndex } from "../data/notes";
import { CHORDS } from "../data/chords";
import { SHORT_INTERVAL_NAMES } from "../data/scales";
import { playChord } from "../lib/audio";
import Piano from "./Piano";
import NoteSelector from "./NoteSelector";

export default function ChordExplorer() {
  const [root, setRoot] = useState("C");
  const [chordIdx, setChordIdx] = useState(0);

  const chord = CHORDS[chordIdx]!;
  const rootIdx = noteIndex(root);

  const chordNotes = useMemo(
    () => chord.intervals.map((i) => (rootIdx + i) % 12),
    [rootIdx, chord],
  );
  const highlighted = useMemo(() => new Set(chordNotes), [chordNotes]);

  const noteNames = chordNotes.map((idx) => NOTE_NAMES[idx]!).join(" - ");
  const intervalDisplay = chord.intervals
    .map((i) => SHORT_INTERVAL_NAMES[i % 12]!)
    .join(" - ");

  return (
    <section>
      <h2 className="text-xl font-bold display-font mb-4" style={{ color: "var(--ink)" }}>
        Chord Explorer
      </h2>

      <div className="flex flex-wrap items-center gap-3 mb-4">
        <NoteSelector value={root} onChange={setRoot} />

        <label className="flex items-center gap-2">
          <span className="text-sm font-medium" style={{ color: "var(--muted)" }}>Chord</span>
          <select
            value={chordIdx}
            onChange={(e) => setChordIdx(Number(e.target.value))}
            className="rounded-lg px-3 py-1.5 text-sm font-medium cursor-pointer"
            style={{
              background: "var(--panel)",
              color: "var(--ink)",
              border: "1px solid var(--line)",
            }}
          >
            {CHORDS.map((c, i) => (
              <option key={c.name} value={i}>{c.name}</option>
            ))}
          </select>
        </label>
      </div>

      <div
        className="rounded-xl p-4 mb-4"
        style={{ background: "var(--panel)", border: "1px solid var(--line)" }}
      >
        <Piano octaves={2} highlightedNotes={highlighted} startOctave={4} />
      </div>

      <div
        className="rounded-xl p-4 mb-4 space-y-2"
        style={{ background: "var(--panel)", border: "1px solid var(--line)" }}
      >
        <p className="text-sm" style={{ color: "var(--ink)" }}>
          <span className="font-semibold">{root} {chord.name}:</span>{" "}
          <span style={{ color: "var(--muted)" }}>{chord.description}</span>
        </p>
        <p className="text-sm" style={{ color: "var(--ink)" }}>
          <span className="font-medium">Notes:</span>{" "}
          <span className="font-mono text-xs" style={{ color: "var(--accent)" }}>{noteNames}</span>
        </p>
        <p className="text-sm" style={{ color: "var(--ink)" }}>
          <span className="font-medium">Formula:</span>{" "}
          <span className="font-mono text-xs" style={{ color: "var(--muted)" }}>{chord.formula}</span>
        </p>
        <p className="text-sm" style={{ color: "var(--ink)" }}>
          <span className="font-medium">Intervals:</span>{" "}
          <span className="font-mono text-xs" style={{ color: "var(--muted)" }}>{intervalDisplay}</span>
        </p>
      </div>

      <button
        onClick={() => playChord(chord.intervals.map((i) => rootIdx + i), 4, 1.2)}
        className="rounded-lg px-4 py-2 text-sm font-medium cursor-pointer"
        style={{ background: "var(--accent)", color: "white", border: "none" }}
      >
        Play Chord
      </button>
    </section>
  );
}
