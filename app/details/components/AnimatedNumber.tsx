"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function AnimatedNumber({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 250,
  });

  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    motionValue.set(value);
    setIsUpdating(true);
    const timer = setTimeout(() => setIsUpdating(false), 800);
    return () => clearTimeout(timer);
  }, [motionValue, value]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Intl.NumberFormat("en-IN").format(
          Math.round(latest)
        );
      }
    });
  }, [springValue]);

  return (
    <motion.span 
      ref={ref} 
      animate={{ 
        color: isUpdating ? "#34d399" : "rgba(255, 255, 255, 0.9)",
        textShadow: isUpdating ? "0 0 8px rgba(52, 211, 153, 0.5)" : "none"
      }}
      transition={{ duration: 0.4 }}
    />
  );
}
