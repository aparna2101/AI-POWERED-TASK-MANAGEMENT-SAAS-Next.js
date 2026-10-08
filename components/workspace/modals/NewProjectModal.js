"use client";

import { useState } from "react";
import { X, FolderPlus, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";
import { playClickSound, playSuccessSound } from "@/lib/sound";

export default function NewProjectModal({ isOpen, onClose, onAddProject, team }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("AI & ML");
  const [description, setDescription] = useState("");
  const [lead, setLead] = useState(team[0]?.name || "Alex Morgan");
  const [dueDate, setDueDate] = useState("Nov 30, 2026");
  const [budget, setBudget] = useState("$35,000");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    playSuccessSound();

    const selectedMember = team.find((m) => m.name === lead);
    const newProject = {
      id: `PRJ-${Math.floor(10 + Math.random() * 89)}`,
      name: name.trim(),
      category,
      description: description.trim() || "Autonomous engineering initiative managed with TaskAura AI.",
      progress: 0,
      status: "On Track",
      lead,
      leadAvatar: selectedMember?.avatar || "AM",
      teamCount: 4,
      dueDate,
      tasksTotal: 12,
      tasksCompleted: 0,
      budget,
    };

    onAddProject(newProject);
    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#00c2ff", "#00e599", "#fbbf24"],
      });
    } catch (err) { }

    setName("");
    setDescription("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050b1a]/70 backdrop-blur-xs">
      <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto scrollbar-thin rounded-3xl bg-[#09152b] border border-cyan-500/30 p-5 sm:p-7 shadow-2xl space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <FolderPlus className="w-5 h-5 text-cyan-400" />
            Initialize Engineering Project
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
              Project Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Distributed Vector Store Sharding..."
              required
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
              Description & Objectives
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief summary of deliverables and technical scope..."
              className="w-full px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400 cursor-pointer"
              >
                <option value="Infrastructure">Infrastructure</option>
                <option value="Fintech">Fintech</option>
                <option value="AI & ML">AI & ML</option>
                <option value="Mobile">Mobile</option>
                <option value="Security">Security</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                Squad Lead
              </label>
              <select
                value={lead}
                onChange={(e) => setLead(e.target.value)}
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

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                Target Date
              </label>
              <input
                type="text"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                Allocated Budget
              </label>
              <input
                type="text"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
              />
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
              Create Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
