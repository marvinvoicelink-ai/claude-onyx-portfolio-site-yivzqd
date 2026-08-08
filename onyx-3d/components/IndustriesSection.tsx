import Link from "next/link";
import SectionGlow from "./SectionGlow";
import { industries } from "@/lib/industries";

export default function IndustriesSection() {
  const featured = industries.find((i) => i.slug === "handwerk-bau");
  const rest = industries.filter((i) => i.slug !== "handwerk-bau");

  return (
    <section className="py-14 relative overflow-hidden">
      <SectionGlow position="top" />
      <div className="mx-auto px-7 text-center" style={{ maxWidth: 1180 }}>
        <span
          className="mono inline-flex items-center gap-2 mb-4"
          style={{ fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--amber)" }}
        >
          <span style={{ opacity: 0.7 }}>§</span> Blatt 04 / Für wen wir bauen
        </span>
        <h2 className="mx-auto" style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", maxWidth: "26ch", marginBottom: 14 }}>
          Spezialisiert auf Handwerk &amp; Bau.
        </h2>
        <p className="mx-auto" style={{ color: "var(--warm-grey-dim)", maxWidth: "62ch", fontSize: "1.02rem", lineHeight: 1.7, marginBottom: 40 }}>
          Die meisten Systeme, die wir bauen, gehen an Handwerks- und
          Baubetriebe — kein Zufall, wir kommen selbst aus dieser Branche
          und haben dort die meisten Kunden. Aufmaß direkt auf der Baustelle
          digital erfassen statt im Büro nachzutragen, Material, Auftrag und
          Dokumentation in einem System. Daneben bauen wir auch für andere
          Branchen, wo derselbe Bedarf besteht:
        </p>

        {featured && (
          <Link
            href={`/branchen/${featured.slug}`}
            className="alive-hover-card block text-left rounded-2xl px-7 py-7 md:px-9 md:py-8 mx-auto mb-10"
            style={{
              maxWidth: 1040,
              background: "var(--amber-soft)",
              border: "1px solid rgba(232,163,61,0.35)",
            }}
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
              <div>
                <span
                  className="mono inline-flex items-center gap-1.5 mb-3"
                  style={{ fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--amber)" }}
                >
                  Unsere Kernbranche
                </span>
                <h3 style={{ fontSize: "1.3rem", marginBottom: 8 }}>{featured.label}</h3>
                <p style={{ color: "var(--warm-grey-dim)", fontSize: "0.98rem", lineHeight: 1.6, maxWidth: "58ch" }}>
                  {featured.intro}
                </p>
              </div>
              <span className="mono inline-flex items-center gap-1.5 flex-shrink-0" style={{ fontSize: 13, color: "var(--amber)" }}>
                Mehr erfahren
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width={14} height={14}>
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>
            </div>
          </Link>
        )}

        <p className="mono mb-5" style={{ fontSize: 11.5, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--warm-grey-faint)" }}>
          Auch für diese Branchen
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mx-auto" style={{ maxWidth: 1040 }}>
          {rest.map((industry, i) => (
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
