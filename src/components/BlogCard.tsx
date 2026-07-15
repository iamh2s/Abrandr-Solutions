"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock, Tag } from "lucide-react";

interface Post {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  gradient: string;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogCard({ post }: { post: Post }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block h-full">
      <motion.article
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="glass-card rounded-2xl overflow-hidden h-full flex flex-col relative"
      >
        {/* Image area */}
        <div className={`h-40 bg-gradient-to-br ${post.gradient} flex items-center justify-center relative overflow-hidden`}>
          <motion.span
            className="text-7xl font-black text-white/10 select-none"
            whileHover={{ scale: 1.2, rotate: 5 }}
            transition={{ duration: 0.5 }}
          >
            {post.category[0]}
          </motion.span>
          {/* Scan line */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.03] to-transparent"
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
          />
        </div>

        <div className="p-6 flex-1 flex flex-col">
          <div className="flex items-center gap-3 text-xs text-dark-text mb-3">
            <span className="flex items-center gap-1">
              <Tag size={12} className="text-brand" />
              {post.category}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={12} />
              {post.readTime}
            </span>
          </div>
          <h2 className="text-lg font-semibold text-dark-heading mb-2 group-hover:text-brand transition-colors duration-300">
            {post.title}
          </h2>
          <p className="text-sm text-dark-text line-clamp-3 flex-1">
            {post.excerpt}
          </p>
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-dark-border">
            <time className="text-xs text-dark-text">{formatDate(post.date)}</time>
            <span className="text-brand text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all duration-300">
              Read More
              <ArrowUpRight size={14} />
            </span>
          </div>
        </div>

        {/* Bottom highlight */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand/0 group-hover:via-brand/40 to-transparent transition-all duration-500" />
      </motion.article>
    </Link>
  );
}
