"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSkipHeavyMotion } from "@/hooks/useSkipHeavyMotion";

gsap.registerPlugin(ScrollTrigger);

// Individual pieces cut out of the real hero photo (segmented from
// public/generated/hero-alive-bg.png via brightness/connected-component
// analysis — see public/generated/hero-pieces/pieces.json for source
// bounding boxes). Each mask is a full-canvas alpha map for its one piece;
// masking the same photo + same background-position as the base guarantees
// pixel-perfect alignment at rest, no matter the viewport size.
const PIECE_COUNT = 12;

function buildPieces() {
  return Array.from({ length: PIECE_COUNT }, (_, i) => {
    const angle = Math.random() * Math.PI * 2;
    // Mostly-upward bias ("toward the light") with some spread.
    const dist = 46 + Math.random() * 58;
    return {
      mask: `/generated/hero-pieces/piece-${i}-mask.png`,
      toX: Math.cos(angle) * dist * 0.6,
      toY: -Math.abs(Math.sin(angle) * dist) - 24,
      toRotate: (Math.random() - 0.5) * 22,
    };
  });
}

const BG_STYLE = {
  backgroundImage: "url(/generated/hero-alive-bg.png)",
  backgroundSize: "cover",
  backgroundPosition: "70% 50%",
} as const;

export default function HeroFallback() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [entered, setEntered] = useState(false);
  const pieces = useMemo(() => buildPieces(), []);
  const sectionRef = useRef<HTMLElement>(null);
  const pieceRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { skip: skipScroll } = useSkipHeavyMotion();

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(motionQuery.matches);

    // Entrance reveal for the headline + CTA — reduced motion skips
    // straight to the visible state, otherwise wait a frame so the
    // hidden class has actually painted before transitioning.
    if (motionQuery.matches) {
      setEntered(true);
    } else {
      requestAnimationFrame(() => requestAnimationFrame(() => setEntered(true)));
    }
  }, []);

  useEffect(() => {
    // Scroll-linked assembly: pieces sit in their real, correct spot at the
    // top of the page and drift apart as you scroll through the hero,
    // reassembling automatically on the way back up (scrub follows the
    // scrollbar in both directions). Skipped on mobile/reduced-motion —
    // the pieces just stay in their correct, already-assembled position.
    if (skipScroll) return;
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      pieceRefs.current.forEach((el, i) => {
        if (!el) return;
        const p = pieces[i];
        gsap.to(el, {
          x: p.toX,
          y: p.toY,
          rotate: p.toRotate,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
          },
        });
      });
    }, section);

    return () => ctx.revert();
  }, [pieces, skipScroll]);

  return (
    <section ref={sectionRef} className="relative flex items-center overflow-hidden" style={{ minHeight: "100vh" }}>
      <div className="absolute inset-0">
        {/* Base photo — the extracted pieces below are inpainted out of this
            version (softened to a glow), so nothing doubles up when they
            drift away. */}
        <div aria-hidden className="absolute inset-0" style={{ backgroundImage: "url(/generated/hero-alive-bg-base.png)", backgroundSize: "cover", backgroundPosition: "70% 50%" }} />

        {/* The individual real pieces, masked out of the actual photo. */}
        {pieces.map((p, i) => (
          <div
            key={i}
            ref={(el) => {
              pieceRefs.current[i] = el;
            }}
            aria-hidden
            className="absolute inset-0"
            style={{
              ...BG_STYLE,
              maskImage: `url(${p.mask})`,
              WebkitMaskImage: `url(${p.mask})`,
              maskSize: "cover",
              WebkitMaskSize: "cover",
              maskPosition: "70% 50%",
              WebkitMaskPosition: "70% 50%",
              maskRepeat: "no-repeat",
              WebkitMaskRepeat: "no-repeat",
            }}
          />
        ))}

        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(17,17,17,0.97) 0%, rgba(17,17,17,0.8) 42%, rgba(17,17,17,0.35) 72%, rgba(17,17,17,0.08) 100%), linear-gradient(0deg, rgba(17,17,17,0.85) 0%, rgba(17,17,17,0) 35%)",
          }}
        />
      </div>

      <div className="relative z-10 w-full px-7" style={{ maxWidth: 1180, margin: "0 auto" }}>
        <div className="max-w-[560px]">
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
            className={entered ? "hero-blur-visible" : "hero-blur-hidden"}
            style={{
              fontSize: "clamp(2.6rem, 5vw, 4rem)",
              lineHeight: 1.05,
              maxWidth: "14ch",
            }}
          >
            Wir bauen dir dein eigenes System.
            <br />
            <span className="accent">Du besitzt es.</span>
          </h1>

          <p
            className="mt-6"
            style={{
              fontSize: "clamp(1.02rem, 1.6vw, 1.18rem)",
              color: "var(--warm-grey-dim)",
              lineHeight: 1.65,
              maxWidth: "48ch",
            }}
          >
            Personalisierte Dashboards, Portale und Automatisierungen im
            White-Label — fertig gebaut, an dich übergeben, auf deiner
            Infrastruktur, unter deiner Marke.
          </p>

          <div className="mt-9">
            <a
              href="#kontakt"
              className={`inline-flex items-center gap-2.5 rounded-[10px] px-7 py-4 font-semibold btn-amber ${entered ? "hero-cta-visible" : "hero-cta-hidden"}`}
              style={{
                background: "var(--amber)",
                color: "#161104",
                fontSize: "15.5px",
                ["--reveal-delay" as string]: "220ms",
              }}
            >
              Jetzt Kontakt aufnehmen
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width={16} height={16}>
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>

          <div
            className="mono mt-7"
            style={{
              fontSize: 12.5,
              color: "var(--warm-grey-faint)",
              opacity: entered && !reducedMotion ? 1 : entered ? 1 : 0,
              transition: "opacity 0.6s ease 0.4s",
            }}
          >
            DSGVO-konform · Gebaut in Deutschland · Für jede Branche
          </div>
        </div>
      </div>
    </section>
  );
}
