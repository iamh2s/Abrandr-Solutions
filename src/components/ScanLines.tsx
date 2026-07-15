"use client";

export default function ScanLines() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-[55] opacity-[0.03]"
      style={{
        backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(255,255,255,0.03) 1px, rgba(255,255,255,0.03) 2px)",
        backgroundSize: "100% 2px",
      }}
    />
  );
}
