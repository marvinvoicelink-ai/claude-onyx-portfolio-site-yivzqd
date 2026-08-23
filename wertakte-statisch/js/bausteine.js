/* Wiederkehrende Bausteine: Symbole, Marken, Kalender, leere Zustaende.
   Alles liefert HTML als Zeichenkette, gezeichnet wird in seiten.js. */
window.W = window.W || {};
(function () {
  var h = W.f.h;

  /* Symbole als Inline-SVG, Strichstaerke einheitlich 1.6. */
  function svg(pfad, groesse) {
    return '<svg width="' + (groesse || 18) + '" height="' + (groesse || 18) + '" viewBox="0 0 24 24" fill="none" ' +
      'stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + pfad + '</svg>';
  }

  W.sym = {
    uebersicht: function (g) { return svg('<rect x="3" y="3" width="7.5" height="7.5" rx="1.5"/><rect x="13.5" y="3" width="7.5" height="7.5" rx="1.5"/><rect x="3" y="13.5" width="7.5" height="7.5" rx="1.5"/><rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.5"/>', g); },
    objekte: function (g) { return svg('<path d="M3 21h18"/><path d="M5 21V6l7-3 7 3v15"/><path d="M9.5 10h1M9.5 14h1M13.5 10h1M13.5 14h1"/>', g); },
    auftraggeber: function (g) { return svg('<circle cx="9" cy="8" r="3.2"/><path d="M3 20a6 6 0 0 1 12 0"/><path d="M16 5.2a3 3 0 0 1 0 5.6M17.5 20a5.8 5.8 0 0 0-2-4.4"/>', g); },
    suche: function (g) { return svg('<circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5 21 21"/>', g); },
    glocke: function (g) { return svg('<path d="M18 9a6 6 0 1 0-12 0c0 5-2 6-2 6h16s-2-1-2-6"/><path d="M10.3 20a2 2 0 0 0 3.4 0"/>', g); },
    abmelden: function (g) { return svg('<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5"/><path d="M21 12H9"/>', g); },
    plus: function (g) { return svg('<path d="M12 5v14M5 12h14"/>', g); },
    pfeilLinks: function (g) { return svg('<path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>', g); },
    pfeilRechts: function (g) { return svg('<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>', g); },
    kamera: function (g) { return svg('<path d="M3 8.5A1.5 1.5 0 0 1 4.5 7h2.2l1.3-2h7l1.3 2h2.2A1.5 1.5 0 0 1 20 8.5v9A1.5 1.5 0 0 1 18.5 19h-13A1.5 1.5 0 0 1 4 17.5z"/><circle cx="12" cy="13" r="3.4"/>', g); },
    hochladen: function (g) { return svg('<path d="M12 16V4"/><path d="m7.5 8.5 4.5-4.5 4.5 4.5"/><path d="M4 16v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3"/>', g); },
    bild: function (g) { return svg('<rect x="3" y="4.5" width="18" height="15" rx="2"/><circle cx="8.5" cy="10" r="1.6"/><path d="m3.5 17 5-4.5 4 3.5 3-2.5 5 4"/>', g); },
    dokument: function (g) { return svg('<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/><path d="M9 13h6M9 17h4"/>', g); },
    drucken: function (g) { return svg('<path d="M7 8V3h10v5"/><path d="M7 18H5a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2"/><rect x="7" y="14" width="10" height="7" rx="1"/>', g); },
    kalender: function (g) { return svg('<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>', g); },
    ort: function (g) { return svg('<path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11"/><circle cx="12" cy="10" r="2.6"/>', g); },
    telefon: function (g) { return svg('<path d="M5 3h3.5l1.7 4.2-2.1 1.5a12 12 0 0 0 5.2 5.2l1.5-2.1L19 13.5V17a2 2 0 0 1-2.2 2A16 16 0 0 1 3 5.2 2 2 0 0 1 5 3"/>', g); },
    brief: function (g) { return svg('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 6.5 8.5 6 8.5-6"/>', g); },
    stift: function (g) { return svg('<path d="M4 20h4l10.5-10.5a2.1 2.1 0 0 0-3-3L5 17z"/>', g); },
    papierkorb: function (g) { return svg('<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/>', g); },
    schliessen: function (g) { return svg('<path d="M6 6l12 12M18 6 6 18"/>', g); },
    filter: function (g) { return svg('<path d="M3 5h18M6 12h12M10 19h4"/>', g); },
    liste: function (g) { return svg('<path d="M8 6h13M8 12h13M8 18h13M3.5 6h.01M3.5 12h.01M3.5 18h.01"/>', g); },
    warnung: function (g) { return svg('<circle cx="12" cy="12" r="9"/><path d="M12 7.5v5M12 16h.01"/>', g); },
    haken: function (g) { return svg('<path d="m5 12.5 4.5 4.5L19 7"/>', g); },
    uhr: function (g) { return svg('<circle cx="12" cy="12" r="9"/><path d="M12 7v5.2l3.2 2"/>', g); },
    ordner: function (g) { return svg('<path d="M3 7a2 2 0 0 1 2-2h4l2 2.5h8a2 2 0 0 1 2 2V18a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>', g); },
    investor: function (g) { return svg('<path d="M3 20h18"/><path d="M6 20v-6M10.5 20V9M15 20v-9.5M19.5 20V5"/>', g); },
    chat: function (g) { return svg('<path d="M20 15.5a2 2 0 0 1-2 2H8l-4 3.5v-15a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2z"/><path d="M8 9h8M8 12.5h5"/>', g); },
    mailAus: function (g) { return svg('<rect x="3" y="5.5" width="18" height="13" rx="2"/><path d="m3.5 7 8.5 5.5L20.5 7"/><path d="M17 3.5 20.5 7 17 10.5"/>', g); },
    fahne: function (g) { return svg('<path d="M5 21V4"/><path d="M5 5h11l-1.6 3.2L16 11.5H5"/>', g); },
    zahnrad: function (g) { return svg('<circle cx="12" cy="12" r="3.2"/><path d="M12 3v2.2M12 18.8V21M21 12h-2.2M5.2 12H3M18.4 5.6l-1.6 1.6M7.2 16.8l-1.6 1.6M18.4 18.4l-1.6-1.6M7.2 7.2 5.6 5.6"/>', g); },
    siegel: function (g) { return svg('<circle cx="12" cy="9.5" r="5.5"/><path d="m8.5 14.5-1 6 4.5-2.2 4.5 2.2-1-6"/>', g); }
  };

  /* --- Marken ---------------------------------------------------------- */

  W.STATUS_TEXT = { offen: 'Offen', in_bearbeitung: 'In Bearbeitung', abgeschlossen: 'Abgeschlossen' };
  var STATUS_KLASSE = { offen: 'onyx-marke-ruht', in_bearbeitung: 'onyx-marke-laeuft', abgeschlossen: 'onyx-marke-fertig' };

  W.b = {
    statusmarke: function (status, klein) {
      return '<span class="onyx-marke ' + STATUS_KLASSE[status] + '"' +
        (klein ? ' style="font-size:.66rem;padding:.1rem .5rem"' : '') + '>' +
        h(W.STATUS_TEXT[status]) + '</span>';
    },

    /** Rot ab Fristablauf, Amber vier Tage davor, sonst still. */
    fristmarke: function (frist, erledigt) {
      var tage = W.f.tageBis(frist);
      if (tage === null) return '<span class="still">Keine Frist</span>';
      if (erledigt) return '<span class="still">abgegeben</span>';
      var klasse = tage < 0 ? 'warn' : (tage <= 4 ? 'amber' : 'leise');
      return '<span class="' + klasse + '">' + h(W.f.fristText(tage)) + '</span>';
    },

    etikett: function (text) { return '<span class="onyx-etikett">' + h(text) + '</span>'; },

    datenzeile: function (etikett, wert, mono, weit) {
      return '<div' + (weit ? ' class="weit"' : '') + '>' +
        '<dt class="onyx-etikett">' + h(etikett) + '</dt>' +
        '<dd style="margin-top:.25rem;font-size:.9375rem;line-height:1.35"' + (mono ? ' class="mono"' : '') + '>' +
        wert + '</dd></div>';
    },

    leer: function (titel, text) {
      return '<div class="onyx-leer" style="padding:2.5rem 1.5rem;text-align:center">' +
        '<p style="font-size:.9375rem">' + h(titel) + '</p>' +
        (text ? '<p class="klein leise" style="margin-top:.4rem;max-width:42ch;margin-inline:auto;line-height:1.65">' + h(text) + '</p>' : '') +
        '</div>';
    },

    /* --- Monatskalender ------------------------------------------------
       Ein Blatt wie im Kalender an der Wand: oben der Monat, darunter die
       Wochen. Die Farbe sagt, wie dringend es ist - rot ueberfaellig oder
       letzte Stufe, amber in den naechsten Tagen, grau spaeter. Ein Tippen
       auf einen Tag zeigt unten nur diesen Tag. */
    monatskalender: function (termine, heute, d, monatIso, adresse, tagGewaehlt) {
      var jetzt = new Date(heute.getFullYear(), heute.getMonth(), heute.getDate());
      var teile = String(monatIso || '').split('-');
      var jahr = parseInt(teile[0], 10), monat = parseInt(teile[1], 10) - 1;
      if (isNaN(jahr) || isNaN(monat)) { jahr = jetzt.getFullYear(); monat = jetzt.getMonth(); }

      function iso(datum) {
        return datum.getFullYear() + '-' + String(datum.getMonth() + 1).padStart(2, '0') +
          '-' + String(datum.getDate()).padStart(2, '0');
      }
      function monatWert(j, m) { return j + '-' + String(m + 1).padStart(2, '0'); }

      var proTag = {};
      (termine || []).forEach(function (t) {
        if (!t.faellig) return;
        (proTag[t.faellig] = proTag[t.faellig] || []).push(t);
      });

      function dringlichkeit(t) {
        if (t.status === 'erledigt') return 'ist-durch';
        var tage = W.f.tageBis(t.faellig, jetzt);
        if ((tage !== null && tage < 0) || t.stufe >= 3) return 'ist-warn';
        if (tage !== null && tage <= 3) return 'ist-bald';
        return '';
      }

      var erster = new Date(jahr, monat, 1);
      var start = new Date(jahr, monat, 1 - ((erster.getDay() + 6) % 7));
      var heuteIso = iso(jetzt);

      var wochentage = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'].map(function (w) {
        return '<span class="kal-wochentag">' + w + '</span>';
      }).join('');

      var zellen = '';
      for (var i = 0; i < 42; i++) {
        var tag = new Date(start.getFullYear(), start.getMonth(), start.getDate() + i);
        var tagIso = iso(tag);
        var drin = proTag[tagIso] || [];
        var fremd = tag.getMonth() !== monat;
        var klassen = 'kal-tag' + (fremd ? ' ist-fremd' : '') +
          (tagIso === heuteIso ? ' ist-heute' : '') +
          (tagIso === tagGewaehlt ? ' ist-gewaehlt' : '') +
          (drin.length ? ' hat-termine' : '');

        var punkte = drin.slice(0, 3).map(function (t) {
          return '<span class="kal-eintrag ' + dringlichkeit(t) + '">' + h(t.titel) + '</span>';
        }).join('');
        if (drin.length > 3) punkte += '<span class="kal-mehr mono">+' + (drin.length - 3) + '</span>';

        var inhalt = '<span class="kal-zahl mono">' + tag.getDate() + '</span>' +
          (drin.length ? '<span class="kal-liste">' + punkte + '</span>' : '');

        zellen += drin.length
          ? '<a class="' + klassen + '" href="' + h(adresse(monatWert(jahr, monat), tagIso === tagGewaehlt ? '' : tagIso)) + '" ' +
            'title="' + h(W.f.datum(tagIso) + ' · ' + drin.length + (drin.length === 1 ? ' Termin' : ' Termine')) + '">' + inhalt + '</a>'
          : '<span class="' + klassen + '">' + inhalt + '</span>';
      }

      var titel = new Date(jahr, monat, 1).toLocaleDateString('de-DE', { month: 'long', year: 'numeric' });
      var vor = monatWert(monat === 0 ? jahr - 1 : jahr, monat === 0 ? 11 : monat - 1);
      var zurueck = monatWert(monat === 11 ? jahr + 1 : jahr, monat === 11 ? 0 : monat + 1);

      return '<section class="kalender">' +
        '<div class="kal-kopf">' +
          '<h2 class="kal-monat">' + h(titel) + '</h2>' +
          '<span class="kal-steuer">' +
            '<a class="onyx-knopf onyx-knopf-leise" href="' + h(adresse(vor, '')) + '" aria-label="Vorheriger Monat">' + W.sym.pfeilLinks(16) + '</a>' +
            '<a class="onyx-knopf onyx-knopf-leise" href="' + h(adresse(monatWert(jetzt.getFullYear(), jetzt.getMonth()), '')) + '">Heute</a>' +
            '<a class="onyx-knopf onyx-knopf-leise" href="' + h(adresse(zurueck, '')) + '" aria-label="Nächster Monat">' + W.sym.pfeilRechts(16) + '</a>' +
          '</span>' +
        '</div>' +
        '<div class="kal-gitter">' + wochentage + zellen + '</div>' +
        '<p class="kal-legende">' +
          '<span><i class="ist-warn"></i>überfällig oder letzte Stufe</span>' +
          '<span><i class="ist-bald"></i>in den nächsten Tagen</span>' +
          '<span><i></i>später</span>' +
          '<span><i class="ist-durch"></i>erledigt</span>' +
        '</p>' +
      '</section>';
    }
  };
})();


