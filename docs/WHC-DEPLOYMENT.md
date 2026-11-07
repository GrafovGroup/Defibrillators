# WHC static hosting handoff

## Current delivery scope

The competitor-informed update remains on GitHub at the owner’s request. No hosting upload or indexing submission is included in this revision. Detailed hosting-account, server and historical operations records are kept outside this repository.

The current build contains 128 HTML files (126 localized pages, an English homepage fallback at the root and a custom 404) and 126 canonical sitemap entries. WHC redirects the root directly to `/en/`; no language-selection screen is used. It includes the restored approved design, location guides, eight manufacturer reference profiles, parts and package planning, and bilingual quote forms. See `COMPETITOR-AUDIT.md` and the latest `QA.md` section for implementation and validation.

## Build and package

Run `pnpm verify` from the repository with the supported Node version. `pnpm build` creates the static `dist/` directory and generates `.htaccess` script hashes from the emitted HTML. No persistent Node process, database or server adapter is required on WHC.

Upload the complete contents of `dist/`, including the hidden `.htaccess` file and all `_astro`, `brand`, `images` and `maps` assets. Keep source code, environment files, internal records and upload archives outside the public document root. Do not combine HTML from one build with security headers from another.

The new parts finder uses a same-origin GET navigation to the quote page. Its updated Content Security Policy allows that navigation and the configured Formspree POST destination. Inline scripts are authorized by generated hashes; do not replace that restriction with unrestricted inline JavaScript. The current header is close to its tested size budget, so future route expansion needs a more granular strategy.

## Hosting preparation

Before an authorized upload, confirm the domain’s dedicated document root in the hosting control panel and keep those account details private. Verify the destination carefully so other hosted websites are unaffected. Keep a private rollback copy of the existing release. Check that the hosting configuration supports the supplied Apache rewrite, header and custom-error directives.

Confirm the authoritative DNS records and valid HTTPS certificate in the hosting account. Configure the primary canonical hostname and the secondary-domain redirect only after ownership and destination are verified. Do not put hosting account identifiers, credentials, server addresses or certificate records into this repository.

## Post-upload verification

Check that `/` and `/index.html` redirect directly to `/en/` with query strings preserved. Check both homepages and their header language switch, a model page, services, location guides, new planning routes, assets and a genuine HTTP 404. Verify HTTPS, canonical host/path redirects, reciprocal language links and security headers using the deployed response, not only the local files.

Exercise model filtering, comparison, parts-to-quote navigation, package selection, language switching and the optional replacement/training fields. Make an explicitly labelled synthetic form submission only when authorized for the deployment check, then verify its receipt and routing in the configured provider. Check bilingual validation, consent, uploads and hosted anti-spam fallback. Do not claim notification delivery from a browser success message alone.

## Indexing gate

Keep `PUBLIC_SITE_INDEXABLE=false` until launch is approved and supplier, regulatory, privacy and operating requirements are resolved. The build switch controls robots metadata and robots.txt together. Before enabling it, review the exact product information, service commitments, canonical routes and sitemap, and configure public Search Console/Bing verification tokens if supplied. Verify the deployed indexing controls before submitting the sitemap.

A crawl block is not access control and cannot guarantee removal of previously discovered URLs. Crawlers need access to read a noindex directive when deindexing is required. No search-engine submission or eligibility guarantee is implied by generating a sitemap.
