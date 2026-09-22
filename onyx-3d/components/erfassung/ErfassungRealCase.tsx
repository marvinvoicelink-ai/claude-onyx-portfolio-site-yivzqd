"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import type { Lang } from "@/lib/i18n";

const LIVE_URL = "https://mellow-tartufo-47ef95.netlify.app/";

const TEXT: Record<Lang, { kicker: string; heading: string; tag: string; desc: string; bullets: string[]; link: string }> = {
  de: {
    kicker: "Kein Konzept — bereits gebaut",
    heading: "So sieht das fertige Ergebnis aus.",
    tag: "Live-Beispiel · Mallorca Fincas",
    desc: "Für Mallorca Fincas haben wir die Präsentation einer Finca im Osten Mallorcas als Scroll-Website umgesetzt: von der Ankunft über Bauweise und Grundriss bis zu Suite, Bädern, Außenbereich und Abendansichten — alles beim Scrollen durchs Objekt. Das Video links ist aus den echten Bildern dieser Seite geschnitten.",
    bullets: [
      "Von der Ankunft bis zur Dachterrasse in einer durchgängigen Kamerafahrt",
      "Eigene Abschnitte für Bauweise, Grundriss, Suite, Bäder und Technik/Autarkie",
      "Für Smartphone und Desktop gleichermaßen gebaut",
    ],
    link: "Live-Beispiel ansehen ↗",
  },
  es: {
    kicker: "No es un concepto: ya está construido",
    heading: "Así queda el resultado final.",
    tag: "Ejemplo real · Mallorca Fincas",
    desc: "Para Mallorca Fincas convertimos la presentación de una finca en el este de Mallorca en una web con scroll: desde la llegada, pasando por la construcción y la distribución, hasta la suite, los baños, el exterior y las vistas al atardecer, todo mientras haces scroll por el inmueble. El vídeo de la izquierda está montado con las imágenes reales de esa web.",
    bullets: [
      "Desde la llegada hasta la azotea en un único recorrido de cámara",
      "Secciones propias para construcción, distribución, suite, baños y técnica/autonomía",
      "Pensada tanto para móvil como para ordenador",
    ],
    link: "Ver el ejemplo en vivo ↗",
  },
};

/**
 * Echtes, live erreichbares Ergebnis statt nur der abstrakten Demo weiter
 * oben: eine bereits gebaute Scroll-Website (Finca Sant Salvador I,
 * Mallorca), das Video ist aus den echten Frames der Kamerafahrt dieser
 * Seite geschnitten (kein Stockmaterial, keine erfundene Aufnahme).
 */
export default function ErfassungRealCase({ lang }: { lang: Lang }) {
  const t = TEXT[lang];
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
            <span style={{ opacity: 0.7 }}>§</span> {t.kicker}
          </span>
          <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", maxWidth: "28ch", marginLeft: "auto", marginRight: "auto" }}>
            {t.heading}
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
              {t.tag}
            </span>
            <h3 style={{ fontSize: "1.2rem", marginBottom: 6 }}>Finca Sant Salvador I</h3>
            <p style={{ color: "var(--warm-grey-dim)", fontSize: "1rem", lineHeight: 1.75, marginBottom: 20 }}>
              {t.desc}
            </p>
            <ul className="flex flex-col gap-2.5 mb-6">
              {t.bullets.map((b) => (
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
              {t.link}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
