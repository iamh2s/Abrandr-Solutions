"use client";

import { motion } from "framer-motion";

const shapes = [
  { size: 60, x: "10%", y: "15%", dur: 24, delay: 0, type: "ring" },
  { size: 80, x: "70%", y: "70%", dur: 28, delay: 1, type: "ring" },
  { size: 40, x: "25%", y: "80%", dur: 22, delay: 2, type: "dot" },
  { size: 45, x: "85%", y: "35%", dur: 26, delay: 1, type: "triangle" },
];

export default function FloatingShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {shapes.map((s, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: s.x, top: s.y }}
          animate={{
            y: [0, -30, 10, -20, 0],
            x: [0, 15, -10, 20, 0],
            rotate: [0, 90, 180, 270, 360],
          }}
          transition={{
            duration: s.dur,
            repeat: Infinity,
            ease: "easeInOut",
            delay: s.delay,
          }}
        >
          {s.type === "ring" && (
            <div
              className="rounded-full border border-brand/[0.08]"
              style={{ width: s.size, height: s.size }}
            />
          )}
          {s.type === "cross" && (
            <div className="relative" style={{ width: s.size, height: s.size }}>
              <div className="absolute top-1/2 left-0 w-full h-px bg-brand/[0.08] -translate-y-1/2" />
              <div className="absolute left-1/2 top-0 h-full w-px bg-brand/[0.08] -translate-x-1/2" />
            </div>
          )}
          {s.type === "dot" && (
            <div
              className="rounded-full bg-brand/[0.06]"
              style={{ width: s.size, height: s.size }}
            />
          )}
          {s.type === "triangle" && (
            <div
              className="border-l border-b border-brand/[0.08]"
              style={{ width: s.size, height: s.size, transform: "rotate(45deg)" }}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
}
