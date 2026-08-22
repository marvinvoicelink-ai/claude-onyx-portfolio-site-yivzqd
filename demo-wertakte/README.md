# Wertakte

Objekt- und Gutachtenverwaltung für ein Immobilien-Sachverständigenbüro.
Vorführversion für das Verkaufsgespräch, gebaut von Onyx.AI.

Der Zuschnitt folgt dem Alltag eines Gutachters mit wenigen, wiederkehrenden
Auftraggebern und vielen Bewertungsobjekten: Akten und Fristen im Griff,
Fotodokumentation direkt beim Ortstermin, Gutachten-Entwurf auf Knopfdruck.

Die Oberfläche folgt dem Onyx-Designsystem „Dunkel/Amber“
(`../onyx-designsystem/`): Near-Black als Grund, Amber als einziger Akzent,
Icon-Leiste links, Glow-Rahmen ums Fenster.

## Starten

```bash
npm install
npm run dev
```

Danach <http://localhost:3000> öffnen.

**Zugang** (auf der Anmeldeseite eingeblendet):

| Feld     | Wert                        |
| -------- | --------------------------- |
| E-Mail   | `gutachter@demo.wertakte.de` |
| Passwort | `ortstermin`                |

## Ablauf für die Vorführung

1. **Anmelden.** Die Zugangsdaten sind vorausgefüllt, ein Klick genügt.
2. **Übersicht.** Eine Frist ist überschritten (rote Zahl, roter Balken links
   in der Zeitschiene), ein Ortstermin steht an. Das ist der Aufhänger: das
   System meldet sich, bevor es eng wird.
3. **Objekte.** Zwischen Liste und Kacheln umschalten, oben in der Kopfzeile
   nach „Wardenburg“ suchen, nach Status oder Auftraggeber filtern.
4. **Akte GA-2026-041** öffnen (Eichenstraße 14). Objektangaben links,
   Fotodokumentation rechts. Status auf „Abgeschlossen“ setzen und zurück.
5. **Foto anklicken**, Beschriftung ändern, speichern. Die Beschriftung wandert
   in den Gutachten-Entwurf.
6. **Gutachten-Entwurf erstellen.** Deckblatt, Objektangaben, nummerierte
   Lichtbilder, offene Stellen für die Wertermittlung. Über „Drucken oder als
   PDF sichern“ kommt ein A4-PDF heraus.
7. **Auf dem Handy** dieselbe Akte öffnen und „Foto aufnehmen“ drücken: die
   Kamera geht auf, das Bild liegt sofort in der Akte.
8. **Objekt anlegen** zeigt, wie ein neuer Auftrag in unter einer Minute steht.

Für Schritt 7 muss das Handy den Rechner erreichen. `npm run dev` gibt dafür
eine Netzwerkadresse aus (`http://192.168.x.x:3000`), im selben WLAN reicht das.

**Vor dem Termin zurücksetzen:**

```bash
npm run demo:reset
```

Setzt Beispieldaten und Fotos auf den Auslieferungsstand zurück und löscht alles,
was in einer früheren Vorführung aufgenommen wurde. Dieselbe Wirkung hat das
Löschen des Ordners `data/`.

## Was drin ist

- **Objekt- und Gutachtenverwaltung.** Adresse, Objekttyp, Auftraggeber,
  Bewertungsanlass, Status, Ortstermin, Abgabefrist, Stichtag, Flächen, Notizen.
  Fortlaufendes Aktenzeichen im Schema `GA-JJJJ-NNN`.
- **Liste und Kacheln.** Liste als dichtes Register, Kacheln mit Titelfoto.
  Volltextsuche in der Kopfzeile plus Filter nach Status und Auftraggeber,
  alles in der Adresszeile und damit verlinkbar.
- **Zeitschiene.** Die laufenden Akten über die nächsten fünf Kalenderwochen,
  Balkenende ist die Abgabefrist, überschrittene Fristen sitzen rot am linken
  Rand.
