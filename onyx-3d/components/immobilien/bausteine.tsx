import type { CSSProperties, ReactNode } from "react";
import LeistungenAnfrage from "./LeistungenAnfrage";
import LeistungWaehlen from "./LeistungWaehlen";
import LazyVideo from "./LazyVideo";
import { LEISTUNGEN, type LeistungId } from "./leistungen";

/**
 * Bausteine der Zielgruppen-Seiten /immobilien/bautraeger und /makler.
 * Gleicher Stil, eigene Inhalte: Gründer, Ablauf, Angebot mit Formular und
 * Fragen sehen auf beiden Seiten gleich aus, sagen aber je etwas anderes.
 *
 * Ansprache „Sie“. Keine Preise, keine Zahlen, kein „ohne Besichtigung“,
 * KI-Bilder immer gekennzeichnet (CLAUDE.md, Kernbotschaft Immobilien).
 */

export const kickerStil: CSSProperties = {
  fontSize: 12,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "var(--amber)",
};

export function Kicker({ children }: { children: ReactNode }) {
  return (
    <span className="mono inline-flex items-center gap-2 mb-4" style={kickerStil}>
      <span style={{ opacity: 0.7 }}>§</span> {children}
    </span>
  );
}

export const etikettStil: CSSProperties = {
  fontSize: 10.5,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  padding: "5px 9px",
  borderRadius: 999,
  background: "rgba(17,17,17,.74)",
  color: "var(--warm-grey)",
  whiteSpace: "nowrap",
};

/** Kleines Schild auf einem Bild, z. B. „Foto von heute“. */
export function Etikett({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <span className="mono absolute" style={{ ...etikettStil, ...style }}>
      {children}
    </span>
  );
}

export function KiHinweis({ style }: { style?: CSSProperties }) {
  return (
    <Etikett style={{ top: 10, right: 10, color: "var(--amber)", border: "1px solid rgba(232,163,61,.6)", ...style }}>KI-Visualisierung</Etikett>
  );
}

/** Überblendung vorher → nachher (Klassen siehe WECHSEL_CSS). */
export const WECHSEL_CSS = `
.wechsel .nachher,.wechsel .nachher-label{animation:onyx-wechsel 6s ease-in-out infinite}
.wechsel .vorher-label{animation:onyx-wechsel-umgekehrt 6s ease-in-out infinite}
@keyframes onyx-wechsel{0%,35%{opacity:0}50%,85%{opacity:1}100%{opacity:0}}
@keyframes onyx-wechsel-umgekehrt{0%,35%{opacity:1}50%,85%{opacity:0}100%{opacity:1}}
@media (prefers-reduced-motion: reduce){.wechsel .nachher,.wechsel .nachher-label{animation:none;opacity:1}.wechsel .vorher-label{animation:none;opacity:0}}
`;

export function Wechselbild({ vorher, nachher, vorherAlt, nachherAlt, vorherText = "Foto von heute", seitenverhaeltnis = "3 / 4" }: { vorher: string; nachher: string; vorherAlt: string; nachherAlt: string; vorherText?: string; seitenverhaeltnis?: string }) {
  return (
    <div className="relative overflow-hidden rounded-xl wechsel" style={{ aspectRatio: seitenverhaeltnis, background: "#1b1b1b" }}>
      <img src={vorher} alt={vorherAlt} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
      <img src={nachher} alt={nachherAlt} className="absolute inset-0 w-full h-full object-cover nachher" loading="lazy" />
      <span className="vorher-label">
        <Etikett style={{ top: 10, left: 10 }}>{vorherText}</Etikett>
      </span>
      <span className="nachher-label">
        <KiHinweis />
      </span>
    </div>
  );
}

export function AnfrageKnopf({ text = "Erstes Objekt geschenkt – anfragen", href = "#anfrage-formular" }: { text?: string; href?: string }) {
  return (
    <a href={href} className="inline-flex items-center gap-2.5 rounded-[10px] px-6 py-4 font-semibold btn-amber" style={{ color: "#12141a" }}>
      {text} <span aria-hidden="true">→</span>
    </a>
  );
}

