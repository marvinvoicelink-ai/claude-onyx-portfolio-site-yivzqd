/**
 * Kundenstimmen mit echten Zitaten von Onyx-Kunden. Fünf Sterne als
 * Markierung, keine erfundenen Personennamen oder Logos — nur der
 * Firmen-/Projektname, den Marvin freigegeben hat. Die Zuordnung Zitat →
 * Firma stammt aus Marvins Angabe und lässt sich hier jederzeit anpassen.
 */
type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

const testimonials: Testimonial[] = [
  {
    quote:
      "Die Zusammenarbeit war von Anfang an unkompliziert. Das Team hat unsere Anforderungen schnell verstanden und eine Lösung umgesetzt, die uns im Alltag wirklich Zeit spart.",
    name: "Haas Wasserkraft",
    role: "Bestands- & CRM-System",
  },
  {
    quote:
      "Wir waren überrascht, wie schnell das System bei uns integriert werden konnte. Besonders gut gefällt uns, dass viele Abläufe jetzt automatisch laufen und wir deutlich weniger manuell machen müssen.",
    name: "Speedfire",
    role: "Markenaufbau & Vermarktung",
  },
  {
    quote:
      "Sehr professionelle Umsetzung und schnelle Kommunikation. Fragen wurden direkt beantwortet und Änderungen ohne großes Hin und Her umgesetzt.",
    name: "PawPlace",
    role: "Support-Dashboard",
  },
  {
    quote:
      "Wir hatten vorher mehrere Prozesse, die unnötig viel Zeit gekostet haben. Durch die Automatisierungen läuft inzwischen vieles im Hintergrund. Genau das haben wir gesucht.",
    name: "HWD Handelsagentur",
    role: "Automatisierungen",
  },
  {
    quote:
      "Von der ersten Beratung bis zur Umsetzung hat alles sehr strukturiert gewirkt. Die Lösung wurde auf unsere Abläufe angepasst und nicht einfach irgendein Standard-System übergestülpt.",
    name: "Rebstöckel",
    role: "Maßgeschneidertes System",
  },
  {
    quote:
      "Mit dem HausManager sparen wir jeden Tag Zeit. Wiederkehrende Aufgaben werden zuverlässig organisiert, und wir müssen deutlich weniger manuell nachhalten.",
    name: "Hausverwaltung",
    role: "HausManager Pro",
  },
];

function Stars() {
  return (
    <div className="flex items-center gap-1" aria-label="5 von 5 Sternen">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 24 24" fill="var(--amber)" width={16} height={16}>
          <path d="M12 2.5l2.9 5.9 6.5.95-4.7 4.58 1.1 6.47L12 17.9l-5.8 3.05 1.1-6.47L2.6 9.9l6.5-.95L12 2.5Z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials({ blatt }: { blatt?: string }) {
  if (testimonials.length === 0) return null;

  return (
    <section className="py-10">
      <div className="mx-auto px-7" style={{ maxWidth: 1100 }}>
        <div className="text-center">
          <span
            className="mono inline-flex items-center gap-2 mb-4"
            style={{ fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--amber)" }}
          >
            <span style={{ opacity: 0.7 }}>§</span> {blatt ? `Blatt ${blatt} / Stimmen` : "Stimmen"}
          </span>
          <h2 className="mx-auto" style={{ fontSize: "clamp(1.8rem, 3.6vw, 2.6rem)", maxWidth: "20ch", marginBottom: 34 }}>
            Was <span className="accent">Kunden sagen</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {testimonials.map((t) => (
            <div
              key={t.name + t.role}
              className="rounded-2xl p-6 md:p-8 on-dark beam-border text-left flex flex-col"
              style={{ background: "var(--near-black-2)" }}
            >
              <div className="mb-4">
                <Stars />
              </div>
              <p style={{ fontSize: "1.08rem", lineHeight: 1.65, color: "var(--warm-grey)", marginBottom: 20, flex: 1 }}>
                „{t.quote}"
              </p>
              <div style={{ borderTop: "1px solid var(--hairline)", paddingTop: 16 }}>
                <div className="display" style={{ fontWeight: 700, fontSize: "1.05rem", lineHeight: 1.2 }}>{t.name}</div>
                <div className="mono" style={{ fontSize: 12, color: "var(--warm-grey-dim)", marginTop: 3 }}>{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
