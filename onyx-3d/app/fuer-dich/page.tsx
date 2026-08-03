import type { Metadata } from "next";
import DifferentiatorsDetail from "@/components/DifferentiatorsDetail";
import CTABanner from "@/components/CTABanner";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Was wir für dich tun können — Onyx.AI",
  description: "Kein CRM von der Stange, kein Lock-in — was du bekommst, wenn Onyx.AI dein System baut.",
};

export default function FuerDichPage() {
  return (
    <main>
      <section className="py-16">
        <div className="mx-auto px-7 text-center" style={{ maxWidth: 760 }}>
          <span
            className="mono block mb-4"
            style={{ fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--amber)" }}
          >
            Für dich
          </span>
          <h1 style={{ fontSize: "clamp(1.9rem, 4vw, 2.6rem)", marginBottom: 16 }}>
            Was wir für dich tun können.
          </h1>
          <p style={{ color: "var(--warm-grey-dim)", fontSize: "1.02rem", lineHeight: 1.7 }}>
            Kein Baukasten, keine Abhängigkeit — so unterscheidet sich ein
            System von Onyx von dem, was du sonst bekommst.
          </p>
        </div>
      </section>

      <DifferentiatorsDetail />

      <CTABanner
        heading="Dein System, gebaut für genau dein Geschäft."
        sub="Kein Baukasten, kein Abo — ein System, das dir gehört."
        buttonText="Kostenloses Erstgespräch sichern"
      />

      <Footer />
    </main>
  );
}
