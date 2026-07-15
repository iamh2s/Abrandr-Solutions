"use client";

import { useEffect, useRef, useCallback } from "react";

export default function CinematicCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<HTMLDivElement[]>([]);
  const mouse = useRef({ x: -100, y: -100 });
  const pos = useRef({
    dot: { x: -100, y: -100 },
    ring: { x: -100, y: -100 },
    trails: Array.from({ length: 5 }, () => ({ x: -100, y: -100 })),
  });
  const raf = useRef<number>(0);
  const isHovering = useRef(false);
  const isClicking = useRef(false);

  const render = useCallback(() => {
    const { dot, ring, trails } = pos.current;
    const mx = mouse.current.x;
    const my = mouse.current.y;

    dot.x += (mx - dot.x) * 0.28;
    dot.y += (my - dot.y) * 0.28;
    ring.x += (mx - ring.x) * 0.14;
    ring.y += (my - ring.y) * 0.14;

    // trail particles follow with increasing lag
    for (let i = 0; i < trails.length; i++) {
      const prev = i === 0 ? dot : trails[i - 1];
      trails[i].x += (prev.x - trails[i].x) * (0.2 - i * 0.03);
      trails[i].y += (prev.y - trails[i].y) * (0.2 - i * 0.03);
      if (trailRefs.current[i]) {
        const size = 4 - i * 0.6;
        const opacity = 0.4 - i * 0.07;
        trailRefs.current[i].style.transform = `translate3d(${trails[i].x - size / 2}px, ${trails[i].y - size / 2}px, 0)`;
        trailRefs.current[i].style.width = `${size}px`;
        trailRefs.current[i].style.height = `${size}px`;
        trailRefs.current[i].style.opacity = String(opacity);
      }
    }

    if (dotRef.current) {
      const scale = isClicking.current ? 0.6 : isHovering.current ? 1.5 : 1;
      dotRef.current.style.transform = `translate3d(${dot.x - 6}px, ${dot.y - 6}px, 0) scale(${scale})`;
    }
    if (ringRef.current) {
      const w = isHovering.current ? 32 : 20;
      const ringScale = isClicking.current ? 0.8 : 1;
      ringRef.current.style.transform = `translate3d(${ring.x - w}px, ${ring.y - w}px, 0) scale(${ringScale})`;
      ringRef.current.style.width = `${w * 2}px`;
      ringRef.current.style.height = `${w * 2}px`;
      ringRef.current.style.opacity = isHovering.current ? "0.3" : "0.5";
    }

    raf.current = requestAnimationFrame(render);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    const attachListeners = () => {
      const els = document.querySelectorAll("a, button, [role='button'], input, textarea, select, label[for]");
      els.forEach((el) => {
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    };

    const onEnter = () => { isHovering.current = true; };
    const onLeave = () => { isHovering.current = false; };
    const onDown = () => { isClicking.current = true; };
    const onUp = () => { isClicking.current = false; };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    attachListeners();

    // watch for DOM changes to re-attach listeners
    const observer = new MutationObserver(() => {
      attachListeners();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    raf.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      observer.disconnect();
      cancelAnimationFrame(raf.current);
    };
  }, [render]);

  return (
    <>
      {/* Trail particles */}
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          ref={(el) => { if (el) trailRefs.current[i] = el; }}
          className="fixed top-0 left-0 rounded-full bg-brand pointer-events-none z-[9997] hidden lg:block"
          style={{ width: 4, height: 4, opacity: 0 }}
        />
      ))}
      {/* Main dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-3 h-3 rounded-full bg-brand pointer-events-none z-[9999] mix-blend-difference hidden lg:block transition-[transform] duration-100"
      />
      {/* Outer ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-10 h-10 rounded-full border-[1.5px] border-brand pointer-events-none z-[9998] hidden lg:block transition-[width,height,opacity] duration-200"
        style={{ opacity: 0.5 }}
      />
    </>
  );
}
