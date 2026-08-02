import SmoothScroll from "@/components/SmoothScroll";
import Hero from "@/components/Hero";
import ProblemSection from "@/components/ProblemSection";
import BlueprintSection from "@/components/BlueprintSection";
import ExplainerSection from "@/components/ExplainerSection";
import CaseStudySection from "@/components/CaseStudySection";
import RoadmapSection from "@/components/RoadmapSection";
import MidFormSection from "@/components/MidFormSection";
import SolutionsSection from "@/components/SolutionsSection";
import IndustriesSection from "@/components/IndustriesSection";
import CTABanner from "@/components/CTABanner";
import DifferentiationSection from "@/components/DifferentiationSection";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <SmoothScroll>
      <main>
        <Hero />
        <IndustriesSection />
        <ProblemSection animate />
        <CTABanner
          heading="Erkennst du dein Unternehmen in diesen Problemen wieder?"
          sub="Lass uns in einem kurzen Gespräch klären, was für dich der größte Hebel wäre."
          ctaHref="#kontakt"
        />
        <BlueprintSection />
        <ExplainerSection />
        <CaseStudySection />
        <RoadmapSection />
        <MidFormSection />
        <SolutionsSection animate />
        <CTABanner
          heading="Dein System, gebaut für genau dein Geschäft."
          sub="Kein Baukasten, kein Abo — ein System, das dir gehört."
          buttonText="Kostenloses Erstgespräch sichern"
          ctaHref="#kontakt"
        />
        <DifferentiationSection animate />
        <FAQSection />
        <ContactSection />
        <Footer />
      </main>
    </SmoothScroll>
  );
}
