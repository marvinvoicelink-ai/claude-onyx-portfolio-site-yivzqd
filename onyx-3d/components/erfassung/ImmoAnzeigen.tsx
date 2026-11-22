import TrackedCtaLink from "@/components/TrackedCtaLink";
import { lp, type Lang } from "@/lib/i18n";

type Text = {
  kicker: string;
  heading: [string, string];
  intro: string;
  ueblich: { titel: string; punkte: string[] };
  onyx: { titel: string; punkte: string[] };
  bildAlt: string;
  bildText: string;
  gruendeKicker: string;
  gruende: { titel: string; text: string }[];
  cta: string;
  ctaNote: string;
};

const TEXT: Record<Lang, Text> = {
  de: {
    kicker: "Warum unsere Anzeigen funktionieren",
    heading: ["Die übliche Anzeige zeigt Fotos. ", "Unsere zeigt das fertige Haus – und dahinter eine Website, durch die man geht."],
    intro:
      "Eine Anzeige ist nur so gut wie das, was nach dem Klick kommt. Die übliche Immobilienanzeige zeigt ein paar Fotos und schickt den Klick auf ein Portal-Inserat, zwischen Hunderte andere Objekte. Bei uns hält schon das Video den Daumen an, und der Klick landet auf einer kompletten 3D-Scrollflug-Website nur für dein Objekt. Wer dort durch jeden Raum gegangen ist, fragt anders an.",
    ueblich: {
      titel: "Die übliche Immobilienanzeige",
      punkte: [
        "Ein Foto im Feed – wird weggewischt.",
        "Der Klick landet im Portal, die Konkurrenz direkt daneben.",
        "Ein paar Bilder, den Rest muss sich der Käufer vorstellen.",
        "Anfragen von Leuten, die nur mal schauen wollen.",
      ],
    },
    onyx: {
      titel: "Mit ONYX",
      punkte: [
        "Das fertige Haus in Bewegung – bleibt beim Scrollen hängen.",
        "Der Klick landet auf einer 3D-Website nur für dieses Objekt.",
        "Der Käufer geht selbst durch jeden Raum und sieht alle Daten.",
        "Anfragen von Leuten, die das Haus schon kennen – mit Name, Telefon und Wunsch.",
      ],
    },
    bildAlt: "Ablauf: Anzeige im Feed, 3D-Rundgang auf der Website, Anfrage landet beim Makler",
    bildText: "So läuft es: Anzeige im Feed → 3D-Rundgang → Anfrage bei dir (Beispiel)",
    gruendeKicker: "Warum Makler und Bauträger zu uns kommen",
    gruende: [
      {
        titel: "Neugier statt Wegwischen",
        text: "Bewegte Bilder vom fertigen Haus halten den Daumen an. Die Anzeige wird viel genauer angeschaut als ein Foto – der erste Schritt zu jeder Anfrage.",
      },
      {
        titel: "Der Klick landet nicht im Nichts",
        text: "Statt im Portal zwischen Hunderten landet der Interessent auf einer Seite nur für dein Objekt. Nichts lenkt ab, und am Ende wartet ein klarer Schritt: Exposé oder Besichtigung anfragen.",
      },
      {
        titel: "Wer anfragt, war schon drin",
        text: "Nach dem Rundgang kennt der Käufer Räume, Lage und Preis. Zur Besichtigung kommen Leute, die wissen, was sie erwartet – gerade bei Käufern aus dem Ausland, die nicht mal eben vorbeikommen.",
      },
      {
        titel: "Schon im Rohbau verkaufen",
        text: "Wir zeigen das fertige Haus, bevor es steht. Deine Vermarktung beginnt nicht erst, wenn der letzte Handwerker weg ist.",
      },
      {
        titel: "Alles aus einer Hand",
        text: "Video, Website und Anzeige kommen von uns und passen zusammen. Kein Fotograf hier, Webdesigner dort und eine Agentur, die nur Anzeigen schaltet.",
      },
      {
        titel: "Dein Konto, deine Daten",
        text: "Die Anzeigen laufen in deinem eigenen Werbekonto, das Budget legst du selbst fest. Kein Abo, keine Laufzeit – bezahlt wird pro Objekt.",
      },
    ],
    cta: "Erstes Objekt geschenkt – Platz anfragen",
    ctaNote: "wenn du an einer Zusammenarbeit interessiert bist · 5 Plätze im Monat",
  },
  es: {
    kicker: "Por qué funcionan nuestros anuncios",
    heading: ["El anuncio habitual muestra fotos. ", "El nuestro muestra la casa terminada – y detrás, una web que se recorre."],
    intro:
      "Un anuncio vale lo que viene después del clic. El anuncio inmobiliario habitual enseña unas fotos y manda el clic a un portal, entre cientos de inmuebles. Con nosotros, el vídeo ya detiene el scroll y el clic llega a una web 3D completa solo para tu inmueble. Quien la ha recorrido estancia por estancia pregunta de otra manera.",
    ueblich: {
      titel: "El anuncio inmobiliario habitual",
      punkte: [
        "Una foto en el feed: se desliza y se olvida.",
        "El clic acaba en el portal, con la competencia al lado.",
        "Unas pocas imágenes; el resto lo tiene que imaginar el comprador.",
        "Consultas de gente que solo quiere mirar.",
      ],
    },
    onyx: {
      titel: "Con ONYX",
      punkte: [
        "La casa terminada en movimiento: detiene el scroll.",
        "El clic llega a una web 3D solo para este inmueble.",
        "El comprador recorre cada estancia y ve todos los datos.",
        "Consultas de gente que ya conoce la casa, con nombre, teléfono y deseo.",
      ],
    },
    bildAlt: "Proceso: anuncio en el feed, recorrido 3D en la web, la consulta llega a la agencia",
    bildText: "Así funciona: anuncio en el feed → recorrido 3D → consulta para ti (ejemplo)",
    gruendeKicker: "Por qué agencias y promotoras vienen a nosotros",
    gruende: [
      { titel: "Curiosidad en lugar de deslizar", text: "Las imágenes en movimiento de la casa terminada detienen el pulgar. El anuncio se mira con mucha más atención que una foto: el primer paso de toda consulta." },
      { titel: "El clic no se pierde", text: "En lugar de un portal con cientos de inmuebles, el interesado llega a una página solo para el tuyo. Nada distrae, y al final hay un paso claro: pedir el dossier o una visita." },
      { titel: "Quien pregunta ya ha estado dentro", text: "Tras el recorrido, el comprador conoce las estancias, la ubicación y el precio. A la visita llega gente que sabe lo que se va a encontrar, sobre todo compradores del extranjero." },
      { titel: "Vender ya en obra", text: "Mostramos la casa terminada antes de que exista. Tu comercialización no empieza cuando se va el último operario." },
      { titel: "Todo de una sola mano", text: "Vídeo, web y anuncio vienen de nosotros y encajan. No un fotógrafo por aquí, un diseñador por allá y una agencia que solo pone anuncios." },
      { titel: "Tu cuenta, tus datos", text: "Los anuncios funcionan en tu propia cuenta publicitaria y el presupuesto lo decides tú. Sin suscripción ni permanencia: se paga por inmueble." },
    ],
    cta: "Primer inmueble gratis – pedir plaza",
    ctaNote: "si te interesa colaborar · 5 plazas al mes",
  },
};

