export type Differentiator = {
  slug: string;
  image: string;
  w: number;
  h: number;
  title: string;
  subtitle: string;
  detail: string;
  bullets: string[];
};

export const differentiators: Differentiator[] = [
  {
    slug: "kein-crm-von-der-stange",
    image: "/generated/diff-01.webp",
    w: 691,
    h: 510,
    title: "Kein CRM von der Stange.",
    subtitle: "Dein System wird nach deinem Prozess gebaut.",
    detail:
      "Kein Standardpaket mit festen Modulen — was dein System abdeckt, richtet sich nach deinem tatsächlichen Ablauf, nicht umgekehrt. Du beschreibst, wie bei dir gearbeitet wird, wir übersetzen es in Software.",
    bullets: [
      "Kein Pflichtenkatalog aus Standard-Modulen, die nur halb passen",
      "Jede Automatisierung folgt deinem echten Ablauf, nicht einem Template",
      "Wächst mit, wenn sich dein Prozess später ändert",
      "Individuelle Prozessanalyse vor dem ersten Code",
      "Kein Funktionsumfang, für den du zahlst, aber nie brauchst",
    ],
  },
  {
    slug: "volles-eigentum",
    image: "/generated/diff-02.webp",
    w: 754,
    h: 520,
    title: "Volles Eigentum.",
    subtitle: "Du besitzt Code und Daten - vollständig.",
    detail:
      "Nach der Übergabe gehört dir jede Zeile Code und jeder Datensatz. Kein Anbieter, der Zugriff behält, Lizenzen verlängert oder Funktionen hinter einer Bezahlschranke versteckt.",
    bullets: [
      "Vollständiger Quellcode wird bei der Übergabe ausgehändigt",
      "Keine Abo-Bindung an Onyx nach Projektabschluss",
      "Du entscheidest, wer später daran weiterbaut",
      "Volle Dokumentation für dein Team oder externe Entwickler",
      "Keine versteckten Abhängigkeiten von Onyx-Infrastruktur",
    ],
  },
  {
    slug: "deine-infrastruktur",
    image: "/generated/diff-03.webp",
    w: 822,
    h: 194,
    title: "Deine Infrastruktur.",
    subtitle: "Du hostest auf deinem eigenen Server.",
    detail:
      "DSGVO-konform, in Deutschland bzw. der EU, mit AVV — nicht auf fremden Servern, die du nicht kontrollierst und über die du im Streitfall keine Handhabe hast.",
    bullets: [
      "Hosting bei dir oder deinem Wunschanbieter, nicht bei Onyx",
      "Auftragsverarbeitungsvertrag (AVV) von Anfang an inklusive",
      "Keine Kundendaten auf Servern außerhalb der EU",
      "Volle Kontrolle über Backups und Zugriffsrechte",
      "Unabhängig von Onyx' eigener Infrastruktur",
    ],
  },
  {
    slug: "kein-lock-in",
    image: "/generated/diff-04.webp",
    w: 1220,
    h: 248,
    title: "Kein Lock-in.",
    subtitle: "Nach der Übergabe bist du unabhängig.",
    detail:
      "Kein laufendes Abo, kein Anbieter, der Preise erhöht oder den Vertrag kündigt. Onyx übergibt vollständig und zieht sich zurück — dein System läuft unabhängig davon weiter.",
    bullets: [
      "Keine monatliche Abo-Pflicht nach der Übergabe",
      "Onyx zieht sich nach Projektende bewusst zurück",
      "Du entscheidest, ob und wann weiterentwickelt wird",
      "Übergabe von Code, Zugängen und Dokumentation komplett",
      "Freie Wahl, mit wem du danach weiterarbeitest",
    ],
  },
];
