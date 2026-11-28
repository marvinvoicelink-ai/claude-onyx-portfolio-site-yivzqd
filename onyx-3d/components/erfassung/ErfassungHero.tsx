"use client";

import { useEffect, useState } from "react";
import TrackedCtaLink from "@/components/TrackedCtaLink";
import { lp, type Lang } from "@/lib/i18n";
import FlowSpine from "./FlowSpine";

const TEXT: Record<
  Lang,
  { kicker: string; h1: [string, string, string]; intro: string; audiences: { title: string; text: string }[]; cta: string }
> = {
  de: {
    kicker: "Vor-Ort-Erfassung",
    h1: ["Du gehst durchs Objekt, sprichst – und der ", "Papierkram entsteht daraus", "."],
    intro:
      "Räume, Maße, Besonderheiten oder Mängel direkt vor Ort einsprechen. Onyx.AI strukturiert die Angaben, erstellt eine schematische Zeichnung und baut daraus die passenden Unterlagen.",
    audiences: [
      { title: "Für Bau & Handwerk", text: "Baudokumentation, Mängel und Aufmaß direkt vor Ort erfassen." },
      { title: "Für Immobilien", text: "Objektdaten erfassen und daraus Exposé und Scroll-Website erstellen." },
    ],
    cta: "Mit einem Objekt ausprobieren",
  },
  es: {
    kicker: "Captura in situ",
    h1: ["Recorres el inmueble, hablas – y ", "el papeleo sale solo", "."],
    intro:
      "Dicta directamente en el lugar las estancias, las medidas, las particularidades o los defectos. Onyx.AI ordena los datos, dibuja un esquema y prepara con ello la documentación adecuada.",
    audiences: [
      { title: "Para construcción y oficios", text: "Registra la documentación de obra, los defectos y las mediciones directamente in situ." },
      { title: "Para inmobiliarias", text: "Registra los datos del inmueble y genera con ellos el dossier y la web con scroll." },
    ],
    cta: "Probar con un inmueble",
  },
};

/** Einfacher Text-Hero wie bei den anderen Unterseiten (ki-agenten, automatisierungen) — kein Bild, da es dafür noch keine echten Aufnahmen gibt. */
export default function ErfassungHero({ lang }: { lang: Lang }) {
  const [entered, setEntered] = useState(false);
  const t = TEXT[lang];

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setEntered(true);
    } else {
      requestAnimationFrame(() => requestAnimationFrame(() => setEntered(true)));
    }
  }, []);

  return (
    <section className="py-16">
      <div className="mx-auto px-7 text-center" style={{ maxWidth: 780 }}>
        <span
          className="mono inline-flex items-center gap-2 mb-4"
          style={{ fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--amber)" }}
        >
          <span style={{ opacity: 0.7 }}>§</span> {t.kicker}
        </span>

        <h1
          className={entered ? "hero-blur-visible" : "hero-blur-hidden"}
          style={{ fontSize: "clamp(1.9rem, 4.4vw, 2.9rem)", marginBottom: 18, maxWidth: "18ch", marginLeft: "auto", marginRight: "auto" }}
        >
          {t.h1[0]}
          <span className="accent">{t.h1[1]}</span>
          {t.h1[2]}
        </h1>

        <p
          className={entered ? "hero-cta-visible" : "hero-cta-hidden"}
          style={{ ["--reveal-delay" as string]: "120ms", color: "var(--warm-grey-dim)", fontSize: "1.05rem", lineHeight: 1.7, marginBottom: 32 }}
        >
          {t.intro}
        </p>

        <div
          className={`grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-9 ${entered ? "hero-cta-visible" : "hero-cta-hidden"}`}
          style={{ ["--reveal-delay" as string]: "220ms" }}
        >
          {t.audiences.map((a) => (
            <div
              key={a.title}
              className="beam-border rounded-xl px-5 py-4 text-left"
              style={{ background: "var(--near-black-2)", border: "1px solid var(--hairline)" }}
            >
              <div className="mono" style={{ fontSize: 12, color: "var(--amber)", marginBottom: 5 }}>
                {a.title}
              </div>
              <div style={{ fontSize: "0.92rem", color: "var(--warm-grey-dim)", lineHeight: 1.5 }}>{a.text}</div>
            </div>
          ))}
        </div>

        <div className={entered ? "hero-cta-visible" : "hero-cta-hidden"} style={{ ["--reveal-delay" as string]: "300ms", marginBottom: 40 }}>
          <TrackedCtaLink
            href={lp(lang, "/kontakt")}
            source="Erfassung-Hero-CTA"
            topic="objekt"
            className="inline-flex items-center gap-2.5 rounded-[10px] px-7 py-4 font-semibold btn-amber"
            style={{ background: "var(--amber)", color: "#12141a", fontSize: 15.5 }}
          >
            {t.cta}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width={14} height={14}>
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </TrackedCtaLink>
        </div>

        <FlowSpine lang={lang} />
      </div>
    </section>
  );
}
