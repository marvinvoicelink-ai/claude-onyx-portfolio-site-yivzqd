"use client";

import Link from "next/link";
import { lp, type Lang } from "@/lib/i18n";
import { trackContactClick } from "@/lib/trackLead";

const TEXT: Record<
  Lang,
  {
    kicker: string;
    heading: string;
    sub: string;
    price: string;
    perObject: string;
    cta: string;
    cards: { title: string; text: string; highlight: boolean }[];
    whyTitle: string;
    whyText: string;
    volume: string;
  }
> = {
  de: {
    kicker: "Preismodell",
    heading: "Du zahlst pro Objekt. Nicht für den nächsten Softwarevertrag.",
    sub: "Den genauen Preis pro Objekt besprechen wir im kostenlosen Erstgespräch — abhängig vom Objekt und davon, ob du regelmäßig lieferst.",
    price: "Preis auf Anfrage",
    perObject: "pro Objekt",
    cta: "Objekt ausprobieren",
    cards: [
      { title: "Exposé", text: "Aus den erfassten Daten und dem vorhandenen Material wird ein Exposé erstellt.", highlight: false },
      {
        title: "Scroll-Website",
        text: "Der Agent baut eine Scroll-Website für das Objekt. Du entscheidest anschließend selbst, wann sie veröffentlicht wird.",
        highlight: false,
      },
      { title: "Exposé + Scroll-Website", text: "Beide Ergebnisse aus derselben Erfassung vor Ort.", highlight: true },
    ],
    whyTitle: "Warum pro Objekt?",
    whyText: "Du zahlst, wenn Onyx.AI für dich etwas erstellt — nicht jeden Monat dafür, dass ein Account existiert.",
    volume: "Wer regelmäßig liefert, zahlt weniger.",
  },
  es: {
    kicker: "Modelo de precios",
    heading: "Pagas por inmueble. No por el próximo contrato de software.",
    sub: "El precio exacto por inmueble lo vemos en la primera conversación gratuita, según el inmueble y según si nos envías encargos con regularidad.",
    price: "Precio a consultar",
    perObject: "por inmueble",
    cta: "Probar con un inmueble",
    cards: [
      { title: "Dossier", text: "Con los datos registrados y el material disponible se crea un dossier del inmueble.", highlight: false },
      {
        title: "Web con scroll",
        text: "El agente construye una web con scroll para el inmueble. Después decides tú cuándo se publica.",
        highlight: false,
      },
      { title: "Dossier + web con scroll", text: "Los dos resultados a partir de la misma captura in situ.", highlight: true },
    ],
    whyTitle: "¿Por qué por inmueble?",
    whyText: "Pagas cuando Onyx.AI crea algo para ti, no cada mes por tener una cuenta abierta.",
    volume: "Quien envía encargos con regularidad, paga menos.",
  },
};

export default function ErfassungPreise({ lang }: { lang: Lang }) {
  const t = TEXT[lang];
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
          <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", maxWidth: "28ch", marginLeft: "auto", marginRight: "auto", marginBottom: 12 }}>
            {t.heading}
          </h2>
          <p className="mx-auto" style={{ color: "var(--warm-grey-faint)", fontSize: "0.92rem", maxWidth: "48ch" }}>
            {t.sub}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {t.cards.map((c) => (
            <div
              key={c.title}
              className="beam-border rounded-2xl px-6 py-7 flex flex-col alive-hover-card"
              style={{
                background: c.highlight ? "var(--amber-soft)" : "var(--near-black-2)",
                border: c.highlight ? "1px solid rgba(232, 163, 61,0.45)" : "1px solid var(--hairline)",
              }}
            >
              <h3 style={{ fontSize: "1.1rem", marginBottom: 10 }}>{c.title}</h3>
              <div className="mono" style={{ marginBottom: 14 }}>
                <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--amber)", lineHeight: 1.3 }}>{t.price}</div>
                <div style={{ fontSize: "0.85rem", fontWeight: 500, color: "var(--warm-grey-dim)" }}>{t.perObject}</div>
              </div>
              <p style={{ color: "var(--warm-grey-dim)", fontSize: "0.94rem", lineHeight: 1.6, marginBottom: 24, flex: 1 }}>
                {c.text}
              </p>
              <Link
                href={lp(lang, "/kontakt")}
                onClick={trackContactClick}
                className={`inline-flex items-center justify-center gap-2 rounded-[10px] px-5 py-3 font-semibold ${c.highlight ? "btn-amber" : "btn-ghost"}`}
                style={
                  c.highlight
                    ? { background: "var(--amber)", color: "#161104", fontSize: 14.5 }
                    : { background: "transparent", color: "var(--warm-grey)", border: "1px solid var(--hairline)", fontSize: 14.5 }
                }
              >
                {t.cta}
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mx-auto" style={{ maxWidth: 560 }}>
          <h3 style={{ fontSize: "1.05rem", marginBottom: 8 }}>{t.whyTitle}</h3>
          <p style={{ color: "var(--warm-grey-dim)", fontSize: "0.96rem", lineHeight: 1.65, marginBottom: 10 }}>{t.whyText}</p>
          <p className="mono" style={{ color: "var(--warm-grey-faint)", fontSize: "0.86rem" }}>
            {t.volume}
          </p>
        </div>
      </div>
    </section>
  );
}
