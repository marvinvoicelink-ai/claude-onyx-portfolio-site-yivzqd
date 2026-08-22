import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';
import { BellIcon, SignOutIcon } from '@phosphor-icons/react/dist/ssr';
import { angemeldet, DEMO_KONTO } from '@/lib/auth';
import { abmeldenAktion } from '@/lib/aktionen';
import { alleObjekte, lesen } from '@/lib/db';
import { tageBis } from '@/lib/format';
import { FussNavigation, SeitenRail } from '@/komponenten/Navigation';
import { Kopfsuche } from '@/komponenten/Kopfsuche';

const TITEL = /^(dipl|ing|dr|prof|mag|b\.?sc|m\.?sc|dipl\.-ing)\.?-?/i;

/** Kürzel aus dem Namen, z. B. "Dipl.-Ing. K. Ahlers" -> "KA". */
function kuerzel(name: string): string {
  const teile = name
    .split(/\s+/)
    .filter((t) => t && !TITEL.test(t))
    .map((t) => t.replace(/[^\p{L}]/gu, ''))
    .filter(Boolean);
  return teile.slice(0, 2).map((t) => t[0]).join('').toUpperCase() || 'SV';
}

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  if (!(await angemeldet())) redirect('/anmelden');

  const ueberfaellig = alleObjekte(lesen()).filter((o) => {
    if (o.status === 'abgeschlossen') return false;
    const t = tageBis(o.frist);
    return t !== null && t < 0;
  }).length;

  return (
    <div className="min-h-[100dvh] md:p-4 lg:p-5">
      {/* Das leuchtende Fenster: genau einmal je Seite. */}
      <div className="onyx-rahmen kein-druck-rahmen min-h-[100dvh] md:min-h-[calc(100dvh-2rem)] lg:min-h-[calc(100dvh-2.5rem)] flex overflow-hidden">
        {/* Icon-Leiste */}
        <aside className="onyx-rail kein-druck hidden md:block shrink-0">
          <div className="sticky top-0 flex flex-col items-center gap-6 py-4 h-[100dvh]">
            <Link
              href="/uebersicht"
              aria-label="Wertakte, zur Übersicht"
              className="grid place-items-center w-10 h-10 rounded-kante border border-linie-stark text-akzent font-mono text-[15px]"
            >
              W
            </Link>
            <SeitenRail />
          </div>
        </aside>

        <div className="flex-1 min-w-0 flex flex-col">
          {/* Kopfzeile */}
          <header className="kein-druck sticky top-0 z-30 bg-rahmen/95 backdrop-blur border-b border-linie-warm">
            <div className="h-14 md:h-16 px-4 sm:px-6 flex items-center gap-3 sm:gap-5">
              <Link
                href="/uebersicht"
                className="md:hidden font-mono text-[12px] tracking-[0.26em] uppercase shrink-0"
              >
                Wertakte
              </Link>

              <div className="flex-1 min-w-0 flex md:justify-center">
                <Suspense fallback={<div className="h-9 w-full max-w-md" />}>
                  <Kopfsuche />
                </Suspense>
              </div>

              <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
                <Link
                  href="/uebersicht"
                  aria-label={
                    ueberfaellig > 0
                      ? `${ueberfaellig} Akten mit überschrittener Frist`
                      : 'Keine überschrittene Frist'
                  }
                  className="relative grid place-items-center w-9 h-9 rounded-kante text-text-leise hover:text-text hover:bg-akzent-flaeche"
                >
                  <BellIcon size={19} />
                  {ueberfaellig > 0 ? (
                    <span className="absolute top-1 right-1 min-w-[15px] h-[15px] px-1 grid place-items-center rounded-full bg-warn text-[9.5px] font-mono text-grund">
                      {ueberfaellig}
                    </span>
                  ) : null}
                </Link>

                <span className="hidden lg:block text-[13px] text-text-leise">
                  {DEMO_KONTO.name}
                </span>
                <span
                  aria-hidden
                  className="grid place-items-center w-9 h-9 rounded-full bg-akzent-flaeche border border-linie-stark text-akzent font-mono text-[12px]"
                >
                  {kuerzel(DEMO_KONTO.name)}
                </span>

                <form action={abmeldenAktion}>
                  <button
                    type="submit"
                    aria-label="Abmelden"
                    className="grid place-items-center w-9 h-9 rounded-kante text-text-leise hover:text-text hover:bg-akzent-flaeche"
                  >
                    <SignOutIcon size={18} />
                  </button>
                </form>
              </div>
            </div>
          </header>

          {/* Platz unten fuer die Daumenleiste auf dem Handy. */}
          <main className="flex-1 pb-24 md:pb-10 print:pb-0">{children}</main>
        </div>
      </div>

      <div className="kein-druck">
        <FussNavigation />
      </div>
    </div>
  );
}
