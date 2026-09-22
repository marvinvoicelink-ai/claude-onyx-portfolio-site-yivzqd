"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { trackLead } from "@/lib/trackLead";
import FlowSpine from "./FlowSpine";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

const WHATSAPP_HREF =
  "https://wa.me/4917632273522?text=Hallo%20Marvin%2C%20ich%20interessiere%20mich%20f%C3%BCr%20die%20Vor-Ort-Erfassung%20von%20Onyx.";

const AUDIENCES = [
  { title: "Bauunternehmer & Bauleiter", text: "Baudokumentation, Mängel und Aufmaß direkt vor Ort erfassen." },
  { title: "Immobilienmakler", text: "Objektdaten erfassen und daraus Exposé und Scroll-Website erstellen." },
  { title: "Handwerker", text: "Maße und Leistungen beim Rundgang erfassen statt später im Büro." },
];

/**
 * Startseiten-Hero: Onyx.AI positioniert sich hier direkt als Erbauer des
 * eigenen Erfassungs-Systems für Bau, Handwerk und Immobilien — statt der
 * allgemeinen "White-Label für jeden Mittelstandsbetrieb"-Botschaft, die
 * jetzt auf den Nebenseiten bleibt.
 */
export default function HomeHero() {
  const [entered, setEntered] = useState(false);

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
            "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(212, 175, 106,0.1), transparent 65%)",
        }}
      />
      <div className="relative mx-auto px-7 text-center" style={{ maxWidth: 820 }}>
        <span
          className={`mono inline-flex items-center gap-2 mb-5 ${entered ? "hero-cta-visible" : "hero-cta-hidden"}`}
          style={{ fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--amber)" }}
        >
          <span style={{ opacity: 0.7 }}>§</span> Onyx.AI für Bau, Handwerk &amp; Immobilien
        </span>

        <h1
          className={entered ? "hero-blur-visible" : "hero-blur-hidden"}
          style={{ fontSize: "clamp(2.1rem, 5.2vw, 3.4rem)", lineHeight: 1.1, marginBottom: 22, maxWidth: "18ch", marginLeft: "auto", marginRight: "auto" }}
        >
          Du gehst durchs Objekt, sprichst – und der{" "}
          <span className="accent">Papierkram entsteht daraus</span>.
        </h1>

        <p
          className={entered ? "hero-cta-visible" : "hero-cta-hidden"}
          style={{ ["--reveal-delay" as string]: "100ms", color: "var(--warm-grey-dim)", fontSize: "1.1rem", lineHeight: 1.7, marginBottom: 10, maxWidth: "56ch", marginLeft: "auto", marginRight: "auto" }}
        >
          Onyx.AI hat ein eigenes System gebaut, das genau das übernimmt:
          Räume, Maße und Mängel direkt vor Ort einsprechen und filmen.
          Onyx.AI strukturiert die Angaben, erstellt eine schematische
          Zeichnung und baut daraus die Unterlagen, die du danach brauchst.
        </p>

        <div
          className={`grid grid-cols-1 sm:grid-cols-3 gap-3 mb-9 mt-8 ${entered ? "hero-cta-visible" : "hero-cta-hidden"}`}
          style={{ ["--reveal-delay" as string]: "200ms" }}
        >
          {AUDIENCES.map((a) => (
            <div
              key={a.title}
              className="rounded-xl px-5 py-4 text-left"
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
            href="/kontakt"
            onClick={trackLead}
            className="inline-flex items-center gap-2.5 rounded-[10px] px-7 py-4 font-semibold btn-amber"
            style={{ background: "var(--amber)", color: "#161104", fontSize: 15.5 }}
          >
            Mit einem Objekt ausprobieren
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width={14} height={14}>
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener"
            onClick={() => {
              trackLead();
              if (typeof window.fbq === "function") window.fbq("trackCustom", "WhatsAppClick");
            }}
            className="inline-flex items-center gap-2.5 rounded-[10px] px-7 py-4 font-semibold btn-ghost"
            style={{ background: "transparent", color: "var(--warm-grey)", border: "1px solid var(--hairline)", fontSize: 15.5 }}
          >
            WhatsApp schreiben
          </a>
        </div>

        <FlowSpine />
      </div>
    </section>
  );
}
