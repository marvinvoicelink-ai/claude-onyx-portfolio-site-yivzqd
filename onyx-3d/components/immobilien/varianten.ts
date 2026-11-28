import type { LeistungId } from "./leistungen";

/**
 * Einstiege der Landingpage, je einer pro Anzeige (Marvin, 28.11.2026:
 * „Ich brauche Landingpages für jede einzelne Werbeanzeige“).
 *
 * Nur der erste Bildschirm unterscheidet sich: dieselbe Aussage und dasselbe
 * Bild wie im Reel, die passende Leistung steht zuerst und ist im Formular
 * schon angehakt. Alles darunter (Leistungen, Ablauf, Angebot, Formular, CRM)
 * ist für alle gleich – eine Seite pflegen, nicht vier.
 *
 * Regeln wie überall: „Sie“, keine Preise, keine Zahlen, kein „ohne
 * Besichtigung“, KI-Bilder gekennzeichnet (CLAUDE.md, Kernbotschaft).
 */

export type HeroMedium =
  | { art: "video"; src: string; poster: string; label: string; beschriftung: string; ki: boolean }
  | { art: "handy"; src: string; poster: string; label: string; beschriftung: string; ki: boolean }
  | { art: "bild"; src: string; alt: string; beschriftung: string; ki: boolean }
  | { art: "vorher-nachher"; vorher: string; nachher: string };

export type Hero = {
  kicker: string;
  titel: string;
  text: string;
  medium: HeroMedium;
};

export type VarianteId = "einrichtung" | "zeitraffer" | "projektseite" | "rundgang";

export type Variante = Hero & {
  id: VarianteId;
  /** Leistung, die zuerst steht und im Formular vorab angehakt ist */
  leistung: LeistungId;
  metaTitel: string;
};

export const STANDARD_HERO: Hero = {
  kicker: "Für Makler & Bauunternehmen",
  titel: "Wir zeigen Ihr Objekt fertig – bevor es fertig ist.",
  text: "3D-Rundgang, Zeitraffer, eingerichtete Räume und Anzeigen: Käufer sehen Ihren Rohbau oder Ihr leeres Objekt so, wie es fertig aussieht – und fragen an, weil sie schon wissen, was sie erwartet. Sie wählen, was Sie brauchen.",
  medium: {
    art: "video",
    src: "/beispiele/projekt/media/hero.mp4",
    poster: "/beispiele/projekt/img/hero-poster.webp",
    label: "Zeitraffer vom leeren Grundstück bis zur fertigen Villa",
    beschriftung: "Vom Grundstück bis fertig",
    ki: true,
  },
};

export const VARIANTEN: Variante[] = [
  {
    id: "einrichtung",
    leistung: "einrichtung",
    metaTitel: "Leere Räume fertig eingerichtet zeigen – für Bauträger & Makler | ONYX Studio",
    kicker: "Für Bauträger & Makler",
    titel: "Ihre Käufer sehen eine Baustelle? Wir zeigen das fertige Zuhause.",
    text: "Aus Ihren Fotos vom Rohbau oder vom leeren Objekt machen wir fertig eingerichtete Räume – als Bild, als Video und auf einer eigenen Website, durch die Käufer am Handy gehen. Die Architektur bleibt echt, die Einrichtung ergänzt die KI.",
    medium: { art: "vorher-nachher", vorher: "/beispiele/media/p1-vorher.jpg", nachher: "/beispiele/media/p1-nachher.jpg" },
  },
  {
    id: "zeitraffer",
    leistung: "zeitraffer",
    metaTitel: "Zeitraffer vom Grundstück bis fertig – für Bauträger | ONYX Studio",
    kicker: "Für Bauträger",
    titel: "Verkaufen, solange gebaut wird.",
    text: "Wir zeigen Ihr Projekt vom Grundstück bis zur fertigen Villa – im Zeitraffer, als Video für Ihre Anzeigen und auf einer eigenen Website. So sehen Käufer schon in der Bauphase, was sie bekommen.",
    medium: STANDARD_HERO.medium,
  },
  {
    id: "projektseite",
    leistung: "projektseite",
    metaTitel: "Eine eigene Website für Ihr Bauprojekt | ONYX Studio",
    kicker: "Für Bauträger",
    titel: "Eine Website nur für Ihr Projekt.",
    text: "Zeitraffer, Rundgang am Handy und alle Einheiten mit Fläche, Grundriss, Preis und Verfügbarkeit auf einen Blick. Die übliche Anzeige schickt den Klick ins Portal – bei Ihnen landet er auf Ihrem Projekt. Wer danach anfragt, ist schon durchs Haus gegangen.",
    medium: {
      art: "bild",
      src: "/assets/immobilien/projektseite-breit.jpg",
      alt: "Beispiel einer Projektseite: alle Villen mit Fläche, Zimmern, Preis und Status",
      beschriftung: "Beispiel einer Projektseite",
      ki: false,
    },
  },
  {
    id: "rundgang",
    leistung: "rundgang",
    metaTitel: "Aus Baustellenfotos wird ein Rundgang – für Bauträger & Makler | ONYX Studio",
    kicker: "Für Bauträger & Makler",
    titel: "Aus Baustellenfotos wird ein Rundgang.",
    text: "Sie schicken uns Fotos – auch Handyfotos vom Rohbau. Wir machen daraus einen Rundgang durchs fertige Haus, durch den Käufer am Handy Raum für Raum gehen, mit allen Daten: Fläche, Zimmer, Grundriss, Lage, Preis.",
    medium: {
      art: "handy",
      src: "/assets/immobilien/rundgang.mp4",
      poster: "/assets/immobilien/rundgang.jpg",
      label: "Rundgang durch eine fertig eingerichtete Finca am Handy",
      beschriftung: "Rundgang am Handy",
      ki: true,
    },
  },
];

export function varianteZu(id: string): Variante | undefined {
  return VARIANTEN.find((v) => v.id === id);
}
