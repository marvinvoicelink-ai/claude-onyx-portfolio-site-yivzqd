"use client";

import Image from "next/image";
import { useScrollStack } from "@/hooks/useScrollStack";
import { CardStackDots, CardStackScrollHint, getFlyStackSlotStyle } from "./CardStackChrome";

const diffs = [
  { image: "/generated/diff-01.webp", w: 691, h: 510, title: "Kein CRM von der Stange.", subtitle: "Dein System wird nach deinem Prozess gebaut." },
  { image: "/generated/diff-02.webp", w: 754, h: 520, title: "Volles Eigentum.", subtitle: "Du besitzt Code und Daten - vollständig." },
  { image: "/generated/diff-03.webp", w: 822, h: 194, title: "Deine Infrastruktur.", subtitle: "Du hostest auf deinem eigenen Server." },
  { image: "/generated/diff-04.webp", w: 1220, h: 248, title: "Kein Lock-in.", subtitle: "Nach der Übergabe bist du unabhängig." },
];

function DiffCard({ d, animate }: { d: (typeof diffs)[number]; animate?: boolean }) {
  return (
    <>
      <h3
        style={{
          fontFamily: "var(--font-archivo), sans-serif",
          fontWeight: 800,
          fontSize: "clamp(1.5rem, 2.6vw, 2rem)",
          lineHeight: 1.1,
          color: "#ffffff",
          marginBottom: 8,
        }}
      >
        {d.title}
      </h3>
      <p style={{ color: "var(--amber)", fontSize: "1.02rem", lineHeight: 1.5, marginBottom: 24 }}>
        {d.subtitle}
      </p>
      <Image
        src={d.image}
        alt={`${d.title} ${d.subtitle}`}
        width={d.w}
        height={d.h}
        className="w-full h-auto block"
        style={{ maxWidth: animate ? "94%" : "70%", filter: "drop-shadow(0 0 30px rgba(232,163,61,0.4))" }}
      />
    </>
  );
}

export default function DifferentiationSection({ animate = false }: { animate?: boolean }) {
  const stack = useScrollStack(diffs.length, !animate);

  return (
    <section className="py-14">
      <div className="mx-auto px-7" style={{ maxWidth: 1180 }}>
        <span
          className="mono inline-flex items-center gap-2 mb-4"
          style={{ fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--amber)" }}
        >
          <span style={{ opacity: 0.7 }}>§</span> Blatt 05 / Abgrenzung
        </span>
        <h2 style={{ fontSize: "clamp(2rem, 5vw, 3.1rem)", lineHeight: 1.05, marginBottom: 20 }}>
          Dein Zugang.
          <br />
          Deine Regeln.
        </h2>
        <p style={{ color: "var(--warm-grey-dim)", maxWidth: "56ch", fontSize: "1.02rem", lineHeight: 1.7, marginBottom: 32 }}>
          Wir sind keine 08/15-CRM-Firma, die dir ein fertiges Produkt
          verkauft und erwartet, dass du deine Prozesse daran anpasst. Bei
          uns ist es umgekehrt: Wir bauen dein System um deinen Prozess
          herum — mit genau den Funktionen, die dein Geschäft braucht, ohne
          den Ballast, den es nicht braucht.
        </p>

        {stack.staticFallback ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-12">
            {diffs.map((d) => (
              <div key={d.image} className="flex flex-col">
                <DiffCard d={d} />
              </div>
            ))}
          </div>
        ) : (
          <div ref={stack.wrapperRef} className="relative" style={{ height: `${diffs.length * 62}vh` }}>
            <div className="sticky flex flex-col items-center justify-center" style={{ top: "12vh", height: "min(600px, 78vh)" }}>
              <CardStackScrollHint text="Scrolle weiter — wir zeigen dir, was uns unterscheidet." />
              <div className="relative w-full" style={{ maxWidth: 500, height: "100%" }}>
                {diffs.map((d, i) => (
                  <div
                    key={d.image}
                    className="card-stack-slot rounded-2xl p-7 flex flex-col"
                    style={{
                      background: "var(--near-black-2)",
                      boxShadow: "0 0 60px -10px rgba(232,163,61,0.45)",
                      ...getFlyStackSlotStyle(i, stack.continuousIndex, diffs.length),
                    }}
                  >
                    <DiffCard d={d} animate />
                  </div>
                ))}
                <CardStackDots count={diffs.length} index={stack.index} />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
