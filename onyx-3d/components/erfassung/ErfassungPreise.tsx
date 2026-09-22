"use client";

import Link from "next/link";
import { trackLead } from "@/lib/trackLead";

const CARDS = [
  {
    title: "Exposé",
    preis: "{PREIS_EXPOSE}",
    text: "Aus den erfassten Daten und dem vorhandenen Material wird ein Exposé erstellt.",
    highlight: false,
  },
  {
    title: "Scroll-Website",
    preis: "{PREIS_SCROLLSEITE}",
    text: "Der Agent baut eine Scroll-Website für das Objekt. Du entscheidest anschließend selbst, wann sie veröffentlicht wird.",
    highlight: false,
  },
  {
    title: "Exposé + Scroll-Website",
    preis: "{PREIS_BEIDES}",
    text: "Beide Ergebnisse aus derselben Erfassung vor Ort.",
    highlight: true,
  },
];

export default function ErfassungPreise() {
  return (
    <section className="py-14">
      <div className="mx-auto px-7" style={{ maxWidth: 1180 }}>
        <div className="text-center mb-10">
          <span
            className="mono inline-flex items-center gap-2 mb-4"
            style={{ fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--amber)" }}
          >
            <span style={{ opacity: 0.7 }}>§</span> Preismodell
          </span>
          <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", maxWidth: "28ch", marginLeft: "auto", marginRight: "auto" }}>
            Du zahlst pro Objekt. Nicht für den nächsten Softwarevertrag.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {CARDS.map((c) => (
            <div
              key={c.title}
              className="rounded-2xl px-6 py-7 flex flex-col alive-hover-card"
              style={{
                background: c.highlight ? "var(--amber-soft)" : "var(--near-black-2)",
                border: c.highlight ? "1px solid rgba(212, 175, 106,0.45)" : "1px solid var(--hairline)",
              }}
            >
              <h3 style={{ fontSize: "1.1rem", marginBottom: 10 }}>{c.title}</h3>
              <div className="mono" style={{ marginBottom: 14 }}>
                <div style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--amber)", lineHeight: 1.3, wordBreak: "break-word" }}>
                  {c.preis}
                </div>
                <div style={{ fontSize: "0.85rem", fontWeight: 500, color: "var(--warm-grey-dim)" }}>/ Objekt</div>
              </div>
              <p style={{ color: "var(--warm-grey-dim)", fontSize: "0.94rem", lineHeight: 1.6, marginBottom: 24, flex: 1 }}>
                {c.text}
              </p>
              <Link
                href="/kontakt"
                onClick={trackLead}
                className={`inline-flex items-center justify-center gap-2 rounded-[10px] px-5 py-3 font-semibold ${c.highlight ? "btn-amber" : "btn-ghost"}`}
                style={
                  c.highlight
                    ? { background: "var(--amber)", color: "#161104", fontSize: 14.5 }
                    : { background: "transparent", color: "var(--warm-grey)", border: "1px solid var(--hairline)", fontSize: 14.5 }
                }
              >
                Objekt ausprobieren
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mx-auto" style={{ maxWidth: 560 }}>
          <h3 style={{ fontSize: "1.05rem", marginBottom: 8 }}>Warum pro Objekt?</h3>
          <p style={{ color: "var(--warm-grey-dim)", fontSize: "0.96rem", lineHeight: 1.65, marginBottom: 10 }}>
            Du zahlst, wenn Onyx.AI für dich etwas erstellt — nicht jeden
            Monat dafür, dass ein Account existiert.
          </p>
          <p className="mono" style={{ color: "var(--warm-grey-faint)", fontSize: "0.86rem" }}>
            Wer regelmäßig liefert, zahlt weniger.
          </p>
        </div>
      </div>
    </section>
  );
}
