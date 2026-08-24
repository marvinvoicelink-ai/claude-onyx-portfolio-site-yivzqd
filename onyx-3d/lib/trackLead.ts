declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

/**
 * Schutz gegen Doppelzaehlung: sollte derselbe Vorgang zwei Wege nehmen
 * (etwa ein Handler am Element und einer am Container), zaehlt Facebook sonst
 * zweimal. 50 ms sind kuerzer als jeder menschliche Doppelklick auf zwei
 * verschiedene Buttons und lang genug, um beide Wege desselben Ereignisses
 * zusammenzufassen.
 */
let lastFired = 0;

/**
 * Feuert das Meta-Pixel-Event `Lead`.
 *
 * Bewusst nur an zwei Stellen aufgerufen:
 * 1. nachdem Netlify eine vollstaendig ausgefuellte Formularabsendung
 *    angenommen hat (ContactSection, SystemFormSection),
 * 2. beim Klick auf einen WhatsApp-Button.
 *
 * Ein Klick auf einen Button, der nur zum Formular fuehrt, ist kein Lead.
 * Bei WhatsApp ist der Klick das Letzte, was die Seite sehen kann — ob die
 * Nachricht danach wirklich abgeschickt wird, laesst sich technisch nicht
 * zurueckverfolgen.
 */
export function trackLead() {
  if (typeof window === "undefined" || typeof window.fbq !== "function") return;

  const now = Date.now();
  if (now - lastFired < 50) return;
  lastFired = now;

  window.fbq("track", "Lead");
}
