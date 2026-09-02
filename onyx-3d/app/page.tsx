import Link from "next/link";
import SmoothScroll from "@/components/SmoothScroll";
import Hero from "@/components/Hero";
import DemoSignupSection from "@/components/DemoSignupSection";
import StatsBar from "@/components/StatsBar";
import CapabilitiesSection from "@/components/CapabilitiesSection";
import ProcessSteps from "@/components/ProcessSteps";
import InlineCta from "@/components/InlineCta";
import ProblemSection from "@/components/ProblemSection";
import BuiltSystems from "@/components/BuiltSystems";
import CaseRow from "@/components/CaseRow";
import ExplainerSection from "@/components/ExplainerSection";
import IndustriesSection from "@/components/IndustriesSection";
import Differentiators from "@/components/Differentiators";
import FAQSection from "@/components/FAQSection";
import CTABanner from "@/components/CTABanner";
import ContactSection from "@/components/ContactSection";
import Testimonials from "@/components/Testimonials";
import FounderBlock from "@/components/FounderBlock";
import StickyCta from "@/components/StickyCta";
import Footer from "@/components/Footer";
import WheelTransition from "@/components/WheelTransition";

/**
 * Startseite als Lead-Funnel. Ein Angebot (kostenlose Demo), ein Weg dorthin,
 * und jede Section hat genau eine Aufgabe auf dem Weg zur Anfrage:
 *
 *   1. Hero + Zahlen      — was, fuer wen, Beweis, CTA (alles ueber dem Falz)
 *   2. Problem            — "kenn ich" (Ausgangslage)
 *   3. Loesung            — was ein eigenes System uebernimmt (drei Saeulen)
 *   4. Beweis             — gebaute Systeme, Cases mit Zahlen, Kundenstimmen
 *   5. Demo-Formular      — der Koeder, erst NACH dem Vertrauensaufbau
 *   6. Ablauf + Video     — nimmt die Angst vor dem ersten Schritt
 *   7. Einwaende          — kein Lock-in, FAQ
 *   8. Schluss-CTA + Kontakt
 *
 * Bewusst weggelassen (Doppelungen, verwaesserten die Conversion):
 * Leistungs-Akkordeon, lange Arbeitsweise, zweites/drittes/viertes Formular,
 * Demo-Showcase, Autopilot. Detailseiten (/angebot, /ki-agenten, ...) bleiben.
 */
