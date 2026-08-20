import Image from "next/image";
import { differentiators } from "@/lib/differentiators";

/**
 * The detailed explanation each homepage differentiator-card link lands
 * on — one full row per point (id-anchored so the homepage can deep-link
 * straight to it), image alternating sides for rhythm, real bullets
 * instead of just repeating the homepage's one-line teaser.
 */
export default function DifferentiatorsDetail() {
  return (
    <div>
      {differentiators.map((d, i) => {
        const imageRight = i % 2 === 1;
        const media = (
          <div className="relative flex items-center justify-center">
            <Image
              src={d.image}
              alt={`${d.title} ${d.subtitle}`}
              width={d.w}
              height={d.h}
              className="w-full h-auto block"
              style={{ filter: "drop-shadow(0 0 40px rgba(212, 175, 106,0.35))" }}
            />
          </div>
        );
        const body = (
          <div>
            <span
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5 mono"
              style={{
                fontSize: 11.5,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                color: "var(--amber)",
                background: "var(--amber-soft)",
                border: "1px solid rgba(212, 175, 106,0.3)",
              }}
            >
              Unterschied {String(i + 1).padStart(2, "0")}
            </span>
            <h2 style={{ fontSize: "clamp(1.5rem, 2.8vw, 2rem)", marginBottom: 16 }}>{d.title}</h2>
            <p style={{ color: "var(--warm-grey-dim)", fontSize: "1.02rem", lineHeight: 1.75, marginBottom: 24 }}>
              {d.detail}
            </p>
            <div className="flex flex-col gap-2.5">
              {d.bullets.map((b) => (
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
          <section key={d.slug} id={d.slug} className="py-14" style={{ scrollMarginTop: 96 }}>
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
