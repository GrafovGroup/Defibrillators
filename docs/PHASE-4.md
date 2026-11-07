# Phase 4 — technical QA and fixes

Completed 7 November 2026 against the approved design and the owner's direct-homepage preference. Delivery is GitHub-only. This is a technical QA record, not a declaration of regulatory clearance, full WCAG conformance or public-launch approval.

## Fixes

- Language links now announce “EN — English” and “FR — Français”, retaining the visible text in their accessible names for speech input.
- Footer links have at least 28px height. The prior contact email link was just below the 24px target threshold reported by axe.
- Keyboard focus uses a blue outline with a white halo. Manual contrast calculation found the former blue-only ring insufficient against the primary navy background. The two colours keep focus visible on both light and dark surfaces.
- Installation and maintenance fields now associate their inline errors through `aria-describedby`. Length errors give the actual minimum and maximum in English/French, and empty required selections keep the required-field message.
- Province selectors show full localized names while retaining stable two-letter submission values.
- The 404 page includes the existing favicon. A ZOLL AED 3 reference link that repeatedly returned 502 was replaced by a verified official manufacturer page supporting the same reference facts; Canadian licensing and supply remain unverified.
- Added regression checks for accessible references, local-only assets, prohibited QA/private files in production, and HTML/CSS/JavaScript transfer budgets. The local accessibility and simulated-form preview is reusable and excluded from the deploy artifact.

## Verification

`pnpm verify` runs lint, Astro/TypeScript, formatting, production build and **309 passing tests**. There are 128 HTML files, 126 localized canonical pages and 126 sitemap entries. `pnpm audit --json` reports zero known advisories; `pnpm peers check` reports no peer issues. The added axe-core 4.14.0 package is development-only.

### Accessibility and responsive layouts

- **320 page/viewport checks:** every generated HTML page at 390 and 1280px, plus 16 representative bilingual routes at 360, 768, 1024 and 1440px. Axe found zero violations after fixes. No document-level horizontal overflow or broken loaded HTML images was detected. The full local asset/link suite also passes.
- Coverage includes home, catalogue, RFQ, parts, packages, comparison, guides, city/province pages, services, industry pages, legal/informational pages and 404. Route/viewport coverage is recorded in [the browser report](qa/phase-4-browser.json).
- Some layered elements return **incomplete** automated colour-contrast results. Shared palette pairs, image-caption overlays and representative home/guide/form screens were inspected manually. This is not an exhaustive visual or assistive-technology certification.
- Keyboard checks: first Tab reaches the visible skip link; Enter moves focus to main; mobile menu opens with Enter and closes with Escape, returning focus; the open menu has no axe violations; comparison columns retain selected order and the labelled region scrolls with arrow keys.
- EN/FR switches preserve page identity. Parts selection and safe public query context survive the French-to-English RFQ switch. The approved logo, hero, service illustrations and direct homepage entry are retained.

### Forms and localization

- Four success scenarios cover English/French and business/residential requests. Success is announced/focused, fields reset and consent clears.
- Eight provider-failure scenarios cover both languages: field validation, 429 rate limiting, hosted verification and 503 unavailability. Errors are localized/focused, submission re-enables and the verification action appears only when needed.
- Synthetic name, message, province and consent survive failures; retry remains available. Browser tooling redacts email values in DOM inspections, so the retention checks do not claim an exact email-value comparison.
- Required-field error summaries link to controls. The French invalid form also passes an accessibility check. Native browser validation and POST work with application scripts omitted; catalogue references remain available without enhancement scripts.
- All submissions in this phase used a **local mock**. No new live Formspree lead or provider configuration change occurred. Phase 2's verified real delivery remains historical evidence; the deployed release needs a fresh end-to-end check in Phase 5.
- Automated comparison found no identical long English/French main-content blocks. Form labels, province names, validation and success/failure copy were reviewed. Formal French editorial/legal review remains a launch dependency.

### Links, metadata and performance

All internal links, anchors, image/script/style files, canonical/hreflang pairs, unique localized metadata, JSON-LD content and sitemap destinations pass the existing tests. Of 23 external destinations, 19 initially returned HTTP 200; three more passed a normal GET after rejecting or failing HEAD. The remaining ZOLL source was replaced by a manufacturer URL returning 200. See [the link report](qa/phase-4-links.json). External availability can change after this check.

The largest HTML output is about **41.6 KB raw / 8.8 KB gzip**. External JavaScript peaks at **6.1 KB gzip**, and shared CSS at **8.3 KB gzip**. The approved illustration remains 136,932 bytes; all photographic/illustrative WebP assets stay below the existing 150 KB budget. Fonts and runtime assets are self-hosted, images have dimensions, and below-the-fold images use lazy loading where already implemented.

Regression limits are 12 KB gzip HTML, 12 KB gzip linked CSS and 10 KB gzip external JavaScript per page. These are build-size measurements, not measured Core Web Vitals or Lighthouse scores. Production-network LCP/INP/CLS, compression and caching must be measured on WHC after deployment.

### Security and deployment boundary

The production CSP, safe JSON-LD serialization, source/query allowlists, native form endpoint, consent version, honeypot, upload validation and noindex controls pass checks. No new runtime service, analytics, client-side enquiry storage or private credential was introduced. Provider-side validation and spam handling still require operator review of incoming leads; browser validation is not a security boundary.

The local QA server binds only to loopback, rejects other Host values, blocks private paths, uses generated headers, replaces form delivery with a same-origin simulation, removes external Formspree permission from its test CSP, and discards request bodies without logging or storage. Checks confirmed expected 404, 403 and simulated 429 responses. It does not emulate Apache redirects, DNS or TLS. Never deploy the QA server or serve the repository itself.

## Repeating local QA

```sh
pnpm build
pnpm qa:preview
```

Open the printed loopback address. The audit panel at the page bottom runs on load and can rerun after opening menus or exposing errors. Only synthetic data should be used.

- `?qa-response=success`, `field`, `limited`, `challenge` or `unavailable` selects a simulated response on RFQ pages.
- `?qa-nojs=1` omits application JavaScript while keeping the local audit helper; it tests native form/catalogue fallbacks, not an entirely script-disabled browser.
- `?qa=off` omits the audit helper. Form delivery remains simulated.

Production builds never include these helpers. Stop the preview after testing. Workspace evidence includes `phase4-homepage-keyboard-focus.png`, `phase4-french-form-recovery-mobile.png` and the detailed local JSON audit in `outputs/`.

## Next phase and remaining dependencies

Phase 5 is deployment and live verification. The owner's GitHub-only instruction remains in effect. Deployment needs a fresh build/upload, live canonical/root/secondary-domain redirects, DNS/TLS/security-header/404 checks, controlled live RFQ verification and production performance checks. Keep `PUBLIC_SITE_INDEXABLE=false` until launch is explicitly approved.

Before claiming production readiness, confirm supplier arrangements and exact Canadian product licensing, any applicable establishment-licence requirements, operating service/training commitments, privacy retention/operator details and relevant legal/localization obligations with qualified advisers. Real-device and assistive-technology review remains separate from the automated checks recorded here.

References: [WCAG 2.2](https://www.w3.org/TR/WCAG22/), [axe-core API and testing limits](https://github.com/dequelabs/axe-core/blob/develop/doc/API.md), [updated ZOLL AED 3 reference](https://www.zoll.com/en-us/products/emergency-care/aeds/zoll-aed-3).
