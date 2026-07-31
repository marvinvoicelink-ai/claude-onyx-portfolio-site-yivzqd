const faqs = [
  {
    q: "Was kostet ein System von Onyx?",
    a: "Jedes System ist individuell — deshalb gibt es keinen Katalogpreis. Nach dem ersten Gespräch bekommst du ein klares Konzept mit Festpreis.",
  },
  {
    q: "Wie lange dauert der Bau?",
    a: "Ein fokussiertes Tool kann in wenigen Wochen stehen, ein komplettes CRM dauert länger. Im Erstgespräch bekommst du eine realistische Einschätzung.",
  },
  {
    q: "Muss ich technisch versiert sein?",
    a: "Nein. Du beschreibst deinen Prozess und wir übersetzen ihn in ein System — mit verständlicher Dokumentation zur Übergabe.",
  },
  {
    q: "Ist mein System DSGVO-konform?",
    a: "Ja. Du hostest selbst, in Deutschland bzw. der EU, mit AVV. Keine Daten über fremde Server, die du nicht kontrollierst.",
  },
];

export default function FAQSection() {
  return (
    <section className="py-24" style={{ borderTop: "1px solid var(--hairline)" }}>
      <div className="mx-auto px-7" style={{ maxWidth: 820 }}>
        <span
          className="mono inline-flex items-center gap-2 mb-4"
          style={{ fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--amber)" }}
        >
          <span style={{ opacity: 0.7 }}>§</span> Blatt 06 / Rückfragen
        </span>
        <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", marginBottom: 30 }}>Bevor du fragst.</h2>

        <div>
          {faqs.map((f) => (
            <details key={f.q} className="group" style={{ borderBottom: "1px solid var(--hairline)", padding: "20px 0" }}>
              <summary
                className="flex items-center justify-between cursor-pointer list-none"
                style={{ fontWeight: 600, fontSize: "1.02rem" }}
              >
                {f.q}
                <span className="mono" style={{ color: "var(--amber)", fontSize: "1.3rem" }}>
                  <span className="group-open:hidden">+</span>
                  <span className="hidden group-open:inline">–</span>
                </span>
              </summary>
              <p style={{ marginTop: 12, color: "var(--warm-grey-dim)", fontSize: "0.96rem", maxWidth: "70ch" }}>
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
