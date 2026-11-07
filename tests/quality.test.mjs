import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { gzipSync } from 'node:zlib';
import { load } from 'cheerio';

const walk = (dir) =>
  fs
    .readdirSync(dir, { withFileTypes: true })
    .flatMap((entry) =>
      entry.isDirectory()
        ? walk(path.join(dir, entry.name))
        : [path.join(dir, entry.name)],
    );
const files = walk('dist');
const html = files.filter((file) => file.endsWith('.html'));

test('Production output excludes local QA helpers and private source files', () => {
  for (const file of files) {
    assert.doesNotMatch(
      file,
      /(?:^|\/)(?:\.env|\.git|node_modules|scripts)(?:\/|$)/,
    );
    if (/\.(html|js|css)$/.test(file))
      assert.doesNotMatch(
        fs.readFileSync(file, 'utf8'),
        /__qa__|axe-core|qa-report|qa-response/,
      );
  }
});

test('Every ARIA reference resolves within the generated document', () => {
  for (const file of html) {
    const $ = load(fs.readFileSync(file, 'utf8'));
    for (const attribute of [
      'aria-describedby',
      'aria-labelledby',
      'aria-controls',
    ])
      $(`[${attribute}]`).each((_, element) => {
        for (const id of $(element).attr(attribute).split(/\s+/))
          assert.equal(
            $(`[id="${id}"]`).length,
            1,
            `${file}: missing ${attribute} target ${id}`,
          );
      });
    $('script[src],img[src],link[rel=stylesheet]').each((_, element) => {
      const url = $(element).attr('src') ?? $(element).attr('href');
      assert.ok(
        url.startsWith('/') && !url.startsWith('//'),
        `${file}: external executable/style/image dependency`,
      );
    });
    $('a[href]').each((_, element) => {
      assert.doesNotMatch(
        $(element).attr('href'),
        /^(?:javascript|data|http):/i,
      );
    });
  }
});

test('Page transfer budgets keep HTML, styles and scripts small', () => {
  for (const file of html) {
    const source = fs.readFileSync(file);
    const $ = load(source.toString());
    assert.ok(
      gzipSync(source).length < 12_000,
      `${file}: HTML exceeds 12 KB gzip`,
    );
    const total = (selector, attribute) =>
      $(selector)
        .toArray()
        .reduce(
          (sum, element) =>
            sum +
            gzipSync(
              fs.readFileSync(path.join('dist', $(element).attr(attribute))),
            ).length,
          0,
        );
    const scripts = new Set();
    const addScript = (file) => {
      if (scripts.has(file)) return;
      scripts.add(file);
      const script = fs.readFileSync(file, 'utf8');
      for (const [, reference] of script.matchAll(
        /(?:from\s*|import\s*)["']([^"']+\.js)["']/g,
      )) {
        const dependency = reference.startsWith('/')
          ? path.join('dist', reference)
          : path.resolve(path.dirname(file), reference);
        addScript(path.resolve(dependency));
      }
    };
    for (const element of $('script[src]').toArray())
      addScript(path.resolve('dist', '.' + $(element).attr('src')));
    const scriptBytes = [...scripts].reduce(
      (sum, file) => sum + gzipSync(fs.readFileSync(file)).length,
      0,
    );
    assert.ok(
      scriptBytes < 10_000,
      `${file}: external JS including shared imports is ${scriptBytes} bytes (10 KB gzip budget)`,
    );
    assert.ok(
      total('link[rel=stylesheet]', 'href') < 12_000,
      `${file}: CSS exceeds 12 KB gzip`,
    );
  }
});
