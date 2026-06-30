import { chromium } from 'playwright-core';

const URL = 'http://localhost:3000/';
const widths = [320, 375, 390, 414, 480];

const browser = await chromium.launch({ channel: 'msedge', headless: true });
const ctx = await browser.newContext({ deviceScaleFactor: 2 });
const page = await ctx.newPage();

for (const w of widths) {
  await page.setViewportSize({ width: w, height: 800 });
  await page.goto(URL, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1200); // allow client render + framer-motion
  const report = await page.evaluate(() => {
    const vw = document.documentElement.clientWidth;
    const docOverflow = document.documentElement.scrollWidth - vw;
    const hero = document.querySelector('#hero');
    const offenders = [];
    if (hero) {
      hero.querySelectorAll('*').forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.right > vw + 1 || r.left < -1) {
          offenders.push({
            tag: el.tagName.toLowerCase(),
            cls: (el.className || '').toString().slice(0, 60),
            left: Math.round(r.left),
            right: Math.round(r.right),
            width: Math.round(r.width),
          });
        }
      });
    }
    // CTA label visibility check
    const btn = hero?.querySelector('a[href="#contact"]');
    const btnRect = btn?.getBoundingClientRect();
    return {
      vw,
      docOverflow,
      heroFound: !!hero,
      offenderCount: offenders.length,
      offenders: offenders.slice(0, 8),
      ctaRight: btnRect ? Math.round(btnRect.right) : null,
      ctaWidth: btnRect ? Math.round(btnRect.width) : null,
    };
  });
  console.log(`\n=== ${w}px ===`);
  console.log(JSON.stringify(report, null, 2));
  if (w === 390) await page.screenshot({ path: 'tmp-hero-390.png' });
}

await browser.close();
