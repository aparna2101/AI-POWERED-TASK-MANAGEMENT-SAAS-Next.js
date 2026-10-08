"use client";

import { useState, useEffect } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { playClickSound, playHoverSound } from "@/lib/sound";

export const CHAPTERS = [
  { id: "hero", label: "Overview", num: "01" },
  { id: "stats", label: "Stats & Metrics", num: "02" },
  { id: "features", label: "Features", num: "03" },
  { id: "ai-copilot", label: "AI Copilot", num: "04" },
  { id: "showcase-3d", label: "3D Showcase", num: "05" },
  { id: "workspace", label: "Workspace", num: "06" },
  { id: "analytics", label: "Telemetry", num: "07" },
  { id: "pricing", label: "Pricing", num: "08" },
  { id: "faq", label: "Intelligence FAQ", num: "09" },
  { id: "cta", label: "Launchpad", num: "10" },
];

export default function SceneNavigator() {
  const [activeId, setActiveId] = useState("hero");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-40% 0px -40% 0px",
        threshold: 0,
      }
    );

    CHAPTERS.forEach((ch) => {
      const el = document.getElementById(ch.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const currentIndex = CHAPTERS.findIndex((c) => c.id === activeId);

  const scrollToChapter = (id) => {
    playClickSound();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      scrollToChapter(CHAPTERS[currentIndex - 1].id);
    }
  };

  const handleNext = () => {
    if (currentIndex < CHAPTERS.length - 1) {
      scrollToChapter(CHAPTERS[currentIndex + 1].id);
    }
  };

  return (
    <aside
      aria-label="Scene Navigator"
      className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-center gap-2 pointer-events-auto select-none"
    >
      {/* Up Arrow */}
      <button
        type="button"
        onClick={handlePrev}
        disabled={currentIndex === 0}
        onMouseEnter={playHoverSound}
        className={`w-7 h-7 rounded-full border flex items-center justify-center transition-all ${
          currentIndex === 0
            ? "opacity-20 border-slate-700 text-slate-500 cursor-not-allowed"
            : "border-cyan-500/40 bg-[#081426]/80 text-cyan-300 hover:bg-cyan-500/20 hover:scale-110 shadow-lg cursor-pointer"
        }`}
        title="Previous Section (Scroll Up)"
      >
        <ChevronUp className="w-4 h-4" />
      </button>

      {/* Chapter Indicator Dots */}
      <div className="flex flex-col items-center gap-2 py-3 px-2 rounded-full bg-[#081426]/75 backdrop-blur-xl border border-cyan-500/30 shadow-2xl">
        {CHAPTERS.map((ch, idx) => {
          const isActive = ch.id === activeId;
          return (
            <button
              key={ch.id}
              type="button"
              onClick={() => scrollToChapter(ch.id)}
              onMouseEnter={playHoverSound}
              className="group relative flex items-center justify-center w-5 h-5 cursor-pointer"
              aria-label={`Jump to ${ch.label}`}
            >
              {isActive ? (
                <span className="relative flex h-3.5 w-3.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-60"></span>
                  <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-gradient-to-r from-cyan-400 to-emerald-400 text-[8px] font-black text-[#050b1a] items-center justify-center">
                    {ch.num}
                  </span>
                </span>
              ) : (
                <span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-cyan-400 group-hover:scale-150 transition-all"></span>
              )}

              {/* Tooltip Label */}
              <span className="absolute right-7 px-2.5 py-1 rounded-md bg-[#0b192c] border border-cyan-500/40 text-cyan-300 text-[10px] font-mono whitespace-nowrap shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-all translate-x-2 group-hover:translate-x-0">
                {ch.num} // {ch.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Down Arrow */}
      <button
        type="button"
        onClick={handleNext}
        disabled={currentIndex === CHAPTERS.length - 1}
        onMouseEnter={playHoverSound}
        className={`w-7 h-7 rounded-full border flex items-center justify-center transition-all ${
          currentIndex === CHAPTERS.length - 1
            ? "opacity-20 border-slate-700 text-slate-500 cursor-not-allowed"
            : "border-cyan-500/40 bg-[#081426]/80 text-cyan-300 hover:bg-cyan-500/20 hover:scale-110 shadow-lg cursor-pointer"
        }`}
        title="Next Section (Scroll Down)"
      >
        <ChevronDown className="w-4 h-4" />
      </button>
    </aside>
  );
}
