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

/** Navigation in der dunklen Kopfleiste, ab Tablet sichtbar. */
export function KopfNavigation() {
  const pfad = usePathname();
  return (
    <nav aria-label="Hauptbereiche" className="hidden md:flex items-stretch h-full">
      {PUNKTE.map(({ pfad: ziel, text }) => {
        const aktiv = istAktiv(ziel, pfad);
        return (
          <Link
            key={ziel}
            href={ziel}
            aria-current={aktiv ? 'page' : undefined}
            className={`flex items-center px-4 text-sm border-b-2 transition-colors ${
              aktiv
                ? 'border-kopf-text text-kopf-text'
                : 'border-transparent text-kopf-text-leise hover:text-kopf-text'
            }`}
          >
            {text}
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
      className="md:hidden fixed bottom-0 inset-x-0 z-30 bg-kopf border-t border-kopf-linie pb-[env(safe-area-inset-bottom)]"
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
                  aktiv ? 'text-kopf-text' : 'text-kopf-text-leise'
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
