"use client";

import { useState } from "react";

const SAMPLE = {
  de: {
    titel: "Moderne Finca mit Pool und Meerblick",
    zeile: "3 Schlafzimmer · 2 Bäder · 40 m² Wohnzimmer mit Schiebewand zum Pool",
  },
  es: {
    titel: "Finca moderna con piscina y vistas al mar",
    zeile: "3 dormitorios · 2 baños · Salón de 40 m² con puerta corredera a la piscina",
  },
};

export default function ErfassungSprachen() {
  const [lang, setLang] = useState<"de" | "es">("de");
  const s = SAMPLE[lang];

  return (
    <section className="py-14">
      <div className="mx-auto px-7 text-center" style={{ maxWidth: 620 }}>
        <span
          className="mono inline-flex items-center gap-2 mb-4"
          style={{ fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--amber)" }}
        >
          <span style={{ opacity: 0.7 }}>§</span> Deutsch + Spanisch
        </span>
        <h2 style={{ fontSize: "clamp(1.5rem, 2.8vw, 2rem)", marginBottom: 14 }}>
          Ein Objekt. Zwei Sprachen.
        </h2>
        <p className="mx-auto mb-9" style={{ color: "var(--warm-grey-dim)", fontSize: "1.02rem", lineHeight: 1.7, maxWidth: "48ch" }}>
          Exposé und Scroll-Website lassen sich auf Deutsch und Spanisch
          erstellen.
        </p>

        <div
          className="inline-flex rounded-full p-1 mb-6"
          style={{ background: "var(--near-black-2)", border: "1px solid var(--hairline)" }}
        >
          {(["de", "es"] as const).map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setLang(l)}
              aria-pressed={lang === l}
              className="rounded-full font-semibold mono"
              style={{
                padding: "8px 22px",
                fontSize: 13,
                background: lang === l ? "var(--amber)" : "transparent",
                color: lang === l ? "#161104" : "var(--warm-grey-dim)",
                transition: "background 0.2s ease, color 0.2s ease",
              }}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>

        <div
          className="rounded-2xl px-7 py-7 text-left"
          style={{ background: "var(--near-black-2)", border: "1px solid var(--hairline)" }}
        >
          <div style={{ fontWeight: 700, fontSize: "1.05rem", marginBottom: 8 }}>{s.titel}</div>
          <div style={{ color: "var(--warm-grey-dim)", fontSize: "0.92rem", lineHeight: 1.5 }}>{s.zeile}</div>
        </div>
      </div>
    </section>
  );
}
