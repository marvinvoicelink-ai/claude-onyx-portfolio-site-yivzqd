import type { Metadata } from "next";
import Footer from "@/components/Footer";
import LeistungenAnfrage from "@/components/immobilien/LeistungenAnfrage";
import LeistungWaehlen from "@/components/immobilien/LeistungWaehlen";
import LazyVideo from "@/components/immobilien/LazyVideo";
import AnfrageSticky from "@/components/immobilien/AnfrageSticky";
import { LEISTUNGEN, type Leistung } from "@/components/immobilien/leistungen";

/**
 * Landingpage für die Facebook-/Instagram-Anzeigen an Makler und Bauträger
 * (Marvin, 27.11.2026). Erzählt das Reel weiter, hat genau ein Ziel: die
 * Anfrage. Die Anfrage landet in Netlify und im CRM (LeistungenAnfrage).
 *
 * Ansprache „Sie“ wie die Anzeigen und /beispiele. Keine Preise, keine Zahlen,
 * kein „ohne Besichtigung“, KI-Bilder gekennzeichnet (CLAUDE.md).
 * Gebaut für Handy und Laptop: viele Makler schauen im Büro am Rechner.
 */

const TITEL = "Objekte fertig zeigen, bevor sie fertig sind – für Makler & Bauträger | ONYX Studio";
const BESCHREIBUNG =
  "3D-Rundgang, Zeitraffer, KI-Einrichtung, Rundflug-Video, Projektseite und Anzeigen: Wir zeigen Ihr Objekt vom Rohbau bis fertig eingerichtet. Sie wählen, was Sie brauchen. Ihr erstes Objekt ist geschenkt.";

export function immobilienMetadata(): Metadata {
  return {
    title: TITEL,
    description: BESCHREIBUNG,
    alternates: { canonical: "/immobilien" },
    openGraph: { title: TITEL, description: BESCHREIBUNG, images: ["/assets/immobilien/rundflug.jpg"], locale: "de_DE", type: "website" },
  };
}

const kicker = {
  fontSize: 12,
  letterSpacing: "0.12em",
  textTransform: "uppercase" as const,
  color: "var(--amber)",
};

function KiHinweis() {
  return (
    <span
      className="mono absolute"
      style={{ top: 10, right: 10, fontSize: 10.5, letterSpacing: "0.08em", textTransform: "uppercase", padding: "5px 9px", borderRadius: 999, background: "rgba(17,17,17,.72)", color: "var(--amber)", border: "1px solid rgba(232,163,61,.6)" }}
    >
      KI-Visualisierung
    </span>
  );
}

function Medium({ l }: { l: Leistung }) {
  const m = l.medium;
  const rahmen = { aspectRatio: "4 / 5", background: "#1b1b1b" };
  if (m.art === "vergleich") {
    return (
      <div className="relative overflow-hidden rounded-xl vergleich-wechsel" style={rahmen}>
        <img src={m.src} alt="Raum im Ausbau, echtes Foto" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
        <img src={m.nachher} alt="Derselbe Raum fertig eingerichtet, KI-Visualisierung" className="absolute inset-0 w-full h-full object-cover nachher" loading="lazy" />
        <span className="mono absolute vorher-label" style={{ top: 10, left: 10, fontSize: 10.5, letterSpacing: "0.08em", textTransform: "uppercase", padding: "5px 9px", borderRadius: 999, background: "rgba(17,17,17,.72)", color: "var(--warm-grey)" }}>
          Foto von heute
        </span>
        <span className="nachher-label">
          <KiHinweis />
        </span>
      </div>
    );
  }
  return (
    <div className="relative overflow-hidden rounded-xl" style={rahmen}>
      {m.art === "video" ? (
        <LazyVideo src={m.src} poster={m.poster} label={l.titel} className="absolute inset-0 w-full h-full object-cover" />
      ) : (
        <img src={m.src} alt={l.titel} className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: "top" }} loading="lazy" />
      )}
      {l.ki && <KiHinweis />}
    </div>
  );
}

