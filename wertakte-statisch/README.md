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

Die Demo startet **ohne Bilder**. Das ist Absicht: der Kunde nimmt in der
Vorführung selbst das erste Foto auf und sieht, wie es in der Akte landet.

Zwei Wege dorthin:

- **Reiter „Fotos“** in der linken Leiste. Dort wählst du die Akte und die
  Kategorie und nimmst auf oder lädst hoch. Darunter stehen alle Bilder,
  nach Akte gruppiert und filterbar.
- **In der Akte selbst**, im Block Fotodokumentation.

**Foto aufnehmen** öffnet auf dem Handy direkt die Kamera. Das Bild landet
sofort in der gewählten Akte, bekommt Beschriftung und Kategorie und
erscheint im Gutachten-Entwurf als nummeriertes Lichtbild. **Bilder
hochladen** nimmt vorhandene Dateien, auch mehrere auf einmal.

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
5. **Reiter Fotos**: Akte wählen, **Foto aufnehmen** drücken, Bild beschriften.
6. **Gutachten-Entwurf erstellen**: das eben aufgenommene Bild steht dort als
   Lichtbild 1. Dann drucken oder als PDF sichern.
7. **Auf dem Handy** dieselbe Adresse öffnen und dort fotografieren. Das ist
   der Moment, der den Kunden überzeugt.

## Was drin ist

- Objekt- und Gutachtenverwaltung mit fortlaufendem Aktenzeichen, Adresse,
  Objekttyp, Auftraggeber, Bewertungsanlass, Status, Ortstermin, Abgabefrist,
  Wertermittlungsstichtag, Flächen und Notizen
- Übersicht als Liste und als Kacheln mit Titelfoto, Suche und Filter
- Eigener Reiter **Fotos**: aufnehmen oder hochladen, Akte und Kategorie
  wählen, alle Bilder nach Akte gruppiert und filterbar
- Fotodokumentation auch direkt in jeder Akte: beliebig viele Fotos,
  Kamera-Aufnahme, Mehrfach-Upload, Beschriftung und Kategorie je Bild
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
js/seed.js            Beispieldaten (vier Akten, vier Auftraggeber, keine Fotos)
js/format.js          Datums- und Zahlenformate
js/speicher.js        Speicher im Browser
js/bausteine.js       Marken, Zeitschiene, Symbole
js/seiten.js          Alle Seiten
js/app.js             Router und Ereignisse
netlify.toml          Netlify-Einstellungen
```

Alle Beispieldaten sind erfunden. Bilder sind keine enthalten, die kommen in
der Vorführung vom Gerät des Nutzers.