- **Fotodokumentation.** Beliebig viele Fotos je Objekt. „Foto aufnehmen“ öffnet
  auf dem Handy die Kamera (`capture="environment"`), „Bilder hochladen“ nimmt
  mehrere Dateien auf einmal. Jedes Foto bekommt Beschriftung und Kategorie
  (Außenansicht, Innenraum, Mangel/Schaden, Ausstattung, Umgebung).
- **Auftraggeber.** Kontaktdaten, Notizen und die vollständige Auftragshistorie.
- **Gutachten-Entwurf.** Baut aus Akte und Fotos ein gegliedertes Dokument mit
  Deckblatt, Objektangaben, nummerierter Fotodokumentation und markierten
  offenen Stellen. Druckbar als A4-PDF.
- **Fristen und Termine.** Übersicht mit überschrittenen Fristen und den
  nächsten Ortsterminen.
- **Von überall nutzbar.** Responsiv von 360 px bis Desktop. Am Desktop
  Icon-Leiste links, am Handy Bedienleiste unten in Daumenreichweite.

## Technischer Aufbau

Next.js 15 (App Router, Server Components, Server Actions), TypeScript,
Tailwind CSS 4. Kein Build-Schritt außerhalb von Next, keine externen Dienste.
Die Hausschriften Archivo, Instrument Sans und IBM Plex Mono sind über
Fontsource selbst gehostet, es wird nichts von fremden Servern nachgeladen.

```
src/app/(app)/      Angemeldeter Bereich: Übersicht, Objekte, Auftraggeber
src/app/anmelden/   Anmeldung
src/app/api/foto/   Ausliefern selbst aufgenommener Fotos
src/lib/            Datenzugriff, Auth, Server Actions, Datenmodell, Formate
src/komponenten/    Gemeinsame Bausteine
src/app/onyx-dunkel.css  Kopie des Designsystems (npm run stil:sync)
seed/db.seed.json   Beispieldaten
data/               Laufzeitdaten, wird beim ersten Start erzeugt (nicht im Git)
```

**Daten** liegen in `data/db.json`, hochgeladene Fotos in `data/uploads/`.
Bewusst ohne Datenbankserver, damit die Vorführung überall sofort läuft.
Die Zugriffsfunktionen in `src/lib/db.ts` sind die Stelle, die im Kundenprojekt
gegen Supabase (Postgres in Frankfurt, Auth, Row Level Security, Storage)
getauscht wird.

**Anmeldung** ist ein Demo-Konto mit signiertem Cookie, ohne Rollen. Im
Kundenprojekt übernimmt das Supabase Auth mit Rollen und Rechten, die als
Policies in der Datenbank stehen statt verstreut im Frontend.

**Oberfläche.** `src/app/onyx-dunkel.css` ist eine Kopie aus
`../onyx-designsystem/`. Dort wird geändert, danach `npm run stil:sync`.
`src/app/globals.css` legt die Rollen-Tokens auf Tailwind-Utilities, sonst
steht dort keine Farbe.

## Grenzen dieser Vorführversion

Bewusst nicht enthalten, weil es für die Vorführung nichts zeigt und im
Kundenprojekt anders gelöst wird:

- Kein Mehrbenutzerbetrieb, keine Rollen, keine Rechteverwaltung
- Keine echte Wertermittlung, der Entwurf lässt diese Stellen offen
- Kein Serverbetrieb, keine Sicherung, keine Zugriffsprotokollierung
- Fotos werden unverkleinert abgelegt
- Nur dunkle Darstellung, das ist die Onyx-Handschrift und hier Absicht

## Beispieldaten

Vier Akten aus dem Raum Oldenburg, vier Auftraggeber, elf Fotos. Alle Namen,
Adressen, Aktenzeichen und Kontaktdaten sind erfunden. Die Fotos stammen von
Wikimedia Commons unter freien Lizenzen, Nachweis in
`public/beispiel-fotos/BILDNACHWEIS.md`.
