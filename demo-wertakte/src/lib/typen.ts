export type Status = 'offen' | 'in_bearbeitung' | 'abgeschlossen';

export type Bewertungsanlass =
  | 'Verkehrswertgutachten'
  | 'Beleihungswertgutachten'
  | 'Marktwertermittlung'
  | 'Mietwertgutachten'
  | 'Schadensgutachten';

export type Objekttyp =
  | 'Einfamilienhaus'
  | 'Doppelhaushälfte'
  | 'Reihenmittelhaus'
  | 'Mehrfamilienhaus'
  | 'Eigentumswohnung'
  | 'Gewerbeobjekt'
  | 'Unbebautes Grundstück';

export type AuftraggeberTyp = 'Bank' | 'Gericht' | 'Versicherung' | 'Privatperson' | 'Kommune';

export type Fotokategorie =
  | 'Außenansicht'
  | 'Innenraum'
  | 'Mangel/Schaden'
  | 'Ausstattung'
  | 'Umgebung';

export interface Auftraggeber {
  id: string;
  name: string;
  typ: AuftraggeberTyp;
  ansprechpartner: string;
  email: string;
  telefon: string;
  anschrift: string;
  notizen: string;
}

export interface Objekt {
  id: string;
  aktenzeichen: string;
  strasse: string;
  plz: string;
  ort: string;
  objekttyp: Objekttyp;
  auftraggeberId: string;
  bewertungsanlass: Bewertungsanlass;
  status: Status;
  /** ISO-Datum mit Uhrzeit, z. B. 2026-09-03T10:30 */
  ortstermin: string | null;
  /** ISO-Datum, Abgabefrist des Gutachtens */
  frist: string | null;
  /** ISO-Datum, Wertermittlungsstichtag */
  stichtag: string | null;
  baujahr: string;
  wohnflaeche: string;
  grundstuecksflaeche: string;
  notizen: string;
  angelegtAm: string;
}

export interface Foto {
  id: string;
  objektId: string;
  /** Pfad, den der Browser laedt: /beispiel-fotos/x.jpg oder /api/foto/x.jpg */
  quelle: string;
  beschriftung: string;
  kategorie: Fotokategorie;
  aufgenommenAm: string;
}

export interface Datenbank {
  auftraggeber: Auftraggeber[];
  objekte: Objekt[];
  fotos: Foto[];
}

export const STATUS_LISTE: Status[] = ['offen', 'in_bearbeitung', 'abgeschlossen'];

export const STATUS_TEXT: Record<Status, string> = {
  offen: 'Offen',
  in_bearbeitung: 'In Bearbeitung',
  abgeschlossen: 'Abgeschlossen',
};

export const OBJEKTTYPEN: Objekttyp[] = [
  'Einfamilienhaus',
  'Doppelhaushälfte',
  'Reihenmittelhaus',
  'Mehrfamilienhaus',
  'Eigentumswohnung',
  'Gewerbeobjekt',
  'Unbebautes Grundstück',
];

export const BEWERTUNGSANLAESSE: Bewertungsanlass[] = [
  'Verkehrswertgutachten',
  'Beleihungswertgutachten',
  'Marktwertermittlung',
  'Mietwertgutachten',
  'Schadensgutachten',
];

export const FOTOKATEGORIEN: Fotokategorie[] = [
  'Außenansicht',
  'Innenraum',
  'Mangel/Schaden',
  'Ausstattung',
  'Umgebung',
];
