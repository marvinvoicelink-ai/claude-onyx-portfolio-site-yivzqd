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
          className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-4 mono"
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
          className="mono block mb-3"
          style={{
            fontSize: "12.5px",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--amber)",
          }}
        >
          Systeme unter deinem Namen · Gebaut &amp; übergeben
        </span>

        {/* Auf dem Handy bewusst kleiner (kleinere clamp-Untergrenze) und
            enger, damit Headline, Untertext und CTA frueher ins Bild passen. */}
        <h1
          className={entered ? "hero-blur-visible" : "hero-blur-hidden"}
          style={{
            fontSize: "clamp(1.55rem, 5vw, 2.9rem)",
            lineHeight: 1.1,
            maxWidth: "21ch",
          }}
        >
          Weniger Komplexität im Unternehmen,
          {/* Eigene Zeile, damit der zweite Teil nie mit einem Wort am
              Zeilenende anfaengt — unabhaengig von der Viewport-Breite.
              Klein geschrieben, weil das Komma den Satz weiterlaufen laesst.
              Nur "in wenigen Wochen" traegt den Amber-Akzent, der Rest der
              Headline bleibt in der normalen Textfarbe. */}
          <span className="block">
            mehr Zeit für das, womit du Geld verdienst …{" "}
            <span className="accent">in wenigen Wochen</span>
          </span>
        </h1>

        {/* Kurzer Untertext direkt unter der Headline: fasst das Versprechen
            in einem Satz. Der ausfuehrliche ONYX.AI-Text kommt erst nach den
            Logos. */}
        <p
          className="mt-4"
          style={{
            fontSize: "clamp(0.98rem, 1.6vw, 1.16rem)",
            lineHeight: 1.55,
            color: "var(--warm-grey-dim)",
            maxWidth: "48ch",
          }}
        >
          Wir bauen dir digitale Systeme, die dir Arbeit abnehmen statt neue zu
          schaffen — schnell umgesetzt und danach ganz in deiner Hand.
        </p>

      </div>
    </div>
  );
}
