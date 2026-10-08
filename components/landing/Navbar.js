"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Menu, X, Sparkles, ArrowRight } from "lucide-react";
import TaskAuraLogo from "@/components/ui/TaskAuraLogo";
import MagneticButton from "@/components/ui/MagneticButton";
import { NAV_LINKS } from "@/lib/constants";
import {
  initSoundState,
  toggleSoundState,
  playClickSound,
  playHoverSound,
  playNavSound,
} from "@/lib/sound";

export default function Navbar({ onOpenAuth }) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setSoundEnabled(initSoundState());

    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSoundToggle = () => {
    const newState = toggleSoundState();
    setSoundEnabled(newState);
  };

  const handleNavClick = () => {
    playNavSound();
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "py-3 bg-[#050b1a]/75 backdrop-blur-xl border-b border-cyan-500/20 shadow-lg shadow-cyan-950/30"
            : "py-4 sm:py-5 bg-transparent border-b border-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl px-2.5 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-1.5 sm:gap-4">
            {/* Left: Prominent Clean Logo (Link to Home) */}
            <TaskAuraLogo size="md" isDark={true} className="shrink-0" />

            {/* Desktop Navigation Links: Home → Features → AI Copilot → About → Pricing → FAQ → Contact Us */}
            <nav className="hidden lg:flex items-center gap-0.5 rounded-full border border-cyan-500/25 bg-[#081426]/90 px-2.5 py-1 backdrop-blur-2xl shadow-xl shadow-cyan-950/40 shrink-0">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={handleNavClick}
                    onMouseEnter={playHoverSound}
                    className={`whitespace-nowrap rounded-full px-2.5 xl:px-3 py-1 text-[11px] xl:text-xs font-semibold transition-all ${
                      isActive
                        ? "text-cyan-300 bg-cyan-500/25 border border-cyan-400/40 shadow-sm"
                        : "text-slate-300 hover:text-white hover:bg-cyan-500/20"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Right Controls: Sound Toggle + Log In + Get Started */}
            <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
              {/* Sound Toggle (Sleek single point trim) */}
              <button
                type="button"
                onClick={handleSoundToggle}
                onMouseEnter={playHoverSound}
                className={`whitespace-nowrap shrink-0 flex items-center justify-center gap-1 sm:gap-1.5 rounded-full border p-1.5 sm:px-3 sm:py-2 text-xs font-bold transition-all cursor-pointer backdrop-blur-xl ${
                  soundEnabled
                    ? "border-emerald-400/60 bg-emerald-950/80 text-emerald-300 shadow-md shadow-emerald-950/40"
                    : "border-slate-700/80 bg-[#081426]/80 text-slate-400 hover:text-slate-200 hover:border-slate-600"
                }`}
                title={soundEnabled ? "Mute audio" : "Enable sound FX"}
                aria-label="Sound Toggle"
              >
                {soundEnabled ? (
                  <>
                    <Volume2 className="h-3.5 w-3.5 text-emerald-400 animate-pulse shrink-0" />
                    <span className="font-mono text-[11px] whitespace-nowrap hidden sm:inline">Sound On</span>
                  </>
                ) : (
                  <>
                    <VolumeX className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                    <span className="font-mono text-[11px] whitespace-nowrap hidden sm:inline">Sound Off</span>
                  </>
                )}
              </button>

              {/* Login Button */}
              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  onOpenAuth("login");
                }}
                onMouseEnter={playHoverSound}
                className="whitespace-nowrap shrink-0 hidden sm:inline-flex text-xs sm:text-sm font-bold text-slate-200 hover:text-white px-3.5 py-1.5 sm:py-2 rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
              >
                Log In
              </button>

              {/* Redesigned Premium "Get Started" CTA */}
              <MagneticButton strength={0.2} className="shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    playClickSound();
                    onOpenAuth("signup");
                  }}
                  onMouseEnter={playHoverSound}
                  className="whitespace-nowrap relative inline-flex items-center justify-center gap-1 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-xl text-[11px] sm:text-xs md:text-sm font-black text-[#050b1a] bg-gradient-to-r from-[#00c2ff] via-[#00e599] to-[#fbbf24] hover:opacity-95 shadow-md sm:shadow-lg shadow-cyan-500/25 hover:shadow-cyan-400/50 border border-white/30 transition-all cursor-pointer active:scale-95"
                >
                  <span>Get Started</span>
                  <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current shrink-0" />
                </button>
              </MagneticButton>

              {/* Mobile Hamburger */}
              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  setMobileMenuOpen(!mobileMenuOpen);
                }}
                className="flex lg:hidden items-center justify-center rounded-xl border border-cyan-500/30 bg-[#081426]/90 p-1.5 sm:p-2 text-slate-200 hover:text-white hover:bg-slate-800 cursor-pointer shrink-0"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="h-4.5 w-4.5 sm:h-5 sm:w-5" /> : <Menu className="h-4.5 w-4.5 sm:h-5 sm:w-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[68px] z-30 border-b border-cyan-500/25 bg-[#050b1a]/95 px-6 py-6 shadow-2xl backdrop-blur-2xl lg:hidden text-white max-h-[calc(100vh-80px)] overflow-y-auto"
          >
            <div className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={handleNavClick}
                  className={`rounded-xl px-4 py-2.5 text-base font-bold transition-colors ${
                    pathname === link.href
                      ? "text-cyan-300 bg-cyan-500/25 border border-cyan-400/30"
                      : "text-slate-200 hover:text-white hover:bg-cyan-500/20"
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              <div className="my-2 border-t border-slate-800" />

              <div className="flex flex-col gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth("login");
                  }}
                  className="w-full py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-sm font-bold text-white hover:bg-slate-800"
                >
                  Log In
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth("signup");
                  }}
                  className="w-full py-2.5 rounded-xl text-sm font-black text-[#050b1a] bg-gradient-to-r from-[#00c2ff] via-[#00e599] to-[#fbbf24] flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25"
                >
                  <span>Get Started Free</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}


