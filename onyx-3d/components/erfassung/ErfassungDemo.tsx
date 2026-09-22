"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import FlowSpine from "./FlowSpine";

const SPOKEN = [
  "„Wohnzimmer, 40 Quadratmeter, Schiebewand zum Pool.“",
  "„Offene Küche, 20 Quadratmeter.“",
  "„Drei Schlafzimmer im Obergeschoss.“",
];

const STRUCTURED = [
  { raum: "Wohnzimmer", felder: ["40 m²", "Schiebewand zum Pool"] },
  { raum: "Küche", felder: ["20 m²", "Offen zum Wohnzimmer"] },
  { raum: "Obergeschoss", felder: ["3 Schlafzimmer"] },
];

/**
 * Zeigt das Prinzip sprechen -> strukturierte Daten -> Zeichnung, ohne
 * erfundene Produkt-Screenshots: Aufnahme-Panel, Sprechblasen und
 * Datenkarten sind eigene, klar als Illustration erkennbare UI-Bausteine,
 * kein Foto einer echten Oberfläche.
 */
export default function ErfassungDemo() {
  const reveal = useScrollReveal<HTMLDivElement>(1);
  const visible = reveal.visible[0];

  return (
    <section className="py-14">
      <div className="mx-auto px-7" style={{ maxWidth: 1180 }}>
        <div className="text-center mb-4">
          <span
            className="mono inline-flex items-center gap-2 mb-4"
            style={{ fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--amber)" }}
          >
            <span style={{ opacity: 0.7 }}>§</span> So sieht das aus
          </span>
          <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", marginBottom: 14, maxWidth: "26ch", marginLeft: "auto", marginRight: "auto" }}>
            Sprechen wird zur Zeichnung.
          </h2>
          <p className="mx-auto mb-10" style={{ color: "var(--warm-grey-dim)", fontSize: "1rem", lineHeight: 1.7, maxWidth: "56ch" }}>
            Beispielhafter Rundgang durch ein Objekt: Du sprichst, während du
            filmst — daraus entstehen strukturierte Angaben und eine
            schematische Zeichnung.
          </p>
        </div>

        <div ref={reveal.setRef(0)} data-reveal-index={0} className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Aufnahme-Panel mit nacheinander erscheinenden Sprechblasen */}
          <div
            className={`rounded-2xl p-6 sm:p-7 ${visible ? "reveal-left-visible" : "reveal-left-hidden"}`}
            style={{ background: "var(--near-black-2)", border: "1px solid var(--hairline)" }}
          >
            <div className="flex items-center gap-2.5 mb-6">
              <span className="dot-glow rounded-full" style={{ width: 9, height: 9, background: "#e0503f" }} />
              <span className="mono" style={{ fontSize: 12, color: "var(--warm-grey-dim)" }}>
                Aufnahme läuft · 02:14
              </span>
            </div>

            {/* Abstrakte Video-Fläche statt eines erfundenen Screenshots */}
            <div
              className="rounded-xl mb-6 flex items-center justify-center"
              style={{
                aspectRatio: "16 / 10",
                background: "linear-gradient(160deg, rgba(232,163,61,0.1) 0%, rgba(17,17,17,0) 60%), var(--near-black)",
                border: "1px solid var(--hairline)",
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="var(--warm-grey-faint)" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" width={40} height={40} style={{ opacity: 0.5 }}>
                <path d="M23 7l-7 5 7 5V7Z" />
                <rect x="1" y="5" width="15" height="14" rx="2" />
              </svg>
            </div>

            <div className="flex flex-col gap-3">
              {SPOKEN.map((s, i) => (
                <div
                  key={s}
                  className={visible ? "reveal-visible" : "reveal-hidden"}
                  style={{
                    ["--reveal-delay" as string]: `${260 + i * 220}ms`,
                    alignSelf: "flex-start",
                    maxWidth: "92%",
                    fontSize: "0.92rem",
                    lineHeight: 1.5,
                    color: "var(--warm-grey)",
                    background: "rgba(232, 163, 61,0.1)",
                    border: "1px solid rgba(232, 163, 61,0.25)",
                    borderRadius: 12,
                    padding: "10px 14px",
                  }}
                >
                  {s}
                </div>
              ))}
            </div>
          </div>

          {/* Strukturierte Daten + schematische Zeichnung */}
          <div className={visible ? "reveal-visible" : "reveal-hidden"} style={{ ["--reveal-delay" as string]: "760ms" }}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
              {STRUCTURED.map((r, i) => (
                <div
                  key={r.raum}
                  className={visible ? "reveal-visible" : "reveal-hidden"}
                  style={{ ["--reveal-delay" as string]: `${840 + i * 110}ms` }}
                >
                  <div
                    className="rounded-xl px-4 py-4 h-full"
                    style={{ background: "var(--near-black-2)", border: "1px solid var(--hairline)" }}
                  >
                    <div style={{ fontWeight: 700, fontSize: "0.94rem", marginBottom: 8 }}>{r.raum}</div>
                    <div className="flex flex-col gap-1.5">
                      {r.felder.map((f) => (
                        <div key={f} className="mono" style={{ fontSize: 11.5, color: "var(--amber)" }}>
                          {f}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <SchematicDrawing visible={visible} />
          </div>
        </div>

        <div className="mt-10">
          <FlowSpine />
        </div>
      </div>
    </section>
  );
}

/** Bewusst reduzierte, schematische Skizze — kein Architektur- oder CAD-Plan. */
function SchematicDrawing({ visible }: { visible: boolean }) {
  return (
    <div
      className={visible ? "reveal-visible" : "reveal-hidden"}
      style={{ ["--reveal-delay" as string]: "1180ms" }}
    >
      <div
        className="rounded-xl p-5"
        style={{ background: "var(--near-black-2)", border: "1px solid var(--hairline)" }}
      >
        <svg viewBox="0 0 400 260" style={{ width: "100%", height: "auto", display: "block" }} role="img" aria-label="Schematische Skizze eines zweistöckigen Gebäudes mit Wohnzimmer, Küche, drei Schlafzimmern, Pool und Einfahrt">
          {/* Obergeschoss */}
          <rect x="70" y="14" width="260" height="88" rx="6" fill="none" stroke="var(--hairline)" strokeWidth="1.5" />
          <rect x="82" y="26" width="72" height="64" rx="3" fill="rgba(232,163,61,0.06)" stroke="rgba(232,163,61,0.4)" strokeWidth="1.2" />
          <rect x="164" y="26" width="72" height="64" rx="3" fill="rgba(232,163,61,0.06)" stroke="rgba(232,163,61,0.4)" strokeWidth="1.2" />
          <rect x="246" y="26" width="72" height="64" rx="3" fill="rgba(232,163,61,0.06)" stroke="rgba(232,163,61,0.4)" strokeWidth="1.2" />
          <text x="118" y="62" textAnchor="middle" fontSize="9" fill="var(--warm-grey-faint)" fontFamily="var(--font-plex-mono), monospace">SZ 1</text>
          <text x="200" y="62" textAnchor="middle" fontSize="9" fill="var(--warm-grey-faint)" fontFamily="var(--font-plex-mono), monospace">SZ 2</text>
          <text x="282" y="62" textAnchor="middle" fontSize="9" fill="var(--warm-grey-faint)" fontFamily="var(--font-plex-mono), monospace">SZ 3</text>

          {/* Erdgeschoss */}
          <rect x="30" y="118" width="300" height="110" rx="6" fill="none" stroke="var(--hairline)" strokeWidth="1.5" />
          <rect x="42" y="130" width="150" height="86" rx="3" fill="rgba(232,163,61,0.06)" stroke="rgba(232,163,61,0.4)" strokeWidth="1.2" />
          <text x="117" y="176" textAnchor="middle" fontSize="10" fill="var(--warm-grey-dim)" fontFamily="var(--font-plex-mono), monospace">Wohnzimmer</text>

          {/* Offener Durchgang zwischen Wohnzimmer und Küche */}
          <line x1="192" y1="150" x2="192" y2="196" stroke="var(--amber)" strokeWidth="1.4" strokeDasharray="3 4" />

          <rect x="200" y="130" width="100" height="86" rx="3" fill="rgba(232,163,61,0.06)" stroke="rgba(232,163,61,0.4)" strokeWidth="1.2" />
          <text x="250" y="176" textAnchor="middle" fontSize="10" fill="var(--warm-grey-dim)" fontFamily="var(--font-plex-mono), monospace">Küche</text>

          {/* Pool */}
          <rect x="245" y="216" width="95" height="34" rx="16" fill="rgba(90,150,190,0.12)" stroke="rgba(150,190,220,0.5)" strokeWidth="1.2" />
          <text x="292" y="237" textAnchor="middle" fontSize="9" fill="var(--warm-grey-faint)" fontFamily="var(--font-plex-mono), monospace">Pool</text>

          {/* Einfahrt */}
          <path d="M10 250 L40 228" stroke="var(--warm-grey-faint)" strokeWidth="1.4" strokeDasharray="2 4" fill="none" />
          <text x="16" y="244" fontSize="9" fill="var(--warm-grey-faint)" fontFamily="var(--font-plex-mono), monospace">Einfahrt</text>
        </svg>
        <p className="mono text-center mt-3" style={{ fontSize: 10.5, letterSpacing: "0.04em", color: "var(--warm-grey-faint)" }}>
          Schematische Darstellung — kein Architektur- oder CAD-Plan.
        </p>
      </div>
    </div>
  );
}
