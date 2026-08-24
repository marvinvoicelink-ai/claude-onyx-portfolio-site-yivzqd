'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { FunnelSimpleIcon, XIcon } from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';
import type { Auftraggeber } from '@/lib/typen';
import { STATUS_LISTE, STATUS_TEXT } from '@/lib/typen';

/**
 * Filter schreiben in die Adresszeile, damit ein gefilterter Stand
 * verlinkbar und nach dem Neuladen noch da ist. Gesucht wird in der
 * Kopfzeile, hier stehen nur die Einschraenkungen.
 */
export function Filterleiste({ auftraggeber }: { auftraggeber: Auftraggeber[] }) {
  const router = useRouter();
  const params = useSearchParams();
  const suche = params.get('suche') ?? '';
  const aktiv = Boolean(suche || params.get('status') || params.get('auftraggeber'));

  function setzen(schluessel: string, wert: string) {
    const naechste = new URLSearchParams(params.toString());
    if (wert) naechste.set(schluessel, wert);
    else naechste.delete(schluessel);
    router.replace(`/objekte?${naechste.toString()}`, { scroll: false });
  }

  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <FunnelSimpleIcon size={16} className="text-text-still hidden sm:block" />

      <label htmlFor="status" className="sr-only">
        Nach Status filtern
      </label>
      <select
        id="status"
        className="onyx-feld w-auto py-1.5 text-[13px]"
        value={params.get('status') ?? ''}
        onChange={(e) => setzen('status', e.target.value)}
      >
        <option value="">Alle Status</option>
        {STATUS_LISTE.map((s) => (
          <option key={s} value={s}>
            {STATUS_TEXT[s]}
          </option>
        ))}
      </select>

      <label htmlFor="auftraggeber" className="sr-only">
        Nach Auftraggeber filtern
      </label>
      <select
        id="auftraggeber"
        className="onyx-feld w-auto max-w-[15rem] py-1.5 text-[13px]"
        value={params.get('auftraggeber') ?? ''}
        onChange={(e) => setzen('auftraggeber', e.target.value)}
      >
        <option value="">Alle Auftraggeber</option>
        {auftraggeber.map((a) => (
          <option key={a.id} value={a.id}>
            {a.name}
          </option>
        ))}
      </select>

      {suche ? (
        <span className="onyx-marke onyx-marke-laeuft">
          Suche: {suche}
        </span>
      ) : null}

      {aktiv ? (
        <Link
          href={`/objekte${params.get('ansicht') ? `?ansicht=${params.get('ansicht')}` : ''}`}
          className="onyx-knopf onyx-knopf-klar text-[13px] py-1.5 px-2.5"
        >
          <XIcon size={13} weight="bold" />
          Zurücksetzen
        </Link>
      ) : null}
    </div>
  );
}
