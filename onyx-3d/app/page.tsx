import Link from "next/link";
import SmoothScroll from "@/components/SmoothScroll";
import HomeHero from "@/components/erfassung/HomeHero";
import ErfassungDemo from "@/components/erfassung/ErfassungDemo";
import ErfassungSteps from "@/components/erfassung/ErfassungSteps";
import ErfassungRealCase from "@/components/erfassung/ErfassungRealCase";
import ErfassungBereiche from "@/components/erfassung/ErfassungBereiche";
import ErfassungVideoSection from "@/components/erfassung/ErfassungVideoSection";
import ErfassungSprachen from "@/components/erfassung/ErfassungSprachen";
import ErfassungPreise from "@/components/erfassung/ErfassungPreise";
import { AliveCase, AliveFaq } from "@/components/alive/AliveChrome";
import CTABanner from "@/components/CTABanner";
import Footer from "@/components/Footer";

const faqs = [
  {
    q: "Ich kann das später auch selbst im Büro eingeben.",
    a: "Kannst du. Genau diese zweite Erfassung soll wegfallen. Die Informationen, die du vor Ort ohnehin aufnimmst, werden direkt strukturiert gespeichert.",
  },
  {
    q: "Was passiert, wenn ich ein falsches Maß einspreche?",
    a: "Das System kann nur mit den Informationen arbeiten, die vor Ort angegeben werden. Ein falsch genanntes Maß wird nicht automatisch richtig. Deshalb müssen die erfassten Daten prüfbar bleiben.",
  },
  {
    q: "Muss ich trotzdem jeden Raum fotografieren?",
    a: "Nein. Das Video ist das Hauptmaterial. Fotos werden nur dort ergänzt, wo sie sinnvoll sind.",
  },
  {
    q: "Verändert die KI echte Räume für die Vermarktung?",
    a: "Reale Maße, Fenster und die bauliche Situation bleiben unverändert. Wenn Einrichtungsvorschläge verwendet werden, sind sie klar als solche gekennzeichnet.",
  },
  {
    q: "Ist meine Objekt-Website danach automatisch online?",
    a: "Nein. Der Agent baut die Website. Die Veröffentlichung erfolgt separat und bewusst durch dich.",
  },
];

/**
 * Startseite: komplett auf Bauunternehmer, Bauleiter, Handwerker und
 * Immobilienmakler ausgerichtet, mit der Vor-Ort-Erfassung als
 * Hauptbotschaft — statt der allgemeinen "White-Label für jeden
 * Mittelstandsbetrieb"-Positionierung, die jetzt nur noch auf den
 * Nebenseiten (/angebot, /branchen, ...) steht, weiterhin über die
 * Navigation erreichbar.
 */
export default function Home() {
  return (
    <SmoothScroll>
      <main>
        <HomeHero />
        <ErfassungDemo />
        <ErfassungSteps />
        <ErfassungRealCase />
        <ErfassungBereiche />
        <ErfassungVideoSection />
        <ErfassungSprachen />
        <ErfassungPreise />

        <section className="pt-10 pb-2">
          <div className="mx-auto px-7 text-center" style={{ maxWidth: 700 }}>
            <span
              className="mono inline-flex items-center gap-2 mb-4"
              style={{ fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--amber)" }}
            >
              <span style={{ opacity: 0.7 }}>§</span> Wer wir sind
            </span>
            <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", marginBottom: 14 }}>
              Onyx.AI baut eigene Systeme — kein Baukasten von der Stange.
            </h2>
            <p style={{ color: "var(--warm-grey-dim)", fontSize: "1.02rem", lineHeight: 1.7, marginBottom: 28 }}>
              Die Vor-Ort-Erfassung ist ein eigenes System, das wir für Bau,
              Handwerk und Immobilien gebaut haben — nutzbar, so wie sie ist.
              Brauchst du stattdessen etwas Individuelles, bauen wir dir dein
              eigenes System im White-Label, wie schon für andere Kunden.
              Dazu kommen KI-Telefonagenten und Automatisierungen, die wir
              ebenfalls im Programm haben.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              <Link href="/angebot" className="mono" style={{ fontSize: 13, color: "var(--amber)" }}>
                Individuelles White-Label-System →
              </Link>
              <Link href="/ki-agenten" className="mono" style={{ fontSize: 13, color: "var(--amber)" }}>
                KI-Telefonagenten →
              </Link>
              <Link href="/automatisierungen" className="mono" style={{ fontSize: 13, color: "var(--amber)" }}>
                Automatisierungen →
              </Link>
            </div>
          </div>
        </section>

        <AliveCase
          tag="Kundencase · Hausverwaltung"
          name="HausManager Pro"
          heading="Vom Excel-Chaos zum eigenen System."
          desc="Für eine Hausverwaltung haben wir ein komplettes CRM von Grund auf entwickelt und vollständig übergeben. Kein Produkt zum Kaufen, sondern ein Beispiel dafür, was für dein Unternehmen möglich ist."
          bullets={[
            "Individuelle Prozessanalyse & Konzept",
            "Vollständige Entwicklung im Onyx-Standard",
            "Übergabe von Code, Zugängen & Doku",
          ]}
          image="/generated/chaos-to-portal.webp"
          logo="/logos/hwp.png"
          imageRight
        />

        <AliveFaq eyebrow="Bevor du fragst" heading="Einwände, die uns oft begegnen." faqs={faqs} />

        <CTABanner
          heading="Nimm beim nächsten Objekt nicht noch mehr Arbeit mit zurück ins Büro."
          sub="Teste Onyx.AI mit einem echten Objekt und sieh dir an, was aus einem einzigen Rundgang entsteht."
          buttonText="Erstes Objekt ausprobieren"
          ctaHref="/kontakt"
        />
        <p className="mono text-center" style={{ fontSize: 12, color: "var(--warm-grey-faint)", marginTop: -8, marginBottom: 32 }}>
          Kein Abo, keine monatliche Verpflichtung — Abrechnung pro Objekt.
        </p>

        <Footer />
      </main>
    </SmoothScroll>
  );
}
