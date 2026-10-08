"use client";

import { useState } from "react";
import {
  Users2,
  UserPlus,
  Mail,
  Shield,
  Activity,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
} from "lucide-react";
import { playClickSound, playSuccessSound, playHoverSound } from "@/lib/sound";

export default function TeamView({ team, onInviteMember }) {
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("Software Engineer");

  const handleSendInvite = (e) => {
    e.preventDefault();
    if (!inviteEmail) return;
    playSuccessSound();
    onInviteMember({ email: inviteEmail, role: inviteRole });
    setInviteEmail("");
    setInviteModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-3">
            <Users2 className="w-7 h-7 text-cyan-400" />
            Team Collaboration & Roles
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Manage squad allocations, prevent developer burnout, and monitor real-time availability.
          </p>
        </div>

        <button
          onClick={() => {
            playClickSound();
            setInviteModalOpen(true);
          }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 text-slate-950 text-xs font-black hover:opacity-95 shadow-md shadow-cyan-500/20 transition-all cursor-pointer"
        >
          <UserPlus className="w-4 h-4" />
          <span>Invite Member</span>
        </button>
      </div>

      {/* 2. Team Directory Table/Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {team.map((m) => (
          <div
            key={m.id}
            onMouseEnter={playHoverSound}
            className="p-5 sm:p-6 rounded-3xl bg-[#09152b] border border-cyan-500/20 hover:border-cyan-400/50 hover:bg-[#0c1a35] transition-all shadow-xl space-y-4"
          >
            {/* Top row: Avatar & Status */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-cyan-500 via-teal-400 to-emerald-400 flex items-center justify-center text-sm font-black text-slate-950 shadow-md">
                  {m.avatar}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">{m.name}</h3>
                  <p className="text-xs text-cyan-400 font-medium">{m.role}</p>
                </div>
              </div>

              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${m.status === "Active"
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                    : "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                  }`}
              >
                {m.status}
              </span>
            </div>

            {/* Email */}
            <div className="text-xs text-slate-400 flex items-center gap-1.5 truncate">
              <Mail className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              <span className="truncate">{m.email}</span>
            </div>

            {/* Workload Indicator */}
            <div className="pt-2 border-t border-slate-800 space-y-1.5">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-400">Sprint Workload</span>
                <span
                  className={`font-mono font-bold ${m.workload > 85
                      ? "text-rose-400"
                      : m.workload > 70
                        ? "text-amber-400"
                        : "text-emerald-400"
                    }`}
                >
                  {m.workload}% Capacity
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${m.workload > 85
                      ? "bg-gradient-to-r from-amber-400 to-rose-500"
                      : "bg-gradient-to-r from-cyan-400 to-emerald-400"
                    }`}
                  style={{ width: `${m.workload}%` }}
                />
              </div>
            </div>

            {/* Deliverables ratio */}
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>{m.activeTasks} Active Tasks</span>
              <span className="text-slate-300 font-semibold">
                {m.completedTasks} Completed Sprints
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Invite Member Modal */}
      {inviteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050b1a]/70 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-3xl bg-[#09152b] border border-cyan-500/30 p-6 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-cyan-400" />
              Invite Team Member to Workspace
            </h3>

            <form onSubmit={handleSendInvite} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Corporate Email
                </label>
                <input
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="developer@company.com"
                  required
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Role & Permissions
                </label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-400 cursor-pointer"
                >
                  <option value="Senior Software Engineer">Senior Software Engineer</option>
                  <option value="Product Designer">Product Designer</option>
                  <option value="QA Systems Specialist">QA Systems Specialist</option>
                  <option value="Engineering Manager">Engineering Manager</option>
                </select>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setInviteModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-black transition-all cursor-pointer shadow-md"
                >
                  Send Invitation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
