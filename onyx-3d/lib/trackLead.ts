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

const SOURCE_KEY = "onyx_cta_quelle";

/**
 * Merkt sich, ueber welchen Button jemand zum Formular gegangen ist.
 *
 * Der Klick selbst ist noch kein Lead — wer nur hinscrollt und abbricht, soll
 * in Facebook nicht auftauchen. Fuellt er das Formular danach aber aus, haengt
 * dieser Name am Lead, und in Facebook ist zu sehen, welcher Button die
 * Anfrage gebracht hat.
 *
 * sessionStorage statt localStorage: die Zuordnung gilt nur fuer diesen
 * Besuch. Kommt jemand Tage spaeter wieder und schickt das Formular ab, soll
 * nicht der Button von damals daran haengen.
 */
export function noteCtaSource(name: string) {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(SOURCE_KEY, name);
  } catch {
    // Privater Modus o. Ae. — dann eben ohne Quelle, der Lead zaehlt trotzdem.
  }
}

function takeCtaSource(): string | null {
  if (typeof window === "undefined") return null;
  try {
    const v = sessionStorage.getItem(SOURCE_KEY);
    // Nach dem Auslesen loeschen: eine zweite Anfrage im selben Besuch soll
    // nicht nochmal demselben Button gutgeschrieben werden.
    sessionStorage.removeItem(SOURCE_KEY);
    return v;
  } catch {
    return null;
  }
}

/**
 * Feuert das Meta-Pixel-Event `Lead`.
 *
 * Bewusst nur an drei Stellen aufgerufen:
 * 1. nachdem Netlify eine vollstaendig ausgefuellte Formularabsendung
 *    angenommen hat (ContactSection, SystemFormSection),
 * 2. beim Klick auf einen WhatsApp-Button,
 * 3. beim Klick auf einen Calendly-Link.
 *
 * Ein Klick auf einen Button, der nur zum Formular fuehrt, ist kein Lead — er
 * hinterlaesst nur seinen Namen (noteCtaSource) und taucht dann als
 * `content_name` am Lead auf, falls das Formular wirklich abgeschickt wird.
 */
export function trackLead(quelle?: string) {
  if (typeof window === "undefined" || typeof window.fbq !== "function") return;

  const now = Date.now();
  if (now - lastFired < 50) return;
  lastFired = now;

  const name = quelle ?? takeCtaSource();
  window.fbq("track", "Lead", name ? { content_name: name } : {});
}

/**
 * Klick auf einen WhatsApp-Button: Lead plus eigenes Ereignis, um beide
 * Wege in Facebook auseinanderhalten zu koennen.
 */
export function trackWhatsAppClick() {
  trackLead("WhatsApp");
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("trackCustom", "WhatsAppClick");
  }
}

/**
 * Klick auf einen Calendly-Link. Wie bei WhatsApp ist der Klick das Letzte,
 * was diese Seite sehen kann — die Terminauswahl passiert auf calendly.com.
 * Genauer ginge es nur ueber eine Bestaetigungsseite, auf die Calendly nach
 * gebuchtem Termin zurueckleitet.
 */
export function trackCalendlyClick() {
  trackLead("Calendly");
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("trackCustom", "CalendlyClick");
  }
}
