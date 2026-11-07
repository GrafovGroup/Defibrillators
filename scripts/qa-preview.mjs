// Local QA only. Never deploy this server or include its helpers in dist/.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.resolve('dist');
const origin = 'http://127.0.0.1:4173';
const endpoint = 'https://formspree.io/f/maeezonn';
const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
};
const helpers = {
  '/__qa__/axe.js': fileURLToPath(import.meta.resolve('axe-core/axe.min.js')),
  '/__qa__/ga.js': fileURLToPath(new URL('./qa-ga.js', import.meta.url)),
  '/__qa__/audit.js': fileURLToPath(new URL('./qa-audit.js', import.meta.url)),
};
const server = http.createServer(async (req, res) => {
  try {
    if (req.headers.host !== '127.0.0.1:4173') {
      res.writeHead(403).end('Loopback QA only');
      return;
    }
    const url = new URL(req.url, origin);
    for (const [, name, value] of fs
      .readFileSync(path.join(root, '.htaccess'), 'utf8')
      .matchAll(/Header always set ([\w-]+) "([^"]+)"/g)) {
      // Prevent every test form from contacting the real delivery provider.
      res.setHeader(
        name,
        value.replaceAll(
          / https:\/\/(?:formspree\.io|www\.googletagmanager\.com|(?:www|region1)\.google-analytics\.com)/g,
          '',
        ),
      );
    }
    res.setHeader('Cache-Control', 'no-store');
    if (req.method === 'POST' && url.pathname === '/__qa__/submit') {
      if (req.headers.origin !== origin) {
        res.writeHead(403).end();
        return;
      }
      let size = 0;
      for await (const chunk of req) {
        size += chunk.length;
        if (size > 3 * 1024 * 1024) {
          res.writeHead(413).end();
          return;
        }
      }
      const scenario = new URL(req.headers.referer ?? origin).searchParams.get(
        'qa-response',
      );
      const cases = {
        success: [200, { ok: true }],
        field: [422, { errors: [{ field: 'email', code: 'TYPE_EMAIL' }] }],
        limited: [429, { errors: [] }],
        challenge: [400, { errors: [{ code: 'RECAPTCHA_FAILED' }] }],
        unavailable: [503, { errors: [] }],
      };
      const [status, body] = cases[scenario] ?? cases.success;
      // Body contents are intentionally neither logged nor stored.
      res
        .writeHead(status, { 'Content-Type': 'application/json' })
        .end(JSON.stringify(body));
      return;
    }
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      res.writeHead(405).end();
      return;
    }
    let file = helpers[url.pathname];
    let status = 200;
    if (!file) {
      const decoded = decodeURIComponent(url.pathname);
      if (decoded.split('/').some((segment) => segment.startsWith('.'))) {
        res.writeHead(404).end();
        return;
      }
      file = path.resolve(root, '.' + decoded);
      if (!file.startsWith(root + path.sep) && file !== root) {
        res.writeHead(404).end();
        return;
      }
      if (fs.existsSync(file) && fs.statSync(file).isDirectory())
        file = path.join(file, 'index.html');
      if (!fs.existsSync(file) || !fs.statSync(file).isFile()) {
        file = path.join(root, '404.html');
        status = 404;
      }
    }
    // Apache inherits the root headers and replaces CSP in each page directory.
    const pageHeaders = path.join(path.dirname(file), '.htaccess');
    if (
      file.startsWith(root + path.sep) &&
      pageHeaders !== path.join(root, '.htaccess') &&
      fs.existsSync(pageHeaders)
    ) {
      for (const [, name, value] of fs
        .readFileSync(pageHeaders, 'utf8')
        .matchAll(/Header always set ([\w-]+) "([^"]+)"/g))
        res.setHeader(
          name,
          value.replaceAll(
            / https:\/\/(?:formspree\.io|www\.googletagmanager\.com|(?:www|region1)\.google-analytics\.com)/g,
            '',
          ),
        );
    }
    const ext = path.extname(file);
    let body = fs.readFileSync(file);
    if (ext === '.html' || ext === '.js') {
      body = body
        .toString()
        .replaceAll(endpoint, '/__qa__/submit')
        .replaceAll(
          'https://www.googletagmanager.com/gtag/js',
          '/__qa__/ga.js',
        );
      if (ext === '.html' && url.searchParams.get('qa-nojs') === '1') {
        // Keep metadata, but omit the site's progressive enhancements for native-form QA.
        body = body.replace(
          /<script\b([^>]*)>[\s\S]*?<\/script>/gi,
          (script, attributes) =>
            /application\/ld\+json/i.test(attributes) ? script : '',
        );
      }
      if (ext === '.html' && url.searchParams.get('qa') !== 'off') {
        body = body.replace(
          '</body>',
          '<script src="/__qa__/axe.js" defer></script><script src="/__qa__/audit.js" defer></script></body>',
        );
      }
    }
    res.writeHead(status, {
      'Content-Type': types[ext] ?? 'application/octet-stream',
    });
    res.end(req.method === 'HEAD' ? undefined : body);
  } catch {
    res.writeHead(500).end('Local QA server error');
  }
});
server.listen(4173, '127.0.0.1', () =>
  console.log(
    `QA preview ${origin} — all RFQ submissions are mocked locally; no data is stored.`,
  ),
);
