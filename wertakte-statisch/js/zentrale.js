/* Alles an einer Stelle: verfassen, suchen, protokollieren, drucken.
   Diese Seiten gehoeren nicht zu einer einzelnen Objektakte, sondern
   halten das System zusammen: jede Nachricht wird hier verfasst, jede
   Aenderung landet im Protokoll, und die ganze Akte laesst sich als ein
   Stueck ausdrucken. */
window.W = window.W || {};
(function () {
  var h = W.f.h, b = W.b, sym = W.sym, H = W.hilfen, opt = W.opt;

  /* --- Kanaele ------------------------------------------------------------ */

  /* Je Kanal aendern sich Beschriftungen und Zusatzfelder. Der Ablauf bleibt
     gleich: verfassen, absenden, revisionssicher ablegen. */
  W.KANAL = {
    'E-Mail': {
      betreff: 'Betreff', text: 'Nachricht', anhaenge: true, outlook: true, adresse: 'email',
      knopf: 'Senden und ablegen',
      hinweis: 'Geht raus und wird parallel in Outlook abgelegt, damit sie in MailStore auffindbar bleibt.'
    },
    'Telefon': {
      betreff: 'Anlass des Gesprächs', text: 'Gesprächsnotiz', dauer: true, adresse: 'telefon',
      knopf: 'Telefonat registrieren',
      hinweis: 'Jedes geführte Telefonat wird mit Dauer, Notiz und Beleg-Nummer registriert.'
    },
    'WhatsApp': {
      betreff: 'Betreff für die Akte', text: 'Nachricht', adresse: 'telefon',
      knopf: 'Senden und ablegen',
      hinweis: 'Die WhatsApp-Nachricht wird mitgeschrieben und liegt als Beleg in der Akte.'
    },
    'SMS': {
      betreff: 'Betreff für die Akte', text: 'Nachricht', adresse: 'telefon',
      knopf: 'Senden und ablegen',
      hinweis: 'Die SMS wird mitgeschrieben und liegt als Beleg in der Akte.'
    },
    'Brief': {
      betreff: 'Betreff', text: 'Brieftext', anhaenge: true, versand: true, adresse: 'anschrift',
      knopf: 'Brief erzeugen und ablegen',
      hinweis: 'Der Brief wird erzeugt, abgelegt und kann anschließend ausgedruckt werden.'
    },
    'Notiz': {
      betreff: 'Überschrift', text: 'Notiz', ohneRichtung: true,
      knopf: 'Notiz ablegen',
      hinweis: 'Interne Notiz zur Akte, ohne Empfänger.'
    }
  };

  W.VERSANDARTEN = ['Standardbrief', 'Einschreiben', 'Einschreiben mit Rückschein', 'Bote'];

  /** Standardanlagen plus die zum Objekt vorhandenen Unterlagen. */
  function anlagenAngebot(d, o) {
    if (!o) return [];
    var feste = ['Exposé ' + o.aktenzeichen + '.pdf', 'Widerrufsbelehrung.pdf', 'Provisionsvereinbarung.pdf'];
    var eigene = H.unterlagenZu(d, o.id).filter(function (u) { return u.status === 'vorhanden'; })
      .map(function (u) { return u.bezeichnung + '.pdf'; });
    return feste.concat(eigene);
  }

  /** Knopfreihe, mit der ein Vorgang auf dem jeweiligen Weg begonnen wird. */
  W.verfassenKnoepfe = function (objektId, kontaktId, richtung) {
    return Object.keys(W.KANAL).map(function (art) {
      var e = { art: art, objektId: objektId || '', kontaktId: kontaktId || '', richtung: richtung || 'aus' };
      return '<button type="button" class="kanal" data-verfassen="' + h(JSON.stringify(e)) + '">' +
        b.kommSymbol(art, 'aus', 14) + h(art) + '</button>';
    }).join('');
  };

  /* --- Nachricht verfassen -------------------------------------------------- */

  W.seiten.verfassen = function (d, e) {
    var k = W.KANAL[e.art] || W.KANAL['E-Mail'];
    var o = e.objektId ? H.obj(d, e.objektId) : null;
    var g = e.kontaktId ? H.kontakt(d, e.kontaktId) : null;
    var raus = e.richtung !== 'ein';

    var kanalleiste = Object.keys(W.KANAL).map(function (art) {
      return '<button type="button" class="kanal' + (art === e.art ? ' ist-an' : '') + '" data-kanal="' + h(art) + '">' +
        b.kommSymbol(art, 'aus', 14) + h(art) + '</button>';
    }).join('');

    var kontakte = d.kontakte.slice().sort(function (a, c) { return a.name.localeCompare(c.name); });
    var anlagen = k.anhaenge ? anlagenAngebot(d, o) : [];

    /* Compliance greift auch hier: an einen Erstkunden ohne Adressvalidierung
       geht kein Expose raus, egal ueber welchen Weg. */
    var sperre = null;
    if (g && g.adressvalidierung && g.adressvalidierung.status === 'offen') {
      sperre = 'Bei ' + g.name + ' steht die Adressvalidierung noch aus. Exposé und Vertragsunterlagen bleiben gesperrt, ' +
        'eine normale Nachricht kannst du senden.';
    }
    function gesperrt(name) { return Boolean(sperre) && /Exposé|Provisionsvereinbarung/.test(name); }

    return '<div class="schleier" id="verfassen-schleier" role="dialog" aria-modal="true" aria-label="Nachricht verfassen">' +
      '<div class="onyx-rahmen dialog dialog-breit">' +
        '<div class="dialog-kopf">' +
          '<p class="mono amber" style="font-size:.69rem;text-transform:uppercase;letter-spacing:.14em">Neuer Vorgang</p>' +
          '<button id="dialog-zu" class="klein" style="display:flex;align-items:center;gap:.4rem;padding:.25rem">Schließen' + sym.schliessen(15) + '</button>' +
        '</div>' +
        '<div class="dialog-koerper">' +
          '<div class="kanalleiste" role="group" aria-label="Weg auswählen">' + kanalleiste + '</div>' +
          '<form id="verfassen-formular" style="display:grid;gap:.85rem;margin-top:1rem">' +
            '<div style="display:flex;flex-wrap:wrap;gap:.6rem">' +
              '<div class="feld-gruppe" style="min-width:15rem;flex:1"><label class="onyx-etikett" for="verf-objekt">Objekt</label>' +
                '<select class="onyx-feld" id="verf-objekt" name="objektId">' +
                  opt(H.alle(d).map(function (x) { return { wert: x.id, text: x.aktenzeichen + ' · ' + x.bezeichnung }; }), e.objektId || '', 'Kein Objekt') +
                '</select></div>' +
              (k.ohneRichtung ? '' :
                '<div class="feld-gruppe" style="min-width:15rem;flex:1"><label class="onyx-etikett" for="verf-kontakt">Gegenüber</label>' +
                  '<select class="onyx-feld" id="verf-kontakt" name="kontaktId">' +
                    opt(kontakte.map(function (x) { return { wert: x.id, text: x.name + ' · ' + x.rolle }; }), e.kontaktId || '', 'Kein Gegenüber') +
                  '</select>' +
                  (g ? '<p class="mini leise mono" style="margin-top:.3rem">' +
                    h(k.adresse === 'telefon' ? g.telefon : (k.adresse === 'anschrift' ? g.anschrift : g.email)) + '</p>' : '') +
                '</div>') +
              (k.ohneRichtung ? '' :
                '<div class="feld-gruppe" style="min-width:9rem"><label class="onyx-etikett" for="verf-richtung">Richtung</label>' +
                  '<select class="onyx-feld" id="verf-richtung" name="richtung">' +
                    opt([{ wert: 'aus', text: 'ausgehend' }, { wert: 'ein', text: 'eingehend' }], raus ? 'aus' : 'ein') + '</select></div>') +
              (k.dauer ? '<div class="feld-gruppe" style="min-width:7rem"><label class="onyx-etikett" for="verf-dauer">Dauer (Min.)</label>' +
                '<input class="onyx-feld" id="verf-dauer" name="dauer" type="number" min="0" step="1" value="' + h(e.dauer || '') + '" placeholder="8"></div>' : '') +
              (k.versand ? '<div class="feld-gruppe" style="min-width:12rem"><label class="onyx-etikett" for="verf-versand">Versandart</label>' +
                '<select class="onyx-feld" id="verf-versand" name="versand">' + opt(W.VERSANDARTEN, e.versand || 'Standardbrief') + '</select></div>' : '') +
            '</div>' +
            '<div class="feld-gruppe"><label class="onyx-etikett" for="verf-betreff">' + h(k.betreff) + '</label>' +
              '<input class="onyx-feld" id="verf-betreff" name="betreff" value="' + h(e.betreff || '') + '" placeholder="' +
                h(o ? 'z. B. Rückfrage ' + o.bezeichnung : 'Worum geht es?') + '"></div>' +
            '<div class="feld-gruppe"><label class="onyx-etikett" for="verf-inhalt">' + h(k.text) + '</label>' +
              '<textarea class="onyx-feld" id="verf-inhalt" name="inhalt" rows="6" placeholder="' +
                h(k.dauer ? 'Was wurde besprochen, was ist vereinbart?' : 'Text der Nachricht') + '">' + h(e.inhalt || '') + '</textarea></div>' +
            (sperre ? '<p class="hinweis" style="border-color:rgb(217 97 76 / .35);background:var(--onyx-warn-flaeche)">' +
              '<span class="warn" style="flex:none">' + sym.warnung(16) + '</span><span class="klein">' + h(sperre) + '</span></p>' : '') +
            (anlagen.length ? '<div class="feld-gruppe"><span class="onyx-etikett">Anlagen aus der Akte</span>' +
              '<ul class="anlagenwahl">' + anlagen.map(function (name, i) {
                var an = (e.anhaenge || []).indexOf(name) >= 0;
                var aus = gesperrt(name);
                return '<li><label class="' + (aus ? 'ist-aus' : '') + '">' +
                  '<input type="checkbox" name="anhang" value="' + h(name) + '"' + (an && !aus ? ' checked' : '') + (aus ? ' disabled' : '') + '>' +
                  sym.dokument(13) + '<span>' + h(name) + '</span>' + (aus ? '<span class="mini warn">gesperrt</span>' : '') +
                  '</label></li>';
              }).join('') + '</ul></div>' : '') +
            '<div class="feld-gruppe wiedervorlage-block">' +
              '<label class="ankreuz"><input type="checkbox" id="verf-wv" name="wiedervorlage"' + (e.wiedervorlage ? ' checked' : '') + '>' +
                '<span>Wiedervorlage dazu anlegen</span></label>' +
              '<div style="display:flex;flex-wrap:wrap;gap:.6rem;margin-top:.5rem">' +
                '<div class="feld-gruppe" style="min-width:9rem"><label class="onyx-etikett" for="verf-wv-frist">Fällig in Tagen</label>' +
                  '<input class="onyx-feld" id="verf-wv-frist" name="frist" type="number" min="1" step="1" value="' + h(e.frist || '7') + '"></div>' +
                '<div class="feld-gruppe" style="min-width:14rem;flex:1"><label class="onyx-etikett" for="verf-wv-titel">Was ist zu tun</label>' +
                  '<input class="onyx-feld" id="verf-wv-titel" name="wvTitel" value="' + h(e.wvTitel || '') + '" placeholder="z. B. nachhaken, wenn keine Antwort"></div>' +
              '</div>' +
            '</div>' +
            '<p class="mini leise" style="line-height:1.7">' + h(k.hinweis) +
              ' Beleg-Nummer und Zeitstempel setzt das System, danach ist der Eintrag nicht mehr änderbar.</p>' +
            '<div style="display:flex;flex-wrap:wrap;gap:.6rem;align-items:center;padding-top:.25rem">' +
              '<button class="onyx-knopf onyx-knopf-primaer" type="submit">' + b.kommSymbol(e.art, 'aus', 16) + h(k.knopf) + '</button>' +
              '<button class="onyx-knopf onyx-knopf-klar" type="button" id="verfassen-ab">Abbrechen</button>' +
            '</div>' +
          '</form>' +
        '</div>' +
      '</div></div>';
  };

  /* --- Ordner ------------------------------------------------------------------ */

  /* Jede Section hat Ordner. Sie filtern die Liste darunter, der Stand steht in
     der Adresszeile und ist damit verlinkbar. */
  W.ordnerreihe = function (ordner, aktiv, adresse) {
    return '<nav class="ordner" aria-label="Ordner">' + ordner.map(function (o) {
      var an = String(o.wert || '') === String(aktiv || '');
      return '<a class="ordner-blatt' + (an ? ' ist-an' : '') + '" href="' + h(adresse(o.wert)) + '"' +
        (an ? ' aria-current="true"' : '') + '>' +
        sym.ordner(15) + '<span class="ordner-name">' + h(o.text) + '</span>' +
        '<span class="mono ordner-zahl">' + o.zahl + '</span></a>';
    }).join('') + '</nav>';
  };

  /** Zaehlt, wie viele Eintraege in jeden Ordner fallen. */
  W.ordnerZaehlen = function (liste, namen, zuordnen) {
    var zaehler = {};
    liste.forEach(function (x) {
      var k = zuordnen(x);
      (Array.isArray(k) ? k : [k]).forEach(function (n) { zaehler[n] = (zaehler[n] || 0) + 1; });
    });
    return [{ wert: '', text: 'Alle', zahl: liste.length }].concat(namen.map(function (n) {
      return { wert: n, text: n, zahl: zaehler[n] || 0 };
    }));
  };

  /* --- Anrede und Briefgeruest ------------------------------------------------- */

  /* Die Anrede steht als Feld beim Kontakt, sie wird nicht aus dem Namen
     geraten. Fehlt sie, bleibt es bei der allgemeinen Form. */
  W.anrede = function (k) {
    if (!k || !k.anrede) return 'Sehr geehrte Damen und Herren';
    if (/^Herr\b/.test(k.anrede)) return 'Sehr geehrter ' + k.anrede;
    if (/^Frau\b/.test(k.anrede)) return 'Sehr geehrte ' + k.anrede;
    return 'Guten Tag ' + k.anrede;
  };

  /** Leeres Schreiben mit Anrede und Grußformel, damit nichts abgetippt wird. */
  W.briefgeruest = function (k) {
    return W.anrede(k) + ',\n\n\n\nMit freundlichen Grüßen\n' + W.KONTO.name + '\n' + W.KONTO.buero;
  };

  /* --- Eskalation ------------------------------------------------------------- */

  /* Die Abstaende stehen in der Regel des Termins („Stufe 2 nach 3 Tagen
     Anruf“). Steht dort keine Zahl, gelten drei und sieben Tage. */
  W.STUFENABSTAND = [0, 3, 7];

  function abstaende(regel) {
    var treffer = String(regel || '').match(/nach\s+(\d+)\s+Tag/g) || [];
    var zahlen = treffer.map(function (x) { return parseInt(x.replace(/\D/g, ''), 10); });
    return [0, zahlen[0] || W.STUFENABSTAND[1], zahlen[1] || W.STUFENABSTAND[2]];
  }

  /* Aus der Regel wird ein Plan mit drei Stufen: was zu tun ist, ab wann,
     und welche Stufe gerade dran ist. */
  var STUFEN_VORGABE = ['E-Mail schreiben', 'Anrufen', 'Eigentümer informieren'];

  function stufenTexte(regel) {
    var teile = String(regel || '').split('·');
    var texte = [];
    teile.forEach(function (teil) {
      var t = teil.replace(/Stufe\s*\d+/i, '').replace(/nach\s+\d+\s+Tag(en)?/i, '').trim();
      if (t) texte.push(t.charAt(0).toUpperCase() + t.slice(1));
    });
    return [texte[0] || STUFEN_VORGABE[0], texte[1] || STUFEN_VORGABE[1], texte[2] || STUFEN_VORGABE[2]];
  }

  /** Welcher Weg gehört zu dieser Stufe? Steuert den Knopf „Jetzt …“. */
  W.stufenWeg = function (text) {
    var t = String(text || '').toLowerCase();
    if (/anruf|anrufen|telefon/.test(t)) return 'Telefon';
    if (/whatsapp/.test(t)) return 'WhatsApp';
    if (/sms/.test(t)) return 'SMS';
    if (/brief|mahnung|schriftlich|einschreiben/.test(t)) return 'Brief';
    return 'E-Mail';
  };

  W.stufenPlan = function (t) {
    var texte = stufenTexte(t.regel);
    var ab = abstaende(t.regel);
    return [1, 2, 3].map(function (nr) {
      var d2 = new Date(t.faellig + 'T00:00');
      d2.setDate(d2.getDate() + ab[nr - 1]);
      var iso = d2.toISOString().slice(0, 10);
      return {
        nr: nr, text: texte[nr - 1], datum: iso,
        dran: nr === t.stufe,
        erledigt: nr < t.stufe,
        faellig: W.f.tageBis(iso) !== null && W.f.tageBis(iso) <= 0
      };
    });
  };

  W.naechsteStufe = function (t) {
    if (t.stufe >= 3) {
      return 'Letzte Stufe erreicht, Eigentümer informieren';
    }
    var tage = abstaende(t.regel)[t.stufe];
    var d2 = new Date(t.faellig + 'T00:00');
    d2.setDate(d2.getDate() + tage);
    var iso = d2.toISOString().slice(0, 10);
    var offen = W.f.tageBis(iso);
    var text = 'Stufe ' + (t.stufe + 1) + ' ab ' + W.f.datum(iso);
    if (offen !== null && offen < 0) return text + ' · überfällig';
    if (offen === 0) return text + ' · heute';
    return text;
  };

  /* --- Beleg: Adressen und Nachweis ------------------------------------------ */

  /** Wer mit wem, je nach Weg mit E-Mail-Adresse, Rufnummer oder Anschrift. */
  W.belegAdressen = function (d, v) {
    var K = W.KONTO, k = v.kontaktId ? H.kontakt(d, v.kontaktId) : null;
    var ich, gegen, vonEtikett = 'Von', anEtikett = 'An';

    if (v.art === 'E-Mail') {
      ich = K.name + ' <' + K.emailBuero + '>';
      gegen = k ? k.ansprechpartner + ' <' + k.email + '>' : 'nicht zugeordnet';
    } else if (v.art === 'Telefon') {
      ich = K.name + ', ' + K.telefon;
      gegen = k ? k.ansprechpartner + ' (' + k.name + '), ' + k.telefon : 'unbekannte Nummer';
      vonEtikett = 'Anrufer'; anEtikett = 'Gesprächspartner';
    } else if (v.art === 'WhatsApp' || v.art === 'SMS') {
      ich = K.name + ', ' + K.mobil;
      gegen = k ? k.ansprechpartner + ', ' + k.telefon : 'unbekannte Nummer';
      vonEtikett = 'Absender'; anEtikett = 'Empfänger';
    } else if (v.art === 'Brief') {
      ich = K.buero + ', ' + K.strasse + ', ' + K.ort;
      gegen = k ? k.name + ', ' + k.anschrift : 'ohne Empfänger';
      vonEtikett = 'Absender'; anEtikett = 'Empfänger';
    } else {
      ich = K.name + ', ' + K.buero;
      gegen = k ? k.name : 'interne Notiz, kein Empfänger';
      vonEtikett = 'Verfasst von'; anEtikett = 'Betrifft';
    }

    var aus = v.richtung !== 'ein';
    return {
      von: aus ? ich : gegen, an: aus ? gegen : ich,
      kopie: v.art === 'E-Mail' ? K.archivEmail + ' (Outlook-Ablage, in MailStore auffindbar)' : null,
      vonEtikett: vonEtikett, anEtikett: anEtikett
    };
  };

  /** Wert, der sich aendert, sobald am Inhalt etwas geaendert wuerde. */
  W.belegPruefsumme = function (v) {
    return W.f.pruefsumme([v.belegNr, v.zeitpunkt, v.art, v.richtung, v.betreff, v.inhalt,
      (v.anhaenge || []).join(',')].join('|'));
  };

  /** Der Streifen unter jedem Beleg: so liegt er in der Ablage. */
  W.belegNachweis = function (v, hell) {
    return '<div class="beleg-nachweis' + (hell ? ' ist-hell' : '') + '">' +
      '<p><span class="onyx-etikett">Beleg-Nr.</span><span class="mono">' + h(v.belegNr) + '</span></p>' +
      '<p><span class="onyx-etikett">Abgelegt</span><span class="mono">' + h(W.f.datumZeit(v.zeitpunkt)) + '</span></p>' +
      '<p><span class="onyx-etikett">Prüfsumme</span><span class="mono">' + h(W.belegPruefsumme(v)) + '</span></p>' +
      '<p><span class="onyx-etikett">Ablage</span><span>' +
        (v.festgeschrieben ? 'festgeschrieben, nicht mehr änderbar' : 'Entwurf') +
        (v.outlook ? ' · in Outlook gespiegelt' : '') + '</span></p>' +
      '</div>';
  };

  /** Ein einzelner Beleg auf Briefpapier, zum Ausdrucken oder als PDF. */
  W.seiten.vorgangBlatt = function (d, id) {
    var v = d.vorgaenge.filter(function (x) { return x.id === id; })[0];
    if (!v) return W.seiten.nichtGefunden();
    var K = W.KONTO, o = H.obj(d, v.objektId), a = W.belegAdressen(d, v);
    var heute = new Date().toISOString().slice(0, 10);

    function zeile(etikett, wert) {
      if (!wert) return '';
      return '<div><dt>' + h(etikett) + '</dt><dd>' + h(wert) + '</dd></div>';
    }

    return '<div class="kein-druck" style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:1rem;padding:1.5rem 0;border-bottom:1px solid var(--onyx-kontur-leise)">' +
        '<div>' +
          (o ? '<a class="zurueck" style="padding-top:0" href="#/objekt/' + h(o.id) + '?reiter=kommunikation">' +
            sym.pfeilLinks(14) + 'Zurück zur Akte ' + h(o.aktenzeichen) + '</a>'
             : '<a class="zurueck" style="padding-top:0" href="#/kommunikation">' + sym.pfeilLinks(14) + 'Zurück zur Kommunikation</a>') +
          '<h1 style="margin-top:.5rem">' + h(v.art) + ' ' + h(b.richtungText(v.richtung)) + '</h1>' +
          '<p class="mini leise" style="margin-top:.25rem;max-width:70ch;line-height:1.7">' +
            'Beleg ' + h(v.belegNr) + ', so wie er zu den Akten geht. Kein Papier im Alltag, ' +
            'aber jede Mail und jedes Telefonat einzeln auf Papier.</p>' +
        '</div>' +
        '<button class="onyx-knopf onyx-knopf-primaer" id="knopf-drucken">' + sym.drucken(17) + 'Drucken oder als PDF sichern</button>' +
      '</div>' +
      '<div style="padding:2rem 0;display:flex;justify-content:center"><article class="blatt">' +
        '<header class="blatt-kopf">' +
          '<div><p class="sans" style="font-weight:600;font-size:.9375rem">' + h(K.buero) + '</p>' +
            '<p class="sans" style="font-size:.71875rem;line-height:1.6;color:#5F584E;max-width:38ch">' + h(K.rolle) + '</p></div>' +
          '<div class="sans" style="font-size:.71875rem;line-height:1.6;color:#5F584E">' +
            '<p>' + h(K.strasse) + '</p><p>' + h(K.ort) + '</p><p>' + h(K.telefon) + '</p><p>' + h(K.emailBuero) + '</p></div>' +
        '</header>' +
        '<div style="padding:2rem 0 1.25rem">' +
          '<p class="sans mono" style="font-size:.69rem;text-transform:uppercase;letter-spacing:.24em;color:#6C6459">' +
            h(v.art) + ' ' + h(b.richtungText(v.richtung)) + ' · Beleg ' + h(v.belegNr) + '</p>' +
          '<h2 style="margin-top:.9rem;font-size:1.25rem;line-height:1.3">' + h(v.betreff) + '</h2>' +
        '</div>' +
        '<dl class="blatt-tabelle">' +
          zeile(a.vonEtikett, a.von) +
          zeile(a.anEtikett, a.an) +
          zeile('Kopie', a.kopie) +
          zeile(v.art === 'Telefon' ? 'Zeitpunkt' : 'Gesendet', W.f.datumZeit(v.zeitpunkt)) +
          zeile('Akte', o ? o.aktenzeichen + ' · ' + o.bezeichnung : 'keiner Akte zugeordnet') +
        '</dl>' +
        '<section class="blatt-abschnitt"><h3><span class="nr">1</span>Inhalt</h3>' +
          '<p style="margin-top:.75rem;white-space:pre-line">' + h(v.inhalt || '(ohne Text)') + '</p></section>' +
        ((v.anhaenge && v.anhaenge.length)
          ? '<section class="blatt-abschnitt"><h3><span class="nr">2</span>Anlagen</h3>' +
            '<ul style="margin-top:.6rem;font-size:.78125rem;line-height:1.9">' + v.anhaenge.map(function (x) {
              return '<li>' + h(x) + '</li>';
            }).join('') + '</ul></section>' : '') +
        '<section class="blatt-abschnitt"><h3><span class="nr">' + (v.anhaenge && v.anhaenge.length ? '3' : '2') + '</span>Nachweis der Ablage</h3>' +
          '<dl class="blatt-tabelle" style="margin-top:.6rem">' +
            zeile('Beleg-Nr.', v.belegNr) +
            zeile('Abgelegt am', W.f.datumZeit(v.zeitpunkt)) +
            zeile('Prüfsumme', W.belegPruefsumme(v)) +
            zeile('Zustand', v.festgeschrieben ? 'festgeschrieben, nicht mehr änderbar' : 'Entwurf') +
            zeile('Spiegelung', v.outlook ? 'in Outlook abgelegt, über MailStore auffindbar' : 'keine') +
          '</dl></section>' +
        '<footer class="sans" style="margin-top:3rem;padding-top:1rem;border-top:1px solid #D5CFC2;font-size:.66rem;line-height:1.7;color:#6C6459">' +
          'Beleg ' + h(v.belegNr) + ' aus der Akte ' + h(o ? o.aktenzeichen : '–') + ', gedruckt am ' +
          h(W.f.datumLang(heute)) + ' von ' + h(K.name) + '. Alle Daten dieser Vorführversion sind Beispieldaten.</footer>' +
      '</article></div>';
  };

  /* --- Suche ueber alles ---------------------------------------------------- */

  function passt(text, wort) { return String(text || '').toLowerCase().indexOf(wort) >= 0; }

  W.seiten.suche = function (d, q) {
    var wort = (q.q || '').toLowerCase().trim();
    if (!wort) {
      return '<div class="kopfzeile-seite"><div><h1>Suche</h1>' +
        '<p class="klein leise" style="margin-top:.35rem;max-width:66ch;line-height:1.7">' +
          'Ein Feld für alles: Objekte, Investoren, Unterlagen, Mails, Telefonate, Termine und Fotos.</p></div></div>' +
        b.leer('Gib oben einen Suchbegriff ein.', 'Zum Beispiel ein Aktenzeichen, einen Namen, eine Beleg-Nummer oder ein Stichwort aus einer Mail.');
    }

    var objekte = H.alle(d).filter(function (o) {
      var e = H.kontakt(d, o.eigentuemerId);
      return passt([o.aktenzeichen, o.bezeichnung, o.strasse, o.plz, o.ort, o.objektart, o.notizen, e ? e.name : ''].join(' '), wort);
    });
    var kontakte = d.kontakte.filter(function (k) {
      return passt([k.name, k.ansprechpartner, k.email, k.telefon, k.anschrift, k.rolle, k.typ, k.notizen].join(' '), wort);
    });
    var unterlagen = d.unterlagen.filter(function (u) { return passt(u.bezeichnung + ' ' + u.kategorie + ' ' + u.notiz, wort); });
    var vorgaenge = d.vorgaenge.filter(function (v) {
      return passt([v.betreff, v.inhalt, v.belegNr, v.art, (v.anhaenge || []).join(' ')].join(' '), wort);
    }).sort(function (a, c) { return c.zeitpunkt.localeCompare(a.zeitpunkt); });
    var termine = d.termine.filter(function (t) { return passt(t.titel + ' ' + t.regel + ' ' + t.art, wort); });
    var fotos = d.fotos.filter(function (f) { return passt(f.beschriftung + ' ' + f.kategorie, wort); });

    var gesamt = objekte.length + kontakte.length + unterlagen.length + vorgaenge.length + termine.length + fotos.length;

    function block(titel, eintraege, zeile) {
      if (!eintraege.length) return '';
      return '<section style="margin-top:1.75rem"><div class="abschnitt-kopf"><h2 style="font-size:.9375rem">' + h(titel) + '</h2>' +
        '<p class="klein leise mono">' + eintraege.length + '</p></div>' +
        '<ul class="onyx-register" style="margin-top:.6rem;border-top:1px solid var(--onyx-kontur-leise)">' +
        eintraege.map(zeile).join('') + '</ul></section>';
    }
    function treffer(ziel, symbol, oben, mitte, unten) {
      return '<li class="onyx-zeile" style="border-bottom:1px solid var(--onyx-kontur-leise)">' +
        '<a class="symbolzeile" href="' + h(ziel) + '"><span class="symbolkreis">' + symbol + '</span>' +
        '<span class="wachsen"><span class="mono mini still" style="display:block">' + h(oben) + '</span>' +
        '<span class="kuerzen" style="display:block;font-size:.875rem">' + h(mitte) + '</span>' +
        (unten ? '<span class="kuerzen mini leise" style="display:block">' + h(unten) + '</span>' : '') +
        '</span>' + sym.pfeilRechts(14) + '</a></li>';
    }

    return '<div class="kopfzeile-seite"><div><h1>Suche</h1>' +
        '<p class="klein leise" style="margin-top:.35rem">' + gesamt + ' ' + (gesamt === 1 ? 'Treffer' : 'Treffer') + ' für „' + h(q.q) + '“ über alle Bereiche</p></div>' +
        '<a class="onyx-knopf onyx-knopf-klar" href="#/uebersicht">' + sym.schliessen(14) + 'Suche verlassen</a></div>' +
      (gesamt ? '' : b.leer('Nichts gefunden.', 'Gesucht wird in Objekten, Kontakten, Unterlagen, Vorgängen, Terminen und Bildbeschriftungen.')) +
      block('Objekte', objekte, function (o) {
        return treffer('#/objekt/' + o.id, sym.objekte(15), o.aktenzeichen + ' · ' + o.objektart, o.bezeichnung, o.strasse + ', ' + o.plz + ' ' + o.ort);
      }) +
      block('Kontakte', kontakte, function (k) {
        return treffer('#/kontakt/' + k.id, sym.investor(15), k.rolle, k.name, k.ansprechpartner + ' · ' + k.email);
      }) +
      block('Unterlagen', unterlagen, function (u) {
        var o = H.obj(d, u.objektId);
        return treffer('#/objekt/' + u.objektId + '?reiter=unterlagen', sym.dokument(15),
          (o ? o.aktenzeichen : '') + ' · ' + u.status, u.bezeichnung, o ? o.bezeichnung : '');
      }) +
      block('Vorgänge', vorgaenge, function (v) {
        var o = H.obj(d, v.objektId);
        return treffer('#/objekt/' + v.objektId + '?reiter=kommunikation', b.kommSymbol(v.art, v.richtung, 15),
          'Beleg ' + v.belegNr + ' · ' + W.f.datumZeit(v.zeitpunkt), v.betreff, v.art + ' ' + b.richtungText(v.richtung) + (o ? ' · ' + o.bezeichnung : ''));
      }) +
      block('Termine', termine, function (t) {
        var o = H.obj(d, t.objektId);
        return treffer('#/objekt/' + t.objektId + '?reiter=termine', sym.kalender(15),
          W.f.datum(t.faellig) + ' · Stufe ' + t.stufe, t.titel, o ? o.bezeichnung : '');
      }) +
      block('Fotos', fotos, function (f) {
        var o = H.obj(d, f.objektId);
        return treffer('#/objekt/' + f.objektId + '?reiter=fotos', sym.bild(15),
          f.kategorie + ' · ' + W.f.datum(f.aufgenommenAm), f.beschriftung || 'Foto ohne Beschriftung', o ? o.bezeichnung : '');
      });
  };

  /* --- Protokoll ------------------------------------------------------------- */

  W.PROTOKOLL_ARTEN = ['Akte', 'Unterlage', 'Investor', 'Kommunikation', 'Termin', 'Foto', 'Exposé'];

  W.protokollZeile = function (d, p, mitObjekt) {
    var o = p.objektId ? H.obj(d, p.objektId) : null;
    return '<li class="onyx-zeile protokoll-zeile" style="border-bottom:1px solid var(--onyx-kontur-leise)">' +
      '<span class="mono mini still" style="flex:none;width:8.5rem">' + h(W.f.datumZeit(p.zeitpunkt)) + '</span>' +
      '<span class="onyx-marke onyx-marke-ruht" style="flex:none;font-size:.66rem;padding:.1rem .5rem">' + h(p.art) + '</span>' +
      '<span class="wachsen" style="min-width:12rem">' +
        '<span style="display:block;font-size:.875rem">' + h(p.text) + '</span>' +
        (mitObjekt && o ? '<a class="mini leise" style="display:block" href="#/objekt/' + h(o.id) + '">' + h(o.aktenzeichen + ' · ' + o.bezeichnung) + '</a>' : '') +
      '</span>' +
      '<span class="mini still mono" style="flex:none;text-align:right">' + h(p.nutzer) +
        (p.belegNr ? '<span style="display:block">Beleg ' + h(p.belegNr) + '</span>' : '') + '</span>' +
      '</li>';
  };

  W.seiten.protokoll = function (d, q) {
    var eintraege = (d.protokoll || []).slice().sort(function (a, c) { return c.zeitpunkt.localeCompare(a.zeitpunkt); });
    var gefiltert = eintraege.filter(function (p) {
      if (q.objekt && p.objektId !== q.objekt) return false;
      if (q.art && p.art !== q.art) return false;
      return true;
    });
    var nachObjekt = q.objekt ? eintraege.filter(function (p) { return p.objektId === q.objekt; }) : eintraege;
    return '<div class="kopfzeile-seite"><div><h1>Protokoll</h1>' +
        '<p class="klein leise" style="margin-top:.35rem;max-width:70ch;line-height:1.7">' +
          'Revisionssichere Ablage: jede Mail, jedes Telefonat, jede erhaltene Unterlage, jeder Statuswechsel und jedes Foto ' +
          'wird mit Zeitpunkt und Bearbeiter festgehalten. Einträge lassen sich nicht nachträglich ändern oder löschen.</p></div>' +
        '<p class="klein leise mono">' + gefiltert.length + ' von ' + eintraege.length + '</p></div>' +
      '<div class="werkzeugleiste"><div class="filter">' +
        '<label class="nur-sr" for="p-objekt">Nach Objekt filtern</label>' +
        '<select class="onyx-feld" id="p-objekt" data-pfilter="objekt" style="width:auto;max-width:18rem;padding:.35rem .7rem;font-size:.8125rem">' +
          opt(H.alle(d).map(function (o) { return { wert: o.id, text: o.aktenzeichen + ' · ' + o.bezeichnung }; }), q.objekt || '', 'Alle Objekte') + '</select>' +
        ((q.objekt || q.art) ? '<a class="onyx-knopf onyx-knopf-klar" style="font-size:.8125rem;padding:.42rem .75rem" href="#/protokoll">' +
          sym.schliessen(13) + 'Zurücksetzen</a>' : '') +
        '<span style="flex:1"></span>' +
        '<button class="onyx-knopf onyx-knopf-leise" id="knopf-drucken" style="font-size:.8125rem;padding:.42rem .75rem">' + sym.drucken(14) + 'Drucken</button>' +
      '</div></div>' +
      W.ordnerreihe(W.ordnerZaehlen(nachObjekt, W.PROTOKOLL_ARTEN, function (p) { return p.art; }), q.art || '',
        function (wert) {
          var teile = [];
          if (q.objekt) teile.push('objekt=' + encodeURIComponent(q.objekt));
          if (wert) teile.push('art=' + encodeURIComponent(wert));
          return '#/protokoll' + (teile.length ? '?' + teile.join('&') : '');
        }) +
      (gefiltert.length ? '<ul class="onyx-register" style="margin-top:.9rem;border-top:1px solid var(--onyx-kontur-leise)">' +
        gefiltert.map(function (p) { return W.protokollZeile(d, p, true); }).join('') + '</ul>'
        : b.leer('Kein Eintrag passt zu diesem Filter.'));
  };

  /* --- Ganze Akte als Druckstueck --------------------------------------------- */

  W.seiten.akte = function (d, id, bilder) {
    var o = H.obj(d, id);
    if (!o) return W.seiten.nichtGefunden();
    var K = W.KONTO;
    var e = H.kontakt(d, o.eigentuemerId);
    var heute = new Date().toISOString().slice(0, 10);
    var u = H.unterlagenZu(d, o.id);
    var bt = H.beteiligungenZu(d, o.id);
    var vg = H.vorgaengeZu(d, { objektId: o.id }).slice().reverse();
    var tm = H.termineZu(d, o.id);
    var fotos = H.fotosZu(d, o.id);
    var pr = (d.protokoll || []).filter(function (p) { return p.objektId === o.id; })
      .sort(function (a, c) { return a.zeitpunkt.localeCompare(c.zeitpunkt); });

    function tabelle(zeilen) {
      return '<dl class="blatt-tabelle" style="margin-top:.6rem">' + zeilen.map(function (p) {
        return '<div><dt>' + h(p[0]) + '</dt><dd>' + (p[2] ? p[1] : h(p[1])) + '</dd></div>';
      }).join('') + '</dl>';
    }

    var eck = o.eckdaten.map(function (f) {
      return '<div><dt>' + h(f.etikett) + '</dt><dd>' + (f.offen
        ? '<span style="font-style:italic;color:#6C6459">offen</span>' : h(f.wert)) + '</dd></div>';
    }).join('');

    var unterlagenListe = '<table class="blatt-liste"><thead><tr><th>Unterlage</th><th>Kategorie</th><th>Stand</th><th>Datum</th></tr></thead><tbody>' +
      u.map(function (x) {
        return '<tr><td>' + h(x.bezeichnung) + '</td><td>' + h(x.kategorie) + '</td><td>' + h(x.status) + '</td>' +
          '<td>' + h(x.erhaltenAm ? W.f.datum(x.erhaltenAm) : (x.angefordertAm ? 'angef. ' + W.f.datum(x.angefordertAm) : '–')) + '</td></tr>';
      }).join('') + '</tbody></table>';

    var investorenListe = bt.length ? '<table class="blatt-liste"><thead><tr><th>Investor</th><th>Stand</th><th>NDA</th><th>Exposé</th></tr></thead><tbody>' +
      bt.map(function (x) {
        var i = H.kontakt(d, x.investorId);
        return '<tr><td>' + h(i ? i.name : '–') + '</td><td>' + h(x.stand) + '</td>' +
          '<td>' + h(x.ndaAm ? W.f.datum(x.ndaAm) : '–') + '</td><td>' + h(x.exposeAm ? W.f.datum(x.exposeAm) : '–') + '</td></tr>';
      }).join('') + '</tbody></table>' : '<p class="platzhalter">Noch kein Investor angesprochen.</p>';

    var journal = vg.length ? vg.map(function (v) {
      var adr = W.belegAdressen(d, v);
      return '<article class="beleg">' +
        '<p class="beleg-kopf"><span class="mono">' + h(v.belegNr) + '</span> · ' + h(W.f.datumZeit(v.zeitpunkt)) +
          ' · ' + h(v.art + ' ' + b.richtungText(v.richtung)) + (v.outlook ? ' · in Outlook gespiegelt' : '') +
          ' · Prüfsumme ' + h(W.belegPruefsumme(v)) + '</p>' +
        '<p class="beleg-zeile"><strong>' + h(v.betreff) + '</strong></p>' +
        '<p class="beleg-zeile">' + h(adr.vonEtikett) + ': ' + h(adr.von) + '</p>' +
        '<p class="beleg-zeile">' + h(adr.anEtikett) + ': ' + h(adr.an) + '</p>' +
        (v.inhalt ? '<p class="beleg-text">' + h(v.inhalt) + '</p>' : '') +
        ((v.anhaenge || []).length ? '<p class="beleg-zeile">Anlagen: ' + h(v.anhaenge.join(', ')) + '</p>' : '') +
        '</article>';
    }).join('') : '<p class="platzhalter">Noch kein Vorgang erfasst.</p>';

    var termineListe = tm.length ? '<table class="blatt-liste"><thead><tr><th>Fällig</th><th>Wiedervorlage</th><th>Stufe</th><th>Stand</th></tr></thead><tbody>' +
      tm.map(function (t) {
        return '<tr><td>' + h(W.f.datum(t.faellig)) + '</td><td>' + h(t.titel) + '</td>' +
          '<td>' + t.stufe + ' von 3</td><td>' + h(t.status) + '</td></tr>';
      }).join('') + '</tbody></table>' : '<p class="platzhalter">Keine Wiedervorlage angelegt.</p>';

    var bildteil = fotos.length ? '<ol class="lichtbilder">' + fotos.map(function (f, i) {
      return '<li><img src="' + h(H.src(f, bilder)) + '" alt="' + h(f.beschriftung || ('Bild ' + (i + 1))) + '">' +
        '<p style="margin-top:.35rem;font-size:.75rem;line-height:1.4"><span class="sans mono" style="font-size:.69rem;color:#5F584E">Bild ' + (i + 1) + '</span> ' +
        h(f.beschriftung || f.kategorie) + '</p></li>';
    }).join('') + '</ol>' : '<p class="platzhalter">Noch kein Foto in der Akte.</p>';

    var protokollListe = pr.length ? '<table class="blatt-liste"><thead><tr><th>Zeitpunkt</th><th>Art</th><th>Vorgang</th><th>Bearbeiter</th></tr></thead><tbody>' +
      pr.map(function (p) {
        return '<tr><td>' + h(W.f.datumZeit(p.zeitpunkt)) + '</td><td>' + h(p.art) + '</td>' +
          '<td>' + h(p.text) + '</td><td>' + h(p.nutzer) + '</td></tr>';
      }).join('') + '</tbody></table>' : '<p class="platzhalter">Noch kein Protokolleintrag.</p>';

    return '<div class="kein-druck" style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:1rem;padding:1.5rem 0;border-bottom:1px solid var(--onyx-kontur-leise)">' +
        '<div><a class="zurueck" style="padding-top:0" href="#/objekt/' + h(o.id) + '">' + sym.pfeilLinks(14) + 'Zurück zur Akte ' + h(o.aktenzeichen) + '</a>' +
          '<h1 style="margin-top:.5rem">Gesamtakte</h1>' +
          '<p class="mini leise" style="margin-top:.25rem;max-width:76ch;line-height:1.7">' +
            'Alle fünf Teile in einem Stück: Exposé-Angaben, Unterlagen, Investoren, das vollständige Journal mit jedem Beleg, ' +
            'der Terminplan, die Bilder und das Protokoll. Kein Papier im Haus, aber jederzeit vollständig auf Papier.</p></div>' +
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
          '<p class="sans mono" style="font-size:.69rem;text-transform:uppercase;letter-spacing:.24em;color:#6C6459">Gesamtakte</p>' +
          '<h2 style="margin-top:1.25rem;font-size:clamp(1.5rem,1.2rem+1.4vw,1.875rem);line-height:1.2">' + h(o.bezeichnung) + '</h2>' +
          '<p style="margin-top:1.25rem;font-size:1.0625rem;line-height:1.35">' + h(o.strasse) + '<br>' + h(o.plz + ' ' + o.ort) + '</p>' +
          '<p class="sans mono" style="margin-top:1.5rem;font-size:.78rem;letter-spacing:.1em;color:#5F584E">' + h(o.aktenzeichen) + ' · Stand ' + h(W.f.datumLang(heute)) + '</p>' +
        '</div>' +
        '<section class="blatt-abschnitt"><h3><span class="nr">1</span>Exposé und Eckdaten</h3>' +
          tabelle([
            ['Objektart', o.objektart], ['Eigentümer', e ? e.name : '–'],
            ['Kaufpreis', b.euro(o.kaufpreis), true], ['Mieteinnahmen p. a.', b.euro(o.mieteinnahmen), true],
            ['Kaufpreisfaktor', b.faktor(o.kaufpreis, o.mieteinnahmen)],
            ['Nicht umlagefähige Nebenkosten ' + o.nichtUmlagefaehigJahr, b.euro(o.nichtUmlagefaehig), true],
            ['Käuferprovision', o.kaeuferprovision],
            ['Provisionsvereinbarung', o.compliance.provisionsvereinbarung.status],
            ['Widerrufsbelehrung', o.compliance.widerrufsbelehrung.status],
            ['Adressvalidierung', o.compliance.adressvalidierung.status]
          ]) +
          '<dl class="blatt-tabelle" style="margin-top:.6rem">' + eck + '</dl></section>' +
        '<section class="blatt-abschnitt"><h3><span class="nr">2</span>Unterlagen und Verträge</h3>' + unterlagenListe + '</section>' +
        '<section class="blatt-abschnitt"><h3><span class="nr">3</span>Investoren</h3>' + investorenListe + '</section>' +
        '<section class="blatt-abschnitt"><h3><span class="nr">4</span>Kommunikation, ' + vg.length + ' Belege</h3>' + journal + '</section>' +
        '<section class="blatt-abschnitt"><h3><span class="nr">5</span>Terminplan</h3>' + termineListe + '</section>' +
        '<section class="blatt-abschnitt"><h3><span class="nr">6</span>Bilder</h3>' + bildteil + '</section>' +
        '<section class="blatt-abschnitt"><h3><span class="nr">7</span>Protokoll</h3>' + protokollListe + '</section>' +
        '<footer class="sans" style="margin-top:3rem;padding-top:1rem;border-top:1px solid #D5CFC2;font-size:.66rem;line-height:1.7;color:#6C6459">' +
          'Gesamtakte ' + h(o.aktenzeichen) + ', gedruckt am ' + h(W.f.datumLang(heute)) + ' von ' + h(K.name) +
          '. Alle Daten dieser Vorführversion sind Beispieldaten.</footer>' +
      '</article></div>';
  };
})();