export function Haken({ punkte, style }: { punkte: string[]; style?: CSSProperties }) {
  return (
    <ul className="grid gap-2" style={{ color: "var(--warm-grey-dim)", fontSize: "0.95rem", ...style }}>
      {punkte.map((x) => (
        <li key={x} className="flex gap-2.5">
          <span aria-hidden="true" style={{ color: "var(--amber)" }}>✓</span>
          {x}
        </li>
      ))}
    </ul>
  );
}

/** Problemkarten mit Nummer: das, was die Zielgruppe beim Verkaufen bremst. */
export function Probleme({ punkte }: { punkte: { titel: string; text: string }[] }) {
  return (
    <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {punkte.map((p, i) => (
        <li key={p.titel} className="rounded-xl p-6" style={{ background: "var(--near-black-2)", border: "1px solid var(--hairline)" }}>
          <span className="mono block mb-3" style={{ fontSize: 12, letterSpacing: "0.1em", color: "var(--amber)" }}>
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 style={{ fontFamily: "var(--font-instrument-sans), sans-serif", fontWeight: 650, fontSize: "1.1rem", lineHeight: 1.35, marginBottom: 10 }}>{p.titel}</h3>
          <p style={{ color: "var(--warm-grey-dim)", fontSize: "0.96rem", lineHeight: 1.6 }}>{p.text}</p>
        </li>
      ))}
    </ol>
  );
}

/** Wer dahinter steht – wie FounderBlock der Startseite, in der Sie-Form. */
export function Gruender({ warum }: { warum: string }) {
  return (
    <section className="py-16">
      <div className="mx-auto px-7 grid gap-10 md:grid-cols-[300px_1fr] items-center" style={{ maxWidth: 980 }}>
        <div className="relative overflow-hidden rounded-2xl mx-auto md:mx-0 max-w-[220px] md:max-w-[300px]" style={{ width: "100%", aspectRatio: "4 / 5", border: "1px solid var(--hairline)" }}>
          <img src="/assets/marvin-portrait.jpg" alt="Marvin Weiß-Drumm, Gründer von ONYX" className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: "50% 12%" }} loading="lazy" />
        </div>
        <div className="text-left">
          <Kicker>Wer das für Sie macht</Kicker>
          <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", marginBottom: 14 }}>Kein Callcenter. Sie sprechen mit Marvin.</h2>
          <p style={{ color: "var(--warm-grey-dim)", lineHeight: 1.7, marginBottom: 12 }}>
            Ich bin Marvin Weiß-Drumm, Gründer von ONYX aus Landau in der Pfalz. Videos, Bilder und Website für Ihr Objekt baue ich selbst – vom ersten Telefonat bis zur fertigen Seite sprechen Sie mit mir, nicht mit einem Vertrieb, der Sie weiterreicht.
          </p>
          <p style={{ color: "var(--warm-grey-dim)", lineHeight: 1.7, marginBottom: 12 }}>{warum}</p>
          <p style={{ color: "var(--warm-grey-dim)", lineHeight: 1.7, marginBottom: 22 }}>
            Schreiben Sie mir, und ich rufe Sie persönlich an. Kein Verkaufsgespräch, kein Foliensatz – wir machen Ihr erstes Objekt fertig, und Sie entscheiden dann.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <AnfrageKnopf />
            <a href="tel:+4917632273522" style={{ color: "var(--warm-grey)", fontSize: 15 }}>
              Lieber direkt anrufen: <span style={{ color: "var(--amber)", textDecoration: "underline", textUnderlineOffset: 3 }}>0176 3227 3522</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Angebot links, Formular rechts. Das Formular schreibt in Netlify und ins CRM. */
