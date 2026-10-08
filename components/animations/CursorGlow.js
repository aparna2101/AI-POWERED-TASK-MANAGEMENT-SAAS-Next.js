"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function CursorGlow() {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const springConfig = { damping: 28, stiffness: 220, mass: 0.6 };
  const cursorX = useSpring(-500, springConfig);
  const cursorY = useSpring(-500, springConfig);

  useEffect(() => {
    // Only enable on desktop pointer devices
    const isTouch = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    if (isTouch) return;

    setMounted(true);

    const handleMouseMove = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!mounted) return null;

  return (
    <motion.div
      style={{
        x: cursorX,
        y: cursorY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      animate={{ opacity: isVisible ? 0.35 : 0 }}
      transition={{ duration: 0.3 }}
      className="pointer-events-none fixed top-0 left-0 z-30 h-[480px] w-[480px] rounded-full blur-[100px] will-change-transform"
      aria-hidden="true"
    >
      <div className="h-full w-full rounded-full bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 opacity-60" />
    </motion.div>
  );
}
