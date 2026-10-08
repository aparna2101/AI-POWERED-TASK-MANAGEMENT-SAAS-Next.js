"use client";

import { useState } from "react";
import {
  FolderGit2,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Users2,
  Calendar,
} from "lucide-react";
import { playClickSound, playHoverSound } from "@/lib/sound";

export default function ProjectsView({
  projects,
  onOpenNewProjectModal,
  onNavigateTab,
}) {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filteredProjects = projects.filter((p) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "ontrack" && p.status === "On Track") ||
      (filter === "atrisk" && p.status === "At Risk");
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* 1. Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-3">
            <FolderGit2 className="w-7 h-7 text-cyan-400" />
            Projects Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Organize roadmaps, assign squad leads, and monitor multi-cluster deliverables.
          </p>
        </div>

        <button
          onClick={() => {
            playClickSound();
            onOpenNewProjectModal();
          }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 text-slate-950 text-xs font-black hover:opacity-95 shadow-md shadow-cyan-500/20 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>New Project</span>
        </button>
      </div>

      {/* 2. Controls & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3.5 rounded-2xl bg-[#09152b] border border-cyan-500/20">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects..."
            className="w-full pl-9 pr-4 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto">
          {[
            { id: "all", label: "All Projects" },
            { id: "ontrack", label: "On Track" },
            { id: "atrisk", label: "At Risk" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                playClickSound();
                setFilter(tab.id);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${filter === tab.id
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredProjects.map((p) => (
          <div
            key={p.id}
            onMouseEnter={playHoverSound}
            className="p-5 sm:p-6 rounded-3xl bg-[#09152b] border border-cyan-500/20 hover:border-cyan-400/50 hover:bg-[#0c1a35] transition-all shadow-xl flex flex-col justify-between group"
          >
            <div>
              {/* Card Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-cyan-400 px-2.5 py-0.5 rounded-lg bg-cyan-950/80 border border-cyan-800/40">
                    {p.id}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-400 px-2.5 py-0.5 rounded-lg bg-slate-800/80">
                    {p.category}
                  </span>
                </div>
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full ${p.status === "On Track"
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                      : "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                    }`}
                >
                  {p.status}
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                {p.name}
              </h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                {p.description}
              </p>

              {/* Metadata row */}
              <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-800/80 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                    Squad Lead
                  </span>
                  <span className="font-semibold text-slate-200 mt-0.5 block">
                    {p.lead}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                    Target Date
                  </span>
                  <span className="font-semibold text-slate-200 mt-0.5 block">
                    {p.dueDate}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                    Tasks
                  </span>
                  <span className="font-semibold text-cyan-300 mt-0.5 block">
                    {p.tasksCompleted}/{p.tasksTotal} Done
                  </span>
                </div>
              </div>
            </div>

            {/* Progress Bar & Actions */}
            <div className="mt-5 pt-4 border-t border-slate-800/80">
              <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
                <span className="text-slate-400">Completion</span>
                <span className="text-cyan-400 font-mono font-bold">
                  {p.progress}%
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 rounded-full"
                  style={{ width: `${p.progress}%` }}
                />
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-mono">
                  Budget: {p.budget}
                </span>
                <button
                  onClick={() => {
                    playClickSound();
                    onNavigateTab("kanban");
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer"
                >
                  <span>Open Sprints</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
