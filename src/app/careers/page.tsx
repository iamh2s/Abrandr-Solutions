import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  Zap,
  Globe,
  Heart,
  Rocket,
  Coffee,
  BookOpen,
  Users,
  Sparkles,
  MapPin,
  Clock,
  Briefcase,
  Target,
  Gem,
  Search,
  MessageCircle,
  Handshake,
} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import TextReveal from "@/components/TextReveal";
import PageHero from "@/components/PageHero";
import { StaggerContainer, StaggerItem } from "@/components/StaggerChildren";
import InfiniteMarquee from "@/components/InfiniteMarquee";
import CareerApplicationForm from "@/components/CareerApplicationForm";

export const metadata: Metadata = {
  title: "Careers — Join the Crew",
  description:
    "Join aBrandr Solutions — a design-driven digital agency hiring dreamers, builders, and misfits who refuse to settle. Explore open roles in design, engineering, marketing, and strategy.",
};

const perks = [
  {
    icon: Rocket,
    title: "Ship Fast, Learn Faster",
    description: "Work on real projects for global clients from day one. No busy work. No red tape.",
  },
  {
    icon: Globe,
    title: "Remote-Friendly",
    description: "Work from Chennai HQ, your home, or a beach in Bali. We trust talent, not timesheets.",
  },
  {
    icon: BookOpen,
    title: "Skill Stipend",
    description: "₹50K yearly learning budget for courses, conferences, books, or anything that levels you up.",
  },
  {
    icon: Coffee,
    title: "Flex Hours",
    description: "Early bird or night owl — we don't care when you work, only that the work is extraordinary.",
  },
  {
    icon: Heart,
    title: "Wellness First",
    description: "Comprehensive health insurance, mental health days, and a genuine no-crunch culture.",
  },
  {
    icon: Users,
    title: "Team Retreats",
    description: "Annual off-sites, hackathons, and team-bonding events because great teams need great memories.",
  },
];

const openRoles = [
  {
    title: "Senior UI/UX Designer",
    department: "Design",
    location: "Chennai / Remote",
    type: "Full-time",
    description:
      "Lead design for high-impact projects across fintech, healthcare, and e-commerce. You'll own end-to-end design from research to pixel-perfect handoff.",
    requirements: [
      "5+ years UI/UX experience",
      "Figma mastery & design systems",
      "Portfolio with shipped products",
      "Strong communication skills",
    ],
  },
  {
    title: "Full-Stack Developer (React/Node)",
    department: "Engineering",
    location: "Chennai / Remote",
    type: "Full-time",
    description:
      "Build scalable web applications with React, Next.js, and Node.js. You'll architect solutions, write clean code, and mentor junior developers.",
    requirements: [
      "4+ years full-stack experience",
      "React, Next.js, TypeScript",
      "Node.js, PostgreSQL, REST/GraphQL",
      "CI/CD & cloud deployment",
    ],
  },
  {
    title: "Mobile Developer (React Native)",
    department: "Engineering",
    location: "Chennai / Remote",
    type: "Full-time",
    description:
      "Craft high-performance mobile experiences for iOS and Android. You'll work closely with designers and backend engineers to ship apps users love.",
    requirements: [
      "3+ years React Native experience",
      "Published apps on App Store/Play Store",
      "Native module experience (iOS/Android)",
      "Performance optimization skills",
    ],
  },
  {
    title: "Brand Strategist",
    department: "Strategy",
    location: "Chennai",
    type: "Full-time",
    description:
      "Develop brand positioning, messaging frameworks, and go-to-market strategies for clients ranging from seed-stage startups to enterprise brands.",
    requirements: [
      "4+ years brand/strategy experience",
      "Strong storytelling & presentation",
      "Experience with B2B and B2C brands",
      "Workshop facilitation skills",
    ],
  },
  {
    title: "Digital Marketing Lead",
    department: "Growth",
    location: "Chennai / Remote",
    type: "Full-time",
    description:
      "Own end-to-end digital marketing campaigns — SEO, paid media, social, and content — for aBrandr and our clients. Data obsession required.",
    requirements: [
      "5+ years digital marketing experience",
      "Google Ads, Meta Ads certified",
      "SEO & content strategy expertise",
      "Analytics & attribution mastery",
    ],
  },
  {
    title: "DevOps Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    description:
      "Design and maintain cloud infrastructure, CI/CD pipelines, and monitoring systems that keep our clients' products running at 99.9% uptime.",
    requirements: [
      "3+ years DevOps experience",
      "AWS / GCP / Azure expertise",
      "Docker, Kubernetes, Terraform",
      "Security best practices",
    ],
  },
];

