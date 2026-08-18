import Link from "next/link";
import type { Metadata } from "next";
import AgbContent from "@/components/AgbContent";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "AGB — Onyx.AI",
  description:
    "Allgemeine Geschäftsbedingungen von Onyx.AI, Marvin Weiß-Drumm — für Systeme, Automatisierungen, KI-Agenten, Websites und Online-Marketing, ausschließlich für Geschäftskunden.",
};

export default function AgbPage() {
  return (
    <main>
      <section className="py-16">
        <div className="mx-auto px-7" style={{ maxWidth: 760 }}>
          <Link
            href="/"
            className="mono inline-flex items-center gap-2 mb-6"
            style={{ fontSize: 12.5, color: "var(--amber)" }}
          >
            ← Zur Startseite
          </Link>
          <div className="text-center">
            <span
              className="mono block mb-4"
              style={{ fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--amber)" }}
            >
              Rechtliches
            </span>
            <h1 style={{ fontSize: "clamp(1.9rem, 4vw, 2.6rem)", marginBottom: 14 }}>
              Allgemeine Geschäftsbedingungen
            </h1>
            <p style={{ color: "var(--warm-grey-dim)", fontSize: "1rem", lineHeight: 1.65 }}>
              Onyx.AI arbeitet ausschließlich mit Unternehmen. Verträge mit
              Verbrauchern kommen nicht zustande.
            </p>
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="mx-auto px-7 legal-content" style={{ maxWidth: 760 }}>
          <AgbContent />
        </div>
      </section>

      <Footer />
    </main>
  );
}
