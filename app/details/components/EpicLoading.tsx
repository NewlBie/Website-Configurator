"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Loader2, Zap, Shield, Cpu, Layout } from "lucide-react";

const statuses = [
  { text: "Initializing Core Framework...", icon: Layout, color: "text-blue-400" },
  { text: "Synthesizing Feature Ecosystem...", icon: Cpu, color: "text-emerald-400" },
  { text: "Hardening Security Architecture...", icon: Shield, color: "text-purple-400" },
  { text: "Optimizing Performance Vectors...", icon: Zap, color: "text-amber-400" },
  { text: "Finalizing Your Digital Strategy...", icon: Loader2, color: "text-white" },
];

export function EpicLoading({ onComplete }: { onComplete: () => void }) {
  const [statusIndex, setStatusIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const statusInterval = setInterval(() => {
      setStatusIndex((prev) => (prev < statuses.length - 1 ? prev + 1 : prev));
    }, 800);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 1;
      });
    }, 35);

    return () => {
      clearInterval(statusInterval);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  const CurrentIcon = statuses[statusIndex].icon;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-[#0a0a0a] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background Animated Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-emerald-500/20 to-transparent rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-blue-500/20 to-transparent rounded-full blur-[120px]"
        />
      </div>

      {/* Central Content */}
      <div className="relative z-10 flex flex-col items-center max-w-md w-full px-10">
        <div className="relative mb-12">
          {/* Main Orb */}
          <motion.div
            animate={{
              boxShadow: [
                "0 0 40px rgba(52, 211, 153, 0.2)",
                "0 0 80px rgba(52, 211, 153, 0.4)",
                "0 0 40px rgba(52, 211, 153, 0.2)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-24 h-24 rounded-3xl bg-gradient-to-br from-emerald-400 to-blue-600 flex items-center justify-center relative overflow-hidden"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={statusIndex}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="text-black"
              >
                <CurrentIcon size={40} strokeWidth={2.5} />
              </motion.div>
            </AnimatePresence>
            
            {/* Inner Shimmer */}
            <motion.div
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
            />
          </motion.div>

          {/* Orbiting Particles */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ rotate: 360 }}
              transition={{ duration: 3 + i, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 -m-4"
            >
              <div className="w-2 h-2 rounded-full bg-white/20 absolute top-0 left-1/2" />
            </motion.div>
          ))}
        </div>

        {/* Status Text */}
        <div className="text-center h-16 mb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={statusIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col gap-2"
            >
              <h3 className={`text-lg font-bold tracking-tight ${statuses[statusIndex].color}`}>
                {statuses[statusIndex].text}
              </h3>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-[0.3em]">
                Project Synthesis in Progress
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress Bar Container */}
        <div className="w-full">
          <div className="flex justify-between items-end mb-3">
            <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">
              Optimization Level
            </span>
            <span className="text-sm font-black text-white tabular-nums">
              {progress}%
            </span>
          </div>
          <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden p-0.5 border border-white/5">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-400 via-blue-500 to-purple-600 rounded-full shadow-[0_0_15px_rgba(52,211,153,0.5)]"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
        </div>

        {/* Branding */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-20 flex items-center gap-3 opacity-30 grayscale"
        >
          <div className="w-6 h-6 rounded bg-white flex items-center justify-center">
            <span className="text-[10px] font-black text-black">NB</span>
          </div>
          <span className="text-xs font-black uppercase tracking-widest text-white">NEWLBIE STRATEGY</span>
        </motion.div>
      </div>
    </motion.div>
  );
}
