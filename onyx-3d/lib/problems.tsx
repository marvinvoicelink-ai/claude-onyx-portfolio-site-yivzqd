import type { ReactNode } from "react";

export type Problem = {
  slug: string;
  num: string;
  title: string;
  highlight: string;
  desc: string;
  detail: string;
  bullets: string[];
  icon: ReactNode;
  image: string;
  w: number;
  h: number;
};

export const problems: Problem[] = [
  {
    slug: "mehrere-tools",
    num: "01",
    title: "Mehrere Tools,",
    highlight: "die nicht zusammenpassen",
    desc: "Excel-Listen, SaaS-Tools, die nie ganz zu deinem Prozess passen.",
    detail:
      "Jedes Tool deckt nur einen Teil deines Ablaufs ab — der Rest läuft über Excel-Listen, Zettel oder im Kopf. Am Ende überträgst du Daten manuell zwischen mehreren Systemen, die eigentlich zusammengehören sollten.",
    bullets: [
      "Daten liegen verteilt in mehreren Tools statt an einem Ort",
      "Manuelle Übertragung zwischen Systemen kostet täglich Zeit",
      "Kein Tool passt wirklich zu deinem echten Ablauf",
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" width={20} height={20}>
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M8 7V5a4 4 0 0 1 8 0v2" />
      </svg>
    ),
    image: "/generated/problem-tools.webp",
    w: 766,
    h: 461,
  },
  {
    slug: "fehlende-funktionen",
    num: "02",
    title: "Funktionen fehlen",
    highlight: "trotzdem",
    desc: "Das nächste Preispaket kostet doppelt, bringt aber nur einen Bruchteil mehr.",
    detail:
      "Genau die eine Funktion, die du brauchst, gibt es erst im nächsten, deutlich teureren Preispaket — obwohl der Rest davon für dich irrelevant ist. Du zahlst für Funktionsumfang, den du nie nutzt, nur um an das eine Feature zu kommen, das dir fehlt.",
    bullets: [
      "Das nächste Preispaket bringt nur einen Bruchteil mehr Funktionen",
      "Du zahlst für Features, die du nie nutzt",
      "Genau die Funktion, die du brauchst, fehlt trotzdem oft",
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" width={20} height={20}>
        <path d="M4 19V9M11 19V5M18 19v-7" />
      </svg>
    ),
    image: "/generated/problem-pricing.webp",
    w: 726,
    h: 462,
  },
  {
    slug: "daten-nicht-bei-dir",
    num: "03",
    title: "Daten liegen",
    highlight: "nicht bei dir",
    desc: "Kundendaten liegen auf fremden Servern, oft außerhalb der EU.",
    detail:
      "Kunden- und Geschäftsdaten liegen auf Servern eines fremden Anbieters, oft sogar außerhalb der EU — mit allen rechtlichen Unsicherheiten, die das für dich als Unternehmer mit sich bringt. Im Streitfall oder bei einer Kündigung des Anbieters hast du kaum Handhabe.",
    bullets: [
      "Kundendaten liegen auf fremden, oft außereuropäischen Servern",
      "DSGVO-Risiken, für die am Ende du haftest",
      "Im Streitfall hast du keinen Zugriff auf die eigene Infrastruktur",
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" width={20} height={20}>
        <rect x="3" y="4" width="18" height="6" rx="1.4" />
        <rect x="3" y="14" width="18" height="6" rx="1.4" />
      </svg>
    ),
    image: "/generated/problem-servers.webp",
    w: 920,
    h: 656,
  },
  {
    slug: "abhaengig-vom-anbieter",
    num: "04",
    title: "Abhängig",
    highlight: "vom Anbieter",
    desc: "Kündigt er den Vertrag oder erhöht die Preise, stehst du ohne Alternative da.",
    detail:
      "Erhöht der Anbieter die Preise, ändert er Funktionen oder kündigt er dir sogar den Vertrag, hast du keine Verhandlungsbasis — du bist von seiner Software und seinen Konditionen abhängig. Ein Wechsel bedeutet oft, wieder bei null anzufangen.",
    bullets: [
      "Preiserhöhungen und Vertragsänderungen ohne Verhandlungsspielraum",
      "Kündigt der Anbieter, stehst du ohne Alternative da",
      "Ein Anbieterwechsel bedeutet oft: alles neu aufsetzen",
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" width={20} height={20}>
        <path d="M17 10V7a5 5 0 0 0-9.9-1" />
        <rect x="4" y="10" width="16" height="10" rx="2" />
      </svg>
    ),
    image: "/generated/problem-lock.webp",
    w: 719,
    h: 578,
  },
  {
    slug: "niemand-am-telefon",
    num: "05",
    title: "Niemand geht",
    highlight: "ans Telefon",
    desc: "Anrufe bleiben liegen, weil niemand Zeit hat, ranzugehen.",
    detail:
      "Kunden rufen an, während dein Team im Tagesgeschäft steckt — niemand hat Zeit, ranzugehen oder zurückzurufen. Jeder verpasste Anruf ist eine verpasste Anfrage oder ein verärgerter Kunde. Genau hier integrieren wir KI-Agenten in dein System, je nachdem, was dir am meisten Zeit spart: Ein Telefon-Agent nimmt eingehende Anrufe entgegen und schickt die Antwort automatisch per E-Mail. Ein Buchungs-Agent nimmt Terminanfragen an und trägt sie direkt in deinen Kalender ein, inklusive Verfügbarkeitsprüfung. Und ein Anruf-Agent wird selbst aktiv — er ruft eigenständig Kunden, Lieferanten oder Partner an, um Informationen einzuholen oder offene Vorgänge nachzufassen, statt dass dein Team hinterhertelefoniert.",
    bullets: [
      "Telefon-Agent nimmt eingehende Anrufe entgegen, auch außerhalb der Geschäftszeiten",
      "Buchungs-Agent trägt Termine direkt in deinen Kalender ein, inklusive Verfügbarkeitsprüfung",
      "Anruf-Agent ruft selbst aktiv an, um Informationen einzuholen oder nachzufassen",
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" width={20} height={20}>
        <path d="M3 5a2 2 0 0 1 2-2h3l2 5-2.5 1.5a11 11 0 0 0 5 5L14 12l5 2v3a2 2 0 0 1-2 2h-1C9.7 19 3 12.3 3 5z" />
      </svg>
    ),
    image: "/generated/problem-telefon.webp",
    w: 749,
    h: 594,
  },
];
