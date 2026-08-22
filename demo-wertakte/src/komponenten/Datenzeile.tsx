import type { ReactNode } from 'react';

/**
 * Ein Feld im Objektregister: Mono-Etikett oben, Wert darunter. Getrennt wird
 * durch Weissraum und eine einzelne Haarlinie, nicht durch Karten.
 */
export function Datenzeile({
  etikett,
  children,
  mono = false,
  spalten = 1,
}: {
  etikett: string;
  children: ReactNode;
  mono?: boolean;
  spalten?: 1 | 2;
}) {
  return (
    <div className={spalten === 2 ? 'sm:col-span-2' : ''}>
      <dt className="etikett">{etikett}</dt>
      <dd className={`mt-1 text-[15px] leading-snug ${mono ? 'font-mono tabular-nums' : ''}`}>
        {children}
      </dd>
    </div>
  );
}
