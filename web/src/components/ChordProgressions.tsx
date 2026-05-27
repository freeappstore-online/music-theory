import { useState, useMemo } from "react";
import { NOTE_NAMES, noteIndex } from "../data/notes";
import { PROGRESSIONS, getIntervalsForQuality } from "../data/progressions";
import { playProgression } from "../lib/audio";
import NoteSelector from "./NoteSelector";

export default function ChordProgressions() {
  const [root, setRoot] = useState("C");
  const [progIdx, setProgIdx] = useState(0);

  const progression = PROGRESSIONS[progIdx]!;
  const rootIdx = noteIndex(root);

  // Resolve chord names for current key
  const resolvedChords = useMemo(() => {
    return progression.chords.map((chord) => {
      const chordRootIdx = (rootIdx + chord.rootOffset) % 12;
      const chordRootName = NOTE_NAMES[chordRootIdx]!;
      const intervals = getIntervalsForQuality(chord.quality);
      const noteNames = intervals
        .map((i) => NOTE_NAMES[(chordRootIdx + i) % 12]!)
        .join(", ");
      return {
        numeral: chord.numeral,
        name: chordRootName,
        quality: chord.quality,
        notes: noteNames,
        intervals,
        rootOffset: chord.rootOffset,
      };
    });
  }, [progression, rootIdx]);

  const handlePlay = () => {
    const chordData = progression.chords.map((chord) => ({
      rootOffset: chord.rootOffset,
      intervals: getIntervalsForQuality(chord.quality),
    }));
    playProgression(chordData, rootIdx, 4, 0.9);
  };

  return (
    <section>
      <h2 className="text-xl font-bold display-font mb-4" style={{ color: "var(--ink)" }}>
        Chord Progressions
      </h2>

      <div className="flex flex-wrap items-center gap-3 mb-4">
        <NoteSelector value={root} onChange={setRoot} label="Key" />

        <label className="flex items-center gap-2">
          <span className="text-sm font-medium" style={{ color: "var(--muted)" }}>Progression</span>
          <select
            value={progIdx}
            onChange={(e) => setProgIdx(Number(e.target.value))}
            className="rounded-lg px-3 py-1.5 text-sm font-medium cursor-pointer"
            style={{
              background: "var(--panel)",
              color: "var(--ink)",
              border: "1px solid var(--line)",
            }}
          >
            {PROGRESSIONS.map((p, i) => (
              <option key={p.name} value={i}>{p.name}</option>
            ))}
          </select>
        </label>
      </div>

      <div
        className="rounded-xl p-4 mb-4"
        style={{ background: "var(--panel)", border: "1px solid var(--line)" }}
      >
        <p className="text-sm mb-3" style={{ color: "var(--muted)" }}>
          {progression.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-3">
          {resolvedChords.map((chord, i) => (
            <div
              key={`${chord.numeral}-${i}`}
              className="rounded-lg px-3 py-2 text-center min-w-[70px]"
              style={{ background: "var(--paper)", border: "1px solid var(--line)" }}
            >
              <p className="text-xs font-bold mb-0.5" style={{ color: "var(--accent)" }}>
                {chord.numeral}
              </p>
              <p className="text-sm font-semibold" style={{ color: "var(--ink)" }}>
                {chord.name}
                <span className="text-xs font-normal" style={{ color: "var(--muted)" }}>
                  {chord.quality === "minor" ? "m" : chord.quality === "diminished" ? "dim" : chord.quality === "dominant7" ? "7" : ""}
                </span>
              </p>
              <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>
                {chord.notes}
              </p>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={handlePlay}
        className="rounded-lg px-4 py-2 text-sm font-medium cursor-pointer"
        style={{ background: "var(--accent)", color: "white", border: "none" }}
      >
        Play Progression
      </button>
    </section>
  );
}
