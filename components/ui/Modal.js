"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, CheckCircle2, ArrowRight, ShieldCheck } from "lucide-react";
import Button from "./Button";
import TaskAuraLogo from "./TaskAuraLogo";
import confetti from "canvas-confetti";
import { playClickSound, playSuccessSound } from "@/lib/sound";

export default function Modal({ isOpen, onClose, initialMode = "signup" }) {
  const router = useRouter();
  const [mode, setMode] = useState(initialMode);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setMode(initialMode || "signup");
      setSubmitted(false);
    }
  }, [isOpen, initialMode]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    playSuccessSound();
    setSubmitted(true);
    try {
      confetti({
        particleCount: 85,
        spread: 75,
        origin: { y: 0.6 },
        colors: ["#00c2ff", "#009f9d", "#00e599", "#fbbf24", "#050b1a"],
      });
    } catch (err) {}
  };

  const handleClose = () => {
    playClickSound();
    setSubmitted(false);
    setEmail("");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-[#050b1a]/75 backdrop-blur-md"
          />

          {/* Modal Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-3xl border border-cyan-500/30 bg-white p-6 sm:p-8 shadow-2xl z-10 scrollbar-thin"
          >
            {/* Ambient Cyan/Teal Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-24 bg-gradient-to-r from-cyan-400/20 via-teal-400/20 to-emerald-400/20 blur-2xl pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-5 right-5 rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {!submitted ? (
              <div className="flex flex-col items-center text-center">
                <div className="mb-4">
                  <TaskAuraLogo size="md" isDark={false} showAiBadge={false} />
                </div>

                <h3 className="text-2xl font-black tracking-tight text-[#050b1a]">
                  {mode === "login" ? "Welcome back to TaskAura" : "Start your 14-day free trial"}
                </h3>
                <p className="mt-1.5 text-xs sm:text-sm text-slate-600">
                  {mode === "login"
                    ? "Enter your workspace email to resume building."
                    : "Experience self-driving AI project management. No credit card required."}
                </p>

                {/* Social Login Buttons */}
                <div className="mt-6 flex flex-col gap-2.5 w-full">
                  <button
                    type="button"
                    onClick={() => {
                      playClickSound();
                      setEmail("alex@vanguard.ai");
                      playSuccessSound();
                      onClose();
                      router.push("/workspace");
                    }}
                    className="flex items-center justify-center gap-3 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50 hover:border-cyan-400/60 shadow-xs transition-all cursor-pointer"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      />
                    </svg>
                    <span>Continue with Google</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      playClickSound();
                      setEmail("developer@github.com");
                      playSuccessSound();
                      onClose();
                      router.push("/workspace");
                    }}
                    className="flex items-center justify-center gap-3 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50 hover:border-cyan-400/60 shadow-xs transition-all cursor-pointer"
                  >
                    <svg className="w-4 h-4 text-slate-900 fill-current" viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                    <span>Continue with GitHub</span>
                  </button>
                </div>

                <div className="relative my-5 w-full">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-3 text-slate-400 font-medium tracking-wider">
                      Or with work email
                    </span>
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3">
                  <div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@company.com"
                      required
                      className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="aura"
                    size="md"
                    className="w-full"
                    rightIcon={ArrowRight}
                  >
                    {mode === "login" ? "Sign In to TaskAura" : "Create Free Workspace"}
                  </Button>
                </form>

                {/* Mode toggle */}
                <div className="mt-5 text-xs text-slate-500">
                  {mode === "login" ? (
                    <span>
                      Don't have an account?{" "}
                      <button
                        type="button"
                        onClick={() => {
                          playClickSound();
                          setMode("signup");
                        }}
                        className="font-bold text-teal-600 hover:underline"
                      >
                        Sign up free
                      </button>
                    </span>
                  ) : (
                    <span>
                      Already have an account?{" "}
                      <button
                        type="button"
                        onClick={() => {
                          playClickSound();
                          setMode("login");
                        }}
                        className="font-bold text-teal-600 hover:underline"
                      >
                        Log in
                      </button>
                    </span>
                  )}
                </div>

                <div className="mt-4 flex items-center gap-1.5 text-[11px] text-slate-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Enterprise SOC-2 Type II Certified & End-to-End Encrypted</span>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center py-6 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200 shadow-sm mb-4">
                  <CheckCircle2 className="h-9 w-9" />
                </div>
                <h3 className="text-2xl font-bold text-[#050b1a]">
                  Workspace Ready!
                </h3>
                <p className="mt-2 text-sm text-slate-600 max-w-xs">
                  We've initialized your workspace for{" "}
                  <span className="font-semibold text-slate-900">{email}</span>.
                </p>

                <div className="mt-6 w-full rounded-xl bg-cyan-50/80 border border-cyan-200/60 p-3.5 text-xs text-cyan-950 text-left flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 shrink-0 text-cyan-600 mt-0.5" />
                  <span>
                    Your AI Copilot demo environment has been initialized with the new Cyan/Emerald/Gold telemetry engine.
                  </span>
                </div>

                <Button
                  variant="aura"
                  size="md"
                  className="mt-6 w-full"
                  onClick={() => {
                    handleClose();
                    router.push("/workspace");
                  }}
                >
                  Enter TaskAura Workspace
                </Button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
