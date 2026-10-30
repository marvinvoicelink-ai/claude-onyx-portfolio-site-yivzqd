import type { Lang } from "@/lib/i18n";

/**
 * Referenz direkt unter dem Angebot: Quina García (Immobilienbüro auf
 * Mallorca) hat bei Onyx Software, Zeitraffer- und Scroll-Through-Video
 * gekauft. Das Logo hat Marvin geschickt.
 *
 * Ein Zitat steht hier erst, wenn Quina García den Wortlaut freigegeben hat -
 * ein Satz, den wir ihr in den Mund legen, wäre eine erfundene Bewertung.
 * Bis dahin bleibt ZITAT null und der Block zeigt nur die Fakten.
 */
const ZITAT: Record<Lang, string> | null = null;

const TEXT: Record<
  Lang,
  { kicker: string; heading: string; text: string; gekauft: string; produkte: string[]; logoAlt: string }
> = {
  de: {
    kicker: "Referenz · Mallorca",
    heading: "Quina García setzt auf ONYX.",
    text: "Das Immobilienbüro auf Mallorca verkauft fertige Fincas und begleitet Neubauten nach Maß – und zeigt seine Objekte heute mit ONYX.",
    gekauft: "Bei uns gekauft",
    produkte: ["ONYX Studio – die Software", "Zeitraffer-Video", "Scroll-Through-Video"],
    logoAlt: "Quina García – gestió immobiliària",
  },
  es: {
    kicker: "Referencia · Mallorca",
    heading: "Quina García confía en ONYX.",
    text: "La inmobiliaria de Mallorca vende fincas terminadas y acompaña obras nuevas a medida, y hoy presenta sus inmuebles con ONYX.",
    gekauft: "Ha contratado",
    produkte: ["ONYX Studio – el software", "Vídeo timelapse", "Vídeo 3D con scroll"],
    logoAlt: "Quina García – gestió immobiliària",
  },
};

export default function ReferenzQuina({ lang }: { lang: Lang }) {
  const t = TEXT[lang];
  const zitat = ZITAT?.[lang] ?? null;

  return (
    <section className="py-14">
      <div className="mx-auto px-7" style={{ maxWidth: 1180 }}>
        <div
          className="beam-border rounded-2xl p-6 md:p-10 grid grid-cols-1 md:grid-cols-[minmax(0,300px)_1fr] gap-8 md:gap-12 items-center"
          style={{ background: "var(--near-black-2)", border: "1px solid var(--hairline)" }}
        >
          {/* Das Logo hat dunkle Schrift - deshalb auf heller Fläche, wie auf Papier. */}
          <div className="rounded-xl flex items-center justify-center p-6" style={{ background: "var(--warm-grey)" }}>
            <img
              src="/logos/quina-garcia.webp"
              alt={t.logoAlt}
              width={560}
              height={434}
              loading="lazy"
              decoding="async"
              style={{ width: "100%", maxWidth: 240, height: "auto" }}
            />
          </div>

          {/* .text-left: Kopf und Absatz bleiben links neben dem Logo statt mittig (siehe globals.css). */}
          <div className="text-left">
            <span
              className="mono inline-flex items-center gap-2 mb-4"
              style={{ fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--amber)" }}
            >
              <span style={{ opacity: 0.7 }}>§</span> {t.kicker}
            </span>
            <h2 style={{ fontSize: "clamp(1.5rem, 2.8vw, 2rem)", marginBottom: 12 }}>{t.heading}</h2>
            <p style={{ color: "var(--warm-grey-dim)", fontSize: "1.02rem", lineHeight: 1.7, marginBottom: 20, maxWidth: "58ch" }}>
              {t.text}
            </p>

            {zitat && (
              <blockquote
                style={{
                  borderLeft: "2px solid var(--amber)",
                  paddingLeft: 16,
                  marginBottom: 20,
                  fontSize: "1.05rem",
                  lineHeight: 1.65,
                  color: "var(--warm-grey)",
                }}
              >
                „{zitat}“
              </blockquote>
            )}

            <div className="mono" style={{ fontSize: 12, color: "var(--warm-grey-faint)", marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.08em" }}>
              {t.gekauft}
            </div>
            <ul className="flex flex-wrap gap-2">
              {t.produkte.map((p) => (
                <li
                  key={p}
                  className="rounded-full px-3.5 py-1.5"
                  style={{ border: "1px solid var(--hairline)", fontSize: 14, color: "var(--warm-grey)" }}
                >
                  <span style={{ color: "var(--amber)", marginRight: 6 }}>✓</span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
