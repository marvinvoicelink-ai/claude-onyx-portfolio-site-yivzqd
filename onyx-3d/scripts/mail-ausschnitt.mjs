// Rendert den Mail-Ausschnitt "So sieht es aus" (3 Handys) als JPG, DE und ES.
// Aufruf: node scripts/mail-ausschnitt.mjs public <ausgabe-ordner>
// Braucht die Schriften der Objektseite 007 M (public/objekte/finca-son-carrio/fonts).
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const pub = process.argv[2], out = process.argv[3];
const b64 = (f, typ) => `data:${typ};base64,` + fs.readFileSync(path.join(pub, f)).toString('base64');
const font = (f) => b64('objekte/finca-son-carrio/fonts/' + f, 'font/woff2');
const raum = b64('beispiele/finca/assets/06-sala-despues.jpg', 'image/jpeg');
const luft = b64('beispiele/media/zeitraffer-aussen.jpg', 'image/jpeg');
const pool = b64('beispiele/media/p5-nachher.jpg', 'image/jpeg');

const T = {
  de: {
    kontakt: 'Familie Berger', ort: 'Hamburg',
    nachricht: 'Guten Tag Herr Berger, wie besprochen: Hier können Sie in Ruhe durch die Finca gehen – jeder Raum, alle Daten.',
    karteTitel: 'Finca mit Pool · 3D-Rundgang', karteSub: 'Raum für Raum am Handy',
    ki: 'KI-Visualisierung', raumName: 'Wohnen &amp; Küche', raumInfo: 'Raum 3 von 8 · weiterscrollen',
    daten: ['Fläche', 'Zimmer', 'Grundriss', 'Lage', 'Preis'],
    anfrageTitel: 'Besichtigung anfragen', anfrageText: 'Sie kennen das Haus schon – wir zeigen es Ihnen gern vor Ort.',
    felder: ['Name', 'Telefon', 'Ihre Nachricht'], knopf: 'Anfrage senden', direkt: 'Geht direkt an Ihren Makler',
    unter: ['Link an Interessenten', 'Durch jeden Raum gehen', 'Anfrage direkt an Sie'],
    fuss: 'Beispiel · Bilder sind KI-Visualisierungen auf Basis echter Fotos',
  },
  es: {
    kontakt: 'Familia Berger', ort: 'Hamburgo',
    nachricht: 'Buenos días, Sr. Berger: como hablamos, aquí puede recorrer la finca con calma – cada estancia, todos los datos.',
    karteTitel: 'Finca con piscina · recorrido 3D', karteSub: 'Estancia a estancia en el móvil',
    ki: 'Visualización IA', raumName: 'Salón y cocina', raumInfo: 'Estancia 3 de 8 · siga deslizando',
    daten: ['Superficie', 'Habitaciones', 'Plano', 'Ubicación', 'Precio'],
    anfrageTitel: 'Solicitar visita', anfrageText: 'Ya conoce la casa – se la enseñamos con gusto en persona.',
    felder: ['Nombre', 'Teléfono', 'Su mensaje'], knopf: 'Enviar consulta', direkt: 'Llega directamente a su inmobiliaria',
    unter: ['Enlace a los interesados', 'Recorrer cada estancia', 'Consulta directa a usted'],
    fuss: 'Ejemplo · imágenes: visualización IA a partir de fotos reales',
  },
};

