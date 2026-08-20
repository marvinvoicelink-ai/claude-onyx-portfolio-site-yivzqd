"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { offerings } from "@/lib/offerings";

/**
 * Aufklappbares Verzeichnis der Leistungen, direkt nach dem Header. Zu ist
 * jede Zeile nur Zeichen und Titel, damit man die sechs Bausteine auf einen
 * Blick überfliegen kann. Offen zeigt die Zeile, worum es geht, drei
 * Stichpunkte und den Weg zur Detailseite.
 */
export default function OfferingsAccordion({ blatt }: { blatt?: string }) {
  const [open, setOpen] = useState(0);

  return (
    <section className="py-10">
      <div className="mx-auto px-7" style={{ maxWidth: 1000 }}>
        <span
          className="mono inline-flex items-center gap-2 mb-4"
          style={{ fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--amber)" }}
        >
          <span style={{ opacity: 0.7 }}>§</span> {blatt ? `Blatt ${blatt} / Leistungen` : "Leistungen"}
        </span>
        <h2 style={{ fontSize: "clamp(1.9rem, 3.8vw, 2.7rem)", maxWidth: "20ch", marginBottom: 14 }}>
          Das können wir für dich tun.
        </h2>
        <p style={{ color: "var(--warm-grey-dim)", maxWidth: "58ch", fontSize: "1.02rem", lineHeight: 1.7, marginBottom: 30 }}>
          Sechs Bausteine, aus denen wir Systeme zusammensetzen. Kein Betrieb
          braucht alle sechs. Klapp auf, was dich interessiert.
        </p>

        <div
          className="rounded-2xl overflow-hidden"
          style={{ background: "var(--near-black-2)", border: "1px solid var(--hairline)" }}
        >
          {offerings.map((o, i) => {
            const isOpen = open === i;
            const titlePlain = o.title.replace(/\.$/, "");
            return (
              <div
                key={o.slug}
                style={{ borderTop: i === 0 ? "none" : "1px solid var(--hairline)" }}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center gap-4 px-5 py-5 sm:px-7 text-left"
                  style={{
                    background: isOpen ? "rgba(232, 163, 61,0.06)" : "transparent",
                    transition: "background 0.2s ease",
                  }}
                >
                  <span
                    className="rounded-xl overflow-hidden flex-shrink-0"
                    style={{ width: 52, height: 52, border: "1px solid var(--hairline)", display: "block", position: "relative" }}
                  >
                    <Image src={o.image} alt="" fill sizes="52px" style={{ objectFit: "cover" }} />
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="block" style={{ fontWeight: 700, fontSize: "clamp(1.05rem, 2vw, 1.3rem)", lineHeight: 1.25 }}>
                      {titlePlain}
                    </span>
                    {!isOpen && (
                      <span
                        className="hidden sm:block"
                        style={{ color: "var(--warm-grey-dim)", fontSize: "0.95rem", marginTop: 3 }}
                      >
                        {o.subtitle}
                      </span>
                    )}
                  </span>

                  <span
                    className="flex items-center justify-center rounded-full flex-shrink-0"
                    style={{
                      width: 34,
                      height: 34,
                      border: "1px solid var(--hairline)",
                      color: "var(--amber)",
                      transform: isOpen ? "rotate(45deg)" : "none",
                      transition: "transform 0.25s ease",
                    }}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" width={16} height={16}>
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </button>

                {/* 0fr auf 1fr laesst die Hoehe weich aufgehen, ohne feste Pixelwerte */}
                <div
                  className="grid"
                  style={{
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                    transition: "grid-template-rows 0.3s ease",
                  }}
                >
                  <div style={{ overflow: "hidden" }}>
                    {/* Linker Einzug entspricht Thumbnail plus Abstand, damit der
                        aufgeklappte Text bündig unter dem Titel beginnt. */}
                    <div className="px-5 sm:px-7 pb-6 sm:pl-[96px]">
                      <p style={{ color: "var(--warm-grey-dim)", fontSize: "1rem", lineHeight: 1.75, marginBottom: 16, maxWidth: "62ch" }}>
                        {o.detail}
                      </p>
                      <ul className="flex flex-col gap-2 mb-5">
                        {o.bullets.slice(0, 3).map((b) => (
                          <li key={b} className="flex gap-2.5" style={{ fontSize: "0.98rem", color: "var(--warm-grey-dim)", lineHeight: 1.55 }}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="var(--amber)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width={15} height={15} style={{ flexShrink: 0, marginTop: 3 }}>
                              <path d="M20 6 9 17l-5-5" />
                            </svg>
                            {b}
                          </li>
                        ))}
                      </ul>
                      <Link
                        href={`/angebot/${o.slug}`}
                        className="inline-flex items-center gap-2 rounded-[10px] px-5 py-3 font-semibold btn-amber"
                        style={{ background: "var(--amber)", color: "#161104", fontSize: 14.5 }}
                      >
                        {titlePlain} im Detail
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width={14} height={14}>
                          <path d="M5 12h14M13 6l6 6-6 6" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
