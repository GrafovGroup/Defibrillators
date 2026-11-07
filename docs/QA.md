# Phase 1A QA record

Date: 2026-11-06, America/Toronto. Tested using Node 24.22.1, pnpm 11.25.0 and the connected Chromium browser against the actual Astro production output at `http://127.0.0.1:4321`.

## Automated verification

- `pnpm lint`: pass (ESLint).
- `pnpm check`: pass, 18 files, zero errors/warnings/hints.
- `pnpm format:check`: pass.
- `pnpm build`: pass, static root, English, French and 404 outputs.
- `pnpm test`: 10/10 pass. Checks every local HTML link/anchor and referenced asset; landmarks, IDs, alt text and dimensions; reciprocal locale metadata and language switch; eight matching navigation destinations; four service cards and four FAQs per locale; contact addresses; no unconfigured form; prelaunch noindex; logo paths; photo byte budgets; core text contrast; and unchanged master prompt blob.
- `pnpm audit`: zero known vulnerabilities after pinning patched minimatch 11.0.1.
- `pnpm peers check`: no peer dependency issues.

The installed Astro checker requires TypeScript 6; 7 is not currently supported. Astro's astro2tsx/emnapi 1.11.3 needs a matching runtime; an explicit override prevents pnpm from resolving an incompatible 2.0 beta peer. These compatibility decisions are documented in the lockfile/workspace configuration.

## Browser verification

| Viewport width | English                                   | French                                            |
| -------------- | ----------------------------------------- | ------------------------------------------------- |
| 360px          | No horizontal overflow; hero/buttons fit  | No horizontal overflow; expanded French text fits |
| 390px          | No horizontal overflow                    | No horizontal overflow                            |
| 768px          | Two-column hero/cards and mobile menu fit | Two-column hero/cards and mobile menu fit         |
| 1024px         | Desktop navigation and four cards fit     | Desktop navigation and four cards fit             |
| 1440px         | Wide desktop layout fits                  | Wide desktop layout fits                          |

- Visible images loaded at all ten locale/viewport combinations.
- Actual screenshots captured for all ten combinations plus full-page English/French desktop and mobile approval views.
- First keyboard Tab exposes/focuses the skip link with a visible focus ring; Enter moves focus to main.
- Enter opens the native mobile menu; Escape closes it and returns focus to its summary.
- Selecting Accessories navigates to the actual section and closes the mobile menu.
- EN → FR → EN switches to the equivalent homepages.
- Enter opens the residential FAQ; disclosure content is available to the accessibility tree.
- Phone/email destinations inspected; no calls or email messages sent.
- Browser console: no captured warnings or errors during the interaction checks.
- Full-page visual inspection confirms service images, cards, program section, industries, FAQ, contact and footer render correctly.
- Reduced-motion override is present; no animation is required to use the page.

## Limits and approval

This is Phase 1A, not a public launch or complete WCAG conformance certification. Screen-reader/device testing beyond the connected browser, formal French-language review, performance field data, actual phone/mail reception, RFQ backend delivery, supplier verification and real WHC/DNS/SSL configuration remain future work. No live form delivery, checkout, Search Console submission or production deployment is claimed.

The visual reference is implemented in HTML/CSS; exact product/lobby imagery is replaced by licensed real photographic examples. Owner review of screenshots and supplier-approved imagery is still needed. Screenshots and a review report are supplied in the task's output folder; no screenshot is used as the website itself.

## Approved homepage restoration — 7 November 2026

Recovered the original homepage and Logo #4 selection from the owner’s prior conversation. The owner explicitly selected reuse of the exact concept scene as an illustration. Restored the heavy italic vector lockups, terminal pulse, compact header with Home/Accueil, hero composition, six support icons and four compact service cards. Kept the established category routes, forms, location pages and SEO behaviour.

Validation:

- `pnpm verify`: ESLint, Astro/TypeScript (0 diagnostics), Prettier, production build and all **252 tests passed**.
- EN and FR homepages at 360, 390, 768, 1024 and 1440px: no horizontal overflow or broken HTML images; all five SVG artwork frames present. Desktop and phone artwork visually inspected against the recovered reference.
- French RFQ, Toronto location and ZOLL reference pages at 390, 768 and 1440px: no horizontal overflow or broken images after the shared-header update.
- French mobile menu opens with Enter, closes with Escape and returns focus to its summary. The hero quote CTA reaches the French RFQ. The English-to-French switch reaches the paired homepage.
- Fixed a desktop illustration-layer overlap affecting the French secondary CTA; the hero copy now sits above the illustration’s stacking context. Final production screenshots show both actions unobstructed.
- The shared illustration is 136,932 bytes and stays within the existing 150 KB image budget. Text remains live HTML and the logo uses font-independent vector outlines.

Production screenshots in the workspace `outputs/` directory: `restored-homepage-en-desktop.png`, `restored-homepage-fr-desktop.png`, `restored-homepage-fr-mobile.png`. Original reference copies: `approved-homepage-original.png` and `approved-logo-concepts-original.png`.

The owner selected “Keep it on GitHub for now.” This revision is not deployed to WHC. No new Formspree submission or provider configuration change was made during this design correction.

## Competitor-informed catalogue and planning — 7 November 2026

Implemented the decisions recorded in `COMPETITOR-AUDIT.md`: eight model references, model/guidance filters, two-model comparison, parts finder, four package planning paths, optional contextual RFQ fields and answer-led guides with source-backed structured data. The approved homepage, illustration assets and brand SVGs were preserved.

Validation:

