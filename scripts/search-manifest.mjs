import fs from 'node:fs/promises';
import { buildManifest } from './lib/indexnow.mjs';
const manifest = await buildManifest();
await fs.mkdir('.release', { recursive: true });
await fs.writeFile(
  '.release/indexnow-manifest.json',
  JSON.stringify(manifest, null, 2) + '\n',
);
console.log(
  `Prepared ${manifest.pages.length} canonical page fingerprints (${manifest.indexable ? 'production' : 'staging'}); no search notification sent.`,
);
