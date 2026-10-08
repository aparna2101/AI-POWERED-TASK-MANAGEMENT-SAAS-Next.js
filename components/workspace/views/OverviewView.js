"use client";

import {
  TrendingUp,
  CheckCircle2,
  Clock,
  AlertTriangle,
  FolderGit2,
  Kanban,
  Sparkles,
  ArrowRight,
  Zap,
  Users2,
  Flame,
  Plus,
} from "lucide-react";
import { playClickSound, playHoverSound } from "@/lib/sound";
import TaskGraph3DCanvas from "@/components/3d/TaskGraph3DCanvas";

export default function OverviewView({
  projects,
  tasks,
  team,
  onNavigateTab,
  onOpenNewTaskModal,
  onOpenNewProjectModal,
}) {
  const completedTasksCount = tasks.filter((t) => t.column === "done").length;
  const inProgressCount = tasks.filter(
    (t) => t.column === "inprogress" || t.column === "review"
  ).length;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* 1. Header & Welcome Message */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Workspace Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-time telemetry across 4 projects, sprint velocity, and active AI agents.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => {
              playClickSound();
              onOpenNewProjectModal();
            }}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-slate-700 bg-slate-900/80 hover:bg-slate-800 text-xs font-bold text-slate-200 hover:text-white transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Project</span>
          </button>

          <button
            onClick={() => {
              playClickSound();
              onOpenNewTaskModal();
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 text-slate-950 text-xs font-black hover:opacity-95 shadow-md shadow-cyan-500/20 transition-all cursor-pointer active:scale-95"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Create Task</span>
          </button>
        </div>
      </div>

      {/* 2. Key Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 sm:p-5 rounded-2xl bg-[#09152b] border border-cyan-500/20 shadow-md">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">
              Sprint Velocity
            </span>
            <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white font-mono">
            48 <span className="text-xs font-sans text-emerald-400">↑18% pts</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Ahead of release schedule</p>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-[#09152b] border border-cyan-500/20 shadow-md">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">
              Active Tasks
            </span>
            <div className="p-1.5 rounded-lg bg-teal-500/10 text-teal-400">
              <Kanban className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white font-mono">
            {inProgressCount}{" "}
            <span className="text-xs font-sans text-slate-400">
              / {tasks.length} total
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            {completedTasksCount} completed this sprint
          </p>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-[#09152b] border border-cyan-500/20 shadow-md">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">
              Active Projects
            </span>
            <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
              <FolderGit2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white font-mono">
            {projects.length}{" "}
            <span className="text-xs font-sans text-emerald-400">All Healthy</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">3 on track, 1 at risk</p>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-[#09152b] border border-cyan-500/20 shadow-md">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">
              Team Capacity
            </span>
            <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400">
              <Users2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white font-mono">
            84% <span className="text-xs font-sans text-amber-400">Balanced</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">5 core engineers active</p>
        </div>
      </div>

      {/* 3. Active Sprint Banner */}
      <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-[#071328] via-[#091730] to-[#0a1e3b] border border-cyan-500/30 relative overflow-hidden shadow-xl">
        <div className="absolute right-0 top-0 bottom-0 w-96 bg-gradient-to-l from-cyan-500/10 via-transparent to-transparent pointer-events-none" />

        {/* 3D Sprint Mesh Background */}
        <div className="absolute right-[-20px] top-[-20px] bottom-[-20px] w-96 opacity-45 pointer-events-none hidden lg:block overflow-hidden z-0">
          <TaskGraph3DCanvas />
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/30 text-xs font-bold text-cyan-300">
              <Zap className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400" />
              <span>Sprint 4: Q4 Production Overhaul</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              78% Completed • 6 Days Remaining
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Autonomous AI Sentinel is monitoring 12 active PRs. Zero merge conflicts detected in the last 48 hours. Target cutover deadline: Oct 24, 2026.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={() => {
                playClickSound();
                onNavigateTab("kanban");
              }}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <span>View Sprint Kanban</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => {
                playClickSound();
                onNavigateTab("ai-generator");
              }}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-cyan-500/30 bg-slate-900/60 hover:bg-slate-800 text-xs font-bold text-cyan-300 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Task Generator</span>
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-6 w-full h-2 rounded-full bg-slate-800/80 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400"
            style={{ width: "78%" }}
          />
        </div>
      </div>

      {/* 4. Active Projects & Recent Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Projects Preview (2 Columns) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <FolderGit2 className="w-4 h-4 text-cyan-400" />
              Active Projects
            </h3>
            <button
              onClick={() => {
                playClickSound();
                onNavigateTab("projects");
              }}
              className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
            >
              View All ({projects.length})
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {projects.slice(0, 4).map((p) => (
              <div
                key={p.id}
                onClick={() => {
                  playClickSound();
                  onNavigateTab("projects");
                }}
                onMouseEnter={playHoverSound}
                className="p-4 sm:p-5 rounded-2xl bg-[#09152b] border border-cyan-500/20 hover:border-cyan-400/50 hover:bg-[#0c1a35] transition-all cursor-pointer shadow-md group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono font-bold text-cyan-400 px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/40">
                    {p.id}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${p.status === "On Track"
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                        : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                      }`}
                  >
                    {p.status}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {p.name}
                </h4>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                  {p.description}
                </p>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="text-slate-400">
                    {p.tasksCompleted}/{p.tasksTotal} tasks
                  </span>
                  <span className="font-mono font-bold text-cyan-300">
                    {p.progress}%
                  </span>
                </div>
                <div className="mt-1.5 w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-400 to-teal-400 rounded-full"
                    style={{ width: `${p.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent High Priority Tasks (1 Column) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <Kanban className="w-4 h-4 text-emerald-400" />
              Priority In-Flight
            </h3>
            <button
              onClick={() => {
                playClickSound();
                onNavigateTab("kanban");
              }}
              className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
            >
              Kanban
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {tasks.slice(0, 4).map((task) => (
              <div
                key={task.id}
                onClick={() => {
                  playClickSound();
                  onNavigateTab("kanban");
                }}
                className="p-3.5 rounded-2xl bg-[#09152b] border border-cyan-500/20 hover:border-cyan-400/40 transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between text-[11px] mb-1">
                  <span className="font-mono text-cyan-400 font-bold">
                    {task.id}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${task.priority === "Urgent"
                        ? "bg-rose-500/20 text-rose-300"
                        : "bg-amber-500/20 text-amber-300"
                      }`}
                  >
                    {task.priority}
                  </span>
                </div>
                <p className="text-xs font-bold text-slate-200 line-clamp-1">
                  {task.title}
                </p>
                <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400">
                  <span>{task.assignee}</span>
                  <span className="text-cyan-300 font-semibold">{task.points} pts</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
