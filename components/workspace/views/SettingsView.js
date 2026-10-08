"use client";

import { useState } from "react";
import {
  Settings,
  Key,
  Shield,
  Bell,
  Eye,
  EyeOff,
  Copy,
  Check,
  Save,
  Sparkles,
} from "lucide-react";
import { playClickSound, playSuccessSound } from "@/lib/sound";

export default function SettingsView() {
  const [workspaceName, setWorkspaceName] = useState("Acme Cloud Corp");
  const [workspaceSlug, setWorkspaceSlug] = useState("acme-cloud");
  const [showApiKey, setShowApiKey] = useState(false);
  const [copiedKey, setCopiedKey] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const apiKey = "tk_live_9f830a7b42c19e5d20478129";

  const handleCopy = () => {
    playSuccessSound();
    navigator.clipboard.writeText(apiKey);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const handleSave = (e) => {
    e.preventDefault();
    playSuccessSound();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200 max-w-4xl">
      {/* 1. Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-3">
          <Settings className="w-7 h-7 text-cyan-400" />
          Workspace Settings & API Keys
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Configure security tokens, telemetry gates, and autonomous Copilot parameters.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Workspace Identity Box */}
        <div className="p-5 sm:p-6 rounded-3xl bg-[#09152b] border border-cyan-500/20 shadow-xl space-y-4">
          <h3 className="text-base font-bold text-white">General Information</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                Workspace Display Name
              </label>
              <input
                type="text"
                value={workspaceName}
                onChange={(e) => setWorkspaceName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                Subdomain Slug
              </label>
              <div className="flex items-center">
                <span className="px-3 py-2.5 bg-slate-800 border border-r-0 border-slate-700 rounded-l-xl text-xs text-slate-400 font-mono">
                  app.taskaura.dev/
                </span>
                <input
                  type="text"
                  value={workspaceSlug}
                  onChange={(e) => setWorkspaceSlug(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-r-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-400 font-mono"
                />
              </div>
            </div>
          </div>
        </div>

        {/* API Keys & CLI Auth */}
        <div className="p-5 sm:p-6 rounded-3xl bg-[#09152b] border border-cyan-500/20 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Key className="w-4 h-4 text-cyan-400" />
                TaskAura CLI & SDK Token
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Authenticate the `agy` / `taskaura` command line binary in CI/CD runners.
              </p>
            </div>
            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
              Active Token
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex-1 relative">
              <input
                type={showApiKey ? "text" : "password"}
                readOnly
                value={apiKey}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 font-mono text-xs text-cyan-300 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowApiKey(!showApiKey)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white cursor-pointer"
              >
                {showApiKey ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>

            <button
              type="button"
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-bold text-white transition-colors cursor-pointer"
            >
              {copiedKey ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copiedKey ? "Copied" : "Copy"}</span>
            </button>
          </div>
        </div>

        {/* AI Copilot Automation Flags */}
        <div className="p-5 sm:p-6 rounded-3xl bg-[#09152b] border border-cyan-500/20 shadow-xl space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            Autonomous AI Engine Preferences
          </h3>

          <div className="space-y-3">
            <label className="flex items-center justify-between p-3 rounded-2xl bg-slate-900/60 border border-slate-800 cursor-pointer">
              <div>
                <span className="text-xs font-bold text-white block">
                  Automatic PR Blocker Notifications
                </span>
                <span className="text-[11px] text-slate-400">
                  Notify squad lead when PR review latency exceeds 24 hours.
                </span>
              </div>
              <input
                type="checkbox"
                defaultChecked
                className="h-4 w-4 rounded text-cyan-500 focus:ring-cyan-400"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-2xl bg-slate-900/60 border border-slate-800 cursor-pointer">
              <div>
                <span className="text-xs font-bold text-white block">
                  Zero-Retention Privacy Enclave
                </span>
                <span className="text-[11px] text-slate-400">
                  Guarantee client source code is never cached or used in public LLM training.
                </span>
              </div>
              <input
                type="checkbox"
                defaultChecked
                className="h-4 w-4 rounded text-cyan-500 focus:ring-cyan-400"
              />
            </label>
          </div>
        </div>

        {/* Save CTA */}
        <div className="flex items-center justify-between pt-2">
          {savedSuccess ? (
            <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
              <Check className="w-4 h-4" /> Changes successfully saved to workspace.
            </span>
          ) : (
            <span className="text-xs text-slate-500">
              Changes propagate to all squad members instantly.
            </span>
          )}

          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 text-slate-950 text-xs font-black hover:opacity-95 shadow-md shadow-cyan-500/20 transition-all cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
}
