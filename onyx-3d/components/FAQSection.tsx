import SectionGlow from "./SectionGlow";
import type { Lang } from "@/lib/i18n";

const FAQS_DE = [
  {
    q: "Was kostet ein System von Onyx?",
    a: "Jedes System ist individuell — deshalb gibt es keinen Katalogpreis. Nach dem ersten Gespräch bekommst du ein klares Konzept mit Festpreis.",
  },
  {
    q: "Wie lange dauert der Bau?",
    a: "Ein fokussiertes Tool kann in wenigen Wochen stehen, ein komplettes CRM dauert länger. Im Erstgespräch bekommst du eine realistische Einschätzung.",
  },
  {
    q: "Muss ich technisch versiert sein?",
    a: "Nein. Du beschreibst deinen Prozess und wir übersetzen ihn in ein System — mit verständlicher Dokumentation zur Übergabe.",
  },
  {
    q: "Ist mein System DSGVO-konform?",
    a: "Ja. Du hostest selbst, in Deutschland bzw. der EU, mit AVV. Keine Daten über fremde Server, die du nicht kontrollierst.",
  },
];

const FAQS_ES = [
  {
    q: "¿Cuánto cuesta un sistema de Onyx?",
    a: "Cada sistema es a medida, por eso no hay precio de catálogo. Después de la primera conversación recibes un concepto claro con precio cerrado.",
  },
  {
    q: "¿Cuánto tarda en construirse?",
    a: "Una herramienta concreta puede estar lista en pocas semanas; un CRM completo lleva más tiempo. En la primera conversación te damos una estimación realista.",
  },
  {
    q: "¿Necesito conocimientos técnicos?",
    a: "No. Tú nos describes tu proceso y nosotros lo convertimos en un sistema, con documentación clara en la entrega.",
  },
  {
    q: "¿Mi sistema cumple el RGPD?",
    a: "Sí. Lo alojas tú, en Alemania o en la UE, con contrato de encargo del tratamiento. Ningún dato pasa por servidores ajenos que no controles.",
  },
];

const TEXT: Record<Lang, { kicker: string; heading: [string, string]; faqs: { q: string; a: string }[] }> = {
  de: { kicker: "Rückfragen", heading: ["Bevor du ", "fragst"], faqs: FAQS_DE },
  es: { kicker: "Preguntas", heading: ["Antes de que ", "preguntes"], faqs: FAQS_ES },
};

export default function FAQSection({ lang = "de", blatt }: { lang?: Lang; blatt?: string }) {
  const t = TEXT[lang];
  return (
    <section className="py-14 relative overflow-hidden">
      <SectionGlow position="top" />
      <div className="mx-auto px-7" style={{ maxWidth: 820 }}>
        <div className="text-center">
          <span
            className="mono inline-flex items-center gap-2 mb-4"
            style={{ fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--amber)" }}
          >
            <span style={{ opacity: 0.7 }}>§</span> {blatt ? `Blatt ${blatt} / ${t.kicker}` : t.kicker}
          </span>
          <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", marginBottom: 30 }}>
            {t.heading[0]}
            <span className="accent">{t.heading[1]}</span>
          </h2>
        </div>

        <div>
          {t.faqs.map((f) => (
            <details key={f.q} className="group" style={{ borderBottom: "1px solid var(--hairline)", padding: "20px 0" }}>
              <summary
                className="display flex items-center justify-between cursor-pointer list-none"
                style={{ fontWeight: 700, fontSize: "1.02rem", lineHeight: 1.3 }}
              >
                {f.q}
                <span className="mono" style={{ color: "var(--amber)", fontSize: "1.3rem" }}>
                  <span className="group-open:hidden">+</span>
                  <span className="hidden group-open:inline">–</span>
                </span>
              </summary>
              <p style={{ marginTop: 12, color: "var(--warm-grey-dim)", fontSize: "0.96rem", maxWidth: "70ch" }}>
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
