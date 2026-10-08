"use client";

import { motion } from "framer-motion";

export default function Badge({
  children,
  variant = "gradient", // "gradient" | "outline" | "solid" | "glow" | "dark"
  size = "md",
  className = "",
  icon: Icon = null,
}) {
  const sizeClasses = {
    sm: "px-2.5 py-0.5 text-xs",
    md: "px-3.5 py-1 text-xs sm:text-sm",
    lg: "px-4 py-1.5 text-sm",
  };

  if (variant === "gradient") {
    return (
      <div
        className={`inline-flex items-center gap-2 rounded-full p-[1px] bg-gradient-to-r from-[#0084ff] via-[#00c2ff] to-[#00e599] shadow-sm ${className}`}
      >
        <div
          className={`flex items-center gap-2 rounded-full bg-white/95 backdrop-blur-md text-[#050b1a] font-semibold tracking-wide ${sizeClasses[size]}`}
        >
          {Icon && <Icon className="w-3.5 h-3.5 text-cyan-600" />}
          <span>{children}</span>
        </div>
      </div>
    );
  }

  if (variant === "glow") {
    return (
      <div
        className={`inline-flex items-center gap-2 rounded-full bg-cyan-500/15 border border-cyan-400/50 text-cyan-200 font-bold shadow-[0_0_15px_rgba(0,194,255,0.25)] ${sizeClasses[size]} ${className}`}
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
        </span>
        {Icon && <Icon className="w-3.5 h-3.5 text-cyan-300" />}
        <span>{children}</span>
      </div>
    );
  }

  if (variant === "dark") {
    return (
      <div
        className={`inline-flex items-center gap-2 rounded-full bg-[#081734] border border-cyan-500/40 text-cyan-200 font-semibold backdrop-blur-md shadow-[0_0_15px_rgba(0,194,255,0.2)] ${sizeClasses[size]} ${className}`}
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
        </span>
        {Icon && <Icon className="w-3.5 h-3.5 text-emerald-300" />}
        <span>{children}</span>
      </div>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-[#081734]/90 backdrop-blur-sm text-cyan-200 font-medium ${sizeClasses[size]} ${className}`}
    >
      {Icon && <Icon className="w-3.5 h-3.5 text-cyan-400" />}
      <span>{children}</span>
    </span>
  );
}
