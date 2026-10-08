"use client";

import { motion } from "framer-motion";

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  duration = 0.65,
  yOffset = 30,
  tiltX = 10,
  threshold = 0.12,
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: yOffset,
        rotateX: tiltX,
        scale: 0.96,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        rotateX: 0,
        scale: 1,
      }}
      viewport={{ once: true, amount: threshold }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1], // Smooth cinematic curve
      }}
      style={{
        transformStyle: "preserve-3d",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
