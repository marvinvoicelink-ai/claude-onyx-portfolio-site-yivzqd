import type { Metadata } from "next";
import type { ReactNode } from "react";
import Footer from "@/components/Footer";
import AnfrageSticky from "@/components/immobilien/AnfrageSticky";
import LazyVideo from "@/components/immobilien/LazyVideo";
import LeistungWaehlen from "@/components/immobilien/LeistungWaehlen";
import { LEISTUNGEN, type LeistungId } from "@/components/immobilien/leistungen";
import {
  Angebot,
  AnfrageKnopf,
  Etikett,
  FRAGE,
  Fragen,
  Gruender,
  HELD_CSS,
  Haken,
  Held,
  KiHinweis,
  Kicker,
  Probleme,
  Schritte,
  WECHSEL_CSS,
  Wechselbild,
  ZweiterKnopf,
} from "@/components/immobilien/bausteine";

/**
 * Landingpage für Immobilienmakler (Anzeigen an Makler).
 * Marvin, 28.11.2026: Makler wollen teurere Objekte so gut wie möglich
 * darstellen und eine eigene Internetseite pro Objekt, die sie Interessenten
 * weiterschicken. Mehr als Exposé und Idealista: Objektvideos wie ein
 * Drohnenflug – aus Bildern, ohne dass jemand vorbeikommt und filmt –, und
 * leere Räume richten wir mit KI ein.
 *
 * Material nur aus ONYX-Beispielen (Finca-Demo und Beispielprojekt).
 */

const TITEL = "Objektvideo wie mit der Drohne – aus Ihren Fotos | ONYX Studio für Makler";
const BESCHREIBUNG =
  "Für Immobilienmakler: ein Objektvideo wie mit der Drohne, erstellt aus Ihren Fotos – ohne Drehtermin. Leere Räume mit KI eingerichtet und eine eigene Website pro Objekt, die Sie jedem Interessenten schicken. Ihr erstes Objekt ist geschenkt.";

export const maklerMetadata: Metadata = {
  title: TITEL,
  description: BESCHREIBUNG,
  alternates: { canonical: "/immobilien/makler" },
  openGraph: { title: TITEL, description: BESCHREIBUNG, images: ["/assets/immobilien/drohnenflug.jpg"], locale: "de_DE", type: "website" },
};

const PROBLEME = [
  { titel: "Im Portal sieht Ihr Objekt aus wie jedes andere.", text: "Gleiches Raster, gleiche Fotos, daneben die Konkurrenz. Was ein hochwertiges Objekt besonders macht, geht zwischen hundert Inseraten unter." },
  { titel: "Ein gutes Objektvideo ist aufwendig.", text: "Termin vor Ort, Fotograf, Drohne mit Genehmigung, Schnitt – das lohnt sich selten für ein einzelnes Objekt. Also gibt es meistens keins." },
  { titel: "Leere Räume verkaufen sich schlecht.", text: "Ohne Möbel wirken sie kalt und kleiner, als sie sind. Klassisches Home-Staging kostet Zeit und Geld." },
  { titel: "Das PDF-Exposé liest am Handy niemand.", text: "Es wird geschickt, heruntergeladen und vergessen. Am Handy zoomt sich keiner durch zwölf Seiten." },
  { titel: "Besichtigungen, die nach fünf Minuten vorbei sind.", text: "Termin, Anfahrt, Aufschließen – und dann merkt der Interessent: passt nicht." },
  { titel: "Eigentümer vergleichen, wie Makler präsentieren.", text: "Wer ein hochwertiges Objekt verkauft, gibt es dem Makler, der es am besten zeigt." },
];

const VERGLEICH = [
  { was: "Am Handy", ueblich: "PDF, zum Lesen zoomen", ihr: "gebaut fürs Handy" },
  { was: "Außen", ueblich: "ein paar Fotos vom Garten", ihr: "Video wie mit der Drohne" },
  { was: "Innen", ueblich: "einzelne Fotos", ihr: "Rundgang Raum für Raum" },
  { was: "Leere Räume", ueblich: "bleiben leer", ihr: "fertig eingerichtet (KI-Visualisierung)" },
  { was: "Weitergeben", ueblich: "Anhang per Mail", ihr: "ein Link, z. B. per WhatsApp" },
  { was: "Aus der Anzeige", ueblich: "Klick landet im Portal", ihr: "Klick landet auf Ihrem Objekt" },
];

