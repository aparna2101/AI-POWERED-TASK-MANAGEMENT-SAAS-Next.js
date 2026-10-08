"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  FolderPlus,
  Bot,
  Zap,
  BarChart3,
  X,
  CheckCircle2,
  Send,
  Terminal,
  Activity,
  ShieldCheck,
  ChevronRight,
  Play,
} from "lucide-react";
import Hero3DCanvas from "@/components/3d/Hero3DCanvas";
import MagneticButton from "@/components/ui/MagneticButton";
import Button from "@/components/ui/Button";
import confetti from "canvas-confetti";
import {
  playClickSound,
  playHoverSound,
  playAiActivationSound,
  playSuccessSound,
  playCtaConfirmSound,
} from "@/lib/sound";

export default function HeroSection({ onOpenAuth }) {
  const [activeActionModal, setActiveActionModal] = useState(null);
  const [promptInput, setPromptInput] = useState("");
  const [isProcessingCommand, setIsProcessingCommand] = useState(false);
  const [commandSuccess, setCommandSuccess] = useState(null);

  // 4 Interactive Telemetry HUD Actions
  const floatingActions = [
    {
      id: "create-project",
      label: "Create Project",
      icon: FolderPlus,
      posDesktop: "top-36 sm:top-40 left-4 lg:left-8 xl:left-12",
      tag: "Auto-Kickoff",
      tagColor: "text-cyan-400 bg-cyan-950/80 border-cyan-500/30",
      description: "Auto-architects repository milestones, tech specs, and sprint timelines from plain English.",
      previewTitle: "Project Genesis Engine",
      stats: "30s Setup • Zero Boilerplate",
    },
    {
      id: "ask-ai",
      label: "Ask AI Copilot",
      icon: Bot,
      posDesktop: "top-36 sm:top-40 right-4 lg:right-8 xl:right-12",
      tag: "Neural Dialog",
      tagColor: "text-emerald-400 bg-emerald-950/80 border-emerald-500/30",
      description: "Direct conversational interface with TaskAura neural copilot for instant sprint triage and bug analysis.",
      previewTitle: "Copilot Neural Query",
      stats: "Sub-100ms Inference • GPT-4o Model",
    },
    {
      id: "generate-tasks",
      label: "Generate Tasks",
      icon: Zap,
      posDesktop: "bottom-10 sm:bottom-12 left-4 lg:left-8 xl:left-12",
      tag: "Decomposition",
      tagColor: "text-amber-400 bg-amber-950/80 border-amber-500/30",
      description: "Converts feature requests into categorized, assigned, dependency-linked task issues.",
      previewTitle: "Task Synthesis Pipeline",
      stats: "Auto-Prioritized • 9 Checkpoints",
    },
    {
      id: "view-analytics",
      label: "Live Telemetry",
      icon: BarChart3,
      posDesktop: "bottom-10 sm:bottom-12 right-4 lg:right-8 xl:right-12",
      tag: "Predictive",
      tagColor: "text-teal-400 bg-teal-950/80 border-teal-500/30",
      description: "Real-time burn-down curves, sprint velocity, and AI predictive health scores.",
      previewTitle: "Predictive Telemetry Hub",
      stats: "+38% Velocity • 0 Blockers",
    },
  ];

  const handleActionClick = (action) => {
    playAiActivationSound();
    setActiveActionModal(action);
  };

  const handleCloseModal = () => {
    playClickSound();
    setActiveActionModal(null);
  };

  const handleExecutePrompt = (e) => {
    if (e) e.preventDefault();
    const query = promptInput.trim() || "Synthesize 2-week launch roadmap";
    playAiActivationSound();
    setIsProcessingCommand(true);

    setTimeout(() => {
      setIsProcessingCommand(false);
      setCommandSuccess(`Synthesized roadmap for "${query}" with 8 milestones & 0 blockers!`);
      playSuccessSound();
      try {
        confetti({
          particleCount: 75,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#00c2ff", "#009f9d", "#00e599", "#fbbf24"],
        });
      } catch (err) { }
    }, 1000);
  };

  const scrollToWorkspace = () => {
    playClickSound();
    const el = document.getElementById("workspace");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative w-full min-h-[90vh] bg-[#050b1a] text-white overflow-hidden flex flex-col justify-center items-center select-none"
    >
      {/* Background Cyber Mesh & Ambient Aura Glows */}
      <div className="absolute inset-0 bg-grid-cyber-dark opacity-35 pointer-events-none z-0" />
      <div className="aura-glow-cyan top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] pointer-events-none z-0" />

      {/* 3D WEBGL ANIMATION: Full Screen Background Centerpiece */}
      <div className="absolute inset-0 w-full h-full z-0 flex items-center justify-center pointer-events-auto">
        <Hero3DCanvas onCoreClick={() => playAiActivationSound()} />
      </div>

      {/* 4 FLOATING ACTION BUTTONS (Corners on Extra-Large Desktop Only) */}
      <div className="hidden xl:block absolute inset-0 pointer-events-none z-20 max-w-7xl mx-auto">
        {floatingActions.map((action) => {
          const Icon = action.icon;
          return (
            <div key={action.id} className={`absolute ${action.posDesktop} pointer-events-auto`}>
              <MagneticButton strength={0.3}>
                <button
                  type="button"
                  onClick={() => handleActionClick(action)}
                  onMouseEnter={playHoverSound}
                  className="group relative flex items-center gap-3 rounded-2xl border border-cyan-500/40 bg-[#081426]/90 p-3 shadow-xl shadow-cyan-950/70 backdrop-blur-xl hover:border-cyan-400 hover:shadow-cyan-500/30 transition-all cursor-pointer text-left"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-950/90 border border-cyan-500/40 text-cyan-300 group-hover:scale-110 group-hover:text-emerald-300 transition-all">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex flex-col pr-1">
                    <span className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors flex items-center gap-1">
                      {action.label}
                      <ChevronRight className="w-3 h-3 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </span>
                    <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded mt-0.5 border inline-block ${action.tagColor}`}>
                      {action.tag}
                    </span>
                  </div>
                  <div className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-cyan-400 opacity-60 group-hover:animate-ping" />
                </button>
              </MagneticButton>
            </div>
          );
        })}
      </div>

      {/* Hero Content - Naturally responsive flow without overflow clipping */}
      <div className="relative z-20 w-full max-w-4xl mx-auto flex flex-col items-center justify-center text-center px-4 pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 my-auto pointer-events-auto">
        <div className="max-w-3xl w-full text-center pointer-events-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/40 bg-[#081426]/90 px-4 py-1.5 text-xs font-mono font-bold text-cyan-300 shadow-xl backdrop-blur-xl mb-4">
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
            <span>AI-POWERED AUTONOMOUS PROJECT MANAGEMENT</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] drop-shadow-[0_4px_24px_rgba(5,11,26,0.95)]">
            <span className="block text-white">Plan Smarter.</span>
            <span className="block text-slate-200">Build Faster.</span>
            <span className="block bg-gradient-to-r from-[#00f0ff] via-[#00e599] to-[#fbbf24] bg-clip-text text-transparent font-black drop-shadow-[0_0_35px_rgba(0,229,153,0.7)]">
              Let AI Lead.
            </span>
          </h1>

          {/* Short & Clear: What This Website Is For */}
          <p className="mt-4 text-xs sm:text-base md:text-lg text-slate-200 leading-relaxed max-w-xl mx-auto font-normal drop-shadow-[0_2px_12px_rgba(5,11,26,0.95)]">
            TaskAura is an AI project workspace that turns ideas into prioritized sprints, detects roadmap blockers in real time, and helps engineering teams ship 10x faster.
          </p>

          {/* 3 High-Value Pills */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs font-medium text-slate-200">
            <div className="flex items-center gap-1.5 rounded-xl border border-cyan-500/40 bg-[#081426]/90 px-3 py-1.5 backdrop-blur-md shadow-lg">
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              <span>1-Click Roadmaps</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-xl border border-emerald-500/40 bg-[#081426]/90 px-3 py-1.5 backdrop-blur-md shadow-lg">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Blocker Prevention</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-xl border border-amber-500/40 bg-[#081426]/90 px-3 py-1.5 backdrop-blur-md shadow-lg">
              <Activity className="w-3.5 h-3.5 text-amber-400" />
              <span>Real-Time Sync</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <MagneticButton strength={0.25}>
              <Button
                variant="aura"
                size="md"
                rightIcon={ArrowRight}
                onClick={() => {
                  playCtaConfirmSound();
                  onOpenAuth("signup");
                }}
                className="shadow-xl shadow-cyan-500/35 font-bold px-6 py-3 text-xs sm:text-sm"
              >
                Start Building Free
              </Button>
            </MagneticButton>

            <MagneticButton strength={0.2}>
              <Button
                variant="dark"
                size="md"
                leftIcon={Play}
                onClick={scrollToWorkspace}
                className="border border-cyan-500/50 bg-[#081426] text-white hover:text-cyan-300 hover:border-cyan-300 hover:bg-[#0c213d] px-6 py-3 text-xs sm:text-sm font-bold shadow-xl shadow-cyan-950/80 cursor-pointer"
              >
                Explore Live Workspace
              </Button>
            </MagneticButton>
          </div>

          {/* Compact Interactive AI Command Bar */}
          <div className="mt-5 rounded-2xl border border-cyan-500/40 bg-[#081426]/95 p-2 shadow-2xl backdrop-blur-xl ring-1 ring-cyan-400/20 max-w-lg w-full mx-auto text-left">
            <form onSubmit={handleExecutePrompt} className="flex items-center gap-1.5 sm:gap-2">
              <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 shrink-0">
                <Terminal className="h-4 w-4" />
              </div>

              <input
                type="text"
                value={promptInput}
                onChange={(e) => setPromptInput(e.target.value)}
                placeholder="Test AI: 'Plan 2-week launch sprint'"
                className="min-w-0 flex-1 bg-transparent px-1.5 sm:px-2 text-xs font-mono text-white placeholder-slate-400 focus:outline-none"
              />

              <Button
                type="submit"
                variant="aura"
                size="sm"
                disabled={isProcessingCommand}
                rightIcon={isProcessingCommand ? null : Send}
                className="shrink-0 text-[11px] py-1.5 px-2.5 sm:px-3 shadow-md"
              >
                {isProcessingCommand ? "..." : "Test AI"}
              </Button>
            </form>

            {/* Presets */}
            <div className="mt-2 pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-1.5 px-1 text-[10px] sm:text-[11px] font-mono text-slate-400">
              <span className="text-slate-500 uppercase text-[9px] hidden sm:inline">TRY:</span>
              {[
                "✦ Auto-Plan Sprint",
                "✦ Audit Blockers",
                "✦ Balance Velocity",
              ].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => {
                    playClickSound();
                    setPromptInput(preset.replace("✦ ", ""));
                    handleExecutePrompt();
                  }}
                  className="hover:text-cyan-300 transition-colors cursor-pointer text-slate-400"
                >
                  {preset}
                </button>
              ))}
              <button
                type="button"
                onClick={() => onOpenAuth("signup")}
                className="text-emerald-400 hover:underline font-bold ml-auto cursor-pointer"
              >
                Free Trial →
              </button>
            </div>
          </div>

          {/* Command Feedback Toast */}
          <AnimatePresence>
            {commandSuccess && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="mt-3 rounded-xl border border-emerald-400/50 bg-emerald-950/90 px-3 py-2 text-xs font-mono text-emerald-200 flex items-center justify-between shadow-xl text-left max-w-lg mx-auto"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{commandSuccess}</span>
                </div>
                <button
                  onClick={() => setCommandSuccess(null)}
                  className="text-emerald-400 hover:text-white ml-2"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* BOTTOM HINT */}
      <div className="relative z-20 text-[10px] font-mono text-cyan-400/60 uppercase tracking-widest pb-3 text-center">
        ↓ SCROLL TO EXPLORE WORKSPACE
      </div>

      {/* ACTION MODAL DIALOG */}
      <AnimatePresence>
        {activeActionModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="fixed inset-0 bg-[#050b1a]/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative z-10 w-full max-w-lg rounded-3xl border border-cyan-400/40 bg-[#081426] p-6 sm:p-8 text-white shadow-2xl shadow-cyan-950/80"
            >
              <button
                onClick={handleCloseModal}
                className="absolute top-5 right-5 rounded-full p-2 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-950 border border-cyan-400/50 text-cyan-300">
                  <activeActionModal.icon className="h-6 w-6" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold tracking-widest">
                    AI HUD SUBSYSTEM
                  </span>
                  <h3 className="text-2xl font-black text-white">{activeActionModal.label}</h3>
                </div>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed mt-2">
                {activeActionModal.description}
              </p>

              <div className="my-5 rounded-2xl border border-cyan-500/20 bg-slate-900/90 p-4 font-mono text-xs text-slate-200 space-y-2">
                <div className="flex items-center justify-between text-cyan-400 font-bold border-b border-slate-800 pb-2">
                  <span>TELEMETRY: {activeActionModal.previewTitle}</span>
                  <span className="text-emerald-400 font-semibold">● ONLINE</span>
                </div>
                <div className="text-slate-400 pt-1">
                  Status: <span className="text-white">{activeActionModal.stats}</span>
                </div>
                <div className="text-slate-400">
                  Engine: <span className="text-emerald-300">TaskAura Autonomous Mesh 4.2</span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <Button variant="ghost" size="sm" onClick={handleCloseModal} className="text-white hover:text-slate-200">
                  Dismiss
                </Button>
                <Button
                  variant="aura"
                  size="md"
                  onClick={() => {
                    handleCloseModal();
                    onOpenAuth("signup");
                  }}
                  rightIcon={ArrowRight}
                >
                  Launch Full {activeActionModal.label}
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
