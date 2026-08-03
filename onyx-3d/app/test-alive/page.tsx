import type { Metadata } from "next";
import Image from "next/image";
import Footer from "@/components/Footer";
import {
  AliveStatRow,
  AliveHairlineGrid,
  AliveInvertedStatement,
  AliveCase,
  AliveComparisonTable,
  AliveTestimonialWall,
  AliveFaq,
  AliveTeamGrid,
  AliveCtaBand,
  AliveTimeline,
} from "@/components/alive/AliveChrome";

export const metadata: Metadata = {
  title: "Test — Onyx.AI",
  robots: { index: false, follow: false },
};

const problems = [
  { num: "01", title: "Mehrere Tools,", highlight: "die nicht zusammenpassen", desc: "Excel-Listen, SaaS-Tools, die nie ganz zu deinem Prozess passen.", image: "/generated/problem-tools.webp" },
  { num: "02", title: "Funktionen fehlen", highlight: "trotzdem", desc: "Das nächste Preispaket kostet doppelt, bringt aber nur einen Bruchteil mehr.", image: "/generated/problem-pricing.webp" },
  { num: "03", title: "Daten liegen", highlight: "nicht bei dir", desc: "Kundendaten liegen auf fremden Servern, oft außerhalb der EU.", image: "/generated/problem-servers.webp" },
  { num: "04", title: "Abhängig", highlight: "vom Anbieter", desc: "Kündigt er den Vertrag oder erhöht die Preise, stehst du ohne Alternative da.", image: "/generated/problem-lock.webp" },
];

const roadmapSteps = [
  { num: "01", title: "Erstgespräch & Analyse", desc: "Wir lernen deinen Prozess kennen — ohne Verkaufsdruck." },
  { num: "02", title: "Konzept & Festpreis", desc: "Klares Konzept, transparenter Festpreis." },
  { num: "03", title: "Entwicklung", desc: "Dein System entsteht — mit regelmäßigen Updates." },
  { num: "04", title: "Testing & Übergabe", desc: "Gemeinsam geprüft, vollständig dokumentiert." },
  { num: "05", title: "Go-Live", desc: "Läuft auf deiner Infrastruktur, unter deiner Marke." },
];

const services = [
  { num: "01", title: "Kundenportale.", desc: "Status, Dokumente und Termine selbst einsehen." },
  { num: "02", title: "Interne Tools.", desc: "Aus Excel und Zetteln wird ein eigenes System." },
  { num: "03", title: "Dashboards & Auswertungen.", desc: "Alle Zahlen an einem Ort, live und verständlich." },
  {
    num: "04",
    title: "Automatisierung & KI-Agenten.",
    desc: "Mails, Reports und Erinnerungen laufen automatisch.",
    bullets: [
      "E-Mail-Automatisierung · automatischer Versand & Nachfassen",
      "Automatisierte Reports & Erinnerungen · ohne manuelles Zutun",
      "Interne KI-Agenten · verarbeiten und sortieren Daten automatisch",
    ],
  },
  { num: "05", title: "Termin- & Ressourcenplanung.", desc: "Kalender und Kapazitäten in einem System." },
];

const faqs = [
  {
    q: "Was kostet ein System von Onyx?",
    a: "Jedes System ist individuell — deshalb gibt es keinen Katalogpreis. Nach dem ersten Gespräch bekommst du ein klares Konzept mit Festpreis.",
  },
  {
    q: "Wie lange dauert der Bau?",
    a: "Ein fokussiertes Tool kann in wenigen Wochen stehen, ein komplettes CRM dauert länger. Im Erstgespräch bekommst du eine realistische Einschätzung.",
  },
  {
    q: "Muss ich technisch versiert sein?",
    a: "Nein. Du beschreibst deinen Prozess und wir übersetzen ihn in ein System — mit verständlicher Dokumentation zur Übergabe.",
  },
  {
    q: "Ist mein System DSGVO-konform?",
    a: "Ja. Du hostest selbst, in Deutschland bzw. der EU, mit AVV. Keine Daten über fremde Server, die du nicht kontrollierst.",
  },
];

const team = [
  { name: "Marvin Weiß-Drumm", role: "CEO & Head of AI and Automations", image: "/assets/marvin-portrait.jpg" },
  { name: "Jennifer", role: "Support", image: "/assets/team/jennifer.jpg" },
  { name: "Jonas", role: "Programmierer", image: "/assets/team/jonas.jpg" },
  { name: "Tim", role: "Programmierer", image: "/assets/team/tim.jpg" },
];

