import type { Status } from '@/lib/typen';
import { STATUS_TEXT } from '@/lib/typen';

/* Amber heisst "laeuft gerade", Grau heisst "ruht", Gruen heisst "erledigt".
   Das ist Bedeutung, kein zweiter Akzent. */
const MARKEN: Record<Status, string> = {
  offen: 'onyx-marke-ruht',
  in_bearbeitung: 'onyx-marke-laeuft',
  abgeschlossen: 'onyx-marke-fertig',
};

export function Statusmarke({ status, klein = false }: { status: Status; klein?: boolean }) {
  return (
    <span className={`onyx-marke ${MARKEN[status]} ${klein ? 'text-[10.5px] px-2 py-0.5' : ''}`}>
      {STATUS_TEXT[status]}
    </span>
  );
}
