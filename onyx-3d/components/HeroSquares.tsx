"use client";

import { forwardRef } from "react";

/**
 * Flat, CSS-only replacement for the old R3F module-assembly scene — same
 * "modular system" idea (rectangles instead of a wordmark), but as light
 * hairline/glow panels that sit in the hero's open space instead of
 * overlapping the headline. Ref target for Hero's existing scroll progress
 * (settles + fades slightly as the pin progresses, no WebGL needed).
 */
const RECTS: { top: string; left?: string; right?: string; w: number; h: number; rotate: number; delay: number; filled?: boolean }[] = [
  { top: "6%", left: "8%", w: 96, h: 140, rotate: -8, delay: 0 },
  { top: "2%", left: "22%", w: 60, h: 60, rotate: 10, delay: 0.6, filled: true },
  { top: "10%", right: "10%", w: 130, h: 90, rotate: 6, delay: 0.3 },
  { top: "1%", right: "26%", w: 70, h: 160, rotate: -12, delay: 0.9 },
  { top: "64%", left: "4%", w: 110, h: 110, rotate: 14, delay: 1.2, filled: true },
  { top: "68%", right: "6%", w: 84, h: 190, rotate: -6, delay: 0.45 },
];

const HeroSquares = forwardRef<HTMLDivElement>(function HeroSquares(_props, ref) {
  return (
    <div ref={ref} aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden hero-squares">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(232,163,61,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(232,163,61,0.05) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, black 0%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, black 0%, transparent 75%)",
        }}
      />
      {RECTS.map((r, i) => (
        <span
          key={i}
          className="hero-square"
          style={{
            position: "absolute",
            top: r.top,
            left: r.left,
            right: r.right,
            width: r.w,
            height: r.h,
            borderRadius: 10,
            border: "1px solid rgba(232,163,61,0.32)",
            background: r.filled ? "rgba(232,163,61,0.07)" : "transparent",
            boxShadow: "0 0 40px 6px rgba(232,163,61,0.08)",
            ["--rot" as string]: `${r.rotate}deg`,
            animationDelay: `${r.delay}s`,
          }}
        />
      ))}
    </div>
  );
});

export default HeroSquares;
