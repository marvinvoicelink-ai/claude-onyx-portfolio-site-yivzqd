import TrackedCtaLink from "@/components/TrackedCtaLink";
import type { ContactTopic } from "@/lib/contactModal";
import { lp, type Lang } from "@/lib/i18n";

/** Die eigenständige Scrollflug-Website einer Finca - ein echtes Beispiel, kein Mock-up. */
const SCROLLFLUG_BEISPIEL = "https://finca-marokkanischer-stil.vercel.app/";

type Karte = {
  titel: string;
  text: string;
  punkte?: string[];
  cta: string;
  topic: ContactTopic;
  quelle: string;
  beispiel?: string;
};

const TEXT: Record<
  Lang,
  {
    kicker: string;
    heading: string;
    zeitraffer: { titel: string; text: string; cta: string; aria: string };
    karten: Karte[];
  }
> = {
  de: {
    kicker: "Was wir verkaufen",
    heading: "Vier Leistungen. Einzeln buchbar oder alles aus einer Hand.",
    zeitraffer: {
      titel: "Zeitraffer-Video",
      text: "Vom leeren Grundstück bis zur fertigen Finca in einem Film: Aushub, Fundament, Rohbau, fertiges Haus. Für deine Website, Social Media und das Exposé. Aus Fotos deines Grundstücks oder Rohbaus.",
      cta: "So ein Video für mein Projekt anfragen",
      aria: "Zeitraffer einer Finca auf Mallorca vom Grundstück bis zum fertigen Haus",
    },
    karten: [
      {
        titel: "Scrollflug-Website",
        text: "Eine eigene Website pro Objekt: Beim Scrollen fliegt die Kamera durchs fertige Haus. Per Link verschickt, auf dem Handy wie am Rechner.",
        cta: "Website anfragen",
        topic: "scrollflug",
        quelle: "Angebot-Scrollflug",
        beispiel: "Beispiel ansehen ↗",
      },
      {
        titel: "ONYX Studio – die Software",
        text: "Die komplette Software für dein Büro. Ein Konto, alles drin:",
        punkte: [
          "Makler: Objekt einsprechen, Exposé und Scrollflug-Website daraus",
          "Bauträger: Rohbau fertig eingerichtet zeigen, Zeitraffer, Verkaufsstand je Einheit",
        ],
        cta: "Mit einem Objekt ausprobieren",
        topic: "objekt",
        quelle: "Angebot-Software",
      },
      {
        titel: "Software nach Maß",
        text: "Für Bauunternehmen und Makler bauen wir eigene Software nach euren Abläufen: Portale, Dashboards, interne Werkzeuge. Fertig übergeben – Code und Daten gehören euch.",
        cta: "Infogespräch vereinbaren",
        topic: "info",
        quelle: "Angebot-Individuell",
      },
    ],
  },
  es: {
    kicker: "Lo que ofrecemos",
    heading: "Cuatro servicios. Por separado o todo en uno.",
    zeitraffer: {
      titel: "Vídeo timelapse",
      text: "Del terreno vacío a la finca terminada en un solo vídeo: excavación, cimientos, obra, casa terminada. Para tu web, redes sociales y el dossier. A partir de fotos de tu terreno o de la obra.",
      cta: "Pedir un vídeo así para mi proyecto",
      aria: "Timelapse de una finca en Mallorca, del terreno a la casa terminada",
    },
    karten: [
      {
        titel: "Web con vuelo por la casa",
        text: "Una web propia para cada inmueble: al hacer scroll, la cámara recorre la casa terminada. Se envía por enlace y funciona en el móvil y en el ordenador.",
        cta: "Pedir la web",
        topic: "scrollflug",
        quelle: "Angebot-Scrollflug",
        beispiel: "Ver ejemplo ↗",
      },
      {
        titel: "ONYX Studio – el software",
        text: "El software completo para tu oficina. Una cuenta, todo incluido:",
        punkte: [
          "Agencias: dicta el inmueble y obtén el dossier y la web con vuelo",
          "Promotoras: enseña la obra ya amueblada, timelapse y estado de venta por unidad",
        ],
        cta: "Probar con un inmueble",
        topic: "objekt",
        quelle: "Angebot-Software",
      },
      {
        titel: "Software a medida",
        text: "Para constructoras y agencias desarrollamos software propio según vuestros procesos: portales, paneles, herramientas internas. Entregado por completo: el código y los datos son vuestros.",
        cta: "Reservar llamada informativa",
        topic: "info",
        quelle: "Angebot-Individuell",
      },
    ],
  },
};