export default function TestAlivePage() {
  return (
    <main>
      {/* ---------- HERO: full-bleed image, big bottom-anchored headline ---------- */}
      <section className="relative flex items-end overflow-hidden" style={{ minHeight: "100vh" }}>
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
            style={{ fontSize: 12.5, letterSpacing: "0.04em", color: "var(--warm-grey-dim)", border: "1px solid var(--hairline)", borderRadius: 999, padding: "9px 20px" }}
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
              <a href="/kontakt" className="inline-flex items-center gap-2.5 rounded-[10px] px-7 py-4 font-semibold btn-amber" style={{ background: "var(--amber)", color: "#161104", fontSize: 15.5 }}>
                Jetzt Kontakt aufnehmen
              </a>
              <a href="https://calendly.com/onyx-ai/30min" target="_blank" rel="noopener" className="inline-flex items-center gap-2.5 rounded-[10px] px-7 py-4 font-semibold btn-ghost" style={{ background: "transparent", color: "var(--warm-grey)", border: "1px solid var(--hairline)", fontSize: 15.5 }}>
                30 Min. Termin buchen
              </a>
            </div>
          </div>
        </div>
      </section>

      <AliveStatRow
        stats={[
          { value: "20+", label: "Std./Monat gespart" },
          { value: "1 statt 5–6", label: "Tools im Einsatz" },
          { value: "Mehrere hundert €", label: "Ersparnis/Monat" },
        ]}
      />

      <AliveHairlineGrid eyebrow="Ausgangslage" heading="Kommt dir das bekannt vor?" items={problems} />

      <AliveInvertedStatement
        eyebrow="Warum Onyx"
        statement="Ein eigenes System spart Kosten. Ein eigenes System ohne KI spart nur ein paar Jahre lang —"
        highlight="danach zieht der Wettbewerb vorbei, der längst automatisiert hat."
        sub="Deshalb bauen wir KI und Automatisierung nicht als Extra ein, sondern von Anfang an in jedes System, das wir für dich entwickeln."
      />

      <AliveHairlineGrid
        eyebrow="Leistungen"
        heading="Alles aus einer Hand. Fünf Bausteine, ein System."
        items={services}
        cols={3}
      />

      <AliveCase
        tag="Kundencase · gebaut & übergeben"
        name="HausManager Pro"
        heading="Vom Excel-Chaos zum eigenen System."
        desc="Für eine Hausverwaltung haben wir ein komplettes CRM von Grund auf entwickelt und vollständig übergeben. Kein Produkt zum Kaufen, sondern ein Beispiel dafür, was für dein Unternehmen möglich ist."
        image="/generated/chaos-to-portal.webp"
      />
      <AliveCase
        tag="Kundencase · Automatisierung"
        name="WETBlock"
        heading="Vom manuellen Versand zur automatisierten Kundenansprache."
        desc="Für WETBlock haben wir den E-Mail-Outreach an ihre Geschäftskunden automatisiert. Vorher musste das Team jede Ansprache von Hand schreiben — heute läuft das automatisch."
        image="/generated/wetblock-case.webp"
        imageRight
        bullets={[
          "Automatischer Versand · individuelle Ansprache ohne manuelles Schreiben",
          "Automatisches Nachfassen · reagiert auf Antworten oder Funkstille",
          "Zentrale Auswertung · zeigt, welche Ansprache tatsächlich ankommt",
        ]}
      />

      <AliveComparisonTable
        eyebrow="Abgrenzung"
        heading="Dein Zugang. Deine Regeln."
        columns={["08/15-CRM von der Stange", "System von Onyx"]}
        rows={[
          { label: "Passt sich an", a: "Du an das Tool", b: "Das System an dich" },
          { label: "Eigentum", a: "Anbieter", b: "Du — Code & Daten" },
          { label: "Hosting", a: "Fremde Server", b: "Deine Infrastruktur" },
          { label: "Vertragsende", a: "Du stehst ohne Alternative da", b: "Kein Lock-in" },
        ]}
      />

      <AliveTimeline
        eyebrow="Unser Vorgehen"
        heading="Von der Analyse bis zum Go-Live."
        sub="Ein fokussiertes Tool kann in wenigen Wochen stehen, ein komplettes CRM dauert länger — im Erstgespräch bekommst du eine realistische Einschätzung."
        steps={roadmapSteps}
      />

      <AliveTestimonialWall
        eyebrow="Stimmen"
        heading="Was Kunden sagen."
        quotes={[
          {
            text: "Durch das neue CRM, das das Team von Onyx gebaut hat, haben wir unsere Verwaltung jetzt viel leichter auf einen Blick — alles geht spürbar schneller und ist übersichtlicher.",
            name: "Kunde",
            source: "HausManager Pro",
          },
          {
            text: "Durch das Team von Marvin haben wir jetzt viel mehr Zeit für unser wesentliches Geschäft und müssen uns nicht mehr um E-Mails kümmern.",
            name: "Kunde",
            source: "WETBlock",
          },
        ]}
      />

      <AliveFaq eyebrow="Rückfragen" heading="Bevor du fragst." faqs={faqs} />

      <AliveTeamGrid eyebrow="Über uns" heading="Die Menschen hinter Onyx.AI." team={team} />

      <AliveCtaBand
        heading="Dein System, gebaut für genau dein Geschäft."
        sub="Kein Baukasten, kein Abo — ein System, das dir gehört."
        image="/generated/section-break-macro.png"
      />

      <Footer />
    </main>
  );
}
