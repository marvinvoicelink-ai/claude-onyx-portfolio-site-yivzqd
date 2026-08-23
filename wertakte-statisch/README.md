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

Angemeldet ist **Jens Lange**, der Inhaber. Name, Firma und Anschrift stehen im
Briefkopf und als Absender jeder Mail und lassen sich unter **Verwaltung**
ändern.

## Groß und gut lesbar

Die Grundschrift liegt über dem üblichen Maß. Reicht das nicht, schaltet
**A Große Schrift** oben rechts die ganze Oberfläche eine Stufe größer –
Schrift, Knöpfe, Abstände. Die Einstellung bleibt auf dem Gerät gespeichert.

## Ordner in jedem Bereich

Jeder Bereich hat oben eine Reihe Ordner mit Zahl: **Alle**, dann die Ordner
des Bereichs. Ein Klick zeigt nur, was darin liegt, der Stand steht in der
Adresszeile und ist damit verlinkbar.

| Bereich       | Ordner                                                             |
| ------------- | ------------------------------------------------------------------ |
| Objekte       | Akquise · Unterlagen · Exposé in Arbeit · In Vermarktung · Reserviert · Abgeschlossen |
| Unterlagen    | Foto · Lage · Vertrag · Nachweis · Offen                            |
| Kontakte      | Eigentümer · Investor · Privatkunde · Notariat · Bank                |
| Investoren (Akte) | nach Stand der Beteiligung                                      |
| Kommunikation | Posteingang · Postausgang · E-Mail · Telefon · WhatsApp · SMS · Brief · Notiz |
| Termine       | Überfällig · Diese Woche · Später · Erledigt                        |
| Fotos         | Außenansicht · Innenansicht · Gebäudetechnik · Dachfläche · Umgebung |
| Protokoll     | Akte · Unterlage · Investor · Kommunikation · Termin · Foto · Exposé |

## Die fünf Teile

Links in der Leiste stehen die Bereiche, in jeder Objektakte liegen sie
zusätzlich als nummerierte Reiter 1 bis 5.

**1 Exposé.** Erfassungsbogen mit allen Eckdaten. Nur angekreuzte Punkte
wandern ins Exposé, fehlende Angaben lassen sich nicht ankreuzen. Daneben die
drei Prüfungen vor dem Versand: Provisionsvereinbarung, Widerrufsbelehrung,
Adressvalidierung bei Erstkunden. Jede der drei lässt sich mit **Ansehen**
öffnen: dahinter liegt das Schriftstück selbst auf Briefpapier, mit Anschrift
des Gegenübers und Objektbezug, lesbar und druckbar. Die Provisionsvereinbarung
ist ein kurzer Maklervertrag mit Parteien, Provisionssätzen, Laufzeit und
Unterschriftenzeile, die Widerrufsbelehrung enthält das Muster-Widerrufsformular,
die Adressvalidierung ist ein Prüfbogen mit Haken und Ergebnis. Über
„Exposé öffnen“ entsteht das fertige
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
Versand freigegeben und automatisch im Journal protokolliert. Als Interessent
lassen sich Investoren **und Privatkunden** aufs Objekt setzen.

**Kontakte.** Ein eigener Bereich mit allen, mit denen das Büro zu tun hat,
getrennt durch Ordner: **Eigentümer** (verkaufen), **Investoren** und
**Privatkunden** (kaufen), dazu **Notariat** und **Bank**. Jede Karte zeigt
Rolle, Ansprechpartner, Telefon und E-Mail; bei Käufern zusätzlich Suchprofil,
NDA und Adressvalidierung. Ein Klick führt zur Historie mit allen Vorgängen.

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

**5 Termine.** Jede Wiedervorlage ist eine Karte: was zu tun ist, bis wann,
und darunter die drei Eskalationsstufen mit Datum – erledigte durchgestrichen,
die aktuelle amber hervorgehoben („jetzt dran“ bzw. „als Nächstes“). Die
Abstände liest das System aus der hinterlegten Regel, „Stufe 2 nach 1 Tag
Anruf“ heißt einen Tag nach der Frist.

Darunter stehen genau drei Knöpfe. Der erste führt die aktuelle Stufe aus und
heißt entsprechend: **Jetzt anrufen**, **Jetzt E-Mail schreiben**, **Jetzt
Brief schreiben** – er öffnet das Verfassen-Fenster mit dem richtigen Weg,
dem Objekt, dem Gegenüber und dem Betreff. Dazu **Auf Stufe X heben** und
**Erledigt**. Überfällige Punkte stehen rot, die Zeitschiene zeigt fünf
Kalenderwochen.

Oben auf der Seite steht ein **Monatskalender** wie an der Wand: Monat
blättern, „Heute“ springt zurück. Die Farbe sagt, wie dringend es ist – rot
überfällig oder letzte Stufe, amber in den nächsten Tagen, grau später, grün
durchgestrichen erledigt. Ein Klick auf einen Tag zeigt unten nur diesen Tag,
„Ganzen Monat zeigen“ hebt es wieder auf. Am Handy stehen statt der Titel
farbige Punkte unter der Zahl – dieselbe Bedeutung, nur kleiner.

