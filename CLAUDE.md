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
Vorführ-Software „Wertakte“ für einen Interessenten in Oldenburg, der
Anlageimmobilien vermittelt (Musterobjekt: REWE-Markt Oldenburg). Gehört NICHT
zur Website onyx-ai.de und ist von deren Stack- und Nicht-Zielen unten
ausgenommen.

Die Software besteht auf Vorgabe des Interessenten aus fünf Teilen, die links
als Bereiche und in jeder Objektakte als nummerierte Reiter liegen:
1 Exposé (Erfassungsbogen, Widerrufsbelehrung, Adressvalidierung bei
Erstkunden, Provisionsvereinbarung — als kurze Schriftstücke auf
Briefpapier zu öffnen und zu drucken, ebenso die Vertraulichkeitserklärung
und die Adressvalidierung aus den Prüfungen beim Kontakt) · 2 Unterlagen und Verträge (Scan oder PDF
direkt zur Zeile ablegbar) · 3 Investoren · 4 Kommunikation (E-Mail, Telefon,
WhatsApp, SMS, Brief, Notiz, revisionssicher mit Beleg-Nr., in Outlook
gespiegelt, einzeln druckbar) · 5 Terminplan mit Eskalationsstufen. Dazu die
Bereiche Fotos und Protokoll.

Alles läuft im System, nichts daneben: verfasst wird über einen zentralen
Dialog (Weg wählen, Objekt und Gegenüber wählen, Anlagen aus der Akte
ankreuzen, optional Wiedervorlage im selben Schritt), aus jedem Vorgang heraus
geht Antworten und Weiterleiten. Ein geöffneter Vorgang zeigt Von und An mit
E-Mail-Adresse, Rufnummer oder Anschrift, bei Mails eine Kopie an die
Archivadresse (dort hängen Outlook und MailStore) und darunter den Nachweis der
Ablage: Beleg-Nr., Zeitpunkt, Prüfsumme über den Inhalt, festgeschrieben.
Drucken öffnet den Beleg auf Briefpapier. Die Anrede ist ein Feld beim Kontakt
und wird nie aus dem Namen geraten. Das Protokoll hält jede Änderung mit
Zeitpunkt und Bearbeiter fest, das Suchfeld sucht über alle Bereiche, und die
Gesamtakte druckt alle fünf Teile samt Journal im Wortlaut als ein Stück.

Der Bereich Kontakte führt alle Beteiligten in einer Liste, getrennt durch
Ordner: Eigentümer (verkaufen), Investoren und Privatkunden (kaufen), Notariat,
Bank. Damit deckt die Demo sowohl große Anleger als auch normale Privatkunden
ab, ohne zwei Personenlisten zu haben.

Jeder Bereich hat oben Ordner mit Zahl (Objekte nach Status, Unterlagen nach
Kategorie und „Offen“, Kontakte nach Rolle, Kommunikation nach
Posteingang/Postausgang und Weg, Termine nach Dringlichkeit, Fotos nach
Kategorie, Protokoll nach Art). Der
gewählte Ordner steht in der Adresszeile.

Der Terminplan beginnt mit einem Monatskalender (Farbe = Dringlichkeit: rot
überfällig oder letzte Stufe, amber in den nächsten Tagen, grau später; ein Tag
angeklickt filtert die Liste darunter, am Handy farbige Punkte statt Titel).
Darunter zeigt er je Wiedervorlage die drei Eskalationsstufen mit Datum;
der erste Knopf führt die aktuelle Stufe aus („Jetzt anrufen“) und öffnet das
Verfassen-Fenster mit dem passenden Weg. In jeder Objektakte steht oben auf
jedem Reiter „Foto aufnehmen“, und in der Objektliste hat jede Zeile und jede
Kachel denselben Knopf; am Handy geht damit direkt die Kamera auf.
Eingetragen wird je Objekt nur Kaufpreis und Jahresmiete; alles Rechenbare —
Faktor, Renditen, geschätzte nicht umlagefähige Kosten, Kaufnebenkosten,
Gesamtinvestition — leitet das System daraus ab, mit Sätzen aus den
Stammdaten. Grundschrift 17 px, Schalter „Große Schrift“ im Kopf für 20 px — die Oberfläche
ist auf einen 66-jährigen Nutzer ausgelegt.

Es gibt genau ein Konto: den Inhaber (Demo: Jens Lange), mit allen Rechten. Im Bereich Verwaltung
pflegt er sein Konto (die Angaben stehen im Briefkopf und als Absender), die
Stammdaten (Objektarten, Foto-Kategorien, Pflichtunterlagen, Eskalationsvorgabe,
Provision) und den Datenbestand (Sicherung als Datei, Zurücksetzen). Konto und
Stammdaten liegen im Datenbestand, nicht im Code.

Zwei Fassungen:

- `wertakte-statisch/` — **die aktuelle Fassung für den Termin.** Statisch,
  kein Build-Schritt, als ZIP direkt auf Netlify ablegbar (`index.html` liegt an
  der Wurzel). Enthält die fünf Teile oben. Startet bewusst OHNE Bilder, der
  Kunde nimmt in der Vorführung selbst das erste Foto auf. Daten und Fotos im
  Browser des Geräts (localStorage + IndexedDB). Details in
  `wertakte-statisch/README.md`.
- `demo-wertakte/` — ältere Fassung als Next.js + TypeScript, noch auf das
  Gutachterwesen zugeschnitten. Zeigt die Architektur, die im echten
  Kundenprojekt gebaut wird (Server Components, Server Actions, später
  Supabase). Läuft NICHT als ZIP auf Netlify.

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