/* --- Verwaltung: ein Inhaber, alle Rechte ------------------------------------ */
(function () {
  var h = W.f.h, sym = W.sym, opt = W.opt;

  W.RECHTE = [
    'Akten anlegen, ändern und schließen',
    'Exposé freigeben und versenden',
    'Unterlagen anfordern, ablegen und entfernen',
    'Investoren führen, NDA und Adressvalidierung bestätigen',
    'Kommunikation führen, drucken und archivieren',
    'Termine anlegen und eskalieren',
    'Stammdaten und Vorlagen pflegen',
    'Protokoll einsehen und drucken',
    'Daten sichern und zurücksetzen'
  ];

  function karte(titel, unter, inhalt) {
    return '<section class="onyx-karte" style="margin-top:1.5rem;padding:1.25rem">' +
      '<p class="onyx-etikett">' + h(titel) + '</p>' +
      (unter ? '<p class="klein leise" style="margin-top:.35rem;max-width:68ch;line-height:1.65">' + h(unter) + '</p>' : '') +
      '<div style="margin-top:1rem">' + inhalt + '</div></section>';
  }

  function feld(name, etikett, wert, art, breit) {
    return '<div class="feld-gruppe"' + (breit ? ' style="grid-column:1/-1"' : '') + '>' +
      '<label class="onyx-etikett" for="v-' + name + '">' + h(etikett) + '</label>' +
      '<input class="onyx-feld" id="v-' + name + '" name="' + name + '" type="' + (art || 'text') +
      '" value="' + h(wert || '') + '"></div>';
  }

  W.seiten.verwaltung = function (d) {
    var k = d.konto || {}, st = d.stamm || {};
    var kuerzel = W.f.kuerzel(k.name || '');

    var kopf = '<div class="inhaber-kopf">' +
        '<span class="inhaber-kreis mono">' + h(kuerzel) + '</span>' +
        '<div><p style="font-size:1.125rem">' + h(k.name || '–') + '</p>' +
          '<p class="klein leise" style="margin-top:.2rem">' + h(k.buero || '') + ' · ' + h(k.ort || '') + '</p>' +
          '<p style="margin-top:.5rem"><span class="onyx-marke onyx-marke-fertig">Inhaber · alle Rechte</span></p></div>' +
      '</div>';

    var profil = '<form id="konto-formular" class="verwaltung-gitter">' +
        feld('name', 'Name', k.name) +
        feld('rolle', 'Tätigkeit', k.rolle) +
        feld('buero', 'Firma', k.buero) +
        feld('strasse', 'Straße und Hausnummer', k.strasse) +
        feld('ort', 'PLZ und Ort', k.ort) +
        feld('telefon', 'Telefon', k.telefon, 'tel') +
        feld('mobil', 'Mobil, für WhatsApp und SMS', k.mobil, 'tel') +
        feld('emailBuero', 'E-Mail, erscheint als Absender', k.emailBuero, 'email') +
        feld('archivEmail', 'Archivadresse, Kopie jeder Mail', k.archivEmail, 'email') +
        feld('email', 'Anmeldung, E-Mail', k.email, 'email') +
        feld('passwort', 'Anmeldung, Passwort', k.passwort) +
        '<div style="grid-column:1/-1;display:flex;flex-wrap:wrap;gap:.6rem;align-items:center">' +
          '<button class="onyx-knopf onyx-knopf-primaer" type="submit">Konto speichern</button>' +
          '<span class="mini leise">Name, Firma und Adresse stehen auf jedem Ausdruck und in jeder Mail.</span>' +
        '</div>' +
      '</form>';

    var benutzer = '<ul class="onyx-register" style="border-top:1px solid var(--onyx-kontur-leise)">' +
        '<li class="onyx-zeile" style="display:flex;flex-wrap:wrap;gap:.6rem 1rem;align-items:center;padding:.75rem .5rem">' +
          '<span class="kuerzel" aria-hidden="true">' + h(kuerzel) + '</span>' +
          '<span class="wachsen" style="min-width:12rem">' +
            '<span style="display:block;font-size:.9375rem">' + h(k.name || '–') + '</span>' +
            '<span class="mini leise mono">' + h(k.email || '') + '</span></span>' +
          '<span class="onyx-marke onyx-marke-fertig">Inhaber</span>' +
          '<span class="mini still">alle Rechte</span>' +
        '</li></ul>' +
      '<ul class="rechte-liste">' + W.RECHTE.map(function (r) {
        return '<li>' + sym.haken(13) + h(r) + '</li>';
      }).join('') + '</ul>';

    var sa = W.saetze(d);
    function satzfeld(name, etikett) {
      return '<div class="feld-gruppe"><label class="onyx-etikett" for="s-' + name + '">' + h(etikett) + '</label>' +
        '<input class="onyx-feld mono" id="s-' + name + '" name="' + name + '" type="text" inputmode="decimal" ' +
          'value="' + h(String(sa[name]).replace('.', ',')) + '"></div>';
    }
    var stammForm = '<form id="stamm-formular" style="display:grid;gap:1rem">' +
        '<div class="feld-gruppe"><label class="onyx-etikett" for="s-objektarten">Objektarten, eine je Zeile</label>' +
          '<textarea class="onyx-feld mono" id="s-objektarten" name="objektarten" rows="5" style="font-size:.8125rem">' +
            h((st.objektarten || []).join('\n')) + '</textarea></div>' +
        '<div class="feld-gruppe"><label class="onyx-etikett" for="s-kategorien">Foto-Kategorien, eine je Zeile</label>' +
          '<textarea class="onyx-feld mono" id="s-kategorien" name="kategorien" rows="4" style="font-size:.8125rem">' +
            h((st.kategorien || []).join('\n')) + '</textarea></div>' +
        '<div class="feld-gruppe"><label class="onyx-etikett" for="s-unterlagen">Pflichtunterlagen für neue Objekte, je Zeile „Bezeichnung | Ordner“</label>' +
          '<textarea class="onyx-feld mono" id="s-unterlagen" name="unterlagen" rows="8" style="font-size:.8125rem">' +
            h((st.pflichtunterlagen || []).map(function (p) { return p[0] + ' | ' + p[1]; }).join('\n')) + '</textarea></div>' +
        '<div class="feld-gruppe"><label class="onyx-etikett" for="s-regel">Standard-Eskalationsvorgabe</label>' +
          '<input class="onyx-feld" id="s-regel" name="regel" value="' + h(st.eskalationsregel || '') + '"></div>' +
        '<div class="feld-gruppe" style="max-width:22rem"><label class="onyx-etikett" for="s-provision">Standard-Käuferprovision</label>' +
          '<input class="onyx-feld" id="s-provision" name="provision" value="' + h(st.provision || '') + '"></div>' +
        /* Aus diesen Saetzen leitet das System alles ab, was sich rechnen
           laesst — der Nutzer traegt je Objekt nur Kaufpreis und Miete ein. */
        '<div><p class="onyx-etikett">Sätze für die Rechenwerte, in Prozent</p>' +
          '<p class="mini leise" style="margin-top:.3rem;line-height:1.65;max-width:56ch">Die ersten drei ergeben zusammen ' +
            'die geschätzten nicht umlagefähigen Kosten, gerechnet auf die Jahresmiete. Die letzten beiden gehen in die ' +
            'Kaufnebenkosten, gerechnet auf den Kaufpreis.</p>' +
          '<div class="satz-gitter">' +
            satzfeld('verwaltung', 'Verwaltung') + satzfeld('instandhaltung', 'Instandhaltung') +
            satzfeld('mietausfall', 'Mietausfallwagnis') + satzfeld('grunderwerbsteuer', 'Grunderwerbsteuer') +
            satzfeld('notarGrundbuch', 'Notar und Grundbuch') +
          '</div></div>' +
        '<button class="onyx-knopf onyx-knopf-primaer" type="submit" style="justify-self:start">Stammdaten speichern</button>' +
      '</form>';

    /* Als App aufs Handy — steht dauerhaft hier, nicht nur als Hinweis
       beim Start. */
    var lage = W.appLage ? W.appLage() : { offen: false, aufruf: false, apple: false };
    var appBlock = '<div class="onyx-karte" style="padding:1.1rem">' +
      (lage.offen
        ? '<p class="klein">Die Wertakte läuft gerade als App auf diesem Gerät.</p>' +
          '<p class="mini leise" style="margin-top:.4rem;line-height:1.7">Sie startet über ihr eigenes Symbol, ' +
          'ohne Browserleiste, und funktioniert auch ohne Netz. Die Daten liegen weiterhin auf diesem Gerät.</p>'
        : '<p class="klein">Auf den Startbildschirm legen</p>' +
          '<p class="mini leise" style="margin-top:.4rem;line-height:1.7">Danach hat die Wertakte ein eigenes Symbol, ' +
          'öffnet ohne Browserleiste und läuft auch ohne Netz — im Ortstermin, im Keller, im Funkloch. ' +
          'Es wird nichts installiert, es bleibt dieselbe Seite.</p>' +
          (lage.apple
            ? '<p class="klein" style="margin-top:.9rem;line-height:1.8">Am iPhone und iPad: unten auf <b>Teilen</b> tippen, ' +
              'in der Liste <b>Zum Home-Bildschirm</b> wählen, oben rechts auf <b>Hinzufügen</b>.</p>'
            : (lage.aufruf
              ? '<button class="onyx-knopf onyx-knopf-primaer" id="knopf-app" style="margin-top:.9rem">Zum Startbildschirm hinzufügen</button>'
              : '<p class="klein" style="margin-top:.9rem;line-height:1.8">Im Browsermenü <b>App installieren</b> ' +
                'oder <b>Zum Startbildschirm hinzufügen</b> wählen. Der Punkt erscheint nur über eine sichere Verbindung ' +
                '(https), nicht bei einer lokal geöffneten Datei.</p>'))) +
      '</div>';

    /* White-Label sichtbar gemacht: umschalten und zusehen. */
    var jetzt = W.erscheinung ? W.erscheinung() : '';
    var ciBlock = '<div class="ci-wahl">' + (W.ERSCHEINUNG || []).map(function (e) {
      var an = e.wert === jetzt;
      return '<button type="button" class="ci-feld' + (an ? ' ist-an' : '') + '" data-ci-wahl="' + h(e.wert) + '"' +
        (an ? ' aria-current="true"' : '') + '>' +
        '<span class="ci-punkte"><span class="ci-punkt" style="background:' +
          (e.wert === 'lp' ? '#193381' : '#E8A33D') + '"></span>' +
        '<span class="ci-punkt" style="background:' + (e.wert === 'lp' ? '#F2F5FB' : '#101010') + '"></span></span>' +
        '<span><span class="klein" style="display:block">' + h(e.text) + '</span>' +
        '<span class="mini leise" style="display:block">' + h(e.hinweis) + '</span></span></button>';
    }).join('') + '</div>' +
    '<p class="mini leise" style="margin-top:.75rem;line-height:1.7">Im übergebenen System steht hier nur noch das ' +
      'Erscheinungsbild des Kunden. Ausgetauscht wird allein die Farbebene — Aufbau, Wege und Druckstücke bleiben Zeile für Zeile dieselben.</p>';

    var zahlen = [
      ['Objekte', d.objekte.length], ['Kontakte', d.kontakte.length],
      ['Unterlagen', d.unterlagen.length], ['Vorgänge', d.vorgaenge.length],
      ['Termine', d.termine.length], ['Fotos', d.fotos.length],
      ['Protokollzeilen', (d.protokoll || []).length]
    ].map(function (p) {
      return '<div><dt class="onyx-etikett">' + h(p[0]) + '</dt>' +
        '<dd class="mono" style="margin-top:.2rem;font-size:1.0625rem">' + p[1] + '</dd></div>';
    }).join('');

    var daten = '<dl class="zahlenband" style="margin-top:0">' + zahlen + '</dl>' +
      '<div style="display:flex;flex-wrap:wrap;gap:.6rem;margin-top:1rem">' +
        '<button class="onyx-knopf onyx-knopf-leise" id="knopf-sichern">' + sym.hochladen(16) + 'Sicherung als Datei</button>' +
        '<button class="onyx-knopf onyx-knopf-klar" id="knopf-leeren">Leer starten</button>' +
        '<button class="onyx-knopf onyx-knopf-klar" id="knopf-zuruecksetzen">Auf Ausgangsstand zurücksetzen</button>' +
      '</div>' +
      '<p class="mini leise" style="margin-top:.75rem;line-height:1.7">' +
        '<b>Leer starten</b> räumt alle Objekte, Kontakte, Vorgänge, Termine, Unterlagen und Fotos ' +
        'weg und lässt ein leeres System stehen — Konto und Stammdaten bleiben. Danach über ' +
        '„Objekt anlegen“ mit den eigenen Objekten beginnen. ' +
        '<b>Auf Ausgangsstand zurücksetzen</b> holt die Beispieldaten der Vorführung zurück.</p>' +
      '<p class="mini leise" style="margin-top:.75rem;line-height:1.7">' +
        'Die Sicherung enthält den gesamten Datenbestand als Datei. Fotos und abgelegte Scans bleiben im Browser dieses Geräts. ' +
        'Im Kundensystem liegt beides auf dem Server, mit täglicher Sicherung.</p>';

    return '<div class="kopfzeile-seite"><div><h1>Verwaltung</h1>' +
        '<p class="klein leise" style="margin-top:.35rem;max-width:70ch;line-height:1.7">' +
          'Ein Konto führt das System: der Inhaber. Er sieht alles, darf alles und ist der Einzige, ' +
          'der Stammdaten ändert, Daten sichert und zurücksetzt.</p></div></div>' +
      karte('Inhaber', '', kopf) +
      karte('Konto und Absenderdaten', 'Diese Angaben stehen im Briefkopf, in jeder Mail und auf jedem Ausdruck.', profil) +
      karte('Benutzer und Rechte', 'Es gibt genau ein Konto. Weitere Mitarbeitende mit eingeschränkten Rechten legt im Kundensystem allein der Inhaber an.', benutzer) +
      karte('Stammdaten und Vorlagen', 'Gilt für alle neuen Objekte. Bestehende Akten bleiben, wie sie sind.', stammForm) +
      karte('Erscheinungsbild', 'Dasselbe System, das CI des Kunden. Nur die Farbebene wechselt, die Struktur bleibt.', ciBlock) +
      karte('Wertakte als App', 'Auf dem Handy oder Tablet wie eine App starten — mit eigenem Symbol und ohne Netz.', appBlock) +
      karte('Datenbestand', '', daten);
  };
})();
