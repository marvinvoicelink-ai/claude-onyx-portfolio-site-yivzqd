import type { Metadata } from "next";
import ProblemsDetail from "@/components/ProblemsDetail";
import CTABanner from "@/components/CTABanner";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Problem — Onyx.AI",
  description: "Mehrere Tools, fehlende Funktionen, fremde Server, Abhängigkeit vom Anbieter — kommt dir das bekannt vor?",
};

export default function ProblemPage() {
  return (
    <main>
      <section className="py-16">
        <div className="mx-auto px-7 text-center" style={{ maxWidth: 760 }}>
          <span
            className="mono block mb-4"
            style={{ fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--amber)" }}
          >
            Problem
          </span>
          <h1 style={{ fontSize: "clamp(1.9rem, 4vw, 2.6rem)", marginBottom: 16 }}>
            Kommt dir das bekannt vor?
          </h1>
          <p style={{ color: "var(--warm-grey-dim)", fontSize: "1.02rem", lineHeight: 1.7 }}>
            Die typische Ausgangslage, bevor Unternehmen sich für ein eigenes,
            maßgeschneidertes System entscheiden.
          </p>
        </div>
      </section>

      <ProblemsDetail />

      <section className="py-14">
        <div className="mx-auto px-7 text-center" style={{ maxWidth: 700 }}>
          <p style={{ fontSize: "clamp(1.3rem, 2.6vw, 1.7rem)", fontWeight: 700, lineHeight: 1.4 }}>
            Ein System sollte dich nicht ausbremsen, sondern dich
            voranbringen — <span className="accent">genau solche Systeme bauen wir.</span>
          </p>
        </div>
      </section>

      <CTABanner
        heading="Erkennst du dein Unternehmen in diesen Problemen wieder?"
        sub="Lass uns in einem kurzen Gespräch klären, was für dich der größte Hebel wäre."
      />

      <Footer />
    </main>
  );
}
