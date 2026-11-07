import fs from 'node:fs';
import opentype from 'opentype.js';
const fontPath =
  process.env.LOGO_FONT_PATH ||
  '/System/Library/Fonts/Supplemental/Arial Bold Italic.ttf';
const regularPath =
  process.env.TAGLINE_FONT_PATH ||
  '/System/Library/Fonts/Supplemental/Arial Bold.ttf';
const font = opentype.parse(fs.readFileSync(fontPath).buffer);
const regular = opentype.parse(fs.readFileSync(regularPath).buffer);
const main = font.getPath('Defibrillators', 4, 48, 48).toPathData(2);
const mainWidth = font.getAdvanceWidth('Defibrillators', 48);
const suffix = font.getPath('.ca', mainWidth + 4, 48, 48).toPathData(2);
const end = mainWidth + 4 + font.getAdvanceWidth('.ca', 48);
const width = Math.ceil(end + 6);
const tagline = {
  en: 'AED SALES • INSTALLATION • MAINTENANCE • TRAINING',
  fr: 'VENTE DE DEA • INSTALLATION • ENTRETIEN • FORMATION',
};
for (const mode of ['light', 'dark']) {
  const color = mode === 'light' ? '#102B4E' : '#FFFFFF';
  const paths = `<path fill="${color}" d="${main}"/><path fill="#D62839" d="${suffix}"/><path d="M5 58 H${end - 70} l5 -4 5 8 7 -16 8 24 6 -12 H${end}" fill="none" stroke="#D62839" stroke-width="2.1" stroke-linejoin="round"/>`;
  const svg = (body, height, title) =>
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="title"><title id="title">${title}</title>${body}</svg>\n`;
  fs.writeFileSync(
    `public/brand/wordmark-${mode}.svg`,
    svg(paths, 72, 'Defibrillators.ca'),
  );
  for (const lang of ['en', 'fr']) {
    const tag = regular.getPath(tagline[lang], 5, 89, 8.2).toPathData(2);
    fs.writeFileSync(
      `public/brand/logo-${lang}-${mode}.svg`,
      svg(
        paths + `<path fill="${color}" d="${tag}"/>`,
        98,
        `Defibrillators.ca — ${tagline[lang]}`,
      ),
    );
  }
}
fs.writeFileSync(
  'public/brand/favicon.svg',
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><title>Defibrillators.ca</title><rect width="64" height="64" rx="14" fill="#102B4E"/><path d="M9 33h13l5-11 8 23 6-12h14" stroke="#FFFFFF" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="49" cy="15" r="5" fill="#D62839"/></svg>\n',
);
