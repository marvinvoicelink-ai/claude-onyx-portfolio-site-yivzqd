"use client";

import { useEffect } from "react";
import { trackLead } from "@/lib/trackLead";

/**
 * Feuert das Meta-Pixel-Event `Lead` bei jedem Klick auf einen Button oder
 * Link — unabhaengig davon, ob die Aktion danach erfolgreich ist. Bewusste
 * Entscheidung von Marvin: der Klick allein zaehlt.
 *
 * Als ein einziger Listener auf dem Dokument statt als Handler an jedem
 * Element: so ist auch alles erfasst, was spaeter dazukommt, und es gibt
 * keine Stelle, an der man den Handler vergessen kann.
 *
 * Ausgenommen ist nur das Cookie-Banner. Dessen Buttons sind keine
 * Kontaktaufnahme, und ohne Zustimmung ist der Pixel ohnehin nicht geladen —
 * ein "Lead" beim Klick auf "Ablehnen" waere reines Rauschen in der Statistik.
 */
export default function GlobalClickLead() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target;
      if (!(target instanceof Element)) return;

      const el = target.closest("button, a, [role='button']");
      if (!el) return;
      if (el.closest("[data-no-lead]")) return;

      trackLead();
    };

    // capture: true, damit das Event auch dann ankommt, wenn ein Handler
    // weiter unten die Weitergabe stoppt.
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
