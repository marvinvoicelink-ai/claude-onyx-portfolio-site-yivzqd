"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { lp, type Lang } from "@/lib/i18n";
import FlowSpine from "./FlowSpine";
import { trackWhatsApp, trackContactClick } from "@/lib/trackLead";

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
    intro: string;
    audiences: { title: string; text: string }[];
    cta: string;
    whatsapp: string;
    whatsappText: string;
  }
> = {
  de: {
    kicker: "Onyx.AI für Bau, Handwerk & Immobilien",
    h1: ["Du gehst durchs Objekt, sprichst – und der ", "Papierkram entsteht daraus", "."],
    intro:
      "Onyx.AI hat ein eigenes System gebaut, das genau das übernimmt: Räume, Maße und Mängel direkt vor Ort einsprechen und filmen. Onyx.AI strukturiert die Angaben, erstellt eine schematische Zeichnung und baut daraus die Unterlagen, die du danach brauchst.",
    audiences: [
      { title: "Bauunternehmer & Bauleiter", text: "Baudokumentation, Mängel und Aufmaß direkt vor Ort erfassen." },
      { title: "Immobilienmakler", text: "Objektdaten erfassen und daraus Exposé und Scroll-Website erstellen." },
      { title: "Handwerker", text: "Maße und Leistungen beim Rundgang erfassen statt später im Büro." },
    ],
    cta: "Mit einem Objekt ausprobieren",
    whatsapp: "WhatsApp schreiben",
    whatsappText: "Hallo Marvin, ich interessiere mich für die Vor-Ort-Erfassung von Onyx.",
  },
  es: {
    kicker: "Onyx.AI para construcción, oficios e inmobiliarias",
    h1: ["Recorres el inmueble, hablas – y ", "el papeleo sale solo", "."],
    intro:
      "Onyx.AI ha construido un sistema propio que se encarga justo de eso: dictas y grabas en el mismo lugar las estancias, las medidas y los defectos. Onyx.AI ordena los datos, dibuja un esquema y prepara con ello la documentación que necesitas después.",
    audiences: [
      { title: "Constructores y jefes de obra", text: "Registra la documentación de obra, los defectos y las mediciones directamente in situ." },
      { title: "Agentes inmobiliarios", text: "Registra los datos del inmueble y genera con ellos el dossier y la web con scroll." },
      { title: "Profesionales de oficios", text: "Toma medidas y partidas durante el recorrido, no después en la oficina." },
    ],
    cta: "Probar con un inmueble",
    whatsapp: "Escribir por WhatsApp",
    whatsappText: "Hola Marvin, me interesa la captura in situ de Onyx.",
  },
};

/**
 * Startseiten-Hero: Onyx.AI positioniert sich hier direkt als Erbauer des
 * eigenen Erfassungs-Systems für Bau, Handwerk und Immobilien — statt der
 * allgemeinen "White-Label für jeden Mittelstandsbetrieb"-Botschaft, die
 * jetzt auf den Nebenseiten bleibt.
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
          <Link
            href={lp(lang, "/kontakt")}
            onClick={trackContactClick}
            className="inline-flex items-center gap-2.5 rounded-[10px] px-7 py-4 font-semibold btn-amber"
            style={{ background: "var(--amber)", color: "#161104", fontSize: 15.5 }}
          >
            {t.cta}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width={14} height={14}>
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
          <a
            href={`https://wa.me/4917632273522?text=${encodeURIComponent(t.whatsappText)}`}
            target="_blank"
            rel="noopener"
            onClick={trackWhatsApp}
            className="inline-flex items-center gap-2.5 rounded-[10px] px-7 py-4 font-semibold btn-ghost"
            style={{ background: "transparent", color: "var(--warm-grey)", border: "1px solid var(--hairline)", fontSize: 15.5 }}
          >
            {t.whatsapp}
          </a>
        </div>

        <FlowSpine lang={lang} />
      </div>
    </section>
  );
}
