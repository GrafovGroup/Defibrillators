# WHC static hosting

Build with `pnpm verify`, then upload the **contents** of `dist/` (including `.htaccess`) to the document root configured for `defibrillators.ca`. Do not upload source, `node_modules`, `.git`, credentials or customer submissions. Build locally; the live site needs no Node process or database.

The WHC Pro account's primary domain is a separate site. Defibrillators.ca was added with its own document root named `defibrillators.ca`, not the primary domain's `public_html`. The new root initially contained only the standard `cgi-bin` directory. Keep that directory and any certificate-validation files intact.

Before replacing an existing release, archive the current site outside the public document root. Extract the new build into the intended directory and retain the previous release for rollback. Avoid a nested `dist/` folder. Remove or move the upload archive outside the public root after extraction.

Point the website's A record at the shared web IP shown in cPanel, not the separate SFTP host IP. Preserve the existing Forward Email MX/TXT records. Keep `www` following the apex. Do not replace nameservers without copying the full mail and other DNS configuration.

Run AutoSSL for the apex and www after DNS resolves to WHC. Never bypass browser certificate warnings. The supplied `.htaccess` redirects to canonical HTTPS, denies directory listing and framing, adds browser security headers and returns `/404.html` with HTTP 404. Build-time SHA-256 hashes allow only the static inline scripts Astro actually generated; Formspree is the only external form/connect destination.

Verify the live root language selector, both homepages, a product/service route, both RFQ pages, static assets, 404 status, HTTPS/host redirects and a labelled test submission. Confirm receipt in Formspree and the configured inbox. The site remains noindex until the operator approves launch after supplier/regulatory/privacy review. Do not describe DNS, SSL or notification delivery as complete until observed.
