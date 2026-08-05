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
import OfferingsList from "@/components/OfferingsList";
import KiAgentenSection from "@/components/KiAgentenSection";
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
        <OfferingsList />
        <KiAgentenSection />
        <ProblemSection />
        <WheelTransition edge="enter">
          <ExplainerSection />
        </WheelTransition>
        <WheelTransition edge="exit">
          <CaseStudySection />
        </WheelTransition>
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
        <DifferentiationSection />
        <WheelTransition edge="enter">
          <RoadmapSection />
        </WheelTransition>
        <MidFormSection />
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
