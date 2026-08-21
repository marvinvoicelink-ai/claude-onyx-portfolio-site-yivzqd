import Link from "next/link";
import SmoothScroll from "@/components/SmoothScroll";
import Hero from "@/components/Hero";
import LogoMarquee from "@/components/LogoMarquee";
import OfferingsAccordion from "@/components/OfferingsAccordion";
import ProblemSection from "@/components/ProblemSection";
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
        <LogoMarquee />

        <WheelTransition edge="both">
          <OfferingsAccordion blatt="01" />
        </WheelTransition>

        <ProblemSection blatt="02" />

        {/* Direkt hinter der Ausgangslage: erst das Problem, dann die
            Einordnung, ob der Leser damit gemeint ist. Erst danach die
            Lösung — vorher weiss er noch nicht, ob sie ihn betrifft. */}
        <IndustriesSection blatt="03" />

        <WheelTransition edge="enter">
          <ArbeitsweiseSection blatt="04" />
        </WheelTransition>

        <section className="pt-10 pb-2">
          <div className="mx-auto px-7" style={{ maxWidth: 1180 }}>
            <span
              className="mono inline-flex items-center gap-2 mb-4"
              style={{ fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--amber)" }}
            >
              <span style={{ opacity: 0.7 }}>§</span> Blatt 05 / Referenzen
            </span>
            <h2 style={{ fontSize: "clamp(1.8rem, 3.6vw, 2.6rem)", maxWidth: "22ch", marginBottom: 14 }}>
              Schon gebaut. Und übergeben.
            </h2>
            <p style={{ color: "var(--warm-grey-dim)", maxWidth: "58ch", fontSize: "1.02rem", lineHeight: 1.7 }}>
              Zwei Projekte im Detail, der Rest auf der Referenzseite. Alles
              echte Kunden, alles vollständig übergeben.
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
          image="/assets/hausmanager-poster.jpg"
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
          imageAlt="Speedfire: Instagram-Aufbau und Produktvermarktung"
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

        <DemoShowcaseSection blatt="06" />

        <WheelTransition edge="exit">
          <FAQSection blatt="07" />
        </WheelTransition>

        <CTABanner
          heading="Dein System, gebaut für genau dein Geschäft."
          sub="Kein Baukasten, kein Abo — ein System, das dir gehört."
          buttonText="Kostenloses Erstgespräch sichern"
          ctaHref="#kontakt"
        />

        <DemoBookingSection />

        <WheelTransition edge="enter">
          <ContactSection blatt="08" />
        </WheelTransition>

        <Footer />
      </main>
    </SmoothScroll>
  );
}
