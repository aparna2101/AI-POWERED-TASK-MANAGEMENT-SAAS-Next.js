"use client";

import { useState } from "react";
import {
  Kanban,
  Plus,
  Search,
  Filter,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Clock,
  Sparkles,
  MessageSquare,
  AlertCircle,
} from "lucide-react";
import confetti from "canvas-confetti";
import { playClickSound, playSuccessSound, playHoverSound } from "@/lib/sound";

export default function KanbanView({
  tasks,
  onMoveTask,
  onOpenNewTaskModal,
}) {
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [search, setSearch] = useState("");

  const columns = [
    { id: "backlog", title: "Backlog", dot: "bg-slate-400" },
    { id: "todo", title: "To Do", dot: "bg-indigo-400" },
    { id: "inprogress", title: "In Progress", dot: "bg-cyan-400" },
    { id: "review", title: "In Review", dot: "bg-amber-400" },
    { id: "done", title: "Completed", dot: "bg-emerald-400" },
  ];

  const columnOrder = ["backlog", "todo", "inprogress", "review", "done"];

  const handleShiftTask = (taskId, direction) => {
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;

    const currentIndex = columnOrder.indexOf(task.column);
    const newIndex = direction === "next" ? currentIndex + 1 : currentIndex - 1;

    if (newIndex >= 0 && newIndex < columnOrder.length) {
      const nextCol = columnOrder[newIndex];
      onMoveTask(taskId, nextCol);

      if (nextCol === "done") {
        playSuccessSound();
        try {
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.7 },
            colors: ["#00c2ff", "#00e599", "#fbbf24"],
          });
        } catch (err) { }
      } else {
        playClickSound();
      }
    }
  };

  const filteredTasks = tasks.filter((t) => {
    const matchesPriority =
      priorityFilter === "all" ||
      t.priority.toLowerCase() === priorityFilter.toLowerCase();
    const matchesSearch =
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.id.toLowerCase().includes(search.toLowerCase()) ||
      t.assignee.toLowerCase().includes(search.toLowerCase());
    return matchesPriority && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* 1. Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-3">
            <Kanban className="w-7 h-7 text-cyan-400" />
            Sprint Kanban Board
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Drag, shift, and monitor sprint deliverables with real-time state synchronization.
          </p>
        </div>

        <button
          onClick={() => {
            playClickSound();
            onOpenNewTaskModal();
          }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 text-slate-950 text-xs font-black hover:opacity-95 shadow-md shadow-cyan-500/20 transition-all cursor-pointer active:scale-95"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Add Task</span>
        </button>
      </div>

      {/* 2. Search & Priority Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3.5 rounded-2xl bg-[#09152b] border border-cyan-500/20">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search task title, ID or assignee..."
            className="w-full pl-9 pr-4 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto">
          {[
            { id: "all", label: "All Priority" },
            { id: "urgent", label: "Urgent" },
            { id: "high", label: "High" },
            { id: "medium", label: "Medium" },
          ].map((btn) => (
            <button
              key={btn.id}
              onClick={() => {
                playClickSound();
                setPriorityFilter(btn.id);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${priorityFilter === btn.id
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
                }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Five-Column Kanban Board */}
      <div className="flex overflow-x-auto pb-6 gap-4 xl:grid xl:grid-cols-5 scrollbar-thin">
        {columns.map((col, colIdx) => {
          const colTasks = filteredTasks.filter((t) => t.column === col.id);

          return (
            <div
              key={col.id}
              className="flex flex-col rounded-3xl bg-[#071328]/80 border border-slate-800/80 p-3 min-w-[270px] sm:min-w-[290px] xl:min-w-0 shrink-0 xl:shrink h-[720px]"
            >
              {/* Column Header */}
              <div className="flex items-center justify-between px-3 py-2.5 mb-2 border-b border-slate-800/80">
                <div className="flex items-center gap-2">
                  <span className={`h-2.5 w-2.5 rounded-full ${col.dot}`} />
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    {col.title}
                  </span>
                </div>
                <span className="text-xs font-mono font-bold text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded-full">
                  {colTasks.length}
                </span>
              </div>

              {/* Tasks List */}
              <div className="flex-1 overflow-y-auto space-y-3 pr-1 scrollbar-thin">
                {colTasks.length === 0 ? (
                  <div className="h-32 flex items-center justify-center border-2 border-dashed border-slate-800/60 rounded-2xl text-[11px] text-slate-500 font-medium">
                    No tasks in {col.title}
                  </div>
                ) : (
                  colTasks.map((t) => (
                    <div
                      key={t.id}
                      onMouseEnter={playHoverSound}
                      className="p-3.5 rounded-2xl bg-[#091730] border border-cyan-500/20 hover:border-cyan-400/50 hover:bg-[#0c1f40] transition-all shadow-md group"
                    >
                      {/* Top Badges */}
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono font-bold text-cyan-400">
                          {t.id}
                        </span>
                        <span
                          className={`text-[9px] font-bold px-2 py-0.5 rounded-md ${t.priority === "Urgent"
                              ? "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                              : t.priority === "High"
                                ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                                : "bg-slate-700/40 text-slate-300 border border-slate-700"
                            }`}
                        >
                          {t.priority}
                        </span>
                      </div>

                      {/* Title */}
                      <h4 className="text-xs font-bold text-slate-200 group-hover:text-cyan-200 transition-colors leading-relaxed line-clamp-2">
                        {t.title}
                      </h4>

                      {/* Tag & Points */}
                      <div className="mt-2.5 flex items-center justify-between text-[10px]">
                        <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-semibold">
                          {t.tag}
                        </span>
                        <span className="font-mono text-cyan-400 font-bold">
                          {t.points} pts
                        </span>
                      </div>

                      {/* Assignee & Controls */}
                      <div className="mt-3 pt-2.5 border-t border-slate-800 flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <div className="h-5 w-5 rounded-full bg-gradient-to-tr from-cyan-500 to-emerald-400 flex items-center justify-center text-[9px] font-black text-slate-950">
                            {t.avatar}
                          </div>
                          <span className="text-[10px] text-slate-400 truncate max-w-[80px]">
                            {t.assignee}
                          </span>
                        </div>

                        {/* Interactive Move Buttons */}
                        <div className="flex items-center gap-1">
                          {colIdx > 0 && (
                            <button
                              onClick={() => handleShiftTask(t.id, "prev")}
                              className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
                              title="Move back"
                            >
                              <ArrowLeft className="w-3 h-3" />
                            </button>
                          )}
                          {colIdx < columns.length - 1 && (
                            <button
                              onClick={() => handleShiftTask(t.id, "next")}
                              className="p-1 rounded-lg bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-slate-400 transition-colors cursor-pointer"
                              title="Move forward"
                            >
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
