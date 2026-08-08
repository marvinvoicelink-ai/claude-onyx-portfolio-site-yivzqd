import type { ReactNode } from "react";

export type KiAgent = {
  slug: string;
  title: string;
  subtitle: string;
  detail: string;
  bullets: string[];
  icon: ReactNode;
  image: string;
  w: number;
  h: number;
};

export const kiAgenten: KiAgent[] = [
  {
    slug: "telefon-agent",
    title: "Telefon-Agent.",
    subtitle: "Nimmt Anrufe entgegen und schickt die Antwort per E-Mail.",
    detail:
      "Ein KI-Agent geht ans Telefon, nimmt Anrufe und die Informationen des Anrufers auf — und schickt die passende Antwort im Anschluss automatisch per E-Mail an den Kunden. Kein Warten in der Warteschleife, kein verpasster Anruf mehr. Der Agent führt das Gespräch in natürlicher Sprache, erfasst die Anfrage strukturiert und übernimmt genau die Fälle, die sonst bei dir hängen bleiben, wenn niemand ans Telefon gehen kann.",
    bullets: [
      "Nimmt Anrufe rund um die Uhr entgegen, auch außerhalb der Geschäftszeiten",
      "Erfasst die Anfrage strukturiert statt als handschriftliche Notiz",
      "Antwort geht automatisch per E-Mail an den Anrufer raus",
      "Spricht in natürlicher Sprache, kein Warten in der Warteschleife",
      "Übernimmt genau die Anrufe, die sonst unbeantwortet bleiben",
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" width={20} height={20}>
        <path d="M3 5a2 2 0 0 1 2-2h3l2 5-2.5 1.5a11 11 0 0 0 5 5L14 12l5 2v3a2 2 0 0 1-2 2h-1C9.7 19 3 12.3 3 5z" />
      </svg>
    ),
    image: "/generated/ki-agent-telefon.webp",
    w: 1200,
    h: 896,
  },
  {
    slug: "buchungs-agent",
    title: "Buchungs-Agent.",
    subtitle: "Nimmt Buchungen an und trägt sie direkt in den Kalender ein.",
    detail:
      "Ein zweiter Agent übernimmt Terminanfragen per Telefon: Er nimmt die Buchung entgegen und trägt sie direkt in deinen Terminkalender ein — ohne Umweg über Zettel oder Anrufnotiz. Bevor der Termin bestätigt wird, prüft er die tatsächliche Verfügbarkeit, sodass am Ende kein Termin doppelt vergeben oder von Hand nachgetragen werden muss.",
    bullets: [
      "Bucht Termine direkt in deinen bestehenden Kalender",
      "Prüft Verfügbarkeit, bevor der Termin bestätigt wird",
      "Weniger Doppelbuchungen durch separat notierte Anrufe",
      "Führt das Buchungsgespräch in natürlicher Sprache",
      "Reduziert manuelle Kalenderpflege durch dein Team",
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" width={20} height={20}>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M8 3v4M16 3v4M3 10h18" />
        <path d="m9 15 2 2 4-4" />
      </svg>
    ),
    image: "/generated/ki-agent-buchung.webp",
    w: 1200,
    h: 896,
  },
  {
    slug: "anruf-agent",
    title: "Anruf-Agent.",
    subtitle: "Ruft selbst andere Stellen an, um fehlende Informationen einzuholen.",
    detail:
      "Ein dritter Agent wird selbst aktiv: Er ruft andere Stellen an — etwa Lieferanten, Partner oder Kunden —, um Informationen einzuholen oder zu bestätigen, die sonst nirgendwo digital hinterlegt sind und bisher nur telefonisch zu bekommen waren. Statt auf eine Rückmeldung zu warten, greift der Agent selbst zum Hörer und trägt das Ergebnis danach strukturiert in dein System ein.",
    bullets: [
      "Ruft aktiv andere Stellen an, statt auf Rückmeldung zu warten",
      "Holt Informationen ein, die bisher nur telefonisch zu bekommen waren",
      "Trägt das Ergebnis strukturiert in dein System ein",
      "Übernimmt Rückfragen bei Lieferanten, Partnern oder Kunden",
      "Spart dir das eigene Hinterhertelefonieren",
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" width={20} height={20}>
        <path d="M3 5a2 2 0 0 1 2-2h3l2 5-2.5 1.5a11 11 0 0 0 5 5L14 12l5 2v3a2 2 0 0 1-2 2h-1C9.7 19 3 12.3 3 5z" />
        <path d="M16 3h5v5M21 3l-6 6" />
      </svg>
    ),
    image: "/generated/ki-agent-anruf.webp",
    w: 1200,
    h: 896,
  },
];
