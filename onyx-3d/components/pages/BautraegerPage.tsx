import type { Metadata } from "next";
import Footer from "@/components/Footer";
import AnfrageSticky from "@/components/immobilien/AnfrageSticky";
import {
  Angebot,
  AnfrageKnopf,
  Etikett,
  FRAGE,
  Fragen,
  Gruender,
  HELD_CSS,
  Held,
  KiHinweis,
  Kicker,
  LeistungsKarte,
  Probleme,
  Schritte,
  WECHSEL_CSS,
  ZweiterKnopf,
} from "@/components/immobilien/bausteine";

/**
 * Landingpage für Bauträger (Anzeigen an Bauträger und Bauunternehmen).
 * Marvin, 28.11.2026: „Für Bauträger geht es nur darum, ihre Objekte schon zu
 * verkaufen, auch wenn sie noch nicht fertig sind … den Kunden zu zeigen, wie
 * die Wohnung und das Haus aussehen werden.“ Wir sind die Lösung: aus
 * Bauplänen und Baustellenfotos zeigen wir das Objekt komplett fertig.
 *
 * Erster Bildschirm = das Versprechen der Bauträger-Reels (Zeitraffer,
 * „Verkaufen, bevor es fertig ist“). Material nur aus ONYX-Beispielen.
 */

const TITEL = "Verkaufen, bevor es fertig ist – für Bauträger | ONYX Studio";
const BESCHREIBUNG =
  "Wir zeigen Ihr Haus oder Ihre Wohnung komplett fertig – außen, innen, jedes Zimmer eingerichtet. Aus Ihren Bauplänen und Baustellenfotos, damit Käufer schon in der Bauphase sehen, was sie kaufen. Ihr erstes Objekt ist geschenkt.";

export const bautraegerMetadata: Metadata = {
  title: TITEL,
  description: BESCHREIBUNG,
  alternates: { canonical: "/immobilien/bautraeger" },
  openGraph: { title: TITEL, description: BESCHREIBUNG, images: ["/beispiele/projekt/img/bau-5.webp"], locale: "de_DE", type: "website" },
};

const PROBLEME = [
  { titel: "Grundrisse versteht kaum ein Käufer.", text: "Wie groß ist das Wohnzimmer wirklich, wo fällt das Licht hin? Aus Strichen auf Papier macht sich niemand ein Bild von seinem Zuhause." },
  { titel: "Ein Außenrendering reicht nicht.", text: "Es zeigt die Fassade, aber nicht, wie es sich drinnen anfühlt. Gekauft wird drinnen: Küche, Blick, Schlafzimmer." },
  { titel: "Viele warten, bis es fertig ist.", text: "Niemand will die Katze im Sack kaufen. Also warten Käufer, bis sie durchgehen können – und reservieren bis dahin nicht." },
  { titel: "Die Bank will Verkäufe sehen.", text: "Viele Banken finanzieren erst weiter, wenn ein Teil der Einheiten verkauft ist. Jeder frühe Verkauf zählt." },
  { titel: "Eine Musterwohnung kostet – und kommt spät.", text: "Sie muss gebaut, eingerichtet und gezeigt werden. Und sie steht erst, wenn der Bau schon weit ist." },
  { titel: "Was nach der Übergabe leer steht, kostet.", text: "Jede Einheit, die erst nach der Fertigstellung verkauft wird, bindet Geld, das Sie im nächsten Projekt brauchen." },
];

const HEUTE = [
  {
    vorher: "/beispiele/media/p1-vorher.jpg",
    nachher: "/beispiele/media/p1-nachher.jpg",
    raum: "Wohnbereich mit Küche",
    vorherAlt: "Wohnbereich im Ausbau, echtes Foto",
    nachherAlt: "Derselbe Wohnbereich fertig eingerichtet, KI-Visualisierung",
  },
  {
    vorher: "/beispiele/media/p2-vorher.jpg",
    nachher: "/beispiele/media/p2-nachher.jpg",
    raum: "Offener Raum mit Kochinsel",
    vorherAlt: "Offener Raum im Ausbau, echtes Foto",
    nachherAlt: "Derselbe Raum mit Kochinsel, KI-Visualisierung",
  },
];

