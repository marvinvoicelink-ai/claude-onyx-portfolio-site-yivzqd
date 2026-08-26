"use client";

import { useEffect, useState } from "react";

/**
 * The sharp HTML text layer (badge, kicker, headline) that sits above
 * whichever hero background is active — the same layer whether the 3D
 * scene or the static fallback renders behind it.
 */
export default function HeroForeground() {
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (motionQuery.matches) {
      setEntered(true);
    } else {
      requestAnimationFrame(() => requestAnimationFrame(() => setEntered(true)));
    }
  }, []);

  return (
    <div className="relative z-10 w-full px-7" style={{ maxWidth: 1180, margin: "0 auto" }}>
      <div className="max-w-[680px] mx-auto text-center flex flex-col items-center">
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
              boxShadow: "0 0 8px 1px rgba(232, 163, 61,0.6)",
            }}
          />
          Kein Account-Manager, direkt zum Chef
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
          Systeme unter deinem Namen · Gebaut &amp; übergeben
        </span>

        {/* Der Nutzen trägt die Headline allein — kein Untertext darunter,
            der ihr die Wirkung nimmt. CTA und Vertrauenszeile stehen weiter
            unten im ONYX.AI-Block. */}
        <h1
          className={entered ? "hero-blur-visible" : "hero-blur-hidden"}
          style={{
            fontSize: "clamp(1.85rem, 3.6vw, 2.9rem)",
            lineHeight: 1.12,
            maxWidth: "21ch",
          }}
        >
          Weniger Komplexität im Unternehmen,
          {/* Eigene Zeile, damit der zweite Teil nie mit einem Wort am
              Zeilenende anfaengt — unabhaengig von der Viewport-Breite.
              Klein geschrieben, weil das Komma den Satz weiterlaufen laesst. */}
          <span className="accent block">
            mehr Zeit für das, womit du Geld verdienst … in wenigen Wochen.
          </span>
        </h1>

      </div>
    </div>
  );
}
