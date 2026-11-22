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
    kicker: "Was wir machen",
    heading: "Vom Rohbau bis zur Anfrage. Alles aus einer Hand.",
    zeitraffer: {
      titel: "Vom Rohbau bis fertig – im Zeitraffer",
      text: "Vom leeren Grundstück bis zum fertig eingerichteten Haus in einem Film: Aushub, Rohbau, Fassade, eingerichtete Räume. Aus Handyfotos deines Grundstücks oder Rohbaus – so verkaufst du schon, bevor das Haus steht.",
      cta: "So ein Video für mein Objekt anfragen",
      aria: "Zeitraffer einer Finca auf Mallorca vom Grundstück bis zum fertigen Haus",
    },
    karten: [
      {
        titel: "Mit KI fertig eingerichtet",
        text: "Leere Räume und Baustellen werden zu fertig eingerichteten Zimmern. Fenster, Böden und Maße bleiben echt – jede Visualisierung ist gekennzeichnet, die echten Fotos stehen daneben.",
        cta: "Mit einem Objekt ausprobieren",
        topic: "objekt",
        quelle: "Angebot-Einrichtung",
      },
      {
        titel: "3D-Website zum Durchgehen",
        text: "Eine eigene Website pro Objekt: Beim Scrollen geht der Käufer am Handy durch jeden Raum und sieht alle Daten – Fläche, Zimmer, Lage, Preis.",
        cta: "Website anfragen",
        topic: "scrollflug",
        quelle: "Angebot-Scrollflug",
        beispiel: "Beispiel ansehen ↗",
      },
      {
        titel: "Anzeigen, die man anschaut",
        text: "Unsere Videos laufen als Facebook- und Instagram-Anzeige bei Menschen, die gerade eine Immobilie suchen – und führen direkt auf die 3D-Website.",
        punkte: ["Läuft in deinem eigenen Werbekonto", "Das Budget legst du selbst fest", "Anfragen gehen direkt an dich"],
        cta: "Anzeigen besprechen",
        topic: "objekt",
        quelle: "Angebot-Anzeigen",
      },
    ],
  },
  es: {
    kicker: "Lo que hacemos",
    heading: "De la obra a la consulta. Todo de una sola mano.",
    zeitraffer: {
      titel: "De la obra al final, en timelapse",
      text: "Del terreno vacío a la casa amueblada en un solo vídeo: excavación, obra, fachada, estancias amuebladas. A partir de fotos del móvil de tu terreno o de la obra: así vendes antes de que la casa exista.",
      cta: "Pedir un vídeo así para mi inmueble",
      aria: "Timelapse de una finca en Mallorca, del terreno a la casa terminada",
    },
    karten: [
      {
        titel: "Amueblado con IA",
        text: "Estancias vacías y obras se convierten en espacios amueblados. Ventanas, suelos y medidas siguen siendo reales: cada visualización está marcada y las fotos reales van al lado.",
        cta: "Probar con un inmueble",
        topic: "objekt",
        quelle: "Angebot-Einrichtung",
      },
      {
        titel: "Web 3D para recorrer",
        text: "Una web propia para cada inmueble: al hacer scroll, el comprador recorre cada estancia desde el móvil y ve todos los datos: superficie, habitaciones, ubicación, precio.",
        cta: "Pedir la web",
        topic: "scrollflug",
        quelle: "Angebot-Scrollflug",
        beispiel: "Ver ejemplo ↗",
      },
      {
        titel: "Anuncios que se miran",
        text: "Nuestros vídeos se publican como anuncios en Facebook e Instagram para personas que están buscando vivienda, y llevan directamente a la web 3D.",
        punkte: ["En tu propia cuenta publicitaria", "El presupuesto lo decides tú", "Las consultas te llegan directamente"],
        cta: "Hablar de anuncios",
        topic: "objekt",
        quelle: "Angebot-Anzeigen",
      },
    ],
  },
};

const knopf = "inline-flex items-center gap-2 rounded-[10px] px-5 py-3 font-semibold";

/**
 * Das Angebot direkt unter dem Hero, nach der Kernbotschaft (CLAUDE.md):
 * Zeitraffer groß (mit dem echten Film), darunter KI-Einrichtung,
 * 3D-Website zum Durchgehen und Anzeigen.
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
