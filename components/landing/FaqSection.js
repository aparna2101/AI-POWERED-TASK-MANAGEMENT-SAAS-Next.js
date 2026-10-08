"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import Badge from "@/components/ui/Badge";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { FAQ_ITEMS } from "@/lib/constants";
import { playClickSound } from "@/lib/sound";

export default function FaqSection({ onOpenAuth }) {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleItem = (index) => {
    playClickSound();
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section
      id="faq"
      className="relative py-16 sm:py-20 bg-[#050b1a] text-white overflow-hidden border-y border-cyan-500/20"
    >
      {/* Background Cyber Mesh & Subtle Aura Glows */}
      <div className="aura-glow-cyan top-1/2 left-1/4 w-80 h-80 opacity-30 pointer-events-none" />
      <div className="absolute inset-0 bg-grid-cyber-dark opacity-15 pointer-events-none" />

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Perfectly Centered Header */}
        <div className="text-center mb-10 sm:mb-12">
          <ScrollReveal>
            <div className="flex justify-center">
              <Badge variant="dark" size="md" icon={HelpCircle} className="mb-3">
                Answers & Architecture
              </Badge>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
              Frequently Asked <span className="gradient-text-aura">Questions.</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl mx-auto">
              Everything you need to know about our autonomous AI engine, privacy guarantees, and team setup.
            </p>
          </ScrollReveal>
        </div>

        {/* Accordion List with Clean Centered Sizing */}
        <div className="space-y-3">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <ScrollReveal key={item.question} delay={index * 0.03}>
                <div
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? "border-cyan-400 bg-cyan-950/40 shadow-lg shadow-cyan-950/50 ring-1 ring-cyan-400/20"
                      : "border-cyan-500/20 bg-[#081426]/90 hover:border-cyan-400/40"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleItem(index)}
                    className="flex w-full items-center justify-between p-4 sm:p-5 text-left font-bold text-sm sm:text-base text-white cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span className="pr-4">{item.question}</span>
                    <div
                      className={`flex h-7 w-7 items-center justify-center rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180 bg-cyan-500 text-[#050b1a]" : ""
                      }`}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-cyan-500/15">
                          {item.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