const knopf = "inline-flex items-center gap-2 rounded-[10px] px-5 py-3 font-semibold";

/**
 * Das Angebot direkt unter dem Hero: Zeitraffer-Video groß (mit dem echten
 * Film), darunter Scrollflug-Website, die Software und Software nach Maß.
 * Jeder Knopf öffnet das Anfrageformular mit passendem Thema.
 */
export default function AngebotSection({ lang }: { lang: Lang }) {
  const t = TEXT[lang];
  const kontakt = lp(lang, "/kontakt");

  return (
    <section id="angebot" className="py-16" style={{ background: "var(--near-black-2)" }}>
      <div className="mx-auto px-7" style={{ maxWidth: 1180 }}>
        <span
          className="mono inline-flex items-center gap-2 mb-4"
          style={{ fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--amber)" }}
        >
          <span style={{ opacity: 0.7 }}>§</span> {t.kicker}
        </span>
        <h2 style={{ fontSize: "clamp(1.5rem, 2.8vw, 2rem)", marginBottom: 32, maxWidth: "26ch" }}>{t.heading}</h2>

        <div className="grid grid-cols-1 lg:grid-cols-[1.35fr_1fr] gap-8 lg:gap-12 items-center mb-10">
          <div
            className="beam-border rounded-2xl overflow-hidden relative"
            style={{ aspectRatio: "16 / 9", background: "var(--near-black)" }}
          >
            {/* Der Hinweis "KI-Visualisierung" steht im Film selbst. */}
            <video
              src="/generated/zeitraffer-finca.mp4"
              poster="/generated/zeitraffer-finca-poster.jpg"
              autoPlay
              muted
              loop
              playsInline
              aria-label={t.zeitraffer.aria}
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <div>
            <div className="mono" style={{ fontSize: 13, color: "var(--amber)", marginBottom: 8 }}>
              01
            </div>
            <h3 style={{ fontSize: "clamp(1.3rem, 2.2vw, 1.6rem)", marginBottom: 12 }}>{t.zeitraffer.titel}</h3>
            <p style={{ color: "var(--warm-grey-dim)", fontSize: "1.02rem", lineHeight: 1.7, marginBottom: 20 }}>{t.zeitraffer.text}</p>
            <TrackedCtaLink
              href={kontakt}
              source="Angebot-Zeitraffer"
              topic="zeitraffer"
              className={`${knopf} btn-amber`}
              style={{ background: "var(--amber)", color: "#12141a", fontSize: 15 }}
            >
              {t.zeitraffer.cta}
            </TrackedCtaLink>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {t.karten.map((k, i) => (
            <div
              key={k.titel}
              className="beam-border rounded-xl p-6 flex flex-col"
              style={{ background: "var(--near-black)", border: "1px solid var(--hairline)" }}
            >
              <div className="mono" style={{ fontSize: 13, color: "var(--amber)", marginBottom: 8 }}>
                {String(i + 2).padStart(2, "0")}
              </div>
              <h3 style={{ fontSize: "1.2rem", marginBottom: 10 }}>{k.titel}</h3>
              <p style={{ color: "var(--warm-grey-dim)", fontSize: "0.95rem", lineHeight: 1.65 }}>{k.text}</p>
              {k.punkte && (
                <ul className="mt-3 space-y-2" style={{ color: "var(--warm-grey-dim)", fontSize: "0.92rem", lineHeight: 1.55 }}>
                  {k.punkte.map((p) => (
                    <li key={p} className="flex gap-2">
                      <span style={{ color: "var(--amber)" }}>›</span>
                      {p}
                    </li>
                  ))}
                </ul>
              )}
              <div className="mt-auto pt-5 flex flex-wrap items-center gap-3">
                <TrackedCtaLink
                  href={kontakt}
                  source={k.quelle}
                  topic={k.topic}
                  className={`${knopf} btn-ghost`}
                  style={{ background: "transparent", color: "var(--warm-grey)", border: "1px solid var(--hairline)", fontSize: 14 }}
                >
                  {k.cta}
                </TrackedCtaLink>
                {k.beispiel && (
                  <a
                    href={SCROLLFLUG_BEISPIEL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mono"
                    style={{ fontSize: 13, color: "var(--amber)" }}
                  >
                    {k.beispiel}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
