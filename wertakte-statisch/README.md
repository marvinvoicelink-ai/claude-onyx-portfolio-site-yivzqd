# Wertakte – Vorführ-Software

Ein System für die Vermittlung von Anlageimmobilien: Exposé, Unterlagen,
Investoren, die gesamte Korrespondenz, der Terminplan und die Fotos liegen in
einer Akte. Nichts läuft daneben. Statische Anwendung, kein Build-Schritt,
keine Server-Einrichtung.

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
Über **Scan ablegen** kommt das Blatt selbst ins System: PDF oder Foto direkt
zur Zeile, danach lässt es sich öffnen. Kein Ordner mehr im Regal.

**3 Investoren.** Wer auf dem Objekt sitzt, mit Vertraulichkeitserklärung,
Exposé-Versand und Stand. Das System hält den Exposé-Versand zurück, solange
bei einem Erstkunden die Adressvalidierung fehlt. Ist sie erledigt, wird der
Versand freigegeben und automatisch im Journal protokolliert. Der eigene
Bereich „Investoren“ zeigt zusätzlich Suchprofil, Volumen und Faktorgrenze.

**4 Kommunikation.** E-Mail ein und aus, Telefon, WhatsApp, SMS, Brief und
Notiz. Geschrieben wird im System: Weg wählen, Objekt und Gegenüber wählen,
Anlagen aus der Akte ankreuzen, absenden. Auf Wunsch entsteht im selben Schritt
die Wiedervorlage. Jeder Eintrag bekommt Beleg-Nummer und Zeitstempel und ist
danach festgeschrieben.

Geöffnet sieht ein Vorgang aus wie das, was er ist: **Von** und **An** mit
E-Mail-Adresse, beim Telefonat mit Rufnummer, beim Brief mit Anschrift. Jede
ausgehende Mail geht in **Kopie** an die Archivadresse des Büros – das ist die
Stelle, an der Outlook und MailStore hängen. Beim Schreiben stehen Anrede und
Grußformel schon da; die Anrede ist ein Feld beim Kontakt, sie wird nicht aus
dem Namen geraten. Aus jedem Vorgang heraus geht **Antworten** (mit Anrede und
Zitat) und **Weiterleiten**.

Unter jedem Vorgang steht der Nachweis der Ablage: Beleg-Nummer, Zeitpunkt,
Zustand und eine **Prüfsumme** über den Inhalt. Ändert sich am Text etwas,
ändert sich der Wert – so ist sichtbar, dass nichts stillschweigend
nachträglich verändert wurde. **Drucken** öffnet den Beleg auf Briefpapier des
Büros, mit Kopf, Inhalt, Anlagenverzeichnis und diesem Nachweis: kein Papier im
Alltag, aber jede Mail und jedes Telefonat einzeln auf Papier.

**5 Termine.** Wiedervorlagen, Fristen und Termine mit Eskalationsstufen.
Stufe 1 E-Mail, Stufe 2 Anruf, Stufe 3 Eigentümer informieren. Unter jeder
Wiedervorlage steht, ab wann die nächste Stufe fällig ist – die Abstände liest
das System aus der hinterlegten Regel („Stufe 2 nach 3 Tagen Anruf“).
Überfällige Punkte stehen rot, die Zeitschiene zeigt fünf Kalenderwochen.

**Protokoll.** Eigener Bereich in der linken Leiste. Jede Mail, jedes
Telefonat, jede erhaltene Unterlage, jeder Statuswechsel, jede Eskalation und
jedes Foto stehen mit Zeitpunkt und Bearbeiter darin, nach Objekt und Art
filterbar und als Ganzes druckbar. Einträge lassen sich nicht ändern.

**Gesamtakte.** In jeder Akte oben rechts. Alle fünf Teile als ein Druckstück:
Eckdaten, Unterlagenliste, Investoren, das vollständige Journal mit jedem
Beleg im Wortlaut, Terminplan, Bilder und Protokoll.

**Suche.** Das Feld oben sucht über alles auf einmal: Objekte, Kontakte,
Unterlagen, Vorgänge samt Beleg-Nummer und Text, Termine und Bildbeschriftungen.

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
6. Reiter 4: die Mail „Exposé REWE-Markt Oldenburg“ öffnen – Von, An, Kopie
   ans Archiv, Anlagen, darunter Beleg-Nr. und Prüfsumme. **Drucken** zeigt
   sie auf Briefpapier.
7. Reiter 4: **Telefon** wählen, Dauer und Gesprächsnotiz eintragen,
   registrieren. Der Eintrag steht sofort im Journal.
8. Aus demselben Eintrag heraus **Antworten**, Kanal auf **WhatsApp** wechseln,
   Häkchen bei „Wiedervorlage dazu anlegen“, senden.
9. Reiter 2: bei einer offenen Unterlage **Scan ablegen**, danach **Öffnen**.
10. Reiter 5: eine Wiedervorlage eskalieren.
11. Oben ins Suchfeld „Erbbau“ tippen: Treffer aus Objekt, Unterlagen, Mails
    und Terminen auf einer Seite.
12. Links **Protokoll**: dieselben Schritte stehen lückenlos darin.
13. In der Akte oben rechts **Gesamtakte**, dann **Drucken**.
14. **Auf dem Handy** dieselbe Adresse öffnen, Akte, Reiter Fotos,
    **Foto aufnehmen**.

## Auf den Ausgangsstand zurücksetzen

Entwicklerkonsole (F12) öffnen und eingeben:

```
wertakteZuruecksetzen()
```

## Beispieldaten

Drei Objekte, sechs Kontakte, zwölf Vorgänge, sieben Termine, 45 Unterlagen,
72 Protokolleinträge, keine Fotos. Musterobjekt ist der REWE-Markt Oldenburg
mit allen Zahlen aus dem Erfassungsbogen. Alle Namen, Firmen, Adressen und Zahlen sind erfunden.

## Grenzen dieser Vorführversion

Daten, Fotos und abgelegte Scans liegen im Browser des jeweiligen Geräts, nicht
auf einem Server. Outlook und MailStore sind nicht angebunden, die Kennzeichnung im
Journal zeigt, wo die Anbindung sitzt. Revisionssicherheit ist als Beleg-Nummer,
Zeitstempel, Prüfsumme und Festschreibung abgebildet, ohne Server-Protokoll. Kein
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
js/zentrale.js        Verfassen, Suche, Protokoll, Gesamtakte
js/app.js             Router und Ereignisse
netlify.toml          Netlify-Einstellungen
```
