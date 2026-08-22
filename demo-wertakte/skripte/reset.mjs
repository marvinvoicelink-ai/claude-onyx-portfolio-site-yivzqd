// Setzt die Demo auf den Auslieferungsstand zurueck: Beispieldaten neu
// einspielen, selbst aufgenommene Fotos loeschen.  Aufruf: npm run demo:reset
import fs from 'node:fs';
import path from 'node:path';

const wurzel = path.resolve(import.meta.dirname, '..');
const daten = path.join(wurzel, 'data');

fs.rmSync(daten, { recursive: true, force: true });
fs.mkdirSync(path.join(daten, 'uploads'), { recursive: true });
fs.copyFileSync(path.join(wurzel, 'seed', 'db.seed.json'), path.join(daten, 'db.json'));

console.log('Demo zurückgesetzt: 4 Akten, 4 Auftraggeber, 11 Fotos.');
