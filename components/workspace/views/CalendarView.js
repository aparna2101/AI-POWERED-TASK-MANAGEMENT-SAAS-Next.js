"use client";

import { useState } from "react";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock,
  Sparkles,
  Zap,
  Flag,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { CALENDAR_EVENTS } from "@/lib/workspaceData";
import { playClickSound, playHoverSound } from "@/lib/sound";

export default function CalendarView() {
  const [currentMonth, setCurrentMonth] = useState("October 2026");
  const [selectedDay, setSelectedDay] = useState(12);

  // October 2026 calendar days setup (31 days, starts on Thursday)
  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-3">
            <CalendarDays className="w-7 h-7 text-cyan-400" />
            Calendar & Deadlines
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Track multi-sprint cutovers, feature freezes, and architecture retrospectives.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#09152b] border border-cyan-500/20 text-xs font-bold text-white">
            <button
              onClick={playClickSound}
              className="p-1 hover:text-cyan-400 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-mono">{currentMonth}</span>
            <button
              onClick={playClickSound}
              className="p-1 hover:text-cyan-400 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Interactive Month Grid (2 Cols) */}
        <div className="lg:col-span-2 p-5 sm:p-6 rounded-3xl bg-[#09152b] border border-cyan-500/20 shadow-xl">
          {/* Day of week headers */}
          <div className="grid grid-cols-7 gap-2 mb-3 text-center text-xs font-bold text-slate-400 uppercase tracking-wider">
            <span>Sun</span>
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
          </div>

          {/* Calendar Day Tiles */}
          <div className="grid grid-cols-7 gap-2">
            {/* Blank offset for Thu start (4 blank days) */}
            <div className="h-20 sm:h-24 p-2 rounded-2xl bg-slate-900/30 opacity-20" />
            <div className="h-20 sm:h-24 p-2 rounded-2xl bg-slate-900/30 opacity-20" />
            <div className="h-20 sm:h-24 p-2 rounded-2xl bg-slate-900/30 opacity-20" />
            <div className="h-20 sm:h-24 p-2 rounded-2xl bg-slate-900/30 opacity-20" />

            {daysInMonth.map((day) => {
              const events = CALENDAR_EVENTS.filter((e) => e.day === day);
              const isSelected = selectedDay === day;

              return (
                <div
                  key={day}
                  onClick={() => {
                    playClickSound();
                    setSelectedDay(day);
                  }}
                  onMouseEnter={playHoverSound}
                  className={`h-20 sm:h-24 p-2 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${isSelected
                      ? "bg-cyan-950/60 border-cyan-400 shadow-md shadow-cyan-500/20"
                      : "bg-[#071328] border-slate-800/80 hover:border-cyan-500/40 hover:bg-[#0c1a35]"
                    }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs font-bold font-mono ${day === 8
                          ? "h-5 w-5 rounded-full bg-cyan-400 text-slate-950 flex items-center justify-center font-black"
                          : isSelected
                            ? "text-cyan-300"
                            : "text-slate-300"
                        }`}
                    >
                      {day}
                    </span>
                    {day === 8 && (
                      <span className="text-[9px] font-bold text-cyan-400 hidden sm:inline">
                        Today
                      </span>
                    )}
                  </div>

                  {/* Day Events preview pill */}
                  <div className="space-y-1">
                    {events.map((ev) => (
                      <div
                        key={ev.id}
                        className={`text-[9px] font-bold px-1.5 py-0.5 rounded truncate ${ev.type === "deadline"
                            ? "bg-rose-500/20 text-rose-300"
                            : ev.type === "deploy"
                              ? "bg-cyan-500/20 text-cyan-300"
                              : "bg-emerald-500/20 text-emerald-300"
                          }`}
                        title={ev.title}
                      >
                        {ev.title}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Deadlines Agenda Feed */}
        <div className="space-y-4">
          <div className="p-5 sm:p-6 rounded-3xl bg-[#09152b] border border-cyan-500/20 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-cyan-400" />
              Upcoming Sprint Milestones
            </h3>

            <div className="space-y-3">
              {CALENDAR_EVENTS.map((ev) => (
                <div
                  key={ev.id}
                  className={`p-3.5 rounded-2xl border text-xs transition-all ${selectedDay === ev.day
                      ? "bg-cyan-950/50 border-cyan-400 text-white"
                      : "bg-[#08152c] border-slate-800 text-slate-300"
                    }`}
                >
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <span className="font-mono font-bold text-cyan-400">
                      Oct {ev.day}, 2026 • {ev.time}
                    </span>
                    <span
                      className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase ${ev.type === "deadline"
                          ? "bg-rose-500/20 text-rose-300"
                          : ev.type === "deploy"
                            ? "bg-cyan-500/20 text-cyan-300"
                            : "bg-emerald-500/20 text-emerald-300"
                        }`}
                    >
                      {ev.type}
                    </span>
                  </div>
                  <p className="font-bold text-slate-100">{ev.title}</p>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Synced with Google Calendar & GitHub Milestones</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
