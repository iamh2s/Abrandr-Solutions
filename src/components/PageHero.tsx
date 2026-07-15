"use client";

import { motion } from "framer-motion";
import MorphingBlobs from "./MorphingBlobs";
import SplitTextReveal from "./SplitTextReveal";
import AnimatedSection from "./AnimatedSection";
import FloatingShapes from "./FloatingShapes";
import GridBeams from "./GridBeams";

interface Props {
  label: string;
  title: string;
  titleAccent: string;
  description: string;
}

const easing: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function PageHero({ label, title, titleAccent, description }: Props) {
  return (
      <section className="relative overflow-x-hidden overflow-y-hidden pt-28 lg:pt-36 pb-20 lg:pb-28 noise-bg">
      <MorphingBlobs />
      <FloatingShapes />
      <GridBeams />

      {/* Corner flares */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-brand/[0.05] to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-brand/[0.03] to-transparent pointer-events-none" />

      {/* Horizontal reveal lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[30, 60, 90].map((top, i) => (
          <motion.div
            key={top}
            className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-dark-border/30 to-transparent"
            style={{ top: `${top}%` }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, delay: 0.3 + i * 0.15, ease: easing }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <AnimatedSection>
            <p className="text-brand font-semibold text-sm uppercase tracking-wider mb-3">
              {label}
            </p>
          </AnimatedSection>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-dark-heading mb-6">
            <SplitTextReveal text={title + " "} delay={0.2} wordBased />
            <span className="gradient-text">
              <SplitTextReveal text={titleAccent} delay={0.5} wordBased />
            </span>
          </h1>
          <AnimatedSection delay={0.5}>
            <p className="text-lg sm:text-xl text-dark-text max-w-2xl">
              {description}
            </p>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
