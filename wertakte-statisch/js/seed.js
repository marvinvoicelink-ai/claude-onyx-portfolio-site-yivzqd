/* Beispieldaten der Vorfuehrung. Alle Namen, Adressen, Aktenzeichen und
   Kontaktdaten sind erfunden. Beim ersten Start werden sie in den Browser
   uebernommen, danach arbeitet die Anwendung mit dem gespeicherten Stand. */
window.W = window.W || {};
W.SEED = {
  "auftraggeber": [
    {
      "id": "ag_lzo",
      "name": "Landessparkasse zu Oldenburg",
      "typ": "Bank",
      "ansprechpartner": "Frauke Determann, Immobilienbewertung",
      "email": "f.determann@lzo-beispiel.de",
      "telefon": "0441 2303-1174",
      "anschrift": "Berliner Platz 1, 26123 Oldenburg",
      "notizen": "Beleihungswertgutachten nach BelWertV. Abgabe immer als PDF plus zwei Ausfertigungen in Papier. Rückfragen laufen ausschließlich über Frau Determann."
    },
    {
      "id": "ag_ag_olb",
      "name": "Amtsgericht Oldenburg, Abt. Zwangsversteigerung",
      "typ": "Gericht",
      "ansprechpartner": "Geschäftsstelle 4 K",
      "email": "poststelle@ag-ol-beispiel.niedersachsen.de",
      "telefon": "0441 220-2417",
      "anschrift": "Elisabethstraße 7, 26135 Oldenburg",
      "notizen": "Gerichtlich bestellte Gutachten. Fristverlängerung nur schriftlich und vor Fristablauf. Aktenzeichen des Gerichts stets im Deckblatt führen."
    },
    {
      "id": "ag_oevo",
      "name": "Öffentliche Versicherung Oldenburg",
      "typ": "Versicherung",
      "ansprechpartner": "Meike Ostendorf, Schadenregulierung Gewerbe",
      "email": "m.ostendorf@oevo-beispiel.de",
      "telefon": "0441 2228-940",
      "anschrift": "Staugraben 11, 26122 Oldenburg",
      "notizen": "Schadensgutachten nach Sturm- und Leitungswasserereignissen. Fotodokumentation wird vollständig mit angefordert, jedes Bild mit Beschriftung."
    },
    {
      "id": "ag_lammers",
      "name": "Hinrich Lammers",
      "typ": "Privatperson",
      "ansprechpartner": "Hinrich Lammers",
      "email": "h.lammers@beispiel.de",
      "telefon": "0170 4482913",
      "anschrift": "Am Rosenkamp 7, 26160 Bad Zwischenahn",
      "notizen": "Marktwertermittlung im Rahmen einer Erbauseinandersetzung. Erreichbar werktags ab 16 Uhr."
    }
  ],
  "objekte": [
    {
      "id": "obj_041",
      "aktenzeichen": "GA-2026-041",
      "strasse": "Eichenstraße 14",
      "plz": "26131",
      "ort": "Oldenburg",
      "objekttyp": "Einfamilienhaus",
      "auftraggeberId": "ag_ag_olb",
      "bewertungsanlass": "Verkehrswertgutachten",
      "status": "in_bearbeitung",
      "ortstermin": "2026-08-12T09:30",
      "frist": "2026-09-04",
      "stichtag": "2026-08-12",
      "baujahr": "1968",
      "wohnflaeche": "142",
      "grundstuecksflaeche": "640",
      "notizen": "Teilungsversteigerung, gerichtliches Aktenzeichen 4 K 118/26. Ortstermin am 12.08. durchgeführt, Eigentümerin anwesend. Feuchtigkeit im Sockelbereich der Südwand aufgenommen, Ursache noch zu klären. Bodenrichtwert und Grundbuchauszug liegen vor.",
      "angelegtAm": "2026-07-28"
    },
    {
      "id": "obj_038",
      "aktenzeichen": "GA-2026-038",
      "strasse": "Bremer Straße 88",
      "plz": "26135",
      "ort": "Oldenburg",
      "objekttyp": "Mehrfamilienhaus",
      "auftraggeberId": "ag_lzo",
      "bewertungsanlass": "Beleihungswertgutachten",
      "status": "in_bearbeitung",
      "ortstermin": "2026-08-06T14:00",
      "frist": "2026-08-20",
      "stichtag": "2026-08-06",
      "baujahr": "1994",
      "wohnflaeche": "612",
      "grundstuecksflaeche": "1180",
      "notizen": "Zwölf Wohneinheiten, sechs Vollgeschosse, Aufgang A und B. Mieterliste vom 31.07. liegt vor, zwei Einheiten leerstehend. Ertragswertverfahren nach BelWertV. Fristverlängerung bei Frau Determann angefragt, Antwort steht aus.",
      "angelegtAm": "2026-07-15"
    },
    {
      "id": "obj_044",
      "aktenzeichen": "GA-2026-044",
      "strasse": "Am Rosenkamp 7",
      "plz": "26160",
      "ort": "Bad Zwischenahn",
      "objekttyp": "Reihenmittelhaus",
      "auftraggeberId": "ag_lammers",
      "bewertungsanlass": "Marktwertermittlung",
      "status": "offen",
      "ortstermin": "2026-08-26T10:30",
      "frist": "2026-09-18",
      "stichtag": null,
      "baujahr": "2004",
      "wohnflaeche": "118",
      "grundstuecksflaeche": "210",
      "notizen": "Erbauseinandersetzung unter drei Geschwistern. Ortstermin am 26.08. bestätigt, Schlüssel beim Nachbarn Nr. 9. Unterlagen zur Wohnflächenberechnung vom Auftraggeber angekündigt.",
      "angelegtAm": "2026-08-11"
    },
    {
      "id": "obj_029",
      "aktenzeichen": "GA-2026-029",
      "strasse": "Industriestraße 3",
      "plz": "26203",
      "ort": "Wardenburg",
      "objekttyp": "Gewerbeobjekt",
      "auftraggeberId": "ag_oevo",
      "bewertungsanlass": "Schadensgutachten",
      "status": "abgeschlossen",
      "ortstermin": "2026-06-18T08:00",
      "frist": "2026-07-10",
      "stichtag": "2026-06-18",
      "baujahr": "1987",
      "wohnflaeche": "1240",
      "grundstuecksflaeche": "3400",
      "notizen": "Lagerhalle mit angebautem Bürotrakt. Dachschaden nach Sturmereignis vom 02.06. Gutachten am 08.07. an die Versicherung übergeben, Rechnung gestellt und beglichen.",
      "angelegtAm": "2026-06-09"
    }
  ],
  "fotos": [
    {
      "id": "foto_041_1",
      "objektId": "obj_041",
      "quelle": "beispiel-fotos/efh-fassade.jpg",
      "beschriftung": "Straßenansicht Nordwestseite, Aufnahme vom Gehweg",
      "kategorie": "Außenansicht",
      "aufgenommenAm": "2026-08-12T09:41"
    },
    {
      "id": "foto_041_2",
      "objektId": "obj_041",
      "quelle": "beispiel-fotos/efh-wohnzimmer.jpg",
      "beschriftung": "Wohnzimmer Erdgeschoss mit Galerie, Blick nach Süden",
      "kategorie": "Innenraum",
      "aufgenommenAm": "2026-08-12T10:02"
    },
    {
      "id": "foto_041_3",
      "objektId": "obj_041",
      "quelle": "beispiel-fotos/efh-keller-feuchte.jpg",
      "beschriftung": "Feuchtigkeitsschaden Sockelbereich Südwand, Putz großflächig abgeplatzt",
      "kategorie": "Mangel/Schaden",
      "aufgenommenAm": "2026-08-12T10:19"
    },
    {
      "id": "foto_041_4",
      "objektId": "obj_041",
      "quelle": "beispiel-fotos/efh-dachgeschoss.jpg",
      "beschriftung": "Dachgeschoss nicht ausgebaut, Sparren ohne Zwischensparrendämmung",
      "kategorie": "Innenraum",
      "aufgenommenAm": "2026-08-12T10:34"
    },
    {
      "id": "foto_038_1",
      "objektId": "obj_038",
      "quelle": "beispiel-fotos/mfh-strasse.jpg",
      "beschriftung": "Straßenansicht Ostseite, sechs Vollgeschosse, Klinkerfassade",
      "kategorie": "Außenansicht",
      "aufgenommenAm": "2026-08-06T14:08"
    },
    {
      "id": "foto_038_2",
      "objektId": "obj_038",
      "quelle": "beispiel-fotos/mfh-treppenhaus.jpg",
      "beschriftung": "Treppenhaus Aufgang B, Blick vom obersten Podest",
      "kategorie": "Innenraum",
      "aufgenommenAm": "2026-08-06T14:31"
    },
    {
      "id": "foto_038_3",
      "objektId": "obj_038",
      "quelle": "beispiel-fotos/mfh-bad.jpg",
      "beschriftung": "Bad Wohnung 12, Sanierung laut Eigentümer 2019",
      "kategorie": "Ausstattung",
      "aufgenommenAm": "2026-08-06T15:02"
    },
    {
      "id": "foto_044_1",
      "objektId": "obj_044",
      "quelle": "beispiel-fotos/rmh-strassenansicht.jpg",
      "beschriftung": "Straßenansicht der Zeile, Bewertungsobjekt drittes Haus von links",
      "kategorie": "Außenansicht",
      "aufgenommenAm": "2026-08-11T17:20"
    },
    {
      "id": "foto_029_1",
      "objektId": "obj_029",
      "quelle": "beispiel-fotos/gew-halle-aussen.jpg",
      "beschriftung": "Lagerhalle Straßenseite, Zufahrt Ost",
      "kategorie": "Außenansicht",
      "aufgenommenAm": "2026-06-18T08:12"
    },
    {
      "id": "foto_029_2",
      "objektId": "obj_029",
      "quelle": "beispiel-fotos/gew-halle-innen.jpg",
      "beschriftung": "Hallenkörper innen, Dachtragwerk aus Holzbindern",
      "kategorie": "Innenraum",
      "aufgenommenAm": "2026-06-18T08:36"
    },
    {
      "id": "foto_029_3",
      "objektId": "obj_029",
      "quelle": "beispiel-fotos/gew-dachschaden.jpg",
      "beschriftung": "Dachschaden nach Sturmereignis, Sparrenlage auf 40 m² freiliegend",
      "kategorie": "Mangel/Schaden",
      "aufgenommenAm": "2026-06-18T09:05"
    }
  ]
};
