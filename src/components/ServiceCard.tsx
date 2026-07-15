"use client";

import { motion } from "framer-motion";
import {
  Palette,
  Pen,
  Code,
  Smartphone,
  TrendingUp,
  Cloud,
  Lightbulb,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string; size?: number }>> = {
  Palette,
  Pen,
  Code,
  Smartphone,
  TrendingUp,
  Cloud,
  Lightbulb,
};

interface Props {
  iconName: string;
  title: string;
  description: string;
}

export default function ServiceCard({ iconName, title, description }: Props) {
  const Icon = iconMap[iconName] ?? Lightbulb;

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group glass-card rounded-2xl p-6 lg:p-8 h-full relative overflow-hidden"
    >
      {/* Hover glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10">
        <motion.div
          className="w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center mb-4 group-hover:bg-brand/20 transition-all duration-500"
          whileHover={{ rotate: [0, -10, 10, 0] }}
          transition={{ duration: 0.5 }}
        >
          <Icon className="text-brand" size={24} />
        </motion.div>
        <h3 className="text-lg font-semibold text-dark-heading mb-2 group-hover:text-brand transition-colors duration-300">
          {title}
        </h3>
        <p className="text-dark-text text-sm leading-relaxed">
          {description}
        </p>
      </div>

      {/* Corner decoration */}
      <div className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full bg-brand/[0.03] group-hover:bg-brand/[0.06] transition-all duration-500 group-hover:scale-150" />
    </motion.div>
  );
}
