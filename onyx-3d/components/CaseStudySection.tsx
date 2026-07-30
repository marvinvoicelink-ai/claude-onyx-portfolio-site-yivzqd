import Image from "next/image";

const stats = [
  { label: "Vollständig übergeben", sub: "Code, Zugänge & Dokumentation" },
  { label: "100 % Eigentum", sub: "Kein Onyx-Zugriff mehr danach" },
  { label: "DSGVO-konform", sub: "Gehostet in Deutschland, mit AVV" },
  { label: "Im Alltag im Einsatz", sub: "Seit der Übergabe produktiv genutzt" },
];

export default function CaseStudySection() {
  return (
    <section className="py-24" style={{ borderTop: "1px solid var(--hairline)" }}>
      <div className="mx-auto px-7" style={{ maxWidth: 1180 }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5 mono"
              style={{
                fontSize: 11.5,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                color: "var(--amber)",
                background: "var(--amber-soft)",
                border: "1px solid rgba(232,163,61,0.3)",
              }}
            >
              Kundencase · gebaut &amp; übergeben
            </span>
            <h3 style={{ fontSize: "1.4rem", marginBottom: 6 }}>HausManager Pro</h3>
            <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", marginBottom: 18 }}>
              Vom Excel-Chaos zum eigenen System.
            </h2>
            <p style={{ color: "var(--warm-grey-dim)", fontSize: "1.02rem", lineHeight: 1.75, marginBottom: 28 }}>
              Für eine Hausverwaltung haben wir ein komplettes CRM von Grund
              auf entwickelt und vollständig übergeben. Kein Produkt zum
              Kaufen, sondern ein Beispiel dafür, was für dein Unternehmen
              möglich ist.
            </p>

            <div className="grid grid-cols-2 gap-3.5 mb-7">
              {stats.map((s, i) => (
                <div
                  key={s.label}
                  className="rounded-xl p-4"
                  style={{ background: "var(--near-black-2)", border: "1px solid rgba(232,163,61,0.3)" }}
                >
                  <span className="mono" style={{ fontSize: 12, color: "var(--amber)" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div style={{ fontWeight: 700, fontSize: "0.95rem", marginTop: 4 }}>{s.label}</div>
                  <div style={{ fontSize: "0.82rem", color: "var(--warm-grey-faint)", marginTop: 2 }}>
                    {s.sub}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-2.5">
              {[
                "Individuelle Prozessanalyse & Konzept",
                "Vollständige Entwicklung im Onyx-Standard",
                "Übergabe von Code, Zugängen & Doku",
              ].map((t) => (
                <div key={t} className="flex items-center gap-2.5" style={{ fontSize: "0.95rem", color: "var(--warm-grey-dim)" }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="var(--amber)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width={16} height={16}>
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  {t}
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex items-center justify-center" style={{ minHeight: 380 }}>
            {/* Spotlight glow ring behind the case-study mockup */}
            <div
              aria-hidden
              className="absolute"
              style={{ width: 640, height: 640, maxWidth: "115%" }}
            >
              <Image
                src="/generated/case-study-ring.webp"
                alt=""
                fill
                sizes="460px"
                style={{ objectFit: "contain" }}
              />
            </div>
            <div
              className="relative rounded-xl overflow-hidden"
              style={{
                width: "100%",
                maxWidth: 440,
                border: "1px solid rgba(232,163,61,0.55)",
                boxShadow: "0 24px 60px -20px rgba(0,0,0,0.65)",
                background: "#000",
              }}
            >
              <video
                controls
                preload="none"
                playsInline
                poster="/assets/hausmanager-poster.jpg"
                style={{ width: "100%", display: "block", aspectRatio: "16/9" }}
              >
                <source src="/assets/hausmanager-demo.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
