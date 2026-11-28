import type { LeistungId } from "./leistungen";

/**
 * Einstiege der Landingpage, je einer pro Anzeige (Marvin, 28.11.2026:
 * „Ich brauche Landingpages für jede einzelne Werbeanzeige“), dazu je eine
 * Seite für Bauträger und für Makler (/immobilien/bautraeger, /makler).
 *
 * Der erste Bildschirm zeigt dieselbe Aussage und dasselbe Bild wie im Reel,
 * die passende Leistung steht zuerst und ist im Formular schon angehakt.
 * Seiten mit Zielgruppe bekommen deren Probleme, Reihenfolge, Fragen und die
 * Rolle im Formular. Ablauf, Angebot, Formular und CRM sind für alle gleich.
 *
 * Regeln wie überall: „Sie“, keine Preise, keine Zahlen, kein „ohne
 * Besichtigung“, KI-Bilder gekennzeichnet (CLAUDE.md, Kernbotschaft).
 */

export type HeroMedium =
  | { art: "video"; src: string; poster: string; label: string; beschriftung: string; ki: boolean }
  | { art: "handy"; src: string; poster: string; label: string; beschriftung: string; ki: boolean }
  | { art: "bild"; src: string; alt: string; beschriftung: string; ki: boolean }
  | { art: "vorher-nachher"; vorher: string; nachher: string; vorherAlt?: string; nachherAlt?: string };

export type Hero = {
  kicker: string;
  titel: string;
  text: string;
  medium: HeroMedium;
};

export type VarianteId = "bautraeger" | "makler" | "einrichtung" | "zeitraffer" | "projektseite" | "rundgang";

export type ZielgruppeId = "bautraeger" | "makler";

export type Variante = Hero & {
  id: VarianteId;
  /** Leistung, die zuerst steht und im Formular vorab angehakt ist */
  leistung?: LeistungId;
  /** Bauträger und Makler überzeugt man mit anderen Argumenten (Marvin, 28.11.2026). */
  zielgruppe?: ZielgruppeId;
  metaTitel: string;
};

export type Zielgruppe = {
  /** Wert der Rolle im Formular, schon ausgewählt */
  rolle: "Bauträger / Bauunternehmen" | "Makler";
  /** In dieser Reihenfolge stehen die Leistungen */
  reihenfolge: LeistungId[];
  probleme: { titel: string; punkte: { problem: string; loesung: string }[] };
  /** Ersetzt die Antwort auf „Für wen ist das?“ */
  fuerWen: string;
  faq: { f: string; a: string }[];
  objektBeispiel: string;
};

/**
 * Was die Seiten für Bauträger und für Makler unterscheidet. Die Einstiege
 * /zeitraffer und /projektseite sind Bauträger-Themen und bekommen dieselben
 * Argumente. Regeln wie oben: keine Zahlen, kein „ohne Besichtigung“,
 * „die übliche Anzeige“ statt „nur wir“.
 */
