"use client";

import { useEffect, useMemo, useState } from "react";

type Glyph = { top: string; left: string; size: number; delay: number; kind: "hex" | "bracket" | "dot" };

const glyphs: Glyph[] = [
  { top: "18%", left: "8%", size: 22, delay: 280, kind: "hex" },
  { top: "62%", left: "5%", size: 16, delay: 420, kind: "bracket" },
  { top: "40%", left: "22%", size: 7, delay: 560, kind: "dot" },
  { top: "78%", left: "18%", size: 18, delay: 700, kind: "hex" },
  { top: "12%", left: "30%", size: 6, delay: 840, kind: "dot" },
];

function GlyphIcon({ kind, size }: { kind: Glyph["kind"]; size: number }) {
  if (kind === "dot") {
    return (
      <span
        className="inline-block rounded-full"
        style={{ width: size, height: size, background: "var(--amber)", boxShadow: "0 0 10px 2px rgba(232,163,61,0.7)" }}
      />
    );
  }
  if (kind === "bracket") {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="var(--amber)" strokeWidth={1.6} strokeLinecap="round" style={{ filter: "drop-shadow(0 0 6px rgba(232,163,61,0.6))" }}>
        <path d="M9 4 4 4 4 9" />
        <path d="M15 20 20 20 20 15" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="var(--amber)" strokeWidth={1.4} style={{ filter: "drop-shadow(0 0 6px rgba(232,163,61,0.55))" }}>
      <path d="M12 2 21 7 21 17 12 22 3 17 3 7 Z" />
    </svg>
  );
}

// The right-hand portion of the photo (where its own module cluster sits)
// is cut into a grid of tiles. Each tile shows the exact matching slice of
// the real photo (same background-image/size/position, just clipped) and
// flies in from a scattered offset to its correct spot — the moving pieces
// are the actual photo, not a synthetic overlay.
const TILE_REGION = { xStart: 45, xEnd: 100, yStart: 0, yEnd: 100 };
const TILE_COLS = 4;
const TILE_ROWS = 3;

function buildTiles() {
  const tiles: {
    clipPath: string;
    fromX: number;
    fromY: number;
    fromRotate: number;
    delay: number;
  }[] = [];

  for (let row = 0; row < TILE_ROWS; row++) {
    for (let col = 0; col < TILE_COLS; col++) {
      const left = TILE_REGION.xStart + (col / TILE_COLS) * (TILE_REGION.xEnd - TILE_REGION.xStart);
      const right = 100 - (TILE_REGION.xStart + ((col + 1) / TILE_COLS) * (TILE_REGION.xEnd - TILE_REGION.xStart));
      const top = TILE_REGION.yStart + (row / TILE_ROWS) * (TILE_REGION.yEnd - TILE_REGION.yStart);
      const bottom = 100 - (TILE_REGION.yStart + ((row + 1) / TILE_ROWS) * (TILE_REGION.yEnd - TILE_REGION.yStart));

      // Small entrance offset (not a big scatter) — the pieces are already
      // roughly in place, they just settle in gently.
      tiles.push({
        clipPath: `inset(${top}% ${right}% ${bottom}% ${left}%)`,
        fromX: -8 - Math.random() * 10,
        fromY: 6 + Math.random() * 8,
        fromRotate: (Math.random() - 0.5) * 6,
        delay: (row * TILE_COLS + col) * 35 + Math.random() * 100,
      });
    }
  }
  return tiles;
}

const BG_STYLE = {
  backgroundImage: "url(/generated/hero-alive-bg.png)",
  backgroundSize: "cover",
  backgroundPosition: "70% 50%",
} as const;

export default function Hero() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [entered, setEntered] = useState(false);
  const [settled, setSettled] = useState(false);
  const tiles = useMemo(() => buildTiles(), []);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(motionQuery.matches);

    // Entrance reveal for the headline + CTA + photo tiles — reduced motion
    // skips straight to the visible state, otherwise wait a frame so the
    // hidden state has actually painted before transitioning.
    if (motionQuery.matches) {
      setEntered(true);
      setSettled(true);
      return;
    }
    requestAnimationFrame(() => requestAnimationFrame(() => setEntered(true)));
    // Once the tiles have arrived, hand them off to the continuous,
    // barely-there idle drift toward the light.
    const settleTimer = setTimeout(() => setSettled(true), 1500);
    return () => clearTimeout(settleTimer);
  }, []);

  return (
    <section className="relative flex items-center overflow-hidden" style={{ minHeight: "100vh" }}>
      <div className="absolute inset-0">
        {/* Left/static portion of the photo — never animates. */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ ...BG_STYLE, clipPath: `inset(0% ${100 - TILE_REGION.xStart}% 0% 0%)` }}
        />

        {/* Right portion — the same photo, cut into tiles that fly in from
            scattered positions to reassemble the real picture on load. */}
        {tiles.map((t, i) => (
          <div
            key={i}
            aria-hidden
            className={`absolute inset-0 ${settled && !reducedMotion ? "hero-tile-drift" : ""}`}
            style={{
              ...BG_STYLE,
              clipPath: t.clipPath,
              opacity: entered ? 1 : 0,
              transform: settled
                ? undefined
                : entered
                  ? "translate(0, 0) rotate(0deg)"
                  : `translate(${t.fromX}px, ${t.fromY}px) rotate(${t.fromRotate}deg)`,
              transition: settled ? undefined : "opacity 0.7s ease, transform 1.1s cubic-bezier(0.16, 1, 0.3, 1)",
              transitionDelay: settled ? undefined : `${t.delay}ms`,
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

        {/* Small accent glyphs drifting toward the light source baked into
            the photo (the glowing module cluster upper-right) — a couple of
            extra marks fading in alongside the tiles reassembling. */}
        <div aria-hidden className="absolute inset-0" style={{ pointerEvents: "none" }}>
          {glyphs.map((g, i) => (
            <div
              key={i}
              className="absolute"
              style={{
                top: g.top,
                left: g.left,
                opacity: entered ? 0.85 : 0,
                transform: entered ? "translate(0, 0) scale(1)" : "translate(-18px, 14px) scale(0.85)",
                transition: "opacity 1s ease, transform 1.1s cubic-bezier(0.16, 1, 0.3, 1)",
                transitionDelay: `${g.delay}ms`,
              }}
            >
              <GlyphIcon kind={g.kind} size={g.size} />
            </div>
          ))}
        </div>
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
