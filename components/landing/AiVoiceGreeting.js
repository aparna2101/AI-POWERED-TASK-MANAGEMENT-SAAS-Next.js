"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Sparkles, RotateCcw, X, Radio } from "lucide-react";
import { playAiWelcomeVoice, stopAiWelcomeVoice } from "@/lib/aiVoice";

export default function AiVoiceGreeting() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [hasPlayedAloud, setHasPlayedAloud] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  
  const hasPlayedAloudRef = useRef(false);
  const isPlayingRef = useRef(false);
  const listenersAttachedRef = useRef(false);

  // Core trigger function
  const triggerVoice = useCallback(() => {
    if (hasPlayedAloudRef.current || isPlayingRef.current) return;

    isPlayingRef.current = true;

    playAiWelcomeVoice({
      onStart: () => {
        hasPlayedAloudRef.current = true;
        setHasPlayedAloud(true);
        setIsSpeaking(true);
        isPlayingRef.current = true;
        cleanupListeners();
      },
      onEnd: () => {
        setIsSpeaking(false);
        isPlayingRef.current = false;
      },
      onError: () => {
        setIsSpeaking(false);
        isPlayingRef.current = false;
      },
    });
  }, []);

  const cleanupListeners = useCallback(() => {
    if (!listenersAttachedRef.current || typeof window === "undefined") return;
    window.removeEventListener("pointerdown", handleInteraction);
    window.removeEventListener("click", handleInteraction);
    window.removeEventListener("scroll", handleInteraction);
    window.removeEventListener("wheel", handleInteraction);
    window.removeEventListener("touchstart", handleInteraction);
    window.removeEventListener("keydown", handleInteraction);
    listenersAttachedRef.current = false;
  }, []);

  const handleInteraction = useCallback(() => {
    if (!hasPlayedAloudRef.current) {
      triggerVoice();
    }
  }, [triggerVoice]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // 1. Pre-warm voices list for Web Speech API
    if ("speechSynthesis" in window) {
      window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
      };
    }

    // 2. Attach global interaction listeners for click anywhere, scroll, wheel, touch
    if (!hasPlayedAloudRef.current) {
      window.addEventListener("pointerdown", handleInteraction, { passive: true });
      window.addEventListener("click", handleInteraction, { passive: true });
      window.addEventListener("scroll", handleInteraction, { passive: true });
      window.addEventListener("wheel", handleInteraction, { passive: true });
      window.addEventListener("touchstart", handleInteraction, { passive: true });
      window.addEventListener("keydown", handleInteraction, { passive: true });
      listenersAttachedRef.current = true;
    }

    // 3. Try to auto-play after initial loading screen finishes (1.6s)
    const autoPlayTimer = setTimeout(() => {
      if (!hasPlayedAloudRef.current) {
        triggerVoice();
      }
    }, 1600);

    return () => {
      clearTimeout(autoPlayTimer);
      cleanupListeners();
      stopAiWelcomeVoice();
    };
  }, [handleInteraction, triggerVoice, cleanupListeners]);

  // Manual replay button
  const handleReplay = (e) => {
    if (e) e.stopPropagation();
    stopAiWelcomeVoice();
    setIsSpeaking(true);
    isPlayingRef.current = true;

    playAiWelcomeVoice({
      onStart: () => {
        setIsSpeaking(true);
        isPlayingRef.current = true;
      },
      onEnd: () => {
        setIsSpeaking(false);
        isPlayingRef.current = false;
      },
      onError: () => {
        setIsSpeaking(false);
        isPlayingRef.current = false;
      },
    });
  };

  const handleStop = (e) => {
    if (e) e.stopPropagation();
    stopAiWelcomeVoice();
    setIsSpeaking(false);
    isPlayingRef.current = false;
  };

  if (isDismissed) return null;

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 pointer-events-auto max-w-[calc(100vw-2rem)]">
      <AnimatePresence mode="wait">
        {/* State A: Speaking (Live 3D Holographic Audio Waveform Visualizer) */}
        {isSpeaking ? (
          <motion.div
            key="speaking-card"
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 15 }}
            className="flex items-center gap-2.5 sm:gap-3.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl bg-[#081734]/95 border-2 border-cyan-400/80 shadow-[0_0_35px_rgba(0,194,255,0.4)] backdrop-blur-xl text-white font-mono max-w-full"
          >
            {/* Live Holographic Audio Waveform Bars */}
            <div className="flex items-center gap-1 h-5 px-1 shrink-0">
              {[0.4, 0.9, 0.6, 1.0, 0.7, 0.3].map((height, i) => (
                <motion.span
                  key={i}
                  animate={{
                    scaleY: [height, 1.25, 0.25, height],
                  }}
                  transition={{
                    duration: 0.45,
                    repeat: Infinity,
                    repeatType: "mirror",
                    delay: i * 0.08,
                  }}
                  className="w-1 bg-gradient-to-t from-emerald-400 to-cyan-300 rounded-full origin-bottom"
                  style={{ height: "100%" }}
                />
              ))}
            </div>

            <div className="flex flex-col min-w-0 max-w-[160px] sm:max-w-xs">
              <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-cyan-300 tracking-wider">
                <Radio className="w-3 h-3 text-emerald-400 animate-pulse shrink-0" />
                <span>TaskAura AI Voice</span>
              </div>
              <span className="text-[11px] sm:text-xs font-semibold text-slate-100 font-sans tracking-tight truncate">
                &ldquo;Welcome to TaskAura, your intelligent AI workspace...&rdquo;
              </span>
            </div>

            <button
              onClick={handleStop}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-cyan-500/20 transition-colors ml-1 cursor-pointer"
              title="Stop voice"
              aria-label="Stop Voice"
            >
              <VolumeX className="w-4 h-4 text-rose-400" />
            </button>
          </motion.div>
        ) : !hasPlayedAloud ? (
          /* State B: Prompt shown if voice has not played yet */
          <motion.button
            key="unheard-prompt"
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 15 }}
            onClick={(e) => {
              e.stopPropagation();
              triggerVoice();
            }}
            className="group flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-[#081734]/95 border border-cyan-400/70 shadow-[0_0_25px_rgba(0,194,255,0.3)] backdrop-blur-xl text-slate-100 hover:text-white hover:border-cyan-300 transition-all cursor-pointer"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
            </span>
            <div className="flex items-center gap-1.5 font-mono text-xs">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 group-hover:rotate-12 transition-transform" />
              <span>Click to Hear AI Voice</span>
            </div>
          </motion.button>
        ) : (
          /* State C: Replay Pill (Once played aloud, allows user to replay anytime) */
          <motion.div
            key="replay-pill"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="flex items-center gap-1.5 p-1 rounded-2xl bg-[#08152c]/90 border border-cyan-500/30 backdrop-blur-xl shadow-lg"
          >
            <button
              onClick={handleReplay}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-cyan-950/60 hover:bg-cyan-900/60 text-cyan-300 hover:text-white border border-cyan-500/20 text-xs font-mono font-medium transition-all cursor-pointer group"
              title="Replay AI Voice Welcome"
            >
              <RotateCcw className="w-3.5 h-3.5 text-cyan-400 group-hover:-rotate-90 transition-transform" />
              <span>Replay AI Voice</span>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsDismissed(true);
              }}
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 transition-colors cursor-pointer"
              title="Dismiss"
              aria-label="Dismiss"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
