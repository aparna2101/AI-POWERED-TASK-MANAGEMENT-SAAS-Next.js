"use client";

import { useState } from "react";
import {
  X,
  Bot,
  Send,
  Sparkles,
  Zap,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Layers,
  ChevronRight,
} from "lucide-react";
import { playClickSound, playSuccessSound, playHoverSound } from "@/lib/sound";

export default function AiCopilotDrawer({ isOpen, onClose, onApplyTasks }) {
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hello Alex! I am your TaskAura AI Copilot. I'm actively monitoring your 4 projects, sprint velocity, and GitHub PR telemetry. How can I assist your workflow today?",
      actions: [
        "What are today's highest priority blockers?",
        "Summarize Sprint 4 progress",
        "Check team workload balance",
      ],
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = (textToSend) => {
    const text = textToSend || inputValue;
    if (!text.trim()) return;

    playClickSound();
    const userMsg = { sender: "user", text: text };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    // Realistic Simulated AI Multi-Agent reasoning
    setTimeout(() => {
      setIsTyping(false);
      playSuccessSound();

      let aiResponse = "";
      let actionButtons = null;

      if (text.toLowerCase().includes("blocker")) {
        aiResponse =
          "⚠️ **2 High-Priority Blockers Detected:**\n1. **PR #204 (gRPC Gateway)** has been waiting on security audit for 38h. Blocks 3 auth tickets.\n2. **WebGL shader resize leak** causes 12 FPS drop on mobile Safari.\n\n*Recommendation:* Auto-assign Marcus Chen for shader cleanup & request accelerated review on PR #204.";
        actionButtons = ["Ping Security Reviewers", "Open Analytics Feed"];
      } else if (text.toLowerCase().includes("sprint") || text.toLowerCase().includes("progress")) {
        aiResponse =
          "📊 **Sprint 4 Telemetry Overview:**\n- **Completion:** 78% (27 of 34 tasks completed)\n- **Burn Rate:** 1.4 days ahead of scheduled cutover\n- **Projected Delivery:** Oct 24, 2026 (99.4% confidence)\n\nSprint health is **OPTIMAL**. No critical delivery delays found.";
        actionButtons = ["View Burndown Chart", "Export Sprint Report"];
      } else if (text.toLowerCase().includes("workload") || text.toLowerCase().includes("team")) {
        aiResponse =
          "👥 **Workload Distribution Audit:**\n- **Elena Rostova:** 92% capacity (5 active tasks) → *At risk of burnout*\n- **Alex Morgan:** 85% capacity (4 active tasks)\n- **Marcus Chen:** 70% capacity (3 active tasks)\n- **David Kim:** 55% capacity (2 active tasks) → *Available for new tickets*";
        actionButtons = ["Rebalance Tasks to David Kim", "View Team Matrix"];
      } else {
        aiResponse = `🤖 **AI Copilot Analysis for:** "${text}"\n\nI analyzed your active workspace nodes. Everything is currently synchronizing with the central CRDT engine. I can automatically break down this initiative into 4 agile tasks and place them directly onto your Kanban board.`;
        actionButtons = ["Generate 4 Kanban Tasks", "Add to Sprint Backlog"];
      }

      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: aiResponse, actions: actionButtons },
      ]);
    }, 900);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#050b1a]/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-md sm:max-w-lg bg-[#061022] border-l border-cyan-500/30 shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-slate-800/80 flex items-center justify-between bg-[#08152c]">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl bg-gradient-to-tr from-cyan-500 via-teal-400 to-emerald-400 flex items-center justify-center text-slate-950 shadow-md">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-white">AI Copilot</h3>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Online
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Autonomous Project & Code Intelligence
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                playClickSound();
                onClose();
              }}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Conversation Stream */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 scrollbar-thin">
            {messages.map((m, index) => (
              <div
                key={index}
                className={`flex flex-col ${
                  m.sender === "user" ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`max-w-[88%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                    m.sender === "user"
                      ? "bg-gradient-to-r from-cyan-600 to-teal-600 text-white font-medium"
                      : "bg-[#0c1a35] border border-cyan-500/20 text-slate-200"
                  }`}
                >
                  <p className="whitespace-pre-line">{m.text}</p>
                </div>

                {/* Interactive Action Pills for AI responses */}
                {m.actions && (
                  <div className="mt-2.5 flex flex-wrap gap-1.5 max-w-[92%]">
                    {m.actions.map((act, actIdx) => (
                      <button
                        key={actIdx}
                        onClick={() => handleSendMessage(act)}
                        onMouseEnter={playHoverSound}
                        className="text-[11px] font-semibold px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-700 hover:border-cyan-400 text-slate-300 hover:text-cyan-300 hover:bg-slate-800 transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <Sparkles className="w-3 h-3 text-cyan-400" />
                        <span>{act}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 p-3 rounded-2xl bg-[#0c1a35] border border-cyan-500/20 max-w-[200px]">
                <div className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
                <span className="text-xs text-slate-400 font-medium">
                  Copilot is analyzing...
                </span>
              </div>
            )}
          </div>

          {/* Input Box */}
          <div className="p-4 border-t border-slate-800/80 bg-[#08152c]">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask Copilot anything (e.g., 'Plan Sprint 5')..."
                className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/40"
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="p-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 text-slate-950 font-bold hover:opacity-95 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer shadow-md"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
