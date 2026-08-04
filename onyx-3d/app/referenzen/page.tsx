import type { Metadata } from "next";
import CTABanner from "@/components/CTABanner";
import Footer from "@/components/Footer";
import { AliveCase } from "@/components/alive/AliveChrome";

export const metadata: Metadata = {
  title: "Referenzen — Onyx.AI",
  description: "Projekte, die Onyx.AI gebaut und übergeben hat.",
};

export default function ReferenzenPage() {
  return (
    <main>
      <section className="py-16">
        <div className="mx-auto px-7 text-center" style={{ maxWidth: 760 }}>
          <span
            className="mono block mb-4"
            style={{ fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--amber)" }}
          >
            Referenzen
          </span>
          <h1 style={{ fontSize: "clamp(1.9rem, 4vw, 2.6rem)", marginBottom: 16 }}>
            Projekte, die wir gebaut haben.
          </h1>
          <p style={{ color: "var(--warm-grey-dim)", fontSize: "1.02rem", lineHeight: 1.7 }}>
            Kein Produkt zum Kaufen — Beispiele dafür, was für dein
            Unternehmen möglich ist.
          </p>
        </div>
      </section>

      <AliveCase
        tag="Kundencase · gebaut & übergeben"
        name="HausManager Pro"
        heading="Vom Excel-Chaos zum eigenen System."
        desc="Für eine Hausverwaltung haben wir ein komplettes CRM von Grund auf entwickelt und vollständig übergeben. Kein Produkt zum Kaufen, sondern ein Beispiel dafür, was für dein Unternehmen möglich ist."
        image="/generated/chaos-to-portal.webp"
        logo="/logos/hwp.png"
      />
      <AliveCase
        tag="Kundencase · Automatisierung"
        name="WETBlock"
        heading="Vom manuellen Versand zur automatisierten Kundenansprache."
        desc="Für WETBlock haben wir den E-Mail-Outreach an ihre Geschäftskunden automatisiert. Vorher musste das Team jede Ansprache an die Unternehmen, an die sie ihre Produkte verkaufen, von Hand schreiben und verschicken — heute läuft das automatisch."
        image="/generated/wetblock-case.webp"
        imageRight
        background="light"
        bullets={[
          "Automatischer Versand · individuelle Ansprache ohne manuelles Schreiben",
          "Automatisches Nachfassen · reagiert auf Antworten oder Funkstille",
          "Zentrale Auswertung · zeigt, welche Ansprache tatsächlich ankommt",
        ]}
      />

      <AliveCase
        tag="Kundencase · Pension &amp; Weinstube"
        name="Rebstöckel"
        heading="Zimmerbelegung auf einen Blick statt Zettelwirtschaft."
        desc="Für die Pension Rebstöckel haben wir ein Dashboard gebaut, das in Echtzeit zeigt, welche Zimmer frei und welche belegt sind — ohne Excel-Liste oder Buch an der Rezeption."
        bullets={[
          "Zimmerübersicht mit Status frei/belegt in Echtzeit",
          "Belegungsquote auf einen Blick",
          "Weniger Doppelbuchungen durch eine zentrale Übersicht",
        ]}
        image="/generated/rebstoeckel-case.png"
        logo="/logos/rebstoeckel.png"
      />
      <AliveCase
        tag="Kundencase · Online-Shop"
        name="PawPlace (HWD Handelsagentur)"
        heading="Support-Anfragen zentral im Blick statt verstreut in Postfächern."
        desc="Für den Online-Shop PawPlace der HWD Handelsagentur haben wir ein Dashboard gebaut, das Kunden, Bestellstatus und offene Support-Tickets an einem Ort zeigt."
        bullets={[
          "Kundenliste mit Bestellstatus auf einen Blick",
          "Offene Support-Tickets sofort sichtbar markiert",
          "Kein Suchen mehr in mehreren Postfächern",
        ]}
        image="/generated/pawplace-case.png"
        imageRight
        logo="/logos/pawplace.png"
      />
      <AliveCase
        tag="Kundencase · Herstellung"
        name="Haas Wasserkraft"
        heading="Materialbestand und Umsatz in einem System statt zwei Baustellen."
        desc="Haas Wasserkraft stellt Filter für sauberes Wasser her. Wir haben ein Tool gebaut, das zeigt, welche Metalle und Produkte gerade fehlen und nachbestellt werden müssen — mit einem kompletten CRM für Umsätze und Kunden dahinter."
        bullets={[
          "Bestandsübersicht mit Warnung bei niedrigem Lagerbestand",
          "Direkte Nachbestellung aus dem Tool heraus",
          "CRM mit Umsätzen und Kundenverwaltung im selben System",
        ]}
        image="/generated/haas-wasserkraft-case.png"
        background="light"
        logo="/logos/haas-wasserkraft.png"
      />
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
        imageRight
        logo="/logos/voicelink.png"
        logoBg="dark"
      />

      <CTABanner
        heading="Dein Prozess könnte das nächste Projekt sein."
        sub="Lass uns in einem kurzen Gespräch klären, was sich bei dir automatisieren oder als eigenes System bauen lässt."
      />

      <Footer />
    </main>
  );
}
