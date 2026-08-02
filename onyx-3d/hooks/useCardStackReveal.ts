"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

const EASE = "cubic-bezier(0.34, 1.56, 0.64, 1)";
const DURATION = 600;
const STAGGER = 90;

// Avoids the SSR "useLayoutEffect does nothing on the server" warning
// during the static build, while still measuring synchronously before
// paint in the browser.
const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Cards start visually stacked on top of the first card (like a physical
 * deck, slightly fanned via rotate+scale) and fly out — left/up to
 * right/down — to their own CSS Grid slot once the group scrolls into
 * view. Every card keeps its normal grid position the whole time; only
 * `transform` moves it, so layout and responsiveness are untouched and no
 * extra wrapper elements are needed.
 */
export function useCardStackReveal<T extends HTMLElement = HTMLDivElement>(
  count: number,
  disabled = false
) {
  const elements = useRef<(T | null)[]>([]);
  const [offsets, setOffsets] = useState<{ dx: number; dy: number }[]>(() =>
    new Array(count).fill(null).map(() => ({ dx: 0, dy: 0 }))
  );
  const [visible, setVisible] = useState(disabled);
  const [settled, setSettled] = useState<boolean[]>(() =>
    new Array(count).fill(disabled)
  );

  const measure = useCallback(() => {
    const els = elements.current;
    const anchor = els[0]?.getBoundingClientRect();
    if (!anchor) return;
    setOffsets(
      els.map((el) => {
        if (!el) return { dx: 0, dy: 0 };
        const r = el.getBoundingClientRect();
        return { dx: anchor.left - r.left, dy: anchor.top - r.top };
      })
    );
  }, []);

  useIsoLayoutEffect(() => {
    if (disabled) return;
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [disabled, measure]);

  useEffect(() => {
    if (disabled) {
      setVisible(true);
      setSettled(new Array(count).fill(true));
      return;
    }
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reducedMotion) {
      setVisible(true);
      setSettled(new Array(count).fill(true));
      return;
    }

    const anchor = elements.current[0];
    if (!anchor) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    observer.observe(anchor);
    return () => observer.disconnect();
  }, [count, disabled]);

  const setRef = useCallback(
    (index: number) => (el: T | null) => {
      elements.current[index] = el;
    },
    []
  );

  const markSettled = useCallback((index: number) => {
    setSettled((prev) => {
      if (prev[index]) return prev;
      const next = [...prev];
      next[index] = true;
      return next;
    });
  }, []);

  function getStackStyle(index: number): React.CSSProperties | undefined {
    if (settled[index]) return undefined;
    const { dx, dy } = offsets[index] ?? { dx: 0, dy: 0 };
    const rotate = index % 2 === 0 ? -2 : 2;
    return {
      transform: visible
        ? "translate(0px, 0px) rotate(0deg) scale(1)"
        : `translate(${dx}px, ${dy}px) rotate(${rotate}deg) scale(0.95)`,
      transition: `transform ${DURATION}ms ${EASE} ${index * STAGGER}ms`,
      zIndex: count - index,
      willChange: "transform",
    };
  }

  function onTransitionEnd(index: number) {
    return (e: React.TransitionEvent<HTMLElement>) => {
      if (e.propertyName === "transform" && visible) markSettled(index);
    };
  }

  return { setRef, getStackStyle, onTransitionEnd };
}
