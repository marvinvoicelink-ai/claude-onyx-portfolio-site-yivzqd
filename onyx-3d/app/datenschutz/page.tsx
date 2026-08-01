import Link from "next/link";
import type { Metadata } from "next";
import DatenschutzContent from "@/components/DatenschutzContent";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Datenschutzerklärung — Onyx.AI",
  description: "Datenschutzerklärung von Onyx.AI, Marvin Weiß-Drumm.",
};

export default function DatenschutzPage() {
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
          <span
            className="mono block mb-4"
            style={{ fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--amber)" }}
          >
            Rechtliches
          </span>
          <h1 style={{ fontSize: "clamp(1.9rem, 4vw, 2.6rem)" }}>Datenschutzerklärung</h1>
        </div>
      </section>

      <section className="py-14">
        <div className="mx-auto px-7 legal-content" style={{ maxWidth: 760 }}>
          <DatenschutzContent />
        </div>
      </section>

      <Footer />
    </main>
  );
}
