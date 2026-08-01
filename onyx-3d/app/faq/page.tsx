import type { Metadata } from "next";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "FAQ — Onyx.AI",
  description: "Häufige Fragen zu White-Label-Systemen von Onyx.AI.",
};

export default function FAQPage() {
  return (
    <main>
      <section className="py-16">
        <div className="mx-auto px-7 text-center" style={{ maxWidth: 760 }}>
          <span
            className="mono block mb-4"
            style={{ fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--amber)" }}
          >
            Fragen &amp; Antworten
          </span>
          <h1 style={{ fontSize: "clamp(1.9rem, 4vw, 2.6rem)", marginBottom: 16 }}>
            Häufige Fragen.
          </h1>
          <p style={{ color: "var(--warm-grey-dim)", fontSize: "1.02rem", lineHeight: 1.7 }}>
            Die häufigsten Fragen zu Preis, Ablauf und Datenschutz — kurz und
            ehrlich beantwortet.
          </p>
        </div>
      </section>

      <FAQSection />

      <Footer />
    </main>
  );
}
