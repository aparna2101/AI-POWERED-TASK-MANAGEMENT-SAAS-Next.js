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
  BarChart3,
  TrendingUp,
  Activity,
  Zap,
  ArrowRight,
  CheckCircle2,
  PieChart,
  ShieldAlert,
  Clock,
  Sparkles,
  Download,
  Check,
  Flame,
  AlertTriangle,
  GitPullRequest,
  CheckCheck,
} from "lucide-react";
import confetti from "canvas-confetti";
import { playClickSound, playSuccessSound } from "@/lib/sound";
import TaskGraph3DCanvas from "@/components/3d/TaskGraph3DCanvas";

export default function AnalyticsPage() {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState("signup");
  const [exportedFormat, setExportedFormat] = useState(null);

  // Live Blocker Feed state
  const [blockers, setBlockers] = useState([
    {
      id: "BLK-01",
      repo: "taskaura/core-api",
      issue: "PR #204 (gRPC migration) has been pending review for 38 hours.",
      impact: "Blocks 3 downstream sprint tasks",
      severity: "High",
      resolved: false,
    },
    {
      id: "BLK-02",
      repo: "taskaura/webgl-engine",
      issue: "Circular dependency detected between CanvasMatrix and CrdtSync nodes.",
      impact: "May cause hydration race condition",
      severity: "Urgent",
      resolved: false,
    },
    {
      id: "BLK-03",
      repo: "taskaura/cli",
      issue: "Elena is currently allocated 135% of target sprint velocity.",
      impact: "Burnout risk detected",
      severity: "Medium",
      resolved: false,
    },
  ]);

  const doraMetrics = [
    {
      title: "Deployment Frequency",
      value: "14.8 / Day",
      status: "Elite Performer",
      change: "+38% vs last month",
      desc: "Measured across 6 microservice repositories with automated trunk-based merges.",
    },
    {
      title: "Lead Time for Changes",
      value: "1.8 Hours",
      status: "Elite Performer",
      change: "-72% cycle time",
      desc: "Time from first local commit to production deployment across all active squads.",
    },
    {
      title: "Change Failure Rate",
      value: "0.38%",
      status: "Elite Performer",
      change: "-85% rollback incidents",
      desc: "Percentage of releases requiring hotfixes or rollbacks within 24 hours.",
    },
    {
      title: "Mean Time to Recovery (MTTR)",
      value: "8.4 Mins",
      status: "Elite Performer",
      change: "4x faster remediation",
      desc: "Average time to restore full service following an unexpected production regression.",
    },
  ];

  const cycleBreakdown = [
    { stage: "Active Coding & Local Tests", hours: 4.2, pct: 40, color: "bg-cyan-500" },
    { stage: "PR Review & Peer Feedback", hours: 2.1, pct: 25, color: "bg-emerald-500" },
    { stage: "CI/CD Test Suite & Linting", hours: 0.6, pct: 15, color: "bg-purple-500" },
    { stage: "Staging Automated Verification", hours: 0.8, pct: 20, color: "bg-amber-500" },
  ];

  const handleResolveBlocker = (id) => {
    playSuccessSound();
    setBlockers((prev) =>
      prev.map((b) => (b.id === id ? { ...b, resolved: true } : b))
    );
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#00c2ff", "#00e599"],
      });
    } catch (err) {}
  };

  const handleExport = (format) => {
    playSuccessSound();
    setExportedFormat(format);
    setTimeout(() => setExportedFormat(null), 2500);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#f8fbfe] via-[#f0f7fc] to-[#ffffff] text-slate-900 selection:bg-cyan-200 selection:text-cyan-950 overflow-x-hidden">
      <CustomCursor />
      <Navbar onOpenAuth={(mode) => { setAuthMode(mode); setAuthModalOpen(true); }} />

      {/* Hero Header */}
      <section className="relative pt-36 pb-16 sm:pt-40 sm:pb-20 overflow-hidden border-b border-slate-200/80">
        <div className="absolute inset-0 bg-grid-cyber opacity-30 pointer-events-none" />
        <div className="aura-glow-cyan top-1/4 left-1/2 -translate-x-1/2 w-[650px] h-[350px] opacity-20 pointer-events-none" />

        {/* 3D WEBGL GRAPH: Live Sprint Telemetry & Blocker DAG */}
        <div className="absolute inset-0 w-full h-full z-0 flex items-center justify-center pointer-events-none opacity-40">
          <TaskGraph3DCanvas />
        </div>

        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-xs font-mono font-bold text-cyan-800 uppercase tracking-wider mb-6">
            <BarChart3 className="w-3.5 h-3.5 text-cyan-600" />
            Engineering Intelligence & Telemetry
          </span>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#050b1a] leading-[1.12]">
            Engineering Velocity Grounded In <br />
            <span className="bg-gradient-to-r from-cyan-600 via-teal-500 to-emerald-600 bg-clip-text text-transparent">
              Ground-Truth Code Telemetry.
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Stop relying on guesswork and outdated story point estimates. TaskAura extracts real-time telemetry from your Git repositories and CI/CD pipelines to benchmark DORA metrics and resolve blockers.
          </p>

          <div className="mt-8 flex flex-wrap justify-center items-center gap-3">
            <span className="text-xs font-mono text-slate-500 font-bold">Export Telemetry:</span>
            {["PDF Dossier", "CSV Telemetry", "JSON Dump"].map((fmt) => (
              <button
                key={fmt}
                type="button"
                onClick={() => handleExport(fmt)}
                className="px-4 py-2 rounded-xl text-xs font-mono font-bold bg-white border border-slate-300 hover:border-cyan-500 text-slate-800 flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
              >
                {exportedFormat === fmt ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Generated!</span>
                  </>
                ) : (
                  <>
                    <Download className="w-3.5 h-3.5" />
                    <span>{fmt}</span>
                  </>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* DORA 4 Elite Metrics Suite (Clean White Cards) */}
      <section className="py-20 relative border-b border-slate-200/80 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono font-bold text-cyan-800 uppercase tracking-widest bg-cyan-50 px-3 py-1 rounded-full border border-cyan-200">
              Standardized DevOps Benchmarks
            </span>
            <h2 className="text-3xl font-black text-slate-900 mt-3">
              Live DORA Telemetry Performance
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Audited in real time across pull requests, git tags, and production deployment logs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {doraMetrics.map((m, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xl shadow-slate-200/50 hover:border-cyan-400 transition-all hover:-translate-y-1 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold">
                    {m.status}
                  </span>
                  <span className="text-xs font-mono text-cyan-700 font-bold">
                    {m.change}
                  </span>
                </div>

                <div className="text-3xl font-black text-slate-900 group-hover:text-cyan-700 transition-colors">
                  {m.value}
                </div>
                <h3 className="text-sm font-bold text-slate-800 mt-2">
                  {m.title}
                </h3>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  {m.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cycle Time Breakdown & Work In Progress */}
      <section className="py-20 relative border-b border-slate-200/80 bg-gradient-to-b from-[#f0f6fa] to-[#e8f1f7]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Cycle Time Chart */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-mono font-bold text-cyan-800 uppercase tracking-widest bg-cyan-100/80 px-3 py-1 rounded-full">
                Cycle Time Diagnostics
              </span>
              <h2 className="text-3xl font-black text-slate-900 leading-tight">
                Where Do Engineering Hours Actually Go?
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                TaskAura breaks down the lifecycle of every line of code from first commit to production release, highlighting where your team spends excess time waiting for code reviews.
              </p>

              {/* Progress Meters */}
              <div className="space-y-4 pt-2">
                {cycleBreakdown.map((item, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-800 font-bold">{item.stage}</span>
                      <span className="text-cyan-700 font-bold">{item.hours} hrs ({item.pct}%)</span>
                    </div>
                    <div className="w-full h-3 rounded-full bg-slate-200 overflow-hidden">
                      <div
                        className={`h-full ${item.color} rounded-full transition-all duration-1000`}
                        style={{ width: `${item.pct * 2.5}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Live AI Blocker & Risk Triage Feed (High-Tech Module) */}
            <div className="lg:col-span-6">
              <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-2xl relative overflow-hidden">
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-amber-500" />
                    <h3 className="text-base font-bold text-slate-900">Live AI Blocker Triage Feed</h3>
                  </div>
                  <span className="font-mono text-xs text-cyan-700 font-bold">
                    {blockers.filter((b) => !b.resolved).length} Active Blockers
                  </span>
                </div>

                <div className="space-y-4">
                  {blockers.map((b) => (
                    <div
                      key={b.id}
                      className={`p-4 rounded-2xl border transition-all ${
                        b.resolved
                          ? "bg-emerald-50/50 border-emerald-300 opacity-75"
                          : "bg-slate-50 border-slate-200 hover:border-cyan-300"
                      }`}
                    >
                      <div className="flex items-center justify-between text-[11px] font-mono mb-2">
                        <span className="text-cyan-700 font-bold">{b.id} • {b.repo}</span>
                        <span
                          className={`px-2 py-0.5 rounded-full font-bold ${
                            b.severity === "Urgent"
                              ? "bg-rose-50 text-rose-700 border border-rose-200"
                              : "bg-amber-50 text-amber-700 border border-amber-200"
                          }`}
                        >
                          {b.severity}
                        </span>
                      </div>

                      <p className="text-xs font-semibold text-slate-900 leading-relaxed">
                        {b.issue}
                      </p>
                      <p className="text-[11px] text-slate-500 mt-1">
                        Impact: {b.impact}
                      </p>

                      <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
                        {b.resolved ? (
                          <span className="text-xs font-mono font-bold text-emerald-700 flex items-center gap-1.5">
                            <CheckCheck className="w-4 h-4 text-emerald-600" />
                            Auto-Resolved by Copilot
                          </span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleResolveBlocker(b.id)}
                            className="px-3 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
                          >
                            <span>Trigger Copilot Re-assignment</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 relative text-center bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
            Transform Your Engineering Observability
          </h2>
          <p className="mt-4 text-base text-slate-600 max-w-2xl mx-auto">
            Get instant DORA metrics and automated blocker detection without setting up brittle manual dashboards.
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
              Connect Repositories Free
            </Button>
          </div>
        </div>
      </section>

      {/* Auth Modal */}
      <Modal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        title={authMode === "signup" ? "Activate TaskAura Telemetry" : "Sign In"}
      >
        <div className="p-4 text-center">
          <p className="text-sm text-slate-600 mb-4">
            Connect your GitHub or GitLab organization to generate real-time DORA telemetry.
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
