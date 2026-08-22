/* Alle Seiten der Anwendung. Jede Funktion liefert HTML als Zeichenkette,
   der Router in app.js haengt es ein und verdrahtet die Ereignisse. */
window.W = window.W || {};
(function () {
  var h = W.f.h, b = W.b, sym = W.sym;

  W.KONTO = {
    email: 'gutachter@demo.wertakte.de',
    passwort: 'ortstermin',
    name: 'Dipl.-Ing. K. Ahlers',
    rolle: 'Öffentlich bestellte und vereidigte Sachverständige für Immobilienbewertung',
    buero: 'Sachverständigenbüro Ahlers',
    strasse: 'Gartenstraße 21',
    ort: '26122 Oldenburg',
    telefon: '0441 3609-27',
    emailBuero: 'buero@sv-ahlers-beispiel.de'
  };

  W.OBJEKTTYPEN = ['Einfamilienhaus', 'Doppelhaushälfte', 'Reihenmittelhaus', 'Mehrfamilienhaus',
    'Eigentumswohnung', 'Gewerbeobjekt', 'Unbebautes Grundstück'];
  W.ANLAESSE = ['Verkehrswertgutachten', 'Beleihungswertgutachten', 'Marktwertermittlung',
    'Mietwertgutachten', 'Schadensgutachten'];
  W.STATUS = ['offen', 'in_bearbeitung', 'abgeschlossen'];
  W.KATEGORIEN = ['Außenansicht', 'Innenraum', 'Mangel/Schaden', 'Ausstattung', 'Umgebung'];

  /* --- Hilfen ---------------------------------------------------------- */

  function ag(d, id) { return d.auftraggeber.filter(function (a) { return a.id === id; })[0]; }
  function obj(d, id) { return d.objekte.filter(function (o) { return o.id === id; })[0]; }
  function fotosZu(d, id) {
    return d.fotos.filter(function (f) { return f.objektId === id; })
      .sort(function (a, c) { return a.aufgenommenAm.localeCompare(c.aufgenommenAm); });
  }
  function objekteVon(d, agId) {
    return d.objekte.filter(function (o) { return o.auftraggeberId === agId; })
      .sort(function (a, c) { return a.aktenzeichen.localeCompare(c.aktenzeichen); });
  }
  function alle(d) {
    return d.objekte.slice().sort(function (a, c) { return a.aktenzeichen.localeCompare(c.aktenzeichen); });
  }
  /** Adresse eines Fotos: Beispielbild aus dem Ordner oder selbst aufgenommen. */
  function src(foto, bilder) {
    if (foto.quelle.indexOf('idb:') === 0) return bilder[foto.quelle.slice(4)] || '';
    return foto.quelle;
  }
  W.hilfen = { ag: ag, obj: obj, fotosZu: fotosZu, objekteVon: objekteVon, alle: alle, src: src };

  function auswahl(name, werte, gewaehlt, ersteZeile) {
    var opt = ersteZeile ? '<option value="">' + h(ersteZeile) + '</option>' : '';
    opt += werte.map(function (w) {
      var wert = typeof w === 'string' ? w : w.wert;
      var text = typeof w === 'string' ? w : w.text;
      return '<option value="' + h(wert) + '"' + (wert === gewaehlt ? ' selected' : '') + '>' + h(text) + '</option>';
    }).join('');
    return opt;
  }

  /* --- Anmeldung -------------------------------------------------------- */

  W.seiten = {};

  W.seiten.anmelden = function (d) {
    var laufend = alle(d).filter(function (o) { return o.status !== 'abgeschlossen'; }).length;
    return '<main class="tor"><div class="onyx-rahmen tor-fenster">' +
      '<section class="tor-bild">' +
        '<p class="wortmarke amber" style="letter-spacing:.3em">Wertakte</p>' +
        '<div style="max-width:30ch">' +
          '<h1 style="font-size:clamp(2rem,1.4rem+2vw,3rem);line-height:1.08">Jede Akte, jedes Foto, jede Frist an einem Ort.</h1>' +
          '<p class="leise" style="margin-top:1.5rem;font-size:.9375rem;line-height:1.7;max-width:46ch">' +
            'Objekt- und Gutachtenverwaltung für das ' + h(W.KONTO.buero) + ', Oldenburg.</p>' +
        '</div>' +
        '<dl style="display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;padding-top:1.5rem;border-top:1px solid var(--onyx-kontur-leise)">' +
          [['Laufende Akten', laufend], ['Fotos im Bestand', d.fotos.length], ['Auftraggeber', d.auftraggeber.length]]
            .map(function (p) {
              return '<div><dt class="onyx-etikett">' + h(p[0]) + '</dt>' +
                '<dd class="mono amber" style="margin-top:.25rem;font-size:1.5rem">' + p[1] + '</dd></div>';
            }).join('') +
        '</dl>' +
      '</section>' +
      '<section class="tor-formular"><div>' +
        '<p class="wortmarke amber" style="letter-spacing:.3em">Wertakte</p>' +
        '<h2 style="margin-top:1.5rem;font-size:1.5rem">Anmeldung</h2>' +
        '<p class="klein leise" style="margin-top:.5rem">Zugang für Mitarbeitende des Sachverständigenbüros.</p>' +
        '<form id="anmelde-formular" style="display:grid;gap:1rem;margin-top:2rem">' +
          '<div class="feld-gruppe"><label class="onyx-etikett" for="email">E-Mail</label>' +
            '<input class="onyx-feld" id="email" name="email" type="email" autocomplete="username" value="' + h(W.KONTO.email) + '" required></div>' +
          '<div class="feld-gruppe"><label class="onyx-etikett" for="passwort">Passwort</label>' +
            '<input class="onyx-feld" id="passwort" name="passwort" type="password" autocomplete="current-password" value="' + h(W.KONTO.passwort) + '" required></div>' +
          '<p id="anmelde-fehler" class="klein" style="display:none;gap:.5rem;color:var(--onyx-warn);background:var(--onyx-warn-flaeche);border:1px solid rgb(217 97 76 / .35);border-radius:var(--onyx-radius-klein);padding:.5rem .75rem"></p>' +
          '<button class="onyx-knopf onyx-knopf-primaer" type="submit" style="margin-top:.5rem">Anmelden</button>' +
        '</form>' +
        '<div style="margin-top:2.5rem;padding-top:1.25rem;border-top:1px solid var(--onyx-kontur-leise)">' +
          '<p class="onyx-etikett">Demo-Zugang</p>' +
          '<dl class="mono klein" style="margin-top:.5rem;line-height:1.7">' +
            '<div style="display:flex;gap:.5rem"><dt class="leise" style="width:5rem;flex:none">E-Mail</dt><dd style="word-break:break-all">' + h(W.KONTO.email) + '</dd></div>' +
            '<div style="display:flex;gap:.5rem"><dt class="leise" style="width:5rem;flex:none">Passwort</dt><dd>' + h(W.KONTO.passwort) + '</dd></div>' +
          '</dl>' +
          '<p class="mini leise" style="margin-top:.75rem;line-height:1.7">Vorführversion mit Beispieldaten. Die Zugangsdaten sind ausgefüllt, ein Klick genügt.</p>' +
        '</div>' +
      '</div></section>' +
    '</div></main>';
  };

  /* --- Übersicht -------------------------------------------------------- */

  W.seiten.uebersicht = function (d) {
    var heute = new Date();
    var laufend = alle(d).filter(function (o) { return o.status !== 'abgeschlossen'; });
    var nachFrist = laufend.slice().sort(function (a, c) {
      return (a.frist || '9999').localeCompare(c.frist || '9999');
    });
    var ueber = nachFrist.filter(function (o) {
      var t = W.f.tageBis(o.frist, heute); return t !== null && t < 0;
    });
    var termine = alle(d).filter(function (o) { return o.ortstermin && new Date(o.ortstermin) >= heute; })
      .sort(function (a, c) { return (a.ortstermin || '').localeCompare(c.ortstermin || ''); });

    var kacheln = [
      ['Akten in Arbeit', laufend.length, ''],
      ['Fristen überschritten', ueber.length, ueber.length ? 'warn' : ''],
      ['Ortstermine geplant', termine.length, termine.length ? 'amber' : ''],
      ['Fotos dokumentiert', d.fotos.length, '']
    ].map(function (k) {
      return '<div class="onyx-kachel"><dt class="onyx-etikett">' + h(k[0]) + '</dt>' +
        '<dd class="onyx-kachel-zahl ' + k[2] + '" style="margin-top:.6rem">' +
        String(k[1]).padStart(2, '0') + '</dd></div>';
    }).join('');

    var fristen = nachFrist.length ? '<ul class="onyx-register" style="margin-top:.9rem;border-top:1px solid var(--onyx-kontur-leise)">' +
      nachFrist.map(function (o) {
        var t = W.f.tageBis(o.frist, heute);
        var kl = t !== null && t < 0 ? ' ist-warn' : (t !== null && t <= 4 ? ' ist-bald' : '');
        var a = ag(d, o.auftraggeberId);
        return '<li class="onyx-zeile" style="border-bottom:1px solid var(--onyx-kontur-leise)">' +
          '<a class="zeile-link" href="#/objekt/' + h(o.id) + '">' +
            '<span class="balken-links' + kl + '"></span>' +
            '<span class="wachsen">' +
              '<span class="mono still" style="font-size:11.5px">' + h(o.aktenzeichen) + '</span>' +
              '<span class="kuerzen" style="display:block;font-size:.9375rem">' + h(o.strasse + ', ' + o.plz + ' ' + o.ort) + '</span>' +
              '<span class="kuerzen klein leise" style="display:block">' + h(o.bewertungsanlass + ' · ' + (a ? a.name : '')) + '</span>' +
            '</span>' +
            '<span style="text-align:right;flex:none">' +
              '<span class="mono klein" style="display:block">' + h(W.f.datum(o.frist)) + '</span>' +
              '<span class="mini" style="display:block">' + b.fristmarke(o.frist) + '</span>' +
            '</span>' +
          '</a></li>';
      }).join('') + '</ul>'
      : b.leer('Keine Akte ist derzeit in Arbeit.', 'Neue Aufträge legst du über „Objekt anlegen“ an.');

    var terminListe = termine.length ? '<ul style="display:grid;gap:.75rem;margin-top:.9rem">' +
      termine.map(function (o) {
        var dt = new Date(o.ortstermin);
        return '<li><a class="onyx-karte onyx-karte-klick" style="display:flex;gap:1rem;padding:1rem" href="#/objekt/' + h(o.id) + '">' +
          '<span class="termin-tag">' +
            '<span class="mono" style="display:block;font-size:10.5px;text-transform:uppercase;letter-spacing:.06em">' + h(W.f.monat(o.ortstermin)) + '</span>' +
            '<span class="mono" style="display:block;font-size:1.25rem;line-height:1.2">' + String(dt.getDate()).padStart(2, '0') + '</span>' +
          '</span>' +
          '<span style="min-width:0">' +
            '<span class="kuerzen" style="display:block;font-size:.9375rem">' + h(o.strasse) + '</span>' +
            '<span class="klein leise" style="display:flex;align-items:center;gap:.4rem;margin-top:.15rem">' + sym.kalender(13) + h(W.f.datumZeit(o.ortstermin)) + '</span>' +
            '<span style="display:inline-block;margin-top:.5rem">' + b.statusmarke(o.status, true) + '</span>' +
          '</span></a></li>';
      }).join('') + '</ul>'
      : b.leer('Kein Ortstermin geplant.', 'Termine trägst du direkt in der Akte ein.');

    return '<div class="kopfzeile-seite"><div>' +
        '<h1>Übersicht</h1>' +
        '<p class="klein leise" style="margin-top:.35rem">Stand ' + h(W.f.datum(heute.toISOString())) + ', ' + laufend.length + ' Akten in Arbeit</p>' +
      '</div>' +
      '<a class="onyx-knopf onyx-knopf-primaer" href="#/neu">' + sym.plus(16) + 'Objekt anlegen</a></div>' +
      '<dl class="kacheln-reihe">' + kacheln + '</dl>' +
      '<section style="margin-top:2rem"><h2>Fristen der nächsten Wochen</h2>' +
        '<div style="margin-top:.9rem">' + b.terminschiene(laufend, heute) + '</div></section>' +
      '<div class="spalten">' +
        '<section><div class="abschnitt-kopf"><h2>Fällige Gutachten</h2>' +
          '<a class="klein amber" href="#/objekte" style="display:flex;align-items:center;gap:.3rem">Alle Objekte' + sym.pfeilRechts(13) + '</a></div>' +
          fristen + '</section>' +
        '<section><h2>Nächste Ortstermine</h2>' + terminListe +
          '<p class="hinweis" style="margin-top:1.25rem"><span class="amber" style="flex:none;margin-top:.1rem">' + sym.kamera(17) + '</span>' +
          '<span>Beim Ortstermin öffnest du die Akte auf dem Handy und fotografierst direkt aus dem System heraus. Die Bilder liegen sofort in der richtigen Akte.</span></p>' +
        '</section>' +
      '</div>';
  };

  /* --- Objektliste ------------------------------------------------------ */

  W.seiten.objekte = function (d, q, bilder) {
    var suche = (q.suche || '').toLowerCase().trim();
    var kacheln = q.ansicht === 'kacheln';
    var liste = alle(d);

    var treffer = liste.filter(function (o) {
      if (q.status && o.status !== q.status) return false;
      if (q.auftraggeber && o.auftraggeberId !== q.auftraggeber) return false;
      if (!suche) return true;
      var a = ag(d, o.auftraggeberId);
      return [o.aktenzeichen, o.strasse, o.plz, o.ort, o.objekttyp, o.bewertungsanlass, a ? a.name : '']
        .join(' ').toLowerCase().indexOf(suche) >= 0;
    });

    function href(aenderung) {
      var n = Object.assign({}, q, aenderung);
      var teile = Object.keys(n).filter(function (k) { return n[k]; })
        .map(function (k) { return k + '=' + encodeURIComponent(n[k]); });
      return '#/objekte' + (teile.length ? '?' + teile.join('&') : '');
    }

    var filter = '<div class="filter">' +
      '<span class="still" style="display:none">' + sym.filter(16) + '</span>' +
      '<label class="nur-sr" for="f-status">Nach Status filtern</label>' +
      '<select class="onyx-feld" id="f-status" data-filter="status" style="width:auto;padding:.35rem .7rem;font-size:.8125rem">' +
        auswahl('status', W.STATUS.map(function (s) { return { wert: s, text: W.STATUS_TEXT[s] }; }), q.status || '', 'Alle Status') +
      '</select>' +
      '<label class="nur-sr" for="f-ag">Nach Auftraggeber filtern</label>' +
      '<select class="onyx-feld" id="f-ag" data-filter="auftraggeber" style="width:auto;max-width:15rem;padding:.35rem .7rem;font-size:.8125rem">' +
        auswahl('auftraggeber', d.auftraggeber.map(function (a) { return { wert: a.id, text: a.name }; }), q.auftraggeber || '', 'Alle Auftraggeber') +
      '</select>' +
      (suche ? '<span class="onyx-marke onyx-marke-laeuft">Suche: ' + h(q.suche) + '</span>' : '') +
      ((suche || q.status || q.auftraggeber)
        ? '<a class="onyx-knopf onyx-knopf-klar" style="font-size:.8125rem;padding:.35rem .6rem" href="' +
          (kacheln ? '#/objekte?ansicht=kacheln' : '#/objekte') + '">' + sym.schliessen(13) + 'Zurücksetzen</a>' : '') +
      '</div>';

    var umschalter = '<div class="umschalter">' +
      '<a href="' + href({ ansicht: '' }) + '"' + (!kacheln ? ' aria-current="true"' : '') + '>' + sym.liste(15) + 'Liste</a>' +
      '<a href="' + href({ ansicht: 'kacheln' }) + '"' + (kacheln ? ' aria-current="true"' : '') + '>' + sym.uebersicht(15) + 'Kacheln</a>' +
      '</div>';

    var koerper;
    if (!treffer.length) {
      koerper = '<div class="onyx-leer" style="margin:3rem 0;padding:3.5rem 1.5rem;text-align:center">' +
        '<p style="font-size:.9375rem">Keine Akte passt zu dieser Suche.</p>' +
        '<p class="klein leise" style="margin-top:.4rem">Setze die Filter zurück oder lege den Auftrag neu an.</p>' +
        '<div style="display:flex;flex-wrap:wrap;justify-content:center;gap:.75rem;margin-top:1.5rem">' +
          '<a class="onyx-knopf onyx-knopf-leise" href="#/objekte">Filter zurücksetzen</a>' +
          '<a class="onyx-knopf onyx-knopf-primaer" href="#/neu">' + sym.plus(16) + 'Objekt anlegen</a>' +
        '</div></div>';
    } else if (kacheln) {
      koerper = '<ul class="kachel-gitter">' + treffer.map(function (o) {
        var fs = fotosZu(d, o.id), titel = fs[0], a = ag(d, o.auftraggeberId);
        var bild = titel
          ? '<img src="' + h(src(titel, bilder)) + '" alt="' + h(titel.beschriftung || ('Objektfoto ' + o.strasse)) + '" loading="lazy">'
          : '<span style="position:absolute;inset:0;display:grid;place-items:center;text-align:center;padding:0 1.5rem">' +
            '<span><span class="still">' + sym.bild(26) + '</span>' +
            '<span class="klein leise" style="display:block;margin-top:.5rem">Noch kein Foto in der Akte</span></span></span>';
        return '<li><a class="onyx-karte onyx-karte-klick" style="display:block;height:100%;overflow:hidden" href="#/objekt/' + h(o.id) + '">' +
          '<span class="kachel-bild">' + bild +
            '<span class="bild-marke amber" style="left:0;top:0">' + h(o.aktenzeichen) + '</span>' +
            '<span class="bild-marke mono" style="right:0;bottom:0">' + fs.length + ' ' + (fs.length === 1 ? 'Foto' : 'Fotos') + '</span>' +
          '</span>' +
          '<span style="display:block;padding:1rem">' +
            '<span style="display:block;font-size:.9375rem">' + h(o.strasse) + '</span>' +
            '<span class="klein leise" style="display:block">' + h(o.plz + ' ' + o.ort + ' · ' + o.objekttyp) + '</span>' +
            '<span class="klein kuerzen" style="display:block;margin-top:.75rem">' + h(o.bewertungsanlass) + '</span>' +
            '<span class="klein leise kuerzen" style="display:block">' + h(a ? a.name : '') + '</span>' +
            '<span style="display:flex;align-items:baseline;justify-content:space-between;gap:.75rem;margin-top:1rem;padding-top:.75rem;border-top:1px solid var(--onyx-kontur-leise)">' +
              b.statusmarke(o.status, true) +
              '<span class="mini">' + b.fristmarke(o.frist, o.status === 'abgeschlossen') + '</span>' +
            '</span>' +
          '</span></a></li>';
      }).join('') + '</ul>';
    } else {
      koerper = '<div style="padding:1rem 0">' +
        '<div class="register-kopf">' +
          ['Aktenzeichen', 'Objekt', 'Auftraggeber', 'Fotos', 'Frist', 'Status']
            .map(function (s) { return '<span class="onyx-etikett">' + h(s) + '</span>'; }).join('') +
        '</div><ul class="onyx-register">' +
        treffer.map(function (o) {
          var a = ag(d, o.auftraggeberId), anzahl = fotosZu(d, o.id).length;
          return '<li class="onyx-zeile" style="border-bottom:1px solid var(--onyx-kontur-leise)">' +
            '<a class="register-zeile" href="#/objekt/' + h(o.id) + '">' +
              '<span class="mono still" style="font-size:12.5px">' + h(o.aktenzeichen) + '</span>' +
              '<span style="min-width:0">' +
                '<span class="kuerzen" style="display:block;font-size:.9375rem">' + h(o.strasse) + '</span>' +
                '<span class="kuerzen klein leise" style="display:block">' + h(o.plz + ' ' + o.ort + ' · ' + o.objekttyp + ' · ' + o.bewertungsanlass) + '</span>' +
              '</span>' +
              '<span class="kuerzen klein leise">' + h(a ? a.name : '') + '</span>' +
              '<span class="klein leise mono" style="display:flex;align-items:center;gap:.4rem">' + sym.bild(14) + anzahl + '</span>' +
              '<span class="klein">' +
                '<span class="mono" style="display:block;font-size:12.5px">' + h(W.f.datum(o.frist)) + '</span>' +
                b.fristmarke(o.frist, o.status === 'abgeschlossen') +
              '</span>' +
              '<span style="justify-self:start">' + b.statusmarke(o.status, true) + '</span>' +
            '</a></li>';
        }).join('') + '</ul></div>';
    }

    return '<div class="kopfzeile-seite"><div>' +
        '<h1>Objekte und Gutachtenaufträge</h1>' +
        '<p class="klein leise" style="margin-top:.35rem">' +
          (treffer.length === liste.length ? liste.length + ' Akten im Bestand' : treffer.length + ' von ' + liste.length + ' Akten') +
        '</p></div>' +
        '<a class="onyx-knopf onyx-knopf-primaer" href="#/neu">' + sym.plus(16) + 'Objekt anlegen</a></div>' +
      '<div class="werkzeugleiste">' + filter + umschalter + '</div>' + koerper;
  };
})();

