import Link from "next/link";
import SmoothScroll from "@/components/SmoothScroll";
import Hero from "@/components/Hero";
import DemoSignupSection from "@/components/DemoSignupSection";
import OfferingsAccordion from "@/components/OfferingsAccordion";
import ProblemSection from "@/components/ProblemSection";
import BuiltSystems from "@/components/BuiltSystems";
import CaseRow from "@/components/CaseRow";
import ArbeitsweiseSection from "@/components/ArbeitsweiseSection";
import SystemFormSection from "@/components/SystemFormSection";
import ExplainerSection from "@/components/ExplainerSection";
import IndustriesSection from "@/components/IndustriesSection";
import DemoShowcaseSection from "@/components/DemoShowcaseSection";
import FAQSection from "@/components/FAQSection";
import CTABanner from "@/components/CTABanner";
import DemoBookingSection from "@/components/DemoBookingSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import WheelTransition from "@/components/WheelTransition";

/**
 * Leseweg der Startseite: zuerst das Angebot ("Das können wir für dich tun"),
 * jeder Baustein direkt anklickbar zu seiner Detailseite. Danach die
 * Ausgangslage als Begründung und direkt im Anschluss, für wen wir bauen —
 * damit der Leser sich einordnen kann, bevor die Lösung kommt. Dann in einem
 * Block die Arbeitsweise (KI-Agenten, Automatisierungen, Abgrenzung) und der
 * Beweis über die Referenzen. Zum Schluss Ablauf und Kontakt.
 */
export default function Home() {
  return (
    <SmoothScroll>
      <main>
        <Hero />

        {/* Frueh auf der Seite: das Demo-Angebot als erster greifbarer
            Einstieg, direkt nach dem Hero und vor den Leistungen. */}
        <DemoSignupSection />

        <WheelTransition edge="both">
          <OfferingsAccordion blatt="01" />
        </WheelTransition>

        {/* Direkt hinter den Leistungen: erst was wir bauen, dann sofort
            Beispiele, wie das aussieht. Die Ausgangslage folgt danach. */}
        <BuiltSystems blatt="02" />

        <ProblemSection blatt="03" />

        {/* Direkt hinter den gebauten Systemen: erst das Problem, dann der
            Beweis, dann die Einordnung, ob der Leser damit gemeint ist. Erst
            danach die Lösung — vorher weiss er noch nicht, ob sie ihn
            betrifft. */}
        <IndustriesSection blatt="04" />

        <WheelTransition edge="enter">
          <ArbeitsweiseSection blatt="05" />
        </WheelTransition>

        <section className="pt-10 pb-2">
          <div className="mx-auto px-7" style={{ maxWidth: 1180 }}>
            <span
              className="mono inline-flex items-center gap-2 mb-4"
              style={{ fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--amber)" }}
            >
              <span style={{ opacity: 0.7 }}>§</span> Blatt 06 / Referenzen
            </span>
            <h2 style={{ fontSize: "clamp(1.8rem, 3.6vw, 2.6rem)", maxWidth: "22ch", marginBottom: 14 }}>
              Schon gebaut. Und übergeben.
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

        <SystemFormSection />

        <WheelTransition edge="enter">
          <ExplainerSection />
        </WheelTransition>

        <DemoShowcaseSection blatt="07" />

        <WheelTransition edge="exit">
          <FAQSection blatt="08" />
        </WheelTransition>

        <CTABanner
          heading="Dein System, gebaut für genau dein Geschäft."
          sub="Kein Baukasten, kein Abo — ein System, das dir gehört."
          buttonText="Kostenloses Erstgespräch sichern"
          ctaHref="#kontakt"
        />

        <DemoBookingSection />

        <WheelTransition edge="enter">
          <ContactSection blatt="09" />
        </WheelTransition>

        <Footer />
      </main>
    </SmoothScroll>
  );
}
