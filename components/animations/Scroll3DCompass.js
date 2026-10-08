"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Compass, Sparkles, Layers } from "lucide-react";

const SECTIONS = [
  { id: "hero", label: "Core" },
  { id: "features", label: "Features" },
  { id: "ai-copilot", label: "AI Copilot" },
  { id: "workspace", label: "Workspace" },
  { id: "analytics", label: "Telemetry" },
  { id: "pricing", label: "Pricing" },
];

export default function Scroll3DCompass() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const [scrollDepth, setScrollDepth] = useState(0);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrollDepth(Math.round(scrollY));

      // Detect active section
      for (const section of SECTIONS) {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 300 && rect.bottom >= 200) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <aside aria-label="3D Scroll Navigation" className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-3 pointer-events-none select-none">
      {/* 3D Depth Telemetry Chip */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="pointer-events-auto rounded-full border border-cyan-500/30 bg-[#081426]/90 px-2.5 py-1 text-[9px] font-mono font-bold text-cyan-300 shadow-xl shadow-cyan-950/60 backdrop-blur-xl flex items-center gap-1.5"
      >
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-400" />
        </span>
        <span>{scrollDepth}px</span>
      </motion.div>

      {/* 3D Track Line with Spring Progress */}
      <div className="relative w-1 h-36 rounded-full bg-slate-800/80 border border-slate-700/50 overflow-hidden shadow-inner">
        <motion.div
          style={{ scaleY, transformOrigin: "top" }}
          className="w-full h-full bg-gradient-to-b from-cyan-400 via-teal-400 to-emerald-400 shadow-[0_0_12px_rgba(0,194,255,0.8)]"
        />
      </div>

      {/* Section Node Pips */}
      <div className="flex flex-col gap-2.5 pointer-events-auto">
        {SECTIONS.map((sec) => {
          const isActive = activeSection === sec.id;
          return (
            <button
              key={sec.id}
              onClick={() => scrollTo(sec.id)}
              className="group relative flex items-center justify-end cursor-pointer"
              title={sec.label}
            >
              {/* Tooltip Label on Hover */}
              <span className="absolute right-5 text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-[#081426]/95 border border-cyan-500/40 text-cyan-300 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
                {sec.label}
              </span>

              {/* Pip Dot */}
              <span
                className={`h-2 rounded-full transition-all duration-300 ${
                  isActive
                    ? "w-4 bg-gradient-to-r from-cyan-400 to-emerald-400 shadow-[0_0_8px_rgba(0,194,255,0.9)]"
                    : "w-2 bg-slate-600 hover:bg-cyan-400 hover:scale-125"
                }`}
              />
            </button>
          );
        })}
      </div>
    </aside>
  );
}
