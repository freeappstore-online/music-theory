import { useState, useCallback, useMemo } from "react";
import { NOTE_NAMES } from "../data/notes";
import { INTERVAL_NAMES } from "../data/scales";
import { playInterval } from "../lib/audio";
import { recordAnswer, loadStats, resetStats, type EarTrainingStats } from "../lib/stats";

export default function IntervalTrainer() {
  const [mode, setMode] = useState<"melodic" | "harmonic">("melodic");
  const [currentQuestion, setCurrentQuestion] = useState<{
    baseNote: number;
    interval: number;
  } | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [stats, setStats] = useState<EarTrainingStats>(loadStats);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  const generateQuestion = useCallback(() => {
    const baseNote = Math.floor(Math.random() * 12);
    const interval = Math.floor(Math.random() * 12); // 0-11 semitones
    setCurrentQuestion({ baseNote, interval });
    setSelectedAnswer(null);
    setIsCorrect(null);

    // Play the interval
    const secondNote = (baseNote + interval) % 12;
    playInterval(baseNote, secondNote, 4, mode);
  }, [mode]);

  const replayInterval = useCallback(() => {
    if (!currentQuestion) return;
    const secondNote = (currentQuestion.baseNote + currentQuestion.interval) % 12;
    playInterval(currentQuestion.baseNote, secondNote, 4, mode);
  }, [currentQuestion, mode]);

  const checkAnswer = useCallback(
    (answer: number) => {
      if (!currentQuestion || selectedAnswer !== null) return;
      const correct = answer === currentQuestion.interval;
      setSelectedAnswer(answer);
      setIsCorrect(correct);
      setScore((prev) => ({
        correct: prev.correct + (correct ? 1 : 0),
        total: prev.total + 1,
      }));
      const updated = recordAnswer(currentQuestion.interval, correct);
      setStats(updated);
    },
    [currentQuestion, selectedAnswer],
  );

  const handleReset = useCallback(() => {
    const updated = resetStats();
    setStats(updated);
    setScore({ correct: 0, total: 0 });
    setCurrentQuestion(null);
    setSelectedAnswer(null);
    setIsCorrect(null);
  }, []);

  // Generate answer choices: all 12 intervals
  const choices = useMemo(
    () => Array.from({ length: 12 }, (_, i) => i),
    [],
  );

  return (
    <section>
      <h2 className="text-xl font-bold display-font mb-4" style={{ color: "var(--ink)" }}>
        Interval Trainer
      </h2>

      <div className="flex flex-wrap items-center gap-3 mb-4">
        <div className="flex rounded-lg overflow-hidden" style={{ border: "1px solid var(--line)" }}>
          <button
            onClick={() => setMode("melodic")}
            className="px-3 py-1.5 text-sm font-medium cursor-pointer"
            style={{
              background: mode === "melodic" ? "var(--accent)" : "var(--panel)",
              color: mode === "melodic" ? "white" : "var(--ink)",
              border: "none",
            }}
          >
            Melodic
          </button>
          <button
            onClick={() => setMode("harmonic")}
            className="px-3 py-1.5 text-sm font-medium cursor-pointer"
            style={{
              background: mode === "harmonic" ? "var(--accent)" : "var(--panel)",
              color: mode === "harmonic" ? "white" : "var(--ink)",
              border: "none",
            }}
          >
            Harmonic
          </button>
        </div>

        <span className="text-sm" style={{ color: "var(--muted)" }}>
          Score: {score.correct}/{score.total}
          {score.total > 0 && (
            <> ({Math.round((score.correct / score.total) * 100)}%)</>
          )}
        </span>
      </div>

      {/* Current question */}
      <div
        className="rounded-xl p-6 mb-4 text-center"
        style={{ background: "var(--panel)", border: "1px solid var(--line)" }}
      >
        {!currentQuestion ? (
          <div>
            <p className="text-sm mb-4" style={{ color: "var(--muted)" }}>
              Listen to two notes and identify the interval between them.
            </p>
            <button
              onClick={generateQuestion}
              className="rounded-lg px-6 py-2.5 text-sm font-semibold cursor-pointer"
              style={{ background: "var(--accent)", color: "white", border: "none" }}
            >
              Start Training
            </button>
          </div>
        ) : (
          <div>
            {currentQuestion && (
              <p className="text-xs mb-1" style={{ color: "var(--muted)" }}>
                Base note: {NOTE_NAMES[currentQuestion.baseNote]}
              </p>
            )}
            <p className="text-lg font-semibold mb-4" style={{ color: "var(--ink)" }}>
              What interval do you hear?
            </p>

            <div className="flex gap-2 justify-center mb-4">
              <button
                onClick={replayInterval}
                className="rounded-lg px-4 py-2 text-sm font-medium cursor-pointer"
                style={{ background: "var(--accent)", color: "white", border: "none" }}
              >
                Replay
              </button>
            </div>

            {/* Answer grid */}
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-w-md mx-auto mb-4">
              {choices.map((interval) => {
                let bg = "var(--paper)";
                let color = "var(--ink)";
                let borderColor = "var(--line)";

                if (selectedAnswer !== null) {
                  if (interval === currentQuestion.interval) {
                    bg = "var(--success)";
                    color = "white";
                    borderColor = "var(--success)";
                  } else if (interval === selectedAnswer && !isCorrect) {
                    bg = "var(--error)";
                    color = "white";
                    borderColor = "var(--error)";
                  }
                }

                return (
                  <button
                    key={interval}
                    onClick={() => checkAnswer(interval)}
                    disabled={selectedAnswer !== null}
                    className="rounded-lg px-2 py-2 text-xs font-medium cursor-pointer disabled:cursor-default"
                    style={{
                      background: bg,
                      color,
                      border: `1px solid ${borderColor}`,
                    }}
                  >
                    {INTERVAL_NAMES[interval]}
                  </button>
                );
              })}
            </div>

            {selectedAnswer !== null && (
              <div className="space-y-2">
                <p
                  className="text-sm font-semibold"
                  style={{ color: isCorrect ? "var(--success)" : "var(--error)" }}
                >
                  {isCorrect ? "Correct!" : `Incorrect. The answer was ${INTERVAL_NAMES[currentQuestion.interval]}`}
                </p>
                <button
                  onClick={generateQuestion}
                  className="rounded-lg px-4 py-2 text-sm font-medium cursor-pointer"
                  style={{ background: "var(--accent)", color: "white", border: "none" }}
                >
                  Next Question
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Stats summary */}
      {stats.totalAttempts > 0 && (
        <div
          className="rounded-xl p-4"
          style={{ background: "var(--panel)", border: "1px solid var(--line)" }}
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold" style={{ color: "var(--ink)" }}>
              Accuracy by Interval
            </h3>
            <button
              onClick={handleReset}
              className="text-xs cursor-pointer"
              style={{ color: "var(--error)", background: "none", border: "none" }}
            >
              Reset Stats
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {Array.from({ length: 12 }, (_, i) => {
              const intervalStats = stats.intervals[i];
              if (!intervalStats || intervalStats.total === 0) return null;
              const pct = Math.round((intervalStats.correct / intervalStats.total) * 100);
              return (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-lg px-3 py-1.5"
                  style={{ background: "var(--paper)", border: "1px solid var(--line)" }}
                >
                  <span className="text-xs font-medium" style={{ color: "var(--ink)" }}>
                    {INTERVAL_NAMES[i]}
                  </span>
                  <span
                    className="text-xs font-bold"
                    style={{ color: pct >= 70 ? "var(--success)" : pct >= 40 ? "var(--warning)" : "var(--error)" }}
                  >
                    {pct}%
                  </span>
                </div>
              );
            })}
          </div>
          <p className="text-xs mt-2" style={{ color: "var(--muted)" }}>
            Overall: {stats.totalCorrect}/{stats.totalAttempts} (
            {Math.round((stats.totalCorrect / stats.totalAttempts) * 100)}%)
          </p>
        </div>
      )}
    </section>
  );
}
