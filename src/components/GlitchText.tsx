"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

export default function GlitchText({ children, className = "" }: Props) {
  return (
    <span className={`relative inline-block ${className}`}>
      <span className="relative z-10">{children}</span>
      <motion.span
        className="absolute inset-0 text-brand/60 z-0"
        aria-hidden
        animate={{
          x: [0, -2, 3, -1, 0, 2, -3, 0],
          opacity: [0, 0.8, 0, 0.6, 0, 0.7, 0, 0],
        }}
        transition={{ duration: 3, repeat: Infinity, repeatDelay: 4, ease: "linear" }}
        style={{ clipPath: "inset(20% 0 60% 0)" }}
      >
        {children}
      </motion.span>
      <motion.span
        className="absolute inset-0 text-dark-heading/40 z-0"
        aria-hidden
        animate={{
          x: [0, 2, -3, 1, 0, -2, 3, 0],
          opacity: [0, 0.6, 0, 0.8, 0, 0.5, 0, 0],
        }}
        transition={{ duration: 3, repeat: Infinity, repeatDelay: 4, ease: "linear", delay: 0.1 }}
        style={{ clipPath: "inset(60% 0 10% 0)" }}
      >
        {children}
      </motion.span>
    </span>
  );
}
