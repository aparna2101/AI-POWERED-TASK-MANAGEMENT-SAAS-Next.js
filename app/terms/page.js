"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import CustomCursor from "@/components/animations/CustomCursor";
import Badge from "@/components/ui/Badge";
import Modal from "@/components/ui/Modal";
import { Scale, CheckCircle2, ArrowLeft } from "lucide-react";
import PrismVault3DCanvas from "@/components/3d/PrismVault3DCanvas";

export default function TermsPage() {
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
        <PrismVault3DCanvas />
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

            <Badge variant="glow" size="md" icon={Scale}>
              Legal Terms & Governance
            </Badge>
          </div>

          {/* Heading */}
          <div className="mb-10">
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              Terms of Service
            </h1>
            <p className="mt-3 text-xs sm:text-sm text-cyan-300 font-mono font-semibold">
              Effective Date: January 1, 2026 • Last Updated: October 8, 2026
            </p>
          </div>

          {/* Quick Summary Card (High Contrast) */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#0a1b38] border border-cyan-400/40 shadow-2xl mb-12 space-y-3">
            <h2 className="text-lg sm:text-xl font-black text-cyan-200 flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>Summary of Key Terms</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-100 font-medium leading-relaxed">
              By accessing or using TaskAura, you agree to these Terms. You retain complete ownership of all tasks, projects, and data created in your workspace. We provide the platform and AI Copilot services to assist your project planning under clear, transparent terms.
            </p>
          </div>

          {/* Detailed Clauses (High-Contrast Readable Typography) */}
          <div className="space-y-10 text-slate-100 text-sm sm:text-base leading-relaxed">
            
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-white">1. Acceptance of Terms</h2>
              <p className="text-slate-200">
                These Terms of Service (&ldquo;Terms&rdquo;) constitute a legally binding agreement between you (&ldquo;User&rdquo; or &ldquo;Customer&rdquo;) and TaskAura Inc. (&ldquo;TaskAura&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;). By accessing our website, creating an account, or using our AI-powered workspace, you acknowledge that you have read, understood, and agreed to be bound by these Terms.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-white">2. User Accounts and Workspace Access</h2>
              <ul className="list-disc pl-6 space-y-2 text-slate-100">
                <li>You must provide accurate, current, and complete registration information during signup.</li>
                <li>You are responsible for maintaining the confidentiality of your account credentials and for all actions taken under your account.</li>
                <li>Organizations may assign workspace administrators who hold authority to add or remove team members, configure billing, and export project data.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-white">3. Acceptable Use of AI Copilot</h2>
              <p className="text-slate-200">
                TaskAura provides artificial intelligence features to assist with task generation, sprint scheduling, and velocity calculations. When using these features:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-100">
                <li>You agree not to use AI Copilot to generate malicious code, engage in automated harassment, or reverse-engineer the underlying neural architecture.</li>
                <li>You acknowledge that AI Copilot generates planning recommendations and estimates that should be reviewed and verified by your human project leads.</li>
                <li>We do not guarantee that AI generated estimates are error-free or represent definitive timelines.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-white">4. Intellectual Property & Customer Ownership</h2>
              <p className="text-slate-200">
                <strong className="text-white">You own your data:</strong> All projects, tasks, Kanban boards, attachments, descriptions, and proprietary materials created or uploaded by your team remain 100% your exclusive intellectual property. TaskAura claims zero ownership over your content.
              </p>
              <p className="text-slate-200">
                TaskAura retains all rights, title, and interest in and to the platform software, WebGL rendering canvas, UI designs, trademarks, and documentation.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-white">5. Subscriptions, Trials, and Cancellations</h2>
              <ul className="list-disc pl-6 space-y-2 text-slate-100">
                <li><strong className="text-white">Free Starter Tier:</strong> Available indefinitely for squads with up to 5 members with core Kanban features.</li>
                <li><strong className="text-white">Pro Free Trial:</strong> 14-day free trial of Pro Velocity features without credit card requirement. You can cancel at any time.</li>
                <li><strong className="text-white">Paid Subscriptions:</strong> Billed either monthly or annually. You may cancel your subscription at any time via your workspace settings; access continues until the end of the current billing cycle.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-white">6. Service Level and Uptime</h2>
              <p className="text-slate-200">
                We strive for continuous, sub-50ms real-time availability. Pro and Enterprise tiers include SLA guarantees up to 99.99% uptime as described in our service packages, excluding scheduled maintenance windows.
              </p>
            </section>

            <section className="space-y-4 border-t border-cyan-500/20 pt-8">
              <h2 className="text-xl sm:text-2xl font-bold text-white">7. Questions & Legal Inquiries</h2>
              <p className="text-slate-200">
                If you have questions regarding these Terms of Service or require enterprise terms negotiation, please contact our legal counsel:
              </p>
              <div className="p-5 sm:p-6 rounded-2xl bg-[#081734] border border-cyan-500/30 font-mono text-xs sm:text-sm text-slate-100 space-y-2">
                <p><strong className="text-cyan-300">Legal & Support:</strong> <a href="mailto:aparna2112003@gmail.com" className="text-cyan-300 underline">legal@taskaura.ai</a></p>
                <p><strong className="text-cyan-300">Response Time:</strong> Within 24 hours</p>
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
