# Phase 0 — repository and readiness audit

> Historical audit. The owner requested a visual correction on 2026-11-07; see `DESIGN-SYSTEM.md` for the restored design and explicit permission to use the original illustration.

Audit date: 2026-11-06 (America/Toronto).

## Baseline

- Repository: https://github.com/GrafovGroup/Defibrillators
- Audited main commit: `df7ef7af27e28f7a536e3deaa6b9ce46cb6d568f`.
- The repository contained only `MASTER_PROMPT.md`; no application, assets, deployment configuration, tests, secrets, package manifest or existing implementation to preserve.
- `MASTER_PROMPT.md` is unchanged. Its blob SHA is checked by the integration suite.
- The approved homepage image was recovered from the prior project chat. Its layout and modern wordmark guide the implementation; it is not shipped as a flattened page or product photograph.
- No WHC/cPanel access, DNS configuration, mail-delivery credentials, supplier catalogue, dealership verification or training-partner documentation was supplied.

## Architecture decision

Astro static output with TypeScript, shared components and a typed bilingual content module. `/en/` and `/fr/` are fully generated HTML. Only a small progressive enhancement closes the mobile menu on selection/Escape. Native details elements work without scripts. Inter is bundled locally. No third-party runtime asset requests, trackers, external font service, database or persistent Node server is required.

WHC Pro/cPanel is the intended hosting target, not a verified deployment environment. Plain static files avoid assumptions about Node support. Host credentials, redirects, TLS and server configuration are deliberately deferred to Phase 5. The root is a bilingual language choice. `noindex` metadata and `robots.txt` block premature indexing.

## Phase checklist

- [x] Inspect repository and preserve existing master prompt.
- [x] Recover approved direction; document factual gaps and hosting assumptions.
- [x] Create modern wordmark, pulse underline, bilingual light/dark SVG lockups and favicon.
- [x] Implement design tokens, reusable components and responsive typography/spacing.
- [x] Build complete English and Canadian French homepages and consistent navigation.
- [x] Include four image-led service cards, AED program overview, industries, FAQs and contact section.
- [x] Use licensed real equipment photography with visible credits and provenance.
- [x] Supply static build, lint, formatting, type checking and built-page tests.
- [x] Verify five required viewport widths, keyboard interactions and locale switching; capture screenshots (see QA record).
- [ ] Owner visual/content approval of Phase 1A screenshots.
- [ ] Phase 1B and later work (not part of this implementation).

## Inputs and launch blockers

1. **Supplier and product data:** confirm actual available models, Canadian device licences in [MDALL](https://health-products.canada.ca/mdall-limh/index-eng.jsp), manufacturer specifications, supported pads/batteries, warranties and permissions for supplier marketing photos. The current photos are licensed illustrative examples, not an inventory or approval claim. The exact mockup product imagery cannot be reused as verified product photography.
2. **Business regulatory review:** confirm the operating legal entity and exact importer/distributor/retailer channels; obtain qualified assessment of MDEL obligations. No exemption or approval is assumed. [Health Canada AED information](https://www.canada.ca/en/health-canada/services/drugs-medical-devices/automated-external-defibrillators-aeds.html) provides general context; it does not establish this business's status.
3. **Services and partners:** confirm geographic arrangements, pricing and readiness-check scope, qualified/authorized technical service routes and training partners' credentials before making operational commitments. The copy distinguishes checks from technical servicing and coordination from certification.
4. **Contacts and RFQ delivery:** the phone and email come from the master prompt. Their ownership, reception and delivery were not independently tested. Phase 2 needs a verified host-compatible backend, consent design, anti-spam and end-to-end delivery testing.
5. **Public launch:** approve bilingual copy, confirm privacy/consumer/tax/accessibility and Québec French-language obligations with appropriate advisers, provide policies, configure DNS/SSL and redirects, and complete Phase 4 QA. No public deployment or indexing submission is claimed.

No prices, SKUs, clinical outcomes, testimonials, authorized-dealer badges, nationwide installation guarantees, compliance guarantees or Health Canada endorsement have been invented. Checkout and RFQ forms are not represented as working features.
