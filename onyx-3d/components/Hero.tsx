"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { ScrollProgressRef } from "./HeroScene";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const pinRef = useRef<HTMLDivElement>(null);
  const textWrapRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<ScrollProgressRef>({ current: 0 });
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    setMounted(true);
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobileQuery = window.matchMedia("(max-width: 767px)");
    setReducedMotion(motionQuery.matches);
    setIsMobile(mobileQuery.matches);

    // Entrance reveal for the headline + CTAs — reduced motion skips
    // straight to the visible state, otherwise wait a frame so the
    // hidden class has actually painted before transitioning.
    if (motionQuery.matches) {
      setEntered(true);
    } else {
      requestAnimationFrame(() => requestAnimationFrame(() => setEntered(true)));
    }

    // The scroll-scrubbed 3D scene is positioned for wide viewports — on
    // narrow screens there's no space beside the text for it to live, so it
    // skips straight to a lightweight static fallback instead of overlapping.
    if (motionQuery.matches || mobileQuery.matches) {
      progressRef.current.current = 1;
      return;
    }

    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: pinRef.current,
          start: "top top",
          end: "+=120%",
          scrub: 1,
          pin: true,
          onUpdate: (self) => {
            progressRef.current.current = self.progress;
            // Recedes into the background only in the last stretch of the
            // pin (modules have already assembled by then) — a "wheel"
            // hand-off cue right before WhyNowSection takes over, without
            // touching the module-assembly progress itself.
            const el = textWrapRef.current;
            if (el) {
              const recede = Math.max(0, (self.progress - 0.72) / 0.28);
              el.style.opacity = String(1 - recede * 0.85);
              el.style.transform = `scale(${1 - recede * 0.12})`;
            }
          },
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={pinRef}
      className="relative h-screen overflow-hidden"
    >
      <div className="absolute inset-0">
        {mounted && !isMobile && !reducedMotion && (
          <HeroScene progressRef={progressRef.current} />
        )}
        {mounted && (isMobile || reducedMotion) && (
          <div
            aria-hidden
            className="absolute"
            style={{
              width: "70vw",
              height: "70vw",
              maxWidth: 420,
              maxHeight: 420,
              right: "-20%",
              bottom: "-15%",
              background:
                "radial-gradient(circle, rgba(232,163,61,0.16) 0%, rgba(232,163,61,0) 70%)",
            }}
          />
        )}
      </div>

      <div className="relative z-10 h-full flex items-center pointer-events-none">
        <div
          className="mx-auto w-full px-7 pointer-events-none"
          style={{ maxWidth: 1180 }}
        >
          <div
            ref={textWrapRef}
            className="max-w-[560px] mx-auto text-center pointer-events-auto"
            style={{ transformOrigin: "center center" }}
          >
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-6 mono"
              style={{
                fontSize: 12,
                color: "var(--warm-grey-dim)",
                border: "1px solid var(--hairline)",
                background: "rgba(245,242,236,0.03)",
              }}
            >
              <span
                className="inline-block rounded-full"
                style={{
                  width: 6,
                  height: 6,
                  background: "var(--amber)",
                  boxShadow: "0 0 8px 1px rgba(232,163,61,0.6)",
                }}
              />
              Kein Bot — der Gründer antwortet selbst
            </div>

            <span
              className="mono block mb-4"
              style={{
                fontSize: "12.5px",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--amber)",
              }}
            >
              White-Label-Systeme · Bauen &amp; übergeben
            </span>

            <h1
              className={`mx-auto ${entered ? "hero-blur-visible" : "hero-blur-hidden"}`}
              style={{
                fontSize: "clamp(2.4rem, 4.4vw, 3.7rem)",
                lineHeight: 1.06,
                maxWidth: "15ch",
              }}
            >
              Wir bauen dir dein eigenes System.
              <br />
              <span className="accent">Du besitzt es.</span>
            </h1>

            <p
              className="mt-6 mx-auto max-w-[52ch]"
              style={{
                fontSize: "clamp(1.02rem, 1.6vw, 1.18rem)",
                color: "var(--warm-grey-dim)",
                lineHeight: 1.65,
              }}
            >
              Personalisierte Dashboards, Portale und Automatisierungen im
              White-Label — fertig gebaut, an dich übergeben, auf deiner
              Infrastruktur, unter deiner Marke.
            </p>

            <div className="flex flex-wrap justify-center gap-3.5 mt-9">
              <a
                href="#kontakt"
                className={`inline-flex items-center gap-2.5 rounded-[10px] px-6 py-4 font-semibold btn-amber ${entered ? "hero-cta-visible" : "hero-cta-hidden"}`}
                style={{
                  background: "var(--amber)",
                  color: "#161104",
                  fontSize: "15.5px",
                  ["--reveal-delay" as string]: "220ms",
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  width={18}
                  height={18}
                >
                  <path d="M4 6h16v12H4z" fill="none" />
                  <path d="m4 7 8 6 8-6" />
                </svg>
                Jetzt Kontakt aufnehmen
              </a>
              <a
                href="https://calendly.com/onyx-ai/30min"
                target="_blank"
                rel="noopener"
                className={`inline-flex items-center gap-2.5 rounded-[10px] px-6 py-4 font-semibold btn-ghost ${entered ? "hero-cta-visible" : "hero-cta-hidden"}`}
                style={{
                  background: "transparent",
                  color: "var(--warm-grey)",
                  border: "1px solid var(--hairline)",
                  fontSize: "15.5px",
                  ["--reveal-delay" as string]: "320ms",
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  width={18}
                  height={18}
                >
                  <rect x="3.5" y="5" width="17" height="16" rx="2.2" />
                  <path d="M8 3v4M16 3v4M3.5 10h17" />
                  <path d="m8.5 14 1.8 1.8L14.5 12" />
                </svg>
                30 Min. Termin buchen
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
