import type { Metadata } from "next";
import Footer from "@/components/Footer";
import { AliveFaq, AliveCtaBand } from "@/components/alive/AliveChrome";

export const metadata: Metadata = {
  title: "Test FAQ — Onyx.AI",
  robots: { index: false, follow: false },
};

const faqs = [
  {
    q: "Was kostet ein System von Onyx?",
    a: "Jedes System ist individuell — deshalb gibt es keinen Katalogpreis. Nach dem ersten Gespräch bekommst du ein klares Konzept mit Festpreis.",
  },
  {
    q: "Wie lange dauert der Bau?",
    a: "Ein fokussiertes Tool kann in wenigen Wochen stehen, ein komplettes CRM dauert länger. Im Erstgespräch bekommst du eine realistische Einschätzung.",
  },
  {
    q: "Muss ich technisch versiert sein?",
    a: "Nein. Du beschreibst deinen Prozess und wir übersetzen ihn in ein System — mit verständlicher Dokumentation zur Übergabe.",
  },
  {
    q: "Ist mein System DSGVO-konform?",
    a: "Ja. Du hostest selbst, in Deutschland bzw. der EU, mit AVV. Keine Daten über fremde Server, die du nicht kontrollierst.",
  },
];

export default function TestAliveFaqPage() {
  return (
    <main>
      <section className="py-24 pt-40 text-center">
        <div className="mx-auto px-7" style={{ maxWidth: 760 }}>
          <span className="mono block mb-4" style={{ fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--amber)" }}>
            Fragen &amp; Antworten
          </span>
          <h1 style={{ fontFamily: "var(--font-archivo), sans-serif", fontWeight: 800, fontSize: "clamp(2.6rem, 6vw, 4.2rem)", lineHeight: 1.05, marginBottom: 16 }}>
            Häufige Fragen.
          </h1>
          <p style={{ color: "var(--warm-grey-dim)", fontSize: "1.05rem", lineHeight: 1.7 }}>
            Die häufigsten Fragen zu Preis, Ablauf und Datenschutz — kurz und ehrlich beantwortet.
          </p>
        </div>
      </section>

      <AliveFaq eyebrow="Rückfragen" heading="Bevor du fragst." faqs={faqs} />

      <AliveCtaBand
        heading="Noch eine Frage offen?"
        sub="Kein Bot, keine Warteschlange — der Gründer antwortet selbst."
      />

      <Footer />
    </main>
  );
}
