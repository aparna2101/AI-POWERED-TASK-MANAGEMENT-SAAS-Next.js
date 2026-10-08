// TaskAura Audio Engine using pure Web Audio API synthesis
// Instant, zero-latency, 100% reliable with zero external file dependencies

let audioCtx = null;
let isSoundEnabled = false;

function getAudioContext() {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

export function initSoundState() {
  if (typeof window === "undefined") return true;
  const stored = localStorage.getItem("taskaura-sound-enabled");
  // Default to true so sound is audible out of the box unless explicitly muted
  isSoundEnabled = stored === null ? true : stored === "true";
  return isSoundEnabled;
}

export function toggleSoundState() {
  if (typeof window === "undefined") return false;
  isSoundEnabled = !isSoundEnabled;
  localStorage.setItem("taskaura-sound-enabled", isSoundEnabled ? "true" : "false");
  if (isSoundEnabled) {
    getAudioContext();
    playAiActivationSound();
  }
  return isSoundEnabled;
}

export function getIsSoundEnabled() {
  return isSoundEnabled;
}

// 1. Button Hover: Crisp, elegant subtle tick
export function playHoverSound() {
  if (!isSoundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const now = ctx.currentTime;

    osc.type = "sine";
    osc.frequency.setValueAtTime(1150, now);
    osc.frequency.exponentialRampToValueAtTime(600, now + 0.02);

    // Boosted volume for clear perception (0.08 vs 0.015)
    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.02);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.025);
  } catch (e) {}
}

// 2. Button Click: Punchy, tactile modern click (Audible on all speakers & mobile)
export function playClickSound() {
  if (!isSoundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // Resonant body click (820Hz -> 240Hz, clearly audible, boosted gain to 0.28)
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(820, now);
    osc.frequency.exponentialRampToValueAtTime(240, now + 0.04);

    gain.gain.setValueAtTime(0.28, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.05);

    // Snappy tactile transient pop (adds presence & crispness)
    const tickOsc = ctx.createOscillator();
    const tickGain = ctx.createGain();
    tickOsc.type = "triangle";
    tickOsc.frequency.setValueAtTime(1400, now);
    tickOsc.frequency.exponentialRampToValueAtTime(700, now + 0.015);

    tickGain.gain.setValueAtTime(0.12, now);
    tickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.015);

    tickOsc.connect(tickGain);
    tickGain.connect(ctx.destination);

    tickOsc.start(now);
    tickOsc.stop(now + 0.02);
  } catch (e) {}
}

// 3. Navigation: Rich transition chime
export function playNavSound() {
  if (!isSoundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const now = ctx.currentTime;

    osc.type = "triangle";
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.07);

    // Boosted volume (0.20 vs 0.03)
    gain.gain.setValueAtTime(0.20, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.08);
  } catch (e) {}
}

// 4. AI Activation: Futuristic AI activation chord (cyan/emerald harmonics)
export function playAiActivationSound() {
  if (!isSoundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const freqs = [440, 659.25, 880, 1318.5]; // A4, E5, A5, E6 futuristic chord

    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const start = now + idx * 0.045;

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, start);

      // Boosted volume (0.16 vs 0.035)
      gain.gain.setValueAtTime(0.16, start);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(start);
      osc.stop(start + 0.28);
    });
  } catch (e) {}
}

// 5. AI Response: Digital processing pulse
export function playAiProcessingSound() {
  if (!isSoundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(740, now);
    osc.frequency.exponentialRampToValueAtTime(960, now + 0.04);

    // Boosted volume (0.15 vs 0.02)
    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.045);
  } catch (e) {}
}

// 6. Task Completion: Resonant success chime
export function playSuccessSound() {
  if (!isSoundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6

    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const start = now + idx * 0.05;

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, start);

      // Boosted volume (0.18 vs 0.045)
      gain.gain.setValueAtTime(0.18, start);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.38);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(start);
      osc.stop(start + 0.40);
    });
  } catch (e) {}
}

// 7. Important CTA: Affirmative confirmation sound
export function playCtaConfirmSound() {
  if (!isSoundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.09);

    // Boosted volume (0.25 vs 0.05)
    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.10);
  } catch (e) {}
}