const LINK_EINSATZ = [
  { wohin: "An Interessenten", wie: "per WhatsApp oder Mail – statt PDF-Anhang" },
  { wohin: "Ins Inserat", wie: "auf Idealista oder ImmoScout24 verlinkt" },
  { wohin: "In Anzeigen", wie: "auf Facebook und Instagram, bei Menschen, die gerade suchen" },
  { wohin: "Zum Eigentümer", wie: "im Akquisegespräch zeigen, wie Sie vermarkten" },
  { wohin: "Diskret", wie: "nur an vorgemerkte Kunden, ohne Portal" },
];

function name(id: LeistungId) {
  return LEISTUNGEN.find((l) => l.id === id)?.name ?? id;
}

/**
 * Rahmen fürs Video (der Drohnenflug ist hochkant gedreht). Am Handy flacher,
 * damit Text und Knopf nah am Anfang bleiben; am Laptop hochkant.
 */
const HOCH_CSS = `
.hoch-held{aspect-ratio:1/1}.hoch-flug{aspect-ratio:4/5}
@media (min-width:1024px){.hoch-held{aspect-ratio:4/5}.hoch-flug{aspect-ratio:9/14}}
`;

function Hochkant({ children, klasse }: { children: ReactNode; klasse: "hoch-held" | "hoch-flug" }) {
  return (
    <div className={`relative overflow-hidden rounded-2xl ${klasse}`} style={{ background: "#141414", border: "1px solid var(--hairline)" }}>
      {children}
    </div>
  );
}

/** So kommt der Link beim Interessenten an: eine Chat-Nachricht mit Vorschau (Beispiel). */
function LinkNachricht() {
  return (
    <div className="relative mx-auto" style={{ width: "100%", maxWidth: 340 }}>
      <div className="rounded-[28px] p-3" style={{ background: "#0c0c0c", border: "6px solid #262626", boxShadow: "0 24px 60px rgba(0,0,0,.55)" }}>
        <div className="flex items-center gap-2.5 px-2 pb-3" style={{ borderBottom: "1px solid #222" }}>
          <span className="inline-flex items-center justify-center rounded-full mono" style={{ width: 30, height: 30, background: "#2a2a2a", fontSize: 11, color: "var(--warm-grey-dim)" }}>
            FB
          </span>
          <span style={{ fontSize: 13.5, fontWeight: 600 }}>Familie B. · Interessent</span>
        </div>
        <div className="grid gap-2.5 pt-3.5 pb-1">
          <div className="ml-auto rounded-2xl rounded-br-md p-1.5" style={{ maxWidth: "88%", background: "#3a2c14" }}>
            <div className="overflow-hidden rounded-xl" style={{ background: "#1d1a14" }}>
              <div className="relative" style={{ aspectRatio: "16 / 10" }}>
                <img src="/assets/immobilien/link-vorschau.jpg" alt="Vorschau der Objekt-Website: Natursteinvilla, echtes Foto" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="px-3 py-2.5">
                <div style={{ fontSize: 13.5, fontWeight: 600, lineHeight: 1.3 }}>Natursteinvilla mit Pool</div>
                <div style={{ fontSize: 12, color: "var(--warm-grey-dim)", lineHeight: 1.4, marginTop: 2 }}>Rundgang durch alle Räume · Video · Grundriss · Lage</div>
                <div className="mono" style={{ fontSize: 10.5, color: "var(--warm-grey-faint)", marginTop: 5 }}>villa.ihr-maklerbuero.de</div>
              </div>
            </div>
            <p style={{ fontSize: 13.5, lineHeight: 1.45, padding: "8px 6px 2px" }}>Wie besprochen – hier können Sie in Ruhe durch alle Räume gehen.</p>
            <div className="text-right mono" style={{ fontSize: 10, color: "var(--warm-grey-faint)", padding: "0 6px 2px" }}>18:42 ✓✓</div>
          </div>
          <div className="mr-auto rounded-2xl rounded-bl-md px-3 py-2" style={{ maxWidth: "82%", background: "#222" }}>
            <p style={{ fontSize: 13.5, lineHeight: 1.45 }}>Danke, schon angeschaut! Passt Samstag für eine Besichtigung?</p>
            <div className="text-right mono" style={{ fontSize: 10, color: "var(--warm-grey-faint)", marginTop: 2 }}>21:15</div>
          </div>
        </div>
      </div>
      <Etikett style={{ top: -12, left: 12, color: "var(--warm-grey-dim)", border: "1px solid var(--hairline)" }}>Beispiel</Etikett>
    </div>
  );
}

