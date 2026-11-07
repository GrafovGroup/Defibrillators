import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { load } from 'cheerio';
const walk = (dir) =>
  fs
    .readdirSync(dir, { withFileTypes: true })
    .flatMap((item) =>
      item.isDirectory()
        ? walk(path.join(dir, item.name))
        : [path.join(dir, item.name)],
    );
const html = walk('dist').filter((file) => file.endsWith('.html'));
const hashesFor = (files) => {
  const hashes = new Set();
  for (const file of files) {
    const $ = load(fs.readFileSync(file, 'utf8'));
    $('script:not([src])').each((_, element) => {
      const script = $(element).text();
      if (script)
        hashes.add(
          `'sha256-${createHash('sha256').update(script).digest('base64')}'`,
        );
    });
  }
  return [...hashes].join(' ');
};
const template = fs.readFileSync('public/.htaccess', 'utf8');
const policyLine = template
  .split('\n')
  .find((line) => line.includes('Header always set Content-Security-Policy'));
if (!policyLine?.includes('__SCRIPT_HASHES__'))
  throw new Error('Missing CSP template');
// Root/fallback scripts also cover ErrorDocument responses under nested paths.
// Each directory gets its own static hashes: response headers stay bounded as
// the site grows, without allowing arbitrary inline scripts or using a nonce.
const rootFiles = html.filter((file) => path.dirname(file) === 'dist');
fs.writeFileSync(
  'dist/.htaccess',
  template.replace('__SCRIPT_HASHES__', hashesFor(rootFiles)),
);
let maximum = 0;
for (const dir of new Set(html.map((file) => path.dirname(file)))) {
  if (dir === 'dist') continue;
  const policy = policyLine.replace(
    '__SCRIPT_HASHES__',
    hashesFor([
      ...rootFiles,
      ...html.filter((file) => path.dirname(file) === dir),
    ]),
  );
  maximum = Math.max(maximum, Buffer.byteLength(policy));
  if (Buffer.byteLength(policy) >= 7500)
    throw new Error(`CSP exceeds header budget: ${dir}`);
  fs.writeFileSync(
    path.join(dir, '.htaccess'),
    `# Generated page-specific CSP. Keep with this page when deploying.\n<IfModule mod_headers.c>\n${policy}\n</IfModule>\n`,
  );
}
console.log(
  `Prepared page-specific WHC headers; maximum CSP line ${maximum} bytes.`,
);
