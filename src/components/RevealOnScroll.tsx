"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  width?: "full" | "content";
}

export default function RevealOnScroll({ children, className = "", width = "full" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.3"],
  });

  const clipProgress = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);

  return (
    <div ref={ref} className={width === "full" ? "w-full" : ""}>
      <motion.div
        style={{
          opacity,
          scale,
          clipPath: useTransform(clipProgress, (v) => `inset(0 ${100 - v}% 0 0)`),
        }}
        className={className}
      >
        {children}
      </motion.div>
    </div>
  );
}
