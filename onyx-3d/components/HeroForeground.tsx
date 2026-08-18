"use client";

import { useEffect, useState } from "react";
import { trackLead } from "@/lib/trackLead";

/**
 * The sharp HTML text layer (badge, kicker, headline, CTA) that sits above
 * whichever hero background is active — the same layer whether the 3D
 * scene or the static fallback renders behind it.
 */
export default function HeroForeground() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(motionQuery.matches);

    if (motionQuery.matches) {
      setEntered(true);
    } else {
      requestAnimationFrame(() => requestAnimationFrame(() => setEntered(true)));
    }
  }, []);

  return (
    <div className="relative z-10 w-full px-7" style={{ maxWidth: 1180, margin: "0 auto" }}>
      <div className="max-w-[620px]">
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
            fontSize: "clamp(2.1rem, 4vw, 3.2rem)",
            lineHeight: 1.08,
            maxWidth: "21ch",
          }}
        >
          Wir machen nicht alles.
          <br />
          Aber wir passen uns{" "}
          <span className="accent">deinen Anforderungen</span> an.
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
          Der eine Betrieb braucht ein Dashboard. Der nächste jemanden, der
          ans Telefon geht. Wieder ein anderer nur eine Automatisierung, die
          im Hintergrund läuft und nie wieder auffällt. Wir schauen uns
          zuerst an, wo bei dir die Zeit verloren geht, und bauen dann das,
          was dort wirklich etwas ändert. Am Ende gehört es dir: Code, Daten,
          Zugänge. Gehostet wird bei dir, nicht bei uns.
        </p>

        <div className="mt-9">
          <a
            href="#kontakt"
            onClick={trackLead}
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
          DSGVO-konform · Gebaut in Deutschland · Für mittelständische Unternehmen
        </div>
      </div>
    </div>
  );
}