export const ZIELGRUPPEN: Record<ZielgruppeId, Zielgruppe> = {
  bautraeger: {
    rolle: "Bauträger / Bauunternehmen",
    reihenfolge: ["zeitraffer", "projektseite", "rundgang", "einrichtung", "anzeigen", "rundflug"],
    probleme: {
      titel: "Was Bauträger im Vertrieb bremst – und was wir dagegen tun.",
      punkte: [
        { problem: "Käufer sehen Beton und Kräne.", loesung: "Wir zeigen jedes Haus fertig gebaut und eingerichtet – aus Ihren Plänen und Baustellenfotos, gekennzeichnet als KI-Visualisierung." },
        { problem: "Viele Käufer warten, bis das Haus fertig ist.", loesung: "Mit Zeitraffer und Rundgang sehen sie schon in der Bauphase, was sie bekommen. So können Sie früher verkaufen." },
        { problem: "Jede Reservierung heißt: Liste und Exposé neu verschicken.", loesung: "Auf Ihrer Projektseite stehen alle Einheiten mit Fläche, Grundriss, Preis und Status. Käufer sehen immer den aktuellen Stand." },
        { problem: "Ihre Käufer wohnen weit weg.", loesung: "Sie gehen am Handy durch jeden Raum. Zur Besichtigung kommen die, die schon wissen, was sie erwartet." },
      ],
    },
    fuerWen: "Für Bauträger und Bauunternehmen mit Neubauprojekten – vom einzelnen Haus bis zur Anlage mit mehreren Einheiten, vom Rohbau bis kurz vor der Übergabe. In Spanien und im deutschsprachigen Raum.",
    faq: [
      { f: "Unser Projekt hat mehrere Häuser. Geht das?", a: "Ja. Die Projektseite zeigt alle Einheiten mit Fläche, Grundriss, Preis und Status. Zeitraffer und Rundgang machen wir für die Haustypen, die Sie zeigen möchten." },
    ],
    objektBeispiel: "z. B. Neubau mit 6 Villen, Wohnanlage im Rohbau",
  },
  makler: {
    rolle: "Makler",
    reihenfolge: ["einrichtung", "rundgang", "anzeigen", "rundflug", "zeitraffer", "projektseite"],
    probleme: {
      titel: "Was in der Vermarktung Zeit kostet – und was wir dagegen tun.",
      punkte: [
        { problem: "Leere Räume wirken kalt und kleiner, als sie sind.", loesung: "Wir richten sie aus Ihren Fotos fertig ein – als Bild, als Video und auf der Website zum Objekt. Gekennzeichnet als KI-Visualisierung." },
        { problem: "Im Portal sieht Ihr Objekt aus wie hundert andere.", loesung: "Die übliche Anzeige zeigt Fotos und schickt den Klick ins Portal. Ihrer landet auf einer eigenen Website, durch die man Raum für Raum geht." },
        { problem: "Besichtigungen mit Interessenten, die nach fünf Minuten wissen: passt nicht.", loesung: "Wer nach dem Rundgang anfragt, kennt das Objekt schon. Zur Besichtigung kommen die, die wissen, was sie erwartet." },
        { problem: "Eigentümer wollen sehen, wie Sie ihr Haus vermarkten.", loesung: "Mit Rundgang, Video und eigener Website zeigen Sie im Akquisegespräch, was Sie anders machen." },
      ],
    },
    fuerWen: "Für Makler, die Bestandsobjekte oder Neubauten vermarkten – besonders, wenn Räume leer stehen, noch renoviert wird oder die Käufer weit weg wohnen. In Spanien und im deutschsprachigen Raum.",
    faq: [
      { f: "Geht das auch bei Bestandsimmobilien?", a: "Ja. Leere oder unmöblierte Räume richten wir ein, aus Ihren Fotos entstehen Rundgang, Rundflug-Video und die Website zum Objekt. Der Zeitraffer ist für Neubauten gedacht." },
      { f: "Kann ich das Eigentümern zeigen?", a: "Ja. Website, Videos und Bilder gehören Ihnen – Sie nutzen sie im Exposé, im Portal, auf Ihrer Website und im Gespräch mit Eigentümern." },
    ],
    objektBeispiel: "z. B. leere Wohnung, Finca mit Pool, Haus vor der Renovierung",
  },
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
    id: "bautraeger",
    zielgruppe: "bautraeger",
    metaTitel: "Neubauprojekte fertig zeigen, solange gebaut wird – für Bauträger | ONYX Studio",
    kicker: "Für Bauträger & Bauunternehmen",
    titel: "Zeigen Sie Ihr Projekt fertig, solange noch gebaut wird.",
    text: "Zeitraffer vom Grundstück bis zur fertigen Villa, eingerichtete Räume, ein Rundgang am Handy und eine Projektseite mit allen Einheiten, Preisen und Verfügbarkeit. Aus Ihren Plänen und Baustellenfotos – damit Käufer schon in der Bauphase sehen, was sie bekommen.",
    medium: STANDARD_HERO.medium,
  },
  {
    id: "makler",
    zielgruppe: "makler",
    metaTitel: "Objekte als komplette Begehung zeigen – für Immobilienmakler | ONYX Studio",
    kicker: "Für Immobilienmakler",
    titel: "Andere zeigen Fotos. Sie zeigen eine komplette Begehung.",
    text: "Leere Räume fertig eingerichtet, ein Rundgang am Handy und eine eigene Website nur für Ihr Objekt – dazu Videos, die in Ihren Anzeigen auffallen. Wer danach anfragt, ist schon durch jeden Raum gegangen.",
    medium: {
      art: "vorher-nachher",
      vorher: "/beispiele/media/p3-vorher.jpg",
      nachher: "/beispiele/media/p3-nachher.jpg",
      vorherAlt: "Leeres Schlafzimmer, echtes Foto",
      nachherAlt: "Dasselbe Schlafzimmer eingerichtet, KI-Visualisierung",
    },
  },
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
    zielgruppe: "bautraeger",
    metaTitel: "Zeitraffer vom Grundstück bis fertig – für Bauträger | ONYX Studio",
    kicker: "Für Bauträger",
    titel: "Verkaufen, solange gebaut wird.",
    text: "Wir zeigen Ihr Projekt vom Grundstück bis zur fertigen Villa – im Zeitraffer, als Video für Ihre Anzeigen und auf einer eigenen Website. So sehen Käufer schon in der Bauphase, was sie bekommen.",
    medium: STANDARD_HERO.medium,
  },
  {
    id: "projektseite",
    leistung: "projektseite",
    zielgruppe: "bautraeger",
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
