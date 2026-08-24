# onyx-ai.de

## Kunde
Onyx.AI (Marvin Weiß-Drumm, Einzelunternehmen, Landau in der Pfalz). Eigene
Portfolio-/Marketing-Site. Ziel: White-Label-Leistung (maßgeschneiderte
Systeme, gebaut & übergeben) als Kern-Angebot klar kommunizieren und direkten,
zuverlässig trackbaren Kontakt erzeugen (Kontaktformular als Haupt-CTA,
WhatsApp/Calendly/E-Mail als sekundäre Kontaktwege).

## Phase
Phase 1: Statisch, kein 3D, keine Scroll-Effekte. Live-Kriterium: Beim
ersten Scroll ist eindeutig erkennbar, was Onyx anbietet (White-Label-Systeme,
gebaut & übergeben) und wie man Kontakt aufnimmt (Formular/WhatsApp/E-Mail).

## Stack
Statisches Single-File-HTML (eingebettetes CSS/JS, kein Build-Schritt) ·
Deploy: Netlify (Netlify Forms für das Kontaktformular, kein eigenes
Backend/Server-Code; Formulardaten — Name, E-Mail, Nachricht — werden bei
Netlify verarbeitet, siehe Datenschutzerklärung)

## Design-Tokens
Farben: Near-Black `#111111` (Hintergrund) · Amber `#E8A33D` (Akzent/CTA) ·
Warm Light Grey `#F5F2EC` (Text auf Dunkel)
Fonts: Archivo (Headlines) · Instrument Sans (Body) · IBM Plex Mono
(Labels/Zahlen/Kicker)
Ton: dunkel, reduziert, Tech-Studio, hochwertig. Ansprache durchgängig "du".

## Angebotsmodell (verbindlich für alle Texte)
"Bauen & übergeben" — Onyx entwickelt maßgeschneiderte digitale Systeme
(Dashboards, Portale, interne Tools) im White-Label, übergibt sie vollständig
und zieht sich zurück. Kunde hostet selbst (DSGVO-konform, mit AVV), besitzt
Code und Daten vollständig.

Nie schreiben: "wir betreuen", "laufender Support inklusive", "gehostet bei
uns" o. Ä. — widerspricht dem Modell. White-Label heißt: Kunde besitzt und
hostet selbst, nicht dass Onyx einen gebrandeten Link hostet.

HausManager Pro ist Referenz/Beweis eines gebauten Systems, kein Produkt zum
Kaufen.

## Kontakt & Tracking
Kontaktformular (Netlify Forms) ist der primäre CTA seitenweit. Das
Meta-Pixel-Event `Lead` feuert **nur bei einer echten Kontaktaufnahme**
(Entscheidung von Marvin, Stand 2026 — in Facebook sollen ausschließlich
Leads auftauchen, die sich tatsächlich gemeldet haben). Genau drei Auslöser:

1. **Abgeschicktes Kontaktformular** — erst wenn alle Pflichtfelder ausgefüllt
   sind und Netlify die Absendung angenommen hat (`res.ok` in `handleSubmit`
   von `ContactSection` und `SystemFormSection`). Ein abgebrochener Versuch
   oder ein Fehler beim Absenden zählt nicht.
2. **Klick auf einen WhatsApp-Button** — `trackWhatsAppClick()`, zusätzlich
   zum `WhatsAppClick`-Custom-Event.
3. **Klick auf einen Calendly-Link** — `trackCalendlyClick()`, zusätzlich zum
   `CalendlyClick`-Custom-Event.

Alle drei Auslöser liegen in `lib/trackLead.ts`; nirgends sonst wird `fbq`
für Leads aufgerufen. Alles andere feuert **kein** Lead: reine UI-Klicks
(Akkordeon, FAQ, Cookie-Banner).

**Woher der Lead kam.** Buttons, die nur zum Formular führen — Hero-CTA,
Nav-CTA, Mobilmenü-CTA, CTA-Banner, „Kostenloses Erstgespräch sichern",
„Demo buchen" — feuern beim Klick weiterhin nichts. Sie hinterlegen per
`noteCtaSource()` nur ihren Namen im `sessionStorage`. Wird das Formular
danach wirklich abgeschickt, hängt der Name als `content_name` am
`Lead`-Event, und in Facebook ist zu sehen, welcher Button die Anfrage
gebracht hat. Wer abbricht, taucht nicht auf. Wer ohne CTA-Klick direkt ins
Formular schreibt, erzeugt einen Lead ohne Quelle. WhatsApp- und
Calendly-Leads tragen `WhatsApp` bzw. `Calendly` als Quelle.

`sessionStorage`, nicht `localStorage`: die Zuordnung gilt nur für diesen
Besuch. Nach dem Auslesen wird sie gelöscht, damit eine zweite Anfrage im
selben Besuch nicht nochmal demselben Button gutgeschrieben wird.

Grenze des Messbaren: Ob nach dem Klick wirklich eine WhatsApp-Nachricht
geschrieben oder ein Calendly-Termin gebucht wird, kann die Website nicht
sehen — beides passiert außerhalb der Seite und meldet nichts zurück. Der
Klick ist das letzte messbare Ereignis. Belegbar abgeschickt sind nur die
Formular-Leads.

Genauer ginge Calendly nur über eine Bestätigungsseite: In der Calendly-
Terminart „Redirect to a custom page" auf eine eigene Danke-Seite zeigen
lassen, die dann den Lead feuert — dann zählen ausschließlich wirklich
gebuchte Termine. Erfordert eine Einstellung in Marvins Calendly-Konto.
Ein Calendly-Embed auf der Seite (mit `calendly.event_scheduled`) ist bewusst
**nicht** eingebaut: die Datenschutzerklärung sagt zu, dass nichts von
Calendly nachgeladen wird.

## Nicht-Ziele (Scope-Grenze)
- Kein 3D, keine Scroll-Choreografie, keine WebGL-Effekte in Phase 1
- Keine weiteren Leistungs-Sections (Automatisierung, Voice-Agenten, Shop-UI)
  in Phase 1 — Fokus ausschließlich auf White-Label als Kern-Angebot
- Kein CMS/Framework-Unterbau — einfache statische HTML-Datei bleibt Ziel
- Kein eigenes Formular-Backend/Server-Code — Netlify Forms übernimmt das
  Auffangen der Submits, keine zusätzliche Infrastruktur

## Status / Nächster Schritt
White-Label-Section (Hero, Leistungsblock, Referenz-Card, Abgrenzung, CTAs)
als index.html gebaut, live auf Netlify unter onyx-ai.de. Kontaktformular
(Netlify Forms) als Haupt-CTA ergänzt für zuverlässiges Lead-Tracking.
