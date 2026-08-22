'use client';

import { useRef, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { CameraIcon, SpinnerGapIcon, UploadSimpleIcon } from '@phosphor-icons/react/dist/ssr';
import { FOTOKATEGORIEN } from '@/lib/typen';

/**
 * Zwei Wege ins gleiche Formular: "Foto aufnehmen" oeffnet auf dem Handy
 * direkt die Kamera (capture="environment"), "Bilder hochladen" nimmt
 * vorhandene Dateien, auch mehrere auf einmal. Beide senden sofort ab.
 */
export function FotoAufnahme({ aktion }: { aktion: (fd: FormData) => Promise<void> }) {
  const form = useRef<HTMLFormElement>(null);
  const kamera = useRef<HTMLInputElement>(null);
  const galerie = useRef<HTMLInputElement>(null);
  const [kategorie, setKategorie] = useState<string>('Außenansicht');

  return (
    <form ref={form} action={aktion} className="grid gap-3">
      <input
        ref={kamera}
        type="file"
        name="fotos"
        accept="image/*"
        capture="environment"
        className="sr-only"
        onChange={() => form.current?.requestSubmit()}
      />
      <input
        ref={galerie}
        type="file"
        name="fotos"
        accept="image/*"
        multiple
        className="sr-only"
        onChange={() => form.current?.requestSubmit()}
      />
      <input type="hidden" name="kategorie" value={kategorie} />

      <Knoepfe beimAufnehmen={() => kamera.current?.click()} beimHochladen={() => galerie.current?.click()} />

      <div className="flex flex-wrap items-center gap-2">
        <label htmlFor="kategorie-neu" className="etikett">
          Neue Fotos ablegen als
        </label>
        <select
          id="kategorie-neu"
          className="feld w-auto py-1.5 text-[13px]"
          value={kategorie}
          onChange={(e) => setKategorie(e.target.value)}
        >
          {FOTOKATEGORIEN.map((k) => (
            <option key={k} value={k}>
              {k}
            </option>
          ))}
        </select>
      </div>
    </form>
  );
}

function Knoepfe({
  beimAufnehmen,
  beimHochladen,
}: {
  beimAufnehmen: () => void;
  beimHochladen: () => void;
}) {
  const { pending } = useFormStatus();

  if (pending) {
    return (
      <p className="flex items-center justify-center gap-2.5 bg-akzent-flaeche border border-akzent/25 rounded-kante py-4 text-sm text-akzent">
        <SpinnerGapIcon size={18} className="animate-spin" />
        Fotos werden in die Akte übernommen …
      </p>
    );
  }

  return (
    <div className="grid sm:grid-cols-[1fr_auto] gap-2.5">
      <button type="button" onClick={beimAufnehmen} className="knopf knopf-primaer py-3.5 text-[15px]">
        <CameraIcon size={20} weight="fill" />
        Foto aufnehmen
      </button>
      <button type="button" onClick={beimHochladen} className="knopf knopf-leise py-3.5">
        <UploadSimpleIcon size={18} />
        Bilder hochladen
      </button>
    </div>
  );
}
