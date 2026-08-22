'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr';

/**
 * Suche in der Kopfzeile. Sie ist die einzige Suche der Anwendung und fuehrt
 * immer in die Objektliste, damit dort Treffer, Filter und Ansicht
 * zusammenlaufen.
 */
export function Kopfsuche() {
  const router = useRouter();
  const params = useSearchParams();
  const ausParams = params.get('suche') ?? '';
  const [wert, setWert] = useState(ausParams);
  const tippen = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Wird der Suchbegriff woanders geaendert (Filter zuruecksetzen, Zurueck-
  // Taste), zieht das Feld nach.
  useEffect(() => setWert(ausParams), [ausParams]);

  useEffect(() => () => { if (tippen.current) clearTimeout(tippen.current); }, []);

  function suchen(neu: string) {
    setWert(neu);
    if (tippen.current) clearTimeout(tippen.current);
    tippen.current = setTimeout(() => {
      const ziel = new URLSearchParams(params.toString());
      if (neu) ziel.set('suche', neu);
      else ziel.delete('suche');
      ziel.delete('ansicht');
      router.push(`/objekte?${ziel.toString()}`, { scroll: false });
    }, 220);
  }

  return (
    <div className="relative w-full max-w-md">
      <MagnifyingGlassIcon
        size={15}
        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-still pointer-events-none"
      />
      <label htmlFor="kopfsuche" className="sr-only">
        Nach Aktenzeichen, Adresse oder Auftraggeber suchen
      </label>
      <input
        id="kopfsuche"
        type="search"
        value={wert}
        onChange={(e) => suchen(e.target.value)}
        placeholder="Suchen …"
        className="onyx-feld onyx-suche py-2 text-sm"
      />
    </div>
  );
}