const BAUPHASEN = [
  { bild: "/beispiele/projekt/img/bau-1.webp", phase: "Absteckung" },
  { bild: "/beispiele/projekt/img/bau-2.webp", phase: "Fundament" },
  { bild: "/beispiele/projekt/img/bau-3.webp", phase: "Rohbau" },
  { bild: "/beispiele/projekt/img/bau-4.webp", phase: "Fassade" },
  { bild: "/beispiele/projekt/img/bau-5.webp", phase: "So wird es" },
];

const VERTRIEB = [
  { titel: "Käufer legen sich früher fest", text: "Wer die fertige Wohnung gesehen hat, muss nicht bis zur Übergabe warten, um sich zu entscheiden." },
  { titel: "Ihr Vertrieb schickt einen Link", text: "Statt Grundriss-PDF, Baubeschreibung und Außenrendering: eine Seite, auf der alles ist – am Handy." },
  { titel: "Zur Baustelle kommen die Richtigen", text: "Wer nach dem Rundgang anfragt, weiß, was er will. Auch Käufer, die weit weg wohnen, kennen das Haus schon." },
];

export default function BautraegerPage() {
  return (
    <main>
      <style>{HELD_CSS + WECHSEL_CSS}</style>

      <Held
        kicker="Für Bauträger & Bauunternehmen"
        titel="Verkaufen, bevor es fertig ist."
        text="Wir zeigen Ihr Haus oder Ihre Wohnung komplett fertig – außen, innen, jedes Zimmer eingerichtet. Aus Ihren Bauplänen und Baustellenfotos, lange bevor der letzte Stein gesetzt ist. So sehen Ihre Käufer, was sie kaufen."
        knoepfe={
          <>
            <AnfrageKnopf />
            <ZweiterKnopf href="#heute">So sieht das aus</ZweiterKnopf>
          </>
        }
        punkte={["Aus Ihren Plänen und Fotos – die Architektur bleibt echt", "Jedes Bild geben Sie frei, bevor es online geht", "Immer gekennzeichnet als KI-Visualisierung"]}
        bild={
          <div className="relative overflow-hidden rounded-2xl" style={{ aspectRatio: "16 / 9", background: "#141414", border: "1px solid var(--hairline)" }}>
            <video src="/beispiele/projekt/media/hero.mp4" poster="/beispiele/projekt/img/hero-poster.webp" autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover" aria-label="Zeitraffer: vom leeren Grundstück bis zur fertigen Villa" />
            <KiHinweis />
            <Etikett style={{ left: 12, bottom: 12, fontSize: 11 }}>Vom Grundstück bis fertig</Etikett>
          </div>
        }
      />

      {/* Das Problem */}
      <section className="py-16" style={{ background: "var(--near-black-2)" }}>
        <div className="mx-auto px-7" style={{ maxWidth: 1180 }}>
          <Kicker>Das Problem</Kicker>
          <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.3rem)", marginBottom: 14, maxWidth: 820 }}>Sie verkaufen etwas, das es noch nicht gibt.</h2>
          <p style={{ color: "var(--warm-grey-dim)", maxWidth: 640, lineHeight: 1.6, marginBottom: 36 }}>
            Sie wissen genau, wie das Haus wird. Ihr Käufer sieht eine Baugrube, einen Grundriss und eine Baubeschreibung.
          </p>
          <Probleme punkte={PROBLEME} />
        </div>
      </section>

      {/* Die Lösung: heute vs. so sieht es der Käufer */}
      <section id="heute" className="py-16" style={{ scrollMarginTop: 80 }}>
        <div className="mx-auto px-7" style={{ maxWidth: 1180 }}>
          <Kicker>Unsere Lösung</Kicker>
          <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.3rem)", marginBottom: 14, maxWidth: 860 }}>Wir zeigen Ihr Objekt fertig – bevor es fertig ist.</h2>
          <p style={{ color: "var(--warm-grey-dim)", maxWidth: 680, lineHeight: 1.6, marginBottom: 36 }}>
            Aus Bauplänen und Fotos von der Baustelle entsteht das fertige Haus. Ihre Käufer sehen jedes Zimmer so, wie es einmal aussieht – heute, nicht erst bei der Übergabe.
          </p>
          <div className="grid gap-8 md:grid-cols-2">
            {HEUTE.map((h) => (
              <figure key={h.raum}>
                <h3 style={{ fontFamily: "var(--font-instrument-sans), sans-serif", fontWeight: 650, fontSize: "1.02rem", marginBottom: 12 }}>{h.raum}</h3>
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="relative overflow-hidden rounded-xl" style={{ aspectRatio: "3 / 4", background: "#1b1b1b" }}>
                    <img src={h.vorher} alt={h.vorherAlt} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                    <Etikett style={{ top: 10, left: 10 }}>Heute</Etikett>
                  </div>
                  <div className="relative overflow-hidden rounded-xl" style={{ aspectRatio: "3 / 4", background: "#1b1b1b", outline: "1px solid rgba(232,163,61,.55)", outlineOffset: -1 }}>
                    <img src={h.nachher} alt={h.nachherAlt} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                    <KiHinweis />
                  </div>
                </div>
                <figcaption className="grid grid-cols-2 gap-2.5 mt-2.5" style={{ fontSize: 13.5, lineHeight: 1.45 }}>
                  <span style={{ color: "var(--warm-grey-dim)" }}>Heute auf der Baustelle – echtes Foto</span>
                  <span style={{ color: "var(--amber)" }}>So sieht es Ihr Käufer</span>
                </figcaption>
              </figure>
            ))}
          </div>
          <p style={{ color: "var(--warm-grey-dim)", fontSize: "0.97rem", lineHeight: 1.6, marginTop: 28, maxWidth: 720 }}>
            Fenster, Decke und Grundriss bleiben, wie sie gebaut werden. Ergänzt wird, was noch fehlt: Böden, Küche, Möbel, Licht.
          </p>
        </div>
      </section>

      {/* Bauphasen */}
      <section className="py-16" style={{ background: "var(--near-black-2)" }}>
        <div className="mx-auto px-7" style={{ maxWidth: 1180 }}>
          <Kicker>In jeder Bauphase</Kicker>
          <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.3rem)", marginBottom: 14 }}>Verkaufsfähig ab dem ersten Spatenstich.</h2>
          <p style={{ color: "var(--warm-grey-dim)", maxWidth: 660, lineHeight: 1.6, marginBottom: 32 }}>
            Auf der Projektseite verfolgen Käufer den Baufortschritt – und sehen in jeder Phase schon das fertige Haus.
          </p>
          <ol className="flex gap-3 overflow-x-auto pb-3 snap-x snap-mandatory md:grid md:grid-cols-5 md:overflow-visible" style={{ scrollbarWidth: "thin" }}>
            {BAUPHASEN.map((b, i) => {
              const ziel = i === BAUPHASEN.length - 1;
              return (
                <li key={b.phase} className="snap-start shrink-0 w-[68%] sm:w-[40%] md:w-auto">
                  <div className="relative overflow-hidden rounded-xl" style={{ aspectRatio: "4 / 3", background: "#1b1b1b", outline: ziel ? "2px solid var(--amber)" : undefined, outlineOffset: -2 }}>
                    <img src={b.bild} alt={`${b.phase}, KI-Visualisierung (Beispielprojekt)`} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                  </div>
                  <div className="flex items-baseline gap-2 mt-2.5">
                    <span className="mono" style={{ fontSize: 11.5, color: ziel ? "var(--amber)" : "var(--warm-grey-faint)" }}>{String(i + 1).padStart(2, "0")}</span>
                    <span style={{ fontSize: 15, fontWeight: 600, color: ziel ? "var(--amber)" : "var(--warm-grey)" }}>{b.phase}</span>
                  </div>
                </li>
              );
            })}
          </ol>
          <p className="mono" style={{ fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--warm-grey-faint)", marginTop: 14 }}>
            Beispielprojekt · alle Bilder KI-Visualisierung
          </p>
        </div>
      </section>

      {/* Leistungen */}
      <section id="leistungen" className="py-16">
        <div className="mx-auto px-7" style={{ maxWidth: 1180 }}>
          <Kicker>Was Sie bekommen</Kicker>
          <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.3rem)", marginBottom: 14 }}>Alles, was Ihr Vertrieb zum Zeigen braucht.</h2>
          <p style={{ color: "var(--warm-grey-dim)", maxWidth: 640, lineHeight: 1.6, marginBottom: 36 }}>Einzeln oder zusammen – Sie wählen, was Ihr Projekt braucht.</p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <LeistungsKarte
              id="zeitraffer"
              titel="Zeitraffer vom Grundstück bis fertig"
              text="In Sekunden wächst Ihr Haus aus der Baugrube zur fertigen Villa. Das Video, das in Ihren Anzeigen hängen bleibt."
              medium={{ art: "video", src: "/assets/immobilien/zeitraffer.mp4", poster: "/assets/immobilien/zeitraffer.jpg", label: "Zeitraffer vom Grundstück bis fertig", ki: true }}
            />
            <LeistungsKarte
              id="einrichtung"
              titel="Jede Wohnung fertig eingerichtet"
              text="Ihre Musterwohnung, ohne eine zu bauen: jedes Zimmer mit Böden, Küche, Möbeln und Licht – als Bild und als Video."
              medium={{ art: "wechsel", vorher: "/beispiele/media/p3-vorher.jpg", nachher: "/beispiele/media/p3-nachher.jpg", vorherAlt: "Leeres Schlafzimmer im Neubau, echtes Foto", nachherAlt: "Dasselbe Schlafzimmer eingerichtet, KI-Visualisierung" }}
            />
            <LeistungsKarte
              id="rundgang"
              titel="Rundgang am Handy"
              text="Käufer gehen Raum für Raum durch die fertige Wohnung, mit Grundriss, Fläche und Preis – abends auf dem Sofa."
              medium={{ art: "video", src: "/assets/immobilien/rundgang.mp4", poster: "/assets/immobilien/rundgang.jpg", label: "Rundgang durch eine fertig eingerichtete Villa", ki: true }}
              beispiel={{ href: "/beispiele/projekt/#rundgang", text: "Beispiel durchgehen" }}
            />
            <LeistungsKarte
              id="projektseite"
              titel="Projektseite mit allen Einheiten"
              text="Alle Häuser oder Wohnungen mit Fläche, Grundriss, Preis und Status. Reserviert? Dann ändert sich eine Zeile, nicht zehn Exposés."
              medium={{ art: "bild", src: "/assets/immobilien/projektseite.jpg", alt: "Beispiel einer Projektseite mit allen Einheiten", ki: false, oben: true }}
              beispiel={{ href: "/beispiele/projekt/", text: "Beispielseite ansehen" }}
            />
            <LeistungsKarte
              id="anzeigen"
              titel="Anzeigen bei Menschen, die suchen"
              text="Ihre Videos laufen auf Facebook und Instagram bei Menschen, die gerade eine Immobilie suchen. Der Klick landet auf Ihrer Projektseite, nicht im Portal."
              medium={{ art: "bild", src: "/assets/immobilien/anzeigen.jpg", alt: "Beispiel einer Anzeige am Handy", ki: true }}
            />
            <LeistungsKarte
              id="rundflug"
              titel="Rundflug um das fertige Haus"
              text="Ein Flug um das Haus und durch die Räume, wie mit der Drohne – schon während noch gebaut wird."
              medium={{ art: "video", src: "/assets/immobilien/rundflug.mp4", poster: "/assets/immobilien/rundflug.jpg", label: "Rundflug um eine fertige Villa", ki: true }}
            />
          </div>
        </div>
      </section>

      {/* Was sich im Vertrieb ändert */}
      <section className="py-16" style={{ background: "var(--near-black-2)" }}>
        <div className="mx-auto px-7" style={{ maxWidth: 1180 }}>
          <Kicker>Für Ihren Vertrieb</Kicker>
          <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.3rem)", marginBottom: 32 }}>Was sich im Verkauf ändert.</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {VERTRIEB.map((v) => (
              <div key={v.titel} className="rounded-xl p-6" style={{ border: "1px solid var(--hairline)", background: "var(--near-black)" }}>
                <span aria-hidden="true" style={{ color: "var(--amber)", fontSize: 20 }}>→</span>
                <h3 style={{ fontFamily: "var(--font-instrument-sans), sans-serif", fontWeight: 650, fontSize: "1.1rem", lineHeight: 1.35, margin: "10px 0" }}>{v.titel}</h3>
                <p style={{ color: "var(--warm-grey-dim)", fontSize: "0.96rem", lineHeight: 1.6 }}>{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Schritte
        titel="Drei Schritte. Sie machen nur den ersten."
        schritte={[
          { titel: "Pläne und Fotos schicken", text: "Grundrisse, Ansichten, Baubeschreibung und Fotos vom Grundstück oder Rohbau. Handyfotos reichen." },
          { titel: "Wir zeigen es fertig", text: "Zeitraffer, eingerichtete Räume, Rundgang, Projektseite – was Sie brauchen. Online geht nur, was Sie freigeben." },
          { titel: "Ihr Vertrieb verkauft", text: "Mit Link, Videos und Anzeigen – an Käufer, die das fertige Haus schon gesehen haben." },
        ]}
      />

      <Gruender warum="Ich habe zu oft gesehen, wie gute Projekte erst verkauft werden, wenn sie fertig sind – weil sich vorher niemand vorstellen konnte, wie sie aussehen. Deshalb zeige ich jedes Haus vom Rohbau bis fertig eingerichtet und bringe es per Anzeige zu Menschen, die gerade suchen." />

      <Angebot
        text="Sagen Sie uns, welches Projekt Sie gerade vermarkten und was Sie zeigen möchten. Marvin ruft Sie an, schaut sich Pläne und Fotos mit Ihnen an – und Sie sehen das Ergebnis, bevor etwas online geht."
        rolle="Bauträger / Bauunternehmen"
        objektBeispiel="z. B. 6 Villen im Rohbau, Wohnanlage mit 12 Einheiten"
        auswahl={["zeitraffer", "einrichtung", "rundgang", "projektseite", "anzeigen", "rundflug"]}
      />

      <Fragen
        eintraege={[
          { f: "Ab wann geht das?", a: "Schon ab Plänen: Aus Grundrissen und Ansichten zeigen wir, wie Haus und Zimmer fertig aussehen. Mit Fotos vom Grundstück oder vom Rohbau wird es noch genauer – je weiter der Bau ist, desto mehr echte Architektur steckt im Bild." },
          { f: "Sind die Bilder verbindlich?", a: "Nein. Sie zeigen, wie es aussehen kann, und sind als KI-Visualisierung gekennzeichnet. Verbindlich bleibt Ihre Baubeschreibung. Jedes Bild geben Sie frei, bevor es online geht." },
          { f: "Unser Projekt hat mehrere Einheiten. Geht das?", a: "Ja. Die Projektseite zeigt alle Einheiten mit Fläche, Grundriss, Preis und Status. Zeitraffer, Rundgang und eingerichtete Räume machen wir für die Haus- und Wohnungstypen, die Sie zeigen möchten." },
          { f: "Können Käufer verschiedene Ausstattungen sehen?", a: "Ja. Einzelne Räume zeigen wir auf Wunsch in Varianten, zum Beispiel mit hellem oder dunklem Boden – hilfreich, wenn Käufer sich für eine Ausstattung entscheiden sollen." },
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
