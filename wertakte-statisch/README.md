# Wertakte – Vorführ-Software

Objekt- und Vermarktungsverwaltung für die Vermittlung von Anlageimmobilien.
Statische Anwendung, kein Build-Schritt, keine Server-Einrichtung.

## Auf Netlify stellen

Die ZIP-Datei auf <https://app.netlify.com/drop> ziehen. `index.html` liegt im
Wurzelverzeichnis, deshalb funktioniert das Ablegen direkt.

## Auf dem eigenen Rechner starten

```bash
npx serve .
# oder
python3 -m http.server 4321
```

Dann `http://localhost:4321` öffnen. Ein Doppelklick auf `index.html` genügt
nicht, der Browser sperrt dann den Speicher.

## Anmelden

Zugangsdaten sind ausgefüllt, ein Klick auf **Anmelden** genügt.

| Feld     | Wert                     |
| -------- | ------------------------ |
| E-Mail   | `buero@demo.wertakte.de` |
| Passwort | `ortstermin`             |

## Die fünf Teile

Links in der Leiste stehen die Bereiche, in jeder Objektakte liegen sie
zusätzlich als nummerierte Reiter 1 bis 5.

**1 Exposé.** Erfassungsbogen mit allen Eckdaten. Nur angekreuzte Punkte
wandern ins Exposé, fehlende Angaben lassen sich nicht ankreuzen. Daneben die
drei Prüfungen vor dem Versand: Provisionsvereinbarung, Widerrufsbelehrung,
Adressvalidierung bei Erstkunden. Über „Exposé öffnen“ entsteht das fertige
Dokument mit Deckblatt, Eckdaten, Bildern, Provisionshinweis und
Widerrufsbelehrung, druckbar als PDF.

**2 Unterlagen.** Die fünfzehn Pflichtunterlagen, ohne die kein Exposé gebaut
wird: Fotos außen, Gebäudetechnik und Dachfläche, Flurkarte, Stellplatznachweis,
Strukturdaten, Lageplan, Mietvertrag mit Nachträgen, Grundbuchauszug,
Erbbaurechtsvertrag, Provisionsvereinbarung, Energieausweis,
Nebenkostenabrechnung, Baugenehmigung, Versicherungsnachweis. Je Unterlage
anfordern, als vorhanden markieren, zurücksetzen. Der Balken zeigt den Stand.

**3 Investoren.** Wer auf dem Objekt sitzt, mit Vertraulichkeitserklärung,
Exposé-Versand und Stand. Das System hält den Exposé-Versand zurück, solange
bei einem Erstkunden die Adressvalidierung fehlt. Ist sie erledigt, wird der
Versand freigegeben und automatisch im Journal protokolliert. Der eigene
Bereich „Investoren“ zeigt zusätzlich Suchprofil, Volumen und Faktorgrenze.

**4 Kommunikation.** E-Mail ein und aus, Telefon, WhatsApp, SMS, Brief und
Notiz. Jeder Eintrag bekommt Beleg-Nummer und Zeitstempel und ist danach
festgeschrieben. E-Mails sind als „in Outlook gespiegelt“ gekennzeichnet.
Jeder Vorgang lässt sich einzeln öffnen und ausdrucken: kein Papier im Alltag,
aber alles druckbar.

**5 Termine.** Wiedervorlagen, Fristen und Termine mit Eskalationsstufen.
Stufe 1 E-Mail, Stufe 2 Anruf, Stufe 3 Eigentümer informieren. Überfällige
Punkte stehen rot, die Zeitschiene zeigt fünf Kalenderwochen.

**Fotos.** Eigener Bereich und zusätzlich ein Reiter in jeder Akte.
„Foto aufnehmen“ öffnet auf dem Handy direkt die Kamera, das Bild landet sofort
beim gewählten Objekt, bekommt Beschriftung und Kategorie und erscheint im
Exposé. „Bilder hochladen“ nimmt vorhandene Dateien, auch mehrere auf einmal.
Die Demo startet bewusst ohne Bilder.

## Ablauf im Gespräch

1. **Anmelden**, ein Klick.
2. **Übersicht**: überfällige Wiedervorlagen, Zeitschiene, Journal.
3. **REWE-Markt Oldenburg** öffnen, Reiter 1 bis 5 durchgehen.
4. Im Reiter 1 einen Punkt im Erfassungsbogen abwählen, dann **Exposé öffnen** –
   der Punkt fehlt im Dokument.
5. Reiter 3: bei Bruns steht „Exposé-Versand gesperrt“. Über den Investor die
   Adressvalidierung erledigen, zurück, Versand ist frei und steht im Journal.
6. Reiter 4: einen Anruf erfassen, Eintrag öffnen, **Drucken**.
7. Reiter 5: eine Wiedervorlage eskalieren.
8. **Auf dem Handy** dieselbe Adresse öffnen, Akte, Reiter Fotos,
   **Foto aufnehmen**.

## Auf den Ausgangsstand zurücksetzen

Entwicklerkonsole (F12) öffnen und eingeben:

```
wertakteZuruecksetzen()
```

## Beispieldaten

Drei Objekte, sechs Kontakte, zwölf Vorgänge, sieben Termine, 45 Unterlagen,
keine Fotos. Musterobjekt ist der REWE-Markt Oldenburg mit allen Zahlen aus
dem Erfassungsbogen. Alle Namen, Firmen, Adressen und Zahlen sind erfunden.

## Grenzen dieser Vorführversion

Daten und Fotos liegen im Browser des jeweiligen Geräts, nicht auf einem
Server. Outlook und MailStore sind nicht angebunden, die Kennzeichnung im
Journal zeigt, wo die Anbindung sitzt. Revisionssicherheit ist als Beleg-Nummer,
Zeitstempel und Festschreibung abgebildet, ohne Server-Protokoll. Kein
Mehrbenutzerbetrieb, keine Rollen.

## Aufbau

```
index.html            Hülle
app.css               Ergänzungen zum Designsystem
onyx-dunkel.css       Onyx-Designsystem „Dunkel/Amber“
schriften/            Archivo, Instrument Sans, IBM Plex Mono, selbst gehostet
js/seed.js            Beispieldaten und Pflichtunterlagen
js/format.js          Datums- und Zahlenformate
js/speicher.js        Speicher im Browser
js/bausteine.js       Marken, Eskalation, Zeitschiene, Symbole
js/seiten.js          Alle Seiten und die fünf Reiter
js/app.js             Router und Ereignisse
netlify.toml          Netlify-Einstellungen
```
