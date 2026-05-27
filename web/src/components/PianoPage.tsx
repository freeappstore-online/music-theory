import { useState } from "react";
import Piano from "./Piano";

export default function PianoPage() {
  const [octaves, setOctaves] = useState<2 | 4>(2);
  const [lastPlayed, setLastPlayed] = useState<string | null>(null);

  return (
    <section>
      <h2 className="text-xl font-bold display-font mb-4" style={{ color: "var(--ink)" }}>
        Interactive Piano
      </h2>

      <div className="flex flex-wrap items-center gap-3 mb-4">
        <button
          onClick={() => setOctaves(octaves === 2 ? 4 : 2)}
          className="rounded-lg px-3 py-1.5 text-sm font-medium cursor-pointer"
          style={{
            background: "var(--panel)",
            color: "var(--ink)",
            border: "1px solid var(--line)",
          }}
        >
          {octaves === 2 ? "Expand to 4 Octaves" : "Collapse to 2 Octaves"}
        </button>

        {lastPlayed && (
          <span className="text-sm" style={{ color: "var(--muted)" }}>
            Last played: <strong style={{ color: "var(--accent)" }}>{lastPlayed}</strong>
          </span>
        )}
      </div>

      <div
        className="rounded-xl p-4"
        style={{ background: "var(--panel)", border: "1px solid var(--line)" }}
      >
        <Piano
          octaves={octaves}
          startOctave={octaves === 2 ? 4 : 3}
          onKeyPress={(noteIdx, octave) => {
            const noteNames = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
            const name = noteNames[noteIdx];
            if (name) {
              setLastPlayed(`${name}${octave}`);
            }
          }}
        />
      </div>

      <div
        className="rounded-xl p-4 mt-4 space-y-2"
        style={{ background: "var(--panel)", border: "1px solid var(--line)" }}
      >
        <p className="text-sm font-semibold" style={{ color: "var(--ink)" }}>
          How to use
        </p>
        <ul className="text-xs space-y-1" style={{ color: "var(--muted)" }}>
          <li>Click or tap any key to hear its note</li>
          <li>Notes use equal temperament tuning (A4 = 440 Hz)</li>
          <li>Each semitone is the frequency multiplied by 2^(1/12)</li>
          <li>White keys are the natural notes (C D E F G A B)</li>
          <li>Black keys are sharps/flats (e.g., C#/Db)</li>
          <li>Toggle between 2 and 4 octaves for more range</li>
        </ul>
      </div>
    </section>
  );
}
