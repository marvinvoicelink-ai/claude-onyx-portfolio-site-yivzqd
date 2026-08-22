import Link from 'next/link';

export default function NichtGefunden() {
  return (
    <main className="min-h-[100dvh] grid place-items-center px-6">
      <div className="text-center max-w-[44ch]">
        <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-akzent">
          Wertakte
        </p>
        <h1 className="mt-4 text-2xl">Diese Seite gibt es nicht</h1>
        <p className="mt-2 text-sm text-text-leise leading-relaxed">
          Die Akte wurde vielleicht entfernt oder die Adresse stimmt nicht.
        </p>
        <Link href="/uebersicht" className="onyx-knopf onyx-knopf-primaer mt-7">
          Zur Übersicht
        </Link>
      </div>
    </main>
  );
}
