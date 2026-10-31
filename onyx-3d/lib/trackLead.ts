declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

/*
 * Meta-Pixel-Events. Ohne Cookie-Zustimmung gibt es kein window.fbq, dann
 * passiert hier nichts.
 *
 * Ein `Lead` zählt nur, wenn ein Formular wirklich abgeschickt wurde
 * (Entscheidung Marvin, 09/2026): erst wenn Netlify die Absendung angenommen
 * hat (trackLead nach res.ok in ContactSection, ContactModal,
 * DemoSignupSection). Damit stimmen Facebook-Leads und Netlify überein.
 *
 * WhatsApp-Buttons gibt es auf der Seite nicht mehr (Marvin, 09/2026); an
 * ihrer Stelle steht „Infogespräch vereinbaren“ (Overlay-Thema "info").
 * trackWhatsAppClick bleibt nur für die alten, nicht mehr eingebundenen
 * Komponenten bestehen.
 *
 * Calendly ist kein Lead, nur das Custom-Event `CalendlyClick`.
 *
 * Buttons, die nur zum Formular führen, feuern `ContactClick` und merken sich
 * ihren Namen (noteCtaSource). Wird das Formular danach wirklich abgeschickt,
 * hängt der Name als `content_name` am Lead — so ist in Facebook zu sehen,
 * welcher Button die Anfrage gebracht hat.
 */

/**
 * Schutz gegen Doppelzählung, falls derselbe Vorgang zwei Handler auslöst.
 * 50 ms sind kürzer als jeder menschliche Doppelklick auf zwei Buttons.
 */
let lastFired = 0;

const SOURCE_KEY = "onyx_cta_quelle";

function fbq(...args: unknown[]) {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq(...args);
  }
}

/**
 * Merkt sich, über welchen Button jemand zum Formular gegangen ist, und
 * feuert `ContactClick` (kein Lead). sessionStorage: gilt nur für diesen
 * Besuch.
 */
export function noteCtaSource(name: string) {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(SOURCE_KEY, name);
  } catch {
    // Privater Modus o. Ä. — dann eben ohne Quelle, der Lead zählt trotzdem.
  }
  fbq("trackCustom", "ContactClick", { content_name: name });
}

function takeCtaSource(): string | null {
  if (typeof window === "undefined") return null;
  try {
    const v = sessionStorage.getItem(SOURCE_KEY);
    // Nach dem Auslesen löschen: eine zweite Anfrage im selben Besuch soll
    // nicht nochmal demselben Button gutgeschrieben werden.
    sessionStorage.removeItem(SOURCE_KEY);
    return v;
  } catch {
    return null;
  }
}

/** Lead — nur nach erfolgreich abgeschicktem Formular. */
export function trackLead(quelle?: string) {
  if (typeof window === "undefined" || typeof window.fbq !== "function") return;

  const now = Date.now();
  if (now - lastFired < 50) return;
  lastFired = now;

  const name = quelle ?? takeCtaSource();
  window.fbq("track", "Lead", name ? { content_name: name } : {});
}

/** Nur noch von alten, nicht eingebundenen Komponenten genutzt (keine WhatsApp-Buttons mehr auf der Seite). */
export function trackWhatsAppClick() {
  trackLead("WhatsApp");
  fbq("trackCustom", "WhatsAppClick");
}

/** Calendly-Link geklickt: nur Custom-Event, kein Lead. */
export function trackCalendlyClick() {
  fbq("trackCustom", "CalendlyClick");
}
