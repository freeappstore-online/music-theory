import { noteFrequency } from "../data/notes";

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    audioCtx = new AudioContext();
  }
  if (audioCtx.state === "suspended") {
    void audioCtx.resume();
  }
  return audioCtx;
}

interface PlayNoteOptions {
  /** Note index 0-11 (C=0) */
  noteIdx: number;
  /** Octave (default 4) */
  octave?: number;
  /** Duration in seconds (default 0.5) */
  duration?: number;
  /** Oscillator type (default "triangle") */
  waveform?: OscillatorType;
  /** Volume 0-1 (default 0.3) */
  volume?: number;
  /** Delay before starting in seconds (default 0) */
  delay?: number;
}

/**
 * Play a single note using Web Audio API with ADSR envelope.
 */
export function playNote(options: PlayNoteOptions): void {
  const {
    noteIdx,
    octave = 4,
    duration = 0.5,
    waveform = "triangle",
    volume = 0.3,
    delay = 0,
  } = options;

  const ctx = getAudioContext();
  const freq = noteFrequency(noteIdx, octave);

  const osc = ctx.createOscillator();
  const gainNode = ctx.createGain();

  osc.type = waveform;
  osc.frequency.setValueAtTime(freq, ctx.currentTime);

  // ADSR envelope
  const now = ctx.currentTime + delay;
  const attack = 0.02;
  const decay = 0.1;
  const sustain = volume * 0.7;
  const release = 0.15;

  gainNode.gain.setValueAtTime(0, now);
  gainNode.gain.linearRampToValueAtTime(volume, now + attack);
  gainNode.gain.linearRampToValueAtTime(sustain, now + attack + decay);
  gainNode.gain.setValueAtTime(sustain, now + duration - release);
  gainNode.gain.linearRampToValueAtTime(0, now + duration);

  osc.connect(gainNode);
  gainNode.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + duration + 0.01);
}

/**
 * Play multiple notes simultaneously (chord).
 */
export function playChord(
  noteIndices: number[],
  octave = 4,
  duration = 1.0,
): void {
  const vol = Math.min(0.3, 0.8 / noteIndices.length);
  for (const idx of noteIndices) {
    // For Add9 or notes > 11, handle octave overflow
    const actualOctave = octave + Math.floor(idx / 12);
    const actualIdx = ((idx % 12) + 12) % 12;
    playNote({ noteIdx: actualIdx, octave: actualOctave, duration, volume: vol });
  }
}

/**
 * Play a scale ascending or descending.
 */
export function playScale(
  noteIndices: number[],
  rootIdx: number,
  octave = 4,
  direction: "ascending" | "descending" = "ascending",
): void {
  const indices = direction === "descending" ? [...noteIndices].reverse() : noteIndices;
  const noteDuration = 0.4;
  const gap = 0.35;

  indices.forEach((idx, i) => {
    // Determine correct octave: notes below root go up an octave
    let noteOctave = octave;
    if (idx < rootIdx && direction === "ascending") {
      noteOctave = octave + 1;
    }
    if (direction === "descending" && idx < rootIdx) {
      noteOctave = octave + 1;
    }
    playNote({
      noteIdx: idx,
      octave: noteOctave,
      duration: noteDuration,
      delay: i * gap,
    });
  });
}

/**
 * Play a chord progression.
 */
export function playProgression(
  chords: { rootOffset: number; intervals: number[] }[],
  keyRootIdx: number,
  octave = 4,
  beatDuration = 0.8,
): void {
  chords.forEach((chord, i) => {
    const chordRoot = (keyRootIdx + chord.rootOffset) % 12;
    const vol = Math.min(0.25, 0.7 / chord.intervals.length);
    chord.intervals.forEach((interval) => {
      const noteIdx = (chordRoot + interval) % 12;
      const noteOctave = octave + Math.floor((chordRoot + interval) / 12);
      playNote({
        noteIdx,
        octave: noteOctave,
        duration: beatDuration * 0.9,
        volume: vol,
        delay: i * beatDuration,
      });
    });
  });
}

/**
 * Play two notes for interval training.
 */
export function playInterval(
  noteIdx1: number,
  noteIdx2: number,
  octave: number,
  mode: "melodic" | "harmonic",
): void {
  if (mode === "harmonic") {
    playNote({ noteIdx: noteIdx1, octave, duration: 1.0, volume: 0.25 });
    playNote({ noteIdx: noteIdx2, octave: noteIdx2 < noteIdx1 ? octave + 1 : octave, duration: 1.0, volume: 0.25 });
  } else {
    playNote({ noteIdx: noteIdx1, octave, duration: 0.6, volume: 0.3, delay: 0 });
    playNote({ noteIdx: noteIdx2, octave: noteIdx2 < noteIdx1 ? octave + 1 : octave, duration: 0.6, volume: 0.3, delay: 0.7 });
  }
}