- `pnpm verify`: ESLint, Astro/TypeScript (0 diagnostics), formatting, production build and **304 passing automated tests**. The output contains 128 HTML files (126 localized pages, root language selector and 404) and 127 canonical sitemap entries.
- New tests cover all model routes and RFQ values, manufacturer sources, absent-image provenance, native parts enquiry navigation, package/audience context, query allowlists, bounded optional fields, mocked multipart delivery, article/collection schema against visible content, table semantics and complete no-JavaScript source content.
- Tested the production build through a loopback static server applying the generated WHC security headers. Added same-origin `form-action` permission for the native parts-finder GET navigation while retaining Formspree POST and hash-based script restrictions. The CSP header is 7,318 bytes, under the existing 7,500-byte test budget. It is close to that budget; further route growth needs a more granular header strategy rather than an unbounded global hash list.
- Browser: manufacturer filter, unmatched search, reset/focus and video guidance filter; French FRx/combined-supplies enquiry handoff and English switch; residential package routing; request-specific fields hidden/disabled when irrelevant; invalid French participant count and focused error summary; two-model selection with matching column order, duplicate-choice prevention and keyboard scrolling inside the comparison region; guide table-of-contents navigation.
- Catalogue, French parts finder, package planner, ownership guide and new model profile checked at 360, 390, 768, 1024 and 1440px: no page-level horizontal overflow or broken HTML images in those 25 checks. Comparison and RFQ were additionally inspected at 390px. The comparison table intentionally scrolls within its labelled region.
- Approved English desktop and French mobile homepages visually rechecked. The native mobile menu opens with Enter and closes with Escape. No browser console errors were observed during the final checks.
- No runtime dependency was added. The RFQ external JavaScript bundle is 16,347 bytes (6,010 bytes gzip); the smaller page-specific enhancements are emitted inline and covered by generated hashes. This is a build-size observation, not a measured Core Web Vitals score.

Workspace screenshots: `competitor-parts-finder-fr-desktop.png`, `competitor-package-planner-desktop.png`, `competitor-catalogue-desktop.png`, `competitor-budget-guide-fr-mobile.png` in `outputs/`.

Delivery remains GitHub-only. No new live Formspree lead or provider configuration change was made; current optional-field transport is covered by mocked tests, and the established delivery integration remains unchanged. No WHC upload or search indexing submission occurred. Exact supplier/licensing information, stock/pricing, new photo rights and operating service commitments remain launch dependencies. Formal accessibility and French-language review and field performance measurement are not claimed by these checks.

## Direct homepage entry — 7 November 2026

Removed the preliminary language-selection page at the owner's request. The root renders the complete approved English homepage without JavaScript. WHC's configuration redirects `/` and `/index.html` directly to canonical `/en/`, preserving queries. French remains directly available at `/fr/` and through the header switch. The sitemap now contains 126 canonical localized URLs, and homepage x-default points to `/en/`.

The shared `HomePage.astro` keeps root and localized homepages consistent. A single `site.css` import preserves the intended CSS cascade across route bundles; browser verification caught and resolved an ordering regression before delivery. Error-page styling is explicitly scoped to `.error-page`. The owner's preference against mandatory language or introductory screens is recorded in `AGENTS.md` and `DESIGN-SYSTEM.md`.

Validation:

- `pnpm verify`: lint, Astro/TypeScript (0 diagnostics), formatting, production build and **305 passing tests**. The root regression check verifies the complete English homepage and header, French switch, canonical URL and absence of a refresh interstitial. Existing checks cover all links, assets, metadata, sitemap and generated security headers.
- Browser: root displays the approved homepage immediately at 1280px and 390px; no horizontal overflow or broken HTML images. Root → French → English navigation works, and the mobile menu opens with Enter and closes with Escape. The French mobile homepage, desktop catalogue and bilingual 404 were visually checked after the shared CSS adjustment. No captured browser console errors.
- Saved proof: `outputs/direct-homepage-entry.png` in the workspace. Local preview used the generated security headers; Apache redirects were checked in the generated configuration, not on a live WHC server.

Delivery remains GitHub-only. No WHC deployment or live form submission occurred.

## Phase 4 technical QA — 7 November 2026

Completed the accessibility, localization, form-state, links/metadata, build-size and security review. Fixed language-link accessible names, footer target sizes, dark-background keyboard focus, linked form errors, precise bilingual length validation and localized province labels. Added the 404 favicon and replaced an unavailable manufacturer source.

`pnpm verify`: **309 passing tests** with no lint/type/format/build errors. Axe-core 4.14.0 found zero violations across **320 route/viewport checks** after fixes; layered-content contrast requires manual review and is not counted as an automated pass. Dependency audit: zero known advisories. Bilingual success/failure, keyboard menu/skip-link/comparison, parts-to-RFQ context and native application-script fallbacks were verified using the local-only test preview.

See [PHASE-4.md](PHASE-4.md) for complete scope, reproduction commands, evidence, measured transfer sizes and remaining launch dependencies. No live Formspree submission, WHC deployment or indexing activation occurred.

## Phase 5 deployment verification — 7 November 2026

Deployed the verified Phase 4 build after owner authorization. All 171 publicly checked files returned 200 and matched the build. Primary and singular-domain HTTPS, canonical 301 redirects with path/query preservation, custom 404, security headers and archive isolation were verified live. Bilingual synthetic enquiries reached Formspree; notification delivery, consent/context and a synthetic attachment were checked in the provider. Catalogue filters, comparison, parts-to-RFQ language switching and the French mobile keyboard menu passed live smoke checks.

The website remains excluded from indexing pending launch clearance. See [PHASE-5.md](PHASE-5.md) for release identity, exact verification scope, transfer samples, rollback handoff and limits. No claim of field Core Web Vitals, full accessibility conformance or regulatory clearance is made.
