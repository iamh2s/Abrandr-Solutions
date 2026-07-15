import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Clock, Tag, Share2 } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

const postsData: Record<
  string,
  {
    title: string;
    excerpt: string;
    category: string;
    readTime: string;
    date: string;
    content: string[];
  }
> = {
  "design-systems-at-scale": {
    title: "Building Design Systems That Scale: A Practical Guide",
    excerpt:
      "How to create a design system that grows with your product, maintains consistency across teams, and accelerates development without sacrificing quality.",
    category: "Design",
    readTime: "8 min read",
    date: "2025-12-15",
    content: [
      "Design systems have become essential for teams building digital products at scale. But creating one that actually works — that teams adopt, that evolves with the product, and that genuinely accelerates development — is harder than it looks.",
      "At aBrandr, we've built design systems for products serving millions of users. Here's what we've learned about doing it right.",
      "Start with an audit of your existing UI. Before designing anything new, catalog every button, form field, color, and typographic style currently in use. You'll likely find dozens of inconsistencies — that's the gap your design system needs to fill.",
      "Define your design tokens first. Colors, spacing, typography scales, shadows, and border radii should all be defined as tokens before you build a single component. These tokens become the DNA of your entire system.",
      "Build components from the bottom up. Start with atoms (buttons, inputs, labels), compose them into molecules (search bars, cards), and then assemble organisms (navigation, hero sections). This atomic approach ensures maximum reusability.",
      "Document everything with real examples. A design system without documentation is just a component library. Every component needs usage guidelines, do's and don'ts, and interactive examples that designers and developers can reference.",
      "Plan for evolution from day one. Your design system will need to change. Build in versioning, migration guides, and a contribution process so the system grows with your product rather than becoming a bottleneck.",
    ],
  },
  "nextjs-performance-optimization": {
    title: "Next.js Performance: 10 Techniques for Sub-Second Load Times",
    excerpt:
      "Advanced optimization strategies we use at aBrandr to achieve Lighthouse scores of 95+ and load times under 2 seconds for complex web applications.",
    category: "Engineering",
    readTime: "12 min read",
    date: "2025-11-28",
    content: [
      "Performance isn't a feature — it's a requirement. Every 100ms of load time costs you conversions, engagement, and SEO rankings. At aBrandr, we obsess over performance for every project we ship.",
      "Here are 10 techniques we use to achieve consistently fast load times with Next.js.",
      "1. Use Server Components by default. React Server Components render on the server and send zero JavaScript to the client. Start with Server Components and only opt into Client Components when you need interactivity.",
      "2. Implement dynamic imports for heavy components. Use next/dynamic to code-split components that aren't needed for initial render. Modals, charts, and complex editors are great candidates.",
      "3. Optimize images with next/image. The built-in Image component handles lazy loading, responsive sizing, and modern format conversion automatically. Always specify width and height to prevent layout shift.",
      "4. Minimize client-side JavaScript. Audit your bundle with @next/bundle-analyzer. Remove unused dependencies, replace heavy libraries with lighter alternatives, and avoid importing entire packages when you only need a few functions.",
      "5. Leverage static generation where possible. Pages that don't change per-request should be statically generated at build time. Use ISR (Incremental Static Regeneration) for pages that change periodically.",
      "6. Implement proper caching strategies. Use Cache-Control headers, CDN caching, and React cache() for deduplicating data fetches. Every unnecessary network request is a performance penalty.",
      "7. Optimize fonts with next/font. Self-host fonts to eliminate external network requests and use font-display: swap to prevent invisible text during loading.",
    ],
  },
  "brand-strategy-startups": {
    title: "Why Brand Strategy Matters More Than Your Logo",
    excerpt:
      "Most startups get branding backwards. Here's why strategy should come first, and how a strong brand foundation drives every other business decision.",
    category: "Branding",
    readTime: "6 min read",
    date: "2025-11-10",
    content: [
      "Every week, we talk to startup founders who want a logo. They think branding starts with visuals. It doesn't.",
      "Branding starts with strategy — understanding who you are, who you serve, what you stand for, and how you're different from everyone else in the market.",
      "Your brand strategy is the foundation upon which everything else is built. Your logo, your website, your marketing, your product decisions, your hiring — they all flow from a clear brand strategy.",
      "Start with positioning. Who are your ideal customers? What problem do you solve better than anyone else? What's your unique value proposition? These aren't just marketing questions — they're business strategy questions.",
      "Define your brand personality. If your brand were a person, how would they speak? What would they value? This personality should inform every touchpoint, from your website copy to your customer support tone.",
      "Then — and only then — should you think about visual identity. A logo designed without strategic context is just a pretty picture. A logo designed to express a clear brand strategy becomes a powerful symbol.",
      "The startups that get this right don't just look better — they grow faster. Because when your brand strategy is clear, every decision becomes easier. You know what to say yes to and what to say no to.",
    ],
  },
  "ux-research-methods": {
    title: "5 UX Research Methods Every Product Team Should Use",
    excerpt:
      "From guerilla testing to diary studies — practical research methods that uncover real user insights without breaking the budget or timeline.",
    category: "UX Design",
    readTime: "7 min read",
    date: "2025-10-22",
    content: [
      "Great design isn't born from assumptions — it's born from understanding. UX research is how we replace guesses with evidence, hunches with insights.",
      "But research doesn't have to be expensive or time-consuming. Here are five methods we use at aBrandr that deliver outsized insights relative to their investment.",
      "1. Guerilla Usability Testing: Grab a prototype, find 5 people, and watch them try to use your product. You can do this in a coffee shop in an afternoon, and you'll uncover 80% of major usability issues.",
      "2. User Interviews: Structured conversations with real users (or potential users) reveal motivations, frustrations, and mental models that you can't discover any other way. 6-8 interviews is usually enough to identify patterns.",
      "3. Card Sorting: When your information architecture feels wrong, card sorting helps you understand how users naturally categorize information. It takes the guesswork out of navigation design.",
      "4. Analytics Review: Your existing data tells a story. Where do users drop off? Which features are most used? Where do people click that isn't clickable? Let data guide your design priorities.",
      "5. Diary Studies: For products used over time, diary studies reveal how behavior evolves. Users log their experiences over days or weeks, surfacing insights about habits, pain points, and needs that emerge over time.",
    ],
  },
  "digital-marketing-roi": {
    title: "Measuring Digital Marketing ROI: Beyond Vanity Metrics",
    excerpt:
      "Stop reporting on likes and impressions. Here's a framework for measuring the metrics that actually matter to your business growth.",
    category: "Marketing",
    readTime: "9 min read",
    date: "2025-10-05",
    content: [
      "If your marketing reports are full of impressions, likes, and followers — you're measuring the wrong things.",
      "Vanity metrics feel good but don't connect to business outcomes. Real marketing measurement ties every dollar spent to revenue impact.",
      "Start with your north star metric. What's the one number that best represents your business health? For SaaS, it might be MRR. For e-commerce, it's revenue per visitor. Every marketing activity should ultimately move this number.",
      "Map your funnel with conversion rates at each stage. Awareness → Interest → Consideration → Decision → Action. When you know your conversion rates, you can identify exactly where to invest for maximum impact.",
      "Implement proper attribution. Last-click attribution is misleading. Multi-touch attribution models (or data-driven attribution in GA4) give you a more accurate picture of which channels and campaigns drive results.",
      "Calculate Customer Acquisition Cost (CAC) by channel. Not all leads are equal. A lead from organic search might cost $20 and convert at 5%, while a paid social lead costs $50 and converts at 1%. Channel-level CAC reveals where your budget works hardest.",
      "Finally, measure Customer Lifetime Value (CLV). Marketing isn't just about acquiring customers — it's about acquiring the right customers. High-CLV customers justify higher acquisition costs and different strategies.",
    ],
  },
  "cloud-architecture-decisions": {
    title: "Cloud Architecture Decisions That Save You Money (and Pain)",
    excerpt:
      "Key architectural choices we've learned from managing cloud infrastructure for 100+ projects — and how to avoid the most common expensive mistakes.",
    category: "Engineering",
    readTime: "10 min read",
    date: "2025-09-18",
    content: [
      "Cloud architecture decisions made early in a project have compounding effects. A good decision saves money and pain for years. A bad one creates technical debt that gets more expensive to fix over time.",
      "Here are the most impactful decisions we've learned from managing infrastructure for over 100 projects at aBrandr.",
      "Right-size from the start. The most common mistake is over-provisioning. Start small, monitor actual usage, and scale up based on data — not fear. Auto-scaling groups are your friend.",
      "Use managed services wherever possible. Running your own database, cache, or message queue is almost never worth it. Managed services like RDS, ElastiCache, and SQS save operational overhead that far exceeds their premium.",
      "Design for failure. Everything fails eventually. Design systems that handle failure gracefully with circuit breakers, retry logic, health checks, and graceful degradation.",
      "Implement cost monitoring from day one. Set up billing alerts, tag resources by project and environment, and review costs weekly. Cloud bills have a way of creeping up when you're not watching.",
      "Choose the right data storage for each use case. Don't use a relational database for everything. Time-series data, document storage, key-value caching, and full-text search each have optimal solutions.",
      "Invest in CI/CD early. Automated testing and deployment pipelines pay for themselves within weeks. Manual deployments are error-prone, slow, and don't scale.",
    ],
  },
};

