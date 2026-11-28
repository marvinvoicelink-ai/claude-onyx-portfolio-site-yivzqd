"use client";

import { useEffect, useRef } from "react";

/**
 * Stummes Schleifen-Video, das erst lädt, wenn es in die Nähe des Bildschirms
 * kommt, und pausiert, sobald es weg ist. Die Landingpage wird fast nur aus
 * Facebook/Instagram am Handy geöffnet, oft über mobile Daten: Ohne das zögen
 * alle Videos zusammen gut 5 MB, bevor man überhaupt scrollt.
 * Bei „Bewegung reduzieren“ bleibt das Standbild stehen.
 */
export default function LazyVideo({ src, poster, label, className }: { src: string; poster?: string; label: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) {
      v.src = src;
      v.play().catch(() => {});
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          if (!v.getAttribute("src")) v.src = src;
          v.play().catch(() => {});
        } else if (!v.paused) {
          v.pause();
        }
      },
      { rootMargin: "200px 0px" },
    );
    io.observe(v);
    return () => io.disconnect();
  }, [src]);

  return <video ref={ref} poster={poster} muted loop playsInline preload="none" className={className} aria-label={label} />;
}
