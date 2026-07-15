"use client";

import Link from "next/link";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef, useEffect, useState } from "react";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];
const springCfg = { stiffness: 380, damping: 38, mass: 0.5 };

// ─── Word cycler ──────────────────────────────────────────────────────────────
const WORDS = ["brands", "products", "ventures", "visions", "futures"];
function CyclingWord() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % WORDS.length), 2600);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="relative inline-block overflow-hidden align-bottom" style={{ minWidth: "5ch" }}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={WORDS[idx]}
          className="block"
          style={{ color: "#ef4444" }}
          initial={{ y: "110%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-110%", opacity: 0 }}
          transition={{ duration: 0.48, ease }}
        >
          {WORDS[idx]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

// ─── Single clean orb ─────────────────────────────────────────────────────────
function OrbLayer() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-[1]">
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 800,
          height: 800,
          top: -260,
          left: "50%",
          transform: "translateX(-50%)",
          background: "radial-gradient(circle, rgba(220,38,38,0.22) 0%, rgba(185,28,28,0.08) 45%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.07, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 500,
          height: 500,
          bottom: -180,
          right: "15%",
          background: "radial-gradient(circle, rgba(239,68,68,0.12) 0%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.1, 1], x: [0, -20, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
    </div>
  );
}

// ─── Scan lines ───────────────────────────────────────────────────────────────
function ScanLines() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[2]">
      {[15, 38, 62, 85].map((top, i) => (
        <motion.div
          key={top}
          className="absolute left-0 right-0 h-px"
          style={{
            top: `${top}%`,
            background: "linear-gradient(90deg, transparent, rgba(239,68,68,0.2) 50%, transparent)",
          }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.6, delay: 0.5 + i * 0.14, ease }}
        />
      ))}
    </div>
  );
}

// ─── Floating stat chips ──────────────────────────────────────────────────────
const CHIPS = [
  { label: "Countries", value: "30+", x: "6%", y: "30%" },
  { label: "Projects", value: "200+", x: "82%", y: "24%" },
  { label: "Avg. ROAS", value: "4.8×", x: "85%", y: "70%" },
];
function FloatingChips() {
  return (
    <>
      {CHIPS.map((chip, i) => (
        <motion.div
          key={chip.label}
          className="absolute hidden lg:flex flex-col items-center gap-0.5 rounded-xl px-4 py-2.5 z-[4]"
          style={{
            left: chip.x,
            top: chip.y,
            background: "rgba(220,38,38,0.08)",
            border: "1px solid rgba(220,38,38,0.2)",
          }}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 1.5 + i * 0.14, ease }}
        >
          <span className="text-xl font-bold text-white leading-none">{chip.value}</span>
          <span className="text-[11px] uppercase tracking-widest" style={{ color: "#f87171" }}>
            {chip.label}
          </span>
        </motion.div>
      ))}
    </>
  );
}

// ─── Letter stagger reveal ────────────────────────────────────────────────────
function StaggerText({ text, delay = 0, className = "" }: { text: string; delay?: number; className?: string }) {
  return (
    <span className={className} aria-label={text}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          style={{ display: "inline-block", whiteSpace: "pre" }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: delay + i * 0.028, ease }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

// ─── Animated counter ─────────────────────────────────────────────────────────
function Counter({ to, suffix = "", delay = 0 }: { to: number; suffix?: string; delay?: number }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => {
      let start = 0;
      const step = Math.ceil(to / 40);
      const iv = setInterval(() => {
        start = Math.min(start + step, to);
        setVal(start);
        if (start >= to) clearInterval(iv);
      }, 30);
    }, delay * 1000);
    return () => clearTimeout(timer);
  }, [to, delay]);
  return <>{val}{suffix}</>;
}

// ─── Pulsing red dot ──────────────────────────────────────────────────────────
function PulseDot() {
  return (
    <span className="relative inline-flex items-center justify-center w-3 h-3">
      <motion.span
        className="absolute inline-flex rounded-full"
        style={{ width: 12, height: 12, background: "#ef4444" }}
        animate={{ scale: [1, 2.2, 1], opacity: [0.8, 0, 0.8] }}
        transition={{ duration: 1.8, repeat: Infinity }}
      />
      <span className="relative inline-flex rounded-full w-2 h-2" style={{ background: "#ef4444" }} />
    </span>
  );
}

