import Image from "next/image";

/**
 * Gebaute Systeme nebeneinander, je ein Screen und zwei Saetze dazu.
 *
 * Steht am Ende der Ausgangslage: erst die Probleme, dann als Antwort das,
 * was am Ende dabei herauskommt. Ersetzt die frueheren zwei Zeilen "Aus
 * Tool-Chaos wird ein System" mit Illustration — die haben das Ergebnis nur
 * behauptet, hier ist es zu sehen.
 */
const systems = [
  {
    branche: "Garten- & Landschaftsbau",
    title: "Projekte, die über Wochen laufen.",
    text: "Angebote, Projektstatus, Auslastung und Bestände in einem Dashboard. Der Wortschatz folgt dem Betrieb: hier heißen Aufträge Projekte und laufen über Wochen statt über Tage.",
    image: "/generated/tablet-garten.png",
    alt: "Dashboard für ein Unternehmen mit Projektgeschäft: Angebote, Projektstatus und Auslastung",
  },
  {
    branche: "Handwerk & Dienstleistung",
    title: "Angebot, Rechnung, Zahlungseingang — ohne Nachfassen.",
    text: "Offene Rechnungen, laufende Aufträge und knappe Bestände auf einen Blick. Zahlungserinnerungen gehen automatisch raus, jeder Schritt landet im Protokoll.",
    image: "/generated/tablet-handwerk.png",
    alt: "Dashboard eines Dienstleistungsbetriebs: offene Rechnungen, Aufträge, Bestände und automatische Aktionen",
  },
  {
    branche: "Hausverwaltung",
    title: "Jedes Gebäude mit eigenem Profil.",
    text: "Objekte, Aufträge, Mieter, Schäden und Dokumente in einem System statt in fünf Tabellen. Gebaut, übergeben und beim Kunden gehostet.",
    image: "/generated/hausmanager-case.jpg",
    alt: "HausManager Pro: Auftragsübersicht mit Objekt, Mitarbeiter, Priorität und Status",
  },
  {
    branche: "Immobilien & Makler",
    title: "Objekt, Exposé und Nachweise in einer Akte.",
    text: "Fotos direkt am Objekt aufnehmen, Unterlagen, Investoren und Termine im selben Vorgang. Vor dem Versand prüft das System selbst, ob Provisionsvereinbarung, Widerrufsbelehrung und Adressvalidierung vorliegen, und hält das Exposé zurück, solange etwas fehlt. Ein Klick legt die Akte als App aufs Handy.",
    image: "/generated/tablet-immobilien.png",
    alt: "Maklersoftware: Objektakte mit Kaufpreis, Mieteinnahmen, Faktor, Erfassungsbogen und den Prüfungen vor dem Exposé-Versand",
  },
];

export default function BuiltSystems() {
  return (
    <div className="mt-12">
      <div className="text-center mb-9">
        <h3
          style={{
            fontFamily: "var(--font-archivo), sans-serif",
            fontWeight: 800,
            fontSize: "clamp(1.4rem, 2.8vw, 1.9rem)",
            lineHeight: 1.15,
            marginBottom: 10,
          }}
        >
          Aus Tool-Chaos wird ein System.
        </h3>
        <p className="mx-auto" style={{ color: "var(--warm-grey-dim)", fontSize: "1.02rem", lineHeight: 1.7, maxWidth: "60ch" }}>
          Verschiedene Branchen, ein Prinzip: gebaut nach dem Ablauf des
          Betriebs statt nach einer Vorlage, mit Automatisierung von Anfang an
          — und danach vollständig übergeben.
        </p>
      </div>

      {/* Vier Systeme, deshalb zwei Spalten statt drei: sonst haengt das
          vierte allein in der zweiten Reihe. Groessere Kacheln lassen die
          Screens ausserdem lesbar. */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {systems.map((s) => (
          <div
            key={s.branche}
            className="rounded-2xl overflow-hidden on-dark silver-rim flex flex-col"
            style={{ background: "var(--near-black-2)", border: "1px solid var(--hairline)" }}
          >
            <div className="relative w-full" style={{ aspectRatio: "16 / 10" }}>
              <Image
                src={s.image}
                alt={s.alt}
                fill
                sizes="(min-width: 768px) 50vw, 92vw"
                style={{ objectFit: "cover", objectPosition: "top" }}
              />
            </div>
            <div className="px-6 py-5">
              <span
                className="mono block mb-2"
                style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--amber)" }}
              >
                {s.branche}
              </span>
              <div style={{ fontWeight: 700, fontSize: "1.05rem", marginBottom: 7, lineHeight: 1.3 }}>
                {s.title}
              </div>
              <p style={{ color: "var(--warm-grey-dim)", fontSize: "0.95rem", lineHeight: 1.6 }}>
                {s.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
