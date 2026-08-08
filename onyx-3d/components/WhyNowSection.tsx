"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSkipHeavyMotion } from "@/hooks/useSkipHeavyMotion";

gsap.registerPlugin(ScrollTrigger);

const sentences = [
  "Ein eigenes System spart von Tag eins an Kosten — keine Lizenzgebühren, keine Abo-Falle, kein Funktionsumfang, für den du zahlst, aber nie brauchst.",
  "Spezialisiert sind wir auf Handwerk und Bau — wir kommen selbst aus dieser Branche und haben dort die meisten Kunden, etwa für Aufmaß direkt auf der Baustelle statt im Büro nachgetragen.",
  "Aber ein System ohne KI ist in ein paar Jahren nur noch die halbe Miete: Unternehmen, die heute automatisieren, ziehen an allen anderen vorbei.",
  "Deshalb bauen wir dir kein Tool von der Stange, sondern ein System, das von Anfang an mitdenkt — mit KI und Automatisierung eingebaut, zum Festpreis, komplett dir übergeben.",
  "Dazu gehören auch unsere KI-Telefonagenten: Sie nehmen Anrufe entgegen, buchen Termine direkt in deinen Kalender oder rufen selbst aktiv nach, wenn Informationen fehlen — genau wie jedes andere System vollständig dir übergeben.",
  "Und du sprichst dabei nicht mit einem Support-Ticket, sondern direkt mit dem Gründer.",
];

export default function WhyNowSection() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const sentenceRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const { skip } = useSkipHeavyMotion();

  useEffect(() => {
    if (skip) return;

    const ctx = gsap.context(() => {
      sentenceRefs.current.forEach((el) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, y: 16, filter: "blur(6px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              end: "top 58%",
              scrub: 0.4,
            },
          }
        );
      });
    }, wrapRef);

    return () => ctx.revert();
  }, [skip]);

  return (
    <section className="py-16" ref={wrapRef}>
      <div className="mx-auto px-7 text-center" style={{ maxWidth: 780 }}>
        <span
          className="mono block mb-4"
          style={{
            fontSize: 11.5,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--amber)",
          }}
        >
          Warum Onyx
        </span>
        <h2 style={{ fontSize: "clamp(1.7rem, 3.4vw, 2.4rem)", lineHeight: 1.25 }}>
          Warum du mit uns arbeiten solltest —{" "}
          <span className="accent">
            und warum du dein eigenes System jetzt brauchst.
          </span>
        </h2>
        <p style={{ color: "var(--warm-grey-dim)", fontSize: "1.05rem", lineHeight: 1.75, marginTop: 24 }}>
          {sentences.map((sentence, i) => (
            <span
              key={i}
              ref={(el) => {
                sentenceRefs.current[i] = el;
              }}
              style={{ display: "inline", marginRight: "0.35em" }}
            >
              {sentence}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
