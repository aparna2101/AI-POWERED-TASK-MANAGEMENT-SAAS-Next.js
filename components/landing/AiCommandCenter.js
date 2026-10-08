"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  FileText,
  Activity,
  AlertCircle,
  Layers,
  TrendingUp,
  Terminal,
  X,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { AI_COMMANDS } from "@/lib/constants";
import { playClickSound, playHoverSound, playAiActivationSound } from "@/lib/sound";

const ICON_COMPONENTS = {
  Sparkles,
  FileText,
  Activity,
  AlertCircle,
  Layers,
  TrendingUp,
};

export default function AiCommandCenter({ onOpenAuth }) {
  const [activeCommand, setActiveCommand] = useState(null);

  const handleCommandClick = (cmd) => {
    playAiActivationSound();
    setActiveCommand(cmd);
  };

  const handleCloseModal = () => {
    playClickSound();
    setActiveCommand(null);
  };

  return (
    <section id="command-center" className="relative py-24 sm:py-32 bg-slate-50/70 border-b border-slate-200 overflow-hidden">
      {/* Background Cyan/Emerald Soft Glows */}
      <div className="aura-glow-cyan top-1/3 -left-32 w-80 h-80" />
      <div className="aura-glow-emerald bottom-1/4 -right-32 w-80 h-80" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <ScrollReveal>
            <Badge variant="glow" size="md" icon={Terminal} className="mb-4">
              Autonomous Command Grid
            </Badge>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#050b1a] leading-[1.15]">
              AI Command Center. <br />
              <span className="gradient-text-aura">Instant Neural Actions.</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              Trigger autonomous workflow routines with a single tap. TaskAura models dependencies, balances capacity, and unblocks engineers in real time.
            </p>
          </ScrollReveal>
        </div>

        {/* 6 Quick Action Interactive Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {AI_COMMANDS.map((cmd, i) => {
            const Icon = ICON_COMPONENTS[cmd.icon] || Sparkles;

            return (
              <ScrollReveal key={cmd.id} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -6, scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleCommandClick(cmd)}
                  onMouseEnter={playHoverSound}
                  className="group relative flex flex-col justify-between rounded-3xl border border-slate-200/90 bg-white p-7 shadow-sm hover:border-cyan-400 hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300 cursor-pointer h-full"
                >
                  <div>
                    {/* Top Tag & Action Trigger */}
                    <div className="flex items-center justify-between mb-5">
                      <span className="text-[11px] font-mono font-bold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200/60">
                        {cmd.tag}
                      </span>
                      <div className="p-2.5 rounded-2xl bg-slate-50 text-slate-400 group-hover:bg-gradient-to-r group-hover:from-cyan-500 group-hover:to-emerald-500 group-hover:text-white transition-all duration-300 group-hover:rotate-12 shadow-2xs">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-[#050b1a] tracking-tight group-hover:text-teal-600 transition-colors">
                      {cmd.title}
                    </h3>

                    <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                      {cmd.desc}
                    </p>
                  </div>

                  {/* Footer prompt trigger */}
                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-cyan-600 group-hover:text-emerald-600 transition-colors">
                    <span>Click to run simulation →</span>
                    <span className="font-mono text-[10px] text-slate-400">⚡ 1-Click</span>
                  </div>
                </motion.div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Command Simulation Result Modal Drawer */}
        <AnimatePresence>
          {activeCommand && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={handleCloseModal}
                className="fixed inset-0 bg-[#050b1a]/70 backdrop-blur-md"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative z-10 w-full max-w-lg rounded-3xl border border-cyan-400/40 bg-[#081426] p-6 sm:p-8 text-white shadow-2xl shadow-cyan-950/80"
              >
                <button
                  onClick={handleCloseModal}
                  className="absolute top-5 right-5 rounded-full p-2 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-2.5 mb-4">
                  <div className="p-2 rounded-xl bg-gradient-to-r from-cyan-400 to-emerald-400 text-[#050b1a]">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider font-bold">
                      EXECUTING ACTION
                    </span>
                    <h3 className="text-xl font-black text-white">{activeCommand.title}</h3>
                  </div>
                </div>

                <div className="rounded-2xl border border-cyan-500/20 bg-slate-900/90 p-4.5 text-xs text-slate-200 font-mono leading-relaxed space-y-2 mt-4">
                  <div className="text-emerald-400 flex items-center gap-1.5 font-bold">
                    <CheckCircle className="w-4 h-4" />
                    <span>Neural Simulation Complete (108ms)</span>
                  </div>
                  <p className="text-slate-300 font-sans text-sm pt-2">
                    {activeCommand.resultSnippet}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-end gap-3">
                  <Button variant="ghost" size="sm" onClick={handleCloseModal} className="text-white hover:text-slate-200">
                    Close
                  </Button>
                  <Button
                    variant="aura"
                    size="sm"
                    onClick={() => {
                      handleCloseModal();
                      onOpenAuth("signup");
                    }}
                    rightIcon={ArrowRight}
                  >
                    Apply to Active Project
                  </Button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
