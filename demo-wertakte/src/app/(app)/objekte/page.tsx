import Link from 'next/link';
import { Suspense } from 'react';
import {
  ImageIcon,
  ListDashesIcon,
  PlusIcon,
  SquaresFourIcon,
} from '@phosphor-icons/react/dist/ssr';
import { alleObjekte, auftraggeber as findeAuftraggeber, fotosZu, lesen } from '@/lib/db';
import { datum } from '@/lib/format';
import type { Status } from '@/lib/typen';
import { Fristmarke } from '@/komponenten/Fristmarke';
import { Statusmarke } from '@/komponenten/Statusmarke';
import { Filterleiste } from './Filterleiste';

type Suche = { [k: string]: string | string[] | undefined };

const einzel = (v: string | string[] | undefined): string =>
  (Array.isArray(v) ? v[0] : v) ?? '';

export default async function ObjekteSeite({ searchParams }: { searchParams: Promise<Suche> }) {
  const params = await searchParams;
  const suche = einzel(params.suche).toLowerCase().trim();
  const status = einzel(params.status);
  const auftraggeberId = einzel(params.auftraggeber);
  const kacheln = einzel(params.ansicht) === 'kacheln';

  const db = lesen();
  const alle = alleObjekte(db);

  const gefiltert = alle.filter((o) => {
    if (status && o.status !== status) return false;
    if (auftraggeberId && o.auftraggeberId !== auftraggeberId) return false;
    if (!suche) return true;
    const heuhaufen = [
      o.aktenzeichen,
      o.strasse,
      o.plz,
      o.ort,
      o.objekttyp,
      o.bewertungsanlass,
      findeAuftraggeber(db, o.auftraggeberId)?.name ?? '',
    ]
      .join(' ')
      .toLowerCase();
    return heuhaufen.includes(suche);
  });

  const andereAnsicht = new URLSearchParams(
    Object.entries(params).flatMap(([k, v]) => (v ? [[k, einzel(v)] as [string, string]] : [])),
  );
  andereAnsicht.set('ansicht', kacheln ? 'liste' : 'kacheln');

  return (
    <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
      <div className="py-7 sm:py-9 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl tracking-tight">Objekte und Gutachtenaufträge</h1>
          <p className="mt-1.5 text-sm text-text-leise">
            {gefiltert.length === alle.length
              ? `${alle.length} Akten im Bestand`
              : `${gefiltert.length} von ${alle.length} Akten`}
          </p>
        </div>
        <Link href="/objekte/neu" className="knopf knopf-primaer">
          <PlusIcon size={16} weight="bold" />
          Objekt anlegen
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-center gap-3 pb-5 border-b border-linie">
        <div className="flex-1 min-w-0">
          <Suspense fallback={<div className="h-[42px]" />}>
            <Filterleiste auftraggeber={db.auftraggeber} />
          </Suspense>
        </div>

        <div className="flex items-center gap-1 shrink-0 border border-linie-stark rounded-kante p-0.5 self-start lg:self-auto">
          <Link
            href={`/objekte?${(() => {
              const p = new URLSearchParams(andereAnsicht);
              p.set('ansicht', 'liste');
              return p.toString();
            })()}`}
            aria-current={!kacheln ? 'true' : undefined}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 text-[13px] rounded-[2px] ${
              !kacheln ? 'bg-kopf text-kopf-text' : 'text-text-leise hover:text-text'
            }`}
          >
            <ListDashesIcon size={15} />
            Liste
          </Link>
          <Link
            href={`/objekte?${(() => {
              const p = new URLSearchParams(andereAnsicht);
              p.set('ansicht', 'kacheln');
              return p.toString();
            })()}`}
            aria-current={kacheln ? 'true' : undefined}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 text-[13px] rounded-[2px] ${
              kacheln ? 'bg-kopf text-kopf-text' : 'text-text-leise hover:text-text'
            }`}
          >
            <SquaresFourIcon size={15} />
            Kacheln
          </Link>
        </div>
      </div>

      {gefiltert.length === 0 ? (
        <div className="my-12 border border-dashed border-linie-stark rounded-kante px-6 py-14 text-center">
          <p className="text-[15px]">Keine Akte passt zu dieser Suche.</p>
          <p className="mt-1.5 text-sm text-text-leise">
            Setze die Filter zurück oder lege den Auftrag neu an.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/objekte" className="knopf knopf-leise">
              Filter zurücksetzen
            </Link>
            <Link href="/objekte/neu" className="knopf knopf-primaer">
              <PlusIcon size={16} weight="bold" />
              Objekt anlegen
            </Link>
          </div>
        </div>
      ) : kacheln ? (
        <Kachelansicht objekte={gefiltert} db={db} />
      ) : (
        <Listenansicht objekte={gefiltert} db={db} />
      )}
    </div>
  );
}

