import Image from "next/image";

const problems = [
  {
    num: "01",
    title: "Mehrere Tools,",
    highlight: "die nicht zusammenpassen",
    desc: "Excel-Listen, SaaS-Tools, die nie ganz zu deinem Prozess passen.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" width={20} height={20}>
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M8 7V5a4 4 0 0 1 8 0v2" />
      </svg>
    ),
    mock: "tools",
    image: "/generated/problem-tools.webp",
  },
  {
    num: "02",
    title: "Funktionen fehlen",
    highlight: "trotzdem",
    desc: "Das nächste Preispaket kostet doppelt, bringt aber nur einen Bruchteil mehr.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" width={20} height={20}>
        <path d="M4 19V9M11 19V5M18 19v-7" />
      </svg>
    ),
    mock: "pricing",
    image: "/generated/problem-pricing.webp",
  },
  {
    num: "03",
    title: "Daten liegen",
    highlight: "nicht bei dir",
    desc: "Kundendaten liegen auf fremden Servern, oft außerhalb der EU.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" width={20} height={20}>
        <rect x="3" y="4" width="18" height="6" rx="1.4" />
        <rect x="3" y="14" width="18" height="6" rx="1.4" />
      </svg>
    ),
    mock: "servers",
    image: "/generated/problem-servers.webp",
  },
  {
    num: "04",
    title: "Abhängig",
    highlight: "vom Anbieter",
    desc: "Kündigt er den Vertrag oder erhöht die Preise, stehst du ohne Alternative da.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" width={20} height={20}>
        <path d="M17 10V7a5 5 0 0 0-9.9-1" />
        <rect x="4" y="10" width="16" height="10" rx="2" />
      </svg>
    ),
    mock: "lock",
    image: "/generated/problem-lock.webp",
  },
];

function Mock({ type }: { type: string }) {
  const wrapStyle: React.CSSProperties = {
    borderRadius: 10,
    background: "#0c0c0c",
    padding: 16,
    height: 150,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: 8,
  };
  const barStyle = (w: string, dim = false): React.CSSProperties => ({
    height: 8,
    width: w,
    borderRadius: 4,
    background: dim ? "var(--hairline)" : "var(--amber)",
    opacity: dim ? 1 : 0.85,
  });

  if (type === "tools") {
    return (
      <div style={wrapStyle}>
        {["Excel", "Tool A", "Tool B", "Zettel"].map((t) => (
          <div key={t} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={barStyle("34%")} />
            <span className="mono" style={{ fontSize: 10, color: "var(--warm-grey-faint)" }}>{t}</span>
          </div>
        ))}
      </div>
    );
  }
  if (type === "pricing") {
    return (
      <div style={wrapStyle}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span className="mono" style={{ fontSize: 10, color: "var(--warm-grey-faint)" }}>PAKET S</span>
          <span className="mono" style={{ fontSize: 10, color: "var(--warm-grey-faint)" }}>49&nbsp;€</span>
        </div>
        <span style={barStyle("40%")} />
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
          <span className="mono" style={{ fontSize: 10, color: "var(--amber)" }}>PAKET M</span>
          <span className="mono" style={{ fontSize: 10, color: "var(--amber)" }}>99&nbsp;€</span>
        </div>
        <span style={barStyle("46%")} />
      </div>
    );
  }
  if (type === "servers") {
    return (
      <div style={wrapStyle}>
        {[0, 1].map((i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "rgba(232,163,61,0.6)" }} />
            <span className="mono" style={{ fontSize: 10, color: "var(--warm-grey-faint)" }}>
              server-eu-{i + 1}.example.com
            </span>
          </div>
        ))}
        <span style={barStyle("70%", true)} />
      </div>
    );
  }
  return (
    <div style={{ ...wrapStyle, alignItems: "center" }}>
      <svg viewBox="0 0 24 24" fill="none" stroke="var(--amber)" strokeWidth={1.6} width={34} height={34}>
        <path d="M17 10V7a5 5 0 0 0-9.9-1" />
        <rect x="4" y="10" width="16" height="10" rx="2" />
      </svg>
      <span className="mono" style={{ fontSize: 10, color: "var(--warm-grey-faint)", marginTop: 6 }}>
        VERTRAG GEKÜNDIGT
      </span>
    </div>
  );
}

export default function ProblemSection() {
  return (
    <section className="py-14">
      <div className="mx-auto px-7" style={{ maxWidth: 1180 }}>
        <span
          className="mono inline-flex items-center gap-2 mb-4"
          style={{ fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--amber)" }}
        >
          <span style={{ opacity: 0.7 }}>§</span> Blatt 02 / Ausgangslage
        </span>
        <h2 style={{ fontSize: "clamp(1.8rem, 3.6vw, 2.6rem)", maxWidth: "20ch", marginBottom: 44 }}>
          Kommt dir das bekannt vor?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {problems.map((p) => (
            <div
              key={p.num}
              className="rounded-2xl p-7"
              style={{
                background: "var(--near-black-2)",
                boxShadow: "0 0 40px -20px rgba(232,163,61,0.25)",
              }}
            >
              <div className="flex items-center justify-between mb-5">
                <div
                  className="flex items-center justify-center rounded-xl"
                  style={{
                    width: 42,
                    height: 42,
                    background: "var(--amber-soft)",
                    color: "var(--amber)",
                    border: "1px solid rgba(232,163,61,0.3)",
                  }}
                >
                  {p.icon}
                </div>
                <span
                  className="mono"
                  style={{ fontSize: 34, fontWeight: 800, color: "var(--hairline)" }}
                >
                  {p.num}
                </span>
              </div>
              <h3 style={{ fontSize: "1.3rem", marginBottom: 4 }}>
                {p.title} <span className="accent">{p.highlight}</span>
              </h3>
              <p style={{ color: "var(--warm-grey-dim)", fontSize: "0.95rem", marginBottom: 18 }}>
                {p.desc}
              </p>
              {p.image ? (
                <div className="rounded-[10px] overflow-hidden" style={{ background: "#0c0c0c" }}>
                  <Image
                    src={p.image}
                    alt=""
                    width={900}
                    height={675}
                    sizes="440px"
                    className="w-full h-auto block"
                  />
                </div>
              ) : (
                <Mock type={p.mock} />
              )}
            </div>
          ))}
        </div>

        <div className="mt-14">
          <div className="relative rounded-2xl overflow-hidden">
            <Image
              src="/generated/chaos-to-portal.webp"
              alt="Aus Tool-Chaos wird ein System. Eins, das du besitzt."
              width={1600}
              height={903}
              className="w-full h-auto block"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
