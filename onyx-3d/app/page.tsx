import SmoothScroll from "@/components/SmoothScroll";
import Hero from "@/components/Hero";
import ProblemSection from "@/components/ProblemSection";
import BlueprintSection from "@/components/BlueprintSection";
import CaseStudySection from "@/components/CaseStudySection";
import SolutionsSection from "@/components/SolutionsSection";
import IndustriesSection from "@/components/IndustriesSection";
import DifferentiationSection from "@/components/DifferentiationSection";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <SmoothScroll>
      <main>
        <Hero />
        <ProblemSection />
        <BlueprintSection />
        <CaseStudySection />
        <SolutionsSection />
        <IndustriesSection />
        <DifferentiationSection />
        <FAQSection />
        <ContactSection />
      </main>
    </SmoothScroll>
  );
}
