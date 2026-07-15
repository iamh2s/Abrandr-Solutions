"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Users, Globe, Zap } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const iconMap: Record<string, React.ComponentType<{ className?: string; size?: number }>> = {
  TrendingUp,
  Users,
  Globe,
  Zap,
};

interface Metric {
  label: string;
  value: string;
  iconName: string;
}

interface Project {
  slug: string;
  title: string;
  client: string;
  category: string;
  image?: string; // ✅ optional now
  video?: string;
  description: string;
  challenge: string;
  solution: string;
  metrics: Metric[];
  gradient: string;
  tags: string[];
}

interface Props {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: Props) {
  const isEven = index % 2 === 0;
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <AnimatedSection variant={isEven ? "fadeLeft" : "fadeRight"} delay={0.1}>
      <motion.div
        className="glass-card rounded-2xl overflow-hidden group relative"
        whileHover={{ scale: 1.005 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Top glow line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand/0 group-hover:via-brand/40 to-transparent transition-all duration-700 z-10" />

        <div className="grid lg:grid-cols-5 gap-0">

          {/* ================= MEDIA AREA ================= */}
          <div className="lg:col-span-2 relative overflow-hidden min-h-[280px] lg:min-h-full">

            {/* ✅ VIDEO FIRST (no image errors anymore) */}
            {project.video ? (
              <video
                ref={videoRef}
                src={project.video}
                muted
                loop
                playsInline
                preload="metadata"
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : project.image ? (
              <Image
                src={project.image}
                alt={`${project.title} — ${project.client}`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            ) : null}

            {/* Gradient overlays */}
            <div className={`absolute inset-0 bg-gradient-to-t ${project.gradient} opacity-40 mix-blend-multiply`} />
            <div className="absolute inset-0 bg-gradient-to-t from-dark/70 via-dark/20 to-transparent" />

            {/* Scan line effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.04] to-transparent z-[1]"
              animate={{ y: ["-100%", "200%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear", repeatDelay: 3 }}
            />

            {/* Tags */}
            <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-[3]">
              {project.tags.map((tag, i) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.06 }}
                  className="text-xs font-medium bg-black/40 backdrop-blur-md text-white/90 px-2.5 py-1 rounded-full border border-white/10"
                >
                  {tag}
                </motion.span>
              ))}
            </div>

            {/* Client watermark */}
            <div className="absolute bottom-4 left-4 z-[3]">
              <span className="text-white/60 font-bold text-sm tracking-wider uppercase">
                {project.client}
              </span>
            </div>

            {/* Live preview badge */}
            {project.video && (
              <div className="absolute bottom-4 right-4 z-[3] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-[10px] font-semibold bg-brand/80 backdrop-blur-sm text-white px-2 py-0.5 rounded-full uppercase tracking-wider">
                  ▶ Live Preview
                </span>
              </div>
            )}
          </div>

          {/* ================= CONTENT AREA ================= */}
          <div className="lg:col-span-3 p-6 sm:p-8 lg:p-10 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-brand/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            <div className="relative z-10">
              <p className="text-xs text-brand font-medium uppercase tracking-wider mb-2">
                {project.category}
              </p>

              <h2 className="text-2xl sm:text-3xl font-bold text-dark-heading mb-1 group-hover:text-brand transition-colors duration-300">
                {project.title}
              </h2>

              <p className="text-sm text-dark-text mb-4">
                Client: {project.client}
              </p>

              <p className="text-dark-text text-sm leading-relaxed mb-6">
                {project.description}
              </p>

              {/* Challenge & Solution */}
              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                <div className="p-3 rounded-lg bg-dark/40 border border-dark-border/50">
                  <h3 className="text-xs font-semibold text-brand uppercase tracking-wider mb-2">
                    Challenge
                  </h3>
                  <p className="text-xs text-dark-text leading-relaxed">
                    {project.challenge}
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-dark/40 border border-dark-border/50">
                  <h3 className="text-xs font-semibold text-brand uppercase tracking-wider mb-2">
                    Solution
                  </h3>
                  <p className="text-xs text-dark-text leading-relaxed">
                    {project.solution}
                  </p>
                </div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-4 pt-5 border-t border-dark-border">
                {project.metrics.map((metric, i) => {
                  const MetricIcon = iconMap[metric.iconName] ?? TrendingUp;

                  return (
                    <motion.div
                      key={metric.label}
                      className="text-center"
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + i * 0.1, duration: 0.4 }}
                    >
                      <MetricIcon size={16} className="text-brand mx-auto mb-1.5" />

                      <div className="text-xl sm:text-2xl font-bold text-brand">
                        {metric.value}
                      </div>

                      <div className="text-[10px] sm:text-xs text-dark-text uppercase tracking-wider mt-0.5">
                        {metric.label}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

            </div>
          </div>

        </div>
      </motion.div>
    </AnimatedSection>
  );
}