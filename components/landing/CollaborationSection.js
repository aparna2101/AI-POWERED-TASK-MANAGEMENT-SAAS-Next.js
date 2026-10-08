"use client";

import { motion } from "framer-motion";
import {
  Users2,
  MessageSquare,
  Sparkles,
  MousePointer2,
  CheckCircle,
  Share2,
  AlertCircle,
  Clock,
} from "lucide-react";
import Badge from "@/components/ui/Badge";
import ScrollReveal from "@/components/animations/ScrollReveal";

export default function CollaborationSection({ onOpenAuth }) {
  const teamMembers = [
    {
      name: "Sarah Miller",
      role: "Lead Product Architect",
      status: "Refining Checkout V2",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      color: "border-cyan-400",
      tag: "Figma Live",
    },
    {
      name: "Liam Taylor",
      role: "Senior Systems Engineer",
      status: "Reviewing PR #402",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      color: "border-teal-400",
      tag: "GitHub Sync",
    },
    {
      name: "Elena Rostova",
      role: "Engineering Director",
      status: "Synthesizing Sprint Memos",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
      color: "border-emerald-400",
      tag: "Roadmaps",
    },
  ];

  const activityFeed = [
    { icon: Users2, text: "Sarah assigned you a task: 'Passkey OAuth2 Flow'", time: "2m ago", color: "text-cyan-600 bg-cyan-50" },
    { icon: CheckCircle, text: "Liam completed UI Design System Tokens", time: "12m ago", color: "text-emerald-600 bg-emerald-50" },
    { icon: AlertCircle, text: "AI detected a project blocker & suggested mitigation", time: "28m ago", color: "text-amber-600 bg-amber-50" },
  ];

  return (
    <section className="relative py-28 sm:py-36 bg-slate-50/70 border-b border-slate-200 overflow-hidden">
      {/* Background Soft Glow */}
      <div className="aura-glow-teal bottom-10 right-10 w-96 h-96" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <ScrollReveal>
            <Badge variant="glow" size="md" icon={Users2} className="mb-4">
              Multiplayer Speed
            </Badge>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#050b1a] leading-[1.15]">
              Built For Modern Teams <br />
              <span className="gradient-text-aura">To Build Together.</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              Real-time multi-cursor presence, inline threads, and asynchronous daily summaries keep your team completely synchronized without endless meetings.
            </p>
          </ScrollReveal>
        </div>

        {/* Live Multiplayer Board Simulation */}
        <ScrollReveal delay={0.25}>
          <div className="relative max-w-5xl mx-auto rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-10 shadow-2xl overflow-hidden ring-1 ring-slate-900/5">
            {/* Simulated Live Cursors floating */}
            <motion.div
              animate={{
                x: [0, 50, -25, 0],
                y: [0, -35, 25, 0],
              }}
              transition={{ repeat: Infinity, duration: 8.5, ease: "easeInOut" }}
              className="absolute top-20 left-1/4 z-20 pointer-events-none flex items-center gap-1.5"
            >
              <MousePointer2 className="w-5 h-5 text-cyan-500 fill-cyan-500" />
              <span className="rounded-full bg-cyan-600 px-2.5 py-0.5 text-[11px] font-bold text-white shadow-md">
                Sarah M. (Editing Spec)
              </span>
            </motion.div>

            <motion.div
              animate={{
                x: [0, -55, 35, 0],
                y: [0, 45, -18, 0],
              }}
              transition={{ repeat: Infinity, duration: 10, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-28 right-1/4 z-20 pointer-events-none flex items-center gap-1.5"
            >
              <MousePointer2 className="w-5 h-5 text-emerald-500 fill-emerald-500" />
              <span className="rounded-full bg-emerald-600 px-2.5 py-0.5 text-[11px] font-bold text-white shadow-md">
                Liam T. (Reviewing PR)
              </span>
            </motion.div>

            {/* Grid of Team Members */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
              {teamMembers.map((member) => (
                <div
                  key={member.name}
                  className="rounded-2xl border border-slate-200/80 bg-slate-50/50 p-5 hover:bg-white hover:shadow-lg hover:border-cyan-300 transition-all"
                >
                  <div className="flex items-center gap-3.5 mb-4">
                    <div className="relative">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className={`h-12 w-12 rounded-full border-2 ${member.color} object-cover shadow-sm`}
                      />
                      <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-500 border-2 border-white" />
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{member.name}</h4>
                      <p className="text-xs text-slate-500">{member.role}</p>
                    </div>
                  </div>

                  <div className="rounded-xl bg-white border border-slate-200/70 p-3 shadow-2xs">
                    <div className="flex items-center justify-between text-[10px] font-mono font-bold text-slate-400 mb-1">
                      <span>CURRENT ACTIVITY</span>
                      <span className="text-teal-600">{member.tag}</span>
                    </div>
                    <p className="text-xs font-semibold text-slate-800">{member.status}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Real-time Activity Timeline Strip */}
            <div className="mt-8 pt-6 border-t border-slate-100 space-y-2.5">
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block mb-3">
                LIVE TEAM ACTIVITY STREAM
              </span>
              {activityFeed.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-50/70 border border-slate-200/60 text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-1.5 rounded-lg ${item.color}`}>
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <span className="font-semibold text-slate-800">{item.text}</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">{item.time}</span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
