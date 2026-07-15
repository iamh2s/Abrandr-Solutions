import Link from "next/link";
import { ArrowUpRight, Briefcase } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import Counter from "@/components/Counter";
import HeroSection from "@/components/HeroSection";
import InfiniteMarquee from "@/components/InfiniteMarquee";
import ServiceCard from "@/components/ServiceCard";
import CaseStudyCard from "@/components/CaseStudyCard";
import TextReveal from "@/components/TextReveal";
import { StaggerContainer, StaggerItem } from "@/components/StaggerChildren";
import ParallaxSection from "@/components/ParallaxSection";
import LeadershipCards from "@/components/LeadershipCards";

const services = [
  {
    iconName: "Palette",
    title: "Branding & Identity",
    description:
      "Your brand is your battle cry. We forge identities so magnetic, your audience can't look away.",
  },
  {
    iconName: "Lightbulb",
    title: "UI/UX Design",
    description:
      "Pixel-perfect isn't enough. We design experiences so intuitive, users fall in love at first click.",
  },
  {
    iconName: "Code",
    title: "Web Development",
    description:
      "Lightning-fast, rock-solid web apps engineered to scale from day one to IPO and beyond.",
  },
  {
    iconName: "Smartphone",
    title: "Mobile Apps",
    description:
      "Apps people obsess over. Native & cross-platform experiences that earn 5-star ratings.",
  },
  {
    iconName: "TrendingUp",
    title: "Digital Marketing",
    description:
      "No vanity metrics. Only growth. Data-driven campaigns that turn clicks into customers.",
  },
  {
    iconName: "Cloud",
    title: "Cloud & Maintenance",
    description:
      "Sleep easy. 99.9% uptime, ironclad security, and infrastructure that never blinks.",
  },
];

const caseStudies = [
  {
    title: "FinTech Dashboard Redesign",
    client: "NovaPay",
    category: "UI/UX Design · Web Development",
    metric: "60% increase in user interactions",
    description:
      "We turned a clunky fintech platform into a dashboard 500K+ users actually enjoy using.",
    color: "from-red-500/20 to-red-400/20",
    image: "/UIUX.png",
    video: "/UIUX.mp4",
  },
  {
    title: "E-Commerce Platform",
    client: "LuxeCart",
    category: "Branding · Web Development",
    metric: "3x revenue growth in 6 months",
    description:
      "From zero to 12 countries in one year — a luxury brand launch that shattered expectations.",
    color: "from-zinc-500/20 to-zinc-400/20",
    image: "/images/work/luxecart-ecommerce.jpg",
    video: "/Luxury_ecommerce_site.mp4",
  },
  {
    title: "Healthcare Mobile App",
    client: "MediConnect",
    category: "Mobile App · UI/UX Design",
    metric: "4.8★ App Store rating",
    description:
      "A telemedicine app so simple, even your grandparents can video-call their doctor.",
    color: "from-stone-500/20 to-stone-400/20",
    image: "/images/work/mediconnect-app.jpg",
    video: "/Health_care.mp4",
  },
];

export default function HomePage() {
  return (
    <>
      <HeroSection />

      {/* Marquee divider */}
      <div className="py-4 border-y border-dark-border/50 overflow-hidden">
        <InfiniteMarquee
          items={["DREAM BIG", "BUILD FAST", "LAUNCH BOLD", "DISRUPT MARKETS", "SCALE SMART", "REPEAT"]}
          speed={25}
        />
      </div>

      {/* Stats Section */}
      <section className="py-20 lg:py-32 relative noise-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            <Counter end={100} suffix="+" label="Projects Shipped" />
            <Counter end={30} suffix="+" label="Countries Conquered" />
            <Counter end={8} suffix="+" label="Years Undefeated" duration={1.5} />
            <Counter end={95} suffix="%" label="Client Retention" />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 lg:py-32 border-t border-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
            <div data-aos="fade-up">
              <p className="text-brand font-semibold text-sm uppercase tracking-wider mb-3">
                Our Arsenal
              </p>
            </div>
            <TextReveal as="h2" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark-heading mb-4" delay={0.1}>
              Everything you need.{" "}
              <span className="gradient-text">Nothing you don&apos;t.</span>
            </TextReveal>
            <div data-aos="fade-up" data-aos-delay="200">
              <p className="text-dark-text text-lg">
                Six disciplines. One fearless team. Zero excuses.
                We bring the full stack so you can focus on your vision.
              </p>
            </div>
          </div>

          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.08}>
            {services.map((service) => (
              <StaggerItem key={service.title}>
                <ServiceCard
                  iconName={service.iconName}
                  title={service.title}
                  description={service.description}
                />
              </StaggerItem>
            ))}
          </StaggerContainer>

          <div className="text-center mt-14" data-aos="fade-up" data-aos-delay="400">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-brand font-semibold hover:gap-3 transition-all duration-300 link-underline pb-0.5"
            >
              Explore the Full Arsenal
              <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Work */}
      <section className="py-20 lg:py-32 border-t border-dark-border noise-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-16 lg:mb-20">
            <div>
              <div data-aos="fade-right">
                <p className="text-brand font-semibold text-sm uppercase tracking-wider mb-3">
                  Proof, Not Promises
                </p>
              </div>
              <TextReveal as="h2" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark-heading" delay={0.1}>
                Work that speaks{" "}
                <span className="gradient-text">louder than words</span>
              </TextReveal>
            </div>
            <div data-aos="fade-left" data-aos-delay="300">
              <Link
                href="/work"
                className="inline-flex items-center gap-2 text-brand font-semibold hover:gap-3 transition-all duration-300 link-underline pb-0.5 shrink-0"
              >
                View All Case Studies
                <ArrowUpRight size={18} />
              </Link>
            </div>
          </div>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.12}>
            {caseStudies.map((study) => (
              <StaggerItem key={study.title} direction="scale">
                <CaseStudyCard {...study} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Parallax divider */}
      <ParallaxSection speed={0.5} className="border-y border-dark-border">
        <div className="py-20 lg:py-28 text-center max-w-4xl mx-auto px-4">
          <TextReveal as="h2" className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-dark-heading leading-tight">
            Think big. Ship fast. Stay humble.{" "}
            <span className="gradient-text">That&apos;s the aBrandr way.</span>
          </TextReveal>
        </div>
      </ParallaxSection>

      {/* Leadership Testimonials — Animated Card Stack */}
    
      <LeadershipCards />
      {/* Careers CTA Band */}
      <section className="py-16 lg:py-20 border-t border-dark-border relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-brand/5 via-transparent to-brand/5 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6" data-aos="fade-up">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-brand/10 flex items-center justify-center shrink-0">
                <Briefcase className="text-brand" size={28} />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-dark-heading">
                  Join the crew that&apos;s reshaping digital.
                </h3>
                <p className="text-dark-text text-sm mt-1">
                  We&apos;re hiring dreamers, builders, and misfits who refuse to settle for ordinary.
                </p>
              </div>
            </div>
            <Link
              href="/careers"
              className="inline-flex items-center gap-2 bg-brand hover:bg-brand-dark text-white font-semibold px-7 py-3.5 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-brand/25 shrink-0 group"
            >
              Explore Open Roles
              <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Bottom marquee */}
      <div className="py-4 border-y border-dark-border/50 overflow-hidden">
        <InfiniteMarquee
          items={["aBRANDR", "SOLUTIONS", "CHENNAI", "GLOBAL", "DIGITAL", "UNSTOPPABLE"]}
          speed={35}
          reverse
        />
      </div>
    </>
  );
}