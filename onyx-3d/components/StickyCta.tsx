"use client";

import { useEffect, useState } from "react";
import { openContactForm } from "@/lib/contactModal";
import { trackWhatsAppClick } from "@/lib/trackLead";

const WHATSAPP_HREF =
  "https://wa.me/4917632273522?text=Hallo%20Marvin%2C%20ich%20interessiere%20mich%20f%C3%BCr%20eine%20kostenlose%20Demo%20von%20Onyx.";

/**
 * Feste Leiste am unteren Rand — nur auf dem Handy, nur nachdem der Hero
 * (mit seinem eigenen CTA) aus dem Bild gescrollt ist. Auf dem Handy landet
 * der meiste Anzeigen-Traffic, und dort ist der naechste Klick sonst weit
 * weg: der Demo-Button und WhatsApp sind so jederzeit einen Daumen entfernt.
 * Unter dem Cookie-Banner (z-index niedriger), damit der nicht verdeckt wird.
 */
export default function StickyCta() {
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
          onClick={() => openContactForm("Sticky-CTA")}
          className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl py-3.5 font-semibold btn-amber"
          style={{ background: "var(--amber)", color: "#12141a", fontSize: 15 }}
        >
          Kostenlose Demo sichern
        </button>
        <a
          href={WHATSAPP_HREF}
          target="_blank"
          rel="noopener"
          onClick={trackWhatsAppClick}
          aria-label="WhatsApp schreiben"
          className="inline-flex items-center justify-center rounded-xl"
          style={{ width: 52, border: "1px solid var(--hairline)", color: "var(--warm-grey)" }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" width={22} height={22}>
            <path d="M12.04 2c-5.52 0-10 4.48-10 10 0 1.77.46 3.45 1.28 4.9L2 22l5.25-1.38a9.96 9.96 0 0 0 4.79 1.22h.01c5.52 0 10-4.48 10-10s-4.48-10-10-10Zm0 18.17h-.01a8.17 8.17 0 0 1-4.16-1.14l-.3-.18-3.11.82.83-3.03-.19-.31a8.18 8.18 0 0 1-1.26-4.35c0-4.52 3.68-8.2 8.21-8.2 2.19 0 4.25.86 5.8 2.4a8.15 8.15 0 0 1 2.4 5.8c0 4.53-3.68 8.19-8.21 8.19Zm4.5-6.13c-.25-.12-1.46-.72-1.68-.8-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.96-.14.16-.29.18-.53.06-.25-.12-1.04-.38-1.98-1.22-.73-.65-1.23-1.46-1.37-1.7-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.15.16-.25.24-.41.08-.16.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.42-.14-.01-.31-.01-.47-.01-.16 0-.43.06-.66.31-.23.24-.86.84-.86 2.05 0 1.2.88 2.37 1 2.53.12.16 1.74 2.66 4.22 3.73.59.25 1.05.4 1.41.52.59.19 1.13.16 1.55.1.47-.07 1.46-.6 1.67-1.17.2-.58.2-1.07.14-1.17-.06-.11-.22-.17-.47-.29Z" />
          </svg>
        </a>
      </div>
    </div>
  );
}
