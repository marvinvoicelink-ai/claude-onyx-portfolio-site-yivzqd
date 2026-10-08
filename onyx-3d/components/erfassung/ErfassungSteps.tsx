"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import type { Lang } from "@/lib/i18n";

const TEXT: Record<Lang, { kicker: string; heading: string; steps: { num: string; title: string; text: string }[] }> = {
  de: {
    kicker: "So läuft es",
    heading: "Ein Rundgang statt zwei Stunden Nacharbeit.",
    steps: [
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
    ],
  },
  es: {
    kicker: "Cómo funciona",
    heading: "Un recorrido en lugar de dos horas de trabajo extra.",
    steps: [
      {
        num: "01",
        title: "Hablar con la app en el inmueble",
        text: "Recorres la obra o el inmueble con la app y dictas lo que ves: estancias, medidas, defectos, particularidades. La app lo reconoce y lo ordena automáticamente: sin teclear y sin formularios en el lugar.",
      },
      {
        num: "02",
        title: "Superficies y esquema, solos",
        text: "Al final, el sistema suma automáticamente los metros cuadrados de cada estancia y dibuja con ello un esquema del inmueble.",
      },
      {
        num: "03",
        title: "Un botón, y todo llega a tu ordenador",
        text: "Al pulsar Finalizar, los datos se envían al instante a tu ordenador. Un agente de IA empieza enseguida a preparar la documentación prevista; en inmobiliaria, por ejemplo, el dossier.",
      },
      {
        num: "04",
        title: "El borrador de la web con scroll, listo",
        text: "Mientras sigues en el inmueble, el borrador de la web con scroll ya está listo para verlo. Solo se publica cuando tú lo apruebas conscientemente: eso sigue siendo un paso aparte.",
      },
    ],
  },
};

export default function ErfassungSteps({ lang }: { lang: Lang }) {
  const t = TEXT[lang];
  const reveal = useScrollReveal<HTMLDivElement>(t.steps.length);

  return (
    <section className="py-14" style={{ background: "var(--near-black-2)" }}>
      <div className="mx-auto px-7" style={{ maxWidth: 1180 }}>
        <div className="text-center mb-10">
          <span
            className="mono inline-flex items-center gap-2 mb-4"
            style={{ fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--amber)" }}
          >
            <span style={{ opacity: 0.7 }}>§</span> {t.kicker}
          </span>
          <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", maxWidth: "24ch", marginLeft: "auto", marginRight: "auto" }}>
            {t.heading}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {t.steps.map((s, i) => {
            const visible = reveal.visible[i];
            return (
              <div
                key={s.num}
                ref={reveal.setRef(i)}
                data-reveal-index={i}
                className={`beam-border rounded-2xl px-6 py-6 alive-hover-card ${visible ? "reveal-visible" : "reveal-hidden"}`}
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
