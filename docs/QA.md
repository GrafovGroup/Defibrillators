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
