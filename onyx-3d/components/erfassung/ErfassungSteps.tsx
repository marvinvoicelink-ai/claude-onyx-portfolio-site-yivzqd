"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

const STEPS = [
  {
    num: "01",
    title: "Mit der App auf dem Objekt sprechen",
    text: "Du bist mit der App auf der Baustelle oder im Objekt unterwegs und sprichst rein, was du siehst: Räume, Maße, Mängel, Besonderheiten. Die App erkennt und strukturiert das automatisch — kein Tippen, kein Formular vor Ort.",
  },
  {
    num: "02",
    title: "Flächen und Zeichnung entstehen von selbst",
    text: "Am Ende zählt das System die Quadratmeterzahl jedes Raums automatisch zusammen und zeichnet daraus eine schematische Skizze des Objekts.",
  },
  {
    num: "03",
    title: "Ein Knopfdruck, und es geht an den Rechner",
    text: "Drückst du auf Abschließen, werden die erfassten Daten sofort an deinen Computer übertragen. Ein KI-Agent startet direkt und baut daraus die vorgesehenen Unterlagen — für Immobilien zum Beispiel das Exposé.",
  },
  {
    num: "04",
    title: "Der Scroll-Website-Entwurf steht bereit",
    text: "Noch während du auf dem Objekt stehst, ist der Entwurf der Scroll-Website fertig zum Ansehen. Veröffentlicht wird sie erst, wenn du das bewusst freigibst — das bleibt ein eigener Schritt.",
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
