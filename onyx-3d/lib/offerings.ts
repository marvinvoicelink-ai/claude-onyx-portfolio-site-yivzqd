export type Offering = {
  slug: string;
  image: string;
  w: number;
  h: number;
  title: string;
  subtitle: string;
  detail: string;
  bullets: string[];
};

export const offerings: Offering[] = [
  {
    slug: "kundenportale",
    image: "/generated/solution-01.webp",
    w: 880,
    h: 626,
    title: "Kundenportale.",
    subtitle: "Angebote, Rechnungen, Lieferstatus und Reklamationen einsehen.",
    detail:
      "Deine Kunden sehen den Status ihrer Anfragen, Dokumente und Termine selbst ein — ohne dich anzurufen oder eine E-Mail zu schreiben. Weniger Rückfragen für dich, mehr Transparenz für deine Kunden.",
    bullets: [
      "Kunden sehen Angebote, Rechnungen, Aufträge und Lieferstatus in einem Portal",
      "Serviceanfragen und Reklamationen mit Foto direkt hochladen — das Ticket entsteht automatisch",
      "Frühere Käufe, Garantien und Bedienungsanleitungen jederzeit abrufbar",
      "Weniger Rückfragen per Telefon oder E-Mail",
      "Läuft unter deiner eigenen Marke, nicht als fremdes Tool",
    ],
  },
  {
    slug: "interne-tools",
    image: "/generated/solution-02.webp",
    w: 992,
    h: 630,
    title: "Interne Tools.",
    subtitle: "Baustellenmanagement, Mitarbeiter-App und Lagerverwaltung.",
    detail:
      "Aus Excel-Listen, Zetteln und Insellösungen wird ein eigenes System, das genau zu deinem Ablauf passt — nicht umgekehrt. Für Handwerk und Bau zum Beispiel Baustellenmanagement, eine Mitarbeiter-App fürs Handy und Lagerverwaltung in einem System. Du beschreibst, wie bei dir gearbeitet wird, wir übersetzen es in Software.",
    bullets: [
      "Baustellenmanagement: Projekte, Termine, Materiallisten und Monteure an einem Ort",
      "Mitarbeiter-App fürs Handy — Arbeitszeit erfassen, Fotos hochladen, Material entnehmen, Kunden direkt vor Ort unterschreiben lassen",
      "Lagerverwaltung per Barcode oder QR-Code, mit Mindestbestand und Inventur per Handy",
      "Ersetzt Excel-Listen und Zettelwirtschaft durch ein zentrales Tool",
      "Wächst mit, wenn sich dein Prozess später ändert",
    ],
  },
  {
    slug: "dashboards",
    image: "/generated/solution-03.webp",
    w: 944,
    h: 615,
    title: "Dashboards & Auswertungen.",
    subtitle: "Umsatz, Baustellenstatus und Monteurauslastung live im Blick.",
    detail:
      "Alle wichtigen Zahlen — Umsatz, Auslastung, offene Vorgänge — an einem Ort, live und verständlich aufbereitet. Kein Zusammensuchen aus mehreren Tabellen oder Tools mehr.",
    bullets: [
      "Live-Dashboard für Umsatz, offene Angebote, offene Rechnungen und Lagerwert",
      "Monteurauslastung und Baustellenstatus auf einen Blick",
      "Komplette Kundenhistorie: Angebote, Aufträge, Reklamationen und Ansprechpartner",
      "Verständlich aufbereitet, auch ohne Datenanalyse-Hintergrund",
      "Zeigt genau die Zahlen, die für deinen Betrieb wichtig sind",
    ],
  },
  {
    slug: "automatisierung",
    image: "/generated/solution-04.webp",
    w: 849,
    h: 651,
    title: "Automatisierung & KI-Agenten.",
    subtitle: "Angebotsnachverfolgung, Telefon-Agenten und Reports automatisch.",
    detail:
      "Mails, Reports und Erinnerungen laufen automatisch — kein manuelles Zusammensuchen, kein Vergessen von Follow-ups. Dazu kommen KI-Telefonagenten, die für dich ans Telefon gehen: Anrufe entgegennehmen, Termine direkt in deinen Kalender buchen oder selbst aktiv nachtelefonieren, wenn Informationen fehlen — genau wie jedes andere System vollständig im White-Label übergeben.",
    bullets: [
      "Automatische Angebotsnachverfolgung — Erinnerung nach 5 und 10 Tagen, persönliche Rückmeldung nach 20 Tagen",
      "Telefon-, Buchungs- und Anruf-Agenten übernehmen eingehende und ausgehende Anrufe",
      "KI hilft beim Schreiben von Angeboten und beantwortet E-Mails sowie technische Fragen",
      "Per Sprache statt Tippen: Notizen und Berichte direkt vom Handy diktieren (Speech-to-Text)",
      "Automatisierte Reports & Erinnerungen · ohne manuelles Zutun",
    ],
  },
  {
    slug: "terminplanung",
    image: "/generated/solution-05.webp",
    w: 1048,
    h: 643,
    title: "Termin- & Ressourcenplanung.",
    subtitle: "Termine, Kapazitäten und Wartungsverträge in einem System.",
    detail:
      "Kalender, Kapazitäten und Zuständigkeiten in einem System statt in mehreren Kalendern oder auf Zuruf. Doppelbuchungen und Engpässe werden sichtbar, bevor sie zum Problem werden.",
    bullets: [
      "Wiederkehrende Wartungsverträge mit automatischen Erinnerungen für Gewerbekunden",
      "Zentrale Übersicht über Termine, Kapazitäten und Zuständigkeiten",
      "Weniger Doppelbuchungen durch eine gemeinsame Datenbasis",
      "Engpässe werden früh sichtbar statt erst im Tagesgeschäft",
    ],
  },
  {
    slug: "dokumentenverwaltung",
    image: "/generated/solution-06.webp",
    w: 1074,
    h: 636,
    title: "Dokumenten- & Datenverwaltung.",
    subtitle: "Aufmaß, Pläne und Baustellendoku statt Ordner-Chaos.",
    detail:
      "Eine zentrale, durchsuchbare Ablage statt Ordner-Chaos auf mehreren Laufwerken oder in verschiedenen Tools. Jeder findet das richtige Dokument, ohne im Team nachfragen zu müssen.",
    bullets: [
      "Aufmaß- und Abnahmedokumentation direkt im System statt auf Zetteln",
      "Projektdokumente, Pläne und Berechnungen versioniert an einem Ort",
      "Zentrale, durchsuchbare Ablage statt verstreuter Ordner",
      "Klare Rechte- und Zugriffsverwaltung pro Team oder Kunde",
      "Gehostet bei dir, DSGVO-konform, kein fremder Cloud-Anbieter",
    ],
  },
];
