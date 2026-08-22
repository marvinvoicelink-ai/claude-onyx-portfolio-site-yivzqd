/* Alle Seiten der Anwendung. Jede Funktion liefert HTML als Zeichenkette,
   der Router in app.js haengt es ein und verdrahtet die Ereignisse. */
window.W = window.W || {};
(function () {
  var h = W.f.h, b = W.b, sym = W.sym;

  W.KONTO = {
    email: 'buero@demo.wertakte.de',
    passwort: 'ortstermin',
    name: 'K. Ahlers',
    rolle: 'Vermittlung von Anlage- und Gewerbeimmobilien',
    buero: 'Ahlers Gewerbeimmobilien',
    strasse: 'Gartenstraße 21',
    ort: '26122 Oldenburg',
    telefon: '0441 3609-27',
    emailBuero: 'buero@ahlers-gewerbe-beispiel.de'
  };

  W.OBJEKTARTEN = ['Lebensmittel-Fachmarkt', 'Nahversorgungszentrum', 'Fachmarktzentrum',
    'Wohn- und Geschäftshaus', 'Bürogebäude', 'Logistik', 'Ärztehaus', 'Sonstiges'];
  W.KATEGORIEN = ['Außenansicht', 'Innenansicht', 'Gebäudetechnik', 'Dachfläche', 'Umgebung'];
  W.BETEILIGUNG_STAND = ['Angesprochen', 'NDA offen', 'NDA unterzeichnet', 'Exposé versendet',
    'Prüfung läuft', 'Reserviert', 'Kein Interesse'];

  /* --- Zugriffshilfen ---------------------------------------------------- */

  function kontakt(d, id) { return d.kontakte.filter(function (k) { return k.id === id; })[0]; }
  function obj(d, id) { return d.objekte.filter(function (o) { return o.id === id; })[0]; }
  function alle(d) {
    return d.objekte.slice().sort(function (a, c) { return c.aktenzeichen.localeCompare(a.aktenzeichen); });
  }
  function investoren(d) { return d.kontakte.filter(function (k) { return k.rolle === 'Investor'; }); }
  function unterlagenZu(d, id) { return d.unterlagen.filter(function (u) { return u.objektId === id; }); }
  function beteiligungenZu(d, id) { return d.beteiligungen.filter(function (x) { return x.objektId === id; }); }
  function vorgaengeZu(d, filter) {
    return d.vorgaenge.filter(function (v) {
      if (filter.objektId && v.objektId !== filter.objektId) return false;
      if (filter.kontaktId && v.kontaktId !== filter.kontaktId) return false;
      return true;
    }).sort(function (a, c) { return c.zeitpunkt.localeCompare(a.zeitpunkt); });
  }
  function termineZu(d, id) {
    return d.termine.filter(function (t) { return !id || t.objektId === id; })
      .sort(function (a, c) { return a.faellig.localeCompare(c.faellig); });
  }
  function fotosZu(d, id) {
    return d.fotos.filter(function (f) { return f.objektId === id; })
      .sort(function (a, c) { return a.aufgenommenAm.localeCompare(c.aufgenommenAm); });
  }
  function src(foto, bilder) {
    if (foto.quelle.indexOf('idb:') === 0) return bilder[foto.quelle.slice(4)] || '';
    return foto.quelle;
  }
  function vollstaendig(d, id) {
    var u = unterlagenZu(d, id);
    return { ist: u.filter(function (x) { return x.status === 'vorhanden'; }).length, soll: u.length };
  }
  W.hilfen = {
    kontakt: kontakt, obj: obj, alle: alle, investoren: investoren, unterlagenZu: unterlagenZu,
    beteiligungenZu: beteiligungenZu, vorgaengeZu: vorgaengeZu, termineZu: termineZu,
    fotosZu: fotosZu, src: src, vollstaendig: vollstaendig
  };

  W.opt = function (werte, gewaehlt, ersteZeile) {
    var o = ersteZeile ? '<option value="">' + h(ersteZeile) + '</option>' : '';
    return o + werte.map(function (w) {
      var wert = typeof w === 'string' ? w : w.wert;
      var text = typeof w === 'string' ? w : w.text;
      return '<option value="' + h(wert) + '"' + (wert === gewaehlt ? ' selected' : '') + '>' + h(text) + '</option>';
    }).join('');
  };

  W.seiten = {};

  /* --- Anmeldung ---------------------------------------------------------- */

  W.seiten.anmelden = function (d) {
    var vermarktung = d.objekte.filter(function (o) {
      return ['expose', 'vermarktung', 'reserviert'].indexOf(o.status) >= 0;
    }).length;
    return '<main class="tor"><div class="onyx-rahmen tor-fenster">' +
      '<section class="tor-bild">' +
        '<p class="wortmarke amber" style="letter-spacing:.3em">Wertakte</p>' +
        '<div style="max-width:32ch">' +
          '<h1 style="font-size:clamp(2rem,1.4rem+2vw,3rem);line-height:1.08">Ein Objekt. Eine Akte. Jede Nachricht darin.</h1>' +
          '<p class="leise" style="margin-top:1.5rem;font-size:.9375rem;line-height:1.7;max-width:48ch">' +
            'Exposé, Unterlagen, Investoren, Korrespondenz und Wiedervorlagen für das ' + h(W.KONTO.buero) + ', Oldenburg.</p>' +
        '</div>' +
        '<dl style="display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;padding-top:1.5rem;border-top:1px solid var(--onyx-kontur-leise)">' +
          [['In Vermarktung', vermarktung], ['Investoren', investoren(d).length], ['Vorgänge', d.vorgaenge.length]]
            .map(function (p) {
              return '<div><dt class="onyx-etikett">' + h(p[0]) + '</dt>' +
                '<dd class="mono amber" style="margin-top:.25rem;font-size:1.5rem">' + p[1] + '</dd></div>';
            }).join('') +
        '</dl>' +
      '</section>' +
      '<section class="tor-formular"><div>' +
        '<p class="wortmarke amber" style="letter-spacing:.3em">Wertakte</p>' +
        '<h2 style="margin-top:1.5rem;font-size:1.5rem">Anmeldung</h2>' +
        '<p class="klein leise" style="margin-top:.5rem">Zugang für Mitarbeitende des Büros.</p>' +
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

  /* --- Übersicht ----------------------------------------------------------- */

  W.seiten.uebersicht = function (d) {
    var heute = new Date();
    var objekte = alle(d);
    var vermarktung = objekte.filter(function (o) {
      return ['expose', 'vermarktung', 'reserviert'].indexOf(o.status) >= 0;
    });
    var offeneTermine = termineZu(d, null).filter(function (t) { return t.status === 'offen'; });
    var ueber = offeneTermine.filter(function (t) {
      var x = W.f.tageBis(t.faellig, heute); return x !== null && x < 0;
    });
    var fehlend = d.unterlagen.filter(function (u) { return u.status !== 'vorhanden'; }).length;

    var kacheln = [
      ['In Vermarktung', vermarktung.length, ''],
      ['Wiedervorlagen offen', offeneTermine.length, offeneTermine.length ? 'amber' : ''],
      ['davon überfällig', ueber.length, ueber.length ? 'warn' : ''],
      ['Unterlagen fehlen', fehlend, fehlend ? 'amber' : '']
    ].map(function (k) {
      return '<div class="onyx-kachel"><dt class="onyx-etikett">' + h(k[0]) + '</dt>' +
        '<dd class="onyx-kachel-zahl ' + k[2] + '" style="margin-top:.6rem">' +
        String(k[1]).padStart(2, '0') + '</dd></div>';
    }).join('');

    var wiedervorlagen = offeneTermine.length ? '<ul class="onyx-register" style="margin-top:.9rem;border-top:1px solid var(--onyx-kontur-leise)">' +
      offeneTermine.map(function (t) {
        var o = obj(d, t.objektId), k = kontakt(d, t.kontaktId);
        var tage = W.f.tageBis(t.faellig, heute);
        var kl = tage !== null && tage < 0 ? ' ist-warn' : (tage !== null && tage <= 3 ? ' ist-bald' : '');
        return '<li class="onyx-zeile" style="border-bottom:1px solid var(--onyx-kontur-leise)">' +
          '<a class="zeile-link" href="#/objekt/' + h(t.objektId) + '?reiter=termine">' +
            '<span class="balken-links' + kl + '"></span>' +
            '<span class="wachsen">' +
              '<span class="mono still" style="font-size:11.5px">' + h(o ? o.aktenzeichen : '') + ' · ' + h(t.art) + '</span>' +
              '<span class="kuerzen" style="display:block;font-size:.9375rem">' + h(t.titel) + '</span>' +
              '<span class="kuerzen klein leise" style="display:block">' + h((o ? o.bezeichnung : '') + (k ? ' · ' + k.name : '')) + '</span>' +
            '</span>' +
            '<span style="text-align:right;flex:none">' +
              '<span class="mono klein" style="display:block">' + h(W.f.datum(t.faellig)) + '</span>' +
              '<span class="mini" style="display:block">' + b.fristmarke(t.faellig) + '</span>' +
              '<span style="display:block;margin-top:.2rem">' + b.eskalation(t.stufe) + '</span>' +
            '</span>' +
          '</a></li>';
      }).join('') + '</ul>'
      : b.leer('Keine offene Wiedervorlage.', 'Neue Wiedervorlagen legst du in der Objektakte unter Termine an.');

    var letzte = d.vorgaenge.slice().sort(function (a, c) { return c.zeitpunkt.localeCompare(a.zeitpunkt); }).slice(0, 6);
    var journal = letzte.length ? '<ul class="onyx-register" style="margin-top:.9rem">' +
      letzte.map(function (v) {
        var o = obj(d, v.objektId);
        return '<li class="onyx-zeile"><a class="symbolzeile" href="#/objekt/' + h(v.objektId) + '?reiter=kommunikation">' +
          '<span class="symbolkreis' + (v.richtung === 'aus' ? ' ist-aus' : '') + '">' + b.kommSymbol(v.art, v.richtung, 15) + '</span>' +
          '<span class="wachsen">' +
            '<span class="kuerzen" style="display:block;font-size:.875rem">' + h(v.betreff) + '</span>' +
            '<span class="kuerzen mini leise" style="display:block">' + h(v.art + ' ' + b.richtungText(v.richtung) + ' · ' + (o ? o.bezeichnung : '')) + '</span>' +
          '</span>' +
          '<span class="mini still mono" style="flex:none">' + h(W.f.datum(v.zeitpunkt)) + '</span>' +
        '</a></li>';
      }).join('') + '</ul>'
      : b.leer('Noch kein Vorgang erfasst.');

    return '<div class="kopfzeile-seite"><div>' +
        '<h1>Übersicht</h1>' +
        '<p class="klein leise" style="margin-top:.35rem">Stand ' + h(W.f.datum(heute.toISOString())) + ', ' + vermarktung.length + ' Objekte in Vermarktung</p>' +
      '</div>' +
      '<a class="onyx-knopf onyx-knopf-primaer" href="#/neu">' + sym.plus(16) + 'Objekt anlegen</a></div>' +
      '<dl class="kacheln-reihe">' + kacheln + '</dl>' +
      '<div class="onyx-karte" style="margin-top:1.25rem;padding:1rem">' +
        '<div style="display:flex;flex-wrap:wrap;align-items:baseline;justify-content:space-between;gap:.75rem">' +
          '<p class="onyx-etikett">Hier anfangen</p>' +
          '<a class="klein amber" href="#/protokoll" style="display:flex;align-items:center;gap:.3rem">Protokoll ansehen' + sym.pfeilRechts(13) + '</a>' +
        '</div>' +
        '<p class="klein leise" style="margin-top:.35rem;max-width:64ch;line-height:1.65">' +
          'Mail, Telefonat, WhatsApp, SMS, Brief oder Notiz \u2013 alles beginnt an dieser Stelle und liegt danach in der Akte.</p>' +
        '<div class="kanalleiste" style="margin-top:.8rem">' + W.verfassenKnoepfe('', '') + '</div>' +
      '</div>' +
      '<section style="margin-top:2rem"><h2>Wiedervorlagen der nächsten Wochen</h2>' +
        '<div style="margin-top:.9rem">' + b.terminschiene(offeneTermine, heute, d) + '</div></section>' +
      '<div class="spalten">' +
        '<section><div class="abschnitt-kopf"><h2>Offene Wiedervorlagen</h2>' +
          '<a class="klein amber" href="#/objekte" style="display:flex;align-items:center;gap:.3rem">Alle Objekte' + sym.pfeilRechts(13) + '</a></div>' +
          wiedervorlagen + '</section>' +
        '<section><h2>Zuletzt im Journal</h2>' + journal +
          '<p class="hinweis" style="margin-top:1.25rem"><span class="amber" style="flex:none;margin-top:.1rem">' + sym.siegel(17) + '</span>' +
          '<span>Jede Mail, jedes Telefonat und jede Nachricht wird mit Beleg-Nummer und Zeitstempel zur Akte gelegt und lässt sich einzeln ausdrucken. ' +
          '<a class="amber" href="#/protokoll">Das Protokoll</a> zeigt lückenlos, was wann passiert ist.</span></p>' +
        '</section>' +
      '</div>';
  };

  /* --- Objektliste ---------------------------------------------------------- */

  W.seiten.objekte = function (d, q, bilder) {
    var suche = (q.suche || '').toLowerCase().trim();
    var kacheln = q.ansicht === 'kacheln';
    var liste = alle(d);

    var treffer = liste.filter(function (o) {
      if (q.status && o.status !== q.status) return false;
      if (q.eigentuemer && o.eigentuemerId !== q.eigentuemer) return false;
      if (!suche) return true;
      var e = kontakt(d, o.eigentuemerId);
      return [o.aktenzeichen, o.bezeichnung, o.strasse, o.plz, o.ort, o.objektart, e ? e.name : '']
        .join(' ').toLowerCase().indexOf(suche) >= 0;
    });

    function href(aenderung) {
      var n = Object.assign({}, q, aenderung);
      var teile = Object.keys(n).filter(function (k) { return n[k]; })
        .map(function (k) { return k + '=' + encodeURIComponent(n[k]); });
      return '#/objekte' + (teile.length ? '?' + teile.join('&') : '');
    }

    var eigentuemer = d.kontakte.filter(function (k) { return k.rolle === 'Eigentümer'; });
    var filter = '<div class="filter">' +
      '<label class="nur-sr" for="f-status">Nach Status filtern</label>' +
      '<select class="onyx-feld" id="f-status" data-filter="status" style="width:auto;padding:.35rem .7rem;font-size:.8125rem">' +
        W.opt(W.OBJEKT_STATUS.map(function (s) { return { wert: s, text: W.OBJEKT_STATUS_TEXT[s] }; }), q.status || '', 'Alle Status') +
      '</select>' +
      '<label class="nur-sr" for="f-eig">Nach Eigentümer filtern</label>' +
      '<select class="onyx-feld" id="f-eig" data-filter="eigentuemer" style="width:auto;max-width:15rem;padding:.35rem .7rem;font-size:.8125rem">' +
        W.opt(eigentuemer.map(function (k) { return { wert: k.id, text: k.name }; }), q.eigentuemer || '', 'Alle Eigentümer') +
      '</select>' +
      (suche ? '<span class="onyx-marke onyx-marke-laeuft">Suche: ' + h(q.suche) + '</span>' : '') +
      ((suche || q.status || q.eigentuemer)
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
        '<p style="font-size:.9375rem">Kein Objekt passt zu dieser Suche.</p>' +
        '<div style="display:flex;flex-wrap:wrap;justify-content:center;gap:.75rem;margin-top:1.5rem">' +
          '<a class="onyx-knopf onyx-knopf-leise" href="#/objekte">Filter zurücksetzen</a>' +
          '<a class="onyx-knopf onyx-knopf-primaer" href="#/neu">' + sym.plus(16) + 'Objekt anlegen</a>' +
        '</div></div>';
    } else if (kacheln) {
      koerper = '<ul class="kachel-gitter">' + treffer.map(function (o) {
        var fs = fotosZu(d, o.id), titel = fs[0], e = kontakt(d, o.eigentuemerId);
        var v = vollstaendig(d, o.id);
        var bild = titel
          ? '<img src="' + h(src(titel, bilder)) + '" alt="' + h(titel.beschriftung || o.bezeichnung) + '" loading="lazy">'
          : '<span style="position:absolute;inset:0;display:grid;place-items:center;text-align:center;padding:0 1.5rem">' +
            '<span><span class="still">' + sym.bild(26) + '</span>' +
            '<span class="klein leise" style="display:block;margin-top:.5rem">Noch kein Foto in der Akte</span></span></span>';
        return '<li><a class="onyx-karte onyx-karte-klick" style="display:block;height:100%;overflow:hidden" href="#/objekt/' + h(o.id) + '">' +
          '<span class="kachel-bild">' + bild +
            '<span class="bild-marke amber" style="left:0;top:0">' + h(o.aktenzeichen) + '</span>' +
            '<span class="bild-marke mono" style="right:0;bottom:0">' + b.euro(o.kaufpreis) + '</span>' +
          '</span>' +
          '<span style="display:block;padding:1rem">' +
            '<span style="display:block;font-size:.9375rem">' + h(o.bezeichnung) + '</span>' +
            '<span class="klein leise" style="display:block">' + h(o.plz + ' ' + o.ort + ' · ' + o.objektart) + '</span>' +
            '<span class="klein kuerzen" style="display:block;margin-top:.75rem">' + h(e ? e.name : '') + '</span>' +
            '<span class="mini leise" style="display:flex;align-items:center;gap:.5rem;margin-top:.6rem">' +
              'Unterlagen ' + v.ist + '/' + v.soll + b.fortschritt(v.ist, v.soll) + '</span>' +
            '<span style="display:flex;align-items:baseline;justify-content:space-between;gap:.75rem;margin-top:1rem;padding-top:.75rem;border-top:1px solid var(--onyx-kontur-leise)">' +
              b.objektmarke(o.status, true) +
              '<span class="mini mono leise">' + b.faktor(o.kaufpreis, o.mieteinnahmen) + '</span>' +
            '</span>' +
          '</span></a></li>';
      }).join('') + '</ul>';
    } else {
      koerper = '<div style="padding:1rem 0">' +
        '<div class="register-kopf">' +
          ['Aktenzeichen', 'Objekt', 'Eigentümer', 'Kaufpreis', 'Unterlagen', 'Status']
            .map(function (s) { return '<span class="onyx-etikett">' + h(s) + '</span>'; }).join('') +
        '</div><ul class="onyx-register">' +
        treffer.map(function (o) {
          var e = kontakt(d, o.eigentuemerId), v = vollstaendig(d, o.id);
          return '<li class="onyx-zeile" style="border-bottom:1px solid var(--onyx-kontur-leise)">' +
            '<a class="register-zeile" href="#/objekt/' + h(o.id) + '">' +
              '<span class="mono still" style="font-size:12.5px">' + h(o.aktenzeichen) + '</span>' +
              '<span style="min-width:0">' +
                '<span class="kuerzen" style="display:block;font-size:.9375rem">' + h(o.bezeichnung) + '</span>' +
                '<span class="kuerzen klein leise" style="display:block">' + h(o.strasse + ', ' + o.plz + ' ' + o.ort + ' · ' + o.objektart) + '</span>' +
              '</span>' +
              '<span class="kuerzen klein leise">' + h(e ? e.name : '') + '</span>' +
              '<span class="klein mono">' + b.euro(o.kaufpreis) +
                '<span class="mini leise" style="display:block">' + b.faktor(o.kaufpreis, o.mieteinnahmen) + '</span></span>' +
              '<span class="mini leise" style="min-width:5rem">' + v.ist + '/' + v.soll + b.fortschritt(v.ist, v.soll) + '</span>' +
              '<span style="justify-self:start">' + b.objektmarke(o.status, true) + '</span>' +
            '</a></li>';
        }).join('') + '</ul></div>';
    }

    return '<div class="kopfzeile-seite"><div>' +
        '<h1>Objekte</h1>' +
        '<p class="klein leise" style="margin-top:.35rem">' +
          (treffer.length === liste.length ? liste.length + ' Objekte im Bestand' : treffer.length + ' von ' + liste.length + ' Objekten') +
        '</p></div>' +
        '<a class="onyx-knopf onyx-knopf-primaer" href="#/neu">' + sym.plus(16) + 'Objekt anlegen</a></div>' +
      '<div class="werkzeugleiste">' + filter + umschalter + '</div>' + koerper;
  };
})();

/* --- Teil 2: Objektakte mit den fuenf Reitern -------------------------- */
(function () {
  var h = W.f.h, b = W.b, sym = W.sym, H = W.hilfen, opt = W.opt;

  /* Die fuenf Teile, die der Kunde vorgegeben hat. Reihenfolge und Nummern
     bleiben so, danach sucht er in der Vorfuehrung. */
  W.REITER = [
    { id: 'expose', nr: '1', text: 'Exposé' },
    { id: 'unterlagen', nr: '2', text: 'Unterlagen' },
    { id: 'investoren', nr: '3', text: 'Investoren' },
    { id: 'kommunikation', nr: '4', text: 'Kommunikation' },
    { id: 'termine', nr: '5', text: 'Termine' },
    { id: 'fotos', nr: '', text: 'Fotos' }
  ];

  function reiterleiste(o, aktiv, zahlen) {
    return '<nav class="reiter" aria-label="Bereiche der Akte">' + W.REITER.map(function (r) {
      var z = zahlen[r.id];
      return '<a href="#/objekt/' + h(o.id) + '?reiter=' + r.id + '"' +
        (r.id === aktiv ? ' aria-current="page"' : '') + '>' +
        (r.nr ? '<span class="mono mini leise">' + r.nr + '</span>' : '') + h(r.text) +
        (z ? '<span class="zahl">' + z + '</span>' : '') + '</a>';
    }).join('') + '</nav>';
  }

  /* --- Reiter 1: Exposé ---------------------------------------------------- */

  function reiterExpose(d, o) {
    var e = H.kontakt(d, o.eigentuemerId);
    var c = o.compliance;

    var band = [
      ['Kaufpreis', b.euro(o.kaufpreis)],
      ['Mieteinnahmen p. a.', b.euro(o.mieteinnahmen)],
      ['Faktor', b.faktor(o.kaufpreis, o.mieteinnahmen)],
      ['Nicht umlagefähig ' + h(o.nichtUmlagefaehigJahr), b.euro(o.nichtUmlagefaehig)],
      ['Käuferprovision', h(o.kaeuferprovision)],
      ['Verkaufsgrund', h(o.verkaufsgrund)]
    ].map(function (p) {
      return '<div><dt class="onyx-etikett">' + p[0] + '</dt><dd>' + p[1] + '</dd></div>';
    }).join('');

    // Erfassungsbogen: nur angekreuzte Punkte wandern ins Exposé.
    var gruppen = {};
    o.eckdaten.forEach(function (f, i) {
      (gruppen[f.gruppe] = gruppen[f.gruppe] || []).push({ feld: f, i: i });
    });
    var bogen = Object.keys(gruppen).map(function (g) {
      return '<div class="bogen-gruppe"><p class="onyx-etikett">' + h(g) + '</p>' +
        gruppen[g].map(function (x) {
          var f = x.feld;
          return '<label class="bogen-zeile' + (f.offen ? ' ist-offen' : '') + '">' +
            '<input type="checkbox" data-eck="' + x.i + '"' + (f.imExpose ? ' checked' : '') +
              (f.offen ? ' disabled' : '') + ' aria-label="' + h(f.etikett) + ' ins Exposé übernehmen">' +
            '<span class="klein leise">' + h(f.etikett) + '</span>' +
            (f.offen
              ? '<span class="klein"><span class="onyx-marke onyx-marke-warn" style="font-size:10.5px;padding:.1rem .5rem">Angabe fehlt</span></span>'
              : '<span class="klein">' + h(f.wert) + '</span>') +
          '</label>';
        }).join('') + '</div>';
    }).join('');

    var offen = o.eckdaten.filter(function (f) { return f.offen; }).length;
    var drin = o.eckdaten.filter(function (f) { return f.imExpose; }).length;

    function pruefzeile(etikett, w) {
      return '<div style="display:flex;flex-wrap:wrap;align-items:baseline;justify-content:space-between;gap:.5rem 1rem;padding:.65rem 0;border-bottom:1px solid var(--onyx-kontur-leise)">' +
        '<span><span style="display:block;font-size:.875rem">' + h(etikett) + '</span>' +
        '<span class="mini leise">' + h(w.hinweis || '') + '</span></span>' +
        '<span style="display:flex;align-items:center;gap:.6rem">' +
          (w.datum ? '<span class="mono mini still">' + h(W.f.datum(w.datum)) + '</span>' : '') +
          b.pruefmarke(w.status) + '</span></div>';
    }

    return '<dl class="zahlenband" style="margin-top:1.5rem">' + band + '</dl>' +

      '<div class="spalten" style="padding-top:2rem">' +
        '<section>' +
          '<div class="abschnitt-kopf"><h2>Erfassungsbogen</h2>' +
            '<p class="klein leise mono">' + drin + ' im Exposé' +
            (offen ? '<span class="warn"> · ' + offen + ' Angaben fehlen</span>' : '') + '</p></div>' +
          '<p class="klein leise" style="margin-top:.4rem;line-height:1.7;max-width:62ch">' +
            'Nur angekreuzte Punkte werden ins Exposé übernommen. Fehlende Angaben lassen sich nicht ankreuzen, ' +
            'sie müssen erst beim Eigentümer angefordert werden.</p>' +
          bogen +
        '</section>' +

        '<section style="display:grid;gap:2rem;align-content:start">' +
          '<div><h2>Vor dem Versand zu prüfen</h2>' +
            '<div style="margin-top:.75rem">' +
              pruefzeile('Provisionsvereinbarung Eigentümer', c.provisionsvereinbarung) +
              pruefzeile('Widerrufsbelehrung im Exposé', c.widerrufsbelehrung) +
              pruefzeile('Adressvalidierung bei Erstkunden', c.adressvalidierung) +
            '</div>' +
            '<p class="hinweis" style="margin-top:1rem"><span class="amber" style="flex:none;margin-top:.1rem">' + sym.warnung(17) + '</span>' +
            '<span>Erstkunden erhalten das Exposé erst, wenn Vertraulichkeitserklärung und Adressvalidierung vorliegen. Das System hält den Versand sonst zurück.</span></p>' +
          '</div>' +

          '<div><h2>Eigentümer</h2>' +
            (e ? '<a class="onyx-karte onyx-karte-klick" style="display:block;margin-top:.75rem;padding:1rem" href="#/investor/' + h(e.id) + '">' +
              '<p class="mono amber" style="font-size:10.5px;text-transform:uppercase;letter-spacing:.1em">' + h(e.typ) + '</p>' +
              '<p style="margin-top:.25rem;font-size:.9375rem">' + h(e.name) + '</p>' +
              '<p class="klein leise" style="margin-top:.1rem">' + h(e.ansprechpartner) + '</p>' +
              '<p class="mono leise" style="margin-top:.5rem;font-size:12.5px">' + h(e.telefon + ' · ' + e.email) + '</p></a>' : '') +
            '<p class="klein leise" style="margin-top:.75rem">' + h(o.besitzgesellschaft) + '</p>' +
          '</div>' +

          '<div><h2>Notizen zum Objekt</h2>' +
            '<form id="notiz-formular" style="display:grid;gap:.75rem;margin-top:.75rem">' +
              '<label class="nur-sr" for="notizen">Notizen zum Objekt</label>' +
              '<textarea class="onyx-feld" id="notizen" name="notizen" rows="6">' + h(o.notizen) + '</textarea>' +
              '<button class="onyx-knopf onyx-knopf-leise" type="submit" style="justify-self:start">Notizen speichern</button>' +
            '</form></div>' +
        '</section>' +
      '</div>';
  }

  /* --- Reiter 2: Unterlagen ------------------------------------------------ */

  function reiterUnterlagen(d, o) {
    var u = H.unterlagenZu(d, o.id);
    var v = H.vollstaendig(d, o.id);
    var kategorien = {};
    u.forEach(function (x) { (kategorien[x.kategorie] = kategorien[x.kategorie] || []).push(x); });

    var listen = Object.keys(kategorien).map(function (k) {
      return '<section style="margin-top:1.75rem"><h2 style="font-size:.9375rem">' + h(k) + '</h2>' +
        '<ul class="onyx-register" style="margin-top:.6rem;border-top:1px solid var(--onyx-kontur-leise)">' +
        kategorien[k].map(function (x) {
          return '<li class="onyx-zeile" style="border-bottom:1px solid var(--onyx-kontur-leise);display:flex;flex-wrap:wrap;align-items:center;gap:.6rem 1rem;padding:.7rem .5rem">' +
            '<span class="wachsen" style="min-width:12rem">' +
              '<span style="display:block;font-size:.875rem">' + h(x.bezeichnung) + '</span>' +
              '<span class="mini leise">' +
                (x.erhaltenAm ? 'erhalten ' + h(W.f.datum(x.erhaltenAm))
                  : x.angefordertAm ? 'angefordert ' + h(W.f.datum(x.angefordertAm))
                  : 'noch nicht angefordert') +
                (x.datei ? ' · <span class="amber">' + h(x.datei.name) + '</span>' : '') + '</span>' +
            '</span>' +
            b.unterlagenmarke(x.status) +
            '<span style="display:flex;flex-wrap:wrap;gap:.35rem">' +
              (x.status !== 'angefordert' && x.status !== 'vorhanden'
                ? '<button class="onyx-knopf onyx-knopf-leise" style="font-size:.75rem;padding:.25rem .55rem" data-ul-anfordern="' + h(x.id) + '">Anfordern</button>' : '') +
              (x.status !== 'vorhanden'
                ? '<button class="onyx-knopf onyx-knopf-leise" style="font-size:.75rem;padding:.25rem .55rem" data-ul-da="' + h(x.id) + '">Liegt vor</button>'
                : '<button class="onyx-knopf onyx-knopf-klar" style="font-size:.75rem;padding:.25rem .55rem" data-ul-zurueck="' + h(x.id) + '">Zurücksetzen</button>') +
              (x.datei
                ? '<a class="onyx-knopf onyx-knopf-leise datei-knopf" style="font-size:.75rem;padding:.25rem .55rem" data-ul-oeffnen="' + h(x.id) + '" href="#">' + sym.dokument(13) + 'Öffnen</a>' +
                  '<button class="onyx-knopf onyx-knopf-klar" style="font-size:.75rem;padding:.25rem .55rem" data-ul-weg="' + h(x.id) + '">Datei entfernen</button>'
                : '<button class="onyx-knopf onyx-knopf-leise" style="font-size:.75rem;padding:.25rem .55rem" data-ul-datei="' + h(x.id) + '">' + sym.hochladen(13) + 'Scan ablegen</button>') +
            '</span></li>';
        }).join('') + '</ul></section>';
    }).join('');

    return '<div class="onyx-karte" style="margin-top:1.5rem;padding:1.1rem">' +
        '<div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:.75rem">' +
          '<div><p class="onyx-etikett">Pflichtunterlagen</p>' +
            '<p class="mono" style="margin-top:.25rem;font-size:1.25rem">' + v.ist + ' von ' + v.soll + '</p></div>' +
          '<p class="klein leise" style="max-width:48ch;line-height:1.65">Ohne diese Unterlagen wird kein Exposé gebaut. ' +
            'Scan oder PDF direkt zur Zeile ablegen \u2013 danach liegt das Papier im System, nicht im Ordner.</p>' +
        '</div>' +
        '<div style="margin-top:.9rem">' + b.fortschritt(v.ist, v.soll) + '</div>' +
      '</div>' +
      '<input type="file" id="eingabe-unterlage" accept="application/pdf,image/*" style="position:absolute;width:1px;height:1px;opacity:0;pointer-events:none">' +
      listen;
  }

  /* --- Reiter 3: Investoren ------------------------------------------------- */

  function reiterInvestoren(d, o) {
    var bt = H.beteiligungenZu(d, o.id);
    var frei = H.investoren(d).filter(function (i) {
      return !bt.some(function (x) { return x.investorId === i.id; });
    });

    var liste = bt.length ? '<ul class="onyx-register" style="margin-top:1rem;border-top:1px solid var(--onyx-kontur-leise)">' +
      bt.map(function (x) {
        var i = H.kontakt(d, x.investorId);
        if (!i) return '';
        var erst = i.adressvalidierung && i.adressvalidierung.status === 'offen';
        return '<li class="onyx-zeile" style="border-bottom:1px solid var(--onyx-kontur-leise);padding:.9rem .5rem">' +
          '<div style="display:flex;flex-wrap:wrap;gap:.6rem 1rem;align-items:flex-start">' +
            '<a class="wachsen" style="min-width:14rem" href="#/investor/' + h(i.id) + '">' +
              '<span style="display:block;font-size:.9375rem">' + h(i.name) + '</span>' +
              '<span class="klein leise" style="display:block">' + h(i.ansprechpartner + ' · ' + i.typ) + '</span>' +
            '</a>' +
            '<span style="display:flex;flex-wrap:wrap;gap:.4rem;align-items:center">' +
              '<span class="onyx-marke ' + (x.stand === 'Kein Interesse' ? 'onyx-marke-ruht'
                : x.stand === 'Reserviert' ? 'onyx-marke-fertig' : 'onyx-marke-laeuft') +
                '" style="font-size:10.5px;padding:.1rem .5rem">' + h(x.stand) + '</span>' +
              '<span class="mini leise">NDA ' + (x.ndaAm ? h(W.f.datum(x.ndaAm)) : '–') + '</span>' +
              '<span class="mini leise">Exposé ' + (x.exposeAm ? h(W.f.datum(x.exposeAm)) : '–') + '</span>' +
            '</span>' +
          '</div>' +
          (erst ? '<p class="mini warn" style="margin-top:.4rem;display:flex;align-items:center;gap:.35rem">' + sym.warnung(13) +
            'Erstkunde, Adressvalidierung offen. Exposé-Versand gesperrt.</p>' : '') +
          (x.notiz ? '<p class="mini leise" style="margin-top:.35rem">' + h(x.notiz) + '</p>' : '') +
          '<div style="display:flex;flex-wrap:wrap;gap:.35rem;margin-top:.6rem">' +
            '<label class="nur-sr" for="stand-' + h(x.id) + '">Stand ändern</label>' +
            '<select class="onyx-feld" id="stand-' + h(x.id) + '" data-stand="' + h(x.id) + '" style="width:auto;padding:.25rem .6rem;font-size:.75rem">' +
              opt(W.BETEILIGUNG_STAND, x.stand) + '</select>' +
            (!x.ndaAm ? '<button class="onyx-knopf onyx-knopf-leise" style="font-size:.75rem;padding:.25rem .55rem" data-nda="' + h(x.id) + '">NDA erhalten</button>' : '') +
            (x.ndaAm && !x.exposeAm && !erst ? '<button class="onyx-knopf onyx-knopf-primaer" style="font-size:.75rem;padding:.25rem .55rem" data-expose="' + h(x.id) + '">Exposé versenden</button>' : '') +
          '</div></li>';
      }).join('') + '</ul>'
      : b.leer('Noch kein Investor auf diesem Objekt.', 'Wähle unten einen Investor aus dem Bestand aus.');

    return '<div style="padding-top:1.5rem">' +
      '<div class="abschnitt-kopf"><h2>Investoren auf diesem Objekt</h2>' +
        '<p class="klein leise mono">' + bt.length + ' beteiligt</p></div>' + liste +
      (frei.length ? '<div class="onyx-karte" style="margin-top:1.5rem;padding:1rem;display:flex;flex-wrap:wrap;gap:.6rem;align-items:flex-end">' +
        '<div class="feld-gruppe" style="min-width:16rem;flex:1">' +
          '<label class="onyx-etikett" for="neuer-investor">Investor hinzufügen</label>' +
          '<select class="onyx-feld" id="neuer-investor">' +
            opt(frei.map(function (i) { return { wert: i.id, text: i.name + ' · ' + i.typ }; }), '') + '</select>' +
        '</div>' +
        '<button class="onyx-knopf onyx-knopf-primaer" id="investor-dazu">' + sym.plus(16) + 'Hinzufügen</button>' +
      '</div>' : '') + '</div>';
  }

  /* --- Reiter 4: Kommunikation ---------------------------------------------- */

  W.vorgangZeile = function (d, v, mitObjekt) {
    var k = H.kontakt(d, v.kontaktId), o = H.obj(d, v.objektId);
    return '<li class="onyx-zeile" style="border-bottom:1px solid var(--onyx-kontur-leise)">' +
      '<button class="symbolzeile" style="width:100%;text-align:left" data-vorgang="' + h(v.id) + '">' +
        '<span class="symbolkreis' + (v.richtung === 'aus' ? ' ist-aus' : '') + '">' + b.kommSymbol(v.art, v.richtung, 15) + '</span>' +
        '<span class="wachsen">' +
          '<span style="display:flex;flex-wrap:wrap;gap:.4rem;align-items:baseline">' +
            '<span style="font-size:.875rem">' + h(v.betreff) + '</span>' +
            (v.anhaenge && v.anhaenge.length ? '<span class="mini still mono">' + v.anhaenge.length + ' Anlage' + (v.anhaenge.length > 1 ? 'n' : '') + '</span>' : '') +
          '</span>' +
          '<span class="mini leise" style="display:block;margin-top:.15rem">' +
            h(v.art + ' ' + b.richtungText(v.richtung) + ' · ' + (k ? k.name : '') +
              (mitObjekt && o ? ' · ' + o.bezeichnung : '')) + '</span>' +
        '</span>' +
        '<span style="flex:none;text-align:right">' +
          '<span class="mono mini" style="display:block">' + h(W.f.datum(v.zeitpunkt)) + '</span>' +
          '<span class="mini still mono" style="display:block">Beleg ' + h(v.belegNr) + '</span>' +
          (v.outlook ? '<span class="mini still" style="display:block">in Outlook</span>' : '') +
        '</span>' +
      '</button></li>';
  };

  function reiterKommunikation(d, o) {
    var vg = H.vorgaengeZu(d, { objektId: o.id });
    var beteiligte = H.beteiligungenZu(d, o.id).map(function (x) { return H.kontakt(d, x.investorId); })
      .filter(Boolean);
    var eig = H.kontakt(d, o.eigentuemerId);
    var wer = (eig ? [eig] : []).concat(beteiligte);

    return '<div style="padding-top:1.5rem">' +
      '<div class="onyx-karte" style="padding:1rem">' +
        '<div style="display:flex;flex-wrap:wrap;align-items:baseline;justify-content:space-between;gap:.75rem">' +
          '<p class="onyx-etikett">Neuer Vorgang</p>' +
          '<p class="mini leise">' + wer.length + ' Beteiligte in dieser Akte</p>' +
        '</div>' +
        '<p class="klein leise" style="margin-top:.35rem;max-width:60ch;line-height:1.65">' +
          'Jeder Weg läuft über das System. Weg wählen, schreiben, absenden \u2013 der Vorgang liegt danach mit ' +
          'Beleg-Nummer und Zeitstempel in dieser Akte.</p>' +
        '<div class="kanalleiste" style="margin-top:.8rem">' + W.verfassenKnoepfe(o.id, eig ? eig.id : '') + '</div>' +
        '<p class="mini leise" style="margin-top:.75rem;line-height:1.7">' +
          'E-Mails werden parallel in Outlook gespiegelt, damit sie in MailStore auffindbar bleiben. ' +
          'In der Vorführung sind Outlook und MailStore nicht angebunden, die Kennzeichnung zeigt, wo die Anbindung sitzt.</p>' +
      '</div>' +
      '<div class="abschnitt-kopf" style="margin-top:1.75rem"><h2>Journal</h2>' +
        '<p class="klein leise mono">' + vg.length + ' Vorgänge</p></div>' +
      (vg.length ? '<ul class="onyx-register" style="margin-top:.6rem;border-top:1px solid var(--onyx-kontur-leise)">' +
        vg.map(function (v) { return W.vorgangZeile(d, v, false); }).join('') + '</ul>'
        : b.leer('Noch kein Vorgang zu diesem Objekt.')) +
      '</div>';
  }

  /* --- Reiter 5: Termine ------------------------------------------------------ */

  W.terminZeile = function (d, t, mitObjekt) {
    var o = H.obj(d, t.objektId), k = H.kontakt(d, t.kontaktId);
    var tage = W.f.tageBis(t.faellig);
    var erledigt = t.status === 'erledigt';
    return '<li class="onyx-zeile" style="border-bottom:1px solid var(--onyx-kontur-leise);padding:.85rem .5rem">' +
      '<div style="display:flex;flex-wrap:wrap;gap:.6rem 1rem;align-items:flex-start">' +
        '<span class="balken-links' + (erledigt ? '' : (tage !== null && tage < 0 ? ' ist-warn' : (tage !== null && tage <= 3 ? ' ist-bald' : ''))) + '" style="min-height:2.2rem"></span>' +
        '<span class="wachsen" style="min-width:14rem">' +
          '<span class="mono mini still">' + h(t.art) + (mitObjekt && o ? ' · ' + h(o.aktenzeichen) : '') + '</span>' +
          '<span style="display:block;font-size:.9375rem' + (erledigt ? ';text-decoration:line-through;opacity:.6' : '') + '">' + h(t.titel) + '</span>' +
          '<span class="mini leise" style="display:block">' + h(k ? k.name : '') + (mitObjekt && o ? ' · ' + h(o.bezeichnung) : '') + '</span>' +
          '<span class="mini leise" style="display:block;margin-top:.3rem">' + h(t.regel) + '</span>' +
        '</span>' +
        '<span style="flex:none;text-align:right;display:grid;gap:.3rem;justify-items:end">' +
          '<span class="mono mini">' + h(W.f.datum(t.faellig)) + '</span>' +
          '<span class="mini">' + (erledigt ? '<span class="still">erledigt</span>' : b.fristmarke(t.faellig)) + '</span>' +
          (erledigt ? '' : b.eskalation(t.stufe)) +
        '</span>' +
      '</div>' +
      (erledigt ? '' : '<div style="display:flex;flex-wrap:wrap;gap:.35rem;margin-top:.6rem;padding-left:1.6rem">' +
        (t.stufe < 3 ? '<button class="onyx-knopf onyx-knopf-leise" style="font-size:.75rem;padding:.25rem .55rem" data-eskalieren="' + h(t.id) + '">Eskalieren auf Stufe ' + (t.stufe + 1) + '</button>' : '') +
        '<button class="onyx-knopf onyx-knopf-leise" style="font-size:.75rem;padding:.25rem .55rem" data-erledigt="' + h(t.id) + '">' + sym.haken(13) + 'Erledigt</button>' +
      '</div>') + '</li>';
  };

  function reiterTermine(d, o) {
    var tm = H.termineZu(d, o.id);
    var beteiligte = H.beteiligungenZu(d, o.id).map(function (x) { return H.kontakt(d, x.investorId); }).filter(Boolean);
    var eig = H.kontakt(d, o.eigentuemerId);
    var wer = (eig ? [eig] : []).concat(beteiligte);

    return '<div style="padding-top:1.5rem">' +
      '<div class="onyx-karte" style="padding:1rem">' +
        '<form id="termin-formular" style="display:grid;gap:.75rem">' +
          '<div class="feld-gruppe"><label class="onyx-etikett" for="t-titel">Was ist zu tun</label>' +
            '<input class="onyx-feld" id="t-titel" name="titel" placeholder="z. B. Investor nach Beiratssitzung nachhaken"></div>' +
          '<div style="display:flex;flex-wrap:wrap;gap:.6rem">' +
            '<div class="feld-gruppe" style="min-width:9rem"><label class="onyx-etikett" for="t-art">Art</label>' +
              '<select class="onyx-feld" id="t-art" name="art">' + opt(['Wiedervorlage', 'Frist', 'Termin'], 'Wiedervorlage') + '</select></div>' +
            '<div class="feld-gruppe" style="min-width:10rem"><label class="onyx-etikett" for="t-faellig">Fällig am</label>' +
              '<input class="onyx-feld" id="t-faellig" name="faellig" type="date"></div>' +
            '<div class="feld-gruppe" style="min-width:14rem;flex:1"><label class="onyx-etikett" for="t-kontakt">Betrifft</label>' +
              '<select class="onyx-feld" id="t-kontakt" name="kontaktId">' +
                opt(wer.map(function (k) { return { wert: k.id, text: k.name }; }), eig ? eig.id : '') + '</select></div>' +
          '</div>' +
          '<div class="feld-gruppe"><label class="onyx-etikett" for="t-regel">Eskalationsvorgabe</label>' +
            '<input class="onyx-feld" id="t-regel" name="regel" value="Stufe 1 E-Mail · Stufe 2 nach 3 Tagen Anruf · Stufe 3 nach 7 Tagen Eigentümer informieren"></div>' +
          '<button class="onyx-knopf onyx-knopf-primaer" type="submit" style="justify-self:start">' + sym.plus(16) + 'Wiedervorlage anlegen</button>' +
        '</form>' +
      '</div>' +
      '<div class="abschnitt-kopf" style="margin-top:1.75rem"><h2>Terminplan</h2>' +
        '<p class="klein leise mono">' + tm.filter(function (t) { return t.status === 'offen'; }).length + ' offen</p></div>' +
      (tm.length ? '<ul class="onyx-register" style="margin-top:.6rem;border-top:1px solid var(--onyx-kontur-leise)">' +
        tm.map(function (t) { return W.terminZeile(d, t, false); }).join('') + '</ul>'
        : b.leer('Keine Wiedervorlage zu diesem Objekt.')) +
      '</div>';
  }

  /* --- Reiter Fotos ------------------------------------------------------------ */

  function reiterFotos(d, o, bilder) {
    var fotos = H.fotosZu(d, o.id);
    var ohne = fotos.filter(function (f) { return !f.beschriftung; }).length;

    var galerie = fotos.length
      ? '<ul class="foto-gitter" style="margin-top:1.25rem">' + fotos.map(function (f) {
          return '<li><button class="onyx-karte onyx-karte-klick foto-karte" data-foto="' + h(f.id) + '">' +
            '<span class="bild"><img src="' + h(H.src(f, bilder)) + '" alt="' + h(f.beschriftung || 'Foto ohne Beschriftung') + '" loading="lazy">' +
              '<span class="bild-marke amber" style="left:0;bottom:0;text-transform:uppercase;letter-spacing:.06em;font-size:10.5px">' + h(f.kategorie) + '</span>' +
            '</span>' +
            '<span class="foto-text">' + (f.beschriftung
              ? '<span class="zwei-zeilen">' + h(f.beschriftung) + '</span>'
              : '<span class="amber" style="display:flex;align-items:center;gap:.35rem">' + sym.stift(13) + 'Beschriftung fehlt</span>') +
            '</span></button></li>';
        }).join('') + '</ul>'
      : b.leer('Noch kein Foto zu diesem Objekt.',
          'Pflicht fürs Exposé: Außenansicht, Gebäudetechnik und bei Flachdach die Dachfläche. Beim Ortstermin direkt mit dem Handy aufnehmen.');

    return '<div style="padding-top:1.5rem">' +
      '<div class="abschnitt-kopf"><h2>Fotodokumentation</h2>' +
        '<p class="klein leise mono">' + fotos.length + ' ' + (fotos.length === 1 ? 'Foto' : 'Fotos') +
        (ohne ? '<span class="amber"> · ' + ohne + ' ohne Beschriftung</span>' : '') + '</p></div>' +
      '<div style="margin-top:.9rem">' + W.seiten.aufnahmeBlock(d, o.id, false) + '</div>' +
      galerie + '</div>';
  }

  /* --- Die Akte ------------------------------------------------------------------ */

  W.seiten.objekt = function (d, id, q, bilder) {
    var o = H.obj(d, id);
    if (!o) return W.seiten.nichtGefunden();
    var aktiv = q.reiter && W.REITER.some(function (r) { return r.id === q.reiter; }) ? q.reiter : 'expose';
    var v = H.vollstaendig(d, o.id);

    var zahlen = {
      unterlagen: v.soll - v.ist ? (v.soll - v.ist) + ' offen' : '',
      investoren: String(H.beteiligungenZu(d, o.id).length),
      kommunikation: String(H.vorgaengeZu(d, { objektId: o.id }).length),
      termine: String(H.termineZu(d, o.id).filter(function (t) { return t.status === 'offen'; }).length),
      fotos: String(H.fotosZu(d, o.id).length)
    };

    var inhalt = aktiv === 'unterlagen' ? reiterUnterlagen(d, o)
      : aktiv === 'investoren' ? reiterInvestoren(d, o)
      : aktiv === 'kommunikation' ? reiterKommunikation(d, o)
      : aktiv === 'termine' ? reiterTermine(d, o)
      : aktiv === 'fotos' ? reiterFotos(d, o, bilder)
      : reiterExpose(d, o);

    return '<a class="zurueck" href="#/objekte">' + sym.pfeilLinks(14) + 'Alle Objekte</a>' +
      '<header style="margin-top:1rem">' +
        '<p class="mono amber klein" style="letter-spacing:.14em">' + h(o.aktenzeichen) + '</p>' +
        '<div class="akte-kopf-reihe" style="margin-top:.35rem">' +
          '<div><h1>' + h(o.bezeichnung) + '</h1>' +
            '<p class="leise" style="display:flex;align-items:center;gap:.4rem;margin-top:.35rem;font-size:.9375rem">' +
              sym.ort(15) + h(o.strasse + ', ' + o.plz + ' ' + o.ort + ' · ' + o.objektart) + '</p></div>' +
          '<div style="display:flex;flex-wrap:wrap;align-items:center;gap:.6rem">' +
            b.objektmarke(o.status) +
            '<label class="nur-sr" for="objekt-status">Status ändern</label>' +
            '<select class="onyx-feld" id="objekt-status" style="width:auto;padding:.3rem .7rem;font-size:.8125rem">' +
              opt(W.OBJEKT_STATUS.map(function (s) { return { wert: s, text: W.OBJEKT_STATUS_TEXT[s] }; }), o.status) + '</select>' +
            '<button class="onyx-knopf onyx-knopf-primaer" data-verfassen="' +
              h(JSON.stringify({ art: 'E-Mail', objektId: o.id, kontaktId: o.eigentuemerId, richtung: 'aus' })) + '">' +
              sym.mailAus(17) + 'Nachricht verfassen</button>' +
            '<a class="onyx-knopf onyx-knopf-leise" href="#/objekt/' + h(o.id) + '/expose">' + sym.dokument(17) + 'Exposé</a>' +
            '<a class="onyx-knopf onyx-knopf-leise" href="#/objekt/' + h(o.id) + '/akte">' + sym.drucken(17) + 'Gesamtakte</a>' +
          '</div>' +
        '</div>' +
      '</header>' +
      reiterleiste(o, aktiv, zahlen) + inhalt;
  };
})();

/* --- Teil 3: Aufnahme, Dialoge, Listen, Exposé-Dokument ---------------- */
(function () {
  var h = W.f.h, b = W.b, sym = W.sym, H = W.hilfen, opt = W.opt;

  /** Flaeche zum Aufnehmen und Hochladen. mitObjekt blendet die Objektwahl ein. */
  W.seiten.aufnahmeBlock = function (d, objektId, mitObjekt) {
    var objekte = H.alle(d);
    var wahl = mitObjekt
      ? '<div class="feld-gruppe" style="min-width:15rem;flex:1">' +
          '<label class="onyx-etikett" for="neue-akte">Foto gehört zum Objekt</label>' +
          '<select class="onyx-feld" id="neue-akte">' +
            opt(objekte.map(function (o) { return { wert: o.id, text: o.aktenzeichen + ' · ' + o.bezeichnung }; }), objektId) +
          '</select></div>' : '';

    return '<div class="onyx-karte" style="padding:1rem">' +
      '<div class="aufnahme-knoepfe">' +
        '<button class="onyx-knopf onyx-knopf-primaer" id="knopf-kamera" style="padding:.85rem;font-size:.9375rem">' +
          sym.kamera(20) + 'Foto aufnehmen</button>' +
        '<button class="onyx-knopf onyx-knopf-leise" id="knopf-upload" style="padding:.85rem">' +
          sym.hochladen(18) + 'Bilder hochladen</button>' +
      '</div>' +
      '<p id="upload-lauf" class="klein amber" style="display:none;align-items:center;justify-content:center;gap:.6rem;margin-top:.6rem;padding:.9rem;background:var(--onyx-amber-flaeche);border:1px solid var(--onyx-kontur-stark);border-radius:var(--onyx-radius-klein)">Fotos werden übernommen …</p>' +
      '<div style="display:flex;flex-wrap:wrap;align-items:flex-end;gap:.75rem 1rem;margin-top:.9rem">' + wahl +
        '<div class="feld-gruppe" style="min-width:11rem">' +
          '<label class="onyx-etikett" for="neue-kategorie">Kategorie</label>' +
          '<select class="onyx-feld" id="neue-kategorie">' + opt(W.KATEGORIEN, 'Außenansicht') + '</select>' +
        '</div>' +
      '</div>' +
      '<input id="eingabe-kamera" type="file" accept="image/*" capture="environment" class="nur-sr">' +
      '<input id="eingabe-upload" type="file" accept="image/*" multiple class="nur-sr">' +
      '</div>';
  };

  W.seiten.fotoDialog = function (foto, bilder) {
    return '<div class="schleier" id="foto-schleier" role="dialog" aria-modal="true" aria-label="Foto beschriften">' +
      '<div class="onyx-rahmen dialog">' +
        '<div class="dialog-kopf">' +
          '<p class="mono amber" style="font-size:11px;text-transform:uppercase;letter-spacing:.14em">Foto in der Akte</p>' +
          '<button id="dialog-zu" class="klein" style="display:flex;align-items:center;gap:.4rem;padding:.25rem">Schließen' + sym.schliessen(15) + '</button>' +
        '</div>' +
        '<div class="dialog-bild"><img src="' + h(H.src(foto, bilder)) + '" alt="' + h(foto.beschriftung || 'Foto ohne Beschriftung') + '"></div>' +
        '<div class="dialog-koerper">' +
          '<p class="onyx-etikett">Aufgenommen ' + h(W.f.datumZeit(foto.aufgenommenAm)) + '</p>' +
          '<form id="foto-formular" style="display:grid;gap:.75rem">' +
            '<div class="feld-gruppe"><label class="onyx-etikett" for="beschriftung">Beschriftung</label>' +
              '<textarea class="onyx-feld" id="beschriftung" name="beschriftung" rows="2" placeholder="z. B. Dachfläche Südseite, Folienabdichtung">' + h(foto.beschriftung) + '</textarea>' +
              '<p class="mini leise">Die Beschriftung erscheint im Exposé unter dem Bild.</p></div>' +
            '<div class="feld-gruppe" style="max-width:20rem"><label class="onyx-etikett" for="foto-kategorie">Kategorie</label>' +
              '<select class="onyx-feld" id="foto-kategorie" name="kategorie">' + opt(W.KATEGORIEN, foto.kategorie) + '</select></div>' +
            '<div style="display:flex;flex-wrap:wrap;align-items:center;gap:.75rem;padding-top:.25rem">' +
              '<button class="onyx-knopf onyx-knopf-primaer" type="submit">Beschriftung speichern</button>' +
              '<span style="flex:1"></span>' +
              '<button class="onyx-knopf onyx-knopf-klar" type="button" id="foto-weg" style="font-size:.8125rem">' + sym.papierkorb(15) + 'Foto entfernen</button>' +
            '</div>' +
          '</form>' +
        '</div>' +
      '</div></div>';
  };

  /** Einzelner Vorgang gross, mit Druckknopf. Kein Papier, aber alles druckbar. */
  W.seiten.vorgangDialog = function (d, v) {
    var k = H.kontakt(d, v.kontaktId), o = H.obj(d, v.objektId);
    return '<div class="schleier" id="vorgang-schleier" role="dialog" aria-modal="true" aria-label="Vorgang">' +
      '<div class="onyx-rahmen dialog">' +
        '<div class="dialog-kopf kein-druck">' +
          '<p class="mono amber" style="font-size:11px;text-transform:uppercase;letter-spacing:.14em">Vorgang ' + h(v.belegNr) + '</p>' +
          '<span style="display:flex;gap:.5rem;align-items:center">' +
            '<button class="onyx-knopf onyx-knopf-leise" style="font-size:.75rem;padding:.25rem .6rem" data-verfassen="' +
              h(JSON.stringify({ art: v.art, objektId: v.objektId, kontaktId: v.kontaktId, richtung: 'aus',
                betreff: (/^(AW|WG):/.test(v.betreff) ? v.betreff : 'AW: ' + v.betreff),
                inhalt: '\n\n--- ' + W.f.datumZeit(v.zeitpunkt) + ', Beleg ' + v.belegNr + ' ---\n' + v.inhalt })) + '">' +
              sym.mailAus(14) + 'Antworten</button>' +
            '<button class="onyx-knopf onyx-knopf-leise" style="font-size:.75rem;padding:.25rem .6rem" data-verfassen="' +
              h(JSON.stringify({ art: v.art, objektId: v.objektId, kontaktId: '', richtung: 'aus',
                betreff: 'WG: ' + v.betreff, inhalt: v.inhalt, anhaenge: v.anhaenge || [] })) + '">' +
              sym.pfeilRechts(14) + 'Weiterleiten</button>' +
            '<button class="onyx-knopf onyx-knopf-leise" id="vorgang-drucken" style="font-size:.75rem;padding:.25rem .6rem">' + sym.drucken(14) + 'Drucken</button>' +
            '<button id="dialog-zu" class="klein" style="display:flex;align-items:center;gap:.4rem;padding:.25rem">Schließen' + sym.schliessen(15) + '</button>' +
          '</span>' +
        '</div>' +
        '<div class="dialog-koerper" id="vorgang-druckbereich">' +
          '<dl style="display:grid;gap:.4rem 1.5rem;grid-template-columns:auto 1fr;font-size:.8125rem">' +
            '<dt class="leise">Objekt</dt><dd>' + h(o ? o.aktenzeichen + ' · ' + o.bezeichnung : '–') + '</dd>' +
            '<dt class="leise">Gegenüber</dt><dd>' + h(k ? k.name + ', ' + k.ansprechpartner : '–') + '</dd>' +
            '<dt class="leise">Art</dt><dd>' + h(v.art + ', ' + b.richtungText(v.richtung)) + '</dd>' +
            '<dt class="leise">Zeitpunkt</dt><dd class="mono">' + h(W.f.datumZeit(v.zeitpunkt)) + '</dd>' +
            '<dt class="leise">Beleg-Nr.</dt><dd class="mono">' + h(v.belegNr) + '</dd>' +
            '<dt class="leise">Ablage</dt><dd>' + (v.festgeschrieben ? 'festgeschrieben, nicht mehr änderbar' : 'Entwurf') +
              (v.outlook ? ' · in Outlook gespiegelt' : '') + '</dd>' +
          '</dl>' +
          '<div style="padding-top:1rem;border-top:1px solid var(--onyx-kontur-leise)">' +
            '<p style="font-size:.9375rem">' + h(v.betreff) + '</p>' +
            '<p class="klein leise" style="margin-top:.5rem;line-height:1.75;white-space:pre-line">' + h(v.inhalt) + '</p>' +
          '</div>' +
          (v.anhaenge && v.anhaenge.length
            ? '<div><p class="onyx-etikett">Anlagen</p><ul style="margin-top:.4rem;display:grid;gap:.25rem">' +
              v.anhaenge.map(function (a) {
                return '<li class="klein" style="display:flex;align-items:center;gap:.4rem">' + sym.dokument(14) + h(a) + '</li>';
              }).join('') + '</ul></div>' : '') +
        '</div>' +
      '</div></div>';
  };

  /* --- Neues Objekt ---------------------------------------------------------- */

  W.seiten.neu = function (d, naechstes) {
    function feld(name, etikett, art, platzhalter) {
      return '<div class="feld-gruppe"><label class="onyx-etikett" for="' + name + '">' + h(etikett) + '</label>' +
        '<input class="onyx-feld" id="' + name + '" name="' + name + '" type="' + (art || 'text') + '"' +
        (platzhalter ? ' placeholder="' + h(platzhalter) + '"' : '') + '></div>';
    }
    var eig = d.kontakte.filter(function (k) { return k.rolle === 'Eigentümer'; });
    return '<a class="zurueck" href="#/objekte">' + sym.pfeilLinks(14) + 'Alle Objekte</a>' +
      '<div style="margin-top:1rem;padding-bottom:1.5rem;border-bottom:1px solid var(--onyx-kontur-leise)">' +
        '<h1>Neues Objekt anlegen</h1>' +
        '<p class="klein leise" style="margin-top:.35rem;max-width:62ch;line-height:1.7">' +
          'Das Aktenzeichen vergibt das System fortlaufend. Eckdaten, Unterlagen, Investoren, Kommunikation und Termine kommen anschließend in der Akte dazu.</p>' +
      '</div>' +
      '<form class="formular" id="neu-formular">' +
        '<section class="formular-abschnitt">' +
          '<h2 style="display:flex;justify-content:space-between;align-items:baseline;gap:1rem">Objekt' +
            '<span class="mono amber" style="font-size:12.5px">' + h(naechstes) + '</span></h2>' +
          feld('bezeichnung', 'Bezeichnung', 'text', 'REWE-Markt Oldenburg') +
          feld('strasse', 'Straße und Hausnummer', 'text', 'Bümmersteder Tredde 12') +
          '<div class="feld-paar schmal-breit">' + feld('plz', 'Postleitzahl', 'text', '26129') + feld('ort', 'Ort', 'text', 'Oldenburg') + '</div>' +
          '<div class="feld-paar">' +
            '<div class="feld-gruppe"><label class="onyx-etikett" for="objektart">Objektart</label>' +
              '<select class="onyx-feld" id="objektart" name="objektart">' + opt(W.OBJEKTARTEN, 'Lebensmittel-Fachmarkt') + '</select></div>' +
            '<div class="feld-gruppe"><label class="onyx-etikett" for="status">Status</label>' +
              '<select class="onyx-feld" id="status" name="status">' +
                opt(W.OBJEKT_STATUS.map(function (s) { return { wert: s, text: W.OBJEKT_STATUS_TEXT[s] }; }), 'akquise') + '</select></div>' +
          '</div>' +
        '</section>' +
        '<section class="formular-abschnitt"><h2>Auftrag und Zahlen</h2>' +
          '<div class="feld-gruppe"><label class="onyx-etikett" for="eigentuemerId">Eigentümer</label>' +
            '<select class="onyx-feld" id="eigentuemerId" name="eigentuemerId">' +
              opt(eig.map(function (k) { return { wert: k.id, text: k.name }; }), '', 'Bitte auswählen') + '</select></div>' +
          '<div class="feld-paar">' + feld('kaufpreis', 'Kaufpreis in Euro', 'text', '3350000') +
            feld('mieteinnahmen', 'Mieteinnahmen p. a. in Euro', 'text', '312000') + '</div>' +
          '<div class="feld-paar">' + feld('nichtUmlagefaehig', 'Nicht umlagefähige Nebenkosten in Euro', 'text', '17330') +
            feld('kaeuferprovision', 'Käuferprovision', 'text', '3,57 % inkl. MwSt.') + '</div>' +
          feld('verkaufsgrund', 'Verkaufsgrund', 'text', 'Portfoliobereinigung') +
        '</section>' +
        '<p id="neu-fehler" class="klein" style="display:none;color:var(--onyx-warn);background:var(--onyx-warn-flaeche);border:1px solid rgb(217 97 76 / .35);border-radius:var(--onyx-radius-klein);padding:.5rem .75rem"></p>' +
        '<div style="display:flex;align-items:center;gap:.75rem;padding-top:1.5rem;border-top:1px solid var(--onyx-kontur-leise)">' +
          '<button class="onyx-knopf onyx-knopf-primaer" type="submit">Objekt anlegen</button>' +
          '<a class="onyx-knopf onyx-knopf-klar" href="#/objekte">Abbrechen</a>' +
        '</div>' +
      '</form>';
  };

  /* --- Investoren -------------------------------------------------------------- */

  W.seiten.investoren = function (d) {
    var liste = H.investoren(d);
    return '<div class="kopfzeile-seite"><div><h1>Investoren</h1>' +
        '<p class="klein leise" style="margin-top:.35rem;max-width:64ch;line-height:1.7">' +
          'Wenige, dafür wiederkehrende Käufer. Suchprofil, Vertraulichkeitserklärung und Adressvalidierung stehen an jedem Eintrag.</p></div>' +
        '<p class="klein leise mono">' + liste.length + ' Investoren</p></div>' +
      '<ul style="display:grid;gap:1.25rem;padding-bottom:2rem;grid-template-columns:repeat(auto-fit,minmax(min(100%,22rem),1fr))">' +
      liste.map(function (i) {
        var p = i.suchprofil || {};
        var offeneVal = i.adressvalidierung && i.adressvalidierung.status === 'offen';
        var mandate = d.beteiligungen.filter(function (x) { return x.investorId === i.id; }).length;
        return '<li><a class="onyx-karte onyx-karte-klick" style="display:flex;flex-direction:column;height:100%;padding:1.25rem" href="#/investor/' + h(i.id) + '">' +
          '<span style="display:flex;justify-content:space-between;gap:1rem">' +
            '<span style="min-width:0">' +
              '<span class="mono amber" style="display:block;font-size:10.5px;text-transform:uppercase;letter-spacing:.1em">' + h(i.typ) + '</span>' +
              '<span style="display:block;margin-top:.25rem;font-size:1.0625rem">' + h(i.name) + '</span>' +
              '<span class="klein leise" style="display:block;margin-top:.1rem">' + h(i.ansprechpartner) + '</span>' +
            '</span><span class="leise" style="flex:none">' + sym.pfeilRechts(17) + '</span>' +
          '</span>' +
          (p.assetklassen ? '<span class="mini leise" style="display:block;margin-top:.75rem;line-height:1.6">' +
            h(p.assetklassen.join(', ')) + '<br>' + h((p.regionen || []).join(', ')) + '<br>' +
            b.euro(p.volumenVon) + ' bis ' + b.euro(p.volumenBis) + ', max. ' + String(p.faktorMax).replace('.', ',') + '-fach' +
            '</span>' : '') +
          '<span style="display:flex;flex-wrap:wrap;gap:.4rem;margin-top:auto;padding-top:1rem">' +
            '<span class="onyx-marke ' + (i.nda && i.nda.status === 'unterzeichnet' ? 'onyx-marke-fertig'
              : i.nda && i.nda.status === 'versendet' ? 'onyx-marke-laeuft' : 'onyx-marke-ruht') +
              '" style="font-size:10.5px;padding:.1rem .5rem">NDA ' + h(i.nda ? i.nda.status : 'offen') + '</span>' +
            '<span class="onyx-marke ' + (offeneVal ? 'onyx-marke-warn' : 'onyx-marke-fertig') +
              '" style="font-size:10.5px;padding:.1rem .5rem">Adresse ' + h(i.adressvalidierung ? i.adressvalidierung.status : 'offen') + '</span>' +
            '<span class="onyx-marke onyx-marke-ruht" style="font-size:10.5px;padding:.1rem .5rem">' + mandate + ' Objekte</span>' +
          '</span></a></li>';
      }).join('') + '</ul>';
  };

  W.seiten.investor = function (d, id) {
    var i = H.kontakt(d, id);
    if (!i) return W.seiten.nichtGefunden();
    var p = i.suchprofil || {};
    var mandate = d.beteiligungen.filter(function (x) { return x.investorId === i.id; });
    var eigene = d.objekte.filter(function (o) { return o.eigentuemerId === i.id; });
    var vg = H.vorgaengeZu(d, { kontaktId: i.id });
    var val = i.adressvalidierung || { status: 'offen' };

    return '<a class="zurueck" href="' + (i.rolle === 'Investor' ? '#/investoren' : '#/objekte') + '">' +
        sym.pfeilLinks(14) + (i.rolle === 'Investor' ? 'Alle Investoren' : 'Alle Objekte') + '</a>' +
      '<header style="margin-top:1rem;padding-bottom:1.5rem;border-bottom:1px solid var(--onyx-kontur-leise)">' +
        '<p class="mono amber" style="font-size:10.5px;text-transform:uppercase;letter-spacing:.12em">' + h(i.rolle + ' · ' + i.typ) + '</p>' +
        '<h1 style="margin-top:.35rem">' + h(i.name) + '</h1>' +
        '<p class="leise" style="margin-top:.35rem;font-size:.9375rem">' + h(i.ansprechpartner) + '</p>' +
        '<ul style="display:flex;flex-wrap:wrap;gap:.5rem 2rem;margin-top:1.25rem;font-size:.84375rem">' +
          '<li style="display:flex;align-items:center;gap:.5rem"><span class="leise">' + sym.telefon(15) + '</span><a class="mono" href="tel:' + h(i.telefon.replace(/\s/g, '')) + '">' + h(i.telefon) + '</a></li>' +
          '<li style="display:flex;align-items:center;gap:.5rem"><span class="leise">' + sym.brief(15) + '</span><a class="mono" href="mailto:' + h(i.email) + '">' + h(i.email) + '</a></li>' +
          '<li style="display:flex;align-items:center;gap:.5rem"><span class="leise">' + sym.ort(15) + '</span>' + h(i.anschrift) + '</li>' +
        '</ul>' +
        '<div class="kanalleiste" style="margin-top:1.1rem">' +
          W.verfassenKnoepfe(mandate.length ? mandate[0].objektId : '', i.id) + '</div>' +
        '<p class="mini leise" style="margin-top:.5rem">Jeder Weg zu diesem Investor läuft über das System und landet in seiner Historie.</p>' +
      '</header>' +
      '<div class="spalten">' +
        '<section>' +
          (p.assetklassen ? '<h2>Suchprofil</h2><dl class="angaben-gitter" style="margin-top:.9rem">' +
            b.datenzeile('Assetklassen', h(p.assetklassen.join(', ')), false, true) +
            b.datenzeile('Regionen', h((p.regionen || []).join(', ')), false, true) +
            b.datenzeile('Volumen von', b.euro(p.volumenVon), true) +
            b.datenzeile('Volumen bis', b.euro(p.volumenBis), true) +
            b.datenzeile('Faktor maximal', String(p.faktorMax).replace('.', ',') + '-fach', true) +
          '</dl>' : '') +
          '<h2 style="margin-top:2rem">Objekte</h2>' +
          (eigene.length ? '<ul class="onyx-register" style="margin-top:.75rem;border-top:1px solid var(--onyx-kontur-leise)">' +
            eigene.map(function (o) {
              return '<li class="onyx-zeile" style="border-bottom:1px solid var(--onyx-kontur-leise)">' +
                '<a class="zeile-link" href="#/objekt/' + h(o.id) + '">' +
                  '<span class="wachsen"><span class="mono mini still">' + h(o.aktenzeichen) + '</span>' +
                    '<span class="kuerzen" style="display:block;font-size:.875rem">' + h(o.bezeichnung) + '</span></span>' +
                  '<span class="onyx-marke onyx-marke-ruht" style="font-size:10.5px;padding:.1rem .5rem">Eigentum</span>' +
                '</a></li>';
            }).join('') + '</ul>' : '') +
          (mandate.length ? '<ul class="onyx-register" style="margin-top:.75rem;border-top:1px solid var(--onyx-kontur-leise)">' +
            mandate.map(function (x) {
              var o = H.obj(d, x.objektId);
              if (!o) return '';
              return '<li class="onyx-zeile" style="border-bottom:1px solid var(--onyx-kontur-leise)">' +
                '<a class="zeile-link" href="#/objekt/' + h(o.id) + '?reiter=investoren">' +
                  '<span class="wachsen"><span class="mono mini still">' + h(o.aktenzeichen) + '</span>' +
                    '<span class="kuerzen" style="display:block;font-size:.875rem">' + h(o.bezeichnung) + '</span></span>' +
                  '<span class="onyx-marke onyx-marke-laeuft" style="font-size:10.5px;padding:.1rem .5rem">' + h(x.stand) + '</span>' +
                '</a></li>';
            }).join('') + '</ul>'
            : (eigene.length ? '' : b.leer('Noch keinem Objekt zugeordnet.'))) +
          '<h2 style="margin-top:2rem">Korrespondenz</h2>' +
          (vg.length ? '<ul class="onyx-register" style="margin-top:.75rem;border-top:1px solid var(--onyx-kontur-leise)">' +
            vg.map(function (v) { return W.vorgangZeile(d, v, true); }).join('') + '</ul>'
            : b.leer('Noch kein Vorgang mit diesem Kontakt.')) +
        '</section>' +
        '<section style="display:grid;gap:2rem;align-content:start">' +
          '<div><h2>Prüfungen</h2>' +
            '<div class="onyx-karte" style="margin-top:.75rem;padding:1rem;display:grid;gap:.75rem">' +
              '<div style="display:flex;justify-content:space-between;gap:.75rem;align-items:center">' +
                '<span class="klein">Vertraulichkeitserklärung</span>' + b.pruefmarke(i.nda ? i.nda.status : 'offen') + '</div>' +
              '<div style="display:flex;justify-content:space-between;gap:.75rem;align-items:center">' +
                '<span class="klein">Adressvalidierung</span>' + b.pruefmarke(val.status) + '</div>' +
              (val.hinweis ? '<p class="mini leise" style="line-height:1.65">' + h(val.hinweis) + '</p>' : '') +
              (val.status === 'offen'
                ? '<button class="onyx-knopf onyx-knopf-primaer" id="val-erledigt" style="font-size:.8125rem;justify-self:start">' + sym.haken(15) + 'Adresse geprüft</button>' : '') +
            '</div></div>' +
          '<div><h2>Notizen</h2>' +
            '<form id="investor-notiz" style="display:grid;gap:.75rem;margin-top:.75rem">' +
              '<label class="nur-sr" for="inv-notizen">Notizen</label>' +
              '<textarea class="onyx-feld" id="inv-notizen" name="notizen" rows="7">' + h(i.notizen || '') + '</textarea>' +
              '<button class="onyx-knopf onyx-knopf-leise" type="submit" style="justify-self:start">Notizen speichern</button>' +
            '</form></div>' +
        '</section>' +
      '</div>';
  };

  /* --- Globale Kommunikation ------------------------------------------------------ */

  W.seiten.kommunikation = function (d, q) {
    var alleV = H.vorgaengeZu(d, {});
    var gefiltert = alleV.filter(function (v) {
      if (q.objekt && v.objektId !== q.objekt) return false;
      if (q.art && v.art !== q.art) return false;
      return true;
    });
    return '<div class="kopfzeile-seite"><div><h1>Kommunikation</h1>' +
        '<p class="klein leise" style="margin-top:.35rem;max-width:66ch;line-height:1.7">' +
          'Die gesamte Korrespondenz läuft über das System: E-Mail ein und aus, Telefonate, WhatsApp, SMS und Briefe. ' +
          'Jeder Eintrag trägt Beleg-Nummer und Zeitstempel und lässt sich einzeln ausdrucken.</p></div>' +
        '<p class="klein leise mono">' + gefiltert.length + ' von ' + alleV.length + '</p></div>' +
      '<div class="onyx-karte" style="margin-top:1rem;padding:1rem">' +
        '<p class="onyx-etikett">Neuer Vorgang</p>' +
        '<div class="kanalleiste" style="margin-top:.7rem">' + W.verfassenKnoepfe(q.objekt || '', '') + '</div>' +
      '</div>' +
      '<div class="werkzeugleiste"><div class="filter">' +
        '<label class="nur-sr" for="k-objekt">Nach Objekt filtern</label>' +
        '<select class="onyx-feld" id="k-objekt" data-kfilter="objekt" style="width:auto;max-width:18rem;padding:.35rem .7rem;font-size:.8125rem">' +
          opt(H.alle(d).map(function (o) { return { wert: o.id, text: o.aktenzeichen + ' · ' + o.bezeichnung }; }), q.objekt || '', 'Alle Objekte') + '</select>' +
        '<label class="nur-sr" for="k-art">Nach Art filtern</label>' +
        '<select class="onyx-feld" id="k-art" data-kfilter="art" style="width:auto;padding:.35rem .7rem;font-size:.8125rem">' +
          opt(W.KOMM_ARTEN, q.art || '', 'Alle Arten') + '</select>' +
        ((q.objekt || q.art) ? '<a class="onyx-knopf onyx-knopf-klar" style="font-size:.8125rem;padding:.35rem .6rem" href="#/kommunikation">' +
          sym.schliessen(13) + 'Zurücksetzen</a>' : '') +
      '</div></div>' +
      (gefiltert.length ? '<ul class="onyx-register" style="margin-top:1rem;border-top:1px solid var(--onyx-kontur-leise)">' +
        gefiltert.map(function (v) { return W.vorgangZeile(d, v, true); }).join('') + '</ul>'
        : b.leer('Kein Vorgang passt zu diesem Filter.'));
  };

  /* --- Globale Termine ------------------------------------------------------------- */

  W.seiten.termine = function (d, q) {
    var alleT = H.termineZu(d, null);
    var offen = alleT.filter(function (t) { return t.status === 'offen'; });
    var zeigen = q.alle === '1' ? alleT : offen;
    var heute = new Date();
    return '<div class="kopfzeile-seite"><div><h1>Terminplan</h1>' +
        '<p class="klein leise" style="margin-top:.35rem;max-width:66ch;line-height:1.7">' +
          'Wiedervorlagen, Fristen und Termine über alle Objekte. Jede Wiedervorlage hat eine Eskalationsvorgabe: ' +
          'erst E-Mail, dann Anruf, dann Eigentümer informieren.</p></div>' +
        '<a class="onyx-knopf onyx-knopf-leise" href="' + (q.alle === '1' ? '#/termine' : '#/termine?alle=1') + '">' +
          (q.alle === '1' ? 'Nur offene zeigen' : 'Auch erledigte zeigen') + '</a></div>' +
      '<div style="margin-top:.5rem">' + b.terminschiene(offen, heute, d) + '</div>' +
      (zeigen.length ? '<ul class="onyx-register" style="margin-top:1.75rem;border-top:1px solid var(--onyx-kontur-leise)">' +
        zeigen.map(function (t) { return W.terminZeile(d, t, true); }).join('') + '</ul>'
        : b.leer('Keine Wiedervorlage offen.'));
  };

  /* --- Globale Fotos ---------------------------------------------------------------- */

  W.seiten.fotos = function (d, q, bilder) {
    var objekte = H.alle(d);
    if (!objekte.length) {
      return '<div class="kopfzeile-seite"><div><h1>Fotos</h1></div></div>' +
        b.leer('Noch kein Objekt angelegt.', 'Fotos gehören immer zu einem Objekt.');
    }
    var gewaehlt = q.akte && H.obj(d, q.akte) ? q.akte : objekte[0].id;
    var gefiltert = q.filter && H.obj(d, q.filter) ? [H.obj(d, q.filter)] : objekte;
    var gesamt = d.fotos.length;

    var gruppen = gefiltert.map(function (o) {
      var fotos = H.fotosZu(d, o.id);
      if (!fotos.length) return '';
      return '<section style="margin-top:2rem">' +
        '<div class="abschnitt-kopf">' +
          '<h2 style="font-size:.9375rem"><a href="#/objekt/' + h(o.id) + '?reiter=fotos">' + h(o.bezeichnung) + '</a></h2>' +
          '<p class="klein leise mono">' + h(o.aktenzeichen) + ' · ' + fotos.length + '</p></div>' +
        '<ul class="foto-gitter" style="margin-top:.9rem">' + fotos.map(function (f) {
          return '<li><button class="onyx-karte onyx-karte-klick foto-karte" data-foto="' + h(f.id) + '">' +
            '<span class="bild"><img src="' + h(H.src(f, bilder)) + '" alt="' + h(f.beschriftung || 'Foto ohne Beschriftung') + '" loading="lazy">' +
              '<span class="bild-marke amber" style="left:0;bottom:0;text-transform:uppercase;letter-spacing:.06em;font-size:10.5px">' + h(f.kategorie) + '</span></span>' +
            '<span class="foto-text">' + (f.beschriftung
              ? '<span class="zwei-zeilen">' + h(f.beschriftung) + '</span>'
              : '<span class="amber" style="display:flex;align-items:center;gap:.35rem">' + sym.stift(13) + 'Beschriftung fehlt</span>') +
            '</span></button></li>';
        }).join('') + '</ul></section>';
    }).join('');

    return '<div class="kopfzeile-seite"><div><h1>Fotos</h1>' +
        '<p class="klein leise" style="margin-top:.35rem;max-width:64ch;line-height:1.7">' +
          'Pflicht fürs Exposé: Außenansicht, Gebäudetechnik und bei Flachdach die Dachfläche. ' +
          'Beim Ortstermin direkt mit dem Handy aufnehmen.</p></div>' +
        '<p class="klein leise mono">' + gesamt + ' ' + (gesamt === 1 ? 'Foto' : 'Fotos') + '</p></div>' +
      W.seiten.aufnahmeBlock(d, gewaehlt, true) +
      (gesamt ? '<div class="filter" style="margin-top:1.5rem">' +
        '<label class="onyx-etikett" for="foto-filter">Anzeigen</label>' +
        '<select class="onyx-feld" id="foto-filter" style="width:auto;max-width:22rem;padding:.35rem .7rem;font-size:.8125rem">' +
          '<option value="">Alle Objekte</option>' +
          opt(objekte.map(function (o) { return { wert: o.id, text: o.aktenzeichen + ' · ' + o.bezeichnung }; }), q.filter || '') +
        '</select></div>' : '') +
      '<div style="padding-bottom:2rem">' +
        (gesamt ? (gruppen || b.leer('Für dieses Objekt ist noch kein Foto erfasst.'))
          : b.leer('Noch kein Foto im System.',
              'Nimm oben das erste Bild auf. Auf dem Handy öffnet „Foto aufnehmen“ direkt die Kamera, das Bild liegt danach beim gewählten Objekt und erscheint im Exposé.')) +
      '</div>';
  };

  /* --- Exposé als Dokument -------------------------------------------------------- */

  W.seiten.expose = function (d, id, bilder) {
    var o = H.obj(d, id);
    if (!o) return W.seiten.nichtGefunden();
    var e = H.kontakt(d, o.eigentuemerId);
    var fotos = H.fotosZu(d, o.id);
    var heute = new Date().toISOString().slice(0, 10);
    var K = W.KONTO;
    var drin = o.eckdaten.filter(function (f) { return f.imExpose && !f.offen; });

    var gruppen = {};
    drin.forEach(function (f) { (gruppen[f.gruppe] = gruppen[f.gruppe] || []).push(f); });
    var angaben = Object.keys(gruppen).map(function (g) {
      return '<section class="blatt-abschnitt" style="margin-top:1.5rem">' +
        '<p class="sans" style="font-size:11px;text-transform:uppercase;letter-spacing:.1em;color:#6C6459">' + h(g) + '</p>' +
        '<dl class="blatt-tabelle" style="margin-top:.4rem">' + gruppen[g].map(function (f) {
          return '<div><dt>' + h(f.etikett) + '</dt><dd>' + h(f.wert) + '</dd></div>';
        }).join('') + '</dl></section>';
    }).join('');

    var zahlen = [
      ['Kaufpreis', b.euro(o.kaufpreis)],
      ['Mieteinnahmen p. a.', b.euro(o.mieteinnahmen)],
      ['Kaufpreisfaktor', b.faktor(o.kaufpreis, o.mieteinnahmen)],
      ['Nicht umlagefähige Nebenkosten ' + o.nichtUmlagefaehigJahr, b.euro(o.nichtUmlagefaehig)],
      ['Käuferprovision', o.kaeuferprovision],
      ['Verkaufsgrund', o.verkaufsgrund],
      ['Besitzgesellschaft', o.besitzgesellschaft]
    ].map(function (p) { return '<div><dt>' + h(p[0]) + '</dt><dd>' + p[1] + '</dd></div>'; }).join('');

    var lichtbilder = fotos.length
      ? '<ol class="lichtbilder">' + fotos.map(function (f, i) {
          return '<li><img src="' + h(H.src(f, bilder)) + '" alt="' + h(f.beschriftung || ('Bild ' + (i + 1))) + '">' +
            '<p style="margin-top:.35rem;font-size:.75rem;line-height:1.4">' +
              '<span class="sans mono" style="font-size:11px;color:#5F584E">Bild ' + (i + 1) + '</span> ' +
              (f.beschriftung ? h(f.beschriftung) : '<span style="font-style:italic;color:#6C6459">ohne Beschriftung</span>') + '</p>' +
            '<p style="font-size:11px;color:#6C6459">' + h(f.kategorie) + '</p></li>';
        }).join('') + '</ol>'
      : '<p class="platzhalter">Noch keine Fotos erfasst. Bilder aus dem Reiter Fotos erscheinen hier automatisch.</p>';

    return '<div class="kein-druck" style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:1rem;padding:1.5rem 0;border-bottom:1px solid var(--onyx-kontur-leise)">' +
        '<div><a class="zurueck" style="padding-top:0" href="#/objekt/' + h(o.id) + '">' + sym.pfeilLinks(14) + 'Zurück zur Akte ' + h(o.aktenzeichen) + '</a>' +
          '<h1 style="margin-top:.5rem">Exposé</h1>' +
          '<p class="mini leise" style="margin-top:.25rem;max-width:72ch;line-height:1.7">Aus den angekreuzten Punkten des Erfassungsbogens und ' +
            fotos.length + ' ' + (fotos.length === 1 ? 'Bild' : 'Bildern') + ' zusammengestellt. Nicht angekreuzte Punkte und fehlende Angaben bleiben draußen.</p></div>' +
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
          '<p class="sans mono" style="font-size:11px;text-transform:uppercase;letter-spacing:.24em;color:#6C6459">Exposé</p>' +
          '<h2 style="margin-top:1.25rem;font-size:clamp(1.5rem,1.2rem+1.4vw,1.875rem);line-height:1.2">' + h(o.bezeichnung) + '</h2>' +
          '<p style="margin-top:1.25rem;font-size:1.0625rem;line-height:1.35">' + h(o.strasse) + '<br>' + h(o.plz + ' ' + o.ort) + '</p>' +
          '<p class="sans mono" style="margin-top:1.5rem;font-size:12.5px;letter-spacing:.1em;color:#5F584E">' + h(o.aktenzeichen) + '</p>' +
        '</div>' +
        '<dl class="blatt-daten">' +
          '<div><dt>Objektart</dt><dd>' + h(o.objektart) + '</dd></div>' +
          '<div><dt>Eigentümer</dt><dd>' + h(e ? e.name : '–') + '</dd></div>' +
          '<div><dt>Stand</dt><dd>' + h(W.f.datumLang(heute)) + '</dd></div>' +
          '<div><dt>Ansprechpartner</dt><dd>' + h(K.name) + '</dd></div>' +
        '</dl>' +
        '<section class="blatt-abschnitt"><h3><span class="nr">1</span>Wirtschaftliche Eckdaten</h3>' +
          '<dl class="blatt-tabelle" style="margin-top:.75rem">' + zahlen + '</dl></section>' +
        '<section class="blatt-abschnitt"><h3><span class="nr">2</span>Objektangaben</h3>' + angaben + '</section>' +
        '<section class="blatt-abschnitt"><h3><span class="nr">3</span>Bilder</h3>' +
          '<div style="margin-top:.75rem">' + lichtbilder + '</div></section>' +
        '<section class="blatt-abschnitt"><h3><span class="nr">4</span>Nächster Schritt</h3>' +
          '<p style="margin-top:.75rem">Bei Interesse senden Sie uns bitte die beigefügte Vertraulichkeitserklärung unterzeichnet zurück. ' +
          'Als Erstkunde benötigen wir zusätzlich eine Adressvalidierung. Die Käuferprovision beträgt ' + h(o.kaeuferprovision) + '.</p></section>' +
        '<section class="blatt-abschnitt"><h3><span class="nr">5</span>Widerrufsbelehrung</h3>' +
          '<p style="margin-top:.75rem">Verbraucher haben bei außerhalb von Geschäftsräumen oder im Fernabsatz geschlossenen Verträgen ' +
          'ein Widerrufsrecht von vierzehn Tagen. Die vollständige Belehrung und das Muster-Widerrufsformular liegen diesem Exposé als Anlage bei.</p>' +
          '<p class="platzhalter">Vollständiger Belehrungstext wird aus der Vorlage des Büros eingesetzt.</p></section>' +
        '<footer class="sans" style="margin-top:3rem;padding-top:1rem;border-top:1px solid #D5CFC2;font-size:10.5px;line-height:1.7;color:#6C6459">' +
          'Exposé zu ' + h(o.aktenzeichen) + ', Stand ' + h(W.f.datumLang(heute)) +
          '. Angaben ohne Gewähr, sie beruhen auf Auskünften des Eigentümers. Alle Daten dieser Vorführversion sind Beispieldaten.</footer>' +
      '</article></div>';
  };

  W.seiten.nichtGefunden = function () {
    return '<div style="padding:5rem 0;text-align:center">' +
      '<p class="mono amber" style="font-size:11px;text-transform:uppercase;letter-spacing:.24em">Wertakte</p>' +
      '<h1 style="margin-top:1rem">Diese Seite gibt es nicht</h1>' +
      '<a class="onyx-knopf onyx-knopf-primaer" style="margin-top:1.75rem" href="#/uebersicht">Zur Übersicht</a></div>';
  };
})();
