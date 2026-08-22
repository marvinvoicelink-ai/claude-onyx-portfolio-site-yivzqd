/* Beispieldaten der Vorfuehrung. Alle Namen, Firmen, Adressen, Aktenzeichen
   und Zahlen sind erfunden.

   Bewusst OHNE Fotos: die Fotodokumentation ist leer, damit der Kunde in der
   Vorfuehrung selbst das erste Bild aufnimmt. Beim ersten Start werden diese
   Daten in den Browser uebernommen, danach arbeitet die Anwendung mit dem
   gespeicherten Stand. */
window.W = window.W || {};
W.SEED = {
  "kontakte": [
    {
      "id": "kt_hansen",
      "rolle": "Eigentümer",
      "name": "Hansen Immobilien Verwaltungs GmbH",
      "typ": "Bestandshalter",
      "ansprechpartner": "Bernd Hansen, Geschäftsführung",
      "email": "b.hansen@hansen-verwaltung-beispiel.de",
      "telefon": "0441 21807-0",
      "anschrift": "Amalienstraße 9, 26135 Oldenburg",
      "adressvalidierung": {
        "status": "geprüft",
        "datum": "2026-05-12",
        "hinweis": "Handelsregisterauszug HRB 4471 OL, Ausweis Geschäftsführer geprüft"
      },
      "notizen": "Verkauft aus Portfoliobereinigung. Erreichbar werktags 8 bis 16 Uhr. Will keine Besichtigungen ohne Voranmeldung beim Mieter."
    },
    {
      "id": "kt_nordkap",
      "rolle": "Investor",
      "name": "Nordkap Family Office GmbH",
      "typ": "Family Office",
      "ansprechpartner": "Dr. Silke Ahrend",
      "email": "s.ahrend@nordkap-fo-beispiel.de",
      "telefon": "040 3009-1182",
      "anschrift": "Neuer Wall 63, 20354 Hamburg",
      "suchprofil": {
        "assetklassen": [
          "Lebensmittel-Fachmarkt",
          "Nahversorgungszentrum"
        ],
        "regionen": [
          "Niedersachsen",
          "Bremen",
          "Schleswig-Holstein"
        ],
        "volumenVon": 2000000,
        "volumenBis": 8000000,
        "faktorMax": 15.0
      },
      "nda": {
        "status": "unterzeichnet",
        "datum": "2026-08-11"
      },
      "adressvalidierung": {
        "status": "geprüft",
        "datum": "2026-08-10",
        "hinweis": "Transparenzregister und Ausweis der Geschäftsführung geprüft"
      },
      "notizen": "Kauft ausschließlich mit Besitzgesellschaft. Entscheidung im Beirat, tagt monatlich."
    },
    {
      "id": "kt_weser",
      "rolle": "Investor",
      "name": "Weserwert Grundbesitz KG",
      "typ": "Bestandshalter",
      "ansprechpartner": "Jörg Timmermann",
      "email": "timmermann@weserwert-beispiel.de",
      "telefon": "0421 5578-40",
      "anschrift": "Contrescarpe 45, 28195 Bremen",
      "suchprofil": {
        "assetklassen": [
          "Lebensmittel-Fachmarkt",
          "Wohn- und Geschäftshaus"
        ],
        "regionen": [
          "Bremen",
          "Oldenburger Land"
        ],
        "volumenVon": 1500000,
        "volumenBis": 5000000,
        "faktorMax": 13.5
      },
      "nda": {
        "status": "unterzeichnet",
        "datum": "2026-08-14"
      },
      "adressvalidierung": {
        "status": "geprüft",
        "datum": "2026-08-13",
        "hinweis": "Handelsregisterauszug HRA 22908 HB geprüft"
      },
      "notizen": "Reagiert schnell, prüft aber sehr genau die nicht umlagefähigen Kosten. Erbbaurecht ist für ihn kein Ausschluss."
    },
    {
      "id": "kt_bruns",
      "rolle": "Investor",
      "name": "Bruns Vermögensverwaltung",
      "typ": "Privatinvestor",
      "ansprechpartner": "Heiko Bruns",
      "email": "h.bruns@beispiel.de",
      "telefon": "0170 2249815",
      "anschrift": "Lange Straße 4, 26160 Bad Zwischenahn",
      "suchprofil": {
        "assetklassen": [
          "Lebensmittel-Fachmarkt",
          "Ärztehaus"
        ],
        "regionen": [
          "Oldenburger Land"
        ],
        "volumenVon": 1000000,
        "volumenBis": 4000000,
        "faktorMax": 16.0
      },
      "nda": {
        "status": "versendet",
        "datum": "2026-08-18"
      },
      "adressvalidierung": {
        "status": "offen",
        "datum": null,
        "hinweis": "Erstkunde, Ausweiskopie und Meldeadresse stehen aus"
      },
      "notizen": "Erstkontakt über Empfehlung. Vor Exposé-Versand Adressvalidierung abschließen."
    },
    {
      "id": "kt_delta",
      "rolle": "Investor",
      "name": "Delta Retail Invest AG",
      "typ": "Institutioneller Investor",
      "ansprechpartner": "Frau Petra Kollmann, Ankauf",
      "email": "p.kollmann@delta-retail-beispiel.de",
      "telefon": "069 9077-3310",
      "anschrift": "Taunusanlage 11, 60329 Frankfurt am Main",
      "suchprofil": {
        "assetklassen": [
          "Lebensmittel-Fachmarkt",
          "Fachmarktzentrum",
          "Logistik"
        ],
        "regionen": [
          "bundesweit"
        ],
        "volumenVon": 3000000,
        "volumenBis": 25000000,
        "faktorMax": 14.0
      },
      "nda": {
        "status": "offen",
        "datum": null
      },
      "adressvalidierung": {
        "status": "geprüft",
        "datum": "2026-03-02",
        "hinweis": "Bestandskunde seit 2024"
      },
      "notizen": "Ankaufsprofil verlangt Restlaufzeit über sieben Jahre. Meldet sich nur, wenn das Objekt passt."
    },
    {
      "id": "kt_ehlers",
      "rolle": "Eigentümer",
      "name": "Ehlers Grundstücks GbR",
      "typ": "Privateigentümer",
      "ansprechpartner": "Anke Ehlers",
      "email": "a.ehlers@beispiel.de",
      "telefon": "04401 98620",
      "anschrift": "Moorweg 2, 27777 Ganderkesee",
      "adressvalidierung": {
        "status": "geprüft",
        "datum": "2026-07-01",
        "hinweis": "Ausweise beider Gesellschafter geprüft"
      },
      "notizen": "Verkauf im Zuge einer Nachfolgeregelung."
    }
  ],
  "objekte": [
    {
      "id": "obj_rewe",
      "aktenzeichen": "VK-2026-014",
      "bezeichnung": "REWE-Markt Oldenburg",
      "strasse": "Bümmersteder Tredde 12",
      "plz": "26129",
      "ort": "Oldenburg",
      "objektart": "Lebensmittel-Fachmarkt",
      "status": "vermarktung",
      "verkaufsgrund": "Portfoliobereinigung",
      "eigentuemerId": "kt_hansen",
      "besitzgesellschaft": "Kauf mit Besitzgesellschaft möglich",
      "mieteinnahmen": 312000,
      "nichtUmlagefaehig": 17330,
      "nichtUmlagefaehigJahr": "2025",
      "kaufpreis": 3350000,
      "kaeuferprovision": "3,57 % inkl. MwSt.",
      "eckdaten": [
        {
          "etikett": "Mietvertrag seit",
          "wert": "1990",
          "imExpose": true,
          "offen": false,
          "gruppe": "Mietverhältnis"
        },
        {
          "etikett": "Laufzeit bis",
          "wert": "31.08.2033",
          "imExpose": true,
          "offen": false,
          "gruppe": "Mietverhältnis"
        },
        {
          "etikett": "Verlängerungsoptionen",
          "wert": "3 × 3 Jahre",
          "imExpose": true,
          "offen": false,
          "gruppe": "Mietverhältnis"
        },
        {
          "etikett": "Indexierung",
          "wert": "VPI, Anpassung ab 10 Punkten, 65 %",
          "imExpose": true,
          "offen": false,
          "gruppe": "Mietverhältnis"
        },
        {
          "etikett": "Mieter",
          "wert": "REWE Markt GmbH",
          "imExpose": true,
          "offen": false,
          "gruppe": "Mietverhältnis"
        },
        {
          "etikett": "Vermietete Fläche",
          "wert": "1.980 m²",
          "imExpose": true,
          "offen": false,
          "gruppe": "Fläche"
        },
        {
          "etikett": "Grundstück",
          "wert": "7.000 m², Erbbaurecht",
          "imExpose": true,
          "offen": false,
          "gruppe": "Fläche"
        },
        {
          "etikett": "Erbbauzins",
          "wert": "",
          "imExpose": false,
          "offen": true,
          "gruppe": "Fläche"
        },
        {
          "etikett": "Baujahr",
          "wert": "1990",
          "imExpose": true,
          "offen": false,
          "gruppe": "Gebäude"
        },
        {
          "etikett": "Erweiterung",
          "wert": "2004, Verkaufsfläche um 320 m² erweitert",
          "imExpose": true,
          "offen": false,
          "gruppe": "Gebäude"
        },
        {
          "etikett": "Sanierung",
          "wert": "2019, Kältetechnik, LED-Beleuchtung, Fassade",
          "imExpose": true,
          "offen": false,
          "gruppe": "Gebäude"
        },
        {
          "etikett": "Dach",
          "wert": "Flachdach, Folienabdichtung",
          "imExpose": true,
          "offen": false,
          "gruppe": "Gebäude"
        },
        {
          "etikett": "Fassade",
          "wert": "Klinker, pflegeleicht",
          "imExpose": true,
          "offen": false,
          "gruppe": "Gebäude"
        },
        {
          "etikett": "PV-Anlage",
          "wert": "vorhanden, 240 kWp, Dachfläche verpachtet",
          "imExpose": true,
          "offen": false,
          "gruppe": "Technik"
        },
        {
          "etikett": "Ladestationen",
          "wert": "",
          "imExpose": false,
          "offen": true,
          "gruppe": "Technik"
        },
        {
          "etikett": "Tiefanlieferung",
          "wert": "vorhanden",
          "imExpose": true,
          "offen": false,
          "gruppe": "Technik"
        },
        {
          "etikett": "Beheizungsart",
          "wert": "",
          "imExpose": false,
          "offen": true,
          "gruppe": "Technik"
        },
        {
          "etikett": "Energiekennwert",
          "wert": "",
          "imExpose": false,
          "offen": true,
          "gruppe": "Technik"
        },
        {
          "etikett": "Zufahrten",
          "wert": "2",
          "imExpose": true,
          "offen": false,
          "gruppe": "Außenanlage"
        },
        {
          "etikett": "Stellplätze",
          "wert": "77",
          "imExpose": true,
          "offen": false,
          "gruppe": "Außenanlage"
        }
      ],
      "compliance": {
        "provisionsvereinbarung": {
          "status": "unterzeichnet",
          "datum": "2026-05-20",
          "hinweis": "Eigentümer, Innen- und Außenprovision geregelt"
        },
        "widerrufsbelehrung": {
          "status": "im Exposé hinterlegt",
          "datum": "2026-08-06",
          "hinweis": "Belehrung für Verbraucher, Muster-Widerrufsformular als Anlage"
        },
        "adressvalidierung": {
          "status": "pflicht bei Erstkunden",
          "datum": null,
          "hinweis": "Vor Exposé-Versand je Interessent zu prüfen"
        }
      },
      "notizen": "Verkauf aus Portfoliobereinigung. Mieter ist über den Verkauf informiert, Besichtigung nur nach Voranmeldung. Erbbaurechtsvertrag liegt noch nicht vollständig vor.",
      "angelegtAm": "2026-05-12"
    },
    {
      "id": "obj_nahv",
      "aktenzeichen": "VK-2026-011",
      "bezeichnung": "Nahversorgungszentrum Wildeshausen",
      "strasse": "Huntestraße 41",
      "plz": "27793",
      "ort": "Wildeshausen",
      "objektart": "Nahversorgungszentrum",
      "status": "unterlagen",
      "verkaufsgrund": "Nachfolgeregelung",
      "eigentuemerId": "kt_ehlers",
      "besitzgesellschaft": "nicht geklärt",
      "mieteinnahmen": 268400,
      "nichtUmlagefaehig": 21900,
      "nichtUmlagefaehigJahr": "2025",
      "kaufpreis": 3100000,
      "kaeuferprovision": "3,57 % inkl. MwSt.",
      "eckdaten": [
        {
          "etikett": "Mietvertrag seit",
          "wert": "2011",
          "imExpose": true,
          "offen": false,
          "gruppe": "Mietverhältnis"
        },
        {
          "etikett": "Laufzeit bis",
          "wert": "30.06.2031",
          "imExpose": true,
          "offen": false,
          "gruppe": "Mietverhältnis"
        },
        {
          "etikett": "Verlängerungsoptionen",
          "wert": "2 × 5 Jahre",
          "imExpose": true,
          "offen": false,
          "gruppe": "Mietverhältnis"
        },
        {
          "etikett": "Indexierung",
          "wert": "",
          "imExpose": false,
          "offen": true,
          "gruppe": "Mietverhältnis"
        },
        {
          "etikett": "Vermietete Fläche",
          "wert": "2.340 m²",
          "imExpose": true,
          "offen": false,
          "gruppe": "Fläche"
        },
        {
          "etikett": "Grundstück",
          "wert": "9.100 m², Volleigentum",
          "imExpose": true,
          "offen": false,
          "gruppe": "Fläche"
        },
        {
          "etikett": "Baujahr",
          "wert": "2011",
          "imExpose": true,
          "offen": false,
          "gruppe": "Gebäude"
        },
        {
          "etikett": "Dach",
          "wert": "Flachdach",
          "imExpose": true,
          "offen": false,
          "gruppe": "Gebäude"
        },
        {
          "etikett": "Stellplätze",
          "wert": "104",
          "imExpose": true,
          "offen": false,
          "gruppe": "Außenanlage"
        }
      ],
      "compliance": {
        "provisionsvereinbarung": {
          "status": "versendet",
          "datum": "2026-08-17",
          "hinweis": "Rücklauf vom Eigentümer steht aus"
        },
        "widerrufsbelehrung": {
          "status": "offen",
          "datum": null,
          "hinweis": "Wird mit dem Exposé erstellt"
        },
        "adressvalidierung": {
          "status": "pflicht bei Erstkunden",
          "datum": null,
          "hinweis": "Vor Exposé-Versand je Interessent zu prüfen"
        }
      },
      "notizen": "Unterlagen unvollständig, ohne Flurkarte und Mietvertragsnachträge kein Exposé.",
      "angelegtAm": "2026-07-02"
    },
    {
      "id": "obj_wgh",
      "aktenzeichen": "VK-2026-006",
      "bezeichnung": "Wohn- und Geschäftshaus Delmenhorst",
      "strasse": "Lange Straße 78",
      "plz": "27749",
      "ort": "Delmenhorst",
      "objektart": "Wohn- und Geschäftshaus",
      "status": "reserviert",
      "verkaufsgrund": "Portfoliobereinigung",
      "eigentuemerId": "kt_hansen",
      "besitzgesellschaft": "Kauf mit Besitzgesellschaft möglich",
      "mieteinnahmen": 141600,
      "nichtUmlagefaehig": 12400,
      "nichtUmlagefaehigJahr": "2025",
      "kaufpreis": 1980000,
      "kaeuferprovision": "3,57 % inkl. MwSt.",
      "eckdaten": [
        {
          "etikett": "Nutzung",
          "wert": "2 Ladeneinheiten, 6 Wohnungen",
          "imExpose": true,
          "offen": false,
          "gruppe": "Mietverhältnis"
        },
        {
          "etikett": "Vermietete Fläche",
          "wert": "912 m²",
          "imExpose": true,
          "offen": false,
          "gruppe": "Fläche"
        },
        {
          "etikett": "Grundstück",
          "wert": "640 m², Volleigentum",
          "imExpose": true,
          "offen": false,
          "gruppe": "Fläche"
        },
        {
          "etikett": "Baujahr",
          "wert": "1957, Kernsanierung 2016",
          "imExpose": true,
          "offen": false,
          "gruppe": "Gebäude"
        },
        {
          "etikett": "Stellplätze",
          "wert": "8",
          "imExpose": true,
          "offen": false,
          "gruppe": "Außenanlage"
        }
      ],
      "compliance": {
        "provisionsvereinbarung": {
          "status": "unterzeichnet",
          "datum": "2026-03-04",
          "hinweis": "Außenprovision 3,57 % inkl. MwSt."
        },
        "widerrufsbelehrung": {
          "status": "im Exposé hinterlegt",
          "datum": "2026-03-19",
          "hinweis": "Belehrung für Verbraucher"
        },
        "adressvalidierung": {
          "status": "pflicht bei Erstkunden",
          "datum": null,
          "hinweis": "Vor Exposé-Versand je Interessent zu prüfen"
        }
      },
      "notizen": "Reserviert für Weserwert bis 05.09.2026, Finanzierungsbestätigung liegt vor. Notartermin in Abstimmung.",
      "angelegtAm": "2026-02-18"
    }
  ],
  "unterlagen": [
    {
      "id": "ul_obj_rewe_0",
      "objektId": "obj_rewe",
      "bezeichnung": "Fotos Außenansicht",
      "kategorie": "Foto",
      "pflicht": true,
      "status": "fehlt",
      "angefordertAm": null,
      "erhaltenAm": null,
      "datei": null,
      "notiz": ""
    },
    {
      "id": "ul_obj_rewe_1",
      "objektId": "obj_rewe",
      "bezeichnung": "Fotos Gebäudetechnik",
      "kategorie": "Foto",
      "pflicht": true,
      "status": "fehlt",
      "angefordertAm": null,
      "erhaltenAm": null,
      "datei": null,
      "notiz": ""
    },
    {
      "id": "ul_obj_rewe_2",
      "objektId": "obj_rewe",
      "bezeichnung": "Fotos Dachfläche",
      "kategorie": "Foto",
      "pflicht": true,
      "status": "fehlt",
      "angefordertAm": null,
      "erhaltenAm": null,
      "datei": null,
      "notiz": ""
    },
    {
      "id": "ul_obj_rewe_3",
      "objektId": "obj_rewe",
      "bezeichnung": "Flurkarte",
      "kategorie": "Lage",
      "pflicht": true,
      "status": "vorhanden",
      "angefordertAm": "2026-05-21",
      "erhaltenAm": "2026-05-28",
      "datei": null,
      "notiz": ""
    },
    {
      "id": "ul_obj_rewe_4",
      "objektId": "obj_rewe",
      "bezeichnung": "Lageplan / Landkarte",
      "kategorie": "Lage",
      "pflicht": true,
      "status": "vorhanden",
      "angefordertAm": "2026-05-21",
      "erhaltenAm": "2026-05-28",
      "datei": null,
      "notiz": ""
    },
    {
      "id": "ul_obj_rewe_5",
      "objektId": "obj_rewe",
      "bezeichnung": "Stellplatznachweis",
      "kategorie": "Lage",
      "pflicht": true,
      "status": "vorhanden",
      "angefordertAm": "2026-05-21",
      "erhaltenAm": "2026-06-03",
      "datei": null,
      "notiz": ""
    },
    {
      "id": "ul_obj_rewe_6",
      "objektId": "obj_rewe",
      "bezeichnung": "Strukturdaten des Standorts",
      "kategorie": "Lage",
      "pflicht": true,
      "status": "vorhanden",
      "angefordertAm": "2026-05-21",
      "erhaltenAm": "2026-06-03",
      "datei": null,
      "notiz": ""
    },
    {
      "id": "ul_obj_rewe_7",
      "objektId": "obj_rewe",
      "bezeichnung": "Mietvertrag mit Nachträgen",
      "kategorie": "Vertrag",
      "pflicht": true,
      "status": "vorhanden",
      "angefordertAm": "2026-05-21",
      "erhaltenAm": "2026-06-11",
      "datei": null,
      "notiz": ""
    },
    {
      "id": "ul_obj_rewe_8",
      "objektId": "obj_rewe",
      "bezeichnung": "Grundbuchauszug",
      "kategorie": "Vertrag",
      "pflicht": true,
      "status": "vorhanden",
      "angefordertAm": "2026-05-21",
      "erhaltenAm": "2026-06-11",
      "datei": null,
      "notiz": ""
    },
    {
      "id": "ul_obj_rewe_9",
      "objektId": "obj_rewe",
      "bezeichnung": "Erbbaurechtsvertrag",
      "kategorie": "Vertrag",
      "pflicht": true,
      "status": "angefordert",
      "angefordertAm": "2026-08-04",
      "erhaltenAm": null,
      "datei": null,
      "notiz": ""
    },
    {
      "id": "ul_obj_rewe_10",
      "objektId": "obj_rewe",
      "bezeichnung": "Provisionsvereinbarung Eigentümer",
      "kategorie": "Vertrag",
      "pflicht": true,
      "status": "vorhanden",
      "angefordertAm": "2026-05-21",
      "erhaltenAm": "2026-05-20",
      "datei": null,
      "notiz": ""
    },
    {
      "id": "ul_obj_rewe_11",
      "objektId": "obj_rewe",
      "bezeichnung": "Energieausweis",
      "kategorie": "Nachweis",
      "pflicht": true,
      "status": "angefordert",
      "angefordertAm": "2026-08-04",
      "erhaltenAm": null,
      "datei": null,
      "notiz": ""
    },
    {
      "id": "ul_obj_rewe_12",
      "objektId": "obj_rewe",
      "bezeichnung": "Nebenkostenabrechnung 2025",
      "kategorie": "Nachweis",
      "pflicht": true,
      "status": "vorhanden",
      "angefordertAm": "2026-05-21",
      "erhaltenAm": "2026-07-09",
      "datei": null,
      "notiz": ""
    },
    {
      "id": "ul_obj_rewe_13",
      "objektId": "obj_rewe",
      "bezeichnung": "Baugenehmigung",
      "kategorie": "Nachweis",
      "pflicht": true,
      "status": "angefordert",
      "angefordertAm": "2026-08-12",
      "erhaltenAm": null,
      "datei": null,
      "notiz": ""
    },
    {
      "id": "ul_obj_rewe_14",
      "objektId": "obj_rewe",
      "bezeichnung": "Versicherungsnachweis",
      "kategorie": "Nachweis",
      "pflicht": true,
      "status": "vorhanden",
      "angefordertAm": "2026-05-21",
      "erhaltenAm": "2026-07-09",
      "datei": null,
      "notiz": ""
    },
    {
      "id": "ul_obj_nahv_0",
      "objektId": "obj_nahv",
      "bezeichnung": "Fotos Außenansicht",
      "kategorie": "Foto",
      "pflicht": true,
      "status": "fehlt",
      "angefordertAm": null,
      "erhaltenAm": null,
      "datei": null,
      "notiz": ""
    },
    {
      "id": "ul_obj_nahv_1",
      "objektId": "obj_nahv",
      "bezeichnung": "Fotos Gebäudetechnik",
      "kategorie": "Foto",
      "pflicht": true,
      "status": "fehlt",
      "angefordertAm": null,
      "erhaltenAm": null,
      "datei": null,
      "notiz": ""
    },
    {
      "id": "ul_obj_nahv_2",
      "objektId": "obj_nahv",
      "bezeichnung": "Fotos Dachfläche",
      "kategorie": "Foto",
      "pflicht": true,
      "status": "fehlt",
      "angefordertAm": null,
      "erhaltenAm": null,
      "datei": null,
      "notiz": ""
    },
    {
      "id": "ul_obj_nahv_3",
      "objektId": "obj_nahv",
      "bezeichnung": "Flurkarte",
      "kategorie": "Lage",
      "pflicht": true,
      "status": "angefordert",
      "angefordertAm": "2026-08-05",
      "erhaltenAm": null,
      "datei": null,
      "notiz": ""
    },
    {
      "id": "ul_obj_nahv_4",
      "objektId": "obj_nahv",
      "bezeichnung": "Lageplan / Landkarte",
      "kategorie": "Lage",
      "pflicht": true,
      "status": "fehlt",
      "angefordertAm": null,
      "erhaltenAm": null,
      "datei": null,
      "notiz": ""
    },
    {
      "id": "ul_obj_nahv_5",
      "objektId": "obj_nahv",
      "bezeichnung": "Stellplatznachweis",
      "kategorie": "Lage",
      "pflicht": true,
      "status": "fehlt",
      "angefordertAm": null,
      "erhaltenAm": null,
      "datei": null,
      "notiz": ""
    },
    {
      "id": "ul_obj_nahv_6",
      "objektId": "obj_nahv",
      "bezeichnung": "Strukturdaten des Standorts",
      "kategorie": "Lage",
      "pflicht": true,
      "status": "fehlt",
      "angefordertAm": null,
      "erhaltenAm": null,
      "datei": null,
      "notiz": ""
    },
    {
      "id": "ul_obj_nahv_7",
      "objektId": "obj_nahv",
      "bezeichnung": "Mietvertrag mit Nachträgen",
      "kategorie": "Vertrag",
      "pflicht": true,
      "status": "angefordert",
      "angefordertAm": "2026-08-05",
      "erhaltenAm": null,
      "datei": null,
      "notiz": ""
    },
    {
      "id": "ul_obj_nahv_8",
      "objektId": "obj_nahv",
      "bezeichnung": "Grundbuchauszug",
      "kategorie": "Vertrag",
      "pflicht": true,
      "status": "vorhanden",
      "angefordertAm": "2026-05-21",
      "erhaltenAm": "2026-07-15",
      "datei": null,
      "notiz": ""
    },
    {
      "id": "ul_obj_nahv_9",
      "objektId": "obj_nahv",
      "bezeichnung": "Erbbaurechtsvertrag",
      "kategorie": "Vertrag",
      "pflicht": true,
      "status": "fehlt",
      "angefordertAm": null,
      "erhaltenAm": null,
      "datei": null,
      "notiz": ""
    },
    {
      "id": "ul_obj_nahv_10",
      "objektId": "obj_nahv",
      "bezeichnung": "Provisionsvereinbarung Eigentümer",
      "kategorie": "Vertrag",
      "pflicht": true,
      "status": "fehlt",
      "angefordertAm": null,
      "erhaltenAm": null,
      "datei": null,
      "notiz": ""
    },
    {
      "id": "ul_obj_nahv_11",
      "objektId": "obj_nahv",
      "bezeichnung": "Energieausweis",
      "kategorie": "Nachweis",
      "pflicht": true,
      "status": "fehlt",
      "angefordertAm": null,
      "erhaltenAm": null,
      "datei": null,
      "notiz": ""
    },
    {
      "id": "ul_obj_nahv_12",
      "objektId": "obj_nahv",
      "bezeichnung": "Nebenkostenabrechnung 2025",
      "kategorie": "Nachweis",
      "pflicht": true,
      "status": "fehlt",
      "angefordertAm": null,
      "erhaltenAm": null,
      "datei": null,
      "notiz": ""
    },
    {
      "id": "ul_obj_nahv_13",
      "objektId": "obj_nahv",
      "bezeichnung": "Baugenehmigung",
      "kategorie": "Nachweis",
      "pflicht": true,
      "status": "fehlt",
      "angefordertAm": null,
      "erhaltenAm": null,
      "datei": null,
      "notiz": ""
    },
    {
      "id": "ul_obj_nahv_14",
      "objektId": "obj_nahv",
      "bezeichnung": "Versicherungsnachweis",
      "kategorie": "Nachweis",
      "pflicht": true,
      "status": "fehlt",
      "angefordertAm": null,
      "erhaltenAm": null,
      "datei": null,
      "notiz": ""
    },
    {
      "id": "ul_obj_wgh_0",
      "objektId": "obj_wgh",
      "bezeichnung": "Fotos Außenansicht",
      "kategorie": "Foto",
      "pflicht": true,
      "status": "vorhanden",
      "angefordertAm": "2026-05-21",
      "erhaltenAm": "2026-03-10",
      "datei": null,
      "notiz": ""
    },
    {
      "id": "ul_obj_wgh_1",
      "objektId": "obj_wgh",
      "bezeichnung": "Fotos Gebäudetechnik",
      "kategorie": "Foto",
      "pflicht": true,
      "status": "vorhanden",
      "angefordertAm": "2026-05-21",
      "erhaltenAm": "2026-03-10",
      "datei": null,
      "notiz": ""
    },
    {
      "id": "ul_obj_wgh_2",
      "objektId": "obj_wgh",
      "bezeichnung": "Fotos Dachfläche",
      "kategorie": "Foto",
      "pflicht": true,
      "status": "fehlt",
      "angefordertAm": null,
      "erhaltenAm": null,
      "datei": null,
      "notiz": ""
    },
    {
      "id": "ul_obj_wgh_3",
      "objektId": "obj_wgh",
      "bezeichnung": "Flurkarte",
      "kategorie": "Lage",
      "pflicht": true,
      "status": "vorhanden",
      "angefordertAm": "2026-05-21",
      "erhaltenAm": "2026-03-10",
      "datei": null,
      "notiz": ""
    },
    {
      "id": "ul_obj_wgh_4",
      "objektId": "obj_wgh",
      "bezeichnung": "Lageplan / Landkarte",
      "kategorie": "Lage",
      "pflicht": true,
      "status": "vorhanden",
      "angefordertAm": "2026-05-21",
      "erhaltenAm": "2026-03-10",
      "datei": null,
      "notiz": ""
    },
    {
      "id": "ul_obj_wgh_5",
      "objektId": "obj_wgh",
      "bezeichnung": "Stellplatznachweis",
      "kategorie": "Lage",
      "pflicht": true,
      "status": "vorhanden",
      "angefordertAm": "2026-05-21",
      "erhaltenAm": "2026-03-10",
      "datei": null,
      "notiz": ""
    },
    {
      "id": "ul_obj_wgh_6",
      "objektId": "obj_wgh",
      "bezeichnung": "Strukturdaten des Standorts",
      "kategorie": "Lage",
      "pflicht": true,
      "status": "vorhanden",
      "angefordertAm": "2026-05-21",
      "erhaltenAm": "2026-03-10",
      "datei": null,
      "notiz": ""
    },
    {
      "id": "ul_obj_wgh_7",
      "objektId": "obj_wgh",
      "bezeichnung": "Mietvertrag mit Nachträgen",
      "kategorie": "Vertrag",
      "pflicht": true,
      "status": "vorhanden",
      "angefordertAm": "2026-05-21",
      "erhaltenAm": "2026-03-10",
      "datei": null,
      "notiz": ""
    },
    {
      "id": "ul_obj_wgh_8",
      "objektId": "obj_wgh",
      "bezeichnung": "Grundbuchauszug",
      "kategorie": "Vertrag",
      "pflicht": true,
      "status": "vorhanden",
      "angefordertAm": "2026-05-21",
      "erhaltenAm": "2026-03-10",
      "datei": null,
      "notiz": ""
    },
    {
      "id": "ul_obj_wgh_9",
      "objektId": "obj_wgh",
      "bezeichnung": "Erbbaurechtsvertrag",
      "kategorie": "Vertrag",
      "pflicht": true,
      "status": "fehlt",
      "angefordertAm": null,
      "erhaltenAm": null,
      "datei": null,
      "notiz": ""
    },
    {
      "id": "ul_obj_wgh_10",
      "objektId": "obj_wgh",
      "bezeichnung": "Provisionsvereinbarung Eigentümer",
      "kategorie": "Vertrag",
      "pflicht": true,
      "status": "vorhanden",
      "angefordertAm": "2026-05-21",
      "erhaltenAm": "2026-03-10",
      "datei": null,
      "notiz": ""
    },
    {
      "id": "ul_obj_wgh_11",
      "objektId": "obj_wgh",
      "bezeichnung": "Energieausweis",
      "kategorie": "Nachweis",
      "pflicht": true,
      "status": "vorhanden",
      "angefordertAm": "2026-05-21",
      "erhaltenAm": "2026-03-10",
      "datei": null,
      "notiz": ""
    },
    {
      "id": "ul_obj_wgh_12",
      "objektId": "obj_wgh",
      "bezeichnung": "Nebenkostenabrechnung 2025",
      "kategorie": "Nachweis",
      "pflicht": true,
      "status": "vorhanden",
      "angefordertAm": "2026-05-21",
      "erhaltenAm": "2026-03-10",
      "datei": null,
      "notiz": ""
    },
    {
      "id": "ul_obj_wgh_13",
      "objektId": "obj_wgh",
      "bezeichnung": "Baugenehmigung",
      "kategorie": "Nachweis",
      "pflicht": true,
      "status": "vorhanden",
      "angefordertAm": "2026-05-21",
      "erhaltenAm": "2026-03-10",
      "datei": null,
      "notiz": ""
    },
    {
      "id": "ul_obj_wgh_14",
      "objektId": "obj_wgh",
      "bezeichnung": "Versicherungsnachweis",
      "kategorie": "Nachweis",
      "pflicht": true,
      "status": "vorhanden",
      "angefordertAm": "2026-05-21",
      "erhaltenAm": "2026-03-10",
      "datei": null,
      "notiz": ""
    }
  ],
  "beteiligungen": [
    {
      "id": "bt_1",
      "objektId": "obj_rewe",
      "investorId": "kt_nordkap",
      "stand": "Exposé versendet",
      "ndaAm": "2026-08-11",
      "exposeAm": "2026-08-12",
      "letzteReaktion": "2026-08-19",
      "notiz": "Beirat tagt am 02.09., Rückmeldung danach zugesagt."
    },
    {
      "id": "bt_2",
      "objektId": "obj_rewe",
      "investorId": "kt_weser",
      "stand": "Prüfung läuft",
      "ndaAm": "2026-08-14",
      "exposeAm": "2026-08-14",
      "letzteReaktion": "2026-08-20",
      "notiz": "Fragt nach Aufschlüsselung der nicht umlagefähigen Kosten."
    },
    {
      "id": "bt_3",
      "objektId": "obj_rewe",
      "investorId": "kt_bruns",
      "stand": "NDA offen",
      "ndaAm": null,
      "exposeAm": null,
      "letzteReaktion": "2026-08-18",
      "notiz": "Erstkunde. Adressvalidierung und NDA vor Exposé-Versand."
    },
    {
      "id": "bt_4",
      "objektId": "obj_rewe",
      "investorId": "kt_delta",
      "stand": "Kein Interesse",
      "ndaAm": null,
      "exposeAm": null,
      "letzteReaktion": "2026-08-07",
      "notiz": "Restlaufzeit unter sieben Jahren, passt nicht ins Ankaufsprofil."
    },
    {
      "id": "bt_5",
      "objektId": "obj_wgh",
      "investorId": "kt_weser",
      "stand": "Reserviert",
      "ndaAm": "2026-04-02",
      "exposeAm": "2026-04-02",
      "letzteReaktion": "2026-08-15",
      "notiz": "Finanzierungsbestätigung liegt vor, Notartermin in Abstimmung."
    }
  ],
  "vorgaenge": [
    {
      "id": "vg_01",
      "objektId": "obj_rewe",
      "kontaktId": "kt_hansen",
      "art": "E-Mail",
      "richtung": "ein",
      "zeitpunkt": "2026-05-12T09:14",
      "betreff": "Verkaufsabsicht REWE-Markt Bümmersteder Tredde",
      "inhalt": "Sehr geehrte Damen und Herren, wir möchten den REWE-Markt in Oldenburg aus unserem Bestand veräußern. Bitte melden Sie sich zur Abstimmung des weiteren Vorgehens.",
      "teilnehmer": "Bernd Hansen",
      "belegNr": "2026-000431",
      "festgeschrieben": true,
      "outlook": true,
      "anhaenge": []
    },
    {
      "id": "vg_02",
      "objektId": "obj_rewe",
      "kontaktId": "kt_hansen",
      "art": "Telefon",
      "richtung": "aus",
      "zeitpunkt": "2026-05-12T14:35",
      "betreff": "Erstgespräch Verkaufsmandat, 18 Minuten",
      "inhalt": "Eckdaten aufgenommen: Mietvertrag seit 1990, Laufzeit bis 08/2033, drei mal drei Jahre Option. Erbbaurecht bestätigt. Provisionsvereinbarung wird zugesandt. Verkaufsgrund Portfoliobereinigung.",
      "teilnehmer": "Bernd Hansen",
      "belegNr": "2026-000432",
      "festgeschrieben": true,
      "outlook": false,
      "anhaenge": []
    },
    {
      "id": "vg_03",
      "objektId": "obj_rewe",
      "kontaktId": "kt_hansen",
      "art": "E-Mail",
      "richtung": "aus",
      "zeitpunkt": "2026-05-14T08:02",
      "betreff": "Provisionsvereinbarung und Unterlagenliste",
      "inhalt": "Anbei die Provisionsvereinbarung sowie die Liste der Unterlagen, ohne die wir kein Exposé erstellen können: Fotos außen, Gebäudetechnik und Dachfläche, Flurkarte, Stellplatznachweis, Strukturdaten, Lageplan.",
      "teilnehmer": "Bernd Hansen",
      "belegNr": "2026-000433",
      "festgeschrieben": true,
      "outlook": true,
      "anhaenge": [
        "Provisionsvereinbarung.pdf",
        "Unterlagenliste.pdf"
      ]
    },
    {
      "id": "vg_04",
      "objektId": "obj_rewe",
      "kontaktId": "kt_hansen",
      "art": "E-Mail",
      "richtung": "ein",
      "zeitpunkt": "2026-05-20T16:41",
      "betreff": "Provisionsvereinbarung unterzeichnet zurück",
      "inhalt": "Unterzeichnet anbei. Die Flurkarte kommt kommende Woche vom Katasteramt.",
      "teilnehmer": "Bernd Hansen",
      "belegNr": "2026-000451",
      "festgeschrieben": true,
      "outlook": true,
      "anhaenge": [
        "Provisionsvereinbarung_unterzeichnet.pdf"
      ]
    },
    {
      "id": "vg_05",
      "objektId": "obj_rewe",
      "kontaktId": "kt_nordkap",
      "art": "E-Mail",
      "richtung": "aus",
      "zeitpunkt": "2026-08-10T10:20",
      "betreff": "Anlageobjekt Oldenburg, Vertraulichkeitserklärung",
      "inhalt": "Sehr geehrte Frau Dr. Ahrend, wir haben ein Objekt, das Ihrem Suchprofil entspricht. Bei Interesse senden Sie uns bitte die anhängende Vertraulichkeitserklärung unterzeichnet zurück, anschließend erhalten Sie das Exposé.",
      "teilnehmer": "Dr. Silke Ahrend",
      "belegNr": "2026-000712",
      "festgeschrieben": true,
      "outlook": true,
      "anhaenge": [
        "Vertraulichkeitserklaerung.pdf"
      ]
    },
    {
      "id": "vg_06",
      "objektId": "obj_rewe",
      "kontaktId": "kt_nordkap",
      "art": "E-Mail",
      "richtung": "ein",
      "zeitpunkt": "2026-08-11T11:52",
      "betreff": "Vertraulichkeitserklärung unterzeichnet",
      "inhalt": "Anbei unterzeichnet. Bitte um Zusendung des Exposés.",
      "teilnehmer": "Dr. Silke Ahrend",
      "belegNr": "2026-000719",
      "festgeschrieben": true,
      "outlook": true,
      "anhaenge": [
        "NDA_Nordkap_unterzeichnet.pdf"
      ]
    },
    {
      "id": "vg_07",
      "objektId": "obj_rewe",
      "kontaktId": "kt_nordkap",
      "art": "E-Mail",
      "richtung": "aus",
      "zeitpunkt": "2026-08-12T09:05",
      "betreff": "Exposé REWE-Markt Oldenburg, VK-2026-014",
      "inhalt": "Anbei das Exposé inklusive Widerrufsbelehrung. Käuferprovision 3,57 Prozent inklusive Mehrwertsteuer.",
      "teilnehmer": "Dr. Silke Ahrend",
      "belegNr": "2026-000724",
      "festgeschrieben": true,
      "outlook": true,
      "anhaenge": [
        "Expose_VK-2026-014.pdf",
        "Widerrufsbelehrung.pdf"
      ]
    },
    {
      "id": "vg_08",
      "objektId": "obj_rewe",
      "kontaktId": "kt_weser",
      "art": "WhatsApp",
      "richtung": "ein",
      "zeitpunkt": "2026-08-20T18:07",
      "betreff": "Rückfrage nicht umlagefähige Kosten",
      "inhalt": "Moin, können Sie die 17.330 Euro nicht umlagefähige Nebenkosten aufschlüsseln? Dann kann ich rechnen.",
      "teilnehmer": "Jörg Timmermann",
      "belegNr": "2026-000801",
      "festgeschrieben": true,
      "outlook": false,
      "anhaenge": []
    },
    {
      "id": "vg_09",
      "objektId": "obj_rewe",
      "kontaktId": "kt_bruns",
      "art": "Telefon",
      "richtung": "ein",
      "zeitpunkt": "2026-08-18T17:22",
      "betreff": "Interesse am Objekt, 6 Minuten",
      "inhalt": "Herr Bruns hat vom Objekt über eine Empfehlung erfahren. Vertraulichkeitserklärung wurde per Mail zugesagt. Hinweis auf Adressvalidierung als Erstkunde erteilt.",
      "teilnehmer": "Heiko Bruns",
      "belegNr": "2026-000795",
      "festgeschrieben": true,
      "outlook": false,
      "anhaenge": []
    },
    {
      "id": "vg_10",
      "objektId": "obj_rewe",
      "kontaktId": "kt_bruns",
      "art": "E-Mail",
      "richtung": "aus",
      "zeitpunkt": "2026-08-18T17:40",
      "betreff": "Vertraulichkeitserklärung und Adressvalidierung",
      "inhalt": "Anbei die Vertraulichkeitserklärung. Als Erstkunde benötigen wir zusätzlich eine Ausweiskopie und die Meldeadresse zur Validierung, bevor wir das Exposé versenden dürfen.",
      "teilnehmer": "Heiko Bruns",
      "belegNr": "2026-000796",
      "festgeschrieben": true,
      "outlook": true,
      "anhaenge": [
        "Vertraulichkeitserklaerung.pdf"
      ]
    },
    {
      "id": "vg_11",
      "objektId": "obj_nahv",
      "kontaktId": "kt_ehlers",
      "art": "E-Mail",
      "richtung": "aus",
      "zeitpunkt": "2026-08-17T11:15",
      "betreff": "Provisionsvereinbarung und fehlende Unterlagen",
      "inhalt": "Anbei die Provisionsvereinbarung. Ohne Flurkarte und die Mietvertragsnachträge können wir kein Exposé erstellen.",
      "teilnehmer": "Anke Ehlers",
      "belegNr": "2026-000778",
      "festgeschrieben": true,
      "outlook": true,
      "anhaenge": [
        "Provisionsvereinbarung.pdf"
      ]
    },
    {
      "id": "vg_12",
      "objektId": "obj_wgh",
      "kontaktId": "kt_weser",
      "art": "E-Mail",
      "richtung": "ein",
      "zeitpunkt": "2026-08-15T14:03",
      "betreff": "Finanzierungsbestätigung Delmenhorst",
      "inhalt": "Anbei die Finanzierungsbestätigung unserer Bank. Wir halten an der Reservierung fest und bitten um einen Notartermin.",
      "teilnehmer": "Jörg Timmermann",
      "belegNr": "2026-000761",
      "festgeschrieben": true,
      "outlook": true,
      "anhaenge": [
        "Finanzierungsbestaetigung.pdf"
      ]
    }
  ],
  "termine": [
    {
      "id": "tm_1",
      "objektId": "obj_rewe",
      "kontaktId": "kt_nordkap",
      "titel": "Nordkap nach Beiratssitzung nachhaken",
      "art": "Wiedervorlage",
      "faellig": "2026-09-03",
      "stufe": 1,
      "status": "offen",
      "regel": "Stufe 1 E-Mail · Stufe 2 nach 3 Tagen Anruf · Stufe 3 nach 7 Tagen Eigentümer informieren",
      "erledigtAm": null
    },
    {
      "id": "tm_2",
      "objektId": "obj_rewe",
      "kontaktId": "kt_weser",
      "titel": "Aufschlüsselung nicht umlagefähige Kosten senden",
      "art": "Wiedervorlage",
      "faellig": "2026-08-21",
      "stufe": 2,
      "status": "offen",
      "regel": "Stufe 1 E-Mail · Stufe 2 nach 1 Tag Anruf · Stufe 3 nach 3 Tagen Eigentümer einbinden",
      "erledigtAm": null
    },
    {
      "id": "tm_3",
      "objektId": "obj_rewe",
      "kontaktId": "kt_bruns",
      "titel": "Adressvalidierung Bruns abschließen, dann Exposé",
      "art": "Frist",
      "faellig": "2026-08-25",
      "stufe": 1,
      "status": "offen",
      "regel": "Ohne abgeschlossene Validierung kein Exposé-Versand",
      "erledigtAm": null
    },
    {
      "id": "tm_4",
      "objektId": "obj_rewe",
      "kontaktId": "kt_hansen",
      "titel": "Erbbaurechtsvertrag und Energieausweis anmahnen",
      "art": "Wiedervorlage",
      "faellig": "2026-08-19",
      "stufe": 3,
      "status": "offen",
      "regel": "Stufe 1 E-Mail · Stufe 2 Anruf · Stufe 3 schriftliche Mahnung mit Frist",
      "erledigtAm": null
    },
    {
      "id": "tm_5",
      "objektId": "obj_nahv",
      "kontaktId": "kt_ehlers",
      "titel": "Rücklauf Provisionsvereinbarung prüfen",
      "art": "Wiedervorlage",
      "faellig": "2026-08-24",
      "stufe": 1,
      "status": "offen",
      "regel": "Stufe 1 E-Mail · Stufe 2 nach 3 Tagen Anruf",
      "erledigtAm": null
    },
    {
      "id": "tm_6",
      "objektId": "obj_wgh",
      "kontaktId": "kt_weser",
      "titel": "Notartermin abstimmen",
      "art": "Termin",
      "faellig": "2026-09-05",
      "stufe": 1,
      "status": "offen",
      "regel": "Reservierung läuft am 05.09. aus",
      "erledigtAm": null
    },
    {
      "id": "tm_7",
      "objektId": "obj_rewe",
      "kontaktId": "kt_hansen",
      "titel": "Fotos Dachfläche beim Ortstermin aufnehmen",
      "art": "Termin",
      "faellig": "2026-08-27",
      "stufe": 1,
      "status": "offen",
      "regel": "Flachdach, Fotos sind Pflichtunterlage fürs Exposé",
      "erledigtAm": null
    }
  ],
  "fotos": []
};

/* Pflichtunterlagen, ohne die kein Exposé gebaut wird. Neue Objekte
   bekommen diese Liste automatisch. */
W.PFLICHTUNTERLAGEN = [
  ["Fotos Außenansicht", "Foto"], ["Fotos Gebäudetechnik", "Foto"], ["Fotos Dachfläche", "Foto"],
  ["Flurkarte", "Lage"], ["Lageplan / Landkarte", "Lage"], ["Stellplatznachweis", "Lage"],
  ["Strukturdaten des Standorts", "Lage"],
  ["Mietvertrag mit Nachträgen", "Vertrag"], ["Grundbuchauszug", "Vertrag"],
  ["Erbbaurechtsvertrag", "Vertrag"], ["Provisionsvereinbarung Eigentümer", "Vertrag"],
  ["Energieausweis", "Nachweis"], ["Nebenkostenabrechnung 2025", "Nachweis"],
  ["Baugenehmigung", "Nachweis"], ["Versicherungsnachweis", "Nachweis"]
];
