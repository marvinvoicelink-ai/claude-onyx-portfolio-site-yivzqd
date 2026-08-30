"use client";

import { openContactForm } from "@/lib/contactModal";

/**
 * Schlanker, zentrierter CTA-Button, der zwischen den Abschnitten steht und
 * — wie alle CTAs — das Kontakt-Formular-Overlay oeffnet. `source` landet
 * beim abgeschickten Formular als content_name am Lead, damit in Facebook zu
 * sehen ist, welcher Abschnitt die Anfrage gebracht hat.
 */
export default function InlineCta({
  label = "Jetzt Kontakt aufnehmen",
  source,
  sub,
}: {
  label?: string;
  source: string;
  sub?: string;
}) {
  return (
    <section className="py-8">
      <div className="mx-auto px-7 text-center" style={{ maxWidth: 720 }}>
        <button
          type="button"
          onClick={() => openContactForm(source)}
          className="inline-flex items-center gap-2.5 rounded-[10px] px-7 py-4 font-semibold btn-amber"
          style={{ background: "var(--amber)", color: "#12141a", fontSize: "15.5px" }}
        >
          {label}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width={16} height={16}>
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>
        {sub && (
          <div className="mono mt-4" style={{ fontSize: 12.5, color: "var(--warm-grey-faint)" }}>
            {sub}
          </div>
        )}
      </div>
    </section>
  );
}
