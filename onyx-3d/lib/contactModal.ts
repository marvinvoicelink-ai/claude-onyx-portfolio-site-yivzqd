/**
 * Kleiner Vermittler zwischen den vielen CTA-Buttons und dem einen
 * Kontakt-Formular-Overlay (ContactModal). Jeder CTA ruft openContactForm mit
 * seinem Namen auf; das Overlay hoert auf das Event, oeffnet sich und haengt
 * beim Absenden diesen Namen als Quelle an den Lead.
 *
 * Der Klick selbst ist noch kein Lead — er oeffnet nur das Formular. Der Lead
 * feuert erst, wenn Netlify die vollstaendige Absendung annimmt (siehe
 * ContactModal). So taucht in Facebook nur auf, wer wirklich abgeschickt hat.
 */
export const OPEN_CONTACT_EVENT = "onyx:open-contact";

export function openContactForm(source: string) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(OPEN_CONTACT_EVENT, { detail: { source } }));
}
