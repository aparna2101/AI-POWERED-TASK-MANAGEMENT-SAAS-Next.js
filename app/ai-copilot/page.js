"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import CustomCursor from "@/components/animations/CustomCursor";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import {
  Bot,
  Terminal,
  Sparkles,
  Zap,
  Cpu,
  ArrowRight,
  CheckCircle2,
  Send,
  ShieldCheck,
  Code2,
  Workflow,
  Activity,
  Layers,
  Lock,
  GitPullRequest,
  Check,
  RefreshCw,
  Server,
  FileCode,
  Gauge,
  Key,
} from "lucide-react";
import confetti from "canvas-confetti";
import { playClickSound, playAiActivationSound, playSuccessSound } from "@/lib/sound";
import ZoomRevealSection from "@/components/animations/ZoomRevealSection";
import Slide3DSection from "@/components/animations/Slide3DSection";
import StageFoldSection from "@/components/animations/StageFoldSection";
import TopDropSection from "@/components/animations/TopDropSection";
import PortalZoomSection from "@/components/animations/PortalZoomSection";
import AiNeural3DCanvas from "@/components/3d/AiNeural3DCanvas";

export default function AiCopilotPage() {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState("signup");

  // Terminal State
  const [prompt, setPrompt] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [conversation, setConversation] = useState([
    {
      sender: "copilot",
      text: "TaskAura Neural Copilot 4.2 Online. Connected to repository mesh. How can I accelerate your sprint today?",
      time: "Just now",
      type: "intro",
    },
  ]);

  const presetPrompts = [
    {
      label: "Synthesize Sprint from PRD",
      query: "Break down Auth 2.0 RFC into sprint tasks with dependencies",
      response:
        "Analyzing RFC doc... Identified 6 atomic user stories:\n1. [P0] OAuth2 / OIDC Provider Integration (Assignee: Elena, 5 pts)\n2. [P0] Session Token Redis Store (Assignee: Devon, 3 pts)\n3. [P1] Multi-Factor Auth TOTP Handlers (Assignee: Marcus, 5 pts)\n4. [P1] Rate Limiter & Brute-Force Shield (Assignee: Aria, 2 pts)\n5. [P2] End-to-End Cypress Integration Tests (Assignee: QA, 3 pts)\n✦ Total: 18 Story Points • Zero Critical Path Blockers detected.",
    },
    {
      label: "Triage Critical Path Blockers",
      query: "Identify blockers stalling our upcoming v1.4 release",
      response:
        "Scanning 14 open PRs & dependency tree...\n⚠️ Alert: PR #184 (gRPC Migration) blocks 3 downstream tasks.\n• PR #184 has been awaiting review for 38 hours.\n• Suggested Action: Auto-reassigning secondary reviewer @Aria to unblock staging pipeline.",
    },
    {
      label: "Estimate Velocity & Capacity",
      query: "Calculate squad capacity for Sprint 25 considering PTO",
      response:
        "Historical sprint velocity: 52 pts/sprint.\n• 2 engineers on PTO next week (-14 pts capacity).\n• Recommended Sprint 25 Target: 38 Story Points.\n• Confidence Interval: 94.2% on-time completion probability.",
    },
    {
      label: "Code Review Risk Audit",
      query: "Check pending PRs for high-risk database migration scripts",
      response:
        "Inspected 5 active PR branches:\n• PR #192 touches `users_metadata` postgres table with `ALTER TABLE`.\n• Risk: Potential lock contention on 4M rows.\n• Recommendation: Use `CONCURRENTLY` index creation or blue-green partition migration.",
    },
  ];

  const agents = [
    {
      title: "Sprint Architect",
      tagline: "Autonomous Backlog Synthesis",
      badge: "Architecture Specialist",
      icon: Workflow,
      model: "Claude 3.5 Sonnet / Reasoning Core",
      memory: "128k Tokens Context",
      accent: "from-cyan-500/20 to-blue-500/10 border-cyan-500/30",
      capabilities: [
        "Converts messy Notion/Google Docs PRDs into atomic engineering tickets",
        "Computes Fibonacci story points using team historical velocity data",
        "Generates Mermaid dependency trees with critical path milestones",
      ],
    },
    {
      title: "Blocker Sentinel",
      tagline: "Predictive Deadlock Triage",
      badge: "Real-time Telemetry",
      icon: Cpu,
      model: "Fine-Tuned Risk Predictor 4.2",
      memory: "Full Git Commit Graph",
      accent: "from-emerald-500/20 to-teal-500/10 border-emerald-500/30",
      capabilities: [
        "Monitors pull requests, CI test suites, and review bottlenecks",
        "Flags merge conflicts before feature branches branch off",
        "Suggests automated reassignment when PR reviews exceed 24 hours",
      ],
    },
    {
      title: "Velocity Oracle",
      tagline: "Release Forecast Engine",
      badge: "Probabilistic Modeling",
      icon: Activity,
      model: "Monte Carlo Simulation Engine",
      memory: "52-Week Rolling History",
      accent: "from-indigo-500/20 to-purple-500/10 border-indigo-500/30",
      capabilities: [
        "Simulates 10,000 sprint iterations to predict release delivery dates",
        "Factors in PTO, tech debt sprints, and unexpected bug spikes",
        "Provides 90% confidence delivery dates for engineering executives",
      ],
    },
    {
      title: "Code Mesh Syncer",
      tagline: "Git-Native Telemetry Mesh",
      badge: "Bi-directional Sync",
      icon: Code2,
      model: "Headless Webhook Daemon",
      memory: "Sub-Second Ingestion",
      accent: "from-amber-500/20 to-orange-500/10 border-amber-500/30",
      capabilities: [
        "Closes user stories directly when GitHub/GitLab commits contain '#AURA-xx'",
        "Synchronizes PR review statuses into sprint boards in real time",
        "Creates feature branch names and tracking links with 1-click",
      ],
    },
  ];

  const handleSend = (textToSend = null) => {
    const message = textToSend || prompt;
    if (!message.trim()) return;

    playClickSound();
    playAiActivationSound();

    const userMessage = {
      sender: "user",
      text: message,
      time: "Just now",
    };

    setConversation((prev) => [...prev, userMessage]);
    setPrompt("");
    setIsProcessing(true);

    const presetMatch = presetPrompts.find((p) => p.query.toLowerCase() === message.toLowerCase());
    const responseText = presetMatch
      ? presetMatch.response
      : `Neural analysis complete for: "${message}".\n✦ Identified 4 action items and updated active sprint metadata.\n✦ Zero blocker conflicts detected. Telemetry synchronized.`;

    setTimeout(() => {
      setConversation((prev) => [
        ...prev,
        {
          sender: "copilot",
          text: responseText,
          time: "Just now",
        },
      ]);
      setIsProcessing(false);
      playSuccessSound();

      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 },
          colors: ["#00c2ff", "#009f9d", "#00e599"],
        });
      } catch (err) {}
    }, 900);
  };

  return (
    <div className="relative min-h-screen bg-[#050b1a] text-white selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden">
      <CustomCursor />
      <Navbar onOpenAuth={(mode) => { setAuthMode(mode); setAuthModalOpen(true); }} />

      <main className="w-full">
        {/* SECTION 1: HERO (Cinematic Deep Navy) */}
        <section className="relative w-full min-h-[85vh] flex flex-col justify-center items-center pt-28 sm:pt-36 pb-16 sm:pb-20 overflow-hidden border-b border-cyan-500/20 bg-radial from-[#091b38] via-[#050b1a] to-[#030712]">
          <div className="absolute inset-0 bg-grid-cyber-dark opacity-35 pointer-events-none" />
          <div className="aura-glow-cyan top-1/4 left-1/2 -translate-x-1/2 w-[750px] h-[380px] opacity-40 pointer-events-none" />

          {/* 3D WEBGL AI BRAIN: Neural Copilot Lattice */}
          <div className="absolute inset-0 w-full h-full z-0 flex items-center justify-center pointer-events-none opacity-80">
            <AiNeural3DCanvas />
          </div>

          <ZoomRevealSection className="w-full relative z-10">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
              <Badge variant="glow" size="md" icon={Bot} className="mb-6 mx-auto">
                TaskAura Neural Copilot 4.2
              </Badge>

              <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-[1.12]">
                The Autonomous Pair-Architect <br />
                <span className="gradient-text-aura">For Modern Engineering Teams.</span>
              </h1>

              <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
                Eliminate ticket fatigue. TaskAura Copilot uses fine-tuned code reasoning models to turn requirements into roadmaps, unblock stalled pull requests, and predict delivery risks before they happen.
              </p>

              {/* Status Telemetry Deck */}
              <div className="mt-8 flex flex-wrap justify-center gap-3 sm:gap-4 text-xs font-mono font-semibold text-cyan-300">
                <span className="px-3.5 py-1.5 rounded-full bg-[#08152c] border border-cyan-500/30 flex items-center gap-1.5 shadow-md">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Model: TaskAura-Reasoning-4.2
                </span>
                <span className="px-3.5 py-1.5 rounded-full bg-[#08152c] border border-cyan-500/30 flex items-center gap-1.5 shadow-md">
                  <Gauge className="w-3.5 h-3.5 text-cyan-400" />
                  Inference Latency: 120ms
                </span>
                <span className="px-3.5 py-1.5 rounded-full bg-[#08152c] border border-cyan-500/30 flex items-center gap-1.5 shadow-md">
                  <Lock className="w-3.5 h-3.5 text-emerald-400" />
                  Zero-Data Training Guarantee
                </span>
              </div>

              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <Button
                  variant="primary"
                  size="lg"
                  icon={Sparkles}
                  onClick={() => {
                    playClickSound();
                    setAuthMode("signup");
                    setAuthModalOpen(true);
                  }}
                >
                  Test Copilot in Your Workspace
                </Button>
                <Link
                  href="/pricing"
                  onClick={() => playClickSound()}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-cyan-500/30 bg-[#09152b] hover:bg-cyan-500/10 text-sm font-bold text-slate-200 hover:text-white transition-all cursor-pointer shadow-lg shadow-cyan-950/40"
                >
                  <span>Explore Plans</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </ZoomRevealSection>
        </section>

        {/* SECTION 2: INTERACTIVE TERMINAL SIMULATOR (Crisp Pearl/Light Contrast Stage) */}
        <section className="relative w-full py-16 sm:py-24 border-b border-slate-200/90 bg-gradient-to-b from-[#eef5fa] via-[#f7fafd] to-[#e8f1f8] text-slate-900 overflow-hidden">
          <Slide3DSection direction="right" className="w-full">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-2xl mx-auto mb-10">
                <span className="text-xs font-mono font-bold text-cyan-800 uppercase tracking-widest bg-cyan-100 px-3.5 py-1.5 rounded-full border border-cyan-200">
                  Live Interactive Simulation
                </span>
                <h2 className="text-3xl font-black text-slate-900 mt-3">
                  Experience Copilot in Action
                </h2>
                <p className="text-sm text-slate-600 mt-2">
                  Click a preset command or enter your own query to see how the agent reasons through engineering workloads.
                </p>
              </div>

              {/* Quick Preset Buttons (Clean White Floating Cards) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                {presetPrompts.map((p, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSend(p.query)}
                    className="p-4 rounded-2xl bg-white border border-slate-200/90 hover:border-cyan-500 text-left transition-all hover:-translate-y-0.5 cursor-pointer shadow-md group"
                  >
                    <div className="text-xs font-bold text-slate-900 group-hover:text-cyan-700 transition-colors">
                      {p.label}
                    </div>
                    <div className="text-[11px] font-mono text-slate-500 truncate mt-1">
                      {p.query}
                    </div>
                  </button>
                ))}
              </div>

              {/* Terminal Console Box (High-Tech Deep Navy Core) */}
              <div className="rounded-3xl border border-cyan-500/40 bg-[#040c1a] shadow-2xl overflow-hidden font-mono text-xs text-white">
                {/* Terminal Header */}
                <div className="px-6 py-3.5 bg-[#06142a] border-b border-cyan-500/20 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                    <span className="text-slate-400 text-xs ml-2">aura-copilot-repl --interactive</span>
                  </div>

                  <div className="flex items-center gap-2 text-[11px] text-emerald-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Inference Active</span>
                  </div>
                </div>

                {/* Conversation Scroll Display */}
                <div className="p-6 space-y-4 max-h-80 overflow-y-auto">
                  {conversation.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex flex-col ${
                        msg.sender === "user" ? "items-end" : "items-start"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1 text-[11px] text-slate-400">
                        <span>{msg.sender === "user" ? "You" : "TaskAura Copilot"}</span>
                        <span>•</span>
                        <span>{msg.time}</span>
                      </div>
                      <div
                        className={`p-4 rounded-2xl max-w-2xl leading-relaxed whitespace-pre-wrap ${
                          msg.sender === "user"
                            ? "bg-cyan-500/20 border border-cyan-400/40 text-cyan-100"
                            : "bg-[#091730] border border-cyan-500/20 text-slate-200"
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}

                  {isProcessing && (
                    <div className="flex items-center gap-2 text-cyan-300 text-xs">
                      <RefreshCw className="w-3.5 h-3.5 animate-spin text-cyan-400" />
                      <span>Reasoning across repository graph & open sprints...</span>
                    </div>
                  )}
                </div>

                {/* Input Command Line */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSend();
                  }}
                  className="p-4 bg-[#06142a] border-t border-cyan-500/20 flex items-center gap-3"
                >
                  <span className="text-cyan-400 font-bold">$</span>
                  <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Ask Copilot (e.g., 'Break down Stripe billing integration into sprint tasks')..."
                    className="flex-1 bg-transparent text-white placeholder-slate-500 text-xs focus:outline-none"
                  />
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="px-4 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/40 text-cyan-200 font-bold transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    <span>Execute</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>
            </div>
          </Slide3DSection>
        </section>

        {/* SECTION 3: 4 AUTONOMOUS AGENT PERSONAS (Deep Cosmic Navy & Cyan Glowing Cards) */}
        <section className="relative w-full py-16 sm:py-24 border-b border-cyan-500/20 bg-[#061022] text-white overflow-hidden">
          <TopDropSection className="w-full">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-14">
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest bg-cyan-950/80 border border-cyan-500/30 px-3 py-1 rounded-full">
                  Multi-Agent Architecture
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-white mt-3">
                  Four Specialized Neural Agents Working in Tandem
                </h2>
                <p className="text-sm sm:text-base text-slate-300 mt-2">
                  Instead of a single monolithic prompt, TaskAura orchestrates specialized micro-agents for each phase of delivery.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {agents.map((ag, idx) => {
                  const Icon = ag.icon;
                  return (
                    <div
                      key={idx}
                      className={`p-8 rounded-3xl bg-gradient-to-br ${ag.accent} border backdrop-blur-xl shadow-xl hover:border-cyan-400/60 transition-all`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300">
                          <Icon className="w-6 h-6" />
                        </div>
                        <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 font-bold uppercase">
                          {ag.badge}
                        </span>
                      </div>

                      <h3 className="text-2xl font-black text-white">{ag.title}</h3>
                      <p className="mt-1 text-sm text-cyan-300 font-medium">{ag.tagline}</p>

                      <div className="mt-4 flex flex-wrap gap-2 text-[11px] font-mono text-slate-400">
                        <span className="px-2 py-0.5 rounded bg-black/40 border border-white/5">
                          Model: {ag.model}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-black/40 border border-white/5">
                          Memory: {ag.memory}
                        </span>
                      </div>

                      <div className="mt-6 space-y-3 pt-4 border-t border-white/10">
                        {ag.capabilities.map((cap, i) => (
                          <div key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{cap}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </TopDropSection>
        </section>

        {/* SECTION 4: SECURITY & ZERO DATA RETENTION (Clean Luminous White Stage) */}
        <section className="relative w-full py-16 sm:py-24 border-b border-slate-200/90 bg-gradient-to-b from-[#f5f9fd] to-[#ffffff] text-slate-900 overflow-hidden">
          <Slide3DSection direction="left" className="w-full">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
              <div className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200/90 shadow-xl text-center relative overflow-hidden">
                <div className="w-16 h-16 rounded-2xl bg-emerald-50 border-2 border-emerald-300 flex items-center justify-center mx-auto text-emerald-700 mb-6">
                  <ShieldCheck className="w-8 h-8" />
                </div>

                <h2 className="text-3xl font-black text-slate-900">
                  Enterprise Zero-Data Training Guarantee
                </h2>
                <p className="mt-4 text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
                  Your source code, requirements documentation, and team communications are never used to train public or proprietary foundation models. All data is processed via stateless inference with ephemeral memory and zero data persistence.
                </p>

                <div className="mt-8 flex flex-wrap justify-center gap-6 text-xs font-mono text-slate-800 font-bold">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>SOC2 Type II Certified</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Stateless Inference Only</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Private VPC Deployments</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>SAML 2.0 & SCIM Sync</span>
                  </div>
                </div>
              </div>
            </div>
          </Slide3DSection>
        </section>

        {/* SECTION 5: CTA (Deep Midnight Finale) */}
        <section className="relative w-full py-16 sm:py-24 text-center bg-[#050b1a] text-white overflow-hidden">
          <PortalZoomSection className="w-full">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl sm:text-4xl font-black text-white">
                Supercharge Your Next Sprint With AI
              </h2>
              <p className="mt-4 text-base text-slate-300 max-w-2xl mx-auto">
                Get started in under 2 minutes. Free 14-day trial for up to 10 engineers.
              </p>
              <div className="mt-8 flex justify-center gap-4">
                <Button
                  variant="primary"
                  size="lg"
                  icon={Sparkles}
                  onClick={() => {
                    playClickSound();
                    setAuthMode("signup");
                    setAuthModalOpen(true);
                  }}
                >
                  Deploy Copilot Free
                </Button>
              </div>
            </div>
          </PortalZoomSection>
        </section>
      </main>

      {/* Auth Modal */}
      <Modal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        title={authMode === "signup" ? "Activate TaskAura Copilot" : "Sign In"}
      >
        <div className="p-4 text-center">
          <p className="text-sm text-slate-300 mb-4">
            Connect your GitHub repository to enable autonomous sprint planning and predictive blocker detection.
          </p>
          <Button
            variant="primary"
            fullWidth
            onClick={() => {
              playClickSound();
              setAuthModalOpen(false);
            }}
          >
            Authorize with GitHub
          </Button>
        </div>
      </Modal>

      <Footer onOpenAuth={(mode) => { setAuthMode(mode); setAuthModalOpen(true); }} />
    </div>
  );
}
