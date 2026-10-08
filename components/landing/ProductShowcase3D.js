"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Layers,
  Sparkles,
  Bot,
  Kanban,
  BarChart3,
  Users2,
  Maximize2,
  CheckCircle2,
  Zap,
  Activity,
  Cpu,
  ArrowUpRight,
  Radio,
} from "lucide-react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { playClickSound, playHoverSound } from "@/lib/sound";

export default function ProductShowcase3D({ onOpenAuth }) {
  const [isAssembled, setIsAssembled] = useState(false);

  const toggleAssemble = () => {
    playClickSound();
    setIsAssembled(!isAssembled);
  };

  return (
    <section
      id="showcase-3d"
      className="relative py-14 sm:py-18 bg-[#050b1a] text-white overflow-hidden border-y border-cyan-500/20"
    >
      {/* Background Cyber Mesh & Dynamic Ambient Glows */}
      <div className="absolute inset-0 bg-grid-cyber-dark opacity-30 pointer-events-none" />
      <div className="aura-glow-cyan top-1/4 left-1/4 w-[500px] h-[500px] pointer-events-none opacity-40" />
      <div className="aura-glow-emerald bottom-1/4 right-1/4 w-[500px] h-[500px] pointer-events-none opacity-30" />

      {/* Moving Dual Orbital Laser Rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 35, ease: "linear" }}
          className="w-[680px] h-[680px] rounded-full border border-cyan-400/30 border-dashed"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
          className="absolute w-[480px] h-[480px] rounded-full border border-emerald-400/30"
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.35, 0.15] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          className="absolute w-[300px] h-[300px] rounded-full bg-cyan-500/20 blur-3xl"
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <ScrollReveal>
            <Badge variant="dark" size="md" icon={Layers} className="mb-3">
              3D Spatial Workspace
            </Badge>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-[1.1]">
              Everything <span className="gradient-text-aura">Connected.</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <p className="mt-3 text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed">
              Every sprint milestone, AI agent, telemetry curve, and teammate coexists in a single continuous 3D workspace.
            </p>
          </ScrollReveal>

          {/* Interactive Mode Switch */}
          <div className="mt-5 flex items-center justify-center gap-3">
            <Button
              variant="aura"
              size="sm"
              onClick={toggleAssemble}
              icon={Maximize2}
              className="text-xs"
            >
              {isAssembled ? "Resume 3D Float" : "Dock Into Unified Hub"}
            </Button>
            <span className="text-[11px] text-cyan-300 font-mono flex items-center gap-1.5 bg-cyan-950/80 px-3 py-1 rounded-full border border-cyan-500/30">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping" />
              {isAssembled ? "Docked Mode Active" : "Continuous Spatial Flight Active"}
            </span>
          </div>
        </div>

        {/* 3D Floating Constellation with Continuous Smooth Motion */}
        <div className="relative min-h-[580px] sm:min-h-[620px] lg:min-h-[660px] flex items-center justify-center py-6">
          
          {/* Animated Laser Data Streams Linking Panels (SVG Overlay) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block opacity-40">
            <defs>
              <linearGradient id="streamGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00c2ff" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#00e599" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            <line x1="25%" y1="20%" x2="50%" y2="45%" stroke="url(#streamGrad1)" strokeWidth="1.5" strokeDasharray="4 6" />
            <line x1="75%" y1="20%" x2="50%" y2="45%" stroke="url(#streamGrad1)" strokeWidth="1.5" strokeDasharray="4 6" />
            <line x1="25%" y1="80%" x2="50%" y2="55%" stroke="url(#streamGrad1)" strokeWidth="1.5" strokeDasharray="4 6" />
            <line x1="75%" y1="80%" x2="50%" y2="55%" stroke="url(#streamGrad1)" strokeWidth="1.5" strokeDasharray="4 6" />
          </svg>

          <div className="relative w-full max-w-5xl flex items-center justify-center">

            {/* PANEL 1: Centerpiece - Core Dashboard (Floating & Sweeping Laser) */}
            <motion.div
              animate={
                isAssembled
                  ? { y: 0, scale: 1, rotateX: 0, rotateY: 0 }
                  : {
                      y: [0, -12, 0],
                      rotateX: [2, 0, 2],
                      rotateY: [-1, 1, -1],
                    }
              }
              transition={
                isAssembled
                  ? { duration: 0.5, ease: "easeOut" }
                  : { repeat: Infinity, duration: 5, ease: "easeInOut" }
              }
              onMouseEnter={playHoverSound}
              className="relative z-30 w-full max-w-md sm:max-w-lg rounded-3xl border border-cyan-400/50 bg-[#081426]/95 p-4 sm:p-7 shadow-[0_0_50px_rgba(0,194,255,0.2)] backdrop-blur-2xl ring-1 ring-cyan-400/30 overflow-hidden"
            >
              {/* Sweeping Cyan Scanning Laser */}
              <motion.div
                animate={{ top: ["-10%", "110%"] }}
                transition={{ repeat: Infinity, duration: 3.5, ease: "linear" }}
                className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-60 pointer-events-none"
              />

              <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-cyan-500/20">
                <div className="flex items-center gap-2.5">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400" />
                  </span>
                  <span className="text-xs font-black tracking-wider text-white uppercase font-mono">
                    Core Dashboard
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-500/40 font-mono">
                  <Radio className="w-3 h-3 animate-pulse" />
                  <span>Sprint 42 Live</span>
                </div>
              </div>

              {/* Sprint Completion Progress */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300 font-medium">Sprint Completion</span>
                  <motion.span
                    animate={{ opacity: [0.8, 1, 0.8] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="font-extrabold text-cyan-300 font-mono"
                  >
                    89.4%
                  </motion.span>
                </div>
                <div className="h-2.5 w-full rounded-full bg-slate-900 overflow-hidden border border-slate-800">
                  <motion.div
                    animate={{ width: ["84%", "91%", "84%"] }}
                    transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
                    className="h-full bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 rounded-full shadow-[0_0_12px_rgba(0,194,255,0.6)]"
                  />
                </div>
              </div>

              {/* Telemetry Stats */}
              <div className="mt-5 grid grid-cols-2 gap-2 sm:gap-3 text-xs">
                <div className="p-2.5 sm:p-3.5 rounded-2xl bg-cyan-950/60 border border-cyan-500/35">
                  <span className="text-[10px] text-cyan-300 font-mono font-bold tracking-wide">
                    VELOCITY
                  </span>
                  <p className="text-base sm:text-xl font-black text-white mt-1">+38% vs target</p>
                </div>
                <div className="p-2.5 sm:p-3.5 rounded-2xl bg-emerald-950/60 border border-emerald-500/35">
                  <span className="text-[10px] text-emerald-300 font-mono font-bold tracking-wide">
                    BLOCKERS
                  </span>
                  <p className="text-base sm:text-xl font-black text-emerald-400 mt-1">0 Pending</p>
                </div>
              </div>
            </motion.div>

            {/* PANEL 2: Top-Left - Autonomous AI Copilot (Moving Orbit) */}
            <motion.div
              animate={
                isAssembled
                  ? { x: -240, y: -130, scale: 0.92, rotateZ: 0 }
                  : {
                      x: [-290, -298, -290],
                      y: [-160, -182, -160],
                      rotateZ: [-2, 1, -2],
                      scale: 1,
                    }
              }
              transition={
                isAssembled
                  ? { duration: 0.5, ease: "easeOut" }
                  : { repeat: Infinity, duration: 5.6, ease: "easeInOut" }
              }
              onMouseEnter={playHoverSound}
              className="hidden xl:block absolute z-20 w-80 rounded-2xl border border-teal-500/40 bg-[#081426]/90 p-4 shadow-xl backdrop-blur-xl hover:border-teal-400 transition-colors"
            >
              <div className="flex items-center gap-2 mb-2 text-xs font-bold text-teal-300">
                <div className="p-1 rounded-md bg-teal-950 border border-teal-500/30">
                  <Bot className="w-4 h-4 text-cyan-400 animate-pulse" />
                </div>
                <span>Autonomous AI Copilot</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                "API gateway throttle resolved automatically. Transferred 2 tasks to Marcus."
              </p>
              <div className="mt-2.5 flex items-center justify-between text-[10px] font-mono text-emerald-400">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Optimized at 14:02 UTC</span>
                </span>
                <span className="text-cyan-300">12ms sync</span>
              </div>
            </motion.div>

            {/* PANEL 3: Top-Right - Active Task Stream (Moving Orbit) */}
            <motion.div
              animate={
                isAssembled
                  ? { x: 240, y: -130, scale: 0.92, rotateZ: 0 }
                  : {
                      x: [290, 298, 290],
                      y: [-160, -142, -160],
                      rotateZ: [2, -1, 2],
                      scale: 1,
                    }
              }
              transition={
                isAssembled
                  ? { duration: 0.5, ease: "easeOut" }
                  : { repeat: Infinity, duration: 5.2, ease: "easeInOut" }
              }
              onMouseEnter={playHoverSound}
              className="hidden xl:block absolute z-20 w-80 rounded-2xl border border-cyan-500/40 bg-[#081426]/90 p-4 shadow-xl backdrop-blur-xl hover:border-cyan-400 transition-colors"
            >
              <div className="flex items-center gap-2 mb-2 text-xs font-bold text-cyan-300">
                <div className="p-1 rounded-md bg-cyan-950 border border-cyan-500/30">
                  <Kanban className="w-4 h-4 text-cyan-400" />
                </div>
                <span>Active Task Stream</span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="p-2 rounded-xl bg-slate-900/90 border border-slate-700/60 flex items-center justify-between">
                  <span className="font-semibold text-white">OAuth Passkeys</span>
                  <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30 font-mono">
                    Done
                  </span>
                </div>
                <div className="p-2 rounded-xl bg-slate-900/90 border border-slate-700/60 flex items-center justify-between">
                  <span className="font-semibold text-white">Stripe Webhook</span>
                  <span className="text-[10px] text-cyan-300 font-bold bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/30 font-mono">
                    Review
                  </span>
                </div>
              </div>
            </motion.div>

            {/* PANEL 4: Bottom-Left - Real-Time Throughput (Moving with Live Equalizer) */}
            <motion.div
              animate={
                isAssembled
                  ? { x: -240, y: 130, scale: 0.92, rotateZ: 0 }
                  : {
                      x: [-280, -274, -280],
                      y: [160, 180, 160],
                      rotateZ: [-1, 2, -1],
                      scale: 1,
                    }
              }
              transition={
                isAssembled
                  ? { duration: 0.5, ease: "easeOut" }
                  : { repeat: Infinity, duration: 6.2, ease: "easeInOut" }
              }
              onMouseEnter={playHoverSound}
              className="hidden xl:block absolute z-20 w-80 rounded-2xl border border-emerald-500/40 bg-[#081426]/90 p-4 shadow-xl backdrop-blur-xl hover:border-emerald-400 transition-colors"
            >
              <div className="flex items-center gap-2 mb-2 text-xs font-bold text-emerald-300">
                <div className="p-1 rounded-md bg-emerald-950 border border-emerald-500/30">
                  <BarChart3 className="w-4 h-4 text-emerald-400" />
                </div>
                <span>Real-Time Throughput</span>
              </div>
              {/* Dynamic Live Moving Equalizer Bars */}
              <div className="flex items-end gap-2 h-14 pt-2">
                {[42, 68, 88, 72, 98, 92].map((h, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      height: [`${h * 0.55}%`, `${h}%`, `${h * 0.7}%`],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.8 + i * 0.35,
                      ease: "easeInOut",
                    }}
                    className="flex-1 rounded-t-sm bg-gradient-to-t from-teal-500 to-emerald-400 shadow-sm"
                  />
                ))}
              </div>
              <span className="text-[10px] text-slate-400 font-mono mt-2 block">
                Peak Velocity: 4.8 PRs / Hour
              </span>
            </motion.div>

            {/* PANEL 5: Bottom-Right - Multiplayer Presence (Moving Orbit) */}
            <motion.div
              animate={
                isAssembled
                  ? { x: 240, y: 130, scale: 0.92, rotateZ: 0 }
                  : {
                      x: [280, 286, 280],
                      y: [160, 145, 160],
                      rotateZ: [1, -2, 1],
                      scale: 1,
                    }
              }
              transition={
                isAssembled
                  ? { duration: 0.5, ease: "easeOut" }
                  : { repeat: Infinity, duration: 5.8, ease: "easeInOut" }
              }
              onMouseEnter={playHoverSound}
              className="hidden xl:block absolute z-20 w-80 rounded-2xl border border-amber-500/40 bg-[#081426]/90 p-4 shadow-xl backdrop-blur-xl hover:border-amber-400 transition-colors"
            >
              <div className="flex items-center gap-2 mb-2 text-xs font-bold text-amber-300">
                <div className="p-1 rounded-md bg-amber-950 border border-amber-500/30">
                  <Users2 className="w-4 h-4 text-amber-400" />
                </div>
                <span>Multiplayer Presence</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  <div className="h-7 w-7 rounded-full bg-cyan-500 border-2 border-[#081426] flex items-center justify-center text-[10px] font-bold text-white shadow">
                    AK
                  </div>
                  <div className="h-7 w-7 rounded-full bg-emerald-500 border-2 border-[#081426] flex items-center justify-center text-[10px] font-bold text-white shadow">
                    ML
                  </div>
                  <div className="h-7 w-7 rounded-full bg-amber-500 border-2 border-[#081426] flex items-center justify-center text-[10px] font-bold text-white shadow">
                    ST
                  </div>
                </div>
                <div className="text-xs text-slate-300 font-medium flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>4 active in current sprint</span>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
