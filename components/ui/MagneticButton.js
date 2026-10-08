"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { playHoverSound, playClickSound } from "@/lib/sound";

export default function MagneticButton({
  children,
  className = "",
  onClick,
  strength = 0.35,
  ...props
}) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * strength, y: middleY * strength });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const handleMouseEnter = () => {
    playHoverSound();
  };

  const handleClick = (e) => {
    playClickSound();
    if (onClick) onClick(e);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 350, damping: 20, mass: 0.5 }}
      className={`inline-block ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}
