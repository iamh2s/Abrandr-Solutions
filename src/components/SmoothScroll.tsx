"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

const easing: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname}>
        {/* Page transition curtains */}
        <motion.div
          className="fixed inset-0 z-[100] bg-brand pointer-events-none origin-bottom"
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          exit={{ scaleY: 1 }}
          transition={{ duration: 0.5, ease: easing }}
        />
        <motion.div
          className="fixed inset-0 z-[99] bg-dark-card pointer-events-none origin-bottom"
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          exit={{ scaleY: 1 }}
          transition={{ duration: 0.5, ease: easing, delay: 0.08 }}
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
