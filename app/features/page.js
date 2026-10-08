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
  Kanban,
  Users2,
  Cpu,
  BarChart3,
  CalendarDays,
  Zap,
  Activity,
  ArrowRight,
  CheckCircle2,
  X,
  Layers,
  GitBranch,
  ShieldCheck,
  Terminal,
  Copy,
  Check,
  Lock,
  Workflow,
  Boxes,
  Eye,
  Sliders,
  Code2,
  GitPullRequest,
  CheckCircle,
  Clock,
  Laptop,
} from "lucide-react";
import { playClickSound, playSuccessSound } from "@/lib/sound";
import ZoomRevealSection from "@/components/animations/ZoomRevealSection";
import Slide3DSection from "@/components/animations/Slide3DSection";
import StageFoldSection from "@/components/animations/StageFoldSection";
import TopDropSection from "@/components/animations/TopDropSection";
import PortalZoomSection from "@/components/animations/PortalZoomSection";
import FeaturesKanban3D from "@/components/3d/FeaturesKanban3D";

export default function FeaturesPage() {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState("signup");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [copiedCode, setCopiedCode] = useState(false);
  const [codeTab, setCodeTab] = useState("cli");
  const [interactiveView, setInteractiveView] = useState("kanban");

  const categories = [
    { id: "all", label: "All Capabilities" },
    { id: "ai", label: "Autonomous AI" },
    { id: "agile", label: "Agile & Sprints" },
    { id: "sync", label: "Multiplayer & 3D" },
    { id: "dev", label: "Developer & CLI" },
    { id: "security", label: "Enterprise Security" },
  ];

  const allFeatures = [
    {
      id: "01",
      category: "ai",
      title: "Autonomous Sprint Generation",
      tagline: "Natural Language PRD → 2-Week Sprint in 30 Seconds",
      description:
        "Provide a plain-English product requirement or design spec. TaskAura's neural agents break it down into atomic user stories, identify technical dependencies, and build estimated sprint milestones.",
      metrics: "90% faster sprint planning",
      icon: Sparkles,
      previewType: "sprint_gen",
      cardTheme: "bg-white border-cyan-200/90 shadow-xl shadow-cyan-900/5 hover:border-cyan-400",
      badgeColor: "bg-cyan-50 text-cyan-800 border-cyan-200",
    },
    {
      id: "02",
      category: "ai",
      title: "Predictive Blocker & Deadlock Triage",
      tagline: "Spot critical-path bottlenecks 5 days before they stall work",
      description:
        "Our telemetry engine continuously analyzes pull request merges, team review latency, and interdependent tasks, alerting tech leads before deadlines slip.",
      metrics: "Zero surprises at sprint end",
      icon: Cpu,
      previewType: "blocker_triage",
      cardTheme: "bg-white border-emerald-200/90 shadow-xl shadow-emerald-900/5 hover:border-emerald-400",
      badgeColor: "bg-emerald-50 text-emerald-800 border-emerald-200",
    },
    {
      id: "03",
      category: "agile",
      title: "Multi-Perspective 5D Workspaces",
      tagline: "Switch effortlessly between Kanban, Gantt, List, and 3D Canvas",
      description:
        "Every engineer has their preferred visualization. TaskAura syncs task states across interactive Kanban boards, Gantt timelines, compact developer lists, and 3D dependency matrices.",
      metrics: "Real-time state consistency",
      icon: Kanban,
      previewType: "views_switcher",
      cardTheme: "bg-white border-indigo-200/90 shadow-xl shadow-indigo-900/5 hover:border-indigo-400",
      badgeColor: "bg-indigo-50 text-indigo-800 border-indigo-200",
    },
    {
      id: "04",
      category: "sync",
      title: "CRDT-Driven Zero-Latency Multiplayer",
      tagline: "Sub-50ms sync with live cursor presence",
      description:
        "Built on state-of-the-art Conflict-Free Replicated Data Types. Watch team members edit roadmaps, rearrange cards, and leave threaded comments with zero race conditions.",
      metrics: "< 45ms global P99 latency",
      icon: Users2,
      previewType: "multiplayer",
      cardTheme: "bg-white border-cyan-200/90 shadow-xl shadow-cyan-900/5 hover:border-cyan-400",
      badgeColor: "bg-cyan-50 text-cyan-800 border-cyan-200",
    },
    {
      id: "05",
      category: "dev",
      title: "Bidirectional Git & GitHub Sync",
      tagline: "Close tickets with commit messages: 'Fixes #AURA-42'",
      description:
        "Two-way synchronization with GitHub, GitLab, and Bitbucket. Branch creation, PR status reviews, and automated story point completion directly linked to your Git tree.",
      metrics: "Automatic commit linking",
      icon: GitBranch,
      previewType: "git_sync",
      cardTheme: "bg-white border-amber-200/90 shadow-xl shadow-amber-900/5 hover:border-amber-400",
      badgeColor: "bg-amber-50 text-amber-800 border-amber-200",
    },
    {
      id: "06",
      category: "dev",
      title: "Developer CLI & REST API",
      tagline: "Manage sprints directly from your native terminal",
      description:
        "Don't want to leave your terminal? Use `aura sprint list`, `aura task move 104 in-progress`, and trigger AI blockers directly inside Vim or VS Code.",
      metrics: "100% headless API coverage",
      icon: Terminal,
      previewType: "cli_demo",
      cardTheme: "bg-white border-slate-300 shadow-xl shadow-slate-900/5 hover:border-slate-500",
      badgeColor: "bg-slate-100 text-slate-800 border-slate-300",
    },
    {
      id: "07",
      category: "security",
      title: "Zero-Data Retention Architecture",
      tagline: "Your codebase never trains public AI models",
      description:
        "We sign strict zero-retention enterprise agreements. Your proprietary requirements and commit histories remain strictly confidential within your isolated tenant.",
      metrics: "SOC2 Type II Certified",
      icon: ShieldCheck,
      previewType: "security_vault",
      cardTheme: "bg-white border-emerald-200/90 shadow-xl shadow-emerald-900/5 hover:border-emerald-400",
      badgeColor: "bg-emerald-50 text-emerald-800 border-emerald-200",
    },
    {
      id: "08",
      category: "security",
      title: "Air-Gapped Private VPC & On-Premise",
      tagline: "Deploy on AWS, GCP, or bare-metal Kubernetes",
      description:
        "For finance, healthcare, and defense teams with strict compliance mandates. Deploy TaskAura on your own isolated infrastructure with SAML SSO and SCIM sync.",
      metrics: "HIPAA & GDPR Ready",
      icon: Lock,
      previewType: "vpc_cloud",
      cardTheme: "bg-white border-blue-200/90 shadow-xl shadow-blue-900/5 hover:border-blue-400",
      badgeColor: "bg-blue-50 text-blue-800 border-blue-200",
    },
  ];

  const filteredFeatures =
    selectedCategory === "all"
      ? allFeatures
      : allFeatures.filter((f) => f.category === selectedCategory);

  const comparisonRows = [
    {
      feature: "Autonomous Sprint Synthesis from PRDs",
      aura: true,
      jira: false,
      linear: false,
      monday: false,
    },
    {
      feature: "Predictive Critical-Path Blocker Detection",
      aura: true,
      jira: false,
      linear: "Limited",
      monday: false,
    },
    {
      feature: "3D WebGL Dependency Graph Canvas",
      aura: true,
      jira: false,
      linear: false,
      monday: false,
    },
    {
      feature: "Two-way Bidirectional Git PR Synchronization",
      aura: true,
      jira: "Complex plugin",
      linear: true,
      monday: "Webhook only",
    },
    {
      feature: "Zero-Data AI Retention Guarantee",
      aura: true,
      jira: "Unknown",
      linear: true,
      monday: "Unknown",
    },
    {
      feature: "Average Sprint Setup & Grooming Time",
      aura: "5 Minutes",
      jira: "2.5 Hours",
      linear: "45 Minutes",
      monday: "1.5 Hours",
    },
    {
      feature: "Air-Gapped Self-Hosting Kubernetes Manifests",
      aura: true,
      jira: "Data Center (Legacy)",
      linear: false,
      monday: false,
    },
  ];

  const codeSnippets = {
    cli: `# 1. Install TaskAura Native CLI
npm install -g @taskaura/cli

# 2. Authenticate your engineering organization
aura login --key=aura_live_99f8d7c

# 3. Auto-synthesize full 2-week backlog from PRD markdown
aura sprint synthesize --spec="./specs/auth-v2.md" --capacity=48

# 4. Run real-time blocker & risk analysis
aura copilot triage --sprint=24 --output=markdown`,

    sdk: `import { TaskAuraClient } from '@taskaura/sdk';

const aura = new TaskAuraClient({
  apiKey: process.env.TASKAURA_API_KEY,
  workspaceId: 'ws_prod_9941',
});

// Autonomous sprint creation with fine-tuned neural models
const sprint = await aura.sprints.createFromSpec({
  title: 'v2.0 Infrastructure Migration',
  specText: 'Migrate user service to Go with zero-downtime database cutover',
  teamCapacityPoints: 48,
});

console.log('✅ Generated Stories:', sprint.tasks.length);
console.log('⚠️ Predicted Blockers:', sprint.blockers);`,

    python: `from taskaura import TaskAura

client = TaskAura(api_key="aura_live_secret")

# Run autonomous backlog synthesis across Git commit tree
sprint = client.sprints.synthesize(
    prd_path="./specs/payment_mesh.md",
    assignees=["elena@team.ai", "marcus@team.ai"],
    duration_weeks=2
)

for task in sprint.tasks:
    print(f"[{task.priority}] {task.title} -> Assigned: {task.assignee} ({task.points} pts)")`,
  };

  const handleCopyCode = () => {
    playSuccessSound();
    navigator.clipboard.writeText(codeSnippets[codeTab]);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="relative min-h-screen bg-[#050b1a] text-white selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden">
      <CustomCursor />
      <Navbar onOpenAuth={(mode) => { setAuthMode(mode); setAuthModalOpen(true); }} />

      <main className="w-full">
        {/* SECTION 1: HERO (Cinematic Deep Navy with Cyber Mesh & Neon Glows) */}
        <section className="relative w-full min-h-[85vh] flex flex-col justify-center items-center pt-28 sm:pt-36 pb-16 sm:pb-20 overflow-hidden border-b border-cyan-500/20 bg-radial from-[#091b38] via-[#050b1a] to-[#030712]">
          <div className="absolute inset-0 bg-grid-cyber-dark opacity-40 pointer-events-none" />
          <div className="aura-glow-cyan top-1/4 left-1/2 -translate-x-1/2 w-[750px] h-[380px] opacity-40 pointer-events-none" />
          <div className="aura-glow-emerald bottom-0 right-10 w-[450px] h-[300px] opacity-25 pointer-events-none" />

          {/* 3D WEBGL KANBAN: 3D Isometric Holographic Kanban Board & Gliding Task Cards */}
          <div className="absolute inset-0 w-full h-full z-0 flex items-center justify-center pointer-events-none opacity-85">
            <FeaturesKanban3D />
          </div>

          <ZoomRevealSection className="w-full relative z-10">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
              <Badge variant="glow" size="md" icon={Zap} className="mb-6 mx-auto">
                Autonomous Feature Ecosystem 4.2
              </Badge>

              <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-[1.12]">
                Engineered For Pure Velocity. <br />
                <span className="gradient-text-aura">Architected For Enterprise Scale.</span>
              </h1>

              <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
                From autonomous PRD synthesis to sub-50ms multiplayer canvas and developer-friendly CLIs — explore every capability engineered to make engineering teams unstoppable.
              </p>

              {/* Quick Stat Highlights Pill Row */}
              <div className="mt-8 flex flex-wrap justify-center gap-3 sm:gap-4 text-xs font-mono font-semibold text-cyan-300">
                <span className="px-3.5 py-1.5 rounded-full bg-[#08152c] border border-cyan-500/30 flex items-center gap-1.5 shadow-md">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  100% Autonomous Planning
                </span>
                <span className="px-3.5 py-1.5 rounded-full bg-[#08152c] border border-cyan-500/30 flex items-center gap-1.5 shadow-md">
                  <Activity className="w-3.5 h-3.5 text-cyan-400" />
                  &lt; 45ms P99 Sync Latency
                </span>
                <span className="px-3.5 py-1.5 rounded-full bg-[#08152c] border border-cyan-500/30 flex items-center gap-1.5 shadow-md">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Zero-Data Training Policy
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
                  Start Free 14-Day Trial
                </Button>
                <Link
                  href="/pricing"
                  onClick={() => playClickSound()}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-cyan-500/30 bg-[#09152b] hover:bg-cyan-500/10 text-sm font-bold text-slate-200 hover:text-white transition-all cursor-pointer shadow-lg shadow-cyan-950/40"
                >
                  <span>Explore Plans & ROI</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </ZoomRevealSection>
        </section>

        {/* SECTION 2: FEATURE MATRIX (High-Contrast Crisp Pearl / Light Canvas) */}
        <section className="relative w-full py-16 sm:py-24 border-b border-slate-200/90 bg-gradient-to-b from-[#eef5fa] via-[#f8fafc] to-[#e8f1f8] text-slate-900 overflow-hidden">
          <TopDropSection className="w-full">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              
              {/* Category Tabs Pill Bar */}
              <div className="flex items-center justify-center flex-wrap gap-2.5 mb-14">
                {categories.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => {
                      playClickSound();
                      setSelectedCategory(c.id);
                    }}
                    className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                      selectedCategory === c.id
                        ? "bg-slate-950 text-white shadow-lg shadow-slate-950/20"
                        : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200/90 shadow-xs hover:border-slate-300"
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>

              {/* Cards Grid with Interactive Previews */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredFeatures.map((f) => {
                  const Icon = f.icon;
                  return (
                    <div
                      key={f.id}
                      className={`p-7 rounded-3xl ${f.cardTheme} border transition-all duration-300 hover:-translate-y-1 group flex flex-col justify-between`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-5">
                          <div className="w-12 h-12 rounded-2xl bg-cyan-50 border border-cyan-200 flex items-center justify-center text-cyan-700 group-hover:scale-110 transition-transform">
                            <Icon className="w-6 h-6" />
                          </div>
                          <span className="font-mono text-xs font-bold text-slate-400">
                            FEATURE #{f.id}
                          </span>
                        </div>

                        <h3 className="text-xl font-black text-slate-900 group-hover:text-cyan-700 transition-colors">
                          {f.title}
                        </h3>
                        <p className="mt-1 text-xs font-mono text-cyan-700 font-semibold">
                          {f.tagline}
                        </p>
                        <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                          {f.description}
                        </p>

                        {/* Interactive Visual Preview Box per Card */}
                        <div className="mt-5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 font-mono text-[11px] text-slate-700 space-y-2">
                          {f.previewType === "sprint_gen" && (
                            <div className="space-y-1">
                              <div className="flex items-center justify-between text-[10px] text-slate-500">
                                <span>INPUT: RFC-42.md</span>
                                <span className="text-emerald-700 font-bold">SYNTHESIZED</span>
                              </div>
                              <div className="text-slate-900 font-semibold">✦ 6 User Stories • 18 Points</div>
                              <div className="text-[10px] text-slate-500">Auto-allocated to 3 engineers</div>
                            </div>
                          )}

                          {f.previewType === "blocker_triage" && (
                            <div className="space-y-1">
                              <div className="flex items-center gap-1.5 text-amber-700 font-bold">
                                <span>⚠️ PR #184 Stalled (38h)</span>
                              </div>
                              <div className="text-[10px] text-slate-500">Blocks: Staging deployment pipeline</div>
                              <div className="text-[10px] text-emerald-700 font-semibold">Auto-escalated to @Aria</div>
                            </div>
                          )}

                          {f.previewType === "views_switcher" && (
                            <div className="flex items-center justify-between gap-1 text-[10px]">
                              {["Kanban", "Gantt", "List", "3D"].map((v) => (
                                <span
                                  key={v}
                                  className={`px-2 py-0.5 rounded-md font-bold ${
                                    v === "Kanban"
                                      ? "bg-indigo-600 text-white"
                                      : "bg-white border text-slate-600"
                                  }`}
                                >
                                  {v}
                                </span>
                              ))}
                            </div>
                          )}

                          {f.previewType === "multiplayer" && (
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                                <span className="font-bold text-slate-900">4 Active Cursors</span>
                              </div>
                              <span className="text-[10px] text-slate-500">CRDT Sync: 32ms</span>
                            </div>
                          )}

                          {f.previewType === "git_sync" && (
                            <div className="flex items-center justify-between">
                              <span className="text-slate-900 font-semibold">git push origin main</span>
                              <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                                #AURA-42 Closed
                              </span>
                            </div>
                          )}

                          {f.previewType === "cli_demo" && (
                            <div className="text-slate-900 font-mono">
                              <span className="text-cyan-700">$ aura</span> sprint create --now
                            </div>
                          )}

                          {f.previewType === "security_vault" && (
                            <div className="flex items-center justify-between">
                              <span>Zero Retention</span>
                              <span className="text-emerald-700 font-bold">SOC2 Audited</span>
                            </div>
                          )}

                          {f.previewType === "vpc_cloud" && (
                            <div className="flex items-center justify-between text-[10px]">
                              <span>AWS VPC</span>
                              <span>•</span>
                              <span>GCP</span>
                              <span>•</span>
                              <span>Kubernetes</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                        <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-full border ${f.badgeColor}`}>
                          ✦ {f.metrics}
                        </span>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-700 group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </TopDropSection>
        </section>

        {/* SECTION 3: DEVELOPER CLI WORKBENCH (Deep Cosmic Navy & Cyan Code Console) */}
        <section className="relative w-full py-16 sm:py-24 border-b border-cyan-500/20 bg-[#061022] text-white overflow-hidden">
          <Slide3DSection direction="right" className="w-full">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-5 space-y-5">
                  <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest bg-cyan-950/80 border border-cyan-500/30 px-3 py-1 rounded-full">
                    Developer Native Architecture
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
                    Designed For Engineers Who Love Their Terminals.
                  </h2>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                    TaskAura was built by engineers, for engineers. Script sprint creation into your CI/CD, invoke neural Copilot from your terminal, or query our REST API directly.
                  </p>

                  <div className="space-y-3 pt-2">
                    {[
                      "Native CLI with fuzzy completion and colored output",
                      "TypeScript & Python SDKs with full type safety",
                      "Real-time webhooks for Slack, Discord, and CI/CD triggers",
                      "GitHub Actions and GitLab CI automated integrations",
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-xs sm:text-sm text-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Code Terminal Display */}
                <div className="lg:col-span-7 bg-[#040c1a] border border-cyan-500/30 rounded-3xl p-6 shadow-2xl relative overflow-hidden font-mono text-xs">
                  <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                      <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                      <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                      <span className="text-slate-400 text-xs ml-2">taskaura-developer-workbench</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {["cli", "sdk", "python"].map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => {
                            playClickSound();
                            setCodeTab(t);
                          }}
                          className={`px-3 py-1 rounded-lg text-[11px] font-bold uppercase transition-all cursor-pointer ${
                            codeTab === t
                              ? "bg-cyan-500/30 border border-cyan-400 text-cyan-200"
                              : "text-slate-400 hover:text-white"
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                      <button
                        type="button"
                        onClick={handleCopyCode}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white ml-2 cursor-pointer transition-colors"
                        title="Copy snippet"
                      >
                        {copiedCode ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <pre className="text-cyan-200 overflow-x-auto p-2 leading-relaxed">
                    <code>{codeSnippets[codeTab]}</code>
                  </pre>
                </div>
              </div>
            </div>
          </Slide3DSection>
        </section>

        {/* SECTION 4: HEAD-TO-HEAD MATRIX (Clean Luminous Surface) */}
        <section className="relative w-full py-16 sm:py-24 border-b border-slate-200/90 bg-gradient-to-b from-[#f4f9fd] to-[#ffffff] text-slate-900 overflow-hidden">
          <Slide3DSection direction="left" className="w-full">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-14">
                <span className="text-xs font-mono font-bold text-cyan-800 uppercase tracking-widest bg-cyan-100/80 px-3 py-1 rounded-full border border-cyan-200">
                  No Compromises
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-3">
                  TaskAura vs The Competition
                </h2>
                <p className="text-sm sm:text-base text-slate-600 mt-2">
                  See why high-velocity engineering organizations switch from legacy ticket systems.
                </p>
              </div>

              <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-xl">
                <table className="min-w-[620px] w-full text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50 text-xs font-mono uppercase tracking-wider">
                      <th className="p-5 text-slate-700">Platform Capability</th>
                      <th className="p-5 text-cyan-900 font-bold bg-cyan-50">TaskAura 4.2</th>
                      <th className="p-5 text-slate-500">Jira</th>
                      <th className="p-5 text-slate-500">Linear</th>
                      <th className="p-5 text-slate-500">Monday.com</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {comparisonRows.map((row, idx) => (
                      <tr key={idx} className="hover:bg-cyan-50/40 transition-colors">
                        <td className="p-5 font-semibold text-slate-800">{row.feature}</td>

                        {/* TaskAura Column */}
                        <td className="p-5 font-bold text-emerald-700 bg-cyan-50/60">
                          {typeof row.aura === "boolean" ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                          ) : (
                            <span className="font-mono text-cyan-800">{row.aura}</span>
                          )}
                        </td>

                        {/* Jira */}
                        <td className="p-5 text-slate-500">
                          {typeof row.jira === "boolean" ? (
                            row.jira ? <CheckCircle2 className="w-5 h-5 text-slate-400" /> : <X className="w-5 h-5 text-slate-300" />
                          ) : (
                            <span>{row.jira}</span>
                          )}
                        </td>

                        {/* Linear */}
                        <td className="p-5 text-slate-500">
                          {typeof row.linear === "boolean" ? (
                            row.linear ? <CheckCircle2 className="w-5 h-5 text-slate-400" /> : <X className="w-5 h-5 text-slate-300" />
                          ) : (
                            <span>{row.linear}</span>
                          )}
                        </td>

                        {/* Monday */}
                        <td className="p-5 text-slate-500">
                          {typeof row.monday === "boolean" ? (
                            row.monday ? <CheckCircle2 className="w-5 h-5 text-slate-400" /> : <X className="w-5 h-5 text-slate-300" />
                          ) : (
                            <span>{row.monday}</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Slide3DSection>
        </section>

        {/* SECTION 5: CTA (Deep Midnight with Glowing Gold & Cyan Accents) */}
        <section className="relative w-full py-16 sm:py-24 text-center bg-[#050b1a] border-t border-cyan-500/20 text-white overflow-hidden">
          <PortalZoomSection className="w-full">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl sm:text-4xl font-black text-white">
                Level Up Your Engineering Workflow Today
              </h2>
              <p className="mt-4 text-base text-slate-300 max-w-2xl mx-auto">
                14-day unrestricted trial. Connect your GitHub or Jira in under 2 minutes.
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
                  Get Started Free Now
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
        title={authMode === "signup" ? "Create TaskAura Account" : "Sign In"}
      >
        <div className="p-4 text-center">
          <p className="text-sm text-slate-300 mb-4">
            Experience the autonomous sprint platform built for modern engineering squads.
          </p>
          <Button
            variant="primary"
            fullWidth
            onClick={() => {
              playClickSound();
              setAuthModalOpen(false);
            }}
          >
            Authenticate with GitHub / SSO
          </Button>
        </div>
      </Modal>

      <Footer onOpenAuth={(mode) => { setAuthMode(mode); setAuthModalOpen(true); }} />
    </div>
  );
}
