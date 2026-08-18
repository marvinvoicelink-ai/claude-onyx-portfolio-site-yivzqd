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
  /** Echter Kundencase, der zu diesem Baustein passt. Bewusst optional —
      lieber keine Referenz als eine, die nicht wirklich passt. */
  referenz?: {
    tag: string;
    name: string;
    heading: string;
    desc: string;
    bullets: string[];
    image: string;
    logo?: string;
  };
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
    referenz: {
      tag: "Kundencase · Online-Shop",
      name: "PawPlace (HWD Handelsagentur)",
      heading: "Support-Anfragen zentral im Blick statt verstreut in Postfächern.",
      desc: "Für den Online-Shop PawPlace der HWD Handelsagentur haben wir ein Dashboard gebaut, das Kunden, Bestellstatus und offene Support-Tickets an einem Ort zeigt.",
      bullets: [
        "Kundenliste mit Bestellstatus auf einen Blick",
        "Offene Support-Tickets sofort sichtbar markiert",
        "Kein Suchen mehr in mehreren Postfächern",
      ],
      image: "/generated/pawplace-case.png",
      logo: "/logos/pawplace.png",
    },
  },
  {
    slug: "interne-tools",
    image: "/generated/solution-02.webp",
    w: 992,
    h: 630,
    title: "Interne Tools.",
    subtitle: "Projektsteuerung, App fürs Team und Bestandsverwaltung.",
    detail:
      "Aus Excel-Listen, Zetteln und Insellösungen wird ein System, das zu deinem Ablauf passt statt umgekehrt. Du beschreibst, wie bei dir gearbeitet wird, wir übersetzen es in Software.",
    meta: "Projektsteuerung, eine App fürs Team und Bestandsverwaltung in einem System, gebaut nach dem Ablauf deines Unternehmens. Von Onyx.AI entwickelt und vollständig übergeben.",
    painPoints: [
      "Zeiten und Aufwände werden irgendwo notiert und später von Hand ins System übertragen.",
      "Jede Abteilung führt ihre eigene Liste, und keine davon stimmt vollständig.",
      "Wer den Stand eines Vorgangs wissen will, muss jemanden anrufen.",
    ],
    beispiel: {
      title: "Ein Vorgang, von Anfang bis Ende",
      text: "Ein Auftrag kommt herein und liegt sofort als Vorgang im System, mit Verantwortlichem und Termin. Wer daran arbeitet, erfasst seine Zeit dort, wo er ohnehin arbeitet, und hängt Dokumente direkt an den Vorgang. Verbrauchte Bestände werden beim Buchen abgezogen. In der Verwaltung ist damit alles beisammen, bevor jemand danach fragen muss: Aufwand, Stand, Unterlagen.",
    },
    bullets: [
      "Projekte, Termine, Ressourcen und Zuständigkeiten an einem Ort",
      "App fürs Team: Zeiten erfassen, Dokumente anhängen, Vorgänge unterwegs abschließen",
      "Bestandsverwaltung mit Mindestmengen und Inventur, auch mobil",
      "Ersetzt gewachsene Excel-Landschaften durch ein zentrales System",
      "Wächst mit, wenn sich dein Prozess später ändert",
    ],
    referenz: {
      tag: "Kundencase · gebaut & übergeben",
      name: "HausManager Pro",
      heading: "Vom Excel-Chaos zum eigenen System.",
      desc: "Für eine Hausverwaltung haben wir ein komplettes CRM von Grund auf entwickelt und vollständig übergeben. Kein Produkt zum Kaufen, sondern ein Beispiel dafür, was für dein Unternehmen möglich ist.",
      bullets: [
        "Individuelle Prozessanalyse & Konzept",
        "Vollständige Entwicklung im Onyx-Standard",
        "Übergabe von Code, Zugängen & Doku",
      ],
      image: "/generated/chaos-to-portal.webp",
      logo: "/logos/hwp.png",
    },
  },
  {
    slug: "dashboards",
    image: "/generated/solution-03.webp",
    w: 944,
    h: 615,
    title: "Dashboards & Auswertungen.",
    subtitle: "Umsatz, Projektstatus und Auslastung live im Blick.",
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
      text: "Statt Tabellen zu exportieren, öffnest du eine Seite. Oben stehen die Zahlen, die für dich zählen: offene Angebote, überfällige Rechnungen, Umsatz im laufenden Monat, gebundene Mittel. Darunter siehst du, welche Projekte laufen und wer wo eingeplant ist. Fällt eine Zahl aus dem Rahmen, klickst du sie an und landest bei den Vorgängen dahinter, statt bei einer weiteren Auswertung.",
    },
    bullets: [
      "Live-Dashboard für Umsatz, offene Angebote, offene Rechnungen und Lagerwert",
      "Auslastung der Teams und Status der laufenden Projekte auf einen Blick",
      "Komplette Kundenhistorie: Angebote, Aufträge, Reklamationen und Ansprechpartner",
      "Verständlich aufbereitet, auch ohne Datenanalyse-Hintergrund",
      "Zeigt die Zahlen, die für deinen Betrieb wichtig sind, nicht die aus einer Vorlage",
    ],
    referenz: {
      tag: "Kundencase · Herstellung",
      name: "Haas Wasserkraft",
      heading: "Materialbestand und Umsatz in einem System statt zwei Baustellen.",
      desc: "Haas Wasserkraft stellt Filter für sauberes Wasser her. Wir haben ein Tool gebaut, das zeigt, welche Metalle und Produkte gerade fehlen und nachbestellt werden müssen, mit einem kompletten CRM für Umsätze und Kunden dahinter.",
      bullets: [
        "Bestandsübersicht mit Warnung bei niedrigem Lagerbestand",
        "Direkte Nachbestellung aus dem Tool heraus",
        "CRM mit Umsätzen und Kundenverwaltung im selben System",
      ],
      image: "/generated/haas-wasserkraft-case.png",
      logo: "/logos/haas-wasserkraft.png",
    },
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
    referenz: {
      tag: "Kundencase · Automatisierung",
      name: "WETBlock",
      heading: "Vom manuellen Versand zur automatisierten Kundenansprache.",
      desc: "Für WETBlock haben wir den E-Mail-Outreach an ihre Geschäftskunden automatisiert. Vorher musste das Team jede Ansprache von Hand schreiben und verschicken, heute läuft das automatisch.",
      bullets: [
        "Automatischer Versand ohne manuelles Schreiben",
        "Automatisches Nachfassen bei Antworten oder Funkstille",
        "Zentrale Auswertung, welche Ansprache ankommt",
      ],
      image: "/generated/wetblock-case.webp",
    },
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
    referenz: {
      tag: "Kundencase · Pension & Weinstube",
      name: "Rebstöckel",
      heading: "Zimmerbelegung auf einen Blick statt Zettelwirtschaft.",
      desc: "Für die Pension Rebstöckel haben wir ein Dashboard gebaut, das in Echtzeit zeigt, welche Zimmer frei und welche belegt sind, ohne Excel-Liste oder Buch an der Rezeption.",
      bullets: [
        "Zimmerübersicht mit Status frei/belegt in Echtzeit",
        "Belegungsquote auf einen Blick",
        "Weniger Doppelbuchungen durch eine zentrale Übersicht",
      ],
      image: "/generated/rebstoeckel-case.png",
      logo: "/logos/rebstoeckel.png",
    },
  },
  {
    slug: "dokumentenverwaltung",
    image: "/generated/solution-06.webp",
    w: 1074,
    h: 636,
    title: "Dokumenten- & Datenverwaltung.",
    subtitle: "Verträge, Pläne und Projektakten statt Ordner-Chaos.",
    detail:
      "Eine zentrale, durchsuchbare Ablage statt Ordner-Chaos auf mehreren Laufwerken. Jeder findet das richtige Dokument, ohne im Team nachzufragen.",
    meta: "Zentrale, durchsuchbare Ablage für Verträge, Pläne und Projektakten, gehostet bei dir. Gebaut von Onyx.AI und vollständig übergeben.",
    painPoints: [
      "Der aktuelle Plan liegt in drei Versionen auf zwei Laufwerken.",
      "Wer eine Abnahmedokumentation von vor zwei Jahren braucht, sucht eine halbe Stunde.",
      "Unterlagen entstehen unterwegs und landen erst Tage später in der Ablage.",
    ],
    beispiel: {
      title: "Der Plan, den alle meinen",
      text: "Jedes Projekt hat eine Akte. Darin liegen Verträge, Pläne, Nachweise und Abnahmen, versioniert und mit Datum. Wer eine Datei öffnet, sieht sofort, ob es eine neuere Fassung gibt. Der Kunde bekommt Zugriff nur auf das, was ihn betrifft, ein Dienstleister nur auf seinen Teil. Gesucht wird über den Inhalt, nicht über den Ordnernamen, den vor drei Jahren jemand vergeben hat.",
    },
    bullets: [
      "Nachweise und Abnahmen entstehen direkt im System statt nebenher",
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
