import sharp from 'sharp';
import { fileURLToPath } from 'node:url';

// 224 CSS pixels at up to 3x density; keep the source image unchanged.
await sharp(fileURLToPath(new URL('../src/assets/images/hero_konex.webp', import.meta.url)))
  .resize(672, 672)
  .webp({ quality: 82 })
  .toFile(fileURLToPath(new URL('../src/assets/images/hero_konex-672.webp', import.meta.url)));
