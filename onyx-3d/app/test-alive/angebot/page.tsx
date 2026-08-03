import type { Metadata } from "next";
import Footer from "@/components/Footer";
import { AliveHairlineGrid, AliveMarquee, AliveInvertedStatement, AliveCtaBand } from "@/components/alive/AliveChrome";

export const metadata: Metadata = {
  title: "Test Angebot — Onyx.AI",
  robots: { index: false, follow: false },
};

const services = [
  { num: "01", title: "Kundenportale.", desc: "Status, Dokumente und Termine selbst einsehen.", image: "/generated/solution-01.webp" },
  { num: "02", title: "Interne Tools.", desc: "Aus Excel und Zetteln wird ein eigenes System.", image: "/generated/solution-02.webp" },
  { num: "03", title: "Dashboards & Auswertungen.", desc: "Alle Zahlen an einem Ort, live und verständlich.", image: "/generated/solution-03.webp" },
  {
    num: "04",
    title: "Automatisierung & KI-Agenten.",
    desc: "Mails, Reports und Erinnerungen laufen automatisch.",
    image: "/generated/solution-04.webp",
    bullets: [
      "E-Mail-Automatisierung · automatischer Versand & Nachfassen",
      "Automatisierte Reports & Erinnerungen · ohne manuelles Zutun",
      "Interne KI-Agenten · verarbeiten und sortieren Daten automatisch",
    ],
  },
  { num: "05", title: "Termin- & Ressourcenplanung.", desc: "Kalender und Kapazitäten in einem System.", image: "/generated/solution-05.webp" },
  { num: "06", title: "Dokumenten- & Datenverwaltung.", desc: "Eine zentrale Ablage statt Ordner-Chaos.", image: "/generated/solution-06.webp" },
];

const industries = [
  "Handwerk & Bau",
  "Hausverwaltung & Immobilien",
  "Personaldienstleistung",
  "Logistik & Spedition",
  "Praxen & Gesundheitswesen",
  "Handel & E-Commerce",
  "Beratung & Agenturen",
  "Versicherungen & Finanzdienstleister",
];

export default function TestAliveAngebotPage() {
  return (
    <main>
      <section className="py-24 pt-40 text-center">
        <div className="mx-auto px-7" style={{ maxWidth: 760 }}>
          <span className="mono block mb-4" style={{ fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--amber)" }}>
            Angebot
          </span>
          <h1 style={{ fontFamily: "var(--font-archivo), sans-serif", fontWeight: 800, fontSize: "clamp(2.6rem, 6vw, 4.2rem)", lineHeight: 1.05, marginBottom: 16 }}>
            Was wir bauen. Und für wen.
          </h1>
          <p style={{ color: "var(--warm-grey-dim)", fontSize: "1.05rem", lineHeight: 1.7 }}>
            Kein Baukasten mit festen Modulen — was dein System am Ende abdeckt, richtet sich nach deinem Prozess. Kein Branchen-Fokus: passt dein Prozess, passt Onyx.
          </p>
        </div>
      </section>

      <AliveHairlineGrid eyebrow="Leistungen" heading="Ein System, jeder Bereich, den du brauchst." items={services} cols={3} />

      <AliveInvertedStatement
        eyebrow="Kein Branchen-Fokus"
        statement="Onyx ist nicht auf eine Branche spezialisiert —"
        highlight="jedes System wird um deinen konkreten Prozess herum gebaut."
        sub="Ein paar Beispiele, wo das typischerweise gebraucht wird:"
      />

      <AliveMarquee items={industries} />

      <AliveCtaBand
        heading="Dein System, gebaut für genau dein Geschäft."
        sub="Kein Baukasten, kein Abo — ein System, das dir gehört."
      />

      <Footer />
    </main>
  );
}
