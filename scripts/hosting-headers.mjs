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
const hashes = new Set();
for (const file of walk('dist').filter((file) => file.endsWith('.html'))) {
  const $ = load(fs.readFileSync(file, 'utf8'));
  $('script:not([src])').each((_, element) => {
    const script = $(element).text();
    if (script)
      hashes.add(
        `'sha256-${createHash('sha256').update(script).digest('base64')}'`,
      );
  });
}
const headers = fs
  .readFileSync('public/.htaccess', 'utf8')
  .replace('__SCRIPT_HASHES__', [...hashes].join(' '));
fs.writeFileSync('dist/.htaccess', headers);
console.log(`Prepared WHC headers with ${hashes.size} static script hashes.`);
