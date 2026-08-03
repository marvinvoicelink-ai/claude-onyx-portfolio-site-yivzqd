import type { Metadata } from "next";
import Footer from "@/components/Footer";
import { AliveCase, AliveCtaBand } from "@/components/alive/AliveChrome";

export const metadata: Metadata = {
  title: "Test Referenzen — Onyx.AI",
  robots: { index: false, follow: false },
};

export default function TestAliveReferenzenPage() {
  return (
    <main>
      <section className="py-24 pt-40 text-center">
        <div className="mx-auto px-7" style={{ maxWidth: 760 }}>
          <span className="mono block mb-4" style={{ fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--amber)" }}>
            Referenzen
          </span>
          <h1 style={{ fontFamily: "var(--font-archivo), sans-serif", fontWeight: 800, fontSize: "clamp(2.6rem, 6vw, 4.2rem)", lineHeight: 1.05, marginBottom: 16 }}>
            Projekte, die wir gebaut haben.
          </h1>
          <p style={{ color: "var(--warm-grey-dim)", fontSize: "1.05rem", lineHeight: 1.7 }}>
            Kein Produkt zum Kaufen — Beispiele dafür, was für dein Unternehmen möglich ist.
          </p>
        </div>
      </section>

      <AliveCase
        tag="Kundencase · gebaut & übergeben"
        name="HausManager Pro"
        heading="Vom Excel-Chaos zum eigenen System."
        desc="Für eine Hausverwaltung haben wir ein komplettes CRM von Grund auf entwickelt und vollständig übergeben. Kein Produkt zum Kaufen, sondern ein Beispiel dafür, was für dein Unternehmen möglich ist."
        image="/generated/chaos-to-portal.webp"
      />
      <AliveCase
        tag="Kundencase · Automatisierung"
        name="WETBlock"
        heading="Vom manuellen Versand zur automatisierten Kundenansprache."
        desc="Für WETBlock haben wir den E-Mail-Outreach an ihre Geschäftskunden automatisiert. Vorher musste das Team jede Ansprache von Hand schreiben — heute läuft das automatisch."
        image="/generated/wetblock-case.webp"
        imageRight
      />

      <AliveCtaBand
        heading="Dein Prozess könnte das nächste Projekt sein."
        sub="Lass uns in einem kurzen Gespräch klären, was sich bei dir automatisieren oder als eigenes System bauen lässt."
      />

      <Footer />
    </main>
  );
}
