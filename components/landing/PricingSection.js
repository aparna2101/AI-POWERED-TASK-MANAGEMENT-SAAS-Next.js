"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Sparkles, Zap, ArrowRight } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { PRICING_PLANS } from "@/lib/constants";
import { playClickSound, playHoverSound } from "@/lib/sound";

export default function PricingSection({ onOpenAuth }) {
  const [isYearly, setIsYearly] = useState(true);

  const handleToggle = () => {
    playClickSound();
    setIsYearly(!isYearly);
  };

  return (
    <section id="pricing" className="relative py-14 sm:py-18 overflow-hidden bg-gradient-to-b from-[#eaf6f9] via-[#e2f3f7] to-[#eaf5f8] border-y border-cyan-200/80">
      {/* Background Soft Glow */}
      <div className="absolute inset-0 bg-grid-cyber-light opacity-50 pointer-events-none" />
      <div className="aura-glow-cyan top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] opacity-40 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <ScrollReveal>
            <Badge variant="glow" size="md" icon={Zap} className="mb-3">
              Transparent & Scalable
            </Badge>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#050b1a]">
              Simple, Predictable <br />
              <span className="gradient-text-aura">Pricing For High-Velocity Teams.</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              Start free with no credit card. Upgrade whenever your squad requires autonomous AI workflows and unlimited team velocity.
            </p>
          </ScrollReveal>

          {/* Monthly / Yearly Billing Animated Toggle */}
          <ScrollReveal delay={0.3}>
            <div className="mt-8 inline-flex flex-wrap sm:flex-nowrap justify-center items-center gap-2 sm:gap-3 rounded-2xl sm:rounded-full border border-slate-200/90 bg-white p-1.5 shadow-sm max-w-full">
              <button
                type="button"
                onClick={handleToggle}
                onMouseEnter={playHoverSound}
                className={`rounded-full px-4 sm:px-5 py-2 text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                  !isYearly
                    ? "bg-[#050b1a] text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Monthly Billing
              </button>

              <button
                type="button"
                onClick={handleToggle}
                onMouseEnter={playHoverSound}
                className={`relative flex items-center gap-2 rounded-full px-4 sm:px-5 py-2 text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                  isYearly
                    ? "bg-gradient-to-r from-[#0084ff] via-[#00c2ff] to-[#00e599] text-[#050b1a] font-extrabold shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <span>Annual Billing</span>
                <span className="rounded-full bg-amber-400 px-2 py-0.5 text-[10px] font-black text-[#050b1a]">
                  Save 20%
                </span>
              </button>
            </div>
          </ScrollReveal>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch max-w-6xl mx-auto">
          {PRICING_PLANS.map((plan, index) => {
            const price = isYearly ? plan.priceYearly : plan.priceMonthly;

            return (
              <ScrollReveal key={plan.name} delay={index * 0.1}>
                <div
                  className={`relative flex flex-col justify-between rounded-3xl p-8 transition-all duration-300 h-full ${
                    plan.popular
                      ? "border-2 border-cyan-400 bg-white shadow-2xl shadow-cyan-500/10 lg:-translate-y-2 ring-2 ring-cyan-500/20"
                      : "border border-slate-200/90 bg-white shadow-sm hover:border-slate-300 hover:shadow-xl"
                  }`}
                >
                  {/* Popular Badge */}
                  {plan.popular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#00c2ff] via-[#00e599] to-[#fbbf24] px-4 py-1 text-xs font-black text-[#050b1a] shadow-md">
                        <Sparkles className="w-3.5 h-3.5" />
                        {plan.badge}
                      </span>
                    </div>
                  )}

                  <div>
                    {/* Plan Name & Tagline */}
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-[#050b1a]">{plan.name}</h3>
                      {plan.name === "Free" && (
                        <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full font-mono">
                          Forever
                        </span>
                      )}
                    </div>
                    <p className="mt-2 text-xs sm:text-sm text-slate-500 min-h-[40px]">
                      {plan.description}
                    </p>

                    {/* Price Display */}
                    <div className="mt-6 flex items-baseline gap-1">
                      <span className="text-4xl sm:text-5xl font-black text-[#050b1a] tracking-tight font-mono">
                        ${price}
                      </span>
                      <span className="text-xs sm:text-sm text-slate-500 font-semibold">
                        {plan.name === "Free" ? "" : isYearly ? "/mo (billed annually)" : "/month"}
                      </span>
                    </div>

                    <div className="my-6 border-t border-slate-100" />

                    {/* Feature List */}
                    <ul className="space-y-3.5">
                      {plan.features.map((feat) => (
                        <li key={feat} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 shrink-0 mt-0.5">
                            <Check className="h-3.5 w-3.5 stroke-[2.5]" />
                          </div>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Button */}
                  <div className="mt-8 pt-6 border-t border-slate-100">
                    <Button
                      variant={plan.popular ? "aura" : "secondary"}
                      size="md"
                      className="w-full justify-center"
                      rightIcon={ArrowRight}
                      onClick={() => onOpenAuth("signup")}
                    >
                      {plan.cta}
                    </Button>
                    <p className="mt-2.5 text-center text-[11px] text-slate-400">
                      {plan.name === "Free"
                        ? "Instant setup • No card needed"
                        : "14-day free trial • Cancel anytime"}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
