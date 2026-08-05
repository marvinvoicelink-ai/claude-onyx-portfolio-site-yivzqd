export type Industry = {
  slug: string;
  label: string;
  intro: string;
  painPoints: string[];
  capabilities: string[];
  recommended: string[]; // offering slugs, see lib/offerings.ts
};

export const industries: Industry[] = [
  {
    slug: "handwerk-bau",
    label: "Handwerk & Bau",
    intro:
      "Angebote, Aufmaße, Baustellendoku und Material-Nachbestellung laufen bei den meisten Betrieben über Zettel, WhatsApp und Excel parallel. Wir bringen das in ein System, das zu deinem Ablauf auf der Baustelle passt.",
    painPoints: [
      "Angebote, Aufmaße und Baustellendoku laufen über Zettel, WhatsApp und Excel parallel",
      "Material-Nachbestellung passiert auf Zuruf statt zentral erfasst",
      "Rechnungen und Angebote entstehen aus mehreren Vorlagen statt einem System",
    ],
    capabilities: [
      "Digitale Auftrags- und Baustellenübersicht mit Status je Projekt",
      "Materialbestand und Nachbestellung zentral statt auf Zuruf",
      "Foto- und Baustellendokumentation direkt im System, nicht verteilt auf Handys",
      "Angebote und Rechnungen aus einem Tool statt mehreren Vorlagen",
    ],
    recommended: ["interne-tools", "dokumentenverwaltung", "terminplanung"],
  },
  {
    slug: "hausverwaltung-immobilien",
    label: "Hausverwaltung & Immobilien",
    intro:
      "Mehrere Objekte, Mieteranfragen, Dokumente und Termine — genau das Problem, für das wir HausManager Pro gebaut haben. Ein CRM, das Status, Dokumente und Belegung an einem Ort zeigt.",
    painPoints: [
      "Mehrere Objekte, Mieteranfragen und Dokumente laufen unkoordiniert nebeneinander",
      "Mieter oder Eigentümer müssen für den Status anrufen oder eine E-Mail schreiben",
      "Belegungsübersicht fehlt oder ist nicht aktuell",
    ],
    capabilities: [
      "Kundenportal, in dem Mieter oder Eigentümer den Status selbst einsehen",
      "Zentrale, durchsuchbare Dokumentenablage je Objekt",
      "Zimmer- oder Objektbelegung in Echtzeit auf einen Blick",
      "Weniger Rückfragen per Anruf oder E-Mail an die Verwaltung",
    ],
    recommended: ["kundenportale", "dokumentenverwaltung", "dashboards"],
  },
  {
    slug: "personaldienstleistung",
    label: "Personaldienstleistung",
    intro:
      "Bewerberverwaltung, Einsatzplanung und Kundenkommunikation laufen oft über mehrere Tools gleichzeitig. Ein System, das Verfügbarkeiten, Einsätze und Nachfassen zusammenführt, spart hier am meisten Zeit.",
    painPoints: [
      "Bewerberverwaltung und Einsatzplanung laufen über mehrere Tools gleichzeitig",
      "Nachfassen bei offenen Anfragen oder Terminen kostet manuell viel Zeit",
      "Auslastung und Vermittlungsquote sind schwer sauber auszuwerten",
    ],
    capabilities: [
      "Zentrale Bewerber- und Mitarbeiterübersicht statt verteilter Listen",
      "Einsatz- und Schichtplanung mit Blick auf Verfügbarkeiten",
      "Automatisiertes Nachfassen bei offenen Anfragen oder Terminen",
      "Auswertungen zu Auslastung und Vermittlungsquote auf einen Blick",
    ],
    recommended: ["terminplanung", "automatisierung", "dashboards"],
  },
  {
    slug: "logistik-spedition",
    label: "Logistik & Spedition",
    intro:
      "Sendungsstatus, Disposition und Lagerbestand ändern sich stündlich — Kunden wollen den Stand trotzdem sofort wissen, ohne anzurufen. Genau dafür bauen wir Dashboards und Kundenportale.",
    painPoints: [
      "Sendungsstatus und Disposition ändern sich stündlich, Kunden erfahren es nicht automatisch",
      "Kunden rufen für Status-Updates an, statt selbst nachschauen zu können",
      "Lagerbestand ist über mehrere Listen verteilt statt zentral im Blick",
    ],
    capabilities: [
      "Live-Dashboard für Sendungen, Auslastung und Disposition",
      "Kundenportal für Statusabfragen ohne Anruf beim Disponenten",
      "Automatisierte Status-Updates per E-Mail statt manueller Nachrichten",
      "Lagerbestand zentral im Blick statt in separaten Listen",
    ],
    recommended: ["dashboards", "kundenportale", "automatisierung"],
  },
  {
    slug: "praxen-gesundheitswesen",
    label: "Praxen & Gesundheitswesen",
    intro:
      "Terminvergabe, Patientendaten und Erinnerungen brauchen ein System, das Zeit spart und dabei DSGVO-konform bleibt. Wir bauen genau diesen Rahmen, gehostet bei dir statt bei einem fremden Anbieter.",
    painPoints: [
      "Terminvergabe und Erinnerungen laufen über manuelle Anrufe",
      "Patientendaten müssen DSGVO-konform bleiben, oft schwierig bei fremden Anbietern",
      "Hohes Telefonaufkommen durch fehlende digitale Abläufe",
    ],
    capabilities: [
      "Terminplanung mit automatischen Erinnerungen statt manueller Anrufe",
      "Patienten- und Aktendaten zentral, DSGVO-konform, auf deiner Infrastruktur",
      "Weniger Telefonaufkommen durch klare, digitale Abläufe",
      "Auswertungen zu Auslastung und Terminausfällen",
    ],
    recommended: ["terminplanung", "dokumentenverwaltung", "automatisierung"],
  },
  {
    slug: "handel-e-commerce",
    label: "Handel & E-Commerce",
    intro:
      "Bestellungen, Support-Anfragen und Lagerbestand verteilt über mehrere Postfächer — genau das Problem, das wir für PawPlace gelöst haben. Ein Dashboard bringt alles an einen Ort.",
    painPoints: [
      "Bestellungen und Support-Anfragen verteilt über mehrere Postfächer",
      "Lagerbestand muss manuell nachgezählt statt live eingesehen werden",
      "Kundenkommunikation bei Status-Änderungen läuft nicht automatisch",
    ],
    capabilities: [
      "Zentrales Dashboard für Bestellungen, Kunden und offene Support-Tickets",
      "Lagerbestand live im Blick statt Nachzählen im System",
      "Automatisierte Kundenkommunikation bei Status-Änderungen",
      "Kein Suchen mehr in mehreren Postfächern nach offenen Anfragen",
    ],
    recommended: ["dashboards", "automatisierung", "kundenportale"],
  },
  {
    slug: "beratung-agenturen",
    label: "Beratung & Agenturen",
    intro:
      "Projektstatus für Kunden, interne Kapazitätsplanung und wiederkehrendes Reporting kosten in Beratungen und Agenturen am meisten Zeit im Tagesgeschäft. Wir bauen ein System, das diese drei Dinge zusammenführt.",
    painPoints: [
      "Kunden fragen den Projektstatus per Anruf oder wöchentlichem Call ab",
      "Interne Kapazitätsplanung läuft über mehrere Tools oder Excel",
      "Reports werden manuell für jeden Kunden neu zusammengestellt",
    ],
    capabilities: [
      "Kundenportal mit Projektstatus statt wöchentlicher Status-Calls",
      "Interne Kapazitäts- und Ressourcenplanung auf einen Blick",
      "Automatisierte Reports statt manuell zusammengestellter Auswertungen",
      "Alle Projektdokumente zentral statt verteilt auf mehrere Tools",
    ],
    recommended: ["kundenportale", "terminplanung", "dashboards"],
  },
  {
    slug: "versicherungen-finanzdienstleister",
    label: "Versicherungen & Finanzdienstleister",
    intro:
      "Vertragsverwaltung, Kundendaten und Nachfass-Prozesse verlangen besonders sauberen Datenschutz. Wir bauen ein System, das DSGVO-konform auf deiner eigenen Infrastruktur läuft — nicht bei einem fremden Anbieter.",
    painPoints: [
      "Vertragsverwaltung und Kundendaten brauchen besonders sauberen Datenschutz",
      "Nachfassen bei offenen Vorgängen oder fehlenden Unterlagen passiert manuell",
      "Abhängigkeit von einem fremden Anbieter für sensible Kundendaten",
    ],
    capabilities: [
      "Zentrale, DSGVO-konforme Verwaltung von Verträgen und Kundendaten",
      "Automatisiertes Nachfassen bei offenen Vorgängen oder fehlenden Unterlagen",
      "Kundenportal für Vertragseinsicht statt Rückfragen per Telefon",
      "Volles Eigentum an Code und Daten, keine Abhängigkeit von einem Anbieter",
    ],
    recommended: ["dokumentenverwaltung", "automatisierung", "kundenportale"],
  },
];

export function getIndustry(slug: string): Industry | undefined {
  return industries.find((i) => i.slug === slug);
}
