"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Hero() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [entered, setEntered] = useState(false);

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

  return (
    <section className="relative flex items-center overflow-hidden" style={{ minHeight: "100vh" }}>
      <div className="absolute inset-0">
        <Image
          src="/generated/hero-alive-bg.png"
          alt=""
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "70% 50%" }}
        />
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
