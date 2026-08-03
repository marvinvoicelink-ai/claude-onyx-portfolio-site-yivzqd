"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Wraps a section so it recedes ("exit") as it scrolls out of view and/or
 * grows in from a receded state ("enter") as it scrolls into view — the
 * "wheel" feel of one chapter tipping back while the next comes forward.
 * Used sparingly at a handful of chapter breaks, not on every section
 * (see onyx-3d-website skill: one carried narrative beats many competing
 * transitions on the same page).
 */
export default function WheelTransition({
  children,
  edge,
}: {
  children: React.ReactNode;
  edge: "enter" | "exit" | "both";
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reducedMotion) return;

    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      if (edge === "enter" || edge === "both") {
        gsap.fromTo(
          el,
          { opacity: 0.3, scale: 0.88, filter: "blur(4px)" },
          {
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top 92%",
              end: "top 42%",
              scrub: 0.4,
            },
          }
        );
      }
      if (edge === "exit" || edge === "both") {
        gsap.fromTo(
          el,
          { opacity: 1, scale: 1, filter: "blur(0px)" },
          {
            opacity: 0.25,
            scale: 0.88,
            filter: "blur(4px)",
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "bottom 60%",
              end: "bottom 8%",
              scrub: 0.4,
            },
          }
        );
      }
    }, ref);

    return () => ctx.revert();
  }, [edge]);

  return (
    <div ref={ref} style={{ transformOrigin: "center top" }}>
      {children}
    </div>
  );
}
