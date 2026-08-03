import SectionGlow from "./SectionGlow";

const industries = [
  "Handwerk & Bau",
  "Hausverwaltung & Immobilien",
  "Personaldienstleistung",
  "Logistik & Spedition",
  "Praxen & Gesundheitswesen",
  "Handel & E-Commerce",
  "Beratung & Agenturen",
  "Versicherungen & Finanzdienstleister",
];

export default function IndustriesSection() {
  return (
    <section className="py-14 relative overflow-hidden">
      <SectionGlow position="top" />
      <div className="mx-auto px-7 text-center" style={{ maxWidth: 1180 }}>
        <span
          className="mono inline-flex items-center gap-2 mb-4"
          style={{ fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--amber)" }}
        >
          <span style={{ opacity: 0.7 }}>§</span> Blatt 04 / Für wen wir bauen
        </span>
        <h2 className="mx-auto" style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", maxWidth: "22ch", marginBottom: 14 }}>
          Kein Branchen-Fokus. Dein Prozess entscheidet.
        </h2>
        <p className="mx-auto" style={{ color: "var(--warm-grey-dim)", maxWidth: "62ch", fontSize: "1.02rem", lineHeight: 1.7, marginBottom: 40 }}>
          Onyx ist nicht auf eine Branche spezialisiert — jedes System wird
          um deinen konkreten Prozess herum gebaut. Ein paar Beispiele, wo
          das typischerweise gebraucht wird:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mx-auto" style={{ maxWidth: 1040 }}>
          {industries.map((label, i) => (
            <div
              key={label}
              className="alive-hover-card flex items-center gap-3 rounded-xl px-5 py-4 text-left"
              style={{ background: "var(--near-black-2)", border: "1px solid var(--hairline)" }}
            >
              <span className="mono" style={{ fontSize: 11.5, color: "var(--amber)", flexShrink: 0 }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span style={{ fontSize: "0.94rem", color: "var(--warm-grey-dim)", lineHeight: 1.35 }}>{label}</span>
            </div>
          ))}
        </div>

        <p className="mono mt-8" style={{ fontSize: 12, color: "var(--warm-grey-faint)" }}>
          Beispiele, keine abschließende Liste — passt dein Prozess, passt Onyx.
        </p>
      </div>
    </section>
  );
}
