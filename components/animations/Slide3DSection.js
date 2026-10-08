"use client";

import { motion } from "framer-motion";

/**
 * Slide3DSection
 * Sweeps in dramatically from Left or Right with 3D perspective rotation on scroll into view.
 */
export default function Slide3DSection({
  children,
  id,
  direction = "left", // "left" | "right"
  className = "",
}) {
  const isLeft = direction === "left";

  return (
    <div
      id={id}
      className={`relative w-full overflow-x-clip ${className}`}
      style={{ perspective: "1400px" }}
    >
      <motion.div
        initial={{
          opacity: 0,
          x: isLeft ? -50 : 50,
          rotateY: isLeft ? 8 : -8,
          scale: 0.96,
        }}
        whileInView={{
          opacity: 1,
          x: 0,
          rotateY: 0,
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
          transformOrigin: isLeft ? "left center" : "right center",
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
