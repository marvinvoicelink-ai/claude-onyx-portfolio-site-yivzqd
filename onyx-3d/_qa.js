const { chromium } = require('playwright');
const routes = ['/', '/angebot', '/angebot/kundenportale', '/angebot/interne-tools', '/angebot/dashboards',
  '/angebot/automatisierung', '/angebot/terminplanung', '/angebot/dokumentenverwaltung', '/referenzen',
  '/ki-agenten', '/automatisierungen', '/fuer-dich', '/problem', '/faq', '/kontakt', '/ueber-mich',
  '/impressum', '/datenschutz', '/agb'];
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  let bad = 0;
  for (const w of [1280, 375]) {
    const p = await b.newPage({ viewport: { width: w, height: 900 } });
    const errs = [];
    p.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
    p.on('pageerror', (e) => errs.push('PAGEERROR ' + e.message));
    for (const r of routes) {
      errs.length = 0;
      const res = await p.goto('http://localhost:4321' + r, { waitUntil: 'networkidle' });
      const ov = await p.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
      if (res.status() !== 200 || errs.length || ov) { bad++; console.log(w, r, res.status(), 'overflow:' + ov, errs.slice(0, 2)); }
    }
    await p.close();
  }
  console.log(bad === 0 ? 'ALLE ROUTEN SAUBER' : bad + ' PROBLEME');
  await b.close();
})();
