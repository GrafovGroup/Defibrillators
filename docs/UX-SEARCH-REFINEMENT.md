# UX, search and buying tools — 7 November 2026

This release follows the owner's approval of the seven improvement areas and explicit request to remove the mandatory enquiry-consent checkbox and repetitive machine-like copy. It preserves the approved logo, illustration, wide layout, direct English root entry and equivalent French pages. MASTER_PROMPT.md is unchanged.

## Enquiries and plain-language copy

Primary homepage calls to action now lead to the on-site quote form. A compact mobile phone/quote bar keeps contact actions available outside the form and legal pages, hides during analytics choice and input focus, and leaves space below page content. Service enquiries use service-specific wording.

The form displays a short purpose notice and privacy link beside Send, without a checkbox: “We use your details to reply to your request.” French: “Nous utilisons vos coordonnées pour répondre à votre demande.” Form submissions include the notice text/version, **not a manufactured consent acknowledgement**. Validation, honeypot, Formspree verification fallback, attachment limits and error recovery remain. Analytics still requires its separate optional choice. This supersedes earlier checkbox descriptions in Phase 2 and enquiry-refinement documentation; it is not a claim of legal certification.

Product comparisons show a single purchasing note instead of repeating unverified status in every cell. Product facts are scannable, source caveats sit in a disclosure, and duplicated model explanations are removed. Image credits and illustrative-image identification remain accurate. The quote page explains what happens next without provider implementation details in the main journey.

## Business identity

The owner confirmed **Superclean Canada Inc.** and the mailing address **200 Green Lane East, Unit 5, PMB # 222, East Gwillimbury, Ontario, Canada L9N 0A2** in this conversation. About, Contact, Privacy and Terms show these details; the footer identifies the operator. Organization markup includes legalName and PostalAddress. The PMB is explicitly a mailing address, not a showroom, local branch, staffed office or service radius. No hours or response-time promise was inferred.

## Search, product information and useful answers

- `/en/search/` and `/fr/recherche/` provide ranked, accent-insensitive search across all 115 other detail pages, including model numbers, manufacturer part references, bilingual supply terms and city aliases. Section filters group products, accessories, services, guides and locations. Product information appears first in the unfiltered directory. Every destination remains an ordinary crawlable link without JavaScript. Queries remain in the page; no query URL, storage or analytics event is created.
- Product summaries link to comparisons and a model-prefilled parts finder. Manufacturer references cover Philips HS1, FRx and Lifeline VIEW electrodes. They are reference numbers to verify against the current unit/manual, not an assertion of stock or universal Canadian/aviation compatibility.
- The cost guide contains a bilingual CAD worksheet using visitors' own written quotes, with exact-cent totals, invalid-amount handling, clear and print controls. No supplier prices or replacement intervals are invented. Data is calculated locally and not transmitted.
- A procurement checklist covers exact model/configuration, included supplies, replacement costs, installation, training, warranty and delivery before comparing written quotes.
- Catalogue, service and model titles better reflect buying intent. Canonical links, reciprocal hreflang, factual structured data, clear answer sections and internal links remain. There are now 234 localized sitemap URLs (117 language pairs).

### Manufacturer verification

References were checked on 7 November 2026 against primary documentation:

