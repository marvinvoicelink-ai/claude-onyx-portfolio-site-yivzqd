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

function Chip({ label, delay }: { label: string; delay: number }) {
  return (
    <span
      className="chip-glow mono inline-flex items-center rounded-full px-5 py-2.5 mx-2.5"
      style={{
        fontSize: 14.5,
        whiteSpace: "nowrap",
        border: "1px solid transparent",
        animationDelay: `${delay}s`,
      }}
    >
      {label}
    </span>
  );
}

export default function IndustriesSection() {
  const track = [...industries, ...industries];

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
        <p style={{ color: "var(--warm-grey-dim)", maxWidth: "62ch", fontSize: "1.02rem", lineHeight: 1.7, marginBottom: 44 }}>
          Onyx ist nicht auf eine Branche spezialisiert — jedes System wird
          um deinen konkreten Prozess herum gebaut. Ein paar Beispiele, wo
          das typischerweise gebraucht wird:
        </p>
      </div>

      <div
        className="relative overflow-hidden py-2"
        style={{
          WebkitMaskImage:
            "linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)",
          maskImage:
            "linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)",
        }}
      >
        <div className="marquee-track flex items-center" style={{ width: "max-content" }}>
          {track.map((label, i) => (
            <Chip key={`${label}-${i}`} label={label} delay={(i % industries.length) * 0.75} />
          ))}
        </div>
      </div>

      <div className="mx-auto px-7" style={{ maxWidth: 1180 }}>
        <p className="mono mt-8" style={{ fontSize: 12, color: "var(--warm-grey-faint)" }}>
          Beispiele, keine abschließende Liste — passt dein Prozess, passt Onyx.
        </p>
      </div>
    </section>
  );
}
