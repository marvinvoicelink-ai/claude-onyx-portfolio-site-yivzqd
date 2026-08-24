import Link from 'next/link';
import { datum, isoKw, tageBis, wochenStart } from '@/lib/format';
import type { Objekt } from '@/lib/typen';

const WOCHEN = 5;
const TAG = 86_400_000;

/**
 * Zeitschiene der laufenden Akten ueber die naechsten Wochen: je Akte ein
 * Balken von heute bis zur Abgabefrist. Ueberschrittene Fristen sitzen am
 * linken Rand und sind rot, damit sie zuerst auffallen.
 */
export function Terminschiene({ objekte, heute }: { objekte: Objekt[]; heute: Date }) {
  const start = wochenStart(heute);
  const ende = new Date(start.getTime() + WOCHEN * 7 * TAG);
  const spanne = ende.getTime() - start.getTime();

  const wochen = Array.from({ length: WOCHEN }, (_, i) => {
    const w = new Date(start.getTime() + i * 7 * TAG);
    return { kw: isoKw(w), schluessel: w.toISOString().slice(0, 10) };
  });

  const anteil = (d: Date) => ((d.getTime() - start.getTime()) / spanne) * 100;
  const heuteAnteil = Math.min(100, Math.max(0, anteil(heute)));

  const zeilen = objekte
    .filter((o) => o.frist)
    .map((o) => {
      const frist = new Date(o.frist as string);
      const tage = tageBis(o.frist, heute);
      const ueberfaellig = tage !== null && tage < 0;
      // Balken zeigt die verbleibende Zeit: von heute bis zur Frist.
      const von = Math.max(0, Math.min(heuteAnteil, anteil(frist)));
      const bis = Math.min(100, anteil(frist));
      return {
        objekt: o,
        ueberfaellig,
        laeuftWeiter: anteil(frist) > 100,
        links: ueberfaellig ? 0 : von,
        breite: ueberfaellig ? Math.max(3, heuteAnteil - von) : Math.max(3, bis - von),
      };
    })
    .sort((a, b) => (a.objekt.frist ?? '').localeCompare(b.objekt.frist ?? ''));

  if (zeilen.length === 0) {
    return (
      <div className="onyx-leer px-6 py-10 text-center">
        <p className="text-[15px]">Keine Akte mit Frist in Arbeit.</p>
      </div>
    );
  }

  return (
    <div className="onyx-karte p-4 sm:p-5">
      <div className="onyx-schiene">
        {/* Wochenraster liegt hinter den Balken */}
        <div
          className="onyx-schiene-raster"
          style={{ gridTemplateColumns: `repeat(${WOCHEN}, 1fr)` }}
          aria-hidden
        >
          {wochen.map((w) => (
            <span key={w.schluessel} />
          ))}
        </div>

        <div
          className="relative grid mb-3"
          style={{ gridTemplateColumns: `repeat(${WOCHEN}, 1fr)` }}
        >
          {wochen.map((w) => (
            <span key={w.schluessel} className="onyx-etikett pl-2">
              KW {w.kw}
            </span>
          ))}
        </div>

        <div className="relative grid gap-2.5">
          {/* Heute-Linie */}
          <span
            aria-hidden
            className="absolute inset-y-0 w-px bg-akzent/45"
            style={{ left: `${heuteAnteil}%` }}
          />

          {zeilen.map(({ objekt, ueberfaellig, laeuftWeiter, links, breite }) => (
            <Link
              key={objekt.id}
              href={`/objekte/${objekt.id}`}
              title={`${objekt.aktenzeichen}, ${objekt.strasse}, Frist ${datum(objekt.frist)}`}
              className="relative block h-6 rounded-[4px] hover:bg-linie"
            >
              <span
                className={`absolute inset-y-0 rounded-[4px] flex items-center px-2 ${
                  ueberfaellig ? 'bg-warn' : 'bg-akzent'
                } ${laeuftWeiter ? 'rounded-r-none' : ''}`}
                style={{ left: `${links}%`, width: `${breite}%`, minWidth: '2.5rem' }}
              >
                <span className="font-mono text-[10.5px] text-grund truncate">
                  {objekt.aktenzeichen.replace('GA-2026-', '')}
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>

      <p className="mt-4 pt-3 border-t border-linie text-[12.5px] text-text-leise">
        Balkenende ist die Abgabefrist. Die senkrechte Linie ist heute.
      </p>
    </div>
  );
}
