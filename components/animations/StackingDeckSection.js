"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * StackingDeckSection (Style 1 - The Best Apple/Awwwards 3D Card Stack)
 * Pinned layer that scales slightly down into 3D depth while the next section
 * slides up like a physical 3D card/curtain over it.
 */
export default function StackingDeckSection({
  children,
  className = "",
  index = 0,
  id,
}) {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // As this section scrolls out, it recedes into 3D space
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.93]);
  const opacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 0.85, 0.6]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -30]);

  return (
    <div
      ref={containerRef}
      id={id}
      className={`relative w-full ${className}`}
      style={{
        zIndex: 10 + index,
      }}
    >
      <motion.div
        style={{
          scale,
          opacity,
          y,
          transformOrigin: "center top",
          transformStyle: "preserve-3d",
          willChange: "transform, opacity",
        }}
        className="w-full shadow-[0_-25px_50px_rgba(0,0,0,0.35)] rounded-t-[32px] sm:rounded-t-[44px] overflow-hidden"
      >
        {children}
      </motion.div>
    </div>
  );
}