const validSlugs = Object.keys(postsData);

export function generateStaticParams() {
  return validSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = postsData[slug];
  if (!post) {
    return { title: "Post Not Found" };
  }
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = postsData[slug];

  if (!post) {
    return (
      <section className="pt-28 lg:pt-36 pb-16 lg:pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-dark-heading mb-4">
            Post Not Found
          </h1>
          <Link href="/blog" className="text-brand hover:underline">
            ← Back to Blog
          </Link>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="pt-28 lg:pt-36 pb-16 lg:pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-dark-text hover:text-brand text-sm font-medium mb-8 transition-colors"
            >
              <ArrowLeft size={16} />
              Back to Blog
            </Link>

            <div className="flex items-center gap-4 text-sm text-dark-text mb-4">
              <span className="flex items-center gap-1.5">
                <Tag size={14} className="text-brand" />
                {post.category}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={14} />
                {post.readTime}
              </span>
              <time>
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark-heading mb-6 leading-tight">
              {post.title}
            </h1>

            <p className="text-lg text-dark-text mb-8 leading-relaxed border-l-4 border-brand pl-4">
              {post.excerpt}
            </p>

            <div className="flex items-center gap-4 pb-8 mb-8 border-b border-dark-border">
              <div className="w-10 h-10 rounded-full bg-brand/20 flex items-center justify-center">
                <span className="text-sm font-bold text-brand">aB</span>
              </div>
              <div>
                <p className="text-sm font-medium text-dark-heading">
                  aBrandr Team
                </p>
                <p className="text-xs text-dark-text">aBrandr Solutions</p>
              </div>
              <button
                className="ml-auto flex items-center gap-1.5 text-dark-text hover:text-brand text-sm transition-colors"
                aria-label="Share article"
              >
                <Share2 size={16} />
                Share
              </button>
            </div>

            <article className="prose-custom space-y-6">
              {post.content.map((paragraph, i) => (
                <p
                  key={i}
                  className="text-dark-text leading-relaxed text-base"
                >
                  {paragraph}
                </p>
              ))}
            </article>

            <div className="mt-12 pt-8 border-t border-dark-border">
              <h3 className="text-lg font-semibold text-dark-heading mb-4">
                Ready to apply these insights?
              </h3>
              <p className="text-dark-text mb-6">
                Our team can help you implement these strategies for your
                business. Let&apos;s talk about your project.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-brand hover:bg-brand-dark text-white font-semibold px-6 py-3 rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-brand/25"
              >
                Get in Touch
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
