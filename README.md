# Defibrillators.ca

Phase 0 audit and Phase 1A bilingual homepage, implementing `MASTER_PROMPT.md` and the approved modern wordmark/homepage direction. Static Astro output for conventional hosting, with no production Node process.

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
- `/en/` and `/fr/`: complete localized homepages, shared design/components, matching navigation, phone and email enquiry links.
- `/404.html`: bilingual not-found page. Configure the host to return this with HTTP 404.

Navigation targets real sections on each homepage. “Shop AEDs” leads to the AED category introduction; the full catalogue belongs to Phase 1B. Quote buttons lead to a contact section with an explicitly labelled email-app link. There is no submission backend, checkout, tracking, cookie storage or claimed email delivery in this phase.

## Source map

- `src/data/content.ts`: typed English and Canadian French copy and contact configuration.
- `src/components/`: Header, LocaleSwitch, Logo, Hero, ServiceCard, IndustryGrid and Footer.
- `src/layouts/Page.astro`: document metadata and locale alternates.
- `src/styles/global.css`: responsive design tokens and components.
- `public/brand/`: path-based SVG wordmarks, bilingual light/dark logo lockups and favicon.
- `public/images/`: optimized licensed photographic examples; see `docs/ASSETS.md`.
- `tests/site.test.mjs`: built-output integration checks.
- `docs/PHASE-0.md`, `docs/DESIGN-SYSTEM.md`, `docs/QA.md`: audit, design and verification record.

## Static hosting handoff

`pnpm build` generates `dist/`. Its contents can be uploaded to a cPanel document root or staging subdirectory configured as the site's root. No adapter, database, worker or persistent Node process is required. Verify WHC access, document root, HTTPS, host redirects and 404 handling in Phase 5. No deployment has been performed.

**This is a prelaunch implementation.** Robots and page metadata intentionally prevent indexing. Remove both guards only after launch approval and the documented supplier/regulatory checks. Phase 5 must configure the secondary domain's permanent redirect, canonical host/HTTPS redirects, cache headers, security headers, custom 404, and XML sitemap/indexing. A root language selector preserves equal access to French and English.

## Logo assets

The SVG assets contain outlined text and work without external fonts. The original wordmark uses Arial Bold Italic outlines and an original red pulse/underline. Body text uses locally bundled Inter (SIL Open Font License via Fontsource). Full bilingual lockups are included for off-site use; the website uses the wordmark plus real, localized tagline text.

To regenerate logos on a Mac with the licensed system fonts: `node scripts/generate-brand.mjs`. On other systems, set `LOGO_FONT_PATH` and `TAGLINE_FONT_PATH` to licensed Arial Bold Italic and Arial Bold font files. The font binaries are not redistributed. Generated SVGs are committed, so regeneration is unnecessary for ordinary development.

## Remaining phases

Phase 1B: verified catalogue and core pages. Phase 2: secure RFQs and tested delivery. Phase 3: substantive location architecture and expanded SEO. Phase 4: full site QA. Phase 5: verified hosting deployment. See the audit for inputs required before these phases or public launch.
