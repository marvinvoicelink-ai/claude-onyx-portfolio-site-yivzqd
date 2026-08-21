"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSkipHeavyMotion } from "@/hooks/useSkipHeavyMotion";
import { problems, type Problem } from "@/lib/problems";

gsap.registerPlugin(ScrollTrigger);

function ProblemRow({ p, imageRight }: { p: Problem; imageRight: boolean }) {
  const media = (
    <div className="relative flex items-center justify-center">
      <Image
        src={p.image}
        alt=""
        width={p.w}
        height={p.h}
        sizes="(min-width: 1024px) 250px, 56vw"
        className="w-full h-auto block"
        style={{ maxWidth: 250, filter: "drop-shadow(0 0 30px rgba(203, 203, 201,0.32))" }}
      />
    </div>
  );
  const body = (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div
          className="flex items-center justify-center rounded-xl"
          style={{
            width: 42,
            height: 42,
            background: "var(--amber-soft)",
            color: "var(--amber)",
            border: "1px solid rgba(232, 163, 61,0.3)",
          }}
        >
          {p.icon}
        </div>
        <span className="mono" style={{ fontSize: 34, fontWeight: 800, color: "var(--warm-grey-faint)" }}>
          {p.num}
        </span>
      </div>
      <h3 style={{ fontSize: "1.3rem", marginBottom: 8 }}>
        {p.title} <span className="accent">{p.highlight}</span>
      </h3>
      <p style={{ color: "var(--warm-grey)", fontSize: "1.05rem", lineHeight: 1.6, marginBottom: 12 }}>{p.desc}</p>
      {/* Der ausführliche Absatz und die Stichpunkte lagen bisher nur auf
          /problem. Neben dem verkleinerten Bild ist hier Platz dafür, und der
          Besucher versteht das Problem, ohne erst weiterklicken zu müssen. */}
      <p style={{ color: "var(--warm-grey-dim)", fontSize: "1rem", lineHeight: 1.75, marginBottom: 16, maxWidth: "48ch" }}>
        {p.detail}
      </p>
      <ul className="flex flex-col gap-2 mb-5">
        {p.bullets.map((b) => (
          <li key={b} className="flex gap-2.5" style={{ fontSize: "0.98rem", color: "var(--warm-grey-dim)", lineHeight: 1.55 }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="var(--amber)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width={15} height={15} style={{ flexShrink: 0, marginTop: 3 }}>
              <path d="M20 6 9 17l-5-5" />
            </svg>
            {b}
          </li>
        ))}
      </ul>
      <span className="mono inline-flex items-center gap-1.5" style={{ fontSize: 12, color: "var(--warm-grey-faint)" }}>
        Mehr erfahren
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width={12} height={12}>
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </span>
    </div>
  );

  return (
    <Link
      href={`/problem#${p.slug}`}
      className="block alive-hover-card rounded-2xl p-5 md:p-6 on-dark silver-rim"
      style={{ background: "var(--near-black-2)", border: "1px solid var(--hairline)" }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-center text-left">
        {imageRight ? (
          <>
            {body}
            {media}
          </>
        ) : (
          <>
            {media}
            {body}
          </>
        )}
      </div>
    </Link>
  );
}

export default function ProblemSection({ blatt }: { blatt?: string }) {
  const chaosImageRef = useRef<HTMLDivElement>(null);
  const { skip } = useSkipHeavyMotion();

  useEffect(() => {
    if (skip) return;

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
  }, [skip]);

  return (
    <section className="py-10">
      <div className="mx-auto px-7 text-center" style={{ maxWidth: 1180 }}>
        <span
          className="mono inline-flex items-center gap-2 mb-4"
          style={{ fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--amber)" }}
        >
          <span style={{ opacity: 0.7 }}>§</span> {blatt ? `Blatt ${blatt} / Ausgangslage` : "Ausgangslage"}
        </span>
        <h2 className="mx-auto" style={{ fontSize: "clamp(1.8rem, 3.6vw, 2.6rem)", maxWidth: "26ch", marginBottom: 12 }}>
          Warum Unternehmen bei uns landen.
        </h2>
        <p
          className="mx-auto"
          style={{ color: "var(--warm-grey-dim)", maxWidth: "56ch", fontSize: "1.02rem", lineHeight: 1.7, marginBottom: 28 }}
        >
          Fast jeder Betrieb, mit dem wir sprechen, erkennt sich in mindestens
          zwei dieser fünf Punkte wieder. Meistens sind es drei. Kommt dir
          etwas davon bekannt vor, weißt du, warum sich ein Gespräch lohnt.
        </p>

        <div className="flex flex-col gap-3">
          {problems.map((p, i) => (
            <ProblemRow key={p.slug} p={p} imageRight={i % 2 === 1} />
          ))}
        </div>

        <div className="mt-6 text-center">
          <h3
            style={{
              fontFamily: "var(--font-archivo), sans-serif",
              fontWeight: 800,
              fontSize: "clamp(1.4rem, 2.8vw, 1.9rem)",
              lineHeight: 1.15,
              color: "var(--warm-grey)",
              marginBottom: 8,
            }}
          >
            Aus Tool-Chaos wird ein System.
          </h3>
          <p
            style={{
              color: "var(--amber)",
              fontSize: "1.05rem",
              marginBottom: 16,
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
              style={{ maxWidth: 620, filter: "drop-shadow(0 0 40px rgba(203, 203, 201,0.32))" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
