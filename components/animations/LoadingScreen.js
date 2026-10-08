"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen({ onComplete }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      if (onComplete) onComplete();
    }, 1400);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050b1a] overflow-hidden"
        >
          {/* Cyan / Emerald glowing aura blobs */}
          <div className="absolute w-[450px] h-[450px] rounded-full bg-cyan-500/20 blur-[120px] animate-pulse" />
          <div className="absolute w-[350px] h-[350px] rounded-full bg-emerald-500/15 blur-[100px]" />

          {/* Logo container with scale, glow, and particle shimmer */}
          <div className="relative flex flex-col items-center z-10">
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex items-center justify-center"
            >
              <img
                src="/taskaura-logo-dark.png?v=3"
                alt="TaskAura"
                className="h-16 sm:h-20 w-auto object-contain drop-shadow-2xl"
              />
            </motion.div>

            {/* Title shimmer */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-5 flex items-center gap-2"
            >
              <span className="text-2xl font-black tracking-tight text-white">
                Task
              </span>
              <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-[#00c2ff] via-[#009f9d] to-[#00e599] bg-clip-text text-transparent">
                Aura
              </span>
            </motion.div>

            {/* Subtle loading line */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 140 }}
              transition={{ delay: 0.2, duration: 0.9, ease: "easeInOut" }}
              className="mt-4 h-0.5 rounded-full bg-gradient-to-r from-[#00c2ff] via-[#00e599] to-[#fbbf24]"
            />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              transition={{ delay: 0.5 }}
              className="mt-3 text-[11px] font-mono tracking-widest uppercase text-cyan-300/70"
            >
              INITIALIZING AI ENGINE...
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