const seite = (t) => `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:C;src:url(${font('cormorant.woff2')}) format('woff2');font-weight:300 700}
@font-face{font-family:M;src:url(${font('manrope.woff2')}) format('woff2');font-weight:200 800}
*{box-sizing:border-box;margin:0;padding:0}
body{width:1120px;height:800px;background:#f2f1ee;font-family:M;color:#1d1d1f;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:22px}
.reihe{display:flex;gap:44px;align-items:flex-start}
.spalte{display:flex;flex-direction:column;align-items:center;gap:18px}
.handy{width:300px;height:620px;border-radius:44px;background:#111;padding:11px;box-shadow:0 18px 40px rgba(0,0,0,.18)}
.schirm{width:100%;height:100%;border-radius:34px;overflow:hidden;position:relative;background:#0f0e0d}
.notch{position:absolute;top:9px;left:50%;transform:translateX(-50%);width:86px;height:24px;border-radius:14px;background:#000;z-index:5}
.unter{font:700 25px/1.2 M;color:#1d1d1f;display:flex;align-items:center;gap:10px}
.nr{display:inline-flex;width:34px;height:34px;border-radius:17px;background:#E8A33D;color:#111;font:800 18px/34px M;justify-content:center}
.fuss{font:500 18px/1 M;color:#77777c}
/* 1 Chat */
.chat{background:#ece5dc;height:100%;display:flex;flex-direction:column}
.kopf{background:#f7f7f7;padding:44px 16px 12px;display:flex;gap:10px;align-items:center;border-bottom:1px solid #ddd}
.ava{width:36px;height:36px;border-radius:18px;background:#c9b79c;color:#fff;font:700 15px/36px M;text-align:center}
.kopf b{font:700 15px/1.2 M;display:block}.kopf span{font:500 12px/1.2 M;color:#888}
.blase{margin:18px 12px 0 46px;background:#dcf3d0;border-radius:14px 4px 14px 14px;padding:8px;font:500 13.5px/1.4 M;box-shadow:0 1px 1px rgba(0,0,0,.08)}
.karte{background:#fff;border-radius:9px;overflow:hidden;margin-bottom:8px;position:relative}
.mk{position:absolute;top:8px;left:8px;font:700 9px/1 M;letter-spacing:.05em;text-transform:uppercase;color:#f5f2ec;background:rgba(10,9,8,.6);padding:5px 7px;border-radius:999px}
.karte img{display:block;width:100%;height:150px;object-fit:cover}
.karte div{padding:8px 10px}.karte b{display:block;font:700 13.5px/1.3 M}.karte span{font:500 12px/1.3 M;color:#777}
.zeit{text-align:right;font:500 11px/1 M;color:#7a8a75;margin-top:4px}
/* 2 Raum */
.raum{position:absolute;inset:0;background:url(${raum}) center/cover}
.raum:after{content:'';position:absolute;inset:0;background:linear-gradient(rgba(10,9,8,.35),rgba(10,9,8,0) 30%,rgba(10,9,8,0) 55%,rgba(10,9,8,.85))}
.ki{position:absolute;top:46px;left:16px;z-index:2;font:700 11px/1 M;letter-spacing:.06em;text-transform:uppercase;color:#f5f2ec;background:rgba(10,9,8,.55);border:1px solid rgba(245,242,236,.35);padding:7px 10px;border-radius:999px}
.raumtext{position:absolute;left:18px;right:18px;bottom:30px;z-index:2;color:#f5f2ec}
.raumtext h3{font:600 34px/1 C;margin-bottom:8px}.raumtext p{font:500 13px/1.3 M;color:rgba(245,242,236,.85)}
.balken{height:3px;background:rgba(245,242,236,.25);border-radius:2px;margin-top:14px}.balken i{display:block;width:34%;height:100%;background:#e6c897;border-radius:2px}
/* 3 Anfrage */
.anfrage{height:100%;background:#0f0e0d;color:#f5f2ec;padding:44px 18px 18px;display:flex;flex-direction:column}
.mini{height:118px;border-radius:12px;background:url(${pool}) center/cover;margin-bottom:12px;position:relative}
.chips{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:16px}.chips span{font:600 11.5px/1 M;color:#e6c897;border:1px solid rgba(230,200,151,.4);padding:6px 9px;border-radius:999px}
.anfrage h3{font:600 28px/1 C;margin-bottom:6px}.anfrage p{font:500 12.5px/1.4 M;color:rgba(245,242,236,.75);margin-bottom:12px}
.feld{border:1px solid rgba(245,242,236,.22);border-radius:9px;padding:10px 12px;font:500 13px/1 M;color:rgba(245,242,236,.5);margin-bottom:8px}
.feld.gross{height:54px}
.knopf{background:#e6c897;color:#111;font:800 14px/1 M;text-align:center;padding:13px;border-radius:9px;margin-top:4px}
.direkt{font:500 11.5px/1 M;color:rgba(245,242,236,.55);text-align:center;margin-top:9px}
</style></head><body>
<div class="reihe">
  <div class="spalte"><div class="handy"><div class="schirm"><div class="notch"></div><div class="chat">
    <div class="kopf"><div class="ava">FB</div><div><b>${t.kontakt}</b><span>${t.ort}</span></div></div>
    <div class="blase"><div class="karte"><img src="${luft}"><span class="mk">${t.ki}</span><div><b>${t.karteTitel}</b><span>${t.karteSub}</span></div></div>${t.nachricht}<div class="zeit">18:42 ✓✓</div></div>
  </div></div></div><div class="unter"><span class="nr">1</span>${t.unter[0]}</div></div>
  <div class="spalte"><div class="handy"><div class="schirm"><div class="notch"></div><div class="raum"></div>
    <div class="ki">${t.ki}</div>
    <div class="raumtext"><h3>${t.raumName}</h3><p>${t.raumInfo}</p><div class="balken"><i></i></div></div>
  </div></div><div class="unter"><span class="nr">2</span>${t.unter[1]}</div></div>
  <div class="spalte"><div class="handy"><div class="schirm"><div class="notch"></div><div class="anfrage">
    <div class="mini"><span class="mk">${t.ki}</span></div><div class="chips">${t.daten.map((d) => `<span>${d}</span>`).join('')}</div>
    <h3>${t.anfrageTitel}</h3><p>${t.anfrageText}</p>
    ${t.felder.map((f, i) => `<div class="feld${i === 2 ? ' gross' : ''}">${f}</div>`).join('')}
    <div class="knopf">${t.knopf}</div><div class="direkt">${t.direkt}</div>
  </div></div></div><div class="unter"><span class="nr">3</span>${t.unter[2]}</div></div>
</div>
<div class="fuss">${t.fuss}</div>
</body></html>`;

(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1120, height: 800 }, deviceScaleFactor: 1 });
  for (const lang of ['de', 'es']) {
    await p.setContent(seite(T[lang]), { waitUntil: 'load' });
    await p.evaluate(() => document.fonts.ready);
    await p.waitForTimeout(200);
    await p.screenshot({ path: path.join(out, `ausschnitt-${lang}.png`) });
  }
  await b.close();
  console.log('ok');
})();
