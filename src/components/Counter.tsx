"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface Props {
  end: number;
  suffix?: string;
  prefix?: string;
  label: string;
  duration?: number;
}

const easing: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function Counter({ end, suffix = "", prefix = "", label, duration = 2 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const step = end / (duration * 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [isInView, end, duration]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: easing }}
      className="text-center group"
    >
      <motion.div
        className="relative inline-block"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
      >
        <span className="text-4xl sm:text-5xl lg:text-6xl font-bold text-dark-heading tabular-nums font-display">
          {prefix}
          {count}
          {suffix}
        </span>
        {/* Glow behind number */}
        <motion.div
          className="absolute -inset-4 bg-brand/5 rounded-2xl -z-10"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4, ease: easing }}
        className="mt-3 text-sm sm:text-base text-dark-text uppercase tracking-wider"
      >
        {label}
      </motion.div>
      {/* Divider line */}
      <motion.div
        className="h-px bg-gradient-to-r from-transparent via-brand/30 to-transparent mt-4 mx-auto max-w-[60px]"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.5, ease: easing }}
      />
    </motion.div>
  );
}
