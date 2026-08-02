"use client";

import Image from "next/image";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const solutions = [
  { image: "/generated/solution-01.webp", w: 880, h: 626, title: "Kundenportale.", subtitle: "Status, Dokumente und Termine selbst einsehen." },
  { image: "/generated/solution-02.webp", w: 992, h: 630, title: "Interne Tools.", subtitle: "Aus Excel und Zetteln wird ein eigenes System." },
  { image: "/generated/solution-03.webp", w: 944, h: 615, title: "Dashboards & Auswertungen.", subtitle: "Alle Zahlen an einem Ort, live und verständlich." },
  { image: "/generated/solution-04.webp", w: 849, h: 651, title: "Automatisierung & KI-Agenten.", subtitle: "Mails, Reports und Erinnerungen laufen automatisch." },
  { image: "/generated/solution-05.webp", w: 1048, h: 643, title: "Termin- & Ressourcenplanung.", subtitle: "Kalender und Kapazitäten in einem System." },
  { image: "/generated/solution-06.webp", w: 1074, h: 636, title: "Dokumenten- & Datenverwaltung.", subtitle: "Eine zentrale Ablage statt Ordner-Chaos." },
];

export default function SolutionsSection({ animate = false }: { animate?: boolean }) {
  const cards = useScrollReveal<HTMLDivElement>(solutions.length, !animate);

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

        <div
          className={
            animate
              ? "grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-12"
              : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12"
          }
        >
          {solutions.map((s, i) => (
            <div
              key={s.image}
              ref={cards.setRef(i)}
              data-reveal-index={i}
              className={
                animate
                  ? `flex flex-col hover-lift-home ${cards.visible[i] ? "reveal-visible" : "reveal-hidden"}`
                  : "flex flex-col"
              }
              style={animate ? { ["--reveal-delay" as string]: `${i * 70}ms` } : undefined}
            >
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
              <p
                style={{
                  color: "var(--amber)",
                  fontSize: "0.96rem",
                  lineHeight: 1.4,
                  marginBottom: 20,
                }}
              >
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
