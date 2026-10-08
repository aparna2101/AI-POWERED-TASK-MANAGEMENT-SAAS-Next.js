"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Bot,
  User,
  CheckCircle2,
  Clock,
  ArrowRight,
  Plus,
  RefreshCw,
  Send,
  Zap,
  Radio,
  Layers,
} from "lucide-react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { AI_COPILOT_DATA } from "@/lib/constants";
import confetti from "canvas-confetti";
import {
  playAiActivationSound,
  playAiProcessingSound,
  playClickSound,
  playSuccessSound,
} from "@/lib/sound";

export default function AiCopilotSection({ onOpenAuth }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [addedTasks, setAddedTasks] = useState(false);

  const handleSimulatePlan = () => {
    playAiProcessingSound();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      playSuccessSound();
    }, 800);
  };

  const handleAddToSprint = () => {
    playAiActivationSound();
    setAddedTasks(true);
    playSuccessSound();

    try {
      confetti({
        particleCount: 65,
        spread: 60,
        origin: { y: 0.65 },
        colors: ["#00c2ff", "#009f9d", "#00e599", "#fbbf24"],
      });
    } catch (e) {}

    setTimeout(() => {
      setAddedTasks(false);
    }, 3500);
  };

  const getPhaseColor = (phase) => {
    switch (phase) {
      case "Architecture":
        return "bg-cyan-100 text-cyan-800 border-cyan-300";
      case "Design":
        return "bg-teal-100 text-teal-800 border-teal-300";
      case "Security":
        return "bg-emerald-100 text-emerald-800 border-emerald-300";
      case "Backend":
        return "bg-amber-100 text-amber-800 border-amber-300";
      case "Frontend":
        return "bg-cyan-100 text-cyan-800 border-cyan-300";
      case "Payments":
        return "bg-emerald-100 text-emerald-800 border-emerald-300";
      case "Fullstack":
        return "bg-teal-100 text-teal-800 border-teal-300";
      case "QA":
        return "bg-amber-100 text-amber-800 border-amber-300";
      default:
        return "bg-cyan-100 text-cyan-800 border-cyan-300";
    }
  };

  return (
    <section
      id="ai-copilot"
      className="relative py-16 sm:py-20 bg-gradient-to-b from-[#edf8fa] via-[#e2f3f7] to-[#eaf6f8] text-[#050b1a] overflow-hidden border-y border-cyan-200/80"
    >
      {/* Background Luminous Cyan & Teal Aura Glows */}
      <div className="absolute inset-0 bg-grid-cyber-light opacity-50 pointer-events-none" />
      <div className="aura-glow-cyan top-1/2 left-1/4 w-[500px] h-[500px] opacity-35 pointer-events-none" />
      <div className="aura-glow-emerald bottom-10 right-1/4 w-[450px] h-[450px] opacity-30 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Perfectly Centered Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <ScrollReveal>
            <div className="flex justify-center">
              <Badge variant="glow" size="md" icon={Bot} className="bg-white/90 border-cyan-300 text-cyan-800 shadow-xs mb-3">
                Autonomous Project Intelligence
              </Badge>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#050b1a] leading-tight">
              Meet Your AI <span className="gradient-text-aura">Project Copilot.</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <p className="mt-3 text-sm sm:text-base text-slate-700 leading-relaxed max-w-xl mx-auto">
              Feed TaskAura thoughts, feature requests, or specs. It auto-prioritizes dependencies and outputs sprint deliverables in seconds.
            </p>
          </ScrollReveal>
        </div>

        {/* Balanced 2-Column Integrated Studio (Clean Aligned Architecture) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start max-w-6xl mx-auto">
          
          {/* Left Column: Live AI Conversation Stream */}
          <div className="lg:col-span-5 space-y-4">
            <ScrollReveal delay={0.2}>
              <div className="space-y-4">
                {/* User Prompt Message */}
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-cyan-100 border border-cyan-300 text-cyan-800 flex items-center justify-center shrink-0 text-xs font-semibold shadow-xs">
                    <User className="w-4 h-4" />
                  </div>
                  <div className="rounded-2xl rounded-tl-sm bg-white/95 border border-cyan-200 px-4 py-3 text-xs sm:text-sm font-semibold text-slate-800 shadow-sm flex-1">
                    {AI_COPILOT_DATA.userPrompt}
                  </div>
                </div>

                {/* AI Agent Response */}
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-cyan-500/20">
                    <Bot className="w-4 h-4 stroke-[2.5]" />
                  </div>
                  <div className="rounded-2xl rounded-tl-sm border border-cyan-300/80 bg-white p-4 text-xs sm:text-sm text-slate-700 shadow-sm flex-1">
                    {isProcessing ? (
                      <div className="flex items-center gap-2.5 text-cyan-700 py-1 font-mono font-semibold">
                        <RefreshCw className="w-3.5 h-3.5 animate-spin text-cyan-600" />
                        <span>{AI_COPILOT_DATA.aiThinking}</span>
                      </div>
                    ) : (
                      <p className="leading-relaxed text-slate-800 font-medium">
                        {AI_COPILOT_DATA.aiResponse}
                      </p>
                    )}
                  </div>
                </div>

                {/* Status & Action Buttons */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                  <div className="flex items-center gap-2 text-[10px] font-mono text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full border border-emerald-300 font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                    120ms Latency
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleSimulatePlan}
                      className="text-xs font-semibold text-slate-700 hover:text-cyan-700 flex items-center gap-1.5 transition-colors cursor-pointer px-2.5 py-1.5 rounded-lg hover:bg-cyan-100/60"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Regenerate</span>
                    </button>

                    {addedTasks ? (
                      <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1.5 rounded-xl border border-emerald-300 flex items-center gap-1.5 font-mono shadow-xs">
                        ✓ Injected to Sprint
                      </span>
                    ) : (
                      <Button
                        variant="aura"
                        size="sm"
                        onClick={handleAddToSprint}
                        icon={Plus}
                        className="text-xs shadow-md shadow-cyan-500/25"
                      >
                        Inject Into Sprint
                      </Button>
                    )}
                  </div>
                </div>

                {/* Prompt Input Bar */}
                <div className="pt-2 flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value="Ask TaskAura: 'Audit dependencies across checkout service...'"
                    className="flex-1 rounded-xl border border-cyan-200 bg-white/95 px-3.5 py-2.5 text-xs text-slate-700 cursor-pointer focus:outline-none hover:border-cyan-400 transition-colors shadow-xs"
                    onClick={() => {
                      playClickSound();
                      onOpenAuth("signup");
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      playClickSound();
                      onOpenAuth("signup");
                    }}
                    className="p-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 text-white hover:opacity-90 transition-opacity cursor-pointer shadow-xs"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Live Synthesized Roadmap Deliverables */}
          <div className="lg:col-span-7">
            <ScrollReveal delay={0.25}>
              <div className="space-y-3">
                {/* Deliverables Header Bar */}
                <div className="flex items-center justify-between pb-2 border-b border-cyan-200/80 gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <Zap className="w-4 h-4 text-amber-500 shrink-0" />
                    <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-900 font-mono truncate">
                      ROADMAP DELIVERABLES ({AI_COPILOT_DATA.generatedTasks.length} ITEMS)
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 sm:px-2.5 py-0.5 rounded-full border border-emerald-300 font-mono shrink-0">
                    Auto-Prioritized
                  </span>
                </div>

                {/* 9 Deliverable Items Stream */}
                <div className="space-y-2">
                  {AI_COPILOT_DATA.generatedTasks.map((task) => {
                    const isDone = task.status === "completed";
                    const isInProg = task.status === "in-progress";

                    return (
                      <div
                        key={task.title}
                        className={`flex items-center justify-between p-2.5 sm:p-3 rounded-2xl border transition-all duration-200 gap-2 ${
                          isDone
                            ? "border-emerald-300/80 bg-white/90 hover:border-emerald-400 shadow-xs"
                            : isInProg
                            ? "border-cyan-400 bg-cyan-50/80 hover:border-cyan-500 ring-1 ring-cyan-400/20 shadow-xs"
                            : "border-slate-200 bg-white/80 hover:border-slate-300 shadow-xs"
                        }`}
                      >
                        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
                          {isDone ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          ) : isInProg ? (
                            <span className="relative flex h-3.5 w-3.5 shrink-0 items-center justify-center">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-500 opacity-75" />
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-600" />
                            </span>
                          ) : (
                            <div className="w-3.5 h-3.5 rounded-full border border-slate-400 shrink-0" />
                          )}
                          <span className="text-xs sm:text-sm font-bold text-slate-800 truncate">
                            {task.title}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                          <span
                            className={`text-[9px] font-mono font-bold px-1.5 sm:px-2 py-0.5 rounded border ${getPhaseColor(
                              task.phase
                            )}`}
                          >
                            {task.phase}
                          </span>
                          <span className="text-[9px] sm:text-[10px] text-slate-600 font-mono bg-slate-100 px-1.5 sm:px-2 py-0.5 rounded border border-slate-200 hidden xs:inline">
                            {task.duration}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Footer Metric */}
                <div className="pt-2 text-xs text-slate-600 flex items-center gap-1.5 font-medium">
                  <Clock className="w-3.5 h-3.5 text-cyan-600" />
                  <span>Estimated cycle: 2.5 weeks • 9 critical checkpoints auto-scheduled</span>
                </div>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </div>
    </section>
  );
}
