"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { Lock } from "lucide-react";
import Logo from "./Logo";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/careers", label: "Careers" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

/* ── Magnetic button hook ── */
function useMagnetic(strength = 0.35) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 20 });
  const sy = useSpring(y, { stiffness: 200, damping: 20 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return { ref, sx, sy, onMove, onLeave };
}

/* ── Individual nav link with underline reveal ── */
function NavLink({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <Link
      href={href}
      className="relative group text-sm font-medium tracking-wide whitespace-nowrap"
      style={{ color: active ? "var(--brand)" : "var(--dark-text, #a8adb8)" }}
    >
      <span className="relative z-10 transition-colors duration-200 group-hover:text-white">
        {label}
      </span>

      {/* animated underline */}
      <span
        className="absolute -bottom-0.5 left-0 h-px bg-brand rounded-full origin-left"
        style={{
          width: "100%",
          transform: active ? "scaleX(1)" : "scaleX(0)",
          transition: "transform 0.35s cubic-bezier(0.22,1,0.36,1)",
        }}
      />
      {!active && (
        <span
          className="absolute -bottom-0.5 left-0 h-px bg-white/40 rounded-full origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
          style={{ width: "100%" }}
        />
      )}
    </Link>
  );
}

/* ── Magnetic CTA button ── */
function MagneticAdminBtn() {
  const { ref, sx, sy, onMove, onLeave } = useMagnetic(0.3);

  return (
    <motion.a
      ref={ref}
      href="/admin"
      style={{ x: sx, y: sy }}
      onMouseMove={onMove as any}
      onMouseLeave={onLeave}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      className="relative overflow-hidden inline-flex items-center gap-1.5 bg-brand text-white text-sm font-semibold px-5 py-2.5 rounded-full shrink-0 group"
    >
      {/* shimmer sweep */}
      <span
        className="pointer-events-none absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"
        style={{ background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.18) 50%, transparent 100%)" }}
      />
      <Lock size={13} />
      Admin Login
    </motion.a>
  );
}

/* ── Mobile link with staggered entrance ── */
function MobileNavLink({
  href,
  label,
  active,
  index,
  onClick,
}: {
  href: string;
  label: string;
  active: boolean;
  index: number;
  onClick: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -32 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{
        duration: 0.4,
        delay: index * 0.055,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <Link
        href={href}
        onClick={onClick}
        className="relative flex items-center gap-4 py-3 px-2 group"
      >
        {/* number label */}
        <span
          className="text-xs font-mono tabular-nums w-5 shrink-0"
          style={{ color: active ? "var(--brand)" : "rgba(255,255,255,0.25)" }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* label */}
        <span
          className="text-2xl font-bold tracking-tight transition-colors duration-200 group-hover:text-white"
          style={{ color: active ? "var(--brand)" : "rgba(255,255,255,0.7)" }}
        >
          {label}
        </span>

        {/* arrow that slides in on hover */}
        <span
          className="ml-auto text-lg opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          →
        </span>
      </Link>
    </motion.div>
  );
}

/* ══════════════════════════════════════════
   Main Navbar
══════════════════════════════════════════ */
export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  useEffect(() => {
    const handler = () => setIsScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
    document.body.style.overflow = "";
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileOpen]);

  if (isAdmin) return null;

  const frosted = isScrolled || isMobileOpen || hovered;

  return (
    <>
      {/* ── Header shell ── */}
      <motion.header
        initial={false}
        animate={frosted ? "frosted" : "clear"}
        variants={{
          clear: {
            backgroundColor: "rgba(0,0,0,0)",
            backdropFilter: "blur(0px)",
            borderBottomColor: "rgba(255,255,255,0)",
          },
          frosted: {
            backgroundColor: "rgba(10,10,14,0.72)",
            backdropFilter: "blur(20px)",
            borderBottomColor: "rgba(255,255,255,0.06)",
          },
        }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="fixed top-0 inset-x-0 z-50 border-b"
      >
        <nav className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 flex items-center justify-between h-16 lg:h-20">

          {/* Logo */}
          <motion.div whileHover={{ scale: 1.03 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
            <Link href="/" aria-label="aBrandr home">
              <Logo className="text-xl sm:text-2xl" />
            </Link>
          </motion.div>

          {/* ── Desktop links ── */}
          <div className="hidden lg:flex items-center gap-7 xl:gap-9">
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                href={link.href}
                label={link.label}
                active={pathname === link.href}
              />
            ))}
          </div>

          {/* ── Desktop CTA ── */}
          <div className="hidden lg:block">
            <MagneticAdminBtn />
          </div>

          {/* ── Hamburger (mobile) ── */}
          <motion.button
            onClick={() => setIsMobileOpen((v) => !v)}
            className="lg:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-lg"
            aria-label={isMobileOpen ? "Close menu" : "Open menu"}
            whileTap={{ scale: 0.9 }}
          >
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="block h-px bg-white origin-center"
                animate={
                  isMobileOpen
                    ? i === 0
                      ? { rotate: 45, y: 6, width: 22 }
                      : i === 1
                      ? { opacity: 0, width: 22 }
                      : { rotate: -45, y: -6, width: 22 }
                    : { rotate: 0, y: 0, opacity: 1, width: i === 1 ? 14 : 22 }
                }
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              />
            ))}
          </motion.button>
        </nav>
      </motion.header>

      {/* ── Mobile fullscreen menu ── */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            {/* backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 lg:hidden"
              style={{ background: "rgba(5,5,9,0.96)", backdropFilter: "blur(24px)" }}
            >
              {/* decorative noise grain via pseudo via box-shadow circles */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage:
                    "radial-gradient(ellipse 60% 50% at 80% 20%, rgba(var(--brand-rgb, 99,102,241),0.08) 0%, transparent 70%)",
                }}
              />
            </motion.div>

            {/* menu content */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-x-0 bottom-0 z-50 lg:hidden flex flex-col"
              style={{ top: "4rem" }}
            >
              {/* divider line that draws in */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                exit={{ scaleX: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="h-px origin-left"
                style={{ background: "rgba(255,255,255,0.06)" }}
              />

              <div className="flex-1 overflow-y-auto px-6 sm:px-10 py-10 flex flex-col justify-between">
                {/* links */}
                <div className="flex flex-col divide-y" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
                  <AnimatePresence>
                    {navLinks.map((link, i) => (
                      <MobileNavLink
                        key={link.href}
                        href={link.href}
                        label={link.label}
                        active={pathname === link.href}
                        index={i}
                        onClick={() => setIsMobileOpen(false)}
                      />
                    ))}
                  </AnimatePresence>
                </div>

                {/* bottom CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.4, delay: navLinks.length * 0.055 + 0.05, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-10 pb-safe"
                >
                  <Link
                    href="/admin"
                    onClick={() => setIsMobileOpen(false)}
                    className="inline-flex items-center gap-2 bg-brand text-white text-sm font-semibold px-7 py-3.5 rounded-full w-full justify-center"
                  >
                    <Lock size={14} />
                    Admin Login
                  </Link>

                  {/* subtle footer note */}
                  <p className="text-center text-xs mt-6" style={{ color: "rgba(255,255,255,0.2)" }}>
                    © {new Date().getFullYear()} aBrandr
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}