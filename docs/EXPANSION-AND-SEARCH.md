# National expansion and search launch — 7 November 2026

The owner requested related product/service pages, coverage of every major Canadian city, UX/SEO/AEO improvements and submission to Google and Bing. This explicitly supersedes the earlier indexing gate. It does not establish unverified product licensing, inventory, pricing, local offices, installer availability or training credentials.

## Coverage and content

The coverage baseline is all **41 census metropolitan areas in Statistics Canada's 2021 classification**, plus Charlottetown, Whitehorse, Yellowknife and Iqaluit. This produces **45 city/metropolitan guides**, alongside the existing national hub and all 13 provinces/territories. Ottawa–Gatineau is linked from both Ontario and Québec; its RFQ does not silently select one province. Metropolitan guides include nearby municipalities where useful, such as Surrey/Burnaby, Mississauga/Brampton and Laval/Longueuil. The exact destination must still be confirmed in the enquiry.

Source: [Statistics Canada SGC 2021 metropolitan classification](https://www23.statcan.gc.ca/imdb/p3VD.pl?CLV=1&CPV=A&CST=01012021&CVD=1348194&Function=getVD&MLV=3&TVD=1348193). This is a defined editorial coverage baseline, not a claim that every Canadian municipality has its own page or that services are locally available everywhere.

The 41 added city guides contain original bilingual procurement scenarios, four-item briefs, questions/answers and related offerings. Topics include cross-province purchasing, controlled entrances, shift changes, seasonal facilities, island freight and northern transfers. These are planning scenarios, not claims about named facilities or local laws. New city pages use explicitly labelled provincial/territorial locator maps; they do not show invented business locations. Existing four city maps and all approved homepage/brand artwork are preserved.

Twelve focused offerings add 24 localized pages:

- Site assessment/placement planning; cabinet mounting coordination; readiness-inspection planning; expiry tracking; post-use replenishment; asset inventory/multi-site records.
- Adult pads; paediatric pads/keys; combined pad/battery packs; AED trainers and supplies; carrying cases; outdoor cabinet planning.

Each offering has a concise answer, a detailed scope, an enquiry checklist, a visible FAQ, sources, authorship/update date and related links. These are quotation/reference pages, without fabricated SKUs, stock, prices, warranty promises, technical repair capability or automatic monitoring subscriptions. Equipment examples use manufacturer references; Canadian configuration and licensing still require exact-device verification.

The site now has **116 equivalent page pairs / 232 canonical localized URLs**, an English root fallback and the bilingual 404 document. All routes are listed in [ROUTES.md](ROUTES.md). There is no city-by-service Cartesian multiplication of near-identical pages.

## Audit findings and implemented changes

| Finding                                                                       | Implementation                                                                                                                                                                                                                                                                         |
| ----------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Four city guides did not cover national metropolitan demand.                  | 45 city/metropolitan guides, region links and searchable municipality aliases.                                                                                                                                                                                                         |
| A long directory is difficult to scan, especially on phones.                  | Accent- and punctuation-tolerant search, province filtering, visible result counts, clear filters, an empty state and a jump link. Every guide remains a normal crawlable link without JavaScript.                                                                                     |
| Broad service categories conceal specific buying tasks.                       | Focused offering pages linked from their parent categories and city guides; service/accessory directories with explanatory summaries.                                                                                                                                                  |
| City and specific service intent could be lost at the form.                   | Allowlisted city context survives offering pages and language switching. RFQs receive the appropriate request/part category, source page and planning city. Commercial location text remains editable; Ottawa–Gatineau requires the actual province. No contact data is put into URLs. |
| The global CSP hash list was near the existing 7.5 KB response-header budget. | Generated per-directory CSP headers authorize the actual page and fallback scripts. All security restrictions and same-origin/Formspree permissions remain; the test budget is unchanged. Deploy all nested `.htaccess` files with their HTML.                                         |
| The owner now wants search discovery.                                         | Production defaults are `index, follow`; robots.txt permits crawling and declares the sitemap. Public Google/Bing account verification tags are retained in source with explicit staging overrides.                                                                                    |
| Answer-oriented content needs evidence and usable navigation.                 | Visible summaries, section anchors, practical checklists, restrained FAQs, manufacturer/geographic sources and matching Article/FAQ/Breadcrumb/Collection metadata. No unsupported offers, ratings or local branches.                                                                  |

Google states that its normal SEO requirements apply to AI features and that no special AI file or schema is required. The work therefore improves accessible text, useful answers, internal links and factual markup. Neither FAQ rich results nor AI citations are promised. [Google AI features guidance](https://developers.google.com/search/docs/appearance/ai-features).

## Verification before deployment

- `pnpm verify`: lint, Astro/TypeScript, formatting, build and **526 tests**. The master prompt remains byte-identical to its pinned original blob.
- Integration coverage checks all 232 localized routes, canonical and reciprocal language links, headings, IDs, assets, local links, metadata uniqueness, source-backed visible schema, all 41 CMA codes, capitals, query allowlists and request routing.
- Existing transfer budgets remain: each HTML document below 12 KB gzip, external JS below 10 KB gzip and CSS below 12 KB gzip. Every generated page CSP remains below 7.5 KB.
- **332 browser checks**: 150 changed pages at 390 and 1280 px; eight representative pages at 360, 768, 1024 and 1710 px. Zero axe violations, horizontal overflow or broken images. Decorative-arrow contrast items remain automated “incomplete” notices; visible contrast uses the established tested palette. This is not a full accessibility certification.
- Browser journeys verified suburb-to-region search, city → mounting → French → RFQ context, cross-province selection, and a simulated French submission. The local QA server blocks real provider traffic and does not store submitted data. Existing live Formspree delivery evidence is in [PHASE-5.md](PHASE-5.md); no new production delivery claim is inferred from a mock success.
- Browser evidence: [qa/expansion-browser.json](qa/expansion-browser.json).

## Deployment and search submission record

Implementation source: `6cb33bf329c337042479fa7a8aa41f25c5bc48e1`. The WHC release archive contains 513 files, including 234 HTML documents and 233 `.htaccess` files, and is 2,882,227 bytes. SHA-256: `dcce813aaf16356d65a002343b67d479b75bc353ea0c3123fe82bea1ad0566bb`. Archive integrity was checked and a new private rollback archive of the current WHC site was created.

The expansion was deployed to WHC on **7 November 2026**. All **279 checked public pages/assets** returned 200 and matched the build byte for byte. All **233 checked HTML responses** returned exactly their generated Content Security Policy, with no duplicate policies. Primary and singular-domain HTTPS, canonical redirects with query preservation, the custom 404, blocked configuration-file access and archive isolation passed. The root still opens English directly. Detailed operator/account records remain outside this repository.

Live browser checks passed for municipality search (Surrey → Vancouver), city → cabinet mounting → French → RFQ, the BC/installation prefill, and the French mobile layout at 390 px without overflow or broken images. No captured console warnings/errors occurred in that journey. No additional production form submission was sent. Evidence: [qa/expansion-live.json](qa/expansion-live.json).

Both search properties were verified using their public HTML meta tags. The submitted sitemap is `https://defibrillators.ca/sitemap.xml`, containing 232 canonical localized URLs.

- **Bing:** submission accepted; its Sitemaps report subsequently showed **Success**, a crawl date of 7 November 2026 and **232 URLs discovered**.
- **Google:** submission accepted. Its initial fetch reported a general HTTP error; the live inspection identified the previously cached `Disallow: /` robots.txt. The robots report confirmed a 26-byte copy fetched at 03:54. A robots.txt recrawl request was accepted, and the report then showed the new 71-byte copy fetched at 09:57, containing `Allow: /` and the correct sitemap URL. The sitemap was resubmitted after that refresh. Google inspection still reported the old crawl block immediately afterward; successful sitemap processing is not yet confirmed.

Independent public requests to the sitemap using ordinary, Googlebot and bingbot user-agent strings returned HTTP 200, `application/xml` and all 232 entries. These requests do not substitute for the engines' own crawl results. Keep the updated public verification tags and crawl rules in place while Google's cache/reporting catches up; its first failure is recorded rather than described as successful processing.

Submission asks the engines to discover the pages; their indexing, ranking and answer-engine inclusion remain their decisions. No Google Indexing API request is used for these ordinary commercial/informational pages.

## Search processing update - 7 November 2026

The later live inspection cleared the earlier crawl block. English and French homepage indexing requests were accepted. Google Search Console subsequently reported sitemap **Success** with **232 discovered URLs**, matching the earlier Bing success. See [ANALYTICS.md](ANALYTICS.md) and [qa/analytics-live.json](qa/analytics-live.json) for the latest release and observed status. Submission and discovered URLs do not establish that every page is indexed.
