import Image from "next/image";
import { kiAgenten } from "@/lib/kiAgenten";

/**
 * One full row per agent (id-anchored so the homepage hint can deep-link
 * straight to it), image alternating sides for rhythm — same pattern as
 * ProblemsDetail/DifferentiatorsDetail.
 */
export default function KiAgentenDetail() {
  return (
    <div>
      {kiAgenten.map((a, i) => {
        const imageRight = i % 2 === 1;
        const media = (
          <div className="relative flex items-center justify-center">
            <Image
              src={a.image}
              alt={`${a.title} ${a.subtitle}`}
              width={a.w}
              height={a.h}
              className="w-full h-auto block rounded-2xl"
              style={{ filter: "drop-shadow(0 0 40px rgba(232,163,61,0.35))" }}
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
                  border: "1px solid rgba(232,163,61,0.3)",
                }}
              >
                {a.icon}
              </div>
              <span className="mono" style={{ fontSize: 11.5, letterSpacing: "0.05em", textTransform: "uppercase", color: "var(--amber)" }}>
                Agent {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <h2 style={{ fontSize: "clamp(1.5rem, 2.8vw, 2rem)", marginBottom: 16 }}>{a.title}</h2>
            <p style={{ color: "var(--warm-grey-dim)", fontSize: "1.02rem", lineHeight: 1.75, marginBottom: 24 }}>
              {a.detail}
            </p>
            <div className="flex flex-col gap-2.5">
              {a.bullets.map((b) => (
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
          <section key={a.slug} id={a.slug} className="py-14" style={{ scrollMarginTop: 96 }}>
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