/** Eine der drei Leistungen als große Zeile: Bild auf der einen, Text auf der anderen Seite. */
function Werkzeug({ nr, id, titel, text, punkte, bild, rechts, extra }: { nr: string; id: LeistungId; titel: string; text: string; punkte: string[]; bild: ReactNode; rechts?: boolean; extra?: ReactNode }) {
  return (
    <div className="grid gap-8 lg:gap-14 lg:grid-cols-2 items-center">
      <div className={rechts ? "lg:order-2" : undefined}>{bild}</div>
      <div className="text-left">
        <span className="mono block mb-3" style={{ fontSize: 12, letterSpacing: "0.1em", color: "var(--amber)" }}>{nr}</span>
        <h3 style={{ fontSize: "clamp(1.35rem, 2.4vw, 1.75rem)", marginBottom: 14 }}>{titel}</h3>
        <p style={{ color: "var(--warm-grey-dim)", lineHeight: 1.65, marginBottom: 18, maxWidth: 520 }}>{text}</p>
        <Haken punkte={punkte} style={{ color: "var(--warm-grey)", marginBottom: 24 }} />
        <div className="flex flex-wrap items-center gap-4">
          <LeistungWaehlen id={id} name={name(id)} />
          {extra}
        </div>
      </div>
    </div>
  );
}

