import TrackedCtaLink from "@/components/TrackedCtaLink";
import { lp, type Lang } from "@/lib/i18n";

type Paket = { name: string; fuer: string; preis: string; dazu: string; punkte: string[]; cta: string; quelle: string; hervor?: boolean };

const TEXT: Record<Lang, { kicker: string; heading: string; pakete: Paket[]; fuss: string }> = {
  de: {
    kicker: "Pakete & Preise",
    heading: "Bezahlt wird pro Objekt. Kein Abo, keine Laufzeit.",
    pakete: [
      {
        name: "Pilot",
        fuer: "Dein erstes Objekt",
        preis: "0 €",
        dazu: "Werbebudget zahlst du direkt an Meta",
        punkte: ["3D-Scroll-Website", "Bis zu 8 Räume mit KI eingerichtet", "1 Video: Zeitraffer oder Rundflug", "Anzeige 14 Tage, eingerichtet von uns", "Wenn du an einer Zusammenarbeit interessiert bist – 5 Plätze im Monat"],
        cta: "Pilot-Platz anfragen",
        quelle: "Pakete-Pilot",
        hervor: true,
      },
      {
        name: "Objekt",
        fuer: "Standard",
        preis: "1.290 €",
        dazu: "netto pro Objekt + Werbebudget",
        punkte: ["3D-Scroll-Website", "Bis zu 8 Räume mit KI eingerichtet", "1 Video: Zeitraffer oder Rundflug", "Anzeigen 4 Wochen, eingerichtet und optimiert"],
        cta: "Objekt anfragen",
        quelle: "Pakete-Objekt",
      },
      {
        name: "Objekt Premium",
        fuer: "ab ca. 1,5 Mio. €",
        preis: "2.490 €",
        dazu: "netto pro Objekt + Werbebudget",
        punkte: ["Alles aus „Objekt“", "Zeitraffer und Rundflug", "Website in Deutsch, Englisch und Spanisch", "Anzeigen 8 Wochen"],
        cta: "Premium anfragen",
        quelle: "Pakete-Premium",
      },
      {
        name: "Bauträger-Projekt",
        fuer: "Mehrere Einheiten",
        preis: "ab 4.900 €",
        dazu: "netto + 690 €/Monat Anzeigen + Werbebudget",
        punkte: ["Zeitraffer über die Bauphase", "Projekt-Website mit allen Einheiten", "Mehrere Einheiten mit KI eingerichtet", "Anzeigen während des Vertriebs"],
        cta: "Projekt besprechen",
        quelle: "Pakete-Bautraeger",
      },
    ],
    fuss: "Alle Preise netto, zzgl. Umsatzsteuer, sofern sie anfällt. Die Anzeigen laufen in deinem eigenen Werbekonto – das Budget legst du selbst fest.",
  },
  es: {
    kicker: "Paquetes y precios",
    heading: "Se paga por inmueble. Sin suscripción ni permanencia.",
    pakete: [
      {
        name: "Piloto",
        fuer: "Tu primer inmueble",
        preis: "0 €",
        dazu: "El presupuesto publicitario lo pagas directamente a Meta",
        punkte: ["Web con scroll 3D", "Hasta 8 estancias amuebladas con IA", "1 vídeo: timelapse o vuelo", "Anuncio 14 días, configurado por nosotros", "Si te interesa colaborar · 5 plazas al mes"],
        cta: "Pedir plaza de piloto",
        quelle: "Pakete-Pilot",
        hervor: true,
      },
      {
        name: "Inmueble",
        fuer: "Estándar",
        preis: "1.290 €",
        dazu: "netos por inmueble + presupuesto publicitario",
        punkte: ["Web con scroll 3D", "Hasta 8 estancias amuebladas con IA", "1 vídeo: timelapse o vuelo", "Anuncios 4 semanas, configurados y optimizados"],
        cta: "Pedir inmueble",
        quelle: "Pakete-Objekt",
      },
      {
        name: "Inmueble Premium",
        fuer: "desde aprox. 1,5 M €",
        preis: "2.490 €",
        dazu: "netos por inmueble + presupuesto publicitario",
        punkte: ["Todo lo de «Inmueble»", "Timelapse y vuelo", "Web en alemán, inglés y español", "Anuncios 8 semanas"],
        cta: "Pedir Premium",
        quelle: "Pakete-Premium",
      },
      {
        name: "Proyecto de promotora",
        fuer: "Varias unidades",
        preis: "desde 4.900 €",
        dazu: "netos + 690 €/mes anuncios + presupuesto publicitario",
        punkte: ["Timelapse durante la obra", "Web del proyecto con todas las unidades", "Varias unidades amuebladas con IA", "Anuncios durante la comercialización"],
        cta: "Hablar del proyecto",
        quelle: "Pakete-Bautraeger",
      },
    ],
    fuss: "Todos los precios netos, más IVA si corresponde. Los anuncios funcionan en tu propia cuenta publicitaria: el presupuesto lo decides tú.",
  },
};

