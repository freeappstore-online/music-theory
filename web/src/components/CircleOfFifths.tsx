import { useState, useMemo } from "react";
import { CIRCLE_OF_FIFTHS_MAJOR, CIRCLE_OF_FIFTHS_MINOR, MAJOR_KEY_CHORDS, KEY_SIGNATURES } from "../data/keys";
import { noteIndex, NOTE_NAMES } from "../data/notes";
import { getScaleNotes } from "../data/scales";

export default function CircleOfFifths() {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [rotation, setRotation] = useState(0);

  const selectedKey = selectedIdx !== null ? CIRCLE_OF_FIFTHS_MAJOR[selectedIdx] : null;
  const selectedMinor = selectedIdx !== null ? CIRCLE_OF_FIFTHS_MINOR[selectedIdx] : null;

  // Scale notes for selected key
  const scaleNotes = useMemo(() => {
    if (selectedKey == null) return [];
    const rootIdx = noteIndex(selectedKey);
    return getScaleNotes(rootIdx, [0, 2, 4, 5, 7, 9, 11]); // Major scale
  }, [selectedKey]);

  // Common chords (I-IV-V-vi)
  const commonChords = useMemo(() => {
    if (selectedKey == null) return [];
    const rootIdx = noteIndex(selectedKey);
    const chordRoots = [
      { numeral: "I", offset: 0 },
      { numeral: "IV", offset: 5 },
      { numeral: "V", offset: 7 },
      { numeral: "vi", offset: 9 },
    ];
    return chordRoots.map((c) => ({
      numeral: c.numeral,
      root: NOTE_NAMES[(rootIdx + c.offset) % 12]!,
    }));
  }, [selectedKey]);

  // Key signature info
  const keySigInfo = useMemo(() => {
    if (selectedKey == null) return null;
    return KEY_SIGNATURES.find((ks) => ks.major === selectedKey) ?? null;
  }, [selectedKey]);

  const handleSelect = (idx: number) => {
    setSelectedIdx(idx);
    // Rotate so selected key is at top
    setRotation(-idx * 30);
  };

  const cx = 200;
  const cy = 200;
  const outerR = 160;
  const innerR = 110;

  return (
    <section>
      <h2 className="text-xl font-bold display-font mb-4" style={{ color: "var(--ink)" }}>
        Circle of Fifths
      </h2>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Circle SVG */}
        <div
          className="rounded-xl p-4 flex-shrink-0 flex items-center justify-center"
          style={{ background: "var(--panel)", border: "1px solid var(--line)" }}
        >
          <svg viewBox="0 0 400 400" width={360} height={360} style={{ maxWidth: "100%", height: "auto" }}>
            <g className="cof-rotate" style={{ transform: `rotate(${rotation}deg)`, transformOrigin: `${cx}px ${cy}px` }}>
              {/* Outer ring: major keys */}
              {CIRCLE_OF_FIFTHS_MAJOR.map((key, i) => {
                const angle = (i * 30 - 90) * (Math.PI / 180);
                const x = cx + outerR * Math.cos(angle);
                const y = cy + outerR * Math.sin(angle);
                const isSelected = selectedIdx === i;

                return (
                  <g key={`major-${key}`} onClick={() => handleSelect(i)} className="cursor-pointer">
                    <circle
                      cx={x}
                      cy={y}
                      r={22}
                      fill={isSelected ? "var(--accent)" : "var(--paper)"}
                      stroke={isSelected ? "var(--accent)" : "var(--line-strong)"}
                      strokeWidth={2}
                    />
                    <text
                      x={x}
                      y={y + 1}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fontSize={14}
                      fontWeight={700}
                      fill={isSelected ? "white" : "var(--ink)"}
                      fontFamily="Manrope, system-ui, sans-serif"
                      style={{ transform: `rotate(${-rotation}deg)`, transformOrigin: `${x}px ${y}px` }}
                    >
                      {key}
                    </text>
                  </g>
                );
              })}

              {/* Inner ring: minor keys */}
              {CIRCLE_OF_FIFTHS_MINOR.map((key, i) => {
                const angle = (i * 30 - 90) * (Math.PI / 180);
                const x = cx + innerR * Math.cos(angle);
                const y = cy + innerR * Math.sin(angle);
                const isSelected = selectedIdx === i;

                return (
                  <g key={`minor-${key}`} onClick={() => handleSelect(i)} className="cursor-pointer">
                    <circle
                      cx={x}
                      cy={y}
                      r={18}
                      fill={isSelected ? "var(--accent)" : "var(--panel)"}
                      stroke={isSelected ? "var(--accent)" : "var(--line)"}
                      strokeWidth={1.5}
                      opacity={0.9}
                    />
                    <text
                      x={x}
                      y={y + 1}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fontSize={11}
                      fontWeight={500}
                      fill={isSelected ? "white" : "var(--muted)"}
                      fontFamily="Manrope, system-ui, sans-serif"
                      style={{ transform: `rotate(${-rotation}deg)`, transformOrigin: `${x}px ${y}px` }}
                    >
                      {key}
                    </text>
                  </g>
                );
              })}

              {/* Center label */}
              <text
                x={cx}
                y={cy - 8}
                textAnchor="middle"
                fontSize={10}
                fill="var(--muted)"
                fontFamily="Manrope, system-ui, sans-serif"
                style={{ transform: `rotate(${-rotation}deg)`, transformOrigin: `${cx}px ${cy}px` }}
              >
                Circle of
              </text>
              <text
                x={cx}
                y={cy + 8}
                textAnchor="middle"
                fontSize={10}
                fill="var(--muted)"
                fontFamily="Manrope, system-ui, sans-serif"
                style={{ transform: `rotate(${-rotation}deg)`, transformOrigin: `${cx}px ${cy}px` }}
              >
                Fifths
              </text>
            </g>
          </svg>
        </div>

        {/* Info panel */}
        {selectedKey != null && (
          <div
            className="rounded-xl p-4 flex-1 space-y-3"
            style={{ background: "var(--panel)", border: "1px solid var(--line)" }}
          >
            <h3 className="text-lg font-bold" style={{ color: "var(--ink)" }}>
              {selectedKey} Major / {selectedMinor}
            </h3>

            {keySigInfo && (
              <p className="text-sm" style={{ color: "var(--muted)" }}>
                {keySigInfo.sharps > 0
                  ? `${keySigInfo.sharps} sharp${keySigInfo.sharps > 1 ? "s" : ""}: ${keySigInfo.accidentals}`
                  : keySigInfo.flats > 0
                    ? `${keySigInfo.flats} flat${keySigInfo.flats > 1 ? "s" : ""}: ${keySigInfo.accidentals}`
                    : "No sharps or flats"}
              </p>
            )}

            <div>
              <p className="text-sm font-medium mb-1" style={{ color: "var(--ink)" }}>
                Scale Notes
              </p>
              <div className="flex flex-wrap gap-1.5">
                {scaleNotes.map((noteIdx, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-xs font-bold"
                    style={{
                      background: i === 0 ? "var(--accent)" : "var(--paper)",
                      color: i === 0 ? "white" : "var(--ink)",
                      border: `1px solid ${i === 0 ? "var(--accent)" : "var(--line)"}`,
                    }}
                  >
                    {NOTE_NAMES[noteIdx]}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-medium mb-1" style={{ color: "var(--ink)" }}>
                Common Chords (I - IV - V - vi)
              </p>
              <div className="flex flex-wrap gap-2">
                {commonChords.map((c) => (
                  <div
                    key={c.numeral}
                    className="rounded-lg px-3 py-2 text-center"
                    style={{ background: "var(--paper)", border: "1px solid var(--line)" }}
                  >
                    <p className="text-xs font-bold" style={{ color: "var(--accent)" }}>
                      {c.numeral}
                    </p>
                    <p className="text-sm font-semibold" style={{ color: "var(--ink)" }}>
                      {c.root}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-medium mb-1" style={{ color: "var(--ink)" }}>
                Diatonic Chords
              </p>
              <div className="flex flex-wrap gap-1.5">
                {MAJOR_KEY_CHORDS.map((chord) => (
                  <span
                    key={chord.numeral}
                    className="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium"
                    style={{ background: "var(--paper)", color: "var(--ink)", border: "1px solid var(--line)" }}
                  >
                    {chord.numeral} ({chord.quality})
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {selectedKey == null && (
          <div
            className="rounded-xl p-6 flex-1 flex items-center justify-center"
            style={{ background: "var(--panel)", border: "1px solid var(--line)" }}
          >
            <p className="text-sm" style={{ color: "var(--muted)" }}>
              Click a key on the circle to see its scale, chords, and relative minor/major.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
