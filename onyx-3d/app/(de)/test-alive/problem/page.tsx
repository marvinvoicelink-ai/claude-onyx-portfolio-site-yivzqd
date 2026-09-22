import type { Metadata } from "next";
import Footer from "@/components/Footer";
import { AliveHairlineGrid, AliveInvertedStatement, AliveCtaBand } from "@/components/alive/AliveChrome";

export const metadata: Metadata = {
  title: "Test Problem — Onyx.AI",
  robots: { index: false, follow: false },
};

const problems = [
  { num: "01", title: "Mehrere Tools,", highlight: "die nicht zusammenpassen", desc: "Excel-Listen, SaaS-Tools, die nie ganz zu deinem Prozess passen.", image: "/generated/problem-tools.webp" },
  { num: "02", title: "Funktionen fehlen", highlight: "trotzdem", desc: "Das nächste Preispaket kostet doppelt, bringt aber nur einen Bruchteil mehr.", image: "/generated/problem-pricing.webp" },
  { num: "03", title: "Daten liegen", highlight: "nicht bei dir", desc: "Kundendaten liegen auf fremden Servern, oft außerhalb der EU.", image: "/generated/problem-servers.webp" },
  { num: "04", title: "Abhängig", highlight: "vom Anbieter", desc: "Kündigt er den Vertrag oder erhöht die Preise, stehst du ohne Alternative da.", image: "/generated/problem-lock.webp" },
];

export default function TestAliveProblemPage() {
  return (
    <main>
      <section className="py-24 pt-40 text-center">
        <div className="mx-auto px-7" style={{ maxWidth: 760 }}>
          <span className="mono block mb-4" style={{ fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--amber)" }}>
            Problem
          </span>
          <h1 style={{ fontFamily: "var(--font-archivo), sans-serif", fontWeight: 800, fontSize: "clamp(2.6rem, 6vw, 4.2rem)", lineHeight: 1.05, marginBottom: 16 }}>
            Kommt dir das bekannt vor?
          </h1>
          <p style={{ color: "var(--warm-grey-dim)", fontSize: "1.05rem", lineHeight: 1.7 }}>
            Die typische Ausgangslage, bevor Unternehmen sich für ein eigenes, maßgeschneidertes System entscheiden.
          </p>
        </div>
      </section>

      <AliveHairlineGrid eyebrow="Ausgangslage" heading="Vier Muster, die sich wiederholen." items={problems} background="light" />

      <AliveInvertedStatement
        eyebrow="Unsere Haltung"
        statement="Ein System sollte dich nicht ausbremsen, sondern dich voranbringen —"
        highlight="genau solche Systeme bauen wir."
      />

      <AliveCtaBand
        heading="Erkennst du dein Unternehmen in diesen Problemen wieder?"
        sub="Lass uns in einem kurzen Gespräch klären, was für dich der größte Hebel wäre."
      />

      <Footer />
    </main>
  );
}
