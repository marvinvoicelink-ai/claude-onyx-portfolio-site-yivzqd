/**
 * Ablauf in drei Schritten (Analyse → Bauen → Übergeben) plus ein
 * Prozess-Audit-Mock, das zeigt, wo Stunden pro Woche liegen und was davon
 * automatisierbar ist. Aufbau inspiriert von skalieren.com, in Onyx-Farben
 * und passend zum "Bauen & übergeben"-Modell. Die Audit-Zahlen sind ein
 * illustratives Beispiel, klar als solches gekennzeichnet.
 */
type Step = { num: string; title: string; desc: string };

const steps: Step[] = [
  {
    num: "01",
    title: "Analyse",
    desc: "Gemeinsam schauen wir, wo ein eigenes System oder eine Automation bei dir am meisten bringt — die größten Sprünge bei Produktivität und Kosten.",
  },
  {
    num: "02",
    title: "Bauen",
    desc: "Wir entwickeln dein maßgeschneidertes System, angebunden an das, was du schon nutzt — statt dich in fertige Software zu zwängen.",
  },
  {
    num: "03",
    title: "Übergeben",
    desc: "Du bekommst alles vollständig: Code und Daten, gehostet bei dir. Wir ziehen uns zurück — kein Abo, kein Lock-in.",
  },
];

const audit: { p: string; h: string; auto: "Ja" | "Teilweise" }[] = [
  { p: "Angebote schreiben", h: "6,5", auto: "Ja" },
  { p: "Rechnungen & Mahnungen", h: "4,0", auto: "Ja" },
  { p: "Support-Anfragen", h: "8,0", auto: "Teilweise" },
];

export default function ProcessSteps({ blatt }: { blatt?: string }) {
  return (
    <section className="py-10">
      <div className="mx-auto px-7" style={{ maxWidth: 1100 }}>
        <div className="text-center">
          <span
            className="mono inline-flex items-center gap-2 mb-4"
            style={{ fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--amber)" }}
          >
            <span style={{ opacity: 0.7 }}>§</span> {blatt ? `Blatt ${blatt} / Ablauf` : "Ablauf"}
          </span>
          <h2 className="mx-auto" style={{ fontSize: "clamp(1.8rem, 3.6vw, 2.6rem)", maxWidth: "20ch", marginBottom: 12 }}>
            In drei Schritten zu <span className="accent">deinem System</span>
          </h2>
          <p className="mx-auto" style={{ color: "var(--warm-grey-dim)", maxWidth: "50ch", fontSize: "1.02rem", lineHeight: 1.7, marginBottom: 36 }}>
            Kein Blindflug: Erst verstehen wir deinen Ablauf, dann bauen wir,
            dann gehört das System dir.
          </p>
        </div>

        {/* Drei Schritte, auf Desktop nebeneinander mit Pfeilen dazwischen. */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {steps.map((s, i) => (
            <div key={s.num} className="relative">
              <div
                className="rounded-2xl p-6 h-full on-dark silver-rim text-left"
                style={{ background: "var(--near-black-2)", border: "1px solid var(--hairline)" }}
              >
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="mono accent" style={{ fontSize: 13, fontWeight: 700 }}>{s.num}</span>
                  <h3 className="display" style={{ fontSize: "clamp(1.3rem, 2.4vw, 1.7rem)", lineHeight: 1.05 }}>{s.title}</h3>
                </div>
                <p style={{ color: "var(--warm-grey-dim)", fontSize: "1rem", lineHeight: 1.65 }}>{s.desc}</p>
              </div>
              {i < steps.length - 1 && (
                <span aria-hidden className="hidden md:flex items-center justify-center" style={{ position: "absolute", right: -14, top: "50%", transform: "translateY(-50%)", color: "var(--amber)", zIndex: 2 }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width={20} height={20}>
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Prozess-Audit-Mock */}
        <div className="rounded-2xl p-5 sm:p-6 on-dark silver-rim" style={{ background: "var(--near-black-2)", border: "1px solid var(--hairline)", maxWidth: 720, margin: "0 auto" }}>
          <div className="flex items-center justify-between mb-4">
            <span className="mono" style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase" }}>Prozess-Audit</span>
            <span className="mono" style={{ fontSize: 12.5, fontWeight: 700, color: "var(--amber)" }}>18,5 Std./Woche</span>
          </div>
          <div className="grid mono" style={{ gridTemplateColumns: "1fr auto auto", fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--warm-grey-faint)", gap: "0 16px", paddingBottom: 8, borderBottom: "1px solid var(--hairline)" }}>
            <span>Prozess</span>
            <span className="text-right" style={{ minWidth: 90 }}>Std./Woche</span>
            <span className="text-right" style={{ minWidth: 96 }}>Automatisierbar</span>
          </div>
          {audit.map((r) => (
            <div key={r.p} className="grid items-center" style={{ gridTemplateColumns: "1fr auto auto", gap: "0 16px", padding: "12px 0", borderBottom: "1px solid var(--hairline)" }}>
              <span style={{ fontSize: 14.5, color: "var(--warm-grey)" }}>{r.p}</span>
              <span className="mono text-right" style={{ fontSize: 14, color: "var(--warm-grey-dim)", minWidth: 90 }}>{r.h}</span>
              <span className="text-right" style={{ minWidth: 96 }}>
                <span
                  className="mono inline-block rounded-full px-2.5 py-1"
                  style={{
                    fontSize: 11,
                    color: r.auto === "Ja" ? "var(--amber)" : "var(--warm-grey-dim)",
                    border: `1px solid ${r.auto === "Ja" ? "rgba(232,163,61,0.4)" : "var(--hairline)"}`,
                    background: r.auto === "Ja" ? "var(--amber-soft)" : "transparent",
                  }}
                >
                  {r.auto}
                </span>
              </span>
            </div>
          ))}
          <p className="mono" style={{ fontSize: 11, color: "var(--warm-grey-faint)", marginTop: 12 }}>
            Beispielhafter Ausschnitt — dein echtes Audit machen wir im Erstgespräch.
          </p>
        </div>
      </div>
    </section>
  );
}
