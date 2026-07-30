const solutions = [
  { title: "Kundenportale", desc: "Deine Kunden sehen Status, Dokumente und Termine selbst ein — ohne dich anzurufen." },
  { title: "Interne Tools", desc: "Prozesse, die heute noch in Excel oder auf Zetteln laufen, als eigenes System." },
  { title: "Dashboards & Auswertungen", desc: "Alle relevanten Zahlen an einem Ort, live und verständlich statt in verstreuten Tabellen." },
  { title: "Automatisierung & KI-Agenten", desc: "Wiederkehrende Aufgaben — Mails, Reports, Erinnerungen — laufen automatisch im Hintergrund." },
  { title: "Termin- & Ressourcenplanung", desc: "Kalender, Buchungen und Kapazitäten in einem System statt über mehrere Tools verteilt." },
  { title: "Dokumenten- & Datenverwaltung", desc: "Eine zentrale Ablage statt verstreuter Ordner, Mail-Anhänge und Versionschaos." },
];

export default function SolutionsSection() {
  return (
    <section className="py-24" style={{ borderTop: "1px solid var(--hairline)" }}>
      <div className="mx-auto px-7" style={{ maxWidth: 1180 }}>
        <span
          className="mono inline-flex items-center gap-2 mb-4"
          style={{ fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--amber)" }}
        >
          <span style={{ opacity: 0.7 }}>§</span> Blatt 03 / Bauteile
        </span>
        <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", maxWidth: "22ch", marginBottom: 14 }}>
          Ein System, jeder Bereich, den du brauchst.
        </h2>
        <p style={{ color: "var(--warm-grey-dim)", maxWidth: "62ch", fontSize: "1.02rem", lineHeight: 1.7, marginBottom: 44 }}>
          Kein Baukasten mit festen Modulen. Was dein System am Ende abdeckt,
          richtet sich nach deinem Prozess — hier ein Überblick, wo
          maßgeschneiderte Systeme typischerweise ansetzen.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutions.map((s) => (
            <div
              key={s.title}
              className="rounded-2xl p-7"
              style={{ border: "1px solid rgba(232,163,61,0.3)", background: "var(--near-black-2)" }}
            >
              <div style={{ width: 26, height: 2.5, background: "var(--amber)", borderRadius: 2, marginBottom: 18 }} />
              <h3 style={{ fontSize: "1.05rem", marginBottom: 8 }}>{s.title}</h3>
              <p style={{ color: "var(--warm-grey-dim)", fontSize: "0.95rem", lineHeight: 1.65 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
