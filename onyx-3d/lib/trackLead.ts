declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

/**
 * Ein Klick auf denselben Button laeuft durch zwei Wege: den globalen
 * Listener in GlobalClickLead und, wo noch vorhanden, den onClick am Element
 * selbst. Ohne Sperre zaehlte Facebook denselben Klick doppelt. 50 ms sind
 * kuerzer als jeder menschliche Doppelklick auf zwei verschiedene Buttons und
 * lang genug, um beide Wege desselben Klicks zusammenzufassen.
 */
let lastFired = 0;

/**
 * Feuert das Meta-Pixel-Event `Lead`. Wird bei jedem Klick auf einen Button
 * oder Link ausgeloest, unabhaengig vom Erfolg der Aktion — bewusste
 * Entscheidung von Marvin: der Klick allein zaehlt als Lead.
 */
export function trackLead() {
  if (typeof window === "undefined" || typeof window.fbq !== "function") return;

  const now = Date.now();
  if (now - lastFired < 50) return;
  lastFired = now;

  window.fbq("track", "Lead");
}
