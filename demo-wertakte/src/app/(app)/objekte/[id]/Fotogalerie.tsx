'use client';

import { useEffect, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { ImageIcon, PencilSimpleIcon, TrashIcon, XIcon } from '@phosphor-icons/react/dist/ssr';
import type { Foto } from '@/lib/typen';
import { FOTOKATEGORIEN } from '@/lib/typen';
import { datumZeit } from '@/lib/format';

interface Props {
  fotos: Foto[];
  beschriften: (fotoId: string, fd: FormData) => Promise<void>;
  loeschen: (fotoId: string) => Promise<void>;
}

export function Fotogalerie({ fotos, beschriften, loeschen }: Props) {
  const [offen, setOffen] = useState<string | null>(null);
  const aktiv = fotos.find((f) => f.id === offen) ?? null;

  // Wird ein Foto geloescht, verschwindet auch die Grossansicht.
  useEffect(() => {
    if (offen && !fotos.some((f) => f.id === offen)) setOffen(null);
  }, [fotos, offen]);

  useEffect(() => {
    if (!aktiv) return;
    const zu = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOffen(null);
    };
    document.addEventListener('keydown', zu);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', zu);
      document.body.style.overflow = '';
    };
  }, [aktiv]);

  if (fotos.length === 0) {
    return (
      <div className="onyx-leer px-6 py-12 text-center">
        <ImageIcon size={26} className="mx-auto text-text-leise" />
        <p className="mt-3 text-[15px]">Für diese Akte ist noch kein Foto erfasst.</p>
        <p className="mt-1.5 text-sm text-text-leise max-w-[42ch] mx-auto leading-relaxed">
          Nimm die Bilder beim Ortstermin direkt mit dem Handy auf. Sie landen sofort hier in der
          Akte und lassen sich anschließend beschriften.
        </p>
      </div>
    );
  }

  return (
    <>
      <ul className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        {fotos.map((foto) => (
          <li key={foto.id}>
            <button
              type="button"
              onClick={() => setOffen(foto.id)}
              className="onyx-karte onyx-karte-klick group block w-full text-left overflow-hidden"
            >
              <span className="relative block aspect-[4/3] bg-flaeche-hoch">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={foto.quelle}
                  alt={foto.beschriftung || 'Objektfoto ohne Beschriftung'}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                <span className="absolute left-0 bottom-0 bg-grund/85 text-akzent text-[10.5px] font-mono uppercase tracking-wider px-1.5 py-1">
                  {foto.kategorie}
                </span>
              </span>
              <span className="block px-2.5 py-2">
                {foto.beschriftung ? (
                  <span className="text-[13px] leading-snug line-clamp-2 hyphens-auto [overflow-wrap:anywhere]">
                    {foto.beschriftung}
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 text-[13px] text-akzent">
                    <PencilSimpleIcon size={13} weight="bold" />
                    Beschriftung fehlt
                  </span>
                )}
              </span>
            </button>
          </li>
        ))}
      </ul>

      {aktiv ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Foto beschriften"
          className="fixed inset-0 z-50 bg-grund/90 backdrop-blur-sm p-3 sm:p-6 overflow-y-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget) setOffen(null);
          }}
        >
          <div className="onyx-rahmen mx-auto max-w-4xl overflow-hidden">
            <div className="flex items-center justify-between gap-4 px-4 py-2.5 border-b border-linie-warm">
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-akzent">Foto in der Akte</p>
              <button
                type="button"
                onClick={() => setOffen(null)}
                className="flex items-center gap-1.5 text-[13px] text-text-leise hover:text-text px-1.5 py-1"
              >
                Schließen
                <XIcon size={15} weight="bold" />
              </button>
            </div>

            <div className="bg-grund">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={aktiv.quelle}
                alt={aktiv.beschriftung || 'Objektfoto ohne Beschriftung'}
                className="w-full max-h-[55dvh] object-contain"
              />
            </div>

            <div className="p-4 sm:p-5 grid gap-4">
              <p className="onyx-etikett">Aufgenommen {datumZeit(aktiv.aufgenommenAm)}</p>

              <form action={beschriften.bind(null, aktiv.id)} className="grid gap-3">
                <div className="grid gap-2">
                  <label htmlFor="beschriftung" className="onyx-etikett">
                    Beschriftung für die Fotodokumentation
                  </label>
                  <textarea
                    id="beschriftung"
                    name="beschriftung"
                    rows={2}
                    key={aktiv.id}
                    defaultValue={aktiv.beschriftung}
                    placeholder="z. B. Feuchtigkeitsschaden Sockelbereich Südwand"
                    className="onyx-feld resize-y"
                  />
                  <p className="text-[12.5px] text-text-leise">
                    Die Beschriftung erscheint im Gutachten-Entwurf unter dem Bild.
                  </p>
                </div>

                <div className="grid gap-2 sm:max-w-xs">
                  <label htmlFor="foto-kategorie" className="onyx-etikett">
                    Kategorie
                  </label>
                  <select
                    id="foto-kategorie"
                    name="kategorie"
                    key={`k-${aktiv.id}`}
                    defaultValue={aktiv.kategorie}
                    className="onyx-feld"
                  >
                    {FOTOKATEGORIEN.map((k) => (
                      <option key={k} value={k}>
                        {k}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <Speichern />
                  <span className="flex-1" />
                  <FotoLoeschen aktion={loeschen.bind(null, aktiv.id)} />
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

function Speichern() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="onyx-knopf onyx-knopf-primaer" disabled={pending}>
      {pending ? 'Wird gespeichert …' : 'Beschriftung speichern'}
    </button>
  );
}

function FotoLoeschen({ aktion }: { aktion: () => Promise<void> }) {
  const [sicher, setSicher] = useState(false);

  if (!sicher) {
    return (
      <button
        type="button"
        onClick={() => setSicher(true)}
        className="onyx-knopf onyx-knopf-klar text-[13px]"
      >
        <TrashIcon size={15} />
        Foto entfernen
      </button>
    );
  }

  return (
    <span className="flex items-center gap-2">
      <span className="text-[13px] text-text-leise">Wirklich entfernen?</span>
      <button type="button" onClick={() => setSicher(false)} className="onyx-knopf onyx-knopf-leise text-[13px]">
        Abbrechen
      </button>
      <button
        type="submit"
        formAction={aktion}
        formNoValidate
        className="onyx-knopf onyx-knopf-gefahr text-[13px]"
      >
        Entfernen
      </button>
    </span>
  );
}
