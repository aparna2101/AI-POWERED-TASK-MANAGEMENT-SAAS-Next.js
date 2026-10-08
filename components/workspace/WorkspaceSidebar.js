"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  FolderGit2,
  Kanban,
  Sparkles,
  CalendarDays,
  Users2,
  BarChart3,
  Settings,
  ChevronRight,
  ChevronLeft,
  ExternalLink,
  Zap,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import TaskAuraLogo from "@/components/ui/TaskAuraLogo";
import { playClickSound, playHoverSound } from "@/lib/sound";

export default function WorkspaceSidebar({
  activeTab,
  setActiveTab,
  sidebarCollapsed,
  setSidebarCollapsed,
  tasksCount,
  projectsCount,
  isMobile = false,
}) {
  const navItems = [
    {
      id: "overview",
      label: "Overview",
      icon: LayoutDashboard,
      badge: null,
    },
    {
      id: "projects",
      label: "Projects",
      icon: FolderGit2,
      badge: projectsCount || 4,
    },
    {
      id: "kanban",
      label: "Tasks & Kanban",
      icon: Kanban,
      badge: tasksCount || 10,
    },
    {
      id: "ai-generator",
      label: "AI Task Gen",
      icon: Sparkles,
      badge: "AI",
      badgeColor: "bg-gradient-to-r from-cyan-500 to-emerald-400 text-slate-950 font-black",
    },
    {
      id: "calendar",
      label: "Calendar",
      icon: CalendarDays,
      badge: "5",
    },
    {
      id: "team",
      label: "Team & Roles",
      icon: Users2,
      badge: "5",
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: BarChart3,
      badge: null,
    },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
      badge: null,
    },
  ];

  return (
    <aside
      className={`fixed top-0 bottom-0 left-0 bg-[#050b1a] border-r border-slate-800/80 transition-all duration-300 ${
        isMobile
          ? "flex z-50 w-64 flex-col"
          : sidebarCollapsed
          ? "w-20 hidden md:flex flex-col z-30"
          : "w-64 hidden md:flex flex-col z-30"
      }`}
    >
      {/* 1. Header & Workspace Identity */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800/80">
        <Link
          href="/"
          onClick={playClickSound}
          className="flex items-center gap-3 overflow-hidden cursor-pointer"
        >
          <div className="shrink-0">
            <TaskAuraLogo size="sm" isDark={true} showAiBadge={false} />
          </div>
          {!sidebarCollapsed && (
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-black tracking-tight text-white truncate">
                TaskAura
              </span>
              <span className="text-[10px] font-semibold text-cyan-400 uppercase tracking-wider flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Acme Corp (Pro)
              </span>
            </div>
          )}
        </Link>

        {/* Toggle Collapse on Desktop */}
        <button
          onClick={() => {
            playClickSound();
            setSidebarCollapsed(!sidebarCollapsed);
          }}
          className="hidden md:flex items-center justify-center h-7 w-7 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors cursor-pointer"
          title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {sidebarCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* 2. Primary Navigation Links */}
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1.5 scrollbar-thin">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => {
                playClickSound();
                setActiveTab(item.id);
              }}
              onMouseEnter={playHoverSound}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                isActive
                  ? "bg-gradient-to-r from-cyan-500/20 to-teal-500/10 text-cyan-300 border border-cyan-500/30 shadow-sm"
                  : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/50 border border-transparent"
              } ${sidebarCollapsed ? "justify-center px-0" : ""}`}
              title={sidebarCollapsed ? item.label : undefined}
            >
              <Icon
                className={`w-4 h-4 shrink-0 transition-colors ${
                  isActive ? "text-cyan-400" : "text-slate-400"
                }`}
              />
              {!sidebarCollapsed && (
                <>
                  <span className="truncate flex-1 text-left">{item.label}</span>
                  {item.badge && (
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        item.badgeColor ||
                        (isActive
                          ? "bg-cyan-500/30 text-cyan-200"
                          : "bg-slate-800 text-slate-400")
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </button>
          );
        })}
      </div>

      {/* 3. Sprint Health Indicator (Expanded mode only) */}
      {!sidebarCollapsed && (
        <div className="p-4 mx-3 mb-3 rounded-2xl bg-[#09152b] border border-cyan-500/20">
          <div className="flex items-center justify-between text-xs font-bold text-slate-200 mb-1.5">
            <span className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              Sprint 4 Status
            </span>
            <span className="text-emerald-400 font-mono">78% Done</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 transition-all duration-500"
              style={{ width: "78%" }}
            />
          </div>
          <p className="mt-2 text-[10px] text-slate-400 flex items-center justify-between">
            <span>6 days remaining</span>
            <span className="text-slate-300 font-semibold">27/34 Tasks</span>
          </p>
        </div>
      )}

      {/* 4. Bottom Footer Link to Public Website */}
      <div className="p-3 border-t border-slate-800/80">
        <Link
          href="/"
          onClick={playClickSound}
          className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-cyan-300 hover:bg-slate-800/50 transition-colors cursor-pointer ${
            sidebarCollapsed ? "justify-center px-0" : ""
          }`}
          title="Back to Public Website"
        >
          <ExternalLink className="w-4 h-4 shrink-0" />
          {!sidebarCollapsed && <span>Public Landing Page</span>}
        </Link>
      </div>
    </aside>
  );
}
