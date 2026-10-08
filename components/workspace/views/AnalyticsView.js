"use client";

import { useState } from "react";
import {
  BarChart3,
  TrendingUp,
  Activity,
  AlertTriangle,
  CheckCircle2,
  Zap,
  ShieldAlert,
  GitPullRequest,
  Clock,
  Sparkles,
  Download,
} from "lucide-react";
import confetti from "canvas-confetti";
import { playClickSound, playSuccessSound, playHoverSound } from "@/lib/sound";

export default function AnalyticsView({ blockers, onResolveBlocker }) {
  const [exportedFormat, setExportedFormat] = useState(null);

  const velocityHistory = [
    { sprint: "Sprint 1", points: 34, height: "55%" },
    { sprint: "Sprint 2", points: 39, height: "65%" },
    { sprint: "Sprint 3", points: 42, height: "75%" },
    { sprint: "Sprint 4 (Active)", points: 48, height: "92%" },
    { sprint: "Sprint 5 (Projected)", points: 52, height: "100%" },
  ];

  const handleExport = (format) => {
    playSuccessSound();
    setExportedFormat(format);
    setTimeout(() => setExportedFormat(null), 3000);
  };

  const handleResolve = (blockerId) => {
    playSuccessSound();
    onResolveBlocker(blockerId);
    try {
      confetti({
        particleCount: 45,
        spread: 60,
        origin: { y: 0.7 },
        colors: ["#00e599", "#00c2ff"],
      });
    } catch (err) { }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-3">
            <BarChart3 className="w-7 h-7 text-cyan-400" />
            Engineering Analytics & Velocity
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-time DORA cycle times, throughput forecasting, and blocker mitigation telemetry.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleExport("JSON")}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-700 bg-slate-900/80 hover:bg-slate-800 text-xs font-bold text-slate-300 hover:text-white transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{exportedFormat === "JSON" ? "Exported!" : "Export CSV"}</span>
          </button>
        </div>
      </div>

      {/* 2. DORA Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 sm:p-5 rounded-2xl bg-[#09152b] border border-cyan-500/20 shadow-md">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Deployment Frequency
          </span>
          <div className="mt-2 text-2xl font-black text-white font-mono">
            4.8 <span className="text-xs font-sans text-cyan-400">/ day</span>
          </div>
          <span className="inline-block mt-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
            Elite Tier Performance
          </span>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-[#09152b] border border-cyan-500/20 shadow-md">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Lead Time For Changes
          </span>
          <div className="mt-2 text-2xl font-black text-white font-mono">
            42 <span className="text-xs font-sans text-cyan-400">min</span>
          </div>
          <span className="inline-block mt-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
            Commit to Production
          </span>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-[#09152b] border border-cyan-500/20 shadow-md">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Change Failure Rate
          </span>
          <div className="mt-2 text-2xl font-black text-white font-mono">
            0.8% <span className="text-xs font-sans text-emerald-400">Nominal</span>
          </div>
          <span className="inline-block mt-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
            99.2% Canary Success
          </span>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-[#09152b] border border-cyan-500/20 shadow-md">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Mean Time To Restore
          </span>
          <div className="mt-2 text-2xl font-black text-white font-mono">
            14 <span className="text-xs font-sans text-cyan-400">min</span>
          </div>
          <span className="inline-block mt-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
            Instant Rollback Active
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Velocity History Chart */}
        <div className="p-5 sm:p-6 rounded-3xl bg-[#09152b] border border-cyan-500/20 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-cyan-400" />
              Sprint Throughput Velocity (Points)
            </h3>
            <span className="text-xs font-mono font-bold text-emerald-400">
              ↑ 41% Q4 Growth
            </span>
          </div>

          <div className="h-64 pt-6 flex items-end justify-between gap-3 border-b border-slate-800 pb-2">
            {velocityHistory.map((v, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                <span className="text-xs font-mono font-bold text-cyan-300">
                  {v.points}
                </span>
                <div
                  className="w-full max-w-[48px] rounded-t-xl bg-gradient-to-t from-cyan-600 via-teal-400 to-emerald-400 shadow-md transition-all duration-500 hover:opacity-90"
                  style={{ height: v.height }}
                />
                <span className="text-[10px] text-slate-400 font-medium truncate max-w-[70px]">
                  {v.sprint}
                </span>
              </div>
            ))}
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            Team output has increased by 14 story points over 4 consecutive sprints due to AI-assisted backlog synthesis and automated PR reviews.
          </p>
        </div>

        {/* Right Column: Active Blocker Mitigation Feed */}
        <div className="p-5 sm:p-6 rounded-3xl bg-[#09152b] border border-cyan-500/20 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-400" />
              Live PR & Architecture Blockers
            </h3>
            <span className="text-xs text-slate-400">
              {blockers.filter((b) => !b.resolved).length} Unresolved
            </span>
          </div>

          <div className="space-y-3">
            {blockers.map((b) => (
              <div
                key={b.id}
                className={`p-4 rounded-2xl border transition-all ${b.resolved
                    ? "bg-slate-900/40 border-slate-800 opacity-60"
                    : "bg-[#08152c] border-rose-500/30"
                  }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold text-slate-400">
                      {b.repo}
                    </span>
                    <span
                      className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${b.resolved
                          ? "bg-emerald-500/20 text-emerald-300"
                          : "bg-rose-500/20 text-rose-300"
                        }`}
                    >
                      {b.resolved ? "Resolved" : b.severity}
                    </span>
                  </div>

                  {!b.resolved && (
                    <button
                      onClick={() => handleResolve(b.id)}
                      className="px-2.5 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-[10px] font-bold border border-emerald-500/30 transition-colors cursor-pointer"
                    >
                      Resolve with AI
                    </button>
                  )}
                </div>

                <p className={`text-xs font-bold ${b.resolved ? "text-slate-400 line-through" : "text-white"}`}>
                  {b.title}
                </p>
                <p className="text-[11px] text-slate-400 mt-1">
                  Impact: {b.impact}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
