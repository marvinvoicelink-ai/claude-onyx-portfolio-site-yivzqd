/** Klar gekennzeichneter Platzhalter statt eines erfundenen Produkt-Screenshots — ein echtes Rundgang-Video gibt es für dieses neue Angebot noch nicht. */
export default function ErfassungVideoSection() {
  return (
    <section className="py-14" style={{ background: "var(--near-black-2)" }}>
      <div className="mx-auto px-7" style={{ maxWidth: 1180 }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div>
            <span
              className="mono inline-flex items-center gap-2 mb-4"
              style={{ fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--amber)" }}
            >
              <span style={{ opacity: 0.7 }}>§</span> Video statt Fotomarathon
            </span>
            <h2 style={{ fontSize: "clamp(1.5rem, 2.8vw, 2rem)", marginBottom: 18, maxWidth: "20ch" }}>
              Film den Rundgang. Nicht jeden Raum aus zwölf Winkeln.
            </h2>
            <p style={{ color: "var(--warm-grey-dim)", fontSize: "1.02rem", lineHeight: 1.75, maxWidth: "50ch" }}>
              Das Video ist das Hauptmaterial. Du gehst so durch das Objekt,
              wie du es ohnehin tun würdest, und erklärst dabei die wichtigen
              Punkte. Einzelne Fotos bleiben die Ausnahme für Situationen, in
              denen sie zusätzlichen Nutzen bringen.
            </p>
          </div>

          <div
            className="relative rounded-2xl flex flex-col items-center justify-center text-center px-8"
            style={{
              aspectRatio: "16 / 10",
              background: "var(--near-black)",
              border: "1px dashed var(--hairline)",
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="var(--warm-grey-faint)" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" width={38} height={38} style={{ opacity: 0.55, marginBottom: 14 }}>
              <path d="M23 7l-7 5 7 5V7Z" />
              <rect x="1" y="5" width="15" height="14" rx="2" />
            </svg>
            <span className="mono" style={{ fontSize: 11.5, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--warm-grey-faint)" }}>
              Platzhalter — reales Rundgang-Video folgt
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
