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
  CheckCircle2,
  X,
  ArrowRight,
  ShieldCheck,
  CreditCard,
  Calculator,
  Zap,
  HelpCircle,
  Clock,
  DollarSign,
  TrendingUp,
  Lock,
  Server,
  Users2,
  Activity,
} from "lucide-react";
import confetti from "canvas-confetti";
import { playClickSound, playSuccessSound } from "@/lib/sound";
import ZoomRevealSection from "@/components/animations/ZoomRevealSection";
import Slide3DSection from "@/components/animations/Slide3DSection";
import StageFoldSection from "@/components/animations/StageFoldSection";
import TopDropSection from "@/components/animations/TopDropSection";
import PortalZoomSection from "@/components/animations/PortalZoomSection";
import PricingCyberVault3D from "@/components/3d/PricingCyberVault3D";

export default function PricingPage() {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState("signup");

  // Billing Cycle Toggle (Monthly vs Annual - 20% discount)
  const [isAnnual, setIsAnnual] = useState(true);

  // Interactive ROI Calculator State
  const [teamSize, setTeamSize] = useState(25);
  const [hourlyRate, setHourlyRate] = useState(85);

  const hoursSavedPerWeekPerDev = 6.0;
  const monthlyHoursSaved = Math.round(teamSize * hoursSavedPerWeekPerDev * 4.2);
  const annualDollarSavings = Math.round(monthlyHoursSaved * 12 * hourlyRate);
  const annualAuraCost = teamSize * (isAnnual ? 15 : 19) * 12;
  const netRoiMultiplier = Math.round((annualDollarSavings / (annualAuraCost || 1)) * 10) / 10;

  const plans = [
    {
      id: "starter",
      name: "Starter",
      badge: "Free Forever",
      priceMonthly: 0,
      priceAnnual: 0,
      tagline: "For boutique engineering squads and open-source contributors.",
      highlight: "Up to 5 engineers",
      popular: false,
      cta: "Start Free",
      features: [
        "Up to 5 squad seats",
        "Unlimited public & private projects",
        "Standard Kanban & List views",
        "Basic AI Copilot prompts (50/day)",
        "GitHub & GitLab commit integration",
        "Community Discord support",
      ],
    },
    {
      id: "pro",
      name: "Pro Velocity",
      badge: "Most Popular",
      priceMonthly: 19,
      priceAnnual: 15,
      tagline: "For fast-scaling engineering teams wanting autonomous sprint execution.",
      highlight: "Per engineer / month",
      popular: true,
      cta: "Start 14-Day Free Trial",
      features: [
        "Unlimited engineering seats",
        "Autonomous Sprint Generation from PRDs",
        "Predictive critical-path blocker triage",
        "Multi-perspective 3D WebGL dependency matrix",
        "Sub-50ms CRDT real-time multiplayer",
        "Unlimited AI Copilot inference queries",
        "Bi-directional Git PR synchronization",
        "Priority engineering support (< 2 hr response)",
      ],
    },
    {
      id: "enterprise",
      name: "Enterprise Grid",
      badge: "Sovereign Security",
      priceMonthly: 49,
      priceAnnual: 39,
      tagline: "For organizations with strict compliance, air-gapped VPCs, and dedicated SLAs.",
      highlight: "Custom volume licensing",
      popular: false,
      cta: "Contact Enterprise Sales",
      features: [
        "Everything in Pro Velocity",
        "Air-Gapped Private VPC deployment (AWS / GCP / Azure)",
        "Zero-data retention legal agreements",
        "SAML 2.0 Single Sign-On & SCIM sync",
        "Custom fine-tuned LLM agents on internal documentation",
        "99.99% production uptime SLA guarantee",
        "Dedicated technical account manager & solutions architect",
        "24/7 dedicated Slack/Teams incident escalation bridge",
      ],
    },
  ];

  const comparisonCategories = [
    {
      name: "Agile & Core Workspace",
      items: [
        { name: "Kanban, Gantt & List Workspaces", starter: true, pro: true, enterprise: true },
        { name: "3D WebGL Dependency Graph Canvas", starter: false, pro: true, enterprise: true },
        { name: "CRDT Zero-Latency Multiplayer", starter: "Standard", pro: "Sub-50ms Global", enterprise: "Dedicated Edge Cluster" },
        { name: "Active Projects & Epics", starter: "5 Active", pro: "Unlimited", enterprise: "Unlimited" },
        { name: "Automated Sprint Burndown Analytics", starter: "Basic", pro: "Predictive", enterprise: "Advanced Monte Carlo" },
      ],
    },
    {
      name: "Autonomous AI & Copilot",
      items: [
        { name: "PRD-to-Sprint Backlog Synthesis", starter: "Limited (3/mo)", pro: true, enterprise: true },
        { name: "Predictive Blocker & Deadlock Alerts", starter: false, pro: true, enterprise: true },
        { name: "Automated Fibonacci Story Point Estimates", starter: false, pro: true, enterprise: true },
        { name: "Custom Fine-Tuned Agent Personas", starter: false, pro: false, enterprise: true },
        { name: "Inference Token Volume", starter: "50 prompts/day", pro: "Unlimited", enterprise: "Unlimited Dedicated" },
      ],
    },
    {
      name: "Developer Tools & CI/CD",
      items: [
        { name: "GitHub, GitLab & Bitbucket Sync", starter: true, pro: true, enterprise: true },
        { name: "Native TaskAura Developer CLI", starter: true, pro: true, enterprise: true },
        { name: "TypeScript & Python SDKs", starter: true, pro: true, enterprise: true },
        { name: "Real-time Webhook Triggers", starter: "10 Webhooks", pro: "Unlimited", enterprise: "Unlimited Dedicated" },
        { name: "Jira / Linear One-Click Migration", starter: true, pro: true, enterprise: true },
      ],
    },
    {
      name: "Security, VPC & Governance",
      items: [
        { name: "SOC2 Type II & ISO 27001 Certified", starter: true, pro: true, enterprise: true },
        { name: "Zero-Data Retention Training Guarantee", starter: true, pro: true, enterprise: true },
        { name: "SAML 2.0 SSO & Okta SCIM Sync", starter: false, pro: false, enterprise: true },
        { name: "Air-Gapped Private VPC Deployment", starter: false, pro: false, enterprise: true },
        { name: "SLA Production Uptime", starter: "Best Effort", pro: "99.9%", enterprise: "99.99% Financially Backed" },
      ],
    },
  ];

  return (
    <div className="relative min-h-screen bg-[#050b1a] text-white selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden">
      <CustomCursor />
      <Navbar onOpenAuth={(mode) => { setAuthMode(mode); setAuthModalOpen(true); }} />

      <main className="w-full">
        {/* SECTION 1: HERO (Cinematic Deep Midnight) */}
        <section className="relative w-full min-h-[85vh] flex flex-col justify-center items-center pt-28 sm:pt-36 pb-16 sm:pb-20 overflow-hidden border-b border-cyan-500/20 bg-radial from-[#091b38] via-[#050b1a] to-[#030712]">
          <div className="absolute inset-0 bg-grid-cyber-dark opacity-35 pointer-events-none" />
          <div className="aura-glow-cyan top-1/4 left-1/2 -translate-x-1/2 w-[750px] h-[380px] opacity-40 pointer-events-none" />

          {/* 3D WEBGL CYBER VAULT: Staggered Tier Pedestals & Levitating Value Tokens */}
          <div className="absolute inset-0 w-full h-full z-0 flex items-center justify-center pointer-events-none opacity-85">
            <PricingCyberVault3D />
          </div>

          <ZoomRevealSection className="w-full relative z-10">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
              <Badge variant="glow" size="md" icon={CreditCard} className="mb-6 mx-auto">
                Transparent Pricing
              </Badge>

              <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-[1.12]">
                Simple, Transparent Plans That Scale <br />
                <span className="gradient-text-aura">With Your Engineering Velocity.</span>
              </h1>

              <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
                Start completely free with zero credit card required. Upgrade when your team needs autonomous Copilot agents, multiplayer 3D canvas, and air-gapped security.
              </p>

              {/* Guarantees Ribbon */}
              <div className="mt-8 flex flex-wrap justify-center gap-3 sm:gap-4 text-xs font-mono font-semibold text-cyan-300">
                <span className="px-3.5 py-1.5 rounded-full bg-[#08152c] border border-cyan-500/30 flex items-center gap-1.5 shadow-md">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  14-Day Free Pro Trial
                </span>
                <span className="px-3.5 py-1.5 rounded-full bg-[#08152c] border border-cyan-500/30 flex items-center gap-1.5 shadow-md">
                  <Lock className="w-3.5 h-3.5 text-cyan-400" />
                  No Credit Card Required
                </span>
                <span className="px-3.5 py-1.5 rounded-full bg-[#08152c] border border-cyan-500/30 flex items-center gap-1.5 shadow-md">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Cancel Anytime in 1-Click
                </span>
              </div>

              {/* Billing Cycle Switcher */}
              <div className="mt-10 flex items-center justify-center gap-3">
                <span className={`text-xs sm:text-sm font-bold ${!isAnnual ? "text-cyan-300" : "text-slate-400"}`}>
                  Monthly Billing
                </span>

                <button
                  type="button"
                  onClick={() => {
                    playClickSound();
                    setIsAnnual(!isAnnual);
                  }}
                  className="relative w-14 h-8 rounded-full bg-[#081730] border border-cyan-500/40 p-1 transition-colors cursor-pointer"
                >
                  <div
                    className={`w-6 h-6 rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 transition-transform ${
                      isAnnual ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </button>

                <span className={`text-xs sm:text-sm font-bold ${isAnnual ? "text-cyan-300" : "text-slate-400"}`}>
                  Annual Billing
                </span>

                <span className="ml-2 font-mono text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 animate-pulse">
                  Save 20%
                </span>
              </div>
            </div>
          </ZoomRevealSection>
        </section>

        {/* SECTION 2: 3 TIER CARDS (High-Contrast Crisp Light / Luminous Canvas) */}
        <section className="relative w-full py-16 sm:py-24 border-b border-slate-200/90 bg-gradient-to-b from-[#eef5fa] via-[#f8fafc] to-[#e8f1f8] text-slate-900 overflow-hidden">
          <TopDropSection className="w-full">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
                {plans.map((p, idx) => {
                  const price = isAnnual ? p.priceAnnual : p.priceMonthly;
                  return (
                    <div
                      key={idx}
                      className={`rounded-3xl p-8 border transition-all duration-300 flex flex-col justify-between relative shadow-xl ${
                        p.popular
                          ? "bg-gradient-to-b from-[#091730] to-[#050e20] text-white border-cyan-400 shadow-2xl shadow-cyan-950/40 scale-105 z-10"
                          : "bg-white border-slate-200/90 text-slate-900 shadow-slate-200/60 hover:border-cyan-400"
                      }`}
                    >
                      {p.popular && (
                        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 text-[#050b1a] text-xs font-black uppercase tracking-wider shadow-lg">
                          {p.badge}
                        </div>
                      )}

                      <div>
                        <div className="flex items-center justify-between">
                          <h3 className="text-2xl font-black">{p.name}</h3>
                          <span className={`text-xs font-mono font-semibold ${p.popular ? "text-cyan-300" : "text-cyan-700"}`}>
                            {p.highlight}
                          </span>
                        </div>
                        <p className={`mt-2 text-xs leading-relaxed ${p.popular ? "text-slate-300" : "text-slate-600"}`}>
                          {p.tagline}
                        </p>

                        <div className="mt-6 flex items-baseline gap-2">
                          <span className="text-5xl font-black">${price}</span>
                          <span className={`text-xs font-mono ${p.popular ? "text-slate-400" : "text-slate-500"}`}>
                            / engineer / month {isAnnual && price > 0 ? "(billed annually)" : ""}
                          </span>
                        </div>

                        <div className={`mt-8 space-y-3 pt-6 border-t ${p.popular ? "border-white/10" : "border-slate-100"}`}>
                          <span className={`text-xs font-mono uppercase tracking-wider font-bold block mb-2 ${p.popular ? "text-cyan-400" : "text-cyan-800"}`}>
                            Included Features:
                          </span>
                          {p.features.map((feat, i) => (
                            <div key={i} className="flex items-start gap-3 text-xs sm:text-sm">
                              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                              <span className={p.popular ? "text-slate-200" : "text-slate-700"}>{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-8 pt-6">
                        <button
                          type="button"
                          onClick={() => {
                            playClickSound();
                            if (p.id === "enterprise") {
                              window.location.href = "/contact";
                            } else {
                              setAuthMode("signup");
                              setAuthModalOpen(true);
                            }
                          }}
                          className={`w-full py-3.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
                            p.popular
                              ? "bg-gradient-to-r from-[#00c2ff] via-[#00e599] to-[#fbbf24] text-[#050b1a] shadow-lg shadow-cyan-500/25 hover:opacity-95"
                              : "bg-slate-900 hover:bg-slate-800 text-white shadow-md"
                          }`}
                        >
                          <span>{p.cta}</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </TopDropSection>
        </section>

        {/* SECTION 3: INTERACTIVE ROI CALCULATOR (Deep Cosmic Navy Telemetry Hub) */}
        <section className="relative w-full py-16 sm:py-24 border-b border-cyan-500/20 bg-[#061022] text-white overflow-hidden">
          <Slide3DSection direction="right" className="w-full">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-2xl mx-auto mb-12">
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest bg-cyan-950/80 border border-cyan-500/30 px-3 py-1 rounded-full">
                  Live Financial Telemetry
                </span>
                <h2 className="text-3xl font-black text-white mt-3">
                  Calculate Your Team&apos;s Return on Investment
                </h2>
                <p className="text-sm text-slate-300 mt-2">
                  See how many developer hours and budget dollars TaskAura saves by automating ticket administrative busywork.
                </p>
              </div>

              <div className="p-8 sm:p-10 rounded-3xl bg-[#091733]/90 border border-cyan-500/30 shadow-2xl backdrop-blur-xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  
                  {/* Sliders */}
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                          Engineering Squad Size
                        </label>
                        <span className="text-lg font-black text-cyan-300">{teamSize} Developers</span>
                      </div>
                      <input
                        type="range"
                        min="5"
                        max="150"
                        step="5"
                        value={teamSize}
                        onChange={(e) => setTeamSize(Number(e.target.value))}
                        className="w-full accent-cyan-400 bg-slate-800 rounded-lg cursor-pointer"
                      />
                      <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                        <span>5 devs</span>
                        <span>150 devs</span>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                          Average Developer Hourly Rate
                        </label>
                        <span className="text-lg font-black text-emerald-300">${hourlyRate} / hour</span>
                      </div>
                      <input
                        type="range"
                        min="40"
                        max="160"
                        step="5"
                        value={hourlyRate}
                        onChange={(e) => setHourlyRate(Number(e.target.value))}
                        className="w-full accent-emerald-400 bg-slate-800 rounded-lg cursor-pointer"
                      />
                      <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                        <span>$40 / hr</span>
                        <span>$160 / hr</span>
                      </div>
                    </div>
                  </div>

                  {/* Real-time Calculated ROI Output */}
                  <div className="p-6 rounded-2xl bg-[#040e21] border border-cyan-500/30 space-y-4 font-mono">
                    <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs">
                      <span className="text-slate-400">Monthly Hours Liberated:</span>
                      <span className="text-cyan-300 font-bold text-base">{monthlyHoursSaved.toLocaleString()} Hours</span>
                    </div>

                    <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs">
                      <span className="text-slate-400">Projected Annual Savings:</span>
                      <span className="text-emerald-300 font-black text-xl">${annualDollarSavings.toLocaleString()}</span>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">Net Estimated ROI Multiplier:</span>
                      <span className="text-amber-300 font-black text-2xl">{netRoiMultiplier}x ROI</span>
                    </div>

                    <div className="pt-2 text-[11px] text-slate-500 leading-relaxed font-sans">
                      *Based on 6.0 hours saved per engineer/week on ticket grooming, status meetings, and blocker resolution.
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </Slide3DSection>
        </section>

        {/* SECTION 4: FULL FEATURE COMPARISON TABLE (Clean Luminous Surface) */}
        <section className="relative w-full py-16 sm:py-24 border-b border-slate-200/90 bg-gradient-to-b from-[#f4f9fd] to-[#ffffff] text-slate-900 overflow-hidden">
          <Slide3DSection direction="left" className="w-full">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-14">
                <span className="text-xs font-mono font-bold text-cyan-800 uppercase tracking-widest bg-cyan-100/80 px-3 py-1 rounded-full border border-cyan-200">
                  Full Breakdown
                </span>
                <h2 className="text-3xl font-black text-slate-900 mt-3">
                  Compare Plan Capabilities
                </h2>
              </div>

              <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-xl">
                <table className="min-w-[580px] w-full text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50 text-xs font-mono uppercase tracking-wider">
                      <th className="p-5 text-slate-700">Feature</th>
                      <th className="p-5 text-slate-700">Starter ($0)</th>
                      <th className="p-5 text-cyan-900 font-bold bg-cyan-50">Pro ($15)</th>
                      <th className="p-5 text-slate-700">Enterprise ($39)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {comparisonCategories.map((category, catIdx) => (
                      <tr key={catIdx} className="contents">
                        <td colSpan={4} className="p-4 bg-slate-100 font-mono text-xs font-bold text-slate-800 uppercase tracking-wider border-t border-slate-200">
                          {category.name}
                        </td>
                        {category.items.map((item, itemIdx) => (
                          <tr key={itemIdx} className="hover:bg-cyan-50/40 transition-colors">
                            <td className="p-4 font-semibold text-slate-800">{item.name}</td>
                            <td className="p-4 text-slate-600">
                              {typeof item.starter === "boolean" ? (
                                item.starter ? <CheckCircle2 className="w-4 h-4 text-slate-500" /> : <X className="w-4 h-4 text-slate-300" />
                              ) : (
                                item.starter
                              )}
                            </td>
                            <td className="p-4 text-emerald-800 bg-cyan-50/50 font-bold">
                              {typeof item.pro === "boolean" ? (
                                item.pro ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <X className="w-4 h-4 text-slate-300" />
                              ) : (
                                item.pro
                              )}
                            </td>
                            <td className="p-4 text-cyan-800 font-bold">
                              {typeof item.enterprise === "boolean" ? (
                                item.enterprise ? <CheckCircle2 className="w-4 h-4 text-cyan-600" /> : <X className="w-4 h-4 text-slate-300" />
                              ) : (
                                item.enterprise
                              )}
                            </td>
                          </tr>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Slide3DSection>
        </section>

        {/* SECTION 5: CTA (Deep Midnight Finale) */}
        <section className="relative w-full py-16 sm:py-24 text-center bg-[#050b1a] text-white overflow-hidden">
          <PortalZoomSection className="w-full">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl sm:text-4xl font-black text-white">
                Unlock Autonomous Engineering Today
              </h2>
              <p className="mt-4 text-base text-slate-300 max-w-2xl mx-auto">
                Try Pro free for 14 days. Zero risk, zero credit card required.
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
                  Start Your Free Trial
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
        title={authMode === "signup" ? "Activate TaskAura Free Trial" : "Sign In"}
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
