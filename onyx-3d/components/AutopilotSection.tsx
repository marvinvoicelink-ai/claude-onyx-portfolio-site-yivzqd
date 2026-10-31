"use client";

import { openContactForm } from "@/lib/contactModal";

/**
 * Abschliessendes Argument: Systeme, die ohne dich laufen. Links die Aussage
 * mit CTA, rechts ein "Cockpit"-Mock, das einen naechtlichen, automatischen
 * Lauf zeigt (Zahlungsabgleich, Report, offene Posten). Aufbau inspiriert von
 * skalieren.com, in Onyx-Farben und mit eigenem Content. Die Zahlen im Mock
 * sind illustrativ.
 */

const log = [
  { t: "03:14", e: "Zahlungsabgleich abgeschlossen" },
  { t: "03:02", e: "Rechnung ↔ Buchhaltung synchron" },
  { t: "02:47", e: "KPI-Report ans Team gesendet" },
  { t: "02:31", e: "Offene Posten markiert" },
];

const bars = [38, 55, 47, 70, 58, 44, 66, 52, 78, 61, 90];

function CockpitMock() {
  return (
    <div className="rounded-2xl p-5 sm:p-6" style={{ background: "var(--near-black-2)", border: "1px solid var(--hairline)" }}>
      <div className="flex items-center justify-between mb-5">
        <span className="mono" style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase" }}>Cockpit</span>
        <span className="mono inline-flex items-center gap-1.5" style={{ fontSize: 10.5, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--warm-grey-dim)" }}>
          <span className="inline-block rounded-full" style={{ width: 6, height: 6, background: "var(--amber)", boxShadow: "0 0 8px 1px rgba(232,163,61,0.6)" }} />
          Lauf 03:14 Uhr
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-5">
        <div className="rounded-xl px-4 py-4" style={{ background: "var(--near-black)", border: "1px solid var(--hairline)" }}>
          <div className="display" style={{ fontWeight: 800, fontSize: "1.9rem", color: "var(--amber)", lineHeight: 1 }}>98,4 %</div>
          <div style={{ fontSize: 11.5, color: "var(--warm-grey-dim)", marginTop: 6 }}>Zahlungen abgeglichen</div>
        </div>
        <div className="rounded-xl px-4 py-4" style={{ background: "var(--near-black)", border: "1px solid var(--hairline)" }}>
          <div className="display" style={{ fontWeight: 800, fontSize: "1.9rem", color: "var(--warm-grey)", lineHeight: 1 }}>0</div>
          <div style={{ fontSize: 11.5, color: "var(--warm-grey-dim)", marginTop: 6 }}>manuelle Eingriffe</div>
        </div>
      </div>

      <div className="flex flex-col mb-5">
        {log.map((l, i) => (
          <div key={l.t} className="flex items-center gap-3 py-2" style={{ borderTop: i === 0 ? "none" : "1px solid var(--hairline)" }}>
            <span className="inline-block rounded-full flex-shrink-0" style={{ width: 6, height: 6, background: "var(--amber)" }} />
            <span className="mono" style={{ fontSize: 12, color: "var(--amber)", width: 44, flexShrink: 0 }}>{l.t}</span>
            <span style={{ fontSize: 13.5, color: "var(--warm-grey-dim)", lineHeight: 1.3 }}>{l.e}</span>
          </div>
        ))}
      </div>

      <div className="flex items-end gap-1.5" style={{ height: 52 }}>
        {bars.map((h, i) => (
          <div key={i} className="flex-1 rounded-t" style={{ height: `${h}%`, background: i === bars.length - 1 ? "var(--amber)" : "var(--hairline)" }} />
        ))}
      </div>
    </div>
  );
}

export default function AutopilotSection({ blatt }: { blatt?: string }) {
  return (
    <section className="py-12">
      <div className="mx-auto px-7" style={{ maxWidth: 1180 }}>
        <div
          className="rounded-[28px] px-7 py-10 md:px-12 md:py-12 on-dark beam-border"
          style={{ background: "var(--near-black-2)", border: "1px solid var(--silver-line)" }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-10 lg:gap-14 items-center">
            <div className="text-left">
              <span
                className="mono inline-flex items-center gap-2 mb-4"
                style={{ fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--amber)" }}
              >
                <span style={{ opacity: 0.7 }}>§</span> {blatt ? `Blatt ${blatt} / Autopilot` : "Autopilot"}
              </span>
              <h2 style={{ fontSize: "clamp(1.7rem, 3.6vw, 2.5rem)", lineHeight: 1.1, marginBottom: 16, maxWidth: "16ch" }}>
                Systeme, die <span className="accent">ohne dich laufen</span>
              </h2>
              <p style={{ color: "var(--warm-grey-dim)", fontSize: "1.04rem", lineHeight: 1.75, marginBottom: 26, maxWidth: "46ch" }}>
                Vom automatischen Report über den Zahlungsabgleich bis zur
                Datenpflege — Abläufe, die nachts von selbst fertig werden. Wer
                das heute noch alles von Hand macht, verliert Zeit, die zum
                Wachsen da wäre.
              </p>
              <button
                type="button"
                onClick={() => openContactForm("Autopilot-CTA")}
                className="inline-flex items-center gap-2.5 rounded-[10px] px-7 py-4 font-semibold btn-amber"
                style={{ background: "var(--amber)", color: "#12141a", fontSize: "15.5px" }}
              >
                Erstgespräch sichern
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width={16} height={16}>
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </button>
            </div>

            <CockpitMock />
          </div>
        </div>
      </div>
    </section>
  );
}
