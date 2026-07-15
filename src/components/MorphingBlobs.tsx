"use client";

import { motion } from "framer-motion";

export default function MorphingBlobs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Primary orb */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full bg-brand/[0.07] blur-[100px]"
        animate={{
          x: ["-10%", "5%", "-15%", "0%", "-10%"],
          y: ["-5%", "10%", "5%", "-10%", "-5%"],
          scale: [1, 1.2, 0.9, 1.1, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        style={{ top: "-10%", right: "-5%" }}
      />
      {/* Secondary orb */}
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full bg-brand/[0.04] blur-[80px]"
        animate={{
          x: ["5%", "-10%", "10%", "-5%", "5%"],
          y: ["10%", "-5%", "-10%", "5%", "10%"],
          scale: [1.1, 0.9, 1.15, 1, 1.1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        style={{ bottom: "-15%", left: "-10%" }}
      />
      {/* Warm accent orb */}
      <motion.div
        className="absolute w-[250px] h-[250px] rounded-full bg-rose-400/[0.04] blur-[60px]"
        animate={{
          x: ["0%", "15%", "-10%", "5%", "0%"],
          y: ["0%", "-15%", "10%", "-5%", "0%"],
          scale: [1, 1.3, 0.85, 1.15, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        style={{ top: "40%", left: "30%" }}
      />
      {/* Top-left ghost orb */}
      <motion.div
        className="absolute w-[350px] h-[350px] rounded-full bg-brand/[0.03] blur-[90px]"
        animate={{
          x: ["-5%", "10%", "-8%", "3%", "-5%"],
          y: ["5%", "-10%", "8%", "-3%", "5%"],
          scale: [1, 1.15, 0.95, 1.1, 1],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        style={{ top: "10%", left: "-8%" }}
      />
      {/* Bottom-right ember */}
      <motion.div
        className="absolute w-[200px] h-[200px] rounded-full bg-red-500/[0.05] blur-[70px]"
        animate={{
          scale: [1, 1.4, 0.8, 1.2, 1],
          opacity: [0.5, 1, 0.4, 0.9, 0.5],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        style={{ bottom: "15%", right: "10%" }}
      />

      {/* Grid lines with fade */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(239,68,68,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(239,68,68,0.3) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(ellipse 60% 60% at 50% 50%, black, transparent)",
          WebkitMaskImage: "radial-gradient(ellipse 60% 60% at 50% 50%, black, transparent)",
        }}
      />

      {/* Orbiting particles */}
      <motion.div
        className="absolute w-2 h-2 rounded-full bg-brand/40"
        style={{ top: "50%", left: "50%" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute w-1.5 h-1.5 rounded-full bg-brand/50" style={{ transform: "translateX(120px)" }} />
      </motion.div>
      <motion.div
        className="absolute w-2 h-2 rounded-full bg-brand/20"
        style={{ top: "50%", left: "50%" }}
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute w-1 h-1 rounded-full bg-rose-300/40" style={{ transform: "translateX(200px)" }} />
      </motion.div>
      {/* Third orbit */}
      <motion.div
        className="absolute w-1 h-1 rounded-full bg-brand/10"
        style={{ top: "50%", left: "50%" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute w-1 h-1 rounded-full bg-brand/30" style={{ transform: "translateX(280px)" }} />
      </motion.div>
    </div>
  );
}
