/**
 * Shared building blocks for the "alive" visual variant (sixeight-media
 * structural reference, Onyx's own colors/content/claims). Kept separate
 * from the production components so the live site is untouched while this
 * direction is being previewed under /test-alive/*.
 */

export function AliveEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="mono block mb-4"
      style={{ fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--amber)" }}
    >
      {children}
    </span>
  );
}

export function AliveStatRow({ stats }: { stats: { value: string; label: string }[] }) {
  return (
    <section style={{ background: "var(--near-black-2)", borderBottom: "1px solid var(--hairline)" }}>
      <div className="mx-auto grid grid-cols-1 sm:grid-cols-3" style={{ maxWidth: 1400 }}>
        {stats.map((k, i) => (
          <div
            key={k.label}
            className="text-center py-10 px-6"
            style={{ borderLeft: i > 0 ? "1px solid var(--hairline)" : "none" }}
          >
            <div className="mono" style={{ fontSize: "2rem", fontWeight: 800, color: "var(--amber)", lineHeight: 1.1 }}>
              {k.value}
            </div>
            <div style={{ fontSize: "0.92rem", color: "var(--warm-grey-dim)", marginTop: 6 }}>{k.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function AliveHairlineGrid({
  eyebrow,
  heading,
  items,
  cols = 2,
}: {
  eyebrow: string;
  heading: string;
  items: { num: string; title: string; highlight?: string; desc: string }[];
  cols?: 2 | 3;
}) {
  return (
    <section className="py-20">
      <div className="mx-auto px-7 text-center" style={{ maxWidth: 700, marginBottom: 56 }}>
        <AliveEyebrow>{eyebrow}</AliveEyebrow>
        <h2 style={{ fontSize: "clamp(1.8rem, 3.6vw, 2.6rem)" }}>{heading}</h2>
      </div>
      <div className="mx-auto px-7" style={{ maxWidth: 1180 }}>
        <div
          className={`grid grid-cols-1 ${cols === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}
          style={{ background: "var(--hairline)", gap: 1, border: "1px solid var(--hairline)" }}
        >
          {items.map((p) => (
            <div key={p.num} className="p-8" style={{ background: "var(--near-black)" }}>
              <div className="mono mb-4" style={{ fontSize: 13, color: "var(--amber)" }}>
                {p.num}
              </div>
              <h3 style={{ fontSize: "1.2rem", marginBottom: 8 }}>
                {p.title} {p.highlight && <span className="accent">{p.highlight}</span>}
              </h3>
              <p style={{ color: "var(--warm-grey-dim)", fontSize: "0.95rem" }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AliveInvertedStatement({
  eyebrow,
  statement,
  highlight,
  sub,
}: {
  eyebrow: string;
  statement: string;
  highlight: string;
  sub?: string;
}) {
  return (
    <section className="py-24" style={{ background: "var(--warm-grey)" }}>
      <div className="mx-auto px-7 text-center" style={{ maxWidth: 780 }}>
        <span
          className="mono block mb-5"
          style={{ fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "#8a6a1f" }}
        >
          {eyebrow}
        </span>
        <p
          style={{
            fontFamily: "var(--font-archivo), sans-serif",
            fontWeight: 800,
            fontSize: "clamp(1.8rem, 3.8vw, 2.7rem)",
            lineHeight: 1.2,
            color: "#161104",
          }}
        >
          {statement} <span style={{ color: "#8a6a1f" }}>{highlight}</span>
        </p>
        {sub && (
          <p style={{ color: "rgba(22,17,4,0.62)", fontSize: "1.05rem", lineHeight: 1.7, marginTop: 24 }}>{sub}</p>
        )}
      </div>
    </section>
  );
}

export function AliveCtaBand({
  heading,
  sub,
  buttonText = "Kostenloses Erstgespräch sichern",
  href = "/kontakt",
}: {
  heading: string;
  sub: string;
  buttonText?: string;
  href?: string;
}) {
  return (
    <section className="py-20">
      <div className="mx-auto px-7" style={{ maxWidth: 1180 }}>
        <div
          className="rounded-2xl px-8 py-14 md:px-16 md:py-20 flex flex-col items-center text-center gap-7"
          style={{
            background: "radial-gradient(circle at 20% 20%, rgba(232,163,61,0.14), transparent 55%), var(--near-black-2)",
            border: "1px solid var(--hairline)",
          }}
        >
          <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", maxWidth: "20ch" }}>{heading}</h2>
          <p style={{ color: "var(--warm-grey-dim)", fontSize: "1.02rem" }}>{sub}</p>
          <a
            href={href}
            className="inline-flex items-center gap-2.5 rounded-[10px] px-7 py-4 font-semibold btn-amber"
            style={{ background: "var(--amber)", color: "#161104", fontSize: 15.5 }}
          >
            {buttonText}
          </a>
        </div>
      </div>
    </section>
  );
}

export function AliveTeamGrid({
  eyebrow,
  heading,
  team,
}: {
  eyebrow: string;
  heading: string;
  team: { name: string; role: string; image: string }[];
}) {
  return (
    <section className="py-20">
      <div className="mx-auto px-7 text-center" style={{ maxWidth: 700, marginBottom: 56 }}>
        <AliveEyebrow>{eyebrow}</AliveEyebrow>
        <h2 style={{ fontSize: "clamp(1.8rem, 3.6vw, 2.6rem)" }}>{heading}</h2>
      </div>
      <div className="mx-auto px-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" style={{ maxWidth: 1180 }}>
        {team.map((m) => (
          <div key={m.name} className="rounded-2xl overflow-hidden" style={{ background: "var(--near-black-2)", border: "1px solid var(--hairline)" }}>
            <div className="relative w-full" style={{ aspectRatio: "4 / 5" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={m.image} alt={m.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} />
            </div>
            <div className="p-5 text-center">
              <div style={{ fontWeight: 700, fontSize: "1.02rem" }}>{m.name}</div>
              <div className="mono" style={{ fontSize: 12.5, color: "var(--amber)", marginTop: 4 }}>{m.role}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function AliveTestimonialWall({
  eyebrow,
  heading,
  quotes,
}: {
  eyebrow: string;
  heading: string;
  quotes: { text: string; name: string; source: string }[];
}) {
  return (
    <section className="py-20">
      <div className="mx-auto px-7 text-center" style={{ maxWidth: 700, marginBottom: 56 }}>
        <AliveEyebrow>{eyebrow}</AliveEyebrow>
        <h2 style={{ fontSize: "clamp(1.8rem, 3.6vw, 2.6rem)" }}>{heading}</h2>
      </div>
      <div className="mx-auto px-7 grid grid-cols-1 md:grid-cols-2 gap-6" style={{ maxWidth: 900 }}>
        {quotes.map((q) => (
          <div key={q.name} className="p-7 rounded-2xl" style={{ background: "var(--near-black-2)", border: "1px solid var(--hairline)" }}>
            <p style={{ fontSize: "0.98rem", lineHeight: 1.65, color: "var(--warm-grey-dim)", fontStyle: "italic" }}>
              &bdquo;{q.text}&ldquo;
            </p>
            <div className="mono mt-5" style={{ fontSize: 12.5, color: "var(--warm-grey-faint)" }}>
              — {q.name}, {q.source}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function AliveComparisonTable({
  eyebrow,
  heading,
  columns,
  rows,
}: {
  eyebrow: string;
  heading: string;
  columns: [string, string];
  rows: { label: string; a: string; b: string }[];
}) {
  return (
    <section className="py-20">
      <div className="mx-auto px-7 text-center" style={{ maxWidth: 700, marginBottom: 48 }}>
        <AliveEyebrow>{eyebrow}</AliveEyebrow>
        <h2 style={{ fontSize: "clamp(1.8rem, 3.6vw, 2.6rem)" }}>{heading}</h2>
      </div>
      <div className="mx-auto px-7" style={{ maxWidth: 900 }}>
        <div style={{ border: "1px solid var(--hairline)", borderRadius: 8, overflow: "hidden" }}>
          <div
            className="grid grid-cols-3"
            style={{ borderBottom: "1px solid var(--hairline)", background: "var(--near-black-2)" }}
          >
            <div className="mono py-4 px-5" style={{ fontSize: 12, color: "var(--warm-grey-faint)" }} />
            <div className="mono py-4 px-5 text-center" style={{ fontSize: 12, color: "var(--warm-grey-faint)", textTransform: "uppercase" }}>
              {columns[0]}
            </div>
            <div className="mono py-4 px-5 text-center" style={{ fontSize: 12, color: "var(--amber)", textTransform: "uppercase", background: "var(--amber-soft)" }}>
              {columns[1]}
            </div>
          </div>
          {rows.map((r) => (
            <div key={r.label} className="grid grid-cols-3" style={{ borderBottom: "1px solid var(--hairline)" }}>
              <div className="py-4 px-5" style={{ fontSize: 13.5, color: "var(--warm-grey-dim)" }}>{r.label}</div>
              <div className="py-4 px-5 text-center" style={{ fontSize: 13.5, color: "var(--warm-grey-faint)" }}>{r.a}</div>
              <div className="py-4 px-5 text-center font-semibold" style={{ fontSize: 13.5, background: "var(--amber-soft)" }}>{r.b}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AliveCase({
  tag,
  name,
  heading,
  desc,
  image,
  imageRight = false,
}: {
  tag: string;
  name: string;
  heading: string;
  desc: string;
  image: string;
  imageRight?: boolean;
}) {
  const media = (
    <div className="relative" style={{ minHeight: 340, background: "var(--near-black-2)" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={image} alt={name} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
    </div>
  );
  const body = (
    <div className="p-8 md:p-12" style={{ background: "var(--near-black-2)" }}>
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
        {tag}
      </span>
      <h3 style={{ fontSize: "1.3rem", marginBottom: 6 }}>{name}</h3>
      <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", marginBottom: 18 }}>{heading}</h2>
      <p style={{ color: "var(--warm-grey-dim)", fontSize: "1.02rem", lineHeight: 1.75 }}>{desc}</p>
    </div>
  );
  return (
    <section className="py-10">
      <div className="mx-auto px-7" style={{ maxWidth: 1180 }}>
        <div
          className="grid grid-cols-1 lg:grid-cols-2"
          style={{ border: "1px solid var(--hairline)", borderRadius: 4, overflow: "hidden" }}
        >
          {imageRight ? (
            <>
              {body}
              {media}
            </>
          ) : (
            <>
              {media}
              {body}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
