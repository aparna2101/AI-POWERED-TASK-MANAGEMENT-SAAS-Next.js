"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Kanban,
  ListFilter,
  Calendar,
  LineChart,
  Layers,
  Plus,
  Clock,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  TrendingUp,
} from "lucide-react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { KANBAN_COLUMNS } from "@/lib/constants";
import { playClickSound, playHoverSound, playSuccessSound } from "@/lib/sound";

export default function ProjectWorkspace({ onOpenAuth }) {
  const [activeTab, setActiveTab] = useState("board");
  const [columns, setColumns] = useState(KANBAN_COLUMNS);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleTabClick = (tab) => {
    playClickSound();
    setActiveTab(tab);
  };

  const handleTaskClick = (task, colId) => {
    playClickSound();
    setSelectedTask({ ...task, colId });
  };

  const handleMoveTaskForward = (taskId, currentColId) => {
    playSuccessSound();
    const colOrder = ["backlog", "todo", "inprogress", "review", "completed"];
    const currIdx = colOrder.indexOf(currentColId);
    if (currIdx === -1 || currIdx === colOrder.length - 1) return;
    const nextColId = colOrder[currIdx + 1];

    setColumns((prevCols) => {
      let movedItem = null;
      const updated = prevCols.map((col) => {
        if (col.id === currentColId) {
          const remaining = col.tasks.filter((t) => {
            if (t.id === taskId) {
              movedItem = t;
              return false;
            }
            return true;
          });
          return { ...col, tasks: remaining, count: remaining.length };
        }
        return col;
      });

      if (movedItem) {
        return updated.map((col) => {
          if (col.id === nextColId) {
            return {
              ...col,
              tasks: [movedItem, ...col.tasks],
              count: col.tasks.length + 1,
            };
          }
          return col;
        });
      }
      return updated;
    });

    setSelectedTask(null);
  };

  return (
    <section id="workspace" className="relative py-14 sm:py-18 bg-gradient-to-b from-[#e8f6f9] via-[#e1f3f7] to-[#eaf5f8] overflow-hidden border-b border-cyan-200/80">
      <div className="absolute inset-0 bg-grid-cyber-light opacity-50 pointer-events-none" />
      <div className="aura-glow-cyan top-1/2 left-1/4 w-[500px] h-[500px] opacity-35 pointer-events-none" />
      <div className="aura-glow-emerald bottom-10 right-1/4 w-[450px] h-[450px] opacity-25 pointer-events-none" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <ScrollReveal>
            <Badge variant="glow" size="md" icon={Kanban} className="mb-3">
              Autonomous Project Workspace
            </Badge>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#050b1a] leading-[1.15]">
              Real-Time Agile Execution. <br />
              <span className="gradient-text-aura">Five Dynamic Stages.</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              Interact with our live multi-stage board. Move tasks forward, expand details, and see instant AI capacity balancing.
            </p>
          </ScrollReveal>

          {/* Workspace Views Switcher */}
          <ScrollReveal delay={0.3}>
            <div className="mt-6 sm:mt-8 flex flex-nowrap overflow-x-auto max-w-full pb-1 sm:pb-0 sm:flex-wrap justify-start sm:justify-center items-center gap-1.5 rounded-2xl border border-slate-200/90 bg-slate-50 p-1.5 shadow-xs">
              {[
                { id: "board", label: "Kanban Board", icon: Kanban },
                { id: "overview", label: "Sprint Overview", icon: Layers },
                { id: "list", label: "List View", icon: ListFilter },
                { id: "calendar", label: "Calendar", icon: Calendar },
                { id: "analytics", label: "Velocity", icon: LineChart },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => handleTabClick(tab.id)}
                    onMouseEnter={playHoverSound}
                    className={`relative flex items-center gap-1.5 sm:gap-2 rounded-xl px-3 sm:px-4 py-2 text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                      isActive
                        ? "text-white shadow-md"
                        : "text-slate-600 hover:text-[#050b1a] hover:bg-white"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeWorkspaceTab"
                        className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#0084ff] via-[#00c2ff] to-[#00e599]"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <Icon className="relative z-10 w-4 h-4 shrink-0" />
                    <span className="relative z-10">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </ScrollReveal>
        </div>

        {/* Workspace Display Body */}
        <ScrollReveal delay={0.25}>
          <div className="rounded-3xl border border-slate-200/90 bg-white p-3.5 sm:p-6 lg:p-8 shadow-xl ring-1 ring-slate-900/5 min-h-[500px]">
            {/* 1. KANBAN BOARD VIEW (5 COLUMNS: Backlog, To Do, In Progress, Review, Completed) */}
            {activeTab === "board" && (
              <div className="flex overflow-x-auto pb-4 gap-4 md:grid md:grid-cols-3 lg:grid-cols-5 md:overflow-visible">
                {columns.map((col) => (
                  <div
                    key={col.id}
                    className="flex flex-col rounded-2xl bg-slate-50/80 border border-slate-200/80 p-3.5 min-w-[260px] md:min-w-0 shrink-0 md:shrink"
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200/60">
                      <div className="flex items-center gap-2">
                        <span className={`h-2.5 w-2.5 rounded-full ${col.accent}`} />
                        <span className={`text-xs font-black uppercase tracking-wider ${col.color}`}>
                          {col.title}
                        </span>
                        <span className="text-[10px] font-bold text-slate-500 bg-white px-1.5 py-0.2 rounded border border-slate-200">
                          {col.count}
                        </span>
                      </div>
                      <Plus
                        className="w-3.5 h-3.5 text-slate-400 hover:text-cyan-600 cursor-pointer"
                        onClick={() => onOpenAuth("signup")}
                      />
                    </div>

                    {/* Tasks in Column */}
                    <div className="flex flex-col gap-2.5">
                      {col.tasks.map((task) => (
                        <motion.div
                          key={task.id}
                          whileHover={{ y: -2, scale: 1.01 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleTaskClick(task, col.id)}
                          className="group rounded-xl border border-slate-200/90 bg-white p-3.5 shadow-2xs hover:border-cyan-400 hover:shadow-md transition-all cursor-pointer"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-mono font-bold text-slate-400">
                              {task.id}
                            </span>
                            <span
                              className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                                task.priority === "Urgent"
                                  ? "bg-rose-50 text-rose-700 border border-rose-200"
                                  : task.priority === "High"
                                  ? "bg-amber-50 text-amber-700 border border-amber-200"
                                  : "bg-teal-50 text-teal-700 border border-teal-200"
                              }`}
                            >
                              {task.priority}
                            </span>
                          </div>

                          <h4 className="text-xs font-bold text-slate-900 group-hover:text-teal-600 transition-colors leading-snug">
                            {task.title}
                          </h4>

                          <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
                            <span className="font-semibold text-slate-700">{task.assignee}</span>
                            <span className="text-slate-400 font-mono">{task.time}</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 2. SPRINT OVERVIEW */}
            {activeTab === "overview" && (
              <div className="p-2 sm:p-4 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                  <div className="p-5 sm:p-6 rounded-2xl bg-cyan-50/60 border border-cyan-200/60">
                    <span className="text-xs font-mono font-bold text-cyan-800 uppercase">ACTIVE SPRINT</span>
                    <h3 className="text-xl sm:text-2xl font-black text-[#050b1a] mt-1">Aurora Release 4.2</h3>
                    <p className="text-xs text-slate-600 mt-2">13 Deliverables across 4 squads. Target release Oct 28.</p>
                  </div>
                  <div className="p-5 sm:p-6 rounded-2xl bg-emerald-50/60 border border-emerald-200/60">
                    <span className="text-xs font-mono font-bold text-emerald-800 uppercase">COMPLETION RATE</span>
                    <h3 className="text-xl sm:text-2xl font-black text-emerald-700 mt-1">91.4%</h3>
                    <p className="text-xs text-slate-600 mt-2">Ahead of schedule by 2.2 days with zero regression bugs.</p>
                  </div>
                  <div className="p-5 sm:p-6 rounded-2xl bg-amber-50/60 border border-amber-200/60">
                    <span className="text-xs font-mono font-bold text-amber-800 uppercase">AI REBALANCING</span>
                    <h3 className="text-xl sm:text-2xl font-black text-amber-700 mt-1">3 Tasks Re-routed</h3>
                    <p className="text-xs text-slate-600 mt-2">Prevented engineer overload by shifting QA testing tickets.</p>
                  </div>
                </div>
              </div>
            )}

            {/* 3. LIST VIEW */}
            {activeTab === "list" && (
              <div className="overflow-x-auto pb-2">
                <div className="min-w-[540px] divide-y divide-slate-100 text-xs">
                  <div className="grid grid-cols-12 pb-3 font-bold uppercase tracking-wider text-slate-400 px-3">
                    <div className="col-span-5">Task Summary</div>
                    <div className="col-span-2">Priority</div>
                    <div className="col-span-3">Owner</div>
                    <div className="col-span-2 text-right">Target</div>
                  </div>
                  {columns.flatMap((c) => c.tasks).map((t) => (
                    <div
                      key={t.id}
                      onClick={() => onOpenAuth("signup")}
                      className="grid grid-cols-12 items-center py-3.5 px-3 rounded-xl hover:bg-cyan-50/40 transition-colors cursor-pointer"
                    >
                      <div className="col-span-5 flex items-center gap-2.5">
                        <span className="font-mono text-slate-400 font-bold">{t.id}</span>
                        <span className="font-bold text-slate-900 hover:text-teal-600">{t.title}</span>
                      </div>
                      <div className="col-span-2 font-semibold text-slate-700">{t.priority}</div>
                      <div className="col-span-3 text-slate-600 font-medium">{t.assignee}</div>
                      <div className="col-span-2 text-right font-mono text-slate-400">{t.time}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. CALENDAR */}
            {activeTab === "calendar" && (
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                {[
                  { day: "Mon", date: "24", event: "Sprint 42 Kickoff", tag: "Team" },
                  { day: "Tue", date: "25", event: "GraphQL Migration Check", tag: "Backend" },
                  { day: "Wed", date: "26", event: "Passkey Security Review", tag: "Security" },
                  { day: "Thu", date: "27", event: "AI Telemetry Benchmark", tag: "AI Engine" },
                  { day: "Fri", date: "28", event: "Aurora Production Release", tag: "Deploy" },
                ].map((item) => (
                  <div key={item.day} className="rounded-2xl border border-slate-200 bg-slate-50/50 p-4 min-h-[180px]">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                      <span className="text-xs font-bold text-slate-400 uppercase font-mono">{item.day}</span>
                      <span className="text-base font-black text-slate-900">{item.date}</span>
                    </div>
                    <div className="mt-3 p-3 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
                      <span className="text-[10px] font-bold text-cyan-600 bg-cyan-50 px-1.5 py-0.5 rounded">
                        {item.tag}
                      </span>
                      <h5 className="text-xs font-bold text-slate-800 mt-1">{item.event}</h5>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 5. VELOCITY ANALYTICS */}
            {activeTab === "analytics" && (
              <div className="p-6 text-center">
                <span className="text-xs font-mono font-bold text-cyan-600 uppercase">VELOCITY THROUGHPUT</span>
                <h3 className="text-4xl font-black text-[#050b1a] mt-2">
                  <span className="gradient-text-aura">+42.6% Points Shipped</span>
                </h3>
                <p className="text-xs text-slate-500 mt-2 max-w-md mx-auto">
                  Team velocity increased from 68 story points to 97 story points following automated AI blocker resolutions.
                </p>
              </div>
            )}
          </div>
        </ScrollReveal>

        {/* Interactive Task Detail Drawer Modal */}
        <AnimatePresence>
          {selectedTask && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedTask(null)}
                className="fixed inset-0 bg-[#050b1a]/60 backdrop-blur-md"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                className="relative z-10 w-full max-w-md rounded-3xl border border-cyan-400/40 bg-white p-6 shadow-2xl"
              >
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <span className="text-xs font-mono font-bold text-slate-400">{selectedTask.id}</span>
                  <span className="text-xs font-bold text-cyan-600 bg-cyan-50 px-2 py-0.5 rounded-full">
                    Stage: {selectedTask.colId.toUpperCase()}
                  </span>
                </div>

                <h3 className="text-lg font-black text-slate-900 mt-4">{selectedTask.title}</h3>
                <p className="text-xs text-slate-500 mt-1">Assignee: {selectedTask.assignee} • Target: {selectedTask.time}</p>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedTask(null)}
                    className="text-xs font-semibold text-slate-500 hover:text-slate-800"
                  >
                    Cancel
                  </button>

                  {selectedTask.colId !== "completed" && (
                    <Button
                      variant="aura"
                      size="sm"
                      onClick={() => handleMoveTaskForward(selectedTask.id, selectedTask.colId)}
                      rightIcon={ChevronRight}
                    >
                      Advance to Next Stage
                    </Button>
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
