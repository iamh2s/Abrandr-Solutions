import type { Metadata } from "next";
import AnimatedSection from "@/components/AnimatedSection";
import TextReveal from "@/components/TextReveal";
import PageHero from "@/components/PageHero";
import { StaggerContainer, StaggerItem } from "@/components/StaggerChildren";
import BlogCard from "@/components/BlogCard";

export const metadata: Metadata = {
  title: "Blog & Resources",
  description:
    "Insights on branding, UI/UX design, web development, digital marketing, and technology from the aBrandr team.",
};

const posts = [
  {
    slug: "design-systems-at-scale",
    title: "Building Design Systems That Scale: A Practical Guide",
    excerpt:
      "How to create a design system that grows with your product, maintains consistency across teams, and accelerates development without sacrificing quality.",
    category: "Design",
    readTime: "8 min read",
    date: "2025-12-15",
    gradient: "from-red-500/20 to-red-400/20",
  },
  {
    slug: "nextjs-performance-optimization",
    title: "Next.js Performance: 10 Techniques for Sub-Second Load Times",
    excerpt:
      "Advanced optimization strategies we use at aBrandr to achieve Lighthouse scores of 95+ and load times under 2 seconds for complex web applications.",
    category: "Engineering",
    readTime: "12 min read",
    date: "2025-11-28",
    gradient: "from-zinc-500/20 to-zinc-400/20",
  },
  {
    slug: "brand-strategy-startups",
    title: "Why Brand Strategy Matters More Than Your Logo",
    excerpt:
      "Most startups get branding backwards. Here's why strategy should come first, and how a strong brand foundation drives every other business decision.",
    category: "Branding",
    readTime: "6 min read",
    date: "2025-11-10",
    gradient: "from-zinc-500/20 to-zinc-400/20",
  },
  {
    slug: "ux-research-methods",
    title: "5 UX Research Methods Every Product Team Should Use",
    excerpt:
      "From guerilla testing to diary studies — practical research methods that uncover real user insights without breaking the budget or timeline.",
    category: "UX Design",
    readTime: "7 min read",
    date: "2025-10-22",
    gradient: "from-neutral-500/20 to-neutral-400/20",
  },
  {
    slug: "digital-marketing-roi",
    title: "Measuring Digital Marketing ROI: Beyond Vanity Metrics",
    excerpt:
      "Stop reporting on likes and impressions. Here is a framework for measuring the metrics that actually matter to your business growth.",
    category: "Marketing",
    readTime: "9 min read",
    date: "2025-10-05",
    gradient: "from-red-500/20 to-rose-400/20",
  },
  {
    slug: "cloud-architecture-decisions",
    title: "Cloud Architecture Decisions That Save You Money (and Pain)",
    excerpt:
      "Key architectural choices from managing cloud infrastructure for 100+ projects and how to avoid the most common expensive mistakes.",
    category: "Engineering",
    readTime: "10 min read",
    date: "2025-09-18",
    gradient: "from-neutral-500/20 to-neutral-400/20",
  },
];

export default function BlogPage() {
  return (
    <>
      <PageHero
        label="Brain Fuel"
        title="Hard-won insights from"
        titleAccent="the trenches"
        description="No fluff. No filler. Real lessons from shipping 100+ projects across 30+ countries — on design, code, strategy, and growth."
      />

      <section className="pb-20 lg:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.08}>
            {posts.map((post) => (
              <StaggerItem key={post.slug} direction="scale">
                <BlogCard post={post} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="py-20 lg:py-28 border-t border-dark-border noise-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatedSection className="text-center max-w-2xl mx-auto" variant="scaleUp">
            <TextReveal as="h2" className="text-3xl sm:text-4xl font-bold text-dark-heading mb-4">
              Stay in the loop
            </TextReveal>
            <AnimatedSection delay={0.2}>
              <p className="text-dark-text mb-8">
                Get the latest insights on design, technology, and strategy
                delivered to your inbox. No spam, just value.
              </p>
            </AnimatedSection>
            <AnimatedSection delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 bg-dark border border-dark-border rounded-full px-5 py-3 text-dark-heading text-sm focus:outline-none focus:border-brand transition-colors placeholder:text-dark-text/50"
                />
                <button className="bg-brand hover:bg-brand-dark text-white font-semibold px-6 py-3 rounded-full text-sm transition-all duration-300 hover:shadow-lg hover:shadow-brand/25">
                  Subscribe
                </button>
              </div>
            </AnimatedSection>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
