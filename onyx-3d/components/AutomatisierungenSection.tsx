import Image from "next/image";
import Link from "next/link";
import GlowCard from "./GlowCard";

const highlights = [
  "Angebote und Rechnungen entstehen automatisch statt per Hand",
  "KI-Agenten arbeiten in deinem bestehenden ERP oder CRM mit",
  "Eingangsrechnungen und Lieferscheine werden ausgelesen statt abgetippt",
];

/** Short homepage teaser for the Automatisierungen subpage — deliberately compact, the depth lives on /automatisierungen. */
export default function AutomatisierungenSection({ blatt }: { blatt?: string }) {
  return (
    <section className="py-10">
      <div className="mx-auto px-7" style={{ maxWidth: 1180 }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          <div>
            <span
              className="mono inline-flex items-center gap-2 mb-4"
              style={{ fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--amber)" }}
            >
              <span style={{ opacity: 0.7 }}>§</span> {blatt ? `Blatt ${blatt} / Automatisierungen` : "Automatisierungen"}
            </span>
            <h2 style={{ fontSize: "clamp(1.7rem, 3.4vw, 2.4rem)", maxWidth: "20ch", marginBottom: 18 }}>
              Auch in dem System, das du schon hast.
            </h2>
            <p style={{ color: "var(--warm-grey-dim)", fontSize: "1.02rem", lineHeight: 1.7, maxWidth: "58ch", marginBottom: 24 }}>
              Du musst nichts wegwerfen, um mit KI zu arbeiten. Wir setzen
              unsere KI-Agenten auch direkt in dein bestehendes ERP, CRM oder
              Branchenprogramm — und automatisieren dort die Arbeit, die
              wirklich Zeit frisst: Angebotserstellung, Rechnungen,
              Dokumentenerkennung, E-Mails und vieles mehr.
            </p>

            <ul className="flex flex-col gap-2.5 mb-8">
              {highlights.map((h) => (
                <li key={h} className="flex gap-2.5" style={{ fontSize: "0.95rem", color: "var(--warm-grey-dim)", lineHeight: 1.55 }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="var(--amber)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width={16} height={16} style={{ flexShrink: 0, marginTop: 3 }}>
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  {h}
                </li>
              ))}
            </ul>

            <Link
              href="/automatisierungen"
              className="inline-flex items-center gap-2.5 rounded-[10px] px-6 py-3.5 font-semibold btn-amber"
              style={{ background: "var(--amber)", color: "#161104", fontSize: 15 }}
            >
              Alle Automatisierungen ansehen
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width={14} height={14}>
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </div>

          <GlowCard>
            <Image
              src="/generated/automatisierung.webp"
              alt="Automatisierung: Aus eingehenden Dokumenten entstehen automatisch Angebote, Bestätigungen und Rechnungen"
              width={1200}
              height={896}
              className="w-full h-auto block rounded-xl"
              style={{ maxWidth: "88%" }}
            />
          </GlowCard>
        </div>
      </div>
    </section>
  );
}
