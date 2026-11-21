import Link from "next/link";
import { differentiators } from "@/lib/differentiators";

/**
 * Einwand-Behandlung kurz vor dem Abschluss: die vier Gruende, warum das
 * Risiko fuer den Kunden klein ist (kein CRM von der Stange, volles Eigentum,
 * eigene Infrastruktur, kein Lock-in). Vorher Teil der langen Arbeitsweise-
 * Section; hier als eigener, schlanker Block, damit er im Lead-Funnel an der
 * richtigen Stelle steht — direkt vor FAQ und Schluss-CTA.
 */
export default function Differentiators() {
  return (
    <section className="py-10">
      <div className="mx-auto px-7" style={{ maxWidth: 1100 }}>
        <div className="flex flex-wrap items-end justify-between gap-3 mb-8">
          <div>
            <span
              className="mono inline-flex items-center gap-2 mb-3"
              style={{ fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--amber)" }}
            >
              <span style={{ opacity: 0.7 }}>§</span> Ohne Risiko
            </span>
            <h2 style={{ fontSize: "clamp(1.8rem, 3.6vw, 2.6rem)", maxWidth: "20ch" }}>
              Dein Zugang, <span className="accent">deine Regeln</span>
            </h2>
          </div>
          <Link href="/fuer-dich" className="mono inline-flex items-center gap-1.5" style={{ fontSize: 12.5, color: "var(--amber)" }}>
            Im Detail ansehen →
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {differentiators.map((d, i) => (
            <Link
              key={d.slug}
              href={`/fuer-dich#${d.slug}`}
              className="block rounded-2xl p-5 on-dark beam-border"
              style={{ background: "var(--near-black-2)", border: "1px solid var(--hairline)" }}
            >
              <svg viewBox="0 0 48 48" width={40} height={40} style={{ display: "block", marginBottom: 14 }} aria-hidden>
                {i === 0 && (
                  <>
                    <rect x="2" y="10" width="26" height="26" rx="5" fill="var(--amber)" opacity="0.9" />
                    <rect x="20" y="16" width="26" height="26" rx="5" fill="var(--amber)" opacity="0.35" />
                  </>
                )}
                {i === 1 && (
                  <>
                    <rect x="3" y="3" width="34" height="34" rx="6" fill="var(--amber)" opacity="0.3" />
                    <rect x="16" y="16" width="29" height="29" rx="6" fill="var(--amber)" opacity="0.9" />
                  </>
                )}
                {i === 2 && (
                  <>
                    <rect x="3" y="4" width="42" height="12" rx="4" fill="var(--amber)" opacity="0.9" />
                    <rect x="3" y="20" width="42" height="12" rx="4" fill="var(--amber)" opacity="0.55" />
                    <rect x="3" y="36" width="26" height="10" rx="4" fill="var(--amber)" opacity="0.3" />
                  </>
                )}
                {i === 3 && (
                  <>
                    <path d="M20 6H10a6 6 0 0 0-6 6v12a6 6 0 0 0 6 6h10" stroke="var(--amber)" strokeWidth="6" fill="none" strokeLinecap="round" opacity="0.9" />
                    <path d="M30 18h10a6 6 0 0 1 6 6v12a6 6 0 0 1-6 6H30" stroke="var(--amber)" strokeWidth="6" fill="none" strokeLinecap="round" opacity="0.35" />
                  </>
                )}
              </svg>
              <div className="display" style={{ fontWeight: 700, fontSize: "clamp(1rem, 1.6vw, 1.15rem)", lineHeight: 1.2, marginBottom: 6 }}>
                {d.title.replace(/\.$/, "")}
              </div>
              <p style={{ color: "var(--warm-grey-dim)", fontSize: "0.95rem", lineHeight: 1.55 }}>{d.subtitle}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
