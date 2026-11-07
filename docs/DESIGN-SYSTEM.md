# Design system — approved design restoration

The owner’s original homepage and Logo #4 were recovered from the “Launch AED Business” conversation on 2026-11-07. The initial implementation diverged in wordmark weight/pulse placement, artwork, header proportions and the large introduction before the service cards. The restored implementation follows that reference: heavy italic navy/red lettering, a fine underline ending in a pulse beyond `.ca`, compact white masthead, a red Home/Accueil tab, wide lobby hero, six icon-led support items and four compact illustrated cards. The eight established category links remain available in both languages.

The exact approved hero illustration uses `ApprovedScene.astro` to frame the existing source. Following the later imagery request, the four service cards use distinct subject images; see `PAGE_IMAGERY.md`. All navigation, headings, descriptions and actions are semantic HTML. The owner's explicit choice to use the approved scene as an illustration overrides the master prompt's photographic requirement for these homepage visuals only; see `ASSETS.md`. Product reference pages retain their existing licensed photographs and verification notes.

## Homepage entry preference

On 7 November 2026, the owner rejected the preliminary language-selection page and requested that this style never be used again. Visitors must reach the approved English homepage immediately, with French available through the header switch or its direct URL. Do not reintroduce a splash screen, mandatory locale question or introductory gate. This preference is also recorded in `AGENTS.md` for future changes.

## Tokens

| Role           | Token                              |
| -------------- | ---------------------------------- |
| Primary navy   | `#102B4E`                          |
| Deep navy      | `#09213E`                          |
| Action red     | `#D6091B`                          |
| Action hover   | `#B91C2C`                          |
| Canvas         | `#F5F8FB`                          |
| Body text      | `#18324F`                          |
| Secondary text | `#506278`                          |
| Borders        | `#D9E2EB`                          |
| Focus ring     | `#1872CB`, 3px with 5px white halo |
| Container      | Full width, fluid 20–80px gutters  |
| CTA radius     | 8px                                |
| Card radius    | 10px                               |
| Type           | Self-hosted Inter, Arial fallback  |

## Responsive behaviour

Desktop navigation becomes a native expandable menu below 901px. Four service columns become two below 901px and one below 600px. The full-width hero places the selected scene beside the copy on desktop and beneath it on phones. The support strip uses six, three and two columns. French text remains real text, with its own headline line breaks. Buttons keep a minimum 48px height in the hero. The equivalent-page language switch, keyboard menu and existing form behaviour are preserved.

`src/styles/approved-design.css` contains the restored component styles. The single `site.css` entry imports global, page, approved-design and planning styles in that order to keep route bundling from reordering the cascade. Lower homepage sections and the internal page layouts remain intact. Brand and header changes are shared across all locales/routes.

## Brand deliverables

`public/brand/wordmark-{light,dark}.svg` contains outlined heavy italic lettering and the restored pulse position. `logo-{en,fr}-{light,dark}.svg` adds a proportional outlined localized tagline. The shared Logo component uses these complete lockups to avoid divergent HTML tagline spacing. Arial Black is slanted in the SVG; Arial Bold supplies the tagline. Local font files are not distributed. The assets render without installed fonts. `scripts/generate-brand.mjs` regenerates them from the licensed local fonts.

## Deliberate content differences

The mockup's unsupported “Certified Equipment”, “Trusted Brands” and code-compliance claims are not reproduced. The support strip instead describes actual enquiry categories. The hero and service-card illustration notes clarify that model, compatibility and service availability are confirmed with a quote. The original layout is retained without treating generated device markings as product specifications.

## Accessibility approach

Semantic landmarks, one H1, skip link, native disclosure controls, meaningful image alternatives, visible focus styles, reduced-motion overrides and tested palette contrast. The site does not claim a complete WCAG certification. Browser checks and current testing limits are recorded in `QA.md`.

## Phase 1B extensions

Core pages reuse the existing palette, wordmark, fonts, header and footer. Added components include breadcrumbs, split page heroes, accessory/industry directories, manufacturer reference cards, catalogue controls, comparison tables, article layouts and enquiry sidebars. Active navigation follows the current page or parent category.

Page heroes stack below 768px. Article sidebars become full-width beneath content; three-column directories become two columns at tablet widths and one below 481px. Catalogue cards stack on phones. Comparison tables scroll inside a labelled, keyboard-focusable region, without expanding the page. The 2026-11-07 restoration updates the shared logo, header and red accent; core page layouts are preserved.

## Wide containers and alignment — 7 November 2026

The owner requested containers that use the available screen width. Shared containers now fill the viewport between `clamp(20px, 3vw, 80px)` side gutters, without the former 1480px cap. Header, navigation, breadcrumbs, hero content, directories and footer share these edges. Reading-width limits remain on long copy. Program, FAQ and contact sections use equal columns and a shared `clamp(24px, 4vw, 80px)` gap. Responsive image hints scale with their wider containers.

An original, symmetrical eleven-point Canadian maple silhouette with a visible stem replaces the malformed leaf. The small reusable SVG is cached across pages. The coverage link uses the same centred icon/text row as the adjacent utility items, with an 8px gap. Header and footer logos can shrink safely on narrow screens.

`pnpm verify` passes all 541 tests, lint, Astro/TypeScript, formatting, build and transfer budgets. Twenty-seven English/French browser views from 320px to 3840px show no horizontal overflow or detected axe violations, matching container edges, centred maple text and aligned shared columns. Expanded French mobile navigation and the enquiry form were checked. See [qa/layout-browser.json](qa/layout-browser.json).

Published to WHC on 7 November 2026 from commit `078c1129ea7fbd87a8eba9d3d296dad8c1daa594`, after saving a hosting backup. All 430 public files match the build and all 233 page policies match their generated headers. Live French mobile (320px) and English desktop checks confirm shared container edges, centred maple alignment and no horizontal overflow. Redirects, custom 404 responses and HTTPS certificates also pass. See [qa/layout-live.json](qa/layout-live.json) for the release hash and verification record.
