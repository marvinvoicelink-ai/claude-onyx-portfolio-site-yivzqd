import Image from "next/image";
import Link from "next/link";
import GlowCard from "./GlowCard";
import { kiAgenten } from "@/lib/kiAgenten";
import { differentiators } from "@/lib/differentiators";

/**
 * Fasst zusammen, was vorher drei einzelne Blätter waren: KI-Agenten,
 * Automatisierungen und die Abgrenzung. Inhaltlich gehört das zusammen —
 * es beantwortet dieselbe Frage, nämlich wie wir bauen und was danach
 * passiert. Die Tiefe liegt weiterhin auf /ki-agenten, /automatisierungen
 * und /fuer-dich, hier steht jeweils nur der Anriss.
 */
export default function ArbeitsweiseSection({ blatt }: { blatt?: string }) {
  return (
    <section className="py-10">
      <div className="mx-auto px-7" style={{ maxWidth: 1180 }}>
        <span
          className="mono inline-flex items-center gap-2 mb-4"
          style={{ fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--amber)" }}
        >
          <span style={{ opacity: 0.7 }}>§</span> {blatt ? `Blatt ${blatt} / Lösung` : "Lösung"}
        </span>
        <h2 style={{ fontSize: "clamp(1.8rem, 3.6vw, 2.6rem)", maxWidth: "22ch", marginBottom: 16 }}>
          So lösen wir das.
        </h2>
        <p style={{ color: "var(--warm-grey-dim)", maxWidth: "62ch", fontSize: "1.02rem", lineHeight: 1.7, marginBottom: 36 }}>
          In jedem System, das wir bauen, steckt von Anfang an KI und
          Automatisierung. Und wenn du schon ein System hast, muss es nicht
          weg. Am Ende gehört dir, was wir gebaut haben.
        </p>

        {/* Teil 1: KI-Agenten */}
        <div className="mb-10">
          <div className="flex flex-wrap items-baseline justify-between gap-3 mb-5">
            <h3 style={{ fontSize: "clamp(1.2rem, 2.2vw, 1.5rem)" }}>
              Agenten, die für dich telefonieren.
            </h3>
            <Link href="/ki-agenten" className="mono inline-flex items-center gap-1.5" style={{ fontSize: 12.5, color: "var(--amber)" }}>
              Alle drei Agenten ansehen →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            {kiAgenten.map((agent) => (
              <div
                key={agent.slug}
                className="rounded-xl px-5 py-5 on-dark silver-rim"
                style={{ background: "var(--near-black-2)", border: "1px solid var(--hairline)" }}
              >
                <div
                  className="inline-flex items-center justify-center rounded-full mb-3.5"
                  style={{ width: 38, height: 38, background: "var(--amber-soft)", color: "var(--amber)" }}
                >
                  {agent.icon}
                </div>
                <div style={{ fontWeight: 700, fontSize: "1.05rem", marginBottom: 6 }}>{agent.title}</div>
                <p style={{ color: "var(--warm-grey-dim)", fontSize: "0.96rem", lineHeight: 1.6 }}>{agent.subtitle}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Teil 2: Automatisierungen */}
        <div
          className="rounded-2xl px-6 py-7 md:px-9 md:py-8 mb-10 on-dark silver-glow"
          style={{ background: "var(--near-black-2)", border: "1px solid var(--hairline)" }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <h3 style={{ fontSize: "clamp(1.2rem, 2.2vw, 1.5rem)", marginBottom: 12 }}>
                Auch in dem System, das du schon hast.
              </h3>
              <p style={{ color: "var(--warm-grey-dim)", fontSize: "1rem", lineHeight: 1.75, marginBottom: 16, maxWidth: "52ch" }}>
                Du musst nichts wegwerfen, um mit KI zu arbeiten. Wir setzen
                unsere Agenten auch direkt in dein bestehendes ERP, CRM oder
                Branchenprogramm und automatisieren dort die Arbeit, die
                wirklich Zeit frisst.
              </p>
              <ul className="flex flex-col gap-2 mb-5">
                {[
                  "Angebote und Rechnungen entstehen automatisch statt per Hand",
                  "Eingangsrechnungen und Lieferscheine werden ausgelesen statt abgetippt",
                  "Übergaben zwischen Programmen laufen von selbst, mit Protokoll",
                ].map((h) => (
                  <li key={h} className="flex gap-2.5" style={{ fontSize: "0.98rem", color: "var(--warm-grey-dim)", lineHeight: 1.55 }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="var(--amber)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width={15} height={15} style={{ flexShrink: 0, marginTop: 3 }}>
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    {h}
                  </li>
                ))}
              </ul>
              <Link href="/automatisierungen" className="mono inline-flex items-center gap-1.5" style={{ fontSize: 12.5, color: "var(--amber)" }}>
                Alle Automatisierungen ansehen →
              </Link>
            </div>

            <GlowCard>
              <Image
                src="/generated/automatisierung.webp"
                alt="Automatisierung: Aus eingehenden Dokumenten entstehen automatisch Angebote, Bestätigungen und Rechnungen"
                width={1200}
                height={896}
                className="w-full h-auto block rounded-xl"
                style={{ maxWidth: "84%" }}
              />
            </GlowCard>
          </div>
        </div>

        {/* Teil 3: Abgrenzung */}
        <div className="flex flex-wrap items-baseline justify-between gap-3 mb-5">
          <h3 style={{ fontSize: "clamp(1.2rem, 2.2vw, 1.5rem)" }}>
            Dein Zugang. Deine Regeln.
          </h3>
          <Link href="/fuer-dich" className="mono inline-flex items-center gap-1.5" style={{ fontSize: 12.5, color: "var(--amber)" }}>
            Im Detail ansehen →
          </Link>
        </div>
        {/* Bewusst ohne Kartenrahmen: nur Zeichen, Schlagwort, eine Zeile.
            Die vier Punkte sollen im Vorbeiscrollen lesbar sein, die
            Ausführung steht auf /fuer-dich. */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-9">
          {differentiators.map((d, i) => (
            <Link key={d.slug} href={`/fuer-dich#${d.slug}`} className="block diff-mark">
              <svg viewBox="0 0 48 48" width={46} height={46} style={{ display: "block", marginBottom: 16 }} aria-hidden>
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
              <div style={{ fontWeight: 700, fontSize: "clamp(1rem, 1.6vw, 1.12rem)", lineHeight: 1.3, marginBottom: 6 }}>
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
