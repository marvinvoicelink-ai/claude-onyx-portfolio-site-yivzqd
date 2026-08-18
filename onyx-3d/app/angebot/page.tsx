import type { Metadata } from "next";
import OfferingsList from "@/components/OfferingsList";
import IndustriesSection from "@/components/IndustriesSection";
import CTABanner from "@/components/CTABanner";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Angebot — Onyx.AI",
  description:
    "Die sechs Bausteine, aus denen wir Systeme bauen: Kundenportale, interne Tools, Dashboards, Automatisierung, Terminplanung und Dokumentenverwaltung.",
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
            Sechs Bausteine, aus denen wir Systeme zusammensetzen. Kein
            Betrieb braucht alle. Welche es bei dir werden, entscheidet dein
            Prozess. Klick auf einen Baustein, dann siehst du im Detail, was
            dahintersteckt.
          </p>
        </div>
      </section>

      <OfferingsList />
      <IndustriesSection />

      <CTABanner
        heading="Welcher Baustein passt zu deinem Betrieb?"
        sub="Im Erstgespräch sortieren wir das gemeinsam, kostenlos und unverbindlich."
        buttonText="Kostenloses Erstgespräch sichern"
      />

      <Footer />
    </main>
  );
}
