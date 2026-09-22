import type { Lang } from "@/lib/i18n";

const STEPS: Record<Lang, string[]> = {
  de: ["Sprache + Video", "Strukturierte Daten", "Schematische Zeichnung", "Fertige Unterlagen"],
  es: ["Voz + vídeo", "Datos estructurados", "Esquema", "Documentación lista"],
};

/**
 * Wiederkehrender visueller Beleg für das Grundprinzip der Seite: aus dem
 * Rundgang werden nacheinander Daten, eine Zeichnung und Unterlagen. Bewusst
 * ohne Kartenrahmen und ohne Bewegung — nur eine leichte mono Kette, die auf
 * mehreren Sections auftaucht, statt einmalig groß erklärt zu werden.
 */
export default function FlowSpine({ lang }: { lang: Lang }) {
  const steps = STEPS[lang];
  return (
    <div
      className="mono flex flex-wrap items-center justify-center"
      style={{ fontSize: 11.5, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--warm-grey-faint)", gap: 8 }}
    >
      {steps.map((s, i) => (
        <span key={s} className="inline-flex items-center" style={{ gap: 8 }}>
          <span style={{ color: i === steps.length - 1 ? "var(--amber)" : "var(--warm-grey-faint)" }}>{s}</span>
          {i < steps.length - 1 && (
            <svg viewBox="0 0 24 24" fill="none" stroke="var(--amber)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width={12} height={12} style={{ opacity: 0.6 }}>
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          )}
        </span>
      ))}
    </div>
  );
}