const cultureValues = [
  "Ownership over ego",
  "Craft over speed",
  "Curiosity over comfort",
  "Candor over politics",
  "Impact over hours",
  "Team over individual",
];

export default function CareersPage() {
  return (
    <>
      <PageHero
        label="Careers at aBrandr"
        title="Build the future."
        titleAccent="Don't just watch it."
        description="We're a tribe of obsessive creators, relentless builders, and strategic thinkers who believe ordinary is a crime. If you're ready to do the best work of your life — pull up a chair."
      />

      {/* Marquee */}
      <div className="py-4 border-y border-dark-border/50 overflow-hidden">
        <InfiniteMarquee
          items={["WE'RE HIRING", "DREAM BIG", "BUILD BOLD", "JOIN THE CREW", "MAKE YOUR MARK", "LEVEL UP"]}
          speed={25}
        />
      </div>

      {/* Why aBrandr */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
            <div data-aos="fade-up">
              <p className="text-brand font-semibold text-sm uppercase tracking-wider mb-3">
                Why You&apos;ll Love It Here
              </p>
            </div>
            <TextReveal as="h2" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark-heading mb-4" delay={0.1}>
              Perks that actually{" "}
              <span className="gradient-text">matter</span>
            </TextReveal>
            <div data-aos="fade-up" data-aos-delay="200">
              <p className="text-dark-text text-lg">
                No ping-pong tables. No pizza Fridays. Just meaningful work,
                real growth, and a culture that treats you like an adult.
              </p>
            </div>
          </div>

          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.08}>
            {perks.map((perk) => (
              <StaggerItem key={perk.title} direction="scale">
                <div className="glass-card rounded-2xl p-6 lg:p-8 h-full group relative overflow-hidden hover:border-brand/20 transition-all duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-brand/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center mb-4 group-hover:bg-brand/20 transition-all duration-500">
                      <perk.icon className="text-brand" size={24} />
                    </div>
                    <h3 className="text-lg font-semibold text-dark-heading mb-2 group-hover:text-brand transition-colors duration-300">
                      {perk.title}
                    </h3>
                    <p className="text-sm text-dark-text leading-relaxed">
                      {perk.description}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Culture Values */}
      <section className="py-16 lg:py-24 border-t border-dark-border noise-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <div data-aos="fade-right">
                <p className="text-brand font-semibold text-sm uppercase tracking-wider mb-3">
                  Our Culture Code
                </p>
              </div>
              <TextReveal as="h2" className="text-3xl sm:text-4xl font-bold text-dark-heading mb-6" delay={0.1}>
                Six principles that guide{" "}
                <span className="gradient-text">everything we do</span>
              </TextReveal>
              <div data-aos="fade-right" data-aos-delay="200">
                <p className="text-dark-text leading-relaxed">
                  Culture isn&apos;t a poster on the wall — it&apos;s how we make decisions
                  when no one&apos;s watching. These aren&apos;t aspirational buzzwords.
                  They&apos;re non-negotiable truths.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {cultureValues.map((value, i) => {
                const icons = [Target, Gem, Search, MessageCircle, Zap, Handshake];
                const CultureIcon = icons[i];
                return (
                  <div
                    key={value}
                    data-aos="zoom-in"
                    data-aos-delay={String(i * 80)}
                    className="glass-card rounded-xl p-4 text-center group hover:border-brand/20 transition-all duration-500"
                  >
                    <div className="w-10 h-10 rounded-lg bg-brand/10 flex items-center justify-center mx-auto mb-2 group-hover:bg-brand/20 transition-colors duration-500">
                      <CultureIcon className="text-brand" size={20} />
                    </div>
                    <p className="text-sm font-semibold text-dark-heading group-hover:text-brand transition-colors duration-300">
                      {value}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Open Roles */}
      <section className="py-20 lg:py-32 border-t border-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
            <div data-aos="fade-up">
              <p className="text-brand font-semibold text-sm uppercase tracking-wider mb-3">
                Open Positions
              </p>
            </div>
            <TextReveal as="h2" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark-heading mb-4" delay={0.1}>
              Find your role.{" "}
              <span className="gradient-text">Make your mark.</span>
            </TextReveal>
            <div data-aos="fade-up" data-aos-delay="200">
              <p className="text-dark-text text-lg">
                Every seat at aBrandr is a chance to work on projects
                that reach millions. Here&apos;s what&apos;s open right now.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {openRoles.map((role, i) => (
              <div
                key={role.title}
                data-aos="fade-up"
                data-aos-delay={String(i * 80)}
                className="glass-card rounded-2xl p-6 sm:p-8 group hover:border-brand/20 transition-all duration-500 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-brand/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand/0 group-hover:via-brand/30 to-transparent transition-all duration-700" />

                <div className="relative z-10">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="text-xs font-semibold bg-brand/10 text-brand px-2.5 py-1 rounded-full">
                          {role.department}
                        </span>
                        <span className="text-xs text-dark-text flex items-center gap-1">
                          <MapPin size={12} /> {role.location}
                        </span>
                        <span className="text-xs text-dark-text flex items-center gap-1">
                          <Clock size={12} /> {role.type}
                        </span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-dark-heading group-hover:text-brand transition-colors duration-300">
                        {role.title}
                      </h3>
                    </div>
                    <Link
                      href="#apply"
                      className="inline-flex items-center gap-2 bg-brand hover:bg-brand-dark text-white font-semibold px-5 py-2.5 rounded-full text-sm transition-all duration-300 hover:shadow-lg hover:shadow-brand/25 shrink-0 group/btn"
                    >
                      Apply Now
                      <ArrowUpRight size={16} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </Link>
                  </div>
                  <p className="text-dark-text text-sm leading-relaxed mb-4">
                    {role.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {role.requirements.map((req) => (
                      <span
                        key={req}
                        className="text-xs text-dark-text bg-dark border border-dark-border rounded-full px-3 py-1"
                      >
                        {req}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Don't see your role? */}
      <section className="py-16 lg:py-20 border-t border-dark-border noise-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center" data-aos="fade-up">
          <Sparkles className="text-brand mx-auto mb-4" size={32} />
          <h2 className="text-2xl sm:text-3xl font-bold text-dark-heading mb-3">
            Don&apos;t see your dream role?
          </h2>
          <p className="text-dark-text mb-6 max-w-xl mx-auto">
            We&apos;re always on the lookout for extraordinary talent. If you believe
            you&apos;d be a force multiplier at aBrandr, we want to hear from you.
            Send us an open application below.
          </p>
        </div>
      </section>

      {/* Application Form */}
      <section id="apply" className="py-20 lg:py-32 border-t border-dark-border scroll-mt-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div data-aos="fade-up">
            <div className="glass-card rounded-2xl p-6 sm:p-8 lg:p-10 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand/30 to-transparent" />
              <div className="flex items-center gap-3 mb-2">
                <Briefcase className="text-brand" size={24} />
                <h2 className="text-2xl font-bold text-dark-heading">
                  Throw Your Hat In The Ring
                </h2>
              </div>
              <p className="text-dark-text text-sm mb-8">
                Fill this out, and our talent team will get back to you within 3
                business days. No ghosting — that&apos;s a promise.
              </p>
              <CareerApplicationForm />
            </div>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="py-4 border-y border-dark-border/50 overflow-hidden">
        <InfiniteMarquee
          items={["JOIN US", "DREAM BIG", "SHIP FAST", "STAY HUMBLE", "LEVEL UP", "REPEAT"]}
          speed={30}
          reverse
        />
      </div>
    </>
  );
}
