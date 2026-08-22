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
Kontaktformular (Netlify Forms) ist der primäre CTA seitenweit. Meta-Pixel
`Lead`-Event feuert **nur bei Klick auf einen Kontakt-Button** — also auf
jeden Button/Link, der das Kontaktformular ist oder dorthin führt:
Formular-Absenden-Button, Nav-CTAs, Hero-CTA, CTABanner, DemoShowcase-CTA,
DemoBooking-CTA. Unabhängig vom Erfolg der jeweiligen Aktion (bewusste
Entscheidung von Marvin, Stand 2026: jeder dieser Klicks soll als Lead in
Facebook erscheinen). Reine UI-Klicks — Akkordeon, Navigation ohne
Kontaktbezug, FAQ, Cookie-Banner — feuern **kein** Lead.

WhatsApp-Buttons feuern zusätzlich zum weiterhin bestehenden
`WhatsAppClick`-Custom-Event ebenfalls `Lead` (gleiche Entscheidung, auf
WhatsApp ausgeweitet) — WhatsApp-Klicks lassen sich technisch nicht bis zum
"Nachricht abgeschickt"-Zeitpunkt zurückverfolgen, zählen aber genauso als
Lead. WhatsApp und Calendly bleiben als sekundäre, schnelle Kontaktwege
bestehen (Calendly hat mit `calendly.event_scheduled` ein eigenes
zuverlässiges Completion-Event, unabhängig vom Lead-Tracking).

## Design-Sprache für Frontends
Für Onyx-eigene Software (Demos, Vorführsysteme, Eigenprodukte) gilt das
Designsystem in `onyx-designsystem/`: Near-Black-Grund, Amber `#E8A33D` als
EINZIGER Akzent, warmes Hellgrau als Text, Glow-Rahmen ums Fenster, Icon-Leiste
links, Karten mit warmer Haarlinie, Mono für Zahlen und Etiketten. Schriften
wie auf der Website: Archivo, Instrument Sans, IBM Plex Mono.
Regeln und Bausteine: `onyx-designsystem/README.md`, Musterseite:
`onyx-designsystem/referenz.html`. Farbwerte NUR im Block „Themenebene“ von
`onyx-dunkel.css` ändern.

Amber bleibt bei Onyx. Systeme, die an Kunden übergeben werden, erben Struktur
und Komponenten, bekommen aber das CI des Kunden — dann wird allein die
Themenebene ersetzt.

## Kunden-Demos im Repo
Vorführ-Software „Wertakte“ für einen Interessenten (Immobiliengutachter,
Oldenburg). Gehört NICHT zur Website onyx-ai.de und ist von deren Stack- und
Nicht-Zielen unten ausgenommen. Zwei Fassungen:

- `wertakte-statisch/` — **die Fassung für den Termin.** Statisch, kein
  Build-Schritt, als ZIP direkt auf Netlify ablegbar (`index.html` liegt an der
  Wurzel). Startet bewusst OHNE Bilder, der Kunde nimmt in der Vorführung
  selbst das erste Foto auf: eigener Reiter „Fotos“ links plus Aufnahme direkt
  in jeder Akte. Daten und Fotos im Browser des Geräts (localStorage +
  IndexedDB). Details in `wertakte-statisch/README.md`.
- `demo-wertakte/` — dieselbe Anwendung als Next.js + TypeScript, lokal per
  `npm run dev`. Zeigt die Architektur, die im echten Kundenprojekt gebaut
  wird (Server Components, Server Actions, später Supabase statt Dateisystem).
  Läuft NICHT als ZIP auf Netlify. Details in `demo-wertakte/README.md`.

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
Separat davon liegt unter `demo-wertakte/` die Vorführ-Software „Wertakte“
für das Verkaufsgespräch mit dem Immobiliengutachter in Oldenburg, gebaut im
Onyx-Designsystem aus `onyx-designsystem/`.
