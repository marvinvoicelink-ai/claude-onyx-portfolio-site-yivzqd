import { redirect } from 'next/navigation';
import Link from 'next/link';
import { SignOutIcon } from '@phosphor-icons/react/dist/ssr';
import { angemeldet, DEMO_KONTO } from '@/lib/auth';
import { abmeldenAktion } from '@/lib/aktionen';
import { FussNavigation, KopfNavigation } from '@/komponenten/Navigation';

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  if (!(await angemeldet())) redirect('/anmelden');

  return (
    <div className="min-h-[100dvh] flex flex-col">
      <header className="kein-druck sticky top-0 z-30 bg-kopf text-kopf-text border-b border-kopf-linie">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 h-14 md:h-16 flex items-center gap-5 md:gap-8">
          <Link href="/uebersicht" className="flex items-baseline gap-2.5 shrink-0">
            <span className="font-mono text-[13px] tracking-[0.28em] uppercase">Wertakte</span>
            <span className="hidden lg:inline text-[13px] text-kopf-text-leise border-l border-kopf-linie pl-2.5">
              {DEMO_KONTO.buero}
            </span>
          </Link>

          <div className="h-full flex-1">
            <KopfNavigation />
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="hidden sm:block text-[13px] text-kopf-text-leise">
              {DEMO_KONTO.name}
            </span>
            <form action={abmeldenAktion}>
              <button
                type="submit"
                className="flex items-center gap-1.5 text-[13px] text-kopf-text-leise hover:text-kopf-text px-2 py-1.5 rounded-kante"
              >
                <SignOutIcon size={16} />
                <span className="hidden sm:inline">Abmelden</span>
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* Platz unten fuer die Daumenleiste auf dem Handy. */}
      <main className="flex-1 pb-24 md:pb-14 print:pb-0">{children}</main>

      <div className="kein-druck">
        <FussNavigation />
      </div>
    </div>
  );
}