export default function Home() {
  return (
    <SmoothScroll>
      <main>
        <Hero />

        {/* Zahlen direkt nach dem Hero: schneller Vertrauensbeweis. */}
        <StatsBar />

        {/* Ausgangslage: der Leser soll sich wiedererkennen. */}
        <ProblemSection />

        {/* Loesung: was ein eigenes System, Automationen und KI-Agenten
            konkret uebernehmen, beschleunigen und ermoeglichen. */}
        <CapabilitiesSection />

        {/* Beweis, Teil 1: echte gebaute Systeme mit Screens. */}
        <BuiltSystems />

        {/* Fuer wen: kurze Selbst-Einordnung ueber die Branchen. */}
        <IndustriesSection />

        <InlineCta source="Gebaute-Systeme-CTA" sub="Kostenlos & unverbindlich · Der Gründer meldet sich persönlich" />

        <section className="pt-10 pb-2">
          <div className="mx-auto px-7" style={{ maxWidth: 1180 }}>
            <span
              className="mono inline-flex items-center gap-2 mb-4"
              style={{ fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--amber)" }}
            >
              <span style={{ opacity: 0.7 }}>§</span> Referenzen
            </span>
            <h2 style={{ fontSize: "clamp(1.8rem, 3.6vw, 2.6rem)", maxWidth: "22ch", marginBottom: 14 }}>
              Schon gebaut, <span className="accent">und übergeben</span>
            </h2>
            <p style={{ color: "var(--warm-grey-dim)", maxWidth: "58ch", fontSize: "1.02rem", lineHeight: 1.7 }}>
              Vier Projekte im Überblick, der Rest auf der Referenzseite.
              Alles echte Kunden, alles vollständig übergeben.
            </p>
          </div>
        </section>

        <CaseRow
          logo="/logos/flat/hwp.png"
          name="HausManager Pro"
          tag="Kundencase · Gebaut &amp; übergeben"
          heading="Vom Excel-Chaos zum eigenen System."
          text="Für eine Hausverwaltung haben wir ein komplettes CRM von Grund auf entwickelt und vollständig übergeben. Gehostet in Deutschland, DSGVO-konform, 100 % Eigentum beim Kunden."
          facts={[
            { value: "20+", label: "Std./Monat gespart" },
            { value: "1 statt 5–6", label: "Tools im Einsatz" },
            { value: "mehrere 100 €", label: "Ersparnis/Monat" },
          ]}
          image="/generated/hausmanager-case.jpg"
          imageAlt="HausManager Pro: Objektübersicht im fertigen System"
          imageRight
        />

        <CaseRow
          logo="/logos/flat/speedfire.png"
          name="Speedfire"
          tag="Kundencase · Markenaufbau &amp; Vermarktung"
          heading="Von der Sattlerei zur eigenen Marke."
          text="Speedfire war vorher eine Sattlerei. Wir haben ein komplett neues Produkt auf den Markt gebracht, die Marke aufgebaut und online vermarktet."
          facts={[
            { value: "0 → 333+", label: "Follower in 4 Wochen" },
            { value: "1.000+", label: "erreichte Konten/Woche" },
            { value: "10.000 €+", label: "Umsatz/Monat" },
          ]}
          image="/generated/speedfire-case.png"
          imageAlt="Speedfire: Instagram-Aufbau und Produktvermarktung mit 333+ Followern in 4 Wochen, über 1.000 erreichten Konten pro Woche und über 10.000 € Umsatz pro Monat"
          imageRight={false}
          /* Die Zahlen stehen schon in der Grafik selbst — ein zweites Mal
             daruebergelegt waeren sie doppelt. */
          factsOverlay={false}
        />

        <CaseRow
          logo="/logos/flat/haas-wasserkraft.png"
          name="Haas Wasserkraft"
          tag="Kundencase · Herstellung"
          heading="Bestand und Umsatz in einem System."
          text="Haas Wasserkraft stellt Filter für sauberes Wasser her. Das Tool zeigt, welche Metalle und Produkte fehlen und nachbestellt werden müssen — mit CRM für Umsätze und Kunden dahinter."
          points={[
            "Warnung bei niedrigem Bestand",
            "Nachbestellen direkt aus dem Tool",
            "CRM im selben System",
          ]}
          image="/generated/haas-wasserkraft-case.png"
          imageAlt="Haas Wasserkraft: Bestandsübersicht mit Nachbestellung und CRM"
          imageRight
        />

        <CaseRow
          logo="/logos/flat/pawplace.png"
          name="PawPlace"
          tag="Kundencase · Online-Shop"
          heading="Support-Anfragen zentral statt in drei Postfächern."
          text="Für den Online-Shop PawPlace der HWD Handelsagentur haben wir ein Dashboard gebaut, das Kunden, Bestellstatus und offene Support-Tickets an einem Ort zeigt."
          points={[
            "Bestellstatus auf einen Blick",
            "Offene Tickets sofort markiert",
            "Kein Suchen in Postfächern",
          ]}
          image="/generated/pawplace-case.png"
          imageAlt="PawPlace: Dashboard mit Kunden, Bestellstatus und offenen Support-Tickets"
          imageRight={false}
        />

        <div className="text-center pb-4">
          <Link
            href="/referenzen"
            className="inline-flex items-center gap-2.5 rounded-full px-6 py-3 font-semibold btn-ghost"
            style={{ border: "1px solid var(--hairline)", color: "var(--warm-grey)", fontSize: 14.5 }}
          >
            Alle Referenzen ansehen
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width={14} height={14}>
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>

        {/* Beweis, Teil 3: Kundenstimmen. */}
        <Testimonials />

        {/* Wer dahinter steckt: Gesicht und Name direkt vor der Bitte. */}
        <FounderBlock />

        {/* Der Koeder: das Demo-Formular — erst jetzt, nachdem Beweis und
            Stimmen Vertrauen aufgebaut haben. Einziges Formular mitten auf
            der Seite. */}
        <DemoSignupSection />

        {/* Nimmt die Angst vor dem ersten Schritt: Ablauf + Erklaervideo. */}
        <ProcessSteps />

        <WheelTransition edge="enter">
          <ExplainerSection />
        </WheelTransition>

        {/* Einwaende kurz vor dem Abschluss: kein Lock-in, dann FAQ. */}
        <Differentiators />

        <WheelTransition edge="exit">
          <FAQSection />
        </WheelTransition>

        <CTABanner
          heading="Dein System, gebaut für genau dein Geschäft."
          sub="Kein Baukasten, kein Abo — ein System, das dir gehört."
          buttonText="Kostenlose Demo sichern"
          ctaHref="#kontakt"
        />

        <WheelTransition edge="enter">
          <ContactSection />
        </WheelTransition>

        <Footer />

        {/* Handy: Demo + WhatsApp jederzeit einen Daumen entfernt. */}
        <StickyCta />
      </main>
    </SmoothScroll>
  );
}
