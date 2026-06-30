import { chromium } from 'playwright-core';
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const page = await browser.newPage();
await page.setViewportSize({ width: 320, height: 800 });
await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
await page.waitForTimeout(1200);
const chain = await page.evaluate(() => {
  const out = [];
  let el = document.querySelector('#hero .container-wide');
  while (el && el !== document.documentElement.parentNode) {
    const cs = getComputedStyle(el);
    out.push({
      tag: el.tagName.toLowerCase() + (el.id ? '#' + el.id : ''),
      cls: (el.className || '').toString().slice(0, 50),
      width: Math.round(el.getBoundingClientRect().width),
      display: cs.display,
      flexDir: cs.flexDirection,
      maxWidth: cs.maxWidth,
      overflowX: cs.overflowX,
      position: cs.position,
    });
    el = el.parentElement;
  }
  return out;
});
console.log(JSON.stringify(chain, null, 2));
await browser.close();
