import { chromium } from 'playwright-core';
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const page = await browser.newPage();
await page.setViewportSize({ width: 1280, height: 900 });
await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });

// Scroll the ROI section into view so counters animate
await page.locator('#roi').scrollIntoViewIfNeeded();
await page.waitForTimeout(2500); // let initial count-up settle

const readCards = () =>
  page.$$eval('#roi .grid .text-xl, #roi .grid .text-2xl', (els) =>
    els.map((e) => e.textContent.trim())
  );

const before = await readCards();

// Drag the first slider (Monthly Revenue) to the far right
const slider = page.locator('#roi input[type="range"]').first();
const box = await slider.boundingBox();
await page.mouse.move(box.x + box.width * 0.5, box.y + box.height / 2);
await page.mouse.down();
await page.mouse.move(box.x + box.width * 0.95, box.y + box.height / 2, { steps: 10 });
await page.mouse.up();
await page.waitForTimeout(2500); // let re-animation settle

const after = await readCards();

console.log('BEFORE drag:', JSON.stringify(before));
console.log('AFTER  drag:', JSON.stringify(after));
console.log('CHANGED   :', JSON.stringify(before) !== JSON.stringify(after));
await browser.close();
