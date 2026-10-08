"use client";

import { motion } from "framer-motion";
import { playClickSound, playHoverSound } from "@/lib/sound";

export default function Button({
  children,
  variant = "aura", // "aura" | "secondary" | "ghost" | "dark" | "gold"
  size = "md", // "sm" | "md" | "lg"
  className = "",
  onClick,
  icon: Icon = null,
  rightIcon: RightIcon = null,
  disabled = false,
  type = "button",
  playSound = true,
  ...props
}) {
  const handleClick = (e) => {
    if (disabled) return;
    if (playSound) playClickSound();
    if (onClick) onClick(e);
  };

  const handleMouseEnter = () => {
    if (!disabled && playSound) {
      playHoverSound();
    }
  };

  const sizeClasses = {
    sm: "px-3.5 py-1.5 text-xs font-semibold gap-1.5 rounded-xl",
    md: "px-5 py-2.5 text-sm font-semibold gap-2 rounded-xl",
    lg: "px-7 py-3.5 text-base font-bold gap-2.5 rounded-2xl",
  };

  let variantClasses = "";
  let glowElement = null;

  switch (variant) {
    case "aura":
      variantClasses =
        "relative text-[#050b1a] font-black bg-gradient-to-r from-[#00c2ff] via-[#00e599] to-[#fbbf24] hover:opacity-95 shadow-lg shadow-cyan-500/20 hover:shadow-emerald-500/35 border border-white/40 active:translate-y-0.5";
      glowElement = (
        <span className="absolute inset-0 rounded-inherit bg-white/25 opacity-0 transition-opacity duration-300 hover:opacity-100 pointer-events-none" />
      );
      break;

    case "secondary":
      variantClasses =
        "bg-white/95 backdrop-blur-md text-[#050b1a] hover:bg-slate-50 hover:text-black border border-slate-200 hover:border-cyan-400/80 shadow-xs hover:shadow-md transition-all";
      break;

    case "dark":
      variantClasses =
        "bg-[#081426] text-white hover:text-cyan-300 hover:bg-[#0b192c] border border-cyan-500/40 hover:border-cyan-400 shadow-md shadow-cyan-950/40 hover:shadow-cyan-500/20";
      break;

    case "gold":
      variantClasses =
        "bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] text-[#050b1a] font-extrabold shadow-md shadow-amber-500/20 hover:shadow-amber-500/40 border border-amber-300/60";
      break;

    case "ghost":
      variantClasses =
        "text-slate-700 hover:text-[#050b1a] hover:bg-slate-100/80 active:bg-slate-200/60";
      break;

    default:
      variantClasses = "bg-teal-600 text-white hover:bg-teal-700";
  }

  return (
    <motion.button
      type={type}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      disabled={disabled}
      whileHover={disabled ? {} : { scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      className={`relative inline-flex items-center justify-center transition-all cursor-pointer select-none overflow-hidden ${
        sizeClasses[size]
      } ${variantClasses} ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
      {...props}
    >
      {glowElement}
      {Icon && <Icon className="w-4 h-4 shrink-0 transition-transform duration-200 group-hover:scale-110" />}
      <span className="relative z-10">{children}</span>
      {RightIcon && <RightIcon className="w-4 h-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" />}
    </motion.button>
  );
}
