import type { Metadata } from "next";
import Link from "next/link";
import KiAgentenDetail from "@/components/KiAgentenDetail";
import CTABanner from "@/components/CTABanner";
import Footer from "@/components/Footer";
import { AliveCase } from "@/components/alive/AliveChrome";

export const metadata: Metadata = {
  title: "KI-Agenten — Onyx.AI",
  description: "Drei KI-Agenten, die für dich telefonieren: Anrufe entgegennehmen, Termine buchen, aktiv nachfragen.",
};

export default function KiAgentenPage() {
  return (
    <main>
      <section className="py-16">
        <div className="mx-auto px-7 text-center" style={{ maxWidth: 760 }}>
          <span
            className="mono block mb-4"
            style={{ fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--amber)" }}
          >
            KI-Agenten
          </span>
          <h1 style={{ fontSize: "clamp(1.9rem, 4vw, 2.6rem)", marginBottom: 16 }}>
            Drei Agenten, die für dich telefonieren.
          </h1>
          <p style={{ color: "var(--warm-grey-dim)", fontSize: "1.02rem", lineHeight: 1.7 }}>
            Teil von Automatisierung &amp; KI-Agenten, einem der Bausteine, die
            wir dir bauen — genauso im White-Label, genauso vollständig
            übergeben wie jedes andere System. Jeder Agent übernimmt
            Telefonarbeit, die bisher bei dir oder deinem Team hängen
            geblieben ist, sobald niemand abnehmen konnte.
          </p>
        </div>
      </section>

      <KiAgentenDetail />

      <section className="py-6">
        <div className="mx-auto px-7 text-center" style={{ maxWidth: 760 }}>
          <span
            className="mono block mb-4"
            style={{ fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--amber)" }}
          >
            Referenz
          </span>
          <h2 style={{ fontSize: "clamp(1.4rem, 2.6vw, 1.8rem)" }}>
            Kein Konzept — bereits gebaut und im Einsatz.
          </h2>
        </div>
      </section>

      <AliveCase
        tag="Kundencase · KI-Agentur"
        name="VoiceLink AI"
        heading="KI-Telefonagenten aufgebaut statt nur beraten."
        desc="VoiceLink AI ist selbst eine KI-Agentur — für Solarunternehmen. Wir haben für sie die KI-Agenten komplett aufgebaut und bei der Einführung bei ihren Unternehmen unterstützt."
        bullets={[
          "KI-Voice-Agenten für Solarunternehmen komplett aufgebaut",
          "Unterstützung bei Einrichtung & Einführung beim Endkunden",
          "Skalierbare Basis statt Einzellösung pro Kunde",
        ]}
        image="/generated/voicelink-case.png"
        logo="/logos/voicelink.png"
        logoBg="dark"
      />

      <div className="text-center" style={{ marginTop: -24, marginBottom: 24 }}>
        <Link href="/referenzen" className="mono" style={{ fontSize: 13, color: "var(--amber)" }}>
          Alle Referenzen ansehen →
        </Link>
      </div>

      <CTABanner
        heading="Dein System, gebaut für genau dein Geschäft."
        sub="Kein Baukasten, kein Abo — ein System, das dir gehört."
        buttonText="Kostenloses Erstgespräch sichern"
      />

      <Footer />
    </main>
  );
}
