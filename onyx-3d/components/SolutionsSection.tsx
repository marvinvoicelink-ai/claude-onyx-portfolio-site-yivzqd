"use client";

import Image from "next/image";
import Link from "next/link";
import { useScrollStack } from "@/hooks/useScrollStack";
import { CardStackDots, CardStackScrollHint, CardStackCounter, getFlyStackSlotStyle } from "./CardStackChrome";
import { offerings as solutions, type Offering } from "@/lib/offerings";

function SolutionCard({ s, animate, linked }: { s: Offering; animate?: boolean; linked?: boolean }) {
  const card = (
    <div className="text-center">
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
      <p style={{ color: "var(--amber)", fontSize: "0.96rem", lineHeight: 1.4, marginBottom: linked ? 8 : 20 }}>
        {s.subtitle}
      </p>
      {linked && (
        <span
          className="mono inline-flex items-center gap-1.5"
          style={{ fontSize: 12, color: "var(--warm-grey-faint)", marginBottom: 12 }}
        >
          Mehr erfahren
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width={12} height={12}>
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </span>
      )}
      <Image
        src={s.image}
        alt={`${s.title} ${s.subtitle}`}
        width={s.w}
        height={s.h}
        className="w-full h-auto block mx-auto"
        style={{ maxWidth: animate ? "94%" : "78%", filter: "drop-shadow(0 0 30px rgba(232,163,61,0.4))" }}
      />
    </div>
  );

  if (!linked) return card;

  return (
    <Link href={`/angebot#${s.slug}`} className="block alive-hover-card rounded-2xl" style={{ border: "1px solid transparent" }}>
      {card}
    </Link>
  );
}

export default function SolutionsSection({ animate = false }: { animate?: boolean }) {
  const stack = useScrollStack(solutions.length, !animate);

  return (
    <section className="py-14">
      <div className="mx-auto px-7 text-center" style={{ maxWidth: 1180 }}>
        <span
          className="mono inline-flex items-center gap-2 mb-4"
          style={{ fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--amber)" }}
        >
          <span style={{ opacity: 0.7 }}>§</span> Blatt 03 / Bauteile
        </span>
        <h2 className="mx-auto" style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", maxWidth: "22ch", marginBottom: 14 }}>
          Ein System, jeder Bereich, den du brauchst.
        </h2>
        <p className="mx-auto" style={{ color: "var(--warm-grey-dim)", maxWidth: "62ch", fontSize: "1.02rem", lineHeight: 1.7, marginBottom: 44 }}>
          Kein Baukasten mit festen Modulen. Was dein System am Ende abdeckt,
          richtet sich nach deinem Prozess — hier ein Überblick, wo
          maßgeschneiderte Systeme typischerweise ansetzen.
        </p>

        {stack.staticFallback ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
            {solutions.map((s) => (
              <div key={s.image} className="flex flex-col">
                <SolutionCard s={s} linked />
              </div>
            ))}
          </div>
        ) : (
          <div ref={stack.wrapperRef} className="relative" style={{ height: `${solutions.length * 62}vh` }}>
            <div className="sticky flex flex-col items-center justify-center" style={{ top: "12vh", height: "min(600px, 78vh)" }}>
              <CardStackScrollHint text="Scrolle weiter — wir zeigen dir, was dein System abdecken kann." />
              <div className="relative w-full" style={{ maxWidth: 500, height: "100%" }}>
                {solutions.map((s, i) => (
                  <div
                    key={s.image}
                    className={`card-stack-slot rounded-2xl p-7 flex flex-col ${i === stack.index ? "hover-lift-home" : ""}`}
                    style={{
                      background: "var(--near-black-2)",
                      boxShadow: "0 0 60px -10px rgba(232,163,61,0.45)",
                      ...getFlyStackSlotStyle(i, stack.continuousIndex, solutions.length),
                    }}
                  >
                    <SolutionCard s={s} animate linked />
                  </div>
                ))}
                <CardStackDots count={solutions.length} index={stack.index} />
                <CardStackCounter label="Lösung" index={stack.index} count={solutions.length} />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
