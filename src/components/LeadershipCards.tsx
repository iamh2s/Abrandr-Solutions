"use client"

import * as React from "react"
import {
  type MotionValue,
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "motion/react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"

const LEADERS = [
  {
    id: "abrandr-ceo",
    name: "Arjun Rajesh",
    role: "CEO & Founder, aBrandr Solutions",
    rating: 5,
    avatarUrl:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "abrandr-cto",
    name: "Meera Krishnan",
    role: "CTO & Co-Founder, aBrandr Solutions",
    rating: 5,
    avatarUrl:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "abrandr-design-head",
    name: "Vikram Suresh",
    role: "Head of Design, aBrandr Solutions",
    rating: 5,
    avatarUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&auto=format&fit=crop&q=80",
  },
]

function LeaderCard({
  leader,
  index,
  total,
  scrollYProgress,
}: {
  leader: (typeof LEADERS)[0]
  index: number
  total: number
  scrollYProgress: MotionValue<number>
}) {
  const cardIndex = index + 1
  const start = cardIndex / (total + 3)
  const end = (cardIndex + 1.5) / (total + 3)
  const range: [number, number] = [start, end]
  const rotateStart = Math.max(0, start - 0.4)

  const y = useTransform(scrollYProgress, range, ["0%", "-200%"])
  const rotate = useTransform(scrollYProgress, [rotateStart, end / 1.2], [-8 + index * 3, 0])
  const scale = useTransform(scrollYProgress, [rotateStart, end], [0.92, 1])
  const opacity = useTransform(
    scrollYProgress,
    [rotateStart, start, end, Math.min(end + 0.2, 1)],
    [0.6, 1, 1, 0.4]
  )
  const transform = useMotionTemplate`translateY(${y}) rotate(${rotate}deg)`

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-start gap-5 rounded-3xl border border-dark-border/50 bg-dark-card/90 p-6 sm:p-8 backdrop-blur-xl will-change-transform overflow-hidden"
      style={{
        top: index * 16,
        transform,
        scale,
        opacity,
        zIndex: (total - index) * 10,
        backfaceVisibility: "hidden",
      }}
    >
      {/* Big Avatar Image */}
      <div className="relative">
        <Avatar className="!size-32 sm:!size-40 border-4 border-brand/40 shadow-2xl shadow-brand/20">
          <AvatarImage
            src={leader.avatarUrl}
            alt={leader.name}
            className="object-cover"
          />
          <AvatarFallback className="bg-brand/20 text-brand text-2xl font-bold">
            {leader.name.split(" ").map((n) => n[0]).join("")}
          </AvatarFallback>
        </Avatar>
        {/* Glow ring effect */}
        <div className="absolute inset-0 rounded-full bg-brand/20 blur-2xl -z-10 scale-110" />
      </div>

      {/* Stars */}
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={18}
            className={i < Math.floor(leader.rating) ? "fill-brand text-brand" : "text-dark-border"}
          />
        ))}
      </div>

      {/* Name & Role */}
      <div className="text-center">
        <h3 className="text-lg sm:text-xl font-bold text-dark-heading">
          {leader.name}
        </h3>
        <p className="text-xs sm:text-sm text-brand mt-0.5">
          {leader.role}
        </p>
      </div>

    </motion.div>
  )
}

export default function LeadershipCards() {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{ height: `${LEADERS.length * 200 + 200}vh` }}
    >
      {/* Sticky wrapper */}
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto px-4 mb-8 sm:mb-10">
          <p className="text-brand font-semibold text-sm uppercase tracking-wider mb-3">
            Meet the Team
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-dark-heading font-display">
            The minds behind{" "}
            <span className="gradient-text">aBrandr Solutions</span>
          </h2>
          <p className="text-dark-text text-sm sm:text-base mt-3">
            Bold thinkers, relentless builders, and design obsessives — united by one mission.
          </p>
        </div>

        {/* Card stack — bigger card size */}
        <div
          className="relative w-full max-w-[380px] sm:max-w-[460px] mx-auto"
          style={{ height: 560, perspective: "1000px" }}
        >
          {LEADERS.map((leader, index) => (
            <LeaderCard
              key={leader.id}
              leader={leader}
              index={index}
              total={LEADERS.length}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  )
}