/* --- Teil 2: Akte, Formular, Auftraggeber, Gutachten-Entwurf ----------- */
(function () {
  var h = W.f.h, b = W.b, sym = W.sym, H = W.hilfen;

  function auswahlOpt(werte, gewaehlt, ersteZeile) {
    var opt = ersteZeile ? '<option value="">' + h(ersteZeile) + '</option>' : '';
    return opt + werte.map(function (w) {
      var wert = typeof w === 'string' ? w : w.wert;
      var text = typeof w === 'string' ? w : w.text;
      return '<option value="' + h(wert) + '"' + (wert === gewaehlt ? ' selected' : '') + '>' + h(text) + '</option>';
    }).join('');
  }

  /* --- Akte ------------------------------------------------------------- */

  W.seiten.objekt = function (d, id, bilder) {
    var o = H.obj(d, id);
    if (!o) return W.seiten.nichtGefunden();
    var a = H.ag(d, o.auftraggeberId);
    var fotos = H.fotosZu(d, o.id);
    var ohne = fotos.filter(function (f) { return !f.beschriftung; }).length;

    var statusKnoepfe = W.STATUS.map(function (s) {
      var aktiv = o.status === s;
      return '<button class="onyx-knopf' + (aktiv ? '' : ' onyx-knopf-leise') + '" ' +
        'style="font-size:.8125rem;padding:.35rem .75rem' + (aktiv ? ';background:var(--onyx-amber);color:var(--onyx-auf-amber);cursor:default' : '') + '" ' +
        'data-status="' + h(s) + '"' + (aktiv ? ' disabled' : '') + '>' + h(W.STATUS_TEXT[s]) + '</button>';
    }).join('');

    var galerie = fotos.length
      ? '<ul class="foto-gitter">' + fotos.map(function (f) {
          return '<li><button class="onyx-karte onyx-karte-klick foto-karte" data-foto="' + h(f.id) + '">' +
            '<span class="bild"><img src="' + h(H.src(f, bilder)) + '" alt="' + h(f.beschriftung || 'Objektfoto ohne Beschriftung') + '" loading="lazy">' +
              '<span class="bild-marke amber" style="left:0;bottom:0;text-transform:uppercase;letter-spacing:.06em;font-size:10.5px">' + h(f.kategorie) + '</span>' +
            '</span>' +
            '<span class="foto-text">' + (f.beschriftung
              ? '<span class="zwei-zeilen">' + h(f.beschriftung) + '</span>'
              : '<span class="amber" style="display:flex;align-items:center;gap:.35rem">' + sym.stift(13) + 'Beschriftung fehlt</span>') +
            '</span></button></li>';
        }).join('') + '</ul>'
      : b.leer('Für diese Akte ist noch kein Foto erfasst.',
          'Nimm die Bilder beim Ortstermin direkt mit dem Handy auf. Sie landen sofort hier in der Akte und lassen sich anschließend beschriften.');

    return '<a class="zurueck" href="#/objekte">' + sym.pfeilLinks(14) + 'Alle Objekte</a>' +
      '<header class="akte-kopf" style="margin-top:1rem">' +
        '<p class="mono amber klein" style="letter-spacing:.14em">' + h(o.aktenzeichen) + '</p>' +
        '<div class="akte-kopf-reihe" style="margin-top:.35rem">' +
          '<div><h1>' + h(o.strasse) + '</h1>' +
            '<p class="leise" style="display:flex;align-items:center;gap:.4rem;margin-top:.35rem;font-size:.9375rem">' +
              sym.ort(15) + h(o.plz + ' ' + o.ort + ' · ' + o.objekttyp) + '</p></div>' +
          '<div class="akte-werte">' +
            '<div><p class="onyx-etikett">Abgabefrist</p>' +
              '<p class="mono" style="margin-top:.25rem;font-size:.9375rem">' + h(W.f.datum(o.frist)) + '</p>' +
              '<p class="klein">' + b.fristmarke(o.frist, o.status === 'abgeschlossen') + '</p></div>' +
            '<div><p class="onyx-etikett">Status</p><p style="margin-top:.35rem">' + b.statusmarke(o.status) + '</p></div>' +
          '</div>' +
        '</div>' +
        '<div class="akte-aktionen">' +
          '<div class="status-gruppe"><span class="onyx-etikett" style="margin-right:.25rem">Status setzen</span>' + statusKnoepfe + '</div>' +
          '<a class="onyx-knopf onyx-knopf-primaer" href="#/objekt/' + h(o.id) + '/entwurf">' + sym.dokument(17) + 'Gutachten-Entwurf erstellen</a>' +
        '</div>' +
      '</header>' +

      '<div class="akte-spalten">' +
        '<section class="fotos">' +
          '<div class="abschnitt-kopf"><h2>Fotodokumentation</h2>' +
            '<p class="klein leise mono">' + fotos.length + ' ' + (fotos.length === 1 ? 'Foto' : 'Fotos') +
            (ohne ? '<span class="amber"> · ' + ohne + ' ohne Beschriftung</span>' : '') + '</p></div>' +
          '<div class="onyx-karte" style="margin-top:1rem;padding:1rem">' +
            '<div class="aufnahme-knoepfe">' +
              '<button class="onyx-knopf onyx-knopf-primaer" id="knopf-kamera" style="padding:.85rem;font-size:.9375rem">' + sym.kamera(20) + 'Foto aufnehmen</button>' +
              '<button class="onyx-knopf onyx-knopf-leise" id="knopf-upload" style="padding:.85rem">' + sym.hochladen(18) + 'Bilder hochladen</button>' +
            '</div>' +
            '<p id="upload-lauf" class="klein amber" style="display:none;align-items:center;justify-content:center;gap:.6rem;margin-top:.6rem;padding:.9rem;background:var(--onyx-amber-flaeche);border:1px solid var(--onyx-kontur-stark);border-radius:var(--onyx-radius-klein)">Fotos werden in die Akte übernommen …</p>' +
            '<div style="display:flex;flex-wrap:wrap;align-items:center;gap:.5rem;margin-top:.75rem">' +
              '<label class="onyx-etikett" for="neue-kategorie">Neue Fotos ablegen als</label>' +
              '<select class="onyx-feld" id="neue-kategorie" style="width:auto;padding:.3rem .7rem;font-size:.8125rem">' +
                auswahlOpt(W.KATEGORIEN, 'Außenansicht') + '</select>' +
            '</div>' +
            '<input id="eingabe-kamera" type="file" accept="image/*" capture="environment" class="nur-sr">' +
            '<input id="eingabe-upload" type="file" accept="image/*" multiple class="nur-sr">' +
          '</div>' +
          '<div style="margin-top:1.25rem">' + galerie + '</div>' +
        '</section>' +

        '<div class="angaben" style="display:grid;gap:2.25rem">' +
          '<section><h2>Objektangaben</h2><dl class="angaben-gitter" style="margin-top:1rem">' +
            b.datenzeile('Bewertungsanlass', h(o.bewertungsanlass), false, true) +
            b.datenzeile('Objekttyp', h(o.objekttyp)) +
            b.datenzeile('Baujahr', h(W.f.oderStrich(o.baujahr)), true) +
            b.datenzeile('Wohn-/Nutzfläche', h(W.f.flaeche(o.wohnflaeche)), true) +
            b.datenzeile('Grundstücksfläche', h(W.f.flaeche(o.grundstuecksflaeche)), true) +
            b.datenzeile('Wertermittlungsstichtag', h(W.f.datum(o.stichtag)), true) +
            b.datenzeile('Akte angelegt', h(W.f.datum(o.angelegtAm)), true) +
            b.datenzeile('Ortsbesichtigung', '<span style="display:flex;align-items:center;gap:.4rem"><span class="leise">' + sym.kalender(15) + '</span>' + h(W.f.datumZeit(o.ortstermin)) + '</span>', false, true) +
          '</dl></section>' +

          '<section><h2>Auftraggeber</h2>' +
            (a ? '<a class="onyx-karte onyx-karte-klick" style="display:block;margin-top:1rem;padding:1rem" href="#/auftraggeber/' + h(a.id) + '">' +
              '<p class="mono amber" style="font-size:10.5px;text-transform:uppercase;letter-spacing:.1em">' + h(a.typ) + '</p>' +
              '<p style="margin-top:.25rem;font-size:.9375rem">' + h(a.name) + '</p>' +
              '<p class="klein leise" style="margin-top:.1rem">' + h(a.ansprechpartner) + '</p>' +
              '<p class="mono leise" style="margin-top:.5rem;font-size:12.5px">' + h(a.telefon + ' · ' + a.email) + '</p></a>'
              : '<p class="klein leise" style="margin-top:1rem">Kein Auftraggeber hinterlegt.</p>') +
          '</section>' +

          '<section><h2>Notizen zur Akte</h2>' +
            '<form id="notiz-formular" style="display:grid;gap:.75rem;margin-top:1rem">' +
              '<label class="nur-sr" for="notizen">Notizen zur Akte</label>' +
              '<textarea class="onyx-feld" id="notizen" name="notizen" rows="7" placeholder="Beobachtungen vom Ortstermin, offene Unterlagen, Absprachen mit dem Auftraggeber.">' + h(o.notizen) + '</textarea>' +
              '<button class="onyx-knopf onyx-knopf-leise" type="submit" style="justify-self:start">Notizen speichern</button>' +
            '</form></section>' +

          '<p class="mini leise" style="padding-top:1rem;border-top:1px solid var(--onyx-kontur-leise);line-height:1.7">' +
            'Akte angelegt am ' + h(W.f.datumLang(o.angelegtAm)) + '. Alle Angaben und Fotos in dieser Vorführversion sind Beispieldaten.</p>' +
        '</div>' +
      '</div>';
  };

  /* --- Grossansicht eines Fotos ------------------------------------------ */

  W.seiten.fotoDialog = function (foto, bilder) {
    return '<div class="schleier" id="foto-schleier" role="dialog" aria-modal="true" aria-label="Foto beschriften">' +
      '<div class="onyx-rahmen dialog">' +
        '<div class="dialog-kopf">' +
          '<p class="mono amber" style="font-size:11px;text-transform:uppercase;letter-spacing:.14em">Foto in der Akte</p>' +
          '<button class="klein leise" id="dialog-zu" style="display:flex;align-items:center;gap:.4rem;padding:.25rem">Schließen' + sym.schliessen(15) + '</button>' +
        '</div>' +
        '<div class="dialog-bild"><img src="' + h(W.hilfen.src(foto, bilder)) + '" alt="' + h(foto.beschriftung || 'Objektfoto ohne Beschriftung') + '"></div>' +
        '<div class="dialog-koerper">' +
          '<p class="onyx-etikett">Aufgenommen ' + h(W.f.datumZeit(foto.aufgenommenAm)) + '</p>' +
          '<form id="foto-formular" style="display:grid;gap:.75rem">' +
            '<div class="feld-gruppe">' +
              '<label class="onyx-etikett" for="beschriftung">Beschriftung für die Fotodokumentation</label>' +
              '<textarea class="onyx-feld" id="beschriftung" name="beschriftung" rows="2" placeholder="z. B. Feuchtigkeitsschaden Sockelbereich Südwand">' + h(foto.beschriftung) + '</textarea>' +
              '<p class="mini leise">Die Beschriftung erscheint im Gutachten-Entwurf unter dem Bild.</p>' +
            '</div>' +
            '<div class="feld-gruppe" style="max-width:20rem">' +
              '<label class="onyx-etikett" for="foto-kategorie">Kategorie</label>' +
              '<select class="onyx-feld" id="foto-kategorie" name="kategorie">' + auswahlOpt(W.KATEGORIEN, foto.kategorie) + '</select>' +
            '</div>' +
            '<div style="display:flex;flex-wrap:wrap;align-items:center;gap:.75rem;padding-top:.25rem">' +
              '<button class="onyx-knopf onyx-knopf-primaer" type="submit">Beschriftung speichern</button>' +
              '<span style="flex:1"></span>' +
              '<button class="onyx-knopf onyx-knopf-klar" type="button" id="foto-weg" style="font-size:.8125rem">' + sym.papierkorb(15) + 'Foto entfernen</button>' +
            '</div>' +
          '</form>' +
        '</div>' +
      '</div></div>';
  };

  /* --- Neues Objekt ------------------------------------------------------ */

  W.seiten.neu = function (d, naechstes) {
    function feld(name, etikett, art, platzhalter, hinweis) {
      return '<div class="feld-gruppe"><label class="onyx-etikett" for="' + name + '">' + h(etikett) + '</label>' +
        '<input class="onyx-feld" id="' + name + '" name="' + name + '" type="' + (art || 'text') + '"' +
        (platzhalter ? ' placeholder="' + h(platzhalter) + '"' : '') + '>' +
        (hinweis ? '<p class="mini leise">' + h(hinweis) + '</p>' : '') + '</div>';
    }
    return '<a class="zurueck" href="#/objekte">' + sym.pfeilLinks(14) + 'Alle Objekte</a>' +
      '<div style="margin-top:1rem;padding-bottom:1.5rem;border-bottom:1px solid var(--onyx-kontur-leise)">' +
        '<h1>Neuen Gutachtenauftrag anlegen</h1>' +
        '<p class="klein leise" style="margin-top:.35rem;max-width:62ch;line-height:1.7">' +
          'Das Aktenzeichen vergibt das System fortlaufend. Fotos kommen nach dem Anlegen in der Akte dazu, Angaben lassen sich jederzeit ergänzen.</p>' +
      '</div>' +
      '<form class="formular" id="neu-formular">' +
        '<section class="formular-abschnitt">' +
          '<h2 style="display:flex;justify-content:space-between;align-items:baseline;gap:1rem">Objekt' +
            '<span class="mono amber" style="font-size:12.5px">Aktenzeichen ' + h(naechstes) + '</span></h2>' +
          feld('strasse', 'Straße und Hausnummer', 'text', 'Eichenstraße 14') +
          '<div class="feld-paar schmal-breit">' + feld('plz', 'Postleitzahl', 'text', '26131') + feld('ort', 'Ort', 'text', 'Oldenburg') + '</div>' +
          '<div class="feld-paar">' +
            '<div class="feld-gruppe"><label class="onyx-etikett" for="objekttyp">Objekttyp</label>' +
              '<select class="onyx-feld" id="objekttyp" name="objekttyp">' + auswahlOpt(W.OBJEKTTYPEN, 'Einfamilienhaus') + '</select></div>' +
            feld('baujahr', 'Baujahr', 'text', '1968') +
          '</div>' +
          '<div class="feld-paar">' + feld('wohnflaeche', 'Wohn-/Nutzfläche in m²', 'text', '142') +
            feld('grundstuecksflaeche', 'Grundstücksfläche in m²', 'text', '640') + '</div>' +
        '</section>' +
        '<section class="formular-abschnitt"><h2>Auftrag</h2>' +
          '<div class="feld-gruppe"><label class="onyx-etikett" for="auftraggeberId">Auftraggeber</label>' +
            '<select class="onyx-feld" id="auftraggeberId" name="auftraggeberId">' +
            auswahlOpt(d.auftraggeber.map(function (a) { return { wert: a.id, text: a.name + ' (' + a.typ + ')' }; }), '', 'Bitte auswählen') +
            '</select></div>' +
          '<div class="feld-paar">' +
            '<div class="feld-gruppe"><label class="onyx-etikett" for="bewertungsanlass">Bewertungsanlass</label>' +
              '<select class="onyx-feld" id="bewertungsanlass" name="bewertungsanlass">' + auswahlOpt(W.ANLAESSE, 'Verkehrswertgutachten') + '</select></div>' +
            '<div class="feld-gruppe"><label class="onyx-etikett" for="status">Status</label>' +
              '<select class="onyx-feld" id="status" name="status">' +
              auswahlOpt(W.STATUS.map(function (s) { return { wert: s, text: W.STATUS_TEXT[s] }; }), 'offen') + '</select></div>' +
          '</div>' +
        '</section>' +
        '<section class="formular-abschnitt"><h2>Termine</h2>' +
          '<div class="feld-paar">' +
            feld('ortstermin', 'Ortsbesichtigung', 'datetime-local', '', 'Erscheint auf der Übersicht unter den nächsten Ortsterminen.') +
            feld('frist', 'Abgabefrist', 'date') +
          '</div>' +
          '<div style="max-width:22rem">' + feld('stichtag', 'Wertermittlungsstichtag', 'date') + '</div>' +
        '</section>' +
        '<section class="feld-gruppe"><label class="onyx-etikett" for="notizen">Notizen</label>' +
          '<textarea class="onyx-feld" id="notizen" name="notizen" rows="4" placeholder="Gerichtliches Aktenzeichen, Ansprechpartner vor Ort, angekündigte Unterlagen."></textarea></section>' +
        '<p id="neu-fehler" class="klein" style="display:none;color:var(--onyx-warn);background:var(--onyx-warn-flaeche);border:1px solid rgb(217 97 76 / .35);border-radius:var(--onyx-radius-klein);padding:.5rem .75rem"></p>' +
        '<div style="display:flex;align-items:center;gap:.75rem;padding-top:1.5rem;border-top:1px solid var(--onyx-kontur-leise)">' +
          '<button class="onyx-knopf onyx-knopf-primaer" type="submit">Akte anlegen</button>' +
          '<a class="onyx-knopf onyx-knopf-klar" href="#/objekte">Abbrechen</a>' +
        '</div>' +
      '</form>';
  };

  /* --- Auftraggeber ------------------------------------------------------ */

  W.seiten.auftraggeber = function (d) {
    return '<div class="kopfzeile-seite"><div><h1>Auftraggeber</h1>' +
        '<p class="klein leise" style="margin-top:.35rem;max-width:62ch;line-height:1.7">' +
          'Wenige, dafür wiederkehrende Auftraggeber. Hinter jedem Eintrag liegt die vollständige Historie der Aufträge dieses Hauses.</p></div></div>' +
      '<ul style="display:grid;gap:1.25rem;padding-bottom:2rem;grid-template-columns:repeat(auto-fit,minmax(min(100%,20rem),1fr))">' +
      d.auftraggeber.map(function (a) {
        var auftraege = H.objekteVon(d, a.id);
        var laufend = auftraege.filter(function (o) { return o.status !== 'abgeschlossen'; });
        return '<li><a class="onyx-karte onyx-karte-klick" style="display:flex;flex-direction:column;height:100%;padding:1.25rem" href="#/auftraggeber/' + h(a.id) + '">' +
          '<span style="display:flex;justify-content:space-between;gap:1rem">' +
            '<span style="min-width:0">' +
              '<span class="mono amber" style="display:block;font-size:10.5px;text-transform:uppercase;letter-spacing:.1em">' + h(a.typ) + '</span>' +
              '<span style="display:block;margin-top:.25rem;font-size:1.0625rem">' + h(a.name) + '</span>' +
              '<span class="klein leise" style="display:block;margin-top:.1rem">' + h(a.ansprechpartner) + '</span>' +
            '</span><span class="leise" style="flex:none">' + sym.pfeilRechts(17) + '</span>' +
          '</span>' +
          '<span class="mono leise" style="display:block;margin-top:1rem;font-size:12.5px">' + h(a.telefon) + '<br>' + h(a.email) + '</span>' +
          '<span style="display:flex;gap:1.5rem;margin-top:auto;padding-top:1rem;border-top:1px solid var(--onyx-kontur-leise)">' +
            '<span><span class="onyx-etikett" style="display:block">Aufträge gesamt</span><span class="mono" style="font-size:1.125rem">' + auftraege.length + '</span></span>' +
            '<span><span class="onyx-etikett" style="display:block">davon laufend</span><span class="mono" style="font-size:1.125rem">' + laufend.length + '</span></span>' +
          '</span></a></li>';
      }).join('') + '</ul>';
  };

  W.seiten.auftraggeberDetail = function (d, id) {
    var a = H.ag(d, id);
    if (!a) return W.seiten.nichtGefunden();
    var auftraege = H.objekteVon(d, a.id);
    var laufend = auftraege.filter(function (o) { return o.status !== 'abgeschlossen'; });

    var historie = auftraege.length ? '<ul class="onyx-register" style="margin-top:1rem;border-top:1px solid var(--onyx-kontur-leise)">' +
      auftraege.map(function (o) {
        return '<li class="onyx-zeile" style="border-bottom:1px solid var(--onyx-kontur-leise)">' +
          '<a href="#/objekt/' + h(o.id) + '" style="display:flex;flex-wrap:wrap;align-items:center;gap:.5rem 1.25rem;padding:.875rem .5rem;margin:0 -.5rem;border-radius:var(--onyx-radius-klein)">' +
            '<span class="mono still" style="width:7rem;flex:none;font-size:12.5px">' + h(o.aktenzeichen) + '</span>' +
            '<span class="wachsen">' +
              '<span class="kuerzen" style="display:block;font-size:.9375rem">' + h(o.strasse) + '</span>' +
              '<span class="kuerzen klein leise" style="display:block">' + h(o.plz + ' ' + o.ort + ' · ' + o.bewertungsanlass + ' · ' + H.fotosZu(d, o.id).length + ' Fotos') + '</span>' +
            '</span>' +
            '<span class="mini" style="text-align:right">' +
              '<span class="mono" style="display:block">' + h(W.f.datum(o.frist)) + '</span>' +
              b.fristmarke(o.frist, o.status === 'abgeschlossen') + '</span>' +
            b.statusmarke(o.status, true) +
          '</a></li>';
      }).join('') + '</ul>'
      : b.leer('Für diesen Auftraggeber ist noch keine Akte angelegt.');

    return '<a class="zurueck" href="#/auftraggeber">' + sym.pfeilLinks(14) + 'Alle Auftraggeber</a>' +
      '<header style="margin-top:1rem;padding-bottom:1.5rem;border-bottom:1px solid var(--onyx-kontur-leise)">' +
        '<p class="mono amber" style="font-size:10.5px;text-transform:uppercase;letter-spacing:.12em">' + h(a.typ) + '</p>' +
        '<h1 style="margin-top:.35rem">' + h(a.name) + '</h1>' +
        '<p class="leise" style="margin-top:.35rem;font-size:.9375rem">' + h(a.ansprechpartner) + '</p>' +
        '<ul style="display:flex;flex-wrap:wrap;gap:.5rem 2rem;margin-top:1.25rem;font-size:.84375rem">' +
          '<li style="display:flex;align-items:center;gap:.5rem"><span class="leise">' + sym.telefon(15) + '</span><a class="mono" href="tel:' + h(a.telefon.replace(/\s/g, '')) + '">' + h(a.telefon) + '</a></li>' +
          '<li style="display:flex;align-items:center;gap:.5rem"><span class="leise">' + sym.brief(15) + '</span><a class="mono" href="mailto:' + h(a.email) + '">' + h(a.email) + '</a></li>' +
          '<li style="display:flex;align-items:center;gap:.5rem"><span class="leise">' + sym.ort(15) + '</span>' + h(a.anschrift) + '</li>' +
        '</ul>' +
      '</header>' +
      '<div class="spalten">' +
        '<section><div class="abschnitt-kopf"><h2>Auftragshistorie</h2>' +
          '<p class="klein leise mono">' + auftraege.length + ' gesamt, ' + laufend.length + ' laufend</p></div>' + historie + '</section>' +
        '<section><h2>Notizen zum Auftraggeber</h2>' +
          '<form id="ag-notiz-formular" style="display:grid;gap:.75rem;margin-top:1rem">' +
            '<label class="nur-sr" for="ag-notizen">Notizen zum Auftraggeber</label>' +
            '<textarea class="onyx-feld" id="ag-notizen" name="notizen" rows="9" placeholder="Formvorgaben, Ansprechwege, Besonderheiten bei der Abrechnung.">' + h(a.notizen) + '</textarea>' +
            '<button class="onyx-knopf onyx-knopf-leise" type="submit" style="justify-self:start">Notizen speichern</button>' +
          '</form></section>' +
      '</div>';
  };

  /* --- Gutachten-Entwurf -------------------------------------------------- */

  W.seiten.entwurf = function (d, id, bilder) {
    var o = H.obj(d, id);
    if (!o) return W.seiten.nichtGefunden();
    var a = H.ag(d, o.auftraggeberId);
    var fotos = H.fotosZu(d, o.id);
    var heute = new Date().toISOString().slice(0, 10);
    var K = W.KONTO;

    function platzhalter(text) { return '<p class="platzhalter">' + h(text) + '</p>'; }
    function abschnitt(nr, titel, inhalt) {
      return '<section class="blatt-abschnitt"><h3><span class="nr">' + nr + '</span>' + h(titel) + '</h3>' +
        '<div style="margin-top:.75rem">' + inhalt + '</div></section>';
    }

    var angaben = [
      ['Lage', o.strasse + ', ' + o.plz + ' ' + o.ort],
      ['Objektart', o.objekttyp],
      ['Baujahr', W.f.oderStrich(o.baujahr)],
      ['Wohn-/Nutzfläche', W.f.flaeche(o.wohnflaeche)],
      ['Grundstücksfläche', W.f.flaeche(o.grundstuecksflaeche)],
      ['Wertermittlungsstichtag', W.f.datum(o.stichtag)],
      ['Ortsbesichtigung', W.f.datumZeit(o.ortstermin)]
    ].map(function (p) {
      return '<div><dt>' + h(p[0]) + '</dt><dd>' + h(p[1]) + '</dd></div>';
    }).join('');

    var lichtbilder = fotos.length
      ? '<ol class="lichtbilder">' + fotos.map(function (f, i) {
          return '<li><img src="' + h(H.src(f, bilder)) + '" alt="' + h(f.beschriftung || ('Lichtbild ' + (i + 1))) + '">' +
            '<p style="margin-top:.35rem;font-size:.75rem;line-height:1.4">' +
              '<span class="sans mono" style="font-size:11px;color:#5F584E">Lichtbild ' + (i + 1) + '</span> ' +
              (f.beschriftung ? h(f.beschriftung) : '<span style="font-style:italic;color:#6C6459">ohne Beschriftung</span>') + '</p>' +
            '<p style="font-size:11px;color:#6C6459">' + h(f.kategorie) + ', aufgenommen am ' + h(W.f.datum(f.aufgenommenAm)) + '</p></li>';
        }).join('') + '</ol>'
      : platzhalter('Für diese Akte ist noch kein Lichtbild erfasst. Fotos aus der Akte erscheinen an dieser Stelle automatisch mit ihrer Beschriftung.');

    var werte = ['Bodenwert', 'Sachwert', 'Ertragswert', 'Vorläufiger Verkehrswert'].map(function (z) {
      return '<div><dt>' + h(z) + '</dt><dd class="sans mono" style="color:#8A8377">wird ergänzt</dd></div>';
    }).join('');

    return '<div class="kein-druck" style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:1rem;padding:1.5rem 0;border-bottom:1px solid var(--onyx-kontur-leise)">' +
        '<div><a class="zurueck" style="padding-top:0" href="#/objekt/' + h(o.id) + '">' + sym.pfeilLinks(14) + 'Zurück zur Akte ' + h(o.aktenzeichen) + '</a>' +
          '<h1 style="margin-top:.5rem">Gutachten-Entwurf</h1>' +
          '<p class="mini leise" style="margin-top:.25rem;max-width:70ch;line-height:1.7">Aus den Angaben der Akte und ' + fotos.length + ' ' +
            (fotos.length === 1 ? 'Lichtbild' : 'Lichtbildern') + ' zusammengestellt. Die Wertermittlung schreibt der Sachverständige, das System liefert die Gliederung und die belegten Fakten.</p></div>' +
        '<button class="onyx-knopf onyx-knopf-primaer" id="knopf-drucken">' + sym.drucken(17) + 'Drucken oder als PDF sichern</button>' +
      '</div>' +

      '<div style="padding:2rem 0;display:flex;justify-content:center"><article class="blatt">' +
        '<header class="blatt-kopf">' +
          '<div><p class="sans" style="font-weight:600;font-size:.9375rem">' + h(K.buero) + '</p>' +
            '<p class="sans" style="font-size:.71875rem;line-height:1.6;color:#5F584E;max-width:38ch">' + h(K.rolle) + '</p></div>' +
          '<div class="sans" style="font-size:.71875rem;line-height:1.6;color:#5F584E">' +
            '<p>' + h(K.strasse) + '</p><p>' + h(K.ort) + '</p><p>' + h(K.telefon) + '</p><p>' + h(K.emailBuero) + '</p></div>' +
        '</header>' +
        '<div class="blatt-deckel">' +
          '<p class="sans mono" style="font-size:11px;text-transform:uppercase;letter-spacing:.24em;color:#6C6459">Entwurf</p>' +
          '<h2 style="margin-top:1.25rem;font-size:clamp(1.5rem,1.2rem+1.4vw,1.875rem);line-height:1.2">' + h(o.bewertungsanlass) + '</h2>' +
          '<p style="margin-top:1.25rem;font-size:1.0625rem;line-height:1.35">' + h(o.strasse) + '<br>' + h(o.plz + ' ' + o.ort) + '</p>' +
          '<p class="sans mono" style="margin-top:1.5rem;font-size:12.5px;letter-spacing:.1em;color:#5F584E">' + h(o.aktenzeichen) + '</p>' +
        '</div>' +
        '<dl class="blatt-daten">' +
          '<div><dt>Auftraggeber</dt><dd>' + h(a ? a.name : '–') + '</dd></div>' +
          '<div><dt>Ansprechpartner</dt><dd>' + h(a ? a.ansprechpartner : '–') + '</dd></div>' +
          '<div><dt>Wertermittlungsstichtag</dt><dd>' + h(W.f.datum(o.stichtag)) + '</dd></div>' +
          '<div><dt>Ortsbesichtigung</dt><dd>' + h(W.f.datum(o.ortstermin)) + '</dd></div>' +
          '<div><dt>Entwurf erstellt</dt><dd>' + h(W.f.datumLang(heute)) + '</dd></div>' +
          '<div><dt>Sachverständige</dt><dd>' + h(K.name) + '</dd></div>' +
        '</dl>' +

        abschnitt('1', 'Auftrag und Zweck der Wertermittlung',
          '<p>' + h((a ? a.name : 'Der Auftraggeber') + ' hat das Sachverständigenbüro mit der Erstellung eines ' +
            o.bewertungsanlass.toLowerCase().replace('gutachten', 'gutachtens') + ' für das oben bezeichnete Objekt beauftragt. Die Ortsbesichtigung fand am ' +
            W.f.datum(o.ortstermin) + ' statt.') + '</p>' +
          platzhalter('Zweck der Wertermittlung, Rechtsgrundlagen und verwendetes Verfahren werden hier ausformuliert.')) +

        abschnitt('2', 'Objektangaben', '<dl class="blatt-tabelle">' + angaben + '</dl>') +

        abschnitt('3', 'Grundstücks- und Gebäudebeschreibung',
          (o.notizen ? '<p class="sans" style="font-size:11px;text-transform:uppercase;letter-spacing:.1em;color:#6C6459">Aus den Notizen zur Akte übernommen</p>' +
            '<p style="margin-top:.5rem;white-space:pre-line">' + h(o.notizen) + '</p>' : '') +
          platzhalter('Lagebeschreibung, Erschließung, Bauweise, Ausstattung und Zustand werden hier ausformuliert.')) +

        abschnitt('4', 'Fotodokumentation', lichtbilder) +

        abschnitt('5', 'Wertermittlung', '<dl class="blatt-tabelle">' + werte + '</dl>' +
          platzhalter('Ableitung der Werte, Marktanpassung und Begründung der Wertansätze werden hier ausformuliert.')) +

        abschnitt('6', 'Zusammenfassung und Ergebnis',
          platzhalter('Zusammenfassendes Ergebnis der Wertermittlung zum Stichtag ' + W.f.datum(o.stichtag) + '.') +
          '<div class="unterschrift"><div class="linie"></div>' +
            '<p style="font-size:.78125rem">' + h(K.name) + '</p>' +
            '<p class="sans" style="font-size:11px;color:#5F584E;max-width:36ch;line-height:1.6">' + h(K.rolle) + '</p>' +
            '<p class="sans" style="font-size:11px;color:#5F584E">' + h(K.ort.split(' ').slice(1).join(' ')) + ', ' + h(W.f.datumLang(heute)) + '</p>' +
          '</div>') +

        '<footer class="sans" style="margin-top:3rem;padding-top:1rem;border-top:1px solid #D5CFC2;font-size:10.5px;line-height:1.7;color:#6C6459">' +
          'Entwurf zu ' + h(o.aktenzeichen) + ', erzeugt am ' + h(W.f.datumLang(heute)) +
          '. Kein unterschriebenes Gutachten. Alle Angaben dieser Vorführversion sind Beispieldaten.</footer>' +
      '</article></div>';
  };

  W.seiten.nichtGefunden = function () {
    return '<div style="padding:5rem 0;text-align:center">' +
      '<p class="mono amber" style="font-size:11px;text-transform:uppercase;letter-spacing:.24em">Wertakte</p>' +
      '<h1 style="margin-top:1rem">Diese Seite gibt es nicht</h1>' +
      '<p class="klein leise" style="margin-top:.5rem">Die Akte wurde vielleicht entfernt oder die Adresse stimmt nicht.</p>' +
      '<a class="onyx-knopf onyx-knopf-primaer" style="margin-top:1.75rem" href="#/uebersicht">Zur Übersicht</a></div>';
  };
})();
