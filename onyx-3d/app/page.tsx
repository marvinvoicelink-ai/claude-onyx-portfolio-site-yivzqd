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

        <section className="py-16">
          <div className="mx-auto px-7 text-center" style={{ maxWidth: 720 }}>
            <span
              className="mono block mb-4"
              style={{ fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--amber)" }}
            >
              Warum jetzt
            </span>
            <p style={{ fontSize: "clamp(1.4rem, 2.8vw, 1.9rem)", fontWeight: 700, lineHeight: 1.4 }}>
              Ein eigenes System spart Kosten. Ein eigenes System ohne KI
              spart nur ein paar Jahre lang —{" "}
              <span className="accent">danach zieht der Wettbewerb vorbei, der längst automatisiert hat.</span>
            </p>
            <p style={{ color: "var(--warm-grey-dim)", fontSize: "1.02rem", lineHeight: 1.7, marginTop: 20 }}>
              Wir bauen dir kein Feature von der Stange, sondern ein System
              mit KI und Automatisierung von Anfang an — maßgeschneidert,
              zum Festpreis, komplett dir übergeben.
            </p>
          </div>
        </section>

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
