"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

interface Props {
  quote: string;
  name: string;
  role: string;
  rating: number;
}

export default function TestimonialCard({ quote, name, role, rating }: Props) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="glass-card rounded-2xl p-6 lg:p-8 h-full flex flex-col relative overflow-hidden group"
    >
      {/* Quote icon watermark */}
      <div className="absolute -top-2 -right-2 text-brand/[0.06] group-hover:text-brand/[0.12] transition-colors duration-500">
        <Quote size={80} />
      </div>

      {/* Top glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand/0 group-hover:via-brand/40 to-transparent transition-all duration-500" />

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex gap-1 mb-4">
          {Array.from({ length: rating }).map((_, j) => (
            <motion.div
              key={j}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: j * 0.1, duration: 0.3, type: "spring" }}
            >
              <Star size={16} className="fill-brand text-brand" />
            </motion.div>
          ))}
        </div>
        <blockquote className="text-dark-heading text-sm lg:text-base leading-relaxed mb-6 flex-1 italic">
          &ldquo;{quote}&rdquo;
        </blockquote>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand/30 to-brand-dark/30 flex items-center justify-center shrink-0">
            <span className="text-xs font-bold text-brand">
              {name.split(" ").map((n) => n[0]).join("")}
            </span>
          </div>
          <div>
            <p className="font-semibold text-dark-heading text-sm">
              {name}
            </p>
            <p className="text-dark-text text-xs">{role}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
