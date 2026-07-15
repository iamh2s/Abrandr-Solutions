"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import TextReveal from "./TextReveal";
import MagneticButton from "./MagneticButton";
import InfiniteMarquee from "./InfiniteMarquee";
import Logo from "./Logo";

const footerLinks = {
  Services: [
    { label: "Branding & Identity", href: "/services#branding" },
    { label: "UI/UX Design", href: "/services#uiux" },
    { label: "Web Development", href: "/services#web" },
    { label: "Mobile Apps", href: "/services#mobile" },
    { label: "Digital Marketing", href: "/services#marketing" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Our Work", href: "/work" },
    { label: "Careers", href: "/careers" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
  Connect: [
    { label: "hello@abrandr.com", href: "mailto:hello@abrandr.com" },
    { label: "LinkedIn", href: "#" },
    { label: "Twitter / X", href: "#" },
    { label: "Instagram", href: "#" },
  ],
};

export default function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  return (
    <footer className="bg-dark border-t border-dark-border relative overflow-hidden">
      {/* Background marquee */}
      <div className="absolute inset-0 flex items-center pointer-events-none opacity-50">
        <InfiniteMarquee
          items={["DREAM", "BUILD", "LAUNCH", "DISRUPT", "SCALE", "REPEAT"]}
          speed={40}
        />
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
          <TextReveal as="h2" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark-heading mb-6">
            Your next big idea deserves a{" "}
            <span className="gradient-text">world-class team.</span>
          </TextReveal>
          <AnimatedSection delay={0.2}>
            <p className="text-dark-text text-lg mb-8">
              Stop dreaming. Start shipping. We&apos;re the team that turns
              &quot;what if&quot; into &quot;what&apos;s next.&quot; Let&apos;s make it happen.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.3}>
            <MagneticButton>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-brand hover:bg-brand-dark text-white font-semibold px-8 py-4 rounded-full text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-brand/30 group relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Ignite Your Project
                  <motion.span
                    className="inline-block"
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowUpRight size={20} />
                  </motion.span>
                </span>
              </Link>
            </MagneticButton>
          </AnimatedSection>
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          <div data-aos="fade-up" data-aos-delay="0">
            <Link href="/" className="inline-block">
              <Logo className="text-2xl" />
            </Link>
            <p className="mt-4 text-sm text-dark-text">
              We don&apos;t just build digital products. We ignite brands that
              conquer markets. 30+ countries. Since 2016.
            </p>
          </div>
          {Object.entries(footerLinks).map(([title, links], idx) => (
            <div key={title} data-aos="fade-up" data-aos-delay={String((idx + 1) * 100)}>
              <h3 className="text-sm font-semibold text-dark-heading uppercase tracking-wider mb-4">
                {title}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-dark-text hover:text-brand transition-colors duration-300 link-underline pb-0.5"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-dark-border relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-dark-text">
            © {new Date().getFullYear()} aBrandr Solutions. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-xs text-dark-text hover:text-brand transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-xs text-dark-text hover:text-brand transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
