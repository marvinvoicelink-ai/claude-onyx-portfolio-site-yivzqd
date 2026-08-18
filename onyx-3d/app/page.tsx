import Link from "next/link";
import SmoothScroll from "@/components/SmoothScroll";
import Hero from "@/components/Hero";
import LogoMarquee from "@/components/LogoMarquee";
import WhyNowSection from "@/components/WhyNowSection";
import ProblemSection from "@/components/ProblemSection";
import ExplainerSection from "@/components/ExplainerSection";
import CaseStudySection from "@/components/CaseStudySection";
import { AliveCase } from "@/components/alive/AliveChrome";
import RoadmapSection from "@/components/RoadmapSection";
import MidFormSection from "@/components/MidFormSection";
import SystemFormSection from "@/components/SystemFormSection";
import WhatsAppBanner from "@/components/WhatsAppBanner";
import DemoShowcaseSection from "@/components/DemoShowcaseSection";
import OfferingsList from "@/components/OfferingsList";
import KiAgentenSection from "@/components/KiAgentenSection";
import AutomatisierungenSection from "@/components/AutomatisierungenSection";
import IndustriesSection from "@/components/IndustriesSection";
import CTABanner from "@/components/CTABanner";
import DifferentiationSection from "@/components/DifferentiationSection";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import WheelTransition from "@/components/WheelTransition";

export default function Home() {
  return (
    <SmoothScroll>
      <main>
        <Hero />
        <LogoMarquee />

        <WheelTransition edge="both">
          <WhyNowSection />
        </WheelTransition>

        <WheelTransition edge="enter">
          <IndustriesSection />
        </WheelTransition>
        <DemoShowcaseSection />
        <OfferingsList />
        <SystemFormSection />

        <ProblemSection />
        <MidFormSection heading="Trage dich jetzt hier ein." />
        <WheelTransition edge="enter">
          <ExplainerSection />
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
              bullets={[
                "Instagram-Account von 0 auf 333+ Follower in 4 Wochen aufgebaut",
                "Über 1.000 erreichte Konten pro Woche durch strategischen Content",
                "Nachweislich über 10.000 € Umsatz pro Monat mit dem neuen Produkt",
              ]}
            />
            <div className="mx-auto px-7" style={{ maxWidth: 1180, borderTop: "1px solid var(--hairline)" }} />
            <AliveCase
              tag="Kundencase · Online-Shop"
              name="PawPlace (HWD Handelsagentur)"
              heading="Support-Anfragen zentral im Blick statt verstreut in Postfächern."
              desc="Für den Online-Shop PawPlace der HWD Handelsagentur haben wir ein Dashboard gebaut, das Kunden, Bestellstatus und offene Support-Tickets an einem Ort zeigt."
              bullets={[
                "Kundenliste mit Bestellstatus auf einen Blick",
                "Offene Support-Tickets sofort sichtbar markiert",
                "Kein Suchen mehr in mehreren Postfächern",
              ]}
              image="/generated/pawplace-case.png"
              imageRight
              logo="/logos/pawplace.png"
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
        <WhatsAppBanner />
        <KiAgentenSection />
        <AutomatisierungenSection />
        <DifferentiationSection />
        <WheelTransition edge="enter">
          <RoadmapSection />
        </WheelTransition>
        <MidFormSection heading="Hier ist die letzte Chance, dich einzutragen." />
        <CTABanner
          heading="Dein System, gebaut für genau dein Geschäft."
          sub="Kein Baukasten, kein Abo — ein System, das dir gehört."
          buttonText="Kostenloses Erstgespräch sichern"
          ctaHref="#kontakt"
        />
        <WheelTransition edge="exit">
          <FAQSection />
        </WheelTransition>
        <WheelTransition edge="enter">
          <ContactSection />
        </WheelTransition>
        <Footer />
      </main>
    </SmoothScroll>
  );
}
