import type { ReactNode } from "react";

/** Zentrierter Seitenkopf der Unterseiten: Kicker, H1, Einleitung. */
export default function PageIntro({ kicker, title, children }: { kicker: string; title: string; children?: ReactNode }) {
  return (
    <section className="py-16">
      <div className="mx-auto px-7 text-center" style={{ maxWidth: 760 }}>
        <span
          className="mono block mb-4"
          style={{ fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--amber)" }}
        >
          {kicker}
        </span>
        <h1 style={{ fontSize: "clamp(1.9rem, 4vw, 2.6rem)", marginBottom: children ? 16 : 0 }}>{title}</h1>
        {children}
      </div>
    </section>
  );
}

export function IntroText({ children }: { children: ReactNode }) {
  return <p style={{ color: "var(--warm-grey-dim)", fontSize: "1.02rem", lineHeight: 1.7 }}>{children}</p>;
}
