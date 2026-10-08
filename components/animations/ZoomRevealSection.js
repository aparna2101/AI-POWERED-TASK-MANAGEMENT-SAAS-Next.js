"use client";

import { motion } from "framer-motion";

/**
 * ZoomRevealSection
 * Surges forward from 3D depth (scale: 0.6 -> 1) reliably on scroll into view.
 */
export default function ZoomRevealSection({
  children,
  id,
  className = "",
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
          scale: 0.94,
          y: 30,
        }}
        whileInView={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        viewport={{
          once: true,
          amount: 0.05,
        }}
        transition={{
          duration: 0.75,
          ease: [0.16, 1, 0.3, 1],
        }}
        style={{
          transformOrigin: "center center",
          transformStyle: "preserve-3d",
          willChange: "transform, opacity",
        }}
        className="w-full"
      >
        {children}
      </motion.div>
    </div>
  );
}
