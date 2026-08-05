import SmoothScroll from "@/components/SmoothScroll";
import Hero from "@/components/Hero";
import LogoMarquee from "@/components/LogoMarquee";
import WhyNowSection from "@/components/WhyNowSection";
import ProblemSection from "@/components/ProblemSection";
import ExplainerSection from "@/components/ExplainerSection";
import CaseStudySection from "@/components/CaseStudySection";
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
        <CTABanner
          kicker="Blatt 03"
          heading="Erkennst du dein Unternehmen in diesen Problemen wieder?"
          sub="Lass uns in einem kurzen Gespräch klären, was für dich der größte Hebel wäre."
          ctaHref="#kontakt"
        />
        <KiAgentenSection />
        <ProblemSection />
        <DifferentiationSection />
        <WheelTransition edge="enter">
          <ExplainerSection />
        </WheelTransition>
        <WheelTransition edge="exit">
          <CaseStudySection />
        </WheelTransition>
        <WheelTransition edge="enter">
          <RoadmapSection />
        </WheelTransition>
        <MidFormSection />
        <OfferingsList />
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
