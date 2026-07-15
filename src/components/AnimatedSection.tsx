"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: "fadeUp" | "fadeLeft" | "fadeRight" | "scaleUp" | "clipReveal";
}

const easing: [number, number, number, number] = [0.22, 1, 0.36, 1];

const animationVariants: Record<string, Variants> = {
  fadeUp: {
    hidden: { opacity: 0, y: 50, filter: "blur(4px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)" },
  },
  fadeLeft: {
    hidden: { opacity: 0, x: -60, filter: "blur(4px)" },
    visible: { opacity: 1, x: 0, filter: "blur(0px)" },
  },
  fadeRight: {
    hidden: { opacity: 0, x: 60, filter: "blur(4px)" },
    visible: { opacity: 1, x: 0, filter: "blur(0px)" },
  },
  scaleUp: {
    hidden: { opacity: 0, scale: 0.85, filter: "blur(6px)" },
    visible: { opacity: 1, scale: 1, filter: "blur(0px)" },
  },
  clipReveal: {
    hidden: { opacity: 0, clipPath: "inset(20% 0% 20% 0%)" },
    visible: { opacity: 1, clipPath: "inset(0% 0% 0% 0%)" },
  },
};

export default function AnimatedSection({
  children,
  className = "",
  delay = 0,
  variant = "fadeUp",
}: Props) {
  const v = animationVariants[variant];

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: v.hidden,
        visible: {
          ...(typeof v.visible === "object" ? v.visible : {}),
          transition: { duration: 0.8, delay, ease: easing },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
