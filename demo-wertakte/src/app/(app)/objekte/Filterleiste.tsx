'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useRef } from 'react';
import { MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr';
import type { Auftraggeber } from '@/lib/typen';
import { STATUS_LISTE, STATUS_TEXT } from '@/lib/typen';

/**
 * Suche und Filter schreiben in die Adresszeile, damit ein gefilterter Stand
 * verlinkbar und nach dem Neuladen noch da ist.
 */
export function Filterleiste({ auftraggeber }: { auftraggeber: Auftraggeber[] }) {
  const router = useRouter();
  const params = useSearchParams();
  const tippen = useRef<ReturnType<typeof setTimeout> | null>(null);

  function setzen(schluessel: string, wert: string) {
    const naechste = new URLSearchParams(params.toString());
    if (wert) naechste.set(schluessel, wert);
    else naechste.delete(schluessel);
    router.replace(`/objekte?${naechste.toString()}`, { scroll: false });
  }

  return (
    <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto_auto]">
      <div className="relative">
        <MagnifyingGlassIcon
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-text-leise pointer-events-none"
        />
        <label htmlFor="suche" className="sr-only">
          Nach Aktenzeichen, Adresse oder Ort suchen
        </label>
        <input
          id="suche"
          type="search"
          defaultValue={params.get('suche') ?? ''}
          placeholder="Aktenzeichen, Straße oder Ort"
          className="feld pl-9"
          onChange={(e) => {
            const wert = e.target.value;
            if (tippen.current) clearTimeout(tippen.current);
            tippen.current = setTimeout(() => setzen('suche', wert), 200);
          }}
        />
      </div>

      <div>
        <label htmlFor="status" className="sr-only">
          Nach Status filtern
        </label>
        <select
          id="status"
          className="feld sm:w-44"
          defaultValue={params.get('status') ?? ''}
          onChange={(e) => setzen('status', e.target.value)}
        >
          <option value="">Alle Status</option>
          {STATUS_LISTE.map((s) => (
            <option key={s} value={s}>
              {STATUS_TEXT[s]}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="auftraggeber" className="sr-only">
          Nach Auftraggeber filtern
        </label>
        <select
          id="auftraggeber"
          className="feld sm:w-60"
          defaultValue={params.get('auftraggeber') ?? ''}
          onChange={(e) => setzen('auftraggeber', e.target.value)}
        >
          <option value="">Alle Auftraggeber</option>
          {auftraggeber.map((a) => (
            <option key={a.id} value={a.id}>
              {a.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
