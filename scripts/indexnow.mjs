import fs from 'node:fs/promises';
import path from 'node:path';
import { parseArgs } from 'node:util';
import { buildManifest, changesSince, submitRelease } from './lib/indexnow.mjs';

const { values } = parseArgs({
  args: process.argv.slice(2).filter((arg) => arg !== '--'),
  options: {
    submit: { type: 'boolean', default: false },
    bootstrap: { type: 'boolean', default: false },
  },
});
const statePath = 'docs/search/indexnow-state.json';
let lock;
try {
  await fs.mkdir('.release', { recursive: true });
  if (values.submit) lock = await fs.open('.release/indexnow.lock', 'wx');
  const manifest = await buildManifest();
  let previous = null;
  try {
    previous = JSON.parse(await fs.readFile(statePath, 'utf8'));
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }
  const changes = changesSince(manifest, previous);
  if (!values.submit) {
    console.log(
      JSON.stringify(
        {
          mode: 'dry-run',
          networkRequests: 0,
          initialSubmission: !previous,
          changes,
        },
        null,
        2,
      ),
    );
  } else {
    const receipt = await submitRelease({
      manifest,
      previous,
      bootstrap: values.bootstrap,
      saveState: async (state) => {
        await fs.mkdir(path.dirname(statePath), { recursive: true });
        await fs.writeFile(
          statePath + '.tmp',
          JSON.stringify(state, null, 2) + '\n',
        );
        await fs.rename(statePath + '.tmp', statePath);
      },
    });
    console.log(JSON.stringify(receipt, null, 2));
  }
} catch (error) {
  console.error(
    error.code === 'EEXIST'
      ? 'Another IndexNow submission holds .release/indexnow.lock. Check that process before removing a stale lock.'
      : error.message,
  );
  process.exitCode = 1;
} finally {
  if (lock) {
    await lock.close();
    await fs.unlink('.release/indexnow.lock');
  }
}
