import Link from "next/link";
import SmoothScroll from "@/components/SmoothScroll";
import Hero from "@/components/Hero";
import LogoMarquee from "@/components/LogoMarquee";
import OfferingsList from "@/components/OfferingsList";
import ProblemSection from "@/components/ProblemSection";
import ArbeitsweiseSection from "@/components/ArbeitsweiseSection";
import CaseStudySection from "@/components/CaseStudySection";
import { AliveCase } from "@/components/alive/AliveChrome";
import SystemFormSection from "@/components/SystemFormSection";
import ExplainerSection from "@/components/ExplainerSection";
import IndustriesSection from "@/components/IndustriesSection";
import DemoShowcaseSection from "@/components/DemoShowcaseSection";
import RoadmapSection from "@/components/RoadmapSection";
import WhatsAppBanner from "@/components/WhatsAppBanner";
import WhyNowSection from "@/components/WhyNowSection";
import CTABanner from "@/components/CTABanner";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import WheelTransition from "@/components/WheelTransition";

/**
 * Leseweg der Startseite: zuerst das Angebot ("Das können wir für dich tun"),
 * jeder Baustein direkt anklickbar zu seiner Detailseite. Danach die
 * Ausgangslage als Begründung, dann in einem Block die Arbeitsweise
 * (KI-Agenten, Automatisierungen, Abgrenzung) und im Anschluss der Beweis
 * über die Referenzen. Zum Schluss Einordnung, Ablauf und Kontakt.
 */
export default function Home() {
  return (
    <SmoothScroll>
      <main>
        <Hero />
        <LogoMarquee />

        <WheelTransition edge="both">
          <OfferingsList blatt="01" />
        </WheelTransition>

        <ProblemSection blatt="02" />

        <WheelTransition edge="enter">
          <ArbeitsweiseSection blatt="03" />
        </WheelTransition>

        <div className="mx-auto px-7" style={{ maxWidth: 1220 }}>
          <div className="rounded-[28px]" style={{ border: "1px solid var(--hairline)", paddingBottom: 12 }}>
            <WheelTransition edge="exit">
              <CaseStudySection />
            </WheelTransition>
            <div className="mx-auto px-7" style={{ maxWidth: 1180, borderTop: "1px solid var(--hairline)" }} />
            <AliveCase
              tag="Kundencase · Markenaufbau &amp; Vermarktung"
              name="Speedfire"
              heading="Von der Sattlerei zur eigenen Marke mit planbarem Umsatz."
              desc="Speedfire war vorher eine Sattlerei. Wir haben Speedfire dabei geholfen, ein komplett neues Produkt auf den Markt zu bringen, eine eigene Marke aufzubauen und dieses Produkt online zu vermarkten — mit nachweislich über 10.000 € Umsatz pro Monat."
              image="/generated/speedfire-case.png"
              imageRight
              bullets={[
                "Instagram-Account von 0 auf 333+ Follower in 4 Wochen aufgebaut",
                "Über 1.000 erreichte Konten pro Woche durch strategischen Content",
                "Nachweislich über 10.000 € Umsatz pro Monat mit dem neuen Produkt",
              ]}
            />
            <div className="text-center">
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
          </div>
        </div>

        <SystemFormSection />

        <WheelTransition edge="enter">
          <ExplainerSection />
        </WheelTransition>

        <IndustriesSection blatt="04" />

        <DemoShowcaseSection blatt="05" />

        <WheelTransition edge="enter">
          <RoadmapSection blatt="06" />
        </WheelTransition>

        <WhatsAppBanner />

        <WheelTransition edge="enter">
          <WhyNowSection blatt="07" />
        </WheelTransition>

        <CTABanner
          heading="Dein System, gebaut für genau dein Geschäft."
          sub="Kein Baukasten, kein Abo — ein System, das dir gehört."
          buttonText="Kostenloses Erstgespräch sichern"
          ctaHref="#kontakt"
        />

        <WheelTransition edge="exit">
          <FAQSection blatt="08" />
        </WheelTransition>

        <WheelTransition edge="enter">
          <ContactSection blatt="09" />
        </WheelTransition>

        <Footer />
      </main>
    </SmoothScroll>
  );
}
