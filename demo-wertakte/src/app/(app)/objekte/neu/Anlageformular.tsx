'use client';

import Link from 'next/link';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { WarningCircleIcon } from '@phosphor-icons/react/dist/ssr';
import { objektAnlegen, type Formularantwort } from '@/lib/aktionen';
import type { Auftraggeber } from '@/lib/typen';
import { BEWERTUNGSANLAESSE, OBJEKTTYPEN, STATUS_LISTE, STATUS_TEXT } from '@/lib/typen';

function Absenden() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="onyx-knopf onyx-knopf-primaer" disabled={pending}>
      {pending ? 'Wird angelegt …' : 'Akte anlegen'}
    </button>
  );
}

function Feld({
  name,
  etikett,
  hinweis,
  ...rest
}: {
  name: string;
  etikett: string;
  hinweis?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="grid gap-2">
      <label htmlFor={name} className="onyx-etikett">
        {etikett}
      </label>
      <input id={name} name={name} className="onyx-feld" {...rest} />
      {hinweis ? <p className="text-[12.5px] text-text-leise">{hinweis}</p> : null}
    </div>
  );
}

function Auswahl({
  name,
  etikett,
  optionen,
  standard,
}: {
  name: string;
  etikett: string;
  optionen: { wert: string; text: string }[];
  standard?: string;
}) {
  return (
    <div className="grid gap-2">
      <label htmlFor={name} className="onyx-etikett">
        {etikett}
      </label>
      <select id={name} name={name} defaultValue={standard} className="onyx-feld">
        {optionen.map((o) => (
          <option key={o.wert} value={o.wert}>
            {o.text}
          </option>
        ))}
      </select>
    </div>
  );
}

export function Anlageformular({
  auftraggeber,
  naechstesAktenzeichen,
}: {
  auftraggeber: Auftraggeber[];
  naechstesAktenzeichen: string;
}) {
  const [zustand, aktion] = useActionState<Formularantwort, FormData>(objektAnlegen, {});

  return (
    <form action={aktion} className="grid gap-9 py-8 max-w-3xl">
      <section className="grid gap-5">
        <div className="flex items-baseline justify-between gap-4 border-b border-linie pb-2">
          <h2 className="text-lg">Objekt</h2>
          <p className="font-mono text-[12.5px] text-akzent">
            Aktenzeichen {naechstesAktenzeichen}
          </p>
        </div>

        <Feld name="strasse" etikett="Straße und Hausnummer" required autoFocus placeholder="Eichenstraße 14" />

        <div className="grid sm:grid-cols-[9rem_1fr] gap-5">
          <Feld name="plz" etikett="Postleitzahl" inputMode="numeric" placeholder="26131" />
          <Feld name="ort" etikett="Ort" required placeholder="Oldenburg" />
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <Auswahl
            name="objekttyp"
            etikett="Objekttyp"
            optionen={OBJEKTTYPEN.map((t) => ({ wert: t, text: t }))}
          />
          <Feld name="baujahr" etikett="Baujahr" inputMode="numeric" placeholder="1968" />
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <Feld name="wohnflaeche" etikett="Wohn-/Nutzfläche in m²" inputMode="decimal" placeholder="142" />
          <Feld
            name="grundstuecksflaeche"
            etikett="Grundstücksfläche in m²"
            inputMode="decimal"
            placeholder="640"
          />
        </div>
      </section>

      <section className="grid gap-5">
        <h2 className="text-lg border-b border-linie pb-2">Auftrag</h2>

        <Auswahl
          name="auftraggeberId"
          etikett="Auftraggeber"
          optionen={[
            { wert: '', text: 'Bitte auswählen' },
            ...auftraggeber.map((a) => ({ wert: a.id, text: `${a.name} (${a.typ})` })),
          ]}
          standard=""
        />

        <div className="grid sm:grid-cols-2 gap-5">
          <Auswahl
            name="bewertungsanlass"
            etikett="Bewertungsanlass"
            optionen={BEWERTUNGSANLAESSE.map((b) => ({ wert: b, text: b }))}
          />
          <Auswahl
            name="status"
            etikett="Status"
            optionen={STATUS_LISTE.map((s) => ({ wert: s, text: STATUS_TEXT[s] }))}
          />
        </div>
      </section>

      <section className="grid gap-5">
        <h2 className="text-lg border-b border-linie pb-2">Termine</h2>

        <div className="grid sm:grid-cols-2 gap-5">
          <Feld
            name="ortstermin"
            etikett="Ortsbesichtigung"
            type="datetime-local"
            hinweis="Erscheint auf der Übersicht unter den nächsten Ortsterminen."
          />
          <Feld name="frist" etikett="Abgabefrist" type="date" />
        </div>

        <div className="sm:w-1/2 sm:pr-2.5">
          <Feld name="stichtag" etikett="Wertermittlungsstichtag" type="date" />
        </div>
      </section>

      <section className="grid gap-3">
        <label htmlFor="notizen" className="onyx-etikett">
          Notizen
        </label>
        <textarea
          id="notizen"
          name="notizen"
          rows={4}
          className="onyx-feld resize-y leading-relaxed"
          placeholder="Gerichtliches Aktenzeichen, Ansprechpartner vor Ort, angekündigte Unterlagen."
        />
      </section>

      {zustand.fehler ? (
        <p
          role="alert"
          className="flex items-start gap-2 text-sm text-warn bg-warn-flaeche border border-warn/35 rounded-kante px-3 py-2"
        >
          <WarningCircleIcon size={17} weight="bold" className="mt-0.5 shrink-0" />
          {zustand.fehler}
        </p>
      ) : null}

      <div className="flex items-center gap-3 border-t border-linie pt-6">
        <Absenden />
        <Link href="/objekte" className="onyx-knopf onyx-knopf-klar">
          Abbrechen
        </Link>
      </div>
    </form>
  );
}
