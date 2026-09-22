"use client";

import Link from "next/link";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/**
 * Kompakter Verweis auf die eigenständige Vor-Ort-Erfassung direkt nach den
 * Branchen-Kacheln — dort steht "Für wen wir bauen", und Bau/Handwerk sowie
 * Hausverwaltung/Immobilien sind genau die Zielgruppen dieses Bereichs.
 * Bewusst ohne eigene "Blatt"-Nummer, wie schon bei anderen Teasern zwischen
 * den durchnummerierten Hauptsections.
 */
export default function ErfassungTeaser() {
  const reveal = useScrollReveal<HTMLAnchorElement>(1);
  const visible = reveal.visible[0];

  return (
    <section className="py-8">
      <div className="mx-auto px-7" style={{ maxWidth: 1180 }}>
        <Link
          href="/vor-ort-erfassung"
          ref={reveal.setRef(0)}
          data-reveal-index={0}
          className={`alive-hover-card block rounded-2xl px-7 py-7 md:px-10 md:py-8 ${visible ? "reveal-visible" : "reveal-hidden"}`}
          style={{ background: "var(--amber-soft)", border: "1px solid rgba(212, 175, 106,0.3)" }}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div>
              <span
                className="mono inline-flex items-center gap-2 mb-3"
                style={{ fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--amber)" }}
              >
                <span style={{ opacity: 0.7 }}>§</span> Für Bau, Handwerk &amp; Immobilien
              </span>
              <h2 style={{ fontSize: "clamp(1.2rem, 2.4vw, 1.55rem)", marginBottom: 8, maxWidth: "34ch" }}>
                Du gehst durchs Objekt, sprichst — und der Papierkram entsteht daraus.
              </h2>
              <p style={{ color: "var(--warm-grey-dim)", fontSize: "0.96rem", lineHeight: 1.6, maxWidth: "60ch" }}>
                Vor-Ort-Erfassung: Räume, Maße und Mängel direkt beim Rundgang
                einsprechen und filmen, statt sie später im Büro noch einmal
                einzutippen.
              </p>
            </div>
            <span
              className="inline-flex items-center justify-center rounded-full flex-shrink-0"
              style={{ width: 40, height: 40, border: "1px solid var(--hairline)" }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="var(--amber)" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" width={16} height={16}>
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
}
