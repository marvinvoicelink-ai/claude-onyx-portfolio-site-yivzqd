'use server';

import fs from 'node:fs/promises';
import path from 'node:path';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { aendern, naechstesAktenzeichen, neueId, UPLOAD_ORDNER, zuruecksetzen } from './db';
import { abmelden, anmelden } from './auth';
import type { Bewertungsanlass, Fotokategorie, Objekttyp, Status } from './typen';
import { BEWERTUNGSANLAESSE, FOTOKATEGORIEN, OBJEKTTYPEN, STATUS_LISTE } from './typen';

export interface Formularantwort {
  fehler?: string;
}

const text = (fd: FormData, name: string): string => String(fd.get(name) ?? '').trim();

// --- Anmeldung -----------------------------------------------------------

export async function anmeldenAktion(
  _bisher: Formularantwort,
  fd: FormData,
): Promise<Formularantwort> {
  const ok = await anmelden(text(fd, 'email'), String(fd.get('passwort') ?? ''));
  if (!ok) return { fehler: 'E-Mail oder Passwort stimmt nicht.' };
  redirect('/uebersicht');
}

export async function abmeldenAktion(): Promise<void> {
  await abmelden();
  redirect('/anmelden');
}

// --- Objekte -------------------------------------------------------------

export async function objektAnlegen(
  _bisher: Formularantwort,
  fd: FormData,
): Promise<Formularantwort> {
  const strasse = text(fd, 'strasse');
  const ort = text(fd, 'ort');
  const auftraggeberId = text(fd, 'auftraggeberId');

  if (!strasse) return { fehler: 'Bitte die Straße und Hausnummer angeben.' };
  if (!ort) return { fehler: 'Bitte den Ort angeben.' };
  if (!auftraggeberId) return { fehler: 'Bitte einen Auftraggeber auswählen.' };

  const objekttyp = text(fd, 'objekttyp') as Objekttyp;
  const bewertungsanlass = text(fd, 'bewertungsanlass') as Bewertungsanlass;
  const status = text(fd, 'status') as Status;

  const id = neueId('obj');
  aendern((db) => {
    if (!db.auftraggeber.some((a) => a.id === auftraggeberId)) {
      throw new Error('Unbekannter Auftraggeber');
    }
    db.objekte.push({
      id,
      aktenzeichen: naechstesAktenzeichen(db),
      strasse,
      plz: text(fd, 'plz'),
      ort,
      objekttyp: OBJEKTTYPEN.includes(objekttyp) ? objekttyp : 'Einfamilienhaus',
      auftraggeberId,
      bewertungsanlass: BEWERTUNGSANLAESSE.includes(bewertungsanlass)
        ? bewertungsanlass
        : 'Verkehrswertgutachten',
      status: STATUS_LISTE.includes(status) ? status : 'offen',
      ortstermin: text(fd, 'ortstermin') || null,
      frist: text(fd, 'frist') || null,
      stichtag: text(fd, 'stichtag') || null,
      baujahr: text(fd, 'baujahr'),
      wohnflaeche: text(fd, 'wohnflaeche'),
      grundstuecksflaeche: text(fd, 'grundstuecksflaeche'),
      notizen: text(fd, 'notizen'),
      angelegtAm: new Date().toISOString().slice(0, 10),
    });
  });

  revalidatePath('/objekte');
  revalidatePath('/uebersicht');
  redirect(`/objekte/${id}`);
}

export async function statusSetzen(objektId: string, status: Status): Promise<void> {
  if (!STATUS_LISTE.includes(status)) return;
  aendern((db) => {
    const o = db.objekte.find((x) => x.id === objektId);
    if (o) o.status = status;
  });
  revalidatePath(`/objekte/${objektId}`);
  revalidatePath('/objekte');
  revalidatePath('/uebersicht');
}

