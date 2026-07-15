import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import TextReveal from "@/components/TextReveal";
import { StaggerContainer, StaggerItem } from "@/components/StaggerChildren";
import InfiniteMarquee from "@/components/InfiniteMarquee";
import ServiceDetailCard from "@/components/ServiceDetailCard";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Services",
  description:
    "aBrandr offers branding, UI/UX design, web development, mobile apps, digital marketing, cloud services, and strategy consulting to clients across 30+ countries.",
};

const services = [
  {
    id: "branding",
    iconName: "Palette",
    title: "Branding & Identity",
    subtitle: "Make your mark unforgettable",
    description:
      "We build brands that connect emotionally with audiences. From logo design and visual identity systems to brand strategy and guidelines, we create cohesive brand experiences that differentiate you in the market.",
    deliverables: [
      "Brand Strategy & Positioning",
      "Logo & Visual Identity",
      "Brand Guidelines",
      "Brand Messaging & Voice",
      "Packaging Design",
      "Stationery & Collateral",
    ],
  },
  {
    id: "uiux",
    iconName: "Pen",
    title: "UI/UX Design",
    subtitle: "Design that users actually love",
    description:
      "Human-centered design grounded in research and data. We craft intuitive interfaces and seamless user journeys that drive engagement, retention, and conversions across every touchpoint.",
    deliverables: [
      "User Research & Personas",
      "Information Architecture",
      "Wireframing & Prototyping",
      "Visual Design Systems",
      "Usability Testing",
      "Design System Creation",
    ],
  },
  {
    id: "web",
    iconName: "Code",
    title: "Web Development",
    subtitle: "Performance-first web solutions",
    description:
      "We build fast, scalable, and SEO-optimized web applications using modern frameworks like React, Next.js, and Node.js. From marketing sites to complex web platforms, we deliver production-ready code.",
    deliverables: [
      "Custom Web Applications",
      "E-Commerce Platforms",
      "CMS Development",
      "Progressive Web Apps (PWA)",
      "API Development & Integration",
      "Performance Optimization",
    ],
  },
  {
    id: "mobile",
    iconName: "Smartphone",
    title: "Mobile App Development",
    subtitle: "Apps your users can't put down",
    description:
      "Native and cross-platform mobile development for iOS and Android. We build high-performance apps with elegant UIs, offline capabilities, and seamless backend integrations.",
    deliverables: [
      "iOS & Android Native Apps",
      "React Native / Flutter Apps",
      "App Store Optimization",
      "Push Notifications & Analytics",
      "Offline-First Architecture",
      "Backend API Development",
    ],
  },
  {
    id: "marketing",
    iconName: "TrendingUp",
    title: "Digital Marketing",
    subtitle: "Growth strategies that actually work",
    description:
      "Data-driven digital marketing that delivers measurable ROI. We combine SEO, paid advertising, social media, and content marketing into integrated campaigns that scale your business.",
    deliverables: [
      "SEO & Content Strategy",
      "PPC & Paid Advertising",
      "Social Media Management",
      "Email Marketing Automation",
      "Analytics & Reporting",
      "Conversion Rate Optimization",
    ],
  },
  {
    id: "cloud",
    iconName: "Cloud",
    title: "Cloud & Maintenance",
    subtitle: "Keep your digital products running smoothly",
    description:
      "Reliable cloud infrastructure, DevOps, and ongoing maintenance services. We ensure your applications are secure, performant, and always available with 99.9% uptime.",
    deliverables: [
      "Cloud Architecture (AWS, GCP, Azure)",
      "CI/CD Pipeline Setup",
      "Security Audits & Hardening",
      "Performance Monitoring",
      "24/7 Support & Maintenance",
      "Disaster Recovery Planning",
    ],
  },
  {
    id: "strategy",
    iconName: "Lightbulb",
    title: "Strategy Consulting",
    subtitle: "Strategic clarity for digital success",
    description:
      "We help businesses navigate digital transformation with strategic frameworks, market analysis, and technology roadmaps. Our consulting services align your digital initiatives with business objectives.",
    deliverables: [
      "Digital Transformation Strategy",
      "Market & Competitor Analysis",
      "Technology Roadmapping",
      "Product Strategy & Discovery",
      "Workshop Facilitation",
      "Innovation Sprints",
    ],
  },
];

const processSteps = [
  {
    step: "01",
    title: "Discover",
    desc: "Deep-dive into your business, market, users, and goals to define the right strategy.",
  },
  {
    step: "02",
    title: "Design",
    desc: "Craft user-centered designs through research, wireframes, prototypes, and testing.",
  },
  {
    step: "03",
    title: "Develop",
    desc: "Build scalable, high-performance solutions with modern technologies and best practices.",
  },
  {
    step: "04",
    title: "Deliver & Grow",
    desc: "Launch, measure, iterate, and optimize for continuous improvement and growth.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        label="Our Arsenal"
        title="Seven weapons."
        titleAccent="One unstoppable team."
        description="Strategy to launch. Design to delight. Code to scale. We don't outsource, we don't cut corners, and we never ship anything we wouldn't put our name on."
      />

      <section className="pb-20 lg:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12 lg:space-y-20">
            {services.map((service, i) => (
              <ServiceDetailCard
                key={service.id}
                id={service.id}
                iconName={service.iconName}
                title={service.title}
                subtitle={service.subtitle}
                description={service.description}
                deliverables={service.deliverables}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      <div className="py-4 border-y border-dark-border/50 overflow-hidden">
        <InfiniteMarquee
          items={["DISCOVER", "DESIGN", "DEVELOP", "DELIVER", "GROW", "ITERATE"]}
          speed={30}
        />
      </div>

      <section className="py-20 lg:py-32 noise-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
            <AnimatedSection>
              <p className="text-brand font-semibold text-sm uppercase tracking-wider mb-3">
                Our Process
              </p>
            </AnimatedSection>
            <TextReveal as="h2" className="text-3xl sm:text-4xl font-bold text-dark-heading" delay={0.1}>
              From napkin sketch to{" "}
              <span className="gradient-text">market domination</span>
            </TextReveal>
          </div>

          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.12}>
            {processSteps.map((phase) => (
              <StaggerItem key={phase.step} direction="scale">
                <div className="glass-card rounded-2xl p-6 text-center h-full group hover:border-brand/20 transition-all duration-500 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-brand/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10">
                    <div className="text-5xl font-black text-brand/20 mb-3 group-hover:text-brand/40 transition-colors duration-500">
                      {phase.step}
                    </div>
                    <h3 className="text-lg font-semibold text-dark-heading mb-2 group-hover:text-brand transition-colors duration-300">
                      {phase.title}
                    </h3>
                    <p className="text-sm text-dark-text">{phase.desc}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <AnimatedSection className="text-center mt-14" delay={0.4}>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-brand hover:bg-brand-dark text-white font-semibold px-8 py-4 rounded-full text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-brand/30 group"
            >
              Start Your Project
              <ArrowUpRight size={20} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
