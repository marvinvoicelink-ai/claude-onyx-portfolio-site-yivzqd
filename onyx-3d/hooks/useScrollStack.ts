"use client";

import { useEffect, useRef, useState } from "react";

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
  }, []);

  return reduced;
}

/**
 * A pinned "card deck": the wrapper reserves `count` viewport-heights of
 * scroll room, its child stays sticky, and `index` advances one card per
 * step based on how far the wrapper has scrolled past — not on scroll
 * speed or direction, so fast flicks and scrolling back up both land on
 * the right card.
 */
export function useScrollStack(count: number, disabled = false) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  // Continuous 0..count progress (e.g. 2.35 = card 2 is 35% through its own
  // exit) — cards use this to animate smoothly instead of snapping between
  // discrete slots. `index` (the floored, clamped version) stays around for
  // consumers that only need "which card is currently active" (dots).
  const [continuousIndex, setContinuousIndex] = useState(0);
  const reducedMotion = usePrefersReducedMotion();
  const staticFallback = disabled || reducedMotion;

  useEffect(() => {
    if (staticFallback) return;

    let ticking = false;
    function update() {
      ticking = false;
      const el = wrapperRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const progress = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
      setContinuousIndex(progress * count);
      setIndex(Math.min(count - 1, Math.floor(progress * count)));
    }
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [count, staticFallback]);

  return { wrapperRef, index, continuousIndex, staticFallback };
}
