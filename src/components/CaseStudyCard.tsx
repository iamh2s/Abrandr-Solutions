"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { TrendingUp, ArrowUpRight, Play } from "lucide-react";
import { useRef, useState } from "react";

interface Props {
  title: string;
  client: string;
  category: string;
  metric: string;
  description: string;
  color: string;
  image?: string;   // optional poster/fallback image
  video?: string;   // new: video path e.g. "/Health_care.mp4"
}

export default function CaseStudyCard({
  title,
  client,
  category,
  metric,
  description,
  color,
  image,
  video,
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  return (
    <Link href="/work" className="group block h-full">
      <motion.div
        whileHover={{ y: -8 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="glass-card rounded-2xl overflow-hidden h-full flex flex-col relative"
      >
        {/* Media area with zoom & parallax */}
        <div className="h-52 relative overflow-hidden">
          <motion.div
            className="absolute inset-0"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {video ? (
              <video
                ref={videoRef}
                src={video}
                poster={image}
                muted
                loop
                playsInline
                preload="metadata"
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : image ? (
              <Image
                src={image}
                alt={`${title} — ${client} case study`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <div className={`w-full h-full bg-gradient-to-br ${color}`} />
            )}
          </motion.div>

          {/* Gradient overlays */}
          <div className={`absolute inset-0 bg-gradient-to-t ${color} opacity-30 mix-blend-multiply pointer-events-none`} />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-card/80 via-transparent to-transparent pointer-events-none" />

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-brand/0 group-hover:bg-brand/10 transition-colors duration-500 z-[1] pointer-events-none" />

          {/* Play indicator (visible when video not playing) */}
          {video && !isPlaying && (
            <div className="absolute top-3 right-3 z-[3]">
              <motion.div
                className="w-9 h-9 rounded-full bg-brand/90 backdrop-blur-sm flex items-center justify-center shadow-lg shadow-brand/30"
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Play size={14} className="text-white ml-0.5" fill="white" />
              </motion.div>
            </div>
          )}

          {/* Arrow on hover */}
          <div className="absolute inset-0 flex items-center justify-center z-[2] opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none">
            <motion.div
              className="w-12 h-12 rounded-full bg-brand/90 backdrop-blur-sm flex items-center justify-center shadow-lg shadow-brand/20"
              initial={{ scale: 0.6, opacity: 0 }}
              whileHover={{ scale: 1.1 }}
            >
              <ArrowUpRight size={20} className="text-white" />
            </motion.div>
          </div>

          {/* Scan line */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.03] to-transparent z-[1] pointer-events-none"
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
          />

          {/* Client name badge */}
          <div className="absolute bottom-3 left-3 z-[3]">
            <span className="text-xs font-semibold bg-black/40 backdrop-blur-md text-white/90 px-2.5 py-1 rounded-full border border-white/10">
              {client}
            </span>
          </div>
        </div>

        <div className="p-6 flex-1 flex flex-col">
          <p className="text-xs text-brand font-medium uppercase tracking-wider mb-2">
            {category}
          </p>
          <h3 className="text-lg font-semibold text-dark-heading mb-2 group-hover:text-brand transition-colors duration-300">
            {title}
          </h3>
          <p className="text-sm text-dark-text mb-4 flex-1">
            {description}
          </p>
          <motion.div
            className="flex items-center gap-2 text-brand font-semibold text-sm"
            whileHover={{ x: 4 }}
            transition={{ duration: 0.2 }}
          >
            <TrendingUp size={16} />
            {metric}
          </motion.div>
        </div>

        {/* Bottom highlight */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand/0 group-hover:via-brand/40 to-transparent transition-all duration-500" />
      </motion.div>
    </Link>
  );
}