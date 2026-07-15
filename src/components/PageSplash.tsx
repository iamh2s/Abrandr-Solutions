"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import Logo from "./Logo";

const quotesByPage: Record<string, string[]> = {
  "/": [
    "Design is not just what it looks like — design is how it works.",
    "The best way to predict the future is to create it.",
    "Simplicity is the ultimate sophistication.",
    "Good design is obvious. Great design is transparent.",
    "Make it simple, but significant.",
  ],
  "/services": [
    "The details are not the details. They make the design.",
    "Every great design begins with an even better story.",
    "Design adds value faster than it adds costs.",
    "Creativity is intelligence having fun.",
  ],
  "/work": [
    "Done is better than perfect.",
    "The only way to do great work is to love what you do.",
    "Quality means doing it right when no one is looking.",
    "Results happen over time, not overnight.",
  ],
  "/about": [
    "Culture eats strategy for breakfast.",
    "Great things in business are never done by one person.",
    "The strength of the team is each member.",
  ],
  "/careers": [
    "Choose a job you love and you will never work a day in your life.",
    "Opportunities don't happen. You create them.",
    "The future depends on what you do today.",
  ],
  "/blog": [
    "Knowledge is power. Sharing knowledge is powerful.",
    "Write to express, not to impress.",
    "Content is king, but context is God.",
  ],
  "/contact": [
    "A journey of a thousand miles begins with a single step.",
    "The best time to start was yesterday. The next best time is now.",
    "Every accomplishment starts with the decision to try.",
  ],
};

const fallbackQuotes = [
  "Design is thinking made visual.",
  "Everything is designed. Few things are designed well.",
  "Less is more.",
  "Stay hungry. Stay foolish.",
];

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];
const DURATION = 2000;

export default function PageSplash() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);
  const [quote, setQuote] = useState("");
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number>(0);
  const startRef = useRef<number>(0);
  const isAdmin = pathname.startsWith("/admin");

  const dismiss = useCallback(() => {
    setVisible(false);
    cancelAnimationFrame(rafRef.current);
  }, []);

  useEffect(() => {
    const key =
      Object.keys(quotesByPage).find(
        (k) => k === pathname || (k !== "/" && pathname.startsWith(k))
      ) || "/";
    const pool = quotesByPage[key] ?? fallbackQuotes;
    setQuote(pool[Math.floor(Math.random() * pool.length)]);
  }, [pathname]);

  useEffect(() => {
    if (isAdmin) { setVisible(false); return; }
    setVisible(true);
    setProgress(0);
    startRef.current = performance.now();

    const tick = (now: number) => {
      const p = Math.min((now - startRef.current) / DURATION, 1);
      setProgress(p);
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
      else setVisible(false);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [pathname, isAdmin]);

  if (isAdmin || !quote) return null;

  const circumference = 2 * Math.PI * 14;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key={`splash-${pathname}`}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center px-6"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease }}
          style={{ background: "#0a0505" }}
        >
          {/* Subtle red glow — CSS only, zero JS */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(160,10,10,0.07) 0%, transparent 70%)",
            }}
          />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center text-center w-full max-w-xl">

            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.1, ease }}
              className="mb-10 sm:mb-12"
            >
              <Logo className="text-2xl sm:text-3xl" />
            </motion.div>

            {/* Top accent line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.35, delay: 0.35, ease }}
              className="mb-8 sm:mb-10"
              style={{
                height: "1px",
                width: "40px",
                background: "#b41414",
                transformOrigin: "center",
              }}
            />

            {/* Quote */}
            <motion.blockquote
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.5, ease }}
            >
              <p
                style={{
                  fontSize: "clamp(15px, 2.2vw, 20px)",
                  fontStyle: "italic",
                  lineHeight: 1.7,
                  color: "rgba(255,255,255,0.82)",
                  fontFamily: "Georgia, 'Times New Roman', serif",
                  letterSpacing: "0.01em",
                }}
              >
                &ldquo;{quote}&rdquo;
              </p>
            </motion.blockquote>

            {/* Bottom accent line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.35, delay: 0.65, ease }}
              className="mt-8 sm:mt-10"
              style={{
                height: "1px",
                width: "40px",
                background: "#b41414",
                transformOrigin: "center",
              }}
            />
          </div>

          {/* Progress bar — top edge
          <div
            className="absolute top-0 left-0 h-[2px]"
            style={{
              width: `${progress * 100}%`,
              background: "#b41414",
              transition: "width 0.05s linear",
            }}
          /> */}

          {/* Skip — countdown ring */}
          {/* <motion.button
            className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.3 }}            
            onClick={dismiss}
            aria-label="Skip intro"
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              style={{ transform: "rotate(-90deg)", display: "block" }}
            >
              <circle
                cx="16" cy="16" r="14"
                fill="none"
                stroke="rgba(255,255,255,0.07)"
                strokeWidth="1.5"
              />
              <circle
                cx="16" cy="16" r="14"
                fill="none"
                stroke="#b41414"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={circumference * (1 - progress)}
                style={{ transition: "stroke-dashoffset 0.05s linear" }}
              />
            </svg>
            <span
              style={{
                fontSize: "9px",
                letterSpacing: "0.22em",
                color: "rgba(255,255,255,0.22)",
                textTransform: "uppercase",
              }}
            >
              skip
            </span>
          </motion.button> */}

          {/* Corner brackets */}
          {[
            { cls: "top-4 left-4",    s: { borderTop: "1px solid rgba(180,20,20,0.4)", borderLeft:  "1px solid rgba(180,20,20,0.4)" } },
            { cls: "top-4 right-4",   s: { borderTop: "1px solid rgba(180,20,20,0.4)", borderRight: "1px solid rgba(180,20,20,0.4)" } },
            { cls: "bottom-4 left-4", s: { borderBottom: "1px solid rgba(180,20,20,0.4)", borderLeft:  "1px solid rgba(180,20,20,0.4)" } },
            { cls: "bottom-4 right-4",s: { borderBottom: "1px solid rgba(180,20,20,0.4)", borderRight: "1px solid rgba(180,20,20,0.4)" } },
          ].map(({ cls, s }, i) => (
            <motion.div
              key={i}
              className={`absolute ${cls} pointer-events-none`}
              style={{ width: 18, height: 18, ...s }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.15 }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}