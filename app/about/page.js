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
  Sparkles,
  Shield,
  Zap,
  Users2,
  Terminal,
  Cpu,
  ArrowRight,
  CheckCircle2,
  Globe2,
  Rocket,
  Award,
  HeartHandshake,
  Briefcase,
  ChevronDown,
  ChevronUp,
  Workflow,
  Lock,
  Layers,
  MapPin,
  Clock,
  Laptop,
} from "lucide-react";
import { playClickSound, playHoverSound, playSuccessSound } from "@/lib/sound";
import ZoomRevealSection from "@/components/animations/ZoomRevealSection";
import Slide3DSection from "@/components/animations/Slide3DSection";
import StageFoldSection from "@/components/animations/StageFoldSection";
import TopDropSection from "@/components/animations/TopDropSection";
import PortalZoomSection from "@/components/animations/PortalZoomSection";
import GlobalFleet3DCanvas from "@/components/3d/GlobalFleet3DCanvas";

export default function AboutPage() {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState("signup");

  // Interactive Pillars Tab
  const [activePillar, setActivePillar] = useState(0);

  const handleOpenAuth = (mode = "signup") => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const pillars = [
    {
      id: "crdt",
      title: "CRDT Multiplayer Protocol",
      icon: Users2,
      stats: "Sub-50ms Global Sync",
      tagline: "Deterministic zero-conflict collaboration",
      description:
        "Traditional project tools lock database rows, creating stale tabs and merge conflicts. TaskAura uses state-based Conflict-Free Replicated Data Types (CRDTs) over WebSockets. Tens of engineers can drag sprint cards, reorder milestones, and edit specs simultaneously with zero desynchronization.",
      highlights: [
        "State-based vector clocks for mathematical convergence",
        "Offline-first client cache with automatic delta synchronization",
        "Fine-grained atomic mutations down to individual keystrokes",
      ],
    },
    {
      id: "neural",
      title: "Neural Reasoning Mesh",
      icon: Cpu,
      stats: "128k Token Context Graph",
      tagline: "Fine-tuned models anchored in your codebase",
      description:
        "Generic chatbots don't understand your git tree or team review patterns. TaskAura connects directly to commit diffs, pull request latency, and technical design documents, allowing autonomous agents to decompose requirements into verified engineering user stories.",
      highlights: [
        "Hybrid architecture blending Claude 3.5 Sonnet and GPT-4o",
        "Continuous dependency analysis across monorepos and microservices",
        "Zero hallucination guarantee backed by deterministic compilers",
      ],
    },
    {
      id: "security",
      title: "Zero-Retention Security Enclave",
      icon: Shield,
      stats: "SOC2 Type II & Air-Gapped",
      tagline: "Your intellectual property is sacred",
      description:
        "Engineering codebases are the crown jewels of any technology company. We operate under strict zero-retention agreements: prompts and embeddings are processed statelessly in isolated memory enclaves and never used for foundation model training.",
      highlights: [
        "Air-gapped private VPC deployments on AWS, GCP, and Azure",
        "End-to-end TLS 1.3 encryption with AES-256-GCM data at rest",
        "SAML 2.0 SSO and SCIM directory sync for enterprise access control",
      ],
    },
  ];

  const team = [
    {
      name: "Dr. Elena Rostova",
      role: "Co-Founder & Chief Scientist",
      pedigree: "Ex-MIT CSAIL • Distributed Systems",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
      bio: "Ph.D. in Distributed Consensus Algorithms from MIT. Published 12 peer-reviewed papers on CRDT scaling and distributed transactions.",
      badge: "Founding Scientist",
    },
    {
      name: "Marcus Vance",
      role: "Co-Founder & CEO",
      pedigree: "Ex-Stripe • Staff Systems Architect",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
      bio: "12+ years building high-velocity developer infrastructure. Led core developer productivity initiatives scaling to 2,000+ engineers at Stripe.",
      badge: "Architecture Lead",
    },
    {
      name: "Aria Takahashi",
      role: "VP of Artificial Intelligence",
      pedigree: "Ex-Google Brain • LLM Reasoning",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80",
      bio: "Specializes in code-generation benchmarks and constrained agent reasoning. Pioneer in autonomous compiler-guided neural synthesis.",
      badge: "Neural Core",
    },
    {
      name: "Devon Chen",
      role: "Head of Infrastructure",
      pedigree: "Ex-Linear • Real-Time WebGL",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
      bio: "Obsessed with 60fps interaction latency, hardware-accelerated rendering, and client-side database synchronization engines.",
      badge: "WebGL Engine",
    },
  ];

  const milestones = [
    {
      year: "2024 Q1",
      title: "TaskAura Inception",
      desc: "Founded by distributed systems researchers frustrated by legacy ticket grooming meetings.",
    },
    {
      year: "2024 Q3",
      title: "Autonomous Engine v1.0",
      desc: "First PRD-to-Sprint autonomous neural model deployed with 25 beta engineering teams.",
    },
    {
      year: "2025 Q2",
      title: "SOC2 Type II & Series A",
      desc: "$18M Series A led by top developer-infrastructure venture firms to accelerate autonomous agents.",
    },
    {
      year: "2026",
      title: "TaskAura 4.2 Release",
      desc: "Multiplayer 3D WebGL dependency matrix, predictive blocker triage, and global developer CLI.",
    },
  ];

  return (
    <div className="relative min-h-screen bg-[#050b1a] text-white selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden">
      <CustomCursor />
      <Navbar onOpenAuth={handleOpenAuth} />

      <main className="w-full">
        {/* SECTION 1: HERO (Cinematic Deep Midnight) */}
        <section className="relative w-full min-h-[85vh] flex flex-col justify-center items-center pt-28 sm:pt-36 pb-16 sm:pb-20 overflow-hidden border-b border-cyan-500/20 bg-radial from-[#091b38] via-[#050b1a] to-[#030712]">
          <div className="absolute inset-0 bg-grid-cyber-dark opacity-35 pointer-events-none" />
          <div className="aura-glow-cyan top-1/4 left-1/2 -translate-x-1/2 w-[750px] h-[400px] opacity-40 pointer-events-none" />

          {/* 3D WEBGL GLOBE: Distributed Engineering Mesh */}
          <div className="absolute inset-0 w-full h-full z-0 flex items-center justify-center pointer-events-none opacity-80">
            <GlobalFleet3DCanvas />
          </div>

          <ZoomRevealSection className="w-full relative z-10">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
              <Badge variant="glow" size="md" icon={Sparkles} className="mb-6 mx-auto">
                The TaskAura Story & Architecture
              </Badge>

              <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-[1.12]">
                We Are Building The Autonomous <br />
                <span className="gradient-text-aura">Operating System For Engineering Teams.</span>
              </h1>

              <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
                Software development evolved from waterfall to agile, yet project management remained stuck in the 2000s — a chore of manual ticket updates, endless status meetings, and stale Gantt charts. We started TaskAura to give engineering squads an intelligent, self-driving execution platform.
              </p>

              {/* Company Vital Metrics */}
              <div className="mt-8 flex flex-wrap justify-center gap-3 sm:gap-4 text-xs font-mono font-semibold text-cyan-300">
                <span className="px-3.5 py-1.5 rounded-full bg-[#08152c] border border-cyan-500/30 flex items-center gap-1.5 shadow-md">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  10,000+ Projects Orchestrated
                </span>
                <span className="px-3.5 py-1.5 rounded-full bg-[#08152c] border border-cyan-500/30 flex items-center gap-1.5 shadow-md">
                  <Globe2 className="w-3.5 h-3.5 text-cyan-400" />
                  Distributed Across 18 Timezones
                </span>
                <span className="px-3.5 py-1.5 rounded-full bg-[#08152c] border border-cyan-500/30 flex items-center gap-1.5 shadow-md">
                  <Rocket className="w-3.5 h-3.5 text-emerald-400" />
                  4.2x Faster Sprint Velocity
                </span>
              </div>

              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <Button
                  variant="primary"
                  size="lg"
                  icon={ArrowRight}
                  iconPosition="right"
                  onClick={() => handleOpenAuth("signup")}
                >
                  Start Free Trial
                </Button>
                <Link
                  href="/contact"
                  onClick={() => playClickSound()}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-cyan-500/30 bg-[#09152b] hover:bg-cyan-500/10 text-sm font-bold text-slate-200 hover:text-white transition-all cursor-pointer shadow-lg shadow-cyan-950/40"
                >
                  <span>Contact Engineering</span>
                </Link>
              </div>
            </div>
          </ZoomRevealSection>
        </section>

        {/* SECTION 2: FOUNDATIONAL THESIS (High-Contrast Crisp Light / Luminous Pearl Canvas) */}
        <section className="relative w-full py-16 sm:py-24 border-b border-slate-200/90 bg-gradient-to-b from-[#eef5fa] via-[#f8fafc] to-[#e8f1f8] text-slate-900 overflow-hidden">
          <Slide3DSection direction="right" className="w-full">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-6 space-y-6">
                  <span className="text-xs font-mono font-bold text-cyan-800 uppercase tracking-widest bg-cyan-100/80 px-3.5 py-1.5 rounded-full border border-cyan-200">
                    Our Foundational Thesis
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight">
                    Software Engineers Were Hired To Build Systems, <br />
                    <span className="bg-gradient-to-r from-cyan-600 to-emerald-600 bg-clip-text text-transparent">
                      Not Manage Spreadsheets.
                    </span>
                  </h2>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    Every week, millions of engineers spend up to 20% of their working hours on administrative bureaucracy: writing duplicate tickets, attending sprint planning poker, updating Gantt progress bars, and chasing cross-team blockers.
                  </p>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    TaskAura replaces this friction with an autonomous neural mesh. By connecting directly to your codebase, CI/CD telemetry, and requirements briefs, our models understand what your team is building in real time — keeping roadmaps continuously up to date without interrupting your deep focus.
                  </p>

                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-md">
                      <div className="text-2xl font-black text-cyan-600">6.0 hrs</div>
                      <div className="text-xs text-slate-500 mt-1 font-medium">Saved per developer / week</div>
                    </div>
                    <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-md">
                      <div className="text-2xl font-black text-emerald-600">94.8%</div>
                      <div className="text-xs text-slate-500 mt-1 font-medium">On-time sprint completion rate</div>
                    </div>
                  </div>
                </div>

                {/* Right: Core Engineering Principles Card */}
                <div className="lg:col-span-6 p-8 rounded-3xl bg-[#081426] border border-cyan-500/30 shadow-2xl relative overflow-hidden">
                  <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold mb-4">
                    Engineering Axioms
                  </div>

                  <div className="space-y-4">
                    {[
                      {
                        title: "Autonomous by Default",
                        desc: "The platform acts on behalf of the developer. If AI can categorize, link, or estimate a task with high certainty, it does so immediately.",
                      },
                      {
                        title: "Sub-Second Latency",
                        desc: "Developer tools must be as responsive as local terminal editors. Every click, transition, and update completes under 100 milliseconds.",
                      },
                      {
                        title: "Codebase As Ground Truth",
                        desc: "Roadmaps that don't match the actual Git commit graph are useless. We anchor all project states directly in repository telemetry.",
                      },
                      {
                        title: "Privacy Without Compromise",
                        desc: "Customer intellectual property is never fed into training sets. We support private VPC and on-premise execution for complete sovereignty.",
                      },
                    ].map((p, idx) => (
                      <div key={idx} className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                        <div className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-300 font-mono text-xs flex items-center justify-center shrink-0">
                          {idx + 1}
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-white">{p.title}</h4>
                          <p className="text-xs text-slate-300 mt-1 leading-relaxed">{p.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Slide3DSection>
        </section>

        {/* SECTION 3: 3 ARCHITECTURAL PILLARS (Deep Cosmic Navy Stage) */}
        <section className="relative w-full py-16 sm:py-24 border-b border-cyan-500/20 bg-[#061022] text-white overflow-hidden">
          <TopDropSection className="w-full">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-12">
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest bg-cyan-950/80 border border-cyan-500/30 px-3 py-1 rounded-full">
                  Engineered Under The Hood
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-white mt-3">
                  The Three Core Pillars of TaskAura
                </h2>
                <p className="text-sm sm:text-base text-slate-300 mt-2">
                  Explore the architectural systems that power our real-time autonomous platform.
                </p>
              </div>

              {/* Pillar Tab Selector */}
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                {pillars.map((p, idx) => {
                  const Icon = p.icon;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => {
                        playClickSound();
                        setActivePillar(idx);
                      }}
                      className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl border text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                        activePillar === idx
                          ? "bg-cyan-500/25 border-cyan-400 text-cyan-200 shadow-lg shadow-cyan-950/40"
                          : "bg-[#09152b]/80 border-slate-800 text-slate-400 hover:text-white"
                      }`}
                    >
                      <Icon className="w-4 h-4 text-cyan-400" />
                      <span>{p.title}</span>
                    </button>
                  );
                })}
              </div>

              {/* Active Pillar Card */}
              <div className="p-8 sm:p-12 rounded-3xl bg-[#091630]/90 border border-cyan-500/30 shadow-2xl backdrop-blur-xl relative overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-8 space-y-4">
                    <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider font-bold">
                      {pillars[activePillar].stats}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-white">
                      {pillars[activePillar].title}
                    </h3>
                    <p className="text-base text-cyan-300 font-medium">
                      {pillars[activePillar].tagline}
                    </p>
                    <p className="text-sm text-slate-300 leading-relaxed pt-2">
                      {pillars[activePillar].description}
                    </p>

                    <div className="pt-4 space-y-2">
                      {pillars[activePillar].highlights.map((h, i) => (
                        <div key={i} className="flex items-center gap-3 text-xs sm:text-sm text-slate-200">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="lg:col-span-4 p-6 rounded-2xl bg-[#050e1f] border border-cyan-500/20 font-mono text-xs text-cyan-300 space-y-3">
                    <div className="flex items-center justify-between pb-3 border-b border-white/10 text-slate-400">
                      <span>TELEMETRY NODE</span>
                      <span className="text-emerald-400 font-bold">ONLINE</span>
                    </div>
                    <div>Mesh Status: 100% Operational</div>
                    <div>Sync Protocol: WebSocket + CRDT</div>
                    <div>Inference Engine: Claude 3.5 & GPT-4o</div>
                    <div>Encryption: TLS 1.3 / AES-256-GCM</div>
                    <div className="pt-3 border-t border-white/10 text-[11px] text-slate-400">
                      Continuous benchmark validation: PASSED
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TopDropSection>
        </section>

        {/* SECTION 4: LEADERSHIP TEAM & MILESTONES (Clean Light Canvas) */}
        <section className="relative w-full py-16 sm:py-24 border-b border-slate-200/90 bg-gradient-to-b from-[#f4f9fd] to-[#ffffff] text-slate-900 overflow-hidden">
          <Slide3DSection direction="left" className="w-full">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-14">
                <span className="text-xs font-mono font-bold text-cyan-800 uppercase tracking-widest bg-cyan-100/80 px-3.5 py-1.5 rounded-full border border-cyan-200">
                  The Minds Behind TaskAura
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-3">
                  Founders & Research Leadership
                </h2>
                <p className="text-sm sm:text-base text-slate-600 mt-2">
                  Engineers, researchers, and systems architects from MIT, Stripe, Linear, and Google Brain.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
                {team.map((member, idx) => (
                  <div
                    key={idx}
                    className="group rounded-3xl bg-white border border-slate-200/90 hover:border-cyan-400 p-5 transition-all duration-300 hover:-translate-y-1 shadow-lg shadow-slate-200/50"
                  >
                    <div className="relative mb-4 overflow-hidden rounded-2xl aspect-square">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md border border-cyan-500/30 text-[10px] font-mono font-bold text-cyan-300">
                        {member.badge}
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-cyan-700 transition-colors">
                      {member.name}
                    </h3>
                    <div className="text-xs font-bold text-cyan-700 mt-0.5">
                      {member.role}
                    </div>
                    <div className="text-[11px] font-mono text-slate-500 mt-1">
                      {member.pedigree}
                    </div>
                    <p className="mt-3 text-xs text-slate-600 leading-relaxed">
                      {member.bio}
                    </p>
                  </div>
                ))}
              </div>

              {/* Milestones Horizontal Grid */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {milestones.map((m, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-md hover:border-cyan-400 transition-all"
                  >
                    <div className="font-mono text-xs font-bold text-cyan-800 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 inline-block mb-3">
                      {m.year}
                    </div>
                    <h3 className="text-base font-black text-slate-900">{m.title}</h3>
                    <p className="mt-2 text-xs text-slate-600 leading-relaxed">{m.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </Slide3DSection>
        </section>

        {/* SECTION 5: OUR MISSION & VISION MANIFESTO (Deep Midnight Finale) */}
        <section className="relative w-full py-16 sm:py-24 bg-[#050b1a] text-white overflow-hidden">
          <PortalZoomSection className="w-full">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
              <Badge variant="glow" size="md" icon={Sparkles} className="mb-6 mx-auto">
                Our Ongoing Mission
              </Badge>
              <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight">
                Empowering Teams To Build <br />
                <span className="gradient-text-aura">The Future at The Speed of Thought.</span>
              </h2>
              <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
                TaskAura brings human creativity and artificial intelligence together. By automating daily ticket maintenance, status tracking, and dependency bottlenecks, we give teams their valuable time back to focus on high-impact innovation.
              </p>

              {/* 3 Core Impact Highlights */}
              <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                <div className="p-6 rounded-2xl bg-[#08152c] border border-cyan-500/30 shadow-lg">
                  <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-300 mb-4">
                    <Rocket className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white">Autonomous Planning</h3>
                  <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                    AI decomposes complex goals into granular daily tasks, removing hours of manual ticket grooming.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-[#08152c] border border-teal-500/30 shadow-lg">
                  <div className="w-10 h-10 rounded-xl bg-teal-950/80 border border-teal-500/40 flex items-center justify-center text-teal-300 mb-4">
                    <Users2 className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white">Real-Time Sync</h3>
                  <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                    CRDT-powered multiplayer keeps every squad member in sync across tasks, deadlines, and notifications.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-[#08152c] border border-emerald-500/30 shadow-lg">
                  <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center text-emerald-300 mb-4">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white">Predictive Velocity</h3>
                  <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                    Continuous burndown telemetry and bottleneck alerts ensure every milestone ships right on schedule.
                  </p>
                </div>
              </div>

              <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
                <Button
                  variant="primary"
                  size="lg"
                  icon={Sparkles}
                  onClick={() => handleOpenAuth("signup")}
                >
                  Get Started Free Today
                </Button>
                <Link
                  href="/contact"
                  onClick={() => playClickSound()}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-cyan-500/30 bg-[#09152b] hover:bg-cyan-500/10 text-sm font-bold text-slate-200 hover:text-white transition-all cursor-pointer shadow-lg shadow-cyan-950/40"
                >
                  <span>Connect with Engineering</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </PortalZoomSection>
        </section>
      </main>

      {/* Auth Modal */}
      <Modal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        title={authMode === "signup" ? "Join TaskAura Workspace" : "Welcome Back"}
      >
        <div className="p-4 text-center">
          <p className="text-sm text-slate-300 mb-4">
            Sign in to access sprint telemetry, interactive roadmaps, and autonomous copilot.
          </p>
          <Button
            variant="primary"
            fullWidth
            onClick={() => {
              playClickSound();
              setAuthModalOpen(false);
            }}
          >
            Continue with GitHub / SSO
          </Button>
        </div>
      </Modal>

      <Footer onOpenAuth={handleOpenAuth} />
    </div>
  );
}
