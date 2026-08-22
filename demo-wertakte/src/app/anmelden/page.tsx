import { redirect } from 'next/navigation';
import { angemeldet, DEMO_KONTO } from '@/lib/auth';
import { alleObjekte, lesen } from '@/lib/db';
import { Anmeldeformular } from './Anmeldeformular';

export default async function AnmeldeSeite() {
  if (await angemeldet()) redirect('/uebersicht');

  // Aus den echten Daten, damit die Zahlen auch nach einer Vorfuehrung stimmen.
  const db = lesen();
  const laufend = alleObjekte(db).filter((o) => o.status !== 'abgeschlossen').length;

  return (
    <main className="min-h-[100dvh] grid lg:grid-cols-[1fr_minmax(420px,38%)]">
      {/* Linke Seite: Absender des Systems. Auf dem Handy ausgeblendet, dort
          zaehlt nur das Formular. */}
      <section className="hidden lg:flex flex-col justify-between bg-kopf text-kopf-text p-12 xl:p-16">
        <p className="font-mono text-[13px] tracking-[0.3em] uppercase">Wertakte</p>

        <div className="max-w-[30ch]">
          <h1 className="text-4xl xl:text-5xl leading-[1.08] tracking-tight">
            Jede Akte, jedes Foto, jede Frist an einem Ort.
          </h1>
          <p className="mt-6 text-[15px] leading-relaxed text-kopf-text-leise max-w-[46ch]">
            Objekt- und Gutachtenverwaltung für das Sachverständigenbüro Ahlers, Oldenburg.
          </p>
        </div>

        <dl className="grid grid-cols-3 gap-6 border-t border-kopf-linie pt-6">
          {[
            ['Laufende Akten', laufend],
            ['Fotos im Bestand', db.fotos.length],
            ['Auftraggeber', db.auftraggeber.length],
          ].map(([etikett, zahl]) => (
            <div key={etikett}>
              <dt className="font-mono text-[10.5px] tracking-[0.1em] uppercase text-kopf-text-leise">
                {etikett}
              </dt>
              <dd className="mt-1 font-mono text-2xl tabular-nums">{zahl}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Rechte Seite: Anmeldung. */}
      <section className="flex flex-col justify-center px-6 py-14 sm:px-12 bg-papier">
        <div className="w-full max-w-[27rem] mx-auto">
          <p className="lg:hidden font-mono text-[13px] tracking-[0.3em] uppercase text-text-leise">
            Wertakte
          </p>
          <h2 className="mt-6 lg:mt-0 text-2xl tracking-tight">Anmeldung</h2>
          <p className="mt-2 text-sm text-text-leise">
            Zugang für Mitarbeitende des Sachverständigenbüros.
          </p>

          <Anmeldeformular />

          <div className="mt-10 border-t border-linie pt-5">
            <p className="etikett">Demo-Zugang</p>
            <dl className="mt-2 font-mono text-[13px] leading-relaxed">
              <div className="flex gap-2">
                <dt className="text-text-leise w-20 shrink-0">E-Mail</dt>
                <dd className="break-all">{DEMO_KONTO.email}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="text-text-leise w-20 shrink-0">Passwort</dt>
                <dd>{DEMO_KONTO.passwort}</dd>
              </div>
            </dl>
            <p className="mt-3 text-[13px] leading-relaxed text-text-leise">
              Vorführversion mit Beispieldaten. Die Zugangsdaten sind hier eingeblendet, damit die
              Anmeldung im Gespräch ohne Suchen gelingt.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
