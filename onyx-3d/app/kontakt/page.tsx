import type { Metadata } from "next";
import RoadmapSection from "@/components/RoadmapSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Kontakt — Onyx.AI",
  description: "Kontakt zu Onyx.AI aufnehmen — Formular, WhatsApp oder Termin buchen.",
};

export default function KontaktPage() {
  return (
    <main>
      <section className="py-16">
        <div className="mx-auto px-7 text-center" style={{ maxWidth: 760 }}>
          <span
            className="mono block mb-4"
            style={{ fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--amber)" }}
          >
            Kontakt
          </span>
          <h1 style={{ fontSize: "clamp(1.9rem, 4vw, 2.6rem)" }}>
            Reden wir über dein System.
          </h1>
        </div>
      </section>

      <RoadmapSection />
      <ContactSection />

      <Footer />
    </main>
  );
}
