/**
 * Die Leistungen für Makler und Bauunternehmen (Landingpage /immobilien).
 * Marvin, 27.11.2026: „Wir machen das selbst für Makler und Bauunternehmer –
 * ob sie 3D-Rundgänge, Zeitraffer oder andere Sachen möchten, die wir können.“
 *
 * Nur Leistungen, für die es ein echtes Beispiel gibt. Keine Preise
 * (Regel seit 22.11.2026), KI-Bilder sind gekennzeichnet.
 */

export type LeistungId = "rundgang" | "zeitraffer" | "einrichtung" | "rundflug" | "projektseite" | "anzeigen";

export type Leistung = {
  id: LeistungId;
  /** Kurzname fürs Formular und fürs CRM */
  name: string;
  titel: string;
  text: string;
  fuer: string;
  medium: { art: "video" | "bild" | "vergleich"; src: string; poster?: string; nachher?: string; hoch?: boolean };
  ki: boolean;
  beispiel?: { href: string; text: string };
};

export const LEISTUNGEN: Leistung[] = [
  {
    id: "rundgang",
    name: "3D-Rundgang / Website",
    titel: "3D-Rundgang auf eigener Website",
    text: "Eine Website nur für Ihr Objekt. Käufer scrollen und gehen dabei durch jeden Raum – am Handy oder am Laptop, mit allen Daten: Fläche, Zimmer, Grundriss, Lage, Preis.",
    fuer: "Makler & Bauträger",
    medium: { art: "video", src: "/assets/immobilien/rundgang.mp4", poster: "/assets/immobilien/rundgang.jpg", hoch: true },
    ki: true,
    beispiel: { href: "/beispiele/projekt/#rundgang", text: "Beispiel durchgehen" },
  },
  {
    id: "zeitraffer",
    name: "Zeitraffer",
    titel: "Zeitraffer vom Grundstück bis fertig",
    text: "In wenigen Sekunden wächst Ihr Haus vom leeren Grundstück zur fertigen Villa. Das Video für Ihre Anzeigen – und der Beweis, dass Sie schon in der Bauphase verkaufen können.",
    fuer: "Bauträger & Bauunternehmen",
    medium: { art: "video", src: "/assets/immobilien/zeitraffer.mp4", poster: "/assets/immobilien/zeitraffer.jpg" },
    ki: true,
  },
  {
    id: "einrichtung",
    name: "KI-Einrichtung",
    titel: "Leere Räume, fertig eingerichtet",
    text: "Aus Baustellen- und Handyfotos zeigen wir jeden Raum fertig eingerichtet – als Bild und als Video. Die Architektur bleibt echt, ergänzt wird nur, was fehlt.",
    fuer: "Makler & Bauträger",
    medium: { art: "vergleich", src: "/beispiele/media/p1-vorher.jpg", nachher: "/beispiele/media/p1-nachher.jpg" },
    ki: true,
    beispiel: { href: "/beispiele/", text: "Weitere Vorher/Nachher" },
  },
  {
    id: "rundflug",
    name: "Rundflug-Video",
    titel: "Rundflug wie mit der Drohne",
    text: "Ein Flug um das Haus und durch alle Räume, erstellt aus Ihren Fotos – ohne Drohnenflug, ohne Kamerateam. Ideal als Anzeige und als Video im Exposé.",
    fuer: "Makler & Bauträger",
    medium: { art: "video", src: "/assets/immobilien/rundflug.mp4", poster: "/assets/immobilien/rundflug.jpg", hoch: true },
    ki: true,
  },
  {
    id: "projektseite",
    name: "Projektseite",
    titel: "Projektseite mit allen Einheiten",
    text: "Für Bauprojekte mit mehreren Häusern oder Wohnungen: alle Einheiten mit Verfügbarkeit, Grundriss und Preis, dazu Bau-Updates für Käufer, die schon reserviert haben.",
    fuer: "Bauträger",
    medium: { art: "bild", src: "/assets/immobilien/projektseite.jpg" },
    ki: false,
    beispiel: { href: "/beispiele/projekt/", text: "Beispielseite ansehen" },
  },
  {
    id: "anzeigen",
    name: "Facebook- & Instagram-Anzeigen",
    titel: "Anzeigen auf Facebook & Instagram",
    text: "Wir schalten die Videos als Anzeige bei Menschen, die gerade eine Immobilie suchen. Der Klick landet nicht im Portal, sondern auf der Website Ihres Objekts. Werbekonto und Daten bleiben bei Ihnen.",
    fuer: "Makler & Bauträger",
    medium: { art: "bild", src: "/assets/immobilien/anzeigen.jpg" },
    ki: true,
  },
];

/** Event, mit dem ein „Das will ich“-Knopf die Leistung im Formular ankreuzt. */
export const LEISTUNG_WAEHLEN = "onyx:leistung-waehlen";
