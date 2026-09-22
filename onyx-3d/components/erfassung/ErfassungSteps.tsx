"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

const STEPS = [
  {
    num: "01",
    title: "Durchgehen und sprechen",
    text: "Du gehst durchs Objekt und sagst, was du siehst: Räume, Maße, Mängel oder Besonderheiten. Kein Tippen und kein Formular vor Ort.",
  },
  {
    num: "02",
    title: "Video aufnehmen",
    text: "Du filmst deinen Rundgang durch das Objekt. Das Video ist das Hauptmaterial; zusätzliche Fotos werden nur dort benötigt, wo sie sinnvoll sind.",
  },
  {
    num: "03",
    title: "Daten und Zeichnung entstehen",
    text: "Aus den gesprochenen Angaben werden strukturierte Datensätze und eine schematische Zeichnung. Flächen und Zimmerzahlen werden aus den erfassten Daten berechnet.",
  },
  {
    num: "04",
    title: "Unterlagen erstellen lassen",
    text: "Beim Speichern startet automatisch ein KI-Agent. Gemessen beginnt er nach etwa drei Sekunden damit, aus den erfassten Informationen die vorgesehenen Unterlagen zu bauen. Für Immobilien können daraus Exposé und Scroll-Website entstehen — die Veröffentlichung der Website ist danach ein eigener, bewusster Schritt.",
  },
];

export default function ErfassungSteps() {
  const reveal = useScrollReveal<HTMLDivElement>(STEPS.length);

  return (
    <section className="py-14" style={{ background: "var(--near-black-2)" }}>
      <div className="mx-auto px-7" style={{ maxWidth: 1180 }}>
        <div className="text-center mb-10">
          <span
            className="mono inline-flex items-center gap-2 mb-4"
            style={{ fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--amber)" }}
          >
            <span style={{ opacity: 0.7 }}>§</span> So läuft es
          </span>
          <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", maxWidth: "24ch", marginLeft: "auto", marginRight: "auto" }}>
            Ein Rundgang statt zwei Stunden Nacharbeit.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {STEPS.map((s, i) => {
            const visible = reveal.visible[i];
            return (
              <div
                key={s.num}
                ref={reveal.setRef(i)}
                data-reveal-index={i}
                className={`rounded-2xl px-6 py-6 alive-hover-card ${visible ? "reveal-visible" : "reveal-hidden"}`}
                style={{
                  ["--reveal-delay" as string]: `${i * 90}ms`,
                  background: "var(--near-black)",
                  border: "1px solid var(--hairline)",
                }}
              >
                <span className="mono block mb-3" style={{ fontSize: 13, color: "var(--amber)" }}>
                  {s.num}
                </span>
                <h3 style={{ fontSize: "1.05rem", marginBottom: 10 }}>{s.title}</h3>
                <p style={{ color: "var(--warm-grey-dim)", fontSize: "0.9rem", lineHeight: 1.6 }}>{s.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