/* --- Teil 2: Bausteine der Objektakte ----------------------------------- */
(function () {
  var h = W.f.h, sym = W.sym;

  W.OBJEKT_STATUS = ['akquise', 'unterlagen', 'expose', 'vermarktung', 'reserviert', 'abgeschlossen'];
  W.OBJEKT_STATUS_TEXT = {
    akquise: 'Akquise', unterlagen: 'Unterlagen', expose: 'Exposé in Arbeit',
    vermarktung: 'In Vermarktung', reserviert: 'Reserviert', abgeschlossen: 'Abgeschlossen'
  };
  var OBJEKT_MARKE = {
    akquise: 'onyx-marke-ruht', unterlagen: 'onyx-marke-ruht', expose: 'onyx-marke-laeuft',
    vermarktung: 'onyx-marke-laeuft', reserviert: 'onyx-marke-fertig', abgeschlossen: 'onyx-marke-fertig'
  };

  W.UNTERLAGE_STATUS = ['fehlt', 'angefordert', 'vorhanden'];
  var UNTERLAGE_MARKE = { fehlt: 'onyx-marke-warn', angefordert: 'onyx-marke-laeuft', vorhanden: 'onyx-marke-fertig' };

  W.b.objektmarke = function (status, klein) {
    return '<span class="onyx-marke ' + (OBJEKT_MARKE[status] || 'onyx-marke-ruht') + '"' +
      (klein ? ' style="font-size:.66rem;padding:.1rem .5rem"' : '') + '>' +
      h(W.OBJEKT_STATUS_TEXT[status] || status) + '</span>';
  };

  W.b.unterlagenmarke = function (status) {
    return '<span class="onyx-marke ' + (UNTERLAGE_MARKE[status] || 'onyx-marke-ruht') +
      '" style="font-size:.66rem;padding:.1rem .5rem">' + h(status) + '</span>';
  };

  /** Ampel für einen Compliance-Punkt: unterzeichnet/geprüft ist gut, offen ist rot. */
  W.b.pruefmarke = function (status) {
    var s = String(status || '').toLowerCase();
    var klasse = /unterzeichnet|geprüft|hinterlegt|erledigt/.test(s) ? 'onyx-marke-fertig'
      : (/offen|fehlt/.test(s) ? 'onyx-marke-warn' : 'onyx-marke-laeuft');
    return '<span class="onyx-marke ' + klasse + '" style="font-size:.66rem;padding:.1rem .5rem">' + h(status) + '</span>';
  };

  /** Eskalationsstufe einer Wiedervorlage. Stufe 3 ist rot, das ist die letzte. */
  W.b.eskalation = function (stufe) {
    var klasse = stufe >= 3 ? 'ist-drei' : (stufe === 2 ? 'ist-zwei' : 'ist-eins');
    var punkte = '';
    for (var i = 1; i <= 3; i++) punkte += '<span' + (i <= stufe ? ' class="voll"' : '') + '></span>';
    return '<span class="eskalation ' + klasse + '" title="Eskalationsstufe ' + stufe + ' von 3">' +
      punkte + '<span class="mini">Stufe ' + stufe + '</span></span>';
  };

  /** Balken mit Anteil, z. B. vorhandene Pflichtunterlagen. */
  W.b.fortschritt = function (ist, soll) {
    var pro = soll ? Math.round((ist / soll) * 100) : 0;
    /* „flex“ greift nur dort, wo der Balken neben der Zahl in einer Reihe
       steht — sonst bleibt er wie bisher ein Block ueber die volle Breite. */
    return '<span class="onyx-balken" style="display:block;flex:1;min-width:3rem"><span style="width:' + pro + '%"></span></span>';
  };

  W.KOMM_ARTEN = ['E-Mail', 'Telefon', 'WhatsApp', 'SMS', 'Brief', 'Notiz'];

  W.b.kommSymbol = function (art, richtung, g) {
    if (art === 'E-Mail') return richtung === 'aus' ? sym.mailAus(g) : sym.brief(g);
    if (art === 'Telefon') return sym.telefon(g);
    if (art === 'WhatsApp' || art === 'SMS') return sym.chat(g);
    if (art === 'Brief') return sym.dokument(g);
    return sym.stift(g);
  };

  W.b.richtungText = function (richtung) { return richtung === 'aus' ? 'ausgehend' : 'eingehend'; };

  /** Geldbetrag in Euro, ohne Nachkommastellen. */
  W.b.euro = function (n) {
    if (n === null || n === undefined || n === '') return '–';
    return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n);
  };

  /** Kaufpreisfaktor, aus Kaufpreis und Jahresmiete gerechnet, nicht erfunden. */
  W.b.faktor = function (kaufpreis, miete) {
    if (!kaufpreis || !miete) return '–';
    return (kaufpreis / miete).toFixed(2).replace('.', ',') + '-fach';
  };
})();
