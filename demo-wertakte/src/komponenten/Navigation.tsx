'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BuildingsIcon, SquaresFourIcon, UsersThreeIcon } from '@phosphor-icons/react/dist/ssr';
import type { Icon } from '@phosphor-icons/react/lib';

export const PUNKTE: { pfad: string; text: string; symbol: Icon }[] = [
  { pfad: '/uebersicht', text: 'Übersicht', symbol: SquaresFourIcon },
  { pfad: '/objekte', text: 'Objekte', symbol: BuildingsIcon },
  { pfad: '/auftraggeber', text: 'Auftraggeber', symbol: UsersThreeIcon },
];

function istAktiv(pfad: string, aktuell: string): boolean {
  return aktuell === pfad || aktuell.startsWith(`${pfad}/`);
}

/**
 * Icon-Leiste am linken Rand, ab Tablet sichtbar. Der aktive Bereich ist ein
 * gefuelltes Amber-Feld, alles andere bleibt still.
 */
export function SeitenRail() {
  const pfad = usePathname();
  return (
    <nav aria-label="Hauptbereiche" className="flex flex-col items-center gap-2">
      {PUNKTE.map(({ pfad: ziel, text, symbol: Symbol }) => {
        const aktiv = istAktiv(ziel, pfad);
        return (
          <Link
            key={ziel}
            href={ziel}
            title={text}
            aria-label={text}
            aria-current={aktiv ? 'page' : undefined}
            className="onyx-rail-punkt"
          >
            <Symbol size={21} weight={aktiv ? 'fill' : 'regular'} />
          </Link>
        );
      })}
    </nav>
  );
}

/**
 * Untere Leiste auf dem Handy. Der Gutachter bedient das System beim
 * Ortstermin einhaendig, deshalb liegen die Bereiche in Daumenreichweite.
 */
export function FussNavigation() {
  const pfad = usePathname();
  return (
    <nav
      aria-label="Hauptbereiche"
      className="md:hidden fixed bottom-0 inset-x-0 z-30 bg-rahmen border-t border-linie-warm pb-[env(safe-area-inset-bottom)]"
    >
      <ul className="grid grid-cols-3">
        {PUNKTE.map(({ pfad: ziel, text, symbol: Symbol }) => {
          const aktiv = istAktiv(ziel, pfad);
          return (
            <li key={ziel}>
              <Link
                href={ziel}
                aria-current={aktiv ? 'page' : undefined}
                className={`flex flex-col items-center gap-1 py-2.5 text-[11px] ${
                  aktiv ? 'text-akzent' : 'text-text-still'
                }`}
              >
                <Symbol size={21} weight={aktiv ? 'fill' : 'regular'} />
                {text}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
