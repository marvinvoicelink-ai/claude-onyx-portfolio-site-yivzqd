import type { Status } from '@/lib/typen';
import { STATUS_TEXT } from '@/lib/typen';

const FARBEN: Record<Status, string> = {
  offen: 'bg-offen-flaeche text-offen border-offen/35',
  in_bearbeitung: 'bg-lauf-flaeche text-lauf border-lauf/35',
  abgeschlossen: 'bg-fertig-flaeche text-fertig border-fertig/35',
};

/**
 * Statusanzeige als eckige Marke mit kraeftiger linker Kante. Bewusst kein
 * runder Punkt: der Balken ist auch bei Farbfehlsichtigkeit an der Position
 * erkennbar und wirkt wie ein Aktenreiter.
 */
export function Statusmarke({ status, klein = false }: { status: Status; klein?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-2 border border-l-3 rounded-kante font-medium ${FARBEN[status]} ${
        klein ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs'
      }`}
    >
      {STATUS_TEXT[status]}
    </span>
  );
}