- [Philips HS1 instructions](https://www.documents.philips.com/assets/20190118/1baa3fc1ee09422482c7a9d901209aff.pdf): adult M5071A, infant/child M5072A and standard battery M5070A. Search-indexed manual text verified the references; direct PDF retrieval timed out during research.
- [Philips FRx instructions](https://www.documents.philips.com/assets/Instruction%20for%20Use/20210518/bbf1d8bda6e2442cb347ad2c002292ff.pdf?feed=ifu_docs_feed): SMART Pads II 989803139261, infant/child key 989803139311 and standard battery M5070A.
- [Defibtech Lifeline VIEW](https://www.defibtech.com/products/lifeline-view-aed/): adult DDP-2001 and child DDP-2002. Its webpage and brochure disagree on the battery reference, so no battery number is published.
- [HeartSine 350P](https://heartsine.com/product/heartsine-connected-samaritan-pad-350p/): corrected a source link that previously led to the 360P.

No special AI schema or AI-only file was added. [Google's AI-search guidance](https://developers.google.com/search/docs/appearance/ai-features) uses the existing Search fundamentals. Accurate, visible answers and crawlable pages are the basis; neither rich results nor AI citations are guaranteed.

## Lead outcomes

The existing consent-gated GA4 events still distinguish enquiry start, provider acceptance, errors and contact clicks. Search terms, quote amounts and contact details are excluded. A provider acceptance is not a qualified lead, delivered notification or sale.

For actual business outcomes, maintain a private JSON array **outside this repository and the public hosting root**. Each record has `requestId`, `stage` (`new`, `qualified`, `quoted`, `won`, `lost`), optional `valueCAD`, and optional `nextFollowUp` (`YYYY-MM-DD`). Use the enquiry ID to refer back to Formspree; keep names, emails, messages and attachments in the enquiry system. Update stage and next follow-up when the team handles an enquiry. Only record won value after an actual sale.

Run `node scripts/lead-outcomes.mjs /private/path/lead-outcomes.json` to produce stage counts and won revenue. The command rejects personal fields, duplicate IDs and invalid dates/values, and emits aggregates only. This is an operator-maintained workflow, not an automatic CRM connection. No production enquiries were imported or reclassified during this release.

## Search and performance evidence

On 7 November, Google showed the previous sitemap as Success with 232 discovered URLs, while Page Indexing and Performance were still processing. Search Console had insufficient real-user data for Core Web Vitals. Bing showed the previous sitemap as Success with 232 URLs, no errors/warnings, and requested 48 hours before Search Performance data would be ready. No query or exclusion conclusions can be drawn from these empty reports.

The existing live homepage scored 100 in all four PageSpeed Lighthouse categories on mobile and desktop. Mobile: FCP 0.9 s, LCP 1.6 s, TBT 0 ms, CLS 0.013; desktop: FCP 0.2 s, LCP 0.4 s, TBT 0 ms, CLS 0.001. These are lab samples, not field Core Web Vitals. The release adds one-year immutable caching only for content-hashed build assets and makes HTML revalidate. Existing transfer budgets remain unchanged.

## Remaining evidence-dependent work

Hours, normal reply time, supplier prices/stock, exact Canadian licence/configuration records, commercial warranties, service partners and genuine case studies/testimonials require confirmed business records. They have not been invented. Google/Bing query and exclusion improvements require their reports to finish processing. Sales outcomes require the operator to maintain actual enquiry status. Chrome viewport and automated accessibility tests are not substitutes for a real iPhone or a full assistive-technology user study.

## Release checks

`pnpm verify` passes lint, Astro/TypeScript, formatting, the production build and all **556 tests**. The master prompt hash and existing HTML/CSS/JavaScript transfer budgets pass. Tests cover search ranking and bilingual terms, quote notice handling, budget arithmetic, published business identity, lead-report privacy/validation, existing RFQ outcomes, sitemap/hreflang, structured data and internal links.

Twelve Chrome accessibility/layout checks cover changed templates at 320, 360, 390, 768, 1024, 1440 and 2560 px: zero axe violations, page overflow or broken images. Incomplete contrast observations remain in the evidence for decorative arrows, horizontally clipped comparison cells, pseudo backgrounds and wide-viewport capture boundaries; the wide homepage was also visually inspected. Keyboard focus and no-JavaScript required-field behaviour were checked. Actual desktop Safari search and French exact-cent budget calculations passed. No real iPhone or full VoiceOver session was available in this check.

English/French enquiry acceptance and provider field, rate-limit, verification and unavailable scenarios were simulated locally. Model/part context survives the French product-to-parts-to-form journey. No production lead was submitted. See [browser evidence](qa/growth-browser.json).

## Live deployment

Implementation: `8ce99ccba5d1226d3a5f17c7cd4e22e469f4e13a`; final company-name punctuation correction: `444ccf37fe4f14810bf33375f1ed4e3143b358b1`.

Deployed to the dedicated WHC site directory on 7 November after a fresh private rollback backup. The release contains 669 files, including 236 HTML documents and 236 header files. The primary ZIP is 9,491,470 bytes with SHA-256 `39fa9ec9a017023d4442400b5cd35fcec1c02a26d884b8bfb861f8b816ad7350`. An eight-HTML-file copy correction followed (52,505 bytes, SHA-256 `db35b05498589ab5603e60bf68e2cda851bcefc212b7e5e5b69aebeae35066e7`). Archives and account identifiers remain outside the public root and repository.

All **432 public files** matched the final build byte for byte. All **235 checked HTML responses** returned their exact generated CSP. HTTPS certificates, primary/singular-host redirects with query preservation, custom 404s and configuration/archive isolation passed. Content-hashed assets return one-year immutable caching; HTML revalidates. [Live HTTP evidence](qa/growth-live.json).

Live browser checks confirmed the company details, search result filtering, French budget calculations and required-field recovery without a consent checkbox. The final homepage PageSpeed run again scored **100 in performance, accessibility, best practices and SEO on mobile and desktop**. Mobile LCP was 1.6 seconds, TBT 0 ms and CLS 0.011; desktop LCP 0.4 seconds, TBT 0 ms and CLS 0.001. [Report](https://pagespeed.web.dev/analysis/https-defibrillators-ca-en/5su9yz4s7s?hl=en&form_factor=mobile).

Google confirmed “Sitemap submitted successfully”; Bing moved the resubmission to Processing. The deployed sitemap has **234 URLs**, while both dashboards still display the prior 232 discovered URLs until reprocessing finishes. No indexing, ranking or real-user performance guarantee is inferred. [Search and performance evidence](qa/growth-search.json).
