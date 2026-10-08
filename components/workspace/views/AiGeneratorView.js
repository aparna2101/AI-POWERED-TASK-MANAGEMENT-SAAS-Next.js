"use client";

import { useState } from "react";
import {
  Sparkles,
  Zap,
  ArrowRight,
  CheckCircle2,
  Bot,
  Layers,
  Flame,
  Plus,
  Copy,
  Check,
  ShieldCheck,
} from "lucide-react";
import confetti from "canvas-confetti";
import { playClickSound, playSuccessSound, playHoverSound } from "@/lib/sound";
import AiNeural3DCanvas from "@/components/3d/AiNeural3DCanvas";

export default function AiGeneratorView({ onAddTasksToKanban, onNavigateTab }) {
  const [goalInput, setGoalInput] = useState(
    "Implement Stripe Customer Portal with Webhook Verification and Prorated Refunds"
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [progressStep, setProgressStep] = useState(0);
  const [generatedTasks, setGeneratedTasks] = useState([
    {
      id: "AI-201",
      title: "Synthesize Stripe Customer Portal OIDC Session Endpoint",
      tag: "Fintech",
      priority: "Urgent",
      points: 5,
      assignee: "Elena Rostova",
    },
    {
      id: "AI-202",
      title: "Implement Webhook Signature Clock-Skew Tolerant Parser",
      tag: "Security",
      priority: "High",
      points: 3,
      assignee: "Marcus Chen",
    },
    {
      id: "AI-203",
      title: "Prorated Billing Math Invariant Verification Unit Tests",
      tag: "Testing",
      priority: "Medium",
      points: 3,
      assignee: "David Kim",
    },
    {
      id: "AI-204",
      title: "Customer Invoicing Portal UI Component in Settings",
      tag: "Frontend",
      priority: "Medium",
      points: 5,
      assignee: "Priya Sharma",
    },
  ]);

  const presetGoals = [
    "Build Stripe Customer Portal with Webhook Verification",
    "Integrate Biometric Passkeys (WebAuthn) for User Login",
    "Migrate PostgreSQL DB to Multi-Region Aurora with Read Replicas",
    "Automate GitHub Actions CI/CD with Docker Image Signing",
  ];

  const handleGenerate = (e) => {
    e?.preventDefault();
    if (!goalInput.trim()) return;

    playClickSound();
    setIsGenerating(true);
    setProgressStep(1);

    setTimeout(() => {
      setProgressStep(2);
    }, 700);

    setTimeout(() => {
      setProgressStep(3);
    }, 1300);

    setTimeout(() => {
      setIsGenerating(false);
      setProgressStep(0);
      playSuccessSound();

      // Generate dynamic tasks based on prompt
      const prefix = Math.floor(210 + Math.random() * 700);
      setGeneratedTasks([
        {
          id: `AI-${prefix}`,
          title: `Define Data Schema & API Contracts for: ${goalInput.slice(0, 32)}...`,
          tag: "Architecture",
          priority: "Urgent",
          points: 5,
          assignee: "Alex Morgan",
        },
        {
          id: `AI-${prefix + 1}`,
          title: `Implement Core Logic & State Handlers for: ${goalInput.slice(0, 30)}`,
          tag: "Backend",
          priority: "High",
          points: 5,
          assignee: "Elena Rostova",
        },
        {
          id: `AI-${prefix + 2}`,
          title: `Build Reactive UI Component & Error State Handling`,
          tag: "Frontend",
          priority: "Medium",
          points: 3,
          assignee: "Priya Sharma",
        },
        {
          id: `AI-${prefix + 3}`,
          title: `Automate E2E Cypress & Integration Pipeline Tests`,
          tag: "DevOps",
          priority: "Medium",
          points: 3,
          assignee: "David Kim",
        },
      ]);

      try {
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#00c2ff", "#00e599", "#fbbf24"],
        });
      } catch (err) { }
    }, 1900);
  };

  const handleAddAllToBoard = () => {
    playSuccessSound();
    onAddTasksToKanban(generatedTasks);
    try {
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.5 },
        colors: ["#00c2ff", "#00e599", "#fbbf24"],
      });
    } catch (err) { }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* 1. Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-3">
          <Sparkles className="w-7 h-7 text-cyan-400" />
          AI Task Generator & Insights
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Turn any high-level product objective into actionable, estimated sprint tasks in seconds.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Generator Form & Synthesized Results (2 Cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Prompt Box */}
          <div className="p-5 sm:p-6 rounded-3xl bg-[#09152b] border border-cyan-500/30 shadow-xl">
            <form onSubmit={handleGenerate} className="space-y-4">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                Describe Product Goal or Feature Request
              </label>

              <div className="relative">
                <textarea
                  rows={3}
                  value={goalInput}
                  onChange={(e) => setGoalInput(e.target.value)}
                  placeholder="e.g. Build Google OAuth authentication with JWT refresh tokens and role-based access control..."
                  className="w-full p-4 rounded-2xl bg-slate-900 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/40"
                />
              </div>

              {/* Preset Inspiration Chips */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-semibold text-slate-400">
                  Quick Prompt Templates:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {presetGoals.map((p, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => {
                        playClickSound();
                        setGoalInput(p);
                      }}
                      onMouseEnter={playHoverSound}
                      className="text-[11px] font-medium px-3 py-1 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 border border-slate-800 transition-colors cursor-pointer"
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Self-driving sprint breakdown engine
                </span>

                <button
                  type="submit"
                  disabled={isGenerating || !goalInput.trim()}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 text-slate-950 text-xs font-black hover:opacity-95 shadow-lg shadow-cyan-500/25 transition-all cursor-pointer disabled:opacity-50"
                >
                  <Sparkles className="w-4 h-4 fill-slate-950" />
                  <span>
                    {isGenerating ? "Synthesizing with AI..." : "Synthesize Tasks"}
                  </span>
                </button>
              </div>
            </form>

            {/* Live Synthesis Step Indicator */}
            {isGenerating && (
              <div className="mt-5 p-4 rounded-2xl bg-slate-900/90 border border-cyan-500/40 animate-pulse space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-cyan-300">
                  <div className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
                  <span>
                    {progressStep === 1 && "Decomposing feature into architectural primitives..."}
                    {progressStep === 2 && "Analyzing squad capacity & estimating story points..."}
                    {progressStep === 3 && "Synthesizing 4 testable sprint deliverables..."}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Synthesized Tasks Preview Box */}
          <div className="p-5 sm:p-6 rounded-3xl bg-[#09152b] border border-cyan-500/20 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Layers className="w-4 h-4 text-cyan-400" />
                  Synthesized Deliverables ({generatedTasks.length})
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Ready to be dispatched directly to your active sprint backlog.
                </p>
              </div>

              <button
                onClick={handleAddAllToBoard}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black transition-all cursor-pointer shadow-md"
              >
                <Plus className="w-3.5 h-3.5 stroke-[3]" />
                <span>Add All to Kanban</span>
              </button>
            </div>

            <div className="space-y-3">
              {generatedTasks.map((task) => (
                <div
                  key={task.id}
                  className="p-4 rounded-2xl bg-[#08152c] border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold text-cyan-400 px-2 py-0.5 rounded bg-cyan-950/80">
                        {task.id}
                      </span>
                      <span className="text-[10px] font-semibold text-slate-400 px-2 py-0.5 rounded bg-slate-800">
                        {task.tag}
                      </span>
                      <span
                        className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${task.priority === "Urgent"
                            ? "bg-rose-500/20 text-rose-300"
                            : "bg-amber-500/20 text-amber-300"
                          }`}
                      >
                        {task.priority}
                      </span>
                    </div>
                    <p className="text-xs font-bold text-white">{task.title}</p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 text-xs">
                    <span className="text-slate-400">
                      Assignee:{" "}
                      <strong className="text-slate-200">{task.assignee}</strong>
                    </span>
                    <span className="font-mono font-bold text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded">
                      {task.points} pts
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: AI Project Telemetry & Health Insights */}
        <div className="space-y-6">
          {/* 3D Neural Copilot Brain Pod */}
          <div className="p-4 rounded-3xl bg-[#09152b] border border-cyan-500/30 shadow-xl overflow-hidden relative">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Active Neural Copilot Mesh
              </span>
              <span className="text-[10px] font-mono text-emerald-400">Online</span>
            </div>
            <div className="w-full h-44 relative rounded-2xl overflow-hidden bg-[#050d1c] border border-cyan-500/20">
              <AiNeural3DCanvas />
            </div>
          </div>

          <div className="p-5 sm:p-6 rounded-3xl bg-[#09152b] border border-cyan-500/20 shadow-xl space-y-4">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <Bot className="w-4 h-4 text-cyan-400" />
              <span>Autonomous Project Insights</span>
            </div>

            <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 text-xs space-y-2">
              <div className="flex items-center gap-1.5 text-cyan-300 font-bold">
                <Zap className="w-3.5 h-3.5" />
                <span>Sprint 4 Health: 99.2% Nominal</span>
              </div>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                PR cycle times decreased by 22% compared to last week. Core API deployment gates have passed all lint and unit checks.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Recommended Actions
              </h4>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-1">
                <span className="font-bold text-white block">
                  1. Balance Squad Workload
                </span>
                <p className="text-[11px] text-slate-400">
                  Elena Rostova is at 92% capacity. Assign new fintech tasks to Marcus or David.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-1">
                <span className="font-bold text-white block">
                  2. Review PR #204 Gateway
                </span>
                <p className="text-[11px] text-slate-400">
                  Pending review for 38h. Approve to unblock downstream Auth 2.0 sprint cards.
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                playClickSound();
                onNavigateTab("kanban");
              }}
              className="w-full py-2.5 rounded-xl border border-cyan-500/30 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Go to Kanban Board</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
