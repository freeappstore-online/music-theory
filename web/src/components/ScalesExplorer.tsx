import { useState, useMemo } from "react";
import { NOTE_NAMES, noteIndex } from "../data/notes";
import { SCALES, SHORT_INTERVAL_NAMES, getScaleNotes } from "../data/scales";
import { playScale } from "../lib/audio";
import Piano from "./Piano";
import NoteSelector from "./NoteSelector";

export default function ScalesExplorer() {
  const [root, setRoot] = useState("C");
  const [scaleIdx, setScaleIdx] = useState(0);
  const [octaves, setOctaves] = useState<2 | 4>(2);

  const scale = SCALES[scaleIdx]!;
  const rootIdx = noteIndex(root);
  const scaleNotes = useMemo(() => getScaleNotes(rootIdx, scale.intervals), [rootIdx, scale]);
  const highlighted = useMemo(() => new Set(scaleNotes), [scaleNotes]);

  const intervalPattern = scale.intervals.map((i) => SHORT_INTERVAL_NAMES[i]!).join(" - ");
  const noteNames = scaleNotes.map((idx) => NOTE_NAMES[idx]!).join(" - ");

  return (
    <section>
      <h2 className="text-xl font-bold display-font mb-4" style={{ color: "var(--ink)" }}>
        Scales Explorer
      </h2>

      <div className="flex flex-wrap items-center gap-3 mb-4">
        <NoteSelector value={root} onChange={setRoot} />

        <label className="flex items-center gap-2">
          <span className="text-sm font-medium" style={{ color: "var(--muted)" }}>Scale</span>
          <select
            value={scaleIdx}
            onChange={(e) => setScaleIdx(Number(e.target.value))}
            className="rounded-lg px-3 py-1.5 text-sm font-medium cursor-pointer"
            style={{
              background: "var(--panel)",
              color: "var(--ink)",
              border: "1px solid var(--line)",
            }}
          >
            {SCALES.map((s, i) => (
              <option key={s.name} value={i}>{s.name}</option>
            ))}
          </select>
        </label>

        <button
          onClick={() => setOctaves(octaves === 2 ? 4 : 2)}
          className="rounded-lg px-3 py-1.5 text-xs font-medium cursor-pointer"
          style={{
            background: "var(--panel)",
            color: "var(--ink)",
            border: "1px solid var(--line)",
          }}
        >
          {octaves} Octaves
        </button>
      </div>

      <div
        className="rounded-xl p-4 mb-4"
        style={{ background: "var(--panel)", border: "1px solid var(--line)" }}
      >
        <Piano octaves={octaves} highlightedNotes={highlighted} startOctave={4} />
      </div>

      <div
        className="rounded-xl p-4 mb-4 space-y-2"
        style={{ background: "var(--panel)", border: "1px solid var(--line)" }}
      >
        <p className="text-sm" style={{ color: "var(--ink)" }}>
          <span className="font-semibold">{root} {scale.name}:</span>{" "}
          <span style={{ color: "var(--muted)" }}>{scale.description}</span>
        </p>
        <p className="text-sm" style={{ color: "var(--ink)" }}>
          <span className="font-medium">Notes:</span>{" "}
          <span className="font-mono text-xs" style={{ color: "var(--accent)" }}>{noteNames}</span>
        </p>
        <p className="text-sm" style={{ color: "var(--ink)" }}>
          <span className="font-medium">Intervals:</span>{" "}
          <span className="font-mono text-xs" style={{ color: "var(--muted)" }}>{intervalPattern}</span>
        </p>

        {/* Staff notation placeholder: note names on lines */}
        <div className="mt-3">
          <p className="text-xs font-medium mb-2" style={{ color: "var(--muted)" }}>
            Staff View
          </p>
          <div className="relative h-20 overflow-x-auto">
            {/* Staff lines */}
            {[0, 1, 2, 3, 4].map((line) => (
              <div
                key={line}
                className="absolute w-full h-px"
                style={{ top: `${12 + line * 14}px`, background: "var(--line-strong)" }}
              />
            ))}
            {/* Note markers */}
            <div className="relative flex items-end h-full gap-4 px-4 pb-1">
              {scaleNotes.map((noteIdx, i) => {
                // Map note to a vertical position (simplified: use note index)
                const yPos = 60 - (noteIdx * 3.5);
                return (
                  <div
                    key={i}
                    className="flex flex-col items-center"
                    style={{ position: "relative" }}
                  >
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold"
                      style={{
                        background: "var(--accent)",
                        position: "absolute",
                        bottom: `${yPos}px`,
                      }}
                    >
                      {NOTE_NAMES[noteIdx]}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => playScale(scaleNotes, rootIdx, 4, "ascending")}
          className="rounded-lg px-4 py-2 text-sm font-medium cursor-pointer"
          style={{ background: "var(--accent)", color: "white", border: "none" }}
        >
          Play Ascending
        </button>
        <button
          onClick={() => playScale(scaleNotes, rootIdx, 4, "descending")}
          className="rounded-lg px-4 py-2 text-sm font-medium cursor-pointer"
          style={{
            background: "var(--panel)",
            color: "var(--ink)",
            border: "1px solid var(--line)",
          }}
        >
          Play Descending
        </button>
      </div>
    </section>
  );
}
