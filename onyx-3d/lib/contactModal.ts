import { noteCtaSource } from "./trackLead";

/**
 * Kleiner Vermittler zwischen den vielen CTA-Buttons und dem einen
 * Kontakt-Formular-Overlay (ContactModal). Jeder CTA ruft openContactForm mit
 * seinem Namen auf; das Overlay hört auf das Event, öffnet sich und hängt
 * beim Absenden diesen Namen als Quelle an den Lead.
 *
 * Der Klick selbst ist noch kein Lead — er öffnet nur das Formular (und
 * feuert das Custom-Event ContactClick). Der Lead feuert erst, wenn Netlify
 * die vollständige Absendung annimmt (siehe ContactModal).
 *
 * `topic` steuert Überschrift und Text im Overlay:
 *  - "objekt":  Vor-Ort-Erfassung mit einem echten Objekt ausprobieren
 *  - "demo":    kostenlose Demo eines eigenen White-Label-Systems
 *  - "general": allgemeine Anfrage
 */
export const OPEN_CONTACT_EVENT = "onyx:open-contact";

export type ContactTopic = "objekt" | "demo" | "general";

export function openContactForm(source: string, topic: ContactTopic = "general") {
  if (typeof window === "undefined") return;
  noteCtaSource(source);
  window.dispatchEvent(new CustomEvent(OPEN_CONTACT_EVENT, { detail: { source, topic } }));
}
