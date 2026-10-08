"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import CustomCursor from "@/components/animations/CustomCursor";
import Badge from "@/components/ui/Badge";
import Modal from "@/components/ui/Modal";
import { ShieldCheck, Lock, EyeOff, Server, FileText, CheckCircle2, ArrowLeft } from "lucide-react";
import GlobalFleet3DCanvas from "@/components/3d/GlobalFleet3DCanvas";

export default function PrivacyPage() {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState("signup");

  const handleOpenAuth = (mode = "signup") => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-[#050b1a] text-white selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden">
      <CustomCursor />
      <Navbar onOpenAuth={handleOpenAuth} />

      {/* 3D WebGL Background Atmosphere */}
      <div className="absolute top-0 left-0 right-0 h-[600px] pointer-events-none opacity-30 z-0 flex items-center justify-center overflow-hidden">
        <GlobalFleet3DCanvas />
      </div>

      <main className="w-full pt-32 pb-24 relative z-10">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          
          {/* Top Bar with Clean Spacing & Responsive Wrap */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#08152c] border border-cyan-500/40 text-xs sm:text-sm font-mono font-bold text-cyan-300 hover:text-white hover:border-cyan-400 hover:bg-cyan-950 transition-all shadow-md group"
            >
              <ArrowLeft className="w-4 h-4 text-cyan-400 group-hover:-translate-x-1 transition-transform" />
              <span>Back to TaskAura Home</span>
            </Link>

            <Badge variant="glow" size="md" icon={ShieldCheck}>
              Legal & Data Protection
            </Badge>
          </div>

          {/* Heading */}
          <div className="mb-10">
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              Privacy Policy
            </h1>
            <p className="mt-3 text-xs sm:text-sm text-cyan-300 font-mono font-semibold">
              Effective Date: January 1, 2026 • Last Updated: October 8, 2026
            </p>
          </div>

          {/* Privacy Core Highlights Box (High Contrast & Clear Typography) */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#0a1b38] border border-cyan-400/40 shadow-2xl mb-12 space-y-4">
            <h2 className="text-lg sm:text-xl font-black text-cyan-200 flex items-center gap-2.5">
              <Lock className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>Our Core Commitment: Zero AI Data Retention</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-100 font-medium leading-relaxed">
              TaskAura treats your project specifications, tasks, team communications, and codebase references with the highest degree of confidentiality. We have contractual agreements ensuring that <strong className="text-white font-bold underline decoration-cyan-400">your private data is never used to train public foundational AI models</strong>.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-[#040e22] border border-cyan-500/30 text-slate-200 shadow-sm">
                <span className="text-emerald-300 font-bold text-xs sm:text-sm block mb-1.5 font-mono">✓ No Model Training</span>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans font-normal">Customer data is never fed back into public LLM weights.</p>
              </div>
              <div className="p-4 rounded-xl bg-[#040e22] border border-cyan-500/30 text-slate-200 shadow-sm">
                <span className="text-cyan-300 font-bold text-xs sm:text-sm block mb-1.5 font-mono">✓ 256-bit Encryption</span>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans font-normal">AES-256 at rest and TLS 1.3 in transit everywhere.</p>
              </div>
              <div className="p-4 rounded-xl bg-[#040e22] border border-cyan-500/30 text-slate-200 shadow-sm">
                <span className="text-teal-300 font-bold text-xs sm:text-sm block mb-1.5 font-mono">✓ GDPR & CCPA Ready</span>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans font-normal">One-click data export and complete deletion requests.</p>
              </div>
            </div>
          </div>

          {/* Policy Sections (Bright, High-Contrast Text for Crisp Readability) */}
          <div className="space-y-10 text-slate-100 text-sm sm:text-base leading-relaxed">
            
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-white">1. Information We Collect</h2>
              <p className="text-slate-200">
                When you create a TaskAura workspace and use our collaboration tools, we collect the following categories of information:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-100">
                <li><strong className="text-white">Account Identifiers:</strong> Name, work email address, profile avatar, and authentication tokens (via GitHub OAuth or Single Sign-On).</li>
                <li><strong className="text-white">Workspace & Task Content:</strong> Project titles, Kanban board columns, task descriptions, assignees, deadlines, and activity logs created within your workspace.</li>
                <li><strong className="text-white">AI Prompts & Interactions:</strong> Input prompts provided to the AI Copilot to generate tasks, sprint roadmaps, or estimates.</li>
                <li><strong className="text-white">Telemetry & Usage Data:</strong> Browser type, operating system, interaction latency, and diagnostic crash telemetry to maintain application performance.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-white">2. How We Use Your Information</h2>
              <p className="text-slate-200">We process your data strictly to deliver and maintain TaskAura services:</p>
              <ul className="list-disc pl-6 space-y-2 text-slate-100">
                <li>To synchronize real-time Kanban cards, calendar deadlines, and collaborative updates across your squad.</li>
                <li>To generate intelligent sprint task breakdowns and velocity insights via our AI Copilot engine.</li>
                <li>To send critical system alerts, blocker notifications, and security advisory updates.</li>
                <li>To prevent abuse, detect unauthorized workspace intrusions, and enforce our Terms of Service.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-white">3. How AI Copilot Handles Your Prompts</h2>
              <p className="text-slate-200">
                When you invoke AI task generation, your prompt is transmitted via encrypted TLS to our stateless inference gateway. The LLM generates the requested tasks and immediately discards the prompt context. <strong className="text-white">No team prompts, code references, or private tickets are cached in third-party inference memory.</strong>
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-white">4. Data Sharing and Third Parties</h2>
              <p className="text-slate-200">
                We do not sell, rent, or monetize your personal or workspace data. We only share information with vetted infrastructure service providers necessary to operate TaskAura:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-100">
                <li><strong className="text-white">Cloud Infrastructure:</strong> AWS (Amazon Web Services) and Cloudflare for global edge delivery and secure hosting.</li>
                <li><strong className="text-white">Payment Processing:</strong> Stripe for PCI-DSS compliant subscription billing (we never store raw credit card numbers).</li>
                <li><strong className="text-white">Identity Providers:</strong> GitHub and Okta for enterprise authentication and SCIM provisioning.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-white">5. Your Data Rights & Deletion</h2>
              <p className="text-slate-200">
                Regardless of your geographic location, you retain full ownership of your data. You may request a complete JSON export of your workspace tasks and projects at any time, or request permanent deletion of your account and associated telemetry by contacting us.
              </p>
            </section>

            <section className="space-y-4 border-t border-cyan-500/20 pt-8">
              <h2 className="text-xl sm:text-2xl font-bold text-white">6. Contact Our Privacy Office</h2>
              <p className="text-slate-200">
                If you have questions regarding this Privacy Policy or wish to execute a Data Processing Agreement (DPA) for your organization, reach out to our team:
              </p>
              <div className="p-5 sm:p-6 rounded-2xl bg-[#081734] border border-cyan-500/30 font-mono text-xs sm:text-sm text-slate-100 space-y-2">
                <p><strong className="text-cyan-300">Email:</strong> <a href="mailto:aparna2112003@gmail.com" className="text-cyan-300 underline">privacy@taskaura.ai</a></p>
                <p><strong className="text-cyan-300">Response Time:</strong> Within 24 business hours</p>
              </div>
            </section>

          </div>

        </div>
      </main>

      <Footer onOpenAuth={handleOpenAuth} />

      {/* Auth Modal */}
      <Modal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authMode}
      />
    </div>
  );
}
