import type { Metadata } from "next";
import Footer from "@/components/Footer";
import { AliveCase, AliveComparisonTable, AliveCtaBand } from "@/components/alive/AliveChrome";

export const metadata: Metadata = {
  title: "Test Für dich — Onyx.AI",
  robots: { index: false, follow: false },
};

const diffs = [
  {
    tag: "Eigentum",
    name: "Kein CRM von der Stange.",
    heading: "Dein System wird nach deinem Prozess gebaut.",
    desc: "Kein Standardpaket mit festen Modulen — was dein System abdeckt, richtet sich nach deinem tatsächlichen Ablauf, nicht umgekehrt. Du beschreibst, wie bei dir gearbeitet wird, wir übersetzen es in Software.",
    bullets: [
      "Kein Pflichtenkatalog aus Standard-Modulen, die nur halb passen",
      "Jede Automatisierung folgt deinem echten Ablauf, nicht einem Template",
      "Wächst mit, wenn sich dein Prozess später ändert",
    ],
    image: "/generated/diff-01.webp",
  },
  {
    tag: "Volles Eigentum",
    name: "Code & Daten gehören dir.",
    heading: "Du besitzt Code und Daten — vollständig.",
    desc: "Nach der Übergabe gehört dir jede Zeile Code und jeder Datensatz. Kein Anbieter, der Zugriff behält, Lizenzen verlängert oder Funktionen hinter einer Bezahlschranke versteckt.",
    bullets: [
      "Vollständiger Quellcode wird bei der Übergabe ausgehändigt",
      "Keine Abo-Bindung an Onyx nach Projektabschluss",
      "Du entscheidest, wer später daran weiterbaut",
    ],
    image: "/generated/diff-02.webp",
    imageRight: true,
  },
  {
    tag: "Hosting",
    name: "Deine Infrastruktur.",
    heading: "Du hostest auf deinem eigenen Server.",
    desc: "DSGVO-konform, in Deutschland bzw. der EU, mit AVV — nicht auf fremden Servern, die du nicht kontrollierst und über die du im Streitfall keine Handhabe hast.",
    bullets: [
      "Hosting bei dir oder deinem Wunschanbieter, nicht bei Onyx",
      "Auftragsverarbeitungsvertrag (AVV) von Anfang an inklusive",
      "Keine Kundendaten auf Servern außerhalb der EU",
    ],
    image: "/generated/diff-03.webp",
    background: "light" as const,
  },
  {
    tag: "Vertragsende",
    name: "Kein Lock-in.",
    heading: "Nach der Übergabe bist du unabhängig.",
    desc: "Kein laufendes Abo, kein Anbieter, der Preise erhöht oder den Vertrag kündigt. Onyx übergibt vollständig und zieht sich zurück — dein System läuft unabhängig davon weiter.",
    bullets: [
      "Keine monatliche Abo-Pflicht nach der Übergabe",
      "Onyx zieht sich nach Projektende bewusst zurück",
      "Du entscheidest, ob und wann weiterentwickelt wird",
    ],
    image: "/generated/diff-04.webp",
    imageRight: true,
    background: "light" as const,
  },
];

export default function TestAliveFuerDichPage() {
  return (
    <main>
      <section className="py-24 pt-40 text-center">
        <div className="mx-auto px-7" style={{ maxWidth: 760 }}>
          <span className="mono block mb-4" style={{ fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--amber)" }}>
            Für dich
          </span>
          <h1 style={{ fontFamily: "var(--font-archivo), sans-serif", fontWeight: 800, fontSize: "clamp(2.6rem, 6vw, 4.2rem)", lineHeight: 1.05, marginBottom: 16 }}>
            Was wir für dich tun können.
          </h1>
          <p style={{ color: "var(--warm-grey-dim)", fontSize: "1.05rem", lineHeight: 1.7 }}>
            Kein Baukasten, keine Abhängigkeit — so unterscheidet sich ein System von Onyx von dem, was du sonst bekommst.
          </p>
        </div>
      </section>

      {diffs.map((d) => (
        <AliveCase
          key={d.name}
          tag={d.tag}
          name={d.name}
          heading={d.heading}
          desc={d.desc}
          bullets={d.bullets}
          image={d.image}
          imageRight={d.imageRight}
          background={d.background}
        />
      ))}

      <AliveComparisonTable
        eyebrow="Abgrenzung"
        heading="Dein Zugang. Deine Regeln."
        columns={["08/15-CRM von der Stange", "System von Onyx"]}
        rows={[
          { label: "Passt sich an", a: "Du an das Tool", b: "Das System an dich" },
          { label: "Eigentum", a: "Anbieter", b: "Du — Code & Daten" },
          { label: "Hosting", a: "Fremde Server", b: "Deine Infrastruktur" },
          { label: "Vertragsende", a: "Du stehst ohne Alternative da", b: "Kein Lock-in" },
        ]}
      />

      <AliveCtaBand
        heading="Dein System, gebaut für genau dein Geschäft."
        sub="Kein Baukasten, kein Abo — ein System, das dir gehört."
      />

      <Footer />
    </main>
  );
}