export async function notizSpeichern(objektId: string, fd: FormData): Promise<void> {
  const notizen = text(fd, 'notizen');
  aendern((db) => {
    const o = db.objekte.find((x) => x.id === objektId);
    if (o) o.notizen = notizen;
  });
  revalidatePath(`/objekte/${objektId}`);
}

// --- Fotodokumentation ---------------------------------------------------

const ERLAUBT: Record<string, string> = {
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/webp': '.webp',
  'image/heic': '.heic',
  'image/heif': '.heif',
};

export async function fotosHochladen(objektId: string, fd: FormData): Promise<void> {
  const dateien = fd.getAll('fotos').filter((f): f is File => f instanceof File && f.size > 0);
  if (!dateien.length) return;

  const kategorieRoh = text(fd, 'kategorie') as Fotokategorie;
  const kategorie: Fotokategorie = FOTOKATEGORIEN.includes(kategorieRoh)
    ? kategorieRoh
    : 'Außenansicht';

  await fs.mkdir(UPLOAD_ORDNER, { recursive: true });

  const neue: { quelle: string; aufgenommenAm: string }[] = [];
  for (const datei of dateien) {
    const endung = ERLAUBT[datei.type] ?? path.extname(datei.name).toLowerCase();
    if (!Object.values(ERLAUBT).includes(endung)) continue;

    const name = `${neueId('bild')}${endung}`;
    await fs.writeFile(path.join(UPLOAD_ORDNER, name), Buffer.from(await datei.arrayBuffer()));
    neue.push({
      quelle: `/api/foto/${name}`,
      aufgenommenAm: new Date(datei.lastModified || Date.now()).toISOString().slice(0, 16),
    });
  }
  if (!neue.length) return;

  aendern((db) => {
    for (const n of neue) {
      db.fotos.push({
        id: neueId('foto'),
        objektId,
        quelle: n.quelle,
        beschriftung: '',
        kategorie,
        aufgenommenAm: n.aufgenommenAm,
      });
    }
  });
  revalidatePath(`/objekte/${objektId}`);
  revalidatePath('/objekte');
}

export async function beschriftungSpeichern(fotoId: string, fd: FormData): Promise<void> {
  const beschriftung = text(fd, 'beschriftung');
  const kategorieRoh = text(fd, 'kategorie') as Fotokategorie;

  const objektId = aendern((db) => {
    const f = db.fotos.find((x) => x.id === fotoId);
    if (!f) return null;
    f.beschriftung = beschriftung;
    if (FOTOKATEGORIEN.includes(kategorieRoh)) f.kategorie = kategorieRoh;
    return f.objektId;
  });
  if (objektId) revalidatePath(`/objekte/${objektId}`);
}

export async function fotoLoeschen(fotoId: string): Promise<void> {
  const entfernt = aendern((db) => {
    const i = db.fotos.findIndex((x) => x.id === fotoId);
    if (i < 0) return null;
    return db.fotos.splice(i, 1)[0];
  });
  if (!entfernt) return;

  // Nur selbst hochgeladene Dateien loeschen, die mitgelieferten Beispielfotos bleiben.
  if (entfernt.quelle.startsWith('/api/foto/')) {
    const name = path.basename(entfernt.quelle);
    await fs.rm(path.join(UPLOAD_ORDNER, name), { force: true });
  }
  revalidatePath(`/objekte/${entfernt.objektId}`);
  revalidatePath('/objekte');
}

// --- Auftraggeber --------------------------------------------------------

export async function auftraggeberNotizSpeichern(id: string, fd: FormData): Promise<void> {
  const notizen = text(fd, 'notizen');
  aendern((db) => {
    const a = db.auftraggeber.find((x) => x.id === id);
    if (a) a.notizen = notizen;
  });
  revalidatePath(`/auftraggeber/${id}`);
}

// --- Demo ----------------------------------------------------------------

/** Setzt Beispieldaten und Fotos auf den Auslieferungsstand zurueck. */
export async function demoZuruecksetzen(): Promise<void> {
  await zuruecksetzen();
  revalidatePath('/', 'layout');
  redirect('/uebersicht');
}
