import type { Metadata } from "next";
import Image from "next/image";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Test — Onyx.AI",
  robots: { index: false, follow: false },
};

const problems = [
  {
    num: "01",
    title: "Mehrere Tools,",
    highlight: "die nicht zusammenpassen",
    desc: "Excel-Listen, SaaS-Tools, die nie ganz zu deinem Prozess passen.",
  },
  {
    num: "02",
    title: "Funktionen fehlen",
    highlight: "trotzdem",
    desc: "Das nächste Preispaket kostet doppelt, bringt aber nur einen Bruchteil mehr.",
  },
  {
    num: "03",
    title: "Daten liegen",
    highlight: "nicht bei dir",
    desc: "Kundendaten liegen auf fremden Servern, oft außerhalb der EU.",
  },
  {
    num: "04",
    title: "Abhängig",
    highlight: "vom Anbieter",
    desc: "Kündigt er den Vertrag oder erhöht die Preise, stehst du ohne Alternative da.",
  },
];

const kpis = [
  { value: "20+", label: "Std./Monat gespart" },
  { value: "1 statt 5–6", label: "Tools im Einsatz" },
  { value: "Mehrere hundert €", label: "Ersparnis/Monat" },
];

export default function TestAlivePage() {
  return (
    <main>
      {/* ---------- HERO: full-bleed image, big bottom-anchored headline ---------- */}
      <section
        className="relative flex items-end overflow-hidden"
        style={{ minHeight: "100vh" }}
      >
        <div className="absolute inset-0">
          <Image
            src="/generated/hero-alive-bg.png"
            alt=""
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "60% 50%" }}
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, rgba(17,17,17,0.97) 0%, rgba(17,17,17,0.75) 38%, rgba(17,17,17,0.25) 68%, rgba(17,17,17,0.05) 100%), linear-gradient(0deg, rgba(17,17,17,0.9) 0%, rgba(17,17,17,0) 40%)",
            }}
          />
        </div>

        <div className="relative z-10 w-full px-7 pb-16 pt-32" style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div
            className="mono inline-flex items-center gap-2 mb-8"
            style={{
              fontSize: 12.5,
              letterSpacing: "0.04em",
              color: "var(--warm-grey-dim)",
              border: "1px solid var(--hairline)",
              borderRadius: 999,
              padding: "9px 20px",
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--amber)" }} />
            Kein Bot — der Gründer antwortet selbst
          </div>

          <h1
            style={{
              fontFamily: "var(--font-archivo), sans-serif",
              fontWeight: 800,
              fontSize: "clamp(3.2rem, 8vw, 6.4rem)",
              lineHeight: 0.98,
              letterSpacing: "-0.02em",
              maxWidth: "17ch",
              color: "var(--warm-grey)",
            }}
          >
            Wir bauen dir dein eigenes System.
            <br />
            <span className="accent">Du besitzt es.</span>
          </h1>

          <div className="flex flex-wrap items-end justify-between gap-8 mt-14">
            <p style={{ color: "var(--warm-grey-dim)", fontSize: "1.1rem", lineHeight: 1.6, maxWidth: "42ch" }}>
              Personalisierte Dashboards, Portale und Automatisierungen im
              White-Label — fertig gebaut, an dich übergeben, auf deiner
              Infrastruktur, unter deiner Marke.
            </p>
            <div className="flex flex-wrap gap-3.5">
              <a
                href="/kontakt"
                className="inline-flex items-center gap-2.5 rounded-[10px] px-7 py-4 font-semibold btn-amber"
                style={{ background: "var(--amber)", color: "#161104", fontSize: 15.5 }}
              >
                Jetzt Kontakt aufnehmen
              </a>
              <a
                href="https://calendly.com/onyx-ai/30min"
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2.5 rounded-[10px] px-7 py-4 font-semibold btn-ghost"
                style={{ background: "transparent", color: "var(--warm-grey)", border: "1px solid var(--hairline)", fontSize: 15.5 }}
              >
                30 Min. Termin buchen
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- STAT ROW ---------- */}
      <section style={{ background: "var(--near-black-2)", borderBottom: "1px solid var(--hairline)" }}>
        <div
          className="mx-auto grid grid-cols-1 sm:grid-cols-3"
          style={{ maxWidth: 1400 }}
        >
          {kpis.map((k, i) => (
            <div
              key={k.label}
              className="text-center py-10 px-6"
              style={{ borderLeft: i > 0 ? "1px solid var(--hairline)" : "none" }}
            >
              <div className="mono" style={{ fontSize: "2rem", fontWeight: 800, color: "var(--amber)", lineHeight: 1.1 }}>
                {k.value}
              </div>
              <div style={{ fontSize: "0.92rem", color: "var(--warm-grey-dim)", marginTop: 6 }}>{k.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- PROBLEM GRID (2x2, hairline dividers, like a spec sheet) ---------- */}
      <section className="py-20">
        <div className="mx-auto px-7 text-center" style={{ maxWidth: 700, marginBottom: 56 }}>
          <span
            className="mono block mb-4"
            style={{ fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--amber)" }}
          >
            Ausgangslage
          </span>
          <h2 style={{ fontSize: "clamp(1.8rem, 3.6vw, 2.6rem)" }}>Kommt dir das bekannt vor?</h2>
        </div>
        <div className="mx-auto px-7" style={{ maxWidth: 1180 }}>
          <div
            className="grid grid-cols-1 sm:grid-cols-2"
            style={{ background: "var(--hairline)", gap: 1, border: "1px solid var(--hairline)" }}
          >
            {problems.map((p) => (
              <div key={p.num} className="p-8" style={{ background: "var(--near-black)" }}>
                <div className="mono mb-4" style={{ fontSize: 13, color: "var(--amber)" }}>
                  {p.num}
                </div>
                <h3 style={{ fontSize: "1.3rem", marginBottom: 8 }}>
                  {p.title} <span className="accent">{p.highlight}</span>
                </h3>
                <p style={{ color: "var(--warm-grey-dim)", fontSize: "0.98rem" }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- INVERTED LIGHT SECTION — rhythm break ---------- */}
      <section className="py-24" style={{ background: "var(--warm-grey)" }}>
        <div className="mx-auto px-7 text-center" style={{ maxWidth: 780 }}>
          <span
            className="mono block mb-5"
            style={{ fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "#8a6a1f" }}
          >
            Warum Onyx
          </span>
          <p
            style={{
              fontFamily: "var(--font-archivo), sans-serif",
              fontWeight: 800,
              fontSize: "clamp(1.8rem, 3.8vw, 2.7rem)",
              lineHeight: 1.2,
              color: "#161104",
            }}
          >
            Ein eigenes System spart Kosten. Ein eigenes System ohne KI spart
            nur ein paar Jahre lang —{" "}
            <span style={{ color: "#8a6a1f" }}>
              danach zieht der Wettbewerb vorbei, der längst automatisiert hat.
            </span>
          </p>
          <p style={{ color: "rgba(22,17,4,0.62)", fontSize: "1.05rem", lineHeight: 1.7, marginTop: 24 }}>
            Deshalb bauen wir KI und Automatisierung nicht als Extra ein,
            sondern von Anfang an in jedes System, das wir für dich
            entwickeln.
          </p>
        </div>
      </section>

      {/* ---------- CASE STUDY ---------- */}
      <section className="py-20">
        <div className="mx-auto px-7" style={{ maxWidth: 1180 }}>
          <div
            className="grid grid-cols-1 lg:grid-cols-2"
            style={{ border: "1px solid var(--hairline)", borderRadius: 4, overflow: "hidden" }}
          >
            <div className="relative" style={{ minHeight: 380, background: "var(--near-black-2)" }}>
              <div aria-hidden className="absolute ring-pulse" style={{ inset: 0, opacity: 0.6 }}>
                <Image src="/generated/case-study-ring.webp" alt="" fill style={{ objectFit: "contain" }} />
              </div>
              <div className="absolute" style={{ inset: 40 }}>
                <Image
                  src="/assets/hausmanager-poster.jpg"
                  alt="HausManager Pro"
                  fill
                  style={{ objectFit: "cover", borderRadius: 8, boxShadow: "0 24px 60px -20px rgba(0,0,0,0.65)" }}
                />
              </div>
            </div>
            <div className="p-8 md:p-12" style={{ background: "var(--near-black-2)" }}>
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
              <h3 style={{ fontSize: "1.3rem", marginBottom: 6 }}>HausManager Pro</h3>
              <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", marginBottom: 18 }}>
                Vom Excel-Chaos zum eigenen System.
              </h2>
              <p style={{ color: "var(--warm-grey-dim)", fontSize: "1.02rem", lineHeight: 1.75 }}>
                Für eine Hausverwaltung haben wir ein komplettes CRM von Grund
                auf entwickelt und vollständig übergeben. Kein Produkt zum
                Kaufen, sondern ein Beispiel dafür, was für dein Unternehmen
                möglich ist.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- CTA BAND — the one deliberate glow moment ---------- */}
      <section className="py-20">
        <div className="mx-auto px-7" style={{ maxWidth: 1180 }}>
          <div
            className="rounded-2xl px-8 py-14 md:px-16 md:py-20 flex flex-col items-center text-center gap-7"
            style={{
              background:
                "radial-gradient(circle at 20% 20%, rgba(232,163,61,0.14), transparent 55%), var(--near-black-2)",
              border: "1px solid var(--hairline)",
            }}
          >
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", maxWidth: "20ch" }}>
              Dein System, gebaut für genau dein Geschäft.
            </h2>
            <p style={{ color: "var(--warm-grey-dim)", fontSize: "1.02rem" }}>
              Kein Baukasten, kein Abo — ein System, das dir gehört.
            </p>
            <a
              href="/kontakt"
              className="inline-flex items-center gap-2.5 rounded-[10px] px-7 py-4 font-semibold btn-amber"
              style={{ background: "var(--amber)", color: "#161104", fontSize: 15.5 }}
            >
              Kostenloses Erstgespräch sichern
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
