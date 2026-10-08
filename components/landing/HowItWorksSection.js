"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Kanban,
  Sparkles,
  Users2,
  BarChart3,
  CalendarDays,
  Bell,
  ArrowRight,
  CheckCircle2,
  Clock,
  Check,
  Zap,
  Activity,
  Layers,
  FolderKanban,
} from "lucide-react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { playClickSound, playHoverSound, playSuccessSound } from "@/lib/sound";
import confetti from "canvas-confetti";

export default function HowItWorksSection({ onOpenAuth }) {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      num: "01",
      title: "Create Projects & Kanban",
      subtitle: "Smart Task Boards",
      description:
        "Easily organize work into intuitive Kanban boards with custom columns (To Do, In Progress, Review, Done). Drag and drop tasks, set priorities, and customize tags for your team.",
      tag: "Project & Kanban Management",
      icon: Kanban,
      badgeColor: "from-cyan-500 to-teal-400",
      simulator: {
        badge: "Active Project: SaaS Platform v2.0",
        title: "Interactive Kanban Board • 18 Daily Tasks",
        items: [
          { name: "Design User Onboarding Flow", status: "In Progress • Alex Rivera", active: true },
          { name: "Setup Real-time Notification System", status: "To Do • Priority: High", active: true },
          { name: "Payment Gateway Integration", status: "Done • Verified", active: true },
        ],
        metric: "Board Status: 12 Done • 4 In Progress • 2 To Do",
      },
    },
    {
      num: "02",
      title: "AI Task Generation",
      subtitle: "AI Copilot Assistance",
      description:
        "Tell AI your project goals or feature ideas. TaskAura's AI Copilot instantly decomposes goals into granular subtasks, estimates story points, recommends completion times, and auto-assigns squad members.",
      tag: "AI Copilot & Task Planning",
      icon: Sparkles,
      badgeColor: "from-teal-400 to-emerald-400",
      simulator: {
        badge: "AI Copilot: 'Plan Auth & Billing Module'",
        title: "AI Generated 3 Actionable Tasks in 1.2s",
        items: [
          { name: "TK-101: JWT & OAuth Security Middleware", status: "Est: 4 hrs • Priority: High", active: true },
          { name: "TK-102: Build Team Roles & Permission Grid", status: "Est: 3 hrs • Priority: Medium", active: true },
          { name: "TK-103: Stripe Customer Portal & Invoices", status: "Est: 5 hrs • Priority: High", active: true },
        ],
        metric: "Planning Time Saved: ~4.5 hrs per sprint",
      },
    },
    {
      num: "03",
      title: "Team & Deadlines",
      subtitle: "Multiplayer & Calendar Sync",
      description:
        "Invite your squad, assign teammates to tasks, leave comments, and track milestone deadlines on an interactive calendar. Smart notifications keep everyone in sync without endless meetings.",
      tag: "Team Collaboration & Calendar",
      icon: Users2,
      badgeColor: "from-amber-400 to-rose-400",
      simulator: {
        badge: "Live Team Squad • 6 Active Collaborators",
        title: "Deadlines, Calendar & Instant Alerts",
        items: [
          { name: "Calendar Deadline: Beta Launch Demo", status: "Due Friday, 5:00 PM • On Track", active: true },
          { name: "Notification: Marcus completed 'DB Migration'", status: "Just now • Ready for QA", active: true },
          { name: "Team Sync: Priya updated 'API Endpoints'", status: "Status moved to Review", active: true },
        ],
        metric: "Multiplayer Sync: Sub-50ms Real-Time",
      },
    },
    {
      num: "04",
      title: "Analytics & Insights",
      subtitle: "Velocity & Burndown",
      description:
        "Visualize your team's velocity with real-time sprint burndown charts, completion rates, and AI-powered insights that highlight blockers and bottlenecks before deadlines are missed.",
      tag: "Analytics & Project Insights",
      icon: BarChart3,
      badgeColor: "from-emerald-400 to-cyan-500",
      simulator: {
        badge: "Sprint Velocity & Performance Score",
        title: "Live Project Insights: 98% Health Score",
        items: [
          { name: "Weekly Tasks Completed", status: "28 Tasks Finished (+35% Velocity)", active: true },
          { name: "Average Completion Time", status: "1.4 Days per Task (Fast)", active: true },
          { name: "AI Insight & Recommendation", status: "No Deadlocks • Sprint on track to finish 2 days early", active: true },
        ],
        metric: "Overall Team Velocity: 4.2x Faster Delivery",
      },
    },
  ];

  const handleStepClick = (idx) => {
    playClickSound();
    setActiveStep(idx);
  };

  const handleTriggerLaunch = () => {
    playSuccessSound();
    try {
      confetti({
        particleCount: 65,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#00c2ff", "#00e599", "#fbbf24"],
      });
    } catch (e) {}
    onOpenAuth("signup");
  };

  return (
    <section
      id="how-it-works"
      className="relative w-full py-24 sm:py-32 bg-[#050b1a] text-white border-y border-cyan-500/20 overflow-hidden"
    >
      {/* Background Cyber Ambient Radiance */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(0,194,255,0.08),transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[500px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(0,229,153,0.06),transparent_70%)] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            Intelligent Execution Workflow
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
            How TaskAura Works: <br />
            <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
              Manage Projects & Tasks with AI in 4 Steps.
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            From smart project creation and Kanban task boards to autonomous AI task generation, real-time team collaboration, and predictive velocity analytics.
          </p>
        </div>

        {/* 4 Interactive Step Selector Pills */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-10">
          {steps.map((st, i) => {
            const Icon = st.icon;
            const isCurrent = activeStep === i;

            return (
              <button
                key={st.num}
                onClick={() => handleStepClick(i)}
                onMouseEnter={playHoverSound}
                className={`p-4 sm:p-5 rounded-2xl border text-left transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                  isCurrent
                    ? "bg-gradient-to-b from-[#0c1c38] to-[#071328] border-cyan-400 shadow-xl shadow-cyan-950/60 ring-1 ring-cyan-400/50"
                    : "bg-[#071328]/70 border-slate-800 hover:border-slate-700 hover:bg-[#091830]"
                }`}
              >
                <div className="flex items-center justify-between w-full mb-3">
                  <span
                    className={`text-xs font-mono font-black px-2 py-0.5 rounded-md ${
                      isCurrent
                        ? "bg-cyan-500 text-slate-950"
                        : "bg-slate-800 text-slate-400"
                    }`}
                  >
                    STEP {st.num}
                  </span>
                  <div
                    className={`p-2 rounded-xl transition-all ${
                      isCurrent
                        ? "bg-cyan-500/20 text-cyan-300 scale-110"
                        : "text-slate-500"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <div>
                  <h3
                    className={`text-sm font-bold transition-colors ${
                      isCurrent ? "text-white" : "text-slate-300"
                    }`}
                  >
                    {st.title}
                  </h3>
                  <span className="text-[11px] text-cyan-400 font-medium block mt-0.5">
                    {st.subtitle}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Step Deep-Dive Showcase Box */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="p-6 sm:p-8 lg:p-10 rounded-3xl bg-gradient-to-b from-[#0a1834] to-[#061022] border border-cyan-500/30 shadow-2xl relative overflow-hidden"
          >
            {/* Ambient Corner Accent */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              {/* Left Details (7 cols) */}
              <div className="lg:col-span-7 space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/40 text-xs font-mono font-bold text-cyan-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  Phase {steps[activeStep].num}: {steps[activeStep].tag}
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  {steps[activeStep].title}
                </h3>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  {steps[activeStep].description}
                </p>

                {/* Key Benefits Checklist */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="flex items-center gap-2.5 text-xs text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Drag-and-drop Kanban & task boards</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Instant AI task generation & estimates</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Real-time team multiplayer & calendar</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Automated sprint velocity & blocker insights</span>
                  </div>
                </div>

                <div className="pt-4 flex flex-wrap items-center gap-4">
                  <Button
                    variant="aura"
                    size="md"
                    onClick={handleTriggerLaunch}
                    rightIcon={ArrowRight}
                  >
                    Experience Phase {steps[activeStep].num} Live
                  </Button>

                  <span className="text-xs text-slate-400 font-mono">
                    {steps[activeStep].simulator.metric}
                  </span>
                </div>
              </div>

              {/* Right Interactive Simulator Cockpit (5 cols) */}
              <div className="lg:col-span-5">
                <div className="p-5 sm:p-6 rounded-2xl bg-[#040814]/90 border border-cyan-500/30 shadow-xl space-y-4 font-mono text-xs">
                  {/* Console Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <div className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
                      <div className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
                      <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
                      <span className="text-[11px] text-slate-400 ml-1 font-sans font-bold">
                        TaskAura Telemetry Core
                      </span>
                    </div>
                    <span className="text-[10px] text-emerald-400 bg-emerald-950/80 border border-emerald-800/40 px-2 py-0.5 rounded">
                      Live Stream
                    </span>
                  </div>

                  {/* Simulator Box */}
                  <div className="space-y-3">
                    <div className="p-2.5 rounded-xl bg-[#09152b] border border-cyan-500/20 text-cyan-300 text-[11px] font-sans font-bold flex items-center justify-between">
                      <span>{steps[activeStep].simulator.badge}</span>
                      <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                    </div>

                    <p className="text-[11px] text-slate-400 font-sans">
                      {steps[activeStep].simulator.title}
                    </p>

                    <div className="space-y-2">
                      {steps[activeStep].simulator.items.map((item, itmIdx) => (
                        <div
                          key={itmIdx}
                          className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between text-[11px] gap-2"
                        >
                          <span className="text-slate-200 font-bold truncate flex-1 min-w-0">
                            {item.name}
                          </span>
                          <span
                            className={`text-[10px] font-bold shrink-0 ${
                              item.active ? "text-emerald-400" : "text-rose-400"
                            }`}
                          >
                            {item.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
                    <span>Cluster: US-East-1</span>
                    <span className="text-cyan-400 font-bold">
                      {steps[activeStep].simulator.metric}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
