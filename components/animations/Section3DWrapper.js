"use client";

import { motion } from "framer-motion";

/**
 * Section3DWrapper
 * Provides an ultra-smooth, futuristic 3D perspective scroll effect.
 * As sections enter the viewport, they gently glide in 3D perspective
 * with a subtle horizon beam and clean stage fold.
 */
export default function Section3DWrapper({
  children,
  className = "",
  tiltAngle = 6,
  id,
}) {
  return (
    <div
      id={id}
      className={`relative w-full ${className}`}
      style={{ perspective: "1200px" }}
    >
      {/* Subtle 3D Horizon Separation Line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/25 to-transparent pointer-events-none z-10" />

      <motion.div
        initial={{
          opacity: 0.6,
          y: 30,
          rotateX: tiltAngle,
          scale: 0.97,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
          rotateX: 0,
          scale: 1,
        }}
        viewport={{
          once: false,
          amount: 0.12,
          margin: "0px 0px -20px 0px",
        }}
        transition={{
          duration: 0.65,
          ease: [0.16, 1, 0.3, 1], // Cinematic Apple/Linear physics
        }}
        style={{
          transformStyle: "preserve-3d",
          willChange: "transform, opacity",
        }}
        className="w-full origin-top"
      >
        {children}
      </motion.div>
    </div>
  );
}
