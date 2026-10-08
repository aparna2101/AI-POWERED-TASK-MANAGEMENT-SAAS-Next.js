"use client";

import { useState } from "react";
import { X, Plus, Sparkles, CheckCircle2 } from "lucide-react";
import confetti from "canvas-confetti";
import { playClickSound, playSuccessSound } from "@/lib/sound";

export default function NewTaskModal({ isOpen, onClose, onAddTask, projects, team }) {
  const [title, setTitle] = useState("");
  const [project, setProject] = useState(projects[0]?.name || "NextGen Cloud Migration");
  const [priority, setPriority] = useState("High");
  const [assignee, setAssignee] = useState(team[0]?.name || "Alex Morgan");
  const [points, setPoints] = useState(5);
  const [tag, setTag] = useState("Frontend");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    playSuccessSound();

    const selectedMember = team.find((m) => m.name === assignee);
    const newTask = {
      id: `TK-${Math.floor(120 + Math.random() * 880)}`,
      title: title.trim(),
      project,
      assignee,
      avatar: selectedMember?.avatar || "AM",
      tag,
      priority,
      column: "todo",
      points: Number(points),
      dueDate: "Next Sprint",
      comments: 0,
    };

    onAddTask(newTask);
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#00c2ff", "#00e599", "#fbbf24"],
      });
    } catch (err) { }

    setTitle("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050b1a]/70 backdrop-blur-xs">
      <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto scrollbar-thin rounded-3xl bg-[#09152b] border border-cyan-500/30 p-5 sm:p-7 shadow-2xl space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Plus className="w-5 h-5 text-cyan-400 stroke-[3]" />
            Create Sprint Deliverable
          </h3>
          <button
            onClick={() => {
              playClickSound();
              onClose();
            }}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
              Task Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Synthesize WebGL Texture Cache Allocator..."
              required
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                Associated Project
              </label>
              <select
                value={project}
                onChange={(e) => setProject(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400 cursor-pointer"
              >
                {projects.map((p) => (
                  <option key={p.id} value={p.name}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                Assignee
              </label>
              <select
                value={assignee}
                onChange={(e) => setAssignee(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400 cursor-pointer"
              >
                {team.map((m) => (
                  <option key={m.id} value={m.name}>
                    {m.name} ({m.role})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400 cursor-pointer"
              >
                <option value="Urgent">Urgent</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                Points
              </label>
              <select
                value={points}
                onChange={(e) => setPoints(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400 cursor-pointer"
              >
                <option value="1">1 pt</option>
                <option value="2">2 pts</option>
                <option value="3">3 pts</option>
                <option value="5">5 pts</option>
                <option value="8">8 pts</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                Tag
              </label>
              <select
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400 cursor-pointer"
              >
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="Security">Security</option>
                <option value="DevOps">DevOps</option>
                <option value="Distributed">Distributed</option>
              </select>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 text-slate-950 text-xs font-black shadow-md cursor-pointer hover:opacity-95"
            >
              Add to Sprint
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
