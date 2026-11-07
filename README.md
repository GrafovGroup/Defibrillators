# Defibrillators.ca

Phase 0, Phase 1A, Phase 1B and Phase 2 implementation of `MASTER_PROMPT.md`: bilingual homepages and core product, accessory, service, industry and information pages using the approved modern wordmark and design system. Static Astro output for conventional hosting, with no production Node process.

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
- `/en/` and `/fr/`: complete localized homepages and 35 additional pages per language (72 localized pages).
- Catalogue, two manufacturer reference profiles and comparison; five accessory categories; four service pages and a service hub; nine industry pages and an industry hub; resources, buying/readiness guides, about, contact, quote enquiries, FAQs, privacy, terms and accessibility.
- `/404.html`: bilingual not-found page. Configure the host to return this with HTTP 404.

Navigation, homepage cards and related links reach the localized pages. The language switch retains page identity. The catalogue supports accessible search, manufacturer, environment-verification and product-type filtering, with both profiles available without JavaScript. See `docs/ROUTES.md` for the complete route pairs.

Product profiles contain manufacturer reference information, not confirmed inventory. Exact Canadian licensing, supply, price, included items and warranty remain unverified. Quote pages provide separate bilingual commercial and residential forms using the owner-supplied Formspree endpoint. Native HTML POST is progressively enhanced with Vanilla JavaScript for localized errors and success feedback. No React, private API key or production Node server is needed. There is no checkout, analytics or client-side storage of enquiry data.

## Source map

- `src/data/content.ts`: typed English and Canadian French copy and contact configuration.
- `src/data/routes.ts`, `pages.ts`, `products.ts`: typed localized routes, core page content and manufacturer references.
- `src/pages/[lang]/[...slug].astro`: shared static page layouts.
- `src/components/`: shared navigation, branding, cards, catalogue, comparison, breadcrumbs, enquiry actions and SEO.
- `src/layouts/Page.astro`: document shell and shared styles.
- `src/styles/global.css`, `pages.css`: approved design tokens and responsive components.
- `src/scripts/catalogue-filter.ts`: accent-insensitive search matching.
- `public/brand/`: path-based SVG wordmarks, bilingual light/dark logo lockups and favicon.
- `public/images/`: optimized licensed photographic examples; see `docs/ASSETS.md`.
- `tests/`: built-output integration and catalogue-filter checks.
- `docs/PHASE-0.md`, `docs/DESIGN-SYSTEM.md`, `docs/QA.md`: original audit, design and Phase 1A verification.
- `docs/PHASE-1B.md`: current scope, source verification, QA and handoff.

## Static hosting handoff

`pnpm build` generates `dist/`, including Apache security headers, canonical HTTPS redirects and the custom 404 configuration. Inline script hashes are generated from the actual build. Its contents can be uploaded to a cPanel document root or staging subdirectory configured as the site's root. No adapter, database, worker or persistent Node process is required. Verify WHC access, document root, HTTPS, host redirects and 404 handling in Phase 5. See `docs/PHASE-2.md` and `docs/WHC-DEPLOYMENT.md` for integration and hosting verification.

**This is a prelaunch implementation.** Robots and page metadata intentionally prevent indexing. Remove both guards only after launch approval and the documented supplier/regulatory checks. Phase 5 must configure the secondary domain's permanent redirect, canonical host/HTTPS redirects, cache headers, security headers, custom 404, and XML sitemap/indexing. A root language selector preserves equal access to French and English.

## Logo assets

The SVG assets contain outlined text and work without external fonts. The original wordmark uses Arial Bold Italic outlines and an original red pulse/underline. Body text uses locally bundled Inter (SIL Open Font License via Fontsource). Full bilingual lockups are included for off-site use; the website uses the wordmark plus real, localized tagline text.

To regenerate logos on a Mac with the licensed system fonts: `node scripts/generate-brand.mjs`. On other systems, set `LOGO_FONT_PATH` and `TAGLINE_FONT_PATH` to licensed Arial Bold Italic and Arial Bold font files. The font binaries are not redistributed. Generated SVGs are committed, so regeneration is unnecessary for ordinary development.

## Remaining phases

Supplier verification remains required before model recommendations or sales. Phase 3: substantive location architecture and expanded SEO. Phase 4: full site QA. Phase 5: verified hosting deployment. See the audit for inputs required before these phases or public launch.
