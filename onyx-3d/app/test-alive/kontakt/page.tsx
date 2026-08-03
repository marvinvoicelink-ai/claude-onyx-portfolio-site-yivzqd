import type { Metadata } from "next";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";
import { AliveTimeline } from "@/components/alive/AliveChrome";

export const metadata: Metadata = {
  title: "Test Kontakt — Onyx.AI",
  robots: { index: false, follow: false },
};

const roadmapSteps = [
  { num: "01", title: "Erstgespräch & Analyse", desc: "Wir lernen deinen Prozess kennen — ohne Verkaufsdruck." },
  { num: "02", title: "Konzept & Festpreis", desc: "Klares Konzept, transparenter Festpreis." },
  { num: "03", title: "Entwicklung", desc: "Dein System entsteht — mit regelmäßigen Updates." },
  { num: "04", title: "Testing & Übergabe", desc: "Gemeinsam geprüft, vollständig dokumentiert." },
  { num: "05", title: "Go-Live", desc: "Läuft auf deiner Infrastruktur, unter deiner Marke." },
];

export default function TestAliveKontaktPage() {
  return (
    <main>
      <section className="py-24 pt-40 text-center">
        <div className="mx-auto px-7" style={{ maxWidth: 760 }}>
          <span className="mono block mb-4" style={{ fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--amber)" }}>
            Kontakt
          </span>
          <h1 style={{ fontFamily: "var(--font-archivo), sans-serif", fontWeight: 800, fontSize: "clamp(2.6rem, 6vw, 4.2rem)", lineHeight: 1.05 }}>
            Reden wir über dein System.
          </h1>
        </div>
      </section>

      <AliveTimeline
        eyebrow="Unser Vorgehen"
        heading="Von der Analyse bis zum Go-Live."
        sub="Ein fokussiertes Tool kann in wenigen Wochen stehen, ein komplettes CRM dauert länger — im Erstgespräch bekommst du eine realistische Einschätzung."
        steps={roadmapSteps}
      />

      <ContactSection />

      <Footer />
    </main>
  );
}
