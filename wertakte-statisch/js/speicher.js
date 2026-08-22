/* Speicher der Vorfuehrung.
   Stammdaten liegen als JSON im localStorage, aufgenommene Fotos als Blob in
   IndexedDB (localStorage waere fuer Bilder zu klein). Beides bleibt im
   Browser des Geraets erhalten, auch nach dem Neuladen und nach dem Schliessen.
   Im spaeteren Kundensystem steht hier Supabase mit Postgres und Storage. */
window.W = window.W || {};
(function () {
  var SCHLUESSEL = 'wertakte.daten.v1';
  var DB_NAME = 'wertakte';
  var LADEN = 'fotos';
  var db = null;
  var urlCache = {};
  var speicherWarnung = null;

  function idb() {
    return new Promise(function (fertig, fehler) {
      if (db) return fertig(db);
      if (!window.indexedDB) return fehler(new Error('IndexedDB nicht verfügbar'));
      var a = indexedDB.open(DB_NAME, 1);
      a.onupgradeneeded = function () {
        if (!a.result.objectStoreNames.contains(LADEN)) a.result.createObjectStore(LADEN);
      };
      a.onsuccess = function () { db = a.result; fertig(db); };
      a.onerror = function () { fehler(a.error); };
    });
  }

  function tx(modus, fn) {
    return idb().then(function (d) {
      return new Promise(function (fertig, fehler) {
        var t = d.transaction(LADEN, modus);
        var anfrage = fn(t.objectStore(LADEN));
        t.oncomplete = function () { fertig(anfrage && anfrage.result); };
        t.onerror = function () { fehler(t.error); };
      });
    });
  }

  W.speicher = {
    /** Meldung, falls dauerhaftes Speichern im Browser nicht geht. */
    warnung: function () { return speicherWarnung; },

    laden: function () {
      var roh = null;
      try { roh = localStorage.getItem(SCHLUESSEL); }
      catch (e) { speicherWarnung = 'Der Browser erlaubt kein dauerhaftes Speichern. Änderungen gelten nur bis zum Neuladen.'; }
      if (roh) {
        try { return JSON.parse(roh); } catch (e) { /* beschaedigt: neu aufsetzen */ }
      }
      var frisch = JSON.parse(JSON.stringify(W.SEED));
      W.speicher.sichern(frisch);
      return frisch;
    },

    sichern: function (daten) {
      try { localStorage.setItem(SCHLUESSEL, JSON.stringify(daten)); }
      catch (e) { speicherWarnung = 'Der Speicher des Browsers ist voll oder gesperrt. Änderungen gelten nur bis zum Neuladen.'; }
    },

    zuruecksetzen: function () {
      try { localStorage.removeItem(SCHLUESSEL); } catch (e) { /* egal */ }
      Object.keys(urlCache).forEach(function (k) { URL.revokeObjectURL(urlCache[k]); });
      urlCache = {};
      return tx('readwrite', function (s) { return s.clear(); })
        .catch(function () { /* ohne IndexedDB gibt es nichts zu leeren */ });
    },

    fotoSichern: function (id, blob) {
      return tx('readwrite', function (s) { return s.put(blob, id); });
    },

    fotoLoeschen: function (id) {
      if (urlCache[id]) { URL.revokeObjectURL(urlCache[id]); delete urlCache[id]; }
      return tx('readwrite', function (s) { return s.delete(id); })
        .catch(function () { /* nichts zu loeschen */ });
    },

    /** Liefert eine anzeigbare Adresse fuer ein gespeichertes Foto. */
    fotoUrl: function (id) {
      if (urlCache[id]) return Promise.resolve(urlCache[id]);
      return tx('readonly', function (s) { return s.get(id); }).then(function (blob) {
        if (!blob) return null;
        urlCache[id] = URL.createObjectURL(blob);
        return urlCache[id];
      }).catch(function () { return null; });
    },

    /** Adressen aller genannten Fotos auf einmal, fuer das Zeichnen einer Seite. */
    fotoUrls: function (ids) {
      return Promise.all(ids.map(function (id) {
        return W.speicher.fotoUrl(id).then(function (u) { return [id, u]; });
      })).then(function (paare) {
        var karte = {};
        paare.forEach(function (p) { if (p[1]) karte[p[0]] = p[1]; });
        return karte;
      });
    }
  };
})();
