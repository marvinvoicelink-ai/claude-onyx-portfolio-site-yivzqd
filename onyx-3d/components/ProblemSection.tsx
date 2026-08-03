"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useScrollStack } from "@/hooks/useScrollStack";
import { useSkipHeavyMotion } from "@/hooks/useSkipHeavyMotion";
import { CardStackDots, CardStackScrollHint, CardStackCounter, getFlyStackSlotStyle } from "./CardStackChrome";
import { problems, type Problem } from "@/lib/problems";

gsap.registerPlugin(ScrollTrigger);

function ProblemCard({ p, linked }: { p: Problem; linked?: boolean }) {
  return (
    <>
      <div className="flex items-center justify-between mb-5">
        <div
          className="flex items-center justify-center rounded-xl"
          style={{
            width: 42,
            height: 42,
            background: "var(--amber-soft)",
            color: "var(--amber)",
            border: "1px solid rgba(232,163,61,0.3)",
          }}
        >
          {p.icon}
        </div>
        <span className="mono" style={{ fontSize: 34, fontWeight: 800, color: "var(--hairline)" }}>
          {p.num}
        </span>
      </div>
      <h3 style={{ fontSize: "1.3rem", marginBottom: 4 }}>
        {p.title} <span className="accent">{p.highlight}</span>
      </h3>
      <p style={{ color: "var(--warm-grey-dim)", fontSize: "0.95rem", marginBottom: linked ? 8 : 18 }}>{p.desc}</p>
      {linked && (
        <span
          className="mono inline-flex items-center gap-1.5"
          style={{ fontSize: 12, color: "var(--warm-grey-faint)", marginBottom: 14 }}
        >
          Mehr erfahren
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width={12} height={12}>
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </span>
      )}
      <Image
        src={p.image}
        alt=""
        width={p.w}
        height={p.h}
        sizes="440px"
        className="w-full h-auto block"
        style={{ filter: "drop-shadow(0 0 26px rgba(232,163,61,0.35))" }}
      />
    </>
  );
}

export default function ProblemSection({ animate = false }: { animate?: boolean }) {
  const stack = useScrollStack(problems.length, !animate);
  const chaosImageRef = useRef<HTMLDivElement>(null);
  const { skip } = useSkipHeavyMotion();

  useEffect(() => {
    if (!animate || skip) return;

    const el = chaosImageRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Flies in from the left as it scrolls into view, then flies out to
      // the right as it scrolls back out — same "enters, later exits the
      // other side" idea as the wheel transitions, just horizontal here.
      gsap.fromTo(
        el,
        { x: "-40%", opacity: 0 },
        {
          x: "0%",
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            end: "top 45%",
            scrub: 0.4,
          },
        }
      );
      gsap.fromTo(
        el,
        { x: "0%", opacity: 1 },
        {
          x: "40%",
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "bottom 55%",
            end: "bottom 5%",
            scrub: 0.4,
          },
        }
      );
    }, chaosImageRef);

    return () => ctx.revert();
  }, [animate, skip]);

  return (
    <section className="py-14">
      <div className="mx-auto px-7 text-center" style={{ maxWidth: 1180 }}>
        <span
          className="mono inline-flex items-center gap-2 mb-4"
          style={{ fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--amber)" }}
        >
          <span style={{ opacity: 0.7 }}>§</span> Blatt 02 / Ausgangslage
        </span>
        <h2 className="mx-auto" style={{ fontSize: "clamp(1.8rem, 3.6vw, 2.6rem)", maxWidth: "20ch", marginBottom: 44 }}>
          Kommt dir das bekannt vor?
        </h2>

        {stack.staticFallback ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {problems.map((p) => (
              <Link
                key={p.num}
                href={`/problem#${p.slug}`}
                className="block alive-hover-card rounded-2xl p-7"
                style={{ background: "var(--near-black-2)", boxShadow: "0 0 60px -10px rgba(232,163,61,0.45)", border: "1px solid transparent" }}
              >
                <ProblemCard p={p} linked />
              </Link>
            ))}
          </div>
        ) : (
          <div ref={stack.wrapperRef} className="relative" style={{ height: `${problems.length * 62}vh` }}>
            <div className="sticky flex flex-col items-center justify-center" style={{ top: "13vh", height: "min(560px, 74vh)" }}>
              <CardStackScrollHint text="Scrolle weiter — wir zeigen dir, welche Probleme es gerade gibt." />
              <div className="relative w-full" style={{ maxWidth: 460, height: "100%" }}>
                {problems.map((p, i) => (
                  <Link
                    key={p.num}
                    href={`/problem#${p.slug}`}
                    className="card-stack-slot rounded-2xl p-6 block"
                    style={{
                      background: "var(--near-black-2)",
                      boxShadow: "0 0 60px -10px rgba(232,163,61,0.45)",
                      ...getFlyStackSlotStyle(i, stack.continuousIndex, problems.length),
                    }}
                  >
                    <ProblemCard p={p} linked />
                  </Link>
                ))}
                <CardStackDots count={problems.length} index={stack.index} />
                <CardStackCounter label="Problem" index={stack.index} count={problems.length} />
              </div>
            </div>
          </div>
        )}

        <div className="mt-14 text-center">
          <h3
            style={{
              fontFamily: "var(--font-archivo), sans-serif",
              fontWeight: 800,
              fontSize: "clamp(1.7rem, 3.6vw, 2.4rem)",
              lineHeight: 1.1,
              color: "#ffffff",
              marginBottom: 8,
            }}
          >
            Aus Tool-Chaos wird ein System.
          </h3>
          <p
            style={{
              color: "var(--amber)",
              fontSize: "1.05rem",
              marginBottom: 24,
            }}
          >
            Eins, das du besitzt.
          </p>
          <div ref={chaosImageRef}>
            <Image
              src="/generated/chaos-to-portal.webp"
              alt="Aus Tool-Chaos wird ein System. Eins, das du besitzt."
              width={1600}
              height={635}
              className="w-full h-auto block mx-auto"
              style={{ filter: "drop-shadow(0 0 40px rgba(232,163,61,0.35))" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
