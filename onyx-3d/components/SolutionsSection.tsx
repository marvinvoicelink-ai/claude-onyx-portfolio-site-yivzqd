"use client";

import Image from "next/image";
import { useScrollStack } from "@/hooks/useScrollStack";
import { CardStackDots, CardStackHint, getStackSlotStyle } from "./CardStackChrome";

const solutions = [
  { image: "/generated/solution-01.webp", w: 880, h: 626, title: "Kundenportale.", subtitle: "Status, Dokumente und Termine selbst einsehen." },
  { image: "/generated/solution-02.webp", w: 992, h: 630, title: "Interne Tools.", subtitle: "Aus Excel und Zetteln wird ein eigenes System." },
  { image: "/generated/solution-03.webp", w: 944, h: 615, title: "Dashboards & Auswertungen.", subtitle: "Alle Zahlen an einem Ort, live und verständlich." },
  { image: "/generated/solution-04.webp", w: 849, h: 651, title: "Automatisierung & KI-Agenten.", subtitle: "Mails, Reports und Erinnerungen laufen automatisch." },
  { image: "/generated/solution-05.webp", w: 1048, h: 643, title: "Termin- & Ressourcenplanung.", subtitle: "Kalender und Kapazitäten in einem System." },
  { image: "/generated/solution-06.webp", w: 1074, h: 636, title: "Dokumenten- & Datenverwaltung.", subtitle: "Eine zentrale Ablage statt Ordner-Chaos." },
];

function SolutionCard({ s }: { s: (typeof solutions)[number] }) {
  return (
    <>
      <h3
        style={{
          fontFamily: "var(--font-archivo), sans-serif",
          fontWeight: 800,
          fontSize: "clamp(1.35rem, 2.4vw, 1.7rem)",
          lineHeight: 1.1,
          color: "#ffffff",
          marginBottom: 6,
        }}
      >
        {s.title}
      </h3>
      <p style={{ color: "var(--amber)", fontSize: "0.96rem", lineHeight: 1.4, marginBottom: 20 }}>
        {s.subtitle}
      </p>
      <Image
        src={s.image}
        alt={`${s.title} ${s.subtitle}`}
        width={s.w}
        height={s.h}
        className="w-full h-auto block"
        style={{ maxWidth: "78%", filter: "drop-shadow(0 0 30px rgba(232,163,61,0.4))" }}
      />
    </>
  );
}

export default function SolutionsSection({ animate = false }: { animate?: boolean }) {
  const stack = useScrollStack(solutions.length, !animate);

  return (
    <section className="py-14">
      <div className="mx-auto px-7" style={{ maxWidth: 1180 }}>
        <span
          className="mono inline-flex items-center gap-2 mb-4"
          style={{ fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--amber)" }}
        >
          <span style={{ opacity: 0.7 }}>§</span> Blatt 03 / Bauteile
        </span>
        <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", maxWidth: "22ch", marginBottom: 14 }}>
          Ein System, jeder Bereich, den du brauchst.
        </h2>
        <p style={{ color: "var(--warm-grey-dim)", maxWidth: "62ch", fontSize: "1.02rem", lineHeight: 1.7, marginBottom: 44 }}>
          Kein Baukasten mit festen Modulen. Was dein System am Ende abdeckt,
          richtet sich nach deinem Prozess — hier ein Überblick, wo
          maßgeschneiderte Systeme typischerweise ansetzen.
        </p>

        {stack.staticFallback ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
            {solutions.map((s) => (
              <div key={s.image} className="flex flex-col">
                <SolutionCard s={s} />
              </div>
            ))}
          </div>
        ) : (
          <div ref={stack.wrapperRef} className="relative" style={{ height: `${solutions.length * 62}vh` }}>
            <div className="sticky flex items-center justify-center" style={{ top: "13vh", height: "min(560px, 74vh)" }}>
              <div className="relative w-full" style={{ maxWidth: 460, height: "100%" }}>
                {solutions.map((s, i) => (
                  <div
                    key={s.image}
                    className={`card-stack-slot flex flex-col ${i === stack.index ? "hover-lift-home" : ""}`}
                    style={getStackSlotStyle(i - stack.index)}
                  >
                    <SolutionCard s={s} />
                  </div>
                ))}
                <CardStackDots count={solutions.length} index={stack.index} />
                <CardStackHint done={stack.index === solutions.length - 1} />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