/**
 * Warum Anzeigen mit ONYX funktionieren (Marvin, 22.11.2026): Vergleich
 * "übliche Anzeige" gegen "Mit ONYX" und sechs Gründe. Bewusst ohne Zahlen
 * und ohne Alleinstellung ("nur wir") - siehe CLAUDE.md, Grenzen der Aussage.
 */
export default function ImmoAnzeigen({ lang }: { lang: Lang }) {
  const t = TEXT[lang];
  return (
    <section id="anzeigen" className="py-16">
      <div className="mx-auto px-7" style={{ maxWidth: 1180 }}>
        <span className="mono inline-flex items-center gap-2 mb-4" style={{ fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--amber)" }}>
          <span style={{ opacity: 0.7 }}>§</span> {t.kicker}
        </span>
        <h2 style={{ fontSize: "clamp(1.5rem, 2.8vw, 2.1rem)", marginBottom: 16, maxWidth: "30ch" }}>
          {t.heading[0]}
          <span className="accent">{t.heading[1]}</span>
        </h2>
        <p style={{ color: "var(--warm-grey-dim)", fontSize: "1.05rem", lineHeight: 1.7, maxWidth: "70ch", marginBottom: 32 }}>{t.intro}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {[t.ueblich, t.onyx].map((spalte, i) => (
            <div
              key={spalte.titel}
              className={i === 1 ? "beam-border rounded-xl p-6" : "rounded-xl p-6"}
              style={{
                background: i === 1 ? "var(--near-black-2)" : "transparent",
                border: `1px solid ${i === 1 ? "var(--amber)" : "var(--hairline)"}`,
              }}
            >
              <div className="mono" style={{ fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", color: i === 1 ? "var(--amber)" : "var(--warm-grey-faint)", marginBottom: 14 }}>
                {spalte.titel}
              </div>
              <ol className="space-y-3">
                {spalte.punkte.map((p, n) => (
                  <li key={p} className="flex gap-3" style={{ color: i === 1 ? "var(--warm-grey)" : "var(--warm-grey-dim)", fontSize: "0.98rem", lineHeight: 1.55 }}>
                    <span className="mono" style={{ color: i === 1 ? "var(--amber)" : "var(--warm-grey-faint)", fontSize: 13, minWidth: 18 }}>{n + 1}</span>
                    {p}
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>

        <figure className="mb-12">
          <img
            src="/mail/anzeigen-ablauf.jpg"
            alt={t.bildAlt}
            width={1120}
            height={620}
            loading="lazy"
            decoding="async"
            className="rounded-xl"
            style={{ width: "100%", maxWidth: 760, height: "auto", margin: "0 auto", display: "block", border: "1px solid var(--hairline)" }}
          />
          <figcaption className="mono text-center" style={{ fontSize: 12, color: "var(--warm-grey-faint)", marginTop: 10 }}>{t.bildText}</figcaption>
        </figure>

        <div className="mono mb-5" style={{ fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--amber)" }}>{t.gruendeKicker}</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {t.gruende.map((g, i) => (
            <div key={g.titel} className="rounded-xl p-6" style={{ background: "var(--near-black-2)", border: "1px solid var(--hairline)" }}>
              <div className="mono" style={{ fontSize: 13, color: "var(--amber)", marginBottom: 8 }}>{String(i + 1).padStart(2, "0")}</div>
              <h3 style={{ fontSize: "1.15rem", marginBottom: 8 }}>{g.titel}</h3>
              <p style={{ color: "var(--warm-grey-dim)", fontSize: "0.95rem", lineHeight: 1.65 }}>{g.text}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center gap-2">
          <TrackedCtaLink
            href={lp(lang, "/kontakt")}
            source="Anzeigen-CTA"
            topic="objekt"
            className="inline-flex items-center gap-2 rounded-[10px] px-6 py-3.5 font-semibold btn-amber"
            style={{ background: "var(--amber)", color: "#12141a", fontSize: 16 }}
          >
            {t.cta}
          </TrackedCtaLink>
          <span className="mono" style={{ fontSize: 12, color: "var(--warm-grey-faint)" }}>{t.ctaNote}</span>
        </div>
      </div>
    </section>
  );
}
