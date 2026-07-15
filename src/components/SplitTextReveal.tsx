"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface Props {
  text: string;
  className?: string;
  delay?: number;
  wordBased?: boolean;
}

export default function SplitTextReveal({ text, className = "", delay = 0, wordBased = false }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  const units = wordBased ? text.split(" ") : text.split("");
  const easing: [number, number, number, number] = [0.22, 1, 0.36, 1];

  return (
    <span ref={ref} className={className} aria-label={text}>
      {units.map((unit, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: "100%", opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 }}
            transition={{
              duration: 0.5,
              delay: delay + i * (wordBased ? 0.08 : 0.025),
              ease: easing,
            }}
          >
            {unit}
            {wordBased && i < units.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
