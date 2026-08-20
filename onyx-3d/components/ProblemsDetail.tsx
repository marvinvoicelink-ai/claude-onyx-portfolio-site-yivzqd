import Image from "next/image";
import { problems } from "@/lib/problems";

/**
 * The detailed explanation each homepage problem-card link lands on —
 * one full row per problem (id-anchored so the homepage can deep-link
 * straight to it), image alternating sides for rhythm, real bullets
 * instead of just repeating the homepage's one-line teaser.
 */
export default function ProblemsDetail() {
  return (
    <div>
      {problems.map((p, i) => {
        const imageRight = i % 2 === 1;
        const media = (
          <div className="relative flex items-center justify-center">
            <Image
              src={p.image}
              alt={`${p.title} ${p.highlight}`}
              width={p.w}
              height={p.h}
              className="w-full h-auto block"
              style={{ filter: "drop-shadow(0 0 40px rgba(212, 175, 106,0.35))" }}
            />
          </div>
        );
        const body = (
          <div>
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
                {p.icon}
              </div>
              <span className="mono" style={{ fontSize: 11.5, letterSpacing: "0.05em", textTransform: "uppercase", color: "var(--amber)" }}>
                Problem {p.num}
              </span>
            </div>
            <h2 style={{ fontSize: "clamp(1.5rem, 2.8vw, 2rem)", marginBottom: 16 }}>
              {p.title} <span className="accent">{p.highlight}</span>
            </h2>
            <p style={{ color: "var(--warm-grey-dim)", fontSize: "1.02rem", lineHeight: 1.75, marginBottom: 24 }}>
              {p.detail}
            </p>
            <div className="flex flex-col gap-2.5">
              {p.bullets.map((b) => (
                <div key={b} className="flex items-center gap-2.5" style={{ fontSize: "0.95rem", color: "var(--warm-grey-dim)" }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="var(--amber)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width={16} height={16}>
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  {b}
                </div>
              ))}
            </div>
          </div>
        );

        return (
          <section key={p.slug} id={p.slug} className="py-14" style={{ scrollMarginTop: 96 }}>
            <div className="mx-auto px-7" style={{ maxWidth: 1180 }}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
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
      })}
    </div>
  );
}