/** Preise wie im CRM unter „Skript & Preise“ und in der Preisliste in Drive (Stand 11/2026). */
export default function ImmoPakete({ lang }: { lang: Lang }) {
  const t = TEXT[lang];
  const kontakt = lp(lang, "/kontakt");
  return (
    <section id="preise" className="py-16">
      <div className="mx-auto px-7" style={{ maxWidth: 1180 }}>
        <span className="mono inline-flex items-center gap-2 mb-4" style={{ fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--amber)" }}>
          <span style={{ opacity: 0.7 }}>§</span> {t.kicker}
        </span>
        <h2 style={{ fontSize: "clamp(1.5rem, 2.8vw, 2rem)", marginBottom: 32 }}>{t.heading}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {t.pakete.map((p) => (
            <div
              key={p.name}
              className={`${p.hervor ? "beam-border " : ""}rounded-xl p-6 flex flex-col`}
              style={{ background: p.hervor ? "var(--near-black-2)" : "var(--near-black)", border: `1px solid ${p.hervor ? "var(--amber)" : "var(--hairline)"}` }}
            >
              <div className="mono" style={{ fontSize: 12, color: "var(--warm-grey-faint)", marginBottom: 6 }}>{p.fuer}</div>
              <h3 style={{ fontSize: "1.2rem", marginBottom: 10 }}>{p.name}</h3>
              <div style={{ fontFamily: "var(--font-archivo, inherit)", fontWeight: 800, fontSize: "1.9rem", lineHeight: 1.1, color: p.hervor ? "var(--amber)" : "var(--warm-grey)" }}>{p.preis}</div>
              <div style={{ color: "var(--warm-grey-faint)", fontSize: "0.82rem", marginTop: 4, marginBottom: 16 }}>{p.dazu}</div>
              <ul className="space-y-2 mb-6" style={{ color: "var(--warm-grey-dim)", fontSize: "0.92rem", lineHeight: 1.5 }}>
                {p.punkte.map((x) => (
                  <li key={x} className="flex gap-2">
                    <span style={{ color: "var(--amber)" }}>›</span>
                    {x}
                  </li>
                ))}
              </ul>
              <TrackedCtaLink
                href={kontakt}
                source={p.quelle}
                topic="objekt"
                className={`mt-auto inline-flex items-center justify-center gap-2 rounded-[10px] px-5 py-3 font-semibold ${p.hervor ? "btn-amber" : "btn-ghost"}`}
                style={p.hervor ? { background: "var(--amber)", color: "#12141a", fontSize: 15 } : { background: "transparent", color: "var(--warm-grey)", border: "1px solid var(--hairline)", fontSize: 14 }}
              >
                {p.cta}
              </TrackedCtaLink>
            </div>
          ))}
        </div>
        <p className="mono" style={{ fontSize: 12, color: "var(--warm-grey-faint)", marginTop: 18 }}>{t.fuss}</p>
      </div>
    </section>
  );
}
