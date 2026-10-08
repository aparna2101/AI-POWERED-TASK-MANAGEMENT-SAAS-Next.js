"use client";

import { motion } from "framer-motion";

/**
 * TopDropSection
 * Drops smoothly down from above with 3D perspective tilt and bounce on scroll into view.
 */
export default function TopDropSection({
  children,
  className = "",
  id,
}) {
  return (
    <div
      id={id}
      className={`relative w-full ${className}`}
      style={{ perspective: "1400px" }}
    >
      <motion.div
        initial={{
          opacity: 0,
          y: -40,
          rotateX: -8,
          scale: 0.96,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
          rotateX: 0,
          scale: 1,
        }}
        viewport={{
          once: true,
          amount: 0.05,
        }}
        transition={{
          duration: 0.85,
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
