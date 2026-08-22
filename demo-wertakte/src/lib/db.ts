import fs from 'node:fs';
import path from 'node:path';
import type { Auftraggeber, Datenbank, Foto, Objekt } from './typen';

/*
 * Speicher der Demo: eine JSON-Datei plus ein Ordner fuer hochgeladene Fotos.
 * Bewusst ohne Datenbankserver, damit die Demo mit "npm run dev" ueberall
 * sofort laeuft. Im Kundenprojekt steht hier Supabase/Postgres mit RLS - die
 * Zugriffsfunktionen unten sind genau die Schnittstelle, die dann getauscht wird.
 */

const WURZEL = process.cwd();
const DATEN_ORDNER = path.join(WURZEL, 'data');
const DB_DATEI = path.join(DATEN_ORDNER, 'db.json');
export const UPLOAD_ORDNER = path.join(DATEN_ORDNER, 'uploads');
const SEED_DATEI = path.join(WURZEL, 'seed', 'db.seed.json');

function sicherstellen(): void {
  fs.mkdirSync(UPLOAD_ORDNER, { recursive: true });
  if (!fs.existsSync(DB_DATEI)) {
    fs.copyFileSync(SEED_DATEI, DB_DATEI);
  }
}

export function lesen(): Datenbank {
  sicherstellen();
  return JSON.parse(fs.readFileSync(DB_DATEI, 'utf8')) as Datenbank;
}

function schreiben(db: Datenbank): void {
  sicherstellen();
  // Erst in eine Nachbardatei schreiben, dann umbenennen: so bleibt db.json
  // auch dann gueltig, wenn der Prozess mitten im Schreiben abbricht.
  const tmp = `${DB_DATEI}.${process.pid}.tmp`;
  fs.writeFileSync(tmp, JSON.stringify(db, null, 2));
  fs.renameSync(tmp, DB_DATEI);
}

export function aendern<T>(fn: (db: Datenbank) => T): T {
  const db = lesen();
  const ergebnis = fn(db);
  schreiben(db);
  return ergebnis;
}

export function neueId(praefix: string): string {
  return `${praefix}_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`;
}

/** Naechstes freies Aktenzeichen im Schema GA-JJJJ-NNN. */
export function naechstesAktenzeichen(db: Datenbank, jahr = new Date().getFullYear()): string {
  const praefix = `GA-${jahr}-`;
  const hoechste = db.objekte
    .filter((o) => o.aktenzeichen.startsWith(praefix))
    .map((o) => Number.parseInt(o.aktenzeichen.slice(praefix.length), 10))
    .filter((n) => Number.isFinite(n));
  const naechste = (hoechste.length ? Math.max(...hoechste) : 0) + 1;
  return `${praefix}${String(naechste).padStart(3, '0')}`;
}

// --- Abfragen ------------------------------------------------------------

export function alleObjekte(db: Datenbank): Objekt[] {
  return [...db.objekte].sort((a, b) => a.aktenzeichen.localeCompare(b.aktenzeichen));
}

export function objekt(db: Datenbank, id: string): Objekt | undefined {
  return db.objekte.find((o) => o.id === id);
}

export function auftraggeber(db: Datenbank, id: string): Auftraggeber | undefined {
  return db.auftraggeber.find((a) => a.id === id);
}

export function fotosZu(db: Datenbank, objektId: string): Foto[] {
  return db.fotos
    .filter((f) => f.objektId === objektId)
    .sort((a, b) => a.aufgenommenAm.localeCompare(b.aufgenommenAm));
}

export function objekteVon(db: Datenbank, auftraggeberId: string): Objekt[] {
  return alleObjekte(db).filter((o) => o.auftraggeberId === auftraggeberId);
}

/** Beispieldaten neu einspielen und alle selbst hochgeladenen Fotos entfernen. */
export async function zuruecksetzen(): Promise<void> {
  fs.rmSync(DATEN_ORDNER, { recursive: true, force: true });
  sicherstellen();
}
