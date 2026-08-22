import Link from 'next/link';
import {
  ArrowRightIcon,
  CalendarBlankIcon,
  CameraIcon,
  PlusIcon,
} from '@phosphor-icons/react/dist/ssr';
import { alleObjekte, auftraggeber, lesen } from '@/lib/db';
import { datum, datumZeit, tageBis } from '@/lib/format';
import { Fristmarke } from '@/komponenten/Fristmarke';
import { Statusmarke } from '@/komponenten/Statusmarke';
import { Terminschiene } from '@/komponenten/Terminschiene';

export default function UebersichtSeite() {
  const db = lesen();
  const objekte = alleObjekte(db);
  const heute = new Date();

  const laufend = objekte.filter((o) => o.status !== 'abgeschlossen');
  const nachFrist = [...laufend].sort((a, b) => (a.frist ?? '9999').localeCompare(b.frist ?? '9999'));
  const ueberfaellig = nachFrist.filter((o) => {
    const t = tageBis(o.frist, heute);
    return t !== null && t < 0;
  });

  const termine = objekte
    .filter((o) => o.ortstermin && new Date(o.ortstermin) >= heute)
    .sort((a, b) => (a.ortstermin ?? '').localeCompare(b.ortstermin ?? ''));

  const kennzahlen = [
    { etikett: 'Akten in Arbeit', wert: laufend.length, amber: false },
    { etikett: 'Fristen überschritten', wert: ueberfaellig.length, warnen: ueberfaellig.length > 0 },
    { etikett: 'Ortstermine geplant', wert: termine.length, amber: termine.length > 0 },
    { etikett: 'Fotos dokumentiert', wert: db.fotos.length, amber: false },
  ];

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="py-6 sm:py-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-[28px]">Übersicht</h1>
          <p className="mt-1.5 text-sm text-text-leise">
            Stand {datum(heute.toISOString())}, {laufend.length} Akten in Arbeit
          </p>
        </div>
        <Link href="/objekte/neu" className="onyx-knopf onyx-knopf-primaer">
          <PlusIcon size={16} weight="bold" />
          Objekt anlegen
        </Link>
      </div>

      <dl className="grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
        {kennzahlen.map(({ etikett, wert, warnen, amber }) => (
          <div key={etikett} className="onyx-kachel">
            <dt className="onyx-etikett">{etikett}</dt>
            <dd
              className={`onyx-kachel-zahl mt-2.5 ${
                warnen ? 'text-warn' : amber ? 'onyx-kachel-zahl-amber' : ''
              }`}
            >
              {String(wert).padStart(2, '0')}
            </dd>
          </div>
        ))}
      </dl>

      <section className="mt-8">
        <h2 className="text-lg">Fristen der nächsten Wochen</h2>
        <div className="mt-3.5">
          <Terminschiene objekte={laufend} heute={heute} />
        </div>
      </section>

      <div className="grid lg:grid-cols-12 gap-x-8 gap-y-9 py-9">
        {/* Fristen */}
        <section className="lg:col-span-7">
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="text-lg">Fällige Gutachten</h2>
            <Link
              href="/objekte"
              className="text-[13px] text-akzent hover:underline underline-offset-4 flex items-center gap-1"
            >
              Alle Objekte
              <ArrowRightIcon size={13} weight="bold" />
            </Link>
          </div>

          {nachFrist.length === 0 ? (
            <p className="onyx-leer mt-4 text-sm text-text-leise p-6">
              Keine Akte ist derzeit in Arbeit. Neue Aufträge legst du über „Objekt anlegen“ an.
            </p>
          ) : (
            <ul className="onyx-register mt-3.5 border-t border-linie">
              {nachFrist.map((o) => {
                const tage = tageBis(o.frist, heute);
                const dringend = tage !== null && tage < 0;
                return (
                  <li key={o.id} className="onyx-zeile border-b border-linie">
                    <Link
                      href={`/objekte/${o.id}`}
                      className="flex items-center gap-4 py-3.5 px-2 -mx-2 rounded-kante"
                    >
                      <span
                        aria-hidden
                        className={`w-[3px] self-stretch rounded-full ${
                          dringend ? 'bg-warn' : tage !== null && tage <= 4 ? 'bg-akzent' : 'bg-linie-stark'
                        }`}
                      />
                      <span className="min-w-0 flex-1">
                        <span className="font-mono text-[11.5px] text-text-still">
                          {o.aktenzeichen}
                        </span>
                        <span className="block truncate text-[15px]">
                          {o.strasse}, {o.plz} {o.ort}
                        </span>
                        <span className="block truncate text-[13px] text-text-leise">
                          {o.bewertungsanlass} · {auftraggeber(db, o.auftraggeberId)?.name}
                        </span>
                      </span>
                      <span className="text-right shrink-0">
                        <span className="block font-mono text-[13px] tabular-nums">
                          {datum(o.frist)}
                        </span>
                        <span className="block text-[12.5px]">
                          <Fristmarke frist={o.frist} />
                        </span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </section>

        {/* Ortstermine */}
        <section className="lg:col-span-5">
          <h2 className="text-lg">Nächste Ortstermine</h2>

          {termine.length === 0 ? (
            <p className="onyx-leer mt-4 text-sm text-text-leise p-6">
              Kein Ortstermin geplant. Termine trägst du direkt in der Akte ein.
            </p>
          ) : (
            <ul className="mt-3.5 grid gap-3">
              {termine.map((o) => {
                const d = new Date(o.ortstermin as string);
                return (
                  <li key={o.id}>
                    <Link
                      href={`/objekte/${o.id}`}
                      className="onyx-karte onyx-karte-klick flex gap-4 p-4"
                    >
                      <span className="shrink-0 text-center bg-akzent text-auf-akzent rounded-kante px-3 py-2 w-[3.6rem]">
                        <span className="block font-mono text-[10.5px] uppercase tracking-wider">
                          {d.toLocaleDateString('de-DE', { month: 'short' })}
                        </span>
                        <span className="block font-mono text-xl tabular-nums leading-tight">
                          {String(d.getDate()).padStart(2, '0')}
                        </span>
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[15px] truncate">{o.strasse}</span>
                        <span className="mt-0.5 flex items-center gap-1.5 text-[13px] text-text-leise">
                          <CalendarBlankIcon size={13} />
                          {datumZeit(o.ortstermin)}
                        </span>
                        <span className="mt-2 inline-block">
                          <Statusmarke status={o.status} klein />
                        </span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}

          <p className="mt-5 flex items-start gap-2.5 text-[13px] leading-relaxed text-text-leise bg-akzent-flaeche border border-linie-warm rounded-karte p-4">
            <CameraIcon size={17} className="mt-0.5 shrink-0 text-akzent" />
            <span>
              Beim Ortstermin öffnest du die Akte auf dem Handy und fotografierst direkt aus dem
              System heraus. Die Bilder liegen sofort in der richtigen Akte.
            </span>
          </p>
        </section>
      </div>
    </div>
  );
}
