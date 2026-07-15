"use client";

import { motion } from "framer-motion";

interface Props {
  items: string[];
  speed?: number;
  reverse?: boolean;
  className?: string;
}

export default function InfiniteMarquee({ items, speed = 100, reverse = false, className = "" }: Props) {
  const doubled = [...items, ...items];

  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{ x: reverse ? ["0%", "50%"] : ["0%", "-50%"] }}
        transition={{
          x: {
            duration: speed,
            repeat: Infinity,
            ease: "linear",
          },
        }}
      >
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="text-6xl sm:text-7xl lg:text-8xl font-black text-dark-heading/[0.04] uppercase tracking-wider shrink-0 select-none font-display"
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
