const STORAGE_KEY = "music-theory-ear-training-stats";

export interface IntervalStats {
  correct: number;
  total: number;
}

export interface EarTrainingStats {
  /** Key: interval semitones (0-11), value: stats */
  intervals: Record<number, IntervalStats>;
  totalCorrect: number;
  totalAttempts: number;
}

function getDefaultStats(): EarTrainingStats {
  return {
    intervals: {},
    totalCorrect: 0,
    totalAttempts: 0,
  };
}

export function loadStats(): EarTrainingStats {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultStats();
    return JSON.parse(raw) as EarTrainingStats;
  } catch {
    return getDefaultStats();
  }
}

export function saveStats(stats: EarTrainingStats): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
}

export function recordAnswer(
  intervalSemitones: number,
  correct: boolean,
): EarTrainingStats {
  const stats = loadStats();
  const existing = stats.intervals[intervalSemitones] ?? { correct: 0, total: 0 };
  existing.total += 1;
  if (correct) {
    existing.correct += 1;
    stats.totalCorrect += 1;
  }
  stats.totalAttempts += 1;
  stats.intervals[intervalSemitones] = existing;
  saveStats(stats);
  return stats;
}

export function resetStats(): EarTrainingStats {
  const stats = getDefaultStats();
  saveStats(stats);
  return stats;
}
