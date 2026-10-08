"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { STATS, TRUSTED_TEAMS } from "@/lib/constants";
import {
  FolderGit2,
  Cpu,
  Sparkles,
  Volume2,
  Activity,
  ArrowUpRight,
} from "lucide-react";

function CounterItem({ stat, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = stat.numericValue;
    if (end === 0) {
      setCount(0);
      return;
    }
    const duration = 1600;
    const incrementTime = 30;
    const steps = duration / incrementTime;
    const stepValue = end / steps;

    const timer = setInterval(() => {
      start += stepValue;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [isInView, stat.numericValue]);

  // Unique visual widgets for each engineering benchmark pod
  const renderVisualBadge = () => {
    if (index === 0) {
      // Pod 1: 60 FPS 3D Particle Rendering - GPU Accelerated
      return (
        <div className="flex items-center justify-between w-full mb-3">
          <div className="w-9 h-9 rounded-xl bg-cyan-50 border border-cyan-200/90 flex items-center justify-center text-cyan-700 shadow-xs">
            <Sparkles className="w-4.5 h-4.5" />
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-50 border border-cyan-200 text-cyan-800">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-500 animate-pulse" />
            GPU Accelerated
          </span>
        </div>
      );
    }

    if (index === 1) {
      // Pod 2: 0ms Audio Engine Latency - Native Web Audio Waveform
      return (
        <div className="flex items-center justify-between w-full mb-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200/90 flex items-center justify-center text-emerald-700 shadow-xs">
            <Volume2 className="w-4.5 h-4.5" />
          </div>
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-emerald-50 border border-emerald-200/80">
            <svg className="w-10 h-4" viewBox="0 0 40 16" fill="none">
              <path
                d="M2 8 L8 3 L14 13 L20 4 L26 11 L32 6 L38 8"
                stroke="#059669"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="38" cy="8" r="2" fill="#10b981" />
            </svg>
            <span className="text-[10px] font-mono font-bold text-emerald-800">Zero Lag</span>
          </div>
        </div>
      );
    }

    if (index === 2) {
      // Pod 3: 15+ Integrated SaaS Views - Next.js App Router
      return (
        <div className="flex items-center justify-between w-full mb-3">
          <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200/90 flex items-center justify-center text-amber-700 shadow-xs">
            <FolderGit2 className="w-4.5 h-4.5" />
          </div>
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-50 border border-amber-200 text-amber-800">
            <ArrowUpRight className="w-3 h-3 text-amber-600" />
            App Router
          </span>
        </div>
      );
    }

    // Pod 4: 100% Client-Side Neural Voice - Web Speech API
    return (
      <div className="flex items-center justify-between w-full mb-3">
        <div className="relative w-9 h-9 rounded-xl bg-teal-50 border border-teal-200/90 flex items-center justify-center text-teal-700 shadow-xs">
          <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <Activity className="w-4.5 h-4.5" />
        </div>
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-teal-50 border border-teal-200 text-teal-800">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Web Speech API
        </span>
      </div>
    );
  };

  return (
    <div
      ref={ref}
      className="group relative flex flex-col justify-between p-5 rounded-2xl bg-white/90 border border-slate-200/90 hover:border-cyan-400 shadow-sm hover:shadow-lg hover:shadow-cyan-900/5 transition-all duration-300 hover:-translate-y-1 backdrop-blur-md"
    >
      <div>
        {renderVisualBadge()}

        {/* Counter Number */}
        <div className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-slate-900 group-hover:text-cyan-700 transition-colors">
          {count}
          <span className="text-cyan-600 font-sans text-2xl sm:text-3xl">{stat.suffix}</span>
        </div>

        {/* Label */}
        <h3 className="text-sm font-bold text-slate-800 mt-1 tracking-tight">
          {stat.label}
        </h3>
      </div>

      {/* Description */}
      <p className="mt-2 text-xs text-slate-500 leading-relaxed pt-2 border-t border-slate-100">
        {stat.description}
      </p>
    </div>
  );
}

export default function StatsSection() {
  return (
    <section className="relative py-12 sm:py-16 bg-gradient-to-b from-[#eaf4fa] via-[#f5f9fd] to-[#e9f4fa] border-y border-slate-200/90 text-slate-900 overflow-hidden">
      {/* Subtle Luminous Ambient Light */}
      <div className="aura-glow-cyan top-1/2 left-1/3 w-[500px] h-[300px] opacity-20 pointer-events-none" />
      <div className="aura-glow-emerald bottom-0 right-1/4 w-[400px] h-[250px] opacity-15 pointer-events-none" />
      <div className="absolute inset-0 bg-grid-cyber-light opacity-30 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Tech Stack Ribbon */}
        <div className="text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/80 border border-slate-200 shadow-xs text-[11px] font-mono font-bold text-cyan-800 uppercase tracking-widest mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Built With Industry-Leading Technologies</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3.5 max-w-4xl mx-auto">
            {TRUSTED_TEAMS.map((tech) => (
              <div
                key={tech.name}
                className="flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-1.5 rounded-xl bg-white/85 border border-slate-200/90 hover:border-cyan-400 hover:bg-white text-xs font-mono font-bold text-slate-700 hover:text-cyan-700 transition-all duration-200 shadow-xs cursor-default hover:scale-105"
              >
                <span>{tech.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 4 Unique Frosted Glass Engineering Metric Pods */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {STATS.map((stat, i) => (
            <CounterItem key={stat.label} stat={stat} index={i} />
          ))}
        </div>

        {/* Bottom Real Architecture Telemetry Ribbon */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-2.5 rounded-2xl bg-white/80 border border-slate-200/90 shadow-xs backdrop-blur-md text-xs font-mono text-slate-600">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="font-bold text-slate-900">Architecture Status:</span>
            <span className="text-slate-500 hidden sm:inline">Client-Side Audio & 3D WebGL Active</span>
          </div>
          
          <div className="flex items-center gap-4 text-[11px] text-slate-600 font-semibold">
            <span>Audio Latency: <strong className="text-emerald-700 font-bold">0ms</strong></span>
            <span>3D Rendering: <strong className="text-cyan-700 font-bold">60 FPS</strong></span>
            <span className="hidden md:inline">Turbopack: <strong className="text-emerald-700 font-bold">Optimized</strong></span>
          </div>
        </div>

      </div>
    </section>
  );
}
