import type { Metadata } from "next";
import Image from "next/image";
import CTABanner from "@/components/CTABanner";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Referenzen — Onyx.AI",
  description: "Projekte, die Onyx.AI gebaut und übergeben hat.",
};

export default function ReferenzenPage() {
  return (
    <main>
      <section className="py-16">
        <div className="mx-auto px-7 text-center" style={{ maxWidth: 760 }}>
          <span
            className="mono block mb-4"
            style={{ fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--amber)" }}
          >
            Referenzen
          </span>
          <h1 style={{ fontSize: "clamp(1.9rem, 4vw, 2.6rem)", marginBottom: 16 }}>
            Projekte, die wir gebaut haben.
          </h1>
          <p style={{ color: "var(--warm-grey-dim)", fontSize: "1.02rem", lineHeight: 1.7 }}>
            Kein Produkt zum Kaufen — Beispiele dafür, was für dein
            Unternehmen möglich ist.
          </p>
        </div>
      </section>

      {/* HausManager Pro */}
      <section className="py-14">
        <div className="mx-auto px-7" style={{ maxWidth: 1180 }}>
          <div className="rounded-2xl p-6 md:p-10" style={{ background: "var(--near-black-2)" }}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <span
                  className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5 mono"
                  style={{
                    fontSize: 11.5,
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                    color: "var(--amber)",
                    background: "var(--amber-soft)",
                    border: "1px solid rgba(232,163,61,0.3)",
                  }}
                >
                  Kundencase · gebaut &amp; übergeben
                </span>
                <h3 style={{ fontSize: "1.4rem", marginBottom: 6 }}>HausManager Pro</h3>
                <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", marginBottom: 18 }}>
                  Vom Excel-Chaos zum eigenen System.
                </h2>
                <p style={{ color: "var(--warm-grey-dim)", fontSize: "1.02rem", lineHeight: 1.75, marginBottom: 28 }}>
                  Für eine Hausverwaltung haben wir ein komplettes CRM von
                  Grund auf entwickelt und vollständig übergeben. Kein
                  Produkt zum Kaufen, sondern ein Beispiel dafür, was für
                  dein Unternehmen möglich ist.
                </p>
                <div className="flex flex-col gap-2.5">
                  {[
                    "Individuelle Prozessanalyse & Konzept",
                    "Vollständige Entwicklung im Onyx-Standard",
                    "Übergabe von Code, Zugängen & Doku",
                    "Gehostet in Deutschland, DSGVO-konform — 100 % Eigentum beim Kunden",
                  ].map((t) => (
                    <div key={t} className="flex items-center gap-2.5" style={{ fontSize: "0.95rem", color: "var(--warm-grey-dim)" }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="var(--amber)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width={16} height={16}>
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      {t}
                    </div>
                  ))}
                </div>

                <blockquote
                  className="mt-7 pl-4"
                  style={{ borderLeft: "2px solid var(--amber)", color: "var(--warm-grey-dim)", fontSize: "0.98rem", lineHeight: 1.7, fontStyle: "italic" }}
                >
                  &bdquo;Durch das neue CRM, das das Team von Onyx gebaut hat,
                  haben wir unsere Verwaltung jetzt viel leichter auf einen
                  Blick — alles geht spürbar schneller und ist
                  übersichtlicher.&ldquo;
                  <footer className="mt-2 mono not-italic" style={{ fontSize: 12.5, color: "var(--warm-grey-faint)" }}>
                    — Kunde, HausManager Pro
                  </footer>
                </blockquote>
              </div>

              <div className="relative flex items-center justify-center" style={{ minHeight: 380 }}>
                <div aria-hidden className="absolute ring-pulse" style={{ width: 520, height: 520, maxWidth: "100%" }}>
                  <Image src="/generated/case-study-ring.webp" alt="" fill sizes="520px" style={{ objectFit: "contain" }} />
                </div>
                <div
                  className="relative rounded-xl overflow-hidden"
                  style={{ width: "100%", maxWidth: 440, boxShadow: "0 24px 60px -20px rgba(0,0,0,0.65)", background: "#000" }}
                >
                  <video controls preload="none" playsInline poster="/assets/hausmanager-poster.jpg" style={{ width: "100%", display: "block", aspectRatio: "16/9" }}>
                    <source src="/assets/hausmanager-demo.mp4" type="video/mp4" />
                  </video>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-8 mt-10" style={{ borderTop: "1px solid var(--hairline)" }}>
              {[
                { value: "20+", label: "Std./Monat gespart", sub: "Weniger manueller Aufwand im Tagesgeschäft" },
                { value: "1 statt 5–6", label: "Tools im Einsatz", sub: "Ein System ersetzt mehrere Abos" },
                { value: "Mehrere hundert €", label: "Ersparnis/Monat", sub: "Deutlich weniger Tool-Kosten im Jahr" },
              ].map((k) => (
                <div key={k.label} className="text-center sm:text-left">
                  <div className="mono" style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--amber)", lineHeight: 1.1 }}>
                    {k.value}
                  </div>
                  <div style={{ fontWeight: 700, fontSize: "0.92rem", marginTop: 6 }}>{k.label}</div>
                  <div style={{ fontSize: "0.8rem", color: "var(--warm-grey-faint)", marginTop: 2 }}>{k.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WETBlock */}
      <section className="py-14">
        <div className="mx-auto px-7" style={{ maxWidth: 1180 }}>
          <div className="rounded-2xl p-6 md:p-10" style={{ background: "var(--near-black-2)" }}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <span
                  className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5 mono"
                  style={{
                    fontSize: 11.5,
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                    color: "var(--amber)",
                    background: "var(--amber-soft)",
                    border: "1px solid rgba(232,163,61,0.3)",
                  }}
                >
                  Kundencase · Automatisierung
                </span>
                <h3 style={{ fontSize: "1.4rem", marginBottom: 6 }}>WETBlock</h3>
                <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", marginBottom: 18 }}>
                  Vom manuellen Versand zur automatisierten Kundenansprache.
                </h2>
                <p style={{ color: "var(--warm-grey-dim)", fontSize: "1.02rem", lineHeight: 1.75, marginBottom: 28 }}>
                  Für WETBlock haben wir den E-Mail-Outreach an ihre
                  Geschäftskunden automatisiert. Vorher musste das Team jede
                  Ansprache an die Unternehmen, an die sie ihre Produkte
                  verkaufen, von Hand schreiben und verschicken — heute läuft
                  das automatisch.
                </p>
                <div className="flex flex-col gap-2.5">
                  {[
                    "Analyse des bestehenden Outreach-Prozesses",
                    "Automatisierung des E-Mail-Versands im Onyx-Standard",
                    "Übergabe inklusive Doku, kein Lock-in",
                  ].map((t) => (
                    <div key={t} className="flex items-center gap-2.5" style={{ fontSize: "0.95rem", color: "var(--warm-grey-dim)" }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="var(--amber)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width={16} height={16}>
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      {t}
                    </div>
                  ))}
                </div>

                <blockquote
                  className="mt-7 pl-4"
                  style={{ borderLeft: "2px solid var(--amber)", color: "var(--warm-grey-dim)", fontSize: "0.98rem", lineHeight: 1.7, fontStyle: "italic" }}
                >
                  &bdquo;Durch das Team von Marvin haben wir jetzt viel mehr
                  Zeit für unser wesentliches Geschäft und müssen uns nicht
                  mehr um E-Mails kümmern.&ldquo;
                  <footer className="mt-2 mono not-italic" style={{ fontSize: 12.5, color: "var(--warm-grey-faint)" }}>
                    — Kunde, WETBlock
                  </footer>
                </blockquote>
              </div>

              <div className="relative flex items-center justify-center">
                <Image
                  src="/generated/wetblock-case.webp"
                  alt="Automatisierter E-Mail-Outreach an Geschäftskunden"
                  width={1125}
                  height={776}
                  className="w-full h-auto block"
                  style={{ filter: "drop-shadow(0 0 40px rgba(232,163,61,0.35))" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTABanner
        heading="Dein Prozess könnte das nächste Projekt sein."
        sub="Lass uns in einem kurzen Gespräch klären, was sich bei dir automatisieren oder als eigenes System bauen lässt."
      />

      <Footer />
    </main>
  );
}
