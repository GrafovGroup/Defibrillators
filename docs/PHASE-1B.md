# Phase 1B implementation and QA

Date: 2026-11-06, America/Toronto. Scope: core bilingual page templates and real content from `MASTER_PROMPT.md`. Phase 1A design and brand assets are retained. No deployment or production launch is included.

## Delivered

| Area                      | Pages per language | Contents                                                                                           |
| ------------------------- | -----------------: | -------------------------------------------------------------------------------------------------- |
| Products                  |                  4 | Catalogue, ZOLL AED Plus reference, Philips HeartStart HS1 reference, comparison                   |
| Accessories               |                  6 | Hub, electrode pads, batteries, cabinets, signage, response kits                                   |
| Services                  |                  5 | Hub, installation, readiness inspections, multi-site programs, training coordination               |
| Industries                |                 10 | Hub and nine setting-specific guides                                                               |
| Resources and information |                 10 | Resources hub, buying/readiness guides, about, contact, quote, FAQs, privacy, terms, accessibility |
| Existing homepage         |                  1 | Updated links into the new pages                                                                   |

Total: 35 new pages per language, 70 new localized pages, 72 localized pages overall. The root language selector and bilingual 404 bring the static build to 74 HTML files. The complete English/French route mapping is in [ROUTES.md](ROUTES.md).

Shared templates include breadcrumbs, image heroes, category directories, model cards, product verification panels, comparison, content articles, FAQ disclosures and contextual enquiry actions. Header navigation remains the same eight categories on every page. Homepage cards, industry tiles, footer links and related-content links reach real localized pages. Language switching retains the current page, including nested routes. Titles, descriptions, canonicals, reciprocal hreflang and x-default are generated per page. Prelaunch noindex guards remain enabled.

The catalogue supports manufacturer selection, multiword search, accent/case-insensitive matching, accessible result announcements, empty results and reset with focus recovery. Both profiles remain readable without JavaScript. The comparison uses scoped headings and a keyboard-scrollable region on narrow screens.

## Content and source boundaries

Model information was reviewed on 2026-11-06 against primary manufacturer material:

- [ZOLL Canadian distributor AED Plus reference](https://candistributor.zoll.com/en-CA/aed-plus): audio/visual guidance and CPR feedback. [ZOLL operator guide](https://www.zoll.com/-/media/Product-Materials/product-manuals/aed-plus/01-english/9650-0311-01-SF_F.ashx) informs the adult CPR-D-padz feedback qualification. Exact device version and supplies still require confirmation.
- [Philips HeartStart OnSite (HS1)](https://www.usa.philips.com/healthcare/product/HCM5066A/heartstart-onsite-hs1): voice guidance, CPR metronome and separate adult/infant-child SMART Pads cartridges. This is manufacturer reference material, not evidence of a Canadian licensed configuration.
- [Health Canada MDALL](https://health-products.canada.ca/mdall-limh/index-eng.jsp) is linked for licence verification. Neither model is marked verified. No exact supplier device identifier or written supply agreement was provided.

Both model records explicitly carry `licensing: unverified`, `availability: unconfirmed`, and null price/warranty. The site publishes no invented SKU, stock quantity, price, delivery promise, dealer authorization, review or certification. It uses no Product/Offer structured data. The accessory pages explain how to establish compatibility rather than claiming that generic supplies fit every model.

Service copy distinguishes documented readiness checks from manufacturer-authorized technical servicing. Training is coordination subject to confirmation of the provider and course; it is not a claim of in-house certification. Industry content addresses the practical needs of each setting, without asserting universal legal requirements or fabricated local offices. Four service pages use four distinct relevant photographs.

Photography rights are in [ASSETS.md](ASSETS.md), including the corrected Powerheart G3 description and the new CC0 Philips HeartStart case photograph. Images are illustrative, not exact supplied configurations. Logos and base design tokens were not changed.

Privacy and terms pages describe the present prelaunch website and identify remaining operator review. They do not invent a legal entity, physical address, privacy officer, retention schedule, hosting configuration, returns policy or binding sale terms.

## Verification

Environment: Node 24.22.1, pnpm 11.25.0 and the connected Chromium browser using the actual production output locally.

- Frozen lockfile installation: passed. No new runtime or development dependencies added.
- `pnpm verify`: ESLint, Astro/TypeScript, formatting, 74-page production build and 159 Node tests passed.
- Integration tests cover every generated HTML page, local links/anchors/assets, locale pair reciprocity, stable navigation, unique metadata, breadcrumbs, image alternatives/dimensions, enquiry links, catalogue fallback/filter behaviour, comparison semantics, verification notices, image byte budgets, core palette contrast and unchanged `MASTER_PROMPT.md`.
- `pnpm audit`: no known vulnerabilities.
- `pnpm peers check`: no peer dependency issues.

Browser checks covered all 72 localized pages at 360, 390, 768, 1024 and 1440px: 360 page/viewport combinations with no horizontal page overflow, missing primary heading or broken visible image. Representative full-page screenshots were visually inspected and saved in the task output folder. Category card layouts were rechecked after correcting their heading hierarchy.

Keyboard and interaction checks passed for the skip link and main focus, mobile menu Enter/Escape and focus recovery, navigation into an accessory page, FAQ disclosure, horizontal comparison scrolling, search/manufacturer combination, empty results, reset, French accent-insensitive searching and equivalent-language product navigation. Browser warning/error logs were empty during these interactions. Phone and email URLs were inspected; no call or email was sent.

Artifacts supplied outside the repository include desktop/mobile screenshots, `phase1b-responsive.json`, verification/audit logs and a static build ZIP. Screenshots are review artifacts, never the website implementation.

## Phase 2 handoff and launch dependencies

- Obtain the actual supplier catalogue, device identifiers, Canadian licence verification, approved product photography, included components, compatibility, warranty, price/availability and written service/training arrangements. Expand the product model and environment/type filtering from those facts.
- Implement commercial/residential RFQ forms, lead routing, consent logging, anti-spam, attachment handling and a verified hosting-compatible mail backend. Current enquiry actions explicitly open the visitor's email application; no web submission or delivery is claimed.
- Retain indexing guards until launch approval. Location pages, expanded schema/sitemaps/redirects, full accessibility/performance/localization review and WHC/DNS/SSL deployment remain their later phases.
- Obtain the business/legal/privacy and Québec French-language review described in Phase 0. Browser checks do not constitute full WCAG certification or real-device/screen-reader certification.
