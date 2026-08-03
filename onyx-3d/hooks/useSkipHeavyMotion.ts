"use client";

import { useEffect, useState } from "react";

/**
 * Scroll-scrubbed effects (blur filters, pinning, settle transforms) are
 * expensive to keep synced with scroll on narrow/lower-powered mobile
 * viewports, and mobile layouts rarely have the space these effects were
 * designed for anyway — so both mobile and prefers-reduced-motion skip them,
 * same convention Hero.tsx established first.
 */
export function useSkipHeavyMotion() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobileQuery = window.matchMedia("(max-width: 767px)");
    setReducedMotion(motionQuery.matches);
    setIsMobile(mobileQuery.matches);
  }, []);

  return { reducedMotion, isMobile, skip: reducedMotion || isMobile };
}
