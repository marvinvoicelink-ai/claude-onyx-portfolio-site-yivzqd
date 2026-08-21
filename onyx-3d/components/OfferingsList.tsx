import Image from "next/image";
import Link from "next/link";
import { offerings } from "@/lib/offerings";

/** Editorial row list of offerings — numbered, with a thumbnail per row, divided by hairlines, each linking to its detail on /angebot. */
export default function OfferingsList({ blatt }: { blatt?: string }) {
  return (
    <section className="py-10">
      <div className="mx-auto px-7" style={{ maxWidth: 1180 }}>
        <span
          className="mono inline-flex items-center gap-2 mb-4"
          style={{ fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--amber)" }}
        >
          <span style={{ opacity: 0.7 }}>§</span> {blatt ? `Blatt ${blatt} / Leistungen` : "Leistungen"}
        </span>
        <h2 style={{ fontSize: "clamp(1.8rem, 3.6vw, 2.6rem)", maxWidth: "22ch", marginBottom: 16 }}>
          Das können wir für dich tun.
        </h2>
        <p style={{ color: "var(--warm-grey-dim)", maxWidth: "58ch", fontSize: "1.02rem", lineHeight: 1.7, marginBottom: 28 }}>
          Sechs Bausteine, aus denen wir Systeme zusammensetzen. Kein Betrieb
          braucht alle sechs, und wir verkaufen dir auch keine, die du nicht
          brauchst. Klick auf einen, dann siehst du im Detail, was
          dahintersteckt.
        </p>

        <div style={{ borderTop: "1px solid var(--hairline)" }}>
          {offerings.map((o, i) => (
            <Link
              key={o.slug}
              href={`/angebot/${o.slug}`}
              className="offering-row flex items-center justify-between gap-3 sm:gap-6 py-5"
              style={{ borderBottom: "1px solid var(--hairline)" }}
            >
              <div className="flex items-center gap-3 sm:gap-6 min-w-0">
                <span className="mono hidden sm:inline" style={{ fontSize: 14, color: "var(--warm-grey-faint)", flexShrink: 0, width: 20 }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div
                  className="rounded-xl overflow-hidden flex-shrink-0 w-[72px] h-[52px] sm:w-[168px] sm:h-[118px] on-dark silver-rim"
                  style={{ background: "var(--near-black-2)", border: "1px solid var(--hairline)" }}
                >
                  <div className="relative w-full h-full">
                    <Image src={o.image} alt="" fill sizes="(min-width: 640px) 168px, 72px" style={{ objectFit: "cover" }} />
                  </div>
                </div>
                <div className="min-w-0">
                  <div style={{ fontWeight: 700, fontSize: "clamp(1.05rem, 1.8vw, 1.25rem)" }}>{o.title}</div>
                  <div className="hidden sm:block" style={{ color: "var(--warm-grey-dim)", fontSize: "0.92rem", marginTop: 3 }}>{o.subtitle}</div>
                </div>
              </div>
              <div className="flex items-center gap-4 flex-shrink-0">
                <span className="mono offering-row-cta hidden sm:inline" style={{ fontSize: 12.5, color: "var(--warm-grey-faint)", letterSpacing: "0.03em" }}>
                  Mehr erfahren
                </span>
                <span
                  className="offering-row-arrow flex items-center justify-center rounded-full w-8 h-8 sm:w-[38px] sm:h-[38px]"
                  style={{ border: "1px solid var(--hairline)", flexShrink: 0 }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="var(--amber)" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" width={16} height={16}>
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
