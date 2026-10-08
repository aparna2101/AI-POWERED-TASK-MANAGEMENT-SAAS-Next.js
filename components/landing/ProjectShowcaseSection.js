"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Kanban,
  ListFilter,
  Calendar,
  LineChart,
  Plus,
  MoreHorizontal,
  Clock,
  Sparkles,
  Layers,
  ArrowUpRight,
} from "lucide-react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { SHOWCASE_VIEWS } from "@/lib/constants";
import { playClickSound, playHoverSound } from "@/lib/sound";

export default function ProjectShowcaseSection({ onOpenAuth }) {
  const [activeTab, setActiveTab] = useState("board"); // 'board' | 'list' | 'calendar' | 'analytics'

  const handleTabChange = (tab) => {
    playClickSound();
    setActiveTab(tab);
  };

  return (
    <section id="showcase" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <ScrollReveal>
            <Badge variant="glow" size="md" icon={Layers} className="mb-4">
              Flexible Architecture
            </Badge>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#070b1e]">
              One Unified Workspace. <br />
              <span className="gradient-text-aura">Four Powerful Views.</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              Every engineer, product lead, and executive looks at projects differently. Switch seamlessly between views with zero context loss.
            </p>
          </ScrollReveal>

          {/* View Switcher Tabs */}
          <ScrollReveal delay={0.3}>
            <div className="mt-8 inline-flex items-center gap-1.5 rounded-2xl border border-slate-200/90 bg-white p-1.5 shadow-sm">
              {[
                { id: "board", label: "Board View", icon: Kanban },
                { id: "list", label: "List View", icon: ListFilter },
                { id: "calendar", label: "Calendar", icon: Calendar },
                { id: "analytics", label: "Analytics", icon: LineChart },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => handleTabChange(tab.id)}
                    onMouseEnter={playHoverSound}
                    className={`relative flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold transition-all ${
                      isActive
                        ? "text-white shadow-md"
                        : "text-slate-600 hover:text-[#070b1e] hover:bg-slate-100"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTabBadge"
                        className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                    <Icon className="relative z-10 w-4 h-4" />
                    <span className="relative z-10">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </ScrollReveal>
        </div>

        {/* View Content Display Window */}
        <ScrollReveal delay={0.2}>
          <div className="rounded-3xl border border-slate-200/90 bg-white/95 p-4 sm:p-6 lg:p-8 shadow-2xl ring-1 ring-slate-900/5 min-h-[460px]">
            <AnimatePresence mode="wait">
              {/* BOARD VIEW */}
              {activeTab === "board" && (
                <motion.div
                  key="board"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
                >
                  {SHOWCASE_VIEWS.board.map((col) => (
                    <div
                      key={col.column}
                      className="flex flex-col rounded-2xl bg-slate-50/70 border border-slate-200/70 p-3.5"
                    >
                      {/* Column Header */}
                      <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200/60">
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-bold ${col.color}`}>
                            {col.column}
                          </span>
                          <span className="text-[11px] font-bold text-slate-400 bg-white px-2 py-0.5 rounded-full border border-slate-200">
                            {col.count}
                          </span>
                        </div>
                        <Plus
                          className="w-3.5 h-3.5 text-slate-400 hover:text-slate-700 cursor-pointer"
                          onClick={() => onOpenAuth("signup")}
                        />
                      </div>

                      {/* Cards in Column */}
                      <div className="flex flex-col gap-3">
                        {col.items.map((item) => (
                          <div
                            key={item.id}
                            onClick={() => onOpenAuth("signup")}
                            className="group rounded-xl border border-slate-200/80 bg-white p-3.5 shadow-xs hover:border-purple-300 hover:shadow-md transition-all cursor-pointer"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-[10px] font-mono font-bold text-slate-400">
                                {item.id}
                              </span>
                              <span
                                className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${
                                  item.priority === "Urgent"
                                    ? "bg-rose-50 text-rose-700 border border-rose-200"
                                    : item.priority === "High"
                                    ? "bg-amber-50 text-amber-700 border border-amber-200"
                                    : "bg-slate-100 text-slate-600"
                                }`}
                              >
                                {item.priority}
                              </span>
                            </div>

                            <h4 className="text-xs font-semibold text-slate-900 group-hover:text-purple-600 transition-colors leading-snug">
                              {item.title}
                            </h4>

                            <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                              <span className="font-medium text-slate-600">
                                {item.assignee}
                              </span>
                              <span className="font-bold text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded text-[10px]">
                                Aura {item.auraScore}%
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {/* LIST VIEW */}
              {activeTab === "list" && (
                <motion.div
                  key="list"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="divide-y divide-slate-100"
                >
                  <div className="grid grid-cols-12 pb-3 text-xs font-bold uppercase tracking-wider text-slate-600 px-3">
                    <div className="col-span-5">Task Description</div>
                    <div className="col-span-2">Status</div>
                    <div className="col-span-2">Priority</div>
                    <div className="col-span-2">Assignee</div>
                    <div className="col-span-1 text-right">Progress</div>
                  </div>

                  {SHOWCASE_VIEWS.list.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => onOpenAuth("signup")}
                      className="grid grid-cols-12 items-center py-3.5 px-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer text-xs"
                    >
                      <div className="col-span-5 flex items-center gap-3">
                        <span className="font-mono text-slate-400 font-bold">{item.id}</span>
                        <span className="font-semibold text-slate-900 hover:text-purple-600">{item.title}</span>
                      </div>
                      <div className="col-span-2">
                        <span className="px-2 py-1 rounded-full text-[10px] font-semibold bg-purple-50 text-purple-700 border border-purple-200">
                          {item.status}
                        </span>
                      </div>
                      <div className="col-span-2">
                        <span className="font-medium text-slate-600">{item.priority}</span>
                      </div>
                      <div className="col-span-2 font-medium text-slate-700">{item.assignee}</div>
                      <div className="col-span-1 text-right font-bold text-purple-600">
                        {item.progress}%
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {/* CALENDAR VIEW */}
              {activeTab === "calendar" && (
                <motion.div
                  key="calendar"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 sm:grid-cols-5 gap-3"
                >
                  {SHOWCASE_VIEWS.calendar.map((c) => (
                    <div
                      key={c.day}
                      className="rounded-2xl border border-slate-200/80 bg-slate-50/50 p-4 min-h-[220px]"
                    >
                      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                        <span className="text-xs font-bold text-slate-500 uppercase">{c.day}</span>
                        <span className="text-base font-extrabold text-[#070b1e]">{c.date}</span>
                      </div>

                      <div className="mt-3 flex flex-col gap-2">
                        {c.events.map((ev, i) => (
                          <div
                            key={i}
                            onClick={() => onOpenAuth("signup")}
                            className="p-2.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs hover:border-purple-300 transition-all cursor-pointer"
                          >
                            <span className="text-[10px] font-semibold text-purple-600">{ev.time}</span>
                            <h5 className="text-xs font-bold text-slate-800 mt-0.5">{ev.title}</h5>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {/* ANALYTICS VIEW */}
              {activeTab === "analytics" && (
                <motion.div
                  key="analytics"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                  <div className="rounded-2xl border border-slate-200 p-6 bg-slate-50/50">
                    <div className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                      Sprint Velocity Surge
                    </div>
                    <div className="text-3xl font-black text-emerald-600 mt-2">
                      {SHOWCASE_VIEWS.analytics.velocity}
                    </div>
                    <p className="text-xs text-slate-500 mt-2">
                      Outpacing typical sprint baseline by 2.4 days on average.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 p-6 bg-slate-50/50">
                    <div className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                      Completion Rate
                    </div>
                    <div className="text-3xl font-black gradient-text-aura mt-2">
                      {SHOWCASE_VIEWS.analytics.completionRate}%
                    </div>
                    <p className="text-xs text-slate-500 mt-2">
                      {SHOWCASE_VIEWS.analytics.completedTasks} tasks closed out of {SHOWCASE_VIEWS.analytics.totalPlanned} planned.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 p-6 bg-slate-50/50">
                    <div className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                      AI Hours Saved
                    </div>
                    <div className="text-3xl font-black text-purple-600 mt-2">
                      {SHOWCASE_VIEWS.analytics.aiHoursSaved} hrs
                    </div>
                    <p className="text-xs text-slate-500 mt-2">
                      Automated sprint writing, issue grooming, and status memos.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
