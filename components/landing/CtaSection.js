"use client";

import { useState } from "react";
import { ArrowRight, Sparkles, CheckCircle2, Shield } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";
import confetti from "canvas-confetti";
import { playCtaConfirmSound } from "@/lib/sound";
import InteractiveAiNexus3D from "@/components/3d/InteractiveAiNexus3D";

export default function CtaSection({ onOpenAuth }) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    playCtaConfirmSound();
    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.65 },
        colors: ["#00c2ff", "#009f9d", "#00e599", "#fbbf24", "#ffffff"],
      });
    } catch (e) {}
    onOpenAuth("signup");
  };

  return (
    <section className="relative py-24 sm:py-32 bg-gradient-to-b from-[#050e1f] via-[#06152b] to-[#040914] text-white overflow-hidden border-t-2 border-cyan-400/30 select-none">
      {/* 1. 3D INTERACTIVE QUANTUM NEURAL FLUID (Touch & Drag Reactive) */}
      <div className="absolute inset-0 w-full h-full z-0 flex items-center justify-center pointer-events-auto">
        <InteractiveAiNexus3D />
      </div>

      {/* Cyber Mesh & Ambient Aura Glows */}
      <div className="absolute inset-0 bg-grid-cyber-dark opacity-25 pointer-events-none z-0" />
      <div className="aura-glow-cyan top-1/2 left-1/4 -translate-y-1/2 w-[550px] h-[550px] opacity-35 pointer-events-none z-0" />
      <div className="aura-glow-emerald bottom-0 right-1/4 w-[500px] h-[500px] opacity-30 pointer-events-none z-0" />

      {/* Foreground Content (pointer-events-none so touches pass to 3D canvas, buttons are pointer-events-auto) */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10 text-center flex flex-col items-center pointer-events-none">
        {/* Sparkle Badge */}
        <div className="inline-flex items-center gap-2 rounded-full bg-[#081734]/90 px-4 py-1.5 text-xs font-mono font-bold text-cyan-300 border border-cyan-400/40 mb-6 shadow-lg shadow-cyan-950/50 pointer-events-auto backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Next-Gen Autonomous Velocity</span>
        </div>

        {/* Main Heading */}
        <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] text-white max-w-3xl drop-shadow-md">
          Your Projects. <br />
          Your Team. <br />
          <span className="gradient-text-aura">Your AI.</span>
        </h2>

        {/* Subheading */}
        <p className="mt-6 text-base sm:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto font-sans">
          Everything you need to move from idea to execution with sub-50ms multiplayer speed and autonomous reasoning.
        </p>

        {/* Email Form & CTA - Exact Brand Gradient from screenshot 1 */}
        <form
          onSubmit={handleSubmit}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-xl mx-auto pointer-events-auto"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your work email"
            className="w-full sm:flex-1 h-13 rounded-2xl border border-cyan-400/40 bg-[#061424]/90 px-5 text-sm sm:text-base text-white placeholder-slate-400 backdrop-blur-md focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/30 font-mono shadow-inner transition-colors"
          />

          <MagneticButton strength={0.25} className="w-full sm:w-auto shrink-0">
            <button
              type="submit"
              className="w-full sm:w-auto h-13 px-8 rounded-2xl bg-gradient-to-r from-[#00c2ff] via-[#00e599] to-[#fbbf24] text-[#050b1a] font-black text-sm sm:text-base whitespace-nowrap shadow-xl shadow-cyan-500/30 hover:shadow-amber-400/50 hover:scale-[1.02] active:scale-[0.98] border border-white/40 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Get Started</span>
              <Sparkles className="w-4 h-4 text-[#050b1a] fill-[#050b1a]" />
            </button>
          </MagneticButton>
        </form>

        {/* Trust Badges */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs text-slate-300 font-mono pointer-events-auto">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Free 14-day Pro trial</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>No credit card required</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Shield className="w-4 h-4 text-cyan-400" />
            <span>SOC2 Type II Certified</span>
          </div>
        </div>
      </div>
    </section>
  );
}
