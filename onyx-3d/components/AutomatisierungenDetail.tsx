import { automatisierungen } from "@/lib/automatisierungen";

/** One anchored block per automation area — text-only rows, since the visual weight on this page sits in the hero image. */
export default function AutomatisierungenDetail() {
  return (
    <div>
      {automatisierungen.map((a, i) => (
        <section key={a.slug} id={a.slug} className="py-10" style={{ scrollMarginTop: 96 }}>
          <div className="mx-auto px-7" style={{ maxWidth: 1180 }}>
            <div
              className="rounded-2xl px-7 py-8 md:px-10 md:py-10"
              style={{ background: "var(--near-black-2)", border: "1px solid var(--hairline)" }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="flex items-center justify-center rounded-xl"
                  style={{
                    width: 42,
                    height: 42,
                    background: "var(--amber-soft)",
                    color: "var(--amber)",
                    border: "1px solid rgba(212, 175, 106,0.3)",
                  }}
                >
                  {a.icon}
                </div>
                <span className="mono" style={{ fontSize: 11.5, letterSpacing: "0.05em", textTransform: "uppercase", color: "var(--amber)" }}>
                  Bereich {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              <h2 style={{ fontSize: "clamp(1.4rem, 2.6vw, 1.9rem)", marginBottom: 8 }}>{a.title}</h2>
              <p style={{ color: "var(--warm-grey)", fontSize: "1rem", marginBottom: 16 }}>{a.subtitle}</p>
              <p style={{ color: "var(--warm-grey-dim)", fontSize: "1.02rem", lineHeight: 1.75, marginBottom: 24, maxWidth: "70ch" }}>
                {a.detail}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2.5">
                {a.bullets.map((b) => (
                  <div key={b} className="flex gap-2.5" style={{ fontSize: "0.95rem", color: "var(--warm-grey-dim)", lineHeight: 1.55 }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="var(--amber)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width={16} height={16} style={{ flexShrink: 0, marginTop: 3 }}>
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    {b}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
