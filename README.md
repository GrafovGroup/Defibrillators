# Defibrillators.ca

Phases 0–5 of `MASTER_PROMPT.md`: bilingual homepages, core product/service pages, RFQs, location planning guides, SEO, technical QA and WHC deployment using the approved modern wordmark and design system. Static Astro output, with no production Node process. The verified release is live at [Defibrillators.ca](https://defibrillators.ca/), with the approved design preserved. The owner authorized Google/Bing indexing and national city/product/service expansion on 7 November 2026. See `docs/EXPANSION-AND-SEARCH.md` for the current release and search-submission record, and `docs/PHASE-5.md` for the original hosting verification.

The current site has no analytics popup or Google Analytics tracking. The bilingual forms remain active. Search discovery uses crawlable static pages, the canonical sitemap and a post-deployment IndexNow command. See [docs/INDEXNOW.md](docs/INDEXNOW.md) for the release workflow and [docs/ANALYTICS-REMOVAL-AND-DISCOVERY.md](docs/ANALYTICS-REMOVAL-AND-DISCOVERY.md) for the analytics removal.

The homepage and shared logo/header were restored to the owner’s selected mockup on 7 November 2026. Both homepages now use the exact owner-approved concept artwork as an illustration, with real HTML content and controls. See `docs/DESIGN-SYSTEM.md` and `docs/ASSETS.md` for the reference and scope.

## Development

Use Node 22.13+ (tested on 24.22.1) and pnpm 11.25.0.

```sh
pnpm install --frozen-lockfile
pnpm dev
pnpm verify
pnpm preview
```

`pnpm verify` runs ESLint, Astro/TypeScript checking, formatting, production build and Node integration tests against the generated HTML. TypeScript is intentionally pinned to 6.0.3 because the installed Astro checker and TypeScript ESLint do not support TypeScript 7. All direct dependencies and the lockfile are pinned. The workspace pins the emnapi runtime matching Astro’s checker and patched minimatch 11.0.1; the full suite passes with these overrides. Set `ASTRO_TELEMETRY_DISABLED=1` to disable Astro telemetry.

For local accessibility and form QA after a build, use `pnpm qa:preview`. It runs axe-core in the browser and simulates every RFQ submission locally, without sending or storing leads. It is a development tool, excluded from `dist/`; never deploy it. Test modes and evidence are documented in `docs/PHASE-4.md`.

## Implemented routes

- `/`: opens the English homepage directly. WHC redirects to `/en/`; other static hosts render the same complete homepage without JavaScript or a preliminary screen. The header retains the EN/FR switch. See `AGENTS.md` for the owner's permanent preference against language-selection gates.
- `/en/` and `/fr/`: complete localized homepages and 116 additional pages per language (234 localized pages).
- Catalogue, eight manufacturer reference profiles, selectable comparison, model-first parts finder and four package planning paths; five accessory categories; four service pages and a service hub; nine industry pages and an industry hub; resources, buying/readiness/ownership-budget guides, about, contact, quote enquiries, FAQs, privacy, terms and accessibility.
- Twelve focused product/service pages: adult pads, paediatric pads/keys, combined packs, trainers, carrying cases, outdoor cabinets, site assessments, cabinet mounting, readiness checks, expiry tracking, post-use replenishment and asset inventories.
- `/404.html`: bilingual not-found page. Configure the host to return this with HTTP 404.
- `/en/locations/` and `/fr/regions/`: a national planning hub, all 13 provinces/territories and 45 city/metropolitan guides covering all 41 Statistics Canada 2021 CMAs plus the remaining provincial/territorial capitals, with locator maps and project-specific briefs. These are not claims of local offices or guaranteed service coverage.
- `/sitemap.xml`: 234 canonical URLs, excluding the redirected root, queries, assets and the error page. Reciprocal hreflang is supplied in HTML.

Navigation, homepage cards and related links reach the localized pages. The language switch retains page identity. The catalogue supports accessible search, manufacturer and guidance-feature filtering, with every profile available without JavaScript. City, service, part and package context carries into the RFQ; request-specific optional fields support replacement supplies and training. See `docs/ROUTES.md` for the complete route pairs and `docs/COMPETITOR-AUDIT.md` for the six-site audit and implementation decisions.

Product profiles contain manufacturer reference information, not confirmed inventory. Exact Canadian licensing, supply, price, included items and warranty remain unverified. Quote pages provide separate bilingual commercial and residential forms using the owner-supplied Formspree endpoint. Native HTML POST is progressively enhanced with Vanilla JavaScript for localized errors and success feedback. No React, private API key or production Node server is needed. There is no checkout or client-side storage of enquiry data. There is no external analytics tag or consent popup.

## Source map

- `src/data/content.ts`: typed English and Canadian French copy and contact configuration.
- `src/data/routes.ts`, `pages.ts`, `products.ts`: typed localized routes, core page content and manufacturer references.
- `src/data/location-routes.ts`, `locations.ts`: location hierarchy, regional briefs, FAQs and province context for RFQs.
- `src/pages/[lang]/[...slug].astro`: shared static page layouts.
- `src/components/`: shared navigation, branding, cards, catalogue, comparison, breadcrumbs, enquiry actions and SEO.
- `src/layouts/Page.astro`: document shell and shared styles.
- `src/styles/global.css`, `pages.css`: approved design tokens and responsive components.
- `src/scripts/catalogue-filter.ts`: accent-insensitive search matching.
- `public/brand/`: path-based SVG wordmarks, bilingual light/dark logo lockups and favicon.
- `public/images/`: optimized licensed photographic examples; see `docs/ASSETS.md`.
- `public/maps/`: generalized locator SVGs with Statistics Canada/geoBoundaries provenance; regenerated with `scripts/location-maps.py`.
- `src/lib/structured-data.ts`, `site-config.ts`, `sitemap.ts`: factual JSON-LD, indexing/verification configuration and canonical sitemap.
- `tests/`: built-output integration and catalogue-filter checks.
- `docs/PHASE-0.md`, `docs/DESIGN-SYSTEM.md`, `docs/QA.md`: original audit, design and Phase 1A verification.
- `docs/PHASE-1B.md`, `docs/PHASE-2.md`, `docs/PHASE-3.md`, `docs/PHASE-4.md`, `docs/PHASE-5.md`: implementation scope and verification records for each phase.

## Static hosting handoff

`pnpm build` generates `dist/`, including Apache security headers, canonical HTTPS redirects and the custom 404 configuration. Inline script hashes are generated per page directory from the actual build. Upload every nested `.htaccess` as well as the root file. Upload the complete build to the verified dedicated website root. No adapter, database, worker or persistent Node process is required. Phase 5 verified live HTTPS, primary and secondary host redirects, 404 handling, exact deployed-file content and real Formspree delivery. See `docs/PHASE-5.md` and `docs/WHC-DEPLOYMENT.md` for the release record and rollback procedure.

**Search launch is authorized.** Production defaults in `src/data/search-launch.ts` enable indexing and retain the account-provided Google/Bing public verification tags. `PUBLIC_SITE_INDEXABLE=false` remains available for staging builds; empty verification overrides intentionally omit a tag. Do not copy `.env.example` into a production environment unchanged. This changes discovery settings, not the verification status of products, inventory or operating commitments. Submission is distinct from indexing and is recorded only after observing the webmaster tools result. See `docs/EXPANSION-AND-SEARCH.md`.

## Logo assets

The SVG assets contain outlined text and work without external fonts. The restored wordmark uses skewed Arial Black outlines and an original red pulse/underline. Body text uses locally bundled Inter (SIL Open Font License via Fontsource). Full bilingual lockups are included for off-site use; the website uses the complete localized SVG lockup.

To regenerate logos on a Mac with the licensed system fonts: `node scripts/generate-brand.mjs`. On other systems, set `LOGO_FONT_PATH` and `TAGLINE_FONT_PATH` to licensed Arial Black and Arial Bold font files. The font binaries are not redistributed. Generated SVGs are committed, so regeneration is unnecessary for ordinary development.

## Launch dependencies

Release-specific test counts and browser evidence are recorded in the relevant documents under `docs/qa/`; run `pnpm verify` for the current implementation. Phase 5 verified live DNS, SSL, redirects, file integrity, bilingual enquiries, compression and core interactions for the preceding release. These checks are not full accessibility certification or field Core Web Vitals measurements. Supplier/regulatory/privacy verification, operating commitments, formal French review and assistive-technology testing remain business-review items. The owner has explicitly authorized search submission; preserve indexable production settings and factual, limited product/service claims. See `docs/EXPANSION-AND-SEARCH.md` for the current deployment and submission status.
