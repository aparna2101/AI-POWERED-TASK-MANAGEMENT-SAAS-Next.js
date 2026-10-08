"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import CustomCursor from "@/components/animations/CustomCursor";
import Badge from "@/components/ui/Badge";
import Modal from "@/components/ui/Modal";
import { Cookie, ShieldCheck, CheckCircle2, ArrowLeft, Settings, Info } from "lucide-react";
import GlobalFleet3DCanvas from "@/components/3d/GlobalFleet3DCanvas";

export default function CookiesPage() {
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

            <Badge variant="glow" size="md" icon={Cookie}>
              Data Preferences & Cookies
            </Badge>
          </div>

          {/* Heading */}
          <div className="mb-10">
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              Cookie & Tracking Policy
            </h1>
            <p className="mt-3 text-xs sm:text-sm text-cyan-300 font-mono font-semibold">
              Effective Date: January 1, 2026 • Last Updated: October 8, 2026
            </p>
          </div>

          {/* Core Principle Banner */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#0a1b38] border border-cyan-400/40 shadow-2xl mb-12 space-y-4">
            <h2 className="text-lg sm:text-xl font-black text-cyan-200 flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>Zero Third-Party Advertising Trackers</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-100 font-medium leading-relaxed">
              TaskAura does not use cross-site advertising trackers or sell your activity to data brokers. We only use essential authentication cookies and strictly bounded telemetry necessary to keep your real-time collaborative workspace functioning smoothly.
            </p>
          </div>

          {/* Detailed Policy Content */}
          <div className="space-y-10 text-slate-100 text-sm sm:text-base leading-relaxed">
            
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-white">1. What Are Cookies and Local Storage?</h2>
              <p className="text-slate-200 font-normal sm:font-medium">
                Cookies are small data files placed on your device by your web browser. Local storage and session storage are modern HTML5 browser capabilities that allow web applications like TaskAura to store state locally on your machine for low latency and offline-resilient interactions.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-white">2. Categories of Cookies We Use</h2>
              
              <div className="space-y-4">
                <div className="p-5 sm:p-6 rounded-2xl bg-[#081734] border border-cyan-500/30 shadow-md">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Essential Authentication & Session Cookies</span>
                    </h3>
                    <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-emerald-950/90 border border-emerald-400/50 text-emerald-300 font-bold">
                      Strictly Required
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                    These cookies verify your identity when you sign into TaskAura, maintain your active session across tabs, and protect against Cross-Site Request Forgery (CSRF). Without these, you cannot log into your workspace or access private tasks.
                  </p>
                </div>

                <div className="p-5 sm:p-6 rounded-2xl bg-[#081734] border border-cyan-500/30 shadow-md">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                      <Settings className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span>Workspace Preference Storage</span>
                    </h3>
                    <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-cyan-950/90 border border-cyan-400/50 text-cyan-300 font-bold">
                      Functional
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                    Stored in local storage to remember your personal UI preferences, such as selected Kanban column filters, dark theme configuration, sound effect toggles, and sidebar collapsed states so you do not have to reconfigure them every visit.
                  </p>
                </div>

                <div className="p-5 sm:p-6 rounded-2xl bg-[#081734] border border-cyan-500/30 shadow-md">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                      <Info className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>Performance & Latency Telemetry</span>
                    </h3>
                    <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-amber-950/90 border border-amber-400/50 text-amber-300 font-bold">
                      Performance
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                    Aggregated, pseudonymized metrics that measure real-time WebSocket connection speed, WebGL rendering framerates, and client error diagnostics to help our engineers optimize system performance.
                  </p>
                </div>
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-white">3. How to Control or Delete Cookies</h2>
              <p className="text-slate-200 font-normal sm:font-medium">
                You can manage cookie settings directly through your browser. Most browsers allow you to view, delete, or block third-party cookies:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-100">
                <li><strong className="text-white">Chrome:</strong> Settings &rarr; Privacy and security &rarr; Third-party cookies</li>
                <li><strong className="text-white">Firefox:</strong> Options &rarr; Privacy & Security &rarr; Enhanced Tracking Protection</li>
                <li><strong className="text-white">Safari:</strong> Preferences &rarr; Privacy &rarr; Prevent cross-site tracking</li>
              </ul>
              <p className="text-xs sm:text-sm text-cyan-200 font-medium pt-2">
                *Note: Blocking strictly essential session cookies will prevent login and access to the TaskAura collaborative workspace.
              </p>
            </section>

            <section className="space-y-4 border-t border-cyan-500/20 pt-8">
              <h2 className="text-xl sm:text-2xl font-bold text-white">4. Inquiries and Data Preferences</h2>
              <p className="text-slate-200 font-normal sm:font-medium">
                If you have questions regarding our cookie practices or need assistance with your data preferences, contact our security and compliance office:
              </p>
              <div className="p-5 sm:p-6 rounded-2xl bg-[#081734] border border-cyan-500/30 font-mono text-xs sm:text-sm text-slate-100 space-y-2">
                <p><strong className="text-cyan-300">Email:</strong> privacy@taskaura.ai</p>
                <p><strong className="text-cyan-300">Office:</strong> 100 Montgomery St, Suite 2400, San Francisco, CA 94104</p>
                <p><strong className="text-cyan-300">Response Window:</strong> Within 24 business hours</p>
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
