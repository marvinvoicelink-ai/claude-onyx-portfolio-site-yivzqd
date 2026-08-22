import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeftIcon, EnvelopeSimpleIcon, MapPinIcon, PhoneIcon } from '@phosphor-icons/react/dist/ssr';
import { auftraggeber as findeAuftraggeber, fotosZu, lesen, objekteVon } from '@/lib/db';
import { auftraggeberNotizSpeichern } from '@/lib/aktionen';
import { datum } from '@/lib/format';
import { Fristmarke } from '@/komponenten/Fristmarke';
import { Statusmarke } from '@/komponenten/Statusmarke';

export default async function AuftraggeberDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const db = lesen();
  const ag = findeAuftraggeber(db, id);
  if (!ag) notFound();

  const auftraege = objekteVon(db, ag.id);
  const laufend = auftraege.filter((o) => o.status !== 'abgeschlossen');

  return (
    <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
      <Link
        href="/auftraggeber"
        className="inline-flex items-center gap-1.5 mt-6 text-[13px] text-text-leise hover:text-text"
      >
        <ArrowLeftIcon size={14} />
        Alle Auftraggeber
      </Link>

      <header className="mt-4 pb-6 border-b border-linie">
        <p className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-text-leise">
          {ag.typ}
        </p>
        <h1 className="mt-1.5 text-2xl sm:text-3xl tracking-tight">{ag.name}</h1>
        <p className="mt-1.5 text-[15px] text-text-leise">{ag.ansprechpartner}</p>

        <ul className="mt-5 flex flex-wrap gap-x-8 gap-y-2 text-[13.5px]">
          <li className="flex items-center gap-2">
            <PhoneIcon size={15} className="text-text-leise" />
            <a href={`tel:${ag.telefon.replace(/\s/g, '')}`} className="font-mono hover:underline underline-offset-4">
              {ag.telefon}
            </a>
          </li>
          <li className="flex items-center gap-2">
            <EnvelopeSimpleIcon size={15} className="text-text-leise" />
            <a href={`mailto:${ag.email}`} className="font-mono hover:underline underline-offset-4">
              {ag.email}
            </a>
          </li>
          <li className="flex items-center gap-2">
            <MapPinIcon size={15} className="text-text-leise" />
            {ag.anschrift}
          </li>
        </ul>
      </header>

      <div className="grid lg:grid-cols-12 gap-x-10 gap-y-9 py-8">
        <section className="lg:col-span-7">
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="text-lg tracking-tight">Auftragshistorie</h2>
            <p className="text-[13px] text-text-leise tabular-nums">
              {auftraege.length} gesamt, {laufend.length} laufend
            </p>
          </div>

          {auftraege.length === 0 ? (
            <p className="mt-5 text-sm text-text-leise border border-dashed border-linie-stark rounded-kante p-6">
              Für diesen Auftraggeber ist noch keine Akte angelegt.
            </p>
          ) : (
            <ul className="mt-4 border-t border-linie">
              {auftraege.map((o) => (
                <li key={o.id} className="border-b border-linie">
                  <Link
                    href={`/objekte/${o.id}`}
                    className="flex flex-wrap items-center gap-x-5 gap-y-2 py-3.5 -mx-2 px-2 rounded-kante hover:bg-flaeche-tief"
                  >
                    <span className="font-mono text-[12.5px] text-text-leise w-[7rem] shrink-0">
                      {o.aktenzeichen}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[15px]">{o.strasse}</span>
                      <span className="block truncate text-[13px] text-text-leise">
                        {o.plz} {o.ort} · {o.bewertungsanlass} · {fotosZu(db, o.id).length} Fotos
                      </span>
                    </span>
                    <span className="text-[12.5px] text-right">
                      <span className="block font-mono tabular-nums">{datum(o.frist)}</span>
                      <Fristmarke frist={o.frist} erledigt={o.status === 'abgeschlossen'} />
                    </span>
                    <Statusmarke status={o.status} klein />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="lg:col-span-5">
          <h2 className="text-lg tracking-tight">Notizen zum Auftraggeber</h2>
          <form action={auftraggeberNotizSpeichern.bind(null, ag.id)} className="mt-4 grid gap-3">
            <label htmlFor="notizen" className="sr-only">
              Notizen zum Auftraggeber
            </label>
            <textarea
              id="notizen"
              name="notizen"
              rows={9}
              defaultValue={ag.notizen}
              placeholder="Formvorgaben, Ansprechwege, Besonderheiten bei der Abrechnung."
              className="feld resize-y leading-relaxed"
            />
            <button type="submit" className="knopf knopf-leise justify-self-start">
              Notizen speichern
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
