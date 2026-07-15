"use client";

import { motion } from "framer-motion";

export default function GridBeams() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Vertical beams */}
      {[15, 35, 55, 75, 95].map((left, i) => (
        <motion.div
          key={`v-${i}`}
          className="absolute top-0 bottom-0 w-px"
          style={{ left: `${left}%` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.04, 0.02, 0.05, 0] }}
          transition={{ duration: 6 + i * 2, repeat: Infinity, delay: i * 0.8 }}
        >
          <motion.div
            className="w-full bg-gradient-to-b from-transparent via-brand/30 to-transparent"
            style={{ height: "30%" }}
            animate={{ y: ["-30%", "130%"] }}
            transition={{ duration: 4 + i, repeat: Infinity, ease: "linear", delay: i * 1.5 }}
          />
        </motion.div>
      ))}

      {/* Horizontal beams */}
      {[20, 50, 80].map((top, i) => (
        <motion.div
          key={`h-${i}`}
          className="absolute left-0 right-0 h-px"
          style={{ top: `${top}%` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.03, 0.01, 0.04, 0] }}
          transition={{ duration: 8 + i * 2, repeat: Infinity, delay: i * 1.2 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-transparent via-brand/20 to-transparent"
            style={{ width: "20%" }}
            animate={{ x: ["-20%", "120%"] }}
            transition={{ duration: 5 + i, repeat: Infinity, ease: "linear", delay: i * 2 }}
          />
        </motion.div>
      ))}
    </div>
  );
}