const SCHRITTE = [
  { titel: "Fotos schicken", text: "Handy- oder Baustellenfotos, dazu Pläne und die Eckdaten. Per WhatsApp oder Mail reicht." },
  { titel: "Wir bauen", text: "Rundgang, Zeitraffer, eingerichtete Räume oder Projektseite – was Sie gewählt haben. Online geht nur, was Sie freigeben." },
  { titel: "Käufer fragen an", text: "Über die Website und die Anzeigen – Menschen, die durch Ihr Objekt gegangen sind und wissen, was sie erwartet." },
];

const FAQ = [
  { f: "Was brauchen Sie von mir?", a: "Fotos vom Objekt oder von der Baustelle – Handyfotos reichen –, bei Neubauten die Pläne, dazu Fläche, Zimmer, Lage und Preis. Den Rest machen wir." },
  { f: "Muss ich alles nehmen?", a: "Nein. Sie wählen, was Sie brauchen: nur einen Zeitraffer, nur eingerichtete Räume oder alles zusammen mit Website und Anzeigen." },
  { f: "Was kostet das?", a: "Bezahlt wird pro Objekt, ohne Abo. Den Preis nennen wir Ihnen im Gespräch, wenn wir wissen, was Sie brauchen. Ihr erstes Objekt ist geschenkt." },
  { f: "Sind die Bilder echt?", a: "Die Architektur ist echt, sie kommt aus Ihren Fotos und Plänen. Möbel, Einrichtung und fertige Bauabschnitte ergänzt die KI. Solche Bilder und Videos kennzeichnen wir immer als KI-Visualisierung." },
  { f: "Wem gehört das danach?", a: "Ihnen. Website, Videos und Bilder können Sie überall nutzen – im Portal, auf Ihrer Website, auf Instagram. Läuft eine Anzeige, dann in Ihrem eigenen Werbekonto." },
];

