import type { ReactNode } from "react";

/**
 * Bildrahmen mit leuchtender Silberkante. Bewusst als eigene Komponente,
 * damit Hero-Bilder auf den Detailseiten und in den Teaser-Sections
 * denselben Rahmen bekommen und nicht jede Section ihren eigenen baut.
 */
export default function GlowCard({ children }: { children: ReactNode }) {
  return (
    <div
      className="rounded-2xl p-5 sm:p-7 flex items-center justify-center on-dark"
      style={{
        background:
          "linear-gradient(160deg, rgba(203, 203, 201,0.07) 0%, rgba(17,17,17,0) 55%), var(--near-black-2)",
        border: "1px solid var(--silver-line)",
        boxShadow:
          "0 0 0 1px rgba(203, 203, 201,0.07), 0 0 36px -6px rgba(203, 203, 201,0.34), 0 18px 50px -24px rgba(0,0,0,0.85)",
      }}
    >
      {children}
    </div>
  );
}
