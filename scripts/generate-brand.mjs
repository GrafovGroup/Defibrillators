import fs from 'node:fs';
import opentype from 'opentype.js';
const fontPath =
  process.env.LOGO_FONT_PATH ||
  '/System/Library/Fonts/Supplemental/Arial Black.ttf';
const regularPath =
  process.env.TAGLINE_FONT_PATH ||
  '/System/Library/Fonts/Supplemental/Arial Bold.ttf';
const parseFont = (path) => {
  const bytes = fs.readFileSync(path);
  return opentype.parse(
    bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength),
  );
};
const font = parseFont(fontPath);
const regular = parseFont(regularPath);
// Concept #4: heavy forward-slanted lettering, a fine baseline and a pulse
// after the suffix. Keep the pulse clear of the lettering at small sizes.
const main = font.getPath('Defibrillators', 4, 53, 49).toPathData(2);
const mainWidth = font.getAdvanceWidth('Defibrillators', 49);
const suffix = font.getPath('.ca', mainWidth + 3, 53, 49).toPathData(2);
const end = mainWidth + 3 + font.getAdvanceWidth('.ca', 49);
const width = Math.ceil(end + 58);
const tagline = {
  en: 'AED SALES • INSTALLATION • MAINTENANCE • TRAINING',
  fr: 'VENTE DE DEA • INSTALLATION • ENTRETIEN • FORMATION',
};
for (const mode of ['light', 'dark']) {
  const color = mode === 'light' ? '#102B4E' : '#FFFFFF';
  const paths = `<g transform="translate(10 0) skewX(-11)"><path fill="${color}" d="${main}"/><path fill="#D6091B" d="${suffix}"/></g><path d="M4 62 H${end + 4} l8 -39 9 57 8 -30 6 12 H${width - 3}" fill="none" stroke="#D6091B" stroke-width="2.7" stroke-linejoin="miter"/>`;
  const svg = (body, height, title) =>
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="title"><title id="title">${title}</title>${body}</svg>\n`;
  fs.writeFileSync(
    `public/brand/wordmark-${mode}.svg`,
    svg(paths, 84, 'Defibrillators.ca'),
  );
  for (const lang of ['en', 'fr']) {
    const tagSize = (end - 2) / regular.getAdvanceWidth(tagline[lang], 1);
    const tag = regular.getPath(tagline[lang], 4, 79, tagSize).toPathData(2);
    fs.writeFileSync(
      `public/brand/logo-${lang}-${mode}.svg`,
      svg(
        paths + `<path fill="${color}" d="${tag}"/>`,
        88,
        `Defibrillators.ca — ${tagline[lang]}`,
      ),
    );
  }
}
fs.writeFileSync(
  'public/brand/favicon.svg',
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><title>Defibrillators.ca</title><rect width="64" height="64" rx="14" fill="#102B4E"/><path d="M9 33h13l5-11 8 23 6-12h14" stroke="#FFFFFF" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="49" cy="15" r="5" fill="#D6091B"/></svg>\n',
);
