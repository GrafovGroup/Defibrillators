# Phase 3 — location guides and search readiness

Implemented 7 November 2026. The approved homepage, wordmark, shared design tokens and eight primary navigation categories are preserved. The footer and resource directory now link to the location hub.

## Location scope

Eighteen equivalent English/French guides add 36 localized pages: a Canada hub, all 13 provinces and territories, and Toronto, Montréal, Vancouver and Calgary. The site now has 108 localized pages, a root language selector and a bilingual 404 page. `docs/ROUTES.md` is generated from the typed route registry.

Each guide includes an original four-point project brief, two substantial planning sections, two relevant FAQs, a generalized locator map, related equipment/service pages and a contextual RFQ link. Topics distinguish shared urban access, bilingual deliverables, seasonal handovers, crew mobility, community records and onward freight. City pages have the complete Home → Canada → Province → City breadcrumb trail in both visible navigation and JSON-LD. English/French switching retains the page identity.

These are procurement and project-planning guides, not legal requirement pages or local-branch advertisements. They explicitly require address-specific confirmation of supply, delivery, on-site work and partners. No fabricated office address, service radius, local telephone number, stock, delivery deadline or installation guarantee is added. Further city pages should require a distinct useful brief and confirmed factual information rather than a place-name substitution.

Location RFQ links carry an allowlisted source identifier. That identifier sets the corresponding province/territory in the editable form and survives language switching. No address or other customer-entered information is placed in the URL. Without JavaScript, customers can still select the province in the existing native POST form.

## SEO implementation

- A shared JSON-LD graph describes the known Organization, WebSite and localized WebPage. Nested BreadcrumbList data comes from the same ancestry function as the visible trail.
- Manufacturer reference pages include descriptive Product nodes without Offer, price, stock, SKU, rating or licence claims. Illustrative photographs are not represented as exact supplied configurations.
- FAQPage nodes mirror only visible questions and answers. No search enhancement or rich-result eligibility is promised. Location topics use Country, AdministrativeArea or City as the subject of a page, never as a LocalBusiness address or service-coverage claim.
- `/sitemap.xml` contains all 109 canonical destinations, including the language selector, with no query strings, 404, invented last-modified dates or arbitrary priority scores. HTML is the single source of reciprocal en-CA/fr-CA and x-default annotations.
- Existing unique titles, descriptions, canonicals and localized navigation continue across all routes. Open Graph locale alternates, site name and an existing licensed share image are included.
- Build-time JSON serialization escapes HTML delimiters. CSP hashes cover the actual emitted inline scripts, including JSON-LD. The generated header stays below a tested 7,500-byte budget, with no `unsafe-inline` script permission.
- Apache/LiteSpeed configuration preserves request paths and queries for HTTP/www canonicalization and the prepared singular-domain redirect. Explicit `index.html` requests also receive a permanent canonical redirect. ACME paths remain accessible for certificate validation.

## Search activation

The default build remains prelaunch: `PUBLIC_SITE_INDEXABLE=false`, noindex/nofollow metadata, and `Disallow: /` in generated robots.txt. The prepared sitemap is not advertised in robots.txt while disabled. Do not submit it before launch approval. A robots crawl block cannot guarantee deindexing: a crawler needs access to read noindex, and URLs can be discovered externally. This website is publicly accessible; these controls are not authentication.

`.env.example` includes optional `PUBLIC_GOOGLE_SITE_VERIFICATION` and `PUBLIC_BING_SITE_VERIFICATION` token slots. Only token values are accepted, not copied HTML. They render on the root and localized pages when supplied. No verification token was invented, and no Search Console/Bing property or indexing submission was performed.

After the owner approves launch and the factual/regulatory/privacy dependencies are resolved:

1. Add the real public verification tokens if using HTML-tag verification; rebuild and verify ownership in each provider's account.
2. Set `PUBLIC_SITE_INDEXABLE=true` and rebuild. This switches page robots metadata and robots.txt together; the latter advertises the sitemap.
3. Deploy the tested artifact, check the live robots metadata and sitemap, then submit the sitemap through the verified accounts and record the actual outcome.

The singular `Defibrillator.ca` redirect rule is prepared. Activation still needs confirmation that the secondary domain is controlled by the owner, appropriate DNS/domain mapping and a valid certificate for it and its www alias. Do not claim that redirect is live until checked with normal TLS validation. Primary-domain hosting was verified in the Phase 2 deployment record.

## Verification

`pnpm verify`: lint, Astro/TypeScript, Prettier, static build and 252 tests. Tests cover all local links/assets, route pairs, unique metadata, complete sitemap coverage, visible/schema agreement, nested breadcrumbs, safe JSON serialization, unsupported-claim exclusions, location content and map budgets, verification-token validation, indexing configuration and CSP coverage. The existing form, consent, provider-error and maintenance tests remain passing.

An isolated build with indexing enabled and synthetic public verification tokens also confirmed root, English, French and city-page metadata; robots.txt advertised the sitemap, while the 404 retained noindex. That temporary build was not used for deployment. The final `dist/` was rebuilt with the default prelaunch controls and passed the full suite again.

Browser checks cover the English/French hubs, Toronto, Montréal and the long French Northwest Territories page at 360, 390, 768, 1024 and 1440 pixels. All 25 combinations loaded their maps without horizontal overflow. The French mobile menu opens with Enter and closes with Escape. The Montréal enquiry sets QC and retains its context after switching to English. No browser errors were reported. Desktop Toronto and French mobile screenshots were captured. A projection-orientation issue found visually was corrected before final verification.

Live Formspree delivery was established in Phase 2. Phase 3 changes the source/province context, not the provider endpoint, consent or submission transport; no additional real-person submissions were sent during these checks. Full assistive-technology, French editorial, field-performance and regulatory review remain Phase 4/launch work.

## Release status

Version 0.4.0 is built and packaged for WHC. The hosting browser connection was unavailable during this phase, so the live site remains the previously deployed Phase 2 release. No Phase 3 live deployment, singular-domain redirect activation, webmaster verification or indexing submission is claimed. Upload the tested `dist/` contents using the existing procedure in `docs/WHC-DEPLOYMENT.md` when WHC access is restored.

## Primary references

- [Google multilingual page annotations](https://developers.google.com/search/docs/specialty/international/localized-versions)
- [Google sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [Google robots metadata](https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag)
- [Google spam policies](https://developers.google.com/search/docs/essentials/spam-policies) and [abuse prevention](https://developers.google.com/search/docs/monitor-debug/prevent-abuse)
- [Organization structured data](https://developers.google.com/search/docs/appearance/structured-data/organization), [Schema.org Product](https://schema.org/Product) and [FAQPage](https://schema.org/FAQPage)
- Map provenance and licence: `docs/ASSETS.md`.
