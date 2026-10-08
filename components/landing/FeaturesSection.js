"use client";

import { motion } from "framer-motion";
import {
  Sparkles,
  Kanban,
  Users2,
  Cpu,
  BarChart3,
  CalendarDays,
  Zap,
  Activity,
  ArrowUpRight,
} from "lucide-react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { FEATURES } from "@/lib/constants";
import { playClickSound } from "@/lib/sound";

const ICON_MAP = {
  "01": Sparkles,
  "02": Kanban,
  "03": Users2,
  "04": Cpu,
  "05": BarChart3,
  "06": CalendarDays,
  "07": Zap,
  "08": Activity,
};

export default function FeaturesSection({ onOpenAuth }) {
  return (
    <section id="features" className="relative py-16 sm:py-20 overflow-hidden bg-[#050b1a] text-white">
      {/* Background Soft Glows in Cyan and Emerald */}
      <div className="aura-glow-cyan top-1/3 -left-40 w-80 h-80 opacity-40" />
      <div className="aura-glow-emerald bottom-10 -right-40 w-80 h-80 opacity-40" />
      <div className="absolute inset-0 bg-grid-cyber-dark opacity-20 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <ScrollReveal>
            <Badge variant="glow" size="md" icon={Zap} className="mb-3">
              Autonomous Core Features
            </Badge>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-[1.12]">
              Everything Your Team Needs <br />
              <span className="gradient-text-aura">To Move 10x Faster.</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
              TaskAura combines structured agile execution with real-time generative intelligence to eliminate engineering friction.
            </p>
          </ScrollReveal>
        </div>

        {/* 8 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {FEATURES.map((feature, index) => {
            const Icon = ICON_MAP[feature.id] || Sparkles;

            return (
              <ScrollReveal key={feature.id} delay={0.05 * index}>
                <Card
                  interactive
                  isDark={true}
                  onClick={() => {
                    playClickSound();
                    onOpenAuth("signup");
                  }}
                  className="h-full flex flex-col justify-between p-5 border-cyan-500/25 bg-[#081426]/90 hover:border-cyan-400 transition-all duration-300"
                >
                  <div>
                    {/* Top Row: ID + Badge + Arrow */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-cyan-400/80">
                          {feature.id}
                        </span>
                        <span className="text-[10px] font-bold text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-500/30">
                          {feature.badge}
                        </span>
                      </div>

                      <div className="h-6 w-6 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-gradient-to-r group-hover:from-cyan-500 group-hover:to-emerald-500 group-hover:text-white transition-all duration-300 group-hover:rotate-45">
                        <ArrowUpRight className="h-3 w-3" />
                      </div>
                    </div>

                    {/* Icon Container */}
                    <div className="mb-3 inline-flex p-2 rounded-xl bg-cyan-950/80 border border-cyan-500/30 shadow-inner">
                      <Icon className="h-4 w-4 text-cyan-400" />
                    </div>

                    {/* Title */}
                    <h3 className="text-base font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                      {feature.title}
                    </h3>

                    {/* Description */}
                    <p className="mt-1.5 text-xs text-slate-300 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>

                  {/* Card Footer Tag / Metric */}
                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-400 text-[11px]">
                      {feature.tag}
                    </span>
                    <span className="font-bold text-emerald-400 flex items-center gap-1 text-[11px]">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      {feature.metrics}
                    </span>
                  </div>
                </Card>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
