const industries = [
  { title: "Handwerk & Bau", desc: "Aufträge, Aufmaße und Rechnungen digital statt auf Zetteln." },
  { title: "Hausverwaltung & Immobilien", desc: "Eigentümer- und Mieterportale, Wartungsmanagement an einem Ort." },
  { title: "Personaldienstleistung", desc: "Bewerber-, Einsatz- und Zeiterfassung statt mehrerer Insellösungen." },
  { title: "Logistik & Spedition", desc: "Sendungsverfolgung, Tourenplanung und Lagerbestand live im Blick." },
  { title: "Praxen & Gesundheitswesen", desc: "Terminverwaltung und Patientenportale, DSGVO-konform umgesetzt." },
  { title: "Handel & E-Commerce", desc: "Bestandsführung und eigene Auswertungen statt Excel-Ketten." },
  { title: "Beratung & Agenturen", desc: "Projekt-, Kunden- und Zeiterfassung in einem gemeinsamen System." },
  { title: "Versicherungen & Finanzdienstleister", desc: "Kundenportale und Vertragsverwaltung mit klar geregelten Rechten." },
];

export default function IndustriesSection() {
  return (
    <section className="py-24" style={{ borderTop: "1px solid var(--hairline)" }}>
      <div className="mx-auto px-7" style={{ maxWidth: 1180 }}>
        <span
          className="mono inline-flex items-center gap-2 mb-4"
          style={{ fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--amber)" }}
        >
          <span style={{ opacity: 0.7 }}>§</span> Blatt 04 / Für wen wir bauen
        </span>
        <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", maxWidth: "22ch", marginBottom: 14 }}>
          Kein Branchen-Fokus. Dein Prozess entscheidet.
        </h2>
        <p style={{ color: "var(--warm-grey-dim)", maxWidth: "62ch", fontSize: "1.02rem", lineHeight: 1.7, marginBottom: 40 }}>
          Onyx ist nicht auf eine Branche spezialisiert — jedes System wird
          um deinen konkreten Prozess herum gebaut. Ein paar Beispiele, wo
          das typischerweise gebraucht wird:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6">
          {industries.map((ind) => (
            <div key={ind.title} style={{ borderTop: "1px solid var(--hairline)", paddingTop: 16 }}>
              <h3 style={{ fontSize: "0.98rem", marginBottom: 6 }}>{ind.title}</h3>
              <p style={{ color: "var(--warm-grey-dim)", fontSize: "0.87rem", lineHeight: 1.55 }}>{ind.desc}</p>
            </div>
          ))}
        </div>
        <p className="mono mt-6" style={{ fontSize: 12, color: "var(--warm-grey-faint)" }}>
          Beispiele, keine abschließende Liste — passt dein Prozess, passt Onyx.
        </p>
      </div>
    </section>
  );
}
