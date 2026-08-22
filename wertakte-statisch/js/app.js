/* Router, Geruest und Ereignisse. */
(function () {
  var h = W.f.h, sym = W.sym, H = W.hilfen;
  var wurzel = document.getElementById('wurzel');
  var daten = null;
  var angemeldet = false;
  var offenesFoto = null;
  var offenerVorgang = null;
  var entwurf = null;
  var zielUnterlage = null;

  /* Die Bereiche der linken Leiste. Die fuenf Teile aus der Vorgabe des
     Kunden liegen zusaetzlich als nummerierte Reiter in jeder Objektakte. */
  var PUNKTE = [
    { pfad: 'uebersicht', text: 'Übersicht', symbol: sym.uebersicht },
    { pfad: 'objekte', text: 'Objekte', symbol: sym.objekte },
    { pfad: 'investoren', text: 'Investoren', symbol: sym.investor },
    { pfad: 'kommunikation', text: 'Kommunikation', symbol: sym.chat },
    { pfad: 'termine', text: 'Termine', symbol: sym.kalender },
    { pfad: 'fotos', text: 'Fotos', symbol: sym.bild },
    { pfad: 'protokoll', text: 'Protokoll', symbol: sym.siegel },
    { pfad: 'verwaltung', text: 'Verwaltung', symbol: sym.auftraggeber }
  ];

  function route() {
    var roh = (location.hash || '#/uebersicht').replace(/^#\/?/, '');
    var teile = roh.split('?');
    var pfad = teile[0].split('/').filter(Boolean);
    var q = {};
    (teile[1] || '').split('&').filter(Boolean).forEach(function (p) {
      var kv = p.split('=');
      q[decodeURIComponent(kv[0])] = decodeURIComponent((kv[1] || '').replace(/\+/g, ' '));
    });
    return { pfad: pfad, q: q };
  }

  function sichern() { W.speicher.sichern(daten); }
  function neueId(p) { return p + '_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7); }

  function naechstesAktenzeichen() {
    var jahr = new Date().getFullYear(), praefix = 'VK-' + jahr + '-';
    var zahlen = daten.objekte.filter(function (o) { return o.aktenzeichen.indexOf(praefix) === 0; })
      .map(function (o) { return parseInt(o.aktenzeichen.slice(praefix.length), 10); })
      .filter(function (n) { return !isNaN(n); });
    return praefix + String((zahlen.length ? Math.max.apply(null, zahlen) : 0) + 1).padStart(3, '0');
  }

  function naechsteBelegNr() {
    var zahlen = daten.vorgaenge.map(function (v) { return parseInt(String(v.belegNr).split('-')[1], 10); })
      .filter(function (n) { return !isNaN(n); });
    return new Date().getFullYear() + '-' + String((zahlen.length ? Math.max.apply(null, zahlen) : 0) + 1).padStart(6, '0');
  }

  function eigeneFotoIds() {
    return daten.fotos.filter(function (f) { return f.quelle.indexOf('idb:') === 0; })
      .map(function (f) { return f.quelle.slice(4); });
  }

  /* --- Geruest ------------------------------------------------------------ */

  function railPunkte(aktiv) {
    return PUNKTE.map(function (p) {
      return '<a class="onyx-rail-punkt" href="#/' + p.pfad + '" title="' + h(p.text) + '" aria-label="' + h(p.text) + '"' +
        (p.pfad === aktiv ? ' aria-current="page"' : '') + '>' + p.symbol(21) + '</a>';
    }).join('');
  }

  function fussNav(aktiv) {
    // Am Handy nur die vier meistgenutzten Bereiche, sonst wird es zu eng.
    var kurz = PUNKTE.filter(function (p) {
      return ['uebersicht', 'objekte', 'fotos', 'termine'].indexOf(p.pfad) >= 0;
    });
    return '<nav class="fuss-nav kein-druck" aria-label="Hauptbereiche">' + kurz.map(function (p) {
      return '<a href="#/' + p.pfad + '"' + (p.pfad === aktiv ? ' aria-current="page"' : '') + '>' +
        p.symbol(21) + h(p.text) + '</a>';
    }).join('') + '</nav>';
  }

  function geruest(inhalt, aktiv, suche) {
    var ueber = daten.termine.filter(function (t) {
      if (t.status !== 'offen') return false;
      var x = W.f.tageBis(t.faellig);
      return x !== null && x < 0;
    }).length;

    return '<div class="huelle"><div class="onyx-rahmen fenster">' +
      '<aside class="onyx-rail rail-huelle kein-druck"><div class="rail-inhalt">' +
        '<a class="marke-w" href="#/uebersicht" aria-label="Wertakte, zur Übersicht">W</a>' +
        '<nav aria-label="Hauptbereiche" style="display:flex;flex-direction:column;gap:.5rem">' + railPunkte(aktiv) + '</nav>' +
      '</div></aside>' +
      '<div class="strang">' +
        '<header class="kopf kein-druck">' +
          '<a class="wortmarke" href="#/uebersicht" style="flex:none">Wertakte</a>' +
          '<div class="kopf-suche"><div>' + sym.suche(15) +
            '<label class="nur-sr" for="kopfsuche">Über alle Bereiche suchen</label>' +
            '<input class="onyx-feld onyx-suche" id="kopfsuche" type="search" placeholder="Alles durchsuchen …" value="' + h(suche || '') + '" style="padding-top:.45rem;padding-bottom:.45rem;font-size:.875rem">' +
          '</div></div>' +
          '<div class="kopf-werkzeuge">' +
            '<button class="onyx-knopf onyx-knopf-primaer knopf-neu" id="knopf-neu">' + sym.plus(16) + '<span>Neuer Vorgang</span></button>' +
            '<a class="rund-knopf" href="#/termine" aria-label="' + (ueber ? ueber + ' überfällige Wiedervorlagen' : 'Keine überfällige Wiedervorlage') + '">' +
              sym.glocke(19) + (ueber ? '<span class="zaehler mono">' + ueber + '</span>' : '') + '</a>' +
            '<a class="nutzer-name" href="#/verwaltung">' + h(W.KONTO.name) +
              '<span class="inhaber-marke">Inhaber</span></a>' +
            '<a class="kuerzel" href="#/verwaltung" aria-label="Verwaltung, angemeldet als Inhaber">' +
              h(W.f.kuerzel(W.KONTO.name)) + '</a>' +
            '<button class="rund-knopf" id="knopf-abmelden" aria-label="Abmelden">' + sym.abmelden(18) + '</button>' +
          '</div>' +
        '</header>' +
        '<main class="inhalt">' + inhalt + '</main>' +
      '</div></div>' + fussNav(aktiv) + '</div>';
  }

  /* --- Zeichnen ------------------------------------------------------------- */

  function zeichnen() {
    if (!angemeldet) { wurzel.innerHTML = W.seiten.anmelden(daten); verdrahteAnmeldung(); return; }
    var r = route();
    var bereich = r.pfad[0] || 'uebersicht';

    W.speicher.fotoUrls(eigeneFotoIds()).then(function (bilder) {
      var inhalt, aktiv = bereich, suche = '';

      if (bereich === 'objekte') { suche = r.q.suche || ''; inhalt = W.seiten.objekte(daten, r.q, bilder); }
      else if (bereich === 'suche') { suche = r.q.q || ''; inhalt = W.seiten.suche(daten, r.q); aktiv = ''; }
      else if (bereich === 'protokoll') { inhalt = W.seiten.protokoll(daten, r.q); }
      else if (bereich === 'verwaltung') { inhalt = W.seiten.verwaltung(daten); }
      else if (bereich === 'vorgang') { inhalt = W.seiten.vorgangBlatt(daten, r.pfad[1]); aktiv = 'kommunikation'; }
      else if (bereich === 'objekt' && r.pfad[2] === 'akte') { inhalt = W.seiten.akte(daten, r.pfad[1], bilder); aktiv = 'objekte'; }
      else if (bereich === 'objekt' && r.pfad[2] === 'expose') { inhalt = W.seiten.expose(daten, r.pfad[1], bilder); aktiv = 'objekte'; }
      else if (bereich === 'objekt') { inhalt = W.seiten.objekt(daten, r.pfad[1], r.q, bilder); aktiv = 'objekte'; }
      else if (bereich === 'neu') { inhalt = W.seiten.neu(daten, naechstesAktenzeichen()); aktiv = 'objekte'; }
      else if (bereich === 'investor') { inhalt = W.seiten.investor(daten, r.pfad[1]); aktiv = 'investoren'; }
      else if (bereich === 'investoren') { inhalt = W.seiten.investoren(daten, r.q); }
      else if (bereich === 'kommunikation') { inhalt = W.seiten.kommunikation(daten, r.q); }
      else if (bereich === 'termine') { inhalt = W.seiten.termine(daten, r.q); }
      else if (bereich === 'fotos') { inhalt = W.seiten.fotos(daten, r.q, bilder); }
      else if (bereich === 'uebersicht') { inhalt = W.seiten.uebersicht(daten); }
      else { inhalt = W.seiten.nichtGefunden(); aktiv = ''; }

      var warnung = W.speicher.warnung();
      if (warnung) {
        inhalt = '<p class="hinweis" style="margin-top:1.25rem;border-color:rgb(217 97 76 / .35);background:var(--onyx-warn-flaeche)">' +
          '<span class="warn" style="flex:none">' + sym.warnung(17) + '</span><span>' + h(warnung) + '</span></p>' + inhalt;
      }

      wurzel.innerHTML = geruest(inhalt, aktiv, suche);

      if (offenesFoto) {
        var f = daten.fotos.filter(function (x) { return x.id === offenesFoto; })[0];
        if (f) { wurzel.insertAdjacentHTML('beforeend', W.seiten.fotoDialog(f, bilder)); verdrahteFotoDialog(f); }
        else offenesFoto = null;
      }
      if (offenerVorgang) {
        var v = daten.vorgaenge.filter(function (x) { return x.id === offenerVorgang; })[0];
        if (v) { wurzel.insertAdjacentHTML('beforeend', W.seiten.vorgangDialog(daten, v)); verdrahteVorgangDialog(); }
        else offenerVorgang = null;
      }
      if (entwurf) {
        wurzel.insertAdjacentHTML('beforeend', W.seiten.verfassen(daten, entwurf));
        verdrahteVerfassen();
      }
      verdrahteSeite(r);
    });
  }

  /* --- Ereignisse ------------------------------------------------------------ */

  function verdrahteAnmeldung() {
    var form = document.getElementById('anmelde-formular');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (form.email.value.trim().toLowerCase() !== W.KONTO.email || form.passwort.value !== W.KONTO.passwort) {
        var fehler = document.getElementById('anmelde-fehler');
        fehler.textContent = 'E-Mail oder Passwort stimmt nicht.';
        fehler.style.display = 'flex';
        return;
      }
      angemeldet = true;
      try { sessionStorage.setItem('wertakte.angemeldet', '1'); } catch (e2) { /* egal */ }
      if (!location.hash || location.hash === '#/') location.hash = '#/uebersicht';
      zeichnen();
    });
  }

  function auf(sel, ereignis, fn) {
    Array.prototype.forEach.call(document.querySelectorAll(sel), function (el) {
      el.addEventListener(ereignis, function (e) { fn(el, e); });
    });
  }

  function verdrahteSeite(r) {
    var abmelden = document.getElementById('knopf-abmelden');
    if (abmelden) abmelden.addEventListener('click', function () {
      angemeldet = false;
      try { sessionStorage.removeItem('wertakte.angemeldet'); } catch (e) { /* egal */ }
      zeichnen();
    });

    var suchfeld = document.getElementById('kopfsuche');
    if (suchfeld) {
      var timer = null;
      suchfeld.addEventListener('input', function () {
        clearTimeout(timer);
        var wert = suchfeld.value;
        timer = setTimeout(function () {
          location.hash = wert ? '#/suche?q=' + encodeURIComponent(wert) : '#/uebersicht';
          setTimeout(function () {
            var neu = document.getElementById('kopfsuche');
            if (neu) { neu.focus(); neu.setSelectionRange(neu.value.length, neu.value.length); }
          }, 0);
        }, 250);
      });
    }

    var neuKnopf = document.getElementById('knopf-neu');
    if (neuKnopf) neuKnopf.addEventListener('click', function () {
      var r2 = route();
      entwurfOeffnen({ art: 'E-Mail', richtung: 'aus',
        objektId: r2.pfad[0] === 'objekt' ? r2.pfad[1] : (r2.q.objekt || ''), kontaktId: '' });
    });

    // Verfassen laesst sich von jeder Stelle aus starten, auch aus einem Vorgang heraus.
    auf('[data-verfassen]', 'click', function (el) {
      var roh = el.getAttribute('data-verfassen');
      var e;
      try { e = JSON.parse(roh); } catch (f) { e = {}; }
      offenerVorgang = null;
      entwurfOeffnen(e);
    });

    auf('[data-pfilter]', 'change', function (sel) {
      var q = Object.assign({}, route().q);
      q[sel.getAttribute('data-pfilter')] = sel.value;
      location.hash = '#/protokoll' + anhaengsel(q);
    });

    var drucken = document.getElementById('knopf-drucken');
    if (drucken) drucken.addEventListener('click', function () { window.print(); });

    auf('[data-filter]', 'change', function (sel) {
      var q = Object.assign({}, route().q);
      q[sel.getAttribute('data-filter')] = sel.value;
      location.hash = '#/objekte' + anhaengsel(q);
    });
    auf('[data-kfilter]', 'change', function (sel) {
      var q = Object.assign({}, route().q);
      q[sel.getAttribute('data-kfilter')] = sel.value;
      location.hash = '#/kommunikation' + anhaengsel(q);
    });

    // Grossansicht eines Vorgangs, ueberall wo Journalzeilen stehen
    auf('[data-vorgang]', 'click', function (el) { offenerVorgang = el.getAttribute('data-vorgang'); zeichnen(); });
    auf('[data-foto]', 'click', function (el) { offenesFoto = el.getAttribute('data-foto'); zeichnen(); });

    if (r.pfad[0] === 'verwaltung') verdrahteVerwaltung();
    if (r.pfad[0] === 'objekt' && r.pfad[1] && !r.pfad[2]) verdrahteAkte(r.pfad[1], r.q.reiter || 'expose');
    if (r.pfad[0] === 'neu') verdrahteNeu();
    if (r.pfad[0] === 'investor') verdrahteInvestor(r.pfad[1]);
    if (r.pfad[0] === 'fotos') verdrahteFotoseite();
    if (r.pfad[0] === 'termine') verdrahteTerminKnoepfe();
  }

  function anhaengsel(q) {
    var teile = Object.keys(q).filter(function (k) { return q[k]; })
      .map(function (k) { return k + '=' + encodeURIComponent(q[k]); });
    return teile.length ? '?' + teile.join('&') : '';
  }

  /* --- Objektakte -------------------------------------------------------------- */

  function verdrahteAkte(id, reiter) {
    var o = H.obj(daten, id);
    if (!o) return;

    var status = document.getElementById('objekt-status');
    if (status) status.addEventListener('change', function () {
      o.status = status.value;
      protokollieren(o.id, 'Akte', 'Status geändert auf „' + (W.OBJEKT_STATUS_TEXT[o.status] || o.status) + '“');
      sichern(); zeichnen();
    });

    // Reiter 1: Erfassungsbogen
    auf('[data-eck]', 'change', function (el) {
      var i = Number(el.getAttribute('data-eck'));
      if (o.eckdaten[i]) {
        o.eckdaten[i].imExpose = el.checked;
        protokollieren(o.id, 'Exposé', (el.checked ? 'Angabe ins Exposé übernommen: ' : 'Angabe aus dem Exposé genommen: ') + o.eckdaten[i].etikett);
        sichern(); zeichnen();
      }
    });
    var notiz = document.getElementById('notiz-formular');
    if (notiz) notiz.addEventListener('submit', function (e) {
      e.preventDefault(); o.notizen = notiz.notizen.value;
      protokollieren(o.id, 'Akte', 'Notizen zur Akte geändert');
      sichern(); melde(notiz, 'Notizen gespeichert.');
    });

    // Reiter 2: Unterlagen
    function ul(id2) { return daten.unterlagen.filter(function (x) { return x.id === id2; })[0]; }
    var heuteIso = new Date().toISOString().slice(0, 10);
    auf('[data-ul-anfordern]', 'click', function (el) {
      var x = ul(el.getAttribute('data-ul-anfordern'));
      if (!x) return;
      x.status = 'angefordert'; x.angefordertAm = heuteIso;
      protokollieren(o.id, 'Unterlage', x.bezeichnung + ' angefordert');
      sichern(); zeichnen();
    });
    auf('[data-ul-da]', 'click', function (el) {
      var x = ul(el.getAttribute('data-ul-da'));
      if (!x) return;
      x.status = 'vorhanden'; x.erhaltenAm = heuteIso;
      protokollieren(o.id, 'Unterlage', x.bezeichnung + ' liegt vor');
      sichern(); zeichnen();
    });
    auf('[data-ul-zurueck]', 'click', function (el) {
      var x = ul(el.getAttribute('data-ul-zurueck'));
      if (!x) return;
      x.status = 'fehlt'; x.erhaltenAm = null; x.angefordertAm = null;
      protokollieren(o.id, 'Unterlage', x.bezeichnung + ' zurückgesetzt');
      sichern(); zeichnen();
    });

    // Scan oder PDF zur Zeile: kein Papier mehr, das Blatt liegt im System.
    var dateiFeld = document.getElementById('eingabe-unterlage');
    auf('[data-ul-datei]', 'click', function (el) {
      zielUnterlage = el.getAttribute('data-ul-datei');
      if (dateiFeld) { dateiFeld.value = ''; dateiFeld.click(); }
    });
    if (dateiFeld) dateiFeld.addEventListener('change', function () {
      var x = ul(zielUnterlage), datei = dateiFeld.files && dateiFeld.files[0];
      if (!x || !datei) return;
      var kennung = neueId('dat');
      W.speicher.dateiSichern(kennung, datei).then(function () {
        x.datei = { kennung: kennung, name: datei.name, typ: datei.type || 'Datei', groesse: datei.size };
        if (x.status !== 'vorhanden') { x.status = 'vorhanden'; x.erhaltenAm = heuteIso; }
        protokollieren(o.id, 'Unterlage', x.bezeichnung + ' abgelegt: ' + datei.name);
        sichern(); zeichnen();
      }).catch(function () {
        alert('Die Datei konnte nicht abgelegt werden. Bitte den privaten Modus des Browsers verlassen.');
      });
    });
    auf('[data-ul-oeffnen]', 'click', function (el, ev) {
      ev.preventDefault();
      var x = ul(el.getAttribute('data-ul-oeffnen'));
      if (!x || !x.datei) return;
      W.speicher.dateiUrl(x.datei.kennung).then(function (u) {
        if (u) window.open(u, '_blank');
        else alert('Die Datei liegt nicht mehr im Speicher dieses Geräts.');
      });
    });
    auf('[data-ul-weg]', 'click', function (el) {
      var x = ul(el.getAttribute('data-ul-weg'));
      if (!x || !x.datei) return;
      W.speicher.dateiLoeschen(x.datei.kennung);
      protokollieren(o.id, 'Unterlage', x.bezeichnung + ': Datei entfernt (' + x.datei.name + ')');
      x.datei = null;
      sichern(); zeichnen();
    });

    // Reiter 3: Investoren
    function bt(id2) { return daten.beteiligungen.filter(function (x) { return x.id === id2; })[0]; }
    auf('[data-stand]', 'change', function (el) {
      var x = bt(el.getAttribute('data-stand'));
      if (!x) return;
      x.stand = el.value;
      var wer = H.kontakt(daten, x.investorId);
      protokollieren(o.id, 'Investor', (wer ? wer.name : 'Investor') + ': Stand auf „' + x.stand + '“ gesetzt');
      sichern(); zeichnen();
    });
    auf('[data-nda]', 'click', function (el) {
      var x = bt(el.getAttribute('data-nda'));
      if (!x) return;
      x.ndaAm = heuteIso;
      if (x.stand === 'NDA offen' || x.stand === 'Angesprochen') x.stand = 'NDA unterzeichnet';
      var i = H.kontakt(daten, x.investorId);
      if (i) i.nda = { status: 'unterzeichnet', datum: heuteIso };
      protokollieren(o.id, 'Investor', 'Vertraulichkeitserklärung von ' + (i ? i.name : 'Investor') + ' eingegangen');
      sichern(); zeichnen();
    });
    auf('[data-expose]', 'click', function (el) {
      var x = bt(el.getAttribute('data-expose'));
      if (!x) return;
      var i = H.kontakt(daten, x.investorId);
      if (i && i.adressvalidierung && i.adressvalidierung.status === 'offen') {
        protokollieren(o.id, 'Exposé', 'Versand an ' + i.name + ' gesperrt: Adressvalidierung steht aus');
        sichern();
        alert('Adressvalidierung steht noch aus. Das Exposé kann erst danach versendet werden.');
        return;
      }
      x.exposeAm = heuteIso;
      x.stand = 'Exposé versendet';
      vorgangAnlegen({
        objektId: o.id, kontaktId: x.investorId, art: 'E-Mail', richtung: 'aus',
        betreff: 'Exposé ' + o.bezeichnung + ', ' + o.aktenzeichen,
        inhalt: 'Anbei das Exposé inklusive Widerrufsbelehrung. Käuferprovision ' + o.kaeuferprovision + '.',
        anhaenge: ['Expose_' + o.aktenzeichen + '.pdf', 'Widerrufsbelehrung.pdf'], outlook: true
      });
      protokollieren(o.id, 'Exposé', 'Exposé an ' + (i ? i.name : 'Investor') + ' versendet');
      sichern(); zeichnen();
    });
    var dazuKnopf = document.getElementById('investor-dazu');
    if (dazuKnopf) dazuKnopf.addEventListener('click', function () {
      var sel = document.getElementById('neuer-investor');
      if (!sel || !sel.value) return;
      daten.beteiligungen.push({
        id: neueId('bt'), objektId: o.id, investorId: sel.value, stand: 'Angesprochen',
        ndaAm: null, exposeAm: null, letzteReaktion: heuteIso, notiz: ''
      });
      var neuerI = H.kontakt(daten, sel.value);
      protokollieren(o.id, 'Investor', (neuerI ? neuerI.name : 'Investor') + ' zur Akte genommen');
      sichern(); zeichnen();
    });

    // Reiter 5: Termine
    var tf = document.getElementById('termin-formular');
    if (tf) tf.addEventListener('submit', function (e) {
      e.preventDefault();
      var titel = tf.titel.value.trim();
      if (!titel) { tf.titel.focus(); return; }
      daten.termine.push({
        id: neueId('tm'), objektId: o.id, kontaktId: tf.kontaktId.value, titel: titel,
        art: tf.art.value, faellig: tf.faellig.value || heuteIso, stufe: 1, status: 'offen',
        regel: tf.regel.value.trim(), erledigtAm: null
      });
      protokollieren(o.id, 'Termin', tf.art.value + ' angelegt: ' + titel);
      sichern(); zeichnen();
    });
    verdrahteTerminKnoepfe();

    // Reiter Fotos
    if (reiter === 'fotos') verdrahteAufnahme(function () { return o.id; });
  }

  function verdrahteTerminKnoepfe() {
    function tm(id) { return daten.termine.filter(function (t) { return t.id === id; })[0]; }
    auf('[data-eskalieren]', 'click', function (el) {
      var t = tm(el.getAttribute('data-eskalieren'));
      if (!t || t.stufe >= 3) return;
      t.stufe += 1;
      protokollieren(t.objektId, 'Termin', 'Eskalation auf Stufe ' + t.stufe + ': ' + t.titel);
      sichern(); zeichnen();
    });
    auf('[data-erledigt]', 'click', function (el) {
      var t = tm(el.getAttribute('data-erledigt'));
      if (!t) return;
      t.status = 'erledigt'; t.erledigtAm = new Date().toISOString().slice(0, 10);
      protokollieren(t.objektId, 'Termin', 'Wiedervorlage erledigt: ' + t.titel);
      sichern(); zeichnen();
    });
  }

  /** Legt einen Vorgang revisionssicher ab: Beleg-Nummer, Zeitstempel, festgeschrieben. */
  function vorgangAnlegen(v) {
    var eintrag = {
      id: neueId('vg'), objektId: v.objektId, kontaktId: v.kontaktId, art: v.art, richtung: v.richtung,
      zeitpunkt: new Date().toISOString().slice(0, 16), betreff: v.betreff, inhalt: v.inhalt || '',
      teilnehmer: v.teilnehmer || '', belegNr: naechsteBelegNr(), festgeschrieben: true,
      outlook: Boolean(v.outlook), anhaenge: v.anhaenge || []
    };
    daten.vorgaenge.push(eintrag);
    protokollieren(v.objektId, 'Kommunikation',
      v.art + ' ' + W.b.richtungText(v.richtung) + ' · ' + v.betreff, eintrag.belegNr);
    return eintrag;
  }

  /** Revisionssichere Spur: jede Aenderung im System bekommt eine Zeile. */
  function protokollieren(objektId, art, text, belegNr) {
    if (!daten.protokoll) daten.protokoll = [];
    daten.protokoll.push({
      id: neueId('pr'), zeitpunkt: new Date().toISOString().slice(0, 16),
      objektId: objektId || null, art: art, text: text,
      nutzer: W.KONTO.name, belegNr: belegNr || null
    });
  }

  function inTagen(tage) {
    var d2 = new Date();
    d2.setDate(d2.getDate() + (parseInt(tage, 10) || 0));
    return d2.toISOString().slice(0, 10);
  }

  function eskalationsregel() {
    return (daten.stamm && daten.stamm.eskalationsregel) ||
      'Stufe 1 E-Mail · Stufe 2 nach 3 Tagen Anruf · Stufe 3 nach 7 Tagen Eigentümer informieren';
  }

  /* --- Verfassen ------------------------------------------------------------- */

  var letzteVorlage = '';

  function entwurfOeffnen(e) {
    entwurf = {
      art: e.art || 'E-Mail', richtung: e.richtung || 'aus',
      objektId: e.objektId || '', kontaktId: e.kontaktId || '',
      betreff: e.betreff || '', inhalt: e.inhalt || '', anhaenge: e.anhaenge || [],
      dauer: e.dauer || '', versand: e.versand || '', wiedervorlage: false, frist: '7', wvTitel: ''
    };
    letzteVorlage = '';
    vorlageSetzen();
    zeichnen();
  }

  /* Schreiben beginnt nicht auf leerem Blatt: Anrede und Grußformel stehen
     schon da. Sobald etwas Eigenes im Feld steht, wird nichts mehr ersetzt. */
  function vorlageSetzen() {
    if (!entwurf) return;
    if (entwurf.art !== 'E-Mail' && entwurf.art !== 'Brief') return;
    if (entwurf.richtung === 'ein') return;
    var text = entwurf.inhalt || '';
    if (text && text !== letzteVorlage) return;
    var g = entwurf.kontaktId ? H.kontakt(daten, entwurf.kontaktId) : null;
    entwurf.inhalt = W.briefgeruest(g);
    letzteVorlage = entwurf.inhalt;
  }

  /** Holt den Stand des Formulars in den Entwurf, bevor neu gezeichnet wird. */
  function entwurfLesen() {
    var f = document.getElementById('verfassen-formular');
    if (!f || !entwurf) return;
    if (f.objektId) entwurf.objektId = f.objektId.value;
    if (f.kontaktId) entwurf.kontaktId = f.kontaktId.value;
    if (f.richtung) entwurf.richtung = f.richtung.value;
    if (f.betreff) entwurf.betreff = f.betreff.value;
    if (f.inhalt) entwurf.inhalt = f.inhalt.value;
    if (f.dauer) entwurf.dauer = f.dauer.value;
    if (f.versand) entwurf.versand = f.versand.value;
    if (f.frist) entwurf.frist = f.frist.value;
    if (f.wvTitel) entwurf.wvTitel = f.wvTitel.value;
    entwurf.wiedervorlage = Boolean(f.wiedervorlage && f.wiedervorlage.checked);
    entwurf.anhaenge = Array.prototype.slice.call(f.querySelectorAll('input[name="anhang"]:checked'))
      .map(function (x) { return x.value; });
  }

  function verdrahteVerfassen() {
    var zu = schliesser('verfassen-schleier', function () { entwurf = null; });
    auf('[data-kanal]', 'click', function (el) {
      entwurfLesen(); entwurf.art = el.getAttribute('data-kanal'); vorlageSetzen(); zeichnen();
    });
    ['verf-objekt', 'verf-kontakt'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.addEventListener('change', function () { entwurfLesen(); vorlageSetzen(); zeichnen(); });
    });
    var ab = document.getElementById('verfassen-ab');
    if (ab) ab.addEventListener('click', zu);
    var form = document.getElementById('verfassen-formular');
    if (form) form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      entwurfLesen();
      absenden();
    });
  }

  function absenden() {
    var e = entwurf, k = W.KANAL[e.art] || {};
    var betreff = (e.betreff || '').trim();
    var inhalt = (e.inhalt || '').trim();
    if (!betreff && (!inhalt || inhalt === letzteVorlage.trim())) {
      var feld = document.getElementById('verf-betreff');
      if (feld) feld.focus();
      return;
    }
    if (!betreff) betreff = e.art + ': ' + inhalt.slice(0, 60);
    var kopf = [];
    if (k.dauer && e.dauer) kopf.push('Dauer ' + e.dauer + ' Minuten');
    if (k.versand && e.versand) kopf.push('Versand ' + e.versand);
    var text = (kopf.length ? kopf.join(' · ') + '\n\n' : '') + inhalt;

    var g = e.kontaktId ? H.kontakt(daten, e.kontaktId) : null;
    var v = vorgangAnlegen({
      objektId: e.objektId || null, kontaktId: e.kontaktId || null,
      art: e.art, richtung: k.ohneRichtung ? 'aus' : e.richtung,
      betreff: betreff, inhalt: text, anhaenge: e.anhaenge || [],
      outlook: e.art === 'E-Mail', teilnehmer: g ? g.ansprechpartner : ''
    });

    if (e.wiedervorlage) {
      var titel = (e.wvTitel || '').trim() || 'Nachfassen: ' + betreff;
      daten.termine.push({
        id: neueId('tm'), objektId: e.objektId || null, kontaktId: e.kontaktId || null,
        titel: titel, art: 'Wiedervorlage', faellig: inTagen(e.frist || 7), stufe: 1,
        status: 'offen', regel: eskalationsregel(), erledigtAm: null
      });
      protokollieren(e.objektId, 'Termin', 'Wiedervorlage angelegt: ' + titel);
    }

    // Beteiligung mitziehen, damit der Stand des Investors zur Akte passt.
    if (e.objektId && e.kontaktId) {
      var bt = daten.beteiligungen.filter(function (x) {
        return x.objektId === e.objektId && x.investorId === e.kontaktId;
      })[0];
      if (bt) bt.letzteReaktion = new Date().toISOString().slice(0, 10);
    }

    var ziel = e.objektId;
    entwurf = null;
    sichern();
    hinweisBalken('Abgelegt als Beleg ' + v.belegNr + (v.outlook ? ' · in Outlook gespiegelt' : ''));
    if (ziel) {
      var pfad = '#/objekt/' + ziel + '?reiter=kommunikation';
      if (location.hash !== pfad) { location.hash = pfad; return; }
    }
    zeichnen();
  }

  /** Kurze Rueckmeldung am unteren Rand, verschwindet von selbst. */
  function hinweisBalken(text) {
    var alt2 = document.getElementById('quittung');
    if (alt2) alt2.remove();
    var p = document.createElement('p');
    p.id = 'quittung';
    p.className = 'quittung mono kein-druck';
    p.setAttribute('role', 'status');
    p.textContent = text;
    document.body.appendChild(p);
    setTimeout(function () { if (p.parentNode) p.remove(); }, 4000);
  }

  /* --- Investor ---------------------------------------------------------------- */

  function verdrahteInvestor(id) {
    var i = H.kontakt(daten, id);
    if (!i) return;
    var val = document.getElementById('val-erledigt');
    if (val) val.addEventListener('click', function () {
      i.adressvalidierung = {
        status: 'geprüft', datum: new Date().toISOString().slice(0, 10),
        hinweis: 'In der Vorführung als geprüft gesetzt'
      };
      protokollieren(null, 'Investor', 'Adressvalidierung geprüft: ' + i.name);
      sichern(); zeichnen();
    });
    var form = document.getElementById('investor-notiz');
    if (form) form.addEventListener('submit', function (e) {
      e.preventDefault(); i.notizen = form.notizen.value;
      protokollieren(null, 'Investor', 'Notizen geändert: ' + i.name);
      sichern(); melde(form, 'Notizen gespeichert.');
    });
  }

  /* --- Fotos --------------------------------------------------------------------- */

  function verdrahteAufnahme(objektId) {
    var kamera = document.getElementById('eingabe-kamera');
    var upload = document.getElementById('eingabe-upload');
    var kk = document.getElementById('knopf-kamera');
    var uk = document.getElementById('knopf-upload');
    if (!kamera || !upload) return;
    if (kk) kk.addEventListener('click', function () { kamera.click(); });
    if (uk) uk.addEventListener('click', function () { upload.click(); });
    kamera.addEventListener('change', function () { uebernehmen(objektId(), kamera.files); });
    upload.addEventListener('change', function () { uebernehmen(objektId(), upload.files); });
  }

  function verdrahteFotoseite() {
    verdrahteAufnahme(function () {
      var sel = document.getElementById('neue-akte');
      return sel ? sel.value : null;
    });
    var filter = document.getElementById('foto-filter');
    if (filter) filter.addEventListener('change', function () {
      var q = Object.assign({}, route().q);
      q.filter = filter.value;
      location.hash = '#/fotos' + anhaengsel(q);
    });
  }

  function uebernehmen(objektId, dateien) {
    if (!objektId || !dateien || !dateien.length) return;
    var kf = document.getElementById('neue-kategorie');
    var kategorie = kf ? kf.value : 'Außenansicht';
    var lauf = document.getElementById('upload-lauf');
    var knoepfe = document.querySelector('.aufnahme-knoepfe');
    if (lauf) lauf.style.display = 'flex';
    if (knoepfe) knoepfe.style.display = 'none';

    var liste = Array.prototype.slice.call(dateien).filter(function (f) {
      return f && f.size > 0 && /^image\//.test(f.type || '');
    });
    if (!liste.length) { zeichnen(); return; }

    Promise.all(liste.map(function (datei) {
      var id = neueId('bild');
      return W.speicher.fotoSichern(id, datei).then(function () {
        return {
          id: neueId('foto'), objektId: objektId, quelle: 'idb:' + id, beschriftung: '',
          kategorie: kategorie,
          aufgenommenAm: new Date(datei.lastModified || Date.now()).toISOString().slice(0, 16)
        };
      });
    })).then(function (neue) {
      daten.fotos = daten.fotos.concat(neue);
      neue.forEach(function (f) {
        protokollieren(objektId, 'Foto', 'Foto zur Akte genommen: ' + (f.beschriftung || f.kategorie));
      });
      sichern();
      if (route().pfad[0] === 'fotos') {
        var q = Object.assign({}, route().q, { akte: objektId });
        var ziel = '#/fotos' + anhaengsel(q);
        if (location.hash !== ziel) { location.hash = ziel; return; }
      }
      zeichnen();
    }).catch(function () {
      alert('Die Fotos konnten nicht gespeichert werden. Bitte den privaten Modus des Browsers verlassen.');
      zeichnen();
    });
  }

  /* --- Dialoge -------------------------------------------------------------------- */

  function schliesser(schleierId, zuruecksetzen) {
    function zu() { zuruecksetzen(); zeichnen(); }
    var knopf = document.getElementById('dialog-zu');
    if (knopf) knopf.addEventListener('click', zu);
    var schleier = document.getElementById(schleierId);
    if (schleier) schleier.addEventListener('click', function (e) { if (e.target === schleier) zu(); });
    document.addEventListener('keydown', function esc(e) {
      if (e.key === 'Escape') { document.removeEventListener('keydown', esc); zu(); }
    });
    return zu;
  }

  function verdrahteFotoDialog(foto) {
    var zu = schliesser('foto-schleier', function () { offenesFoto = null; });
    var form = document.getElementById('foto-formular');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      foto.beschriftung = form.beschriftung.value.trim();
      foto.kategorie = form.kategorie.value;
      protokollieren(foto.objektId, 'Foto', 'Foto beschriftet: ' + (foto.beschriftung || foto.kategorie));
      sichern(); zu();
    });
    var weg = document.getElementById('foto-weg');
    var sicher = false;
    weg.addEventListener('click', function () {
      if (!sicher) {
        sicher = true;
        weg.classList.remove('onyx-knopf-klar');
        weg.classList.add('onyx-knopf-gefahr');
        weg.textContent = 'Wirklich entfernen?';
        return;
      }
      daten.fotos = daten.fotos.filter(function (f) { return f.id !== foto.id; });
      if (foto.quelle.indexOf('idb:') === 0) W.speicher.fotoLoeschen(foto.quelle.slice(4));
      protokollieren(foto.objektId, 'Foto', 'Foto aus der Akte entfernt: ' + (foto.beschriftung || foto.kategorie));
      sichern(); zu();
    });
  }

  function verdrahteVorgangDialog() {
    schliesser('vorgang-schleier', function () { offenerVorgang = null; });
  }

  /* --- Neues Objekt ------------------------------------------------------------------ */

  function verdrahteNeu() {
    var form = document.getElementById('neu-formular');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var fehler = document.getElementById('neu-fehler');
      function meckern(t) { fehler.textContent = t; fehler.style.display = 'block'; }
      var bez = form.bezeichnung.value.trim();
      var ort = form.ort.value.trim();
      var eig = form.eigentuemerId.value;
      if (!bez) return meckern('Bitte eine Bezeichnung angeben.');
      if (!ort) return meckern('Bitte den Ort angeben.');
      if (!eig) return meckern('Bitte einen Eigentümer auswählen.');

      var zahl = function (s) { var n = parseInt(String(s).replace(/[^\d]/g, ''), 10); return isNaN(n) ? 0 : n; };
      var id = neueId('obj');
      daten.objekte.push({
        id: id, aktenzeichen: naechstesAktenzeichen(), bezeichnung: bez,
        strasse: form.strasse.value.trim(), plz: form.plz.value.trim(), ort: ort,
        objektart: form.objektart.value, status: form.status.value,
        verkaufsgrund: form.verkaufsgrund.value.trim(), eigentuemerId: eig,
        besitzgesellschaft: 'nicht geklärt',
        mieteinnahmen: zahl(form.mieteinnahmen.value), nichtUmlagefaehig: zahl(form.nichtUmlagefaehig.value),
        nichtUmlagefaehigJahr: String(new Date().getFullYear() - 1),
        kaufpreis: zahl(form.kaufpreis.value),
        kaeuferprovision: form.kaeuferprovision.value.trim() || (daten.stamm && daten.stamm.provision) || '3,57 % inkl. MwSt.',
        eckdaten: [], compliance: {
          provisionsvereinbarung: { status: 'offen', datum: null, hinweis: 'Noch nicht versendet' },
          widerrufsbelehrung: { status: 'offen', datum: null, hinweis: 'Wird mit dem Exposé erstellt' },
          adressvalidierung: { status: 'pflicht bei Erstkunden', datum: null, hinweis: 'Vor Exposé-Versand je Interessent zu prüfen' }
        },
        notizen: '', angelegtAm: new Date().toISOString().slice(0, 10)
      });
      // Pflichtunterlagen mit anlegen, damit die Liste sofort steht.
      W.PFLICHTUNTERLAGEN.forEach(function (p, i) {
        daten.unterlagen.push({
          id: 'ul_' + id + '_' + i, objektId: id, bezeichnung: p[0], kategorie: p[1],
          pflicht: true, status: 'fehlt', angefordertAm: null, erhaltenAm: null, datei: null, notiz: ''
        });
      });
      protokollieren(id, 'Akte', 'Akte angelegt: ' + bez + ', ' + ort);
      protokollieren(id, 'Unterlage', W.PFLICHTUNTERLAGEN.length + ' Pflichtunterlagen als offen angelegt');
      sichern();
      location.hash = '#/objekt/' + id;
    });
  }

  /* --- Verwaltung ------------------------------------------------------------- */

  function verdrahteVerwaltung() {
    var kf = document.getElementById('konto-formular');
    if (kf) kf.addEventListener('submit', function (e) {
      e.preventDefault();
      ['name', 'rolle', 'buero', 'strasse', 'ort', 'telefon', 'mobil', 'emailBuero',
        'archivEmail', 'email', 'passwort'].forEach(function (feld) {
        if (kf[feld]) daten.konto[feld] = kf[feld].value.trim();
      });
      daten.konto.email = (daten.konto.email || '').toLowerCase();
      stammUebernehmen();
      protokollieren(null, 'Akte', 'Konto des Inhabers geändert');
      sichern(); zeichnen();
      hinweisBalken('Konto gespeichert. Briefkopf und Absender sind angepasst.');
    });

    var sf = document.getElementById('stamm-formular');
    if (sf) sf.addEventListener('submit', function (e) {
      e.preventDefault();
      function zeilen(wert) {
        return String(wert || '').split('\n').map(function (z) { return z.trim(); })
          .filter(function (z) { return z; });
      }
      daten.stamm.objektarten = zeilen(sf.objektarten.value);
      daten.stamm.kategorien = zeilen(sf.kategorien.value);
      daten.stamm.pflichtunterlagen = zeilen(sf.unterlagen.value).map(function (z) {
        var teile = z.split('|');
        return [teile[0].trim(), (teile[1] || 'Sonstiges').trim()];
      });
      daten.stamm.eskalationsregel = sf.regel.value.trim();
      daten.stamm.provision = sf.provision.value.trim();
      stammUebernehmen();
      protokollieren(null, 'Akte', 'Stammdaten geändert');
      sichern(); zeichnen();
      hinweisBalken('Stammdaten gespeichert.');
    });

    var sichernKnopf = document.getElementById('knopf-sichern');
    if (sichernKnopf) sichernKnopf.addEventListener('click', function () {
      var text = JSON.stringify(daten, null, 2);
      var url = URL.createObjectURL(new Blob([text], { type: 'application/json' }));
      var a = document.createElement('a');
      a.href = url;
      a.download = 'wertakte-sicherung-' + new Date().toISOString().slice(0, 10) + '.json';
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(function () { URL.revokeObjectURL(url); }, 2000);
      hinweisBalken('Sicherung erstellt.');
    });

    var zurueck = document.getElementById('knopf-zuruecksetzen');
    var sicher = false;
    if (zurueck) zurueck.addEventListener('click', function () {
      if (!sicher) {
        sicher = true;
        zurueck.classList.remove('onyx-knopf-klar');
        zurueck.classList.add('onyx-knopf-gefahr');
        zurueck.textContent = 'Wirklich alles zurücksetzen?';
        return;
      }
      window.wertakteZuruecksetzen();
    });
  }

  function melde(form, text) {
    var alt = form.querySelector('.rueckmeldung');
    if (alt) alt.remove();
    var p = document.createElement('p');
    p.className = 'rueckmeldung klein amber';
    p.setAttribute('role', 'status');
    p.textContent = text;
    form.appendChild(p);
    setTimeout(function () { p.remove(); }, 2500);
  }

  /* --- Start ---------------------------------------------------------------------------- */

  /* Konto und Stammdaten stehen im Datenbestand, damit der Inhaber sie aendern
     kann. Beim Start werden sie in die Vorgaben uebernommen. */
  function stammUebernehmen() {
    if (daten.konto) Object.keys(daten.konto).forEach(function (k) { W.KONTO[k] = daten.konto[k]; });
    if (daten.stamm) {
      if (daten.stamm.objektarten && daten.stamm.objektarten.length) W.OBJEKTARTEN = daten.stamm.objektarten;
      if (daten.stamm.kategorien && daten.stamm.kategorien.length) W.KATEGORIEN = daten.stamm.kategorien;
      if (daten.stamm.pflichtunterlagen && daten.stamm.pflichtunterlagen.length) W.PFLICHTUNTERLAGEN = daten.stamm.pflichtunterlagen;
    }
  }

  daten = W.speicher.laden();
  stammUebernehmen();
  try { angemeldet = sessionStorage.getItem('wertakte.angemeldet') === '1'; } catch (e) { angemeldet = false; }
  // Ein Seitenwechsel schliesst offene Dialoge, sonst liegen sie ueber der neuen Seite.
  window.addEventListener('hashchange', function () {
    offenerVorgang = null; offenesFoto = null; entwurf = null;
    zeichnen();
  });
  zeichnen();

  window.wertakteZuruecksetzen = function () {
    W.speicher.zuruecksetzen().then(function () {
      daten = W.speicher.laden();
      stammUebernehmen();
      location.hash = '#/uebersicht';
      zeichnen();
      console.log('Wertakte zurückgesetzt.');
    });
  };
})();
