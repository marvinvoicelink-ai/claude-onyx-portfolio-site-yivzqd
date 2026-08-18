import Link from "next/link";
import SectionGlow from "./SectionGlow";
import { industries } from "@/lib/industries";

/**
 * Anzeigereihenfolge der Branchen-Kacheln. Bewusst nicht die Reihenfolge aus
 * lib/industries.ts: Onyx positioniert sich auf den Mittelstand allgemein,
 * deshalb soll die Liste nicht mit Handwerk & Bau anfangen und damit eine
 * Spezialisierung suggerieren, die es nicht gibt.
 */
const displayOrder = [
  "beratung-agenturen",
  "handel-e-commerce",
  "logistik-spedition",
  "hausverwaltung-immobilien",
  "personaldienstleistung",
  "versicherungen-finanzdienstleister",
  "praxen-gesundheitswesen",
  "handwerk-bau",
];

const sortedIndustries = [...industries].sort(
  (a, b) => displayOrder.indexOf(a.slug) - displayOrder.indexOf(b.slug),
);

export default function IndustriesSection({ blatt }: { blatt?: string }) {
  return (
    <section className="py-10 relative overflow-hidden">
      <SectionGlow position="top" />
      <div className="mx-auto px-7 text-center" style={{ maxWidth: 1180 }}>
        <span
          className="mono inline-flex items-center gap-2 mb-4"
          style={{ fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--amber)" }}
        >
          <span style={{ opacity: 0.7 }}>§</span> {blatt ? `Blatt ${blatt} / Für wen wir bauen` : "Für wen wir bauen"}
        </span>
        <h2 className="mx-auto" style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", maxWidth: "26ch", marginBottom: 14 }}>
          Systeme für mittelständische Unternehmen.
        </h2>
        <p className="mx-auto" style={{ color: "var(--warm-grey-dim)", maxWidth: "62ch", fontSize: "1.02rem", lineHeight: 1.7, marginBottom: 26 }}>
          Wir arbeiten mit mittelständischen Unternehmen, die aus gewachsenen
          Excel-Landschaften und verstreuten Tools herauswollen. Die Branche
          ist dabei zweitrangig. Entscheidend ist, dass es einen Ablauf gibt,
          der oft genug wiederkehrt, um sich zu lohnen. Ob das ein
          Kundenportal wird, ein Dashboard für die Geschäftsführung oder eine
          Automatisierung im Hintergrund, entscheidet dein Prozess.
        </p>

        <p className="mono mb-5" style={{ fontSize: 11.5, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--warm-grey-faint)" }}>
          Branchen, in denen wir bauen
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mx-auto" style={{ maxWidth: 1040 }}>
          {sortedIndustries.map((industry, i) => (
            <Link
              key={industry.slug}
              href={`/branchen/${industry.slug}`}
              className="alive-hover-card flex items-center gap-3 rounded-xl px-5 py-4 text-left"
              style={{ background: "var(--near-black-2)", border: "1px solid var(--hairline)" }}
            >
              <span className="mono" style={{ fontSize: 11.5, color: "var(--amber)", flexShrink: 0 }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span style={{ fontSize: "0.94rem", color: "var(--warm-grey-dim)", lineHeight: 1.35 }}>{industry.label}</span>
            </Link>
          ))}
        </div>

        <p className="mono mt-8" style={{ fontSize: 12, color: "var(--warm-grey-faint)" }}>
          Beispiele, keine abschließende Liste — passt dein Prozess, passt Onyx.
        </p>
      </div>
    </section>
  );
}
