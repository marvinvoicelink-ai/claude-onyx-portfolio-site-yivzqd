const { chromium } = require('playwright');
const fs = require('fs');

const OUT = '/tmp/claude-0/-home-user-claude-onyx-portfolio-site-yivzqd/2350e96e-c864-5141-a567-a52a7fbcda43/scratchpad/chat';
fs.mkdirSync(OUT, { recursive: true });

async function dismissBanner(page) {
  const b = page.getByRole('button', { name: /Akzeptieren/i }).first();
  if (await b.count()) { await b.click().catch(() => {}); await page.waitForTimeout(500); }
}

async function revealAll(page) {
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.6;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 150));
    }
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 500));
  });
}

async function shotIdx(page, name, idx) {
  const el = (await page.$$('main > section, main > div'))[idx];
  if (!el) { console.log('MISS', name); return; }
  await el.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await el.screenshot({ path: `${OUT}/${name}.png` });
  const b = await el.boundingBox();
  console.log(name, Math.round(b.height) + 'px');
}

(async () => {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });

  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
  await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  await dismissBanner(page);
  await revealAll(page);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(900);
  await page.screenshot({ path: `${OUT}/01-header.png` });

  await shotIdx(page, '02-blatt01-leistungen', 2);
  await shotIdx(page, '03-blatt03-fuer-wen', 4);
  await shotIdx(page, '04-blatt04-loesung', 5);
  await shotIdx(page, '05-referenz-glow', 7);

  const btns = await page.$$('button[aria-expanded]');
  if (btns[3]) {
    await btns[3].click();
    await page.waitForTimeout(700);
    await shotIdx(page, '08-blatt01-anderer-punkt', 2);
  }
  await page.close();

  const m = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
  await m.goto('http://localhost:4321/', { waitUntil: 'networkidle' });
  await m.waitForTimeout(1000);
  await dismissBanner(m);
  await revealAll(m);
  await m.evaluate(() => window.scrollTo(0, 0));
  await m.waitForTimeout(800);
  await m.screenshot({ path: `${OUT}/06-mobil-header.png` });
  await m.close();

  const d = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
  await d.goto('http://localhost:4321/angebot/kundenportale', { waitUntil: 'networkidle' });
  await d.waitForTimeout(900);
  await dismissBanner(d);
  await revealAll(d);
  await d.evaluate(() => window.scrollTo(0, 0));
  await d.waitForTimeout(700);
  await d.screenshot({ path: `${OUT}/07-unterseite-glowcard.png` });
  await d.close();

  await browser.close();
})();
