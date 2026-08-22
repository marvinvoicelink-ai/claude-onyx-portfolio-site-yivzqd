/* Datums- und Zahlenformate, deutsch. */
window.W = window.W || {};
(function () {
  var DATUM = new Intl.DateTimeFormat('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
  var DATUM_LANG = new Intl.DateTimeFormat('de-DE', { day: '2-digit', month: 'long', year: 'numeric' });
  var ZEIT = new Intl.DateTimeFormat('de-DE', { hour: '2-digit', minute: '2-digit' });
  var WOCHENTAG = new Intl.DateTimeFormat('de-DE', { weekday: 'short' });
  var MONAT = new Intl.DateTimeFormat('de-DE', { month: 'short' });

  W.f = {
    datum: function (iso) { return iso ? DATUM.format(new Date(iso)) : '–'; },
    datumLang: function (iso) { return iso ? DATUM_LANG.format(new Date(iso)) : '–'; },
    monat: function (iso) { return MONAT.format(new Date(iso)); },
    datumZeit: function (iso) {
      if (!iso) return '–';
      var d = new Date(iso);
      return WOCHENTAG.format(d) + ', ' + DATUM.format(d) + ', ' + ZEIT.format(d) + ' Uhr';
    },
    /** Ganze Tage bis zum Datum. Negativ = ueberfaellig. */
    tageBis: function (iso, heute) {
      if (!iso) return null;
      heute = heute || new Date();
      var z = new Date(iso);
      var a = Date.UTC(z.getFullYear(), z.getMonth(), z.getDate());
      var b = Date.UTC(heute.getFullYear(), heute.getMonth(), heute.getDate());
      return Math.round((a - b) / 86400000);
    },
    fristText: function (tage) {
      if (tage === null) return 'Keine Frist';
      if (tage < 0) return Math.abs(tage) + (tage === -1 ? ' Tag' : ' Tage') + ' überfällig';
      if (tage === 0) return 'Heute fällig';
      if (tage === 1) return 'Morgen fällig';
      return 'in ' + tage + ' Tagen';
    },
    flaeche: function (w) { return w ? w + ' m²' : '–'; },
    oderStrich: function (w) { return w && String(w).trim() ? w : '–'; },
    /** Montag der Woche, in der das Datum liegt. */
    wochenStart: function (d) {
      var m = new Date(d.getFullYear(), d.getMonth(), d.getDate());
      m.setDate(m.getDate() - ((m.getDay() + 6) % 7));
      return m;
    },
    /** Kalenderwoche nach ISO 8601. */
    isoKw: function (d) {
      var t = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
      t.setUTCDate(t.getUTCDate() + 4 - (t.getUTCDay() || 7));
      var start = new Date(Date.UTC(t.getUTCFullYear(), 0, 1));
      return Math.ceil(((t - start) / 86400000 + 1) / 7);
    },
    /* Pruefsumme ueber den Inhalt eines Belegs. Aendert sich der Text, aendert
       sich der Wert - so laesst sich zeigen, dass nichts stillschweigend
       nachtraeglich veraendert wurde. Im Kundensystem steht hier ein
       serverseitiger Hash. */
    pruefsumme: function (text) {
      var wert = 0x811c9dc5;
      var roh = String(text == null ? '' : text);
      for (var i = 0; i < roh.length; i++) {
        wert ^= roh.charCodeAt(i);
        wert = (wert + ((wert << 1) + (wert << 4) + (wert << 7) + (wert << 8) + (wert << 24))) >>> 0;
      }
      var eins = ('00000000' + wert.toString(16)).slice(-8);
      var zwei = ('0000' + ((roh.length * 2654435761) >>> 0).toString(16)).slice(-4);
      return (eins + zwei).toUpperCase().replace(/(.{4})(?=.)/g, '$1 ');
    },
    /** Text fuer die Ausgabe in HTML entschaerfen. */
    h: function (s) {
      return String(s == null ? '' : s)
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
    },
    /** Kuerzel aus einem Namen, "Dipl.-Ing. K. Ahlers" -> "KA". */
    kuerzel: function (name) {
      var titel = /^(dipl|ing|dr|prof|mag)\.?-?/i;
      var teile = String(name).split(/\s+/)
        .filter(function (t) { return t && !titel.test(t); })
        .map(function (t) { return t.replace(/[^\wÄÖÜäöüß]/g, ''); })
        .filter(Boolean);
      return teile.slice(0, 2).map(function (t) { return t[0]; }).join('').toUpperCase() || 'SV';
    }
  };
})();