Auf der **Übersicht** steht ganz oben „Das steht jetzt an“ mit denselben
Karten – alles, was überfällig ist oder in den nächsten drei Tagen fällig wird.

**Protokoll.** Eigener Bereich in der linken Leiste. Jede Mail, jedes
Telefonat, jede erhaltene Unterlage, jeder Statuswechsel, jede Eskalation und
jedes Foto stehen mit Zeitpunkt und Bearbeiter darin, nach Objekt und Art
filterbar und als Ganzes druckbar. Einträge lassen sich nicht ändern.

**Gesamtakte.** In jeder Akte oben rechts. Alle fünf Teile als ein Druckstück:
Eckdaten, Unterlagenliste, Investoren, das vollständige Journal mit jedem
Beleg im Wortlaut, Terminplan, Bilder und Protokoll.

**Suche.** Das Feld oben sucht über alles auf einmal: Objekte, Kontakte,
Unterlagen, Vorgänge samt Beleg-Nummer und Text, Termine und Bildbeschriftungen.

**Verwaltung.** Es gibt genau ein Konto: den **Inhaber**. Er sieht alles, darf
alles und ist der Einzige, der etwas verwaltet. Der Bereich zeigt seine neun
Rechte, sein Konto mit allen Absenderdaten (Name, Firma, Anschrift, Telefon,
Mobil, Absenderadresse, Archivadresse, Anmeldung) – diese Angaben stehen im
Briefkopf und in jeder Mail –, die Stammdaten (Objektarten, Foto-Kategorien,
Pflichtunterlagen für neue Objekte, Standard-Eskalationsvorgabe,
Standard-Provision) und den Datenbestand mit **Sicherung als Datei** und
**Zurücksetzen**. Weitere Mitarbeitende mit eingeschränkten Rechten legt im
Kundensystem allein der Inhaber an.

**Fotos.** In **jeder Objektakte steht oben „Foto aufnehmen“** – auf jedem
Reiter, ein Griff. Auf dem Handy öffnet der Knopf direkt die Kamera; das Bild
landet sofort bei diesem Objekt und die Akte springt in den Reiter Fotos.
Dasselbe geht **schon aus der Objektliste heraus**: jede Zeile und jede Kachel
hat rechts einen Knopf **Foto**, ohne dass die Akte vorher geöffnet werden muss.
Dazu
ein eigener Bereich Fotos über alle Objekte und in jeder Akte ein Reiter mit
Galerie, Beschriftung und Kategorie. Jedes Bild erscheint im Exposé und in der
Gesamtakte. „Bilder hochladen“ nimmt vorhandene Dateien, auch mehrere auf
einmal. Beliebig viele Bilder je Objekt. Die Demo startet bewusst ohne Bilder,
das erste Foto macht der Kunde in der Vorführung selbst.

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
10. Reiter 5: eine Wiedervorlage ansehen – drei Stufen mit Datum. **Jetzt
    anrufen** öffnet das Telefonat, **Auf Stufe 3 heben** eskaliert.
11. Ordner zeigen: in Reiter 2 auf **Offen** klicken, in Reiter 4 auf
    **Posteingang**, in Reiter 5 auf **Überfällig**.
12. Oben ins Suchfeld „Erbbau“ tippen: Treffer aus Objekt, Unterlagen, Mails
    und Terminen auf einer Seite.
13. Links **Protokoll**: dieselben Schritte stehen lückenlos darin.
14. In der Akte oben rechts **Gesamtakte**, dann **Drucken**.
15. Links **Verwaltung**: ein Konto, neun Rechte, Stammdaten, Sicherung.
16. **Auf dem Handy** dieselbe Adresse öffnen, ein Objekt antippen, oben
    **Foto aufnehmen** – die Kamera geht direkt auf. Bei Bedarf vorher
    **A Große Schrift** einschalten.

## Auf den Ausgangsstand zurücksetzen

Entwicklerkonsole (F12) öffnen und eingeben:

```
wertakteZuruecksetzen()
```

## Beispieldaten

Drei Objekte, zehn Kontakte (zwei Eigentümer, vier Investoren, zwei
Privatkunden, Notariat, Bank), vierzehn Vorgänge, acht Termine, 45 Unterlagen,
72 Protokolleinträge, keine Fotos. Musterobjekt ist der REWE-Markt Oldenburg
mit allen Zahlen aus dem Erfassungsbogen. Alle Namen, Firmen, Adressen und Zahlen sind erfunden.

## Grenzen dieser Vorführversion

Daten, Fotos und abgelegte Scans liegen im Browser des jeweiligen Geräts, nicht
auf einem Server. Outlook und MailStore sind nicht angebunden, die Kennzeichnung im
Journal zeigt, wo die Anbindung sitzt. Revisionssicherheit ist als Beleg-Nummer,
Zeitstempel, Prüfsumme und Festschreibung abgebildet, ohne Server-Protokoll.
Es gibt genau ein Konto, den Inhaber; weitere Benutzer und abgestufte Rechte
kommen erst im Kundensystem.

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
js/zentrale.js        Verfassen, Suche, Protokoll, Gesamtakte, Ordner, Verwaltung
js/app.js             Router und Ereignisse
netlify.toml          Netlify-Einstellungen
```
