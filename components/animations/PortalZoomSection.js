"use client";

import { motion } from "framer-motion";

/**
 * PortalZoomSection
 * Holographic 3D expansion from portal depth (scale: 0.6 -> 1) on scroll into view.
 */
export default function PortalZoomSection({
  children,
  className = "",
  id,
}) {
  return (
    <div
      id={id}
      className={`relative w-full ${className}`}
      style={{
        perspective: "1200px",
      }}
    >
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.95,
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
          duration: 0.8,
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
