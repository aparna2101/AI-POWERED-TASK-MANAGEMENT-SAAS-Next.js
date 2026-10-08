"use client";

import { motion } from "framer-motion";
import {
  TrendingUp,
  CheckCircle2,
  AlertTriangle,
  Zap,
  Activity,
  BarChart,
  PieChart,
} from "lucide-react";
import Badge from "@/components/ui/Badge";
import ScrollReveal from "@/components/animations/ScrollReveal";

export default function AnalyticsSection({ onOpenAuth }) {
  const weeklyData = [
    { day: "Mon", completed: 32, planned: 35, velocity: 91 },
    { day: "Tue", completed: 48, planned: 50, velocity: 96 },
    { day: "Wed", completed: 64, planned: 65, velocity: 98 },
    { day: "Thu", completed: 78, planned: 75, velocity: 104 },
    { day: "Fri", completed: 94, planned: 88, velocity: 107 },
  ];

  return (
    <section id="analytics" className="relative py-14 sm:py-18 bg-[#050b1a] text-white overflow-hidden border-b border-cyan-500/20">
      {/* Background Cyber Glow */}
      <div className="aura-glow-cyan top-1/2 left-10 w-96 h-96" />
      <div className="aura-glow-emerald bottom-10 right-10 w-96 h-96" />
      <div className="absolute inset-0 bg-grid-cyber-dark opacity-15 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-5">
            <ScrollReveal>
              <Badge variant="dark" size="md" icon={TrendingUp} className="mb-4">
                Real-Time Telemetry
              </Badge>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-[1.1]">
                Self-Drawing <br />
                <span className="gradient-text-aura">Neural Analytics.</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
                TaskAura telemetry continuously ingests PR cycle times, commit velocities, and task resolutions to project sprint delivery with 99.4% precision.
              </p>
            </ScrollReveal>

            {/* Metric Checkpoints */}
            <ScrollReveal delay={0.3}>
              <div className="mt-8 space-y-4">
                {[
                  { title: "Predictive Burn-down Curve", desc: "Eliminates scope creep before it impacts engineering releases." },
                  { title: "Automated Dependency Telemetry", desc: "Monitors cross-squad API dependencies and flags blocked PRs." },
                  { title: "Capacity Balancer", desc: "Balances engineer load automatically to avoid sprint burnout." },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-cyan-950 border border-cyan-400 text-cyan-300">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{item.title}</h4>
                      <p className="text-xs text-slate-400 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>

          {/* Right Animated Dashboard Visual */}
          <div className="lg:col-span-7">
            <ScrollReveal delay={0.25}>
              <div className="rounded-3xl border border-cyan-500/30 bg-[#081426]/95 p-6 sm:p-8 shadow-2xl shadow-cyan-950/80 backdrop-blur-2xl ring-1 ring-cyan-400/20">
                {/* 4 Metric Counter Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3.5 pb-6 border-b border-cyan-500/20">
                  <div className="p-3 sm:p-3.5 rounded-2xl bg-cyan-950/40 border border-cyan-500/20">
                    <span className="text-[9px] sm:text-[10px] font-mono font-bold text-cyan-300 uppercase block truncate">Completion</span>
                    <div className="text-xl sm:text-2xl font-black text-white mt-1">94.2%</div>
                    <span className="text-[9px] sm:text-[10px] text-emerald-400 font-mono mt-1 block">▲ +12% target</span>
                  </div>

                  <div className="p-3 sm:p-3.5 rounded-2xl bg-teal-950/40 border border-teal-500/20">
                    <span className="text-[9px] sm:text-[10px] font-mono font-bold text-teal-300 uppercase block truncate">Productivity</span>
                    <div className="text-xl sm:text-2xl font-black text-white mt-1">98.8</div>
                    <span className="text-[9px] sm:text-[10px] text-teal-300 font-mono mt-1 block">Pts / Sprint</span>
                  </div>

                  <div className="p-3 sm:p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-500/20">
                    <span className="text-[9px] sm:text-[10px] font-mono font-bold text-emerald-300 uppercase block truncate">Tasks Done</span>
                    <div className="text-xl sm:text-2xl font-black text-white mt-1">318</div>
                    <span className="text-[9px] sm:text-[10px] text-emerald-400 font-mono mt-1 block">0 Regressions</span>
                  </div>

                  <div className="p-3 sm:p-3.5 rounded-2xl bg-slate-900/60 border border-slate-700/60">
                    <span className="text-[9px] sm:text-[10px] font-mono font-bold text-slate-400 uppercase block truncate">Overdue</span>
                    <div className="text-xl sm:text-2xl font-black text-emerald-400 mt-1">0</div>
                    <span className="text-[9px] sm:text-[10px] text-emerald-400 font-mono mt-1 block">100% On-Time</span>
                  </div>
                </div>

                {/* Animated Bar Chart Drawing Itself */}
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-white font-mono">
                      Daily Sprint Delivery Velocity
                    </span>
                    <span className="text-xs text-emerald-300 font-mono bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                      Actual vs Planned
                    </span>
                  </div>

                  <div className="flex items-end justify-between gap-3 sm:gap-6 h-48 pt-6">
                    {weeklyData.map((d, i) => (
                      <div key={d.day} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                        <div className="w-full flex items-end justify-center gap-1.5 h-full">
                          {/* Planned Capacity Bar */}
                          <motion.div
                            initial={{ height: 0 }}
                            whileInView={{ height: `${(d.planned / 100) * 100}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: i * 0.1 }}
                            className="w-1/2 bg-slate-800 rounded-t-sm"
                            title={`Planned: ${d.planned}`}
                          />
                          {/* Actual Completed Bar in Cyan/Teal/Emerald Gradient */}
                          <motion.div
                            initial={{ height: 0 }}
                            whileInView={{ height: `${(d.completed / 100) * 100}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.9, delay: i * 0.1 + 0.1 }}
                            className="w-1/2 bg-gradient-to-t from-[#0084ff] via-[#00c2ff] to-[#00e599] rounded-t-sm shadow-md shadow-cyan-500/20"
                            title={`Completed: ${d.completed}`}
                          />
                        </div>
                        <span className="text-[11px] font-mono font-bold text-slate-400">{d.day}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 flex items-center justify-center gap-6 text-xs text-slate-400 font-mono">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-xs bg-slate-800" />
                      <span>Planned Story Points</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-xs bg-gradient-to-r from-cyan-400 to-emerald-400" />
                      <span>Completed Deliverables</span>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
