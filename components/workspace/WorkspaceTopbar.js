"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  Bell,
  Sparkles,
  Bot,
  LogOut,
  Settings,
  User,
  Shield,
  Check,
  CheckCheck,
  Menu,
  ExternalLink,
  Zap,
} from "lucide-react";
import { playClickSound, playHoverSound, playSuccessSound } from "@/lib/sound";

export default function WorkspaceTopbar({
  onToggleMobileSidebar,
  onOpenCopilot,
  onOpenAiGenerator,
  notifications,
  onMarkNotificationsRead,
  user = { name: "Alex Morgan", email: "alex.morgan@taskaura.dev", role: "Lead Architect" },
}) {
  const router = useRouter();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const notifRef = useRef(null);
  const profileRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const unreadCount = notifications.filter((n) => n.unread).length;

  const handleLogout = () => {
    playClickSound();
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-20 h-16 bg-[#050b1a]/95 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-6 flex items-center justify-between gap-4">
      {/* 1. Mobile Toggle & Search */}
      <div className="flex items-center gap-3 flex-1 max-w-lg">
        <button
          onClick={() => {
            playClickSound();
            onToggleMobileSidebar();
          }}
          className="md:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors cursor-pointer"
          aria-label="Open sidebar menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Global Search Input */}
        <div className="relative w-full max-w-md hidden sm:block">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tasks, sprints, commits (Press / or ⌘K)"
            className="w-full pl-10 pr-12 py-2 rounded-xl bg-slate-900/80 border border-slate-800 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/40 transition-all"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono font-semibold text-slate-500 bg-slate-800/80 px-1.5 py-0.5 rounded border border-slate-700/60">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* 2. Quick Actions & Status */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        {/* Quick AI Task Gen CTA Button */}
        <button
          onClick={() => {
            playClickSound();
            onOpenAiGenerator();
          }}
          onMouseEnter={playHoverSound}
          className="hidden lg:flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-500/20 via-teal-500/20 to-emerald-500/20 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/30 transition-all cursor-pointer shadow-xs active:scale-95"
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin-slow" />
          <span>Generate with AI</span>
        </button>

        {/* AI Copilot Slide-Over Trigger */}
        <button
          onClick={() => {
            playClickSound();
            onOpenCopilot();
          }}
          onMouseEnter={playHoverSound}
          className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold bg-slate-900 border border-slate-800 text-slate-200 hover:text-white hover:border-cyan-500/50 hover:bg-slate-850 transition-all cursor-pointer"
        >
          <Bot className="w-4 h-4 text-cyan-400" />
          <span className="hidden sm:inline">AI Copilot</span>
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
        </button>

        {/* Notifications Dropdown */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => {
              playClickSound();
              setShowNotifications(!showNotifications);
            }}
            className="relative p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors cursor-pointer"
            aria-label="View notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-cyan-500 text-[10px] font-black text-slate-950">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Flyout */}
          {showNotifications && (
            <div className="fixed sm:absolute top-16 sm:top-full left-3 right-3 sm:left-auto sm:right-0 mt-2 sm:w-96 max-w-sm sm:max-w-none mx-auto sm:mx-0 rounded-2xl bg-[#09152b] border border-cyan-500/30 shadow-2xl z-50 p-4 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-white">Notifications</h4>
                  {unreadCount > 0 && (
                    <span className="text-[10px] bg-cyan-500/20 text-cyan-300 font-bold px-2 py-0.5 rounded-full">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={() => {
                      playSuccessSound();
                      onMarkNotificationsRead();
                    }}
                    className="text-[11px] text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <CheckCheck className="w-3.5 h-3.5" />
                    Mark all read
                  </button>
                )}
              </div>

              <div className="mt-3 space-y-2.5 max-h-72 overflow-y-auto pr-1 scrollbar-thin">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`p-3 rounded-xl border text-xs transition-colors ${n.unread
                        ? "bg-cyan-950/30 border-cyan-500/30 text-slate-200"
                        : "bg-slate-900/40 border-slate-800 text-slate-400"
                      }`}
                  >
                    <p className="font-medium leading-relaxed">{n.title}</p>
                    <span className="text-[10px] text-slate-500 mt-1 block">
                      {n.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => {
              playClickSound();
              setShowProfileMenu(!showProfileMenu);
            }}
            className="flex items-center gap-2.5 p-1 rounded-xl hover:bg-slate-800/60 transition-colors cursor-pointer"
          >
            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-cyan-500 via-teal-400 to-emerald-400 flex items-center justify-center text-xs font-black text-slate-950 shadow-md">
              AM
            </div>
            <div className="hidden md:flex flex-col text-left">
              <span className="text-xs font-bold text-slate-200 leading-tight">
                {user.name}
              </span>
              <span className="text-[10px] text-cyan-400 font-medium">
                {user.role}
              </span>
            </div>
          </button>

          {/* User Menu Flyout */}
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-[#09152b] border border-cyan-500/30 shadow-2xl z-50 p-2 animate-in fade-in zoom-in-95 duration-150">
              <div className="p-2.5 border-b border-slate-800">
                <p className="text-xs font-bold text-white">{user.name}</p>
                <p className="text-[10px] text-slate-400 truncate">{user.email}</p>
                <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                  <Shield className="w-3 h-3 text-emerald-400" />
                  Enterprise Pro Tier
                </div>
              </div>

              <div className="py-1">
                <Link
                  href="/"
                  onClick={playClickSound}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Public Landing Page</span>
                </Link>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-colors cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out of TaskAura</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
