import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import AutomatisierungenDetail from "@/components/AutomatisierungenDetail";
import GlowCard from "@/components/GlowCard";
import CTABanner from "@/components/CTABanner";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Automatisierungen — Onyx.AI",
  description:
    "Software-Automatisierungen für deinen Betrieb: Angebotserstellung, Rechnungen, Dokumentenerkennung und KI-Agenten, die auch in deinem bestehenden ERP oder CRM mitarbeiten.",
};

export default function AutomatisierungenPage() {
  return (
    <main>
      <section className="py-16">
        <div className="mx-auto px-7" style={{ maxWidth: 1180 }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
            <div>
              <span
                className="mono block mb-4"
                style={{ fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--amber)" }}
              >
                Automatisierung &amp; KI
              </span>
              <h1 style={{ fontSize: "clamp(1.9rem, 4vw, 2.6rem)", marginBottom: 18, maxWidth: "18ch" }}>
                Software-Automatisierungen für deinen Betrieb.
              </h1>
              <p style={{ color: "var(--warm-grey-dim)", fontSize: "1.02rem", lineHeight: 1.7, maxWidth: "58ch" }}>
                Teil von Automatisierung &amp; KI-Agenten, einem der Bausteine,
                die wir dir bauen. Wir automatisieren die Arbeit, die in deinem
                Betrieb täglich Zeit frisst — von der Angebotserstellung über
                Rechnungen und Dokumentenerkennung bis zur Kommunikation. Und
                das nicht nur in einem neuen System: Unsere KI-Agenten setzen
                wir genauso gerne in das ein, was du bereits nutzt.
              </p>
            </div>

            <GlowCard>
              <Image
                src="/generated/automatisierung.webp"
                alt="Automatisierung: Aus eingehenden Dokumenten entstehen automatisch Angebote, Bestätigungen und Rechnungen"
                width={1200}
                height={896}
                priority
                className="w-full h-auto block rounded-xl"
                style={{ maxWidth: "88%" }}
              />
            </GlowCard>
          </div>
        </div>
      </section>

      <section className="pb-4">
        <div className="mx-auto px-7" style={{ maxWidth: 1180 }}>
          <div
            className="rounded-2xl px-7 py-7 md:px-10 md:py-8"
            style={{ background: "var(--amber-soft)", border: "1px solid rgba(232,163,61,0.3)" }}
          >
            <h2 style={{ fontSize: "clamp(1.2rem, 2.4vw, 1.55rem)", marginBottom: 10 }}>
              Dein bestehendes System bleibt, wo es ist.
            </h2>
            <p style={{ color: "var(--warm-grey-dim)", fontSize: "1rem", lineHeight: 1.7, maxWidth: "72ch" }}>
              Wenn du bereits ein ERP, ein CRM, eine Warenwirtschaft oder ein
              Branchenprogramm im Einsatz hast, musst du dafür nichts ablösen.
              Wir setzen unsere KI-Agenten und Automatisierungen über die
              vorhandenen Schnittstellen direkt in dieses System hinein — dein
              Team arbeitet weiter in der Oberfläche, die es kennt, und die
              Arbeit dahinter läuft von selbst. Wie jedes andere System bei uns:
              im White-Label gebaut, vollständig an dich übergeben, auf deiner
              Infrastruktur.
            </p>
          </div>
        </div>
      </section>

      <AutomatisierungenDetail />

      <section className="py-6">
        <div className="mx-auto px-7 text-center" style={{ maxWidth: 760 }}>
          <p style={{ color: "var(--warm-grey-dim)", fontSize: "1.02rem", lineHeight: 1.7 }}>
            Und vieles mehr: Das hier sind die Bereiche, nach denen am
            häufigsten gefragt wird — gebaut wird am Ende immer das, was in
            deinem Betrieb tatsächlich Zeit kostet. Sag uns, welcher Ablauf
            bei dir hakt, und wir schauen uns an, ob er sich automatisieren
            lässt.
          </p>
          <div className="mt-6">
            <Link href="/ki-agenten" className="mono" style={{ fontSize: 13, color: "var(--amber)" }}>
              Mehr über unsere KI-Telefonagenten →
            </Link>
          </div>
        </div>
      </section>

      <CTABanner
        heading="Welcher Ablauf kostet dich am meisten Zeit?"
        sub="Sag uns, wo es hakt — wir sagen dir, ob sich das automatisieren lässt."
        buttonText="Kostenloses Erstgespräch sichern"
      />

      <Footer />
    </main>
  );
}
