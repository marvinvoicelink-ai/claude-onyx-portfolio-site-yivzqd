import { fristText, tageBis } from '@/lib/format';

/**
 * Zeigt, wie lange es bis zur Frist noch dauert. Rot, sobald die Frist
 * ueberschritten ist, Amber ab vier Tagen davor, sonst still.
 */
export function Fristmarke({ frist, erledigt = false }: { frist: string | null; erledigt?: boolean }) {
  const tage = tageBis(frist);
  if (tage === null) return <span className="text-text-still">Keine Frist</span>;
  if (erledigt) return <span className="text-text-still">abgegeben</span>;

  const dringend = tage < 0;
  const bald = tage >= 0 && tage <= 4;

  return (
    <span
      className={
        dringend ? 'font-medium text-warn' : bald ? 'font-medium text-akzent' : 'text-text-leise'
      }
    >
      {fristText(tage)}
    </span>
  );
}
