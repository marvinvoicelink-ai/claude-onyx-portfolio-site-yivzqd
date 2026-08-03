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
      />

      <AliveCtaBand
        heading="Dein Prozess könnte das nächste Projekt sein."
        sub="Lass uns in einem kurzen Gespräch klären, was sich bei dir automatisieren oder als eigenes System bauen lässt."
      />

      <Footer />
    </main>
  );
}
