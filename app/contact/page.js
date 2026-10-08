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
  Mail,
  MessageSquare,
  Building2,
  Users,
  MapPin,
  Clock,
  Sparkles,
  CheckCircle2,
  Send,
  ShieldCheck,
  Headphones,
  ArrowRight,
  Globe,
  Terminal,
  FileCheck,
  Check,
  Phone,
  Server,
  Lock,
} from "lucide-react";
import confetti from "canvas-confetti";
import { playClickSound, playSuccessSound, playAiActivationSound } from "@/lib/sound";
import ZoomRevealSection from "@/components/animations/ZoomRevealSection";
import Slide3DSection from "@/components/animations/Slide3DSection";
import StageFoldSection from "@/components/animations/StageFoldSection";
import TopDropSection from "@/components/animations/TopDropSection";
import PortalZoomSection from "@/components/animations/PortalZoomSection";
import GlobalFleet3DCanvas from "@/components/3d/GlobalFleet3DCanvas";

export default function ContactPage() {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState("signup");

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    workEmail: "",
    companyName: "",
    teamSize: "10-50",
    inquiryType: "enterprise",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const globalHubs = [
    {
      city: "San Francisco",
      region: "Global HQ • North America",
      address: "Silicon Valley Innovation District",
      postal: "California, USA",
      timezone: "PST (UTC-8)",
      email: "sf@taskaura.ai",
      badge: "Headquarters",
    },
    {
      city: "London",
      region: "EMEA Operations",
      address: "Tech City Central",
      postal: "London, UK",
      timezone: "GMT (UTC+0)",
      email: "london@taskaura.ai",
      badge: "European Hub",
    },
    {
      city: "Singapore",
      region: "Asia-Pacific Centre",
      address: "Marina Bay District",
      postal: "Singapore",
      timezone: "SGT (UTC+8)",
      email: "apac@taskaura.ai",
      badge: "APAC Hub",
    },
    {
      city: "Bengaluru",
      region: "Core Engineering Systems",
      address: "Tech Corridor",
      postal: "Bengaluru, India",
      timezone: "IST (UTC+5:30)",
      email: "india@taskaura.ai",
      badge: "R&D Campus",
    },
  ];

  const contactChannels = [
    {
      icon: Building2,
      title: "Enterprise Solutions & Sales",
      desc: "Custom multi-agent workflows, dedicated VPC hosting, SOC2 compliance reports, and volume licensing.",
      contact: "sales@taskaura.ai",
      action: "Book Executive Demo",
      tag: "< 2 hr response",
      accent: "bg-white border-cyan-200/90 shadow-xl shadow-cyan-900/5 hover:border-cyan-400",
      iconBg: "bg-cyan-50 border-cyan-200 text-cyan-700",
    },
    {
      icon: Headphones,
      title: "24/7 Technical Support",
      desc: "Direct support for active sprint pipelines, API webhooks, GitHub sync integrations, and SLA escalations.",
      contact: "support@taskaura.ai",
      action: "Open Priority Ticket",
      tag: "Live 24/7",
      accent: "bg-white border-emerald-200/90 shadow-xl shadow-emerald-900/5 hover:border-emerald-400",
      iconBg: "bg-emerald-50 border-emerald-200 text-emerald-700",
    },
    {
      icon: ShieldCheck,
      title: "Security & Inquiries",
      desc: "Report inquiries, request architecture documentation, or connect directly with the lead developer.",
      contact: "security@taskaura.ai",
      action: "Connect with Developer",
      tag: "Direct Contact",
      accent: "bg-white border-amber-200/90 shadow-xl shadow-amber-900/5 hover:border-amber-400",
      iconBg: "bg-amber-50 border-amber-200 text-amber-700",
    },
  ];

  const enterpriseGuarantees = [
    {
      title: "SOC2 Type II Certified",
      desc: "Independently audited compliance with continuous automated posture assessment.",
      icon: ShieldCheck,
    },
    {
      title: "99.99% Production SLA",
      desc: "Enterprise clustering with automated multi-region active failover and sub-second recovery.",
      icon: Server,
    },
    {
      title: "Air-Gapped Private VPC",
      desc: "Host TaskAura inside your own AWS, GCP, or Azure VPC with zero outbound AI data leakage.",
      icon: Lock,
    },
    {
      title: "24/7 Direct Slack/Teams Channel",
      desc: "Dedicated solutions architects embedded in your engineering Slack or Discord workspace.",
      icon: MessageSquare,
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.workEmail) return;

    playClickSound();
    playAiActivationSound();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      playSuccessSound();
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#00c2ff", "#009f9d", "#00e599", "#fbbf24"],
        });
      } catch (err) {}
    }, 1200);
  };

  return (
    <div className="relative min-h-screen bg-[#050b1a] text-white selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden">
      <CustomCursor />
      <Navbar onOpenAuth={(mode) => { setAuthMode(mode); setAuthModalOpen(true); }} />

      <main className="w-full">
        {/* SECTION 1: HERO (Cinematic Deep Midnight) */}
        <section className="relative w-full min-h-[80vh] flex flex-col justify-center items-center pt-28 sm:pt-36 pb-16 sm:pb-20 overflow-hidden border-b border-cyan-500/20 bg-radial from-[#091b38] via-[#050b1a] to-[#030712]">
          <div className="absolute inset-0 bg-grid-cyber-dark opacity-40 pointer-events-none" />
          <div className="aura-glow-cyan top-1/4 left-1/2 -translate-x-1/2 w-[750px] h-[380px] opacity-40 pointer-events-none" />

          {/* 3D WEBGL GLOBE: Global Support & Engineering Signal Grid */}
          <div className="absolute inset-0 w-full h-full z-0 flex items-center justify-center pointer-events-none opacity-80">
            <GlobalFleet3DCanvas />
          </div>

          <ZoomRevealSection className="w-full relative z-10">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
              <Badge variant="glow" size="md" icon={MessageSquare} className="mb-6 mx-auto">
                Direct Engineering Outreach & Solutions
              </Badge>

              <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-[1.14]">
                Let&apos;s Build Faster. <br />
                <span className="gradient-text-aura">Connect with the TaskAura Team.</span>
              </h1>

              <p className="mt-6 text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
                Have questions about autonomous sprint orchestration, custom private VPC deployments, or migrating from Jira? Our distributed engineering leads and solutions architects are ready to assist.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-3 sm:gap-4 text-xs font-mono text-cyan-300 font-semibold">
                <span className="px-3.5 py-1.5 rounded-full bg-[#08152c] border border-cyan-500/30 flex items-center gap-1.5 shadow-md">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Median Response: &lt; 12 Minutes
                </span>
                <span className="px-3.5 py-1.5 rounded-full bg-[#08152c] border border-cyan-500/30 flex items-center gap-1.5 shadow-md">
                  <Globe className="w-3.5 h-3.5 text-cyan-400" />
                  Global Coverage: Americas • EMEA • APAC
                </span>
                <span className="px-3.5 py-1.5 rounded-full bg-[#08152c] border border-cyan-500/30 flex items-center gap-1.5 shadow-md">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  100% Mutual NDA Adherence
                </span>
              </div>
            </div>
          </ZoomRevealSection>
        </section>

        {/* SECTION 2: 3 PRIORITY CHANNEL CARDS (High-Contrast Crisp Light / Luminous Canvas) */}
        <section className="relative w-full py-16 sm:py-24 border-b border-slate-200/90 bg-gradient-to-b from-[#eef5fa] via-[#f8fafc] to-[#e8f1f8] text-slate-900 overflow-hidden">
          <TopDropSection className="w-full">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-14">
                <span className="text-xs font-mono font-bold text-cyan-800 uppercase tracking-widest bg-cyan-100/80 px-3.5 py-1.5 rounded-full border border-cyan-200">
                  Direct Communication Tracks
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-3">
                  Choose Your Direct Line to Engineering
                </h2>
                <p className="text-sm sm:text-base text-slate-600 mt-2">
                  Skip the general sales queue. Connect straight to the right team for your technical requirements.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {contactChannels.map((c, idx) => {
                  const Icon = c.icon;
                  return (
                    <div
                      key={idx}
                      className={`p-7 rounded-3xl ${c.accent} border transition-all duration-300 hover:-translate-y-1 group flex flex-col justify-between`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-5">
                          <div className={`w-12 h-12 rounded-2xl ${c.iconBg} border flex items-center justify-center group-hover:scale-110 transition-transform`}>
                            <Icon className="w-6 h-6" />
                          </div>
                          <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700">
                            {c.tag}
                          </span>
                        </div>

                        <h3 className="text-xl font-black text-slate-900 group-hover:text-cyan-700 transition-colors">
                          {c.title}
                        </h3>
                        <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                          {c.desc}
                        </p>
                      </div>

                      <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
                        <span className="font-mono text-xs font-bold text-cyan-700">
                          {c.contact}
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

        {/* SECTION 3: PRIORITY DISPATCH QUEUE & LIVE TELEMETRY HUBS (Deep Cosmic Navy & Cyan Console) */}
        <section className="relative w-full py-16 sm:py-24 border-b border-cyan-500/20 bg-[#061022] text-white overflow-hidden">
          <Slide3DSection direction="right" className="w-full">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                
                {/* Left: Interactive Contact Form (Deep Navy Cyber Card) */}
                <div className="lg:col-span-7 bg-[#091733]/90 border border-cyan-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden backdrop-blur-xl">
                  <div className="mb-8">
                    <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest bg-cyan-950/80 px-3 py-1 rounded-full border border-cyan-500/30">
                      Priority Dispatch Queue
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black text-white mt-3">
                      Transmit an Engineering Brief
                    </h2>
                    <p className="text-sm text-slate-300 mt-2">
                      Submit your technical request below. An engineering architect will respond with a tailored implementation roadmap.
                    </p>
                  </div>

                  {submitted ? (
                    <div className="py-12 px-6 text-center rounded-2xl bg-emerald-950/60 border border-emerald-500/40">
                      <div className="w-16 h-16 rounded-full bg-emerald-900/80 border-2 border-emerald-400 flex items-center justify-center mx-auto text-emerald-300 mb-4 animate-bounce">
                        <CheckCircle2 className="w-8 h-8" />
                      </div>
                      <h3 className="text-2xl font-black text-white">Transmission Confirmed!</h3>
                      <p className="mt-2 text-sm text-slate-300 max-w-md mx-auto">
                        Thank you, <span className="text-emerald-300 font-bold">{formData.fullName}</span>. Your ticket has been assigned dispatch code <span className="font-mono text-cyan-300 font-bold">#TK-{Math.floor(1000 + Math.random() * 9000)}</span>. Our solutions engineer will email you shortly.
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setSubmitted(false);
                          setFormData({
                            fullName: "",
                            workEmail: "",
                            companyName: "",
                            teamSize: "10-50",
                            inquiryType: "enterprise",
                            message: "",
                          });
                        }}
                        className="mt-6 px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-xs font-black text-[#050b1a] transition-all cursor-pointer shadow-lg shadow-cyan-500/25"
                      >
                        Send Another Transmission
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-2">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.fullName}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            placeholder="Alex Rivera"
                            className="w-full rounded-xl border border-cyan-500/30 bg-[#040c1a] px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-2">
                            Work Email *
                          </label>
                          <input
                            type="email"
                            required
                            value={formData.workEmail}
                            onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                            placeholder="alex@acmecorp.com"
                            className="w-full rounded-xl border border-cyan-500/30 bg-[#040c1a] px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-2">
                            Company Name
                          </label>
                          <input
                            type="text"
                            value={formData.companyName}
                            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                            placeholder="Acme Technologies"
                            className="w-full rounded-xl border border-cyan-500/30 bg-[#040c1a] px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-2">
                            Engineering Squad Size
                          </label>
                          <select
                            value={formData.teamSize}
                            onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                            className="w-full rounded-xl border border-cyan-500/30 bg-[#040c1a] px-4 py-3 text-sm text-white focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                          >
                            <option value="1-10">1 - 10 Engineers</option>
                            <option value="10-50">10 - 50 Engineers</option>
                            <option value="50-250">50 - 250 Engineers</option>
                            <option value="250+">250+ Global Organization</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-2">
                          Topic of Inquiry
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                          {[
                            { id: "enterprise", label: "Enterprise Demo" },
                            { id: "migration", label: "Jira / Linear Migration" },
                            { id: "copilot", label: "Copilot Integration" },
                            { id: "security", label: "SOC-2 / Security" },
                            { id: "partnership", label: "Partnership / API" },
                            { id: "general", label: "General Support" },
                          ].map((t) => (
                            <button
                              key={t.id}
                              type="button"
                              onClick={() => {
                                playClickSound();
                                setFormData({ ...formData, inquiryType: t.id });
                              }}
                              className={`px-3 py-2 text-xs font-bold rounded-xl border text-center transition-all cursor-pointer ${
                                formData.inquiryType === t.id
                                  ? "bg-cyan-500/30 border-cyan-400 text-cyan-200 shadow-sm"
                                  : "bg-[#040c1a] border-cyan-500/20 text-slate-400 hover:text-white hover:border-cyan-500/40"
                              }`}
                            >
                              {t.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-2">
                          Project Scope & Requirements
                        </label>
                        <textarea
                          rows={4}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder="Tell us about your team's workflow, current sprint cadence, or any specific integrations needed..."
                          className="w-full rounded-xl border border-cyan-500/30 bg-[#040c1a] px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                        />
                      </div>

                      <div className="pt-2">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full py-3.5 rounded-xl text-sm font-black text-[#050b1a] bg-gradient-to-r from-[#00c2ff] via-[#00e599] to-[#fbbf24] hover:opacity-95 shadow-xl shadow-cyan-500/25 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.99] disabled:opacity-50"
                        >
                          {isSubmitting ? (
                            <>
                              <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                              <span>Routing to Solutions Architect...</span>
                            </>
                          ) : (
                            <>
                              <span>Transmit Message to TaskAura</span>
                              <Send className="w-4 h-4" />
                            </>
                          )}
                        </button>
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-white/10 font-mono">
                        <span className="flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                          256-bit TLS Encrypted
                        </span>
                        <span>NDAs Honored Automatically</span>
                      </div>
                    </form>
                  )}
                </div>

                {/* Right: Global Hubs & Real-time Live Status */}
                <div className="lg:col-span-5 space-y-6">
                  
                  {/* Live Availability Box */}
                  <div className="p-6 rounded-3xl bg-[#091733]/90 border border-cyan-500/30 shadow-xl backdrop-blur-xl">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                        <span className="text-xs font-mono font-bold text-emerald-300">
                          Systems & Dispatch Live
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-cyan-300">
                        SLA: 99.99% Uptime
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      All global telemetry clusters are functioning optimally. Engineering team is active across Americas, EMEA, and APAC time zones.
                    </p>
                  </div>

                  {/* Global Engineering Hubs List */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-mono font-bold text-slate-200 uppercase tracking-widest flex items-center gap-2">
                      <Globe className="w-4 h-4 text-cyan-400" />
                      Global Engineering Hubs
                    </h3>

                    {globalHubs.map((hub, idx) => (
                      <div
                        key={idx}
                        className="p-5 rounded-3xl bg-[#081428]/90 border border-slate-800 hover:border-cyan-500/40 transition-all shadow-sm"
                      >
                        <div className="flex items-center justify-between">
                          <h4 className="text-base font-black text-white">
                            {hub.city}
                          </h4>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300">
                            {hub.badge}
                          </span>
                        </div>
                        <p className="text-[11px] text-cyan-300 font-mono mt-0.5">
                          {hub.region}
                        </p>
                        <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                          {hub.address}, {hub.postal}
                        </p>
                        <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
                          <span>{hub.timezone}</span>
                          <span className="text-cyan-300 font-bold">{hub.email}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Direct FAQ / Security Link */}
                  <div className="p-5 rounded-3xl bg-[#091733]/90 border border-cyan-500/30 flex items-center justify-between shadow-xs">
                    <div>
                      <h4 className="text-xs font-bold text-white">Need immediate security disclosures?</h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">Download our complete SOC2 Type II compliance pack.</p>
                    </div>
                    <FileCheck className="w-5 h-5 text-cyan-400 shrink-0" />
                  </div>

                </div>

              </div>
            </div>
          </Slide3DSection>
        </section>

        {/* SECTION 4: ENTERPRISE GUARANTEES (Clean Luminous Light Stage) */}
        <section className="relative w-full py-16 sm:py-24 border-b border-slate-200/90 bg-gradient-to-b from-[#f4f9fd] to-[#ffffff] text-slate-900 overflow-hidden">
          <Slide3DSection direction="left" className="w-full">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-14">
                <span className="text-xs font-mono font-bold text-cyan-800 uppercase tracking-widest bg-cyan-100/80 px-3.5 py-1.5 rounded-full border border-cyan-200">
                  Institutional Trust & Reliability
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-3">
                  Built For Enterprise Security & Scale
                </h2>
                <p className="text-sm sm:text-base text-slate-600 mt-2">
                  Every interaction is governed by strict enterprise confidentiality protocols and verifiable SLAs.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {enterpriseGuarantees.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      className="p-6 rounded-3xl bg-white border border-slate-200/90 hover:border-cyan-400 shadow-lg shadow-slate-200/50 transition-all hover:-translate-y-1"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-cyan-50 border border-cyan-200 flex items-center justify-center text-cyan-700 mb-4">
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="text-base font-black text-slate-900">{item.title}</h3>
                      <p className="mt-2 text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </Slide3DSection>
        </section>

        {/* SECTION 5: CTA (Deep Midnight Finale) */}
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
          </PortalZoomSection>
        </section>
      </main>

      {/* Auth Modal */}
      <Modal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        title={authMode === "signup" ? "Get Started with TaskAura" : "Welcome Back"}
      >
        <div className="p-4 text-center">
          <p className="text-sm text-slate-300 mb-4">
            Sign in to access your workspace or start a 14-day free trial.
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

      <Footer onOpenAuth={(mode) => { setAuthMode(mode); setAuthModalOpen(true); }} />
    </div>
  );
}
