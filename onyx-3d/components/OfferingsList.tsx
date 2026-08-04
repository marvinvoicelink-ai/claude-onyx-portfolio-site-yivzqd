import Image from "next/image";
import Link from "next/link";
import { offerings } from "@/lib/offerings";

/** Editorial row list of offerings on a light section — numbered, with a thumbnail per row, divided by hairlines, each linking to its detail on /angebot. */
export default function OfferingsList() {
  return (
    <section className="py-14" style={{ background: "var(--warm-grey)" }}>
      <div className="mx-auto px-7" style={{ maxWidth: 1180 }}>
        <span
          className="mono inline-flex items-center gap-2 mb-4"
          style={{ fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "#8a6a1f" }}
        >
          <span style={{ opacity: 0.7 }}>§</span> Blatt 03 / Bauteile
        </span>
        <h2 style={{ fontSize: "clamp(1.8rem, 3.6vw, 2.6rem)", maxWidth: "20ch", marginBottom: 44, color: "#161104" }}>
          Ein System, jeder Bereich, den du brauchst.
        </h2>

        <div style={{ borderTop: "1px solid rgba(22,17,4,0.12)" }}>
          {offerings.map((o, i) => (
            <Link
              key={o.slug}
              href={`/angebot#${o.slug}`}
              className="offering-row-light flex items-center justify-between gap-6 py-6"
              style={{ borderBottom: "1px solid rgba(22,17,4,0.12)" }}
            >
              <div className="flex items-center gap-6 min-w-0">
                <span className="mono" style={{ fontSize: 14, color: "rgba(22,17,4,0.35)", flexShrink: 0, width: 20 }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div
                  className="rounded-xl overflow-hidden flex-shrink-0"
                  style={{ width: 64, height: 64, background: "#fff", border: "1px solid rgba(22,17,4,0.08)" }}
                >
                  <div className="relative w-full h-full">
                    <Image src={o.image} alt="" fill sizes="64px" style={{ objectFit: "cover" }} />
                  </div>
                </div>
                <div className="min-w-0">
                  <div style={{ fontWeight: 700, fontSize: "clamp(1.05rem, 1.8vw, 1.25rem)", color: "#161104" }}>{o.title}</div>
                  <div style={{ color: "rgba(22,17,4,0.62)", fontSize: "0.92rem", marginTop: 3 }}>{o.subtitle}</div>
                </div>
              </div>
              <div className="flex items-center gap-4 flex-shrink-0">
                <span className="mono offering-row-light-cta" style={{ fontSize: 12.5, color: "rgba(22,17,4,0.4)", letterSpacing: "0.03em" }}>
                  Mehr erfahren
                </span>
                <span
                  className="offering-row-light-arrow flex items-center justify-center rounded-full"
                  style={{ width: 38, height: 38, border: "1px solid rgba(22,17,4,0.15)", flexShrink: 0 }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="#8a6a1f" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" width={16} height={16}>
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
