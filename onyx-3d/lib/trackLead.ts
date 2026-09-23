declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

/*
 * Meta-Pixel-Events. Ohne Cookie-Zustimmung gibt es kein window.fbq, dann
 * passiert hier nichts.
 *
 * Ein `Lead` zählt nur bei echtem Kontakt:
 *  - Kontaktformular erfolgreich bei Netlify angekommen (trackLead nach res.ok)
 *  - Klick auf einen WhatsApp-Button (trackWhatsApp) — ob die Nachricht in
 *    WhatsApp danach wirklich abgeschickt wird, kann die Website technisch
 *    nicht sehen; der Klick ist der letzte messbare Punkt.
 * Buttons, die nur zum Formular führen, feuern stattdessen das
 * Custom-Event `ContactClick` (trackContactClick) und zählen nicht als Lead.
 */

function fbq(...args: unknown[]) {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq(...args);
  }
}

/** Lead — nur nach erfolgreich abgeschicktem Kontaktformular aufrufen. */
export function trackLead() {
  fbq("track", "Lead");
}

/** WhatsApp-Button geklickt: Lead + Custom-Event WhatsAppClick. */
export function trackWhatsApp() {
  fbq("track", "Lead");
  fbq("trackCustom", "WhatsAppClick");
}

/** Button, der zum Kontaktformular führt — kein Lead, nur zur Auswertung. */
export function trackContactClick() {
  fbq("trackCustom", "ContactClick");
}
