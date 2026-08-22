'use client';

import { PrinterIcon } from '@phosphor-icons/react/dist/ssr';

/** Oeffnet den Druckdialog des Browsers. Dort waehlt man "Als PDF sichern". */
export function Druckknopf() {
  return (
    <button type="button" onClick={() => window.print()} className="knopf knopf-primaer">
      <PrinterIcon size={17} weight="fill" />
      Drucken oder als PDF sichern
    </button>
  );
}
