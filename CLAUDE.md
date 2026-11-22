# onyx-ai.de

## Kunde
Onyx.AI (Marvin Weiß-Drumm, Einzelunternehmen, Landau in der Pfalz). Eigene
Portfolio-/Marketing-Site. Ziel: White-Label-Leistung (maßgeschneiderte
Systeme, gebaut & übergeben) als Kern-Angebot klar kommunizieren und direkten,
zuverlässig trackbaren Kontakt erzeugen (Kontaktformular als Haupt-CTA,
Infogespräch/Calendly/E-Mail als sekundäre Kontaktwege).

## Phase
Phase 1: Statisch, kein 3D, keine Scroll-Effekte. Live-Kriterium: Beim
ersten Scroll ist eindeutig erkennbar, was Onyx anbietet (White-Label-Systeme,
gebaut & übergeben) und wie man Kontakt aufnimmt (Formular/Infogespräch/E-Mail).

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

## Kernbotschaft Immobilien (verbindlich, Marvin 21.11.2026)
Für alle Texte an Makler und Bauträger: Startseite, /beispiele, Outreach-Mail
(CRM `lib/outreach/mail.ts`), Anzeigen, Instagram. Überall dasselbe sagen:

1. **Objekt komplett zeigen, vom Rohbau bis fertig:** der Bau im Zeitraffer,
   die Räume mit unserer KI fertig eingerichtet (auch wenn noch leer).
2. **Eigene Website zum Durchgehen:** Käufer gehen am Handy durch jeden Raum
   und sehen alle Daten (Fläche, Zimmer, Grundriss, Lage, Preis).
3. **Unsere Videos machen die Anzeigen interessant:** Sie laufen als Facebook-
   und Instagram-Anzeige bei Menschen, die gerade eine Immobilie suchen.
   Bewegte Bilder vom fertigen Haus bleiben beim Scrollen hängen und werden
   viel genauer angeschaut als Fotos. **Das bringt mehr Anfragen und mehr
   Verkäufe** – diese Kette (Video → Aufmerksamkeit → Anfrage → Verkauf) muss
   überall erkennbar sein.
4. **Die Website ist mehr wert als ein Video:** Das Video in der Anzeige weckt
   das Interesse, durch die Website geht man selbst – wer danach anfragt,
   kennt das Objekt schon.

5. **Warum Anzeigen mit uns funktionieren (Abgrenzung, Marvin 22.11.2026):**
   Die übliche Immobilienanzeige zeigt Fotos und schickt den Klick auf ein
   Portal-Inserat. Bei uns hält schon das Video an, und der Klick landet auf
   einer kompletten 3D-Scrollflug-Website nur für dieses Objekt – wer dort
   durch jeden Raum gegangen ist, fragt ernsthaft an. Dazu: schon im Rohbau
   verkaufen, alles aus einer Hand, Konto und Daten beim Kunden. Formulieren
   als „die übliche Anzeige“, nicht als „nur wir“ (Startseite: `ImmoAnzeigen`).

Kurzform: „Vom Rohbau bis fertig eingerichtet: Käufer gehen am Handy durch
jeden Raum und sehen alle Daten – auf einer eigenen Website pro Objekt.“
Leitsatz Startseite: „Andere zeigen Bilder. Wir zeigen komplette Begehungen.“

Grenzen der Aussage:
- Keine Zahlen („3x mehr Anfragen“), bis es eigene Kampagnen-Zahlen gibt.
  „Mehr Anfragen und mehr Verkäufe“ ja, „garantiert“ oder Prozente nein.
- Nicht „ohne Besichtigung“ versprechen. Richtig: zur Besichtigung kommen
  Käufer, die schon wissen, was sie erwartet.
- Nicht behaupten, wir filtern Wohnungssuchende per Interessen heraus: Bei
  Immobilienanzeigen schränkt Meta die Zielgruppen-Auswahl ein (Sonderkategorie
  Wohnen). Die Anzeige selbst bringt die Suchenden, nicht ein Interessen-Filter.
- Freies Herumlaufen „wie im Spiel“ erst bewerben, wenn eine Demo davon
  existiert. Heute: Scroll-Website, durch die man Raum für Raum geht.
- KI-Bilder immer als „KI-Visualisierung“ kennzeichnen.

## Kontakt & Tracking
Kontaktformular (Netlify Forms) ist der primäre CTA seitenweit; jeder CTA-Button
öffnet ein Formular-Overlay (`ContactModal`, `openContactForm(quelle, thema)`).
Das Meta-Pixel-Event `Lead` feuert **nur, wenn ein Formular wirklich
abgeschickt wurde** (Entscheidung von Marvin, Stand 09/2026 — Facebook-Leads
sollen mit den Netlify-Einträgen übereinstimmen): erst wenn Netlify die
Absendung angenommen hat (`res.ok` in `handleSubmit` von `ContactSection`,
`ContactModal`, `DemoSignupSection`). Ein abgebrochener Versuch oder ein Fehler
zählt nicht.

**Keine WhatsApp-Buttons** mehr auf der Seite (Marvin, 09/2026). Ausnahme: die Anzeigen-Zielseite `/beispiele/` (statisch in `onyx-3d/public/beispiele/`) hat WhatsApp-Knöpfe direkt an Marvin (Marvin, 10/2026). An ihrer
Stelle steht „Infogespräch vereinbaren“: öffnet das Overlay mit Thema `info`
(Telefonnummer Pflicht, Feld „erreichbar“ für die Wunschzeit).

Calendly ist **kein** Lead mehr (Marvin, 09/2026), nur noch das Custom-Event
`CalendlyClick`. Alles liegt in `lib/trackLead.ts`; nirgends sonst wird `fbq`
für Leads aufgerufen.

**Woher der Lead kam.** Buttons, die nur zum Formular führen (Hero, Nav,
Mobilmenü, CTA-Banner, Preise, Gründer-Block, Sticky-CTA, Infogespräch …), feuern nur das
Custom-Event `ContactClick` und hinterlegen per `noteCtaSource()` ihren Namen im
`sessionStorage`. Wird das Formular danach abgeschickt, hängt der Name als
`content_name` am `Lead`. Nach dem Auslesen wird er gelöscht.

Ein Calendly-Embed (mit `calendly.event_scheduled`) ist bewusst **nicht**
eingebaut: die Datenschutzerklärung sagt zu, dass nichts von Calendly
nachgeladen wird. Pixel lädt nur nach Cookie-Zustimmung.

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
