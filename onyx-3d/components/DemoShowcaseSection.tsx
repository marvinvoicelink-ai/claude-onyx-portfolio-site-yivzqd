"use client";

import { openContactForm } from "@/lib/contactModal";

const bullets = [
  "Demo passend zu deiner Branche, nicht generisch",
  "Du siehst das System live, keine Blackbox",
  "Erst danach entscheidest du dich für ein Angebot",
];

/** Trust block: a working demo already exists per industry and gets shown live in the free Erstgespräch. */
export default function DemoShowcaseSection({ blatt }: { blatt?: string }) {
  return (
    <section className="py-10">
      <div className="mx-auto px-7 text-center" style={{ maxWidth: 780 }}>
        <span
          className="mono inline-flex items-center gap-2 mb-4"
          style={{ fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--amber)" }}
        >
          <span style={{ opacity: 0.7 }}>§</span> {blatt ? `Blatt ${blatt} / Dein Erstgespräch` : "Dein Erstgespräch"}
        </span>
        <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", marginBottom: 14 }}>
          Du siehst dein System, bevor du unterschreibst.
        </h2>
        <p className="mx-auto" style={{ color: "var(--warm-grey-dim)", fontSize: "1.02rem", lineHeight: 1.7, marginBottom: 8, maxWidth: "58ch" }}>
          Für die meisten Branchen haben wir längst eine Demoversion gebaut.
          Im kostenlosen Erstgespräch zeigen wir sie dir live, passend zu
          deinem Bereich. Du siehst also, was du bekommst, bevor du dich
          entscheidest.
        </p>
      </div>

      {/* Die zwei Tablet-Screens standen hier ein zweites Mal: sie sind
          weiter oben schon in "Aus Tool-Chaos wird ein System" zu sehen. Der
          Block bleibt Text, damit dieselben Bilder die Seite nicht doppeln. */}
      <div className="mx-auto px-7 text-center" style={{ maxWidth: 780, marginTop: 24 }}>
        <ul className="flex flex-col sm:flex-row sm:justify-center gap-x-8 gap-y-2.5 mb-6">
          {bullets.map((b) => (
            <li key={b} className="flex items-center justify-center gap-2.5" style={{ fontSize: "0.96rem", color: "var(--warm-grey-dim)", lineHeight: 1.5 }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="var(--amber)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width={15} height={15} style={{ flexShrink: 0 }}>
                <path d="M20 6 9 17l-5-5" />
              </svg>
              {b}
            </li>
          ))}
        </ul>

        <a
          href="#kontakt"
          onClick={(e) => { e.preventDefault(); openContactForm("Erstgespraech-CTA"); }}
          className="inline-flex items-center gap-2.5 rounded-[10px] px-6 py-4 font-semibold btn-amber"
          style={{ background: "var(--amber)", color: "#12141a", fontSize: 15.5 }}
        >
          Kostenloses Erstgespräch sichern
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width={14} height={14}>
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </a>
      </div>
    </section>
  );
}
