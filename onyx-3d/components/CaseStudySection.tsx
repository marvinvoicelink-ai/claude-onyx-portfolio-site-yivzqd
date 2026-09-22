"use client";

import Image from "next/image";
import CountUp from "./CountUp";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const kpis = [
  { value: "20+", label: "Std./Monat gespart", sub: "Weniger manueller Aufwand im Tagesgeschäft" },
  { value: "1 statt 5–6", label: "Tools im Einsatz", sub: "Ein System ersetzt mehrere Abos" },
  { value: "Mehrere hundert €", label: "Ersparnis/Monat", sub: "Deutlich weniger Tool-Kosten im Jahr" },
];

export default function CaseStudySection() {
  const block = useScrollReveal<HTMLDivElement>(1);
  const isVisible = block.visible[0];

  return (
    <section className="py-14">
      <div className="mx-auto px-7" style={{ maxWidth: 1180 }}>
        <div
          ref={block.setRef(0)}
          data-reveal-index={0}
          className={`p-6 md:p-10 ${isVisible ? "reveal-visible" : "reveal-hidden"}`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-10">
            <div>
              <span
                className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5 mono"
                style={{
                  fontSize: 11.5,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  color: "var(--amber)",
                  background: "var(--amber-soft)",
                  border: "1px solid rgba(232, 163, 61,0.3)",
                }}
              >
                Kundencase · gebaut &amp; übergeben
              </span>
              <h3 style={{ fontSize: "1.4rem", marginBottom: 6, color: "var(--warm-grey)" }}>HausManager Pro</h3>
              <h2 className="text-center" style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", marginBottom: 18 }}>
                Vom Excel-Chaos zum eigenen System.
              </h2>
              <p style={{ color: "var(--warm-grey-dim)", fontSize: "1.02rem", lineHeight: 1.75, marginBottom: 28 }}>
                Für eine Hausverwaltung haben wir ein komplettes CRM von Grund
                auf entwickelt und vollständig übergeben. Kein Produkt zum
                Kaufen, sondern ein Beispiel dafür, was für dein Unternehmen
                möglich ist.
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

            <div
              className={`relative flex items-center justify-center ${isVisible ? "reveal-zoom-visible" : "reveal-zoom-hidden"}`}
              style={{ minHeight: 380 }}
            >
              {/* Spotlight glow ring behind the case-study mockup */}
              <div
                aria-hidden
                className="absolute ring-pulse"
                style={{ width: 520, height: 520, maxWidth: "100%" }}
              >
                <Image
                  src="/generated/case-study-ring.webp"
                  alt=""
                  fill
                  sizes="520px"
                  style={{ objectFit: "contain" }}
                />
              </div>
              <div
                className="relative rounded-2xl"
                style={{
                  width: "100%",
                  maxWidth: 440,
                  padding: 10,
                  background: "var(--near-black)",
                  boxShadow: "0 24px 60px -20px rgba(0,0,0,0.65)",
                }}
              >
                <div className="relative rounded-xl overflow-hidden w-full" style={{ background: "#000" }}>
                  <video
                    controls
                    preload="none"
                    playsInline
                    poster="/assets/hausmanager-poster.jpg"
                    style={{ width: "100%", display: "block", aspectRatio: "16/9" }}
                  >
                    <source src="/assets/hausmanager-demo.mp4" type="video/mp4" />
                  </video>
                </div>
              </div>
            </div>
          </div>

          <div
            className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-8"
            style={{ borderTop: "1px solid var(--hairline)" }}
          >
            {kpis.map((k, i) => (
              <div key={k.label} className="text-center sm:text-left">
                <div className="mono" style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--amber)", lineHeight: 1.1 }}>
                  {i === 0 ? <CountUp target={20} suffix="+" start={isVisible} /> : k.value}
                </div>
                <div style={{ fontWeight: 700, fontSize: "0.92rem", marginTop: 6, color: "var(--warm-grey)" }}>{k.label}</div>
                <div style={{ fontSize: "0.8rem", color: "var(--warm-grey-faint)", marginTop: 2 }}>
                  {k.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
