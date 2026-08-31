import Image from "next/image";
import Link from "next/link";

/**
 * Ausgangslage, bewusst auf zwei Themen verdichtet statt fuenf Einzelprobleme:
 * (1) die Systeme passen nicht zusammen — dafuer bauen wir eigene (CRM, ERP,
 * Portale), (2) zu viel laeuft per Hand — dafuer setzen wir Automationen und
 * KI-Agenten ein. Als Bild-und-Text-Zeilen, abwechselnd Bild links/rechts, mit
 * je einem Higgsfield-Render im Onyx-Stil. Der Leser soll bei jedem Block
 * nicken ("stimmt, das kenne ich"), ohne eine Detailliste zu lesen.
 */
type ProblemRow = {
  num: string;
  title: string;
  highlight: string;
  desc: string;
  image: string;
  imageAlt: string;
  imageRight: boolean;
};

const rows: ProblemRow[] = [
  {
    num: "01",
    title: "Deine Systeme",
    highlight: "passen nicht zusammen.",
    desc: "Mehrere Tools, die nichts voneinander wissen, Funktionen, die fehlen, und Daten, die beim Anbieter liegen statt bei dir. Wir bauen dir stattdessen ein eigenes System — CRM, ERP, Portal —, das zu deinem Ablauf passt und dir vollständig gehört.",
    image: "/generated/problem-systeme.jpg",
    imageAlt: "Viele einzelne, lose verbundene Software-Oberflächen, die im Dunkeln auseinanderdriften",
    imageRight: true,
  },
  {
    num: "02",
    title: "Zu viel läuft",
    highlight: "noch per Hand.",
    desc: "Angebote, Rechnungen, Datenpflege, Nachfassen — jeden Tag dieselben Handgriffe. Wir setzen Automationen und KI-Agenten ein, die diese wiederkehrende Arbeit übernehmen, direkt in deinem Betrieb.",
    image: "/generated/problem-automation.jpg",
    imageAlt: "Automatisierte Pipeline: Dokumente laufen über ein leuchtendes Band durch einen zentralen KI-Knoten",
    imageRight: false,
  },
];

function Row({ r }: { r: ProblemRow }) {
  const media = (
    <div className="relative overflow-hidden rounded-2xl" style={{ border: "1px solid var(--hairline)" }}>
      <Image
        src={r.image}
        alt={r.imageAlt}
        width={1600}
        height={1073}
        sizes="(min-width: 1024px) 540px, 100vw"
        className="w-full h-full block"
        style={{ objectFit: "cover", aspectRatio: "3 / 2" }}
      />
    </div>
  );
  const body = (
    <div className="text-left">
      <div className="flex items-center justify-between mb-4">
        <span
          className="mono inline-flex items-center rounded-full px-3 py-1"
          style={{ fontSize: 12, color: "var(--amber)", border: "1px solid rgba(232, 163, 61,0.35)", background: "var(--amber-soft)" }}
        >
          Problem {r.num}
        </span>
      </div>
      <h3 style={{ fontSize: "clamp(1.4rem, 2.6vw, 1.85rem)", marginBottom: 12, lineHeight: 1.2 }}>
        {r.title} <span className="accent">{r.highlight}</span>
      </h3>
      <p style={{ color: "var(--warm-grey-dim)", fontSize: "1.05rem", lineHeight: 1.75, maxWidth: "46ch" }}>
        {r.desc}
      </p>
    </div>
  );

  return (
    <div
      className="rounded-2xl p-5 md:p-7 on-dark silver-rim"
      style={{ background: "var(--near-black-2)", border: "1px solid var(--hairline)" }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-center">
        {r.imageRight ? (
          <>
            {body}
            {media}
          </>
        ) : (
          <>
            {media}
            {body}
          </>
        )}
      </div>
    </div>
  );
}

export default function ProblemSection({ blatt }: { blatt?: string }) {
  return (
    <section className="py-10">
      <div className="mx-auto px-7 text-center" style={{ maxWidth: 1100 }}>
        <span
          className="mono inline-flex items-center gap-2 mb-4"
          style={{ fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--amber)" }}
        >
          <span style={{ opacity: 0.7 }}>§</span> {blatt ? `Blatt ${blatt} / Ausgangslage` : "Ausgangslage"}
        </span>
        <h2 className="mx-auto" style={{ fontSize: "clamp(1.8rem, 3.6vw, 2.6rem)", maxWidth: "24ch", marginBottom: 12 }}>
          Warum Unternehmen <span className="accent">bei uns landen</span>
        </h2>
        <p
          className="mx-auto"
          style={{ color: "var(--warm-grey-dim)", maxWidth: "52ch", fontSize: "1.02rem", lineHeight: 1.7, marginBottom: 30 }}
        >
          Zwei Dinge hören wir immer wieder. Erkennst du dich in einem davon
          wieder, weißt du, warum sich ein Gespräch lohnt.
        </p>

        <div className="flex flex-col gap-4">
          {rows.map((r) => (
            <Row key={r.num} r={r} />
          ))}
        </div>

        <div className="mt-6">
          <Link href="/problem" className="mono inline-flex items-center gap-1.5" style={{ fontSize: 12.5, color: "var(--warm-grey-faint)" }}>
            Mehr zur Ausgangslage
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width={12} height={12}>
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
