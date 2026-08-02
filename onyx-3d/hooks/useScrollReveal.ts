"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Tracks a fixed-size list of elements and flips each one to "visible"
 * exactly once, the first time it scrolls into the viewport. When
 * `disabled` is true (used to keep subpages that share a component with
 * the homepage completely animation-free), every item starts and stays
 * visible with no observer attached at all.
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  count: number,
  disabled = false
) {
  const elements = useRef<(T | null)[]>([]);
  const [visible, setVisible] = useState<boolean[]>(() =>
    new Array(count).fill(disabled)
  );

  useEffect(() => {
    if (disabled) {
      setVisible(new Array(count).fill(true));
      return;
    }

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reducedMotion) {
      setVisible(new Array(count).fill(true));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const index = Number(
            (entry.target as HTMLElement).dataset.revealIndex
          );
          setVisible((prev) => {
            if (prev[index]) return prev;
            const next = [...prev];
            next[index] = true;
            return next;
          });
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );

    elements.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, disabled]);

  const setRef = useCallback(
    (index: number) => (el: T | null) => {
      elements.current[index] = el;
    },
    []
  );

  return { setRef, visible };
}
