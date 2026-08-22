/* Wiederkehrende Bausteine: Symbole, Marken, Zeitschiene, leere Zustaende.
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
    warnung: function (g) { return svg('<circle cx="12" cy="12" r="9"/><path d="M12 7.5v5M12 16h.01"/>', g); }
  };

  /* --- Marken ---------------------------------------------------------- */

  W.STATUS_TEXT = { offen: 'Offen', in_bearbeitung: 'In Bearbeitung', abgeschlossen: 'Abgeschlossen' };
  var STATUS_KLASSE = { offen: 'onyx-marke-ruht', in_bearbeitung: 'onyx-marke-laeuft', abgeschlossen: 'onyx-marke-fertig' };

  W.b = {
    statusmarke: function (status, klein) {
      return '<span class="onyx-marke ' + STATUS_KLASSE[status] + '"' +
        (klein ? ' style="font-size:10.5px;padding:.1rem .5rem"' : '') + '>' +
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

    /* --- Zeitschiene --------------------------------------------------- */
    terminschiene: function (objekte, heute) {
      var WOCHEN = 5, TAG = 86400000;
      var start = W.f.wochenStart(heute);
      var ende = new Date(start.getTime() + WOCHEN * 7 * TAG);
      var spanne = ende - start;
      var anteil = function (d) { return ((d - start) / spanne) * 100; };
      var heuteAnteil = Math.min(100, Math.max(0, anteil(heute)));

      var mitFrist = objekte.filter(function (o) { return o.frist; })
        .sort(function (a, b) { return (a.frist || '').localeCompare(b.frist || ''); });

      if (!mitFrist.length) return W.b.leer('Keine Akte mit Frist in Arbeit.');

      var kopf = '';
      for (var i = 0; i < WOCHEN; i++) {
        var w = new Date(start.getTime() + i * 7 * TAG);
        kopf += '<span class="onyx-etikett" style="padding-left:.5rem">KW ' + W.f.isoKw(w) + '</span>';
      }
      var raster = new Array(WOCHEN + 1).join('<span></span>');

      var zeilen = mitFrist.map(function (o) {
        var frist = new Date(o.frist);
        var tage = W.f.tageBis(o.frist, heute);
        var ueber = tage !== null && tage < 0;
        var bis = Math.min(100, anteil(frist));
        var von = ueber ? 0 : Math.max(0, Math.min(heuteAnteil, anteil(frist)));
        var breite = ueber ? Math.max(3, heuteAnteil - von) : Math.max(3, bis - von);
        return '<a class="schiene-zeile" href="#/objekt/' + h(o.id) + '" ' +
          'title="' + h(o.aktenzeichen + ', ' + o.strasse + ', Frist ' + W.f.datum(o.frist)) + '">' +
          '<span class="schiene-balken' + (ueber ? ' ist-warn' : '') + '" ' +
          'style="left:' + von + '%;width:' + breite + '%">' +
          '<span class="mono" style="font-size:10.5px">' + h(o.aktenzeichen.replace(/^GA-\d{4}-/, '')) + '</span>' +
          '</span></a>';
      }).join('');

      return '<div class="onyx-karte" style="padding:1.25rem">' +
        '<div class="onyx-schiene">' +
          '<div class="onyx-schiene-raster" style="grid-template-columns:repeat(' + WOCHEN + ',1fr)" aria-hidden="true">' + raster + '</div>' +
          '<div style="position:relative;display:grid;grid-template-columns:repeat(' + WOCHEN + ',1fr);margin-bottom:.75rem">' + kopf + '</div>' +
          '<div style="position:relative;display:grid;gap:.6rem">' +
            '<span aria-hidden="true" style="position:absolute;top:0;bottom:0;width:1px;background:var(--onyx-amber);opacity:.45;left:' + heuteAnteil + '%"></span>' +
            zeilen +
          '</div>' +
        '</div>' +
        '<p class="mini leise" style="margin-top:1rem;padding-top:.75rem;border-top:1px solid var(--onyx-kontur-leise)">' +
          'Balkenende ist die Abgabefrist. Die senkrechte Linie ist heute.</p>' +
        '</div>';
    }
  };
})();