export function Angebot({
  text,
  rolle,
  objektBeispiel,
  auswahl,
  linkFeld,
}: {
  text: string;
  rolle: "Bauträger / Bauunternehmen" | "Makler";
  objektBeispiel: string;
  auswahl: LeistungId[];
  linkFeld?: boolean;
}) {
  return (
    <section id="anfrage" className="py-16" style={{ background: "var(--near-black-2)", scrollMarginTop: 80 }}>
      <div className="mx-auto px-7 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]" style={{ maxWidth: 1180 }}>
        <div className="text-left lg:sticky lg:top-28 self-start">
          <Kicker>Ihr erstes Objekt</Kicker>
          <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", marginBottom: 16 }}>Ihr erstes Objekt ist geschenkt.</h2>
          <p style={{ color: "var(--warm-grey-dim)", lineHeight: 1.65, marginBottom: 18 }}>{text}</p>
          <Haken punkte={["Bezahlt wird pro Objekt – kein Abo", "Videos, Bilder und Website gehören Ihnen", "Werbekonto und Daten bleiben bei Ihnen"]} style={{ color: "var(--warm-grey)", fontSize: "0.98rem" }} />
        </div>
        <div id="anfrage-formular" className="rounded-2xl p-6 md:p-8" style={{ background: "var(--near-black)", border: "1px solid var(--hairline)", scrollMarginTop: 90 }}>
          <LeistungenAnfrage rolle={rolle} objektBeispiel={objektBeispiel} auswahl={auswahl} linkFeld={linkFeld} />
        </div>
      </div>
    </section>
  );
}

/** Fragen, die auf beiden Seiten gleich beantwortet werden. */
export const FRAGE = {
  haken: {
    f: "Wo ist der Haken beim geschenkten ersten Objekt?",
    a: "Es gibt keinen. Wir möchten, dass Sie an einem echten Objekt sehen, was wir können, bevor Sie etwas bezahlen. Gefällt es Ihnen, machen wir die nächsten Objekte zusammen – bezahlt pro Objekt, ohne Abo. Gefällt es Ihnen nicht, ist nichts weiter zu tun.",
  },
  kosten: {
    f: "Was kostet das?",
    a: "Bezahlt wird pro Objekt, ohne Abo. Den Preis nennen wir Ihnen im Gespräch, wenn wir wissen, was Sie brauchen. Ihr erstes Objekt ist geschenkt. Schalten Sie Anzeigen, zahlen Sie das Werbebudget direkt an Meta – aus Ihrem eigenen Werbekonto.",
  },
  gehoert: {
    f: "Wem gehört das danach?",
    a: "Ihnen. Videos, Bilder und Website können Sie überall nutzen – im Portal, auf Ihrer Website, auf Instagram. Läuft eine Anzeige, dann in Ihrem eigenen Werbekonto.",
  },
};

export function Fragen({ eintraege }: { eintraege: { f: string; a: string }[] }) {
  return (
    <section className="py-16">
      <div className="mx-auto px-7" style={{ maxWidth: 860 }}>
        <Kicker>Häufige Fragen</Kicker>
        <h2 style={{ fontSize: "clamp(1.5rem, 2.8vw, 2rem)", marginBottom: 24 }}>Kurz beantwortet</h2>
        <div className="grid gap-3">
          {eintraege.map((x) => (
            <details key={x.f} className="rounded-xl px-5 py-4" style={{ background: "var(--near-black-2)", border: "1px solid var(--hairline)" }}>
              <summary style={{ cursor: "pointer", fontWeight: 600, fontSize: "1.02rem" }}>{x.f}</summary>
              <p style={{ color: "var(--warm-grey-dim)", lineHeight: 1.6, marginTop: 10 }}>{x.a}</p>
            </details>
          ))}
        </div>
        <p style={{ fontSize: 12.5, color: "var(--warm-grey-faint)", lineHeight: 1.55, marginTop: 28 }}>
          Als KI-Visualisierung gekennzeichnete Bilder und Videos sind computergenerierte Darstellungen auf Basis echter Fotos und Pläne und zeigen einen möglichen, nicht den tatsächlichen Zustand.
        </p>
        <div className="mt-8">
          <AnfrageKnopf />
        </div>
      </div>
    </section>
  );
}

