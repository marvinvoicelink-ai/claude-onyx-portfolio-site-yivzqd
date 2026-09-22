"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

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

/**
 * Beide Anwendungsbereiche stehen immer nebeneinander offen da, statt
 * hinter einem Tab versteckt zu sein — wer nur kurz scrollt, soll beide
 * Beispiele trotzdem sehen, nicht nur das zuerst aktive.
 */
export default function ErfassungBereiche() {
  const reveal = useScrollReveal<HTMLDivElement>(BEREICHE.length);

  return (
    <section className="py-14">
      <div className="mx-auto px-7" style={{ maxWidth: 1180 }}>
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {BEREICHE.map((b, i) => {
            const visible = reveal.visible[i];
            return (
              <div
                key={b.tab}
                ref={reveal.setRef(i)}
                data-reveal-index={i}
                className={`beam-border rounded-2xl p-7 sm:p-9 flex flex-col ${visible ? "reveal-visible" : "reveal-hidden"}`}
                style={{ ["--reveal-delay" as string]: `${i * 120}ms`, background: "var(--near-black-2)", border: "1px solid var(--hairline)" }}
              >
                <span
                  className="mono inline-flex items-center self-start rounded-full px-3.5 py-1.5 mb-5"
                  style={{ fontSize: 12, letterSpacing: "0.04em", color: "var(--amber)", background: "var(--amber-soft)", border: "1px solid rgba(232, 163, 61,0.3)" }}
                >
                  {b.tab}
                </span>

                <h3 style={{ fontSize: "clamp(1.15rem, 2.2vw, 1.4rem)", marginBottom: 14 }}>{b.headline}</h3>
                <p style={{ color: "var(--warm-grey-dim)", fontSize: "0.98rem", lineHeight: 1.7, marginBottom: 22 }}>{b.text}</p>

                <div
                  className="rounded-xl px-4 py-4 mb-4"
                  style={{
                    fontSize: "0.92rem",
                    lineHeight: 1.55,
                    color: "var(--warm-grey)",
                    background: "rgba(232, 163, 61,0.1)",
                    border: "1px solid rgba(232, 163, 61,0.25)",
                  }}
                >
                  {b.beispiel}
                </div>

                <div
                  className="rounded-xl px-4 py-4 mb-5"
                  style={{ background: "var(--near-black)", border: "1px solid var(--hairline)" }}
                >
                  <div className="flex flex-col gap-2">
                    {b.daten.map((d) => (
                      <div key={d.label} className="flex gap-2" style={{ fontSize: "0.85rem" }}>
                        <span className="mono" style={{ color: "var(--amber)", flexShrink: 0 }}>
                          {d.label}:
                        </span>
                        <span style={{ color: "var(--warm-grey-dim)" }}>{d.wert}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <p style={{ color: "var(--warm-grey-faint)", fontSize: "0.88rem", lineHeight: 1.6, marginTop: "auto" }}>
                  {b.note}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
