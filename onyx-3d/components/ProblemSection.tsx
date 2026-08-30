import Link from "next/link";

/**
 * Ausgangslage, bewusst auf zwei Themen verdichtet, statt fuenf Einzelprobleme
 * auszubuchstabieren: (1) die Systeme passen nicht zusammen — dafuer bauen wir
 * eigene (CRM, ERP, Portale), (2) zu viel laeuft per Hand — dafuer setzen wir
 * Automationen und KI-Agenten ein. Der Leser soll bei jedem Block nicken
 * ("stimmt, das kenne ich"), ohne sich durch eine Detailliste zu lesen.
 */
type ProblemCard = {
  num: string;
  title: string;
  highlight: string;
  desc: string;
  icon: React.ReactNode;
};

const cards: ProblemCard[] = [
  {
    num: "01",
    title: "Deine Systeme",
    highlight: "passen nicht zusammen.",
    desc: "Mehrere Tools, die nichts voneinander wissen, Funktionen, die fehlen, und Daten, die beim Anbieter liegen statt bei dir. Wir bauen dir stattdessen ein eigenes System — CRM, ERP, Portal —, das zu deinem Ablauf passt und dir vollständig gehört.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" width={22} height={22}>
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Zu viel läuft",
    highlight: "noch per Hand.",
    desc: "Angebote, Rechnungen, Datenpflege, Nachfassen — jeden Tag dieselben Handgriffe. Wir setzen Automationen und KI-Agenten ein, die diese wiederkehrende Arbeit übernehmen, direkt in deinem Betrieb.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" width={22} height={22}>
        <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />
      </svg>
    ),
  },
];

export default function ProblemSection({ blatt }: { blatt?: string }) {
  return (
    <section className="py-10">
      <div className="mx-auto px-7 text-center" style={{ maxWidth: 1000 }}>
        <span
          className="mono inline-flex items-center gap-2 mb-4"
          style={{ fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--amber)" }}
        >
          <span style={{ opacity: 0.7 }}>§</span> {blatt ? `Blatt ${blatt} / Ausgangslage` : "Ausgangslage"}
        </span>
        <h2 className="mx-auto" style={{ fontSize: "clamp(1.8rem, 3.6vw, 2.6rem)", maxWidth: "24ch", marginBottom: 12 }}>
          Warum Unternehmen bei uns landen.
        </h2>
        <p
          className="mx-auto"
          style={{ color: "var(--warm-grey-dim)", maxWidth: "52ch", fontSize: "1.02rem", lineHeight: 1.7, marginBottom: 30 }}
        >
          Zwei Dinge hören wir immer wieder. Erkennst du dich in einem davon
          wieder, weißt du, warum sich ein Gespräch lohnt.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cards.map((c) => (
            <div
              key={c.num}
              className="rounded-2xl p-6 md:p-7 on-dark silver-rim text-left"
              style={{ background: "var(--near-black-2)", border: "1px solid var(--hairline)" }}
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className="flex items-center justify-center rounded-xl"
                  style={{
                    width: 44,
                    height: 44,
                    background: "var(--amber-soft)",
                    color: "var(--amber)",
                    border: "1px solid rgba(232, 163, 61,0.3)",
                  }}
                >
                  {c.icon}
                </div>
                <span className="mono" style={{ fontSize: 34, fontWeight: 800, color: "var(--warm-grey-faint)" }}>
                  {c.num}
                </span>
              </div>
              <h3 style={{ fontSize: "1.35rem", marginBottom: 10, lineHeight: 1.25 }}>
                {c.title} <span className="accent">{c.highlight}</span>
              </h3>
              <p style={{ color: "var(--warm-grey-dim)", fontSize: "1.02rem", lineHeight: 1.7 }}>
                {c.desc}
              </p>
            </div>
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
