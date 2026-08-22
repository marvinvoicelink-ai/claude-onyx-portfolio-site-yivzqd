import Link from 'next/link';
import { ArrowRightIcon } from '@phosphor-icons/react/dist/ssr';
import { lesen, objekteVon } from '@/lib/db';

export default function AuftraggeberSeite() {
  const db = lesen();

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="py-7 sm:py-9 border-b border-linie">
        <h1 className="text-2xl sm:text-[28px]">Auftraggeber</h1>
        <p className="mt-1.5 text-sm text-text-leise max-w-[62ch] leading-relaxed">
          Wenige, dafür wiederkehrende Auftraggeber. Hinter jedem Eintrag liegt die vollständige
          Historie der Aufträge dieses Hauses.
        </p>
      </div>

      <ul className="grid md:grid-cols-2 gap-5 py-8">
        {db.auftraggeber.map((a) => {
          const auftraege = objekteVon(db, a.id);
          const laufend = auftraege.filter((o) => o.status !== 'abgeschlossen');
          return (
            <li key={a.id}>
              <Link
                href={`/auftraggeber/${a.id}`}
                className="onyx-karte onyx-karte-klick group flex flex-col h-full p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-akzent">
                      {a.typ}
                    </p>
                    <p className="mt-1 text-[17px] leading-snug">{a.name}</p>
                    <p className="mt-0.5 text-[13px] text-text-leise">{a.ansprechpartner}</p>
                  </div>
                  <ArrowRightIcon
                    size={17}
                    className="shrink-0 mt-1 text-text-leise group-hover:text-akzent transition-colors"
                  />
                </div>

                <p className="mt-4 font-mono text-[12.5px] text-text-leise">
                  {a.telefon}
                  <br />
                  {a.email}
                </p>

                <div className="mt-auto pt-4 flex items-baseline gap-6 border-t border-linie mt-5">
                  <span>
                    <span className="block onyx-etikett">Aufträge gesamt</span>
                    <span className="font-mono text-lg tabular-nums">{auftraege.length}</span>
                  </span>
                  <span>
                    <span className="block onyx-etikett">davon laufend</span>
                    <span className="font-mono text-lg tabular-nums">{laufend.length}</span>
                  </span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