// ─── Main hero ────────────────────────────────────────────────────────────────
export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const raw = useSpring(scrollYProgress, springCfg);
  const contentY = useTransform(raw, [0, 1], [0, 50]);
  const contentOpacity = useTransform(raw, [0, 1], [1, 0]);
  const contentScale = useTransform(raw, [0, 0.10], [0.95, 1]);
  const bgY = useTransform(raw, [0, 1], [0, 70]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "#0a0808" }}
    >
      {/* BG */}
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        <OrbLayer />
      </motion.div>

      <ScanLines />
      <FloatingChips />

      {/* Edge vignette */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{ boxShadow: "inset 0 0 130px 50px #0a0808" }}
      />

      {/* ── CONTENT ── */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity, scale: contentScale, willChange: "transform, opacity" }}
        className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 lg:pt-36 lg:pb-28 text-center"
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.1, ease }}
          className="mb-8 inline-flex"
        >
          <span
            className="inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.18em] rounded-full px-5 py-2"
            style={{
              color: "#f87171",
              border: "1px solid rgba(239,68,68,0.3)",
              background: "rgba(239,68,68,0.08)",
            }}
          >
            <PulseDot />
            Trusted in 30+ countries
          </span>
        </motion.div>

        {/* Line 1 — staggered letters */}
        <div className="mb-1 overflow-hidden">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-white leading-[1.05] tracking-tight">
            <StaggerText text="We don't just build." delay={0.22} />
          </h1>
        </div>

        {/* Line 2 — cycling word */}
        <div className="mb-8 overflow-hidden">
          <motion.h1
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: "0%" }}
            transition={{ duration: 0.8, delay: 0.9, ease }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-white leading-[1.05] tracking-tight"
          >
            We ignite <CyclingWord />.
          </motion.h1>
        </div>

        {/* Sub text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0, ease }}
          className="text-lg sm:text-xl max-w-xl mx-auto mb-12 leading-relaxed"
          style={{ color: "rgba(255,255,255,0.45)" }}
        >
          Bold strategy. Obsessive design. Bulletproof engineering — fused into
          digital products that don't just perform. They dominate.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.15, ease }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link
            href="/contact"
            className="group relative inline-flex items-center gap-2 text-white font-semibold px-8 py-4 rounded-full text-base overflow-hidden transition-all duration-300"
            style={{ background: "#dc2626" }}
          >
            <motion.span
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"
              style={{ background: "#b91c1c" }}
            />
            <span className="relative z-10 flex items-center gap-2">
              Let's build something epic
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.3, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowUpRight size={18} />
              </motion.span>
            </span>
          </Link>

          <Link
            href="/work"
            className="group inline-flex items-center gap-2 font-medium px-8 py-4 rounded-full text-base transition-all duration-300"
            style={{
              color: "rgba(255,255,255,0.6)",
              border: "1px solid rgba(255,255,255,0.12)",
            }}
          >
            See the proof
            <ArrowUpRight size={18} className="opacity-40 group-hover:opacity-100 transition-opacity" />
          </Link>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.35, ease }}
          className="mt-16 flex flex-wrap justify-center gap-10 lg:gap-16"
        >
          {[
            { to: 30, suffix: "+", label: "Countries" },
            { to: 200, suffix: "+", label: "Projects shipped" },
            { to: 98, suffix: "%", label: "Client retention" },
          ].map((s, i) => (
            <div key={s.label} className="flex flex-col items-center gap-1">
              <span className="text-3xl font-extrabold" style={{ color: "#ef4444" }}>
                <Counter to={s.to} suffix={s.suffix} delay={1.4 + i * 0.1} />
              </span>
              <span className="text-xs uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.3)" }}>
                {s.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Brand strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.6 }}
          className="mt-14"
        >
          <p className="text-[10px] uppercase tracking-[0.22em] mb-5" style={{ color: "rgba(255,255,255,0.2)" }}>
            Powering the brands shaping tomorrow
          </p>
          <div className="flex flex-wrap justify-center gap-8 lg:gap-12">
            {["NovaPay", "LuxeCart", "MediConnect", "TechVault", "CloudSync"].map((brand, i) => (
              <motion.span
                key={brand}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 0.25, y: 0 }}
                whileHover={{ opacity: 0.75, scale: 1.04, color: "#f87171" }}
                transition={{ duration: 0.45, delay: 1.75 + i * 0.08 }}
                className="text-sm font-bold text-white tracking-wider cursor-default"
              >
                {brand}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll caret */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <motion.span
          animate={{ opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: 2.2, repeat: Infinity }}
          className="text-[9px] uppercase tracking-[0.3em]"
          style={{ color: "rgba(255,255,255,0.25)" }}
        >
          Scroll
        </motion.span>
        <div
          className="relative w-5 h-9 rounded-full flex items-start justify-center pt-1.5"
          style={{ border: "1px solid rgba(239,68,68,0.25)" }}
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-1 rounded-full"
            style={{ background: "#ef4444" }}
          />
        </div>
      </motion.div>
    </section>
  );
}