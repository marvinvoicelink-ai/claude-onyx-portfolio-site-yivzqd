"use client";

import { useState } from "react";

type Bereich = {
  tab: string;
  headline: string;
  text: string;
  beispiel: string;
  daten: { label: string; wert: string }[];
  note: string;
};

const BEREICHE: Bereich[] = [
  {
    tab: "Bau & Handwerk",
    headline: "Von der Baustelle ins Protokoll, ohne alles zweimal zu erfassen.",
    text: "Bauteile, Maße, Arbeiten und Mängel direkt vor Ort einsprechen und per Video dokumentieren. Die Informationen werden strukturiert erfasst und können für Baudokumentation, Mängelprotokolle und Aufmaß genutzt werden.",
    beispiel: "„Schlafzimmer 2, Feuchtigkeit links unter dem Fenster, ungefähr 60 Zentimeter breit.“",
    daten: [
      { label: "Raum", wert: "Schlafzimmer 2" },
      { label: "Kategorie", wert: "Mangel" },
      { label: "Bereich", wert: "Fenster" },
      { label: "Beschreibung", wert: "Feuchtigkeit links unter dem Fenster" },
      { label: "Angabe", wert: "ca. 60 cm" },
    ],
    note: "Statt nach dem Termin aus handschriftlichen Notizen ein Angebot zusammenzubauen, werden Maße und Leistungen bereits beim Rundgang strukturiert erfasst.",
  },
  {
    tab: "Immobilien",
    headline: "Einmal durchs Objekt. Danach stehen die Daten für die Vermarktung bereit.",
    text: "Räume, Quadratmeter und Besonderheiten beim Rundgang einsprechen. Onyx.AI strukturiert die Angaben im CRM, erstellt die schematische Darstellung und nutzt Video und Objektdaten anschließend für die Erstellung der Vermarktungsunterlagen.",
    beispiel: "„Wohnzimmer 40 Quadratmeter mit Schiebewand zum Pool, offene Küche 20, drei Schlafzimmer oben.“",
    daten: [
      { label: "Wohnzimmer", wert: "40 m² · Schiebewand zum Pool" },
      { label: "Küche", wert: "20 m² · offen zum Wohnzimmer" },
      { label: "Obergeschoss", wert: "3 Schlafzimmer" },
    ],
    note: "Exposé und Scroll-Website können auf Deutsch und Spanisch erstellt werden — auf Knopfdruck.",
  },
];

export default function ErfassungBereiche() {
  const [active, setActive] = useState(0);
  const b = BEREICHE[active];

  return (
    <section className="py-14">
      <div className="mx-auto px-7" style={{ maxWidth: 900 }}>
        <div className="text-center mb-10">
          <span
            className="mono inline-flex items-center gap-2 mb-4"
            style={{ fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--amber)" }}
          >
            <span style={{ opacity: 0.7 }}>§</span> Zwei Anwendungsbereiche
          </span>
          <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", maxWidth: "26ch", marginLeft: "auto", marginRight: "auto" }}>
            Ein Ablauf, zwei konkrete Einsätze.
          </h2>
        </div>

        <div
          role="tablist"
          aria-label="Anwendungsbereich wählen"
          className="inline-flex mx-auto rounded-full p-1 mb-10"
          style={{ display: "flex", background: "var(--near-black-2)", border: "1px solid var(--hairline)", width: "fit-content" }}
        >
          {BEREICHE.map((item, i) => (
            <button
              key={item.tab}
              type="button"
              role="tab"
              aria-selected={active === i}
              onClick={() => setActive(i)}
              className="rounded-full font-semibold"
              style={{
                padding: "10px 20px",
                fontSize: 13.5,
                background: active === i ? "var(--amber)" : "transparent",
                color: active === i ? "#161104" : "var(--warm-grey-dim)",
                transition: "background 0.2s ease, color 0.2s ease",
              }}
            >
              {item.tab}
            </button>
          ))}
        </div>

        <div
          className="rounded-2xl p-7 sm:p-9"
          style={{ background: "var(--near-black-2)", border: "1px solid var(--hairline)" }}
        >
          <h3 style={{ fontSize: "clamp(1.2rem, 2.2vw, 1.5rem)", marginBottom: 14, maxWidth: "30ch" }}>{b.headline}</h3>
          <p style={{ color: "var(--warm-grey-dim)", fontSize: "1rem", lineHeight: 1.75, marginBottom: 24 }}>{b.text}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
            <div
              className="rounded-xl px-4 py-4"
              style={{
                fontSize: "0.94rem",
                lineHeight: 1.55,
                color: "var(--warm-grey)",
                background: "rgba(212, 175, 106,0.1)",
                border: "1px solid rgba(212, 175, 106,0.25)",
              }}
            >
              {b.beispiel}
            </div>

            <div
              className="rounded-xl px-4 py-4"
              style={{ background: "var(--near-black)", border: "1px solid var(--hairline)" }}
            >
              <div className="flex flex-col gap-2">
                {b.daten.map((d) => (
                  <div key={d.label} className="flex gap-2" style={{ fontSize: "0.86rem" }}>
                    <span className="mono" style={{ color: "var(--amber)", flexShrink: 0 }}>
                      {d.label}:
                    </span>
                    <span style={{ color: "var(--warm-grey-dim)" }}>{d.wert}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <p className="mt-6" style={{ color: "var(--warm-grey-faint)", fontSize: "0.9rem", lineHeight: 1.6 }}>
            {b.note}
          </p>
        </div>
      </div>
    </section>
  );
}
