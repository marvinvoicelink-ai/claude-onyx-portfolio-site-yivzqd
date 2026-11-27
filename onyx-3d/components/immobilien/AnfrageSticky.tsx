"use client";

import { useEffect, useState } from "react";
import { noteCtaSource } from "@/lib/trackLead";

/**
 * Feste Anfrage-Leiste am unteren Rand der Landingpage, nur auf dem Handy.
 * Erscheint, sobald der Hero aus dem Bild ist, und verschwindet, solange das
 * Formular zu sehen ist (dann braucht es den Knopf nicht). Unter dem
 * Cookie-Banner, damit der nicht verdeckt wird – wie StickyCta der Startseite.
 */
export default function AnfrageSticky() {
  const [gescrollt, setGescrollt] = useState(false);
  const [formularSichtbar, setFormularSichtbar] = useState(false);

  useEffect(() => {
    const onScroll = () => setGescrollt(window.scrollY > 560);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const ziel = document.getElementById("anfrage");
    let io: IntersectionObserver | undefined;
    if (ziel && "IntersectionObserver" in window) {
      io = new IntersectionObserver(([e]) => setFormularSichtbar(e.isIntersecting), { threshold: 0.05 });
      io.observe(ziel);
    }
    return () => {
      window.removeEventListener("scroll", onScroll);
      io?.disconnect();
    };
  }, []);

  const zeigen = gescrollt && !formularSichtbar;

  return (
    <div
      className="lg:hidden fixed left-0 right-0 bottom-0 z-[60] px-3 pb-3"
      style={{
        transform: zeigen ? "translateY(0)" : "translateY(120%)",
        transition: "transform 0.3s ease",
        pointerEvents: zeigen ? "auto" : "none",
      }}
      aria-hidden={!zeigen}
    >
      <div
        className="rounded-2xl p-2"
        style={{ background: "rgba(17,17,17,0.92)", backdropFilter: "blur(10px)", border: "1px solid var(--hairline)", boxShadow: "0 -8px 30px rgba(0,0,0,0.5)" }}
      >
        <a
          href="#anfrage-formular"
          tabIndex={zeigen ? 0 : -1}
          onClick={() => noteCtaSource("Landingpage: Sticky")}
          className="flex w-full items-center justify-center gap-2 rounded-xl py-3.5 font-semibold btn-amber"
          style={{ color: "#12141a", fontSize: 15.5 }}
        >
          Erstes Objekt geschenkt – anfragen <span aria-hidden="true">→</span>
        </a>
      </div>
    </div>
  );
}
