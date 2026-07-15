"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
}

export default function TextReveal({ children, className = "", delay = 0, as = "div" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const Tag = as;

  return (
    <div ref={ref} className="overflow-hidden">
      <motion.div
        initial={{ y: "110%", rotateX: 25, opacity: 0 }}
        animate={isInView ? { y: 0, rotateX: 0, opacity: 1 } : { y: "110%", rotateX: 25, opacity: 0 }}
        transition={{
          duration: 0.9,
          delay,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{ transformOrigin: "bottom" }}
      >
        <Tag className={className}>{children}</Tag>
      </motion.div>
    </div>
  );
}
