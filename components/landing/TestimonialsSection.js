"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote, MessageSquareHeart } from "lucide-react";
import Badge from "@/components/ui/Badge";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { TESTIMONIALS } from "@/lib/constants";
import { playClickSound, playHoverSound } from "@/lib/sound";

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    playClickSound();
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    playClickSound();
    setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="relative py-24 sm:py-32 bg-slate-50/70 border-y border-slate-200/80 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <ScrollReveal>
            <Badge variant="glow" size="md" icon={MessageSquareHeart} className="mb-4">
              Client Validation
            </Badge>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#070b1e]">
              Loved By The World's <br />
              <span className="gradient-text-aura">Most Demanding Builders.</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              Read how engineering leads and founders moved from fragmented tools to fluid execution with TaskAura.
            </p>
          </ScrollReveal>
        </div>

        {/* Carousel & Cards */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.98, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: -15 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="relative rounded-3xl border border-slate-200/90 bg-white p-8 sm:p-12 shadow-xl ring-1 ring-slate-900/5 overflow-hidden"
              >
                {/* Background quote emblem */}
                <Quote className="absolute top-6 right-8 w-24 h-24 text-slate-100 pointer-events-none -scale-x-100" />

                {/* Rating stars */}
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(TESTIMONIALS[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Quote Text */}
                <p className="text-lg sm:text-2xl font-medium text-slate-900 leading-relaxed italic relative z-10">
                  "{TESTIMONIALS[currentIndex].quote}"
                </p>

                {/* Author Info */}
                <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img
                      src={TESTIMONIALS[currentIndex].avatar}
                      alt={TESTIMONIALS[currentIndex].author}
                      className="h-14 w-14 rounded-full border-2 border-purple-200 object-cover shadow-sm"
                    />
                    <div>
                      <h4 className="text-base font-bold text-[#070b1e]">
                        {TESTIMONIALS[currentIndex].author}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-500">
                        {TESTIMONIALS[currentIndex].role} •{" "}
                        <span className="font-semibold text-purple-600">
                          {TESTIMONIALS[currentIndex].company}
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Navigation Arrows */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handlePrev}
                      onMouseEnter={playHoverSound}
                      className="p-2.5 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition-colors shadow-xs"
                      aria-label="Previous testimonial"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      onMouseEnter={playHoverSound}
                      className="p-2.5 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition-colors shadow-xs"
                      aria-label="Next testimonial"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  playClickSound();
                  setCurrentIndex(idx);
                }}
                className={`h-2 rounded-full transition-all ${
                  currentIndex === idx ? "w-8 bg-purple-600" : "w-2 bg-slate-300 hover:bg-slate-400"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
