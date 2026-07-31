import SmoothScroll from "@/components/SmoothScroll";
import Hero from "@/components/Hero";
import ProblemSection from "@/components/ProblemSection";
import BlueprintSection from "@/components/BlueprintSection";
import CaseStudySection from "@/components/CaseStudySection";
import MidFormSection from "@/components/MidFormSection";
import SolutionsSection from "@/components/SolutionsSection";
import IndustriesSection from "@/components/IndustriesSection";
import CTABanner from "@/components/CTABanner";
import DifferentiationSection from "@/components/DifferentiationSection";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <SmoothScroll>
      <main>
        <Hero />
        <IndustriesSection />
        <ProblemSection />
        <CTABanner
          heading="Erkennst du dein Unternehmen in diesen Problemen wieder?"
          sub="Lass uns in einem kurzen Gespräch klären, was für dich der größte Hebel wäre."
        />
        <BlueprintSection />
        <CaseStudySection />
        <MidFormSection />
        <SolutionsSection />
        <IndustriesSection />
        <CTABanner
          heading="Dein System, gebaut für genau dein Geschäft."
          sub="Kein Baukasten, kein Abo — ein System, das dir gehört."
          buttonText="Kostenloses Erstgespräch sichern"
        />
        <DifferentiationSection />
        <FAQSection />
        <ContactSection />
      </main>
    </SmoothScroll>
  );
}
