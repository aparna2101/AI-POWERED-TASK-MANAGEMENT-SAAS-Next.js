"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function CustomCursor() {
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
    <>
      {/* Background Soft Glow following cursor in Cyan/Emerald */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{ opacity: isVisible ? 0.38 : 0 }}
        transition={{ duration: 0.3 }}
        className="pointer-events-none fixed top-0 left-0 z-30 h-[420px] w-[420px] rounded-full blur-[110px] will-change-transform"
        aria-hidden="true"
      >
        <div className="h-full w-full rounded-full bg-gradient-to-r from-[#00c2ff]/40 via-[#009f9d]/30 to-[#00e599]/30" />
      </motion.div>

      {/* Tiny subtle tactile cursor dot */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{ opacity: isVisible ? 0.6 : 0 }}
        className="pointer-events-none fixed top-0 left-0 z-50 h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#00c2ff]"
        aria-hidden="true"
      />
    </>
  );
}
