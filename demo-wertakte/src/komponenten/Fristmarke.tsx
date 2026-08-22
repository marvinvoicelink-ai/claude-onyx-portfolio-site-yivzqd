import { fristText, tageBis } from '@/lib/format';

/**
 * Zeigt, wie lange es bis zur Frist noch dauert. Rot erst, wenn die Frist
 * ueberschritten ist oder in weniger als vier Tagen laeuft.
 */
export function Fristmarke({ frist, erledigt = false }: { frist: string | null; erledigt?: boolean }) {
  const tage = tageBis(frist);
  if (tage === null) return <span className="text-text-leise">Keine Frist</span>;

  if (erledigt) {
    return <span className="text-text-leise">abgegeben</span>;
  }

  const dringend = tage < 0;
  const bald = tage >= 0 && tage <= 4;

  return (
    <span
      className={
        dringend
          ? 'font-medium text-warn'
          : bald
            ? 'font-medium text-offen'
            : 'text-text-leise'
      }
    >
      {fristText(tage)}
    </span>
  );
}