/**
 * Erster Bildschirm. Am Handy steht die Überschrift über dem Bild – die
 * Aussage aus der Anzeige soll sofort zu lesen sein –, Text und Knöpfe
 * darunter. Am Laptop Text links, Bild rechts.
 */
export const HELD_CSS = `
.held{display:grid;row-gap:22px;grid-template-areas:"kopf" "bild" "rest"}
.held-kopf{grid-area:kopf}.held-bild{grid-area:bild}.held-rest{grid-area:rest}
@media (min-width:1024px){
  .held{grid-template-columns:1.12fr 1fr;column-gap:44px;row-gap:0;grid-template-areas:"kopf bild" "rest bild";align-items:center}
  .held-kopf{align-self:end}.held-rest{align-self:start;padding-top:20px}
}
`;

export function Held({ kicker, titel, text, knoepfe, punkte, bild }: { kicker: string; titel: string; text: string; knoepfe: ReactNode; punkte: string[]; bild: ReactNode }) {
  return (
    <section className="pt-6 pb-14 md:pt-14 md:pb-20">
      <div className="mx-auto px-7 held" style={{ maxWidth: 1180 }}>
        <div className="held-kopf text-left">
          <Kicker>{kicker}</Kicker>
          <h1 style={{ fontSize: "clamp(1.9rem, 3.9vw, 3.05rem)", lineHeight: 1.06 }}>{titel}</h1>
        </div>
        <div className="held-bild">{bild}</div>
        <div className="held-rest text-left">
          <p style={{ fontSize: "1.1rem", lineHeight: 1.65, color: "var(--warm-grey-dim)", maxWidth: 560, marginBottom: 26 }}>{text}</p>
          <div className="flex flex-wrap gap-3">{knoepfe}</div>
          <Haken punkte={punkte} style={{ marginTop: 24 }} />
        </div>
      </div>
    </section>
  );
}

export function ZweiterKnopf({ href, children, neuerTab }: { href: string; children: ReactNode; neuerTab?: boolean }) {
  return (
    <a
      href={href}
      {...(neuerTab ? { target: "_blank", rel: "noopener" } : {})}
      className="inline-flex items-center gap-2.5 rounded-[10px] px-5 py-4 font-semibold btn-ghost"
      style={{ color: "var(--warm-grey)", border: "1px solid var(--hairline)" }}
    >
      {children}
    </a>
  );
}

export type KartenMedium =
  | { art: "video"; src: string; poster: string; label: string; ki: boolean; seitenverhaeltnis?: string }
  | { art: "bild"; src: string; alt: string; ki: boolean; oben?: boolean; seitenverhaeltnis?: string }
  | { art: "wechsel"; vorher: string; nachher: string; vorherAlt: string; nachherAlt: string; vorherText?: string; seitenverhaeltnis?: string };

export function KartenBild({ m }: { m: KartenMedium }) {
  const verhaeltnis = m.seitenverhaeltnis ?? "4 / 5";
  if (m.art === "wechsel") {
    return <Wechselbild vorher={m.vorher} nachher={m.nachher} vorherAlt={m.vorherAlt} nachherAlt={m.nachherAlt} vorherText={m.vorherText} seitenverhaeltnis={verhaeltnis} />;
  }
  return (
    <div className="relative overflow-hidden rounded-xl" style={{ aspectRatio: verhaeltnis, background: "#1b1b1b" }}>
      {m.art === "video" ? (
        <LazyVideo src={m.src} poster={m.poster} label={m.label} className="absolute inset-0 w-full h-full object-cover" />
      ) : (
        <img src={m.src} alt={m.alt} className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: m.oben ? "top" : "center" }} loading="lazy" />
      )}
      {m.ki && <KiHinweis />}
    </div>
  );
}

