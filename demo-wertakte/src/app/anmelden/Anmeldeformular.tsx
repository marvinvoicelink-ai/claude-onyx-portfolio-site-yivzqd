'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { WarningCircleIcon } from '@phosphor-icons/react/dist/ssr';
import { anmeldenAktion, type Formularantwort } from '@/lib/aktionen';
import { DEMO_KONTO } from '@/lib/demo-konto';

function Absenden() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="knopf knopf-primaer w-full mt-2" disabled={pending}>
      {pending ? 'Wird geprüft …' : 'Anmelden'}
    </button>
  );
}

export function Anmeldeformular() {
  const [zustand, aktion] = useActionState<Formularantwort, FormData>(anmeldenAktion, {});

  return (
    <form action={aktion} className="mt-8 grid gap-4">
      <div className="grid gap-2">
        <label htmlFor="email" className="etikett">
          E-Mail
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="username"
          required
          defaultValue={DEMO_KONTO.email}
          className="feld"
        />
      </div>

      <div className="grid gap-2">
        <label htmlFor="passwort" className="etikett">
          Passwort
        </label>
        <input
          id="passwort"
          name="passwort"
          type="password"
          autoComplete="current-password"
          required
          defaultValue={DEMO_KONTO.passwort}
          className="feld"
        />
      </div>

      {zustand.fehler ? (
        <p
          role="alert"
          className="flex items-start gap-2 text-sm text-warn bg-warn-flaeche border border-warn/30 rounded-kante px-3 py-2"
        >
          <WarningCircleIcon size={17} weight="bold" className="mt-0.5 shrink-0" />
          {zustand.fehler}
        </p>
      ) : null}

      <Absenden />
    </form>
  );
}
