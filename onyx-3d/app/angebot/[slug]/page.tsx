import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { offerings, getOffering } from "@/lib/offerings";
import GlowCard from "@/components/GlowCard";
import { AliveCase } from "@/components/alive/AliveChrome";
import CTABanner from "@/components/CTABanner";
import Footer from "@/components/Footer";

export function generateStaticParams() {
  return offerings.map((o) => ({ slug: o.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const offering = getOffering(slug);
  if (!offering) return {};
  return {
    title: `${offering.title.replace(/\.$/, "")} — Onyx.AI`,
    description: offering.meta,
  };
}

/** Eine eigene Seite pro Baustein: Ausgangslage, was gebaut wird, ein durchgespieltes Beispiel, Kontakt. */
export default async function AngebotDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const offering = getOffering(slug);
  if (!offering) notFound();

  const index = offerings.findIndex((o) => o.slug === slug);
  const next = offerings[(index + 1) % offerings.length];
  const titlePlain = offering.title.replace(/\.$/, "");

  return (
    <main>
      <section className="pt-14 pb-6">
        <div className="mx-auto px-7" style={{ maxWidth: 1180 }}>
          <Link
            href="/angebot"
            className="mono inline-flex items-center gap-2 mb-10"
            style={{ fontSize: 12.5, color: "var(--amber)" }}
          >
            ← Alle Bausteine
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            {/* Ganze Spalte zentriert, sonst steht der Fliesstext linksbuendig
                unter einer zentrierten Ueberschrift. */}
            <div className="text-center">
              <span
                className="mono block mb-4"
                style={{ fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--amber)" }}
              >
                Baustein {String(index + 1).padStart(2, "0")}
              </span>
              <h1 style={{ fontSize: "clamp(1.9rem, 4vw, 2.7rem)", marginBottom: 16 }}>{titlePlain}</h1>
              <p style={{ color: "var(--warm-grey)", fontSize: "1.1rem", lineHeight: 1.6, marginBottom: 14 }}>
                {offering.subtitle}
              </p>
              <p className="mx-auto" style={{ color: "var(--warm-grey-dim)", fontSize: "1.02rem", lineHeight: 1.75, maxWidth: "56ch" }}>
                {offering.detail}
              </p>
            </div>

            <GlowCard>
              <Image
                src={offering.image}
                alt={`${titlePlain}: ${offering.subtitle}`}
                width={offering.w}
                height={offering.h}
                priority
                className="w-full h-auto block"
                style={{ maxWidth: "68%", filter: "drop-shadow(0 0 28px rgba(203, 203, 201,0.32))" }}
              />
            </GlowCard>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto px-7" style={{ maxWidth: 1180 }}>
          <span
            className="mono inline-flex items-center gap-2 mb-4"
            style={{ fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--amber)" }}
          >
            <span style={{ opacity: 0.7 }}>§</span> Ausgangslage
          </span>
          <h2 style={{ fontSize: "clamp(1.5rem, 2.8vw, 2rem)", marginBottom: 28, maxWidth: "24ch" }}>
            Woran es vorher hakt.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {offering.painPoints.map((p, i) => (
              <div
                key={p}
                className="rounded-xl px-6 py-6 on-dark silver-rim"
                style={{ background: "var(--near-black-2)", border: "1px solid var(--hairline)" }}
              >
                <span className="mono block mb-3" style={{ fontSize: 13, color: "var(--amber)" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                {/* Volle Helligkeit statt gedimmt: die Ausgangslage ist der
                    Einstieg der Seite und soll ohne Anstrengung lesbar sein. */}
                <p style={{ color: "var(--warm-grey)", fontSize: "0.98rem", lineHeight: 1.6 }}>{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto px-7" style={{ maxWidth: 1180 }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
            <div>
              <span
                className="mono inline-flex items-center gap-2 mb-4"
                style={{ fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--amber)" }}
              >
                <span style={{ opacity: 0.7 }}>§</span> Was wir bauen
              </span>
              <h2 style={{ fontSize: "clamp(1.5rem, 2.8vw, 2rem)", marginBottom: 24, maxWidth: "22ch" }}>
                Das steckt drin.
              </h2>
              <div className="flex flex-col gap-3">
                {offering.bullets.map((b) => (
                  <div key={b} className="flex gap-3">
                    <svg viewBox="0 0 24 24" fill="none" stroke="var(--amber)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width={17} height={17} style={{ flexShrink: 0, marginTop: 4 }}>
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    <span style={{ color: "var(--warm-grey-dim)", fontSize: "0.98rem", lineHeight: 1.6 }}>{b}</span>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="rounded-2xl px-7 py-8 md:px-9 md:py-9"
              style={{ background: "var(--amber-soft)", border: "1px solid rgba(232, 163, 61,0.3)" }}
            >
              <span
                className="mono block mb-4"
                style={{ fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--amber)" }}
              >
                Beispiel
              </span>
              <h3 style={{ fontSize: "clamp(1.2rem, 2.2vw, 1.5rem)", marginBottom: 14 }}>
                {offering.beispiel.title}
              </h3>
              <p style={{ color: "var(--warm-grey-dim)", fontSize: "1rem", lineHeight: 1.75 }}>
                {offering.beispiel.text}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="mx-auto px-7" style={{ maxWidth: 1180 }}>
          <div
            className="rounded-2xl px-7 py-7 md:px-10 md:py-8 on-dark silver-rim"
            style={{ background: "var(--near-black-2)", border: "1px solid var(--hairline)" }}
          >
            <h2 style={{ fontSize: "clamp(1.15rem, 2.2vw, 1.45rem)", marginBottom: 10 }}>
              Und danach gehört es dir.
            </h2>
            <p style={{ color: "var(--warm-grey-dim)", fontSize: "1rem", lineHeight: 1.7, maxWidth: "70ch" }}>
              Wir bauen im White-Label und übergeben vollständig: Quellcode,
              Zugänge und Dokumentation. Gehostet wird bei dir oder deinem
              Wunschanbieter, DSGVO-konform und mit AVV. Nach der Übergabe
              entscheidest du, ob und mit wem es weitergeht.
            </p>
          </div>
        </div>
      </section>

      {offering.referenz && (
        <>
          <section className="pt-10 pb-2">
            <div className="mx-auto px-7" style={{ maxWidth: 1180 }}>
              <span
                className="mono inline-flex items-center gap-2 mb-3"
                style={{ fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--amber)" }}
              >
                <span style={{ opacity: 0.7 }}>§</span> Referenz
              </span>
              <h2 style={{ fontSize: "clamp(1.5rem, 2.8vw, 2rem)", maxWidth: "26ch" }}>
                Schon gebaut, nicht nur gedacht.
              </h2>
            </div>
          </section>

          <AliveCase
            tag={offering.referenz.tag}
            name={offering.referenz.name}
            heading={offering.referenz.heading}
            desc={offering.referenz.desc}
            bullets={offering.referenz.bullets}
            image={offering.referenz.image}
            logo={offering.referenz.logo}
            imageRight
          />

          <div className="text-center" style={{ marginTop: -20, marginBottom: 28 }}>
            <Link href="/referenzen" className="mono" style={{ fontSize: 13, color: "var(--amber)" }}>
              Alle Referenzen ansehen →
            </Link>
          </div>
        </>
      )}

      <section className="pb-6">
        <div className="mx-auto px-7" style={{ maxWidth: 1180 }}>
          <Link
            href={`/angebot/${next.slug}`}
            className="offering-row flex items-center justify-between gap-4 py-6"
            style={{ borderTop: "1px solid var(--hairline)", borderBottom: "1px solid var(--hairline)" }}
          >
            <div className="min-w-0">
              <span className="mono block mb-1.5" style={{ fontSize: 11.5, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--warm-grey-faint)" }}>
                Nächster Baustein
              </span>
              <div style={{ fontWeight: 700, fontSize: "clamp(1.05rem, 1.8vw, 1.25rem)" }}>
                {next.title.replace(/\.$/, "")}
              </div>
            </div>
            <span
              className="offering-row-arrow flex items-center justify-center rounded-full w-9 h-9"
              style={{ border: "1px solid var(--hairline)", flexShrink: 0 }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="var(--amber)" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" width={16} height={16}>
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </span>
          </Link>
        </div>
      </section>

      <CTABanner
        heading={`Würde ${titlePlain} bei dir etwas ändern?`}
        sub="Sag uns, wie es bei dir gerade läuft. Wir sagen dir ehrlich, ob sich das lohnt."
        buttonText="Kostenloses Erstgespräch sichern"
      />

      <Footer />
    </main>
  );
}
