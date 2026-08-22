import Link from 'next/link';
import { ArrowLeftIcon } from '@phosphor-icons/react/dist/ssr';
import { lesen, naechstesAktenzeichen } from '@/lib/db';
import { Anlageformular } from './Anlageformular';

export default function NeuesObjektSeite() {
  const db = lesen();

  return (
    <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
      <Link
        href="/objekte"
        className="inline-flex items-center gap-1.5 mt-6 text-[13px] text-text-leise hover:text-text"
      >
        <ArrowLeftIcon size={14} />
        Alle Objekte
      </Link>

      <div className="mt-4 pb-6 border-b border-linie">
        <h1 className="text-2xl sm:text-3xl tracking-tight">Neuen Gutachtenauftrag anlegen</h1>
        <p className="mt-1.5 text-sm text-text-leise max-w-[62ch] leading-relaxed">
          Das Aktenzeichen vergibt das System fortlaufend. Fotos kommen nach dem Anlegen in der Akte
          dazu, Angaben lassen sich jederzeit ergänzen.
        </p>
      </div>

      <Anlageformular
        auftraggeber={db.auftraggeber}
        naechstesAktenzeichen={naechstesAktenzeichen(db)}
      />
    </div>
  );
}
