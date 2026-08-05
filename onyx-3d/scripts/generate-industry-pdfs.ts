/**
 * One-time content build script — renders a short, self-serve one-pager
 * PDF per industry (not personalized, no pricing, unlike the post-call
 * Infoblatt) to public/downloads/branchen/. Run with ts-node; output is
 * committed as a static asset since the site is a static export.
 */
import { chromium } from "playwright";
import { industries } from "../lib/industries";
import { offerings } from "../lib/offerings";
import fs from "fs";
import path from "path";

const OUT_DIR = path.join(__dirname, "..", "public", "downloads", "branchen");

const AMBER = "#e8a33d";
const NEAR_BLACK = "#111111";
const NEAR_BLACK_2 = "#161616";
const WARM_GREY = "#f5f2ec";
const WARM_GREY_DIM = "rgba(245,242,236,0.68)";
const WARM_GREY_FAINT = "rgba(245,242,236,0.4)";
const HAIRLINE = "rgba(245,242,236,0.14)";

const AIKI_MARK_SVG = `
<svg viewBox="0 0 100 100" width="34" height="34" aria-hidden="true">
  <defs>
    <radialGradient id="glow" cx="50%" cy="45%" r="60%">
      <stop offset="0%" stop-color="${AMBER}" stop-opacity="0.35" />
      <stop offset="100%" stop-color="${AMBER}" stop-opacity="0" />
    </radialGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="url(#glow)" />
  <polygon points="50,8 86,29 86,71 50,92 14,71 14,29" fill="none" stroke="${AMBER}" stroke-width="3.2" stroke-linejoin="round" />
  <circle cx="50" cy="8" r="3" fill="${NEAR_BLACK}" stroke="${AMBER}" stroke-width="2.2" />
  <circle cx="86" cy="29" r="3" fill="${NEAR_BLACK}" stroke="${AMBER}" stroke-width="2.2" />
  <circle cx="86" cy="71" r="3" fill="${NEAR_BLACK}" stroke="${AMBER}" stroke-width="2.2" />
  <circle cx="50" cy="92" r="3" fill="${NEAR_BLACK}" stroke="${AMBER}" stroke-width="2.2" />
  <circle cx="14" cy="71" r="3" fill="${NEAR_BLACK}" stroke="${AMBER}" stroke-width="2.2" />
  <circle cx="14" cy="29" r="3" fill="${NEAR_BLACK}" stroke="${AMBER}" stroke-width="2.2" />
  <circle cx="64.4" cy="16.4" r="2.4" fill="${AMBER}" />
  <line x1="64.4" y1="16.4" x2="72" y2="12" stroke="${AMBER}" stroke-width="2" stroke-linecap="round" />
  <circle cx="35.6" cy="16.4" r="2.4" fill="${AMBER}" />
  <line x1="35.6" y1="16.4" x2="28" y2="12" stroke="${AMBER}" stroke-width="2" stroke-linecap="round" />
  <text x="50" y="66" text-anchor="middle" font-family="Arial, sans-serif" font-weight="800" font-size="34" fill="${AMBER}">AP</text>
</svg>`;

const CHECK_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="${AMBER}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="15" height="15"><path d="M20 6 9 17l-5-5" /></svg>`;
const WARN_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="${WARM_GREY_FAINT}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="15" height="15"><circle cx="12" cy="12" r="9" /><path d="M12 8v5M12 16h.01" /></svg>`;

