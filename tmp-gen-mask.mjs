import { chromium } from 'playwright-core';
import { writeFileSync } from 'fs';

const W = 256, H = 128; // coarse equirectangular grid

const browser = await chromium.launch({ channel: 'msedge', headless: true });
const page = await browser.newPage();
await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded' });

const { b64, land, total } = await page.evaluate(async ({ W, H }) => {
  const img = new Image();
  img.src = '/_landsrc.jpg';
  await img.decode();
  const c = document.createElement('canvas');
  c.width = W; c.height = H;
  const ctx = c.getContext('2d');
  ctx.drawImage(img, 0, 0, W, H); // box-downsample to coarse grid
  const data = ctx.getImageData(0, 0, W, H).data;

  const bits = new Uint8Array(Math.ceil((W * H) / 8));
  let land = 0;
  for (let i = 0; i < W * H; i++) {
    const r = data[i * 4], g = data[i * 4 + 1], b = data[i * 4 + 2];
    // NASA topo: ocean is blue-dominant & fairly dark; land is green/tan/white.
    const isOcean = b > r + 6 && b > g + 6;
    const isLand = !isOcean;
    if (isLand) { bits[i >> 3] |= 1 << (i & 7); land++; }
  }
  let bin = '';
  for (let i = 0; i < bits.length; i++) bin += String.fromCharCode(bits[i]);
  return { b64: btoa(bin), land, total: W * H };
}, { W, H });

await browser.close();

console.log(`grid ${W}x${H} = ${total} cells, land=${land} (${(100*land/total).toFixed(1)}%), base64 ${b64.length} chars`);

const file = `// AUTO-GENERATED — do not edit by hand.
// Coarse equirectangular land/water mask (${W}×${H}) derived from a
// public-domain NASA "land_shallow_topo" image, downsampled and thresholded to
// 1 bit/cell. Row 0 = +90° lat (north), column 0 = -180° lon. Used to place
// the hero globe's dots on land only. Land ratio ≈ ${(100*land/total).toFixed(0)}%.

export const MASK_W = ${W};
export const MASK_H = ${H};

const PACKED =
  "${b64}";

// Decode the base64 bit-packed mask once into a Uint8Array of bytes.
const BITS = (() => {
  const bin = typeof atob !== "undefined"
    ? atob(PACKED)
    : Buffer.from(PACKED, "base64").toString("binary");
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
})();

/**
 * Returns true if the given geographic coordinate falls on land.
 * @param lonDeg longitude in [-180, 180]
 * @param latDeg latitude in [-90, 90]
 */
export function isLand(lonDeg: number, latDeg: number): boolean {
  let x = Math.floor(((lonDeg + 180) / 360) * MASK_W);
  let y = Math.floor(((90 - latDeg) / 180) * MASK_H);
  if (x < 0) x = 0; else if (x >= MASK_W) x = MASK_W - 1;
  if (y < 0) y = 0; else if (y >= MASK_H) y = MASK_H - 1;
  const idx = y * MASK_W + x;
  return (BITS[idx >> 3] & (1 << (idx & 7))) !== 0;
}
`;

writeFileSync('src/components/canvas/landMask.ts', file);
console.log('wrote src/components/canvas/landMask.ts');
