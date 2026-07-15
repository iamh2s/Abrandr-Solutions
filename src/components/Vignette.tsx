"use client";

export default function Vignette() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-[50]"
      style={{
        background: "radial-gradient(ellipse 70% 60% at 50% 50%, transparent 50%, rgba(9,9,11,0.6) 100%)",
      }}
    />
  );
}
