export type Offering = {
  slug: string;
  image: string;
  w: number;
  h: number;
  title: string;
  subtitle: string;
  detail: string;
  bullets: string[];
  /** Kurzfassung für <meta description> der Detailseite. */
  meta: string;
  /** Woran es im Alltag konkret hakt — Einstieg der Detailseite. */
  painPoints: string[];
  /** Ein durchgespieltes Beispiel aus einem echten Betrieb. */
  beispiel: { title: string; text: string };
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
      "Deine Kunden sehen den Status ihrer Anfragen, Dokumente und Termine selbst ein, ohne dich anzurufen oder eine E-Mail zu schreiben. Weniger Rückfragen für dich, mehr Transparenz für deine Kunden.",
    meta: "Ein Kundenportal unter deiner Marke: Kunden sehen Angebote, Rechnungen, Aufträge und Lieferstatus selbst ein. Gebaut von Onyx.AI, vollständig übergeben.",
    painPoints: [
      "„Wie ist der Stand?“ — dieselbe Frage, dreimal die Woche, von verschiedenen Kunden.",
      "Rechnungen und Lieferscheine werden nachgefragt, weil sie im Postfach des Kunden untergegangen sind.",
      "Reklamationen kommen per Anruf herein und landen als Notiz auf einem Zettel.",
    ],
    beispiel: {
      title: "So sieht das beim Kunden aus",
      text: "Ein Gewerbekunde loggt sich mit seinen Zugangsdaten ein und sieht auf der Startseite seine laufenden Aufträge mit Status. Ein Klick weiter liegen alle Angebote und Rechnungen der letzten Jahre als PDF, durchsuchbar. Hat er ein Problem mit einer Lieferung, lädt er ein Foto hoch und beschreibt kurz, was nicht stimmt. Bei dir entsteht daraus automatisch ein Vorgang mit Foto, Auftragsnummer und Zeitstempel. Niemand muss telefonieren, und niemand muss nachträglich rekonstruieren, worum es ging.",
    },
    bullets: [
      "Kunden sehen Angebote, Rechnungen, Aufträge und Lieferstatus in einem Portal",
      "Serviceanfragen und Reklamationen mit Foto hochladen, das Ticket entsteht automatisch",
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
      "Aus Excel-Listen, Zetteln und Insellösungen wird ein System, das zu deinem Ablauf passt statt umgekehrt. Du beschreibst, wie bei dir gearbeitet wird, wir übersetzen es in Software.",
    meta: "Baustellenmanagement, Mitarbeiter-App und Lagerverwaltung in einem System, gebaut nach deinem Ablauf. Von Onyx.AI entwickelt und vollständig übergeben.",
    painPoints: [
      "Der Monteur notiert Arbeitszeiten auf Papier, im Büro tippt sie jemand ab.",
      "Materialentnahme merkt sich jeder anders, der Lagerbestand stimmt nie ganz.",
      "Wer wissen will, wie eine Baustelle steht, muss anrufen.",
    ],
    beispiel: {
      title: "Ein Tag auf der Baustelle",
      text: "Morgens öffnet der Monteur die App auf dem Handy und sieht seine Baustellen für heute. Er stempelt ein, entnimmt Material per QR-Code aus dem Lagerbestand und fotografiert den Zustand vor Arbeitsbeginn. Am Nachmittag lässt er den Kunden direkt auf dem Display unterschreiben. Im Büro ist der Auftrag damit dokumentiert, die Stunden sind erfasst und das Lager ist abgebucht, bevor jemand danach fragen muss.",
    },
    bullets: [
      "Baustellenmanagement: Projekte, Termine, Materiallisten und Monteure an einem Ort",
      "Mitarbeiter-App fürs Handy: Zeit erfassen, Fotos hochladen, Material entnehmen, Kunden unterschreiben lassen",
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
      "Alle wichtigen Zahlen an einem Ort, live und verständlich aufbereitet. Kein Zusammensuchen aus mehreren Tabellen oder Tools mehr.",
    meta: "Live-Dashboards für Umsatz, Auslastung und offene Vorgänge, aufbereitet für deinen Betrieb. Gebaut von Onyx.AI und vollständig übergeben.",
    painPoints: [
      "Die Zahlen für das Monatsgespräch werden jedes Mal neu aus drei Tabellen zusammengebaut.",
      "Ob ein Auftrag am Ende Geld gebracht hat, weiß man erst Wochen später.",
      "Auslastung schätzt man aus dem Bauch, weil niemand sie sauber sieht.",
    ],
    beispiel: {
      title: "Montagmorgen, ein Blick",
      text: "Statt Tabellen zu exportieren, öffnest du eine Seite. Oben stehen die Zahlen, die für dich zählen: offene Angebote, überfällige Rechnungen, Umsatz im laufenden Monat, Wert des Lagers. Darunter siehst du, welche Baustellen laufen und wer auf welcher Baustelle eingeplant ist. Fällt eine Zahl aus dem Rahmen, klickst du sie an und landest bei den Vorgängen dahinter, statt bei einer weiteren Auswertung.",
    },
    bullets: [
      "Live-Dashboard für Umsatz, offene Angebote, offene Rechnungen und Lagerwert",
      "Monteurauslastung und Baustellenstatus auf einen Blick",
      "Komplette Kundenhistorie: Angebote, Aufträge, Reklamationen und Ansprechpartner",
      "Verständlich aufbereitet, auch ohne Datenanalyse-Hintergrund",
      "Zeigt die Zahlen, die für deinen Betrieb wichtig sind, nicht die aus einer Vorlage",
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
      "Mails, Reports und Erinnerungen laufen von selbst. Dazu kommen KI-Telefonagenten, die für dich ans Telefon gehen: Anrufe annehmen, Termine in deinen Kalender buchen oder selbst nachtelefonieren, wenn Informationen fehlen.",
    meta: "Automatisierte Angebotsnachverfolgung, Reports und KI-Telefonagenten für deinen Betrieb. Auch in deinem bestehenden ERP oder CRM. Von Onyx.AI gebaut und übergeben.",
    painPoints: [
      "Angebote gehen raus und niemand fasst nach, weil es im Tagesgeschäft untergeht.",
      "Anrufe bleiben liegen, wenn alle im Einsatz sind.",
      "Dieselben Daten werden von Hand aus einem Programm ins nächste übertragen.",
    ],
    beispiel: {
      title: "Ein Angebot, das sich selbst hinterherläuft",
      text: "Du schickst ein Angebot raus. Nach fünf Tagen ohne Reaktion geht eine freundliche Erinnerung raus, nach zehn Tagen die zweite. Meldet sich der Kunde immer noch nicht, landet der Vorgang nach zwanzig Tagen als Aufgabe bei dir, mit allem, was dazugehört. Parallel nimmt ein Telefon-Agent die Anrufe an, die sonst ins Leere laufen, und schickt dem Anrufer die Antwort per Mail. Was du davon merkst: Es fällt weniger runter.",
    },
    bullets: [
      "Automatische Angebotsnachverfolgung: Erinnerung nach 5 und 10 Tagen, persönliche Rückmeldung nach 20 Tagen",
      "Telefon-, Buchungs- und Anruf-Agenten übernehmen eingehende und ausgehende Anrufe",
      "KI hilft beim Schreiben von Angeboten und beantwortet wiederkehrende E-Mails",
      "Per Sprache statt Tippen: Notizen und Berichte direkt vom Handy diktieren",
      "Läuft auch in dem ERP oder CRM, das du schon im Einsatz hast",
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
    meta: "Termin- und Ressourcenplanung mit Kapazitäten und wiederkehrenden Wartungsverträgen in einem System. Gebaut von Onyx.AI und vollständig übergeben.",
    painPoints: [
      "Zwei Kollegen sagen demselben Kunden zwei verschiedene Termine zu.",
      "Wartungsverträge fallen durch, weil sie niemand im Kalender hatte.",
      "Ob nächste Woche überhaupt noch jemand frei ist, weiß nur einer im Kopf.",
    ],
    beispiel: {
      title: "Wartung, die nicht vergessen wird",
      text: "Ein Gewerbekunde hat einen Wartungsvertrag mit zwei Terminen im Jahr. Sechs Wochen vor dem fälligen Termin meldet sich das System bei der Disposition, schlägt freie Slots vor und berücksichtigt dabei, wer die Anlage beim letzten Mal betreut hat. Der Kunde bekommt einen Terminvorschlag, bestätigt ihn, und der Einsatz steht im Plan. Niemand musste sich das Datum merken.",
    },
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
      "Eine zentrale, durchsuchbare Ablage statt Ordner-Chaos auf mehreren Laufwerken. Jeder findet das richtige Dokument, ohne im Team nachzufragen.",
    meta: "Zentrale, durchsuchbare Ablage für Aufmaß, Pläne und Projektdokumente, gehostet bei dir. Gebaut von Onyx.AI und vollständig übergeben.",
    painPoints: [
      "Der aktuelle Plan liegt in drei Versionen auf zwei Laufwerken.",
      "Wer eine Abnahmedokumentation von vor zwei Jahren braucht, sucht eine halbe Stunde.",
      "Aufmaße stehen auf Zetteln, die im Auto liegen bleiben.",
    ],
    beispiel: {
      title: "Der Plan, den alle meinen",
      text: "Jedes Projekt hat eine Akte. Darin liegen Pläne, Aufmaße, Fotos und Abnahmen, versioniert und mit Datum. Wer die Datei öffnet, sieht sofort, ob es eine neuere Fassung gibt. Der Kunde bekommt Zugriff nur auf das, was ihn betrifft, der Nachunternehmer nur auf seinen Teil. Gesucht wird über den Inhalt, nicht über den Ordnernamen, den vor drei Jahren jemand vergeben hat.",
    },
    bullets: [
      "Aufmaß- und Abnahmedokumentation direkt im System statt auf Zetteln",
      "Projektdokumente, Pläne und Berechnungen versioniert an einem Ort",
      "Zentrale Ablage, die sich über den Inhalt durchsuchen lässt",
      "Klare Rechte- und Zugriffsverwaltung pro Team oder Kunde",
      "Gehostet bei dir, DSGVO-konform, kein fremder Cloud-Anbieter",
    ],
  },
];

export function getOffering(slug: string) {
  return offerings.find((o) => o.slug === slug);
}
