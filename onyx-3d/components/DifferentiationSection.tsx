"use client";

import Image from "next/image";
import Link from "next/link";
import { useScrollStack } from "@/hooks/useScrollStack";
import { CardStackDots, CardStackScrollHint, CardStackCounter, getFlyStackSlotStyle } from "./CardStackChrome";
import { differentiators as diffs, type Differentiator } from "@/lib/differentiators";

function DiffCard({ d, animate, linked }: { d: Differentiator; animate?: boolean; linked?: boolean }) {
  const card = (
    <div className="text-center">
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
      <p style={{ color: "var(--amber)", fontSize: "1.02rem", lineHeight: 1.5, marginBottom: linked ? 8 : 24 }}>
        {d.subtitle}
      </p>
      {linked && (
        <span
          className="mono inline-flex items-center gap-1.5"
          style={{ fontSize: 12, color: "var(--warm-grey-faint)", marginBottom: 16 }}
        >
          Mehr erfahren
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width={12} height={12}>
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </span>
      )}
      <Image
        src={d.image}
        alt={`${d.title} ${d.subtitle}`}
        width={d.w}
        height={d.h}
        className="w-full h-auto block mx-auto"
        style={{ maxWidth: animate ? "94%" : "70%", filter: "drop-shadow(0 0 30px rgba(232,163,61,0.4))" }}
      />
    </div>
  );

  if (!linked) return card;

  return (
    <Link href={`/fuer-dich#${d.slug}`} className="block alive-hover-card rounded-2xl" style={{ border: "1px solid transparent" }}>
      {card}
    </Link>
  );
}

export default function DifferentiationSection({ animate = false }: { animate?: boolean }) {
  const stack = useScrollStack(diffs.length, !animate);

  return (
    <section className="py-14">
      <div className="mx-auto px-7 text-center" style={{ maxWidth: 1180 }}>
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
        <p className="mx-auto" style={{ color: "var(--warm-grey-dim)", maxWidth: "56ch", fontSize: "1.02rem", lineHeight: 1.7, marginBottom: 32 }}>
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
                <DiffCard d={d} linked />
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
                    <DiffCard d={d} animate linked />
                  </div>
                ))}
                <CardStackDots count={diffs.length} index={stack.index} />
                <CardStackCounter label="Unterschied" index={stack.index} count={diffs.length} />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
