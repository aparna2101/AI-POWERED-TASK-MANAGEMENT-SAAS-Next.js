"use client";

import { motion } from "framer-motion";

/**
 * StageFoldSection
 * Unfolds smoothly from the horizon in 3D perspective on scroll into view.
 */
export default function StageFoldSection({
  children,
  className = "",
  foldAngle = 20,
  id,
}) {
  return (
    <div
      id={id}
      className={`relative w-full ${className}`}
      style={{ perspective: "1200px" }}
    >
      <motion.div
        initial={{
          opacity: 0,
          rotateX: foldAngle,
          y: 80,
          scale: 0.88,
        }}
        whileInView={{
          opacity: 1,
          rotateX: 0,
          y: 0,
          scale: 1,
        }}
        viewport={{
          once: true,
          amount: 0.1,
        }}
        transition={{
          duration: 0.8,
          ease: [0.16, 1, 0.3, 1],
        }}
        style={{
          transformStyle: "preserve-3d",
          transformOrigin: "center top",
          willChange: "transform, opacity",
        }}
        className="w-full"
      >
        {children}
      </motion.div>
    </div>
  );
}
