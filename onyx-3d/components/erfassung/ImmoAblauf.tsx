import type { Lang } from "@/lib/i18n";

const TEXT: Record<Lang, { kicker: string; heading: string; schritte: { titel: string; text: string }[] }> = {
  de: {
    kicker: "So läuft es ab",
    heading: "Vier Schritte. Du machst nur den ersten.",
    schritte: [
      { titel: "Handyfotos schicken", text: "Innen und außen, dazu die Eckdaten: Fläche, Zimmer, Lage, Preis. Per WhatsApp reicht." },
      { titel: "Wir bauen Video und Website", text: "Zeitraffer oder Rundflug, eingerichtete Räume und die 3D-Website – in wenigen Tagen. Online geht nur, was du freigibst." },
      { titel: "Die Anzeige startet", text: "In deinem eigenen Werbekonto, bei Menschen, die gerade eine Immobilie suchen. Das Budget legst du fest." },
      { titel: "Anfragen kommen zu dir", text: "Mit Name, Telefon und Wunsch – von Leuten, die das Haus schon gesehen haben." },
    ],
  },
  es: {
    kicker: "Así funciona",
    heading: "Cuatro pasos. Tú solo haces el primero.",
    schritte: [
      { titel: "Envía fotos del móvil", text: "Interior y exterior, más los datos básicos: superficie, habitaciones, ubicación, precio. Por WhatsApp basta." },
      { titel: "Creamos vídeo y web", text: "Timelapse o vuelo, estancias amuebladas y la web 3D, en pocos días. Solo se publica lo que apruebas." },
      { titel: "Arranca el anuncio", text: "En tu propia cuenta publicitaria, para personas que están buscando vivienda. El presupuesto lo decides tú." },
      { titel: "Las consultas te llegan", text: "Con nombre, teléfono y deseo, de gente que ya ha visto la casa." },
    ],
  },
};

/** Ablauf in vier Schritten - ersetzt auf der Startseite die Schritte der Vor-Ort-Erfassung. */
export default function ImmoAblauf({ lang }: { lang: Lang }) {
  const t = TEXT[lang];
  return (
    <section id="ablauf" className="py-16" style={{ background: "var(--near-black-2)" }}>
      <div className="mx-auto px-7" style={{ maxWidth: 1180 }}>
        <span className="mono inline-flex items-center gap-2 mb-4" style={{ fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--amber)" }}>
          <span style={{ opacity: 0.7 }}>§</span> {t.kicker}
        </span>
        <h2 style={{ fontSize: "clamp(1.5rem, 2.8vw, 2rem)", marginBottom: 32 }}>{t.heading}</h2>
        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {t.schritte.map((s, i) => (
            <li key={s.titel} className="rounded-xl p-6" style={{ background: "var(--near-black)", border: "1px solid var(--hairline)" }}>
              <div style={{ fontFamily: "var(--font-archivo, inherit)", fontWeight: 800, fontSize: "2rem", lineHeight: 1, color: "var(--amber)", marginBottom: 12 }}>{i + 1}</div>
              <h3 style={{ fontSize: "1.1rem", marginBottom: 8 }}>{s.titel}</h3>
              <p style={{ color: "var(--warm-grey-dim)", fontSize: "0.95rem", lineHeight: 1.6 }}>{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
