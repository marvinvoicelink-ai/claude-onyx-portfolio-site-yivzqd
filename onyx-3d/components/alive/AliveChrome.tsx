"use client";

/**
 * Shared building blocks for the "alive" visual variant. Kept separate
 * from the production components so the live site is untouched while this
 * direction is being previewed under /test-alive/*.
 */

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { trackLead } from "@/lib/trackLead";

gsap.registerPlugin(ScrollTrigger);

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Generic viewport-triggered fade + slide-up, once. The load-bearing "life" behind every section. */
function Reveal({
  children,
  delay = 0,
  y = 26,
  className,
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    gsap.set(el, { opacity: 0, y });
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 90%",
      once: true,
      onEnter: () => gsap.to(el, { opacity: 1, y: 0, duration: 0.85, ease: "power2.out", delay }),
    });
    return () => st.kill();
  }, [delay, y]);

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}

/** Numeric KPIs count up from 0 once in view; non-numeric values just get the Reveal fade. */
function StatValue({ value }: { value: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const match = value.match(/^(\d+)(.*)$/);
    if (!match || prefersReducedMotion()) {
      el.textContent = value;
      return;
    }
    const target = parseInt(match[1], 10);
    const suffix = match[2];
    el.textContent = `0${suffix}`;
    const counter = { n: 0 };
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 90%",
      once: true,
      onEnter: () => {
        gsap.to(counter, {
          n: target,
          duration: 1.3,
          ease: "power1.out",
          onUpdate: () => {
            el.textContent = `${Math.round(counter.n)}${suffix}`;
          },
        });
      },
    });
    return () => st.kill();
  }, [value]);

  return (
    <div ref={ref} className="mono" style={{ fontSize: "2rem", fontWeight: 800, color: "var(--amber)", lineHeight: 1.1 }}>
      {value}
    </div>
  );
}

/** Zero-padded index numbers ("01", "02"...) count up from 0 once in view, instead of just appearing. */
function NumberCount({ value, className, style }: { value: string; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const match = value.match(/^(\d+)$/);
    if (!match || prefersReducedMotion()) {
      el.textContent = value;
      return;
    }
    const target = parseInt(match[1], 10);
    const pad = value.length;
    el.textContent = "0".padStart(pad, "0");
    const counter = { n: 0 };
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 92%",
      once: true,
      onEnter: () => {
        gsap.to(counter, {
          n: target,
          duration: 0.9,
          ease: "power1.out",
          onUpdate: () => {
            el.textContent = String(Math.round(counter.n)).padStart(pad, "0");
          },
        });
      },
    });
    return () => st.kill();
  }, [value]);

  return (
    <div ref={ref} className={className} style={style}>
      {value}
    </div>
  );
}

export function AliveEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="mono block mb-4"
      style={{ fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--amber)" }}
    >
      {children}
    </span>
  );
}

