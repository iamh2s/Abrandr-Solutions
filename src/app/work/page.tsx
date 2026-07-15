  import type { Metadata } from "next";
  import Link from "next/link";
  import { ArrowUpRight } from "lucide-react";
  import AnimatedSection from "@/components/AnimatedSection";
  import PageHero from "@/components/PageHero";
  import InfiniteMarquee from "@/components/InfiniteMarquee";
  import ProjectCard from "@/components/ProjectCard";

  export const metadata: Metadata = {
    title: "Our Work",
    description:
      "Explore aBrandr's portfolio of case studies showcasing measurable results across branding, design, development, and digital marketing projects.",
  };

  const projects = [
    {
      slug: "novapay-dashboard",
      title: "FinTech Dashboard Redesign",
      client: "NovaPay",
      category: "UI/UX Design · Web Development",
     
      video: "/UIUX.mp4",
      description:
        "Complete redesign of NovaPay's fintech platform serving 500K+ users. We reimagined the entire user experience from information architecture to visual design, resulting in dramatic improvements across all engagement metrics.",
      challenge:
        "Users were abandoning complex workflows mid-way due to a confusing interface with poor information hierarchy and inconsistent design patterns.",
      solution:
        "We conducted extensive user research, mapped critical user journeys, and designed an intuitive dashboard with clear data visualization, streamlined workflows, and a consistent design system.",
      metrics: [
        { label: "User Interactions", value: "+60%", iconName: "Users" },
        { label: "Task Completion", value: "+45%", iconName: "Zap" },
        { label: "User Satisfaction", value: "4.7/5", iconName: "TrendingUp" },
      ],
      gradient: "from-red-500/20 to-red-400/20",
      tags: ["React", "TypeScript", "Figma", "Design System"],
    },
    {
      slug: "luxecart-ecommerce",
      title: "Luxury E-Commerce Platform",
      client: "LuxeCart",
      category: "Branding · Web Development · Digital Marketing",
      video: "Luxury_ecommerce_site.mp4",
      description:
        "End-to-end brand and platform development for LuxeCart, a luxury e-commerce startup that scaled from concept to serving customers in 12 countries within the first year.",
      challenge:
        "A new entrant in the competitive luxury e-commerce space needed a distinctive brand identity, a premium shopping experience, and a scalable technology platform.",
      solution:
        "We developed a sophisticated brand identity, designed an immersive shopping experience with AR product previews, and built a headless commerce platform with Next.js and Shopify.",
      metrics: [
        { label: "Revenue Growth", value: "3x", iconName: "TrendingUp" },
        { label: "Countries Served", value: "12", iconName: "Globe" },
        { label: "Conversion Rate", value: "+85%", iconName: "Zap" },
      ],
      gradient: "from-zinc-500/20 to-zinc-400/20",
      tags: ["Next.js", "Shopify", "Branding", "SEO"],
    },
    {
      slug: "mediconnect-app",
      title: "Healthcare Mobile App",
      client: "MediConnect",
      category: "Mobile App · UI/UX Design · Cloud",
      video: "/Health_care.mp4",
      description:
        "A patient-centric healthcare application connecting doctors and patients with seamless telemedicine features, appointment scheduling, and secure medical record management.",
      challenge:
        "Healthcare providers needed a HIPAA-compliant platform that simplified telemedicine while maintaining the highest standards of data security and patient privacy.",
      solution:
        "We designed and built a cross-platform mobile app with end-to-end encryption, HD video consultations, and an intuitive interface that even non-tech-savvy patients could navigate easily.",
      metrics: [
        { label: "App Store Rating", value: "4.8★", iconName: "TrendingUp" },
        { label: "Active Users", value: "200K+", iconName: "Users" },
        { label: "Consultations", value: "1M+", iconName: "Zap" },
      ],
      gradient: "from-zinc-500/20 to-zinc-400/20",
      tags: ["React Native", "Node.js", "AWS", "HIPAA"],
    },
    {
      slug: "techvault-rebrand",
      title: "SaaS Platform Rebrand",
      client: "TechVault",
      category: "Branding · UI/UX Design · Strategy",
      video: "/saas_platform.mp4",
      description:
        "Complete brand overhaul and product redesign for a B2B SaaS platform, repositioning them from a legacy tool to a modern, enterprise-grade solution.",
      challenge:
        "TechVault's outdated brand and interface were losing ground to modern competitors. Enterprise clients perceived them as a legacy solution despite having superior technology.",
      solution:
        "We repositioned the brand with a fresh visual identity, redesigned the platform with modern UX patterns, and created a marketing strategy that highlighted their technological advantages.",
      metrics: [
        { label: "Lead Generation", value: "+120%", iconName: "TrendingUp" },
        { label: "Enterprise Deals", value: "+75%", iconName: "Zap" },
        { label: "Brand Perception", value: "+90%", iconName: "Users" },
      ],
      gradient: "from-neutral-500/20 to-neutral-400/20",
      tags: ["Brand Strategy", "Figma", "React", "Marketing"],
    },
    {
      slug: "cloudsync-website",
      title: "Cloud Platform Website",
      client: "CloudSync",
      category: "Web Development · Digital Marketing · SEO",
      video: "/seo.mp4",
      description:
        "Designed and developed a high-performance marketing website for CloudSync that effectively communicates complex technical products to both technical and non-technical audiences.",
      challenge:
        "CloudSync's previous website had poor conversion rates and failed to effectively communicate their platform's value proposition to different buyer personas.",
      solution:
        "We built a blazing-fast Next.js website with interactive demos, persona-based content journeys, and comprehensive SEO optimization that dramatically improved organic visibility.",
      metrics: [
        { label: "Organic Traffic", value: "+200%", iconName: "TrendingUp" },
        { label: "Demo Requests", value: "+150%", iconName: "Zap" },
        { label: "Page Speed", value: "98/100", iconName: "Globe" },
      ],
      gradient: "from-red-500/20 to-rose-400/20",
      tags: ["Next.js", "SEO", "Contentful", "Analytics"],
    },
    {
      slug: "greenleaf-mobile",
      title: "Sustainability Tracking App",
      client: "GreenLeaf",
      category: "Mobile App · Branding · Strategy",
      video: "/tracking mobile app.mp4",
      description:
        "A consumer-facing sustainability app that gamifies eco-friendly habits, tracks carbon footprint, and connects users with local environmental initiatives.",
      challenge:
        "Sustainability apps struggled with user retention because tracking environmental impact felt abstract and unrewarding to most users.",
      solution:
        "We designed a gamified experience with social features, visual impact tracking, community challenges, and partnerships with local businesses for real-world rewards.",
      metrics: [
        { label: "Monthly Active Users", value: "150K+", iconName: "Users" },
        { label: "Retention Rate", value: "72%", iconName: "TrendingUp" },
        { label: "CO2 Saved", value: "500T", iconName: "Globe" },
      ],
      gradient: "from-neutral-500/20 to-neutral-400/20",
      tags: ["Flutter", "Firebase", "Gamification", "UX Research"],
    },
  ];

  export default function WorkPage() {
    return (
      <>
        <PageHero
          label="Proof, Not Promises"
          title="We let the numbers"
          titleAccent="do the talking."
          description="Every project below started with an ambitious goal and ended with jaw-dropping results. Here's the proof that we deliver."
        />

        <section className="pb-20 lg:pb-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-12 lg:space-y-16">
              {projects.map((project, i) => (
                <ProjectCard key={project.slug} project={project} index={i} />
              ))}
            </div>

            <AnimatedSection className="text-center mt-20">
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

        <div className="py-4 border-y border-dark-border/50 overflow-hidden">
          <InfiniteMarquee
            items={["NOVAPAY", "LUXECART", "MEDICONNECT", "TECHVAULT", "CLOUDSYNC", "GREENLEAF"]}
            speed={35}
            reverse
          />
        </div>
      </>
    );
  }