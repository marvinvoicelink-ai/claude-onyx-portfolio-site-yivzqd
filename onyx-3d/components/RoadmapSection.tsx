const steps: { label: string; align: "top" | "bottom" }[] = [
  { label: "Erstgespräch & Analyse", align: "top" },
  { label: "Konzept & Festpreis", align: "bottom" },
  { label: "Entwicklung", align: "top" },
  { label: "Testing & Übergabe", align: "bottom" },
  { label: "Go-Live", align: "top" },
];

function Dot({ delay = 0 }: { delay?: number }) {
  return (
    <span
      aria-hidden
      className="dot-glow"
      style={{
        position: "relative",
        display: "block",
        width: 20,
        height: 20,
        borderRadius: "50%",
        border: "2px solid var(--amber)",
        background: "var(--near-black)",
        animationDelay: `${delay}s`,
      }}
    >
      <span
        style={{
          position: "absolute",
          inset: 5,
          borderRadius: "50%",
          background: "var(--amber)",
        }}
      />
    </span>
  );
}

function StepLabel({ label }: { label: string }) {
  return (
    <div
      className="rounded-lg px-4 py-2.5"
      style={{ border: "1px solid rgba(232,163,61,0.4)", background: "var(--near-black-2)", whiteSpace: "nowrap" }}
    >
      <span style={{ fontWeight: 700, fontSize: "0.92rem" }}>{label}</span>
    </div>
  );
}

export default function RoadmapSection() {
  return (
    <section className="py-14">
      <div className="mx-auto px-7 text-center" style={{ maxWidth: 1180 }}>
        <span
          className="mono inline-flex items-center gap-2 mb-4"
          style={{ fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--amber)" }}
        >
          <span style={{ opacity: 0.7 }}>§</span> Blatt 08 / Ablauf
        </span>
        <h2 className="mx-auto" style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", maxWidth: "22ch", marginBottom: 14 }}>
          Von der Analyse bis zum Go-Live.
        </h2>
        <p className="mx-auto" style={{ color: "var(--warm-grey-dim)", maxWidth: "62ch", fontSize: "1.02rem", lineHeight: 1.7, marginBottom: 44 }}>
          Ein fokussiertes Tool kann in wenigen Wochen stehen, ein komplettes
          CRM dauert länger — im Erstgespräch bekommst du eine realistische
          Einschätzung für dein Projekt.
        </p>

        {/* Desktop: horizontal timeline */}
        <div className="hidden sm:block relative" style={{ height: 200, marginTop: 40 }}>
          <div
            aria-hidden
            style={{
              position: "absolute",
              top: "50%",
              left: 0,
              right: 0,
              height: 2,
              background:
                "linear-gradient(90deg, rgba(232,163,61,0.1), var(--amber) 12%, var(--amber) 88%, rgba(232,163,61,0.1))",
              transform: "translateY(-50%)",
            }}
          />
          <div className="relative flex h-full">
            {steps.map((s, i) => (
              <div key={s.label} className="relative flex-1 flex items-center justify-center">
                {s.align === "top" && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: "50%",
                      left: "50%",
                      transform: "translateX(-50%)",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <StepLabel label={s.label} />
                    <div style={{ width: 1, height: 26, background: "rgba(232,163,61,0.5)" }} />
                  </div>
                )}
                <Dot delay={i * 0.35} />
                {s.align === "bottom" && (
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translateX(-50%)",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <div style={{ width: 1, height: 26, background: "rgba(232,163,61,0.5)" }} />
                    <StepLabel label={s.label} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: vertical timeline */}
        <div className="sm:hidden flex flex-col" style={{ marginTop: 8 }}>
          {steps.map((s, i) => (
            <div key={s.label} className="relative flex items-center gap-4" style={{ paddingBottom: i < steps.length - 1 ? 32 : 0 }}>
              {i < steps.length - 1 && (
                <div
                  aria-hidden
                  style={{ position: "absolute", left: 9, top: 22, bottom: -10, width: 2, background: "rgba(232,163,61,0.4)" }}
                />
              )}
              <Dot delay={i * 0.35} />
              <StepLabel label={s.label} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
