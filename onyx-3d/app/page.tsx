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
          <div className="mx-auto px-7 text-center" style={{ maxWidth: 780 }}>
            <span
              className="mono block mb-4"
              style={{ fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--amber)" }}
            >
              Warum Onyx
            </span>
            <h2 style={{ fontSize: "clamp(1.7rem, 3.4vw, 2.4rem)", lineHeight: 1.25 }}>
              Warum du mit uns arbeiten solltest —{" "}
              <span className="accent">und warum du dein eigenes System jetzt brauchst.</span>
            </h2>
            <p style={{ color: "var(--warm-grey-dim)", fontSize: "1.05rem", lineHeight: 1.75, marginTop: 24 }}>
              Ein eigenes System spart von Tag eins an Kosten — keine
              Lizenzgebühren, keine Abo-Falle, kein Funktionsumfang, für den
              du zahlst, aber nie brauchst. Aber ein System ohne KI ist in
              ein paar Jahren nur noch die halbe Miete: Unternehmen, die
              heute automatisieren, ziehen an allen anderen vorbei. Deshalb
              bauen wir dir kein Tool von der Stange, sondern ein System,
              das von Anfang an mitdenkt — mit KI und Automatisierung
              eingebaut, zum Festpreis, komplett dir übergeben. Und du
              sprichst dabei nicht mit einem Support-Ticket, sondern direkt
              mit dem Gründer.
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