function html(industryLabel: string, intro: string, painPoints: string[], capabilities: string[], recommendedHtml: string) {
  return `<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8" />
<style>
  * { box-sizing: border-box; }
  html, body {
    background: ${NEAR_BLACK};
  }
  body {
    margin: 0;
    color: ${WARM_GREY};
    font-family: Arial, Helvetica, sans-serif;
    font-size: 12px;
    line-height: 1.45;
    padding: 32px 46px;
  }
  h1, h2 { font-family: Arial, Helvetica, sans-serif; font-weight: 800; margin: 0; }
  .kicker { font-family: 'Courier New', monospace; font-size: 9.5px; letter-spacing: 0.1em; text-transform: uppercase; color: ${AMBER}; }
  .header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; break-inside: avoid; }
  .logo-row { display: flex; align-items: center; gap: 9px; }
  .logo-text { font-weight: 800; font-size: 16px; }
  .logo-text .ai { color: ${AMBER}; }
  h1 { font-size: 23px; margin: 4px 0 9px; line-height: 1.15; }
  .intro { color: ${WARM_GREY_DIM}; font-size: 11.5px; line-height: 1.5; max-width: 94%; margin-bottom: 16px; }
  .section { margin-bottom: 13px; }
  .section h2 { font-size: 13px; margin-bottom: 7px; display: flex; align-items: center; gap: 6px; break-after: avoid; }
  .section h2 .num { font-family: 'Courier New', monospace; font-size: 9.5px; color: ${AMBER}; opacity: 0.8; }
  .row { display: flex; align-items: flex-start; gap: 8px; padding: 6px 11px; border-radius: 6px; background: ${NEAR_BLACK_2}; border: 1px solid ${HAIRLINE}; margin-bottom: 5px; break-inside: avoid; }
  .row span.txt { font-size: 11px; color: ${WARM_GREY_DIM}; line-height: 1.4; }
  .offer { display: flex; align-items: center; gap: 11px; padding: 7px 0; border-bottom: 1px solid ${HAIRLINE}; break-inside: avoid; }
  .offer .n { font-family: 'Courier New', monospace; font-size: 9.5px; color: ${WARM_GREY_FAINT}; width: 15px; flex-shrink: 0; }
  .offer .t { font-weight: 700; font-size: 12px; margin-bottom: 1px; }
  .offer .s { font-size: 10px; color: ${WARM_GREY_DIM}; }
  .footer { margin-top: 16px; padding-top: 11px; border-top: 1px solid ${HAIRLINE}; break-inside: avoid; }
  .footer .cta { font-size: 11px; color: ${WARM_GREY_DIM}; margin-bottom: 7px; }
  .contact { display: flex; gap: 16px; font-family: 'Courier New', monospace; font-size: 9.5px; color: ${WARM_GREY_FAINT}; flex-wrap: wrap; }
  .contact b { color: ${AMBER}; font-weight: 700; }
  .meta { font-family: 'Courier New', monospace; font-size: 9px; color: ${WARM_GREY_FAINT}; margin-top: 11px; }
</style>
</head>
<body>
  <div class="header">
    <div class="logo-row">
      ${AIKI_MARK_SVG}
      <span class="logo-text"><span class="ai">AI</span>KI Performance</span>
    </div>
    <span class="kicker">Branchen-Infoblatt</span>
  </div>

  <span class="kicker">Branche</span>
  <h1>${industryLabel}</h1>
  <p class="intro">${intro}</p>

  <div class="section">
    <h2><span class="num">01</span> Wer wir sind</h2>
    <p style="color:${WARM_GREY_DIM}; font-size: 12.5px; line-height: 1.7; max-width: 92%;">
      AIKI Performance ist das Einzelunternehmen von Marvin Weiß-Drumm aus Landau in der Pfalz.
      Wir bauen maßgeschneiderte digitale Systeme im White-Label — kein Produkt von der Stange,
      sondern Software, die genau zu deinem Prozess passt. Ein Ansprechpartner plant, baut und
      übergibt dein System selbst.
    </p>
  </div>

  <div class="section">
    <h2><span class="num">02</span> Was wir machen</h2>
    <p style="color:${WARM_GREY_DIM}; font-size: 12.5px; line-height: 1.7; max-width: 92%;">
      Wir entwickeln Dashboards, Kundenportale, interne Tools und KI-Agenten — und übergeben sie
      vollständig an dich. Du hostest selbst, besitzt Code und Daten komplett und bist nach der
      Übergabe unabhängig von uns. Kein Abo, kein Lock-in.
    </p>
  </div>

  <div class="section">
    <h2><span class="num">03</span> Typische Probleme in dieser Branche</h2>
    ${painPoints.map((p) => `<div class="row">${WARN_SVG}<span class="txt">${p}</span></div>`).join("")}
  </div>

  <div class="section">
    <h2><span class="num">04</span> Was wir dir empfehlen würden</h2>
    ${capabilities.map((c) => `<div class="row">${CHECK_SVG}<span class="txt">${c}</span></div>`).join("")}
    <div style="margin-top: 16px;">
      ${recommendedHtml}
    </div>
  </div>

  <div class="footer">
    <p class="cta"><b style="color:${WARM_GREY}">Nächster Schritt:</b> 30 Minuten, um deinen Bedarf genau zu klären — daraus entsteht dein passendes, verbindliches Angebot.</p>
    <div class="contact">
      <span>WHATSAPP <b>0176 322 273 522</b></span>
      <span>E-MAIL <b>info@onyx-ai.de</b></span>
      <span>TERMIN <b>calendly.com/onyx-ai/30min</b></span>
    </div>
    <p class="meta">AIKI Performance · Marvin Weiß-Drumm · Landau in der Pfalz</p>
  </div>
</body>
</html>`;
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const browser = await chromium.launch();
  const page = await browser.newPage();

  for (const industry of industries) {
    const recommended = industry.recommended
      .map((slug) => offerings.find((o) => o.slug === slug))
      .filter((o): o is (typeof offerings)[number] => Boolean(o));

    const recommendedHtml = recommended
      .map(
        (o, i) => `<div class="offer"><span class="n">${String(i + 1).padStart(2, "0")}</span><div><div class="t">${o.title}</div><div class="s">${o.subtitle}</div></div></div>`
      )
      .join("");

    const doc = html(industry.label, industry.intro, industry.painPoints, industry.capabilities, recommendedHtml);
    await page.setContent(doc, { waitUntil: "load" });
    const outPath = path.join(OUT_DIR, `${industry.slug}.pdf`);
    await page.pdf({
      path: outPath,
      format: "A4",
      printBackground: true,
      margin: { top: "0", bottom: "0", left: "0", right: "0" },
    });
    console.log("wrote", outPath);
  }

  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
