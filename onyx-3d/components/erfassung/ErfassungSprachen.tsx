"use client";

import { useState } from "react";
import type { Lang } from "@/lib/i18n";

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

const TEXT: Record<Lang, { kicker: string; heading: string; body: string }> = {
  de: {
    kicker: "Deutsch + Spanisch",
    heading: "Ein Objekt. Zwei Sprachen.",
    body: "Exposé und Scroll-Website lassen sich auf Deutsch und Spanisch erstellen.",
  },
  es: {
    kicker: "Alemán + español",
    heading: "Un inmueble. Dos idiomas.",
    body: "El dossier y la web con scroll pueden crearse en alemán y en español.",
  },
};

export default function ErfassungSprachen({ lang }: { lang: Lang }) {
  const [sampleLang, setSampleLang] = useState<Lang>(lang);
  const t = TEXT[lang];
  const s = SAMPLE[sampleLang];

  return (
    <section className="py-14">
      <div className="mx-auto px-7 text-center" style={{ maxWidth: 620 }}>
        <span
          className="mono inline-flex items-center gap-2 mb-4"
          style={{ fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--amber)" }}
        >
          <span style={{ opacity: 0.7 }}>§</span> {t.kicker}
        </span>
        <h2 style={{ fontSize: "clamp(1.5rem, 2.8vw, 2rem)", marginBottom: 14 }}>{t.heading}</h2>
        <p className="mx-auto mb-9" style={{ color: "var(--warm-grey-dim)", fontSize: "1.02rem", lineHeight: 1.7, maxWidth: "48ch" }}>
          {t.body}
        </p>

        <div
          className="inline-flex rounded-full p-1 mb-6"
          style={{ background: "var(--near-black-2)", border: "1px solid var(--hairline)" }}
        >
          {(["de", "es"] as const).map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setSampleLang(l)}
              aria-pressed={sampleLang === l}
              className="rounded-full font-semibold mono"
              style={{
                padding: "8px 22px",
                fontSize: 13,
                background: sampleLang === l ? "var(--amber)" : "transparent",
                color: sampleLang === l ? "#161104" : "var(--warm-grey-dim)",
                transition: "background 0.2s ease, color 0.2s ease",
              }}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>

        <div
          lang={sampleLang}
          className="beam-border rounded-2xl px-7 py-7 text-left"
          style={{ background: "var(--near-black-2)", border: "1px solid var(--hairline)" }}
        >
          <div style={{ fontWeight: 700, fontSize: "1.05rem", marginBottom: 8 }}>{s.titel}</div>
          <div style={{ color: "var(--warm-grey-dim)", fontSize: "0.92rem", lineHeight: 1.5 }}>{s.zeile}</div>
        </div>
      </div>
    </section>
  );
}
