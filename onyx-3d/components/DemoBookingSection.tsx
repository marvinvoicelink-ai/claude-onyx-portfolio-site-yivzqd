"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { trackLead } from "@/lib/trackLead";

/**
 * Abschlussblock: links die grosse Aufforderung, rechts eine helle Karte, in
 * der ein System schrittweise aufgeht — Begruessung, dann die Kennzahlen,
 * dann der Posteingang. Die Karte ist bewusst hell: nach der durchgehend
 * dunklen Seite ist der Kontrast der letzte Blickfang vor dem Kontakt.
 */

const KPIS = [
  { value: 12, label: "Offene Angebote" },
  { value: 3, label: "Neue Anfragen" },
];

const ROWS = [
  { t: "Angebot A-2291 versendet", s: "vor 2 Minuten, automatisch" },
  { t: "Rechnung R-1188 bezahlt", s: "Zahlungseingang erkannt" },
  { t: "Termin bestätigt", s: "vom Telefon-Agenten eingetragen" },
];

/** Zaehlt beim Aufdecken von 0 auf den Zielwert. */
function Counter({ to, run }: { to: number; run: boolean }) {
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!run) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(to);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / 900, 1);
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, run]);

  return <>{n}</>;
}

export default function DemoBookingSection() {
  const ref = useRef<HTMLDivElement>(null);
  // 0 = nur Begruessung, 1 = Kennzahlen dazu, 2 = Aktivitaeten dazu
  const [step, setStep] = useState(-1);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        io.disconnect();
        setStep(0);
        const t1 = window.setTimeout(() => setStep(1), 500);
        const t2 = window.setTimeout(() => setStep(2), 1100);
        el.dataset.timers = `${t1},${t2}`;
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      (el.dataset.timers ?? "")
        .split(",")
        .filter(Boolean)
        .forEach((t) => window.clearTimeout(Number(t)));
    };
  }, []);

  const shown = (at: number) => (step >= at ? 1 : 0);
  const rise = (at: number) => ({
    opacity: shown(at),
    transform: step >= at ? "translateY(0)" : "translateY(12px)",
    transition: "opacity 0.5s ease, transform 0.5s ease",
  });

  return (
    <section className="py-14" ref={ref}>
      <div className="mx-auto px-7" style={{ maxWidth: 1180 }}>
        <div
          className="rounded-[28px] px-7 py-10 md:px-12 md:py-12 on-dark silver-glow"
          style={{
            background: "var(--near-black-2)",
            border: "1px solid var(--silver-line)",
            boxShadow: "0 0 44px -10px rgba(203, 203, 201,0.28)",
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] gap-10 lg:gap-14 items-center">
            {/* Linke Spalte: bewusst linksbuendig, damit die grosse Zeile
                nicht mit der zentrierten Karte konkurriert. */}
            <div className="text-left">
              <span
                className="mono block mb-4"
                style={{ fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--amber)" }}
              >
                Zum Schluss
              </span>
              <p
                style={{
                  fontFamily: "var(--font-archivo), sans-serif",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.05,
                  fontSize: "clamp(2.4rem, 5vw, 4rem)",
                  marginBottom: 18,
                }}
              >
                Demo
                <br />
                buchen
              </p>
              <p style={{ color: "var(--warm-grey-dim)", fontSize: "1.02rem", lineHeight: 1.7, maxWidth: "44ch", marginBottom: 26 }}>
                Kein Verkaufsgespräch, kein Foliensatz. Wir zeigen dir ein
                laufendes System, das zu deinem Bereich passt, und du sagst
                uns, was daran für dich fehlt.
              </p>
              <Link
                href="#kontakt"
                onClick={trackLead}
                className="inline-flex items-center gap-2.5 rounded-[10px] px-7 py-4 font-semibold btn-amber"
                style={{ background: "var(--amber)", color: "#12141a", fontSize: "15.5px" }}
              >
                Demo buchen
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width={16} height={16}>
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
            </div>

            {/* Rechte Spalte: der helle Mock */}
            <div
              className="rounded-2xl p-5 sm:p-7 text-left"
              style={{
                background: "var(--plate-light)",
                boxShadow: "0 24px 60px -28px rgba(0,0,0,0.9)",
              }}
            >
              <div className="flex items-start justify-between gap-4" style={rise(0)}>
                <div>
                  <div style={{ fontFamily: "var(--font-archivo), sans-serif", fontWeight: 700, fontSize: "clamp(1.15rem, 2.2vw, 1.5rem)", color: "#12141a", lineHeight: 1.2 }}>
                    Guten Tag, Marvin!
                  </div>
                  <div className="mono" style={{ fontSize: 12.5, color: "rgba(18, 20, 26, 0.64)", marginTop: 4 }}>
                    ONX-000001 · Gründer
                  </div>
                </div>
                {/* Echtes Portrait statt Stockfoto: das Kuerzel wirkte wie ein
                    Platzhalter. objectPosition oben, weil das Bild ganzkoerper
                    ist und im Kreis sonst nur der Oberkoerper zu sehen waere. */}
                <span
                  className="relative rounded-full overflow-hidden flex-shrink-0 block"
                  style={{ width: 56, height: 56, background: "rgba(18, 20, 26, 0.08)" }}
                >
                  <Image
                    src="/assets/marvin-portrait.jpg"
                    alt="Marvin Weiß-Drumm, Gründer von Onyx.AI"
                    fill
                    sizes="56px"
                    style={{
                      objectFit: "cover",
                      objectPosition: "50% 2%",
                      // Ganzkoerperbild: ohne Zoom auf den Kopf bleibt im
                      // 56px-Kreis nur eine winzige Person uebrig.
                      transform: "scale(1.9)",
                      transformOrigin: "50% 36%",
                    }}
                  />
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-6" style={rise(1)}>
                {KPIS.map((k) => (
                  <div key={k.label} className="rounded-xl px-4 py-4" style={{ background: "rgba(18, 20, 26, 0.05)" }}>
                    <div style={{ fontFamily: "var(--font-archivo), sans-serif", fontWeight: 700, fontSize: "1.9rem", color: "#12141a", lineHeight: 1 }}>
                      <Counter to={k.value} run={step >= 1} />
                    </div>
                    <div style={{ fontSize: "0.9rem", color: "rgba(18, 20, 26, 0.68)", marginTop: 5 }}>{k.label}</div>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex flex-col" style={rise(2)}>
                {ROWS.map((r, i) => (
                  <div
                    key={r.t}
                    className="flex items-start gap-3 py-3"
                    style={{ borderTop: i === 0 ? "none" : "1px solid rgba(18, 20, 26, 0.09)" }}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="#7d6220" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width={16} height={16} style={{ flexShrink: 0, marginTop: 3 }}>
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    <div>
                      <div style={{ fontSize: "0.95rem", fontWeight: 600, color: "#12141a", lineHeight: 1.35 }}>{r.t}</div>
                      <div className="mono" style={{ fontSize: 11.5, color: "rgba(18, 20, 26, 0.64)", marginTop: 2 }}>{r.s}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
