"use client";

import Image from "next/image";
import Link from "next/link";
import { trackLead } from "@/lib/trackLead";

const bullets = [
  "Demo passend zu deiner Branche, nicht generisch",
  "Du siehst das System live, keine Blackbox",
  "Erst danach entscheidest du dich für ein Angebot",
];

const examples = [
  {
    src: "/generated/tablet-handwerk.png",
    alt: "Tablet-Ansicht eines echten Onyx-Systems: HandwerkSystem-Dashboard für Sanitär, Heizung und Klima",
    label: "Beispiel: HandwerkSystem",
    text: "Ein Dashboard für einen Betrieb aus Sanitär, Heizung und Klima. Links die Navigation zu Angeboten, Rechnungen, Finanzen, Kunden, Aufträgen, Lager, Terminen und Mitarbeitern. Oben fünf Kennzahlen auf einen Blick — offene Rechnungen, automatisch versendete Dokumente, laufende Aufträge, Kundenumsatz und knappes Material. Darunter die Liste offener Angebote und Rechnungen mit Status wie „versendet“ oder „überfällig“, und rechts ein Live-Feed, der jede automatische Aktion protokolliert — ein verschicktes Angebot, eine Zahlungserinnerung, ein erkannter Zahlungseingang.",
  },
  {
    src: "/generated/tablet-garten.png",
    alt: "Tablet-Ansicht eines echten Onyx-Systems: GartenSystem-Dashboard für Garten- und Landschaftsbau",
    label: "Beispiel: GartenSystem",
    text: "Dasselbe Dashboard-Prinzip, für einen Garten- und Landschaftsbaubetrieb umgebaut: Aufträge heißen hier Projekte, von der Neugestaltung eines Hotelgartens bis zur Poolanlage mit Sauna und Terrasse. Gleiche Kennzahlen, gleiche automatisch versendeten Zahlungserinnerungen, gleicher Live-Feed — nur an den Alltag im Garten- und Landschaftsbau statt auf der Baustelle angepasst.",
  },
];

/** Trust block: a working demo already exists per industry and gets shown live in the free Erstgespräch. */
export default function DemoShowcaseSection() {
  return (
    <section className="py-14">
      <div className="mx-auto px-7 text-center" style={{ maxWidth: 780 }}>
        <span
          className="mono inline-flex items-center gap-2 mb-4"
          style={{ fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--amber)" }}
        >
          <span style={{ opacity: 0.7 }}>§</span> Blatt 10 / Dein Erstgespräch
        </span>
        <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", marginBottom: 14 }}>
          Du siehst dein System, bevor du unterschreibst.
        </h2>
        <p className="mx-auto" style={{ color: "var(--warm-grey-dim)", fontSize: "1.02rem", lineHeight: 1.7, marginBottom: 8, maxWidth: "58ch" }}>
          Für Handwerksbetriebe, Garten- und Landschaftsbauer und so gut wie
          jede andere Branche haben wir längst eine Demoversion gebaut. Im
          kostenlosen Erstgespräch zeigen wir sie dir live — passend zu
          deinem Bereich, damit du genau weißt, was du kaufst, bevor du dich
          entscheidest.
        </p>
      </div>

      <div className="mx-auto px-7" style={{ maxWidth: 980, marginTop: 40 }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {examples.map((ex) => (
            <div key={ex.src} className="text-left">
              <div className="relative rounded-2xl overflow-hidden mb-4" style={{ border: "1px solid var(--hairline)" }}>
                <Image
                  src={ex.src}
                  alt={ex.alt}
                  width={1000}
                  height={727}
                  sizes="(min-width: 640px) 480px, 92vw"
                  className="w-full h-auto block"
                  priority={false}
                />
              </div>
              <span className="mono block mb-1.5" style={{ fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--amber)" }}>
                {ex.label}
              </span>
              <p style={{ color: "var(--warm-grey-dim)", fontSize: "0.92rem", lineHeight: 1.55 }}>{ex.text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto px-7 text-center" style={{ maxWidth: 780, marginTop: 36 }}>
        <ul className="flex flex-col sm:flex-row sm:justify-center gap-x-8 gap-y-2.5 mb-9">
          {bullets.map((b) => (
            <li key={b} className="flex items-center justify-center gap-2.5" style={{ fontSize: "0.96rem", color: "var(--warm-grey-dim)", lineHeight: 1.5 }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="var(--amber)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width={15} height={15} style={{ flexShrink: 0 }}>
                <path d="M20 6 9 17l-5-5" />
              </svg>
              {b}
            </li>
          ))}
        </ul>

        <Link
          href="#kontakt"
          onClick={trackLead}
          className="inline-flex items-center gap-2.5 rounded-[10px] px-6 py-4 font-semibold btn-amber"
          style={{ background: "var(--amber)", color: "#161104", fontSize: 15.5 }}
        >
          Kostenloses Erstgespräch sichern
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width={14} height={14}>
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
