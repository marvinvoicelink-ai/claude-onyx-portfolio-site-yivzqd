// Holt das Onyx-Designsystem aus /onyx-designsystem in dieses Projekt.
// Dort wird geaendert, hier liegt nur die Kopie, damit das Projekt allein
// lauffaehig bleibt.  Aufruf: npm run stil:sync
import fs from 'node:fs';
import path from 'node:path';

const wurzel = path.resolve(import.meta.dirname, '..');
const quelle = path.resolve(wurzel, '..', 'onyx-designsystem', 'onyx-dunkel.css');
const ziel = path.join(wurzel, 'src', 'app', 'onyx-dunkel.css');

if (!fs.existsSync(quelle)) {
  console.error(`Quelle fehlt: ${quelle}`);
  process.exit(1);
}
fs.copyFileSync(quelle, ziel);
console.log('onyx-dunkel.css aktualisiert.');
