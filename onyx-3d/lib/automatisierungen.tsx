import type { ReactNode } from "react";

export type Automatisierung = {
  slug: string;
  title: string;
  subtitle: string;
  detail: string;
  bullets: string[];
  icon: ReactNode;
};

export const automatisierungen: Automatisierung[] = [
  {
    slug: "angebote-rechnungen",
    title: "Angebote & Rechnungen.",
    subtitle: "Vom Kundenkontakt zum fertigen Angebot, ohne Tippen.",
    detail:
      "Die Angebotserstellung ist bei den meisten Betrieben der Punkt, an dem am meisten Zeit liegen bleibt: Positionen zusammensuchen, Preise nachschlagen, Text formulieren, PDF bauen, verschicken, nachfassen. Wir automatisieren genau diese Kette — aus den Angaben zum Auftrag entsteht das fertige Angebot mit deinen Positionen, deinen Preisen und deinem Layout, geht raus und wird automatisch nachverfolgt.",
    bullets: [
      "Angebot entsteht aus den Auftragsdaten statt aus einer leeren Vorlage",
      "Deine Preisliste, deine Textbausteine, dein Briefpapier",
      "Automatische Nachverfolgung, wenn der Kunde nicht reagiert",
      "Aus dem angenommenen Angebot wird direkt die Rechnung",
      "Zahlungserinnerungen laufen automatisch, ohne dass du sie im Kopf behalten musst",
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" width={20} height={20}>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6M9 13h6M9 17h4" />
      </svg>
    ),
  },
  {
    slug: "bestehende-systeme",
    title: "KI-Agenten in bestehenden Systemen.",
    subtitle: "Dein Tool bleibt — der Agent setzt sich obendrauf.",
    detail:
      "Du musst nichts wegwerfen, um mit KI zu arbeiten. Wenn du bereits ein ERP, ein CRM, eine Warenwirtschaft oder ein Branchenprogramm im Einsatz hast, setzen wir unsere KI-Agenten direkt in dieses bestehende System hinein — über die vorhandenen Schnittstellen. Der Agent liest und schreibt dort, wo deine Daten ohnehin schon liegen, und dein Team arbeitet weiter in der Oberfläche, die es kennt.",
    bullets: [
      "Anbindung an dein vorhandenes ERP, CRM oder Branchenprogramm",
      "Kein Systemwechsel, keine Datenmigration, kein neues Tool zum Lernen",
      "Der Agent liest und schreibt direkt in deinem bestehenden Datenbestand",
      "Auch für gewachsene Setups aus mehreren Programmen",
      "Läuft auf deiner Infrastruktur und gehört danach dir",
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" width={20} height={20}>
        <rect x="2" y="3" width="20" height="8" rx="2" />
        <rect x="2" y="13" width="20" height="8" rx="2" />
        <path d="M6 7h.01M6 17h.01" />
      </svg>
    ),
  },
  {
    slug: "dokumente-daten",
    title: "Dokumente & Datenerkennung.",
    subtitle: "Eingangsrechnungen, Lieferscheine und Formulare automatisch auslesen.",
    detail:
      "Papier und PDFs sind in den meisten Betrieben immer noch Handarbeit: abtippen, zuordnen, ablegen. Wir lassen die KI die Dokumente lesen — Eingangsrechnungen, Lieferscheine, Verträge, ausgefüllte Formulare — und die Daten strukturiert dort landen, wo sie hingehören. Was nicht eindeutig ist, wird zur Prüfung vorgelegt statt still falsch verbucht.",
    bullets: [
      "Eingangsrechnungen und Lieferscheine werden ausgelesen statt abgetippt",
      "Beträge, Positionen und Lieferanten werden automatisch zugeordnet",
      "Ein Foto vom Handy reicht, etwa vom Lieferschein bei der Warenannahme",
      "Unklare Fälle werden zur Prüfung vorgelegt, nicht stillschweigend verbucht",
      "Alles landet strukturiert in deinem System statt in einem Ordner",
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" width={20} height={20}>
        <path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2" />
        <path d="M7 12h10" />
      </svg>
    ),
  },
  {
    slug: "kommunikation",
    title: "E-Mails & Kommunikation.",
    subtitle: "Anfragen werden sortiert, beantwortet und weitergeleitet.",
    detail:
      "Ein volles Postfach ist selten ein Postfach-Problem — es ist ein Sortier-Problem. Wir bauen Automatisierungen, die eingehende Anfragen erkennen, dem richtigen Vorgang zuordnen und die Standardfälle direkt beantworten. Was eine echte Entscheidung braucht, landet weiterhin bei dir, aber vorbereitet statt roh.",
    bullets: [
      "Eingehende Anfragen werden erkannt und dem richtigen Vorgang zugeordnet",
      "Wiederkehrende Standardfragen werden automatisch beantwortet",
      "Antwortentwürfe werden vorbereitet, du gibst nur noch frei",
      "Weiterleitung an die zuständige Person statt an einen Sammelverteiler",
      "Nichts geht unter, auch wenn viel gleichzeitig reinkommt",
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" width={20} height={20}>
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m2 7 10 7 10-7" />
      </svg>
    ),
  },
  {
    slug: "prozesse",
    title: "Abläufe zwischen deinen Tools.",
    subtitle: "Was heute per Copy-Paste läuft, läuft künftig von selbst.",
    detail:
      "Die meiste unsichtbare Arbeit entsteht zwischen den Programmen: Daten aus einem Tool in das nächste übertragen, Listen abgleichen, Status nachpflegen, jemanden informieren. Wir bilden diese Übergaben als Automatisierung ab — mit Fehlerbehandlung und Protokoll, damit du jederzeit siehst, was gelaufen ist, und nicht blind darauf vertrauen musst.",
    bullets: [
      "Datenübergaben zwischen deinen Programmen laufen automatisch",
      "Wiederkehrende Auswertungen und Reports kommen von selbst",
      "Erinnerungen und Fristen werden überwacht statt im Kopf behalten",
      "Jeder Lauf wird protokolliert — du siehst, was passiert ist",
      "Fehlerfälle werden gemeldet statt still übergangen",
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" width={20} height={20}>
        <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
        <path d="M21 3v5h-5" />
        <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
        <path d="M3 21v-5h5" />
      </svg>
    ),
  },
];
