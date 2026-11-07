# WHC static hosting handoff

## Current delivery scope

The national city/product/service expansion is live on WHC as of 7 November 2026, including the direct English homepage and the restored approved design. The deployment matched all 279 checked public files and all 233 HTML security policies. Both forms and primary/secondary-domain redirects have earlier live verification evidence in [PHASE-5.md](PHASE-5.md). The expansion includes the owner-authorized search launch; see [EXPANSION-AND-SEARCH.md](EXPANSION-AND-SEARCH.md) for its verification and search-submission record. Detailed hosting-account, server and historical operations records are kept outside this repository.

The current expansion build contains 234 HTML files (232 localized pages, an English homepage fallback at the root and a custom 404) and 232 canonical sitemap entries. WHC redirects the root directly to `/en/`; no language-selection screen is used. It includes the restored approved design, 45 city/metropolitan guides, all 13 provinces/territories, eight manufacturer reference profiles, parts and package planning, twelve focused offerings and bilingual quote forms. See `EXPANSION-AND-SEARCH.md` for the latest implementation, validation and deployment status.

## Build and package

Run `pnpm verify` from the repository with the supported Node version. `pnpm build` creates the static `dist/` directory and generates `.htaccess` script hashes from the emitted HTML. No persistent Node process, database or server adapter is required on WHC.

Upload the complete contents of `dist/`, including the root and every nested hidden `.htaccess` file and all `_astro`, `brand`, `images` and `maps` assets. Keep source code, environment files, internal records and upload archives outside the public document root. Do not combine HTML from one build with security headers from another.

The parts finder uses a same-origin GET navigation to the quote page. Content Security Policy allows that navigation and the configured Formspree POST destination. Inline scripts are authorized by generated hashes; do not replace that restriction with unrestricted inline JavaScript. The expansion emits 233 `.htaccess` files: the root policy and a policy in each localized page directory. Each page policy includes its own scripts and the root/404 fallback scripts, keeping every response below the existing 7.5 KB header budget. Upload these files together and verify each deployed HTML response against its expected policy.

## Hosting preparation

Before an authorized upload, confirm the domain’s dedicated document root in the hosting control panel and keep those account details private. Verify the destination carefully so other hosted websites are unaffected. Keep a private rollback copy of the existing release. Check that the hosting configuration supports the supplied Apache rewrite, header and custom-error directives.

Confirm the authoritative DNS records and valid HTTPS certificate in the hosting account. Configure the primary canonical hostname and the secondary-domain redirect only after ownership and destination are verified. Do not put hosting account identifiers, credentials, server addresses or certificate records into this repository.

The current primary and singular domains use the same dedicated website root. The singular domain's apex, `www` and HTTPS service record were corrected without replacing nameservers or mail records. Its certificate covers apex and `www`; the build's canonical redirect preserves paths and query strings. Avoid re-enabling a separate registrar forwarding service over these records.

## Rollback

A pre-deployment archive of the previous website and the uploaded release archive are retained in the hosting account outside every public document root. Their exact locations are in the private operations record. Preserve certificate-validation directories and hosting-managed files during any restoration.

To roll back, extract the chosen complete archive in a private staging directory, inspect its root structure, then restore that release's HTML, assets and matching root and nested `.htaccess` files to the dedicated website root. Keep a copy of the release being replaced. Remove obsolete application files only after identifying them against the two manifests; do not remove hosting-managed directories or other sites. Repeat HTTPS, redirects, 404, file-integrity and bilingual form checks. DNS rollback is separate from file rollback; use the saved private DNS snapshot and WHC history if needed, preserving mail configuration.

## Post-upload verification

Check that `/` and `/index.html` redirect directly to `/en/` with query strings preserved. Check both homepages and their header language switch, a model page, services, location guides, new planning routes, assets and a genuine HTTP 404. Verify HTTPS, canonical host/path redirects, reciprocal language links and security headers using the deployed response, not only the local files.

Exercise model filtering, comparison, parts-to-quote navigation, package selection, language switching and the optional replacement/training fields. Make an explicitly labelled synthetic form submission only when authorized for the deployment check, then verify its receipt and routing in the configured provider. Check bilingual validation, consent, uploads and hosted anti-spam fallback. Do not claim notification delivery from a browser success message alone.

## Indexing configuration

The owner explicitly authorized Google and Bing submission on 7 November 2026. Production defaults in `src/data/search-launch.ts` are indexable and include public ownership-verification tags. Use `PUBLIC_SITE_INDEXABLE=false` for staging only. The switch controls page metadata and robots.txt together. Verify deployed crawlability, canonicals, all 232 sitemap entries and verification tags before submitting. Product licensing, supply and service statements must remain factual regardless of indexing authorization.

A crawl block is not access control and cannot guarantee removal of previously discovered URLs. Crawlers need access to read a noindex directive when deindexing is required. No search-engine submission or eligibility guarantee is implied by generating a sitemap.
