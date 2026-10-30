"use client";

import { useEffect, useState } from "react";
import { lp, type Lang } from "@/lib/i18n";
import FlowSpine from "./FlowSpine";
import TrackedCtaLink from "@/components/TrackedCtaLink";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

const TEXT: Record<
  Lang,
  {
    kicker: string;
    h1: [string, string, string];
    claim: string;
    intro: string;
    audiences: { title: string; text: string }[];
    cta: string;
    info: string;
  }
> = {
  de: {
    kicker: "ONYX Studio für Makler & Bauträger · Balearen & Kanaren",
    h1: ["Andere zeigen Bilder. ", "Wir zeigen komplette Begehungen", "."],
    claim: "Selbst bei unfertigen Bauten: mit Scroll-Through-3D-Videos, Zeitraffer-Videos und eigener Website pro Objekt. Mit nur einer Software: ONYX\u00a0Studio.",
    intro:
      "ONYX Studio ist die Software für Makler und Bauträger auf den Inseln. Aus Fotos vom Rohbau oder Renovierungsobjekt werden fertig eingerichtete Räume und ein Drohnenflug durchs Haus, auf einer eigenen Website pro Objekt. Die Objektdaten sprichst du vor Ort ein, statt sie abends abzutippen.",
    audiences: [
      { title: "Bauträger", text: "Häuser schon im Rohbau fertig eingerichtet zeigen, mit Drohnenflug durchs Haus." },
      { title: "Immobilienmakler", text: "Objekt einsprechen statt abtippen, daraus Exposé und eigene Rundflug-Website." },
      { title: "Bauunternehmen", text: "Mängel und Abnahme mit Fotos erfassen, Protokoll direkt zum Unterschreiben." },
    ],
    cta: "Mit einem Objekt ausprobieren",
    info: "Infogespräch vereinbaren",
  },
  es: {
    kicker: "ONYX Studio para agencias y promotoras · Baleares y Canarias",
    h1: ["Otros muestran imágenes. ", "Nosotros, recorridos completos", "."],
    claim: "Incluso en obras sin terminar: vídeos 3D con scroll, vídeos timelapse y web propia para cada inmueble. Con un solo software: ONYX\u00a0Studio.",
    intro:
      "ONYX Studio es el software para agencias inmobiliarias y promotoras en las islas. Las fotos de la obra o del inmueble a reformar se convierten en estancias terminadas y amuebladas y en un vuelo de dron por la casa, en una web propia para cada inmueble. Los datos los dictas in situ, en lugar de teclearlos por la noche.",
    audiences: [
      { title: "Promotoras", text: "Enseña las viviendas terminadas y amuebladas cuando aún están en obra, con vuelo de dron por la casa." },
      { title: "Agentes inmobiliarios", text: "Dicta el inmueble en vez de teclearlo y obtén el dossier y una web propia con recorrido." },
      { title: "Constructoras", text: "Registra defectos y la entrega con fotos, con un acta lista para firmar." },
    ],
    cta: "Probar con un inmueble",
    info: "Reservar llamada informativa",
  },
};

/**
 * Startseiten-Hero: spricht direkt die Zielgruppe der Telefonakquise an,
 * Makler und Bauträger auf Balearen und Kanaren, mit ONYX Studio als Angebot
 * (fertige Ansicht aus dem Rohbau, Rundflug-Website, Einsprechen). Die
 * allgemeine "White-Label für jeden Mittelstandsbetrieb"-Botschaft bleibt
 * auf den Nebenseiten.
 */
export default function HomeHero({ lang }: { lang: Lang }) {
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
    <section className="relative pt-20 pb-14 overflow-hidden" style={{ background: "var(--near-black)" }}>
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(232, 163, 61,0.1), transparent 65%)",
        }}
      />
      <div className="relative mx-auto px-7 text-center" style={{ maxWidth: 820 }}>
        <span
          className={`mono inline-flex items-center gap-2 mb-5 ${entered ? "hero-cta-visible" : "hero-cta-hidden"}`}
          style={{ fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--amber)" }}
        >
          <span style={{ opacity: 0.7 }}>§</span> {t.kicker}
        </span>

        <h1
          className={entered ? "hero-blur-visible" : "hero-blur-hidden"}
          style={{ fontSize: "clamp(2.1rem, 5.2vw, 3.4rem)", lineHeight: 1.1, marginBottom: 22, maxWidth: "18ch", marginLeft: "auto", marginRight: "auto" }}
        >
          {t.h1[0]}
          <span className="accent">{t.h1[1]}</span>
          {t.h1[2]}
        </h1>

        <p
          className={entered ? "hero-cta-visible" : "hero-cta-hidden"}
          style={{ ["--reveal-delay" as string]: "50ms", color: "var(--warm-grey)", fontSize: "1.3rem", fontWeight: 600, lineHeight: 1.4, marginBottom: 14 }}
        >
          {t.claim}
        </p>

        <p
          className={entered ? "hero-cta-visible" : "hero-cta-hidden"}
          style={{ ["--reveal-delay" as string]: "100ms", color: "var(--warm-grey-dim)", fontSize: "1.1rem", lineHeight: 1.7, marginBottom: 10, maxWidth: "56ch", marginLeft: "auto", marginRight: "auto" }}
        >
          {t.intro}
        </p>

        <div
          className={`grid grid-cols-1 sm:grid-cols-3 gap-3 mb-9 mt-8 ${entered ? "hero-cta-visible" : "hero-cta-hidden"}`}
          style={{ ["--reveal-delay" as string]: "200ms" }}
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
              <div style={{ fontSize: "0.9rem", color: "var(--warm-grey-dim)", lineHeight: 1.5 }}>{a.text}</div>
            </div>
          ))}
        </div>

        <div
          className={`flex flex-wrap items-center justify-center gap-3.5 mb-12 ${entered ? "hero-cta-visible" : "hero-cta-hidden"}`}
          style={{ ["--reveal-delay" as string]: "300ms" }}
        >
          <TrackedCtaLink
            href={lp(lang, "/kontakt")}
            source="Hero-CTA"
            topic="objekt"
            className="inline-flex items-center gap-2.5 rounded-[10px] px-7 py-4 font-semibold btn-amber"
            style={{ background: "var(--amber)", color: "#12141a", fontSize: 15.5 }}
          >
            {t.cta}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width={14} height={14}>
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </TrackedCtaLink>
          <TrackedCtaLink
            href={lp(lang, "/kontakt")}
            source="Hero-Infogespraech"
            topic="info"
            className="inline-flex items-center gap-2.5 rounded-[10px] px-7 py-4 font-semibold btn-ghost"
            style={{ background: "transparent", color: "var(--warm-grey)", border: "1px solid var(--hairline)", fontSize: 15.5 }}
          >
            {t.info}
          </TrackedCtaLink>
        </div>

        <FlowSpine lang={lang} />
      </div>
    </section>
  );
}
