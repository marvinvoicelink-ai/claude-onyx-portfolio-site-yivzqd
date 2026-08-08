import Image from "next/image";
import Link from "next/link";
import { differentiators as diffs, type Differentiator } from "@/lib/differentiators";

function DiffRow({ d, imageRight }: { d: Differentiator; imageRight: boolean }) {
  const media = (
    <div className="relative flex items-center justify-center">
      <Image
        src={d.image}
        alt={`${d.title} ${d.subtitle}`}
        width={d.w}
        height={d.h}
        sizes="(min-width: 1024px) 340px, 68vw"
        className="w-full h-auto block"
        style={{ maxWidth: 340, filter: "drop-shadow(0 0 30px rgba(232,163,61,0.4))" }}
      />
    </div>
  );
  const body = (
    <div>
      <h3
        style={{
          fontFamily: "var(--font-archivo), sans-serif",
          fontWeight: 800,
          fontSize: "clamp(1.4rem, 2.4vw, 1.9rem)",
          lineHeight: 1.15,
          color: "#ffffff",
          marginBottom: 8,
        }}
      >
        {d.title}
      </h3>
      <p style={{ color: "var(--amber)", fontSize: "1.02rem", lineHeight: 1.5, marginBottom: 14 }}>{d.subtitle}</p>
      <ul className="flex flex-col gap-2 mb-5">
        {d.bullets.map((b) => (
          <li key={b} className="flex gap-2.5" style={{ fontSize: "0.94rem", color: "var(--warm-grey-dim)", lineHeight: 1.5 }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="var(--amber)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width={14} height={14} style={{ flexShrink: 0, marginTop: 3 }}>
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
      href={`/fuer-dich#${d.slug}`}
      className="block alive-hover-card rounded-2xl p-6 md:p-8"
      style={{ border: "1px solid transparent" }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center text-left">
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

export default function DifferentiationSection() {
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

        <div className="flex flex-col gap-6">
          {diffs.map((d, i) => (
            <DiffRow key={d.slug} d={d} imageRight={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
