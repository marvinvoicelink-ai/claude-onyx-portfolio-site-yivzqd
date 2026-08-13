import Image from "next/image";
import Link from "next/link";

const bullets = [
  "Demo passend zu deiner Branche, nicht generisch",
  "Du siehst das System live, keine Blackbox",
  "Erst danach entscheidest du dich für ein Angebot",
];

/** Trust block: a working demo already exists per industry and gets shown live in the free Erstgespräch. */
export default function DemoShowcaseSection() {
  return (
    <section className="py-14">
      <div className="mx-auto px-7" style={{ maxWidth: 1180 }}>
        <div
          className="rounded-2xl p-6 md:p-10"
          style={{ background: "var(--near-black-2)", border: "1px solid var(--hairline)" }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="relative flex items-center justify-center order-1">
              <Image
                src="/generated/system-blueprint.png"
                alt="Beispielhafte Demoversion eines Onyx-Systems"
                width={1200}
                height={896}
                sizes="(min-width: 1024px) 520px, 88vw"
                className="w-full h-auto block"
                style={{ maxWidth: 480, filter: "drop-shadow(0 0 34px rgba(232,163,61,0.35))" }}
              />
            </div>

            <div className="text-left order-2">
              <span
                className="mono inline-flex items-center gap-2 mb-4"
                style={{ fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--amber)" }}
              >
                <span style={{ opacity: 0.7 }}>§</span> Blatt 10 / Dein Erstgespräch
              </span>
              <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", marginBottom: 14 }}>
                Du siehst dein System, bevor du unterschreibst.
              </h2>
              <p style={{ color: "var(--warm-grey-dim)", fontSize: "1.02rem", lineHeight: 1.7, marginBottom: 22, maxWidth: "52ch" }}>
                Für Handwerksbetriebe, Hausverwaltungen und so gut wie jede
                andere Branche haben wir längst eine Demoversion gebaut. Im
                kostenlosen Erstgespräch zeigen wir sie dir live — passend zu
                deinem Bereich, damit du genau weißt, was du kaufst, bevor du
                dich entscheidest.
              </p>

              <ul className="flex flex-col gap-2.5 mb-8">
                {bullets.map((b) => (
                  <li key={b} className="flex gap-2.5" style={{ fontSize: "0.96rem", color: "var(--warm-grey-dim)", lineHeight: 1.5 }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="var(--amber)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width={15} height={15} style={{ flexShrink: 0, marginTop: 3 }}>
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    {b}
                  </li>
                ))}
              </ul>

              <Link
                href="#kontakt"
                className="inline-flex items-center gap-2.5 rounded-[10px] px-6 py-4 font-semibold btn-amber"
                style={{ background: "var(--amber)", color: "#161104", fontSize: 15.5 }}
              >
                Kostenloses Erstgespräch sichern
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width={14} height={14}>
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
