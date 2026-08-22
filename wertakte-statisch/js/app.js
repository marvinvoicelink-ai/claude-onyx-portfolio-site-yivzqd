/* Router, Geruest und Ereignisse. */
(function () {
  var h = W.f.h, sym = W.sym, H = W.hilfen;
  var wurzel = document.getElementById('wurzel');
  var daten = null;
  var angemeldet = false;
  var offenesFoto = null;

  var PUNKTE = [
    { pfad: 'uebersicht', text: 'Übersicht', symbol: sym.uebersicht },
    { pfad: 'objekte', text: 'Objekte', symbol: sym.objekte },
    { pfad: 'auftraggeber', text: 'Auftraggeber', symbol: sym.auftraggeber }
  ];

  /* --- Adresse lesen ---------------------------------------------------- */

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

  function neueId(praefix) {
    return praefix + '_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  }

  function naechstesAktenzeichen() {
    var jahr = new Date().getFullYear();
    var praefix = 'GA-' + jahr + '-';
    var zahlen = daten.objekte
      .filter(function (o) { return o.aktenzeichen.indexOf(praefix) === 0; })
      .map(function (o) { return parseInt(o.aktenzeichen.slice(praefix.length), 10); })
      .filter(function (n) { return !isNaN(n); });
    var n = (zahlen.length ? Math.max.apply(null, zahlen) : 0) + 1;
    return praefix + String(n).padStart(3, '0');
  }

  /* --- Fotoadressen vorbereiten ------------------------------------------ */

  function eigeneFotoIds() {
    return daten.fotos.filter(function (f) { return f.quelle.indexOf('idb:') === 0; })
      .map(function (f) { return f.quelle.slice(4); });
  }

  /* --- Geruest ----------------------------------------------------------- */

  function rail(aktiv) {
    return PUNKTE.map(function (p) {
      var an = p.pfad === aktiv;
      return '<a class="onyx-rail-punkt" href="#/' + p.pfad + '" title="' + h(p.text) + '" aria-label="' + h(p.text) + '"' +
        (an ? ' aria-current="page"' : '') + '>' + p.symbol(21) + '</a>';
    }).join('');
  }

  function fussNav(aktiv) {
    return '<nav class="fuss-nav kein-druck" aria-label="Hauptbereiche">' + PUNKTE.map(function (p) {
      var an = p.pfad === aktiv;
      return '<a href="#/' + p.pfad + '"' + (an ? ' aria-current="page"' : '') + '>' + p.symbol(21) + h(p.text) + '</a>';
    }).join('') + '</nav>';
  }

  function geruest(inhalt, aktiv, suche) {
    var ueber = daten.objekte.filter(function (o) {
      if (o.status === 'abgeschlossen') return false;
      var t = W.f.tageBis(o.frist);
      return t !== null && t < 0;
    }).length;

    return '<div class="huelle"><div class="onyx-rahmen fenster">' +
      '<aside class="onyx-rail rail-huelle kein-druck"><div class="rail-inhalt">' +
        '<a class="marke-w" href="#/uebersicht" aria-label="Wertakte, zur Übersicht">W</a>' +
        '<nav aria-label="Hauptbereiche" style="display:flex;flex-direction:column;gap:.5rem">' + rail(aktiv) + '</nav>' +
      '</div></aside>' +
      '<div class="strang">' +
        '<header class="kopf kein-druck">' +
          '<a class="wortmarke" href="#/uebersicht" style="flex:none">Wertakte</a>' +
          '<div class="kopf-suche"><div>' + sym.suche(15) +
            '<label class="nur-sr" for="kopfsuche">Nach Aktenzeichen, Adresse oder Auftraggeber suchen</label>' +
            '<input class="onyx-feld onyx-suche" id="kopfsuche" type="search" placeholder="Suchen …" value="' + h(suche || '') + '" style="padding-top:.45rem;padding-bottom:.45rem;font-size:.875rem">' +
          '</div></div>' +
          '<div class="kopf-werkzeuge">' +
            '<a class="rund-knopf" href="#/uebersicht" aria-label="' + (ueber ? ueber + ' Akten mit überschrittener Frist' : 'Keine überschrittene Frist') + '">' +
              sym.glocke(19) + (ueber ? '<span class="zaehler mono">' + ueber + '</span>' : '') + '</a>' +
            '<span class="nutzer-name">' + h(W.KONTO.name) + '</span>' +
            '<span class="kuerzel" aria-hidden="true">' + h(W.f.kuerzel(W.KONTO.name)) + '</span>' +
            '<button class="rund-knopf" id="knopf-abmelden" aria-label="Abmelden">' + sym.abmelden(18) + '</button>' +
          '</div>' +
        '</header>' +
        '<main class="inhalt">' + inhalt + '</main>' +
      '</div></div>' + fussNav(aktiv) + '</div>';
  }

  /* --- Zeichnen ----------------------------------------------------------- */

  function zeichnen() {
    if (!angemeldet) {
      wurzel.innerHTML = W.seiten.anmelden(daten);
      verdrahteAnmeldung();
      return;
    }
    var r = route();
    var bereich = r.pfad[0] || 'uebersicht';

    // Adressen der selbst aufgenommenen Fotos zuerst aufloesen, sonst bleiben
    // die Bilder beim ersten Zeichnen leer.
    W.speicher.fotoUrls(eigeneFotoIds()).then(function (bilder) {
      var inhalt, aktiv = bereich, suche = '';

      if (bereich === 'objekte') {
        suche = r.q.suche || '';
        inhalt = W.seiten.objekte(daten, r.q, bilder);
      } else if (bereich === 'objekt' && r.pfad[2] === 'entwurf') {
        inhalt = W.seiten.entwurf(daten, r.pfad[1], bilder);
        aktiv = 'objekte';
      } else if (bereich === 'objekt') {
        inhalt = W.seiten.objekt(daten, r.pfad[1], bilder);
        aktiv = 'objekte';
      } else if (bereich === 'neu') {
        inhalt = W.seiten.neu(daten, naechstesAktenzeichen());
        aktiv = 'objekte';
      } else if (bereich === 'auftraggeber' && r.pfad[1]) {
        inhalt = W.seiten.auftraggeberDetail(daten, r.pfad[1]);
      } else if (bereich === 'auftraggeber') {
        inhalt = W.seiten.auftraggeber(daten);
      } else if (bereich === 'uebersicht') {
        inhalt = W.seiten.uebersicht(daten);
      } else {
        inhalt = W.seiten.nichtGefunden();
        aktiv = '';
      }

      var warnung = W.speicher.warnung();
      if (warnung) {
        inhalt = '<p class="hinweis" style="margin-top:1.25rem;border-color:rgb(217 97 76 / .35);background:var(--onyx-warn-flaeche)">' +
          '<span class="warn" style="flex:none">' + sym.warnung(17) + '</span><span>' + h(warnung) + '</span></p>' + inhalt;
      }

      wurzel.innerHTML = geruest(inhalt, aktiv, suche);
      if (offenesFoto) {
        var f = daten.fotos.filter(function (x) { return x.id === offenesFoto; })[0];
        if (f) {
          wurzel.insertAdjacentHTML('beforeend', W.seiten.fotoDialog(f, bilder));
          verdrahteDialog(f);
        } else { offenesFoto = null; }
      }
      verdrahteSeite(r);
    });
  }

  /* --- Ereignisse ---------------------------------------------------------- */

  function verdrahteAnmeldung() {
    var form = document.getElementById('anmelde-formular');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var mail = form.email.value.trim().toLowerCase();
      var pw = form.passwort.value;
      if (mail !== W.KONTO.email || pw !== W.KONTO.passwort) {
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
          location.hash = '#/objekte' + (wert ? '?suche=' + encodeURIComponent(wert) : '');
          // Nach dem Neuzeichnen den Schreibfluss nicht unterbrechen.
          setTimeout(function () {
            var neu = document.getElementById('kopfsuche');
            if (neu) { neu.focus(); neu.setSelectionRange(neu.value.length, neu.value.length); }
          }, 0);
        }, 250);
      });
    }

    Array.prototype.forEach.call(document.querySelectorAll('[data-filter]'), function (sel) {
      sel.addEventListener('change', function () {
        var q = Object.assign({}, route().q);
        q[sel.getAttribute('data-filter')] = sel.value;
        var teile = Object.keys(q).filter(function (k) { return q[k]; })
          .map(function (k) { return k + '=' + encodeURIComponent(q[k]); });
        location.hash = '#/objekte' + (teile.length ? '?' + teile.join('&') : '');
      });
    });

    if (r.pfad[0] === 'objekt' && r.pfad[1] && r.pfad[2] !== 'entwurf') verdrahteAkte(r.pfad[1]);
    if (r.pfad[0] === 'objekt' && r.pfad[2] === 'entwurf') {
      var drucken = document.getElementById('knopf-drucken');
      if (drucken) drucken.addEventListener('click', function () { window.print(); });
    }
    if (r.pfad[0] === 'neu') verdrahteNeu();
    if (r.pfad[0] === 'auftraggeber' && r.pfad[1]) verdrahteAgNotiz(r.pfad[1]);
  }

  function verdrahteAkte(id) {
    var o = H.obj(daten, id);
    if (!o) return;

    Array.prototype.forEach.call(document.querySelectorAll('[data-status]'), function (k) {
      k.addEventListener('click', function () {
        o.status = k.getAttribute('data-status');
        sichern();
        zeichnen();
      });
    });

    var notiz = document.getElementById('notiz-formular');
    if (notiz) notiz.addEventListener('submit', function (e) {
      e.preventDefault();
      o.notizen = notiz.notizen.value;
      sichern();
      melde(notiz, 'Notizen gespeichert.');
    });

    var kamera = document.getElementById('eingabe-kamera');
    var upload = document.getElementById('eingabe-upload');
    var kKnopf = document.getElementById('knopf-kamera');
    var uKnopf = document.getElementById('knopf-upload');
    if (kKnopf) kKnopf.addEventListener('click', function () { kamera.click(); });
    if (uKnopf) uKnopf.addEventListener('click', function () { upload.click(); });
    if (kamera) kamera.addEventListener('change', function () { uebernehmen(o, kamera.files); });
    if (upload) upload.addEventListener('change', function () { uebernehmen(o, upload.files); });

    Array.prototype.forEach.call(document.querySelectorAll('[data-foto]'), function (k) {
      k.addEventListener('click', function () {
        offenesFoto = k.getAttribute('data-foto');
        zeichnen();
      });
    });
  }

  /** Ausgewaehlte Bilder in die Akte uebernehmen. */
  function uebernehmen(o, dateien) {
    if (!dateien || !dateien.length) return;
    var kategorieFeld = document.getElementById('neue-kategorie');
    var kategorie = kategorieFeld ? kategorieFeld.value : 'Außenansicht';
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
          id: neueId('foto'),
          objektId: o.id,
          quelle: 'idb:' + id,
          beschriftung: '',
          kategorie: kategorie,
          aufgenommenAm: new Date(datei.lastModified || Date.now()).toISOString().slice(0, 16)
        };
      });
    })).then(function (neue) {
      daten.fotos = daten.fotos.concat(neue);
      sichern();
      zeichnen();
    }).catch(function () {
      alert('Die Fotos konnten nicht gespeichert werden. Bitte den privaten Modus des Browsers verlassen.');
      zeichnen();
    });
  }

  function verdrahteDialog(foto) {
    function zu() { offenesFoto = null; zeichnen(); }
    document.getElementById('dialog-zu').addEventListener('click', zu);
    var schleier = document.getElementById('foto-schleier');
    schleier.addEventListener('click', function (e) { if (e.target === schleier) zu(); });
    document.addEventListener('keydown', function esc(e) {
      if (e.key === 'Escape') { document.removeEventListener('keydown', esc); zu(); }
    });

    var form = document.getElementById('foto-formular');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      foto.beschriftung = form.beschriftung.value.trim();
      foto.kategorie = form.kategorie.value;
      sichern();
      zu();
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
      sichern();
      zu();
    });
  }

  function verdrahteNeu() {
    var form = document.getElementById('neu-formular');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var fehler = document.getElementById('neu-fehler');
      function meckern(text) { fehler.textContent = text; fehler.style.display = 'block'; }

      var strasse = form.strasse.value.trim();
      var ort = form.ort.value.trim();
      var agId = form.auftraggeberId.value;
      if (!strasse) return meckern('Bitte die Straße und Hausnummer angeben.');
      if (!ort) return meckern('Bitte den Ort angeben.');
      if (!agId) return meckern('Bitte einen Auftraggeber auswählen.');

      var id = neueId('obj');
      daten.objekte.push({
        id: id,
        aktenzeichen: naechstesAktenzeichen(),
        strasse: strasse,
        plz: form.plz.value.trim(),
        ort: ort,
        objekttyp: form.objekttyp.value,
        auftraggeberId: agId,
        bewertungsanlass: form.bewertungsanlass.value,
        status: form.status.value,
        ortstermin: form.ortstermin.value || null,
        frist: form.frist.value || null,
        stichtag: form.stichtag.value || null,
        baujahr: form.baujahr.value.trim(),
        wohnflaeche: form.wohnflaeche.value.trim(),
        grundstuecksflaeche: form.grundstuecksflaeche.value.trim(),
        notizen: form.notizen.value.trim(),
        angelegtAm: new Date().toISOString().slice(0, 10)
      });
      sichern();
      location.hash = '#/objekt/' + id;
    });
  }

  function verdrahteAgNotiz(id) {
    var a = H.ag(daten, id);
    var form = document.getElementById('ag-notiz-formular');
    if (!a || !form) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      a.notizen = form.notizen.value;
      sichern();
      melde(form, 'Notizen gespeichert.');
    });
  }

  /** Kurze Rueckmeldung unter einem Formular. */
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

  /* --- Start --------------------------------------------------------------- */

  daten = W.speicher.laden();
  try { angemeldet = sessionStorage.getItem('wertakte.angemeldet') === '1'; } catch (e) { angemeldet = false; }
  window.addEventListener('hashchange', zeichnen);
  zeichnen();

  /* Fuer die Vorfuehrung: in der Browser-Konsole "wertakteZuruecksetzen()"
     stellt den Auslieferungsstand wieder her. */
  window.wertakteZuruecksetzen = function () {
    W.speicher.zuruecksetzen().then(function () {
      daten = W.speicher.laden();
      location.hash = '#/uebersicht';
      zeichnen();
      console.log('Wertakte zurückgesetzt.');
    });
  };
})();