export default function MaklerPage() {
  return (
    <main>
      <style>{HELD_CSS + WECHSEL_CSS + HOCH_CSS}</style>

      <Held
        kicker="Für Immobilienmakler"
        titel="Ein Objektvideo wie mit der Drohne – aus Ihren Fotos."
        text="Kein Drehtermin, niemand muss vorbeikommen. Leere Räume richten wir mit KI ein, und alles kommt auf eine eigene Website für Ihr Objekt: ein Link, den Sie jedem Interessenten schicken. Mehr als ein Exposé und ein Inserat auf Idealista."
        knoepfe={
          <>
            <AnfrageKnopf />
            <ZweiterKnopf href="/beispiele/projekt/" neuerTab>
              Beispiel ansehen
            </ZweiterKnopf>
          </>
        }
        punkte={["Nur Ihre Fotos – kein Termin vor Ort", "Leere Räume eingerichtet, gekennzeichnet als KI-Visualisierung", "Anfragen gehen direkt an Sie"]}
        bild={
          <Hochkant klasse="hoch-held">
            <video src="/assets/immobilien/rundflug.mp4" poster="/assets/immobilien/rundflug.jpg" autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover" aria-label="Flug um eine Natursteinvilla wie mit der Drohne, erstellt aus Fotos" />
            <KiHinweis />
            <Etikett style={{ left: 12, bottom: 12, fontSize: 11 }}>Aus Fotos – ohne Drohne</Etikett>
          </Hochkant>
        }
      />

      {/* Das Problem */}
      <section className="py-16" style={{ background: "var(--near-black-2)" }}>
        <div className="mx-auto px-7" style={{ maxWidth: 1180 }}>
          <Kicker>Kennen Sie das?</Kicker>
          <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.3rem)", marginBottom: 14, maxWidth: 820 }}>Gute Objekte verkaufen sich nicht von allein.</h2>
          <p style={{ color: "var(--warm-grey-dim)", maxWidth: 660, lineHeight: 1.6, marginBottom: 36 }}>
            Gerade bei hochwertigen Objekten entscheidet die Präsentation – und genau da stoßen Exposé und Portal an ihre Grenzen.
          </p>
          <Probleme punkte={PROBLEME} />
        </div>
      </section>

      {/* Drei Werkzeuge */}
      <section id="leistungen" className="py-16">
        <div className="mx-auto px-7" style={{ maxWidth: 1180 }}>
          <Kicker>Was wir für Sie machen</Kicker>
          <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.3rem)", marginBottom: 14 }}>Drei Dinge, die das übliche Exposé nicht kann.</h2>
          <p style={{ color: "var(--warm-grey-dim)", maxWidth: 640, lineHeight: 1.6, marginBottom: 48 }}>Alles aus Ihren Fotos. Einzeln oder zusammen.</p>
          <div className="grid gap-16 lg:gap-24">
            <Werkzeug
              nr="01"
              id="rundflug"
              titel="Objektvideo wie ein Drohnenflug"
              text="Aus Ihren Fotos entsteht ein Flug: die Einfahrt hinauf, durch Wohnzimmer, Küche und Schlafzimmer, hinaus über Pool und Garten – so, als wäre eine Drohne geflogen. Ohne Drehtermin, ohne Kamerateam, ohne Drohne."
              punkte={["Für Instagram, Facebook und Ihr Inserat", "Niemand muss zum Objekt kommen", "Gekennzeichnet als KI-Visualisierung"]}
              bild={
                <div className="mx-auto w-full" style={{ maxWidth: 400 }}>
                  <Hochkant klasse="hoch-flug">
                    <LazyVideo src="/assets/immobilien/drohnenflug.mp4" poster="/assets/immobilien/drohnenflug.jpg" label="Flug durch eine Natursteinvilla: Einfahrt, Wohnzimmer, Küche, Schlafzimmer, Pool" className="absolute inset-0 w-full h-full object-cover" />
                    <KiHinweis />
                    <Etikett style={{ left: 12, bottom: 12, fontSize: 11 }}>Erstellt aus Fotos</Etikett>
                  </Hochkant>
                </div>
              }
            />
            <Werkzeug
              nr="02"
              id="einrichtung"
              rechts
              titel="Leere Räume, fertig eingerichtet"
              text="Ein leerer Raum wirkt kalt und kleiner, als er ist. Wir richten ihn mit KI ein – Sofa, Teppich, Licht –, damit Ihr Käufer sieht, wie es sich darin wohnt. Fenster, Boden und Decke bleiben echt."
              punkte={["Ohne Home-Staging, ohne Möbelwagen", "Als Bild, im Video und auf der Website", "Immer gekennzeichnet als KI-Visualisierung"]}
              bild={
                <div className="mx-auto w-full" style={{ maxWidth: 440 }}>
                  <Wechselbild
                    vorher="/beispiele/finca/assets/05-sala-antes.jpg"
                    nachher="/beispiele/finca/assets/06-sala-despues.jpg"
                    vorherAlt="Leeres Wohnzimmer mit Küche, echtes Foto"
                    nachherAlt="Dasselbe Wohnzimmer mit Sofa und Kochinsel, KI-Visualisierung"
                  />
                </div>
              }
            />
            <Werkzeug
              nr="03"
              id="rundgang"
              titel="Eine eigene Website für das Objekt"
              text="Rundgang durch jeden Raum, Objektvideo, Grundriss, Lage und alle Daten – auf einer Seite nur für dieses Objekt. Sie schicken den Link per WhatsApp oder Mail, Ihr Interessent öffnet ihn am Handy und geht durchs Haus."
              punkte={["Ein Link statt PDF-Anhang", "Anfragen gehen direkt an Sie", "Auf Wunsch diskret: nur per Link erreichbar"]}
              bild={<LinkNachricht />}
              extra={
                <a href="/beispiele/projekt/#rundgang" target="_blank" rel="noopener" style={{ fontSize: 14.5, color: "var(--amber)", textDecoration: "underline", textUnderlineOffset: 3 }}>
                  Beispiel durchgehen
                </a>
              }
            />
          </div>
        </div>
      </section>

      {/* Vergleich */}
      <section className="py-16" style={{ background: "var(--near-black-2)" }}>
        <div className="mx-auto px-7" style={{ maxWidth: 980 }}>
          <Kicker>Der Unterschied</Kicker>
          <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.3rem)", marginBottom: 32 }}>Das übliche Exposé – und Ihre Objekt-Website.</h2>
          <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid var(--hairline)" }} role="table" aria-label="Vergleich: übliches Exposé und Objekt-Website">
            <div className="hidden md:grid grid-cols-[0.8fr_1fr_1fr]" role="row" style={{ background: "var(--near-black)" }}>
              <span role="columnheader" className="px-5 py-3.5" />
              <span role="columnheader" className="mono px-5 py-3.5" style={{ fontSize: 11.5, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--warm-grey-faint)" }}>Das übliche Exposé</span>
              <span role="columnheader" className="mono px-5 py-3.5" style={{ fontSize: 11.5, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--amber)" }}>Ihre Objekt-Website</span>
            </div>
            {VERGLEICH.map((z) => (
              <div key={z.was} role="row" className="grid grid-cols-2 md:grid-cols-[0.8fr_1fr_1fr]" style={{ borderTop: "1px solid var(--hairline)" }}>
                <span role="rowheader" className="col-span-2 md:col-span-1 px-5 pt-4 md:py-4" style={{ fontWeight: 600, fontSize: 15 }}>{z.was}</span>
                <span role="cell" className="px-5 py-3 md:py-4" style={{ color: "var(--warm-grey-faint)", fontSize: 14.5 }}>
                  <span className="md:hidden mono block" style={{ fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 2 }}>Üblich</span>
                  {z.ueblich}
                </span>
                <span role="cell" className="px-5 py-3 md:py-4" style={{ color: "var(--warm-grey)", fontSize: 14.5 }}>
                  <span className="md:hidden mono block" style={{ fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 2, color: "var(--amber)" }}>Bei Ihnen</span>
                  <span aria-hidden="true" style={{ color: "var(--amber)", marginRight: 6 }}>✓</span>
                  {z.ihr}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wohin mit dem Link */}
      <section className="py-16">
        <div className="mx-auto px-7" style={{ maxWidth: 1180 }}>
          <Kicker>Ein Link, überall</Kicker>
          <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.3rem)", marginBottom: 14 }}>Wohin Sie den Link schicken.</h2>
          <p style={{ color: "var(--warm-grey-dim)", maxWidth: 620, lineHeight: 1.6, marginBottom: 32 }}>Eine Seite pro Objekt – und überall, wo Interessenten sind, derselbe Link.</p>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {LINK_EINSATZ.map((e) => (
              <li key={e.wohin} className="rounded-xl p-5" style={{ background: "var(--near-black-2)", border: "1px solid var(--hairline)" }}>
                <span style={{ display: "block", fontWeight: 650, fontSize: "1.02rem", marginBottom: 6 }}>{e.wohin}</span>
                <span style={{ color: "var(--warm-grey-dim)", fontSize: "0.93rem", lineHeight: 1.55 }}>{e.wie}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <LeistungWaehlen id="anzeigen" name={name("anzeigen")} />
            <span style={{ color: "var(--warm-grey-dim)", fontSize: 14.5 }}>Anzeigen auf Facebook und Instagram schalten wir auf Wunsch mit – aus Ihrem eigenen Werbekonto.</span>
          </div>
        </div>
      </section>

      <Schritte
        titel="Drei Schritte. Sie machen nur den ersten."
        schritte={[
          { titel: "Fotos schicken", text: "Ihre Objektfotos, auch vom Handy, dazu Grundriss und Eckdaten. Niemand muss vorbeikommen." },
          { titel: "Wir bauen Video und Website", text: "Objektvideo, eingerichtete Räume und die Website zum Objekt. Sie sehen alles, bevor es online geht." },
          { titel: "Sie schicken den Link", text: "An Interessenten, im Inserat, in Anzeigen. Anfragen kommen direkt zu Ihnen." },
        ]}
      />

      <Gruender warum="Ich habe zu oft gesehen, wie gute Objekte auf den Portalen untergehen – zwischen Hunderten anderen, mit ein paar Fotos und einem PDF. Deshalb zeige ich jedes Objekt so, wie ein Käufer es erleben will: im Video, eingerichtet und Raum für Raum." />

      <Angebot
        text="Sagen Sie uns, welches Objekt Sie gerade vermarkten. Marvin ruft Sie an – und Sie sehen Video und Website, bevor Sie den ersten Link verschicken."
        rolle="Makler"
        objektBeispiel="z. B. Villa mit Meerblick, leere Penthouse-Wohnung, Finca mit Pool"
        auswahl={["rundflug", "einrichtung", "rundgang", "anzeigen"]}
      />

      <Fragen
        eintraege={[
          { f: "Muss jemand zum Objekt kommen?", a: "Nein. Ihre Fotos reichen, auch vom Handy – dazu Grundriss und Eckdaten. Kein Drehtermin, kein Kamerateam, keine Drohne." },
          { f: "Für welche Objekte lohnt sich das?", a: "Für Objekte, bei denen die Präsentation den Unterschied macht: hochwertige Häuser und Wohnungen, Fincas, Neubauten, leere Räume. Für eine einfache Wohnung reicht oft das Portal." },
          { f: "Kann die Website diskret bleiben?", a: "Ja. Auf Wunsch ist sie nur über den Link erreichbar und erscheint nicht bei Google – für Verkäufer, die nicht im Portal stehen möchten." },
          { f: "Wohin gehen die Anfragen?", a: "Direkt an Sie. Auf der Website stehen Ihr Name und Ihre Kontaktdaten." },
          { f: "Sind die Bilder echt?", a: "Die Architektur ist echt, sie kommt aus Ihren Fotos. Möbel und Einrichtung ergänzt die KI. Solche Bilder und Videos kennzeichnen wir immer als KI-Visualisierung." },
          FRAGE.haken,
          FRAGE.kosten,
          FRAGE.gehoert,
        ]}
      />

      <Footer lang="de" />
      <AnfrageSticky />
    </main>
  );
}
