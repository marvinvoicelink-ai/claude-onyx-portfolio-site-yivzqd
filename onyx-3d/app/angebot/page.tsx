import type { Metadata } from "next";
import OfferingsDetail from "@/components/OfferingsDetail";
import IndustriesSection from "@/components/IndustriesSection";
import CTABanner from "@/components/CTABanner";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Angebot — Onyx.AI",
  description: "Was Onyx.AI anbietet und für wen — White-Label-Systeme, gebaut nach deinem Prozess.",
};

export default function AngebotPage() {
  return (
    <main>
      <section className="py-16">
        <div className="mx-auto px-7 text-center" style={{ maxWidth: 760 }}>
          <span
            className="mono block mb-4"
            style={{ fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--amber)" }}
          >
            Angebot
          </span>
          <h1 style={{ fontSize: "clamp(1.9rem, 4vw, 2.6rem)", marginBottom: 16 }}>
            Was wir bauen. Und für wen.
          </h1>
          <p style={{ color: "var(--warm-grey-dim)", fontSize: "1.02rem", lineHeight: 1.7 }}>
            Kein Baukasten mit festen Modulen — was dein System am Ende
            abdeckt, richtet sich nach deinem Prozess. Kein Branchen-Fokus:
            passt dein Prozess, passt Onyx.
          </p>
        </div>
      </section>

      <OfferingsDetail />
      <IndustriesSection />

      <CTABanner
        heading="Dein System, gebaut für genau dein Geschäft."
        sub="Kein Baukasten, kein Abo — ein System, das dir gehört."
        buttonText="Kostenloses Erstgespräch sichern"
      />

      <Footer />
    </main>
  );
}
