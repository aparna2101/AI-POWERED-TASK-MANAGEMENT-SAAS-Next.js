"use client";

import Link from "next/link";
import TaskAuraLogo from "@/components/ui/TaskAuraLogo";
import {
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  Heart,
} from "lucide-react";
import { playClickSound, playHoverSound } from "@/lib/sound";

export default function Footer({ onOpenAuth }) {
  // Only actual, working pages on this website
  const platformPages = [
    { name: "Home", href: "/" },
    { name: "Features", href: "/features" },
    { name: "AI Copilot", href: "/ai-copilot" },
    { name: "Workspace App", href: "/workspace" },
  ];

  const companyPages = [
    { name: "About Us", href: "/about" },
    { name: "Pricing Plans", href: "/pricing" },
    { name: "Technical FAQ", href: "/faq" },
    { name: "Contact Team", href: "/contact" },
  ];

  const legalPages = [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookie Policy", href: "/cookies" },
  ];

  const handleLinkClick = () => {
    playClickSound();
  };

  return (
    <footer className="border-t-2 border-cyan-300/80 bg-gradient-to-b from-[#d6ecf2] via-[#cce7ee] to-[#c2e2ea] pt-16 pb-12 text-slate-700 relative overflow-hidden">
      {/* Background Soft Aura Glows & Cyber Mesh */}
      <div className="absolute inset-0 bg-grid-cyber-light opacity-50 pointer-events-none" />
      <div className="aura-glow-cyan top-0 left-1/4 w-[450px] h-[300px] opacity-35 pointer-events-none" />
      <div className="aura-glow-emerald bottom-0 right-1/4 w-[450px] h-[300px] opacity-30 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-12 gap-x-6 gap-y-8 sm:gap-8 pb-12 border-b border-cyan-300/70 items-start">
          
          {/* BRAND COLUMN (Full width on mobile/tablet, 3 cols on lg) */}
          <div className="col-span-2 md:col-span-2 lg:col-span-3 space-y-4">
            <TaskAuraLogo size="lg" isDark={false} />

            <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed max-w-xs">
              Plan projects, manage tasks, collaborate with your team, and let AI move your work forward — all from one intelligent workspace.
            </p>

            {/* Social Icons (Soft tint, NO harsh white stickers) */}
            <div className="pt-1">
              <span className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-600 mb-2">
                Connect With Us
              </span>
              <div className="flex items-center gap-2.5">
                {[
                  {
                    label: "X",
                    href: "https://x.com",
                    svg: (
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    ),
                  },
                  {
                    label: "GitHub",
                    href: "https://github.com",
                    svg: (
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                      </svg>
                    ),
                  },
                  {
                    label: "LinkedIn",
                    href: "https://linkedin.com",
                    svg: (
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    ),
                  },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    onClick={handleLinkClick}
                    onMouseEnter={playHoverSound}
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-600/30 bg-cyan-900/10 text-slate-800 hover:bg-cyan-900/20 hover:text-cyan-950 transition-all duration-200 cursor-pointer shadow-2xs"
                    aria-label={social.label}
                  >
                    {social.svg}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* PLATFORM LINKS (1 col on mobile, 1 col on md, 2 cols on lg) */}
          <div className="col-span-1 md:col-span-1 lg:col-span-2">
            <h4 className="h-6 text-xs font-bold uppercase tracking-wider text-slate-900 mb-3.5 font-mono flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-600" />
              <span>Platform</span>
            </h4>
            <ul className="space-y-1">
              {platformPages.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    onClick={handleLinkClick}
                    onMouseEnter={playHoverSound}
                    className="group/link flex items-center gap-1.5 px-2 py-1 -mx-2 sm:px-2.5 sm:-mx-2.5 rounded-lg text-xs sm:text-sm font-semibold text-slate-700 hover:text-cyan-950 hover:bg-cyan-200/50 hover:translate-x-1 transition-all duration-200 cursor-pointer"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-600 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COMPANY LINKS (1 col on mobile, 1 col on md, 2 cols on lg) */}
          <div className="col-span-1 md:col-span-1 lg:col-span-2">
            <h4 className="h-6 text-xs font-bold uppercase tracking-wider text-slate-900 mb-3.5 font-mono flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600" />
              <span>Company</span>
            </h4>
            <ul className="space-y-1">
              {companyPages.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    onClick={handleLinkClick}
                    onMouseEnter={playHoverSound}
                    className="group/link flex items-center gap-1.5 px-2 py-1 -mx-2 sm:px-2.5 sm:-mx-2.5 rounded-lg text-xs sm:text-sm font-semibold text-slate-700 hover:text-cyan-950 hover:bg-cyan-200/50 hover:translate-x-1 transition-all duration-200 cursor-pointer"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-teal-600 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* LEGAL & TRUST LINKS (Left column on mobile, vertical stack) */}
          <div className="col-span-1 md:col-span-1 lg:col-span-2">
            <h4 className="h-6 text-xs font-bold uppercase tracking-wider text-slate-900 mb-3.5 font-mono flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
              <span>Legal & Trust</span>
            </h4>
            <ul className="space-y-1">
              {legalPages.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    onClick={handleLinkClick}
                    onMouseEnter={playHoverSound}
                    className="group/link flex items-center gap-1.5 px-2 py-1 -mx-2 sm:px-2.5 sm:-mx-2.5 rounded-lg text-xs sm:text-sm font-semibold text-slate-700 hover:text-cyan-950 hover:bg-cyan-200/50 hover:translate-x-1 transition-all duration-200 cursor-pointer"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-600 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT SIDE: HEADQUARTERS & CONTACT (2 cols on mobile, 1 col on md, 3 cols on lg) */}
          <div className="col-span-2 md:col-span-1 lg:col-span-3">
            <h4 className="h-6 text-xs font-bold uppercase tracking-wider text-slate-900 mb-3.5 font-mono flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                <span>Headquarters</span>
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-cyan-900/10 text-cyan-950 border border-cyan-600/30 font-bold tracking-normal normal-case leading-none">
                24/7 Live
              </span>
            </h4>

            <div className="space-y-3 text-xs text-slate-700">
              <div className="flex items-start gap-2.5 py-1">
                <MapPin className="w-4 h-4 text-cyan-800 shrink-0 mt-0.5" />
                <div className="leading-snug">
                  <span className="font-semibold text-slate-900 block text-xs sm:text-sm">100 Montgomery St, Suite 2400</span>
                  <span className="text-slate-600 block text-xs sm:text-sm">San Francisco, CA 94104</span>
                  <span className="text-[11px] text-slate-500 font-mono block mt-0.5">Hubs: London • Singapore • Bengaluru</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 py-0.5">
                <Phone className="w-4 h-4 text-emerald-800 shrink-0 mt-0.5" />
                <div className="font-mono text-xs font-semibold text-slate-800 space-y-1">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span>+1 (415) 890-AURA</span>
                    <span className="text-[10px] text-slate-500 font-sans font-normal">(Americas)</span>
                  </div>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span>+91 80 4129 0088</span>
                    <span className="text-[10px] text-slate-500 font-sans font-normal">(Global / APAC)</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 py-0.5">
                <Mail className="w-4 h-4 text-cyan-800 shrink-0" />
                <a
                  href="mailto:contact@taskaura.ai"
                  className="font-mono text-cyan-900 hover:text-cyan-950 font-semibold underline"
                >
                  contact@taskaura.ai
                </a>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/contact"
                onClick={handleLinkClick}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-900 hover:bg-cyan-950 text-white font-bold text-xs shadow-sm hover:shadow-md transition-all cursor-pointer group"
              >
                <span>Connect with Engineering</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

        </div>

        {/* BOTTOM BAR: Made by Aparna Chaurasia, Copyright & Status */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono">
          <div className="text-slate-700 font-medium text-center md:text-left text-[11px] sm:text-xs leading-relaxed max-w-sm sm:max-w-none">
            © 2026 <strong className="text-slate-900">TaskAura Inc.</strong> All rights reserved. Plan. Collaborate. Achieve with AI.
          </div>

          {/* Aparna Chaurasia Credit - Harmonious cyan-tinted glass (NO awkward wrapping, single-line elegance) */}
          <div className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-cyan-900/10 border border-cyan-600/30 text-slate-800 shadow-2xs text-[11px] sm:text-xs font-mono tracking-tight sm:tracking-normal whitespace-nowrap">
            <span className="whitespace-nowrap">Designed & Built with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-pulse shrink-0 inline-block" />
            <span className="whitespace-nowrap">by <strong className="text-cyan-950 font-black">Aparna Chaurasia</strong></span>
          </div>

          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/10 border border-emerald-600/30 text-emerald-900 font-bold cursor-default text-[11px] sm:text-xs whitespace-nowrap">
              <span className="h-2 w-2 rounded-full bg-emerald-600 animate-pulse shrink-0" />
              All Systems Operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
