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
    { etikett: 'Akten in Arbeit', wert: laufend.length },
    { etikett: 'Fristen überschritten', wert: ueberfaellig.length, warnen: ueberfaellig.length > 0 },
    { etikett: 'Ortstermine geplant', wert: termine.length },
    { etikett: 'Fotos dokumentiert', wert: db.fotos.length },
  ];

  return (
    <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
      <div className="py-7 sm:py-9 flex flex-wrap items-end justify-between gap-4 border-b border-linie">
        <div>
          <h1 className="text-2xl sm:text-3xl tracking-tight">Übersicht</h1>
          <p className="mt-1.5 text-sm text-text-leise">
            Stand {datum(heute.toISOString())}, {laufend.length} Akten in Arbeit
          </p>
        </div>
        <Link href="/objekte/neu" className="knopf knopf-primaer">
          <PlusIcon size={16} weight="bold" />
          Objekt anlegen
        </Link>
      </div>

      {/* Kennzahlen ohne Kartenrahmen: nur Haarlinien und Weissraum. */}
      <dl className="grid grid-cols-2 lg:grid-cols-4 border-b border-linie">
        {kennzahlen.map(({ etikett, wert, warnen }, i) => (
          <div
            key={etikett}
            className={`py-5 sm:py-6 px-1 sm:px-5 ${i > 0 ? 'lg:border-l border-linie' : ''} ${
              i % 2 === 1 ? 'border-l lg:border-l border-linie pl-4 sm:pl-5' : ''
            } ${i < 2 ? 'border-b lg:border-b-0 border-linie' : ''}`}
          >
            <dt className="etikett">{etikett}</dt>
            <dd
              className={`mt-1.5 font-mono text-3xl sm:text-4xl tabular-nums leading-none ${
                warnen ? 'text-warn' : ''
              }`}
            >
              {String(wert).padStart(2, '0')}
            </dd>
          </div>
        ))}
      </dl>

      <div className="grid lg:grid-cols-12 gap-x-10 gap-y-10 py-9">
        {/* Fristen */}
        <section className="lg:col-span-7">
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="text-lg tracking-tight">Fällige Gutachten</h2>
            <Link
              href="/objekte"
              className="text-[13px] text-akzent hover:underline underline-offset-4 flex items-center gap-1"
            >
              Alle Objekte
              <ArrowRightIcon size={13} weight="bold" />
            </Link>
          </div>

          {nachFrist.length === 0 ? (
            <p className="mt-5 text-sm text-text-leise border border-dashed border-linie-stark rounded-kante p-6">
              Keine Akte ist derzeit in Arbeit. Neue Aufträge legst du über „Objekt anlegen“ an.
            </p>
          ) : (
            <ul className="mt-4 border-t border-linie">
              {nachFrist.map((o) => {
                const tage = tageBis(o.frist, heute);
                const dringend = tage !== null && tage < 0;
                return (
                  <li key={o.id} className="border-b border-linie">
                    <Link
                      href={`/objekte/${o.id}`}
                      className="group flex items-center gap-4 py-3.5 hover:bg-flaeche-tief -mx-2 px-2 rounded-kante"
                    >
                      <span
                        aria-hidden
                        className={`w-1 self-stretch rounded-full ${
                          dringend ? 'bg-warn' : tage !== null && tage <= 4 ? 'bg-offen' : 'bg-linie-stark'
                        }`}
                      />
                      <span className="min-w-0 flex-1">
                        <span className="font-mono text-[11.5px] text-text-leise">
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
          <h2 className="text-lg tracking-tight">Nächste Ortstermine</h2>

          {termine.length === 0 ? (
            <p className="mt-5 text-sm text-text-leise border border-dashed border-linie-stark rounded-kante p-6">
              Kein Ortstermin geplant. Termine trägst du direkt in der Akte ein.
            </p>
          ) : (
            <ul className="mt-4 grid gap-3">
              {termine.map((o) => {
                const d = new Date(o.ortstermin as string);
                return (
                  <li key={o.id}>
                    <Link
                      href={`/objekte/${o.id}`}
                      className="flex gap-4 bg-flaeche border border-linie rounded-kante p-4 hover:border-akzent transition-colors"
                    >
                      <span className="shrink-0 text-center bg-kopf text-kopf-text rounded-kante px-3 py-2 w-[3.6rem]">
                        <span className="block font-mono text-[10.5px] uppercase tracking-wider text-kopf-text-leise">
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

          <p className="mt-5 flex items-start gap-2.5 text-[13px] leading-relaxed text-text-leise bg-akzent-flaeche border border-akzent/20 rounded-kante p-4">
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
