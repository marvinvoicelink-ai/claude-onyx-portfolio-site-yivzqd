/**
 * Kundenstimmen mit echten Zitaten von Onyx-Kunden. Fünf Sterne als
 * Markierung, keine erfundenen Personennamen oder Logos — nur der
 * Firmen-/Projektname, den Marvin freigegeben hat. Die Zuordnung Zitat →
 * Firma stammt aus Marvins Angabe und lässt sich hier jederzeit anpassen.
 */
import type { Lang } from "@/lib/i18n";

type Testimonial = {
  quote: Record<Lang, string>;
  name: string;
  role: Record<Lang, string>;
};

const testimonials: Testimonial[] = [
  {
    quote: {
      de: "Die Zusammenarbeit war von Anfang an unkompliziert. Das Team hat unsere Anforderungen schnell verstanden und eine Lösung umgesetzt, die uns im Alltag wirklich Zeit spart.",
      es: "La colaboración fue sencilla desde el principio. El equipo entendió rápido lo que necesitábamos y creó una solución que de verdad nos ahorra tiempo en el día a día.",
    },
    name: "Haas Wasserkraft",
    role: { de: "Bestands- & CRM-System", es: "Sistema de stock y CRM" },
  },
  {
    quote: {
      de: "Wir waren überrascht, wie schnell das System bei uns integriert werden konnte. Besonders gut gefällt uns, dass viele Abläufe jetzt automatisch laufen und wir deutlich weniger manuell machen müssen.",
      es: "Nos sorprendió lo rápido que se integró el sistema. Lo que más nos gusta es que muchos procesos funcionan ahora solos y tenemos que hacer mucho menos a mano.",
    },
    name: "Speedfire",
    role: { de: "Markenaufbau & Vermarktung", es: "Creación de marca y venta" },
  },
  {
    quote: {
      de: "Sehr professionelle Umsetzung und schnelle Kommunikation. Fragen wurden direkt beantwortet und Änderungen ohne großes Hin und Her umgesetzt.",
      es: "Un trabajo muy profesional y una comunicación rápida. Las preguntas se respondían al momento y los cambios se hacían sin idas y venidas.",
    },
    name: "PawPlace",
    role: { de: "Support-Dashboard", es: "Panel de soporte" },
  },
  {
    quote: {
      de: "Wir hatten vorher mehrere Prozesse, die unnötig viel Zeit gekostet haben. Durch die Automatisierungen läuft inzwischen vieles im Hintergrund. Genau das haben wir gesucht.",
      es: "Antes teníamos varios procesos que nos costaban demasiado tiempo. Gracias a las automatizaciones, ahora mucho funciona en segundo plano. Justo lo que buscábamos.",
    },
    name: "HWD Handelsagentur",
    role: { de: "Automatisierungen", es: "Automatizaciones" },
  },
  {
    quote: {
      de: "Von der ersten Beratung bis zur Umsetzung hat alles sehr strukturiert gewirkt. Die Lösung wurde auf unsere Abläufe angepasst und nicht einfach irgendein Standard-System übergestülpt.",
      es: "Desde la primera reunión hasta la implantación, todo fue muy ordenado. La solución se adaptó a nuestros procesos, en lugar de imponernos un sistema estándar cualquiera.",
    },
    name: "Rebstöckel",
    role: { de: "Maßgeschneidertes System", es: "Sistema a medida" },
  },
  {
    quote: {
      de: "Mit dem HausManager sparen wir jeden Tag Zeit. Wiederkehrende Aufgaben werden zuverlässig organisiert, und wir müssen deutlich weniger manuell nachhalten.",
      es: "Con HausManager ahorramos tiempo cada día. Las tareas recurrentes se organizan de forma fiable y tenemos que hacer mucho menos seguimiento a mano.",
    },
    name: "Hausverwaltung",
    role: { de: "HausManager Pro", es: "HausManager Pro" },
  },
];

const TEXT: Record<Lang, { kicker: string; heading: [string, string]; stars: string; note?: string; nameHausverwaltung: string }> = {
  de: { kicker: "Stimmen", heading: ["Was ", "Kunden sagen"], stars: "5 von 5 Sternen", nameHausverwaltung: "Hausverwaltung" },
  es: {
    kicker: "Opiniones",
    heading: ["Lo que dicen ", "nuestros clientes"],
    stars: "5 de 5 estrellas",
    note: "Opiniones de clientes en Alemania, traducidas del alemán.",
    nameHausverwaltung: "Administración de fincas",
  },
};

function Stars({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-1" aria-label={label}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 24 24" fill="var(--amber)" width={16} height={16}>
          <path d="M12 2.5l2.9 5.9 6.5.95-4.7 4.58 1.1 6.47L12 17.9l-5.8 3.05 1.1-6.47L2.6 9.9l6.5-.95L12 2.5Z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials({ lang = "de", blatt }: { lang?: Lang; blatt?: string }) {
  if (testimonials.length === 0) return null;
  const tx = TEXT[lang];

  return (
    <section className="py-10">
      <div className="mx-auto px-7" style={{ maxWidth: 1100 }}>
        <div className="text-center">
          <span
            className="mono inline-flex items-center gap-2 mb-4"
            style={{ fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--amber)" }}
          >
            <span style={{ opacity: 0.7 }}>§</span> {blatt ? `Blatt ${blatt} / ${tx.kicker}` : tx.kicker}
          </span>
          <h2 className="mx-auto" style={{ fontSize: "clamp(1.8rem, 3.6vw, 2.6rem)", maxWidth: "20ch", marginBottom: 34 }}>
            {tx.heading[0]}
            <span className="accent">{tx.heading[1]}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="rounded-2xl p-6 md:p-8 on-dark beam-border text-left flex flex-col"
              style={{ background: "var(--near-black-2)" }}
            >
              <div className="mb-4">
                <Stars label={tx.stars} />
              </div>
              <p style={{ fontSize: "1.08rem", lineHeight: 1.65, color: "var(--warm-grey)", marginBottom: 20, flex: 1 }}>
                {lang === "es" ? `«${t.quote.es}»` : `„${t.quote.de}“`}
              </p>
              <div style={{ borderTop: "1px solid var(--hairline)", paddingTop: 16 }}>
                <div className="display" style={{ fontWeight: 700, fontSize: "1.05rem", lineHeight: 1.2 }}>{t.name === "Hausverwaltung" ? tx.nameHausverwaltung : t.name}</div>
                <div className="mono" style={{ fontSize: 12, color: "var(--warm-grey-dim)", marginTop: 3 }}>{t.role[lang]}</div>
              </div>
            </div>
          ))}
        </div>
        {tx.note && (
          <p className="mono text-center mt-5" style={{ fontSize: 12, color: "var(--warm-grey-faint)" }}>
            {tx.note}
          </p>
        )}
      </div>
    </section>
  );
}
