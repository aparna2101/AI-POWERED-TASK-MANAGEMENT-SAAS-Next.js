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
  HelpCircle,
  Search,
  ChevronDown,
  MessageSquare,
  Sparkles,
  ArrowRight,
  Shield,
  Zap,
  CheckCircle2,
  Lock,
  Server,
  GitBranch,
  CreditCard,
  X,
  FileQuestion,
  Headphones,
} from "lucide-react";
import { playClickSound } from "@/lib/sound";
import ZoomRevealSection from "@/components/animations/ZoomRevealSection";
import Slide3DSection from "@/components/animations/Slide3DSection";
import StageFoldSection from "@/components/animations/StageFoldSection";
import TopDropSection from "@/components/animations/TopDropSection";
import PortalZoomSection from "@/components/animations/PortalZoomSection";
import FaqKnowledgeMatrix3D from "@/components/3d/FaqKnowledgeMatrix3D";

export default function FaqPage() {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState("signup");

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [openIndex, setOpenIndex] = useState(0);

  const categories = [
    { id: "all", label: "All Questions" },
    { id: "ai", label: "Autonomous AI & Models" },
    { id: "security", label: "Security & Compliance" },
    { id: "migration", label: "Jira / Linear Migration" },
    { id: "billing", label: "Billing & Licensing" },
    { id: "hosting", label: "Private VPC & Self-Hosting" },
  ];

  const allFaqs = [
    {
      category: "ai",
      categoryLabel: "Autonomous AI",
      question: "What makes TaskAura fundamentally different from traditional tools like Jira or Linear?",
      answer:
        "Traditional project management systems are passive databases: engineers have to manually create tickets, fill story point estimates, link dependencies, and constantly update status fields. TaskAura is an active, autonomous execution system. By analyzing your PRDs, Git commit graphs, and pull requests, our multi-agent mesh automatically breaks down work, creates dependency graphs, and flags blockers before deadlines are missed.",
      highlight: "Active AI mesh vs passive databases",
    },
    {
      category: "ai",
      categoryLabel: "Autonomous AI",
      question: "How does TaskAura prevent AI hallucination in sprint duration estimates?",
      answer:
        "TaskAura never relies on pure LLM guesswork for sprint timelines. Instead, our neural models ground every estimate in your engineering organization's historical commit velocity, PR review latency distributions, and past sprint completions. We apply bounded mathematical verification so estimates reflect empirical reality.",
      highlight: "Mathematically verified historical grounding",
    },
    {
      category: "security",
      categoryLabel: "Security & Privacy",
      question: "Does TaskAura train public AI models on our proprietary code or specifications?",
      answer:
        "Never. We maintain strict zero-data retention agreements with all AI inference providers. Your requirements documentation, code snippets, issue titles, and team communications are processed through isolated, ephemeral inference nodes and are never stored or used to train any external or shared foundation models.",
      highlight: "Contractual Zero-Retention SLA",
    },
    {
      category: "security",
      categoryLabel: "Security & Privacy",
      question: "What enterprise compliance standards does TaskAura adhere to?",
      answer:
        "TaskAura is SOC-2 Type II certified and ISO-27001 compliant. All communications utilize TLS 1.3 encryption in transit and AES-256-GCM encryption at rest. We provide enterprise audit logs, automated BAA agreements for HIPAA compliance, and GDPR-compliant data processing.",
      highlight: "SOC2 Type II • ISO 27001 • HIPAA • GDPR",
    },
    {
      category: "hosting",
      categoryLabel: "VPC & Hosting",
      question: "Can our organization self-host TaskAura inside a private AWS or GCP VPC?",
      answer:
        "Yes. Our Enterprise Grid plan provides production-ready Kubernetes Helm charts and Docker Compose manifests for completely isolated, air-gapped private VPC deployments. You can connect your own self-hosted LLM instances (such as Llama 3 or Mistral) or use private dedicated endpoints.",
      highlight: "Air-Gapped Kubernetes & Helm manifests",
    },
    {
      category: "migration",
      categoryLabel: "Migration",
      question: "How easy is it to migrate our existing projects from Jira or Linear?",
      answer:
        "We provide automated one-click migration wizards for Jira Cloud, Jira Server, Linear, Asana, and GitHub Projects. The importer preserves all existing issue numbers, historical comments, assignees, tags, and attachment files without disrupting ongoing active sprints.",
      highlight: "1-Click automated importer preserves all history",
    },
    {
      category: "migration",
      categoryLabel: "Git & Developer",
      question: "How does bidirectional Git synchronization work?",
      answer:
        "TaskAura connects directly to GitHub, GitLab, and Bitbucket. When developers create a branch (e.g., `feature/AURA-42-auth`), TaskAura automatically updates the task to 'In Progress'. When a pull request merges with 'Fixes #AURA-42', the task automatically transitions to 'Done' and recalculates remaining sprint velocity.",
      highlight: "Native commit-message workflow: 'Fixes #AURA-xx'",
    },
    {
      category: "ai",
      categoryLabel: "Multiplayer Engine",
      question: "How does the sub-50ms real-time multiplayer canvas avoid merge conflicts?",
      answer:
        "TaskAura is architected on Conflict-Free Replicated Data Types (CRDTs). When multiple engineers move cards, update task descriptions, or restructure the 3D dependency graph simultaneously, updates merge deterministically without locks or race conditions, even across unstable network connections.",
      highlight: "Mathematical vector-clock convergence",
    },
    {
      category: "billing",
      categoryLabel: "Licensing",
      question: "Can external clients or stakeholders view roadmaps without paying for seats?",
      answer:
        "Yes! Every TaskAura workspace includes unlimited read-only Guest and Stakeholder passes. Executives, marketing collaborators, and external clients can review roadmaps, milestone timelines, and sprint progress without consuming paid developer licenses.",
      highlight: "Unlimited free stakeholder & client passes",
    },
    {
      category: "billing",
      categoryLabel: "Licensing",
      question: "What happens when our 14-day Pro trial concludes?",
      answer:
        "When your trial ends, you can choose to continue on the Pro or Enterprise tier, or seamlessly downgrade to our generous Free Starter tier (up to 5 engineers). Your project data, tasks, and historical sprints are never deleted or locked.",
      highlight: "Automatic seamless fallback to Free Starter",
    },
    {
      category: "hosting",
      categoryLabel: "VPC & Hosting",
      question: "Do you offer SLA guarantees for high-volume enterprise workloads?",
      answer:
        "Yes. Enterprise Grid includes a 99.99% uptime guarantee backed by financial service credits, 24/7 dedicated escalation engineering, and a designated Customer Success Architect.",
      highlight: "99.99% Financially backed uptime SLA",
    },
  ];

  const filteredFaqs = allFaqs.filter((f) => {
    const matchesCategory =
      selectedCategory === "all" || f.category === selectedCategory;
    const q = f.question.toLowerCase();
    const a = f.answer.toLowerCase();
    const s = searchQuery.toLowerCase();
    const matchesQuery = q.includes(s) || a.includes(s);
    return matchesCategory && matchesQuery;
  });

  const toggleAccordion = (idx) => {
    playClickSound();
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="relative min-h-screen bg-[#050b1a] text-white selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden">
      <CustomCursor />
      <Navbar onOpenAuth={(mode) => { setAuthMode(mode); setAuthModalOpen(true); }} />

      <main className="w-full">
        {/* SECTION 1: HERO (Cinematic Deep Midnight) */}
        <section className="relative w-full min-h-[80vh] flex flex-col justify-center items-center pt-28 sm:pt-36 pb-16 sm:pb-20 overflow-hidden border-b border-cyan-500/20 bg-radial from-[#091b38] via-[#050b1a] to-[#030712]">
          <div className="absolute inset-0 bg-grid-cyber-dark opacity-35 pointer-events-none" />
          <div className="aura-glow-cyan top-1/4 left-1/2 -translate-x-1/2 w-[750px] h-[380px] opacity-40 pointer-events-none" />

          {/* 3D WEBGL KNOWLEDGE MATRIX: Flanking Modular Data Blocks & Query Radar Beacon */}
          <div className="absolute inset-0 w-full h-full z-0 flex items-center justify-center pointer-events-none opacity-85">
            <FaqKnowledgeMatrix3D />
          </div>

          <ZoomRevealSection className="w-full relative z-10">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
              <Badge variant="glow" size="md" icon={HelpCircle} className="mb-6 mx-auto">
                Knowledge Center & Technical FAQ
              </Badge>

              <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-[1.14]">
                Answers To All Your Technical, <br />
                <span className="gradient-text-aura">Security & Architectural Questions.</span>
              </h1>

              <p className="mt-6 text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
                Everything you need to know about our autonomous AI mesh, zero-retention data privacy guarantees, migration paths, and enterprise self-hosting.
              </p>

              {/* Real-time Search Filter Bar */}
              <div className="mt-8 max-w-xl mx-auto relative">
                <Search className="w-5 h-5 text-cyan-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by keyword (e.g., 'zero-data', 'Jira migration', 'VPC', 'CRDT')..."
                  className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-[#08152c] border border-cyan-500/40 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 shadow-xl shadow-cyan-950/40"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Quick Keywords Pill Row */}
              <div className="mt-4 flex flex-wrap justify-center gap-2 text-xs font-mono text-slate-400">
                <span>Popular Searches:</span>
                {["Zero Data Retention", "Jira Import", "Kubernetes VPC", "CRDT Sync", "Pricing"].map((kw) => (
                  <button
                    key={kw}
                    type="button"
                    onClick={() => setSearchQuery(kw)}
                    className="text-cyan-400 hover:text-cyan-300 underline cursor-pointer"
                  >
                    {kw}
                  </button>
                ))}
              </div>
            </div>
          </ZoomRevealSection>
        </section>

        {/* SECTION 2: ACCORDION LIST (High-Contrast Crisp Light / Luminous Surface) */}
        <section className="relative w-full py-16 sm:py-24 border-b border-slate-200/90 bg-gradient-to-b from-[#eef5fa] via-[#f8fafc] to-[#e8f1f8] text-slate-900 overflow-hidden">
          <Slide3DSection direction="right" className="w-full">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
              
              {/* Category Tabs */}
              <div className="flex items-center justify-center flex-wrap gap-2.5 mb-10">
                {categories.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => {
                      playClickSound();
                      setSelectedCategory(c.id);
                    }}
                    className={`px-4.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                      selectedCategory === c.id
                        ? "bg-slate-950 text-white shadow-md"
                        : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200/90 shadow-xs hover:border-slate-300"
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-between mb-8 pb-3 border-b border-slate-200 text-xs font-mono text-slate-500">
                <span>Showing {filteredFaqs.length} Architecture Answers</span>
                <span>Click any question to expand details</span>
              </div>

              <div className="space-y-4">
                {filteredFaqs.length === 0 ? (
                  <div className="p-12 text-center rounded-3xl bg-white border border-slate-200/90 shadow-md">
                    <HelpCircle className="w-10 h-10 text-slate-400 mx-auto mb-3" />
                    <h3 className="text-lg font-bold text-slate-900">No Matching Questions Found</h3>
                    <p className="text-sm text-slate-500 mt-1">
                      Try searching for another keyword or reach out directly to our engineering team.
                    </p>
                    <Link
                      href="/contact"
                      className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-50 border border-cyan-200 text-xs font-bold text-cyan-800 hover:bg-cyan-100 transition-all"
                    >
                      <span>Contact Solutions Engineer</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                ) : (
                  filteredFaqs.map((faq, idx) => {
                    const isOpen = openIndex === idx;
                    return (
                      <div
                        key={idx}
                        className={`rounded-3xl border transition-all overflow-hidden ${
                          isOpen
                            ? "bg-white border-cyan-400 shadow-xl shadow-cyan-900/5"
                            : "bg-white border-slate-200/90 hover:border-slate-300 shadow-xs"
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => toggleAccordion(idx)}
                          className="w-full p-6 text-left flex items-start justify-between gap-4 cursor-pointer"
                        >
                          <div>
                            <span className="inline-block px-2.5 py-0.5 rounded-md bg-cyan-50 border border-cyan-200 text-[11px] font-mono font-bold text-cyan-800 mb-2">
                              {faq.categoryLabel}
                            </span>
                            <h3 className="text-base sm:text-lg font-bold text-slate-900 hover:text-cyan-700 transition-colors">
                              {faq.question}
                            </h3>
                          </div>
                          <ChevronDown
                            className={`w-5 h-5 text-cyan-600 shrink-0 mt-1 transition-transform duration-300 ${
                              isOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        {isOpen && (
                          <div className="px-6 pb-6 pt-2 border-t border-slate-100 text-sm text-slate-600 space-y-4">
                            <p className="leading-relaxed">{faq.answer}</p>
                            <div className="pt-2 flex items-center justify-between text-xs font-mono">
                              <span className="text-emerald-700 font-semibold flex items-center gap-1.5">
                                <CheckCircle2 className="w-4 h-4" />
                                {faq.highlight}
                              </span>
                              <Link
                                href="/contact"
                                className="text-cyan-700 hover:text-cyan-900 font-bold flex items-center gap-1"
                              >
                                <span>Discuss with engineering</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </Link>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </Slide3DSection>
        </section>

        {/* SECTION 3: ENGINEERING OUTREACH BOX (Deep Cosmic Navy Stage) */}
        <section className="relative w-full py-16 sm:py-24 bg-[#061022] border-b border-cyan-500/20 text-white overflow-hidden">
          <TopDropSection className="w-full">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
              <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-cyan-950/60 to-[#0c2040]/80 border border-cyan-500/40 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest bg-cyan-950/80 border border-cyan-500/30 px-3 py-1 rounded-full">
                    Direct Engineering Support
                  </span>
                  <h3 className="text-2xl font-black text-white mt-3">
                    Still Have An Unanswered Question?
                  </h3>
                  <p className="text-sm text-slate-300 mt-2 max-w-lg">
                    Our distributed solutions architects are available 24/7 to discuss custom VPCs, compliance needs, and workflow migrations.
                  </p>
                </div>

                <Link
                  href="/contact"
                  onClick={() => playClickSound()}
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#00c2ff] to-[#00e599] text-[#050b1a] text-xs sm:text-sm font-black whitespace-nowrap shadow-lg shadow-cyan-500/25 hover:opacity-95 transition-all flex items-center gap-2 shrink-0 cursor-pointer"
                >
                  <span>Connect With Engineering</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </TopDropSection>
        </section>

        {/* SECTION 4: CTA (Deep Midnight Finale) */}
        <section className="relative w-full py-16 sm:py-24 text-center bg-[#050b1a] text-white overflow-hidden">
          <PortalZoomSection className="w-full">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl sm:text-4xl font-black text-white">
                Ready To Accelerate Your Engineering Velocity?
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
                  Start Free Trial
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
        title={authMode === "signup" ? "Get Started with TaskAura" : "Sign In"}
      >
        <div className="p-4 text-center">
          <p className="text-sm text-slate-300 mb-4">
            Create your account to start managing autonomous sprints and predictive roadmaps.
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