/** Eine Leistung als Karte: Bild, Titel, Text, „Das will ich“ (kreuzt sie im Formular an). */
export function LeistungsKarte({ id, titel, text, medium, beispiel }: { id: LeistungId; titel: string; text: string; medium: KartenMedium; beispiel?: { href: string; text: string } }) {
  const name = LEISTUNGEN.find((l) => l.id === id)?.name ?? titel;
  return (
    <article className="flex flex-col rounded-2xl p-4" style={{ background: "var(--near-black)", border: "1px solid var(--hairline)" }}>
      <KartenBild m={medium} />
      <div className="flex flex-col flex-1 px-1.5 pt-5 pb-1.5">
        <h3 style={{ fontSize: "1.15rem", marginBottom: 10 }}>{titel}</h3>
        <p style={{ color: "var(--warm-grey-dim)", fontSize: "0.97rem", lineHeight: 1.6, marginBottom: 18 }}>{text}</p>
        <div className="mt-auto flex flex-wrap items-center gap-4">
          <LeistungWaehlen id={id} name={name} />
          {beispiel && (
            <a href={beispiel.href} target="_blank" rel="noopener" style={{ fontSize: 14.5, color: "var(--amber)", textDecoration: "underline", textUnderlineOffset: 3 }}>
              {beispiel.text}
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

/**
 * „Überzeugen Sie sich selbst“: Der Kunde schickt sein Material, wir zeigen,
 * was daraus wird (Marvin, 28.11.2026). Bauträger schicken Pläne, Makler
 * Fotos, Exposé oder den Link zur Anzeige. Ersetzt den allgemeinen Ablauf.
 */
export function Beweis({ titel, text, reicht, schritte, knopf }: { titel: string; text: string; reicht: string[]; schritte: { titel: string; text: string }[]; knopf: string }) {
  return (
    <section id="beweis" className="py-16" style={{ scrollMarginTop: 80 }}>
      <div className="mx-auto px-7" style={{ maxWidth: 1180 }}>
        <div className="rounded-3xl p-7 md:p-12" style={{ border: "1px solid rgba(232,163,61,.5)", background: "linear-gradient(160deg, rgba(232,163,61,.10) 0%, rgba(232,163,61,.03) 45%, rgba(17,17,17,0) 100%)" }}>
          <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr] items-start">
            <div className="text-left">
              <Kicker>Überzeugen Sie sich selbst</Kicker>
              <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.3rem)", marginBottom: 16 }}>{titel}</h2>
              <p style={{ color: "var(--warm-grey-dim)", lineHeight: 1.65, marginBottom: 26, maxWidth: 560 }}>{text}</p>
              <AnfrageKnopf text={knopf} />
            </div>
            <div className="rounded-2xl p-6" style={{ background: "var(--near-black)", border: "1px solid var(--hairline)" }}>
              <span className="mono block mb-4" style={{ fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--amber)" }}>Das reicht uns</span>
              <Haken punkte={reicht} style={{ color: "var(--warm-grey)", fontSize: "0.98rem", gap: 12 }} />
            </div>
          </div>
          <ol className="grid gap-4 md:grid-cols-3 mt-10">
            {schritte.map((x, i) => (
              <li key={x.titel} className="flex gap-4">
                <span style={{ fontFamily: "var(--font-archivo, inherit)", fontWeight: 800, fontSize: "1.7rem", lineHeight: 1, color: "var(--amber)" }}>{i + 1}</span>
                <span>
                  <span style={{ display: "block", fontWeight: 650, fontSize: "1.02rem", marginBottom: 4 }}>{x.titel}</span>
                  <span style={{ color: "var(--warm-grey-dim)", fontSize: "0.94rem", lineHeight: 1.55 }}>{x.text}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
