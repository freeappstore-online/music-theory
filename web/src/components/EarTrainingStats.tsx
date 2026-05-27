import { useState, useEffect } from "react";
import { INTERVAL_NAMES } from "../data/scales";
import { loadStats, resetStats, type EarTrainingStats as Stats } from "../lib/stats";

export default function EarTrainingStats() {
  const [stats, setStats] = useState<Stats>(loadStats);

  // Refresh stats on mount and when tab becomes visible
  useEffect(() => {
    const refresh = () => setStats(loadStats());
    document.addEventListener("visibilitychange", refresh);
    return () => document.removeEventListener("visibilitychange", refresh);
  }, []);

  const handleReset = () => {
    const cleared = resetStats();
    setStats(cleared);
  };

  if (stats.totalAttempts === 0) {
    return (
      <section>
        <h2 className="text-xl font-bold display-font mb-4" style={{ color: "var(--ink)" }}>
          Ear Training Stats
        </h2>
        <div
          className="rounded-xl p-8 text-center"
          style={{ background: "var(--panel)", border: "1px solid var(--line)" }}
        >
          <p className="text-3xl mb-2">🎵</p>
          <p className="text-sm font-medium" style={{ color: "var(--ink)" }}>
            No training data yet
          </p>
          <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>
            Complete interval training exercises to see your progress here.
          </p>
        </div>
      </section>
    );
  }

  const overallPct = Math.round((stats.totalCorrect / stats.totalAttempts) * 100);

  // Sort intervals by attempt count (most practiced first)
  const sortedIntervals = Array.from({ length: 12 }, (_, i) => ({
    interval: i,
    stats: stats.intervals[i],
  }))
    .filter((entry) => entry.stats && entry.stats.total > 0)
    .sort((a, b) => (b.stats?.total ?? 0) - (a.stats?.total ?? 0));

  return (
    <section>
      <h2 className="text-xl font-bold display-font mb-4" style={{ color: "var(--ink)" }}>
        Ear Training Stats
      </h2>

      {/* Overall summary */}
      <div
        className="rounded-xl p-4 mb-4"
        style={{ background: "var(--panel)", border: "1px solid var(--line)" }}
      >
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-2xl font-bold" style={{ color: "var(--ink)" }}>
              {overallPct}%
            </p>
            <p className="text-xs" style={{ color: "var(--muted)" }}>
              Overall accuracy ({stats.totalCorrect}/{stats.totalAttempts} correct)
            </p>
          </div>
          <button
            onClick={handleReset}
            className="text-xs rounded-lg px-3 py-1.5 cursor-pointer"
            style={{
              color: "var(--error)",
              background: "var(--paper)",
              border: "1px solid var(--line)",
            }}
          >
            Reset All
          </button>
        </div>

        {/* Progress bar */}
        <div
          className="w-full h-2 rounded-full overflow-hidden"
          style={{ background: "var(--line)" }}
        >
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{
              width: `${overallPct}%`,
              background: overallPct >= 70
                ? "var(--success)"
                : overallPct >= 40
                  ? "var(--warning)"
                  : "var(--error)",
            }}
          />
        </div>
      </div>

      {/* Per-interval breakdown */}
      <div
        className="rounded-xl p-4"
        style={{ background: "var(--panel)", border: "1px solid var(--line)" }}
      >
        <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--ink)" }}>
          Per-Interval Breakdown
        </h3>
        <div className="space-y-2">
          {sortedIntervals.map(({ interval, stats: iStats }) => {
            if (!iStats) return null;
            const pct = Math.round((iStats.correct / iStats.total) * 100);
            return (
              <div key={interval} className="flex items-center gap-3">
                <span
                  className="text-xs font-medium w-28 shrink-0"
                  style={{ color: "var(--ink)" }}
                >
                  {INTERVAL_NAMES[interval]}
                </span>
                <div
                  className="flex-1 h-4 rounded-full overflow-hidden"
                  style={{ background: "var(--line)" }}
                >
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${pct}%`,
                      background: pct >= 70
                        ? "var(--success)"
                        : pct >= 40
                          ? "var(--warning)"
                          : "var(--error)",
                    }}
                  />
                </div>
                <span
                  className="text-xs font-bold w-12 text-right"
                  style={{
                    color: pct >= 70
                      ? "var(--success)"
                      : pct >= 40
                        ? "var(--warning)"
                        : "var(--error)",
                  }}
                >
                  {pct}%
                </span>
                <span className="text-xs w-12 text-right" style={{ color: "var(--muted)" }}>
                  ({iStats.total})
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