type DB = ReturnType<typeof lesen>;
type Objekte = ReturnType<typeof alleObjekte>;

/** Dichtes Register: eine Zeile je Akte, Aktenzeichen in Mono. */
function Listenansicht({ objekte, db }: { objekte: Objekte; db: DB }) {
  return (
    <div className="py-4">
      <div className="hidden lg:grid grid-cols-[7.5rem_minmax(0,1fr)_13rem_4.5rem_9rem_9.5rem] gap-4 px-2 pb-2 border-b border-linie-stark">
        {['Aktenzeichen', 'Objekt', 'Auftraggeber', 'Fotos', 'Frist', 'Status'].map((s) => (
          <span key={s} className="etikett">
            {s}
          </span>
        ))}
      </div>

      <ul>
        {objekte.map((o) => {
          const ag = findeAuftraggeber(db, o.auftraggeberId);
          const anzahl = fotosZu(db, o.id).length;
          return (
            <li key={o.id} className="border-b border-linie">
              <Link
                href={`/objekte/${o.id}`}
                className="grid lg:grid-cols-[7.5rem_minmax(0,1fr)_13rem_4.5rem_9rem_9.5rem] gap-x-4 gap-y-1.5 items-center px-2 py-3.5 hover:bg-flaeche-tief rounded-kante"
              >
                <span className="font-mono text-[12.5px] text-text-leise lg:text-text">
                  {o.aktenzeichen}
                </span>

                <span className="min-w-0">
                  <span className="block truncate text-[15px]">{o.strasse}</span>
                  <span className="block truncate text-[13px] text-text-leise">
                    {o.plz} {o.ort} · {o.objekttyp} · {o.bewertungsanlass}
                  </span>
                </span>

                <span className="truncate text-[13px] text-text-leise lg:text-text">{ag?.name}</span>

                <span className="flex items-center gap-1.5 text-[13px] text-text-leise tabular-nums">
                  <ImageIcon size={14} />
                  {anzahl}
                </span>

                <span className="text-[13px]">
                  <span className="block font-mono tabular-nums text-[12.5px]">
                    {datum(o.frist)}
                  </span>
                  <Fristmarke frist={o.frist} erledigt={o.status === 'abgeschlossen'} />
                </span>

                <span className="justify-self-start">
                  <Statusmarke status={o.status} klein />
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/** Kacheln mit Titelfoto: zeigt auf einen Blick, wie gut eine Akte belegt ist. */
function Kachelansicht({ objekte, db }: { objekte: Objekte; db: DB }) {
  return (
    <ul className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5 py-6">
      {objekte.map((o) => {
        const fotos = fotosZu(db, o.id);
        const titel = fotos[0];
        const ag = findeAuftraggeber(db, o.auftraggeberId);
        return (
          <li key={o.id}>
            <Link
              href={`/objekte/${o.id}`}
              className="group block h-full bg-flaeche border border-linie rounded-kante overflow-hidden hover:border-akzent transition-colors"
            >
              <div className="relative aspect-[4/3] bg-flaeche-tief overflow-hidden">
                {titel ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={titel.quelle}
                    alt={titel.beschriftung || `Objektfoto ${o.strasse}`}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <span className="absolute inset-0 grid place-items-center text-center px-6">
                    <span>
                      <ImageIcon size={26} className="mx-auto text-text-leise" />
                      <span className="mt-2 block text-[13px] text-text-leise">
                        Noch kein Foto in der Akte
                      </span>
                    </span>
                  </span>
                )}
                <span className="absolute left-0 top-0 bg-kopf/90 text-kopf-text font-mono text-[11px] px-2 py-1">
                  {o.aktenzeichen}
                </span>
                <span className="absolute right-0 bottom-0 bg-kopf/90 text-kopf-text font-mono text-[11px] px-2 py-1 tabular-nums">
                  {fotos.length} {fotos.length === 1 ? 'Foto' : 'Fotos'}
                </span>
              </div>

              <div className="p-4">
                <p className="text-[15px] leading-snug">{o.strasse}</p>
                <p className="text-[13px] text-text-leise">
                  {o.plz} {o.ort} · {o.objekttyp}
                </p>
                <p className="mt-3 text-[13px] truncate">{o.bewertungsanlass}</p>
                <p className="text-[13px] text-text-leise truncate">{ag?.name}</p>

                <div className="mt-4 pt-3 border-t border-linie flex items-center justify-between gap-3">
                  <Statusmarke status={o.status} klein />
                  <span className="text-[12.5px] text-right">
                    <Fristmarke frist={o.frist} erledigt={o.status === 'abgeschlossen'} />
                  </span>
                </div>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
