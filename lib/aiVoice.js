// TaskAura AI Voice Engine
// Pure, crystal-clear studio neural speech with zero background noise / whine

let currentUtterance = null;
let isPlayingGreeting = false;

/**
 * 1. Select the highest-quality Neural / Natural English Voice available on the machine
 */
export function selectBestAiVoice() {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return null;

  const voices = window.speechSynthesis.getVoices();
  if (!voices || voices.length === 0) return null;

  const enVoices = voices.filter(
    (v) => v.lang.startsWith("en") || v.lang.includes("US") || v.lang.includes("GB")
  );

  const candidatePool = enVoices.length > 0 ? enVoices : voices;

  const preferredNames = [
    "Google US English",
    "Microsoft Aria Online (Natural)",
    "Microsoft Jenny Online (Natural)",
    "Microsoft Guy Online (Natural)",
    "Samantha",
    "Karen",
    "Daniel",
    "Zira",
    "David",
    "Google UK English Female",
    "en-US",
  ];

  for (const name of preferredNames) {
    const match = candidatePool.find((v) =>
      v.name.toLowerCase().includes(name.toLowerCase())
    );
    if (match) return match;
  }

  return candidatePool[0];
}

/**
 * 2. Main Entry Point: Play the Crystal-Clear AI Welcome Voice (No background noise)
 */
export function playAiWelcomeVoice({ onStart, onEnd, onError } = {}) {
  if (typeof window === "undefined") return;

  if (!("speechSynthesis" in window)) {
    if (onError) onError(new Error("Speech synthesis not supported"));
    return;
  }

  // Workaround for Chrome's synthesis engine pause bug
  try {
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    }
    window.speechSynthesis.cancel();
  } catch (e) {}

  // Extended, comprehensive introductory script requested by user
  const scriptText =
    "Welcome to TaskAura, your intelligent AI-powered task management workspace. Plan projects, collaborate seamlessly with your team, and accelerate your productivity with real-time intelligence.";

  const utterance = new SpeechSynthesisUtterance(scriptText);
  currentUtterance = utterance;

  // Natural, crystal-clear delivery
  utterance.rate = 0.94; // Smooth, clear pacing
  utterance.pitch = 1.0; // Natural, clean pitch without robotic artifacts
  utterance.volume = 1.0;

  const voice = selectBestAiVoice();
  if (voice) {
    utterance.voice = voice;
  }

  utterance.onstart = () => {
    isPlayingGreeting = true;
    if (onStart) onStart();
  };

  utterance.onend = () => {
    isPlayingGreeting = false;
    currentUtterance = null;
    if (onEnd) onEnd();
  };

  utterance.onerror = (e) => {
    isPlayingGreeting = false;
    currentUtterance = null;
    if (onError) onError(e);
  };

  try {
    window.speechSynthesis.speak(utterance);

    // Chrome resume safety check to unpause stalled synthesis queues
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    }
  } catch (err) {
    if (onError) onError(err);
  }
}

/**
 * Stop any active AI voice
 */
export function stopAiWelcomeVoice() {
  if (typeof window === "undefined") return;
  if ("speechSynthesis" in window) {
    try {
      window.speechSynthesis.cancel();
    } catch (e) {}
  }
  isPlayingGreeting = false;
  currentUtterance = null;
}

export function isAiVoicePlaying() {
  return isPlayingGreeting;
}
