import sharp from "sharp";
import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const targets = [
  "public/images/unused/IMG_0176.jpeg",
  "public/images/unused/IMG_0623.jpeg",
  "public/images/unused/1C61CD87-4ED7-4BAE-9A4C-85E567FA3B74.jpeg",
];

for (const rel of targets) {
  const p = resolve(process.cwd(), rel);
  const src = await readFile(p);
  // sharp strips EXIF by default unless .withMetadata() is called.
  // .rotate() bakes any EXIF orientation into pixel data so removing EXIF is lossless.
  const out = await sharp(src).rotate().jpeg({ quality: 95 }).toBuffer();
  await writeFile(p, out);
  console.log(`✓ stripped EXIF → ${rel} (${(out.byteLength / 1024).toFixed(0)} KB)`);
}
