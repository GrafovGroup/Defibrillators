# Defibrillators.ca

Phases 0–3 of `MASTER_PROMPT.md`: bilingual homepages, core product/service pages, RFQs, location planning guides and SEO using the approved modern wordmark and design system. Static Astro output for WHC hosting, with no production Node process.

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

## Implemented routes

- `/`: accessible English/French language choice, usable without JavaScript.
- `/en/` and `/fr/`: complete localized homepages and 62 additional pages per language (126 localized pages).
- Catalogue, eight manufacturer reference profiles, selectable comparison, model-first parts finder and four package planning paths; five accessory categories; four service pages and a service hub; nine industry pages and an industry hub; resources, buying/readiness/ownership-budget guides, about, contact, quote enquiries, FAQs, privacy, terms and accessibility.
- `/404.html`: bilingual not-found page. Configure the host to return this with HTTP 404.
- `/en/locations/` and `/fr/regions/`: a national planning hub, all 13 provinces/territories and Toronto, Montréal, Vancouver and Calgary guides, with locator maps and project-specific briefs. These are not claims of local offices or guaranteed service coverage.
- `/sitemap.xml`: 127 canonical URLs, excluding queries, assets and the error page. Reciprocal hreflang is supplied in HTML.

Navigation, homepage cards and related links reach the localized pages. The language switch retains page identity. The catalogue supports accessible search, manufacturer and guidance-feature filtering, with every profile available without JavaScript. Parts/package context carries into the RFQ; request-specific optional fields support replacement supplies and training. See `docs/ROUTES.md` for the complete route pairs and `docs/COMPETITOR-AUDIT.md` for the six-site audit and implementation decisions.

Product profiles contain manufacturer reference information, not confirmed inventory. Exact Canadian licensing, supply, price, included items and warranty remain unverified. Quote pages provide separate bilingual commercial and residential forms using the owner-supplied Formspree endpoint. Native HTML POST is progressively enhanced with Vanilla JavaScript for localized errors and success feedback. No React, private API key or production Node server is needed. There is no checkout, analytics or client-side storage of enquiry data.

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
- `docs/PHASE-1B.md`, `docs/PHASE-2.md`, `docs/PHASE-3.md`: implementation scope and verification records for each phase.

## Static hosting handoff

`pnpm build` generates `dist/`, including Apache security headers, canonical HTTPS redirects and the custom 404 configuration. Inline script hashes are generated from the actual build. Its contents can be uploaded to a cPanel document root or staging subdirectory configured as the site's root. No adapter, database, worker or persistent Node process is required. Verify WHC access, document root, HTTPS, host redirects and 404 handling in Phase 5. See `docs/PHASE-2.md` and `docs/WHC-DEPLOYMENT.md` for integration and hosting verification.

**This is a prelaunch implementation.** Keep `PUBLIC_SITE_INDEXABLE=false` until launch approval and supplier/regulatory/privacy checks are complete. The build-time switch controls robots metadata and generated `robots.txt` together. The sitemap is prepared but is not advertised in robots.txt or submitted while the switch is off. A crawl block is not access control and cannot guarantee removal of previously discovered URLs; crawlers must be able to read `noindex` for deindexing. Search Console and Bing public verification tokens have optional slots in `.env.example`; no accounts or indexing submissions are claimed. See `docs/PHASE-3.md` for the launch sequence and remaining secondary-domain setup.

## Logo assets

The SVG assets contain outlined text and work without external fonts. The restored wordmark uses skewed Arial Black outlines and an original red pulse/underline. Body text uses locally bundled Inter (SIL Open Font License via Fontsource). Full bilingual lockups are included for off-site use; the website uses the complete localized SVG lockup.

To regenerate logos on a Mac with the licensed system fonts: `node scripts/generate-brand.mjs`. On other systems, set `LOGO_FONT_PATH` and `TAGLINE_FONT_PATH` to licensed Arial Black and Arial Bold font files. The font binaries are not redistributed. Generated SVGs are committed, so regeneration is unnecessary for ordinary development.

## Remaining phases

Supplier verification remains required before model recommendations or sales. Phase 4 is the full accessibility, localization, security and performance review. The Phase 2 WHC deployment already verified primary DNS, SSL and RFQ delivery; Phase 5 still includes final launch/indexing approval and secondary-domain verification. See the audit and current deployment record for remaining inputs.
