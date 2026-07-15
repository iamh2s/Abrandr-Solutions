"use client";

import { motion } from "framer-motion";
import {
  CheckCircle,
  Palette,
  Pen,
  Code,
  Smartphone,
  TrendingUp,
  Cloud,
  Lightbulb,
} from "lucide-react";
import AnimatedSection from "./AnimatedSection";

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
  id: string;
  iconName: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  index: number;
}

export default function ServiceDetailCard({
  id,
  iconName,
  title,
  subtitle,
  description,
  deliverables,
  index,
}: Props) {
  const isEven = index % 2 === 0;
  const Icon = iconMap[iconName] ?? Lightbulb;

  return (
    <AnimatedSection variant={isEven ? "fadeLeft" : "fadeRight"} delay={0.1}>
      <motion.div
        id={id}
        className="scroll-mt-24 glass-card rounded-2xl p-6 sm:p-8 lg:p-12 group relative overflow-hidden"
        whileHover={{ scale: 1.01 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Hover gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand/[0.03] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        {/* Top line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand/0 group-hover:via-brand/30 to-transparent transition-all duration-700" />

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 relative z-10">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <motion.div
                className="w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center group-hover:bg-brand/20 transition-all duration-500"
                whileHover={{ rotate: [0, -5, 5, 0], scale: 1.1 }}
                transition={{ duration: 0.4 }}
              >
                <Icon className="text-brand" size={24} />
              </motion.div>
              <span className="text-xs text-dark-text font-mono tracking-wider">
                0{index + 1}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-dark-heading mb-2 group-hover:text-brand transition-colors duration-300">
              {title}
            </h2>
            <p className="text-brand font-medium mb-4">{subtitle}</p>
            <p className="text-dark-text leading-relaxed">{description}</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-dark-heading uppercase tracking-wider mb-4">
              Key Deliverables
            </h3>
            <ul className="grid sm:grid-cols-2 gap-3">
              {deliverables.map((item, i) => (
                <motion.li
                  key={item}
                  className="flex items-start gap-2 text-sm text-dark-text group/item"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.05, duration: 0.4 }}
                >
                  <CheckCircle
                    size={16}
                    className="text-brand shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform"
                  />
                  {item}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </AnimatedSection>
  );
}
