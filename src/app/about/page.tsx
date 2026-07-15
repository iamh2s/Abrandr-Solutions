import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  Shield,
  Users,
  Target,
  Rocket,
  Heart,
  Globe,
  Award,
} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import Counter from "@/components/Counter";
import TextReveal from "@/components/TextReveal";
import PageHero from "@/components/PageHero";
import { StaggerContainer, StaggerItem } from "@/components/StaggerChildren";
import ParallaxSection from "@/components/ParallaxSection";
import InfiniteMarquee from "@/components/InfiniteMarquee";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "aBrandr Solutions is a results-oriented digital agency based in Chennai, India, serving 30+ countries since 2016 with cross-functional expert teams.",
};

const values = [
  {
    icon: Target,
    title: "Results-Driven",
    description:
      "Every decision we make is tied to measurable outcomes. We don't just build — we build things that work.",
  },
  {
    icon: Users,
    title: "Cross-Functional Teams",
    description:
      "No generalists here. Our projects are staffed with specialized experts across strategy, design, and engineering.",
  },
  {
    icon: Shield,
    title: "Transparent & Trustworthy",
    description:
      "Clear contracts, transparent IP and data protection, and honest communication at every stage.",
  },
  {
    icon: Rocket,
    title: "Future-Proof Solutions",
    description:
      "We build with scalability in mind, using modern technologies that grow with your business.",
  },
  {
    icon: Heart,
    title: "Partnership Mindset",
    description:
      "95% client retention isn't an accident. We invest in long-term relationships, not one-off transactions.",
  },
  {
    icon: Globe,
    title: "Global Perspective",
    description:
      "Serving clients in 30+ countries gives us diverse insights that inform better solutions.",
  },
];

const team = [
  {
    name: "Aravind Kumar",
    role: "Founder & Creative Director",
    bio: "15+ years in design and brand strategy. Previously led design at multiple tech startups.",
  },
  {
    name: "Meera Patel",
    role: "Head of Engineering",
    bio: "Full-stack architect with expertise in scalable systems. Former engineering lead at a Fortune 500.",
  },
  {
    name: "Raj Krishnan",
    role: "Strategy Director",
    bio: "Digital transformation specialist with a background in management consulting and product strategy.",
  },
  {
    name: "Deepa Venkatesh",
    role: "Head of UX Design",
    bio: "Human-centered design advocate with 10+ years creating award-winning digital experiences.",
  },
  {
    name: "Vikram Singh",
    role: "Growth & Marketing Lead",
    bio: "Performance marketing expert who has driven growth for 50+ brands across diverse industries.",
  },
  {
    name: "Priya Nair",
    role: "Client Success Director",
    bio: "Relationship builder ensuring every client engagement delivers exceptional value and satisfaction.",
  },
];

