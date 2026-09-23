"use client";

import { useEffect, useState } from "react";
import { openContactForm } from "@/lib/contactModal";
import type { Lang } from "@/lib/i18n";

const TEXT: Record<Lang, { cta: string; info: string }> = {
  de: { cta: "Objekt ausprobieren", info: "Infogespräch vereinbaren" },
  es: { cta: "Probar con un inmueble", info: "Reservar llamada informativa" },
};

/**
 * Feste Leiste am unteren Rand — nur auf dem Handy, nur nachdem der Hero
 * (mit seinem eigenen CTA) aus dem Bild gescrollt ist. Auf dem Handy landet
 * der meiste Anzeigen-Traffic, und dort ist der naechste Klick sonst weit
 * weg: Objekt-Anfrage und Infogespräch sind so jederzeit einen Daumen entfernt.
 * Unter dem Cookie-Banner (z-index niedriger), damit der nicht verdeckt wird.
 */
export default function StickyCta({ lang = "de" }: { lang?: Lang }) {
  const t = TEXT[lang];
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 640);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="lg:hidden fixed left-0 right-0 bottom-0 z-[60] px-3 pb-3"
      style={{
        transform: show ? "translateY(0)" : "translateY(120%)",
        transition: "transform 0.3s ease",
        pointerEvents: show ? "auto" : "none",
      }}
      aria-hidden={!show}
    >
      <div
        className="flex gap-2 rounded-2xl p-2"
        style={{
          background: "rgba(17,17,17,0.92)",
          backdropFilter: "blur(10px)",
          border: "1px solid var(--hairline)",
          boxShadow: "0 -8px 30px rgba(0,0,0,0.5)",
        }}
      >
        <button
          type="button"
          onClick={() => openContactForm("Sticky-CTA", "objekt")}
          className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl py-3.5 font-semibold btn-amber"
          style={{ background: "var(--amber)", color: "#12141a", fontSize: 15 }}
        >
          {t.cta}
        </button>
        <button
          type="button"
          onClick={() => openContactForm("Sticky-Infogespraech", "info")}
          aria-label={t.info}
          title={t.info}
          className="inline-flex items-center justify-center rounded-xl"
          style={{ width: 52, border: "1px solid var(--hairline)", color: "var(--warm-grey)", background: "transparent" }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" width={21} height={21} aria-hidden="true">
            <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2Z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
