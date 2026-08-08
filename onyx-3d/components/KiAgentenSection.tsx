import Link from "next/link";
import { kiAgenten } from "@/lib/kiAgenten";

/**
 * Homepage-level section for KI-Agenten — same weight as OfferingsList,
 * not just a slim teaser, since agents are a full offering alongside
 * dashboards/portale/tools, not an afterthought.
 */
export default function KiAgentenSection() {
  return (
    <section className="py-14">
      <div className="mx-auto px-7" style={{ maxWidth: 1180 }}>
        <span
          className="mono inline-flex items-center gap-2 mb-4"
          style={{ fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--amber)" }}
        >
          <span style={{ opacity: 0.7 }}>§</span> Blatt 09 / KI-Agenten
        </span>
        <h2 style={{ fontSize: "clamp(1.8rem, 3.6vw, 2.6rem)", maxWidth: "22ch", marginBottom: 20 }}>
          Bleibt bei dir auch die Telefonarbeit liegen?
        </h2>
        <p style={{ color: "var(--warm-grey-dim)", fontSize: "1.02rem", lineHeight: 1.7, maxWidth: "68ch", marginBottom: 44 }}>
          Neben Dashboards, Portalen und internen Tools entwickeln und
          verkaufen wir Telefonagenten, die Telefonarbeit für dich
          übernehmen — genauso im White-Label, genauso vollständig
          übergeben wie jedes andere System. Ob als Telefonbuchungsagent
          für Terminvereinbarungen oder für eingehende Anrufe: Der Agent
          gehört danach dir, nicht uns. Ziel ist immer dasselbe: Kosten
          sparen, Zeit sparen und deinem Team Arbeit abnehmen, die bisher
          liegen geblieben ist.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {kiAgenten.map((agent) => (
            <div
              key={agent.slug}
              className="rounded-xl px-5 py-5"
              style={{ background: "var(--near-black-2)", border: "1px solid var(--hairline)" }}
            >
              <div
                className="inline-flex items-center justify-center rounded-full mb-4"
                style={{ width: 38, height: 38, background: "var(--amber-soft)", color: "var(--amber)" }}
              >
                {agent.icon}
              </div>
              <div style={{ fontWeight: 700, fontSize: "1.05rem", marginBottom: 6 }}>{agent.title}</div>
              <p style={{ color: "var(--warm-grey-dim)", fontSize: "0.9rem", lineHeight: 1.5, marginBottom: 14 }}>{agent.subtitle}</p>
              <ul className="flex flex-col gap-2">
                {agent.bullets.map((b) => (
                  <li key={b} className="flex gap-2" style={{ fontSize: "0.84rem", color: "var(--warm-grey-dim)", lineHeight: 1.5 }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="var(--amber)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width={13} height={13} style={{ flexShrink: 0, marginTop: 3 }}>
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <Link
            href="/ki-agenten"
            className="inline-flex items-center gap-2 mono"
            style={{ fontSize: 13, color: "#ffffff" }}
          >
            Mehr über KI-Agenten erfahren
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width={14} height={14}>
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