const models = [
  {
    title: "Dedicated Team",
    description:
      "A full cross-functional team exclusively assigned to your project, working as an extension of your in-house capabilities.",
    best: "Long-term projects & ongoing product development",
  },
  {
    title: "Project-Based",
    description:
      "Fixed scope, timeline, and budget for well-defined projects. Ideal for clear deliverables with specific outcomes.",
    best: "Defined scope with clear milestones",
  },
  {
    title: "Retainer",
    description:
      "Ongoing support and development with a set monthly budget. Flexible allocation of hours across services as needed.",
    best: "Continuous improvement & maintenance",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        label="The aBrandr Story"
        title="We're the team your competitors"
        titleAccent="wish they'd hired first."
        description="Since 2016, we've been the unfair advantage for startups, scale-ups, and enterprise brands across 30+ countries. Strategy, design, and engineering — fused into one relentless force."
      />

      {/* Mission */}
      <section className="py-20 lg:py-32 border-t border-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <TextReveal as="h2" className="text-3xl sm:text-4xl font-bold text-dark-heading mb-6">
                Our mission is to transform how businesses{" "}
                <span className="gradient-text">connect with the world</span>
              </TextReveal>
              <AnimatedSection delay={0.3}>
                <p className="text-dark-text leading-relaxed mb-4">
                  We believe that great digital experiences are born at the
                  intersection of strategic thinking, beautiful design, and
                  cutting-edge technology. That&apos;s why we don&apos;t silo
                  these disciplines — we integrate them.
                </p>
                <p className="text-dark-text leading-relaxed">
                  Our cross-functional teams bring diverse expertise to every
                  project, ensuring solutions are holistic, user-centric, and
                  built to last. We&apos;re not just service providers — we&apos;re
                  invested partners in your success.
                </p>
              </AnimatedSection>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <Counter end={100} suffix="+" label="Projects Shipped" />
              <Counter end={30} suffix="+" label="Countries Conquered" />
              <Counter end={95} suffix="%" label="Clients Who Stay" />
              <Counter end={8} suffix="+" label="Years Undefeated" duration={1.5} />
            </div>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="py-4 border-y border-dark-border/50 overflow-hidden">
        <InfiniteMarquee
          items={["RESULTS", "PARTNERSHIP", "TRANSPARENCY", "INNOVATION", "SCALABILITY", "TRUST"]}
          speed={30}
        />
      </div>

      {/* Values */}
      <section className="py-20 lg:py-32 noise-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
            <AnimatedSection>
              <p className="text-brand font-semibold text-sm uppercase tracking-wider mb-3">
                Why aBrandr
              </p>
            </AnimatedSection>
            <TextReveal as="h2" className="text-3xl sm:text-4xl font-bold text-dark-heading" delay={0.1}>
              What makes us{" "}
              <span className="gradient-text">different</span>
            </TextReveal>
          </div>

          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.08}>
            {values.map((value) => (
              <StaggerItem key={value.title} direction="scale">
                <div className="glass-card rounded-2xl p-6 lg:p-8 h-full group relative overflow-hidden hover:border-brand/20 transition-all duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-brand/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center mb-4 group-hover:bg-brand/20 transition-all duration-500">
                      <value.icon className="text-brand" size={24} />
                    </div>
                    <h3 className="text-lg font-semibold text-dark-heading mb-2 group-hover:text-brand transition-colors duration-300">
                      {value.title}
                    </h3>
                    <p className="text-sm text-dark-text leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Parallax Quote */}
      <ParallaxSection speed={0.3} className="border-y border-dark-border">
        <div className="py-20 lg:py-28 text-center max-w-4xl mx-auto px-4">
          <TextReveal as="h2" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark-heading leading-tight">
            We hire specialists, not generalists.{" "}
            <span className="gradient-text">That&apos;s our unfair advantage.</span>
          </TextReveal>
        </div>
      </ParallaxSection>

      {/* Team */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
            <AnimatedSection>
              <p className="text-brand font-semibold text-sm uppercase tracking-wider mb-3">
                Our Team
              </p>
            </AnimatedSection>
            <TextReveal as="h2" className="text-3xl sm:text-4xl font-bold text-dark-heading" delay={0.1}>
              Meet the people behind the{" "}
              <span className="gradient-text">magic</span>
            </TextReveal>
            <AnimatedSection delay={0.3}>
              <p className="text-dark-text mt-4">
                Cross-functional experts, not generalists. Every team member
                brings deep domain expertise to the table.
              </p>
            </AnimatedSection>
          </div>

          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.08}>
            {team.map((member) => (
              <StaggerItem key={member.name}>
                <div className="glass-card rounded-2xl p-6 lg:p-8 h-full group relative overflow-hidden hover:border-brand/20 transition-all duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-brand/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand/30 to-brand-dark/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
                      <span className="text-xl font-bold text-brand">
                        {member.name.split(" ").map((n) => n[0]).join("")}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-dark-heading group-hover:text-brand transition-colors duration-300">
                      {member.name}
                    </h3>
                    <p className="text-brand text-sm font-medium mb-3">
                      {member.role}
                    </p>
                    <p className="text-sm text-dark-text leading-relaxed">
                      {member.bio}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Engagement Models */}
      <section className="py-20 lg:py-32 border-t border-dark-border noise-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
            <AnimatedSection>
              <p className="text-brand font-semibold text-sm uppercase tracking-wider mb-3">
                Engagement Models
              </p>
            </AnimatedSection>
            <TextReveal as="h2" className="text-3xl sm:text-4xl font-bold text-dark-heading" delay={0.1}>
              Flexible ways to{" "}
              <span className="gradient-text">work together</span>
            </TextReveal>
          </div>

          <StaggerContainer className="grid md:grid-cols-3 gap-6" staggerDelay={0.12}>
            {models.map((model) => (
              <StaggerItem key={model.title} direction="scale">
                <div className="glass-card rounded-2xl p-6 lg:p-8 h-full group relative overflow-hidden hover:border-brand/20 transition-all duration-500 flex flex-col">
                  <div className="absolute inset-0 bg-gradient-to-b from-brand/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex items-center gap-3 mb-4">
                      <Award className="text-brand" size={24} />
                      <h3 className="text-lg font-semibold text-dark-heading group-hover:text-brand transition-colors duration-300">
                        {model.title}
                      </h3>
                    </div>
                    <p className="text-sm text-dark-text leading-relaxed mb-4 flex-1">
                      {model.description}
                    </p>
                    <div className="pt-4 border-t border-dark-border">
                      <p className="text-xs text-brand font-medium">
                        Best for: {model.best}
                      </p>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <AnimatedSection className="text-center mt-14" delay={0.3}>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-brand hover:bg-brand-dark text-white font-semibold px-8 py-4 rounded-full text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-brand/30 group"
            >
              Let&apos;s Talk
              <ArrowUpRight size={20} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
