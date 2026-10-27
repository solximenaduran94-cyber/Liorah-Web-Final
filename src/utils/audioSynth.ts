/**
 * Audio Synthesizer for Invitation Music Demo
 * Uses Web Audio API to generate pleasant ambient acoustic harp/piano chords.
 * Zero external mp3 dependencies, works completely offline and instantly.
 */

let audioCtx: AudioContext | null = null;
let isPlaying = false;
let loopTimeout: number | null = null;

const MELODY_NOTES = [
  // Gentle romantic arpeggio chord frequencies (Hz) - D Major / F# Minor / G / A
  [293.66, 369.99, 440.0, 587.33], // D major
  [220.00, 277.18, 329.63, 440.00], // A major
  [246.94, 293.66, 369.99, 493.88], // B minor
  [196.00, 246.94, 293.66, 392.00], // G major
];

function playNote(freq: number, startTime: number, duration: number, gainNode: GainNode, ctx: AudioContext) {
  const osc = ctx.createOscillator();
  const noteGain = ctx.createGain();

  // Warm acoustic sine + triangle blend
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(freq, startTime);

  noteGain.gain.setValueAtTime(0.001, startTime);
  noteGain.gain.exponentialRampToValueAtTime(0.12, startTime + 0.05);
  noteGain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

  osc.connect(noteGain);
  noteGain.connect(gainNode);

  osc.start(startTime);
  osc.stop(startTime + duration);
}

export function startAmbientMusic(): boolean {
  if (isPlaying) return true;

  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!audioCtx) {
      audioCtx = new AudioContextClass();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const masterGain = audioCtx.createGain();
    masterGain.gain.setValueAtTime(0.4, audioCtx.currentTime);
    masterGain.connect(audioCtx.destination);

    isPlaying = true;
    let chordIndex = 0;

    const playChordLoop = () => {
      if (!isPlaying || !audioCtx) return;

      const chord = MELODY_NOTES[chordIndex % MELODY_NOTES.length];
      const now = audioCtx.currentTime;

      chord.forEach((freq, idx) => {
        playNote(freq, now + idx * 0.35, 2.2, masterGain, audioCtx!);
      });

      chordIndex++;
      loopTimeout = window.setTimeout(playChordLoop, 2600);
    };

    playChordLoop();
    return true;
  } catch (err) {
    console.warn('Web Audio could not start:', err);
    return false;
  }
}

export function stopAmbientMusic() {
  isPlaying = false;
  if (loopTimeout !== null) {
    clearTimeout(loopTimeout);
    loopTimeout = null;
  }
}

export function toggleAmbientMusic(): boolean {
  if (isPlaying) {
    stopAmbientMusic();
    return false;
  } else {
    return startAmbientMusic();
  }
}

/**
 * Plays a delicate luxury harp chime when opening/entering the invitation
 */
export function playInvitationOpenChime(): void {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!audioCtx) {
      audioCtx = new AudioContextClass();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const chimeGain = audioCtx.createGain();
    chimeGain.gain.setValueAtTime(0.2, audioCtx.currentTime);
    chimeGain.connect(audioCtx.destination);

    // Ascending warm chord: E5, G#5, B5, E6
    const notes = [659.25, 830.61, 987.77, 1318.51];
    const now = audioCtx.currentTime;

    notes.forEach((freq, idx) => {
      playNote(freq, now + idx * 0.12, 1.8, chimeGain, audioCtx!);
    });
  } catch (err) {
    console.warn('Could not play chime:', err);
  }
}

