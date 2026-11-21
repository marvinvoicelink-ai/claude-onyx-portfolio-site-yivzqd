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
    kicker: "ONYX Studio für Makler & Bauträger",
    h1: ["Andere zeigen Bilder. ", "Wir zeigen komplette Begehungen", "."],
    claim: "Vom Rohbau bis fertig eingerichtet: Käufer gehen am Handy durch jeden Raum und sehen alle Daten – auf einer eigenen Website pro Objekt.",
    intro:
      "Statt nur ein Video anzuschauen, gehen Interessenten selbst durch dein Objekt – und wer dann anfragt, kennt es schon. Per Facebook- und Instagram-Anzeige kommt die Website zu Menschen, die gerade eine Immobilie suchen. Alles aus einer Hand, mit unserer eigenen Software ONYX\u00a0Studio.",
    audiences: [
      { title: "Vom Rohbau bis fertig", text: "Der Bau im Zeitraffer und die Räume mit KI fertig eingerichtet, auch wenn noch alles leer ist." },
      { title: "Durchgehen am Handy", text: "Eigene Website pro Objekt: jeden Raum ansehen, mit allen Daten von der Fläche bis zum Preis." },
      { title: "Anzeigen an Suchende", text: "Facebook und Instagram bringen die Website zu Menschen, die gerade suchen. Anfragen gehen direkt an dich." },
    ],
    cta: "Mit einem Objekt ausprobieren",
    info: "Infogespräch vereinbaren",
  },
  es: {
    kicker: "ONYX Studio para agencias y promotoras",
    h1: ["Otros muestran imágenes. ", "Nosotros, recorridos completos", "."],
    claim: "De la obra a la vivienda amueblada: los compradores recorren cada estancia desde el móvil y ven todos los datos, en una web propia para cada inmueble.",
    intro:
      "En lugar de solo ver un vídeo, los interesados recorren tu inmueble por sí mismos, y quien pregunta después ya lo conoce. Con anuncios en Facebook e Instagram, la web llega a personas que están buscando vivienda. Todo de una sola mano, con nuestro propio software ONYX\u00a0Studio.",
    audiences: [
      { title: "De la obra al final", text: "La obra en timelapse y las estancias amuebladas con IA, aunque todavía esté todo vacío." },
      { title: "Recorrido en el móvil", text: "Web propia para cada inmueble: cada estancia, con todos los datos, de la superficie al precio." },
      { title: "Anuncios a quien busca", text: "Facebook e Instagram llevan la web a personas que están buscando. Las solicitudes te llegan directamente." },
    ],
    cta: "Probar con un inmueble",
    info: "Reservar llamada informativa",
  },
};

/**
 * Startseiten-Hero: spricht Makler und Bauträger an, mit der Kernbotschaft
 * (Marvin, 21.11.2026, siehe CLAUDE.md): Objekt komplett zeigen, vom Rohbau
 * bis fertig eingerichtet, eigene Website zum Durchgehen am Handy mit allen
 * Daten, Anzeigen an Menschen, die gerade suchen. Die drei Karten sind die
 * drei Teile dieses Angebots. Die allgemeine "White-Label für jeden
 * Mittelstandsbetrieb"-Botschaft bleibt auf den Nebenseiten.
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