export default function ImmobilienPage() {
  return (
    <main>
      <style>{`
        .vergleich-wechsel .nachher{animation:onyx-wechsel 6s ease-in-out infinite}
        .vergleich-wechsel .nachher-label{animation:onyx-wechsel 6s ease-in-out infinite}
        .vergleich-wechsel .vorher-label{animation:onyx-wechsel-umgekehrt 6s ease-in-out infinite}
        @keyframes onyx-wechsel{0%,35%{opacity:0}50%,85%{opacity:1}100%{opacity:0}}
        @keyframes onyx-wechsel-umgekehrt{0%,35%{opacity:1}50%,85%{opacity:0}100%{opacity:1}}
        @media (prefers-reduced-motion: reduce){.vergleich-wechsel .nachher,.vergleich-wechsel .nachher-label{animation:none;opacity:1}.vergleich-wechsel .vorher-label{animation:none;opacity:0}}
      `}</style>

      {/* Hero */}
      <section className="pt-24 pb-16 md:pt-36 md:pb-20">
        <div className="mx-auto px-7 grid gap-10 lg:grid-cols-[1.05fr_1fr] items-center" style={{ maxWidth: 1180 }}>
          <div className="text-left">
            <span className="mono inline-flex items-center gap-2 mb-5" style={kicker}>
              <span style={{ opacity: 0.7 }}>§</span> Für Makler & Bauunternehmen
            </span>
            <h1 style={{ fontSize: "clamp(2rem, 4.6vw, 3.4rem)", lineHeight: 1.05, marginBottom: 20 }}>
              Wir zeigen Ihr Objekt fertig – bevor es fertig ist.
            </h1>
            <p style={{ fontSize: "1.12rem", lineHeight: 1.65, color: "var(--warm-grey-dim)", maxWidth: 560, marginBottom: 28 }}>
              3D-Rundgang, Zeitraffer, eingerichtete Räume und Anzeigen: Käufer sehen Ihren Rohbau oder Ihr leeres Objekt so, wie es fertig aussieht – und fragen an, weil sie schon wissen, was sie erwartet. Sie wählen, was Sie brauchen.
            </p>
            <div className="flex flex-wrap gap-3.5">
              <a href="#anfrage" className="inline-flex items-center gap-2.5 rounded-[10px] px-6 py-4 font-semibold btn-amber" style={{ color: "#12141a" }}>
                Erstes Objekt geschenkt – anfragen <span aria-hidden="true">→</span>
              </a>
              <a href="#leistungen" className="inline-flex items-center gap-2.5 rounded-[10px] px-6 py-4 font-semibold btn-ghost" style={{ color: "var(--warm-grey)", border: "1px solid var(--hairline)" }}>
                Leistungen ansehen
              </a>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-2xl order-first lg:order-none" style={{ aspectRatio: "16 / 9", background: "#1b1b1b", border: "1px solid var(--hairline)" }}>
            <video
              src="/beispiele/projekt/media/hero.mp4"
              poster="/beispiele/projekt/img/hero-poster.webp"
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
              aria-label="Zeitraffer vom leeren Grundstück bis zur fertigen Villa"
            />
            <KiHinweis />
            <span className="mono absolute" style={{ left: 12, bottom: 12, fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", padding: "6px 10px", borderRadius: 999, background: "rgba(17,17,17,.72)", color: "var(--warm-grey)" }}>
              Vom Grundstück bis fertig
            </span>
          </div>
        </div>
      </section>

      {/* Leistungen */}
      <section id="leistungen" className="py-16" style={{ background: "var(--near-black-2)" }}>
        <div className="mx-auto px-7" style={{ maxWidth: 1180 }}>
          <span className="mono inline-flex items-center gap-2 mb-4" style={kicker}>
            <span style={{ opacity: 0.7 }}>§</span> Was wir für Sie machen
          </span>
          <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", marginBottom: 10 }}>Sie wählen, was Ihr Objekt braucht.</h2>
          <p style={{ color: "var(--warm-grey-dim)", maxWidth: 640, lineHeight: 1.6, marginBottom: 36 }}>
            Einzeln oder zusammen – jede Leistung gibt es schon als echtes Beispiel.
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {LEISTUNGEN.map((l) => (
              <article key={l.id} className="flex flex-col rounded-2xl p-4" style={{ background: "var(--near-black)", border: "1px solid var(--hairline)" }}>
                <Medium l={l} />
                <div className="flex flex-col flex-1 px-1.5 pt-5 pb-1.5">
                  <span className="mono mb-2" style={{ fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--warm-grey-faint)" }}>{l.fuer}</span>
                  <h3 style={{ fontSize: "1.2rem", marginBottom: 10 }}>{l.titel}</h3>
                  <p style={{ color: "var(--warm-grey-dim)", fontSize: "0.97rem", lineHeight: 1.6, marginBottom: 18 }}>{l.text}</p>
                  <div className="mt-auto flex flex-wrap items-center gap-4">
                    <LeistungWaehlen id={l.id} name={l.name} />
                    {l.beispiel && (
                      <a href={l.beispiel.href} target="_blank" rel="noopener" style={{ fontSize: 14.5, color: "var(--amber)", textDecoration: "underline", textUnderlineOffset: 3 }}>
                        {l.beispiel.text}
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* So läuft es */}
      <section className="py-16">
        <div className="mx-auto px-7" style={{ maxWidth: 1180 }}>
          <span className="mono inline-flex items-center gap-2 mb-4" style={kicker}>
            <span style={{ opacity: 0.7 }}>§</span> So läuft es ab
          </span>
          <h2 style={{ fontSize: "clamp(1.5rem, 2.8vw, 2rem)", marginBottom: 32 }}>Drei Schritte. Sie machen nur den ersten.</h2>
          <ol className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {SCHRITTE.map((s, i) => (
              <li key={s.titel} className="rounded-xl p-6" style={{ background: "var(--near-black-2)", border: "1px solid var(--hairline)" }}>
                <div style={{ fontFamily: "var(--font-archivo, inherit)", fontWeight: 800, fontSize: "2rem", lineHeight: 1, color: "var(--amber)", marginBottom: 12 }}>{i + 1}</div>
                <h3 style={{ fontSize: "1.1rem", marginBottom: 8 }}>{s.titel}</h3>
                <p style={{ color: "var(--warm-grey-dim)", fontSize: "0.95rem", lineHeight: 1.6 }}>{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Angebot + Formular */}
      <section id="anfrage" className="py-16" style={{ background: "var(--near-black-2)", scrollMarginTop: 80 }}>
        <div className="mx-auto px-7 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]" style={{ maxWidth: 1180 }}>
          <div className="text-left lg:sticky lg:top-28 self-start">
            <span className="mono inline-flex items-center gap-2 mb-4" style={kicker}>
              <span style={{ opacity: 0.7 }}>§</span> Ihr erstes Objekt
            </span>
            <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", marginBottom: 16 }}>Ihr erstes Objekt ist geschenkt.</h2>
            <p style={{ color: "var(--warm-grey-dim)", lineHeight: 1.65, marginBottom: 18 }}>
              Sagen Sie uns, welches Objekt oder Projekt Sie gerade verkaufen und was Sie davon brauchen. Marvin ruft Sie an, schaut sich mit Ihnen die Unterlagen an und Sie sehen das Ergebnis, bevor irgendetwas online geht.
            </p>
            <ul className="grid gap-2.5" style={{ color: "var(--warm-grey)", fontSize: "0.98rem" }}>
              {["Bezahlt wird pro Objekt – kein Abo", "Website, Videos und Bilder gehören Ihnen", "Werbekonto und Daten bleiben bei Ihnen"].map((x) => (
                <li key={x} className="flex gap-3">
                  <span aria-hidden="true" style={{ color: "var(--amber)" }}>✓</span>
                  {x}
                </li>
              ))}
            </ul>
          </div>
          <div id="anfrage-formular" className="rounded-2xl p-6 md:p-8" style={{ background: "var(--near-black)", border: "1px solid var(--hairline)", scrollMarginTop: 90 }}>
            <LeistungenAnfrage />
          </div>
        </div>
      </section>

      {/* Fragen */}
      <section className="py-16">
        <div className="mx-auto px-7" style={{ maxWidth: 860 }}>
          <span className="mono inline-flex items-center gap-2 mb-4" style={kicker}>
            <span style={{ opacity: 0.7 }}>§</span> Häufige Fragen
          </span>
          <h2 style={{ fontSize: "clamp(1.5rem, 2.8vw, 2rem)", marginBottom: 24 }}>Kurz beantwortet</h2>
          <div className="grid gap-3">
            {FAQ.map((x) => (
              <details key={x.f} className="rounded-xl px-5 py-4" style={{ background: "var(--near-black-2)", border: "1px solid var(--hairline)" }}>
                <summary style={{ cursor: "pointer", fontWeight: 600, fontSize: "1.02rem" }}>{x.f}</summary>
                <p style={{ color: "var(--warm-grey-dim)", lineHeight: 1.6, marginTop: 10 }}>{x.a}</p>
              </details>
            ))}
          </div>
          <p style={{ fontSize: 12.5, color: "var(--warm-grey-faint)", lineHeight: 1.55, marginTop: 28 }}>
            Als KI-Visualisierung gekennzeichnete Bilder und Videos sind computergenerierte Darstellungen auf Basis echter Fotos und zeigen einen möglichen, nicht den tatsächlichen Zustand.
          </p>
          <div className="mt-8">
            <a href="#anfrage" className="inline-flex items-center gap-2.5 rounded-[10px] px-6 py-4 font-semibold btn-amber" style={{ color: "#12141a" }}>
              Erstes Objekt geschenkt – anfragen <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>

      <Footer lang="de" />
      <AnfrageSticky />
    </main>
  );
}
