import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeftIcon } from '@phosphor-icons/react/dist/ssr';
import { auftraggeber as findeAuftraggeber, fotosZu, lesen, objekt as findeObjekt } from '@/lib/db';
import { DEMO_KONTO } from '@/lib/demo-konto';
import { datum, datumLang, datumZeit, flaeche, oderStrich } from '@/lib/format';
import { Druckknopf } from './Druckknopf';

/** Abschnitt, den der Sachverständige selbst schreibt. Im Entwurf sichtbar
 *  als offene Stelle, damit im Dokument nichts unbemerkt leer bleibt. */
function Platzhalter({ children }: { children: React.ReactNode }) {
  return (
    <p className="zusammenhalten mt-3 border-l-2 border-[#B9B2A3] pl-4 py-1 text-[13.5px] leading-relaxed text-[#6C6459] italic">
      {children}
    </p>
  );
}

function Abschnitt({
  nummer,
  titel,
  children,
}: {
  nummer: string;
  titel: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-9">
      <h2 className="flex gap-3 items-baseline text-[15.5px] font-semibold tracking-tight border-b border-[#D5CFC2] pb-1.5">
        <span className="font-mono text-[13px] text-[#7A7266]">{nummer}</span>
        {titel}
      </h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}

export default async function EntwurfSeite({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const db = lesen();
  const objekt = findeObjekt(db, id);
  if (!objekt) notFound();

  const ag = findeAuftraggeber(db, objekt.auftraggeberId);
  const fotos = fotosZu(db, objekt.id);
  const heute = new Date().toISOString().slice(0, 10);

  const angaben: [string, string][] = [
    ['Lage', `${objekt.strasse}, ${objekt.plz} ${objekt.ort}`],
    ['Objektart', objekt.objekttyp],
    ['Baujahr', oderStrich(objekt.baujahr)],
    ['Wohn-/Nutzfläche', flaeche(objekt.wohnflaeche)],
    ['Grundstücksfläche', flaeche(objekt.grundstuecksflaeche)],
    ['Wertermittlungsstichtag', datum(objekt.stichtag)],
    ['Ortsbesichtigung', datumZeit(objekt.ortstermin)],
  ];

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      {/* Bedienleiste. Im Ausdruck ausgeblendet. */}
      <div className="kein-druck flex flex-wrap items-center justify-between gap-4 py-6 border-b border-linie">
        <div>
          <Link
            href={`/objekte/${objekt.id}`}
            className="inline-flex items-center gap-1.5 text-[13px] text-text-leise hover:text-akzent"
          >
            <ArrowLeftIcon size={14} />
            Zurück zur Akte {objekt.aktenzeichen}
          </Link>
          <h1 className="mt-2 text-xl sm:text-2xl">Gutachten-Entwurf</h1>
          <p className="mt-1 text-[13px] text-text-leise max-w-[70ch] leading-relaxed">
            Aus den Angaben der Akte und {fotos.length}{' '}
            {fotos.length === 1 ? 'Lichtbild' : 'Lichtbildern'} zusammengestellt. Die
            Wertermittlung schreibt der Sachverständige, das System liefert die Gliederung und die
            belegten Fakten.
          </p>
        </div>
        <Druckknopf />
      </div>

      {/* Das Blatt bleibt bewusst hell, auch im Dunkelmodus: es zeigt das
          spaetere Dokument, wie ein PDF-Betrachter es zeigen wuerde. */}
      {/* Das Blatt bleibt Papier, auch in der dunklen Oberflaeche: es zeigt
          das spaetere Dokument, wie ein PDF-Betrachter es zeigen wuerde. */}
      <div className="py-8 flex justify-center">
        <article
          className="blatt w-full max-w-[210mm] bg-[#FBF9F4] text-[#1E211F] rounded-karte shadow-[0_0_0_1px_rgba(232,163,61,.25),0_18px_60px_rgba(0,0,0,.55)] px-5 sm:px-14 py-10 sm:py-12 font-akte"
          style={{ colorScheme: 'light' }}
        >
          {/* Briefkopf */}
          <header className="flex flex-wrap justify-between gap-6 pb-5 border-b-2 border-[#1E211F]">
            <div>
              <p className="font-sans font-semibold text-[15px] tracking-tight">
                {DEMO_KONTO.buero}
              </p>
              <p className="font-sans text-[11.5px] leading-relaxed text-[#5F584E] max-w-[38ch]">
                {DEMO_KONTO.rolle}
              </p>
            </div>
            <div className="font-sans text-[11.5px] leading-relaxed text-[#5F584E] sm:text-right">
              <p>{DEMO_KONTO.strasse}</p>
              <p>{DEMO_KONTO.ort}</p>
              <p>{DEMO_KONTO.telefon}</p>
              <p>{DEMO_KONTO.email_buero}</p>
            </div>
          </header>

          {/* Deckblatt */}
          <div className="pt-12 pb-10 text-center">
            <p className="font-sans font-mono text-[11px] uppercase tracking-[0.24em] text-[#6C6459]">
              Entwurf
            </p>
            <h2 className="mt-5 text-[26px] sm:text-[30px] leading-tight">
              {objekt.bewertungsanlass}
            </h2>
            <p className="mt-5 text-[17px] leading-snug">
              {objekt.strasse}
              <br />
              {objekt.plz} {objekt.ort}
            </p>
            <p className="mt-6 font-sans font-mono text-[12.5px] tracking-[0.1em] text-[#5F584E]">
              {objekt.aktenzeichen}
            </p>
          </div>

          <dl className="grid sm:grid-cols-2 gap-x-10 gap-y-3 border-y border-[#D5CFC2] py-5 text-[13.5px]">
            <div className="flex gap-3">
              <dt className="w-[11rem] shrink-0 text-[#5F584E]">Auftraggeber</dt>
              <dd>{ag?.name ?? '–'}</dd>
            </div>
            <div className="flex gap-3">
              <dt className="w-[11rem] shrink-0 text-[#5F584E]">Ansprechpartner</dt>
              <dd>{ag?.ansprechpartner ?? '–'}</dd>
            </div>
            <div className="flex gap-3">
              <dt className="w-[11rem] shrink-0 text-[#5F584E]">Wertermittlungsstichtag</dt>
              <dd>{datum(objekt.stichtag)}</dd>
            </div>
            <div className="flex gap-3">
              <dt className="w-[11rem] shrink-0 text-[#5F584E]">Ortsbesichtigung</dt>
              <dd>{datum(objekt.ortstermin)}</dd>
            </div>
            <div className="flex gap-3">
              <dt className="w-[11rem] shrink-0 text-[#5F584E]">Entwurf erstellt</dt>
              <dd>{datumLang(heute)}</dd>
            </div>
            <div className="flex gap-3">
              <dt className="w-[11rem] shrink-0 text-[#5F584E]">Sachverständige</dt>
              <dd>{DEMO_KONTO.name}</dd>
            </div>
          </dl>

          <Abschnitt nummer="1" titel="Auftrag und Zweck der Wertermittlung">
            <p className="text-[13.5px] leading-relaxed">
              {ag?.name ?? 'Der Auftraggeber'} hat das Sachverständigenbüro mit der Erstellung eines{' '}
              {objekt.bewertungsanlass.toLowerCase().replace('gutachten', 'gutachtens')} für das
              oben bezeichnete Objekt beauftragt. Die Ortsbesichtigung fand am{' '}
              {datum(objekt.ortstermin)} statt.
            </p>
            <Platzhalter>
              Zweck der Wertermittlung, Rechtsgrundlagen und verwendetes Verfahren werden hier
              ausformuliert.
            </Platzhalter>
          </Abschnitt>

          <Abschnitt nummer="2" titel="Objektangaben">
            <dl className="text-[13.5px]">
              {angaben.map(([etikett, wert], i) => (
                <div
                  key={etikett}
                  className={`flex gap-4 py-1.5 ${i < angaben.length - 1 ? 'border-b border-[#E4DFD3]' : ''}`}
                >
                  <dt className="w-[13rem] shrink-0 text-[#5F584E]">{etikett}</dt>
                  <dd>{wert}</dd>
                </div>
              ))}
            </dl>
          </Abschnitt>

          <Abschnitt nummer="3" titel="Grundstücks- und Gebäudebeschreibung">
            {objekt.notizen ? (
              <>
                <p className="font-sans text-[11px] uppercase tracking-[0.1em] text-[#6C6459]">
                  Aus den Notizen zur Akte übernommen
                </p>
                <p className="mt-2 text-[13.5px] leading-relaxed whitespace-pre-line">
                  {objekt.notizen}
                </p>
              </>
            ) : null}
            <Platzhalter>
              Lagebeschreibung, Erschließung, Bauweise, Ausstattung und Zustand werden hier
              ausformuliert.
            </Platzhalter>
          </Abschnitt>

          <Abschnitt nummer="4" titel="Fotodokumentation">
            {fotos.length === 0 ? (
              <Platzhalter>
                Für diese Akte ist noch kein Lichtbild erfasst. Fotos aus der Akte erscheinen an
                dieser Stelle automatisch mit ihrer Beschriftung.
              </Platzhalter>
            ) : (
              <ol className="grid sm:grid-cols-2 gap-x-6 gap-y-6">
                {fotos.map((foto, i) => (
                  <li key={foto.id} className="zusammenhalten">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={foto.quelle}
                      alt={foto.beschriftung || `Lichtbild ${i + 1}`}
                      className="w-full aspect-[4/3] object-cover border border-[#D5CFC2]"
                    />
                    <p className="mt-1.5 text-[12px] leading-snug hyphens-auto [overflow-wrap:anywhere]">
                      <span className="font-sans font-mono text-[11px] text-[#5F584E]">
                        Lichtbild {i + 1}
                      </span>{' '}
                      {foto.beschriftung || (
                        <span className="italic text-[#6C6459]">ohne Beschriftung</span>
                      )}
                    </p>
                    <p className="text-[11px] text-[#6C6459]">
                      {foto.kategorie}, aufgenommen am {datum(foto.aufgenommenAm)}
                    </p>
                  </li>
                ))}
              </ol>
            )}
          </Abschnitt>

          <Abschnitt nummer="5" titel="Wertermittlung">
            <dl className="text-[13.5px]">
              {['Bodenwert', 'Sachwert', 'Ertragswert', 'Vorläufiger Verkehrswert'].map((z) => (
                <div key={z} className="flex gap-4 py-1.5 border-b border-[#E4DFD3]">
                  <dt className="w-[13rem] shrink-0 text-[#5F584E]">{z}</dt>
                  <dd className="font-sans font-mono text-[#8A8377]">wird ergänzt</dd>
                </div>
              ))}
            </dl>
            <Platzhalter>
              Ableitung der Werte, Marktanpassung und Begründung der Wertansätze werden hier
              ausformuliert.
            </Platzhalter>
          </Abschnitt>

          <Abschnitt nummer="6" titel="Zusammenfassung und Ergebnis">
            <Platzhalter>
              Zusammenfassendes Ergebnis der Wertermittlung zum Stichtag {datum(objekt.stichtag)}.
            </Platzhalter>

            <div className="zusammenhalten mt-16 flex flex-col items-start gap-1">
              <div className="w-64 border-t border-[#1E211F]" />
              <p className="text-[12.5px]">{DEMO_KONTO.name}</p>
              <p className="font-sans text-[11px] text-[#5F584E] max-w-[36ch] leading-relaxed">
                {DEMO_KONTO.rolle}
              </p>
              <p className="font-sans text-[11px] text-[#5F584E]">
                {DEMO_KONTO.ort.split(' ').slice(1).join(' ')}, {datumLang(heute)}
              </p>
            </div>
          </Abschnitt>

          <footer className="mt-12 pt-4 border-t border-[#D5CFC2] font-sans text-[10.5px] leading-relaxed text-[#6C6459]">
            Entwurf zu {objekt.aktenzeichen}, erzeugt am {datumLang(heute)}. Kein
            unterschriebenes Gutachten. Alle Angaben dieser Vorführversion sind Beispieldaten.
          </footer>
        </article>
      </div>
    </div>
  );
}
