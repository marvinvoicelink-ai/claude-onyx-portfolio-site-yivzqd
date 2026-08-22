# Wertakte – Vorführ-Software

Objekt- und Gutachtenverwaltung für ein Immobilien-Sachverständigenbüro.
Statische Anwendung, kein Build-Schritt, keine Server-Einrichtung.

## Auf Netlify stellen

Diese ZIP-Datei auf <https://app.netlify.com/drop> ziehen. Fertig, die Adresse
steht sofort. `index.html` liegt im Wurzelverzeichnis, deshalb funktioniert
das Ablegen direkt.

## Auf dem eigenen Rechner starten

Der Ordner braucht einen kleinen Webserver, ein Doppelklick auf `index.html`
genügt nicht (der Browser sperrt dann den Speicher):

```bash
npx serve .
# oder
python3 -m http.server 4321
```

Dann `http://localhost:4321` öffnen.

## Anmelden

Zugangsdaten sind ausgefüllt, ein Klick auf **Anmelden** genügt.

| Feld     | Wert                         |
| -------- | ---------------------------- |
| E-Mail   | `gutachter@demo.wertakte.de` |
| Passwort | `ortstermin`                 |

## Fotos

In jeder Akte gibt es **Foto aufnehmen**. Auf dem Handy öffnet der Knopf
direkt die Kamera, das Bild landet sofort in der Akte, bekommt eine
Beschriftung und eine Kategorie und erscheint anschließend im
Gutachten-Entwurf als nummeriertes Lichtbild. **Bilder hochladen** nimmt
vorhandene Dateien, auch mehrere auf einmal.

Die Fotos bleiben nach dem Neuladen und nach dem Schließen des Browsers
erhalten.

**Für die Vorführung wichtig:** Aufgenommene Fotos und geänderte Daten liegen
im Browser des jeweiligen Geräts. Wer die Seite auf dem Handy öffnet und dort
fotografiert, sieht diese Bilder auf dem Handy. Auf dem Laptop steht wieder
der Ausgangsstand. Für den Demo-Zweck reicht das: der Kunde probiert es selbst
am eigenen Gerät. Im späteren echten System liegen Daten und Bilder in einer
Datenbank mit Login, dann sieht jedes Gerät denselben Stand.

## Auf den Ausgangsstand zurücksetzen

Vor einem Termin: Entwicklerkonsole des Browsers öffnen (F12) und eingeben:

```
wertakteZuruecksetzen()
```

Das stellt die vier Beispielakten und elf Fotos wieder her und löscht alles,
was in einer früheren Vorführung entstanden ist.

## Ablauf im Gespräch

1. **Anmelden**, ein Klick.
2. **Übersicht**: eine Frist ist überschritten, ein Ortstermin steht an, die
   Zeitschiene zeigt beides über die nächsten fünf Kalenderwochen.
3. **Objekte**: zwischen Liste und Kacheln umschalten, oben nach „Wardenburg“
   suchen, nach Status oder Auftraggeber filtern.
4. **Akte GA-2026-041** öffnen: Objektangaben links, Fotodokumentation rechts,
   Status wechseln.
5. **Foto anklicken**, Beschriftung ändern, speichern.
6. **Gutachten-Entwurf erstellen**, dann drucken oder als PDF sichern.
7. **Auf dem Handy** dieselbe Adresse öffnen, Akte aufrufen, **Foto aufnehmen**
   drücken. Das ist der Moment, der den Kunden überzeugt.

## Was drin ist

- Objekt- und Gutachtenverwaltung mit fortlaufendem Aktenzeichen, Adresse,
  Objekttyp, Auftraggeber, Bewertungsanlass, Status, Ortstermin, Abgabefrist,
  Wertermittlungsstichtag, Flächen und Notizen
- Übersicht als Liste und als Kacheln mit Titelfoto, Suche und Filter
- Fotodokumentation: beliebig viele Fotos je Objekt, Kamera-Aufnahme,
  Mehrfach-Upload, Beschriftung und Kategorie je Bild
- Auftraggeber mit Kontaktdaten, Notizen und vollständiger Auftragshistorie
- Gutachten-Entwurf: gegliedertes A4-Dokument aus Akte und Fotos, druckbar
- Fristen und Ortstermine auf der Übersicht, überschrittene Fristen in Rot
- Läuft auf Laptop und Handy, dunkle Onyx-Oberfläche

## Aufbau

```
index.html            Hülle
app.css               Ergänzungen zum Designsystem
onyx-dunkel.css       Onyx-Designsystem „Dunkel/Amber“
schriften/            Archivo, Instrument Sans, IBM Plex Mono, selbst gehostet
beispiel-fotos/       Beispielbilder, Nachweis in BILDNACHWEIS.md
js/seed.js            Beispieldaten
js/format.js          Datums- und Zahlenformate
js/speicher.js        Speicher im Browser
js/bausteine.js       Marken, Zeitschiene, Symbole
js/seiten.js          Alle Seiten
js/app.js             Router und Ereignisse
netlify.toml          Netlify-Einstellungen
```

Alle Beispieldaten sind erfunden. Die Fotos stammen unter freien Lizenzen von
Wikimedia Commons, Nachweis in `beispiel-fotos/BILDNACHWEIS.md`.
