"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function PageTransition({ children }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Slide-up reveal overlay */}
      <motion.div
        className="fixed inset-0 z-[100] bg-brand pointer-events-none origin-bottom"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      />
      <motion.div
        className="fixed inset-0 z-[99] bg-dark pointer-events-none origin-bottom"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      />
      {children}
    </motion.div>
  );
}
