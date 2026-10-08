"use client";

import Link from "next/link";
import { playClickSound } from "@/lib/sound";

export default function TaskAuraLogo({
  size = "md", // "sm" | "md" | "lg"
  className = "",
  isDark = true,
  asLink = true,
}) {
  // Enhanced responsive sizes for prominent branding without mobile crowding
  const heightClass =
    {
      sm: "h-8 sm:h-9",
      md: "h-9 sm:h-11 md:h-12",
      lg: "h-10 sm:h-12 md:h-14 lg:h-16",
    }[size] || "h-10 sm:h-12";

  const logoSrc = isDark
    ? "/taskaura-logo-dark.png?v=4"
    : "/taskaura-brand-logo-transparent.png?v=4";

  const imgContent = (
    <img
      src={logoSrc}
      alt="TaskAura Logo"
      className={`${heightClass} w-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-md`}
    />
  );

  if (!asLink) {
    return (
      <span className={`inline-flex items-center shrink-0 ${className}`}>
        {imgContent}
      </span>
    );
  }

  return (
    <Link
      href="/"
      onClick={playClickSound}
      className={`group inline-flex items-center transition-transform duration-200 active:scale-95 shrink-0 ${className}`}
      aria-label="TaskAura Home"
    >
      {imgContent}
    </Link>
  );
}
