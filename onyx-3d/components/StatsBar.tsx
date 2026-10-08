/**
 * Ergebnis-Leiste im Stil einer Kennzahlen-Reihe (vgl. skalieren.com), aber
 * mit belegbaren Onyx-Zahlen aus dem echten HausManager-Case statt erfundener
 * Agentur-Summen. Bewusst als konkretes Kundenergebnis gerahmt, damit die
 * Zahlen ehrlich bleiben. Marvin kann die Werte jederzeit durch eigene
 * Gesamtzahlen ersetzen.
 */
type Stat = { value: string; label: string };

const stats: Stat[] = [
  { value: "600K €", label: "eigener Umsatz" },
  { value: "20+", label: "Std./Monat gespart" },
  { value: "100 %", label: "Eigentum bei dir" },
];

export default function StatsBar() {
  return (
    <section className="py-8">
      <div className="mx-auto px-7" style={{ maxWidth: 1000 }}>
        <div className="text-center mb-5">
          <span className="mono" style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--warm-grey-faint)" }}>
            Onyx.AI in Zahlen
          </span>
        </div>
        <div
          className="rounded-2xl overflow-hidden on-dark beam-border grid grid-cols-1 sm:grid-cols-3"
          style={{ background: "var(--near-black-2)", border: "1px solid var(--silver-line)" }}
        >
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`text-center px-6 py-9 border-t sm:border-t-0 sm:border-l ${i === 0 ? "border-t-0 sm:border-l-0" : ""}`}
              style={{ borderColor: "var(--hairline)" }}
            >
              <div
                className="display"
                style={{
                  fontWeight: 800,
                  fontSize: "clamp(1.7rem, 4vw, 2.7rem)",
                  lineHeight: 1,
                  color: "var(--amber)",
                  whiteSpace: "nowrap",
                }}
              >
                {s.value}
              </div>
              <div className="mono" style={{ fontSize: 12.5, color: "var(--warm-grey-dim)", marginTop: 12, letterSpacing: "0.02em" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
