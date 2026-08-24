import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeftIcon,
  CalendarBlankIcon,
  FileTextIcon,
  MapPinIcon,
} from '@phosphor-icons/react/dist/ssr';
import { auftraggeber as findeAuftraggeber, fotosZu, lesen, objekt as findeObjekt } from '@/lib/db';
import {
  beschriftungSpeichern,
  fotoLoeschen,
  fotosHochladen,
  notizSpeichern,
  statusSetzen,
} from '@/lib/aktionen';
import { datum, datumLang, datumZeit, flaeche, oderStrich } from '@/lib/format';
import { STATUS_LISTE, STATUS_TEXT } from '@/lib/typen';
import { Datenzeile } from '@/komponenten/Datenzeile';
import { Fristmarke } from '@/komponenten/Fristmarke';
import { Statusmarke } from '@/komponenten/Statusmarke';
import { FotoAufnahme } from './FotoAufnahme';
import { Fotogalerie } from './Fotogalerie';

export default async function ObjektSeite({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const db = lesen();
  const objekt = findeObjekt(db, id);
  if (!objekt) notFound();

  const ag = findeAuftraggeber(db, objekt.auftraggeberId);
  const fotos = fotosZu(db, objekt.id);
  const ohneBeschriftung = fotos.filter((f) => !f.beschriftung).length;

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <Link
        href="/objekte"
        className="inline-flex items-center gap-1.5 mt-6 text-[13px] text-text-leise hover:text-akzent"
      >
        <ArrowLeftIcon size={14} />
        Alle Objekte
      </Link>

      {/* Aktenkopf */}
      <header className="mt-4 pb-6 border-b border-linie">
        <p className="font-mono text-[13px] tracking-[0.14em] text-akzent">
          {objekt.aktenzeichen}
        </p>
        <div className="mt-1.5 flex flex-wrap items-start justify-between gap-x-8 gap-y-4">
          <div>
            <h1 className="text-2xl sm:text-[28px]">{objekt.strasse}</h1>
            <p className="mt-1.5 flex items-center gap-1.5 text-[15px] text-text-leise">
              <MapPinIcon size={15} />
              {objekt.plz} {objekt.ort} · {objekt.objekttyp}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            <div>
              <p className="onyx-etikett">Abgabefrist</p>
              <p className="mt-1 font-mono text-[15px] tabular-nums">{datum(objekt.frist)}</p>
              <p className="text-[13px]">
                <Fristmarke frist={objekt.frist} erledigt={objekt.status === 'abgeschlossen'} />
              </p>
            </div>
            <div>
              <p className="onyx-etikett">Status</p>
              <p className="mt-1.5">
                <Statusmarke status={objekt.status} />
              </p>
            </div>
          </div>
        </div>

        {/* Statuswechsel und Entwurf: die zwei Handgriffe, die am haeufigsten
            gebraucht werden, direkt unter dem Aktenkopf. */}
        <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-4 sm:justify-between">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="onyx-etikett mr-1">Status setzen</span>
            {STATUS_LISTE.map((s) => (
              <form key={s} action={statusSetzen.bind(null, objekt.id, s)}>
                <button
                  type="submit"
                  disabled={objekt.status === s}
                  className={`onyx-knopf text-[13px] px-3 py-1.5 ${
                    objekt.status === s
                      ? 'bg-akzent text-auf-akzent cursor-default'
                      : 'onyx-knopf-leise'
                  }`}
                >
                  {STATUS_TEXT[s]}
                </button>
              </form>
            ))}
          </div>

          <Link href={`/objekte/${objekt.id}/entwurf`} className="onyx-knopf onyx-knopf-primaer">
            <FileTextIcon size={17} weight="fill" />
            Gutachten-Entwurf erstellen
          </Link>
        </div>
      </header>

      <div className="grid lg:grid-cols-12 gap-x-10 gap-y-10 py-8">
        {/* Fotodokumentation steht im Quelltext zuerst: auf dem Handy ist sie
            beim Ortstermin das Erste, was gebraucht wird. */}
        <section className="lg:col-start-6 lg:col-span-7 lg:row-start-1">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h2 className="text-lg">Fotodokumentation</h2>
            <p className="text-[13px] text-text-leise tabular-nums">
              {fotos.length} {fotos.length === 1 ? 'Foto' : 'Fotos'}
              {ohneBeschriftung > 0 ? (
                <span className="text-akzent"> · {ohneBeschriftung} ohne Beschriftung</span>
              ) : null}
            </p>
          </div>

          <div className="onyx-karte mt-4 p-4">
            <FotoAufnahme aktion={fotosHochladen.bind(null, objekt.id)} />
          </div>

          <div className="mt-5">
            <Fotogalerie
              fotos={fotos}
              beschriften={beschriftungSpeichern}
              loeschen={fotoLoeschen}
            />
          </div>
        </section>

        {/* Objektangaben */}
        <div className="lg:col-start-1 lg:col-span-5 lg:row-start-1 grid gap-9">
          <section>
            <h2 className="text-lg">Objektangaben</h2>
            <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-linie pt-5">
              <Datenzeile etikett="Bewertungsanlass" spalten={2}>
                {objekt.bewertungsanlass}
              </Datenzeile>
              <Datenzeile etikett="Objekttyp">{objekt.objekttyp}</Datenzeile>
              <Datenzeile etikett="Baujahr" mono>
                {oderStrich(objekt.baujahr)}
              </Datenzeile>
              <Datenzeile etikett="Wohn-/Nutzfläche" mono>
                {flaeche(objekt.wohnflaeche)}
              </Datenzeile>
              <Datenzeile etikett="Grundstücksfläche" mono>
                {flaeche(objekt.grundstuecksflaeche)}
              </Datenzeile>
              <Datenzeile etikett="Wertermittlungsstichtag" mono>
                {datum(objekt.stichtag)}
              </Datenzeile>
              <Datenzeile etikett="Akte angelegt" mono>
                {datum(objekt.angelegtAm)}
              </Datenzeile>
              <Datenzeile etikett="Ortsbesichtigung" spalten={2}>
                <span className="flex items-center gap-1.5">
                  <CalendarBlankIcon size={15} className="text-text-leise" />
                  {datumZeit(objekt.ortstermin)}
                </span>
              </Datenzeile>
            </dl>
          </section>

          <section>
            <h2 className="text-lg">Auftraggeber</h2>
            {ag ? (
              <Link
                href={`/auftraggeber/${ag.id}`}
                className="onyx-karte onyx-karte-klick mt-4 block p-4"
              >
                <p className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-text-leise">
                  {ag.typ}
                </p>
                <p className="mt-1 text-[15px]">{ag.name}</p>
                <p className="mt-0.5 text-[13px] text-text-leise">{ag.ansprechpartner}</p>
                <p className="mt-2 font-mono text-[12.5px] text-text-leise">
                  {ag.telefon} · {ag.email}
                </p>
              </Link>
            ) : (
              <p className="mt-4 text-sm text-text-leise">Kein Auftraggeber hinterlegt.</p>
            )}
          </section>

          <section>
            <h2 className="text-lg">Notizen zur Akte</h2>
            <form action={notizSpeichern.bind(null, objekt.id)} className="mt-4 grid gap-3">
              <label htmlFor="notizen" className="sr-only">
                Notizen zur Akte
              </label>
              <textarea
                id="notizen"
                name="notizen"
                rows={7}
                defaultValue={objekt.notizen}
                placeholder="Beobachtungen vom Ortstermin, offene Unterlagen, Absprachen mit dem Auftraggeber."
                className="onyx-feld resize-y leading-relaxed"
              />
              <button type="submit" className="onyx-knopf onyx-knopf-leise justify-self-start">
                Notizen speichern
              </button>
            </form>
          </section>

          <p className="text-[12.5px] text-text-leise leading-relaxed border-t border-linie pt-4">
            Akte angelegt am {datumLang(objekt.angelegtAm)}. Alle Angaben und Fotos in dieser
            Vorführversion sind Beispieldaten.
          </p>
        </div>
      </div>
    </div>
  );
}
