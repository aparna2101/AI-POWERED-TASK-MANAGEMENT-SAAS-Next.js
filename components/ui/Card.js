"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { playHoverSound } from "@/lib/sound";

export default function Card({
  children,
  className = "",
  glowOnHover = true,
  hoverTilt = true,
  interactive = false,
  isDark = false,
  onClick,
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const handleMouseEnter = () => {
    if (interactive) {
      playHoverSound();
    }
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onClick={onClick}
      whileHover={interactive ? { y: -5, transition: { duration: 0.2 } } : {}}
      className={`group relative rounded-3xl transition-all duration-300 ${
        isDark
          ? "border border-cyan-500/20 bg-[#081426]/90 p-6 shadow-xl shadow-cyan-950/30 backdrop-blur-xl hover:border-cyan-400/50 hover:shadow-cyan-500/10"
          : "border border-slate-200/90 bg-white/90 p-6 shadow-sm backdrop-blur-xl hover:border-cyan-400/60 hover:shadow-xl hover:shadow-cyan-500/5"
      } ${interactive ? "cursor-pointer" : ""} ${className}`}
    >
      {/* Dynamic Cursor Gradient Glow in Cyan/Emerald */}
      {glowOnHover && (
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                350px circle at ${mouseX}px ${mouseY}px,
                ${isDark ? "rgba(0, 194, 255, 0.15)" : "rgba(0, 194, 255, 0.08)"},
                ${isDark ? "rgba(0, 229, 153, 0.08)" : "rgba(0, 229, 153, 0.04)"} 40%,
                transparent 80%
              )
            `,
          }}
        />
      )}

      {/* Inner Card Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
