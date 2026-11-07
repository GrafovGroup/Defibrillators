import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

// Source files stay outside the repository; the manifest records reviewed inputs.
// Run: node scripts/prepare-visuals.mjs /absolute/path/to/source-manifest.json
const manifest = JSON.parse(await fs.readFile(process.argv[2], 'utf8'));
const visuals = {};
for (const asset of manifest) {
  const metadata = await sharp(asset.source).metadata();
  const widths = [
    ...new Set([400, 800, 1200].map((w) => Math.min(w, metadata.width))),
  ];
  const variants = [];
  for (const width of widths) {
    const file = `${asset.key}-${width}.webp`;
    const dest = path.join('public/images', file);
    await fs.mkdir(path.dirname(dest), { recursive: true });
    let result;
    for (const quality of [78, 70, 62, 54]) {
      result = await sharp(asset.source)
        .rotate()
        .resize({ width, withoutEnlargement: true })
        .webp({ quality, effort: 6 })
        .toBuffer();
      if (result.length < 150_000) break;
    }
    if (result.length >= 150_000)
      throw new Error(`Image budget exceeded: ${file}`);
    await fs.writeFile(dest, result);
    const info = await sharp(result).metadata();
    variants.push({
      src: `/images/${file}`,
      width: info.width,
      height: info.height,
    });
  }
  const main = variants.find((v) => v.width === 800) ?? variants.at(-1);
  visuals[asset.key] = {
    ...main,
    variants,
    kind: asset.kind,
    fit: asset.fit ?? 'cover',
    alt: { en: asset.en, fr: asset.fr },
    ...(asset.credit ? { credit: asset.credit } : {}),
  };
}
await fs.writeFile(
  'src/data/visual-assets.json',
  JSON.stringify(visuals, null, 2) + '\n',
);
console.log(`Prepared ${Object.keys(visuals).length} unique page visuals`);
