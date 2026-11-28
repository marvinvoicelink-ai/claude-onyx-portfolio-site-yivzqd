import type { Lang } from "@/lib/i18n";

/** FAQ und Abschluss der Startseite nach der Positionierung vom 21./22.11.2026 (Objekt komplett zeigen + Anzeigen). */
export const IMMO_FAQ: Record<Lang, { eyebrow: string; heading: string; items: { q: string; a: string }[] }> = {
  de: {
    eyebrow: "Bevor du fragst",
    heading: "Was Makler und Bauträger uns fragen.",
    items: [
      { q: "Brauche ich einen Fotografen oder eine Drohne?", a: "Nein. Handyfotos reichen, innen und außen. Profi-Fotos nehmen wir natürlich gern als Grundlage." },
      { q: "Funktioniert das auch im Rohbau?", a: "Gerade da. Statt der Baustelle sehen Käufer das fertige Haus – deine Vermarktung startet Monate früher." },
      { q: "Sieht der Käufer, was echt ist?", a: "Ja. Jede KI-Visualisierung ist gekennzeichnet, die echten Fotos stehen unbearbeitet daneben. Fenster, Böden und Maße bleiben, wie sie sind." },
      { q: "Wer zahlt die Anzeigen?", a: "Du, direkt an Meta, in deinem eigenen Werbekonto. Das Budget legst du selbst fest. Wir richten die Anzeige ein und optimieren sie – Werbegeld läuft nie über uns." },
      { q: "Warum nicht einfach eine normale Anzeige mit Fotos?", a: "Weil die nach dem Klick auf einem Portal zwischen Hunderten anderen Objekten endet. Bei uns hält schon das Video an, und der Klick landet auf einer 3D-Website nur für dein Objekt. Wer dort durch jeden Raum gegangen ist, fragt ernsthaft an." },
      { q: "Was kostet das?", a: "Dein erstes Objekt ist geschenkt, wenn du an einer Zusammenarbeit interessiert bist. Danach hängt der Preis vom Objekt ab – das besprechen wir im Termin. Kein Abo, keine Laufzeit, bezahlt wird pro Objekt." },
      { q: "Ersetzt das die Portale?", a: "Nein, die bleiben. Die 3D-Website und die Anzeige kommen dazu – damit dein Objekt dort auffällt, wo Käufer abends am Handy sind." },
    ],
  },
  es: {
    eyebrow: "Antes de que preguntes",
    heading: "Lo que nos preguntan agencias y promotoras.",
    items: [
      { q: "¿Necesito un fotógrafo o un dron?", a: "No. Bastan fotos del móvil, de interior y exterior. Si tienes fotos profesionales, las usamos con gusto." },
      { q: "¿Funciona también en obra?", a: "Justo ahí. En lugar de la obra, los compradores ven la casa terminada: tu comercialización empieza meses antes." },
      { q: "¿El comprador ve qué es real?", a: "Sí. Cada visualización con IA está marcada y las fotos reales van al lado sin retocar. Ventanas, suelos y medidas no cambian." },
      { q: "¿Quién paga los anuncios?", a: "Tú, directamente a Meta, en tu propia cuenta publicitaria. El presupuesto lo decides tú. Nosotros configuramos y optimizamos el anuncio: el dinero publicitario nunca pasa por nosotros." },
      { q: "¿Por qué no un anuncio normal con fotos?", a: "Porque tras el clic acaba en un portal entre cientos de inmuebles. Con nosotros, el vídeo ya detiene el scroll y el clic llega a una web 3D solo para tu inmueble. Quien la ha recorrido pregunta en serio." },
      { q: "¿Cuánto cuesta?", a: "Tu primer inmueble es gratis si te interesa colaborar. Después, el precio depende del inmueble: lo vemos en la reunión. Sin suscripción ni permanencia, se paga por inmueble." },
      { q: "¿Sustituye a los portales?", a: "No, los portales siguen. La web 3D y el anuncio se suman, para que tu inmueble destaque donde los compradores están por la noche: en el móvil." },
    ],
  },
};

export const IMMO_CTA: Record<Lang, { heading: string; sub: string; button: string; note: string }> = {
  de: {
    heading: "Sieh es an deinem eigenen Objekt.",
    sub: "Dein erstes Objekt ist geschenkt, wenn du an einer Zusammenarbeit interessiert bist – dafür gibt es 5 Plätze im Monat.",
    button: "Erstes Objekt anfragen",
    note: "Kein Abo, keine Laufzeit – bezahlt wird pro Objekt.",
  },
  es: {
    heading: "Míralo con tu propio inmueble.",
    sub: "Tu primer inmueble es gratis si te interesa colaborar: hay 5 plazas al mes.",
    button: "Pedir mi primer inmueble",
    note: "Sin suscripción ni permanencia: se paga por inmueble.",
  },
};
