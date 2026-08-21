import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { industries, getIndustry } from "@/lib/industries";
import { offerings } from "@/lib/offerings";
import CTABanner from "@/components/CTABanner";
import Footer from "@/components/Footer";

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) return {};
  return {
    title: `${industry.label} — Onyx.AI`,
    description: industry.intro,
  };
}

/**
 * Not linked from the main nav on purpose — reached only by clicking an
 * industry card in IndustriesSection. Short brief: what we can do for this
 * industry, which offerings we'd recommend for it.
 */
export default async function BranchePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) notFound();

  const recommended = industry.recommended
    .map((s) => offerings.find((o) => o.slug === s))
    .filter((o): o is (typeof offerings)[number] => Boolean(o));

  return (
    <main>
      <section className="py-16">
        <div className="mx-auto px-7 text-center" style={{ maxWidth: 760 }}>
          <span
            className="mono block mb-4"
            style={{ fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--amber)" }}
          >
            Branche
          </span>
          <h1 style={{ fontSize: "clamp(1.9rem, 4vw, 2.6rem)", marginBottom: 16 }}>{industry.label}</h1>
          <p style={{ color: "var(--warm-grey-dim)", fontSize: "1.02rem", lineHeight: 1.7, marginBottom: 28 }}>{industry.intro}</p>
          <a
            href={`/downloads/branchen/${industry.slug}.pdf`}
            download
            className="inline-flex items-center gap-2.5 rounded-full px-5 py-2.5 mono"
            style={{ fontSize: 13, color: "var(--amber)", border: "1px solid rgba(232, 163, 61,0.3)", background: "var(--amber-soft)" }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width={15} height={15}>
              <path d="M12 3v13m0 0-4-4m4 4 4-4M4 21h16" />
            </svg>
            Infoblatt als PDF herunterladen
          </a>
        </div>
      </section>

      <section className="py-6">
        <div className="mx-auto px-7" style={{ maxWidth: 760 }}>
          <h2 style={{ fontSize: "clamp(1.3rem, 2.4vw, 1.6rem)", marginBottom: 24 }}>
            Was wir für dich tun können.
          </h2>
          <div className="flex flex-col gap-3">
            {industry.capabilities.map((c) => (
              <div
                key={c}
                className="flex items-start gap-3 rounded-xl px-5 py-4 on-dark silver-rim"
                style={{ background: "var(--near-black-2)", border: "1px solid var(--hairline)" }}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--amber)"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  width={17}
                  height={17}
                  style={{ flexShrink: 0, marginTop: 3 }}
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                <span style={{ color: "var(--warm-grey-dim)", fontSize: "0.98rem", lineHeight: 1.55 }}>{c}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="mx-auto px-7" style={{ maxWidth: 1180 }}>
          <span
            className="mono inline-flex items-center gap-2 mb-4"
            style={{ fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--amber)" }}
          >
            <span style={{ opacity: 0.7 }}>§</span> Empfehlung
          </span>
          <h2 style={{ fontSize: "clamp(1.5rem, 2.8vw, 2rem)", maxWidth: "24ch", marginBottom: 40 }}>
            Diese Bausteine passen typischerweise für {industry.label}.
          </h2>

          <div style={{ borderTop: "1px solid var(--hairline)" }}>
            {recommended.map((o, i) => (
              <Link
                key={o.slug}
                href={`/angebot/${o.slug}`}
                className="offering-row flex items-center justify-between gap-3 sm:gap-6 py-6"
                style={{ borderBottom: "1px solid var(--hairline)" }}
              >
                <div className="flex items-center gap-3 sm:gap-6 min-w-0">
                  <span className="mono hidden sm:inline" style={{ fontSize: 14, color: "var(--warm-grey-faint)", flexShrink: 0, width: 20 }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div
                    className="rounded-xl overflow-hidden flex-shrink-0 w-[72px] h-[52px] sm:w-[168px] sm:h-[118px] on-dark silver-rim"
                    style={{ background: "var(--near-black-2)", border: "1px solid var(--hairline)" }}
                  >
                    <div className="relative w-full h-full">
                      <Image src={o.image} alt="" fill sizes="(min-width: 640px) 168px, 72px" style={{ objectFit: "cover" }} />
                    </div>
                  </div>
                  <div className="min-w-0">
                    <div style={{ fontWeight: 700, fontSize: "clamp(1.05rem, 1.8vw, 1.25rem)" }}>{o.title}</div>
                    <div className="hidden sm:block" style={{ color: "var(--warm-grey-dim)", fontSize: "0.92rem", marginTop: 3 }}>{o.subtitle}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 flex-shrink-0">
                  <span className="mono offering-row-cta hidden sm:inline" style={{ fontSize: 12.5, color: "var(--warm-grey-faint)", letterSpacing: "0.03em" }}>
                    Mehr erfahren
                  </span>
                  <span
                    className="offering-row-arrow flex items-center justify-center rounded-full w-8 h-8 sm:w-[38px] sm:h-[38px]"
                    style={{ border: "1px solid var(--hairline)", flexShrink: 0 }}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="var(--amber)" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" width={16} height={16}>
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <p className="mono mt-6" style={{ fontSize: 12, color: "var(--warm-grey-faint)" }}>
            Ausgangspunkt, keine feste Auswahl — dein System wird nach deinem
            konkreten Prozess gebaut, nicht nach einer Branchen-Vorlage.
          </p>
        </div>
      </section>

      <CTABanner
        heading={`Bereit für dein eigenes System für ${industry.label}?`}
        sub="Kein Baukasten, kein Abo — ein System, das dir gehört."
        buttonText="Kostenloses Erstgespräch sichern"
      />

      <Footer />
    </main>
  );
}
