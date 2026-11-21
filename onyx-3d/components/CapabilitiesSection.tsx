/**
 * Drei Saeulen, was ein eigenes System / Automationen / KI-Agenten fuer den
 * Betrieb tun: uebernehmen, beschleunigen, befaehigen. Jede Saeule hat einen
 * Versal-Titel (Integral), eine Amber-Unterzeile, kurze Beschreibung, drei
 * Haken und rechts ein kleines Mock-UI, das die Aussage zeigt statt sie nur zu
 * behaupten. Aufbau inspiriert von skalieren.com, in Onyx-Farben (Amber statt
 * Blau) und mit eigenem, belegbarem Content.
 */

function Check() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="var(--amber)" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" width={16} height={16} style={{ flexShrink: 0, marginTop: 2 }}>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

/* ---- Mock 1: Aufgaben-Board, laeuft autonom ---- */
function BoardMock() {
  const col = (head: string, items: { t: string; done?: boolean }[]) => (
    <div className="flex-1 min-w-0">
      <div className="mono" style={{ fontSize: 10.5, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--warm-grey-faint)", marginBottom: 8 }}>{head}</div>
      <div className="flex flex-col gap-2">
        {items.map((it) => (
          <div key={it.t} className="rounded-lg px-2.5 py-2 flex items-center gap-2" style={{ background: "var(--near-black)", border: `1px solid ${it.done ? "rgba(232,163,61,0.4)" : "var(--hairline)"}` }}>
            {it.done && <Check />}
            <span style={{ fontSize: 12, color: it.done ? "var(--warm-grey)" : "var(--warm-grey-dim)", lineHeight: 1.2 }}>{it.t}</span>
          </div>
        ))}
      </div>
    </div>
  );
  return (
    <div className="rounded-2xl p-4 sm:p-5" style={{ background: "var(--near-black-2)", border: "1px solid var(--hairline)" }}>
      <div className="flex items-center justify-between mb-4">
        <span className="mono" style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase" }}>Aufgaben</span>
        <span className="mono inline-flex items-center gap-1.5" style={{ fontSize: 10.5, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--amber)" }}>
          <span className="inline-block rounded-full" style={{ width: 6, height: 6, background: "var(--amber)", boxShadow: "0 0 8px 1px rgba(232,163,61,0.6)" }} />
          läuft autonom
        </span>
      </div>
      <div className="flex gap-3">
        {col("Eingang", [{ t: "Support-Frage" }, { t: "Angebot #4021" }])}
        {col("Läuft", [{ t: "Rechnung" }])}
        {col("Erledigt", [{ t: "Termin gelegt", done: true }, { t: "Lead getaggt", done: true }])}
      </div>
    </div>
  );
}

/* ---- Mock 2: Tempo-Vergleich von Hand vs. mit System ---- */
function SpeedMock() {
  const row = (label: string, value: string, pct: number, amber?: boolean) => (
    <div className="flex items-center gap-3">
      <span style={{ fontSize: 12, color: "var(--warm-grey-dim)", width: 78, flexShrink: 0 }}>{label}</span>
      <div className="flex-1 rounded-full overflow-hidden" style={{ height: 8, background: "var(--near-black)" }}>
        <div style={{ width: `${pct}%`, height: "100%", background: amber ? "var(--amber)" : "var(--hairline-strong, #3a3a3a)", borderRadius: 999 }} />
      </div>
      <span className="mono" style={{ fontSize: 12, fontWeight: 700, color: amber ? "var(--amber)" : "var(--warm-grey-dim)", width: 78, textAlign: "right", flexShrink: 0 }}>{value}</span>
    </div>
  );
  return (
    <div className="rounded-2xl p-4 sm:p-5" style={{ background: "var(--near-black-2)", border: "1px solid var(--hairline)" }}>
      <div className="flex items-center justify-between mb-4">
        <span className="mono" style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase" }}>Angebotserstellung</span>
        <span className="mono" style={{ fontSize: 11.5, fontWeight: 700, color: "var(--amber)" }}>40× schneller</span>
      </div>
      <div className="flex flex-col gap-3.5">
        {row("Von Hand", "1 Tag", 100)}
        {row("Mit System", "2 Min.", 12, true)}
      </div>
    </div>
  );
}

/* ---- Mock 3: Live-Dashboard, das vorher einen Analysten gebraucht haette ---- */
function DashboardMock() {
  const tiles = [
    { v: "12", l: "Offene Angebote" },
    { v: "3", l: "Neue Anfragen" },
  ];
  const bars = [42, 68, 55, 83, 71, 96];
  return (
    <div className="rounded-2xl p-4 sm:p-5" style={{ background: "var(--near-black-2)", border: "1px solid var(--hairline)" }}>
      <div className="flex items-center justify-between mb-4">
        <span className="mono" style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase" }}>Auswertung</span>
        <span className="mono" style={{ fontSize: 11.5, fontWeight: 700, color: "var(--amber)" }}>live</span>
      </div>
      <div className="grid grid-cols-2 gap-3 mb-4">
        {tiles.map((t) => (
          <div key={t.l} className="rounded-xl px-3 py-3" style={{ background: "var(--near-black)", border: "1px solid var(--hairline)" }}>
            <div className="display" style={{ fontWeight: 700, fontSize: "1.5rem", color: "var(--warm-grey)", lineHeight: 1 }}>{t.v}</div>
            <div style={{ fontSize: 11.5, color: "var(--warm-grey-dim)", marginTop: 4 }}>{t.l}</div>
          </div>
        ))}
      </div>
      <div className="flex items-end gap-1.5" style={{ height: 56 }}>
        {bars.map((h, i) => (
          <div key={i} className="flex-1 rounded-t" style={{ height: `${h}%`, background: i === bars.length - 1 ? "var(--amber)" : "var(--hairline)" }} />
        ))}
      </div>
    </div>
  );
}

type Pillar = {
  kw: string;
  sub: string;
  desc: string;
  bullets: string[];
  mock: React.ReactNode;
};

const pillars: Pillar[] = [
  {
    kw: "Übernehmen",
    sub: "Die Arbeit wird erledigt, als hättest du jemanden eingestellt.",
    desc: "Aufgaben, die jeden Tag anfallen und keine Entscheidung brauchen — nur Zuverlässigkeit. Die laufen ab jetzt ohne dich.",
    bullets: [
      "Support-Anfragen, die zum zehnten Mal dieselben sind",
      "Angebote schreiben und rausschicken",
      "Rechnungen erstellen, Mahnungen nachfassen",
      "Termine koordinieren, Leads einsortieren",
    ],
    mock: <BoardMock />,
  },
  {
    kw: "Beschleunigen",
    sub: "Dieselbe Arbeit, in einem Bruchteil der Zeit.",
    desc: "Dinge, die ein Mensch auch könnte — nur nicht in dem Tempo und nicht in der Menge.",
    bullets: [
      "Angebote in Minuten statt Stunden",
      "Datenabgleich, der von Hand Tage kostet",
      "Reporting, das über Nacht fertig wird",
    ],
    mock: <SpeedMock />,
  },
  {
    kw: "Befähigen",
    sub: "Arbeit, die vorher schlicht nicht drin war.",
    desc: "Zu teuer, zu aufwendig, oder die Kompetenz war nicht im Haus. Mit dem System jetzt schon.",
    bullets: [
      "Auswertungen, für die du einen Analysten gebraucht hättest",
      "Jeder Kunde mit persönlicher Ansprache statt Massenmail",
      "Ein System, das alles verbindet, statt fünf Tools",
    ],
    mock: <DashboardMock />,
  },
];

export default function CapabilitiesSection({ blatt }: { blatt?: string }) {
  return (
    <section className="py-10">
      <div className="mx-auto px-7" style={{ maxWidth: 1100 }}>
        <div className="text-center">
          <span
            className="mono inline-flex items-center gap-2 mb-4"
            style={{ fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--amber)" }}
          >
            <span style={{ opacity: 0.7 }}>§</span> {blatt ? `Blatt ${blatt} / Was dein System tut` : "Was dein System tut"}
          </span>
          <h2 className="mx-auto" style={{ fontSize: "clamp(1.8rem, 3.6vw, 2.6rem)", maxWidth: "20ch", marginBottom: 12 }}>
            Ein System, das <span className="accent">mitarbeitet</span>
          </h2>
          <p className="mx-auto" style={{ color: "var(--warm-grey-dim)", maxWidth: "50ch", fontSize: "1.02rem", lineHeight: 1.7, marginBottom: 34 }}>
            Übernehmen, beschleunigen, befähigen — drei Dinge, die ein eigenes
            System, Automationen und KI-Agenten für deinen Betrieb erledigen.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {pillars.map((p) => (
            <div
              key={p.kw}
              className="rounded-2xl p-6 md:p-8 on-dark beam-border"
              style={{ background: "var(--near-black-2)", border: "1px solid var(--hairline)" }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 lg:gap-12 items-center">
                <div className="text-left">
                  <h3 className="display" style={{ fontSize: "clamp(1.5rem, 3vw, 2.1rem)", lineHeight: 1.05, marginBottom: 10 }}>
                    {p.kw}
                  </h3>
                  <p className="accent" style={{ fontSize: "clamp(1.05rem, 2vw, 1.25rem)", fontWeight: 600, lineHeight: 1.35, marginBottom: 14 }}>
                    {p.sub}
                  </p>
                  <p style={{ color: "var(--warm-grey-dim)", fontSize: "1rem", lineHeight: 1.7, marginBottom: 18, maxWidth: "46ch" }}>
                    {p.desc}
                  </p>
                  <ul className="flex flex-col gap-2.5" style={{ borderTop: "1px solid var(--hairline)", paddingTop: 16 }}>
                    {p.bullets.map((b) => (
                      <li key={b} className="flex gap-2.5" style={{ fontSize: "0.98rem", color: "var(--warm-grey-dim)", lineHeight: 1.5 }}>
                        <Check />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>{p.mock}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
