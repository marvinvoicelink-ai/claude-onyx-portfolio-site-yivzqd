"use client";

import { openContactForm } from "@/lib/contactModal";

/**
 * `dark` markiert Logos, deren Vorlage fast schwarz ist (gemessen: PawPlace
 * rgb(25,23,23), raum in form #111111, HWP rgb(85,82,74)). Nur die werden
 * umgekehrt, damit sie auf dem dunklen Grund ueberhaupt zu sehen sind. Alle
 * anderen laufen in ihrer eigenen Farbe durch.
 */
type LogoItem = { name: string; src: string; dark?: boolean };

const logos: LogoItem[] = [
  { name: "HWP — Haushalt Wirtschaft Plan", src: "/logos/flat/hwp.png", dark: true },
  { name: "Rebstöckel", src: "/logos/flat/rebstoeckel.png" },
  { name: "PawPlace", src: "/logos/flat/pawplace.png", dark: true },
  { name: "Haas Wasserkraft", src: "/logos/flat/haas-wasserkraft.png" },
  { name: "SpeedFire Design", src: "/logos/flat/speedfire.png" },
  { name: "VoiceLink AI", src: "/logos/flat/voicelink.png" },
  { name: "MGA", src: "/logos/flat/mga.svg" },
  { name: "Mordor Intelligence", src: "/logos/flat/mordor-intelligence.svg" },
  { name: "Buena Vista Crew", src: "/logos/flat/buena-vista-crew.svg" },
  { name: "raum in form", src: "/logos/flat/raum-in-form.svg", dark: true },
];

/** Flat, monochrome client-logo strip — no card backgrounds, just logos and slash separators scrolling past. */
const REPEAT = 8;

export default function LogoMarquee() {
  const track = Array.from({ length: REPEAT }, () => logos).flat();
  return (
    <div className="marquee-border-glow on-dark" style={{ borderTop: "none", paddingTop: 8, paddingBottom: 28 }}>
      {/* Reihenfolge: unter der Headline steht der kurze Untertext (in
          HeroForeground). Hier kommt zuerst der CTA, dann der Logo-Slide als
          Beweis — und erst darunter der ausfuehrliche ONYX.AI-Text. Amber
          wird bewusst sparsam eingesetzt — nur der Button traegt die Farbe. */}
      <div className="mx-auto px-7 text-center" style={{ maxWidth: 860, marginBottom: 8 }}>
        <div className="mt-2">
          <a
            href="#kontakt"
            onClick={(e) => { e.preventDefault(); openContactForm("Hero-CTA"); }}
            className="inline-flex items-center gap-2.5 rounded-[10px] px-7 py-4 font-semibold btn-amber"
            style={{ background: "var(--amber)", color: "#12141a", fontSize: "15.5px" }}
          >
            Jetzt Kontakt aufnehmen
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width={16} height={16}>
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
        </div>

        <div className="mono mt-7" style={{ fontSize: 12.5, color: "var(--warm-grey-faint)" }}>
          DSGVO-konform · Gebaut in Deutschland · Für mittelständische Unternehmen
        </div>
      </div>

      {/* Logo-Slide unter dem CTA. */}
      <div className="mx-auto px-7 text-center" style={{ maxWidth: 1180, marginTop: 38, marginBottom: 20 }}>
        <span className="mono" style={{ fontSize: 11.5, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--warm-grey-faint)" }}>
          Unternehmen, die uns vertrauen
        </span>
      </div>
      <div className="overflow-hidden">
        <div className="marquee-track-8x flex items-center" style={{ width: "max-content" }}>
          {track.map((item, i) => (
            <div key={i} className="flex items-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.src}
                alt={item.name}
                className={item.dark ? "logo-flat logo-lift" : "logo-flat"}
                style={{
                  height: 26,
                  width: "auto",
                  maxWidth: 130,
                  objectFit: "contain",
                  margin: "0 26px",
                }}
              />
              <span className="mono" aria-hidden style={{ fontSize: 16, color: "var(--hairline)" }}>
                /
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Der ausfuehrliche ONYX.AI-Text jetzt unter den Logos: wer wir sind
          (Digitalisierungsagentur), was wir bauen und welchen Mehrwert. */}
      <div className="mx-auto px-7 text-center" style={{ maxWidth: 860, marginTop: 34 }}>
        <p style={{ fontSize: "clamp(1.02rem, 1.7vw, 1.22rem)", lineHeight: 1.65, color: "var(--warm-grey-dim)" }}>
          Wir sind Onyx.AI, eine Digitalisierungsagentur für maßgeschneiderte
          Systeme. Wir bauen Kundenportale, interne Tools und CRM- oder
          ERP-Lösungen und richten KI-Agenten und Automatisierungen ein, die
          dir wiederkehrende Arbeit abnehmen — genau auf deinen Ablauf
          zugeschnitten, statt dich in fertige Software zu zwängen. Wir
          integrieren, was schon läuft, und bauen neu, wo Standardsoftware
          nicht passt. Am Ende übergeben wir dir alles vollständig: Code und
          Daten gehören dir, kein Abo, kein Lock-in.
        </p>
      </div>
    </div>
  );
}
