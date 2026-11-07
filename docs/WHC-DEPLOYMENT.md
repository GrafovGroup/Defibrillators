# WHC static hosting

## Deployment record — 7 November 2026

The Phase 2 build from commit `fe17a85cfee020d600590ef314e45bc096278949` was uploaded and extracted into the separate `defibrillators.ca` document root on WHC Pro. The upload archive was moved to the account home directory outside the public document root. The primary site's files were not changed.

The apex A record now points to the cPanel shared web address `51.161.57.68` with a 300-second TTL. Both authoritative and local DNS were checked. The existing `www` CNAME, nameservers and Forward Email MX/TXT records were preserved. The HTTP response was verified to redirect to canonical HTTPS and include the generated security headers.

After the owner approved the certificate terms, the free Let's Encrypt certificate was issued through cPanel's SSL/TLS Wizard. cPanel confirms AutoSSL domain validation for both the apex and `www`, with expiry on 5 February 2027 and automatic renewal enabled. Public HTTPS checks passed normal certificate validation for both hostnames.

The language selector, English/French homepages, both quote forms, service pages and generated JavaScript/CSS returned HTTP 200. Both HTTP and `www` redirect to the canonical HTTPS host with HTTP 301. A missing page and the removed public upload-archive path returned HTTP 404. The approved homepage was visually checked on the live domain; the English quote form's JavaScript validation and focused error summary work under the deployed Content Security Policy. A labelled synthetic submission from the live WHC domain received the confirmed Formspree success state and reset the form. The French catalogue filter and product detail page were also checked, with no browser errors reported. Both homepages and RFQ pages matched the tested local build byte for byte.

Formspree confirmed a bilingual form test in its Inbox and marked the notification delivered. A separate synthetic PNG attachment was accepted. The implementation passed all 173 automated checks, plus responsive form and error-focus checks.

## Deployment procedure

Phase 3 version 0.4.0 is ready as a separate static release. Its build adds 36 location pages, locator maps, `/sitemap.xml`, generated robots.txt and updated CSP hashes/redirect rules. The hosting browser connection was unavailable during that implementation; the live Phase 2 deployment above has not been replaced. Retain the existing private Phase 2 archive for rollback, extract the complete new build into the same document root, and move the new archive outside the public root. In addition to the checks below, verify both location hubs, a nested city route, the sitemap, `index.html` canonicalization and the updated RFQ province context. Keep the indexing switch false until launch approval.

Build with `pnpm verify`, then upload the **contents** of `dist/` (including `.htaccess`) to the document root configured for `defibrillators.ca`. Do not upload source, `node_modules`, `.git`, credentials or customer submissions. Build locally; the live site needs no Node process or database.

The WHC Pro account's primary domain is a separate site. Defibrillators.ca was added with its own document root named `defibrillators.ca`, not the primary domain's `public_html`. The new root initially contained only the standard `cgi-bin` directory. Keep that directory and any certificate-validation files intact.

Before replacing an existing release, archive the current site outside the public document root. Extract the new build into the intended directory and retain the previous release for rollback. Avoid a nested `dist/` folder. Remove or move the upload archive outside the public root after extraction.

Point the website's A record at the shared web IP shown in cPanel, not the separate SFTP host IP. Preserve the existing Forward Email MX/TXT records. Keep `www` following the apex. Do not replace nameservers without copying the full mail and other DNS configuration.

Run AutoSSL for the apex and www after DNS resolves to WHC. Never bypass browser certificate warnings. The supplied `.htaccess` redirects to canonical HTTPS, denies directory listing and framing, adds browser security headers and returns `/404.html` with HTTP 404. Build-time SHA-256 hashes allow only the static inline scripts Astro actually generated; Formspree is the only external form/connect destination.

Verify the live root language selector, both homepages, a product/service route, both RFQ pages, static assets, 404 status, HTTPS/host redirects and a labelled test submission. Confirm receipt in Formspree and the configured inbox. The site remains noindex until the operator approves launch after supplier/regulatory/privacy review. Do not describe DNS, SSL or notification delivery as complete until observed.
