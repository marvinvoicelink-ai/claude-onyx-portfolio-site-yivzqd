"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

const LIVE_URL = "https://mellow-tartufo-47ef95.netlify.app/";

/**
 * Echtes, live erreichbares Ergebnis statt nur der abstrakten Demo weiter
 * oben: eine bereits gebaute Scroll-Website (Finca Sant Salvador I,
 * Mallorca), das Video ist aus den echten Frames der Kamerafahrt dieser
 * Seite geschnitten (kein Stockmaterial, keine erfundene Aufnahme).
 */
export default function ErfassungRealCase() {
  const reveal = useScrollReveal<HTMLDivElement>(1);
  const visible = reveal.visible[0];

  return (
    <section className="py-14">
      <div className="mx-auto px-7" style={{ maxWidth: 1180 }}>
        <div className="text-center mb-10">
          <span
            className="mono inline-flex items-center gap-2 mb-4"
            style={{ fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--amber)" }}
          >
            <span style={{ opacity: 0.7 }}>§</span> Kein Konzept — bereits gebaut
          </span>
          <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", maxWidth: "28ch", marginLeft: "auto", marginRight: "auto" }}>
            So sieht das fertige Ergebnis aus.
          </h2>
        </div>

        <div
          ref={reveal.setRef(0)}
          data-reveal-index={0}
          className={`beam-border rounded-[28px] overflow-hidden grid grid-cols-1 lg:grid-cols-2 on-dark ${visible ? "reveal-zoom-visible" : "reveal-zoom-hidden"}`}
          style={{ background: "var(--near-black-2)", border: "1px solid var(--hairline)" }}
        >
          <div className="relative min-h-[240px] aspect-video lg:aspect-auto lg:h-full">
            <video
              src="/generated/finca-scrollflug.mp4"
              poster="/generated/finca-hero-poster.jpg"
              autoPlay
              muted
              loop
              playsInline
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>

          <div className="p-8 md:p-11 flex flex-col justify-center">
            <span
              className="mono inline-flex items-center self-start gap-2 rounded-full px-4 py-1.5 mb-5"
              style={{ fontSize: 11.5, letterSpacing: "0.05em", textTransform: "uppercase", color: "var(--amber)", background: "var(--amber-soft)", border: "1px solid rgba(232, 163, 61,0.3)" }}
            >
              Live-Beispiel · Mallorca Fincas
            </span>
            <h3 style={{ fontSize: "1.2rem", marginBottom: 6 }}>Finca Sant Salvador I</h3>
            <p style={{ color: "var(--warm-grey-dim)", fontSize: "1rem", lineHeight: 1.75, marginBottom: 20 }}>
              Für Mallorca Fincas haben wir die Präsentation einer Finca im
              Osten Mallorcas als Scroll-Website umgesetzt: von der Ankunft
              über Bauweise und Grundriss bis zu Suite, Bädern, Außenbereich
              und Abendansichten — alles beim Scrollen durchs Objekt. Das
              Video links ist aus den echten Bildern dieser Seite
              geschnitten.
            </p>
            <ul className="flex flex-col gap-2.5 mb-6">
              {[
                "Von der Ankunft bis zur Dachterrasse in einer durchgängigen Kamerafahrt",
                "Eigene Abschnitte für Bauweise, Grundriss, Suite, Bäder und Technik/Autarkie",
                "Für Smartphone und Desktop gleichermaßen gebaut",
              ].map((b) => (
                <li key={b} className="flex gap-2.5" style={{ fontSize: "0.92rem", color: "var(--warm-grey-dim)", lineHeight: 1.5 }}>
                  <span style={{ color: "var(--amber)" }}>—</span>
                  {b}
                </li>
              ))}
            </ul>
            <a
              href={LIVE_URL}
              target="_blank"
              rel="noopener"
              className="mono inline-flex items-center gap-1.5 self-start"
              style={{ fontSize: 13, color: "var(--amber)" }}
            >
              Live-Beispiel ansehen ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