export function AliveStatRow({ stats }: { stats: { value: string; label: string }[] }) {
  return (
    <section style={{ background: "var(--near-black-2)", borderBottom: "1px solid var(--hairline)" }}>
      <div className="mx-auto grid grid-cols-1 sm:grid-cols-3" style={{ maxWidth: 1400 }}>
        {stats.map((k, i) => (
          <Reveal key={k.label} delay={i * 0.1} y={18}>
            <div
              className="text-center py-10 px-6"
              style={{ borderLeft: i > 0 ? "1px solid var(--hairline)" : "none" }}
            >
              <StatValue value={k.value} />
              <div style={{ fontSize: "0.92rem", color: "var(--warm-grey-dim)", marginTop: 6 }}>{k.label}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function AliveHairlineGrid({
  eyebrow,
  heading,
  items,
  cols = 2,
  background = "dark",
}: {
  eyebrow: string;
  heading: string;
  items: { num: string; title: string; highlight?: string; desc: string; bullets?: string[]; image?: string }[];
  cols?: 2 | 3;
  background?: "dark" | "light";
}) {
  const light = background === "light";
  const textMain = light ? "#161104" : undefined;
  const textDim = light ? "rgba(22,17,4,0.75)" : "var(--warm-grey-dim)";
  const accentColor = light ? "#8a6a1f" : "var(--amber)";
  const cellBg = light ? "#faf8f3" : "var(--near-black)";
  const gridLine = light ? "rgba(22,17,4,0.12)" : "var(--hairline)";

  return (
    <section className="py-20" style={{ background: light ? "var(--warm-grey)" : "transparent" }}>
      <Reveal className="mx-auto px-7 text-center" style={{ maxWidth: 700, marginBottom: 56 }}>
        <span
          className="mono block mb-4"
          style={{ fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: accentColor }}
        >
          {eyebrow}
        </span>
        <h2 style={{ fontSize: "clamp(1.8rem, 3.6vw, 2.6rem)", color: textMain }}>{heading}</h2>
      </Reveal>
      <div className="mx-auto px-7" style={{ maxWidth: 1180 }}>
        <div
          className={`grid grid-cols-1 ${cols === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}
          style={{ background: gridLine, gap: 1, border: `1px solid ${gridLine}` }}
        >
          {items.map((p, i) => (
            <Reveal key={p.num} delay={Math.min(i * 0.08, 0.4)} className="alive-hover-card p-8" style={{ background: cellBg }}>
              {p.image && (
                <div style={{ width: "100%", maxWidth: 180, aspectRatio: "4 / 3", margin: "0 auto 20px", position: "relative" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.image}
                    alt=""
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      filter: light ? "drop-shadow(0 12px 20px rgba(22,17,4,0.18))" : "drop-shadow(0 0 20px rgba(232,163,61,0.25))",
                    }}
                  />
                </div>
              )}
              <NumberCount value={p.num} className="mono mb-4" style={{ fontSize: 13, color: accentColor }} />
              <h3 style={{ fontSize: "1.2rem", marginBottom: 8, color: textMain }}>
                {p.title} {p.highlight && <span style={{ color: accentColor }}>{p.highlight}</span>}
              </h3>
              <p style={{ color: textDim, fontSize: "0.95rem" }}>{p.desc}</p>
              {p.bullets && (
                <ul className="mt-4 flex flex-col gap-2">
                  {p.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex gap-2.5"
                      style={{ fontSize: "0.9rem", color: textDim, lineHeight: 1.5 }}
                    >
                      <span style={{ color: accentColor }}>—</span>
                      {b}
                    </li>
                  ))}
                </ul>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AliveInvertedStatement({
  eyebrow,
  statement,
  highlight,
  sub,
}: {
  eyebrow: string;
  statement: string;
  highlight: string;
  sub?: string;
}) {
  return (
    <section className="py-24" style={{ background: "var(--warm-grey)" }}>
      <Reveal className="mx-auto px-7 text-center" style={{ maxWidth: 780 }}>
        <span
          className="mono block mb-5"
          style={{ fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "#8a6a1f" }}
        >
          {eyebrow}
        </span>
        <p
          style={{
            fontFamily: "var(--font-archivo), sans-serif",
            fontWeight: 800,
            fontSize: "clamp(1.8rem, 3.8vw, 2.7rem)",
            lineHeight: 1.2,
            color: "#161104",
          }}
        >
          {statement} <span style={{ color: "#8a6a1f" }}>{highlight}</span>
        </p>
        {sub && (
          <p style={{ color: "rgba(22,17,4,0.75)", fontSize: "1.05rem", lineHeight: 1.7, marginTop: 24 }}>{sub}</p>
        )}
      </Reveal>
    </section>
  );
}

export function AliveCtaBand({
  heading,
  sub,
  buttonText = "Kostenloses Erstgespräch sichern",
  href = "/kontakt",
  image,
}: {
  heading: string;
  sub: string;
  buttonText?: string;
  href?: string;
  image?: string;
}) {
  return (
    <section className="py-20">
      <Reveal className="mx-auto px-7" style={{ maxWidth: 1180 }} y={36}>
        <div
          className="relative rounded-2xl px-8 py-14 md:px-16 md:py-20 flex flex-col items-center text-center gap-7 overflow-hidden"
          style={{
            background: image
              ? "var(--near-black-2)"
              : "radial-gradient(circle at 20% 20%, rgba(232,163,61,0.14), transparent 55%), var(--near-black-2)",
            border: "1px solid var(--hairline)",
          }}
        >
          {image && (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image}
                alt=""
                aria-hidden
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "20% 45%" }}
              />
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(0deg, rgba(17,17,17,0.96) 0%, rgba(17,17,17,0.86) 40%, rgba(17,17,17,0.55) 100%)",
                }}
              />
            </>
          )}
          <div className="relative flex flex-col items-center gap-7">
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", maxWidth: "20ch" }}>{heading}</h2>
            <p style={{ color: "var(--warm-grey-dim)", fontSize: "1.02rem" }}>{sub}</p>
            <a
              href={href}
              onClick={trackLead}
              className="inline-flex items-center gap-2.5 rounded-[10px] px-7 py-4 font-semibold btn-amber"
              style={{ background: "var(--amber)", color: "#161104", fontSize: 15.5 }}
            >
              {buttonText}
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export function AliveFaq({
  eyebrow,
  heading,
  faqs,
}: {
  eyebrow: string;
  heading: string;
  faqs: { q: string; a: string }[];
}) {
  return (
    <section className="py-20">
      <div className="mx-auto px-7" style={{ maxWidth: 820 }}>
        <Reveal className="text-center" style={{ marginBottom: 40 }}>
          <AliveEyebrow>{eyebrow}</AliveEyebrow>
          <h2 style={{ fontSize: "clamp(1.8rem, 3.6vw, 2.6rem)" }}>{heading}</h2>
        </Reveal>
        <div>
          {faqs.map((f, i) => (
            <Reveal key={f.q} delay={Math.min(i * 0.07, 0.3)} y={16}>
              <details className="group" style={{ borderBottom: "1px solid var(--hairline)", padding: "22px 0" }}>
                <summary
                  className="flex items-center justify-between gap-4 cursor-pointer list-none"
                  style={{ fontWeight: 700, fontSize: "1.05rem" }}
                >
                  {f.q}
                  <span className="mono flex-shrink-0" style={{ color: "var(--amber)", fontSize: "1.3rem" }}>
                    <span className="group-open:hidden">+</span>
                    <span className="hidden group-open:inline">–</span>
                  </span>
                </summary>
                <p style={{ marginTop: 14, color: "var(--warm-grey-dim)", fontSize: "0.98rem", lineHeight: 1.7, maxWidth: "68ch" }}>
                  {f.a}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AliveTeamGrid({
  eyebrow,
  heading,
  team,
}: {
  eyebrow: string;
  heading: string;
  team: { name: string; role: string; image: string }[];
}) {
  return (
    <section className="py-20">
      <Reveal className="mx-auto px-7 text-center" style={{ maxWidth: 700, marginBottom: 56 }}>
        <AliveEyebrow>{eyebrow}</AliveEyebrow>
        <h2 style={{ fontSize: "clamp(1.8rem, 3.6vw, 2.6rem)" }}>{heading}</h2>
      </Reveal>
      <div className="mx-auto px-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" style={{ maxWidth: 1180 }}>
        {team.map((m, i) => (
          <Reveal
            key={m.name}
            delay={Math.min(i * 0.09, 0.36)}
            className="alive-hover-card rounded-2xl overflow-hidden"
            style={{ background: "var(--near-black-2)", border: "1px solid var(--hairline)" }}
          >
            <div className="relative w-full" style={{ aspectRatio: "4 / 5" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={m.image} alt={m.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} />
            </div>
            <div className="p-5 text-center">
              <div style={{ fontWeight: 700, fontSize: "1.02rem" }}>{m.name}</div>
              <div className="mono" style={{ fontSize: 12.5, color: "var(--amber)", marginTop: 4 }}>{m.role}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function AliveTestimonialWall({
  eyebrow,
  heading,
  quotes,
}: {
  eyebrow: string;
  heading: string;
  quotes: { text: string; name: string; source: string }[];
}) {
  return (
    <section className="py-20">
      <Reveal className="mx-auto px-7 text-center" style={{ maxWidth: 700, marginBottom: 56 }}>
        <AliveEyebrow>{eyebrow}</AliveEyebrow>
        <h2 style={{ fontSize: "clamp(1.8rem, 3.6vw, 2.6rem)" }}>{heading}</h2>
      </Reveal>
      <div className="mx-auto px-7 grid grid-cols-1 md:grid-cols-2 gap-6" style={{ maxWidth: 900 }}>
        {quotes.map((q, i) => (
          <Reveal
            key={`${q.name}-${q.source}`}
            delay={i * 0.12}
            className="alive-hover-card p-7 rounded-2xl"
            style={{ background: "var(--near-black-2)", border: "1px solid var(--hairline)" }}
          >
            <p style={{ fontSize: "0.98rem", lineHeight: 1.65, color: "var(--warm-grey-dim)", fontStyle: "italic" }}>
              &bdquo;{q.text}&ldquo;
            </p>
            <div className="mono mt-5" style={{ fontSize: 12.5, color: "var(--warm-grey-faint)" }}>
              — {q.name}, {q.source}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function AliveComparisonTable({
  eyebrow,
  heading,
  columns,
  rows,
}: {
  eyebrow: string;
  heading: string;
  columns: [string, string];
  rows: { label: string; a: string; b: string }[];
}) {
  return (
    <section className="py-20">
      <Reveal className="mx-auto px-7 text-center" style={{ maxWidth: 700, marginBottom: 48 }}>
        <AliveEyebrow>{eyebrow}</AliveEyebrow>
        <h2 style={{ fontSize: "clamp(1.8rem, 3.6vw, 2.6rem)" }}>{heading}</h2>
      </Reveal>
      <Reveal className="mx-auto px-7" style={{ maxWidth: 900 }} delay={0.1}>
        <div style={{ border: "1px solid var(--hairline)", borderRadius: 8, overflow: "hidden" }}>
          <div
            className="grid grid-cols-3"
            style={{ borderBottom: "1px solid var(--hairline)", background: "var(--near-black-2)" }}
          >
            <div className="mono py-4 px-2 sm:px-5" style={{ fontSize: "clamp(9.5px, 2.6vw, 12px)", color: "var(--warm-grey-faint)" }} />
            <div
              className="mono py-4 px-2 sm:px-5 text-center"
              style={{ fontSize: "clamp(9.5px, 2.6vw, 12px)", lineHeight: 1.4, color: "var(--warm-grey-faint)", textTransform: "uppercase" }}
            >
              {columns[0]}
            </div>
            <div
              className="mono py-4 px-2 sm:px-5 text-center"
              style={{ fontSize: "clamp(9.5px, 2.6vw, 12px)", lineHeight: 1.4, color: "var(--amber)", textTransform: "uppercase", background: "var(--amber-soft)" }}
            >
              {columns[1]}
            </div>
          </div>
          {rows.map((r) => (
            <div key={r.label} className="grid grid-cols-3" style={{ borderBottom: "1px solid var(--hairline)" }}>
              <div className="py-4 px-2 sm:px-5" style={{ fontSize: "clamp(11.5px, 3vw, 13.5px)", color: "var(--warm-grey-dim)" }}>{r.label}</div>
              <div className="py-4 px-2 sm:px-5 text-center" style={{ fontSize: "clamp(11.5px, 3vw, 13.5px)", color: "var(--warm-grey-faint)" }}>{r.a}</div>
              <div className="py-4 px-2 sm:px-5 text-center font-semibold" style={{ fontSize: "clamp(11.5px, 3vw, 13.5px)", background: "var(--amber-soft)" }}>{r.b}</div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

/** Image wipes in left-to-right via clip-path, with a subtle settling zoom — once, in view. */
function ImageWipe({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const inner = innerRef.current;
    if (!el || !inner || prefersReducedMotion()) return;
    gsap.set(el, { clipPath: "inset(0 100% 0 0)" });
    gsap.set(inner, { scale: 1.08 });
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(el, { clipPath: "inset(0 0% 0 0)", duration: 1.1, ease: "power3.out" });
        gsap.to(inner, { scale: 1, duration: 1.3, ease: "power2.out" });
      },
    });
    return () => st.kill();
  }, []);

  return (
    <div ref={ref} style={{ overflow: "hidden" }}>
      <div ref={innerRef} style={{ willChange: "transform" }}>
        {children}
      </div>
    </div>
  );
}

export function AliveCase({
  tag,
  name,
  heading,
  desc,
  image,
  imageRight = false,
  bullets,
  background = "dark",
  logo,
  logoBg = "light",
  framed = false,
}: {
  tag: string;
  name: string;
  heading: string;
  desc: string;
  image: string;
  imageRight?: boolean;
  bullets?: string[];
  background?: "dark" | "light";
  logo?: string;
  logoBg?: "light" | "dark";
  framed?: boolean;
}) {
  const light = background === "light";
  const textDim = light ? "rgba(22,17,4,0.75)" : "var(--warm-grey-dim)";
  const tagColor = light ? "#8a6a1f" : "var(--amber)";
  const tagBg = light ? "rgba(138,106,31,0.12)" : "var(--amber-soft)";
  const tagBorder = light ? "rgba(138,106,31,0.35)" : "rgba(232,163,61,0.3)";
  const headingStyle: React.CSSProperties = light ? { color: "#161104" } : {};

  const media = (
    <ImageWipe>
      <div className="relative" style={{ aspectRatio: "3 / 2" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={name}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "contain",
            filter: light ? "drop-shadow(0 24px 32px rgba(22,17,4,0.18))" : "drop-shadow(0 24px 40px rgba(0,0,0,0.4))",
          }}
        />
      </div>
    </ImageWipe>
  );
  const body = (
    <Reveal className="p-8 md:p-12 flex flex-col justify-center" delay={0.15}>
      <div className="flex items-center gap-3 mb-5">
        <span
          className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mono"
          style={{ fontSize: 11.5, letterSpacing: "0.05em", textTransform: "uppercase", color: tagColor, background: tagBg, border: `1px solid ${tagBorder}` }}
        >
          {tag}
        </span>
        {logo && (
          <span
            className="inline-flex items-center justify-center rounded-lg"
            style={{
              height: 34,
              padding: "0 12px",
              background: logoBg === "light" ? "#fff" : "var(--near-black)",
              border: logoBg === "light" ? "1px solid rgba(22,17,4,0.1)" : "1px solid var(--hairline)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logo} alt={`${name} Logo`} style={{ height: 20, width: "auto", objectFit: "contain" }} />
          </span>
        )}
      </div>
      <h3 style={{ fontSize: "1.3rem", marginBottom: 6, ...headingStyle }}>{name}</h3>
      <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", marginBottom: 18, ...headingStyle }}>{heading}</h2>
      <p style={{ color: textDim, fontSize: "1.02rem", lineHeight: 1.75 }}>{desc}</p>
      {bullets && (
        <ul className="mt-5 flex flex-col gap-2.5">
          {bullets.map((b) => (
            <li key={b} className="flex gap-2.5" style={{ fontSize: "0.94rem", color: textDim, lineHeight: 1.5 }}>
              <span style={{ color: tagColor }}>—</span>
              {b}
            </li>
          ))}
        </ul>
      )}
    </Reveal>
  );
  const grid = (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
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
  );

  return (
    <section className="py-14" style={{ background: light ? "var(--warm-grey)" : "transparent" }}>
      <div className="mx-auto px-7" style={{ maxWidth: 1180 }}>
        {framed ? (
          <div
            className="rounded-2xl p-6 md:p-10"
            style={{ background: "var(--near-black-2)", border: "1px solid var(--hairline)" }}
          >
            {grid}
          </div>
        ) : (
          grid
        )}
      </div>
    </section>
  );
}

const TIMELINE_VB_W = 1000;

export function AliveTimeline({
  eyebrow,
  heading,
  sub,
  steps,
}: {
  eyebrow: string;
  heading: string;
  sub?: string;
  steps: { num: string; title: string; desc: string }[];
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const labelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dotRefs = useRef<(SVGCircleElement | null)[]>([]);
  const numRefs = useRef<(HTMLDivElement | null)[]>([]);

  const margin = 40;
  const span = TIMELINE_VB_W - margin * 2;
  const xs = steps.map((_, i) => margin + (span * i) / Math.max(1, steps.length - 1));

  useEffect(() => {
    const path = pathRef.current;
    const wrap = wrapRef.current;
    if (!path || !wrap) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      path.style.strokeDashoffset = "0";
      dotRefs.current.forEach((d) => d && d.setAttribute("opacity", "1"));
      labelRefs.current.forEach((l) => l && (l.style.opacity = "1"));
      numRefs.current.forEach((el, i) => el && (el.textContent = steps[i].num));
      return;
    }

    const length = path.getTotalLength();
    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;
    dotRefs.current.forEach((d) => d && d.setAttribute("opacity", "0.25"));
    labelRefs.current.forEach((l) => {
      if (l) {
        l.style.opacity = "0.25";
        l.style.transform = "translateY(8px)";
      }
    });
    numRefs.current.forEach((el, i) => {
      if (el) el.textContent = "0".padStart(steps[i].num.length, "0");
    });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrap,
          start: "top 78%",
          end: "bottom 60%",
          scrub: 0.5,
        },
      });
      tl.to(path, { strokeDashoffset: 0, ease: "none" }, 0);
      steps.forEach((s, i) => {
        const at = steps.length > 1 ? (i / (steps.length - 1)) * 0.9 : 0;
        const dot = dotRefs.current[i];
        const label = labelRefs.current[i];
        const numEl = numRefs.current[i];
        if (dot) tl.to(dot, { attr: { opacity: 1 }, ease: "none" }, at);
        if (label) tl.to(label, { opacity: 1, y: 0, ease: "none" }, at);
        const target = parseInt(s.num, 10);
        if (numEl && !Number.isNaN(target)) {
          const pad = s.num.length;
          const counter = { n: 0 };
          tl.to(
            counter,
            {
              n: target,
              ease: "none",
              onUpdate: () => {
                numEl.textContent = String(Math.round(counter.n)).padStart(pad, "0");
              },
            },
            at
          );
        }
      });
    }, wrap);

    return () => ctx.revert();
  }, [steps]);

  return (
    <section className="py-20">
      <div className="mx-auto px-7 text-center" style={{ maxWidth: 700, marginBottom: 56 }}>
        <AliveEyebrow>{eyebrow}</AliveEyebrow>
        <h2 style={{ fontSize: "clamp(1.8rem, 3.6vw, 2.6rem)" }}>{heading}</h2>
        {sub && (
          <p style={{ color: "var(--warm-grey-dim)", marginTop: 16, fontSize: "1.02rem", lineHeight: 1.7 }}>{sub}</p>
        )}
      </div>

      <div ref={wrapRef} className="mx-auto px-7 hidden md:block relative" style={{ maxWidth: 1180, height: 210 }}>
        <svg
          width="100%"
          height="70"
          viewBox={`0 0 ${TIMELINE_VB_W} 70`}
          preserveAspectRatio="none"
          style={{ position: "absolute", top: 62, left: 0 }}
        >
          <line x1={margin} y1={35} x2={TIMELINE_VB_W - margin} y2={35} stroke="rgba(232,163,61,0.15)" strokeWidth={2} />
          <path
            ref={pathRef}
            d={`M ${margin} 35 L ${TIMELINE_VB_W - margin} 35`}
            fill="none"
            stroke="var(--amber)"
            strokeWidth={2}
          />
          {xs.map((x, i) => (
            <circle
              key={i}
              ref={(el) => {
                dotRefs.current[i] = el;
              }}
              cx={x}
              cy={35}
              r={8}
              fill="var(--near-black)"
              stroke="var(--amber)"
              strokeWidth={2}
            />
          ))}
        </svg>
        {steps.map((s, i) => (
          <div
            key={s.num}
            ref={(el) => {
              labelRefs.current[i] = el;
            }}
            className="absolute"
            style={{
              left: `${(xs[i] / TIMELINE_VB_W) * 100}%`,
              transform: "translateX(-50%)",
              top: 0,
              width: 190,
              textAlign: "center",
              transition: "opacity 0.2s linear, transform 0.2s linear",
            }}
          >
            <div
              ref={(el) => {
                numRefs.current[i] = el;
              }}
              className="mono mb-1"
              style={{ fontSize: 12, color: "var(--amber)" }}
            >
              {s.num}
            </div>
            <div style={{ fontWeight: 700, fontSize: "0.94rem", marginBottom: 4 }}>{s.title}</div>
            <p style={{ fontSize: "0.82rem", color: "var(--warm-grey-dim)", lineHeight: 1.4 }}>{s.desc}</p>
          </div>
        ))}
      </div>

      <div className="md:hidden mx-auto px-7 flex flex-col" style={{ maxWidth: 500, marginTop: 8 }}>
        {steps.map((s, i) => (
          <div key={s.num} className="relative flex gap-4" style={{ paddingBottom: i < steps.length - 1 ? 28 : 0 }}>
            {i < steps.length - 1 && (
              <div aria-hidden style={{ position: "absolute", left: 9, top: 22, bottom: -6, width: 2, background: "rgba(232,163,61,0.3)" }} />
            )}
            <span
              style={{
                flexShrink: 0,
                width: 20,
                height: 20,
                borderRadius: "50%",
                border: "2px solid var(--amber)",
                background: "var(--near-black)",
              }}
            />
            <div>
              <div style={{ fontWeight: 700, fontSize: "0.98rem", marginBottom: 3 }}>{s.title}</div>
              <p style={{ fontSize: "0.88rem", color: "var(--warm-grey-dim)", lineHeight: 1.5 }}>{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function AliveMarquee({ items }: { items: string[] }) {
  const track = [...items, ...items];
  return (
    <section style={{ background: "var(--near-black-2)", borderTop: "1px solid var(--hairline)", borderBottom: "1px solid var(--hairline)", padding: "22px 0" }}>
      <div className="overflow-hidden">
        <div className="marquee-track flex" style={{ width: "max-content" }}>
          {track.map((label, i) => (
            <span
              key={i}
              className="mono inline-flex items-center rounded-full px-5 py-2.5 mx-2.5"
              style={{ fontSize: 13.5, whiteSpace: "nowrap", border: "1px solid var(--hairline)", color: "var(--warm-grey-dim)" }}
            >
              {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Static grid of industry examples — sits on the light "Kein Branchen-Fokus" statement instead of a scrolling marquee. */
export function AliveIndustryGrid({ items }: { items: string[] }) {
  return (
    <section className="pb-24" style={{ background: "var(--warm-grey)" }}>
      <Reveal className="mx-auto px-7" style={{ maxWidth: 1040 }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {items.map((label, i) => (
            <div
              key={label}
              className="alive-hover-card flex items-center gap-3 rounded-xl px-5 py-4"
              style={{ background: "#fff", border: "1px solid rgba(22,17,4,0.1)" }}
            >
              <span className="mono" style={{ fontSize: 11.5, color: "#8a6a1f", flexShrink: 0 }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span style={{ fontSize: "0.94rem", color: "#161104", lineHeight: 1.35 }}>{label}</span>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

export type AliveLogoItem = { name: string; src: string; bg?: "light" | "dark" };

/** Client-logo strip directly under the hero: infinite scroll, each logo pops toward the viewer on hover. */
export function AliveLogoMarquee({ items }: { items: AliveLogoItem[] }) {
  const track = [...items, ...items];
  return (
    <section
      style={{
        background: "var(--near-black-2)",
        borderTop: "1px solid var(--hairline)",
        borderBottom: "1px solid var(--hairline)",
        padding: "26px 0",
      }}
    >
      <div className="overflow-hidden alive-logo-perspective">
        <div className="marquee-track flex items-center" style={{ width: "max-content" }}>
          {track.map((item, i) => {
            const light = (item.bg ?? "light") === "light";
            return (
              <div
                key={i}
                className="alive-logo-card flex items-center justify-center mx-3.5 rounded-2xl"
                style={{
                  width: 168,
                  height: 92,
                  padding: "16px 22px",
                  background: light ? "var(--warm-grey)" : "var(--near-black)",
                  border: light ? "1px solid rgba(22,17,4,0.08)" : "1px solid var(--hairline)",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.src}
                  alt={item.name}
                  style={{ width: "100%", height: "100%", objectFit: "contain" }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
